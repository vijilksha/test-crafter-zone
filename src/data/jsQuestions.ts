interface JSTestCase {
  name: string;
  test: (html: string, js: string) => { passed: boolean; message: string };
}

interface JSCodeQuestion {
  id: number;
  title: string;
  scenario: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
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
  difficulty: 'Easy' | 'Medium' | 'Hard';
  options: string[];
  correctAnswer: number;
  topic: string;
  type: 'multiple-choice';
}

export type JSQuestion = JSCodeQuestion | MultipleChoiceQuestion;

const jsQuestions: JSQuestion[] = [
  {
    id: 1,
    title: "E-commerce Shopping Cart",
    scenario: "You're building an e-commerce website where customers can add products to their cart, update quantities, and see the total price. The cart should persist data and handle different product types with discounts.",
    difficulty: 'Medium',
    topic: 'DOM Manipulation',
    type: 'js-code',
    instructions: "Create a shopping cart system with the following features:\n1. Add products to cart with quantity\n2. Update product quantities\n3. Remove products from cart\n4. Calculate total price with discounts\n5. Display cart contents dynamically\n6. Apply 10% discount for orders over $100",
    starterCode: {
      html: `<div id="shopping-cart">
  <h2>Shopping Cart</h2>
  <div class="products">
    <div class="product" data-id="1" data-price="25.99">
      <h3>JavaScript T-Shirt</h3>
      <p>Price: $25.99</p>
      <button class="add-to-cart">Add to Cart</button>
    </div>
    <div class="product" data-id="2" data-price="45.50">
      <h3>React Hoodie</h3>
      <p>Price: $45.50</p>
      <button class="add-to-cart">Add to Cart</button>
    </div>
    <div class="product" data-id="3" data-price="15.75">
      <h3>Node.js Mug</h3>
      <p>Price: $15.75</p>
      <button class="add-to-cart">Add to Cart</button>
    </div>
  </div>
  <div id="cart-display">
    <h3>Cart Items</h3>
    <div id="cart-items"></div>
    <div id="cart-total">Total: $0.00</div>
  </div>
</div>`,
      js: `// Shopping cart implementation
let cart = [];

// Add your JavaScript code here`
    },
    testCases: [
      {
        name: "Add to cart functionality",
        test: (html, js) => {
          const hasEventListener = js.includes('addEventListener') && js.includes('add-to-cart');
          const hasCartArray = js.includes('cart') && (js.includes('push') || js.includes('['));
          return {
            passed: hasEventListener && hasCartArray,
            message: hasEventListener && hasCartArray ? "Add to cart functionality found" : "Missing event listeners or cart array manipulation"
          };
        }
      },
      {
        name: "Price calculation",
        test: (html, js) => {
          const hasPriceCalc = js.includes('total') || js.includes('price') || js.includes('*') || js.includes('reduce');
          return {
            passed: hasPriceCalc,
            message: hasPriceCalc ? "Price calculation logic found" : "Missing price calculation functionality"
          };
        }
      },
      {
        name: "DOM updates",
        test: (html, js) => {
          const hasDOMUpdate = js.includes('innerHTML') || js.includes('textContent') || js.includes('appendChild');
          return {
            passed: hasDOMUpdate,
            message: hasDOMUpdate ? "DOM update methods found" : "Missing DOM manipulation for cart display"
          };
        }
      },
      {
        name: "Discount logic",
        test: (html, js) => {
          const hasDiscount = js.includes('100') || js.includes('0.1') || js.includes('10%') || js.includes('discount');
          return {
            passed: hasDiscount,
            message: hasDiscount ? "Discount logic found" : "Missing discount calculation for orders over $100"
          };
        }
      }
    ]
  },
  {
    id: 2,
    title: "User Authentication System",
    scenario: "You're developing a login system for a web application that needs to validate user credentials, manage login sessions, and provide appropriate feedback. The system should handle both successful logins and error cases.",
    difficulty: 'Hard',
    topic: 'Async Programming',
    type: 'js-code',
    instructions: "Create an authentication system with:\n1. Form validation for email and password\n2. Simulate API login request with async/await\n3. Handle loading states during authentication\n4. Display success/error messages\n5. Store user session data\n6. Implement logout functionality",
    starterCode: {
      html: `<div id="auth-container">
  <form id="login-form">
    <h2>Login</h2>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" required>
      <span class="error" id="email-error"></span>
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" id="password" required>
      <span class="error" id="password-error"></span>
    </div>
    <button type="submit" id="login-btn">Login</button>
    <div id="loading" style="display: none;">Authenticating...</div>
    <div id="message"></div>
  </form>
  <div id="dashboard" style="display: none;">
    <h2>Welcome!</h2>
    <p>You are logged in as: <span id="user-info"></span></p>
    <button id="logout-btn">Logout</button>
  </div>
</div>`,
      js: `// Authentication system
const users = [
  { email: 'admin@test.com', password: 'admin123', name: 'Admin User' },
  { email: 'user@test.com', password: 'user123', name: 'Test User' }
];

// Simulate API call
async function authenticateUser(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        resolve({ success: true, user: { email: user.email, name: user.name } });
      } else {
        reject({ success: false, message: 'Invalid credentials' });
      }
    }, 1500);
  });
}

// Add your authentication logic here`
    },
    testCases: [
      {
        name: "Form validation",
        test: (html, js) => {
          const hasValidation = js.includes('@') || js.includes('email') || js.includes('password') || js.includes('required');
          return {
            passed: hasValidation,
            message: hasValidation ? "Form validation found" : "Missing email/password validation"
          };
        }
      },
      {
        name: "Async/await usage",
        test: (html, js) => {
          const hasAsync = js.includes('async') && js.includes('await');
          return {
            passed: hasAsync,
            message: hasAsync ? "Async/await found" : "Missing async/await for authentication"
          };
        }
      },
      {
        name: "Loading state management",
        test: (html, js) => {
          const hasLoading = js.includes('loading') && (js.includes('display') || js.includes('style'));
          return {
            passed: hasLoading,
            message: hasLoading ? "Loading state management found" : "Missing loading state display"
          };
        }
      },
      {
        name: "Error handling",
        test: (html, js) => {
          const hasErrorHandling = js.includes('catch') || js.includes('error') || js.includes('reject');
          return {
            passed: hasErrorHandling,
            message: hasErrorHandling ? "Error handling found" : "Missing error handling for failed authentication"
          };
        }
      }
    ]
  },
  {
    id: 3,
    title: "Data Visualization Dashboard",
    scenario: "You're creating a dashboard that fetches sales data from an API and displays it using charts and statistics. The dashboard should update in real-time and allow filtering by date range and product categories.",
    difficulty: 'Hard',
    topic: 'ES6 Features',
    type: 'js-code',
    instructions: "Build a data dashboard with:\n1. Fetch data using modern JavaScript (fetch API)\n2. Process data using ES6 array methods (map, filter, reduce)\n3. Create dynamic charts/visualizations\n4. Implement date range filtering\n5. Use destructuring and template literals\n6. Update UI with real-time statistics",
    starterCode: {
      html: `<div id="dashboard">
  <h2>Sales Dashboard</h2>
  <div class="filters">
    <label for="startDate">Start Date:</label>
    <input type="date" id="startDate">
    <label for="endDate">End Date:</label>
    <input type="date" id="endDate">
    <select id="categoryFilter">
      <option value="">All Categories</option>
      <option value="electronics">Electronics</option>
      <option value="clothing">Clothing</option>
      <option value="books">Books</option>
    </select>
    <button id="filterBtn">Apply Filters</button>
  </div>
  <div class="stats">
    <div class="stat-card">
      <h3>Total Sales</h3>
      <div id="totalSales">$0</div>
    </div>
    <div class="stat-card">
      <h3>Total Orders</h3>
      <div id="totalOrders">0</div>
    </div>
    <div class="stat-card">
      <h3>Avg Order Value</h3>
      <div id="avgOrder">$0</div>
    </div>
  </div>
  <div id="chart-container">
    <canvas id="salesChart" width="400" height="200"></canvas>
  </div>
  <div id="top-products"></div>
</div>`,
      js: `// Sample sales data
const salesData = [
  { id: 1, date: '2024-01-15', product: 'Laptop', category: 'electronics', amount: 999, quantity: 1 },
  { id: 2, date: '2024-01-16', product: 'T-Shirt', category: 'clothing', amount: 25, quantity: 3 },
  { id: 3, date: '2024-01-17', product: 'JavaScript Book', category: 'books', amount: 45, quantity: 2 },
  { id: 4, date: '2024-01-18', product: 'Phone', category: 'electronics', amount: 699, quantity: 1 },
  { id: 5, date: '2024-01-19', product: 'Jeans', category: 'clothing', amount: 80, quantity: 2 }
];

// Simulate API fetch
async function fetchSalesData() {
  return new Promise(resolve => {
    setTimeout(() => resolve(salesData), 500);
  });
}

// Add your dashboard logic here`
    },
    testCases: [
      {
        name: "ES6 array methods",
        test: (html, js) => {
          const hasArrayMethods = js.includes('.map(') || js.includes('.filter(') || js.includes('.reduce(');
          return {
            passed: hasArrayMethods,
            message: hasArrayMethods ? "ES6 array methods found" : "Missing map, filter, or reduce methods"
          };
        }
      },
      {
        name: "Template literals",
        test: (html, js) => {
          const hasTemplateLiterals = js.includes('`') && js.includes('$');
          return {
            passed: hasTemplateLiterals,
            message: hasTemplateLiterals ? "Template literals found" : "Missing template literals for string interpolation"
          };
        }
      },
      {
        name: "Destructuring assignment",
        test: (html, js) => {
          const hasDestructuring = js.includes('{') && js.includes('}') && (js.includes('const {') || js.includes('let {'));
          return {
            passed: hasDestructuring,
            message: hasDestructuring ? "Destructuring assignment found" : "Missing ES6 destructuring assignment"
          };
        }
      },
      {
        name: "Data filtering logic",
        test: (html, js) => {
          const hasDateFilter = js.includes('date') && js.includes('filter');
          return {
            passed: hasDateFilter,
            message: hasDateFilter ? "Date filtering logic found" : "Missing date range filtering functionality"
          };
        }
      }
    ]
  },
  {
    id: 4,
    text: "Which modern JavaScript feature allows you to extract values from arrays or objects into distinct variables?",
    scenario: "You're working with API responses that return complex nested objects and arrays. You need to efficiently extract specific values for processing in your application.",
    difficulty: 'Medium',
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
    id: 5,
    text: "What is the best way to handle asynchronous operations in modern JavaScript?",
    scenario: "You need to fetch user data from multiple APIs sequentially, where each request depends on the result of the previous one, and handle any potential errors gracefully.",
    difficulty: 'Hard',
    options: [
      "Callback functions with error handling",
      "Promise chains with .then() and .catch()",
      "Async/await with try-catch blocks",
      "setTimeout() with global variables"
    ],
    correctAnswer: 2,
    topic: 'Async Programming',
    type: 'multiple-choice'
  },
  {
    id: 6,
    text: "Which method would you use to find all elements in an array that meet a specific condition?",
    scenario: "You have an array of products and need to get all products that are in stock and have a rating above 4 stars for a 'recommended products' section.",
    difficulty: 'Easy',
    options: [
      "Array.prototype.find()",
      "Array.prototype.filter()",
      "Array.prototype.some()",
      "Array.prototype.includes()"
    ],
    correctAnswer: 1,
    topic: 'ES6 Features',
    type: 'multiple-choice'
  },
  {
    id: 7,
    text: "What is the correct way to prevent event bubbling in JavaScript?",
    scenario: "You have nested clickable elements (a button inside a card) and you want to prevent the card's click handler from executing when the button is clicked.",
    difficulty: 'Medium',
    options: [
      "event.preventDefault()",
      "event.stopPropagation()",
      "event.stopImmediatePropagation()",
      "return false"
    ],
    correctAnswer: 1,
    topic: 'DOM Manipulation',
    type: 'multiple-choice'
  },
  {
    id: 8,
    text: "Which Promise method would you use to wait for multiple asynchronous operations to complete?",
    scenario: "You need to load user profile data, user preferences, and notification settings simultaneously from three different API endpoints before rendering the user dashboard.",
    difficulty: 'Hard',
    options: [
      "Promise.race()",
      "Promise.all()",
      "Promise.allSettled()",
      "Promise.resolve()"
    ],
    correctAnswer: 1,
    topic: 'Async Programming',
    type: 'multiple-choice'
  },
  {
    id: 9,
    title: "Real-time Chat Application",
    scenario: "You're building a chat interface where users can send messages, see typing indicators, and receive notifications. The application should handle message history and user presence status.",
    difficulty: 'Hard',
    topic: 'Event Handling',
    type: 'js-code',
    instructions: "Create a chat application with:\n1. Send and receive messages\n2. Display message history\n3. Show typing indicators\n4. Handle user online/offline status\n5. Format timestamps\n6. Implement message notifications",
    starterCode: {
      html: `<div id="chat-app">
  <div class="chat-header">
    <h2>Chat Room</h2>
    <div id="online-users">Users online: <span id="user-count">1</span></div>
  </div>
  <div id="messages-container">
    <div id="messages"></div>
  </div>
  <div class="typing-indicator" id="typing-indicator" style="display: none;">
    Someone is typing...
  </div>
  <div class="chat-input">
    <input type="text" id="message-input" placeholder="Type a message...">
    <button id="send-btn">Send</button>
  </div>
</div>`,
      js: `// Chat application
let messages = [];
let currentUser = 'User1';
let isTyping = false;

// Simulate receiving messages
function simulateIncomingMessage() {
  const sampleMessages = [
    'Hello everyone!',
    'How is the project going?',
    'Great work on the last feature!',
    'Anyone available for a quick call?'
  ];
  
  setTimeout(() => {
    const message = {
      id: Date.now(),
      user: 'User2',
      text: sampleMessages[Math.floor(Math.random() * sampleMessages.length)],
      timestamp: new Date()
    };
    // Add message handling logic here
  }, Math.random() * 10000 + 5000);
}

// Add your chat functionality here`
    },
    testCases: [
      {
        name: "Message sending",
        test: (html, js) => {
          const hasMessageSend = js.includes('send') && js.includes('input') && js.includes('addEventListener');
          return {
            passed: hasMessageSend,
            message: hasMessageSend ? "Message sending functionality found" : "Missing message sending with event listeners"
          };
        }
      },
      {
        name: "Message display",
        test: (html, js) => {
          const hasMessageDisplay = js.includes('messages') && (js.includes('innerHTML') || js.includes('appendChild'));
          return {
            passed: hasMessageDisplay,
            message: hasMessageDisplay ? "Message display logic found" : "Missing message display in DOM"
          };
        }
      },
      {
        name: "Timestamp formatting",
        test: (html, js) => {
          const hasTimestamp = js.includes('Date') || js.includes('timestamp') || js.includes('time');
          return {
            passed: hasTimestamp,
            message: hasTimestamp ? "Timestamp handling found" : "Missing timestamp formatting for messages"
          };
        }
      },
      {
        name: "Typing indicator",
        test: (html, js) => {
          const hasTypingIndicator = js.includes('typing') && js.includes('display');
          return {
            passed: hasTypingIndicator,
            message: hasTypingIndicator ? "Typing indicator found" : "Missing typing indicator functionality"
          };
        }
      }
    ]
  },
  {
    id: 10,
    text: "Which JavaScript feature is best for creating immutable updates to arrays?",
    scenario: "You're managing application state where you need to add, remove, or update items in an array without modifying the original array, ensuring predictable state changes.",
    difficulty: 'Medium',
    options: [
      "Array.prototype.push() and Array.prototype.splice()",
      "Spread operator (...) with array methods",
      "Array.prototype.forEach() with mutations",
      "Direct index assignment"
    ],
    correctAnswer: 1,
    topic: 'ES6 Features',
    type: 'multiple-choice'
  }
];

export { jsQuestions };