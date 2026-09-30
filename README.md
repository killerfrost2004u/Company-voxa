# VOXA Digital Solutions 🚀

Welcome to the official repository for **VOXA** (internally known as `bold-mendel`), a cutting-edge digital solutions agency and software platform. 

VOXA bridges the gap between traditional digital marketing services and highly specialized, AI-driven software products.

---

## 🌟 Key Services & Products

### Agency Services
*   **Custom Web Development:** Blazing fast, highly accessible web apps using Next.js.
*   **Data-Driven Marketing:** Social media, PPC, CRO, and email automation.
*   **SEO & Brand Positioning:** Technical SEO audits, content strategy, and local SEO.

### AI-Powered Software Products
*   **Voxa (ATS):** AI-driven Applicant Tracking System using Gemini 2.5 Flash, Twilio WhatsApp, PostgreSQL, and Cloudflare R2.
*   **Skillup (E-Learning):** Privacy-first educational platform utilizing local LLMs (Ollama) and Hybrid SQL/JSON storage.
*   **Smart Vision Surveillance:** CCTV analytics using YOLOv8, ByteTrack, and Next.js WebSockets for person/weapon detection.
*   **Mental Health Classification:** Machine learning models (85% accuracy) for academic stress classification.
*   **AI Sports Analytics:** Elite tennis performance tracking using YOLO, ResNet50, and FastAPI backends.

---

## 🏗️ Tech Stack
*   **Core:** Next.js (v16.3), React (v19.2)
*   **Styling & UI:** Tailwind CSS v4, Framer Motion, Styled-Components
*   **Content Management:** Sanity CMS (`/studio`)
*   **Testing:** Vitest, React Testing Library
*   **Deployment:** Vercel

---

## 🚀 Getting Started

First, ensure you have your environment variables set up in a `.env.local` file (including Sanity project IDs and email SMTP credentials).

Then, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application. The Sanity Studio is available at `/studio`.

## 🧪 Testing

To run the Vitest test suite:
```bash
npm run test
```

## 🤖 AI Agent Directives
This project contains strict Markdown directives (`AGENTS.md`, `antigravity_ide_ai_agent_system_directives.md`, etc.) that guide AI coding assistants to maintain clean, SOLID, and secure code. AI agents working on this project must read and adhere to these principles.
