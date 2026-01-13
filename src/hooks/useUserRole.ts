import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

type AppRole = "admin" | "moderator" | "user";

export function useUserRole() {
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchRoles = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching roles:", error);
        return;
      }

      const userRoles = data?.map(r => r.role as AppRole) || [];
      setRoles(userRoles);
      setIsAdmin(userRoles.includes("admin"));
    } catch (err) {
      console.error("Error in fetchRoles:", err);
    }
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await fetchRoles(session.user.id);
        } else {
          setRoles([]);
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    // Initial fetch
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        await fetchRoles(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchRoles]);

  const hasRole = useCallback((role: AppRole) => {
    return roles.includes(role);
  }, [roles]);

  return {
    roles,
    loading,
    isAdmin,
    hasRole,
  };
}
