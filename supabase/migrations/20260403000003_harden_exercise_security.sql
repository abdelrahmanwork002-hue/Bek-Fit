-- 20260403000003_harden_exercise_security.sql
-- Enforce "Archive-Only" security policy for exercises

-- 1. Remove the catch-all policy
DROP POLICY IF EXISTS "Admins manage exercises" ON public.exercises;

-- 2. Define granular immutable policies
CREATE POLICY "Admins can view all exercises" 
ON public.exercises FOR SELECT 
USING (EXISTS (SELECT 1 FROM admins WHERE id = auth.uid()));

CREATE POLICY "Admins can inject new protocols" 
ON public.exercises FOR INSERT 
WITH CHECK (EXISTS (SELECT 1 FROM admins WHERE id = auth.uid()));

CREATE POLICY "Admins can configure/archive protocols" 
ON public.exercises FOR UPDATE 
USING (EXISTS (SELECT 1 FROM admins WHERE id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM admins WHERE id = auth.uid()));

-- 3. Explicitly BLOCK DELETE operations (Archive-Only enforcement)
-- Note: In Supabase, if no DELETE policy exists, deletes are implicitly blocked.
-- We are not defining a DELETE policy here to ensure data remains immutable.

-- 4. Enable RLS
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;

-- 5. Refresh Cache
NOTIFY pgrst, 'reload schema';
