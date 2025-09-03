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
    id: 'js-es6-001',
    title: 'ES6 Arrow Functions & Template Literals',
    scenario: 'You are building a user profile component that needs to format user information using modern ES6 syntax.',
    difficulty: 'Easy',
    topic: 'ES6 Features',
    type: 'code',
    instructions: `Create a function called 'formatUserProfile' that:
1. Uses arrow function syntax
2. Takes a user object with properties: name, age, email
3. Returns a formatted string using template literals
4. Format: "Name: [name], Age: [age], Contact: [email]"`,
    starterCode: {
      html: `<div id="profile"></div>`,
      js: `// Create your arrow function here
const formatUserProfile = // Your code here

// Test with this user object
const user = { name: 'John Doe', age: 30, email: 'john@example.com' };`
    },
    testCases: [
      {
        name: 'Should format user profile with arrow function and template literals',
        test: async (code) => {
          try {
            // Create a more isolated evaluation context
            const testFunction = new Function('', code + '; return formatUserProfile;');
            const formatUserProfile = testFunction();
            const user = { name: 'John Doe', age: 30, email: 'john@example.com' };
            const result = formatUserProfile(user);
            
            return result === "Name: John Doe, Age: 30, Contact: john@example.com";
          } catch (error) {
            console.error('Test error:', error);
            return false;
          }
        }
      }
    ]
  },
  {
    id: 'js-promises-001',
    title: 'Promise Chain & Error Handling',
    scenario: 'You need to fetch user data from an API and handle the async operations properly.',
    difficulty: 'Medium',
    topic: 'Promises & Async',
    type: 'code',
    instructions: `Create a function called 'fetchUserData' that:
1. Returns a Promise that resolves with user data after 1 second
2. Create another function 'processUser' that chains the promise
3. Handle errors using .catch()
4. The function should return "User: [name], Age: [age]" format`,
    starterCode: {
      html: `<div id="result"></div>`,
      js: `// Simulate API call
const fetchUserData = () => {
  // Your promise implementation here
};

const processUser = () => {
  // Chain the promise and handle errors
};

// Test data to return
const userData = { name: 'Sarah', age: 28 };`
    },
    testCases: [
      {
        name: 'Should handle promises and return formatted user data',
        test: async (code) => {
          try {
            const testFunction = new Function('', code + '; return { fetchUserData, processUser };');
            const { fetchUserData, processUser } = testFunction();
            const result = await processUser();
            return result === "User: Sarah, Age: 28";
          } catch (error) {
            console.error('Test error:', error);
            return false;
          }
        }
      }
    ]
  },
  {
    id: 'js-async-await-001',
    title: 'Async/Await with Error Handling',
    scenario: 'Convert promise-based code to use async/await syntax with proper error handling.',
    difficulty: 'Medium',
    topic: 'Promises & Async',
    type: 'code',
    instructions: `Create an async function called 'getUserProfile' that:
1. Uses async/await syntax
2. Simulates fetching user data (resolve after 500ms)
3. Simulates fetching user preferences (resolve after 300ms)
4. Combines both results and returns { user, preferences }
5. Uses try/catch for error handling`,
    starterCode: {
      html: `<div id="profile"></div>`,
      js: `// Mock API functions (already implemented)
const fetchUser = () => Promise.resolve({ id: 1, name: 'John' });
const fetchPreferences = () => Promise.resolve({ theme: 'dark', lang: 'en' });

async function getUserProfile() {
  // Your async/await implementation here
}`
    },
    testCases: [
      {
        name: 'Should use async/await and combine results',
        test: async (code) => {
          try {
            const testFunction = new Function('', code + '; return getUserProfile;');
            const getUserProfile = testFunction();
            const result = await getUserProfile();
            return result && 
                   result.user && result.user.name === 'John' &&
                   result.preferences && result.preferences.theme === 'dark';
          } catch (error) {
            console.error('Test error:', error);
            return false;
          }
        }
      }
    ]
  },
  {
    id: 'ts-interfaces-001',
    text: 'What is the difference between interface and type in TypeScript? When would you use one over the other?',
    scenario: 'You are designing a TypeScript application and need to decide between using interfaces and type aliases for your data structures.',
    difficulty: 'Medium',
    options: [
      'Interfaces can be extended, types cannot be extended at all',
      'Interfaces support declaration merging, types support union types more naturally',
      'Types are only for primitive values, interfaces are for objects',
      'There is no difference, they are completely interchangeable'
    ],
    correctAnswer: 'Interfaces support declaration merging, types support union types more naturally',
    topic: 'TypeScript Interfaces',
    type: 'multiple-choice'
  },
  {
    id: 'ts-generics-001',
    text: 'What will be the return type of this TypeScript function: `function identity<T>(arg: T): T { return arg; }`?',
    scenario: 'You are reviewing TypeScript code that uses generics and need to understand the type inference.',
    difficulty: 'Medium',
    options: [
      'Always returns type T',
      'Returns the same type as the input argument',
      'Returns any type',
      'Returns unknown type'
    ],
    correctAnswer: 'Returns the same type as the input argument',
    topic: 'TypeScript Generics',
    type: 'multiple-choice'
  },
  {
    id: 'ts-utility-types-001',
    text: 'What does `Partial<User>` do in TypeScript?',
    scenario: 'You need to create a function that accepts a partial user object for updating user information.',
    difficulty: 'Easy',
    options: [
      'Makes all properties of User required',
      'Makes all properties of User optional',
      'Removes all properties from User',
      'Creates a union type with User'
    ],
    correctAnswer: 'Makes all properties of User optional',
    topic: 'TypeScript Utility Types',
    type: 'multiple-choice'
  },
  {
    id: 'ts-union-types-001',
    text: 'How do you narrow a union type `string | number` to just `string` in TypeScript?',
    scenario: 'You have a function parameter that can be either string or number, but you need to handle the string case specifically.',
    difficulty: 'Medium',
    options: [
      'Use instanceof operator',
      'Use typeof operator to check if it equals "string"',
      'Use Array.isArray() method',
      'Use Object.prototype.toString.call()'
    ],
    correctAnswer: 'Use typeof operator to check if it equals "string"',
    topic: 'TypeScript Union Types',
    type: 'multiple-choice'
  },
  {
    id: 'js-destructuring-002',
    title: 'Advanced Destructuring with Default Values',
    scenario: 'You need to extract data from nested objects with fallback values for missing properties.',
    difficulty: 'Medium',
    topic: 'ES6 Features',
    type: 'code',
    instructions: `Create a function called 'extractUserInfo' that:
1. Uses destructuring with default values
2. Extracts name (default: 'Anonymous'), age (default: 0)
3. Extracts address.city (default: 'Unknown') from nested object
4. Returns object with extracted values`,
    starterCode: {
      html: `<div id="userInfo"></div>`,
      js: `function extractUserInfo(user) {
  // Your destructuring code here with defaults
}

// Test with incomplete data
const testUser = { 
  name: 'Mike', 
  address: { street: '123 Main St' } 
  // Note: age and address.city are missing
};`
    },
    testCases: [
      {
        name: 'Should extract with default values for missing properties',
        test: async (code) => {
          try {
            const testFunction = new Function('', code + '; return extractUserInfo;');
            const extractUserInfo = testFunction();
            const testUser = { 
              name: 'Mike', 
              address: { street: '123 Main St' } 
            };
            const result = extractUserInfo(testUser);
            
            return result && 
                   result.name === 'Mike' &&
                   result.age === 0 &&
                   result.city === 'Unknown';
          } catch (error) {
            console.error('Test error:', error);
            return false;
          }
        }
      }
    ]
  },
  {
    id: 'js-map-filter-001',
    title: 'Array Methods: Map, Filter, Reduce',
    scenario: 'Process a list of products to calculate total value and filter by category.',
    difficulty: 'Medium',
    topic: 'ES6 Features',
    type: 'code',
    instructions: `Create a function called 'processProducts' that:
1. Takes an array of products and a category filter
2. Filters products by category using filter()
3. Maps to add 20% tax to each price using map()
4. Uses reduce() to calculate total value
5. Returns the total value rounded to 2 decimal places`,
    starterCode: {
      html: `<div id="products"></div>`,
      js: `function processProducts(products, category) {
  // Your code using map, filter, reduce
}

// Test data
const products = [
  { name: 'Laptop', price: 1000, category: 'electronics' },
  { name: 'Book', price: 20, category: 'books' },
  { name: 'Phone', price: 800, category: 'electronics' }
];`
    },
    testCases: [
      {
        name: 'Should filter electronics and calculate total with tax',
        test: async (code) => {
          try {
            const testFunction = new Function('', code + '; return processProducts;');
            const processProducts = testFunction();
            const products = [
              { name: 'Laptop', price: 1000, category: 'electronics' },
              { name: 'Book', price: 20, category: 'books' },
              { name: 'Phone', price: 800, category: 'electronics' }
            ];
            const result = processProducts(products, 'electronics');
            // Should be (1000 + 800) * 1.2 = 2160
            return Math.abs(result - 2160) < 0.01;
          } catch (error) {
            console.error('Test error:', error);
            return false;
          }
        }
      }
    ]
  },
  {
    id: 'ts-conditional-types-001',
    text: 'What does the TypeScript conditional type `T extends string ? string[] : T[]` mean?',
    scenario: 'You are working with advanced TypeScript types and need to understand conditional type syntax.',
    difficulty: 'Hard',
    options: [
      'If T is a string, return string[], otherwise return T[]',
      'If T extends from string class, return string array',
      'Always returns string[] regardless of T',
      'Creates a union type of T and string[]'
    ],
    correctAnswer: 'If T is a string, return string[], otherwise return T[]',
    topic: 'TypeScript Advanced Types',
    type: 'multiple-choice'
  },
  {
    id: 'ts-mapped-types-001',
    text: 'What does `{ [K in keyof T]: T[K] }` create in TypeScript?',
    scenario: 'You encounter this TypeScript syntax in a codebase and need to understand what it does.',
    difficulty: 'Hard',
    options: [
      'Creates a partial version of T',
      'Creates an exact copy of type T',
      'Creates a readonly version of T',
      'Creates a required version of T'
    ],
    correctAnswer: 'Creates an exact copy of type T',
    topic: 'TypeScript Mapped Types',
    type: 'multiple-choice'
  },
  {
    id: 'js-modules-001',
    text: 'What is the difference between `export default` and `export` in ES6 modules?',
    scenario: 'You are setting up a module system and need to decide how to export your functions and classes.',
    difficulty: 'Easy',
    options: [
      'export default can only be used once per module, export can be used multiple times',
      'export default is for functions, export is for variables',
      'No difference, they work the same way',
      'export default is deprecated, only use export'
    ],
    correctAnswer: 'export default can only be used once per module, export can be used multiple times',
    topic: 'ES6 Modules',
    type: 'multiple-choice'
  },
  {
    id: 'js-closures-001',
    text: 'What will this code output? `function outer() { let x = 1; return function inner() { console.log(x++); }; } const fn = outer(); fn(); fn();`',
    scenario: 'You are debugging JavaScript code that involves closures and need to predict the output.',
    difficulty: 'Medium',
    options: [
      '1, 1',
      '1, 2',
      'undefined, undefined',
      'Error: x is not defined'
    ],
    correctAnswer: '1, 2',
    topic: 'JavaScript Closures',
    type: 'multiple-choice'
  }
];