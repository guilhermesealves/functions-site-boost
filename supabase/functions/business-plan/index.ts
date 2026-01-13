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
    const { niche, initialCapital } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY não configurada");
    }

    if (!niche) {
      return new Response(
        JSON.stringify({ error: "Nicho de mercado é obrigatório" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get user from auth header
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

    const systemPrompt = `Você é um consultor de negócios especialista. Gere um Business Model Canvas completo em formato JSON.
O Canvas deve conter EXATAMENTE estas 9 seções, cada uma com 3-5 itens práticos e específicos:
- key_partners (Parceiros-Chave)
- key_activities (Atividades-Chave)
- key_resources (Recursos-Chave)
- value_propositions (Proposta de Valor)
- customer_relationships (Relacionamento com Clientes)
- channels (Canais)
- customer_segments (Segmentos de Clientes)
- cost_structure (Estrutura de Custos)
- revenue_streams (Fontes de Receita)

IMPORTANTE: Retorne APENAS o JSON, sem markdown, sem explicações.`;

    const userPrompt = `Crie um Business Model Canvas para um negócio no nicho "${niche}"${initialCapital ? ` com capital inicial de R$ ${initialCapital}` : ""}.
Considere o mercado brasileiro e seja específico nas sugestões.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requisições excedido. Aguarde alguns segundos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error("Erro ao gerar plano de negócios");
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "";

    // Parse the JSON from the response
    let canvasData;
    try {
      // Remove markdown code blocks if present
      const cleanContent = content.replace(/```json\n?|\n?```/g, "").trim();
      canvasData = JSON.parse(cleanContent);
    } catch (e) {
      console.error("Error parsing canvas JSON:", e, content);
      return new Response(
        JSON.stringify({ error: "Erro ao processar resposta da IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Save to database
    const { data: savedPlan, error: saveError } = await supabaseClient
      .from("business_plans")
      .insert({
        user_id: user.id,
        niche,
        initial_capital: initialCapital || null,
        canvas_data: canvasData,
      })
      .select()
      .single();

    if (saveError) {
      console.error("Error saving business plan:", saveError);
      // Still return the canvas even if save fails
    }

    return new Response(
      JSON.stringify({
        success: true,
        canvas: canvasData,
        saved: !saveError,
        planId: savedPlan?.id,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in business-plan function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
