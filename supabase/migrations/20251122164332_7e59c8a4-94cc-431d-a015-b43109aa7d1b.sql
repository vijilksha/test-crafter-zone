-- Add student_id and cohort_code to test_sessions
ALTER TABLE public.test_sessions 
ADD COLUMN student_id TEXT,
ADD COLUMN cohort_code TEXT;

-- Add index for better performance
CREATE INDEX idx_test_sessions_student_id ON public.test_sessions(student_id);
CREATE INDEX idx_test_sessions_cohort_code ON public.test_sessions(cohort_code);