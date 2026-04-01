-- 20260328000013_separate_admins_table.sql
-- Fulfilling complete architectural separation of Admins vs Consumer Users

CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Turn on RLS for admins
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Admins can read their own row, but let's just make it readable for the engine
CREATE POLICY "Admins can view admins" ON public.admins FOR SELECT USING (id = auth.uid());

-- Redefine the is_admin() RPC to check the separated admins table instead of the users table
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_status BOOLEAN;
BEGIN
  -- Now checking explicitly against the completely segregated admins table
  SELECT TRUE INTO admin_status FROM public.admins WHERE id = auth.uid() LIMIT 1;
  RETURN COALESCE(admin_status, FALSE);
END;
$$;

-- Drop the merged column from the consumer users table to enforce physical separation
ALTER TABLE public.users DROP COLUMN IF EXISTS is_admin;
