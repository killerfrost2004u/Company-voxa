---
name: ui-ux-design-system
description: Design principles and Tailwind v4 usage guidelines for the project.
---

# UI / UX Design System (Tailwind v4)

This project (VOXA Web & Digital) represents a high-end web development agency. The aesthetic must reflect premium quality.

## 1. Aesthetic Guidelines
- **No Generic UI:** Avoid basic, unstyled HTML elements. Always use styled components.
- **Glassmorphism & Depth:** Utilize subtle gradients, blurs (`backdrop-blur-md`), and glowing drop-shadows (e.g., `shadow-[0_0_30px_rgba(95,205,215,0.3)]`) to create depth.
- **Micro-interactions:** Add hover states with smooth transitions (`transition-all duration-300`) to interactive elements (buttons, links, cards). 
- **Animations:** Use fade-in animations for section reveals.

## 2. Tailwind v4 Specifics
- Tailwind v4 handles some styling natively without explicit plugins. 
- Avoid arbitrary values where a semantic theme token is defined.
- Utilize the CSS variables and custom classes defined in `src/app/globals.css` (or `index.css`), such as `.text-gradient` and `.bg-cyan-gradient`.

## 3. Icons
- Always use `lucide-react` for icons. Ensure they are sized appropriately and match the surrounding text color and typography.

## 4. Typography
- The site targets Arabic readers. Ensure adequate line height (`leading-relaxed`) and readable font sizes.
- Rely on the `next/font` imported font (like Geist or a specific Arabic web font if configured).
