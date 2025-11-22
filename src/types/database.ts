export interface TestSession {
  id: string;
  user_name: string;
  user_role: 'student' | 'trainer';
  student_id?: string;
  cohort_code?: string;
  total_questions: number;
  correct_answers: number;
  total_score: number;
  started_at: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface TestResult {
  id: string;
  session_id: string;
  question_id: string;
  question_text: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  selected_answer: string;
  correct_answer: string;
  is_correct: boolean;
  answered_at: string;
  created_at: string;
  user_answer?: string;
  question_type?: string;
  score?: number;
  ai_feedback?: string;
}

export interface TestResultWithSession extends TestResult {
  session?: TestSession;
}

export interface StudentScore {
  user_name: string;
  student_id?: string;
  cohort_code?: string;
  total_score: number;
  total_questions: number;
  correct_answers: number;
  completed_at: string;
  session_id: string;
}