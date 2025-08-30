export interface FunctionalTestCase {
  input: string;
  expected: string;
  description: string;
}

export interface FunctionalTestingQuestion {
  id: string;
  text: string;
  scenario: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  options: string[];
  correctAnswer: string;
  topic: string;
  type: 'multiple-choice';
  explanation?: string;
}

export const functionalTestingQuestions: FunctionalTestingQuestion[] = [
  {
    id: 'ft-001',
    text: 'What is the primary purpose of functional testing?',
    scenario: 'You are explaining testing concepts to a new team member who needs to understand the fundamentals of functional testing.',
    difficulty: 'Easy',
    options: [
      'To test the performance and speed of the application',
      'To verify that the software functions according to specified requirements',
      'To check the internal code structure and logic',
      'To test the user interface design and aesthetics'
    ],
    correctAnswer: 'To verify that the software functions according to specified requirements',
    topic: 'Functional Testing Fundamentals',
    type: 'multiple-choice',
    explanation: 'Functional testing focuses on testing the software against functional requirements/specifications.'
  },
  {
    id: 'ft-002',
    text: 'Which testing technique involves testing software without knowledge of internal code structure?',
    scenario: 'Your team is deciding on testing approaches and needs to understand different testing methodologies.',
    difficulty: 'Easy',
    options: [
      'White Box Testing',
      'Gray Box Testing',
      'Black Box Testing',
      'Unit Testing'
    ],
    correctAnswer: 'Black Box Testing',
    topic: 'Testing Methodologies',
    type: 'multiple-choice',
    explanation: 'Black box testing focuses on input-output behavior without considering internal implementation.'
  },
  {
    id: 'ft-003',
    text: 'What is boundary value analysis?',
    scenario: 'You need to design test cases for a login form that accepts passwords between 8-20 characters.',
    difficulty: 'Medium',
    options: [
      'Testing only the middle values of input ranges',
      'Testing values at the boundaries and just beyond the boundaries of input domains',
      'Testing random values within the input range',
      'Testing the most commonly used values'
    ],
    correctAnswer: 'Testing values at the boundaries and just beyond the boundaries of input domains',
    topic: 'Test Design Techniques',
    type: 'multiple-choice',
    explanation: 'Boundary value analysis tests values at boundaries (e.g., 7, 8, 20, 21 characters for 8-20 range).'
  },
  {
    id: 'ft-004',
    text: 'In equivalence partitioning, what is the main principle?',
    scenario: 'You are testing an age verification system that has different rules for ages 0-12, 13-17, 18-64, and 65+.',
    difficulty: 'Medium',
    options: [
      'Test every possible input value',
      'Divide input data into partitions where all values should behave similarly',
      'Test only the maximum and minimum values',
      'Focus on the most frequently used inputs'
    ],
    correctAnswer: 'Divide input data into partitions where all values should behave similarly',
    topic: 'Test Design Techniques',
    type: 'multiple-choice',
    explanation: 'Equivalence partitioning groups inputs into classes where each member should produce similar results.'
  },
  {
    id: 'ft-005',
    text: 'What is the difference between verification and validation in testing?',
    scenario: 'Your project manager asks you to explain the V&V activities in your testing process.',
    difficulty: 'Medium',
    options: [
      'Verification checks if we built the product right, validation checks if we built the right product',
      'Verification is manual testing, validation is automated testing',
      'Verification tests functionality, validation tests performance',
      'There is no difference, they are synonymous'
    ],
    correctAnswer: 'Verification checks if we built the product right, validation checks if we built the right product',
    topic: 'Testing Fundamentals',
    type: 'multiple-choice',
    explanation: 'Verification ensures the product meets specifications; validation ensures it meets user needs.'
  },
  {
    id: 'ft-006',
    text: 'What is regression testing?',
    scenario: 'After implementing a new feature, you need to ensure existing functionality still works correctly.',
    difficulty: 'Easy',
    options: [
      'Testing new features for the first time',
      'Testing to ensure existing functionality works after code changes',
      'Testing the performance degradation over time',
      'Testing user interface elements only'
    ],
    correctAnswer: 'Testing to ensure existing functionality works after code changes',
    topic: 'Testing Types',
    type: 'multiple-choice',
    explanation: 'Regression testing verifies that existing features continue to work after modifications.'
  },
  {
    id: 'ft-007',
    text: 'Which of the following is NOT a characteristic of a good test case?',
    scenario: 'You are reviewing test cases written by junior testers and need to provide feedback on quality.',
    difficulty: 'Medium',
    options: [
      'Clear and concise steps',
      'Expected results defined',
      'Complex and tests multiple functionalities at once',
      'Repeatable and consistent'
    ],
    correctAnswer: 'Complex and tests multiple functionalities at once',
    topic: 'Test Case Design',
    type: 'multiple-choice',
    explanation: 'Good test cases should be simple, focused, and test one functionality at a time for easier debugging.'
  },
  {
    id: 'ft-008',
    text: 'What is the purpose of smoke testing?',
    scenario: 'Your team receives a new build and needs to decide if it\'s stable enough for detailed testing.',
    difficulty: 'Easy',
    options: [
      'To test all functionalities in detail',
      'To perform a basic test to check if the basic functionalities work',
      'To test the application under heavy load',
      'To test security vulnerabilities'
    ],
    correctAnswer: 'To perform a basic test to check if the basic functionalities work',
    topic: 'Testing Types',
    type: 'multiple-choice',
    explanation: 'Smoke testing is a preliminary test to check if the basic functions work before detailed testing.'
  },
  {
    id: 'ft-009',
    text: 'In the context of functional testing, what does API testing primarily focus on?',
    scenario: 'Your application has a REST API that needs to be tested before the UI is ready.',
    difficulty: 'Medium',
    options: [
      'Testing the user interface elements',
      'Testing data exchange between software systems and validating API contracts',
      'Testing database performance',
      'Testing code coverage'
    ],
    correctAnswer: 'Testing data exchange between software systems and validating API contracts',
    topic: 'API Testing',
    type: 'multiple-choice',
    explanation: 'API testing focuses on data exchange, request/response validation, and contract compliance.'
  },
  {
    id: 'ft-010',
    text: 'What is the main advantage of using test automation in functional testing?',
    scenario: 'Your manager wants to understand the ROI of investing in test automation tools and frameworks.',
    difficulty: 'Easy',
    options: [
      'It eliminates the need for manual testing completely',
      'It can execute tests faster and more frequently with consistent results',
      'It can test user experience better than manual testing',
      'It requires no maintenance once implemented'
    ],
    correctAnswer: 'It can execute tests faster and more frequently with consistent results',
    topic: 'Test Automation',
    type: 'multiple-choice',
    explanation: 'Test automation provides speed, repeatability, and consistency, especially for regression testing.'
  },
  {
    id: 'ft-011',
    text: 'What is data-driven testing?',
    scenario: 'You need to test a login function with multiple sets of valid and invalid credentials.',
    difficulty: 'Medium',
    options: [
      'Testing with randomly generated data',
      'Testing where test data is separated from test scripts and stored externally',
      'Testing that focuses only on database functionality',
      'Testing performed only by data analysts'
    ],
    correctAnswer: 'Testing where test data is separated from test scripts and stored externally',
    topic: 'Test Design Techniques',
    type: 'multiple-choice',
    explanation: 'Data-driven testing separates test logic from test data, allowing the same test to run with different data sets.'
  },
  {
    id: 'ft-012',
    text: 'What is the primary goal of usability testing?',
    scenario: 'Your product team wants to ensure the application is user-friendly before release.',
    difficulty: 'Hard',
    options: [
      'To test if the application functions correctly',
      'To evaluate how easy and intuitive the application is for end users',
      'To test the application\'s performance under load',
      'To check for security vulnerabilities'
    ],
    correctAnswer: 'To evaluate how easy and intuitive the application is for end users',
    topic: 'Usability Testing',
    type: 'multiple-choice',
    explanation: 'Usability testing focuses on user experience, ease of use, and intuitive design.'
  },
  {
    id: 'ft-013',
    text: 'Which testing approach would you use to test a critical payment processing feature?',
    scenario: 'You are testing a financial application where payment failures could result in significant business loss.',
    difficulty: 'Hard',
    options: [
      'Only positive test cases with valid inputs',
      'Comprehensive testing including positive, negative, boundary, and error handling scenarios',
      'Only automated testing to save time',
      'Basic smoke testing is sufficient'
    ],
    correctAnswer: 'Comprehensive testing including positive, negative, boundary, and error handling scenarios',
    topic: 'Critical System Testing',
    type: 'multiple-choice',
    explanation: 'Critical features require thorough testing including edge cases, error conditions, and boundary scenarios.'
  },
  {
    id: 'ft-014',
    text: 'What is exploratory testing?',
    scenario: 'Your team has limited documentation and needs to understand how the application behaves in various scenarios.',
    difficulty: 'Medium',
    options: [
      'Testing based on pre-written test cases only',
      'Simultaneous learning, test design, and test execution',
      'Testing performed only by senior testers',
      'Automated testing with random inputs'
    ],
    correctAnswer: 'Simultaneous learning, test design, and test execution',
    topic: 'Testing Approaches',
    type: 'multiple-choice',
    explanation: 'Exploratory testing involves simultaneous learning about the application while designing and executing tests.'
  },
  {
    id: 'ft-015',
    text: 'When should you stop testing a software application?',
    scenario: 'Your project manager asks when the testing phase can be considered complete for the current release.',
    difficulty: 'Hard',
    options: [
      'When no bugs are found',
      'When all test cases pass',
      'When exit criteria defined in the test plan are met',
      'When the deadline is reached'
    ],
    correctAnswer: 'When exit criteria defined in the test plan are met',
    topic: 'Test Management',
    type: 'multiple-choice',
    explanation: 'Testing should continue until predefined exit criteria (coverage, quality metrics, risk assessment) are satisfied.'
  }
];