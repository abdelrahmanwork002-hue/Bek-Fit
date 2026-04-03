-- 20260403000006_add_template_usage.sql
ALTER TABLE public.plan_templates 
ADD COLUMN IF NOT EXISTS usage_count INTEGER DEFAULT 0;
