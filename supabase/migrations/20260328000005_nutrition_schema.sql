-- 20260328000005_nutrition_schema.sql
-- Nutrition and Meal Planning

CREATE TABLE nutrition_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plan_version_id UUID REFERENCES plan_versions(id) ON DELETE CASCADE,
    daily_calories_target INTEGER,
    daily_protein_target INTEGER,
    daily_carbs_target INTEGER,
    daily_fat_target INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE daily_meal_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nutrition_plan_id UUID REFERENCES nutrition_plans(id) ON DELETE CASCADE,
    day_of_week TEXT NOT NULL, -- e.g., 'Monday'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE meals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    daily_meal_plan_id UUID REFERENCES daily_meal_plans(id) ON DELETE CASCADE,
    meal_type TEXT NOT NULL, -- e.g., 'Breakfast', 'Lunch', 'Snack', 'Dinner'
    meal_name TEXT NOT NULL,
    foods_description TEXT,
    calories INTEGER,
    protein INTEGER,
    carbs INTEGER,
    fat INTEGER,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE nutrition_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    meal_id UUID REFERENCES meals(id),
    is_completed BOOLEAN DEFAULT FALSE,
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE nutrition_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutrition_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own nutrition plans" ON nutrition_plans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own daily meal plans" ON daily_meal_plans FOR SELECT 
    USING (EXISTS (SELECT 1 FROM nutrition_plans WHERE nutrition_plans.id = daily_meal_plans.nutrition_plan_id AND nutrition_plans.user_id = auth.uid()));

CREATE POLICY "Users can view own meals" ON meals FOR SELECT 
    USING (EXISTS (SELECT 1 FROM daily_meal_plans JOIN nutrition_plans ON nutrition_plans.id = daily_meal_plans.nutrition_plan_id 
                   WHERE daily_meal_plans.id = meals.daily_meal_plan_id AND nutrition_plans.user_id = auth.uid()));

CREATE POLICY "Users can view own nutrition logs" ON nutrition_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own nutrition log" ON nutrition_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own nutrition log" ON nutrition_logs FOR UPDATE USING (auth.uid() = user_id);
