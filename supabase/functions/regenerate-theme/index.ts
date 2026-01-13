import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Color palette options
const colorPalettes = [
  { primary: "#8B5CF6", secondary: "#EC4899", accent: "#F59E0B" }, // Purple/Pink
  { primary: "#3B82F6", secondary: "#10B981", accent: "#F97316" }, // Blue/Green
  { primary: "#EF4444", secondary: "#F59E0B", accent: "#8B5CF6" }, // Red/Orange
  { primary: "#06B6D4", secondary: "#8B5CF6", accent: "#EC4899" }, // Cyan/Purple
  { primary: "#10B981", secondary: "#3B82F6", accent: "#EF4444" }, // Green/Blue
  { primary: "#F59E0B", secondary: "#EF4444", accent: "#3B82F6" }, // Orange/Red
  { primary: "#EC4899", secondary: "#06B6D4", accent: "#10B981" }, // Pink/Cyan
  { primary: "#6366F1", secondary: "#F97316", accent: "#14B8A6" }, // Indigo/Orange
];

const fontFamilies = [
  "Inter",
  "Poppins",
  "Roboto",
  "Open Sans",
  "Montserrat",
  "Lato",
  "Raleway",
  "Nunito",
];

const bannerLayouts = [
  "centered",
  "left-aligned",
  "right-aligned",
  "split",
  "overlay",
  "minimal",
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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

    // Get current store
    const { data: store, error: storeError } = await supabaseClient
      .from("stores")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (storeError) {
      console.error("Error fetching store:", storeError);
    }

    // Generate random new theme
    const randomPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    const randomFont = fontFamilies[Math.floor(Math.random() * fontFamilies.length)];
    const randomLayout = bannerLayouts[Math.floor(Math.random() * bannerLayouts.length)];

    const newThemeConfig = {
      primaryColor: randomPalette.primary,
      secondaryColor: randomPalette.secondary,
      accentColor: randomPalette.accent,
      backgroundColor: "#FFFFFF",
      textColor: "#1F2937",
      fontFamily: randomFont,
      bannerLayout: randomLayout,
    };

    if (store) {
      // Update existing store
      const { error: updateError } = await supabaseClient
        .from("stores")
        .update({ theme_config: newThemeConfig })
        .eq("id", store.id);

      if (updateError) {
        console.error("Error updating theme:", updateError);
        throw new Error("Erro ao atualizar tema");
      }
    } else {
      // Create new store with theme
      const { error: insertError } = await supabaseClient
        .from("stores")
        .insert({
          user_id: user.id,
          name: "Minha Loja",
          theme_config: newThemeConfig,
        });

      if (insertError) {
        console.error("Error creating store:", insertError);
        throw new Error("Erro ao criar loja");
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        themeConfig: newThemeConfig,
        message: "Tema atualizado com sucesso!",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in regenerate-theme function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
