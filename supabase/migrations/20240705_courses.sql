CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  school_id UUID REFERENCES driving_schools(id),
  price NUMERIC NOT NULL,
  total_hours INTEGER NOT NULL,
  driving_hours INTEGER NOT NULL,
  simulator_hours INTEGER NOT NULL,
  vehicle_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_languages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id),
  language TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample car courses
INSERT INTO courses (name, description, school_id, price, total_hours, driving_hours, simulator_hours, vehicle_type)
SELECT 
  'Basic Car License Course', 
  'Complete course for beginners to get their first driving license. Includes theory and practical lessons.',
  id,
  FLOOR(RANDOM() * (1500 - 800 + 1) + 800)::NUMERIC,
  FLOOR(RANDOM() * (30 - 20 + 1) + 20)::INTEGER,
  FLOOR(RANDOM() * (20 - 10 + 1) + 10)::INTEGER,
  FLOOR(RANDOM() * (10 - 5 + 1) + 5)::INTEGER,
  'Car'
FROM driving_schools
LIMIT 5;

INSERT INTO courses (name, description, school_id, price, total_hours, driving_hours, simulator_hours, vehicle_type)
SELECT 
  'Premium Car License Package', 
  'Our most comprehensive car driving course with extra practice hours and personalized instruction.',
  id,
  FLOOR(RANDOM() * (2500 - 1800 + 1) + 1800)::NUMERIC,
  FLOOR(RANDOM() * (40 - 30 + 1) + 30)::INTEGER,
  FLOOR(RANDOM() * (25 - 15 + 1) + 15)::INTEGER,
  FLOOR(RANDOM() * (15 - 10 + 1) + 10)::INTEGER,
  'Car'
FROM driving_schools
LIMIT 5;

-- Insert sample motorcycle courses
INSERT INTO courses (name, description, school_id, price, total_hours, driving_hours, simulator_hours, vehicle_type)
SELECT 
  'Motorcycle License Course', 
  'Complete training for motorcycle enthusiasts. Learn safety techniques and handling skills.',
  id,
  FLOOR(RANDOM() * (1200 - 700 + 1) + 700)::NUMERIC,
  FLOOR(RANDOM() * (25 - 15 + 1) + 15)::INTEGER,
  FLOOR(RANDOM() * (18 - 10 + 1) + 10)::INTEGER,
  FLOOR(RANDOM() * (7 - 3 + 1) + 3)::INTEGER,
  'Motorcycle'
FROM driving_schools
LIMIT 5;

-- Insert sample truck courses
INSERT INTO courses (name, description, school_id, price, total_hours, driving_hours, simulator_hours, vehicle_type)
SELECT 
  'Commercial Truck License', 
  'Professional CDL training for heavy vehicles. Prepare for your commercial driving career.',
  id,
  FLOOR(RANDOM() * (3000 - 2000 + 1) + 2000)::NUMERIC,
  FLOOR(RANDOM() * (50 - 35 + 1) + 35)::INTEGER,
  FLOOR(RANDOM() * (35 - 25 + 1) + 25)::INTEGER,
  FLOOR(RANDOM() * (15 - 8 + 1) + 8)::INTEGER,
  'Truck'
FROM driving_schools
LIMIT 5;

-- Add languages to courses
INSERT INTO course_languages (course_id, language)
SELECT id, 'English' FROM courses;

INSERT INTO course_languages (course_id, language)
SELECT id, 'Finnish' FROM courses WHERE random() < 0.7;

INSERT INTO course_languages (course_id, language)
SELECT id, 'Swedish' FROM courses WHERE random() < 0.4;

alter publication supabase_realtime add table courses;
alter publication supabase_realtime add table course_languages;
