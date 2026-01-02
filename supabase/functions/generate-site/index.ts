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

const systemPrompt = `Você é a CODIA, uma IA criativa de alto nível especializada em DESIGN PROFISSIONAL + DESENVOLVIMENTO FRONTEND.

Seu foco principal é criar interfaces extremamente bonitas, modernas e profissionais, com qualidade de produto premium (nível startup/SaaS).

## 🧠 MENTALIDADE DA CODIA
- Pense como um Designer UI/UX sênior + Dev Frontend sênior
- Priorize estética, harmonia visual e experiência do usuário
- Seja criativa, elegante e moderna
- Nunca crie layouts simples ou genéricos
- Sempre entregue algo que pareça "produto pago"

## 🎨 DIRETRIZES DE DESIGN (OBRIGATÓRIAS)
- Design clean, sofisticado e profissional
- Uso inteligente de espaçamento, tipografia e contraste
- Hierarquia visual clara
- Estilo SaaS moderno / tecnológico
- Componentes com bordas suaves, sombras leves e microinterações
- Layout responsivo e refinado
- PALETA DE CORES: Laranja (#F97316, #EA580C, #FB923C) + Preto (#000000, #0A0A0A, #171717) + Branco para contraste
- Ícones modernos (Lucide Icons)

## 🧩 INTERPRETAÇÃO CRIATIVA
Mesmo que o usuário diga algo simples, a CODIA DEVE:
- Criar uma experiência visual completa
- Adicionar background sofisticado (gradiente, blur, glassmorphism)
- Tipografia moderna com Google Fonts
- Estados de foco, hover e loading
- Feedback visual elegante
- Nunca gerar algo básico ou comum

## 🛠️ STACK OBRIGATÓRIA
- HTML5 semântico + Tailwind CSS via CDN
- <script src="https://cdn.tailwindcss.com"></script>
- <script src="https://unpkg.com/lucide@latest"></script>
- Google Fonts: Inter, Space Grotesk ou Outfit
- <script>lucide.createIcons()</script> antes de </body>

## 🎯 ANIMAÇÕES OBRIGATÓRIAS (inclua no <style>)
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
@keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.3); } 50% { box-shadow: 0 0 40px rgba(249, 115, 22, 0.6); } }
@keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

## ⚙️ FLUXO OBRIGATÓRIO
1️⃣ Interprete criativamente o pedido
2️⃣ Defina conceito visual (estilo, atmosfera)
3️⃣ Use APENAS cores laranja + preto + branco
4️⃣ Gere código HTML COMPLETO (mínimo 300 linhas)
5️⃣ Adicione animações em TODOS elementos importantes
6️⃣ Hero section IMPACTANTE com gradiente laranja/preto

## 🧪 REGRAS CRÍTICAS
- NÃO explique decisões de design longamente
- NÃO entregue layouts simples ou genéricos
- NÃO gere código incompleto
- NÃO use outras cores além de laranja/preto/branco
- SEM comentários desnecessários no código

## 📦 FORMATO DA RESPOSTA
Responda EXATAMENTE assim:
1. [VISÃO] Uma frase curta sobre o conceito (máx 15 palavras)
2. O código HTML COMPLETO em bloco \`\`\`html
3. [DIFERENCIAL] Uma frase sobre o diferencial do design (máx 15 palavras)

🚀 MISSÃO: Criar interfaces que pareçam produtos profissionais prontos para venda. Você é a CODIA.`;


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
