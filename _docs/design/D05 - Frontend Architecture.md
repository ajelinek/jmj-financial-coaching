# D05 - Frontend Architecture

**Purpose**: This document outlines the specific architecture for the JMJ Financial Coaching frontend application, including component structure, state management strategy, UI framework conventions, key libraries, and development patterns. It focuses on the **how** the frontend is structured and organized to deliver optimal user experience for a static financial coaching website.

## 1. Core Frameworks & Libraries

- **Framework**: AstroJS 4.x with TypeScript 5.0+
- **Language**: TypeScript 5.0+ with strict mode enabled
- **UI Component Library**: None (custom components with 3-layer token system)
- **State Management**: SolidJS stores for minimal client-side interactivity
- **Server State & Caching**: Static content only (no server state management needed)
- **Styling**: CSS Modules with 3-layer token system (Global → Semantic → Component tokens)
- **Form Handling**: Native HTML forms with Astro form actions
- **Testing**: Playwright for E2E testing, Vitest for component unit tests
- **SEO**: AstroJS built-in SEO features + IndexNow API integration
- **External Integrations**: Calendly embedded widgets, Facebook Messenger direct links
- **Build System**: AstroJS with Vite for fast development and optimized production builds
- **Deployment**: GitHub Pages with automated CI/CD via GitHub Actions

## 2. Directory Structure

**High-level overview of the frontend's directory structure to ensure consistency:**

```
/src
├── /components/              # Reusable UI Components
│   ├── /foundation/          # Base UI building blocks (Button, Input, etc.)
│   │   └── /Button/
│   │       ├── index.astro
│   │       ├── Button.test.ts
│   │       └── Button.module.css
│   ├── /common/              # Composition of foundation components
│   │   ├── /Header/
│   │   ├── /Footer/
│   │   ├── /TestimonialCard/
│   │   └── /ContactForm/
│   ├── /features/            # Feature-specific components
│   │   ├── /ConsultationBooking/
│   │   ├── /TestimonialSection/
│   │   └── /AboutSection/
│   └── /islands/             # SolidJS interactive components
│       └── /CalendlyWidget/  # Pop-up widget functionality
├── /pages/                   # Astro pages (file-based routing)
│   ├── index.astro
│   ├── about.astro
│   └── contact.astro
├── /layouts/                 # Page layout components
│   ├── BaseLayout.astro
│   └── PageLayout.astro
├── /content/                 # Content collections (testimonials, etc.)
│   └── /testimonials/
│       └── *.md
├── /styles/                  # Global styles and design tokens
│   ├── /tokens/              # 3-layer token system
│   │   ├── global.css        # Global tokens (colors, spacing, typography)
│   │   ├── semantic.css      # Semantic tokens (primary, secondary, etc.)
│   │   └── component.css     # Component-specific tokens
│   ├── /base/                # Base styles and resets
│   └── /utilities/           # Utility classes
├── /store/                   # State management (minimal for static site)
│   ├── /repository/          # External system interactions (Calendly)
│   ├── /service/             # Business logic & state management
│   └── /config.ts            # System configuration
├── /utils/                   # Utility functions and helpers
├── /types/                   # TypeScript type definitions
└── /public/                  # Static assets
    ├── /images/
    └── /icons/
```

## 3. Component Architecture

**Methodology for structuring and building components:**

- **Foundation Components**: The smallest, indivisible UI elements (e.g., `Button`, `Input`, `Card`). They have no business logic and are found in `/components/foundation`. Built as Astro components with CSS Modules.

- **Common Components**: Compositions of foundation components that form more complex, reusable components (e.g., `Header`, `Footer`, `TestimonialCard`). They may have internal state but are generally unaware of business logic. Found in `/components/common`.

- **Feature Components**: Components specific to a particular feature or business domain (e.g., `ConsultationBooking`, `TestimonialSection`). They handle data fetching from content collections and compose common components. Found in `/components/features`.

- **Island Components**: Interactive SolidJS components for client-side functionality (e.g., `CalendlyWidget` for pop-up functionality). These are the only components that require JavaScript and are found in `/components/islands`.

- **External Widgets**: Third-party widgets loaded via JavaScript SDK (e.g., Calendly). These are injected via script tags in the base layout.

- **Messenger Integration**: Direct links to Facebook Messenger using `m.me/` URLs for immediate client communication.

- **Page Components**: Top-level Astro pages that compose features into complete pages. They handle routing, layout, and high-level content coordination. Found in `/pages`.

## 4. State Management Strategy

**Service-Repository pattern adapted for static site with minimal client-side state:**

- **Local/Component State**: SolidJS `createSignal` for minimal client-side state within individual island components only (e.g., form validation, modal visibility, widget interactions). Each island manages its own state independently.

- **Global State**: Minimal Service-Repository architecture for external integrations:

  - **Repository Layer** (`/store/repository/`): Direct external system interactions (Calendly API, IndexNow API)
  - **Service Layer** (`/store/service/`): Business logic and state management via custom hooks for external widget management
  - Components access external services through service hooks only (never direct repository access)

- **Server/Remote State**: Not applicable - all content is static and generated at build time using Astro's content collections.

- **Form State**: Native HTML forms with Astro form actions for server-side processing. Client-side validation handled by SolidJS within individual island components only.

- **External Widget State**: Calendly and Facebook Messenger widgets manage their own state independently through their respective SDKs.

## 5. SEO Requirements

**Technical SEO implementation for public website visibility:**

- **Meta Tags**: AstroJS built-in SEO features with dynamic meta tag generation for each page
- **Structured Data**: JSON-LD structured data for business information, testimonials, and service offerings
- **IndexNow Integration**: Automated search engine updates via IndexNow API for content changes
- **Sitemap Generation**: Automatic XML sitemap generation for search engine crawling
- **Open Graph Tags**: Social media sharing optimization with proper OG tags
- **Local SEO**: Schema markup for local business information and service areas
- **Performance SEO**: Core Web Vitals optimization for search ranking factors
- **Content Optimization**: Semantic HTML structure and proper heading hierarchy for content discoverability

## 6. Testing Strategy

**E2E > Integration > Unit testing approach with focus on critical user journeys:**

- **E2E Testing**: Playwright for critical user journeys (consultation booking, contact forms, Facebook Messenger interaction)
- **Integration Testing**: Component integration tests for form submissions and external widget interactions
- **Accessibility Testing**: Automated accessibility testing integrated into E2E test suite
- **Cross-Browser Testing**: Playwright multi-browser testing for compatibility
