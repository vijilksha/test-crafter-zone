interface JSTestCase {
  name: string;
  test: (code: string) => boolean | Promise<boolean>;
}

interface JSCodeQuestion {
  id: string;
  title: string;
  scenario: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  type: 'code';
  instructions: string;
  starterCode: {
    html: string;
    js: string;
  };
  testCases: JSTestCase[];
}

interface MultipleChoiceQuestion {
  id: string;
  text: string;
  scenario: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  options: string[];
  correctAnswer: string;
  topic: string;
  type: 'multiple-choice';
}

export type JSQuestion = JSCodeQuestion | MultipleChoiceQuestion;

export const jsQuestions: JSQuestion[] = [
  {
    id: 'js-async-001',
    title: 'Basic Promise Creation',
    scenario: 'You need to create a function that simulates fetching user data from an API.',
    difficulty: 'Easy',
    topic: 'Promises & Async',
    type: 'code',
    instructions: `Create a function called 'fetchUserData' that:
1. Returns a Promise
2. Resolves after 1 second with an object containing: { id: 1, name: 'John Doe', email: 'john@example.com' }
3. Use setTimeout to simulate the delay`,
    starterCode: {
      html: `<div id="result"></div>`,
      js: `function fetchUserData() {
  // Your code here
}`
    },
    testCases: [
      {
        name: 'Should return a Promise that resolves with user data',
        test: async (code) => {
          try {
            const fn = new Function('return ' + code.replace('function fetchUserData', '(function fetchUserData'))();
            const result = await fn();
            
            return result && 
                   result.id === 1 && 
                   result.name === 'John Doe' && 
                   result.email === 'john@example.com';
          } catch {
            return false;
          }
        }
      }
    ]
  },
  {
    id: 'js-async-002',
    title: 'Async/Await Function',
    scenario: 'You need to create an async function that handles multiple API calls sequentially.',
    difficulty: 'Medium',
    topic: 'Promises & Async',
    type: 'code',
    instructions: `Create an async function called 'getUserProfile' that:
1. Calls fetchUser() to get basic user info
2. Then calls fetchUserPosts(userId) to get user posts
3. Returns an object with both user and posts data
4. Handle any errors by returning { error: 'Failed to fetch data' }`,
    starterCode: {
      html: `<div id="profile"></div>`,
      js: `// Mock API functions (already provided)
function fetchUser() {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id: 1, name: 'Alice' }), 100);
  });
}

function fetchUserPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve([{ id: 1, title: 'Post 1' }]), 100);
  });
}

async function getUserProfile() {
  // Your code here
}`
    },
    testCases: [
      {
        name: 'Should fetch user and posts sequentially',
        test: async (code) => {
          try {
            eval(code);
            const result = await (globalThis as any).getUserProfile();
            
            return result && 
                   result.user && 
                   result.user.id === 1 &&
                   result.posts && 
                   Array.isArray(result.posts) &&
                   result.posts.length === 1;
          } catch {
            return false;
          }
        }
      }
    ]
  },
  {
    id: 'js-async-003',
    title: 'Promise.all Implementation',
    scenario: 'You need to fetch data from multiple APIs simultaneously for better performance.',
    difficulty: 'Medium',
    topic: 'Promises & Async',
    type: 'code',
    instructions: `Create a function called 'fetchAllData' that:
1. Uses Promise.all to fetch data from 3 APIs simultaneously
2. Calls fetchUsers(), fetchProducts(), and fetchOrders()
3. Returns an object with { users, products, orders }
4. Handle errors properly`,
    starterCode: {
      html: `<div id="dashboard"></div>`,
      js: `// Mock API functions (already provided)
function fetchUsers() {
  return new Promise(resolve => {
    setTimeout(() => resolve([{ id: 1, name: 'User 1' }]), 200);
  });
}

function fetchProducts() {
  return new Promise(resolve => {
    setTimeout(() => resolve([{ id: 1, title: 'Product 1' }]), 150);
  });
}

function fetchOrders() {
  return new Promise(resolve => {
    setTimeout(() => resolve([{ id: 1, total: 100 }]), 100);
  });
}

async function fetchAllData() {
  // Your code here
}`
    },
    testCases: [
      {
        name: 'Should fetch all data simultaneously',
        test: async (code) => {
          try {
            eval(code);
            
            const start = Date.now();
            const result = await (globalThis as any).fetchAllData();
            const end = Date.now();
            
            // Should complete in roughly 200ms (not 450ms if sequential)
            const timeTaken = end - start;
            
            return result && 
                   result.users && Array.isArray(result.users) &&
                   result.products && Array.isArray(result.products) &&
                   result.orders && Array.isArray(result.orders) &&
                   timeTaken < 300; // Should be faster than sequential
          } catch {
            return false;
          }
        }
      }
    ]
  },
  {
    id: 'js-async-004',
    title: 'Error Handling with try/catch',
    scenario: 'You need to handle API failures gracefully in your application.',
    difficulty: 'Hard',
    topic: 'Promises & Async',
    type: 'code',
    instructions: `Create an async function called 'safeApiCall' that:
1. Takes an apiFunction as parameter
2. Calls the apiFunction with try/catch
3. If successful, returns { success: true, data: result }
4. If it fails, returns { success: false, error: error.message }
5. Also logs errors to console`,
    starterCode: {
      html: `<div id="api-result"></div>`,
      js: `// Mock API that sometimes fails
function unreliableAPI() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve({ data: 'Success!' });
    } else {
      reject(new Error('API temporarily unavailable'));
    }
  });
}

async function safeApiCall(apiFunction) {
  // Your code here
}`
    },
    testCases: [
      {
        name: 'Should handle both success and failure cases',
        test: async (code) => {
          try {
            eval(code);
            
            // Test with successful API
            const successAPI = () => Promise.resolve({ data: 'test' });
            const successResult = await (globalThis as any).safeApiCall(successAPI);
            
            // Test with failing API
            const failAPI = () => Promise.reject(new Error('Test error'));
            const failResult = await (globalThis as any).safeApiCall(failAPI);
            
            return successResult.success === true &&
                   successResult.data.data === 'test' &&
                   failResult.success === false &&
                   failResult.error === 'Test error';
          } catch {
            return false;
          }
        }
      }
    ]
  },
  {
    id: 'js-async-005',
    title: 'Promise Chaining vs Async/Await',
    scenario: 'You need to refactor Promise chains to use modern async/await syntax.',
    difficulty: 'Hard',
    topic: 'Promises & Async',
    type: 'code',
    instructions: `Refactor the given Promise chain to use async/await:
1. Convert the function to async
2. Use await instead of .then()
3. Use try/catch for error handling
4. Return the final result`,
    starterCode: {
      html: `<div id="conversion-result"></div>`,
      js: `// Original Promise chain - DO NOT MODIFY THIS
function processDataOld(userId) {
  return fetchUser(userId)
    .then(user => fetchUserSettings(user.id))
    .then(settings => processSettings(settings))
    .then(result => ({ user, processed: result }))
    .catch(error => ({ error: error.message }));
}

// Mock functions (already provided)
function fetchUser(id) {
  return Promise.resolve({ id, name: 'User ' + id });
}

function fetchUserSettings(userId) {
  return Promise.resolve({ theme: 'dark', notifications: true });
}

function processSettings(settings) {
  return Promise.resolve({ ...settings, processed: true });
}

// Convert this to async/await
async function processData(userId) {
  // Your code here
}`
    },
    testCases: [
      {
        name: 'Should work the same as the original Promise chain',
        test: async (code) => {
          try {
            eval(code);
            
            const result = await (globalThis as any).processData(123);
            
            return result && 
                   result.user && 
                   result.user.id === 123 &&
                   result.processed &&
                   result.processed.processed === true &&
                   result.processed.theme === 'dark';
          } catch {
            return false;
          }
        }
      }
    ]
  },
  {
    id: 'js-mc-001',
    text: 'What does the async keyword do when placed before a function?',
    scenario: 'You are working with asynchronous JavaScript and need to understand function declarations.',
    difficulty: 'Easy',
    options: [
      'Makes the function run faster',
      'Makes the function always return a Promise',
      'Makes the function run in the background',
      'Prevents the function from throwing errors'
    ],
    correctAnswer: 'Makes the function always return a Promise',
    topic: 'Promises & Async',
    type: 'multiple-choice'
  },
  {
    id: 'js-mc-002',
    text: 'Which method would you use to handle multiple Promises simultaneously?',
    scenario: 'You need to fetch data from multiple APIs at the same time.',
    difficulty: 'Medium',
    options: [
      'Promise.each()',
      'Promise.all()',
      'Promise.every()',
      'Promise.concurrent()'
    ],
    correctAnswer: 'Promise.all()',
    topic: 'Promises & Async',
    type: 'multiple-choice'
  },
  {
    id: 'js-mc-003',
    text: 'What happens if you forget to use await with an async function call?',
    scenario: 'You are debugging an async function that is not working as expected.',
    difficulty: 'Medium',
    options: [
      'The function throws an error',
      'The function returns undefined',
      'The function returns a Promise instead of the resolved value',
      'The function runs synchronously'
    ],
    correctAnswer: 'The function returns a Promise instead of the resolved value',
    topic: 'Promises & Async',
    type: 'multiple-choice'
  },
  {
    id: 'js-mc-004',
    text: 'Which Promise method continues execution even if some Promises fail?',
    scenario: 'You want to fetch data from multiple sources but continue even if some fail.',
    difficulty: 'Hard',
    options: [
      'Promise.all()',
      'Promise.race()',
      'Promise.allSettled()',
      'Promise.any()'
    ],
    correctAnswer: 'Promise.allSettled()',
    topic: 'Promises & Async',
    type: 'multiple-choice'
  },
  {
    id: 'js-mc-005',
    text: 'In which order will these console.log statements execute?\n\nconsole.log("1");\nPromise.resolve().then(() => console.log("2"));\nsetTimeout(() => console.log("3"), 0);\nconsole.log("4");',
    scenario: 'You need to understand the event loop and Promise execution order.',
    difficulty: 'Hard',
    options: [
      '1, 2, 3, 4',
      '1, 3, 4, 2',
      '1, 4, 2, 3',
      '1, 2, 4, 3'
    ],
    correctAnswer: '1, 4, 2, 3',
    topic: 'Promises & Async',
    type: 'multiple-choice'
  }
];