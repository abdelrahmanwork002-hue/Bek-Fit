-- 20260328000003_seed_exercises.sql
-- Seed Exercises and Categories

-- 1. Categories
INSERT INTO categories (name, group_type) VALUES 
('Quadriceps', 'body_area'),
('Chest', 'body_area'),
('Back', 'body_area'),
('Glutes', 'body_area'),
('Shoulders', 'body_area'),
('Hamstrings', 'body_area'),
('Mobility', 'movement_type'),
('Strength', 'movement_type'),
('Beginner', 'difficulty'),
('Intermediate', 'difficulty'),
('Advanced', 'difficulty');

-- 2. Exercises
INSERT INTO exercises (title, description, video_url, difficulty, default_sets, default_reps) VALUES 
('Barbell Squat', 'The king of all leg exercises. Targets quads and glutes.', 'https://images.unsplash.com/photo-1574680094895-01b811403525', 'beginner', 3, 10),
('Push-ups', 'A classic bodyweight exercise for the chest and triceps.', 'https://images.unsplash.com/photo-1598971639058-aba3c393bcaf', 'beginner', 3, 12),
('Pull-ups', 'The ultimate upper body pull exercise.', 'https://images.unsplash.com/photo-1596357399120-d46a89be3d5e', 'intermediate', 3, 8),
('Plank', 'Core stability and functional strength.', 'https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539', 'beginner', 3, 45),
('Bird Dog', 'Core stability and back health mobility.', 'https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539', 'beginner', 3, 10),
('Dead Bug', 'Functional core strength for spinal health.', 'https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539', 'beginner', 3, 10);

-- 3. Mapping (Optional, for complexity)
-- Requires finding IDs, skipping for MVP simplicity in this seed.
