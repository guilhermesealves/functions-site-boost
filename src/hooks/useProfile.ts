import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

interface Profile {
  id: string;
  user_id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  subscription_tier: "free" | "starter" | "pro" | "enterprise";
  total_credits: number;
  daily_credits_used: number;
  email_verified: boolean;
  account_status: "pending" | "active" | "suspended" | "deleted";
  referral_code: string | null;
  level: number;
  experience_points: number;
  current_streak: number;
  longest_streak: number;
  total_generations: number;
  total_saved_money: number;
  created_at: string;
}

export function useProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (fetchError) {
        // Profile might not exist yet if trigger hasn't run
        if (fetchError.code === "PGRST116") {
          setProfile(null);
          return;
        }
        throw fetchError;
      }

      setProfile(data as Profile);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching profile:", err);
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Initial fetch
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchProfile(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  const updateProfile = useCallback(async (updates: Partial<Profile>) => {
    if (!user) throw new Error("Não autenticado");

    const { data, error: updateError } = await supabase
      .from("profiles")
      .update(updates)
      .eq("user_id", user.id)
      .select()
      .single();

    if (updateError) throw updateError;

    setProfile(data as Profile);
    return data;
  }, [user]);

  return {
    user,
    profile,
    loading,
    error,
    refreshProfile,
    updateProfile,
    isVerified: profile?.email_verified ?? false,
    isActive: profile?.account_status === "active",
  };
}
