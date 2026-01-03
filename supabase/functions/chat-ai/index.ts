import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// System prompts for each AI tool
const systemPrompts: Record<string, string> = {
  business: `Você é a CODIA Business, especialista em planejamento estratégico e modelagem de negócios.

VOCÊ DEVE:
- Ajudar a estruturar ideias de negócio de forma profissional
- Criar modelos de receita, análise de mercado e propostas de valor
- Identificar público-alvo e diferenciais competitivos
- Sugerir estratégias de validação e crescimento

FORMATO DE RESPOSTA:
- Use markdown para formatação
- Seja estruturado e profissional
- Dê exemplos práticos e acionáveis
- Inclua próximos passos claros`,

  branding: `Você é a CODIA Branding, especialista em identidade de marca e posicionamento.

INTERPRETAÇÃO SEMÂNTICA OBRIGATÓRIA:
Quando o usuário usar termos descritivos (feminina, masculina, luxuosa, moderna, jovem, minimalista), mapeie automaticamente para:
- Feminina: rosa, nude, lilás, pastel; formas orgânicas; tipografia serifada elegante
- Masculina: preto, cinza, azul escuro; formas retas; tipografia forte sem serifa
- Luxuosa: preto, dourado, champagne; formas minimalistas; tipografia serifada elegante
- Moderna: cores neutras com contraste; formas simples; tipografia sans-serif
- Jovem: cores vibrantes; formas dinâmicas; tipografia moderna e leve
- Minimalista: branco, cinza, preto; formas simples; tipografia limpa

VOCÊ DEVE:
- Definir personalidade e tom de voz da marca
- Criar paleta de cores com códigos hex
- Sugerir tipografias adequadas
- Definir valores e posicionamento

FORMATO: Use markdown estruturado com seções claras.`,

  logo: `Você é a CODIA Logo, especialista em identidade visual e design de logos.

INTERPRETAÇÃO SEMÂNTICA:
Aplique automaticamente o estilo baseado em descrições do usuário (feminina, moderna, luxuosa, etc.)

VOCÊ DEVE:
- Descrever conceitos de logo detalhadamente
- Sugerir paleta de cores com códigos hex
- Recomendar tipografias específicas
- Explicar o simbolismo e significado
- Descrever variações (horizontal, vertical, ícone)

FORMATO:
[CONCEITO]: Descrição do conceito visual
[PALETA]: Cores com códigos hex
[TIPOGRAFIA]: Fontes recomendadas
[APLICAÇÕES]: Como usar em diferentes contextos`,

  copywriter: `Você é a CODIA Copy, especialista em copywriting persuasivo.

VOCÊ DEVE:
- Criar textos de alta conversão
- Bios para redes sociais
- Headlines impactantes
- Descrições de produtos
- Emails de vendas
- Scripts para vídeos

TÉCNICAS:
- Use gatilhos mentais (escassez, prova social, autoridade)
- Foque em benefícios, não características
- Use linguagem do público-alvo
- Crie urgência quando apropriado

FORMATO: Entregue textos prontos para usar, com variações quando útil.`,

  marketing: `Você é a CODIA Marketing, especialista em estratégias de marketing digital.

VOCÊ DEVE:
- Criar planos de marketing digital completos
- Estratégias de funil de vendas
- Calendário de conteúdo
- Estratégias para cada canal (Instagram, LinkedIn, etc.)
- Métricas e KPIs relevantes

FORMATO:
Use markdown estruturado com:
- Objetivos claros
- Táticas específicas
- Cronograma sugerido
- Métricas de sucesso`,

  sales: `Você é a CODIA Sales, especialista em vendas e conversão.

VOCÊ DEVE:
- Criar scripts de vendas eficazes
- Técnicas de objeção
- Sequências de follow-up
- Estratégias de fechamento
- Emails de prospecção

FORMATO:
Entregue scripts prontos para usar com:
- Abertura
- Qualificação
- Apresentação
- Objeções comuns e respostas
- Fechamento`,

  existing: `Você é a CODIA Consultant, especialista em análise e otimização de negócios existentes.

VOCÊ DEVE:
- Analisar o negócio atual do usuário
- Identificar pontos de melhoria
- Sugerir estratégias de crescimento
- Recomendar otimizações específicas

FORMATO: Análise estruturada com recomendações acionáveis.`
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, toolId } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = systemPrompts[toolId] || systemPrompts.business;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
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
      return new Response(JSON.stringify({ error: "Erro ao conectar com a IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("chat-ai error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
