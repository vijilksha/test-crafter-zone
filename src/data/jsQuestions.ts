interface JSTestCase {
  name: string;
  test: (html: string, js: string) => { passed: boolean; message: string };
}

interface JSCodeQuestion {
  id: number;
  title: string;
  scenario: string;
  difficulty: 'intermediate' | 'advanced';
  topic: string;
  type: 'js-code';
  instructions: string;
  starterCode: {
    html: string;
    js: string;
  };
  testCases: JSTestCase[];
}

interface MultipleChoiceQuestion {
  id: number;
  text: string;
  scenario: string;
  difficulty: 'intermediate' | 'advanced';
  options: string[];
  correctAnswer: number;
  topic: string;
  type: 'multiple-choice';
}

export type JSQuestion = JSCodeQuestion | MultipleChoiceQuestion;

const jsQuestions: JSQuestion[] = [
  {
    id: 101,
    title: "Dynamic List Management with DOM",
    scenario: "You're building a task management app where users can add, remove, and mark tasks as complete. The application needs to handle user interactions dynamically and update the DOM accordingly without page reloads.",
    difficulty: 'intermediate',
    topic: 'DOM Manipulation',
    type: 'js-code',
    instructions: "Create a dynamic task manager with the following features:\n1. Add new tasks when button is clicked\n2. Remove tasks when delete button is clicked\n3. Toggle task completion status\n4. Update task counter display\n5. Tasks should be stored in an array and DOM should reflect the current state",
    starterCode: {
      html: `<div id="task-manager">
  <h2>Task Manager</h2>
  <div class="task-input">
    <input type="text" id="taskInput" placeholder="Enter a new task">
    <button id="addBtn">Add Task</button>
  </div>
  <div id="taskCounter">Tasks: 0</div>
  <ul id="taskList"></ul>
</div>`,
      js: `// Task management system
let tasks = [];
let taskId = 0;

// Add your JavaScript code here`
    },
    testCases: [
      {
        name: "Add task functionality",
        test: (html, js) => {
          const hasAddEventListener = js.includes('addEventListener') && js.includes('addBtn');
          const hasTasksPush = js.includes('tasks.push') || js.includes('tasks[');
          return {
            passed: hasAddEventListener && hasTasksPush,
            message: hasAddEventListener && hasTasksPush ? "Add task functionality found" : "Missing add task event listener or array manipulation"
          };
        }
      },
      {
        name: "DOM manipulation",
        test: (html, js) => {
          const hasCreateElement = js.includes('createElement') || js.includes('innerHTML');
          const hasAppendChild = js.includes('appendChild') || js.includes('append');
          return {
            passed: hasCreateElement && hasAppendChild,
            message: hasCreateElement && hasAppendChild ? "DOM manipulation methods found" : "Missing createElement and appendChild methods"
          };
        }
      },
      {
        name: "Task counter update",
        test: (html, js) => {
          const hasCounterUpdate = js.includes('taskCounter') && (js.includes('textContent') || js.includes('innerHTML'));
          return {
            passed: hasCounterUpdate,
            message: hasCounterUpdate ? "Task counter update found" : "Missing task counter update logic"
          };
        }
      },
      {
        name: "Event delegation or removal",
        test: (html, js) => {
          const hasRemovalLogic = js.includes('remove') || js.includes('delete') || js.includes('filter');
          return {
            passed: hasRemovalLogic,
            message: hasRemovalLogic ? "Task removal logic found" : "Missing task removal functionality"
          };
        }
      }
    ]
  },
  {
    id: 102,
    title: "ES6 Array Methods & Functional Programming",
    scenario: "You're working with a dataset of products and need to implement filtering, sorting, and data transformation features using modern JavaScript. The application should demonstrate proficiency with ES6 array methods and functional programming concepts.",
    difficulty: 'advanced',
    topic: 'ES6 Features',
    type: 'js-code',
    instructions: "Implement product filtering and transformation:\n1. Filter products by category and price range\n2. Sort products by price or name\n3. Calculate total value using reduce\n4. Transform product data using map\n5. Use arrow functions, template literals, and destructuring\n6. Display results in the DOM",
    starterCode: {
      html: `<div id="product-manager">
  <h2>Product Manager</h2>
  <div class="filters">
    <select id="categoryFilter">
      <option value="">All Categories</option>
      <option value="electronics">Electronics</option>
      <option value="clothing">Clothing</option>
      <option value="books">Books</option>
    </select>
    <input type="number" id="maxPrice" placeholder="Max Price">
    <button id="filterBtn">Filter</button>
    <button id="sortBtn">Sort by Price</button>
  </div>
  <div id="totalValue">Total Value: $0</div>
  <div id="productList"></div>
</div>`,
      js: `// Sample product data
const products = [
  { id: 1, name: "Laptop", category: "electronics", price: 999 },
  { id: 2, name: "T-Shirt", category: "clothing", price: 25 },
  { id: 3, name: "JavaScript Book", category: "books", price: 45 },
  { id: 4, name: "Phone", category: "electronics", price: 699 },
  { id: 5, name: "Jeans", category: "clothing", price: 80 }
];

// Add your ES6 JavaScript code here`
    },
    testCases: [
      {
        name: "Array filter method",
        test: (html, js) => {
          const hasFilter = js.includes('.filter(') && js.includes('=>');
          return {
            passed: hasFilter,
            message: hasFilter ? "Array filter method with arrow function found" : "Missing filter method with arrow function"
          };
        }
      },
      {
        name: "Array reduce method",
        test: (html, js) => {
          const hasReduce = js.includes('.reduce(') && js.includes('=>');
          return {
            passed: hasReduce,
            message: hasReduce ? "Array reduce method found" : "Missing reduce method for calculations"
          };
        }
      },
      {
        name: "ES6 destructuring",
        test: (html, js) => {
          const hasDestructuring = js.includes('{') && js.includes('}') && (js.includes('const {') || js.includes('let {'));
          return {
            passed: hasDestructuring,
            message: hasDestructuring ? "Destructuring assignment found" : "Missing ES6 destructuring assignment"
          };
        }
      },
      {
        name: "Template literals",
        test: (html, js) => {
          const hasTemplateLiterals = js.includes('`') && js.includes('$');
          return {
            passed: hasTemplateLiterals,
            message: hasTemplateLiterals ? "Template literals found" : "Missing template literals for string formatting"
          };
        }
      }
    ]
  },
  {
    id: 103,
    title: "Event Handling and Form Validation",
    scenario: "You need to create a user registration form with real-time validation. The form should validate email format, password strength, and provide immediate feedback to users as they type. All validation should happen without form submission.",
    difficulty: 'intermediate',
    topic: 'Event Handling',
    type: 'js-code',
    instructions: "Create a registration form with validation:\n1. Validate email format in real-time\n2. Check password strength (min 8 chars, uppercase, lowercase, number)\n3. Confirm password match\n4. Show validation messages dynamically\n5. Disable submit button until all fields are valid\n6. Use appropriate event listeners (input, change, etc.)",
    starterCode: {
      html: `<form id="registrationForm">
  <h2>User Registration</h2>
  <div class="form-group">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <span id="emailError" class="error"></span>
  </div>
  <div class="form-group">
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>
    <span id="passwordError" class="error"></span>
  </div>
  <div class="form-group">
    <label for="confirmPassword">Confirm Password:</label>
    <input type="password" id="confirmPassword" name="confirmPassword" required>
    <span id="confirmError" class="error"></span>
  </div>
  <button type="submit" id="submitBtn" disabled>Register</button>
</form>`,
      js: `// Form validation system
// Add your JavaScript code here`
    },
    testCases: [
      {
        name: "Email validation",
        test: (html, js) => {
          const hasEmailValidation = js.includes('email') && (js.includes('includes') || js.includes('test') || js.includes('@'));
          return {
            passed: hasEmailValidation,
            message: hasEmailValidation ? "Email validation logic found" : "Missing email validation functionality"
          };
        }
      },
      {
        name: "Password strength validation",
        test: (html, js) => {
          const hasPasswordValidation = js.includes('password') && (js.includes('length') || js.includes('8'));
          return {
            passed: hasPasswordValidation,
            message: hasPasswordValidation ? "Password validation found" : "Missing password strength validation"
          };
        }
      },
      {
        name: "Real-time event listeners",
        test: (html, js) => {
          const hasInputEvents = js.includes('addEventListener') && (js.includes('input') || js.includes('keyup') || js.includes('change'));
          return {
            passed: hasInputEvents,
            message: hasInputEvents ? "Real-time event listeners found" : "Missing input event listeners for real-time validation"
          };
        }
      },
      {
        name: "Dynamic error display",
        test: (html, js) => {
          const hasErrorDisplay = js.includes('Error') && (js.includes('textContent') || js.includes('innerHTML'));
          return {
            passed: hasErrorDisplay,
            message: hasErrorDisplay ? "Dynamic error display found" : "Missing dynamic error message display"
          };
        }
      }
    ]
  },
  {
    id: 104,
    text: "Which ES6 feature allows you to extract values from arrays or objects into distinct variables?",
    scenario: "You're working with complex data structures in a modern JavaScript application and need to efficiently extract specific values from nested objects and arrays.",
    difficulty: 'intermediate',
    options: [
      "Spread operator (...)",
      "Destructuring assignment",
      "Template literals",
      "Arrow functions"
    ],
    correctAnswer: 1,
    topic: 'ES6 Features',
    type: 'multiple-choice'
  },
  {
    id: 105,
    text: "What is the correct way to prevent event bubbling in JavaScript?",
    scenario: "You have nested elements with event listeners, and you want to prevent a child element's click event from triggering the parent element's click handler.",
    difficulty: 'intermediate',
    options: [
      "event.preventDefault()",
      "event.stopPropagation()",
      "event.stopImmediatePropagation()",
      "return false"
    ],
    correctAnswer: 1,
    topic: 'Event Handling',
    type: 'multiple-choice'
  },
  {
    id: 106,
    text: "Which method would you use to find the first element in an array that satisfies a testing function?",
    scenario: "You have an array of user objects and need to locate the first user with a specific role, such as 'admin', for authentication purposes.",
    difficulty: 'advanced',
    options: [
      "Array.prototype.filter()",
      "Array.prototype.find()",
      "Array.prototype.some()",
      "Array.prototype.includes()"
    ],
    correctAnswer: 1,
    topic: 'ES6 Features',
    type: 'multiple-choice'
  }
];

export { jsQuestions };