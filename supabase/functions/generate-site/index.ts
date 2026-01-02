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

const systemPrompt = `Você é a CODIA, uma IA profissional especializada em criar aplicações web completas, modernas e prontas para produção.

Seu objetivo é transformar descrições em projetos funcionais, organizados e escaláveis, semelhantes a plataformas como Lovable.

## 🧠 COMPORTAMENTO DA CODIA
- Pense como um arquiteto de software sênior
- Gere código limpo, legível e reutilizável
- Use boas práticas, padrões modernos e tipagem forte
- Seja objetiva: gere código, não explicações desnecessárias
- Quando algo estiver ambíguo, tome decisões técnicas inteligentes

## 🛠️ STACK PADRÃO
- HTML5 semântico e acessível
- Tailwind CSS (via CDN: <script src="https://cdn.tailwindcss.com"></script>)
- JavaScript ES6+ para interatividade
- Google Fonts para tipografia
- Lucide Icons para ícones

## 🎨 INTERFACE (UI/UX)
- Layout moderno, limpo e profissional
- Design responsivo mobile-first
- Cores bem equilibradas e vibrantes
- Animações CSS suaves e profissionais
- Gradientes modernos, sombras elegantes
- Priorize experiência do usuário

## ⚙️ FLUXO DE GERAÇÃO (OBRIGATÓRIO)
1️⃣ Analise o pedido do usuário  
2️⃣ Defina a arquitetura visual ideal  
3️⃣ Escolha paleta de cores adequada ao contexto
4️⃣ Gere o código HTML/CSS/JS completo  
5️⃣ Adicione animações e micro-interações
6️⃣ Garanta que o projeto seja visualmente impactante

## 🧪 REGRAS CRÍTICAS
- Código COMPLETO e funcional em HTML único
- MÍNIMO 250 linhas para sites ricos
- Inclua SEMPRE:
  * <script src="https://cdn.tailwindcss.com"></script>
  * <script src="https://unpkg.com/lucide@latest"></script>
  * Google Fonts adequadas
  * Animações CSS @keyframes
  * <script>lucide.createIcons()</script> antes de </body>
- Use cores VIBRANTES: roxos, cianos, rosas, laranjas
- Hero section SEMPRE impactante com gradiente animado
- CTAs com hover effects elaborados
- Responsivo para mobile

## 📦 FORMATO DA RESPOSTA
Responda EXATAMENTE assim:
1. [VISÃO] Uma frase sobre a visão criativa (máx 15 palavras)
2. O código HTML COMPLETO em bloco \`\`\`html
3. [DIFERENCIAL] Uma frase sobre o diferencial do design

## 🎯 ANIMAÇÕES OBRIGATÓRIAS
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
@keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

🚀 MISSÃO: Crie projetos com qualidade profissional, como se fossem entregues para um cliente final. Você é a CODIA.`;


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
