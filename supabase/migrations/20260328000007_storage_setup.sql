-- 20260328000007_storage_setup.sql
-- Setup Storage for Payment Receipts

-- 1. Create Bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('payment-receipts', 'payment-receipts', false)
ON CONFLICT (id) DO NOTHING;

-- 2. RLS Policies for Storage
-- Users can upload their own receipts
CREATE POLICY "Users can upload own receipts"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'payment-receipts' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Users can view their own receipts
CREATE POLICY "Users can view own receipts"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'payment-receipts' AND (storage.foldername(name))[1] = auth.uid()::text);
