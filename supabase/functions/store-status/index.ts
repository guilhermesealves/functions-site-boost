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

    // Fetch all store data
    const [storeResult, productsResult, ordersResult, pagesResult] = await Promise.all([
      supabaseClient.from("stores").select("*").eq("user_id", user.id).maybeSingle(),
      supabaseClient.from("products").select("*").eq("user_id", user.id),
      supabaseClient.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(100),
      supabaseClient.from("pages").select("*").eq("user_id", user.id),
    ]);

    // Check all badges criteria
    const store = storeResult.data;
    const products = productsResult.data || [];
    const orders = ordersResult.data || [];

    const hasLogo = !!store?.logo_url;
    const hasProducts = products.length >= 5;
    const hasWhatsapp = !!store?.theme_config?.whatsapp;
    const hasPayment = orders.some(o => o.payment_status === "paid");
    const hasShipping = !!store?.theme_config?.shippingMethod;

    // Calculate completion percentage
    const criteria = [hasLogo, hasProducts, hasWhatsapp, hasPayment, hasShipping];
    const completedCount = criteria.filter(Boolean).length;
    const completionPercentage = Math.round((completedCount / criteria.length) * 100);

    // Check if verified
    const isVerified = completionPercentage === 100;

    // Update or create store_badges
    const { data: existingBadges } = await supabaseClient
      .from("store_badges")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    const badgeData = {
      user_id: user.id,
      has_logo: hasLogo,
      has_products: hasProducts,
      has_whatsapp: hasWhatsapp,
      has_payment: hasPayment,
      has_shipping: hasShipping,
      verified_at: isVerified && !existingBadges?.verified_at ? new Date().toISOString() : existingBadges?.verified_at || null,
    };

    if (existingBadges) {
      await supabaseClient
        .from("store_badges")
        .update(badgeData)
        .eq("user_id", user.id);
    } else {
      await supabaseClient
        .from("store_badges")
        .insert(badgeData);
    }

    // Build checklist items
    const checklist = [
      {
        id: "logo",
        label: "Logo da Loja",
        completed: hasLogo,
        tip: hasLogo ? "✅ Logo configurado" : "Adicione um logo profissional na ferramenta Logo & Visual",
        icon: "🎨",
      },
      {
        id: "products",
        label: "5+ Produtos Cadastrados",
        completed: hasProducts,
        tip: hasProducts ? `✅ ${products.length} produtos` : `Cadastre mais ${5 - products.length} produto(s)`,
        icon: "📦",
      },
      {
        id: "whatsapp",
        label: "WhatsApp Configurado",
        completed: hasWhatsapp,
        tip: hasWhatsapp ? "✅ WhatsApp ativo" : "Configure o WhatsApp nas configurações da loja",
        icon: "📱",
      },
      {
        id: "payment",
        label: "Primeira Venda Realizada",
        completed: hasPayment,
        tip: hasPayment ? "✅ Primeira venda concluída" : "Realize sua primeira venda para desbloquear",
        icon: "💰",
      },
      {
        id: "shipping",
        label: "Frete Configurado",
        completed: hasShipping,
        tip: hasShipping ? "✅ Frete configurado" : "Configure as opções de entrega",
        icon: "🚚",
      },
    ];

    return new Response(
      JSON.stringify({
        success: true,
        completionPercentage,
        isVerified,
        verifiedAt: badgeData.verified_at,
        checklist,
        summary: {
          totalProducts: products.length,
          totalOrders: orders.length,
          storeName: store?.name || "Minha Loja",
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in store-status function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
