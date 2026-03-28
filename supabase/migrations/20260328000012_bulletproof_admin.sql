-- 20260328000012_bulletproof_admin.sql
-- Fix infinite recursion permanently with PL/PGSQL

DROP POLICY IF EXISTS "Admins can do everything in users" ON users;
DROP POLICY IF EXISTS "Admins can manage goals" ON goals;
DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
DROP POLICY IF EXISTS "Admins can manage onboarding_questions" ON onboarding_questions;
DROP POLICY IF EXISTS "Admins can manage exercises" ON exercises;
DROP POLICY IF EXISTS "Admins can manage payments" ON payments;
DROP POLICY IF EXISTS "Admins can manage movement_tips" ON movement_tips;
DROP POLICY IF EXISTS "Admins can manage blog_articles" ON blog_articles;

DROP FUNCTION IF EXISTS public.is_admin() CASCADE;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_status BOOLEAN;
BEGIN
  SELECT is_admin INTO admin_status FROM public.users WHERE id = auth.uid() LIMIT 1;
  RETURN COALESCE(admin_status, FALSE);
END;
$$;

CREATE POLICY "Admins can do everything in users" ON users FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage goals" ON goals FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage categories" ON categories FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage onboarding_questions" ON onboarding_questions FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage exercises" ON exercises FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage payments" ON payments FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage movement_tips" ON movement_tips FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage blog_articles" ON blog_articles FOR ALL USING (public.is_admin());
