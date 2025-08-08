import { htmlCssQuestions, type Question as HTMLCSSQuestion } from './htmlCssQuestions';
import { jsQuestions, type JSQuestion } from './jsQuestions';

// Union type for all question types
export type Question = HTMLCSSQuestion | JSQuestion;

// Combined questions array
export const allQuestions: Question[] = [
  ...htmlCssQuestions,
  ...jsQuestions
];

// Helper function to get questions by topic
export const getQuestionsByTopic = (topic: string): Question[] => {
  return allQuestions.filter(q => q.topic.toLowerCase().includes(topic.toLowerCase()));
};

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (difficulty: 'intermediate' | 'advanced'): Question[] => {
  return allQuestions.filter(q => q.difficulty === difficulty);
};