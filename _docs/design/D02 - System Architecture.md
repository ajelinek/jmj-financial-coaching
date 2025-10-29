# D02 - System Architecture

**Purpose**: This document describes the overall system architecture, including major components, their interactions, technology choices, and architectural patterns. It focuses on the **how** the system is structured at a high level, providing technical context for development decisions.

## 1. Architectural Style & Patterns

- **Primary Architecture**: Static Site Generation (SSG) with embedded external services
- **Core Patterns**: Component-based architecture with island architecture for interactivity
- **Communication**: Embedded widgets (Calendly, Facebook), external APIs (Google Analytics, IndexNow)
- **Infrastructure Highlights**: GitHub Pages hosting, global CDN distribution, automated CI/CD pipeline
- **Key Drivers**: Performance, simplicity, cost-effectiveness, maintainability

## 2. Major System Components

1. **Static Website (Frontend)**: User interface, content presentation, and client-side interactions
2. **Build System**: AstroJS compilation, asset optimization, and static site generation
3. **External Service Integrations**: Calendly scheduling, Facebook Messenger, Google Analytics, IndexNow API
4. **Content Management**: Markdown files for testimonials, HTML components for structured content
5. **Deployment Pipeline**: GitHub Actions for automated build and deployment to GitHub Pages

## 3. Technology Stack

- **Frontend**: AstroJS with TypeScript, Solid.js islands for interactivity, CSS custom properties with 3-layer token system
- **Styling**: CSS Modules with custom properties (Global → Semantic → Component tokens)
- **Content**: Markdown files for testimonials, HTML in Astro components for structured content
- **External Services**: Calendly embedded widgets, Facebook Customer Chat Plugin, Google Analytics 4, IndexNow API
- **Infrastructure**: GitHub Pages hosting with global CDN, GitHub Actions for CI/CD
- **Development Tools**: AstroJS build system, Playwright for E2E testing, TypeScript for type safety

## 4. Testing Strategy

- **Testing Philosophy**: E2E > Integration > Unit testing approach with focus on critical user journeys
- **Testing Tools**: Playwright for E2E tests covering consultation booking, contact forms, and Facebook Messenger interaction
