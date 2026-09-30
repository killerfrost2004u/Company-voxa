# VOXA Digital Solutions (Project: `bold-mendel`)
**Comprehensive Project Overview & Technical Documentation**

## 1. Introduction & Branding
This repository houses the source code for **VOXA** (internally referred to as `bold-mendel`), a cutting-edge digital solutions agency and software platform. VOXA specializes in combining traditional digital agency services (Web Development, Marketing, SEO) with highly specialized, AI-driven software products (ATS, E-Learning, Surveillance, Sports Analytics, etc.).

## 2. Core Technologies & Stack
The project is built on a modern, high-performance web stack:
*   **Framework:** Next.js (v16.3.5) utilizing the App Router and React Server Components.
*   **Core UI Library:** React (v19.2.8) and React DOM (v19.2.8).
*   **Styling & Animation:** 
    *   Tailwind CSS (v4) with PostCSS.
    *   Framer Motion (v13.4.4) for complex UI animations.
    *   Styled-components (v6.5.3).
    *   Utility libraries: `clsx` and `tailwind-merge`.
*   **Content Management System (CMS):** Sanity (v6.16.0) integrated seamlessly using `next-sanity` and embedded directly into the Next.js app (`/studio` route).
*   **Testing:** Vitest (v4.1.11) configured with `@testing-library/react` and `jsdom` for component testing.
*   **Other Integrations:** 
    *   `nodemailer` for backend email automation (e.g., contact forms).
    *   `mcp-figma` for potential design-to-code or Figma API integrations.
    *   `@vercel/analytics` for usage tracking.

## 3. Project Architecture & Directory Structure
The application follows a strictly modular architecture within the `src/` directory:

*   **`src/app/`**: Next.js App Router core.
    *   **`[lang]/`**: Implements Internationalization (i18n). The site is available in both English (`en`) and Arabic (`ar`). Contains all primary routes (`/about`, `/articles`, `/contact`, `/services`, `/work`).
    *   **`studio/`**: The embedded Sanity CMS Studio interface, allowing admins to manage content directly from the app.
    *   **`actions/`**: Next.js Server Actions (e.g., `contact.ts` for handling form submissions).
*   **`src/components/`**: Reusable React components. Includes sections like `Hero.tsx`, `FeaturesSection.tsx`, `PricingSection.tsx`, and standard UI elements (`ui/Button.tsx`, `ui/Card.tsx`).
*   **`src/dictionaries/`**: Contains the JSON locale files (`en.json`, `ar.json`) used for rendering translated text across the platform.
*   **`src/data/`**: Static datasets for the application (`articles.ts`, `projects.ts`).
*   **Configuration Files (Root):**
    *   `next.config.ts`, `postcss.config.mjs`, `tailwind.config.ts`, `tsconfig.json`
    *   `vitest.config.ts` and `vitest-setup.ts` (Testing setup)
    *   `sanity.config.ts` and `sanity/` folder (CMS schema and config)
    *   `vercel.json` (Deployment configuration)

## 4. Business Domains & Services
Based on the locale dictionaries and service structures, VOXA offers two main tiers of products:

**Tier 1: Agency Services**
*   **Custom Web Development:** Blazing fast, highly accessible web apps using Next.js.
*   **Data-Driven Marketing:** Social media, PPC, CRO, and email automation.
*   **SEO & Brand Positioning:** Technical SEO audits, content strategy, and local SEO.

**Tier 2: AI-Powered Software Products**
*   **Voxa (ATS):** AI-driven Applicant Tracking System using Gemini 2.5 Flash, Twilio WhatsApp, PostgreSQL, and Cloudflare R2.
*   **Skillup (E-Learning):** Privacy-first educational platform utilizing local LLMs (Ollama) and Hybrid SQL/JSON storage.
*   **Smart Vision Surveillance:** CCTV analytics using YOLOv8, ByteTrack, and Next.js WebSockets for person/weapon detection.
*   **Mental Health Classification:** Machine learning models (85% accuracy) for academic stress classification using Streamlit dashboards.
*   **AI Sports Analytics:** Elite tennis performance tracking using YOLO, ResNet50, and FastAPI backends.

## 5. AI Agent Directives & Tooling
A highly unique aspect of this project is its extensive configuration for AI coding assistants (like Antigravity IDE and Claude).
The repository contains numerous Markdown files defining strict rules for AI interaction:
*   `AGENTS.md` / `CLAUDE.md`: General routing and Next.js specific warnings.
*   `antigravity_ide_ai_agent_system_directives.md`: The central rulebook. It mandates that AI agents act as Senior Staff Engineers, strictly adhering to SOLID principles, DRY, KISS, and YAGNI. It enforces strict security (Zero Trust, input validation), pure functions, robust error handling, and mandatory AAA (Arrange, Act, Assert) testing.
*   *Other specialized directives:* There are specific files for Back-end, Front-end, Graphic Design, SEO/ASO, Testing, and UI/UX directives, ensuring the AI assistant maintains high standards across all disciplines.

## 6. Development Workflow
1.  **Local Dev Server:** `npm run dev`
2.  **Production Build:** `npm run build`
3.  **Linting:** `npm run lint` (using ESLint 9 + Next config)
4.  **Testing:** `npm run test` (executes Vitest suite)
5.  **Deployment:** Vercel (configured via `vercel.json` and standard Next.js deployment pipelines).
