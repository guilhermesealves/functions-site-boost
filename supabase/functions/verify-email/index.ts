import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VerifyEmailRequest {
  token: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token }: VerifyEmailRequest = await req.json();

    if (!token) {
      return new Response(
        JSON.stringify({ error: "Token é obrigatório", code: "MISSING_TOKEN" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find verification record
    const { data: verification, error: findError } = await supabase
      .from("email_verifications")
      .select("*")
      .eq("token", token)
      .is("verified_at", null)
      .single();

    if (findError || !verification) {
      return new Response(
        JSON.stringify({ error: "Token inválido ou já utilizado", code: "INVALID_TOKEN" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if token is expired
    if (new Date(verification.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: "Token expirado. Solicite um novo.", code: "EXPIRED_TOKEN" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = verification.user_id;
    const now = new Date().toISOString();

    // Mark verification as complete
    await supabase
      .from("email_verifications")
      .update({ verified_at: now })
      .eq("id", verification.id);

    // Update profile
    const { data: profile } = await supabase
      .from("profiles")
      .update({
        email_verified: true,
        account_status: "active",
        verification_token: null,
        verification_token_expires: null,
        // Add welcome credits: 5 (verification) + 10 (welcome) = 15
        total_credits: 15
      })
      .eq("user_id", userId)
      .select()
      .single();

    // Record credit transaction
    await supabase.from("credit_transactions").insert([
      {
        user_id: userId,
        amount: 5,
        category: "bonus",
        type: "verification_bonus",
        description: "Bônus de verificação de email",
        metadata: { verification_id: verification.id }
      },
      {
        user_id: userId,
        amount: 10,
        category: "bonus",
        type: "welcome_bonus",
        description: "Bônus de boas-vindas",
        metadata: { verification_id: verification.id }
      }
    ]);

    // Record achievements
    const { data: achievements } = await supabase
      .from("achievements")
      .select("id, code")
      .in("code", ["email_verified", "welcome_bonus"]);

    if (achievements && achievements.length > 0) {
      const userAchievements = achievements.map(ach => ({
        user_id: userId,
        achievement_id: ach.id
      }));

      await supabase.from("user_achievements").insert(userAchievements);
    }

    // Create welcome notification
    await supabase.from("notifications").insert({
      user_id: userId,
      type: "verification_success",
      title: "🎉 Email Verificado!",
      message: "Parabéns! Você ganhou 15 créditos de boas-vindas. Comece a criar agora!",
      action_url: "/builder"
    });

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Email verificado com sucesso!",
        creditsEarned: 15,
        profile: {
          name: profile?.name,
          email: profile?.email,
          total_credits: profile?.total_credits
        }
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in verify-email:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Erro ao verificar email", code: "SERVER_ERROR" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
