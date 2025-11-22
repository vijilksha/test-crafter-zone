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
  // ========== QUESTION 1: ARRAY SUM (BASICS) ==========
  {
    id: 'js-basics-001',
    title: 'Array Sum Calculator',
    scenario: 'You are building a calculator feature that needs to sum all numbers in an array.',
    difficulty: 'Easy',
    topic: 'JavaScript Basics',
    type: 'code',
    instructions: `Create a function called 'arraySum' that:
1. Takes an array of numbers as parameter
2. Returns the sum of all numbers in the array
3. Returns 0 if the array is empty

Example:
arraySum([1, 2, 3, 4]) → 10
arraySum([]) → 0
arraySum([5, -2, 8]) → 11`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function arraySum(numbers) {
  // Write your code here
  
}

// Test cases will check:
// - Empty array
// - Array with positive numbers
// - Array with negative numbers
// - Array with mixed numbers`
    },
    testCases: [
      {
        name: 'Test 1: Empty array should return 0',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return arraySum;');
            const arraySum = testFunction();
            const result = arraySum([]);
            if (result !== 0) {
              throw new Error(`Expected 0 for empty array, but got ${result}`);
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      },
      {
        name: 'Test 2: Sum of positive numbers [1, 2, 3, 4] should equal 10',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return arraySum;');
            const arraySum = testFunction();
            const result = arraySum([1, 2, 3, 4]);
            if (result !== 10) {
              throw new Error(`Expected 10, but got ${result}. Check your addition logic.`);
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      },
      {
        name: 'Test 3: Handle negative numbers [5, -2, 8, -3] should equal 8',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return arraySum;');
            const arraySum = testFunction();
            const result = arraySum([5, -2, 8, -3]);
            if (result !== 8) {
              throw new Error(`Expected 8, but got ${result}. Make sure to handle negative numbers correctly.`);
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      }
    ]
  },

  // ========== QUESTION 2: STRING REVERSAL (BASICS) ==========
  {
    id: 'js-basics-002',
    title: 'String Reversal',
    scenario: 'You need to reverse a string for a text processing application.',
    difficulty: 'Easy',
    topic: 'JavaScript Basics',
    type: 'code',
    instructions: `Create a function called 'reverseString' that:
1. Takes a string as parameter
2. Returns the reversed string
3. Should handle empty strings

Example:
reverseString("hello") → "olleh"
reverseString("") → ""
reverseString("JavaScript") → "tpircSavaJ"`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function reverseString(str) {
  // Write your code here
  
}

// Test cases will check:
// - Empty string
// - Single character
// - Multiple characters
// - String with spaces`
    },
    testCases: [
      {
        name: 'Test 1: Empty string should return empty string',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return reverseString;');
            const reverseString = testFunction();
            const result = reverseString("");
            if (result !== "") {
              throw new Error(`Expected empty string, but got "${result}"`);
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      },
      {
        name: 'Test 2: "hello" should return "olleh"',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return reverseString;');
            const reverseString = testFunction();
            const result = reverseString("hello");
            if (result !== "olleh") {
              throw new Error(`Expected "olleh", but got "${result}". Make sure you're reversing all characters.`);
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      },
      {
        name: 'Test 3: "hello world" should return "dlrow olleh"',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return reverseString;');
            const reverseString = testFunction();
            const result = reverseString("hello world");
            if (result !== "dlrow olleh") {
              throw new Error(`Expected "dlrow olleh", but got "${result}". Spaces should also be reversed.`);
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      }
    ]
  },

  // ========== QUESTION 3: OBJECT DESTRUCTURING (ES6) ==========
  {
    id: 'js-es6-001',
    title: 'User Data Extractor',
    scenario: 'You need to extract specific fields from user objects using ES6 destructuring.',
    difficulty: 'Medium',
    topic: 'ES6 Features',
    type: 'code',
    instructions: `Create a function called 'extractUserInfo' that:
1. Takes a user object with properties: name, age, email, address (nested object with city, country)
2. Uses ES6 destructuring to extract name, age, and city
3. Returns an object with these three properties
4. Must use destructuring syntax

Example input:
{ name: 'John', age: 30, email: 'john@test.com', address: { city: 'NYC', country: 'USA' } }

Expected output:
{ name: 'John', age: 30, city: 'NYC' }`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function extractUserInfo(user) {
  // Use ES6 destructuring to extract name, age, and address.city
  // Return an object with { name, age, city }
  
}

// Test cases will check:
// - Correct use of destructuring
// - Proper nested object access
// - Correct return format`
    },
    testCases: [
      {
        name: 'Test 1: Extract basic user info correctly',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return extractUserInfo;');
            const extractUserInfo = testFunction();
            const user = { name: 'John', age: 30, email: 'john@test.com', address: { city: 'NYC', country: 'USA' } };
            const result = extractUserInfo(user);
            if (!result || result.name !== 'John' || result.age !== 30 || result.city !== 'NYC') {
              throw new Error(`Expected {name: 'John', age: 30, city: 'NYC'}, but got ${JSON.stringify(result)}`);
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      },
      {
        name: 'Test 2: Handle different user data',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return extractUserInfo;');
            const extractUserInfo = testFunction();
            const user = { name: 'Sarah', age: 25, email: 'sarah@test.com', address: { city: 'London', country: 'UK' } };
            const result = extractUserInfo(user);
            if (!result || result.name !== 'Sarah' || result.age !== 25 || result.city !== 'London') {
              throw new Error(`Expected {name: 'Sarah', age: 25, city: 'London'}, but got ${JSON.stringify(result)}. Check nested destructuring.`);
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      },
      {
        name: 'Test 3: Return only required fields (not email)',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return extractUserInfo;');
            const extractUserInfo = testFunction();
            const user = { name: 'Bob', age: 35, email: 'bob@test.com', address: { city: 'Paris', country: 'France' } };
            const result = extractUserInfo(user);
            if (result.email !== undefined) {
              throw new Error(`Email should not be in the result. Only return name, age, and city.`);
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      }
    ]
  },

  // ========== QUESTION 4: ARROW FUNCTIONS & ARRAY METHODS (ES6) ==========
  {
    id: 'js-es6-002',
    title: 'Product Filter and Transform',
    scenario: 'You are building an e-commerce filter that needs to process product arrays using modern ES6 methods.',
    difficulty: 'Medium',
    topic: 'ES6 Features',
    type: 'code',
    instructions: `Create a function called 'processProducts' that:
1. Takes an array of product objects (each with: name, price, inStock)
2. Filters products that are in stock (inStock === true)
3. Maps the filtered products to return only names and prices
4. Must use arrow functions with filter() and map()
5. Returns array of objects with format: { name: string, price: number }

Example input:
[
  { name: 'Laptop', price: 1000, inStock: true },
  { name: 'Phone', price: 500, inStock: false },
  { name: 'Mouse', price: 50, inStock: true }
]

Expected output:
[
  { name: 'Laptop', price: 1000 },
  { name: 'Mouse', price: 50 }
]`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `const processProducts = (products) => {
  // Use filter() and map() with arrow functions
  // 1. Filter products where inStock is true
  // 2. Map to return only { name, price }
  
};

// Test cases will check:
// - Correct use of arrow functions
// - Proper filtering logic
// - Correct mapping of properties`
    },
    testCases: [
      {
        name: 'Test 1: Filter and transform products correctly',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return processProducts;');
            const processProducts = testFunction();
            const products = [
              { name: 'Laptop', price: 1000, inStock: true },
              { name: 'Phone', price: 500, inStock: false },
              { name: 'Mouse', price: 50, inStock: true }
            ];
            const result = processProducts(products);
            if (result.length !== 2) {
              throw new Error(`Expected 2 products in stock, but got ${result.length}. Check your filter logic.`);
            }
            if (result[0].name !== 'Laptop' || result[0].price !== 1000) {
              throw new Error(`First product should be {name: 'Laptop', price: 1000}, but got ${JSON.stringify(result[0])}`);
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      },
      {
        name: 'Test 2: Should not include inStock property in result',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return processProducts;');
            const processProducts = testFunction();
            const products = [
              { name: 'Keyboard', price: 100, inStock: true }
            ];
            const result = processProducts(products);
            if (result[0].inStock !== undefined) {
              throw new Error(`Result should only have name and price. Remove inStock property using map.`);
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      },
      {
        name: 'Test 3: Handle empty array and all out of stock',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return processProducts;');
            const processProducts = testFunction();
            const products = [
              { name: 'Item1', price: 100, inStock: false },
              { name: 'Item2', price: 200, inStock: false }
            ];
            const result = processProducts(products);
            if (result.length !== 0) {
              throw new Error(`Expected empty array when all products out of stock, but got ${result.length} items`);
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      }
    ]
  },

  // ========== QUESTION 5: PROMISES & ASYNC/AWAIT (ES6) ==========
  {
    id: 'js-es6-003',
    title: 'Async Data Fetcher',
    scenario: 'You need to fetch data from multiple sources asynchronously and combine the results.',
    difficulty: 'Hard',
    topic: 'ES6 Features',
    type: 'code',
    instructions: `Create an async function called 'fetchUserPosts' that:
1. Takes a userId as parameter
2. Simulates fetching user data (return promise that resolves after 100ms with { id: userId, name: 'User' + userId })
3. Simulates fetching posts (return promise that resolves after 100ms with array of 2 post objects)
4. Uses async/await to wait for both operations
5. Returns object with format: { user: userData, posts: postsData }

The function should:
- Use async/await syntax (not .then())
- Handle both fetch operations properly
- Return combined data in correct format

Example output for userId = 1:
{
  user: { id: 1, name: 'User1' },
  posts: [
    { id: 1, title: 'Post 1', userId: 1 },
    { id: 2, title: 'Post 2', userId: 1 }
  ]
}`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `async function fetchUserPosts(userId) {
  // Helper function to simulate user fetch
  const getUser = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: id, name: 'User' + id });
      }, 100);
    });
  };
  
  // Helper function to simulate posts fetch
  const getPosts = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, title: 'Post 1', userId: id },
          { id: 2, title: 'Post 2', userId: id }
        ]);
      }, 100);
    });
  };
  
  // Use async/await to fetch user and posts
  // Return { user: userData, posts: postsData }
  
}

// Test cases will check:
// - Correct async/await usage
// - Proper data fetching
// - Correct return format`
    },
    testCases: [
      {
        name: 'Test 1: Fetch and combine user and posts data',
        test: async (code) => {
          try {
            const testFunction = new Function(code + '; return fetchUserPosts;');
            const fetchUserPosts = testFunction();
            const result = await fetchUserPosts(1);
            if (!result.user || result.user.id !== 1 || result.user.name !== 'User1') {
              throw new Error(`User data incorrect. Expected {id: 1, name: 'User1'}, got ${JSON.stringify(result.user)}`);
            }
            if (!result.posts || result.posts.length !== 2) {
              throw new Error(`Posts data incorrect. Expected array of 2 posts, got ${result.posts?.length || 0}`);
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      },
      {
        name: 'Test 2: Handle different userId correctly',
        test: async (code) => {
          try {
            const testFunction = new Function(code + '; return fetchUserPosts;');
            const fetchUserPosts = testFunction();
            const result = await fetchUserPosts(5);
            if (result.user.id !== 5 || result.user.name !== 'User5') {
              throw new Error(`User data should reflect userId. Expected {id: 5, name: 'User5'}, got ${JSON.stringify(result.user)}`);
            }
            if (result.posts[0].userId !== 5) {
              throw new Error(`Posts should be linked to userId. Expected userId: 5 in posts, got ${result.posts[0].userId}`);
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      },
      {
        name: 'Test 3: Function must be async and return Promise',
        test: async (code) => {
          try {
            const testFunction = new Function(code + '; return fetchUserPosts;');
            const fetchUserPosts = testFunction();
            const result = fetchUserPosts(1);
            if (!(result instanceof Promise)) {
              throw new Error(`Function must be async and return a Promise. Make sure to use 'async function' syntax.`);
            }
            await result; // Wait for completion
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      }
    ]
  }
];
