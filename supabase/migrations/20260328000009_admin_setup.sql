-- 20260328000009_admin_setup.sql
-- Administrative Controls

-- 1. Add is_admin to users
ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;

-- 2. Give the first user admin rights (Optional, for development)
-- UPDATE users SET is_admin = TRUE WHERE id = '...ID...';

-- 3. RLS for Admin Controls
-- We need to ensure admin can READ and WRITE to everything.
-- This requires updating individual table policies.

CREATE POLICY "Admins can do everything in users" ON users FOR ALL USING (
  (SELECT is_admin FROM users WHERE id = auth.uid()) = TRUE
);

CREATE POLICY "Admins can manage goals" ON goals FOR ALL USING (
  EXISTS(SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE)
);

CREATE POLICY "Admins can manage categories" ON categories FOR ALL USING (
  EXISTS(SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE)
);

CREATE POLICY "Admins can manage onboarding_questions" ON onboarding_questions FOR ALL USING (
  EXISTS(SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE)
);

CREATE POLICY "Admins can manage exercises" ON exercises FOR ALL USING (
  EXISTS(SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE)
);

CREATE POLICY "Admins can manage payments" ON payments FOR ALL USING (
  EXISTS(SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE)
);

CREATE POLICY "Admins can manage movement_tips" ON movement_tips FOR ALL USING (
  EXISTS(SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE)
);

CREATE POLICY "Admins can manage blog_articles" ON blog_articles FOR ALL USING (
  EXISTS(SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE)
);
