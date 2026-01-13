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
    const { keyword, variations, template } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY não configurada");
    }

    if (!keyword || !variations || variations.length === 0) {
      return new Response(
        JSON.stringify({ error: "Keyword e variações são obrigatórias" }),
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

    const generatedPages = [];

    for (const variation of variations) {
      const fullKeyword = `${keyword} ${variation}`.trim();
      const slug = fullKeyword.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

      // Generate SEO content with AI
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
              content: `Você é um especialista em SEO. Gere conteúdo otimizado para landing pages.
Retorne APENAS um JSON com:
{
  "title": "Título H1 otimizado (max 60 chars)",
  "metaTitle": "Meta title para SEO (max 60 chars)",
  "metaDescription": "Meta description (max 155 chars)",
  "content": "Conteúdo HTML da página com H2s, parágrafos e CTAs"
}`,
            },
            {
              role: "user",
              content: `Crie uma landing page otimizada para a keyword: "${fullKeyword}". 
Template: ${template || "landing"}. 
Foco em conversão e SEO local brasileiro.`,
            },
          ],
        }),
      });

      if (!response.ok) {
        console.error(`Error generating page for: ${fullKeyword}`);
        continue;
      }

      const aiData = await response.json();
      const content = aiData.choices?.[0]?.message?.content || "";

      let pageData;
      try {
        const cleanContent = content.replace(/```json\n?|\n?```/g, "").trim();
        pageData = JSON.parse(cleanContent);
      } catch (e) {
        console.error("Error parsing page JSON:", e);
        continue;
      }

      // Insert page
      const { data: savedPage, error: saveError } = await supabaseClient
        .from("pages")
        .upsert({
          user_id: user.id,
          title: pageData.title,
          slug,
          content: pageData.content,
          meta_title: pageData.metaTitle,
          meta_description: pageData.metaDescription,
          keywords: [keyword, variation, fullKeyword],
          template: template || "landing",
          is_published: false,
        }, {
          onConflict: "user_id,slug",
        })
        .select()
        .single();

      if (!saveError && savedPage) {
        generatedPages.push({
          id: savedPage.id,
          title: pageData.title,
          slug,
          keyword: fullKeyword,
        });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        pagesGenerated: generatedPages.length,
        pages: generatedPages,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in seo-pages function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
