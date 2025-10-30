# 10 - Feature Overview

**Purpose**: Provides a clear, actionable plan for implementation by listing all features in WSJF priority order as small, cross-cutting vertical slices. Details are provided only under per-feature sections.

## 1. Feature Build Order

List vertical slices in WSJF priority order (highest value/effort ratio first). Keep the table concise. Do not include user stories or long descriptions here.

| Priority | Feature ID | Feature Name                                     | WSJF Score |
| -------- | ---------- | ------------------------------------------------ | ---------- |
| 1        | F-000      | Foundations: Astro app, CI/CD, tokens, baseline  | 10.00      |
| 2        | F-001      | Primary "Book Consultation" CTA (Calendly popup) | 9.50       |
| 3        | F-003      | Floating Facebook Messenger button               | 8.50       |
| 4        | F-002      | Contact options section (call, email, book)      | 8.00       |
| 5        | F-004      | Embedded Calendly scheduling section             | 7.80       |
| 6        | F-011      | Debt calculator link CTA                         | 7.20       |
| 7        | F-005      | Testimonials section                             | 7.00       |
| 8        | F-006      | Hero + value proposition section                 | 6.50       |
| 9        | F-009      | SEO baseline (sitemap, meta)                     | 6.00       |
| 10       | F-010      | IndexNow search update integration               | 5.80       |
| 11       | F-007      | Process (3-step) section                         | 5.50       |
| 12       | F-008      | Founder story section                            | 5.00       |

## 2. Feature Details and User Stories

Provide narrative details per feature using subheaders and bullets. Avoid tables in this section.

### ✅ F-000 Foundations: Astro app, CI/CD, tokens, baseline

- **Scope**: Establish the project skeleton and operational baseline: Astro app scaffolding, GitHub Actions CI/CD to GitHub Pages, design token system, base layout, and global styles.
- **Dependencies**: None

**User Stories** (business-focused; avoid implementation details):

- [ ] As a site owner, I can deploy on each push so that visitors always see the latest content.
- [ ] As a site owner, I can use a consistent visual system so that the site appears professional and trustworthy.

### 🚀 F-001 Primary "Book Consultation" CTA (Calendly popup)

- **Scope**: Prominent booking CTAs in header/hero trigger a Calendly popup to schedule a free consultation without leaving the page.
- **Dependencies**: F-000

**User Stories**:

- [ ] As a visitor, I can book a consultation from the main CTA so that I can quickly get started.
- [ ] As a visitor, I can open a booking modal without navigation so that scheduling feels frictionless.

### 🚀 F-003 Floating Facebook Messenger button

- **Scope**: Persistent floating Messenger button allows instant chat initiation via `m.me` link.
- **Dependencies**: F-000

**User Stories**:

- [ ] As a visitor, I can start a chat instantly so that I can ask questions before booking.
- [ ] As a visitor, I can access chat from any scroll position so that help is always available.

### 🚀 F-002 Contact options section (call, email, book)

- **Scope**: Contact section with clear options: click-to-call, click-to-email, and scroll-to-book (Calendly area).
- **Dependencies**: F-000, F-004

**User Stories**:

- [ ] As a visitor, I can call directly so that I can talk to someone immediately.
- [ ] As a visitor, I can email easily so that I can follow up with questions on my time.
- [ ] As a visitor, I can jump to booking so that I can finish scheduling quickly.

### 🚀 F-004 Embedded Calendly scheduling section

- **Scope**: Inline Calendly embed at the bottom of the home page for users preferring an in-page scheduling flow.
- **Dependencies**: F-000

**User Stories**:

- [ ] As a visitor, I can schedule in-page so that I don’t have to switch contexts.
- [ ] As a visitor, I can confirm my booking details clearly so that I feel confident about next steps.

### 🚀 F-011 Debt calculator link CTA

- **Scope**: Prominent CTA linking to the debt payoff calculator (`mydebtfree.coach/jmj`) to help visitors visualize payoff timelines.
- **Dependencies**: F-000

**User Stories**:

- [ ] As a visitor, I can open the calculator so that I understand my payoff timeline.
- [ ] As a visitor, I can return to the site easily so that I can book after exploring my options.

### 🚀 F-005 Testimonials section

- **Scope**: Trust-building testimonials displayed in cards with concise, impactful quotes.
- **Dependencies**: F-000

**User Stories**:

- [ ] As a visitor, I can read client results so that I trust the coaching service.
- [ ] As a visitor, I can quickly scan testimonials so that I can assess credibility.

### 🚀 F-006 Hero + value proposition section

- **Scope**: Above-the-fold hero with brand, headline, and clear value proposition reinforcing outcomes and audience fit.
- **Dependencies**: F-000

**User Stories**:

- [ ] As a visitor, I can immediately understand the service so that I know I’m in the right place.
- [ ] As a visitor, I can see a clear primary CTA so that I know the next step.

### 🚀 F-009 SEO baseline (sitemap, meta)

- **Scope**: Metadata defaults per page, sitemap generation, and social sharing tags.
- **Dependencies**: F-000

**User Stories**:

- [ ] As a site owner, I can ensure pages are discoverable so that prospects can find us.

### 🚀 F-010 IndexNow search update integration

- **Scope**: Trigger IndexNow pings on content changes to accelerate search indexing.
- **Dependencies**: F-000, F-009

**User Stories**:

- [ ] As a site owner, I can notify search engines of updates so that new content is indexed faster.

### 🚀 F-007 Process (3-step) section

- **Scope**: Simple 3-step process explaining how coaching works from consultation to plan and ongoing accountability.
- **Dependencies**: F-000

**User Stories**:

- [ ] As a visitor, I can understand the process so that I know what to expect.
- [ ] As a visitor, I can see coaching is collaborative so that I feel comfortable starting.

### 🚀 F-008 Founder story section

- **Scope**: Personal story and photo to humanize the brand and build connection.
- **Dependencies**: F-000

**User Stories**:

- [ ] As a visitor, I can learn about the founder so that I feel confident working together.
- [ ] As a visitor, I can see authenticity so that I trust the service.
