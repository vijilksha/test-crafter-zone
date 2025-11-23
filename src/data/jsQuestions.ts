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
  }
];
