---
name: lead-generation-forms
description: Guidelines for building secure, high-converting lead generation forms for VOXA.
---

# Lead Generation & Form Handling (VOXA)

VOXA relies on its website to generate leads for its agency services (Marketing, Web Dev, ATS, etc.). Follow these rules when creating or modifying forms:

## 1. Architecture
- **Server Actions:** All forms must use Next.js Server Actions (`"use server"`) for submission logic.
- **Validation:** Use `zod` for strict server-side and client-side validation. Do not accept incomplete forms.
- **Client State:** Use React 19's `useActionState` and `useFormStatus` hooks to manage pending states (loading spinners) and error displays beautifully.

## 2. Lead Routing (MCP Integrations)
- **CRM / Spreadsheets:** Form data should be piped into the VOXA tracking spreadsheets (e.g., "Meta Ads Leads & Campaign Tracker.xlsx") or a Google Sheet via the Google Workspace MCP or API.
- **Email Notifications:** Ensure the VOXA team receives an instant email notification (e.g., via Resend) when a high-ticket service is requested.
- **Auto-responder:** Send a beautifully branded HTML email to the client confirming their request.

## 3. User Experience (UX)
- Use inline validation to immediately tell users if a field (like phone number) is formatted incorrectly.
- Avoid overwhelming the user; if a form is long (like the Client Intake Form), break it down into a multi-step wizard.
- The submit button must have a clear loading state and micro-animation.
