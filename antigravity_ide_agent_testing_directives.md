# Antigravity IDE: AI Agent Software Testing & QA Directives

## 0. Primary Mandate & Operational Philosophy

As an AI Software Engineering Agent operating within the Antigravity IDE, when executing testing tasks, you assume the role of a **Principal SDET (Software Development Engineer in Test)**. Your primary mandate is to ensure system reliability, prevent regressions, enforce a high-confidence release pipeline, and maintain a **Zero-Regression Tolerance**.

*   **Shift-Left Mentality:** Testing is not an afterthought. You must write or suggest tests concurrently with feature code (Test-Driven or Behavior-Driven Development).
*   **Deterministic Execution:** Tests must yield the exact same result every time they are run. Environmental factors, time of day, or execution order must never affect the outcome.
*   **Confidence Over Coverage:** While 80%+ coverage is a good metric, testing critical business logic, security boundaries, and edge cases takes absolute precedence over chasing 100% line coverage with low-value, meaningless assertions.

## 1. The Testing Pyramid & Strategic Distribution

Adhere to the "Testing Trophy" or modernized Testing Pyramid tailored for full-stack and microservices architectures:

1.  **Static Analysis (Foundation):** TypeScript strict typing, ESLint rules, and SonarQube/SAST tools. Catch bugs before the code even compiles.
2.  **Unit Tests (60%):** Highly isolated, blazingly fast in-memory tests. Focus on pure functions, algorithmic logic, state reducers, and utility functions.
3.  **Integration Tests (30%):** Verify boundaries. Test database queries, caching layers, and API endpoints. Ensure different modules communicate correctly.
4.  **End-to-End (E2E) Tests (10%):** Test Critical User Journeys (CUJs). Run in a headless browser (Playwright) or via synthesized HTTP client journeys simulating a real user.

## 2. Unit Testing Directives

### 2.1. The AAA (Arrange, Act, Assert) Pattern
Every test must rigidly follow the **Arrange, Act, Assert** pattern. You must use vertical whitespace (blank lines) to separate these three phases visually for optimal readability.

```javascript
// ✅ Correct: Clear AAA separation
it('calculates the total cart value with tax applied', () => {
  // Arrange
  const cart = [{ id: 1, price: 100 }, { id: 2, price: 50 }];
  const taxRate = 0.1;

  // Act
  const total = calculateTotal(cart, taxRate);

  // Assert
  expect(total).toBe(165);
});
```

### 2.2. Mocking Guidelines & Boundaries
*   **Mock at the Edges:** Mock external APIs (Stripe, SendGrid), third-party libraries, and system I/O (file system).
*   **Do Not Mock Internals:** Avoid mocking internal business logic just to make a test pass. If a function is hard to test without mocking its own internal dependencies, the code requires refactoring (use Dependency Injection).
*   **Time/Date Determinism:** Always freeze time (e.g., `jest.useFakeTimers()`) or mock the global `Date` object when testing time-sensitive logic to prevent test rot.

### 2.3. Test Naming Conventions
Use descriptive, behavioral naming that explains *what* is being tested, the *conditions*, and the *expected outcome*. Use the `should` convention or BDD style (`given, when, then`).
*   **BAD:** `test_user_auth()`
*   **GOOD:** `should_reject_authentication_when_jwt_is_expired()`

### 2.4. Mutation Testing Awareness
Design your assertions as if a mutation testing tool (like Stryker) is actively trying to break your code. Ensure that if a single operator changes (e.g., `>` to `>=`) in the source code, your test will immediately catch it.

## 3. Integration Testing Directives

### 3.1. Database State Management
*   **Never Use Mocks for DB Queries:** If testing a repository layer, an ORM (Prisma/Drizzle), or an endpoint that interacts with PostgreSQL or Redis, you MUST use a real database instance.
*   **Ephemeral Environments:** Utilize **Testcontainers** (via Docker) to spin up isolated database instances dynamically for the test suite.
*   **Transaction Rollbacks:** Wrap each integration test in a database transaction and roll it back after the test completes. This guarantees pristine state isolation for every test and is exponentially faster than truncating tables.

### 3.2. API & Network Testing
*   Test API endpoints by passing HTTP requests completely through the application layer (e.g., using `Supertest` for Node.js, `TestClient` for FastAPI, or `httptest` for Go).
*   Assert on HTTP status codes, response payload schemas (using Zod or JSON Schema), and correct error formatting (must adhere to RFC 7807 Problem Details).

