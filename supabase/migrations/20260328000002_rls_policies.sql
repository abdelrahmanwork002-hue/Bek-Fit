-- 20260328000002_rls_policies.sql
-- Bek Fit Security Policies

-- 1. Goals: Publicly readable
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Goals are readable by everyone" ON goals FOR SELECT USING (TRUE);

-- 2. Onboarding Questions: Publicly readable
ALTER TABLE onboarding_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Questions are readable by everyone" ON onboarding_questions FOR SELECT USING (TRUE);

-- 3. Users: Only individual can read/write their own record
-- (Note: handle_new_user trigger usually handles the insert, but we allow update)
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- 4. Onboarding Responses: Only individual can manage
CREATE POLICY "Users can view own responses" ON onboarding_responses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own response" ON onboarding_responses FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. Plans and Routines: Only individual can see their own active plans
CREATE POLICY "Users can view own plans" ON plans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own plan versions" ON plan_versions FOR SELECT 
    USING (EXISTS (SELECT 1 FROM plans WHERE plans.id = plan_versions.plan_id AND plans.user_id = auth.uid()));

CREATE POLICY "Users can view own routines" ON routines FOR SELECT 
    USING (EXISTS (SELECT 1 FROM plan_versions JOIN plans ON plans.id = plan_versions.plan_id 
                   WHERE plan_versions.id = routines.plan_version_id AND plans.user_id = auth.uid()));

-- 6. Exercises: Publicly readable (for library)
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Exercises are readable by everyone" ON exercises FOR SELECT USING (TRUE);
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are readable by everyone" ON categories FOR SELECT USING (TRUE);
ALTER TABLE exercise_category_map ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Exercise maps are readable by everyone" ON exercise_category_map FOR SELECT USING (TRUE);

-- 7. Daily Logs
CREATE POLICY "Users can view own logs" ON daily_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own log" ON daily_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
