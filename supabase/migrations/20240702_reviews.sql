-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES driving_schools(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS reviews_school_id_idx ON reviews(school_id);
CREATE INDEX IF NOT EXISTS reviews_user_id_idx ON reviews(user_id);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Public read access" ON reviews;
CREATE POLICY "Public read access"
  ON reviews FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert" ON reviews;
CREATE POLICY "Authenticated users can insert"
  ON reviews FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update own reviews" ON reviews;
CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own reviews" ON reviews;
CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = user_id);

-- Add vehicle_type column to driving_schools
ALTER TABLE driving_schools ADD COLUMN IF NOT EXISTS vehicle_type TEXT;

-- Update existing schools with random vehicle types
UPDATE driving_schools SET vehicle_type = (
  CASE 
    WHEN random() < 0.33 THEN 'car'
    WHEN random() < 0.66 THEN 'motorcycle'
    ELSE 'truck'
  END
) WHERE vehicle_type IS NULL;

-- Enable realtime
alter publication supabase_realtime add table reviews;
