import { jsQuestions, type JSQuestion } from './jsQuestions';
import { functionalTestingQuestions, type FunctionalTestingQuestion } from './functionalTestingQuestions';

// Combined question types
export type Question = JSQuestion | FunctionalTestingQuestion;

// Combined questions from all categories
export const allQuestions: Question[] = [...jsQuestions, ...functionalTestingQuestions];

// Helper function to get questions by topic
export const getQuestionsByTopic = (topic: string): Question[] => {
  return allQuestions.filter(q => q.topic.toLowerCase().includes(topic.toLowerCase()));
};

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard'): Question[] => {
  return allQuestions.filter(q => q.difficulty === difficulty);
};