import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import OpenAI from "https://esm.sh/openai@4.20.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { productId, platform } = await req.json();
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!OPENAI_API_KEY || !LOVABLE_API_KEY) {
      throw new Error("API keys não configuradas");
    }

    if (!productId) {
      return new Response(
        JSON.stringify({ error: "Selecione um produto" }),
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

    // Get product data
    const { data: product, error: productError } = await supabaseClient
      .from("products")
      .select("*")
      .eq("id", productId)
      .eq("user_id", user.id)
      .single();

    if (productError || !product) {
      return new Response(
        JSON.stringify({ error: "Produto não encontrado" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get store brand voice for context
    const { data: store } = await supabaseClient
      .from("stores")
      .select("brand_voice, name")
      .eq("user_id", user.id)
      .maybeSingle();

    const brandContext = store?.brand_voice 
      ? `Tom de voz da marca: ${JSON.stringify(store.brand_voice)}` 
      : "";

    // Generate caption with AI
    const platformConfig: Record<string, { chars: number; hashtags: number }> = {
      instagram: { chars: 2200, hashtags: 30 },
      facebook: { chars: 500, hashtags: 5 },
      twitter: { chars: 280, hashtags: 3 },
      tiktok: { chars: 150, hashtags: 5 },
    };

    const config = platformConfig[platform] || platformConfig.instagram;

    const captionResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
            content: `Você é um social media manager especialista em vendas.
${brandContext}

Crie uma legenda para ${platform} que:
- Tenha no máximo ${config.chars} caracteres
- Inclua até ${config.hashtags} hashtags relevantes
- Tenha um CTA claro
- Use emojis estrategicamente
- Gere engajamento

Retorne um JSON:
{
  "caption": "Texto da legenda completo",
  "hashtags": ["hashtag1", "hashtag2"],
  "cta": "Texto do call-to-action"
}`,
          },
          {
            role: "user",
            content: `Crie uma legenda para o produto:
Nome: ${product.name}
Descrição: ${product.description || ""}
Preço: R$ ${product.price}
Categoria: ${product.category || "Geral"}`,
          },
        ],
      }),
    });

    let captionData = { caption: "", hashtags: [], cta: "" };
    if (captionResponse.ok) {
      const aiData = await captionResponse.json();
      const content = aiData.choices?.[0]?.message?.content || "";
      try {
        const cleanContent = content.replace(/```json\n?|\n?```/g, "").trim();
        captionData = JSON.parse(cleanContent);
      } catch (e) {
        captionData.caption = content;
      }
    }

    // Generate image with DALL-E (product showcase style)
    const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

    const imagePrompt = `Professional product photography of "${product.name}" for social media. 
Clean, modern background with soft lighting. 
Product centered with lifestyle elements. 
High-end e-commerce style, Instagram-ready, 
vibrant colors, professional product showcase.
Square format, 1:1 aspect ratio.`;

    console.log("Generating social image with prompt:", imagePrompt);

    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
      quality: "hd",
      style: "vivid",
    });

    const generatedImageUrl = imageResponse.data[0]?.url;

    // Download and upload to storage
    let finalImageUrl = generatedImageUrl;
    if (generatedImageUrl) {
      try {
        const imgResponse = await fetch(generatedImageUrl);
        const imgBlob = await imgResponse.blob();
        const imgBuffer = await imgBlob.arrayBuffer();

        const fileName = `${user.id}/social/${Date.now()}-${productId}.png`;
        const { error: uploadError } = await supabaseClient.storage
          .from("logos")
          .upload(fileName, imgBuffer, {
            contentType: "image/png",
            upsert: true,
          });

        if (!uploadError) {
          const { data: { publicUrl } } = supabaseClient.storage
            .from("logos")
            .getPublicUrl(fileName);
          finalImageUrl = publicUrl;
        }
      } catch (e) {
        console.error("Error uploading social image:", e);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        product: {
          id: product.id,
          name: product.name,
        },
        platform,
        caption: captionData.caption,
        hashtags: captionData.hashtags,
        cta: captionData.cta,
        imageUrl: finalImageUrl,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in social-generator function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
