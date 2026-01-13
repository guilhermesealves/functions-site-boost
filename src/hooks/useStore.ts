import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Store {
  id: string;
  user_id: string;
  name: string;
  logo_url: string | null;
  brand_voice: any | null;
  theme_config: any | null;
  created_at: string;
  updated_at: string;
}

export function useStore() {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStore = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setStore(null);
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("stores")
        .select("*")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (fetchError) {
        throw fetchError;
      }

      setStore(data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching store:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStore();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchStore();
    });

    return () => subscription.unsubscribe();
  }, [fetchStore]);

  const createStore = useCallback(async (name: string): Promise<Store> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error("Não autenticado");
    }

    const { data, error: insertError } = await supabase
      .from("stores")
      .insert({
        user_id: session.user.id,
        name
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    setStore(data);
    return data;
  }, []);

  const updateStore = useCallback(async (updates: Partial<Store>): Promise<Store> => {
    if (!store) {
      throw new Error("Nenhuma empresa encontrada");
    }

    const { data, error: updateError } = await supabase
      .from("stores")
      .update(updates)
      .eq("id", store.id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    setStore(data);
    return data;
  }, [store]);

  return {
    store,
    loading,
    error,
    hasStore: !!store,
    refreshStore: fetchStore,
    createStore,
    updateStore,
  };
}
