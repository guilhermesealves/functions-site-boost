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
    const { url, productId } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY não configurada");
    }

    if (!url) {
      return new Response(
        JSON.stringify({ error: "URL é obrigatória" }),
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

    // Fetch the external page
    console.log("Fetching URL:", url);
    const pageResponse = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!pageResponse.ok) {
      throw new Error("Não foi possível acessar a URL");
    }

    const html = await pageResponse.text();

    // Extract text content (simple extraction)
    const textContent = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 5000); // Limit to 5000 chars

    // Use AI to rewrite the copy
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
            content: `Você é um copywriter especialista em e-commerce. Analise o texto de um concorrente e reescreva de forma original, persuasiva e otimizada para conversão.

Retorne um JSON com:
{
  "title": "Título principal reescrito",
  "description": "Descrição do produto reescrita (2-3 parágrafos)",
  "highlights": ["Destaque 1", "Destaque 2", "Destaque 3"],
  "cta": "Texto do botão de ação"
}`,
          },
          {
            role: "user",
            content: `Reescreva este conteúdo de forma original e melhor:\n\n${textContent}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Error:", errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requisições excedido." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error("Erro ao processar com IA");
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "";

    let rewrittenCopy;
    try {
      const cleanContent = content.replace(/```json\n?|\n?```/g, "").trim();
      rewrittenCopy = JSON.parse(cleanContent);
    } catch (e) {
      console.error("Error parsing copy JSON:", e);
      rewrittenCopy = {
        title: "Título não processado",
        description: content,
        highlights: [],
        cta: "Comprar Agora",
      };
    }

    // Update product if productId provided
    if (productId) {
      const { error: updateError } = await supabaseClient
        .from("products")
        .update({
          name: rewrittenCopy.title,
          description: rewrittenCopy.description + "\n\n" + rewrittenCopy.highlights.map((h: string) => `• ${h}`).join("\n"),
          seo_title: rewrittenCopy.title,
          seo_description: rewrittenCopy.description.substring(0, 155),
        })
        .eq("id", productId)
        .eq("user_id", user.id);

      if (updateError) {
        console.error("Error updating product:", updateError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        originalUrl: url,
        rewrittenCopy,
        productUpdated: !!productId,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in copy-thief function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