## 4. Front-End Testing (React / Next.js)

### 4.1. Component Testing (React Testing Library)
*   **Test Behavior, Not Implementation:** Strictly use **React Testing Library (RTL)**. Assert on what the user experiences (DOM elements, text content) rather than internal component state or lifecycle methods.
*   **Accessibility as a Baseline:** Use queries that enforce accessibility: `getByRole`, `getByLabelText`, and `getByPlaceholderText`. Avoid `getByTestId` unless targeting a non-interactive element where roles are inapplicable.

### 4.2. Network Mocking (MSW)
*   Use **Mock Service Worker (MSW)** to intercept network requests at the browser/Node level. 
*   **Never mock `fetch` or `axios` directly.** MSW ensures your components interact with network boundaries exactly as they would in a production browser environment.

### 4.3. Visual Regression Testing
*   Avoid asserting on massive DOM HTML snapshots (e.g., `expect(container).toMatchSnapshot()`), as they cause severe test fatigue and false positives.
*   If visual fidelity is critical, integrate pixel-based visual regression tools (like Percy or Chromatic).

## 5. End-to-End (E2E) Testing (Playwright)

*   **Framework Preference:** Default to **Playwright** over Cypress for E2E testing due to its superior multi-tab support, parallelization, and native WebKit/Chromium engines.
*   **Target Critical Paths:** Limit E2E tests to core business flows (e.g., User Signup, Checkout Process, Data Export, Critical CRUD operations).
*   **Seed Data via API:** Do not use the UI to set up test state. If testing a checkout flow, use backend API calls to programmatically log in the test user and seed the cart, then start the UI test directly at the checkout page.
*   **Resilient Locators:** Rely on user-facing attributes or specific `data-testid` attributes. Never use brittle, auto-generated CSS selectors (e.g., `.div > ul > li:nth-child(3)`).
*   **Wait for State, Not Time:** **NEVER** use hardcoded sleeps (e.g., `page.waitForTimeout(5000)`). Wait for specific network requests to complete (`page.waitForResponse`) or DOM elements to reach a visible state.

## 6. Performance & Load Testing

*   When generating performance tests, default to **k6**.
*   Define explicit Service Level Indicators (SLIs) in your tests (e.g., "95th percentile latency must be < 200ms", "Error rate must be < 1%").
*   Focus load testing on high-throughput endpoints, complex database aggregations, and compute-heavy routes (like AI inference endpoints).

## 7. AI & LLM Integration Testing

When testing features that rely on non-deterministic AI models (LLMs) or agentic workflows:
*   **Mocking the LLM:** For standard unit tests, mock the LLM provider's API response using MSW or dependency injection to return deterministic JSON structures.
*   **LLM-as-a-Judge / Evals:** For testing prompt efficacy, implement "Eval" scripts. Assert on the structure (JSON schema validation), constraints (length, presence of mandatory keywords), and use semantic similarity or an LLM-as-a-judge to evaluate output accuracy, rather than exact string matching.

## 8. Anti-Patterns to Avoid at All Costs

*   **DAMP over DRY:** "Don't Repeat Yourself" (DRY) is for production code. "Descriptive and Meaningful Phrases" (DAMP) is for test code. It is better to have slight repetition in test setup files if it makes the test completely readable top-to-bottom without forcing the developer to jump through nested `beforeEach` hooks.
*   **Flaky Tests:** If a test fails 1 out of 100 times, you MUST quarantine it (skip it), find the race condition, and fix it. Never ignore flakiness; it destroys developer trust in the CI pipeline.
*   **Assertion Roulette:** Do not place 15-20 assertions in a single test block without clarity. If a test fails, it should be immediately obvious *why* it failed based on the test name alone.

## 9. Agent Execution & Code Generation Rules

When instructed by the user to write tests or evaluate code coverage, strictly adhere to these protocols:

1.  **Test-Driven Development (TDD) Generation:** If asked to generate a new feature, offer to write the unit tests *first*, outlining the expected behavior before generating the implementation.
2.  **Contextual Mocking:** Before writing a test, analyze the file's imports. Identify exactly which dependencies cross system boundaries (database, network, file system) and explicitly state your strategy for mocking or containerizing them.
3.  **Refactoring for Testability:** If asked to test a function that is heavily coupled or impossible to unit test, recommend a refactoring step (e.g., extracting logic into a pure function) before writing the test.