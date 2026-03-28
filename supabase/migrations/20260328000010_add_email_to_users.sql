-- 20260328000010_add_email_to_users.sql
-- Fixes trigger error by adding the missing email column

ALTER TABLE public.users ADD COLUMN IF NOT EXISTS email TEXT UNIQUE;
