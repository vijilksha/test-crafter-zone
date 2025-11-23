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
  },

  // ========== QUESTION 6: DOM MANIPULATION ==========
  {
    id: 'js-dom-001',
    title: 'Dynamic List Manager',
    scenario: 'Build a simple task list manager that can add and remove items from the DOM.',
    difficulty: 'Easy',
    topic: 'DOM Manipulation',
    type: 'code',
    instructions: `Create a function called 'addTaskToList' that:
1. Takes a task text string as parameter
2. Creates a new li element
3. Sets the text content to the task text
4. Appends it to the ul element with id "taskList"

Example:
addTaskToList("Buy groceries") → adds <li>Buy groceries</li> to #taskList`,
    starterCode: {
      html: `<ul id="taskList"></ul>`,
      js: `function addTaskToList(taskText) {
  // Create li element and add to taskList
  
}`
    },
    testCases: [
      {
        name: 'Test 1: Create and append element correctly',
        test: (code) => {
          try {
            document.body.innerHTML = '<ul id="taskList"></ul>';
            const testFunction = new Function('document', code + '; return addTaskToList;');
            const addTaskToList = testFunction(document);
            addTaskToList("Test Task");
            const list = document.getElementById('taskList');
            if (!list || list.children.length !== 1) {
              throw new Error('Should add exactly 1 li element to the list');
            }
            if (list.children[0].textContent !== 'Test Task') {
              throw new Error('Li element should contain "Test Task"');
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      },
      {
        name: 'Test 2: Add multiple tasks',
        test: (code) => {
          try {
            document.body.innerHTML = '<ul id="taskList"></ul>';
            const testFunction = new Function('document', code + '; return addTaskToList;');
            const addTaskToList = testFunction(document);
            addTaskToList("Task 1");
            addTaskToList("Task 2");
            const list = document.getElementById('taskList');
            if (list.children.length !== 2) {
              throw new Error('Should add 2 li elements');
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

  // ========== QUESTION 7: ARRAY REDUCE ==========
  {
    id: 'js-array-001',
    title: 'Calculate Average Score',
    scenario: 'Calculate the average score from an array of student scores.',
    difficulty: 'Medium',
    topic: 'Array Methods',
    type: 'code',
    instructions: `Create a function called 'calculateAverage' that:
1. Takes an array of numbers (scores) as parameter
2. Uses reduce() method to sum all scores
3. Returns the average (sum / count)
4. Returns 0 if array is empty

Example:
calculateAverage([80, 90, 75, 85]) → 82.5
calculateAverage([]) → 0`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function calculateAverage(scores) {
  // Use reduce() to calculate average
  
}`
    },
    testCases: [
      {
        name: 'Test 1: Calculate correct average',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return calculateAverage;');
            const calculateAverage = testFunction();
            const result = calculateAverage([80, 90, 75, 85]);
            if (result !== 82.5) {
              throw new Error(`Expected 82.5, got ${result}`);
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      },
      {
        name: 'Test 2: Handle empty array',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return calculateAverage;');
            const calculateAverage = testFunction();
            const result = calculateAverage([]);
            if (result !== 0) {
              throw new Error(`Expected 0 for empty array, got ${result}`);
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

  // ========== QUESTION 8: OBJECT METHODS ==========
  {
    id: 'js-objects-001',
    title: 'User Profile Manager',
    scenario: 'Create a user object with methods to update profile information.',
    difficulty: 'Medium',
    topic: 'Objects & Methods',
    type: 'code',
    instructions: `Create an object called 'user' with:
1. Properties: name (string), email (string), age (number)
2. A method 'updateEmail' that takes new email and updates the email property
3. A method 'getInfo' that returns a string: "Name: [name], Email: [email], Age: [age]"

Example:
user.updateEmail("new@email.com")
user.getInfo() → "Name: John, Email: new@email.com, Age: 30"`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `const user = {
  name: 'John',
  email: 'john@email.com',
  age: 30,
  updateEmail: function(newEmail) {
    // Update email property
    
  },
  getInfo: function() {
    // Return info string
    
  }
};`
    },
    testCases: [
      {
        name: 'Test 1: updateEmail method works',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return user;');
            const user = testFunction();
            user.updateEmail('test@example.com');
            if (user.email !== 'test@example.com') {
              throw new Error('updateEmail should update the email property');
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      },
      {
        name: 'Test 2: getInfo returns correct format',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return user;');
            const user = testFunction();
            const info = user.getInfo();
            if (!info.includes('Name:') || !info.includes('Email:') || !info.includes('Age:')) {
              throw new Error('getInfo should return formatted string with all properties');
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

  // ========== QUESTION 9: ES6 CLASSES ==========
  {
    id: 'js-class-001',
    title: 'Rectangle Class',
    scenario: 'Create a Rectangle class with methods to calculate area and perimeter.',
    difficulty: 'Medium',
    topic: 'ES6 Classes',
    type: 'code',
    instructions: `Create a class called 'Rectangle' with:
1. Constructor that takes width and height parameters
2. Method 'getArea()' that returns width * height
3. Method 'getPerimeter()' that returns 2 * (width + height)

Example:
const rect = new Rectangle(5, 10);
rect.getArea() → 50
rect.getPerimeter() → 30`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `class Rectangle {
  // Add constructor and methods
  
}`
    },
    testCases: [
      {
        name: 'Test 1: Constructor and getArea work',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return Rectangle;');
            const Rectangle = testFunction();
            const rect = new Rectangle(5, 10);
            if (rect.getArea() !== 50) {
              throw new Error('getArea should return width * height');
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      },
      {
        name: 'Test 2: getPerimeter calculates correctly',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return Rectangle;');
            const Rectangle = testFunction();
            const rect = new Rectangle(5, 10);
            if (rect.getPerimeter() !== 30) {
              throw new Error('getPerimeter should return 2 * (width + height)');
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

  // ========== QUESTION 10: CLOSURES ==========
  {
    id: 'js-closure-001',
    title: 'Counter Function',
    scenario: 'Create a counter using closures to maintain private state.',
    difficulty: 'Hard',
    topic: 'Closures',
    type: 'code',
    instructions: `Create a function called 'createCounter' that:
1. Returns an object with methods: increment(), decrement(), getValue()
2. Uses closure to maintain a private count variable
3. increment() increases count by 1
4. decrement() decreases count by 1
5. getValue() returns current count

Example:
const counter = createCounter();
counter.increment(); // count is now 1
counter.increment(); // count is now 2
counter.decrement(); // count is now 1
counter.getValue() → 1`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function createCounter() {
  // Create private count variable
  // Return object with methods
  
}`
    },
    testCases: [
      {
        name: 'Test 1: increment and getValue work',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return createCounter;');
            const createCounter = testFunction();
            const counter = createCounter();
            counter.increment();
            counter.increment();
            if (counter.getValue() !== 2) {
              throw new Error('After 2 increments, getValue should return 2');
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      },
      {
        name: 'Test 2: decrement works',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return createCounter;');
            const createCounter = testFunction();
            const counter = createCounter();
            counter.increment();
            counter.increment();
            counter.decrement();
            if (counter.getValue() !== 1) {
              throw new Error('After 2 increments and 1 decrement, getValue should return 1');
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      },
      {
        name: 'Test 3: Each counter instance is independent',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return createCounter;');
            const createCounter = testFunction();
            const counter1 = createCounter();
            const counter2 = createCounter();
            counter1.increment();
            counter1.increment();
            counter2.increment();
            if (counter1.getValue() !== 2 || counter2.getValue() !== 1) {
              throw new Error('Each counter should maintain its own state');
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

  // ========== QUESTION 11: ERROR HANDLING ==========
  {
    id: 'js-error-001',
    title: 'Safe Division Function',
    scenario: 'Create a function that handles division errors gracefully.',
    difficulty: 'Easy',
    topic: 'Error Handling',
    type: 'code',
    instructions: `Create a function called 'safeDivide' that:
1. Takes two numbers: numerator and denominator
2. Returns the division result
3. Throws an error if denominator is 0 with message "Cannot divide by zero"
4. Use try-catch to handle the error and return null if error occurs

Example:
safeDivide(10, 2) → 5
safeDivide(10, 0) → null`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function safeDivide(numerator, denominator) {
  try {
    // Check for zero and throw error if needed
    // Return division result
    
  } catch (error) {
    // Handle error and return null
    
  }
}`
    },
    testCases: [
      {
        name: 'Test 1: Normal division works',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return safeDivide;');
            const safeDivide = testFunction();
            const result = safeDivide(10, 2);
            if (result !== 5) {
              throw new Error(`Expected 5, got ${result}`);
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      },
      {
        name: 'Test 2: Division by zero returns null',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return safeDivide;');
            const safeDivide = testFunction();
            const result = safeDivide(10, 0);
            if (result !== null) {
              throw new Error(`Division by zero should return null, got ${result}`);
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

  // ========== QUESTION 12: STRING METHODS ==========
  {
    id: 'js-string-001',
    title: 'Title Case Converter',
    scenario: 'Convert a string to title case where each word starts with a capital letter.',
    difficulty: 'Medium',
    topic: 'String Methods',
    type: 'code',
    instructions: `Create a function called 'toTitleCase' that:
1. Takes a string as parameter
2. Converts it to title case (first letter of each word capitalized)
3. Returns the converted string

Example:
toTitleCase("hello world") → "Hello World"
toTitleCase("the quick brown fox") → "The Quick Brown Fox"`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function toTitleCase(str) {
  // Convert to title case
  
}`
    },
    testCases: [
      {
        name: 'Test 1: Convert simple string',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return toTitleCase;');
            const toTitleCase = testFunction();
            const result = toTitleCase("hello world");
            if (result !== "Hello World") {
              throw new Error(`Expected "Hello World", got "${result}"`);
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      },
      {
        name: 'Test 2: Handle multiple words',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return toTitleCase;');
            const toTitleCase = testFunction();
            const result = toTitleCase("the quick brown fox");
            if (result !== "The Quick Brown Fox") {
              throw new Error(`Expected "The Quick Brown Fox", got "${result}"`);
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

  // ========== QUESTION 13: ARRAY FIND & FILTER ==========
  {
    id: 'js-array-002',
    title: 'Find Active Users',
    scenario: 'Filter and find users based on their active status.',
    difficulty: 'Easy',
    topic: 'Array Methods',
    type: 'code',
    instructions: `Create a function called 'getActiveUsers' that:
1. Takes an array of user objects (each with: name, isActive)
2. Uses filter() to return only active users (isActive === true)
3. Returns array of active user objects

Example:
const users = [
  { name: 'John', isActive: true },
  { name: 'Jane', isActive: false },
  { name: 'Bob', isActive: true }
];
getActiveUsers(users) → [{ name: 'John', isActive: true }, { name: 'Bob', isActive: true }]`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function getActiveUsers(users) {
  // Use filter to return only active users
  
}`
    },
    testCases: [
      {
        name: 'Test 1: Filter active users correctly',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return getActiveUsers;');
            const getActiveUsers = testFunction();
            const users = [
              { name: 'John', isActive: true },
              { name: 'Jane', isActive: false },
              { name: 'Bob', isActive: true }
            ];
            const result = getActiveUsers(users);
            if (result.length !== 2) {
              throw new Error(`Expected 2 active users, got ${result.length}`);
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

  // ========== QUESTION 14: TEMPLATE LITERALS ==========
  {
    id: 'js-template-001',
    title: 'Create User Greeting',
    scenario: 'Generate personalized greeting messages using template literals.',
    difficulty: 'Easy',
    topic: 'ES6 Features',
    type: 'code',
    instructions: `Create a function called 'greetUser' that:
1. Takes parameters: name, age, city
2. Uses template literals to return: "Hello [name]! You are [age] years old and live in [city]."

Example:
greetUser("Alice", 25, "New York") → "Hello Alice! You are 25 years old and live in New York."`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function greetUser(name, age, city) {
  // Use template literals to create greeting
  
}`
    },
    testCases: [
      {
        name: 'Test 1: Create correct greeting',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return greetUser;');
            const greetUser = testFunction();
            const result = greetUser("Alice", 25, "New York");
            if (result !== "Hello Alice! You are 25 years old and live in New York.") {
              throw new Error(`Greeting format incorrect. Got: ${result}`);
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

  // ========== QUESTION 15: SPREAD OPERATOR ==========
  {
    id: 'js-spread-001',
    title: 'Merge Arrays',
    scenario: 'Combine multiple arrays using the spread operator.',
    difficulty: 'Easy',
    topic: 'ES6 Features',
    type: 'code',
    instructions: `Create a function called 'mergeArrays' that:
1. Takes three arrays as parameters
2. Uses spread operator to combine them into one array
3. Returns the merged array

Example:
mergeArrays([1, 2], [3, 4], [5, 6]) → [1, 2, 3, 4, 5, 6]`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function mergeArrays(arr1, arr2, arr3) {
  // Use spread operator to merge arrays
  
}`
    },
    testCases: [
      {
        name: 'Test 1: Merge arrays correctly',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return mergeArrays;');
            const mergeArrays = testFunction();
            const result = mergeArrays([1, 2], [3, 4], [5, 6]);
            if (JSON.stringify(result) !== JSON.stringify([1, 2, 3, 4, 5, 6])) {
              throw new Error(`Expected [1, 2, 3, 4, 5, 6], got ${JSON.stringify(result)}`);
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

  // ========== QUESTION 16: ARRAY SOME & EVERY ==========
  {
    id: 'js-array-003',
    title: 'Check All Passed',
    scenario: 'Verify if all students passed the exam using array methods.',
    difficulty: 'Medium',
    topic: 'Array Methods',
    type: 'code',
    instructions: `Create a function called 'allPassed' that:
1. Takes an array of score objects (each with: name, score)
2. Uses every() method to check if all scores are >= 50
3. Returns true if all passed, false otherwise

Example:
allPassed([{name: 'John', score: 60}, {name: 'Jane', score: 55}]) → true
allPassed([{name: 'John', score: 60}, {name: 'Jane', score: 40}]) → false`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function allPassed(students) {
  // Use every() to check if all scores >= 50
  
}`
    },
    testCases: [
      {
        name: 'Test 1: All students passed',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return allPassed;');
            const allPassed = testFunction();
            const result = allPassed([{name: 'John', score: 60}, {name: 'Jane', score: 55}]);
            if (result !== true) {
              throw new Error('Should return true when all scores >= 50');
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      },
      {
        name: 'Test 2: Some students failed',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return allPassed;');
            const allPassed = testFunction();
            const result = allPassed([{name: 'John', score: 60}, {name: 'Jane', score: 40}]);
            if (result !== false) {
              throw new Error('Should return false when any score < 50');
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

  // ========== QUESTION 17: MAP & REDUCE COMBINATION ==========
  {
    id: 'js-array-004',
    title: 'Calculate Total Price',
    scenario: 'Calculate the total price of items in a shopping cart.',
    difficulty: 'Medium',
    topic: 'Array Methods',
    type: 'code',
    instructions: `Create a function called 'calculateTotal' that:
1. Takes an array of items (each with: name, price, quantity)
2. Uses map() to calculate subtotal for each item (price * quantity)
3. Uses reduce() to sum all subtotals
4. Returns the total

Example:
calculateTotal([
  {name: 'Apple', price: 2, quantity: 3},
  {name: 'Banana', price: 1, quantity: 5}
]) → 11`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function calculateTotal(items) {
  // Use map and reduce to calculate total
  
}`
    },
    testCases: [
      {
        name: 'Test 1: Calculate correct total',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return calculateTotal;');
            const calculateTotal = testFunction();
            const result = calculateTotal([
              {name: 'Apple', price: 2, quantity: 3},
              {name: 'Banana', price: 1, quantity: 5}
            ]);
            if (result !== 11) {
              throw new Error(`Expected 11, got ${result}`);
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

  // ========== QUESTION 18: DEFAULT PARAMETERS ==========
  {
    id: 'js-params-001',
    title: 'Calculate Discount',
    scenario: 'Calculate discounted price with optional discount parameter.',
    difficulty: 'Easy',
    topic: 'ES6 Features',
    type: 'code',
    instructions: `Create a function called 'applyDiscount' that:
1. Takes parameters: price, discount (default 10%)
2. Returns the price after applying discount
3. Discount should be a percentage (10 means 10%)

Example:
applyDiscount(100) → 90 (default 10% discount)
applyDiscount(100, 20) → 80 (20% discount)`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function applyDiscount(price, discount = 10) {
  // Calculate and return discounted price
  
}`
    },
    testCases: [
      {
        name: 'Test 1: Default discount works',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return applyDiscount;');
            const applyDiscount = testFunction();
            const result = applyDiscount(100);
            if (result !== 90) {
              throw new Error(`Expected 90, got ${result}`);
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      },
      {
        name: 'Test 2: Custom discount works',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return applyDiscount;');
            const applyDiscount = testFunction();
            const result = applyDiscount(100, 20);
            if (result !== 80) {
              throw new Error(`Expected 80, got ${result}`);
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

  // ========== QUESTION 19: OBJECT KEYS & VALUES ==========
  {
    id: 'js-objects-002',
    title: 'Count Properties',
    scenario: 'Count the number of properties in an object.',
    difficulty: 'Easy',
    topic: 'Objects & Methods',
    type: 'code',
    instructions: `Create a function called 'countProperties' that:
1. Takes an object as parameter
2. Uses Object.keys() to get all property names
3. Returns the count of properties

Example:
countProperties({name: 'John', age: 30, city: 'NYC'}) → 3
countProperties({}) → 0`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function countProperties(obj) {
  // Use Object.keys() to count properties
  
}`
    },
    testCases: [
      {
        name: 'Test 1: Count properties correctly',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return countProperties;');
            const countProperties = testFunction();
            const result = countProperties({name: 'John', age: 30, city: 'NYC'});
            if (result !== 3) {
              throw new Error(`Expected 3, got ${result}`);
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      },
      {
        name: 'Test 2: Handle empty object',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return countProperties;');
            const countProperties = testFunction();
            const result = countProperties({});
            if (result !== 0) {
              throw new Error(`Expected 0 for empty object, got ${result}`);
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

  // ========== QUESTION 20: FIND MAX VALUE ==========
  {
    id: 'js-math-001',
    title: 'Find Maximum Number',
    scenario: 'Find the largest number in an array.',
    difficulty: 'Easy',
    topic: 'JavaScript Basics',
    type: 'code',
    instructions: `Create a function called 'findMax' that:
1. Takes an array of numbers as parameter
2. Returns the largest number
3. Can use Math.max() with spread operator

Example:
findMax([3, 7, 2, 9, 1]) → 9
findMax([10]) → 10`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function findMax(numbers) {
  // Find and return the maximum number
  
}`
    },
    testCases: [
      {
        name: 'Test 1: Find max in array',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return findMax;');
            const findMax = testFunction();
            const result = findMax([3, 7, 2, 9, 1]);
            if (result !== 9) {
              throw new Error(`Expected 9, got ${result}`);
            }
            return true;
          } catch (error) {
            console.error('Test failed:', error);
            return false;
          }
        }
      },
      {
        name: 'Test 2: Single element array',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return findMax;');
            const findMax = testFunction();
            const result = findMax([10]);
            if (result !== 10) {
              throw new Error(`Expected 10, got ${result}`);
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
  
  // ========== NEW MEDIUM LEVEL QUESTIONS ==========
  
  // QUESTION 21: Shopping Cart Total with Tax
  {
    id: 'js-medium-021',
    title: 'Shopping Cart Total Calculator',
    scenario: 'You are building an e-commerce application that needs to calculate the total price of items in a shopping cart including tax.',
    difficulty: 'Medium',
    topic: 'Array Methods (reduce)',
    type: 'code',
    instructions: `Create a function called 'calculateCartTotal' that:
1. Takes an array of product objects (each with 'price' and 'quantity' properties)
2. Takes a tax rate as a decimal (e.g., 0.08 for 8%)
3. Returns the total cost including tax, rounded to 2 decimal places

Example:
const cart = [{price: 10, quantity: 2}, {price: 5, quantity: 3}];
calculateCartTotal(cart, 0.1) → 38.50 (subtotal: 35, tax: 3.50)`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function calculateCartTotal(cart, taxRate) {
  // Write your code here using reduce
  
}

// Test your function
const cart = [{price: 10, quantity: 2}, {price: 5, quantity: 3}];
console.log(calculateCartTotal(cart, 0.1));`
    },
    testCases: [
      {
        name: 'Test 1: Empty cart returns 0',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return calculateCartTotal;');
            const calculateCartTotal = testFunction();
            const result = calculateCartTotal([], 0.1);
            return result === 0;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 2: Calculates correct total with tax',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return calculateCartTotal;');
            const calculateCartTotal = testFunction();
            const cart = [{price: 10, quantity: 2}, {price: 5, quantity: 3}];
            const result = calculateCartTotal(cart, 0.1);
            return Math.abs(result - 38.5) < 0.01;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 3: Handles single item correctly',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return calculateCartTotal;');
            const calculateCartTotal = testFunction();
            const cart = [{price: 100, quantity: 1}];
            const result = calculateCartTotal(cart, 0.2);
            return Math.abs(result - 120) < 0.01;
          } catch (error) {
            return false;
          }
        }
      }
    ]
  },

  // QUESTION 22: Filter Active Users
  {
    id: 'js-medium-022',
    title: 'Active User Filter',
    scenario: 'Your social media platform needs to filter and display only active users who have logged in within the last 30 days.',
    difficulty: 'Medium',
    topic: 'Array Methods (filter)',
    type: 'code',
    instructions: `Create a function called 'getActiveUsers' that:
1. Takes an array of user objects (each with 'name', 'lastLogin' date string)
2. Returns only users who logged in within the last 30 days
3. Sorts them by lastLogin date (most recent first)

Example:
const users = [
  {name: 'Alice', lastLogin: '2024-01-15'},
  {name: 'Bob', lastLogin: '2023-11-20'}
];
getActiveUsers(users, '2024-01-20') → [{name: 'Alice', ...}]`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function getActiveUsers(users, currentDate) {
  // Write your code here using filter and sort
  
}

// Test your function
const users = [
  {name: 'Alice', lastLogin: '2024-01-15'},
  {name: 'Bob', lastLogin: '2023-11-20'}
];
console.log(getActiveUsers(users, '2024-01-20'));`
    },
    testCases: [
      {
        name: 'Test 1: Filters users within 30 days',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return getActiveUsers;');
            const getActiveUsers = testFunction();
            const users = [
              {name: 'Alice', lastLogin: '2024-01-15'},
              {name: 'Bob', lastLogin: '2023-11-20'}
            ];
            const result = getActiveUsers(users, '2024-01-20');
            return result.length === 1 && result[0].name === 'Alice';
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 2: Returns empty array if no active users',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return getActiveUsers;');
            const getActiveUsers = testFunction();
            const users = [{name: 'Alice', lastLogin: '2023-01-15'}];
            const result = getActiveUsers(users, '2024-01-20');
            return result.length === 0;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 3: Sorts by most recent login',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return getActiveUsers;');
            const getActiveUsers = testFunction();
            const users = [
              {name: 'Alice', lastLogin: '2024-01-10'},
              {name: 'Bob', lastLogin: '2024-01-18'}
            ];
            const result = getActiveUsers(users, '2024-01-20');
            return result[0].name === 'Bob';
          } catch (error) {
            return false;
          }
        }
      }
    ]
  },

  // QUESTION 23: Form Validation
  {
    id: 'js-medium-023',
    title: 'Form Field Validator',
    scenario: 'You need to validate a user registration form to ensure all required fields meet specific criteria.',
    difficulty: 'Medium',
    topic: 'Array Methods (every, some)',
    type: 'code',
    instructions: `Create a function called 'validateForm' that:
1. Takes a form object with fields: {email, password, age, terms}
2. Validates: email contains '@', password length > 8, age >= 18, terms === true
3. Returns an object: {valid: boolean, errors: string[]}

Example:
validateForm({email: 'test@example.com', password: 'password123', age: 25, terms: true})
→ {valid: true, errors: []}`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function validateForm(formData) {
  // Write your code here
  
}

// Test your function
const form = {
  email: 'test@example.com',
  password: 'password123',
  age: 25,
  terms: true
};
console.log(validateForm(form));`
    },
    testCases: [
      {
        name: 'Test 1: Valid form returns {valid: true, errors: []}',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return validateForm;');
            const validateForm = testFunction();
            const form = {email: 'test@example.com', password: 'password123', age: 25, terms: true};
            const result = validateForm(form);
            return result.valid === true && result.errors.length === 0;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 2: Invalid email adds error',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return validateForm;');
            const validateForm = testFunction();
            const form = {email: 'invalid', password: 'password123', age: 25, terms: true};
            const result = validateForm(form);
            return result.valid === false && result.errors.length > 0;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 3: Multiple errors detected',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return validateForm;');
            const validateForm = testFunction();
            const form = {email: 'invalid', password: 'short', age: 15, terms: false};
            const result = validateForm(form);
            return result.valid === false && result.errors.length >= 2;
          } catch (error) {
            return false;
          }
        }
      }
    ]
  },

  // QUESTION 24: Transform User Data
  {
    id: 'js-medium-024',
    title: 'User Data Transformer',
    scenario: 'Your API returns user data in one format, but your frontend needs it in a different structure.',
    difficulty: 'Medium',
    topic: 'Array Methods (map), Object Destructuring',
    type: 'code',
    instructions: `Create a function called 'transformUsers' that:
1. Takes an array of user objects: {firstName, lastName, email, age, city}
2. Returns an array with: {fullName, contact: {email}, location: city, isAdult}
3. fullName = firstName + lastName, isAdult = age >= 18

Example:
transformUsers([{firstName: 'John', lastName: 'Doe', email: 'john@example.com', age: 25, city: 'NYC'}])
→ [{fullName: 'John Doe', contact: {email: 'john@example.com'}, location: 'NYC', isAdult: true}]`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function transformUsers(users) {
  // Write your code here using map
  
}

// Test your function
const users = [
  {firstName: 'John', lastName: 'Doe', email: 'john@example.com', age: 25, city: 'NYC'}
];
console.log(transformUsers(users));`
    },
    testCases: [
      {
        name: 'Test 1: Transforms single user correctly',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return transformUsers;');
            const transformUsers = testFunction();
            const users = [{firstName: 'John', lastName: 'Doe', email: 'john@example.com', age: 25, city: 'NYC'}];
            const result = transformUsers(users);
            return result[0].fullName === 'John Doe' && result[0].isAdult === true;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 2: Correctly identifies minor',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return transformUsers;');
            const transformUsers = testFunction();
            const users = [{firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', age: 16, city: 'LA'}];
            const result = transformUsers(users);
            return result[0].isAdult === false;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 3: Nests email in contact object',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return transformUsers;');
            const transformUsers = testFunction();
            const users = [{firstName: 'Bob', lastName: 'Jones', email: 'bob@example.com', age: 30, city: 'SF'}];
            const result = transformUsers(users);
            return result[0].contact.email === 'bob@example.com';
          } catch (error) {
            return false;
          }
        }
      }
    ]
  },

  // QUESTION 25: Product Inventory Manager
  {
    id: 'js-medium-025',
    title: 'Product Inventory Manager',
    scenario: 'You are managing a warehouse inventory system that needs to track product stock levels.',
    difficulty: 'Medium',
    topic: 'Object Methods, Object.keys',
    type: 'code',
    instructions: `Create a function called 'getLowStock' that:
1. Takes an inventory object where keys are product names and values are quantities
2. Takes a threshold number
3. Returns an array of product names with quantities below the threshold

Example:
const inventory = {apples: 5, bananas: 15, oranges: 2};
getLowStock(inventory, 10) → ['apples', 'oranges']`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function getLowStock(inventory, threshold) {
  // Write your code here using Object.keys
  
}

// Test your function
const inventory = {apples: 5, bananas: 15, oranges: 2};
console.log(getLowStock(inventory, 10));`
    },
    testCases: [
      {
        name: 'Test 1: Returns products below threshold',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return getLowStock;');
            const getLowStock = testFunction();
            const inventory = {apples: 5, bananas: 15, oranges: 2};
            const result = getLowStock(inventory, 10);
            return result.length === 2 && result.includes('apples') && result.includes('oranges');
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 2: Returns empty array if all stock sufficient',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return getLowStock;');
            const getLowStock = testFunction();
            const inventory = {apples: 15, bananas: 20};
            const result = getLowStock(inventory, 10);
            return result.length === 0;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 3: Returns all products if threshold is high',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return getLowStock;');
            const getLowStock = testFunction();
            const inventory = {apples: 5, bananas: 3};
            const result = getLowStock(inventory, 10);
            return result.length === 2;
          } catch (error) {
            return false;
          }
        }
      }
    ]
  },

  // QUESTION 26: ES6 Class - Bank Account
  {
    id: 'js-medium-026',
    title: 'Bank Account Class',
    scenario: 'You need to create a simple banking system that tracks account balances and transactions.',
    difficulty: 'Medium',
    topic: 'ES6 Classes',
    type: 'code',
    instructions: `Create a class called 'BankAccount' that:
1. Constructor takes accountNumber and initialBalance
2. Has methods: deposit(amount), withdraw(amount), getBalance()
3. withdraw() should not allow negative balance
4. Both methods should return the new balance or false if invalid

Example:
const account = new BankAccount('123', 100);
account.deposit(50) → 150
account.withdraw(200) → false`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `class BankAccount {
  // Write your constructor and methods here
  
}

// Test your class
const account = new BankAccount('123', 100);
console.log(account.deposit(50));
console.log(account.withdraw(30));`
    },
    testCases: [
      {
        name: 'Test 1: Deposit increases balance',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return BankAccount;');
            const BankAccount = testFunction();
            const account = new BankAccount('123', 100);
            const result = account.deposit(50);
            return result === 150;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 2: Withdraw decreases balance',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return BankAccount;');
            const BankAccount = testFunction();
            const account = new BankAccount('123', 100);
            const result = account.withdraw(30);
            return result === 70;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 3: Cannot overdraw account',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return BankAccount;');
            const BankAccount = testFunction();
            const account = new BankAccount('123', 100);
            const result = account.withdraw(200);
            return result === false && account.getBalance() === 100;
          } catch (error) {
            return false;
          }
        }
      }
    ]
  },

  // QUESTION 27: Closure Counter
  {
    id: 'js-medium-027',
    title: 'Counter with Closure',
    scenario: 'You need to create a private counter that can only be modified through specific methods.',
    difficulty: 'Medium',
    topic: 'Closures',
    type: 'code',
    instructions: `Create a function called 'createCounter' that:
1. Returns an object with methods: increment(), decrement(), getValue()
2. Uses closure to keep count private
3. Count starts at 0 and cannot be accessed directly

Example:
const counter = createCounter();
counter.increment() → 1
counter.increment() → 2
counter.getValue() → 2`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function createCounter() {
  // Write your code here using closures
  
}

// Test your function
const counter = createCounter();
console.log(counter.increment());
console.log(counter.getValue());`
    },
    testCases: [
      {
        name: 'Test 1: Increment increases count',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return createCounter;');
            const createCounter = testFunction();
            const counter = createCounter();
            counter.increment();
            counter.increment();
            return counter.getValue() === 2;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 2: Decrement decreases count',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return createCounter;');
            const createCounter = testFunction();
            const counter = createCounter();
            counter.increment();
            counter.increment();
            counter.decrement();
            return counter.getValue() === 1;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 3: Multiple counters are independent',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return createCounter;');
            const createCounter = testFunction();
            const counter1 = createCounter();
            const counter2 = createCounter();
            counter1.increment();
            counter1.increment();
            counter2.increment();
            return counter1.getValue() === 2 && counter2.getValue() === 1;
          } catch (error) {
            return false;
          }
        }
      }
    ]
  },

  // QUESTION 28: Error Handler
  {
    id: 'js-medium-028',
    title: 'Safe Division Function',
    scenario: 'You need to create a division function that handles errors gracefully.',
    difficulty: 'Medium',
    topic: 'Error Handling, Try-Catch',
    type: 'code',
    instructions: `Create a function called 'safeDivide' that:
1. Takes two numbers (dividend and divisor)
2. Returns the division result rounded to 2 decimals
3. Throws error if divisor is 0 with message "Cannot divide by zero"
4. Returns error message if inputs are not numbers

Example:
safeDivide(10, 2) → 5.00
safeDivide(10, 0) → "Error: Cannot divide by zero"`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function safeDivide(dividend, divisor) {
  // Write your code here with try-catch
  
}

// Test your function
console.log(safeDivide(10, 2));
console.log(safeDivide(10, 0));`
    },
    testCases: [
      {
        name: 'Test 1: Divides numbers correctly',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return safeDivide;');
            const safeDivide = testFunction();
            const result = safeDivide(10, 2);
            return result === 5;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 2: Handles division by zero',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return safeDivide;');
            const safeDivide = testFunction();
            const result = safeDivide(10, 0);
            return typeof result === 'string' && result.includes('divide by zero');
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 3: Rounds to 2 decimal places',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return safeDivide;');
            const safeDivide = testFunction();
            const result = safeDivide(10, 3);
            return Math.abs(result - 3.33) < 0.01;
          } catch (error) {
            return false;
          }
        }
      }
    ]
  },

  // QUESTION 29: String Manipulation
  {
    id: 'js-medium-029',
    title: 'Title Case Converter',
    scenario: 'You need to format article titles by capitalizing the first letter of each word except small words.',
    difficulty: 'Medium',
    topic: 'String Methods, Template Literals',
    type: 'code',
    instructions: `Create a function called 'toTitleCase' that:
1. Takes a string and converts it to title case
2. Small words (a, an, the, in, on, at) stay lowercase unless first word
3. Returns the formatted string

Example:
toTitleCase("the quick brown fox") → "The Quick Brown Fox"
toTitleCase("a tale of two cities") → "A Tale of Two Cities"`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function toTitleCase(text) {
  // Write your code here
  
}

// Test your function
console.log(toTitleCase("the quick brown fox"));`
    },
    testCases: [
      {
        name: 'Test 1: Capitalizes all words',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return toTitleCase;');
            const toTitleCase = testFunction();
            const result = toTitleCase("hello world");
            return result === "Hello World";
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 2: First word always capitalized',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return toTitleCase;');
            const toTitleCase = testFunction();
            const result = toTitleCase("the quick fox");
            return result.startsWith("The");
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 3: Handles multiple spaces',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return toTitleCase;');
            const toTitleCase = testFunction();
            const result = toTitleCase("hello  world");
            return result.includes("Hello") && result.includes("World");
          } catch (error) {
            return false;
          }
        }
      }
    ]
  },

  // QUESTION 30: Template Literals
  {
    id: 'js-medium-030',
    title: 'Email Template Generator',
    scenario: 'You need to generate personalized email templates for customer notifications.',
    difficulty: 'Medium',
    topic: 'Template Literals, String Methods',
    type: 'code',
    instructions: `Create a function called 'generateEmail' that:
1. Takes an object: {name, orderNumber, total, items}
2. Returns a formatted email string using template literals
3. Include greeting, order details, and total

Example:
generateEmail({name: 'John', orderNumber: '12345', total: 99.99, items: 3})
→ "Dear John, Your order #12345 with 3 items totaling $99.99 has been confirmed."`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function generateEmail(orderData) {
  // Write your code here using template literals
  
}

// Test your function
const order = {name: 'John', orderNumber: '12345', total: 99.99, items: 3};
console.log(generateEmail(order));`
    },
    testCases: [
      {
        name: 'Test 1: Includes customer name',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return generateEmail;');
            const generateEmail = testFunction();
            const order = {name: 'John', orderNumber: '12345', total: 99.99, items: 3};
            const result = generateEmail(order);
            return result.includes('John');
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 2: Includes order number',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return generateEmail;');
            const generateEmail = testFunction();
            const order = {name: 'Jane', orderNumber: '67890', total: 49.99, items: 2};
            const result = generateEmail(order);
            return result.includes('67890');
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 3: Includes total amount',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return generateEmail;');
            const generateEmail = testFunction();
            const order = {name: 'Bob', orderNumber: '11111', total: 199.99, items: 5};
            const result = generateEmail(order);
            return result.includes('199.99');
          } catch (error) {
            return false;
          }
        }
      }
    ]
  },

  // QUESTION 31: Spread Operator - Merge Objects
  {
    id: 'js-medium-031',
    title: 'Object Merger with Defaults',
    scenario: 'You need to merge user preferences with default settings, with user preferences taking priority.',
    difficulty: 'Medium',
    topic: 'Spread Operator, Objects',
    type: 'code',
    instructions: `Create a function called 'mergeSettings' that:
1. Takes defaultSettings object and userSettings object
2. Returns merged object with user settings overriding defaults
3. Use spread operator to merge

Example:
const defaults = {theme: 'light', notifications: true, language: 'en'};
const user = {theme: 'dark'};
mergeSettings(defaults, user) → {theme: 'dark', notifications: true, language: 'en'}`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function mergeSettings(defaultSettings, userSettings) {
  // Write your code here using spread operator
  
}

// Test your function
const defaults = {theme: 'light', notifications: true};
const user = {theme: 'dark'};
console.log(mergeSettings(defaults, user));`
    },
    testCases: [
      {
        name: 'Test 1: User settings override defaults',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return mergeSettings;');
            const mergeSettings = testFunction();
            const defaults = {theme: 'light', notifications: true};
            const user = {theme: 'dark'};
            const result = mergeSettings(defaults, user);
            return result.theme === 'dark' && result.notifications === true;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 2: Preserves all default settings',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return mergeSettings;');
            const mergeSettings = testFunction();
            const defaults = {a: 1, b: 2, c: 3};
            const user = {a: 10};
            const result = mergeSettings(defaults, user);
            return result.a === 10 && result.b === 2 && result.c === 3;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 3: Handles empty user settings',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return mergeSettings;');
            const mergeSettings = testFunction();
            const defaults = {theme: 'light'};
            const user = {};
            const result = mergeSettings(defaults, user);
            return result.theme === 'light';
          } catch (error) {
            return false;
          }
        }
      }
    ]
  },

  // QUESTION 32: Array Spread
  {
    id: 'js-medium-032',
    title: 'Array Combiner',
    scenario: 'You need to combine multiple arrays of tags from different sources without duplicates.',
    difficulty: 'Medium',
    topic: 'Spread Operator, Arrays, Set',
    type: 'code',
    instructions: `Create a function called 'combineUniqueTags' that:
1. Takes multiple arrays of strings as arguments
2. Combines them and removes duplicates
3. Returns sorted array of unique tags

Example:
combineUniqueTags(['js', 'react'], ['js', 'node'], ['react', 'vue'])
→ ['js', 'node', 'react', 'vue']`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function combineUniqueTags(...arrays) {
  // Write your code here using spread and Set
  
}

// Test your function
console.log(combineUniqueTags(['js', 'react'], ['js', 'node']));`
    },
    testCases: [
      {
        name: 'Test 1: Removes duplicates',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return combineUniqueTags;');
            const combineUniqueTags = testFunction();
            const result = combineUniqueTags(['js', 'react'], ['js', 'node']);
            return result.length === 3 && result.includes('js');
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 2: Combines multiple arrays',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return combineUniqueTags;');
            const combineUniqueTags = testFunction();
            const result = combineUniqueTags(['a'], ['b'], ['c']);
            return result.length === 3;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 3: Returns sorted array',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return combineUniqueTags;');
            const combineUniqueTags = testFunction();
            const result = combineUniqueTags(['z', 'a'], ['m']);
            return result[0] === 'a' && result[result.length - 1] === 'z';
          } catch (error) {
            return false;
          }
        }
      }
    ]
  },

  // QUESTION 33: Default Parameters
  {
    id: 'js-medium-033',
    title: 'API Request Builder',
    scenario: 'You need to create an API request function with sensible defaults for common parameters.',
    difficulty: 'Medium',
    topic: 'Default Parameters, Objects',
    type: 'code',
    instructions: `Create a function called 'buildRequest' that:
1. Takes url (required), method='GET', headers={}, timeout=5000
2. Returns an object with all request parameters
3. Use default parameters

Example:
buildRequest('/api/users') 
→ {url: '/api/users', method: 'GET', headers: {}, timeout: 5000}`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function buildRequest(url, method = 'GET', headers = {}, timeout = 5000) {
  // Write your code here
  
}

// Test your function
console.log(buildRequest('/api/users'));
console.log(buildRequest('/api/users', 'POST'));`
    },
    testCases: [
      {
        name: 'Test 1: Uses default method',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return buildRequest;');
            const buildRequest = testFunction();
            const result = buildRequest('/api/users');
            return result.method === 'GET';
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 2: Allows method override',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return buildRequest;');
            const buildRequest = testFunction();
            const result = buildRequest('/api/users', 'POST');
            return result.method === 'POST';
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 3: Uses default timeout',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return buildRequest;');
            const buildRequest = testFunction();
            const result = buildRequest('/api/users');
            return result.timeout === 5000;
          } catch (error) {
            return false;
          }
        }
      }
    ]
  },

  // QUESTION 34: Math Operations
  {
    id: 'js-medium-034',
    title: 'Statistics Calculator',
    scenario: 'You need to calculate basic statistics for a dataset of test scores.',
    difficulty: 'Medium',
    topic: 'Math Operations, Array Methods',
    type: 'code',
    instructions: `Create a function called 'calculateStats' that:
1. Takes an array of numbers
2. Returns object with: {mean, median, min, max}
3. Round mean and median to 2 decimal places

Example:
calculateStats([10, 20, 30, 40, 50])
→ {mean: 30, median: 30, min: 10, max: 50}`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function calculateStats(numbers) {
  // Write your code here using Math methods
  
}

// Test your function
console.log(calculateStats([10, 20, 30, 40, 50]));`
    },
    testCases: [
      {
        name: 'Test 1: Calculates correct mean',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return calculateStats;');
            const calculateStats = testFunction();
            const result = calculateStats([10, 20, 30]);
            return result.mean === 20;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 2: Finds correct min and max',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return calculateStats;');
            const calculateStats = testFunction();
            const result = calculateStats([5, 10, 15, 20]);
            return result.min === 5 && result.max === 20;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 3: Calculates correct median',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return calculateStats;');
            const calculateStats = testFunction();
            const result = calculateStats([1, 2, 3, 4, 5]);
            return result.median === 3;
          } catch (error) {
            return false;
          }
        }
      }
    ]
  },

  // QUESTION 35: DOM Manipulation
  {
    id: 'js-medium-035',
    title: 'Dynamic List Creator',
    scenario: 'You need to dynamically create a list of items from an array and add them to the page.',
    difficulty: 'Medium',
    topic: 'DOM Manipulation, createElement',
    type: 'code',
    instructions: `Create a function called 'createList' that:
1. Takes an array of strings and a container ID
2. Creates a <ul> with <li> elements for each string
3. Appends the list to the container element

Example:
createList(['Apple', 'Banana', 'Cherry'], 'output')
→ Creates <ul><li>Apple</li><li>Banana</li><li>Cherry</li></ul>`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function createList(items, containerId) {
  // Write your code here using createElement
  
}

// Test your function
createList(['Apple', 'Banana', 'Cherry'], 'output');`
    },
    testCases: [
      {
        name: 'Test 1: Creates ul element',
        test: (code) => {
          try {
            document.getElementById('output').innerHTML = '';
            const testFunction = new Function('document', code + '; return createList;');
            const createList = testFunction(document);
            createList(['Apple'], 'output');
            const ul = document.querySelector('#output ul');
            return ul !== null;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 2: Creates correct number of li elements',
        test: (code) => {
          try {
            document.getElementById('output').innerHTML = '';
            const testFunction = new Function('document', code + '; return createList;');
            const createList = testFunction(document);
            createList(['Apple', 'Banana', 'Cherry'], 'output');
            const lis = document.querySelectorAll('#output li');
            return lis.length === 3;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 3: Li elements have correct text',
        test: (code) => {
          try {
            document.getElementById('output').innerHTML = '';
            const testFunction = new Function('document', code + '; return createList;');
            const createList = testFunction(document);
            createList(['Test'], 'output');
            const li = document.querySelector('#output li');
            return li && li.textContent === 'Test';
          } catch (error) {
            return false;
          }
        }
      }
    ]
  },

  // QUESTION 36: DOM Event Handling
  {
    id: 'js-medium-036',
    title: 'Click Counter',
    scenario: 'You need to create a button that counts how many times it has been clicked.',
    difficulty: 'Medium',
    topic: 'DOM Manipulation, Event Listeners',
    type: 'code',
    instructions: `Create a function called 'setupClickCounter' that:
1. Takes a button ID
2. Adds a click event listener to the button
3. Updates the button text to show click count

Example:
setupClickCounter('myButton')
→ Button text changes from "Click me" to "Clicked 1 times", "Clicked 2 times", etc.`,
    starterCode: {
      html: `<button id="counterBtn">Click me</button>`,
      js: `function setupClickCounter(buttonId) {
  // Write your code here
  
}

// Test your function
setupClickCounter('counterBtn');`
    },
    testCases: [
      {
        name: 'Test 1: Button exists and can be found',
        test: (code) => {
          try {
            const button = document.getElementById('counterBtn');
            if (!button) return false;
            button.textContent = 'Click me';
            const testFunction = new Function('document', code + '; return setupClickCounter;');
            const setupClickCounter = testFunction(document);
            setupClickCounter('counterBtn');
            return true;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 2: Button text updates on click',
        test: (code) => {
          try {
            const button = document.getElementById('counterBtn');
            button.textContent = 'Click me';
            const testFunction = new Function('document', code + '; return setupClickCounter;');
            const setupClickCounter = testFunction(document);
            setupClickCounter('counterBtn');
            button.click();
            return button.textContent.includes('1');
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 3: Counter increments correctly',
        test: (code) => {
          try {
            const button = document.getElementById('counterBtn');
            button.textContent = 'Click me';
            const testFunction = new Function('document', code + '; return setupClickCounter;');
            const setupClickCounter = testFunction(document);
            setupClickCounter('counterBtn');
            button.click();
            button.click();
            return button.textContent.includes('2');
          } catch (error) {
            return false;
          }
        }
      }
    ]
  },

  // QUESTION 37: Object.entries
  {
    id: 'js-medium-037',
    title: 'Query String Builder',
    scenario: 'You need to convert an object of parameters into a URL query string.',
    difficulty: 'Medium',
    topic: 'Object Methods, Object.entries',
    type: 'code',
    instructions: `Create a function called 'buildQueryString' that:
1. Takes an object of key-value pairs
2. Returns a URL query string (e.g., "?key1=value1&key2=value2")
3. Use Object.entries() to iterate

Example:
buildQueryString({search: 'laptop', price: 500, inStock: true})
→ "?search=laptop&price=500&inStock=true"`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function buildQueryString(params) {
  // Write your code here using Object.entries
  
}

// Test your function
console.log(buildQueryString({search: 'laptop', price: 500}));`
    },
    testCases: [
      {
        name: 'Test 1: Starts with question mark',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return buildQueryString;');
            const buildQueryString = testFunction();
            const result = buildQueryString({a: 1});
            return result.startsWith('?');
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 2: Includes all parameters',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return buildQueryString;');
            const buildQueryString = testFunction();
            const result = buildQueryString({search: 'laptop', price: 500});
            return result.includes('search=laptop') && result.includes('price=500');
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 3: Separates parameters with &',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return buildQueryString;');
            const buildQueryString = testFunction();
            const result = buildQueryString({a: 1, b: 2});
            return result.includes('&');
          } catch (error) {
            return false;
          }
        }
      }
    ]
  },

  // QUESTION 38: Array.find and findIndex
  {
    id: 'js-medium-038',
    title: 'User Lookup',
    scenario: 'You need to find a specific user in a database array and update their information.',
    difficulty: 'Medium',
    topic: 'Array Methods (find, findIndex)',
    type: 'code',
    instructions: `Create a function called 'updateUserEmail' that:
1. Takes users array, userId, and newEmail
2. Finds the user by ID and updates their email
3. Returns the updated user object or null if not found

Example:
const users = [{id: 1, email: 'old@example.com'}, {id: 2, email: 'test@example.com'}];
updateUserEmail(users, 1, 'new@example.com') 
→ {id: 1, email: 'new@example.com'}`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function updateUserEmail(users, userId, newEmail) {
  // Write your code here using find and findIndex
  
}

// Test your function
const users = [{id: 1, email: 'old@example.com'}];
console.log(updateUserEmail(users, 1, 'new@example.com'));`
    },
    testCases: [
      {
        name: 'Test 1: Updates correct user email',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return updateUserEmail;');
            const updateUserEmail = testFunction();
            const users = [{id: 1, email: 'old@example.com'}];
            const result = updateUserEmail(users, 1, 'new@example.com');
            return result && result.email === 'new@example.com';
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 2: Returns null for non-existent user',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return updateUserEmail;');
            const updateUserEmail = testFunction();
            const users = [{id: 1, email: 'test@example.com'}];
            const result = updateUserEmail(users, 999, 'new@example.com');
            return result === null;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 3: Does not affect other users',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return updateUserEmail;');
            const updateUserEmail = testFunction();
            const users = [{id: 1, email: 'user1@example.com'}, {id: 2, email: 'user2@example.com'}];
            updateUserEmail(users, 1, 'updated@example.com');
            return users[1].email === 'user2@example.com';
          } catch (error) {
            return false;
          }
        }
      }
    ]
  },

  // QUESTION 39: Async/Promises (simulated)
  {
    id: 'js-medium-039',
    title: 'Data Fetcher with Timeout',
    scenario: 'You need to simulate fetching data with a timeout mechanism.',
    difficulty: 'Medium',
    topic: 'Promises, Async Operations',
    type: 'code',
    instructions: `Create a function called 'fetchWithTimeout' that:
1. Takes data and delay (milliseconds)
2. Returns a Promise that resolves with data after delay
3. Simulates async data fetching

Example:
fetchWithTimeout('Hello', 1000).then(data => console.log(data))
→ Logs "Hello" after 1 second`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function fetchWithTimeout(data, delay) {
  // Write your code here returning a Promise
  
}

// Test your function
fetchWithTimeout('Test', 100).then(data => {
  document.getElementById('output').textContent = data;
});`
    },
    testCases: [
      {
        name: 'Test 1: Returns a Promise',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return fetchWithTimeout;');
            const fetchWithTimeout = testFunction();
            const result = fetchWithTimeout('Test', 10);
            return result instanceof Promise;
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 2: Resolves with correct data',
        test: async (code) => {
          try {
            const testFunction = new Function(code + '; return fetchWithTimeout;');
            const fetchWithTimeout = testFunction();
            const result = await fetchWithTimeout('Hello', 10);
            return result === 'Hello';
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 3: Waits for specified delay',
        test: async (code) => {
          try {
            const testFunction = new Function(code + '; return fetchWithTimeout;');
            const fetchWithTimeout = testFunction();
            const start = Date.now();
            await fetchWithTimeout('Data', 50);
            const elapsed = Date.now() - start;
            return elapsed >= 45; // Allow small margin
          } catch (error) {
            return false;
          }
        }
      }
    ]
  },

  // QUESTION 40: Destructuring with Nested Objects
  {
    id: 'js-medium-040',
    title: 'Extract Nested Data',
    scenario: 'You need to extract specific values from deeply nested API response objects.',
    difficulty: 'Medium',
    topic: 'Object Destructuring, Nested Objects',
    type: 'code',
    instructions: `Create a function called 'extractUserData' that:
1. Takes an API response object with nested structure
2. Extracts: user.profile.name, user.profile.email, user.settings.theme
3. Returns a flat object with these three properties

Example:
const response = {user: {profile: {name: 'John', email: 'john@example.com'}, settings: {theme: 'dark'}}};
extractUserData(response) → {name: 'John', email: 'john@example.com', theme: 'dark'}`,
    starterCode: {
      html: `<div id="output"></div>`,
      js: `function extractUserData(apiResponse) {
  // Write your code here using destructuring
  
}

// Test your function
const response = {
  user: {
    profile: {name: 'John', email: 'john@example.com'},
    settings: {theme: 'dark'}
  }
};
console.log(extractUserData(response));`
    },
    testCases: [
      {
        name: 'Test 1: Extracts name correctly',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return extractUserData;');
            const extractUserData = testFunction();
            const response = {user: {profile: {name: 'John', email: 'john@example.com'}, settings: {theme: 'dark'}}};
            const result = extractUserData(response);
            return result.name === 'John';
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 2: Extracts email correctly',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return extractUserData;');
            const extractUserData = testFunction();
            const response = {user: {profile: {name: 'Jane', email: 'jane@example.com'}, settings: {theme: 'light'}}};
            const result = extractUserData(response);
            return result.email === 'jane@example.com';
          } catch (error) {
            return false;
          }
        }
      },
      {
        name: 'Test 3: Extracts theme correctly',
        test: (code) => {
          try {
            const testFunction = new Function(code + '; return extractUserData;');
            const extractUserData = testFunction();
            const response = {user: {profile: {name: 'Bob', email: 'bob@example.com'}, settings: {theme: 'blue'}}};
            const result = extractUserData(response);
            return result.theme === 'blue';
          } catch (error) {
            return false;
          }
        }
      }
    ]
  }
];
