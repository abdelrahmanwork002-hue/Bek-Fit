-- 20260403000002_add_exercise_categories.sql
-- Add Gym, Yoga, Calisthenics categorization to exercises

ALTER TABLE public.exercises
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Gym' CHECK (category IN ('Gym', 'Yoga', 'Calisthenics'));

-- Refresh Postgrest Cache
NOTIFY pgrst, 'reload schema';
