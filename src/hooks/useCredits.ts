import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CreditBalance {
  daily: {
    used: number;
    limit: number;
    remaining: number;
  };
  purchased: number;
  total: number;
  tier: string;
  level: number;
  xp: number;
  streak: number;
}

interface ConsumeResult {
  success: boolean;
  creditsUsed: number;
  breakdown: { daily: number; purchased: number };
  remaining: number;
  xp: { gained: number; total: number; oldLevel: number; newLevel: number; leveledUp: boolean };
  savedMoney: number;
  streak: number;
}

export function useCredits() {
  const [balance, setBalance] = useState<CreditBalance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setBalance(null);
        setLoading(false);
        return;
      }

      // Try edge function first
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/credits/balance`,
          {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setBalance(data);
          setError(null);
          setLoading(false);
          return;
        }
      } catch (fetchErr) {
        console.log("Edge function not available, falling back to direct query");
      }

      // Fallback: fetch directly from profiles table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      if (profileError || !profile) {
        // Create default balance for new users
        setBalance({
          daily: { used: 0, limit: 5, remaining: 5 },
          purchased: 0,
          total: 5,
          tier: "free",
          level: 1,
          xp: 0,
          streak: 0
        });
      } else {
        const dailyLimit = profile.subscription_tier === "pro" ? 30 : 
                          profile.subscription_tier === "starter" ? 15 : 
                          profile.subscription_tier === "enterprise" ? 100 : 5;
        const dailyUsed = profile.daily_credits_used || 0;
        const dailyRemaining = Math.max(0, dailyLimit - dailyUsed);
        
        setBalance({
          daily: { 
            used: dailyUsed, 
            limit: dailyLimit, 
            remaining: dailyRemaining 
          },
          purchased: profile.total_credits || 0,
          total: dailyRemaining + (profile.total_credits || 0),
          tier: profile.subscription_tier || "free",
          level: profile.level || 1,
          xp: profile.experience_points || 0,
          streak: profile.current_streak || 0
        });
      }
      setError(null);
    } catch (err: any) {
      console.error("Error fetching credits:", err);
      setError(err.message);
      // Set default balance even on error
      setBalance({
        daily: { used: 0, limit: 5, remaining: 5 },
        purchased: 0,
        total: 5,
        tier: "free",
        level: 1,
        xp: 0,
        streak: 0
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBalance();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchBalance();
    });

    return () => subscription.unsubscribe();
  }, [fetchBalance]);

  const consumeCredits = useCallback(async (category: string, metadata?: Record<string, any>): Promise<ConsumeResult> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error("Não autenticado");
    }

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/credits/consume`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category, metadata }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erro ao consumir créditos");
    }

    // Refresh balance after consuming
    await fetchBalance();

    return data;
  }, [fetchBalance]);

  const addCredits = useCallback(async (amount: number, description?: string): Promise<{ success: boolean; newBalance: number }> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error("Não autenticado");
    }

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/credits/add`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, description }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erro ao adicionar créditos");
    }

    await fetchBalance();

    return data;
  }, [fetchBalance]);

  return {
    balance,
    loading,
    error,
    refreshBalance: fetchBalance,
    consumeCredits,
    addCredits,
  };
}
