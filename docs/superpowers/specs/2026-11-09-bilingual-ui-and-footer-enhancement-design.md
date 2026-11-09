# Design Document: Bilingual UI (English/Arabic) & Footer Enhancement

## 1. Intent & Overview
VOXA is expanding its positioning to capture both Egyptian/MENA and international clients. This design establishes a unified, seamless bilingual experience across the entire web application, cleans up the preloader controls, removes redundant section-level language toggles in favor of a global header switcher, and elevates the footer into a modern, beautifully structured digital agency footer.

---

## 2. Goals, Non-Goals & Anti-Goals

### Goals
- **English Default**: English remains the default landing language for first-time visitors, with user selection persisted in `localStorage`.
- **Header Global Switcher**: A single, prominent toggle button in the header (and mobile menu) that switches the entire website between English and Arabic.
- **Full Site Localization**: All components (Header, Hero, Services, Why Voxa, Pricing, FAQ, Testimonials, Contact, CTA, Footer, Floating WhatsApp) react instantly to language changes.
- **RTL & SEO Synchronization**:
  - Dynamically updates `<html lang="..." dir="...">` (`ltr` for English, `rtl` for Arabic).
  - Dynamically updates document `<title>`, `<meta name="description">`, and `<meta name="keywords">` per the specifications in the Google Doc.
  - Organization and FAQ JSON-LD schemas update dynamically with active language text.
- **Preloader Simplification**: Remove "↺ REPLAY" and "SOUND: OFF" buttons from the preloader top bar, keeping only the minimalist VOXA DIGITAL LAB status badge.
- **FAQ Cleanup**: Remove the local "العربية / English" toggle pill from the FAQ section header, connecting it directly to the global language state.
- **Footer Redesign**: Transform the cramped, wrapping footer bar into a spacious 3-column agency footer with brand identity, structured navigation, direct contact/location details, and a clear bottom copyright bar with adequate clearance from the floating WhatsApp widget.

### Non-Goals
- Backend translation APIs or database-backed localization (all marketing copy is fast, static, and version-controlled).
- Separate localized URL subdirectories (e.g. `/ar`) that would disrupt existing client-side hash scrolling (`#plans`, `#services`, etc.).

### Anti-Goals
- Adding heavy third-party i18n libraries (`i18next`, etc.) that bloat the client bundle for a 2-language site.
- Flashing unstyled or untranslated English text when switching to Arabic.
- Breaking responsive layout on mobile or having RTL text misaligned with icons.

---

## 3. Approaches Considered & Selected

- **Approach A (Selected)**: Lightweight React Context (`LanguageContext`) + Typed Dictionary (`src/lib/translations.ts`). Instant, zero-bloat, full reactivity, automatic DOM attribute (`dir`, `lang`) and meta tag updates.
- **Approach B (Rejected)**: `react-i18next` with external JSON files. Added 40kB+ dependency overhead and network fetch lag for simple marketing content.
- **Approach C (Rejected)**: Route-based language prefixing (`/ar`). Breaks single-page anchor scroll navigation and increases router complexity without SEO benefit over dynamic meta tags.

---

## 4. Architecture & Technical Specifications

```
                     ┌─────────────────────────────┐
                     │   LanguageContext & Hook    │
                     │  (lang: 'en'|'ar', toggle)  │
                     └──────────────┬──────────────┘
                                    │
           ┌────────────────────────┼────────────────────────┐
           ▼                        ▼                        ▼
┌────────────────────┐    ┌────────────────────┐    ┌─────────────────┐
│ DOM & SEO Updates  │    │  Header Switcher   │    │ UI Components   │
│ - <html dir, lang> │    │ - Desktop Button   │    │ - Hero, Services│
│ - <title>, <meta>  │    │ - Mobile Drawer    │    │ - WhyVoxa, Plans│
│ - JSON-LD Schema   │    └────────────────────┘    │ - FAQ, Reviews  │
└────────────────────┘                              │ - Contact, CTA  │
                                                    │ - Redesigned    │
                                                    │   Footer        │
                                                    └─────────────────┘
```

### Component Details
1. **`src/context/LanguageContext.tsx`**:
   - Manages state `'en' | 'ar'`. Defaults to `'en'` unless stored preference exists in `localStorage.getItem('voxa_lang')`.
   - `useEffect` synchronizes `document.documentElement.lang = lang` and `document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'`.
   - Dynamically updates `<title>`, `<meta name="description">`, and `<meta name="keywords">`.
2. **`src/lib/translations.ts`**:
   - Strict TypeScript dictionary containing English and Arabic strings for all components, matching the tone and copy from the Google Doc.
3. **`src/components/Header.tsx`**:
   - Integrated Language Button in the desktop navigation bar and inside the mobile drawer.
   - Text shows `العربية` when English is active, and `English` when Arabic is active, styled with border, subtle glass backdrop, and globe icon.
4. **`src/components/Preloader.tsx`**:
   - Top right container with replay and sound buttons removed.
5. **`src/components/FAQ.tsx`**:
   - Removed local `setLang` and button toggle markup. Directly reads `lang` from `useLanguage()`.
6. **`src/components/Footer.tsx`**:
   - Redesigned into a balanced layout:
     - Left: Brand logo + dynamic tagline + live availability pill.
     - Center: Quick navigation links with animated underline.
     - Right: Contact info (Cairo, Egypt; `voxaa.business@gmail.com`; phone/WhatsApp).
     - Bottom: Clean sub-bar with divider, copyright, and custom-code badge.

---

## 5. Verification Plan
- Verify build with zero TypeScript and bundle errors via `npm run build`.
- Verify default language is English on fresh session.
- Click header language toggle: verify all sections switch to Arabic with clean RTL alignment and font rendering.
- Verify Preloader has no replay or sound buttons.
- Verify FAQ section has no redundant language buttons and responds to global toggle.
- Verify redesigned Footer renders cleanly across desktop, tablet, and mobile with no collision with Floating WhatsApp.
