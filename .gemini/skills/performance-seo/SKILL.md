---
name: performance-seo
description: Guidelines for ensuring perfect performance and SEO for the VOXA agency site.
---

# Performance & SEO Showcase (VOXA)

As a digital agency selling high-end web and marketing solutions, the VOXA website itself is the primary portfolio piece. It must be technically flawless.

## 1. Technical SEO
- **Metadata:** Every page must export a dynamic `Metadata` object. Titles should follow the format `Service Name | VOXA Web & Digital`.
- **OpenGraph & Twitter Cards:** Ensure OG tags are set with high-quality preview images (from `public/assets/images/`) so the site looks great when shared on social media or WhatsApp.
- **Semantic HTML:** Use proper tags (`<article>`, `<section>`, `<main>`, `<nav>`) and ensure only one `<h1>` exists per page.

## 2. Performance (Core Web Vitals)
- **Image Optimization:** ALL images must use the `next/image` component. Never use raw `<img>` tags.
- **SVGs:** SVGs from the `public/assets/svgs/` folder should be optimized. You can import them directly or use `next/image`.
- **Font Loading:** Use `next/font/google` or `next/font/local` to prevent layout shifts (CLS).
- **Lighthouse:** The goal is 100/100 across Performance, Accessibility, Best Practices, and SEO.

## 3. Accessibility (a11y)
- Ensure contrast ratios pass WCAG AA standards (especially with the cyan gradients).
- Add `aria-labels` to all icon-only buttons (like social media links or mobile menu toggles).
