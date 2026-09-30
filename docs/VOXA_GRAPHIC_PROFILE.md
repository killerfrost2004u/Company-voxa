# Voxa: Graphic & Brand Profile

## 1. Brand Identity & Vision
**Voxa** is a premium, modern, and forward-thinking brand. The visual identity communicates clarity, sophistication, and a technological edge. Our design philosophy relies heavily on strict geometry, aggressive whitespace, and a high-contrast minimalist aesthetic.

## 2. Color Palette & Harmony
Our color system relies on a stark contrast between deep, inky backgrounds and sharp, metallic typographic accents. We strictly avoid pure black (`#000000`) to reduce eye strain, adhering to modern digital display best practices.

*   **Primary Background (Dark Charcoal):** `#242829`
    *   *Usage:* The foundational canvas for all primary digital interfaces. Provides depth without the harshness of pure black.
*   **Primary Accent / Typography (Silver Light):** `#d2d2d2` & `#ffffff`
    *   *Usage:* Used for headers, logos, and high-visibility interactive elements. Represents clarity and precision.
*   **Secondary Typography (Muted Silver):** `#b4b4b4`, `#a0aaaa`
    *   *Usage:* Used for body copy, subheaders, and borders. Creates visual hierarchy by de-emphasizing less critical information.

*(Color Harmony: Monochromatic/Achromatic, playing entirely on luminance values rather than hue shifting).*

## 3. Typography
Typography is the cornerstone of the Voxa brand. We utilize a highly legible, geometric sans-serif stack to maintain a clean, objective tone.

*   **Primary Typeface:** `System-UI` (Inter, San Francisco, Roboto)
*   **Logo & Headers:** 
    *   *Weight:* Ultra-Light (200/300) to Regular (400)
    *   *Tracking (Letter Spacing):* Wide tracking (e.g., `letter-spacing: 0.1em` to `0.2em`) for uppercase display text to exude a premium, expansive feel.
*   **Body Copy:** 
    *   *Weight:* Regular (400)
    *   *Leading (Line Height):* Generous leading (`1.6` to `1.8`) to ensure comfortable reading and maximize negative space.
    *   *Note:* Never increase tracking on lowercase body copy.

## 4. Logo Usage & Clear Space
The Voxa logo exists in two primary vector variations:
1.  **Geometric Mark (`voxa_logo.svg`):** Used for avatars, bold graphic statements, and standalone brand moments.
2.  **Transparent Typography (`voxa_logo_text_transparent.svg`):** The primary wordmark used in the application navigation (Navbar) and document headers.

**Rules of Engagement:**
*   **Exclusion Zone:** Always maintain a boundary of negative space around the logo equal to the height of the letter 'V'. No other graphic element or typography may enter this zone.
*   **Distortion:** Never stretch, skew, or apply drop-shadows to the vector marks.

## 5. Compositional Directives (C.R.A.P.)
When constructing UIs or marketing materials for Voxa, adhere strictly to these principles:
*   **Contrast:** Use stark value differences (e.g., `#ffffff` text on `#242829` backgrounds) to guide the eye.
*   **Repetition:** Maintain consistent border radii (e.g., `rounded-lg`), consistent typographic scales, and reuse the primary gradient mappings across active states.
*   **Alignment:** Utilize a strict 12-column grid. Nothing is placed arbitrarily; every component must align along a shared axis.
*   **Proximity:** Group related data tightly and separate disparate sections with massive swaths of whitespace. Let the design "breathe."

## 6. Asset Formats
All official logo assets are located in `public/logos/`:
*   `.svg` - For all web UIs, scaling, and print (Primary usage).
*   `.webp` - For optimized, high-fidelity raster displays.
*   `.ico` - For browser favicons.
*   `.jpg` / `.png` - For legacy compatibility and social media previews.
