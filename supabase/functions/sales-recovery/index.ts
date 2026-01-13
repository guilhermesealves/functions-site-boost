import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Não autorizado" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Usuário não autenticado" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Find abandoned orders (pending for more than 2 hours)
    const twoHoursAgo = new Date();
    twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);

    const { data: abandonedOrders, error: ordersError } = await supabaseClient
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "pending")
      .eq("payment_status", "pending")
      .lt("created_at", twoHoursAgo.toISOString())
      .is("recovered_at", null);

    if (ordersError) {
      throw new Error("Erro ao buscar pedidos abandonados");
    }

    if (!abandonedOrders || abandonedOrders.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Nenhum carrinho abandonado encontrado",
          recoveryAttempts: 0,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get store info
    const { data: store } = await supabaseClient
      .from("stores")
      .select("name")
      .eq("user_id", user.id)
      .maybeSingle();

    const recoveryMessages = [];

    for (const order of abandonedOrders) {
      // Check if we already attempted recovery for this order in the last 24 hours
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);

      const { data: existingAttempt } = await supabaseClient
        .from("recovery_attempts")
        .select("id")
        .eq("order_id", order.id)
        .gte("sent_at", oneDayAgo.toISOString())
        .maybeSingle();

      if (existingAttempt) {
        continue; // Skip if already attempted recently
      }

      // Generate recovery message
      const items = order.items as any[] || [];
      const itemsList = items.map((i: any) => i.name || "Produto").join(", ");
      
      const message = `Olá${order.customer_name ? ` ${order.customer_name}` : ""}! 👋

Vi que você deixou alguns itens no carrinho da ${store?.name || "nossa loja"}:
📦 ${itemsList}
💰 Total: R$ ${order.total.toFixed(2)}

Finalize sua compra agora e garanta seus produtos! 🛍️

👉 Link: [Link do checkout]

Qualquer dúvida, estou aqui para ajudar! 😊`;

      // Save recovery attempt
      await supabaseClient.from("recovery_attempts").insert({
        user_id: user.id,
        order_id: order.id,
        message_sent: message,
      });

      // Mark order as having recovery attempt
      await supabaseClient
        .from("orders")
        .update({ abandoned_at: order.abandoned_at || new Date().toISOString() })
        .eq("id", order.id);

      // Simulate sending (in real implementation, would send via WhatsApp API)
      console.log(`[SIMULATED] Recovery message for order ${order.id}:`, message);

      recoveryMessages.push({
        orderId: order.id,
        customerPhone: order.customer_phone,
        customerName: order.customer_name,
        total: order.total,
        message,
        status: "simulated", // Would be "sent" with real WhatsApp API
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        abandonedOrdersFound: abandonedOrders.length,
        recoveryAttempts: recoveryMessages.length,
        messages: recoveryMessages,
        note: "Envio simulado. Integre com WhatsApp API para envio real.",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in sales-recovery function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
