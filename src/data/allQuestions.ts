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

// Helper function to get questions by topic
export const getQuestionsByTopic = (topic: string): Question[] => {
  return allQuestions.filter(q => q.topic.toLowerCase().includes(topic.toLowerCase()));
};

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard'): Question[] => {
  return allQuestions.filter(q => q.difficulty === difficulty);
};