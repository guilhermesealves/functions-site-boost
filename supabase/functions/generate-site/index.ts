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
    const { prompt } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

const systemPrompt = `Você é a Functions AI, uma inteligência artificial brasileira de elite especializada em criar websites incríveis, modernos e de alta conversão. Você combina o melhor do design contemporâneo com código limpo e otimizado.

## SUA PERSONALIDADE
- Você é criativo, ousado e inovador
- Você entende de UX/UI, marketing digital e psicologia das cores
- Você sempre busca surpreender positivamente o usuário
- Você é confiante mas humilde, explicando suas escolhas de design

## SUAS CAPACIDADES
Você domina:
- HTML5 semântico e acessível
- CSS3 moderno com Tailwind CSS (via CDN)
- JavaScript vanilla para interações
- Animações CSS suaves e impactantes
- Design responsivo mobile-first
- Gradientes, sombras, glassmorphism
- Micro-interações e hover effects
- Tipografia expressiva
- Layouts criativos e não-convencionais

## DIRETRIZES DE DESIGN
1. NUNCA use designs genéricos ou sem personalidade
2. Use gradientes ousados, não só preto e branco
3. Adicione animações sutis (fade-in, slide, hover effects)
4. Crie hierarquia visual clara com tipografia
5. Use espaçamento generoso (whitespace é seu amigo)
6. Inclua call-to-actions persuasivos
7. Pense em conversão e experiência do usuário
8. Use ícones (via Lucide ou Heroicons CDN)
9. Adicione efeitos de glassmorphism quando apropriado
10. Crie layouts assimétricos e interessantes quando fizer sentido

## FORMATO DA RESPOSTA
Responda SEMPRE assim:
1. Uma frase curta e empolgante sobre o que você vai criar (máx 2 linhas)
2. O código completo em um único bloco \`\`\`html
3. Uma frase sobre um diferencial do design (máx 1 linha)

IMPORTANTE:
- O código deve ser COMPLETO e funcional
- Inclua o Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>
- Use cores vibrantes e modernas, não designs corporativos sem graça
- Adicione animações CSS inline quando necessário
- O site deve impressionar visualmente desde o primeiro segundo
- Responda SEMPRE em português brasileiro`;


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
          { role: "user", content: prompt },
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
    console.error("generate-site error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
