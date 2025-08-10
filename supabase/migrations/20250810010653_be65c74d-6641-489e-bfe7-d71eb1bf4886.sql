-- Fix function search path security warnings by adding search_path setting
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_session_totals()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
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
$$;