import { jsQuestions, type JSQuestion } from './jsQuestions';

// Use only JavaScript questions
export type Question = JSQuestion;

// Use only JavaScript questions
export const allQuestions: Question[] = jsQuestions;

// Helper function to get questions by topic
export const getQuestionsByTopic = (topic: string): Question[] => {
  return allQuestions.filter(q => q.topic.toLowerCase().includes(topic.toLowerCase()));
};

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard'): Question[] => {
  return allQuestions.filter(q => q.difficulty === difficulty);
};