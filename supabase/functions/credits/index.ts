import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Category costs configuration
const CATEGORY_COSTS: Record<string, { cost: number; name: string; marketValue: number; xp: number }> = {
  logo: { cost: 1.0, name: "Geração de Logo", marketValue: 150, xp: 50 },
  website: { cost: 0.9, name: "Criação de Site", marketValue: 500, xp: 45 },
  branding: { cost: 1.0, name: "Kit de Branding", marketValue: 800, xp: 50 },
  "social-media": { cost: 0.7, name: "Posts para Redes", marketValue: 80, xp: 35 },
  banner: { cost: 0.8, name: "Banners", marketValue: 120, xp: 40 },
  "business-card": { cost: 0.6, name: "Cartão de Visita", marketValue: 60, xp: 30 },
  presentation: { cost: 1.0, name: "Apresentações", marketValue: 200, xp: 50 },
  "color-palette": { cost: 0.5, name: "Paleta de Cores", marketValue: 50, xp: 25 },
  slogan: { cost: 0.5, name: "Slogans", marketValue: 100, xp: 25 },
  mockup: { cost: 0.8, name: "Mockups 3D", marketValue: 90, xp: 40 },
  business: { cost: 0.8, name: "Plano de Negócio", marketValue: 300, xp: 40 },
  marketing: { cost: 0.7, name: "Marketing", marketValue: 150, xp: 35 },
  sales: { cost: 0.7, name: "Vendas", marketValue: 120, xp: 35 },
  copywriter: { cost: 0.6, name: "Copywriter", marketValue: 100, xp: 30 }
};

// Subscription plans
const SUBSCRIPTION_PLANS: Record<string, { dailyCredits: number }> = {
  free: { dailyCredits: 5 },
  starter: { dailyCredits: 15 },
  pro: { dailyCredits: 30 },
  enterprise: { dailyCredits: 100 }
};

