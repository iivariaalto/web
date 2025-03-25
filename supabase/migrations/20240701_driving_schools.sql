-- Create driving schools table
CREATE TABLE IF NOT EXISTS public.driving_schools (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    address text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    zip_code text NOT NULL,
    latitude numeric,
    longitude numeric,
    phone text,
    email text,
    website text,
    logo_url text,
    average_rating numeric DEFAULT 0,
    price_range text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Create course types table
CREATE TABLE IF NOT EXISTS public.course_types (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT now()
);

-- Create school courses junction table
CREATE TABLE IF NOT EXISTS public.school_courses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id uuid REFERENCES public.driving_schools(id) ON DELETE CASCADE,
    course_type_id uuid REFERENCES public.course_types(id) ON DELETE CASCADE,
    price numeric,
    duration text,
    created_at timestamp with time zone DEFAULT now(),
    UNIQUE(school_id, course_type_id)
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS public.school_reviews (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id uuid REFERENCES public.driving_schools(id) ON DELETE CASCADE,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
    rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment text,
    created_at timestamp with time zone DEFAULT now()
);

-- Insert sample course types
INSERT INTO public.course_types (name, description)
VALUES 
('Teen Drivers Ed', 'Comprehensive driving education for teenagers'),
('Adult Drivers Ed', 'Driving lessons for adults'),
('Defensive Driving', 'Learn defensive driving techniques'),
('Senior Refresher', 'Refresher courses for senior drivers'),
('Commercial Driving', 'Training for commercial driver licenses')
ON CONFLICT DO NOTHING;

-- Insert sample driving schools
INSERT INTO public.driving_schools (name, description, address, city, state, zip_code, latitude, longitude, phone, email, website, logo_url, average_rating, price_range)
VALUES
('Premier Driving Academy', 'Top-rated driving school with experienced instructors', '123 Main St', 'Austin', 'TX', '78701', 30.267153, -97.743057, '512-555-1234', 'info@premierdriving.com', 'https://premierdriving.com', 'https://images.unsplash.com/photo-1541348263662-e068662d82af?w=300&q=80', 4.8, '$$$'),
('Safe Roads Driving School', 'Focused on safety and defensive driving techniques', '456 Oak Ave', 'Austin', 'TX', '78704', 30.243700, -97.766052, '512-555-5678', 'contact@saferoads.com', 'https://saferoads.com', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&q=80', 4.5, '$$'),
('Fast Track Driving', 'Get your license quickly with our accelerated programs', '789 Pine Blvd', 'Austin', 'TX', '78745', 30.206490, -97.796783, '512-555-9012', 'hello@fasttrackdriving.com', 'https://fasttrackdriving.com', 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300&q=80', 4.2, '$'),
('Elite Driving Institute', 'Luxury vehicles and premium instruction', '101 Cedar Rd', 'Austin', 'TX', '78746', 30.295910, -97.805456, '512-555-3456', 'elite@drivingschool.com', 'https://elitedrivinginstitute.com', 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=300&q=80', 4.9, '$$$$'),
('Budget Driving School', 'Affordable driving lessons for all ages', '202 Maple Dr', 'Austin', 'TX', '78702', 30.260370, -97.719559, '512-555-7890', 'info@budgetdriving.com', 'https://budgetdriving.com', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&q=80', 3.9, '$')
ON CONFLICT DO NOTHING;

-- Add sample school courses
INSERT INTO public.school_courses (school_id, course_type_id, price, duration)
SELECT 
    s.id, 
    c.id, 
    CASE 
        WHEN s.price_range = '$' THEN 100 + (random() * 100)::numeric
        WHEN s.price_range = '$$' THEN 200 + (random() * 150)::numeric
        WHEN s.price_range = '$$$' THEN 350 + (random() * 200)::numeric
        ELSE 550 + (random() * 300)::numeric
    END,
    CASE 
        WHEN c.name = 'Teen Drivers Ed' THEN '30 hours'
        WHEN c.name = 'Adult Drivers Ed' THEN '20 hours'
        WHEN c.name = 'Defensive Driving' THEN '8 hours'
        WHEN c.name = 'Senior Refresher' THEN '10 hours'
        ELSE '40 hours'
    END
FROM 
    public.driving_schools s
CROSS JOIN 
    public.course_types c
WHERE 
    NOT EXISTS (
        SELECT 1 FROM public.school_courses sc 
        WHERE sc.school_id = s.id AND sc.course_type_id = c.id
    )
LIMIT 20;

-- Enable RLS
ALTER TABLE public.driving_schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to driving schools and course types
DROP POLICY IF EXISTS "Public driving schools access" ON public.driving_schools;
CREATE POLICY "Public driving schools access"
ON public.driving_schools FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Public course types access" ON public.course_types;
CREATE POLICY "Public course types access"
ON public.course_types FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Public school courses access" ON public.school_courses;
CREATE POLICY "Public school courses access"
ON public.school_courses FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Public school reviews access" ON public.school_reviews;
CREATE POLICY "Public school reviews access"
ON public.school_reviews FOR SELECT
USING (true);

-- Enable realtime for these tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.driving_schools;
ALTER PUBLICATION supabase_realtime ADD TABLE public.course_types;
ALTER PUBLICATION supabase_realtime ADD TABLE public.school_courses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.school_reviews;