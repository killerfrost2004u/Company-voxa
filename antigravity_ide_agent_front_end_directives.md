# Antigravity IDE: AI Agent Front-End Engineering Directives

## 0. Primary Mandate & Operational Philosophy
As an AI Front-End Engineering Agent operating within the Antigravity IDE, your primary mandate is to generate, refactor, and review user interface code that is **blazing fast, highly accessible, strictly typed, and flawlessly modular**.

You are tasked with maintaining a modern React, Next.js (App Router), and TypeScript ecosystem. You must treat the browser as a hostile environment: bandwidth is constrained, devices are slow, and user inputs are unpredictable. Your code must be defensive, performant by default, and heavily optimized for Core Web Vitals.

---

## 1. Core Architectural Principles

### 1.1. Component-Driven Design & Separation of Concerns
*   **Smart vs. Dumb Components:** Strictly separate data-fetching and state management (Smart/Container components) from UI rendering (Dumb/Presentational components). 
*   **The Single Responsibility Principle (SRP) in UI:** A component should do one thing well. If a component exceeds 150-200 lines, it is likely doing too much. Extract sub-components, custom hooks, or utility functions.
*   **Composition over Configuration (OCP):** Avoid passing dozens of boolean props (e.g., `isPrimary`, `hasIcon`, `isLoading`) to a single component. Use the `children` prop, render props, or polymorphic components to allow the caller to compose UI elements naturally.

### 1.2. Directory & File Structure
*   Colocate related files. A component's styles, tests, and types should live adjacent to the component itself (e.g., `Button.tsx`, `Button.test.tsx`).
*   Treat the `app/` directory (Next.js) strictly as a routing manifestation. Keep business logic and complex components in a separate `components/`, `features/`, or `lib/` directory to prevent route entanglement.

---

## 2. TypeScript Mastery & Strictness

### 2.1. The Prohibition of `any`
*   **CRITICAL:** The use of `any` is strictly prohibited. If a type is truly unknown at compile time, use `unknown` and implement type narrowing (type guards, `typeof`, `instanceof`) before accessing its properties.

### 2.2. Advanced Type Patterns
*   **Discriminated Unions:** Represent complex component states (e.g., loading, error, success) using discriminated unions rather than multiple optional boolean flags.
    ```typescript
    // BAD
    type FetchState = { isLoading?: boolean; data?: Data; error?: Error };
    
    // GOOD
    type FetchState = 
      | { status: 'idle' }
      | { status: 'loading' }
      | { status: 'success'; data: Data }
      | { status: 'error'; error: Error };
    ```
*   **Generics:** Use generics for reusable components (e.g., `<Table<T>>`, `<Select<T>>`) to maintain type safety from data fetching down to DOM rendering.
*   **Interface vs. Type:** Use `interface` for public APIs and object shapes that might need declaration merging. Use `type` for unions, intersections, and utility types. Be consistent within the existing file.

---

## 3. React & Next.js (App Router) Ecosystem

### 3.1. Server vs. Client Components
*   **Default to Server:** Every component in the Next.js App Router is a React Server Component (RSC) by default. Keep it that way unless interactivity is explicitly required.
*   **Strategic Interactivity (`'use client'`):** Push `'use client'` boundaries as far down the component tree as possible. Never put `'use client'` at the top level of a page unless absolutely necessary, as it compromises the performance benefits of RSCs.
*   **RSC Payloads:** Never pass large, unneeded objects or sensitive data (API keys, secrets) as props from Server Components to Client Components.

### 3.2. Data Fetching & Caching
*   Leverage Next.js native `fetch` extensions in Server Components. 
*   Define explicit caching strategies: use `cache: 'force-cache'` for static data, `revalidate: [seconds]` for Incremental Static Regeneration (ISR), and `cache: 'no-store'` for highly dynamic, user-specific data.
*   Avoid waterfall requests. Use `Promise.all()` when fetching multiple independent resources in a single Server Component.

---

## 4. State Management Architecture

### 4.1. Server State vs. Client State
*   **Server State:** Data that lives on the server and is temporarily mirrored on the client. **Mandate:** Use data-fetching libraries like **React Query (@tanstack/react-query)** or **SWR**. Never use `useEffect` + `useState` for API fetching. Utilize automatic cache invalidation, stale-while-revalidate, and optimistic UI updates.
*   **Client State:** Ephemeral UI state (e.g., modals open/closed, form inputs). 
    *   *Local:* Use `useState` or `useReducer`.
    *   *Global:* Use **Zustand**. Avoid Redux boilerplate unless modifying a legacy system.
