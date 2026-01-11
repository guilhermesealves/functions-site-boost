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

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/credits/balance`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao buscar créditos");
      }

      const data = await response.json();
      setBalance(data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching credits:", err);
      setError(err.message);
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
