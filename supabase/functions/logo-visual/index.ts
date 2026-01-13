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
    const { brandName, style, niche } = await req.json();
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY não configurada");
    }

    if (!brandName || !style) {
      return new Response(
        JSON.stringify({ error: "Nome da marca e estilo são obrigatórios" }),
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

    const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

    // Style mappings for DALL-E prompt
    const styleGuides: Record<string, string> = {
      minimalista: "minimalist, clean lines, simple geometric shapes, lots of white space, modern",
      moderno: "contemporary, sleek, bold colors, geometric patterns, professional",
      vintage: "retro, classic, nostalgic, warm colors, ornate details, timeless",
      elegante: "luxurious, sophisticated, refined, gold accents, premium feel",
      divertido: "playful, colorful, friendly, rounded shapes, energetic",
      corporativo: "professional, trustworthy, clean, blue tones, structured",
      artesanal: "handcrafted, organic, natural textures, warm, authentic",
      tecnologico: "futuristic, digital, gradient colors, tech-inspired, innovative",
    };

    const styleDescription = styleGuides[style.toLowerCase()] || style;

    // Generate logo with DALL-E 3
    const logoPrompt = `Create a professional logo for a brand called "${brandName}"${niche ? ` in the ${niche} industry` : ""}. 
Style: ${styleDescription}. 
The logo should be:
- Vector-style, suitable for business use
- Iconic and memorable
- Work well in both color and monochrome
- Have a transparent or white background
- Professional quality suitable for a real business`;

    console.log("Generating logo with prompt:", logoPrompt);

    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: logoPrompt,
      n: 1,
      size: "1024x1024",
      quality: "hd",
      style: "vivid",
    });

    const logoUrl = imageResponse.data[0]?.url;
    if (!logoUrl) {
      throw new Error("Falha ao gerar logo");
    }

    // Download the image and upload to Supabase Storage
    const imageResponse2 = await fetch(logoUrl);
    const imageBlob = await imageResponse2.blob();
    const imageBuffer = await imageBlob.arrayBuffer();

    const fileName = `${user.id}/${Date.now()}-logo.png`;
    const { data: uploadData, error: uploadError } = await supabaseClient.storage
      .from("logos")
      .upload(fileName, imageBuffer, {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError) {
      console.error("Error uploading logo:", uploadError);
    }

    const { data: { publicUrl } } = supabaseClient.storage
      .from("logos")
      .getPublicUrl(fileName);

    // Generate color palette using Lovable AI
    const colorResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
            content: `Você é um designer especialista em cores. Gere uma paleta de cores para uma marca.
Retorne APENAS um JSON com esta estrutura:
{
  "primaryColor": "#hexcode",
  "secondaryColor": "#hexcode",
  "accentColor": "#hexcode",
  "backgroundColor": "#hexcode",
  "textColor": "#hexcode"
}
Sem explicações, apenas o JSON.`,
          },
          {
            role: "user",
            content: `Crie uma paleta de cores para a marca "${brandName}" com estilo ${style}${niche ? ` no nicho de ${niche}` : ""}. As cores devem combinar entre si e transmitir a essência da marca.`,
          },
        ],
      }),
    });

    let colorPalette = {
      primaryColor: "#8B5CF6",
      secondaryColor: "#EC4899",
      accentColor: "#F59E0B",
      backgroundColor: "#FFFFFF",
      textColor: "#1F2937",
    };

    if (colorResponse.ok) {
      const colorData = await colorResponse.json();
      const colorContent = colorData.choices?.[0]?.message?.content || "";
      try {
        const cleanContent = colorContent.replace(/```json\n?|\n?```/g, "").trim();
        colorPalette = { ...colorPalette, ...JSON.parse(cleanContent) };
      } catch (e) {
        console.error("Error parsing color palette:", e);
      }
    }

    // Update or create store with logo and theme
    const themeConfig = {
      ...colorPalette,
      fontFamily: "Inter",
      bannerLayout: "centered",
      style,
    };

    const { data: existingStore } = await supabaseClient
      .from("stores")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (existingStore) {
      await supabaseClient
        .from("stores")
        .update({
          logo_url: publicUrl,
          theme_config: themeConfig,
        })
        .eq("id", existingStore.id);
    } else {
      await supabaseClient
        .from("stores")
        .insert({
          user_id: user.id,
          name: brandName,
          logo_url: publicUrl,
          theme_config: themeConfig,
        });
    }

    return new Response(
      JSON.stringify({
        success: true,
        logoUrl: publicUrl,
        colorPalette,
        themeConfig,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in logo-visual function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
