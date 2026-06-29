-- Nattie Group Premium Platform - Supabase Schema

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ENUMS
CREATE TYPE user_role AS ENUM ('admin', 'employee', 'customer');
CREATE TYPE project_status AS ENUM ('planning', 'in_progress', 'completed', 'on_hold', 'cancelled');
CREATE TYPE quote_status AS ENUM ('pending', 'approved', 'rejected');

-- USERS TABLE (Extends Supabase Auth auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role user_role DEFAULT 'customer'::user_role,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  company_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PROJECTS TABLE
CREATE TABLE public.projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status project_status DEFAULT 'planning'::project_status,
  budget DECIMAL(12, 2),
  location TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- QUOTES TABLE
CREATE TABLE public.quotes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL,
  budget_range TEXT,
  location TEXT,
  timeline TEXT,
  additional_notes TEXT,
  status quote_status DEFAULT 'pending'::quote_status,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TASKS TABLE
CREATE TABLE public.tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  is_completed BOOLEAN DEFAULT false,
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GALLERY / MEDIA TABLE
CREATE TABLE public.media (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  media_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Projects Policies
CREATE POLICY "Admins can manage all projects." ON public.projects FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Clients can view their own projects." ON public.projects FOR SELECT USING (
  client_id = auth.uid()
);

-- Quotes Policies
CREATE POLICY "Admins can manage all quotes." ON public.quotes FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Clients can create and view their own quotes." ON public.quotes FOR SELECT USING (
  client_id = auth.uid()
);
CREATE POLICY "Anyone can insert a quote." ON public.quotes FOR INSERT WITH CHECK (true);