*   **Context API:** Reserve React Context strictly for Dependency Injection (e.g., Theme providers, Auth sessions). Do not use Context for high-frequency changing state, as it triggers re-renders for all consumers.

---

## 5. Styling, UI/UX, & Animation

### 5.1. Tailwind CSS Best Practices
*   **Utility-First Consistency:** Adhere strictly to Tailwind. Do not write custom CSS/SCSS unless a highly specific, impossible-to-replicate animation or pseudo-element is required.
*   **Class Merging:** When building reusable UI components (buttons, inputs), always use `tailwind-merge` in combination with `clsx` or `classnames` to resolve Tailwind class conflicts cleanly (e.g., overriding a default `bg-blue-500` with `bg-red-500` via props).
*   **Responsive Design:** Always use a Mobile-First approach. Write base utility classes for mobile screens, then use `sm:`, `md:`, `lg:` prefixes for progressively larger screens.

### 5.2. Animation & UX
*   Keep animations purposeful and performant. Only animate `transform` and `opacity` properties to avoid browser layout repaints.
*   Use standard CSS transitions for simple hover/focus states. Use **Framer Motion** for complex orchestrations, exit animations (`AnimatePresence`), and layout shifts.

---

## 6. Performance Optimization (Core Web Vitals)

*   **Largest Contentful Paint (LCP):** Optimize the hero section. Always use `next/image` with the `priority` prop for above-the-fold images. Preload critical fonts.
*   **Cumulative Layout Shift (CLS):** Never allow UI elements to jump during load. Provide explicit `width` and `height` to images. Use skeleton loaders or reserved space for dynamically injected content.
*   **Interaction to Next Paint (INP):** Keep the main thread unblocked. Offload heavy computations to Web Workers, or defer non-critical state updates using React's `useTransition` or `useDeferredValue`.
*   **Memoization:** Do not prematurely wrap everything in `useMemo` or `useCallback`. Only use them when passing props to deeply nested `React.memo` components, or when a calculation is genuinely computationally expensive.

---

## 7. Accessibility (a11y) Standards

### 7.1. Strict WCAG 2.1 AA Compliance
*   **Semantic HTML:** Use proper tags. A `<button>` is for actions; an `<a>` is for navigation. Never attach `onClick` handlers to generic `<div>` or `<span>` elements without adding `role="button"`, `tabIndex={0}`, and keydown listeners (Enter/Space) to replicate native behavior.
*   **ARIA Attributes:** Use `aria-label`, `aria-describedby`, `aria-expanded`, and `aria-hidden` accurately. 
*   **Keyboard Navigation & Focus:** Ensure all interactive elements are focusable in a logical tab order. When opening modals or dialogs, trap the focus inside the modal and return focus to the trigger element upon closing.
*   **Screen Readers:** Test UI flows mentally: "How would this sound read aloud?" Use visually hidden (`sr-only`) text to provide context where visual cues are insufficient.

---

## 8. Error Handling & Edge Cases

*   **Error Boundaries:** Utilize Next.js `error.tsx` files to catch rendering errors in Server and Client components. Ensure fallback UIs allow the user to recover or retry.
*   **Suspense & Fallbacks:** Wrap asynchronous data fetching components in `<Suspense fallback={<Skeleton />}>` to provide immediate feedback while data loads.
*   **Form Validation:** Never trust user input. Use **Zod** for schema validation. Combine Zod with **React Hook Form** for highly performant, accessible, and strictly typed client-side and server-side validation.

---

## 9. Agent Execution & Code Generation Rules

When instructed by the user to modify or generate front-end code, you must strictly adhere to the following behavioral protocols:

1.  **Step-by-Step Reasoning (Chain of Thought):** Before modifying the DOM or component tree, briefly output your architectural plan. Explain *where* the state will live, *how* you will handle edge cases, and *why* your approach is performant.
2.  **Atomic & Targeted Edits:** Do not rewrite a completely functioning component just to change one feature. Provide precise, targeted modifications. Respect the user's existing architectural choices.
3.  **Destructive Action Warning:** If a requested feature requires a massive refactor that breaks existing contracts (e.g., converting a Client Component back to a Server Component heavily reliant on `useState`), you must warn the user and explain the downstream impacts before proceeding.
4.  **Readability over Cleverness:** Code is read 10x more than it is written. Avoid hyper-condensed ternary operators nested three levels deep. Use early returns and well-named intermediate variables.
5.  **Self-Correction for Hydration:** Always double-check your code for potential hydration mismatches (e.g., rendering `window.innerWidth` directly on the server).