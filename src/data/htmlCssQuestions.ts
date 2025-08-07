interface TestCase {
  name: string;
  test: (html: string, css: string) => { passed: boolean; message: string };
}

interface CodeQuestion {
  id: number;
  title: string;
  scenario: string;
  difficulty: 'intermediate' | 'advanced';
  topic: string;
  type: 'code';
  instructions: string;
  starterCode: {
    html: string;
    css: string;
  };
  testCases: TestCase[];
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

export type Question = CodeQuestion | MultipleChoiceQuestion;

const htmlCssQuestions: Question[] = [
  {
    id: 1,
    title: "Create a Responsive Navigation Bar",
    scenario: "You need to build a navigation bar for a modern website. The navigation should be responsive - on desktop it should display horizontally with hover effects, and on mobile devices (screen width < 768px) it should stack vertically with a different background color.",
    difficulty: 'intermediate',
    topic: 'CSS Responsive Design',
    type: 'code',
    instructions: "Create a responsive navigation bar with the following requirements:\n1. Desktop: horizontal layout with blue background (#3b82f6)\n2. Mobile: vertical layout with dark blue background (#1e40af)\n3. Add hover effects on navigation links\n4. Include at least 4 navigation items",
    starterCode: {
      html: `<nav class="navbar">
  <ul class="nav-list">
    <li><a href="#" class="nav-link">Home</a></li>
    <li><a href="#" class="nav-link">About</a></li>
    <li><a href="#" class="nav-link">Services</a></li>
    <li><a href="#" class="nav-link">Contact</a></li>
  </ul>
</nav>`,
      css: `/* Add your CSS here */`
    },
    testCases: [
      {
        name: "Navigation exists",
        test: (html, css) => {
          const hasNav = html.includes('nav') || html.includes('navbar');
          return {
            passed: hasNav,
            message: hasNav ? "Navigation element found" : "No navigation element found"
          };
        }
      },
      {
        name: "Responsive design implemented",
        test: (html, css) => {
          const hasMediaQuery = css.includes('@media') && css.includes('768px');
          return {
            passed: hasMediaQuery,
            message: hasMediaQuery ? "Media query for mobile found" : "Missing media query for responsive design"
          };
        }
      },
      {
        name: "Desktop styling",
        test: (html, css) => {
          const hasBlueBackground = css.includes('#3b82f6') || css.includes('rgb(59, 130, 246)');
          return {
            passed: hasBlueBackground,
            message: hasBlueBackground ? "Desktop blue background found" : "Missing desktop blue background (#3b82f6)"
          };
        }
      },
      {
        name: "Hover effects",
        test: (html, css) => {
          const hasHover = css.includes(':hover');
          return {
            passed: hasHover,
            message: hasHover ? "Hover effects found" : "Missing hover effects on navigation links"
          };
        }
      }
    ]
  },
  {
    id: 2,
    title: "CSS Grid Card Layout",
    scenario: "You are building a product showcase page that needs to display cards in a responsive grid layout. The layout should show 3 cards per row on desktop, 2 cards per row on tablet, and 1 card per row on mobile. Each card should have consistent spacing and a subtle shadow effect.",
    difficulty: 'advanced',
    topic: 'CSS Grid Layout',
    type: 'code',
    instructions: "Create a responsive card layout using CSS Grid:\n1. Desktop (>1024px): 3 cards per row\n2. Tablet (768px-1024px): 2 cards per row\n3. Mobile (<768px): 1 card per row\n4. Cards should have shadow and equal height\n5. Include proper spacing between cards",
    starterCode: {
      html: `<div class="card-container">
  <div class="card">
    <h3>Product 1</h3>
    <p>This is the first product description.</p>
  </div>
  <div class="card">
    <h3>Product 2</h3>
    <p>This is the second product description with more text to test equal heights.</p>
  </div>
  <div class="card">
    <h3>Product 3</h3>
    <p>Third product description.</p>
  </div>
  <div class="card">
    <h3>Product 4</h3>
    <p>Fourth product with different content length.</p>
  </div>
  <div class="card">
    <h3>Product 5</h3>
    <p>Fifth product description here.</p>
  </div>
  <div class="card">
    <h3>Product 6</h3>
    <p>Last product in our showcase.</p>
  </div>
</div>`,
      css: `/* Add your CSS Grid layout here */`
    },
    testCases: [
      {
        name: "CSS Grid implemented",
        test: (html, css) => {
          const hasGrid = css.includes('display: grid') || css.includes('display:grid');
          return {
            passed: hasGrid,
            message: hasGrid ? "CSS Grid display found" : "CSS Grid not implemented (display: grid missing)"
          };
        }
      },
      {
        name: "Grid template columns defined",
        test: (html, css) => {
          const hasGridColumns = css.includes('grid-template-columns');
          return {
            passed: hasGridColumns,
            message: hasGridColumns ? "Grid template columns found" : "Missing grid-template-columns property"
          };
        }
      },
      {
        name: "Responsive breakpoints",
        test: (html, css) => {
          const hasMultipleMediaQueries = (css.match(/@media/g) || []).length >= 2;
          return {
            passed: hasMultipleMediaQueries,
            message: hasMultipleMediaQueries ? "Multiple responsive breakpoints found" : "Need at least 2 media queries for tablet and mobile"
          };
        }
      },
      {
        name: "Card styling",
        test: (html, css) => {
          const hasCardClass = css.includes('.card') && (css.includes('box-shadow') || css.includes('shadow'));
          return {
            passed: hasCardClass,
            message: hasCardClass ? "Card styling with shadow found" : "Missing card styling or shadow effects"
          };
        }
      }
    ]
  },
  {
    id: 3,
    title: "Flexbox Centering Challenge",
    scenario: "You need to create a login form that is perfectly centered both horizontally and vertically on the page, regardless of the viewport size. The form should have a modern design with proper spacing and should remain centered even when the content changes.",
    difficulty: 'intermediate',
    topic: 'CSS Flexbox',
    type: 'code',
    instructions: "Create a centered login form using Flexbox:\n1. Form should be perfectly centered on the page\n2. Use Flexbox for centering (not margins or absolute positioning)\n3. Form should have a white background with padding\n4. Include email and password fields with a submit button\n5. Form should maintain centering regardless of viewport size",
    starterCode: {
      html: `<div class="container">
  <form class="login-form">
    <h2>Login</h2>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
    </div>
    <button type="submit">Login</button>
  </form>
</div>`,
      css: `/* Add your Flexbox centering CSS here */
body {
  margin: 0;
  min-height: 100vh;
  background-color: #f0f0f0;
}`
    },
    testCases: [
      {
        name: "Flexbox container implemented",
        test: (html, css) => {
          const hasFlexDisplay = css.includes('display: flex') || css.includes('display:flex');
          return {
            passed: hasFlexDisplay,
            message: hasFlexDisplay ? "Flexbox display found" : "Missing display: flex property"
          };
        }
      },
      {
        name: "Horizontal centering",
        test: (html, css) => {
          const hasJustifyCenter = css.includes('justify-content: center') || css.includes('justify-content:center');
          return {
            passed: hasJustifyCenter,
            message: hasJustifyCenter ? "Horizontal centering found" : "Missing justify-content: center for horizontal centering"
          };
        }
      },
      {
        name: "Vertical centering",
        test: (html, css) => {
          const hasAlignCenter = css.includes('align-items: center') || css.includes('align-items:center');
          return {
            passed: hasAlignCenter,
            message: hasAlignCenter ? "Vertical centering found" : "Missing align-items: center for vertical centering"
          };
        }
      },
      {
        name: "Form styling",
        test: (html, css) => {
          const hasFormStyling = css.includes('.login-form') && (css.includes('background') || css.includes('padding'));
          return {
            passed: hasFormStyling,
            message: hasFormStyling ? "Form styling found" : "Missing form styling (background/padding)"
          };
        }
      }
    ]
  }
];

export { htmlCssQuestions };