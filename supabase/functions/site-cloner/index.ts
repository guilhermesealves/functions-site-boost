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
    const { url } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

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

    // Fetch the external site
    console.log("Cloning site:", url);
    const pageResponse = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!pageResponse.ok) {
      throw new Error("Não foi possível acessar a URL");
    }

    const html = await pageResponse.text();

    // Extract product-like data with regex (simplified scraping)
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const priceMatches = html.match(/R\$\s*[\d.,]+/g) || [];
    const imageMatches = html.match(/<img[^>]+src=["']([^"']+)["']/gi) || [];

    // Extract image URLs
    const imageUrls = imageMatches
      .map(img => {
        const match = img.match(/src=["']([^"']+)["']/i);
        return match ? match[1] : null;
      })
      .filter(Boolean)
      .filter(imgUrl => {
        if (!imgUrl) return false;
        const lower = imgUrl.toLowerCase();
        return (lower.includes("product") || lower.includes("item") || 
                lower.endsWith(".jpg") || lower.endsWith(".png") || lower.endsWith(".webp")) &&
               !lower.includes("logo") && !lower.includes("icon") && !lower.includes("banner");
      })
      .slice(0, 10) as string[];

    // Use AI to extract structured product data
    const textContent = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 8000);

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
            content: `Você é um especialista em extração de dados de e-commerce.
Analise o conteúdo de uma página e extraia informações de produtos.

Retorne um JSON com array de produtos encontrados:
{
  "products": [
    {
      "name": "Nome do produto",
      "description": "Descrição",
      "price": 99.90,
      "category": "Categoria"
    }
  ],
  "storeName": "Nome da loja",
  "storeDescription": "Descrição da loja"
}`,
          },
          {
            role: "user",
            content: `Extraia os produtos desta página:\n\n${textContent}`,
          },
        ],
      }),
    });

    let extractedData = { products: [], storeName: "", storeDescription: "" };
    if (response.ok) {
      const aiData = await response.json();
      const content = aiData.choices?.[0]?.message?.content || "";
      try {
        const cleanContent = content.replace(/```json\n?|\n?```/g, "").trim();
        extractedData = JSON.parse(cleanContent);
      } catch (e) {
        console.error("Error parsing extracted data:", e);
      }
    }

    // Download and upload images to storage
    const uploadedImages: string[] = [];
    for (let i = 0; i < Math.min(imageUrls.length, 5); i++) {
      try {
        let imgUrl = imageUrls[i];
        if (imgUrl.startsWith("//")) imgUrl = "https:" + imgUrl;
        if (imgUrl.startsWith("/")) imgUrl = new URL(imgUrl, url).href;

        const imgResponse = await fetch(imgUrl);
        if (imgResponse.ok) {
          const imgBlob = await imgResponse.blob();
          const imgBuffer = await imgBlob.arrayBuffer();

          const ext = imgUrl.split(".").pop()?.split("?")[0] || "jpg";
          const fileName = `${user.id}/cloned/${Date.now()}-${i}.${ext}`;

          const { error: uploadError } = await supabaseClient.storage
            .from("logos")
            .upload(fileName, imgBuffer, {
              contentType: imgBlob.type || "image/jpeg",
              upsert: true,
            });

          if (!uploadError) {
            const { data: { publicUrl } } = supabaseClient.storage
              .from("logos")
              .getPublicUrl(fileName);
            uploadedImages.push(publicUrl);
          }
        }
      } catch (e) {
        console.error("Error downloading image:", e);
      }
    }

    // Insert products into database
    const insertedProducts = [];
    for (let i = 0; i < extractedData.products.length; i++) {
      const product = extractedData.products[i] as any;
      const { data: savedProduct, error: saveError } = await supabaseClient
        .from("products")
        .insert({
          user_id: user.id,
          name: product.name || `Produto ${i + 1}`,
          description: product.description || "",
          price: product.price || 0,
          category: product.category || "Importado",
          images: uploadedImages.length > i ? [uploadedImages[i]] : [],
          is_active: true,
        })
        .select()
        .single();

      if (!saveError && savedProduct) {
        insertedProducts.push(savedProduct);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        sourceUrl: url,
        storeName: extractedData.storeName || titleMatch?.[1] || "Loja Clonada",
        productsFound: extractedData.products.length,
        productsImported: insertedProducts.length,
        imagesUploaded: uploadedImages.length,
        products: insertedProducts,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in site-cloner function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
