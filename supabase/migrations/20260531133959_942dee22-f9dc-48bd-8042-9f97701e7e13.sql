
-- Skills
CREATE TABLE public.skills (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  category text,
  level integer DEFAULT 80,
  sort_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.skills TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.skills TO authenticated;
GRANT ALL ON public.skills TO service_role;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Skills public" ON public.skills FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage skills" ON public.skills FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER skills_set_updated_at BEFORE UPDATE ON public.skills
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Education
CREATE TABLE public.education (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  institution text NOT NULL,
  degree text,
  field text,
  start_year text,
  end_year text,
  grade text,
  description text,
  sort_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.education TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.education TO authenticated;
GRANT ALL ON public.education TO service_role;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Education public" ON public.education FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage education" ON public.education FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER education_set_updated_at BEFORE UPDATE ON public.education
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Bootstrap admin: lets the first authenticated user claim admin if none exists
CREATE OR REPLACE FUNCTION public.claim_admin_if_none()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  has_any_admin boolean;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') INTO has_any_admin;
  IF has_any_admin THEN
    RETURN false;
  END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (auth.uid(), 'admin')
    ON CONFLICT DO NOTHING;
  RETURN true;
END;
$$;
GRANT EXECUTE ON FUNCTION public.claim_admin_if_none() TO authenticated;
