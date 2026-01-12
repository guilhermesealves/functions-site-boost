import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { tool, action, data } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";

    // Configure prompts based on tool and action
    switch (tool) {
      case "site-cloner":
        systemPrompt = `Você é um especialista em análise de websites e design. Analise a URL fornecida e retorne uma descrição detalhada da estrutura visual, layout, cores predominantes, tipografia e seções principais. Responda em português brasileiro de forma clara e organizada.`;
        userPrompt = `Analise o site: ${data.url}. Descreva sua estrutura visual, layout, cores, fontes e principais seções. Sugira como replicar essa estrutura de forma original.`;
        break;

      case "seo":
        systemPrompt = `Você é um especialista em SEO. Gere conteúdo otimizado para mecanismos de busca. Inclua títulos, meta descriptions, headers e texto com palavras-chave naturalmente integradas. Responda em português brasileiro.`;
        userPrompt = `Gere conteúdo SEO para: ${data.businessType}. Palavra-chave principal: ${data.keyword}. Crie: título (max 60 chars), meta description (max 160 chars), 3 headings H2 e um parágrafo introdutório otimizado.`;
        break;

      case "growth":
        systemPrompt = `Você é um consultor de growth marketing especializado em pequenas e médias empresas. Analise o contexto e sugira ações práticas e implementáveis para crescimento. Responda em português brasileiro com bullets claros.`;
        userPrompt = `Analise este negócio: ${data.businessDescription}. Sugira 5 ações práticas de growth para aumentar vendas e visibilidade. Inclua: ação, motivo e como implementar.`;
        break;

      case "copy-thief":
        systemPrompt = `Você é um copywriter expert. Analise a estrutura de copy fornecida, identifique gatilhos mentais e padrões persuasivos. Gere uma versão original inspirada na referência. Responda em português brasileiro.`;
        userPrompt = `Analise esta copy de referência: "${data.referenceText}". Para o negócio: ${data.businessType}. Identifique os gatilhos usados e crie uma versão original e persuasiva.`;
        break;

      case "social-media":
        systemPrompt = `Você é um social media manager criativo. Gere conteúdo engajante para redes sociais adaptado à linguagem de cada plataforma. Responda em português brasileiro.`;
        userPrompt = `Crie conteúdo para ${data.platform} sobre: ${data.topic}. Tom: ${data.tone || "profissional mas acessível"}. Gere: 1 post principal, 3 variações de legendas e 5 hashtags relevantes.`;
        break;

      case "ai-explainer":
        systemPrompt = `Você é um assistente amigável que explica conceitos de forma simples e clara para pessoas sem conhecimento técnico. Use analogias do dia a dia e evite jargões. Responda em português brasileiro de forma objetiva.`;
        userPrompt = `Explique de forma simples: ${data.question}`;
        break;

      case "zap-crm":
        systemPrompt = `Você é especialista em vendas via WhatsApp. Crie mensagens profissionais, persuasivas e personalizadas para diferentes etapas do funil de vendas. Responda em português brasileiro.`;
        userPrompt = `Crie mensagens de WhatsApp para: ${data.purpose}. Negócio: ${data.businessType}. Contexto: ${data.context}. Gere 3 variações de mensagens.`;
        break;

      case "sales-recovery":
        systemPrompt = `Você é especialista em recuperação de vendas e follow-up. Crie mensagens persuasivas mas não invasivas para recuperar leads que não converteram. Responda em português brasileiro.`;
        userPrompt = `Crie mensagem de recuperação para: ${data.situation}. Produto/Serviço: ${data.product}. Tempo desde último contato: ${data.timeElapsed}. Gere 2 abordagens diferentes.`;
        break;

      default:
        systemPrompt = `Você é um assistente de IA útil e profissional. Responda em português brasileiro de forma clara e objetiva.`;
        userPrompt = data.message || "Como posso ajudar?";
    }

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
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em alguns segundos." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes. Adicione créditos para continuar." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Erro ao processar sua solicitação" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("tools-ai error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
