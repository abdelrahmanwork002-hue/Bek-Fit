-- 20260328000008_blog_seed.sql
-- Seed Blog Articles

INSERT INTO blog_articles (title, slug, content, thumbnail_url, is_published, published_at) VALUES 
('The Science of Active Recovery', 'active-recovery-science', 'Active recovery is a low-intensity workout that follows a more intense training session. It helps improve circulation, reduce muscle soreness, and maintain joint health. Focus on mobility and light walking during these phases.', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b', TRUE, NOW()),

('Fueling for Performance: Pre-Workout Nutrition', 'pre-workout-nutrition', 'What you eat before you train dictates your energy levels and focus. Aim for a balanced mix of complex carbohydrates and easily digestible protein approximately 60-90 minutes before your session.', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061', TRUE, NOW()),

('Mindset: The Foundation of Transformation', 'mindset-foundation', 'Without the correct mental framework, physical results are difficult to sustain. Learn how to set realistic expectations and develop the grit needed for long-term lifestyle changes.', 'https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6', TRUE, NOW());
