import { jsQuestions, type JSQuestion } from './jsQuestions';
import { mockInterimQuestions, type MockInterimQuestion } from './mockInterimQuestions';

// Combined question types
export type Question = JSQuestion | MockInterimQuestion;

// Export separate question categories
export { jsQuestions, mockInterimQuestions };

// Combined questions from all categories (for backward compatibility)
export const allQuestions: Question[] = [...jsQuestions, ...mockInterimQuestions];

// Helper function to get questions by category
export const getQuestionsByCategory = (category: 'javascript' | 'mock-interim'): Question[] => {
  switch (category) {
    case 'javascript':
      return jsQuestions;
    case 'mock-interim':
      return mockInterimQuestions;
    default:
      return allQuestions;
  }
};

// Helper function to get mixed questions (5 total from all categories)
export const getMixedQuestions = (): Question[] => {
  const mixedQuestions: Question[] = [];
  
  // Get 2 JavaScript questions (1 easy, 1 medium)
  const jsEasy = jsQuestions.filter(q => q.difficulty === 'Easy').slice(0, 1);
  const jsMedium = jsQuestions.filter(q => q.difficulty === 'Medium').slice(0, 1);
  mixedQuestions.push(...jsEasy, ...jsMedium);
  
  // Get 1 TypeScript question
  const tsQuestions = jsQuestions.filter(q => q.topic.toLowerCase().includes('typescript')).slice(0, 1);
  mixedQuestions.push(...tsQuestions);
  
  // Get 2 Mock Interim questions
  const mockInterim = mockInterimQuestions.slice(0, 2);
  mixedQuestions.push(...mockInterim);
  
  return mixedQuestions.slice(0, 5); // Ensure exactly 5 questions
};

// Helper function to get questions by topic
export const getQuestionsByTopic = (topic: string): Question[] => {
  return allQuestions.filter(q => q.topic.toLowerCase().includes(topic.toLowerCase()));
};

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard'): Question[] => {
  return allQuestions.filter(q => q.difficulty === difficulty);
};