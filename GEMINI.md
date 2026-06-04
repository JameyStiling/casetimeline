# Case Timeline Builder - Agent Directives

Definitive guidelines for writing idiomatic React, Node.js, and Tailwind CSS v4 applications with TypeScript.

---

## 1. Global Directives
- Write concise, technical responses with accurate, production-ready code examples.
- Do not explain basic concepts; prioritize code over prose.
- Follow the DRY (Don't Repeat Yourself) principle. Minimize code duplication.

---

## 2. TypeScript Guidelines
- Use TypeScript for all code.
- Stricter is better. Avoid the `any` type at all costs.
- Prefer `interface` for component props and data structures; use `type` for unions/aliases.
- Avoid enums; use maps or string unions instead.
- **Erasable Syntax Only**: Do not use non-erasable TypeScript features (like parameter properties in constructors, namespaces) because `"erasableSyntaxOnly": true` is enabled in `tsconfig`. Declare properties explicitly:
  ```typescript
  export class CustomError extends Error {
    public status?: number;
    constructor(message: string, status?: number) {
      super(message);
      this.status = status;
    }
  }
  ```
- **Verbatim Type Imports**: Use explicit type imports (`import type { TimelineEvent }`) instead of combined imports when importing interfaces or types to comply with `"verbatimModuleSyntax": true`.

---

## 3. React & Frontend Guidelines
- **Functional & Declarative**: Use functional components and hooks. Avoid class components (except for Error Boundaries).
- **Component Structure**: Keep components small, modular, and single-purpose. Structure per-feature.
  - **Atomic Shared UI Elements**: Store generic, reusable blocks inside `client/src/components/ui/` (e.g., `Modal.tsx`, `Badge.tsx`, `Form.tsx`).
- **Hooks**: Obey the Rules of Hooks. Extract any hook combination used in more than one component into a custom hook.
  - **Separation of Presentation & Business Logic**: Separate UI markup from data retrieval by encapsulating states and requests inside custom hooks (e.g., `useTimeline.ts`).
- **Naming Conventions**: 
  - Prefix event handlers with `handle` (e.g., `handleClick`).
  - Use descriptive boolean variables with auxiliary verbs (e.g., `isLoading`, `hasError`).
- **Styling (Tailwind CSS v4)**: Use Tailwind CSS v4 utility classes.
  - **No Inline Styles for Layout/Design**: Direct inline style objects (e.g., `style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}`) are strictly prohibited in JSX files. Use Tailwind flex, grid, gap, and padding classes instead.
  - **Theme Parameters**: Utilize semantic color/font definitions from the Tailwind `@theme` configuration (e.g., `bg-main`, `bg-card`, `border-border-color`, `text-brand-primary`, `text-cat-communication`).
  - **Dynamic Rule Handling**: Standardize color variations and dynamic statuses (like active filters, confidence indicators, or category tags) by changing element `className` modifiers (e.g., `className="badge badge-high"`) rather than modifying style objects at runtime.
- **State Management**: Keep local state as close to the tree as possible. Avoid pushing global state to Context unnecessarily.
  - **Props Drilling Limit**: Limit props routing to 2 levels deep max. Centralize context or custom state handlers for anything deeper.
  - **No Synchronous State Updates in Effects**: Never call `setState` synchronously within the body of a `useEffect` on mount. Seeding initial states dynamically via lazy state initializers is preferred.

---

## 4. Node.js & Backend Guidelines
- **Architecture**: Use a clear layered architecture (e.g., `routes`, `controllers`, `services`, `models`).
- **Error Handling**: 
  - Use a centralized error-handling middleware.
  - Every async function must wrap its logic in `try-catch` and gracefully pass errors to `next()`.
  - Never let uncaught exceptions crash the Node process in production.
- **Validation**: Validate all incoming requests. Use a library like `Zod` or `Joi` for payload validation.
- **Security**: 
  - Implement Helmet, CORS, and rate limiting where applicable.
  - Never expose raw stack traces in production responses.
  - Sanitize all user input before database operations.

---

## 5. Code Style & Quality
- **Early Returns**: Handle errors and edge conditions at the top of your functions. Avoid deeply nested `if` statements.
- **Asynchronous Code**: Favor `async/await` over `.then()` chains for readability.
- **Logging**: Use a standardized logger like `winston` or `pino` instead of `console.log` in backend environments.
- **Centralized Network Requests**: Gate all external network calls through a dedicated API Client (`client/src/services/apiClient.ts`).
  - **No Hardcoded URLs**: Resolve base API endpoints using Vite's `import.meta.env.VITE_API_URL` falling back to localhost.

---

## 6. Function Design Rules
- **RORO Pattern**: For functions requiring more than two parameters, pass a single named object and destructure it. Return named objects instead of single raw values.
- **Pure Functions**: Use the explicit `function` keyword for pure utility functions; save arrow functions (`const x = () => {}`) exclusively for React components or inline closures.
- **Semicolons & Blocks**: Omit unnecessary curly braces for single-line condition guards (e.g., `if (!user) return null;`).

---

## 7. Advanced React Performance
- **State Locality**: Never pass down state via prop-drilling beyond two component levels; force the usage of a lightweight store (like `Zustand`) or React Context.
- **Render Abstractions**: Avoid using nested render functions within a single component (e.g., `const renderHeader = () => ...`). Extract them into isolated components to protect React's reconciliation engine.
- **URL as State**: Favor managing UI/filter states in the URL parameters using tools like `nuqs` (or native search parameters) rather than internal `useState` hooks.

---

## 8. Node.js Architecture & Operations
- **Statelessness**: Ensure all backend logic is entirely stateless. Do not store user state or local files inside memory or local disks; force the use of external cache (Redis) or object storage (S3) for scale.
- **Fail Fast**: Implement unexpected-error crashes gracefully. Let the process die using `process.exit(1)` upon an unhandled exception, and rely on a process manager (PM2/Docker) to restart it.
- **Type-Safe Errors**: Model expected application validation errors as structured return objects rather than throwing generic JavaScript `Error` objects.

---

## 9. File Topology Rule
- Strict code ordering inside file boundaries must strictly adhere to the following sequence:
  1. Imports (External libraries first, internal paths second)
  2. Core TypeScript Types / Interfaces
  3. Main Exported React Component or Route Handler
  4. Local Sub-components / Sub-functions
  5. Utility / Pure helper algorithms
  6. Static configurations / Constant Mappings

---

## 10. Agent Execution Protocol
- **Think Before Coding**: Before modifying any workspace file, output a structural block wrapped in XML tags (`<thinking> ... </thinking>`) containing:
  1. Current State Assessment
  2. Potential side-effects on existing modules
  3. A 3-step checklist plan of execution
- Do not proceed with code generation until this technical assessment is rendered.

