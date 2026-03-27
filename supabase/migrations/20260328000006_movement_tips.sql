-- 20260328000006_movement_tips.sql
-- Movement Tips Feed

CREATE TABLE movement_tips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    is_new BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE movement_tips ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tips are readable by everyone" ON movement_tips FOR SELECT USING (TRUE);

-- Seed
INSERT INTO movement_tips (title, category, content, image_url, is_new) VALUES 
('Perfect Your Posture at Your Desk', 'Ergonomics', 'Keep your screen at eye level, feet flat on the floor, and take breaks every 30 minutes.', 'https://images.unsplash.com/photo-1758599879927-f60878034fca', TRUE),
('5-Minute Morning Mobility Routine', 'Mobility', 'Start your day with cat-cow stretches, hip circles, and shoulder rolls to wake up your body.', 'https://images.unsplash.com/photo-1758599879927-f60878034fca', FALSE),
('The 20-20-20 Rule for Eye Health', 'Wellness', 'Every 20 minutes, look at something 20 feet away for 20 seconds to reduce eye strain.', 'https://images.unsplash.com/photo-1758599879927-f60878034fca', FALSE),
('Quick Desk Stretches', 'Stretching', 'Neck rolls, wrist circles, and seated spinal twists can be done right at your desk.', 'https://images.unsplash.com/photo-1758599879927-f60878034fca', TRUE);
