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
    const { contentType, topic, brandName, tone } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY não configurada");
    }

    if (!contentType) {
      return new Response(
        JSON.stringify({ error: "Tipo de conteúdo é obrigatório" }),
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

    // Get brand voice if available
    const { data: store } = await supabaseClient
      .from("stores")
      .select("brand_voice, name")
      .eq("user_id", user.id)
      .maybeSingle();

    const brandContext = store?.brand_voice 
      ? `Use o seguinte tom de voz da marca: ${JSON.stringify(store.brand_voice)}.` 
      : "";
    const actualBrandName = brandName || store?.name || "a marca";

    // Content type specific prompts
    const contentPrompts: Record<string, { system: string; format: string }> = {
      blog: {
        system: "Você é um redator especialista em conteúdo de blog otimizado para SEO.",
        format: "Gere um artigo de blog completo com título chamativo, introdução, 3-4 seções com subtítulos, e conclusão com CTA. Use markdown para formatação.",
      },
      email: {
        system: "Você é um especialista em email marketing com altas taxas de conversão.",
        format: "Gere um email marketing completo com: Assunto (máx 50 caracteres), Preview text, Corpo do email com saudação, conteúdo persuasivo e CTA claro.",
      },
      "sobre-nos": {
        system: "Você é um redator especialista em textos institucionais que conectam emocionalmente.",
        format: "Gere um texto 'Sobre Nós' completo com: história da marca, missão, valores e diferenciais. Tom profissional mas humanizado.",
      },
      "politica-privacidade": {
        system: "Você é um especialista em textos legais adaptados para comércio eletrônico brasileiro.",
        format: "Gere uma política de privacidade completa seguindo a LGPD, incluindo: coleta de dados, uso de cookies, direitos do usuário, e contato do DPO.",
      },
      "termos-uso": {
        system: "Você é um especialista em termos de uso para e-commerce brasileiro.",
        format: "Gere termos de uso completos incluindo: definições, direitos e deveres, pagamentos, entregas, trocas/devoluções, e foro.",
      },
      "descricao-produto": {
        system: "Você é um copywriter especialista em descrições de produto que vendem.",
        format: "Gere uma descrição de produto persuasiva com: título, benefícios principais (bullet points), descrição detalhada e especificações.",
      },
      anuncio: {
        system: "Você é um especialista em copywriting para anúncios de alta conversão.",
        format: "Gere 3 versões de anúncio com: Headline (máx 30 caracteres), Descrição (máx 90 caracteres), e CTA.",
      },
    };

    const promptConfig = contentPrompts[contentType] || contentPrompts.blog;

    const systemPrompt = `${promptConfig.system}
${brandContext}
Escreva em português brasileiro.
${tone ? `Use um tom ${tone}.` : ""}`;

    const userPrompt = `${promptConfig.format}

Marca: ${actualBrandName}
${topic ? `Tema/Assunto: ${topic}` : ""}

Gere o conteúdo completo e pronto para uso.`;

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
      throw new Error("Erro ao gerar conteúdo");
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "";

    // Save to database
    const { data: savedContent, error: saveError } = await supabaseClient
      .from("generated_content")
      .insert({
        user_id: user.id,
        content_type: contentType,
        title: topic || contentType,
        content,
        metadata: { brandName: actualBrandName, tone },
      })
      .select()
      .single();

    if (saveError) {
      console.error("Error saving content:", saveError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        content,
        contentId: savedContent?.id,
        saved: !saveError,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in copywriter function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
