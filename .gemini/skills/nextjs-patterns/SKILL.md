---
name: nextjs-patterns
description: Guidelines and best practices for Next.js 16 App Router development.
---

# Next.js 16 App Router Patterns

This project uses the Next.js 16 App Router (`src/app`). Follow these specific rules when generating or modifying code for this project:

## 1. Server vs. Client Components
- By default, all components are **Server Components**.
- Only add `"use client";` at the top of a file if the component requires interactivity (e.g., `onClick`), React hooks (e.g., `useState`, `useEffect`), or browser-only APIs.
- Keep Client Components as leaf nodes in the component tree whenever possible.

## 2. Data Fetching
- Favor native `fetch` API over third-party fetching libraries for server-side requests.
- Use Next.js caching options (`{ cache: 'force-cache' }`, `{ next: { revalidate: 3600 } }`) appropriately.
- Use the new `use` API for unwrapping Promises if needed in Client Components, but prefer passing resolved data as props from Server Components.

## 3. SEO & Metadata
- Always export a `metadata` object from `page.tsx` and `layout.tsx` to ensure excellent SEO.

## 4. Routing
- Use Next.js `Link` component from `next/link` for internal navigation.
- Manage routing state and search params securely.

## 5. Arabic RTL Support
- Note that this site targets an Arabic-speaking audience (VOXA Web & Digital). Ensure that layouts properly support RTL (Right-to-Left) reading direction by setting `dir="rtl"` in the root HTML if needed, or by using logical Tailwind CSS classes (e.g., `ms-` instead of `ml-`, `pe-` instead of `pr-`).
