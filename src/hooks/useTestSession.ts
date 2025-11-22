import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TestSession, TestResult, StudentScore } from '@/types/database';

export const useTestSession = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTestSession = useCallback(async (userName: string, userRole: 'student' | 'trainer'): Promise<string | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('test_sessions')
        .insert([
          {
            user_name: userName,
            user_role: userRole,
            user_id: null,
            total_questions: 0,
            correct_answers: 0,
            total_score: 0
          }
        ])
        .select()
        .single();

      if (error) throw error;

      return data.id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create test session');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const saveTestResult = async (
    sessionId: string,
    questionId: string,
    questionText: string,
    topic: string,
    difficulty: 'Easy' | 'Medium' | 'Hard',
    selectedAnswer: string,
    correctAnswer: string,
    isCorrect: boolean
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('test_results')
        .insert([
          {
            session_id: sessionId,
            question_id: questionId,
            question_text: questionText,
            topic,
            difficulty,
            selected_answer: selectedAnswer,
            correct_answer: correctAnswer,
            is_correct: isCorrect
          }
        ]);

      if (error) throw error;

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save test result');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const completeTestSession = async (sessionId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('test_sessions')
        .update({ completed_at: new Date().toISOString() })
        .eq('id', sessionId);

      if (error) throw error;

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete test session');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getStudentScores = async (): Promise<StudentScore[]> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('test_sessions')
        .select('*')
        .not('completed_at', 'is', null)
        .order('completed_at', { ascending: false });

      if (error) throw error;

      return data.map(session => ({
        user_name: session.user_name,
        total_score: session.total_score,
        total_questions: session.total_questions,
        correct_answers: session.correct_answers,
        completed_at: session.completed_at!,
        session_id: session.id
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch student scores');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getTestResults = async (sessionId: string): Promise<TestResult[]> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('test_results')
        .select('*')
        .eq('session_id', sessionId)
        .order('answered_at', { ascending: true });

      if (error) throw error;

      return (data || []) as TestResult[];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch test results');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getTestSession = async (sessionId: string): Promise<TestSession | null> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('test_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (error) throw error;

      return data as TestSession;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch test session');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createTestSession,
    saveTestResult,
    completeTestSession,
    getStudentScores,
    getTestResults,
    getTestSession
  };
};