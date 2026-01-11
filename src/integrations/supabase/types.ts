export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          active: boolean | null
          code: string
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          requirement_category: string | null
          requirement_type: string | null
          requirement_value: number | null
          reward_credits: number | null
          reward_xp: number | null
        }
        Insert: {
          active?: boolean | null
          code: string
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          requirement_category?: string | null
          requirement_type?: string | null
          requirement_value?: number | null
          reward_credits?: number | null
          reward_xp?: number | null
        }
        Update: {
          active?: boolean | null
          code?: string
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          requirement_category?: string | null
          requirement_type?: string | null
          requirement_value?: number | null
          reward_credits?: number | null
          reward_xp?: number | null
        }
        Relationships: []
      }
      bundles: {
        Row: {
          active: boolean | null
          badge: string | null
          bundle_cost: number
          categories: Json
          created_at: string | null
          description: string | null
          id: string
          market_value: number | null
          name: string
          original_cost: number
          popular: boolean | null
          savings: number
          slug: string
        }
        Insert: {
          active?: boolean | null
          badge?: string | null
          bundle_cost: number
          categories: Json
          created_at?: string | null
          description?: string | null
          id?: string
          market_value?: number | null
          name: string
          original_cost: number
          popular?: boolean | null
          savings: number
          slug: string
        }
        Update: {
          active?: boolean | null
          badge?: string | null
          bundle_cost?: number
          categories?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          market_value?: number | null
          name?: string
          original_cost?: number
          popular?: boolean | null
          savings?: number
          slug?: string
        }
        Relationships: []
      }
      credit_packages: {
        Row: {
          active: boolean | null
          badge: string | null
          bonus: number | null
          created_at: string | null
          credits: number
          highlight: string | null
          id: string
          name: string
          popular: boolean | null
          price: number
          price_per_credit: number
          savings: number | null
          slug: string
        }
        Insert: {
          active?: boolean | null
          badge?: string | null
          bonus?: number | null
          created_at?: string | null
          credits: number
          highlight?: string | null
          id?: string
          name: string
          popular?: boolean | null
          price: number
          price_per_credit: number
          savings?: number | null
          slug: string
        }
        Update: {
          active?: boolean | null
          badge?: string | null
          bonus?: number | null
          created_at?: string | null
          credits?: number
          highlight?: string | null
          id?: string
          name?: string
          popular?: boolean | null
          price?: number
          price_per_credit?: number
          savings?: number | null
          slug?: string
        }
        Relationships: []
      }
      credit_transactions: {
        Row: {
          amount: number
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          metadata: Json | null
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      email_verifications: {
        Row: {
          created_at: string | null
          email: string
          expires_at: string
          id: string
          token: string
          type: string | null
          user_id: string
          verified_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          expires_at: string
          id?: string
          token: string
          type?: string | null
          user_id: string
          verified_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          token?: string
          type?: string | null
          user_id?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_status: Database["public"]["Enums"]["account_status"] | null
          avatar_url: string | null
          created_at: string | null
          current_streak: number | null
          daily_credits_used: number | null
          email: string
          email_verified: boolean | null
          experience_points: number | null
          favorite_category: string | null
          id: string
          last_activity_date: string | null
          last_reset_date: string | null
          level: number | null
          longest_streak: number | null
          name: string | null
          referral_code: string | null
          referred_by: string | null
          subscription_tier:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          total_credits: number | null
          total_generations: number | null
          total_saved_money: number | null
          updated_at: string | null
          user_id: string
          verification_sent_at: string | null
          verification_token: string | null
          verification_token_expires: string | null
        }
        Insert: {
          account_status?: Database["public"]["Enums"]["account_status"] | null
          avatar_url?: string | null
          created_at?: string | null
          current_streak?: number | null
          daily_credits_used?: number | null
          email: string
          email_verified?: boolean | null
          experience_points?: number | null
          favorite_category?: string | null
          id?: string
          last_activity_date?: string | null
          last_reset_date?: string | null
          level?: number | null
          longest_streak?: number | null
          name?: string | null
          referral_code?: string | null
          referred_by?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          total_credits?: number | null
          total_generations?: number | null
          total_saved_money?: number | null
          updated_at?: string | null
          user_id: string
          verification_sent_at?: string | null
          verification_token?: string | null
          verification_token_expires?: string | null
        }
        Update: {
          account_status?: Database["public"]["Enums"]["account_status"] | null
          avatar_url?: string | null
          created_at?: string | null
          current_streak?: number | null
          daily_credits_used?: number | null
          email?: string
          email_verified?: boolean | null
          experience_points?: number | null
          favorite_category?: string | null
          id?: string
          last_activity_date?: string | null
          last_reset_date?: string | null
          level?: number | null
          longest_streak?: number | null
          name?: string | null
          referral_code?: string | null
          referred_by?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          total_credits?: number | null
          total_generations?: number | null
          total_saved_money?: number | null
          updated_at?: string | null
          user_id?: string
          verification_sent_at?: string | null
          verification_token?: string | null
          verification_token_expires?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_referred_by_fkey"
            columns: ["referred_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          code: string | null
          created_at: string
          id: string
          name: string
          prompt: string
          updated_at: string
          user_id: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          id?: string
          name: string
          prompt: string
          updated_at?: string
          user_id: string
        }
        Update: {
          code?: string | null
          created_at?: string
          id?: string
          name?: string
          prompt?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      promotion_uses: {
        Row: {
          id: string
          promotion_id: string
          used_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          promotion_id: string
          used_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          promotion_id?: string
          used_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "promotion_uses_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: false
            referencedRelation: "promotions"
            referencedColumns: ["id"]
          },
        ]
      }
      promotions: {
        Row: {
          active: boolean | null
          code: string
          created_at: string | null
          current_uses: number | null
          id: string
          max_uses: number | null
          type: string
          valid_from: string
          valid_until: string
          value: number
        }
        Insert: {
          active?: boolean | null
          code: string
          created_at?: string | null
          current_uses?: number | null
          id?: string
          max_uses?: number | null
          type: string
          valid_from: string
          valid_until: string
          value: number
        }
        Update: {
          active?: boolean | null
          code?: string
          created_at?: string | null
          current_uses?: number | null
          id?: string
          max_uses?: number | null
          type?: string
          valid_from?: string
          valid_until?: string
          value?: number
        }
        Relationships: []
      }
      referrals: {
        Row: {
          completed_at: string | null
          created_at: string | null
          credits_earned: number | null
          id: string
          referred_id: string
          referrer_id: string
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          credits_earned?: number | null
          id?: string
          referred_id: string
          referrer_id: string
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          credits_earned?: number | null
          id?: string
          referred_id?: string
          referrer_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referred_id_fkey"
            columns: ["referred_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_profile_id: { Args: { _user_id: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      account_status: "pending" | "active" | "suspended" | "deleted"
      app_role: "admin" | "moderator" | "user"
      subscription_tier: "free" | "starter" | "pro" | "enterprise"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_status: ["pending", "active", "suspended", "deleted"],
      app_role: ["admin", "moderator", "user"],
      subscription_tier: ["free", "starter", "pro", "enterprise"],
    },
  },
} as const
