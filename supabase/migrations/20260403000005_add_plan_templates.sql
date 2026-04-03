-- 20260403000005_add_plan_templates.sql
-- Support standard workout plan templates that can be assigned to users

CREATE TABLE public.plan_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    goal TEXT,
    difficulty TEXT,
    duration_weeks INTEGER DEFAULT 8,
    workouts_per_week INTEGER DEFAULT 3,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.template_exercises (
    template_id UUID REFERENCES public.plan_templates(id) ON DELETE CASCADE,
    exercise_id UUID REFERENCES public.exercises(id) ON DELETE CASCADE,
    sets INTEGER NOT NULL,
    reps TEXT NOT NULL,
    rest_seconds INTEGER NOT NULL,
    order_index INTEGER NOT NULL,
    PRIMARY KEY (template_id, exercise_id, order_index)
);

-- Enable RLS
ALTER TABLE public.plan_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_exercises ENABLE ROW LEVEL SECURITY;

-- Admins can manage templates
CREATE POLICY "Admins manage plan_templates" ON public.plan_templates FOR ALL USING (EXISTS (SELECT 1 FROM admins WHERE id = auth.uid()));
CREATE POLICY "Admins manage template_exercises" ON public.template_exercises FOR ALL USING (EXISTS (SELECT 1 FROM admins WHERE id = auth.uid()));

-- Refresh Cache
NOTIFY pgrst, 'reload schema';
