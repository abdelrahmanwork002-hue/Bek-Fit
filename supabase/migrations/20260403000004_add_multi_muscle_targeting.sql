-- 20260403000004_add_multi_muscle_targeting.sql
-- Support multiple muscle targeting per exercise via text array

ALTER TABLE public.exercises
ADD COLUMN IF NOT EXISTS target_muscles TEXT[] DEFAULT '{}'::TEXT[];

-- Copy legacy body_area to new array if exists
UPDATE public.exercises 
SET target_muscles = ARRAY[body_area] 
WHERE body_area IS NOT NULL AND (target_muscles IS NULL OR CARDINALITY(target_muscles) = 0);

-- Refresh Postgrest Cache
NOTIFY pgrst, 'reload schema';
