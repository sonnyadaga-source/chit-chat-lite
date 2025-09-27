-- =============================
-- POD AI Monitoring Assistant
-- Database Schema & Security Setup
-- =============================

-- Create custom types
CREATE TYPE app_role AS ENUM ('beadle', 'adviser', 'coordinator');
CREATE TYPE absence_status AS ENUM ('present', 'absent');
CREATE TYPE media_type AS ENUM ('image', 'video');

-- =============================
-- Core Tables
-- =============================

-- Sections Table
CREATE TABLE public.sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  adviser_name VARCHAR(150) NOT NULL,
  contact_number VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Students Table
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_number VARCHAR(50) UNIQUE,
  name VARCHAR(150) NOT NULL,
  section_id UUID NOT NULL REFERENCES public.sections(id) ON DELETE CASCADE,
  contact_number VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Profiles Table (linked to auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE,
  full_name VARCHAR(150),
  role app_role NOT NULL DEFAULT 'beadle',
  section_id UUID REFERENCES public.sections(id) ON DELETE SET NULL,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Roles Table (for RBAC)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  assigned_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Media Table
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255),
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  type media_type NOT NULL,
  checksum VARCHAR(128) NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Absences Table
CREATE TABLE public.absences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status absence_status NOT NULL DEFAULT 'absent',
  reason TEXT,
  notes TEXT,
  media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
  reported_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  flagged BOOLEAN DEFAULT FALSE,
  flag_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, date)
);

-- Audit Log Table
CREATE TABLE public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action VARCHAR(50) NOT NULL,
  table_name VARCHAR(50),
  record_id UUID,
  before_values JSONB,
  after_values JSONB,
  reason TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================
-- Indexes for Performance
-- =============================
CREATE INDEX idx_students_section ON public.students(section_id);
CREATE INDEX idx_students_number ON public.students(student_number);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_section ON public.profiles(section_id);
CREATE INDEX idx_absences_student ON public.absences(student_id);
CREATE INDEX idx_absences_date ON public.absences(date);
CREATE INDEX idx_absences_reported_by ON public.absences(reported_by);
CREATE INDEX idx_absences_status ON public.absences(status);
CREATE INDEX idx_audit_user ON public.audit_log(user_id);
CREATE INDEX idx_audit_table_record ON public.audit_log(table_name, record_id);
CREATE INDEX idx_media_uploaded_by ON public.media(uploaded_by);

-- =============================
-- Triggers for updated_at
-- =============================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_sections_updated_at
  BEFORE UPDATE ON public.sections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_absences_updated_at
  BEFORE UPDATE ON public.absences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- =============================
-- Row Level Security Setup
-- =============================

-- Enable RLS on all tables
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.absences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- =============================
-- Security Definer Functions
-- =============================

-- Function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to get user's section
CREATE OR REPLACE FUNCTION public.get_user_section(_user_id UUID)
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT section_id
  FROM public.profiles
  WHERE id = _user_id
$$;

-- Function to check if user is coordinator
CREATE OR REPLACE FUNCTION public.is_coordinator(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'coordinator')
$$;

-- =============================
-- RLS Policies
-- =============================

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Coordinators can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_coordinator(auth.uid()));

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Coordinators can update all profiles"
  ON public.profiles FOR UPDATE
  USING (public.is_coordinator(auth.uid()));

CREATE POLICY "Anyone can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- User roles policies
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Coordinators can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.is_coordinator(auth.uid()));

CREATE POLICY "Coordinators can manage roles"
  ON public.user_roles FOR ALL
  USING (public.is_coordinator(auth.uid()));

-- Sections policies
CREATE POLICY "All authenticated users can view sections"
  ON public.sections FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Coordinators can manage sections"
  ON public.sections FOR ALL
  USING (public.is_coordinator(auth.uid()));

-- Students policies
CREATE POLICY "Users can view students in their section"
  ON public.students FOR SELECT
  USING (
    public.is_coordinator(auth.uid()) OR
    section_id = public.get_user_section(auth.uid())
  );

CREATE POLICY "Coordinators and advisers can manage students"
  ON public.students FOR ALL
  USING (
    public.is_coordinator(auth.uid()) OR
    public.has_role(auth.uid(), 'adviser')
  );

-- Absences policies
CREATE POLICY "Users can view absences in their section"
  ON public.absences FOR SELECT
  USING (
    public.is_coordinator(auth.uid()) OR
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.id = student_id
      AND s.section_id = public.get_user_section(auth.uid())
    )
  );

CREATE POLICY "Users can create absences for their section"
  ON public.absences FOR INSERT
  WITH CHECK (
    reported_by = auth.uid() AND
    (public.is_coordinator(auth.uid()) OR
     EXISTS (
       SELECT 1 FROM public.students s
       WHERE s.id = student_id
       AND s.section_id = public.get_user_section(auth.uid())
     ))
  );

CREATE POLICY "Users can update absences they reported"
  ON public.absences FOR UPDATE
  USING (
    reported_by = auth.uid() OR
    public.is_coordinator(auth.uid())
  );

-- Media policies
CREATE POLICY "Users can view their own media"
  ON public.media FOR SELECT
  USING (uploaded_by = auth.uid());

CREATE POLICY "Coordinators can view all media"
  ON public.media FOR SELECT
  USING (public.is_coordinator(auth.uid()));

CREATE POLICY "Users can upload media"
  ON public.media FOR INSERT
  WITH CHECK (uploaded_by = auth.uid());

-- Audit log policies
CREATE POLICY "Coordinators can view all audit logs"
  ON public.audit_log FOR SELECT
  USING (public.is_coordinator(auth.uid()));

CREATE POLICY "Users can view their own audit logs"
  ON public.audit_log FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "System can insert audit logs"
  ON public.audit_log FOR INSERT
  WITH CHECK (true);

-- =============================
-- Storage Setup
-- =============================

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('media-uploads', 'media-uploads', false, 2097152, ARRAY['image/jpeg', 'image/png', 'image/jpg']),
  ('thumbnails', 'thumbnails', true, 524288, ARRAY['image/jpeg', 'image/png', 'image/jpg']);

-- Storage policies for media uploads
CREATE POLICY "Users can upload media to their folder"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'media-uploads' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own media"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'media-uploads' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Coordinators can view all media"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'media-uploads' AND
    public.is_coordinator(auth.uid())
  );

-- Thumbnail policies (public read)
CREATE POLICY "Thumbnails are publicly viewable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'thumbnails');

CREATE POLICY "Users can upload thumbnails"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'thumbnails' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- =============================
-- Sample Data
-- =============================

-- Insert sample sections
INSERT INTO public.sections (name, adviser_name, contact_number) VALUES
  ('Section LOVE', 'Mr. Santos', '09171234567'),
  ('Section HOPE', 'Ms. Cruz', '09179876543'),
  ('Section FAITH', 'Mrs. Reyes', '09175555555');

-- Note: User profiles and roles will be created via triggers when users sign up