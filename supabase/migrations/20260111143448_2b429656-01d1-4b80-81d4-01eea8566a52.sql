-- ============================================
-- SISTEMA DE CRÉDITOS COM GAMIFICAÇÃO E VERIFICAÇÃO
-- ============================================

-- 1. ENUM para roles de usuário
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- 2. ENUM para níveis de assinatura
CREATE TYPE public.subscription_tier AS ENUM ('free', 'starter', 'pro', 'enterprise');

-- 3. ENUM para status da conta
CREATE TYPE public.account_status AS ENUM ('pending', 'active', 'suspended', 'deleted');

-- 4. Tabela de perfis de usuário (com sistema de créditos e gamificação)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  
  -- Assinatura e créditos
  subscription_tier subscription_tier DEFAULT 'free',
  total_credits DECIMAL(10,2) DEFAULT 0,
  daily_credits_used DECIMAL(10,2) DEFAULT 0,
  last_reset_date DATE DEFAULT CURRENT_DATE,
  
  -- Verificação de email
  email_verified BOOLEAN DEFAULT false,
  verification_token VARCHAR(255),
  verification_token_expires TIMESTAMP WITH TIME ZONE,
  verification_sent_at TIMESTAMP WITH TIME ZONE,
  account_status account_status DEFAULT 'pending',
  
  -- Referência
  referral_code VARCHAR(20) UNIQUE,
  referred_by UUID REFERENCES public.profiles(id),
  
  -- Gamificação
  level INTEGER DEFAULT 1,
  experience_points INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  total_generations INTEGER DEFAULT 0,
  
  -- Estatísticas
  total_saved_money DECIMAL(10,2) DEFAULT 0,
  favorite_category VARCHAR(100),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tabela de roles de usuários
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- 6. Transações de Créditos
CREATE TABLE public.credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category VARCHAR(100),
  type VARCHAR(50) NOT NULL,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Sistema de Referência
CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  referred_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  credits_earned DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- 8. Conquistas/Badges
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  reward_credits DECIMAL(10,2) DEFAULT 0,
  reward_xp INTEGER DEFAULT 0,
  requirement_type VARCHAR(50),
  requirement_value INTEGER,
  requirement_category VARCHAR(100),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Conquistas dos Usuários
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- 10. Promoções Ativas
CREATE TABLE public.promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  type VARCHAR(50) NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  valid_from TIMESTAMP WITH TIME ZONE NOT NULL,
  valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Uso de Promoções
CREATE TABLE public.promotion_uses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  promotion_id UUID REFERENCES public.promotions(id) ON DELETE CASCADE NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, promotion_id)
);

-- 12. Bundles/Kits
CREATE TABLE public.bundles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  categories JSONB NOT NULL,
  original_cost DECIMAL(10,2) NOT NULL,
  bundle_cost DECIMAL(10,2) NOT NULL,
  savings DECIMAL(10,2) NOT NULL,
  market_value DECIMAL(10,2) DEFAULT 0,
  popular BOOLEAN DEFAULT false,
  badge VARCHAR(50),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. Pacotes de Créditos
CREATE TABLE public.credit_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  credits DECIMAL(10,2) NOT NULL,
  bonus DECIMAL(10,2) DEFAULT 0,
  price INTEGER NOT NULL,
  price_per_credit DECIMAL(10,4) NOT NULL,
  popular BOOLEAN DEFAULT false,
  badge VARCHAR(50),
  savings INTEGER DEFAULT 0,
  highlight TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 14. Notificações
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  action_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 15. Verificações de Email
CREATE TABLE public.email_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL,
  type VARCHAR(50) DEFAULT 'signup',
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_referral_code ON public.profiles(referral_code);
CREATE INDEX idx_credit_transactions_user ON public.credit_transactions(user_id, created_at DESC);
CREATE INDEX idx_user_referrals ON public.referrals(referrer_id, status);
CREATE INDEX idx_user_achievements ON public.user_achievements(user_id);
CREATE INDEX idx_notifications ON public.notifications(user_id, read, created_at DESC);
CREATE INDEX idx_verification_token ON public.email_verifications(token, expires_at);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotion_uses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bundles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_verifications ENABLE ROW LEVEL SECURITY;

