-- 20260328000000_initial_schema.sql
-- Bek Fit Initialization Migration

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Core Tables
CREATE TABLE goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    group_type TEXT CHECK (group_type IN ('body_area', 'movement_type', 'equipment', 'difficulty')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id), -- Linked to Supabase Auth
    full_name TEXT,
    goal_id UUID REFERENCES goals(id),
    profile_data JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE onboarding_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    goal_id UUID REFERENCES goals(id),
    question_text TEXT NOT NULL,
    input_type TEXT CHECK (input_type IN ('slider', 'text', 'multiple_choice', 'boolean')),
    config JSONB DEFAULT '{}'::jsonb, -- e.g., slider min/max or options
    is_mandatory BOOLEAN DEFAULT TRUE,
    order_index INTEGER DEFAULT 0
);

CREATE TABLE onboarding_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    question_id UUID REFERENCES onboarding_questions(id),
    response JSONB NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT,
    thumbnail_url TEXT,
    cues JSONB DEFAULT '[]'::jsonb,
    default_sets INTEGER DEFAULT 3,
    default_reps INTEGER DEFAULT 12,
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE exercise_category_map (
    exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (exercise_id, category_id)
);

CREATE TABLE plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE plan_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plan_id UUID REFERENCES plans(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    ai_logic_snapshot JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE routines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plan_version_id UUID REFERENCES plan_versions(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL, -- e.g., Day 1 to Day 7
    title TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE routine_exercises (
    routine_id UUID REFERENCES routines(id) ON DELETE CASCADE,
    exercise_id UUID REFERENCES exercises(id),
    sets INTEGER,
    reps INTEGER,
    rest_seconds INTEGER,
    order_index INTEGER,
    PRIMARY KEY (routine_id, exercise_id, order_index)
);

CREATE TABLE daily_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    routine_id UUID REFERENCES routines(id),
    pain_level INTEGER CHECK (pain_level >= 0 AND pain_level <= 10),
    energy_level INTEGER CHECK (energy_level >= 0 AND energy_level <= 10),
    perceived_difficulty INTEGER CHECK (perceived_difficulty >= 0 AND perceived_difficulty <= 10),
    notes TEXT,
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    status TEXT CHECK (status IN ('pending', 'approved', 'rejected')),
    receipt_url TEXT,
    processed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE blog_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL, -- Markdown content
    thumbnail_url TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Row Level Security (RLS) - High level overview
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_logs ENABLE ROW LEVEL SECURITY;

-- 4. Sample Seeding - Goals
INSERT INTO goals (title, description) VALUES 
('Pain Relief', 'Targeted routines to reduce chronic pain and discomfort.'),
('Improve Fitness', 'Increase strength, endurance, and overall cardiovascular health.'),
('Weight Management', 'Balanced nutrition and exercise plans focus on metabolic health.'),
('Functional Mobility', 'Enhance joint range of motion and movement quality.');
