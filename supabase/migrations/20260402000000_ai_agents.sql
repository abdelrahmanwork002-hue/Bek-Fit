-- AI Agent Management Schema
-- This schema supports the requirements in "Sub Requiremnts.md"

-- 1. AI Providers Table
CREATE TABLE IF NOT EXISTS ai_providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. AI Roles Table
CREATE TABLE IF NOT EXISTS ai_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    behavior_profile JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. AI Agents Table
CREATE TABLE IF NOT EXISTS ai_agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    purpose TEXT NOT NULL,
    provider_id UUID REFERENCES ai_providers(id),
    system_prompt TEXT,
    temperature NUMERIC DEFAULT 0.7,
    max_tokens INTEGER DEFAULT 1024,
    status TEXT DEFAULT 'Draft' CHECK (status IN ('Draft', 'Active', 'Inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_by UUID REFERENCES auth.users(id),
    last_modified_by UUID REFERENCES auth.users(id)
);

-- 4. AI Agent Roles (Many-to-Many)
CREATE TABLE IF NOT EXISTS ai_agent_roles (
    agent_id UUID REFERENCES ai_agents(id) ON DELETE CASCADE,
    role_id UUID REFERENCES ai_roles(id) ON DELETE CASCADE,
    PRIMARY KEY (agent_id, role_id)
);

-- Enable RLS
ALTER TABLE ai_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_agent_roles ENABLE ROW LEVEL SECURITY;

-- Policies (Assuming 'admins' table is used for role-based checks)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage AI providers') THEN
        CREATE POLICY "Admins can manage AI providers" ON ai_providers FOR ALL USING (EXISTS (SELECT 1 FROM admins WHERE id = auth.uid()));
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage AI roles') THEN
        CREATE POLICY "Admins can manage AI roles" ON ai_roles FOR ALL USING (EXISTS (SELECT 1 FROM admins WHERE id = auth.uid()));
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage AI agents') THEN
        CREATE POLICY "Admins can manage AI agents" ON ai_agents FOR ALL USING (EXISTS (SELECT 1 FROM admins WHERE id = auth.uid()));
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can manage AI agent roles') THEN
        CREATE POLICY "Admins can manage AI agent roles" ON ai_agent_roles FOR ALL USING (EXISTS (SELECT 1 FROM admins WHERE id = auth.uid()));
    END IF;
END $$;

-- Insert Initial Seeds
INSERT INTO ai_providers (name) VALUES ('OpenAI GPT-4'), ('Anthropic Claude 3'), ('Google Gemini 1.5 Pro') ON CONFLICT DO NOTHING;
INSERT INTO ai_roles (name, description) VALUES ('Returns Specialist', 'Handles customer return requests and refund eligibility'), ('HR Assistant', 'Answers employee questions about leave policy') ON CONFLICT DO NOTHING;
