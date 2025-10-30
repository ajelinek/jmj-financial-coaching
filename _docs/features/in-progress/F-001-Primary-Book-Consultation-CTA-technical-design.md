# Feature: F-001 Primary "Book Consultation" CTA - Technical Design

**Purpose**: This document provides the high-level technical specifications for the F-001 Primary "Book Consultation" CTA feature. It includes a technical overview, system flow, and integration points with existing architecture.

## 1. Feature Overview

**Business Purpose**: Enable visitors to instantly initiate scheduling via a prominent CTA that opens a Calendly popup, reducing friction and accelerating conversion to booked consultations.

**User Problem**: Visitors ready to act shouldn’t be forced to navigate away or hunt for contact methods; modal scheduling must be fast, obvious, and non-disruptive.

**Business Impact**: Increases consultation bookings by shortening the path from intent to action, improving lead capture efficiency and funnel velocity.

**Success Metrics**:

- CTR on primary CTA (header/hero)
- Calendly modal open rate
- Consultation booking conversion rate (opens → scheduled)
- Time-to-first-action from page load

## 2. System / User Flow

The flow centers on a single, consistent CTA that launches a Calendly popup and captures a scheduled consultation without page navigation.

```mermaid
graph TD
    A[Visitor lands on home page] --> B{Sees primary CTA}
    B -->|Clicks CTA| C[Open Calendly popup]
    C --> D[Visitor selects date/time]
    D --> E[Enter details & confirm]
    E --> F{Booking successful?}
    F -->|Yes| G[Calendly confirmation + email]
    F -->|No (cancel/close)| H[Return to page state]
    H --> I[Can try again or use other contact options]
    G --> J[Lead captured; follow-up workflow]
```

## 3. Change Summary Table

| Module/File Path                           | Item Name                       | Status  | Description                                                                                            |
| :----------------------------------------- | :------------------------------ | :------ | :----------------------------------------------------------------------------------------------------- |
| `src/components/BookConsultationCTA.astro` | `BookConsultationCTA` component | New     | Reusable primary CTA that triggers Calendly popup via data attributes.                                 |
| `src/lib/integrations/calendly.ts`         | `ensureCalendlyPopup` utility   | New     | Safely injects Calendly widget script once and exposes a function to open the popup by URL.            |
| `src/layouts/BaseLayout.astro`             | Calendly script hook            | Updated | Adds deferred Calendly widget loader hook used by CTA utility; no visual change.                       |
| `src/pages/index.astro`                    | Hero CTA usage                  | Updated | Renders `BookConsultationCTA` in hero and optionally header; passes Calendly URL and tracking context. |
| `src/components/Header.astro`              | Header CTA usage                | New     | Adds compact `BookConsultationCTA` instance in header for persistent access.                           |

## 4. Implementation Details

### 4.1. CTA Module (`src/components/BookConsultationCTA.astro`)

**Module Purpose**: Present a consistent, prominent CTA that opens a Calendly popup without navigation.

**Module Dependencies**: `ensureCalendlyPopup` (Calendly loader), design tokens from foundations.

**Business Context**: Reduces friction from intent → booking by keeping users on-page and making the action obvious and repeatable.

**Integration Points**: Used in `index.astro` hero and `Header.astro`; relies on global Calendly script injected by the loader.

#### Components/Functions in this Module:

##### `BookConsultationCTA` Component: `props: { url: string; label?: string; variant?: 'primary'|'inline'; location: 'hero'|'header'|'section'; }` → renders CTA

- **What**: Renders a button/link with accessible label; on activation, calls `ensureCalendlyPopup(url).open()`.
- **Why**: Centralizes CTA behavior to keep UX consistent across placements.
- **Constraints**: Must be keyboard accessible and not render server errors if Calendly is blocked; degrade to normal link fallback.
- **Integration Points**: Uses `aria-controls`/`aria-expanded` patterns; uses tokens for colors/spacing.

### 4.2. Calendly Integration (`src/lib/integrations/calendly.ts`)

**Module Purpose**: Provide a safe, idempotent loader and popup trigger for the Calendly widget.

**Module Dependencies**: DOM availability (client-side), Calendly widget CDN.

**Business Context**: Avoids duplicate script loads and race conditions; isolates external dependency surface.

**Integration Points**: Called by CTA; optional hook in layout for preloading.

#### Components/Functions in this Module:

##### `ensureCalendlyPopup` Function: `params: { url: string } | string` → `{ open: () => void }`

- **What**: Injects Calendly's widget assets once (CSS/JS from `https://assets.calendly.com/assets/external/widget.{css,js}`) and returns an `open()` that calls `Calendly.initPopupWidget({ url })`. We control our own buttons/links; Calendly script is only for the popup.
- **Why**: Encapsulates third-party loading and shields the rest of the codebase from script timing issues.
- **Constraints**: No-op on SSR; guard against multiple appends; safe to call repeatedly; minimal surface—no Calendly-provided buttons.
- **Integration Points**: Called by CTA to open popup on activation.

### 4.3. Base Layout (`src/layouts/BaseLayout.astro`)

**Module Purpose**: Provide a predictable place to preload or defer-load third-party integrations.

**Module Dependencies**: None beyond site foundations.

**Business Context**: Keeps external scripts centralized for control and performance.

**Integration Points**: Adds a minimal hook (e.g., placeholder container or deferred loader call) used by `ensureCalendlyPopup`.

#### Changes:

- **What**: Include an optional deferred Calendly script hook (no visual output). Ensure it doesn’t execute during SSR.
- **Why**: Improves first interaction reliability; avoids redundant script injection when CTA is used multiple times.
- **Constraints**: Must not impact LCP; load deferred/after interaction when possible.

### 4.4. Home Page (`src/pages/index.astro`)

**Module Purpose**: Surface the primary CTA in the hero with correct context.

**Dependencies**: `BookConsultationCTA`.

**Changes**:

- **What**: Render `BookConsultationCTA` with `url` (Calendly scheduling link), `location='hero'`, and primary variant.
- **Why**: Makes the action immediately available above the fold, matching UX guidance.
- **Constraints**: Ensure only one visually primary CTA per viewport to avoid decision paralysis.

### 4.5. Header (`src/components/Header.astro`)

**Module Purpose**: Provide persistent access to the CTA while scrolling.

**Dependencies**: `BookConsultationCTA`.

**Changes**:

- **What**: Render compact `BookConsultationCTA` with `location='header'` and `variant='inline'`.
- **Why**: Ensures discoverability from any scroll position.
- **Constraints**: Respect responsive layout and avoid overlap with navigation elements.

### 4.6. Implementation Order & Dependencies

1. Create `src/lib/integrations/calendly.ts` (loader + `ensureCalendlyPopup` that wraps `Calendly.initPopupWidget`).
2. Create `src/components/BookConsultationCTA.astro` (uses `ensureCalendlyPopup` on activation; accessible button/link semantics per project rules).
3. Update `src/layouts/BaseLayout.astro` (optional: add deferred/hook to ensure widget assets available—no visual changes).
4. Update `src/pages/index.astro` (add hero CTA instance with primary variant and scheduling URL).
5. Create `src/components/Header.astro` (add inline variant CTA for persistent access).
6. Wire tokens/styles where needed; keep behavior centralized in CTA + loader.

## 5. Test Scenarios

Out of scope for this iteration per decision: no testing deliverables included.
