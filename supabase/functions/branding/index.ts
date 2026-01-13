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
    const { brandName, niche } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY não configurada");
    }

    if (!brandName) {
      return new Response(
        JSON.stringify({ error: "Nome da marca é obrigatório" }),
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

    const systemPrompt = `Você é um especialista em branding e identidade de marca. Gere a identidade verbal de uma marca em formato JSON.

O JSON deve conter EXATAMENTE estas propriedades:
- archetype: objeto com { name: string, description: string } - Um dos 12 arquétipos de Jung
- tone_of_voice: objeto com { style: string, characteristics: string[], do: string[], dont: string[] }
- mission: string - Missão da empresa
- vision: string - Visão da empresa  
- values: array de strings - 5 valores principais
- personality_traits: array de strings - 5 traços de personalidade
- chatbot_system_prompt: string - Um prompt de sistema para um chatbot de vendas que incorpora toda a identidade da marca

IMPORTANTE: Retorne APENAS o JSON, sem markdown, sem explicações.`;

    const userPrompt = `Crie a identidade verbal completa para a marca "${brandName}"${niche ? ` que atua no nicho de ${niche}` : ""}.
A identidade deve ser autêntica, memorável e adequada ao mercado brasileiro.`;

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
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requisições excedido." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error("Erro ao gerar branding");
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "";

    let brandVoice;
    try {
      const cleanContent = content.replace(/```json\n?|\n?```/g, "").trim();
      brandVoice = JSON.parse(cleanContent);
    } catch (e) {
      console.error("Error parsing brand voice JSON:", e, content);
      return new Response(
        JSON.stringify({ error: "Erro ao processar resposta da IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if store exists, create or update
    const { data: existingStore } = await supabaseClient
      .from("stores")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    let saveError;
    if (existingStore) {
      const { error } = await supabaseClient
        .from("stores")
        .update({ brand_voice: brandVoice, name: brandName })
        .eq("id", existingStore.id);
      saveError = error;
    } else {
      const { error } = await supabaseClient
        .from("stores")
        .insert({
          user_id: user.id,
          name: brandName,
          brand_voice: brandVoice,
        });
      saveError = error;
    }

    if (saveError) {
      console.error("Error saving brand voice:", saveError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        brandVoice,
        saved: !saveError,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in branding function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
