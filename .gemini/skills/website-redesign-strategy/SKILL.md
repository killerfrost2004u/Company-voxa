---
name: website-redesign-strategy
description: An active framework and strategy for redesigning the VOXA website using new assets.
---

# Website Redesign Strategy (VOXA)

This skill dictates the workflow for the active redesign of the VOXA website, transitioning it from a standard template into a bespoke agency platform utilizing the newly imported assets.

## 1. Asset Integration
- **SVGs (`public/assets/svgs/`):** These are core product illustrations. Use them as hero graphics for individual service pages (e.g., create `/services/ats`, `/services/e-learning`, `/services/security`).
- **PNGs (`public/assets/images/`):** These are UI mockups and portfolio shots. Use them in a "Our Work" or "Portfolio" section (`/portfolio`) using a masonry grid or a sleek carousel layout.
- **Documents (`docs/`):** Reference the business documents (like Pricing Packages and Marketing Plans) to accurately write the copy for the pricing tables and service descriptions.

## 2. Redesign Phases
When asked to "redesign" or "build out" the site, follow these phases:

### Phase 1: Global Navigation & Foundation
- Upgrade the `Navbar` and `Footer` to support complex routing (Services dropdown, Portfolio, Pricing, Contact).
- Ensure the global CSS (`globals.css`) fully supports the VOXA brand colors (Cyan, Slate, White, Dark Blue/Black backgrounds) and glassmorphism utilities.

### Phase 2: Service Pages (The Meat)
- Generate dynamic or static routes for each core service identified in the SVGs.
- Implement the `service-page-architecture` skill.

### Phase 3: The Conversion Engine
- Build the "Client Intake" multi-step form, replacing the need for the manual Word Document.
- Hook up the form to the backend/MCPs (Google Drive/Resend).

### Phase 4: Portfolio & Proof
- Build the portfolio section using the high-res PNG mockups to showcase VOXA's design capabilities.

## 3. Execution Rule
- **Iterative Reviews:** When building a new page or heavily redesigning a component, always generate the UI, verify it looks stunning in RTL, and ask the user for visual feedback before moving to the next section.
