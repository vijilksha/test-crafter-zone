export interface MockInterimTestCase {
  input: string;
  expected: string;
  description: string;
}

export interface MockInterimQuestion {
  id: string;
  text: string;
  scenario: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  options?: string[];
  correctAnswer?: string;
  topic: string;
  type: 'multiple-choice' | 'text-input';
  explanation?: string;
  expectedKeywords?: string[];
}

export const mockInterimQuestions: MockInterimQuestion[] = [
  {
    id: 'ft-001',
    text: 'Describe your approach to testing a user login functionality. What test scenarios would you create and what edge cases would you consider?',
    scenario: 'You are assigned to test a web application login feature that accepts email and password. The system should authenticate users and redirect them to their dashboard upon successful login.',
    difficulty: 'Easy',
    topic: 'Basic Mock Interview',
    type: 'text-input',
    explanation: 'A comprehensive answer should cover positive scenarios, negative scenarios, boundary conditions, and security considerations.',
    expectedKeywords: ['valid credentials', 'invalid credentials', 'empty fields', 'password security', 'account lockout', 'error messages']
  },
  {
    id: 'ft-002',
    text: 'You discover that a search feature returns incorrect results for certain keywords. Explain your testing strategy to identify the root cause and ensure comprehensive coverage.',
    scenario: 'The e-commerce website search functionality is behaving inconsistently. Some product searches return relevant results while others return completely unrelated products or no results at all.',
    difficulty: 'Medium',
    topic: 'Defect Analysis',
    type: 'text-input',
    explanation: 'Should include systematic testing approach, data analysis, and validation techniques.',
    expectedKeywords: ['test data', 'search algorithms', 'keyword variations', 'filters', 'sorting', 'database queries', 'regression testing']
  },
  {
    id: 'ft-003',
    text: 'Design a comprehensive test plan for testing a shopping cart functionality. Include different user scenarios and validation points.',
    scenario: 'You need to test an online shopping cart that allows users to add items, modify quantities, apply discounts, calculate taxes, and proceed to checkout.',
    difficulty: 'Medium',
    topic: 'Test Planning',
    type: 'text-input',
    explanation: 'Should cover all cart operations, edge cases, and integration with other systems.',
    expectedKeywords: ['add items', 'remove items', 'quantity changes', 'pricing calculations', 'discounts', 'taxes', 'inventory validation', 'session management']
  },
  {
    id: 'ft-004',
    text: 'Explain how you would test a file upload feature that accepts multiple file formats and has size limitations. What scenarios would you prioritize?',
    scenario: 'A document management system allows users to upload files with restrictions: maximum 10MB per file, supports PDF, DOC, DOCX, JPG, PNG formats, and maximum 5 files per upload session.',
    difficulty: 'Easy',
    topic: 'File Upload Testing',
    type: 'text-input',
    explanation: 'Should cover file format validation, size limits, multiple uploads, and error handling.',
    expectedKeywords: ['file formats', 'size limits', 'multiple files', 'unsupported formats', 'virus scanning', 'progress indicators', 'error messages']
  },
  {
    id: 'ft-005',
    text: 'Describe your approach to testing a payment gateway integration. What are the critical test scenarios and how would you handle sensitive data?',
    scenario: 'An e-commerce platform integrates with multiple payment gateways (PayPal, Stripe, Square) to process customer payments. The system must handle various payment methods and ensure secure transactions.',
    difficulty: 'Hard',
    topic: 'Payment Testing',
    type: 'text-input',
    explanation: 'Should address security, different payment methods, error scenarios, and compliance requirements.',
    expectedKeywords: ['payment methods', 'security', 'encryption', 'test environment', 'mock payments', 'failed transactions', 'refunds', 'PCI compliance']
  },
  {
    id: 'ft-006',
    text: 'How would you test a notification system that sends emails, SMS, and push notifications? Detail your testing strategy for each channel.',
    scenario: 'A social media application sends notifications through multiple channels when users receive messages, friend requests, or content updates. Users can customize their notification preferences.',
    difficulty: 'Medium',
    topic: 'Notification Testing',
    type: 'text-input',
    explanation: 'Should cover different notification types, user preferences, delivery validation, and timing.',
    expectedKeywords: ['email delivery', 'SMS gateway', 'push notifications', 'user preferences', 'notification timing', 'opt-out', 'delivery confirmation']
  },
  {
    id: 'ft-007',
    text: 'Explain your testing approach for a form with complex validation rules including dependent fields and real-time validation.',
    scenario: 'A job application form has 15 fields with interdependent validation rules. For example, if "Experience Level" is "Entry Level", then "Years of Experience" must be 0-2. The form provides real-time feedback as users type.',
    difficulty: 'Hard',
    topic: 'Form Validation Testing',
    type: 'text-input',
    explanation: 'Should cover field dependencies, real-time validation, error messaging, and user experience.',
    expectedKeywords: ['field validation', 'dependent fields', 'real-time feedback', 'error messages', 'business rules', 'user experience', 'accessibility']
  },
  {
    id: 'ft-008',
    text: 'Describe how you would test a reporting feature that generates charts and graphs from database data. What aspects would you focus on?',
    scenario: 'A business intelligence dashboard generates various reports with charts, graphs, and tables. Users can filter data by date ranges, departments, and custom parameters. Reports can be exported to PDF and Excel formats.',
    difficulty: 'Medium',
    topic: 'Reporting Testing',
    type: 'text-input',
    explanation: 'Should cover data accuracy, visualization correctness, filtering, and export functionality.',
    expectedKeywords: ['data accuracy', 'chart rendering', 'filters', 'date ranges', 'export formats', 'performance', 'large datasets', 'user permissions']
  },
  {
    id: 'ft-009',
    text: 'How would you approach testing a mobile app feature that works both online and offline? Detail your strategy for both modes.',
    scenario: 'A note-taking mobile application allows users to create, edit, and sync notes. When offline, users should be able to continue working, and changes should sync automatically when connection is restored.',
    difficulty: 'Hard',
    topic: 'Mobile Testing',
    type: 'text-input',
    explanation: 'Should address offline functionality, data synchronization, conflict resolution, and network transitions.',
    expectedKeywords: ['offline mode', 'data sync', 'conflict resolution', 'network transitions', 'local storage', 'background sync', 'user feedback']
  },
  {
    id: 'ft-010',
    text: 'Explain your testing strategy for an API that handles user authentication and authorization. What test cases would you prioritize?',
    scenario: 'A REST API provides authentication endpoints (login, logout, refresh token) and protected resources that require different permission levels (user, admin, super admin). The API uses JWT tokens for session management.',
    difficulty: 'Hard',
    topic: 'API Testing',
    type: 'text-input',
    explanation: 'Should cover authentication flows, authorization levels, token management, and security testing.',
    expectedKeywords: ['authentication', 'authorization', 'JWT tokens', 'permission levels', 'token expiry', 'refresh tokens', 'security headers', 'rate limiting']
  }
];