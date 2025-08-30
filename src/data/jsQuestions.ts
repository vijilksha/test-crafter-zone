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
    id: 'js-es6-002',
    title: 'Destructuring & Spread Operator',
    scenario: 'You need to extract data from API responses and merge user preferences efficiently.',
    difficulty: 'Medium',
    topic: 'ES6 Features',
    type: 'code',
    instructions: `Create a function called 'processUserData' that:
1. Uses destructuring to extract name, email from the user parameter
2. Uses destructuring to extract theme, notifications from the settings parameter  
3. Uses spread operator to merge defaultSettings with settings
4. Returns an object with { name, email, preferences: mergedSettings }`,
    starterCode: {
      html: `<div id="userData"></div>`,
      js: `const defaultSettings = { theme: 'light', notifications: true, language: 'en' };

function processUserData(user, settings) {
  // Your code here using destructuring and spread operator
}

// Test data
const testUser = { name: 'Alice', email: 'alice@test.com', id: 1 };
const userSettings = { theme: 'dark', notifications: false };`
    },
    testCases: [
      {
        name: 'Should use destructuring and spread operator correctly',
        test: async (code) => {
          try {
            // Evaluate code and extract the function
            const testFunction = new Function('', code + '; return processUserData;');
            const processUserData = testFunction();
            const testUser = { name: 'Alice', email: 'alice@test.com', id: 1 };
            const userSettings = { theme: 'dark', notifications: false };
            const result = processUserData(testUser, userSettings);
            
            return result && 
                   result.name === 'Alice' &&
                   result.email === 'alice@test.com' &&
                   result.preferences &&
                   result.preferences.theme === 'dark' &&
                   result.preferences.notifications === false &&
                   result.preferences.language === 'en';
          } catch (error) {
            console.error('Test error:', error);
            return false;
          }
        }
      }
    ]
  },
  {
    id: 'js-es6-003',
    title: 'Classes & Modules with Modern Syntax',
    scenario: 'You are creating a shopping cart system using ES6 classes with modern features like private fields and getters.',
    difficulty: 'Hard',
    topic: 'ES6 Features',
    type: 'code',
    instructions: `Create a class called 'ShoppingCart' that:
1. Has a private field #items (array)
2. Constructor initializes empty items array
3. Method addItem(item) - adds item to cart
4. Method removeItem(itemId) - removes item by id
5. Getter totalPrice - calculates sum of all item prices
6. Getter itemCount - returns number of items`,
    starterCode: {
      html: `<div id="cart"></div>`,
      js: `class ShoppingCart {
  // Your code here
}

// Test items
const item1 = { id: 1, name: 'Book', price: 15.99 };
const item2 = { id: 2, name: 'Pen', price: 2.50 };`
    },
    testCases: [
      {
        name: 'Should implement ES6 class with private fields and getters',
        test: async (code) => {
          try {
            // Create a more isolated evaluation context
            const testFunction = new Function('', code + '; return ShoppingCart;');
            const ShoppingCart = testFunction();
            const cart = new ShoppingCart();
            const item1 = { id: 1, name: 'Book', price: 15.99 };
            const item2 = { id: 2, name: 'Pen', price: 2.50 };
            
            cart.addItem(item1);
            cart.addItem(item2);
            
            const hasCorrectCount = cart.itemCount === 2;
            const hasCorrectTotal = Math.abs(cart.totalPrice - 18.49) < 0.01;
            
            cart.removeItem(1);
            const hasCorrectCountAfterRemoval = cart.itemCount === 1;
            const hasCorrectTotalAfterRemoval = Math.abs(cart.totalPrice - 2.50) < 0.01;
            
            return hasCorrectCount && hasCorrectTotal && hasCorrectCountAfterRemoval && hasCorrectTotalAfterRemoval;
          } catch (error) {
            console.error('Test error:', error);
            return false;
          }
        }
      }
    ]
  }
];