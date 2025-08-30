-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('trainer', 'student');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- RLS policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Update test_sessions table policies to use roles
DROP POLICY IF EXISTS "Enable read access for all users" ON public.test_sessions;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.test_sessions;
DROP POLICY IF EXISTS "Enable update for users based on email" ON public.test_sessions;

CREATE POLICY "Students can create their own sessions"
ON public.test_sessions
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid() AND public.has_role(auth.uid(), 'student'));

CREATE POLICY "Students can view their own sessions"
ON public.test_sessions
FOR SELECT
TO authenticated
USING (user_id = auth.uid() AND public.has_role(auth.uid(), 'student'));

CREATE POLICY "Trainers can view all sessions"
ON public.test_sessions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'trainer'));

CREATE POLICY "Students can update their own sessions"
ON public.test_sessions
FOR UPDATE
TO authenticated
USING (user_id = auth.uid() AND public.has_role(auth.uid(), 'student'));

-- Update test_results table policies
DROP POLICY IF EXISTS "Enable read access for all users" ON public.test_results;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.test_results;

CREATE POLICY "Students can create results for their sessions"
ON public.test_results
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.test_sessions 
    WHERE id = session_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Students can view their own results"
ON public.test_results
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.test_sessions 
    WHERE id = session_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Trainers can view all results"
ON public.test_results
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'trainer'));

-- Add user_id column to test_sessions if not exists
ALTER TABLE public.test_sessions 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);