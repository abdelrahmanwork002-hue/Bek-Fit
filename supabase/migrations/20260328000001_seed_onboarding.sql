-- 20260328000001_seed_onboarding.sql
-- Seed Onboarding Questions

DO $$
DECLARE
    pain_relief_id UUID;
    improve_fitness_id UUID;
    weight_mgmt_id UUID;
    func_mobility_id UUID;
BEGIN
    -- Get IDs for existing goals
    SELECT id INTO pain_relief_id FROM goals WHERE title = 'Pain Relief';
    SELECT id INTO improve_fitness_id FROM goals WHERE title = 'Improve Fitness';
    SELECT id INTO weight_mgmt_id FROM goals WHERE title = 'Weight Management';
    SELECT id INTO func_mobility_id FROM goals WHERE title = 'Functional Mobility';

    -- 1. General Questions (Shared by all unless specified)
    
    -- Age
    INSERT INTO onboarding_questions (goal_id, question_text, input_type, is_mandatory, order_index)
    VALUES (NULL, 'What is your age?', 'text', TRUE, 10);

    -- Gender
    INSERT INTO onboarding_questions (goal_id, question_text, input_type, config, is_mandatory, order_index)
    VALUES (NULL, 'What is your gender?', 'multiple_choice', 
            '{"options": ["Male", "Female", "Other"]}'::jsonb, TRUE, 20);

    -- Fitness Level
    INSERT INTO onboarding_questions (goal_id, question_text, input_type, config, is_mandatory, order_index)
    VALUES (NULL, 'What is your current fitness level?', 'slider', 
            '{"min": 1, "max": 3, "labels": ["Beginner", "Intermediate", "Advanced"]}'::jsonb, TRUE, 30);

    -- Exercise Frequency
    INSERT INTO onboarding_questions (goal_id, question_text, input_type, config, is_mandatory, order_index)
    VALUES (NULL, 'How often do you currently exercise?', 'multiple_choice', 
            '{"options": ["Never", "1-2 times per week", "3-4 times per week", "5+ times per week"]}'::jsonb, TRUE, 40);

    -- 2. Goal-Specific Questions
    
    -- Pain Relief: Pain Map (Special input type handled by UI)
    INSERT INTO onboarding_questions (goal_id, question_text, input_type, is_mandatory, order_index)
    VALUES (pain_relief_id, 'Where do you experience pain?', 'text', TRUE, 50); -- Config will hold body areas if needed

END $$;