const calculateLevel = (xp: number): number => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const url = new URL(req.url);
    const action = url.pathname.split("/").pop();

    // Get auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Não autorizado" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify user
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Token inválido" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = user.id;

    // Get user profile or create if not exists
    let { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    // If profile doesn't exist, create it automatically
    if (profileError || !profile) {
      const { data: newProfile, error: createError } = await supabase
        .from("profiles")
        .insert({
          user_id: userId,
          email: user.email || "",
          name: user.user_metadata?.name || user.email?.split("@")[0] || "Usuário",
          subscription_tier: "free",
          total_credits: 5,
          daily_credits_used: 0,
          email_verified: user.email_confirmed_at ? true : false,
          account_status: "active",
          level: 1,
          experience_points: 0,
          current_streak: 0,
          longest_streak: 0,
          total_generations: 0,
          total_saved_money: 0
        })
        .select()
        .single();

      if (createError || !newProfile) {
        console.error("Error creating profile:", createError);
        return new Response(
          JSON.stringify({ error: "Erro ao criar perfil" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      profile = newProfile;
    }

    // For balance check, allow unverified users to see their credits
    // Only block for consume and add actions
    if (action !== "balance" && !profile.email_verified) {
      return new Response(
        JSON.stringify({ error: "Verifique seu email para usar esta funcionalidade", code: "EMAIL_NOT_VERIFIED" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = req.method === "POST" ? await req.json() : {};

    switch (action) {
      case "balance": {
        // Reset daily credits if new day
        const today = new Date().toISOString().split("T")[0];
        let dailyUsed = profile.daily_credits_used || 0;
        
        if (profile.last_reset_date !== today) {
          await supabase
            .from("profiles")
            .update({ 
              daily_credits_used: 0, 
              last_reset_date: today 
            })
            .eq("user_id", userId);
          dailyUsed = 0;
        }

        const plan = SUBSCRIPTION_PLANS[profile.subscription_tier || "free"];
        const dailyRemaining = Math.max(0, plan.dailyCredits - dailyUsed);

        return new Response(
          JSON.stringify({
            daily: {
              used: dailyUsed,
              limit: plan.dailyCredits,
              remaining: dailyRemaining
            },
            purchased: profile.total_credits || 0,
            total: dailyRemaining + (profile.total_credits || 0),
            tier: profile.subscription_tier || "free",
            level: profile.level || 1,
            xp: profile.experience_points || 0,
            streak: profile.current_streak || 0
          }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "consume": {
        const { category, metadata = {} } = body;
        
        if (!category || !CATEGORY_COSTS[category]) {
          return new Response(
            JSON.stringify({ error: "Categoria inválida" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const categoryInfo = CATEGORY_COSTS[category];
        const cost = categoryInfo.cost;
        
        // Reset daily if needed
        const today = new Date().toISOString().split("T")[0];
        let dailyUsed = profile.daily_credits_used || 0;
        
        if (profile.last_reset_date !== today) {
          dailyUsed = 0;
        }

        const plan = SUBSCRIPTION_PLANS[profile.subscription_tier || "free"];
        const dailyRemaining = Math.max(0, plan.dailyCredits - dailyUsed);
        const totalAvailable = dailyRemaining + (profile.total_credits || 0);

        if (totalAvailable < cost) {
          return new Response(
            JSON.stringify({ error: "Créditos insuficientes", code: "INSUFFICIENT_CREDITS" }),
            { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Calculate credit usage
        let dailyToUse = 0;
        let purchasedToUse = 0;

        if (dailyRemaining >= cost) {
          dailyToUse = cost;
        } else if (dailyRemaining > 0) {
          dailyToUse = dailyRemaining;
          purchasedToUse = cost - dailyRemaining;
        } else {
          purchasedToUse = cost;
        }

        // Calculate XP and level
        const xpGained = categoryInfo.xp;
        const newXP = (profile.experience_points || 0) + xpGained;
        const oldLevel = calculateLevel(profile.experience_points || 0);
        const newLevel = calculateLevel(newXP);
        const leveledUp = newLevel > oldLevel;

        // Update streak
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        let newStreak = profile.current_streak || 0;
        
        if (profile.last_activity_date === yesterday) {
          newStreak += 1;
        } else if (profile.last_activity_date !== today) {
          newStreak = 1;
        }

        const longestStreak = Math.max(newStreak, profile.longest_streak || 0);

        // Update profile
        await supabase
          .from("profiles")
          .update({
            daily_credits_used: dailyUsed + dailyToUse,
            total_credits: (profile.total_credits || 0) - purchasedToUse,
            last_reset_date: today,
            experience_points: newXP,
            level: newLevel,
            current_streak: newStreak,
            longest_streak: longestStreak,
            total_generations: (profile.total_generations || 0) + 1,
            total_saved_money: (profile.total_saved_money || 0) + categoryInfo.marketValue,
            last_activity_date: today
          })
          .eq("user_id", userId);

        // Record transaction
        await supabase.from("credit_transactions").insert({
          user_id: userId,
          amount: -cost,
          category: category,
          type: dailyToUse > 0 ? "daily_use" : "purchase_use",
          description: `${categoryInfo.name} gerado`,
          metadata: {
            ...metadata,
            daily_used: dailyToUse,
            purchased_used: purchasedToUse,
            xp_gained: xpGained,
            market_value: categoryInfo.marketValue
          }
        });

        // Check achievements
        const totalGenerations = (profile.total_generations || 0) + 1;
        const achievementsToCheck = [];

        // Category achievements
        if (category === "logo") {
          achievementsToCheck.push("first_logo");
          if (totalGenerations >= 10) achievementsToCheck.push("logo_master");
        }
        if (category === "website") {
          achievementsToCheck.push("first_website");
          if (totalGenerations >= 10) achievementsToCheck.push("website_master");
        }
        
        // Streak achievements
        if (newStreak >= 7) achievementsToCheck.push("streak_7");
        if (newStreak >= 30) achievementsToCheck.push("streak_30");
        
        // Total generations
        if (totalGenerations >= 100) achievementsToCheck.push("generation_100");

        // Grant new achievements
        if (achievementsToCheck.length > 0) {
          const { data: existingAchievements } = await supabase
            .from("user_achievements")
            .select("achievement_id")
            .eq("user_id", userId);

          const existingIds = existingAchievements?.map(a => a.achievement_id) || [];

          const { data: newAchievements } = await supabase
            .from("achievements")
            .select("*")
            .in("code", achievementsToCheck)
            .not("id", "in", `(${existingIds.join(",")})`);

          if (newAchievements && newAchievements.length > 0) {
            for (const ach of newAchievements) {
              await supabase.from("user_achievements").insert({
                user_id: userId,
                achievement_id: ach.id
              });

              if (ach.reward_credits > 0) {
                await supabase
                  .from("profiles")
                  .update({ 
                    total_credits: (profile.total_credits || 0) + ach.reward_credits,
                    experience_points: newXP + ach.reward_xp
                  })
                  .eq("user_id", userId);
              }

              await supabase.from("notifications").insert({
                user_id: userId,
                type: "achievement",
                title: `${ach.icon} Conquista Desbloqueada!`,
                message: `${ach.name}: ${ach.description}. Você ganhou ${ach.reward_credits} créditos!`,
                action_url: "/achievements"
              });
            }
          }
        }

        // Level up notification
        if (leveledUp) {
          await supabase.from("notifications").insert({
            user_id: userId,
            type: "level_up",
            title: `🎉 Nível ${newLevel} Alcançado!`,
            message: `Parabéns! Continue criando para subir ainda mais de nível.`,
            action_url: "/builder"
          });
        }

        const newBalance = dailyRemaining - dailyToUse + (profile.total_credits || 0) - purchasedToUse;

        return new Response(
          JSON.stringify({
            success: true,
            creditsUsed: cost,
            breakdown: { daily: dailyToUse, purchased: purchasedToUse },
            remaining: newBalance,
            xp: { gained: xpGained, total: newXP, oldLevel, newLevel, leveledUp },
            savedMoney: categoryInfo.marketValue,
            streak: newStreak
          }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "add": {
        const { amount, description, type = "purchase" } = body;
        
        if (!amount || amount <= 0) {
          return new Response(
            JSON.stringify({ error: "Quantidade inválida" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        await supabase
          .from("profiles")
          .update({ 
            total_credits: (profile.total_credits || 0) + amount 
          })
          .eq("user_id", userId);

        await supabase.from("credit_transactions").insert({
          user_id: userId,
          amount: amount,
          category: "purchase",
          type: type,
          description: description || "Compra de créditos"
        });

        return new Response(
          JSON.stringify({
            success: true,
            creditsAdded: amount,
            newBalance: (profile.total_credits || 0) + amount
          }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: "Ação não encontrada" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
  } catch (error: any) {
    console.error("Credits error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Erro interno" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
