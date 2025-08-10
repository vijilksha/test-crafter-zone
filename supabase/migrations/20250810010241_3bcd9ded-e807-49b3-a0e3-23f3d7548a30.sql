-- Create test_sessions table to track overall test attempts
CREATE TABLE public.test_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name TEXT NOT NULL,
  user_role TEXT NOT NULL CHECK (user_role IN ('student', 'trainer')),
  total_questions INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  total_score DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create test_results table to store individual question results
CREATE TABLE public.test_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.test_sessions(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  question_text TEXT NOT NULL,
  topic TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  selected_answer TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  answered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.test_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no authentication required)
CREATE POLICY "Anyone can view test sessions" 
ON public.test_sessions 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create test sessions" 
ON public.test_sessions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update test sessions" 
ON public.test_sessions 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can view test results" 
ON public.test_results 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create test results" 
ON public.test_results 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_test_sessions_updated_at
  BEFORE UPDATE ON public.test_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to update session totals when results are added
CREATE OR REPLACE FUNCTION public.update_session_totals()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.test_sessions 
  SET 
    total_questions = (
      SELECT COUNT(*) 
      FROM public.test_results 
      WHERE session_id = NEW.session_id
    ),
    correct_answers = (
      SELECT COUNT(*) 
      FROM public.test_results 
      WHERE session_id = NEW.session_id AND is_correct = true
    )
  WHERE id = NEW.session_id;
  
  -- Update total score as percentage
  UPDATE public.test_sessions 
  SET total_score = CASE 
    WHEN total_questions > 0 THEN (correct_answers::DECIMAL / total_questions::DECIMAL) * 100
    ELSE 0
  END
  WHERE id = NEW.session_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update session totals when results are inserted
CREATE TRIGGER update_session_totals_trigger
  AFTER INSERT ON public.test_results
  FOR EACH ROW
  EXECUTE FUNCTION public.update_session_totals();

-- Create indexes for better performance
CREATE INDEX idx_test_results_session_id ON public.test_results(session_id);
CREATE INDEX idx_test_results_topic ON public.test_results(topic);
CREATE INDEX idx_test_results_difficulty ON public.test_results(difficulty);
CREATE INDEX idx_test_sessions_user_role ON public.test_sessions(user_role);
CREATE INDEX idx_test_sessions_completed_at ON public.test_sessions(completed_at);