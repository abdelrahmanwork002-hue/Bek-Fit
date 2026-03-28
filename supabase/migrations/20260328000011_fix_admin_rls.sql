-- 20260328000011_fix_admin_rls.sql
-- Fix infinite recursion by bypassing RLS during admin check

DROP POLICY IF EXISTS "Admins can do everything in users" ON users;
DROP POLICY IF EXISTS "Admins can manage goals" ON goals;
DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
DROP POLICY IF EXISTS "Admins can manage onboarding_questions" ON onboarding_questions;
DROP POLICY IF EXISTS "Admins can manage exercises" ON exercises;
DROP POLICY IF EXISTS "Admins can manage payments" ON payments;
DROP POLICY IF EXISTS "Admins can manage movement_tips" ON movement_tips;
DROP POLICY IF EXISTS "Admins can manage blog_articles" ON blog_articles;

-- Security Definer function bypasses RLS policies on 'users' table, preventing the loop
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT is_admin FROM public.users WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

CREATE POLICY "Admins can do everything in users" ON users FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage goals" ON goals FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage categories" ON categories FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage onboarding_questions" ON onboarding_questions FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage exercises" ON exercises FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage payments" ON payments FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage movement_tips" ON movement_tips FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage blog_articles" ON blog_articles FOR ALL USING (public.is_admin());
