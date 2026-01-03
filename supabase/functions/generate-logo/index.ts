import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, style } = await req.json();
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Prompt é obrigatório" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error("OPENAI_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "API key não configurada" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build professional logo prompt
    const styleGuide = {
      minimal: "ultra minimalist, clean lines, simple geometric shapes, single color accent",
      luxury: "elegant, premium, gold accents, sophisticated typography, high-end feel",
      modern: "contemporary, bold, vibrant colors, dynamic shapes, tech-forward",
      feminine: "soft colors, rose gold, flowing lines, elegant curves, delicate typography",
      corporate: "professional, trustworthy, blue tones, structured, clean typography",
      playful: "colorful, fun, rounded shapes, friendly, approachable design",
      vintage: "retro aesthetic, classic typography, nostalgic feel, timeless design"
    };

    const selectedStyle = styleGuide[style as keyof typeof styleGuide] || styleGuide.modern;

    const enhancedPrompt = `Professional logo design for: ${prompt}. 
Style: ${selectedStyle}.
Requirements: 
- Clean, scalable vector-style design
- Centered composition on pure white background
- No text unless specifically requested
- Professional quality suitable for business use
- Simple, memorable, iconic
- High contrast for visibility at any size
- Suitable for both digital and print
Output: High-quality logo design, centered, professional, agency-level quality.`;

    console.log("Generating logo with prompt:", enhancedPrompt);

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt: enhancedPrompt,
        n: 1,
        size: '1024x1024',
        quality: 'high',
        background: 'opaque',
        output_format: 'png'
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      return new Response(
        JSON.stringify({ error: `Erro na API: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log("Logo generated successfully");

    // gpt-image-1 returns base64 directly
    const imageData = data.data?.[0]?.b64_json;
    
    if (!imageData) {
      console.error("No image data in response:", data);
      return new Response(
        JSON.stringify({ error: "Nenhuma imagem gerada" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        imageUrl: `data:image/png;base64,${imageData}`,
        prompt: prompt,
        style: style || 'modern'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro ao gerar logo';
    console.error('Error in generate-logo function:', error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
