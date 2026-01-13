-- Create business_plans table for storing generated business plans
CREATE TABLE public.business_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  niche TEXT NOT NULL,
  initial_capital NUMERIC,
  canvas_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.business_plans ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own business plans" 
ON public.business_plans FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own business plans" 
ON public.business_plans FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own business plans" 
ON public.business_plans FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own business plans" 
ON public.business_plans FOR DELETE USING (auth.uid() = user_id);

-- Create stores table for branding and theme
CREATE TABLE public.stores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  brand_voice JSONB,
  theme_config JSONB DEFAULT '{"primaryColor": "#8B5CF6", "secondaryColor": "#EC4899", "fontFamily": "Inter", "bannerLayout": "centered"}'::jsonb,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own stores" 
ON public.stores FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own stores" 
ON public.stores FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stores" 
ON public.stores FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stores" 
ON public.stores FOR DELETE USING (auth.uid() = user_id);

-- Create generated_content table for copywriter
CREATE TABLE public.generated_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  content_type TEXT NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.generated_content ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own content" 
ON public.generated_content FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own content" 
ON public.generated_content FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own content" 
ON public.generated_content FOR DELETE USING (auth.uid() = user_id);

-- Create storage bucket for logos
INSERT INTO storage.buckets (id, name, public) VALUES ('logos', 'logos', true);

-- Storage policies
CREATE POLICY "Anyone can view logos" 
ON storage.objects FOR SELECT USING (bucket_id = 'logos');

CREATE POLICY "Users can upload their own logos" 
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'logos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own logos" 
ON storage.objects FOR UPDATE USING (bucket_id = 'logos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own logos" 
ON storage.objects FOR DELETE USING (bucket_id = 'logos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add trigger for updated_at
CREATE TRIGGER update_business_plans_updated_at
BEFORE UPDATE ON public.business_plans
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_stores_updated_at
BEFORE UPDATE ON public.stores
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();