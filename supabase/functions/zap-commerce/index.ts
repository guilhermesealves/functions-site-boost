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
    const { message, customerPhone, customerName, channel } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!message) {
      return new Response(
        JSON.stringify({ error: "Mensagem é obrigatória" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

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

    // Save incoming message
    await supabaseClient.from("chat_messages").insert({
      user_id: user.id,
      customer_phone: customerPhone || "anonymous",
      customer_name: customerName || "Cliente",
      message,
      direction: "inbound",
      channel: channel || "whatsapp",
    });

    // Get store brand voice for AI context
    const { data: store } = await supabaseClient
      .from("stores")
      .select("brand_voice, name")
      .eq("user_id", user.id)
      .maybeSingle();

    // Get products for RAG context
    const { data: products } = await supabaseClient
      .from("products")
      .select("name, price, description, quantity")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .limit(20);

    const productContext = products?.map(p => 
      `- ${p.name}: R$ ${p.price} (estoque: ${p.quantity})`
    ).join("\n") || "Nenhum produto cadastrado";

    const brandVoice = store?.brand_voice?.chatbot_system_prompt 
      || store?.brand_voice?.tone_of_voice?.style
      || "Seja amigável e prestativo";

    // Generate AI response
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Você é o assistente de vendas da loja "${store?.name || "nossa loja"}".

TOM DE VOZ:
${brandVoice}

CATÁLOGO DE PRODUTOS:
${productContext}

REGRAS:
- Responda perguntas sobre produtos usando os dados acima
- Se perguntarem preço, consulte o catálogo
- Se o produto não existir no catálogo, diga que não temos no momento
- Sempre incentive a compra de forma natural
- Respostas curtas e objetivas (máximo 3 frases)
- Use emojis moderadamente`,
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    let aiResponse = "Olá! Como posso ajudar?";
    if (response.ok) {
      const aiData = await response.json();
      aiResponse = aiData.choices?.[0]?.message?.content || aiResponse;
    }

    // Save AI response
    await supabaseClient.from("chat_messages").insert({
      user_id: user.id,
      customer_phone: customerPhone || "anonymous",
      customer_name: customerName || "Cliente",
      message: aiResponse,
      direction: "outbound",
      channel: channel || "whatsapp",
    });

    // In a real implementation, here we would send via WhatsApp API
    // For now, we just return the response
    console.log(`[SIMULATED] Sending WhatsApp to ${customerPhone}: ${aiResponse}`);

    return new Response(
      JSON.stringify({
        success: true,
        response: aiResponse,
        simulated: true, // Flag indicating WhatsApp sending is simulated
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in zap-commerce function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