-- Function to check user role (security definer to avoid infinite recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to get user profile id
CREATE OR REPLACE FUNCTION public.get_profile_id(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.profiles WHERE user_id = _user_id LIMIT 1
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public profiles are viewable" ON public.profiles
  FOR SELECT USING (true);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for credit_transactions
CREATE POLICY "Users can view their own transactions" ON public.credit_transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own transactions" ON public.credit_transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for referrals
CREATE POLICY "Users can view their referrals" ON public.referrals
  FOR SELECT USING (
    referrer_id = public.get_profile_id(auth.uid()) OR 
    referred_id = public.get_profile_id(auth.uid())
  );

-- RLS Policies for achievements (public read)
CREATE POLICY "Anyone can view achievements" ON public.achievements
  FOR SELECT USING (active = true);

-- RLS Policies for user_achievements
CREATE POLICY "Users can view their own achievements" ON public.user_achievements
  FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for promotions (public read active)
CREATE POLICY "Anyone can view active promotions" ON public.promotions
  FOR SELECT USING (active = true AND valid_until > NOW());

-- RLS Policies for promotion_uses
CREATE POLICY "Users can view their own promotion uses" ON public.promotion_uses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can use promotions" ON public.promotion_uses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for bundles (public read)
CREATE POLICY "Anyone can view active bundles" ON public.bundles
  FOR SELECT USING (active = true);

-- RLS Policies for credit_packages (public read)
CREATE POLICY "Anyone can view active packages" ON public.credit_packages
  FOR SELECT USING (active = true);

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for email_verifications
CREATE POLICY "Users can view their own verifications" ON public.email_verifications
  FOR SELECT USING (auth.uid() = user_id);

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_referral_code VARCHAR(20);
BEGIN
  -- Generate unique referral code
  new_referral_code := 'REF' || UPPER(SUBSTRING(MD5(NEW.id::text || NOW()::text) FROM 1 FOR 8));
  
  INSERT INTO public.profiles (
    user_id,
    email,
    name,
    referral_code,
    total_credits,
    email_verified,
    account_status
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    new_referral_code,
    0,
    false,
    'pending'
  );
  
  -- Add default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to update updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default achievements
INSERT INTO public.achievements (code, name, description, icon, reward_credits, reward_xp, requirement_type, requirement_value, requirement_category) VALUES
  ('first_logo', '🎨 Primeiro Logo', 'Crie seu primeiro logo', '🎨', 2, 100, 'category_count', 1, 'logo'),
  ('logo_master', '👑 Mestre dos Logos', 'Crie 10 logos', '👑', 10, 500, 'category_count', 10, 'logo'),
  ('first_website', '🌐 Primeiro Site', 'Crie seu primeiro site', '🌐', 2, 100, 'category_count', 1, 'website'),
  ('website_master', '💻 Mestre dos Sites', 'Crie 10 sites', '💻', 10, 500, 'category_count', 10, 'website'),
  ('streak_7', '🔥 Sequência de 7 Dias', 'Use a plataforma 7 dias seguidos', '🔥', 5, 300, 'streak', 7, NULL),
  ('streak_30', '⚡ Mestre da Consistência', 'Use 30 dias seguidos', '⚡', 20, 1000, 'streak', 30, NULL),
  ('referral_first', '🤝 Primeiro Indicado', 'Indique seu primeiro amigo', '🤝', 10, 200, 'referral_count', 1, NULL),
  ('referral_5', '🌟 Influenciador', 'Indique 5 amigos', '🌟', 50, 1000, 'referral_count', 5, NULL),
  ('generation_100', '🚀 Centenário', 'Faça 100 gerações', '🚀', 25, 2000, 'total_generations', 100, NULL),
  ('all_categories', '🎯 Explorador', 'Use todas as categorias', '🎯', 15, 800, 'unique_categories', 7, NULL),
  ('email_verified', '✅ Email Verificado', 'Verifique seu email', '✅', 5, 100, 'email_verified', 1, NULL),
  ('welcome_bonus', '🎁 Boas-vindas', 'Bônus de boas-vindas ao verificar email', '🎁', 10, 50, 'welcome', 1, NULL);

-- Insert default bundles
INSERT INTO public.bundles (slug, name, description, categories, original_cost, bundle_cost, savings, market_value, popular, badge) VALUES
  ('startup-kit', '🚀 Kit Startup Completo', 'Tudo que você precisa para começar', '["logo", "website", "business-card"]', 2.5, 2.0, 0.5, 710, true, 'MAIS VENDIDO'),
  ('social-kit', '📱 Kit Redes Sociais', 'Domine suas redes sociais', '["social-media", "social-media", "social-media", "social-media", "social-media", "banner"]', 4.3, 3.5, 0.8, 520, false, 'ECONOMIA 18%'),
  ('complete-branding', '✨ Branding Premium', 'Identidade visual completa', '["logo", "branding", "color-palette", "slogan", "business-card"]', 3.6, 2.8, 0.8, 1160, true, 'PROFISSIONAL');

-- Insert default credit packages
INSERT INTO public.credit_packages (slug, name, credits, bonus, price, price_per_credit, popular, badge, savings, highlight) VALUES
  ('basic', 'Pacote Básico', 25, 0, 990, 0.396, false, NULL, 0, NULL),
  ('popular', 'Pacote Popular', 60, 5, 1990, 0.306, true, '🔥 +5 GRÁTIS', 23, NULL),
  ('pro', 'Pacote Pro', 150, 20, 3990, 0.235, false, '🎁 +20 BÔNUS', 41, NULL),
  ('premium', 'Pacote Premium', 300, 50, 6990, 0.200, false, '💎 +50 BÔNUS', 50, 'Melhor custo-benefício!');