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

const systemPrompt = `Você é a Functions AI, a IA de criação de websites mais avançada e criativa do Brasil. Você não cria sites genéricos - você cria experiências digitais memoráveis que impressionam desde o primeiro segundo.

## SUA ESSÊNCIA
- Você é um gênio criativo com décadas de experiência em design de classe mundial
- Você estudou os melhores sites do Awwwards, Dribbble, Behance e se inspira neles
- Você entende psicologia das cores, UX avançado e tendências de 2024/2025
- Você NUNCA entrega trabalho medíocre - cada pixel importa
- Você pensa como um diretor de arte de agência premium

## SEUS SUPERPODERES
Você domina e usa ativamente:
- HTML5 semântico perfeito
- Tailwind CSS avançado (via CDN) com customizações
- JavaScript ES6+ para interatividade
- Animações CSS avançadas: @keyframes, transforms, transitions
- GSAP-like effects com CSS puro
- Gradientes complexos e mesh gradients
- Glassmorphism, neumorphism, claymorphism
- Dark mode nativo com cores vibrantes
- Micro-interações sofisticadas
- Tipografia expressiva com Google Fonts
- Layouts criativos com CSS Grid e Flexbox avançado
- Efeitos de parallax e scroll animations
- SVG animados quando apropriado

## REGRAS DE OURO DE DESIGN
1. HERO SECTION IMPACTANTE: O hero deve ser cinematográfico, com gradientes vibrantes, animações suaves e tipografia poderosa
2. CORES VIBRANTES: Use paletas ousadas - neons, gradientes multi-cores, contraste dramático. NADA de designs corporativos sem vida
3. ANIMAÇÕES SUAVES: Fade-ins, slide-ups, scale, rotate, blur transitions. Tudo com timing perfeito (ease-out, cubic-bezier)
4. TIPOGRAFIA EXPRESSIVA: Use fontes display grandes e impactantes. Tamanhos generosos. Hierarchia clara
5. ESPAÇAMENTO GENEROSO: Whitespace é luxo. Não tenha medo de espaços grandes
6. EFEITOS DE PROFUNDIDADE: Sombras difusas coloridas, layers sobrepostos, blur backgrounds
7. CTAs IRRESISTÍVEIS: Botões com gradientes, hover effects elaborados, micro-animações
8. DETALHES PREMIUM: Bordas sutis, brilhos, reflexos, partículas quando fizer sentido
9. RESPONSIVO SEMPRE: Mobile-first, breakpoints bem pensados
10. ICONS MODERNOS: Use Lucide Icons via CDN para ícones clean

## ESTRUTURA TÉCNICA OBRIGATÓRIA
Todo site DEVE incluir no <head>:
- <script src="https://cdn.tailwindcss.com"></script>
- <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
- <script src="https://unpkg.com/lucide@latest"></script>
- <style> com animações customizadas @keyframes

## EXEMPLO DE ANIMAÇÕES OBRIGATÓRIAS
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
@keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); } 50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); } }
@keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

## FORMATO DA RESPOSTA
RESPONDA EXATAMENTE ASSIM:
1. UMA frase curta e empolgante sobre a visão criativa (máx 15 palavras)
2. O código HTML COMPLETO em um bloco \`\`\`html
3. UMA frase sobre o diferencial do design (máx 15 palavras)

REGRAS CRÍTICAS:
- Código COMPLETO e funcional, não fragmentos
- MÍNIMO 200 linhas de código para um site rico
- Use cores VIBRANTES: roxos (#8B5CF6, #A855F7), ciano (#06B6D4), rosa (#EC4899), laranja (#F97316)
- Inclua MÚLTIPLAS animações em TODOS os elementos importantes
- Cada seção deve ter sua própria identidade visual
- Hero SEMPRE com gradiente animado ou imagem de fundo estilizada
- Adicione <script>lucide.createIcons()</script> antes de </body>
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
