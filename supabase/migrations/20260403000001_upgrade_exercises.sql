-- 20260403000001_upgrade_exercises.sql
-- Add status and improved tracking to exercises

ALTER TABLE public.exercises
ADD COLUMN IF NOT EXISTS equipment TEXT DEFAULT 'None',
ADD COLUMN IF NOT EXISTS body_area TEXT DEFAULT 'Full Body',
ADD COLUMN IF NOT EXISTS duration_seconds INTEGER DEFAULT 60,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Archived')),
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;

-- Ensure RLS is enabled and admins can manage all
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Admins manage exercises'
    ) THEN
        CREATE POLICY "Admins manage exercises" ON public.exercises FOR ALL USING (EXISTS (SELECT 1 FROM admins WHERE id = auth.uid()));
    END IF;
END $$;
