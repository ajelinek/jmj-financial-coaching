# D06 - UI Design

**Purpose**: This document establishes the strategic design decisions and visual system principles for the JMJ Financial Coaching website. It focuses on design strategy rather than implementation details, which will be handled through design tokens and CSS variables.

## 1. Design Strategy & Brand Foundation

- **Brand Personality**: Professional, trustworthy, confident, and approachable - conveying expertise while remaining accessible to debt-struggling individuals and families
- **Design Philosophy**: Clean, sophisticated interfaces that build trust through visual hierarchy and professional aesthetics, prioritizing user confidence and financial peace
- **Accessibility Strategy**: WCAG 2.1 AA compliance with focus on keyboard navigation, screen reader support, and high contrast ratios for financial content readability
- **Responsive Philosophy**: Fluid, breakpoint-free design that flows naturally across all screen sizes using relative units and flexible layouts

## 2. Color Strategy

### Color Philosophy

- **Primary Color Strategy**: Sophisticated purple palette derived from brand logo signature, conveying confidence and premium financial services
- **Semantic Color System**: Colors communicate trust (muted teal), action (rich purple), and professionalism (neutral grays) to guide user behavior
- **Accessibility Requirements**: Minimum 4.5:1 contrast ratios for all text, color-blind friendly palette with additional visual cues beyond color
- **Theme Support**: Single professional theme optimized for financial services credibility and trust-building

### Color Categories

- **Brand Colors**:
  - Primary: #8b2c9c (rich purple) - CTAs, active states, brand highlights, derived from logo signature
  - Secondary: #6b1a7a (deep purple) - hover states, emphasis elements
  - Accent: #4a9b8e (muted teal) - success states, positive financial indicators, derived from logo monogram
- **Semantic Colors**:
  - Success: #4a9b8e (muted teal) - debt payoff progress, positive testimonials, derived from logo monogram
  - Warning: #f59e0b (amber) - important notices, cautionary information
  - Error: #ef4444 (red) - form validation, critical alerts
  - Info: #3b82f6 (blue) - informational content, educational materials
- **Neutral Palette**:
  - Text: #15202b (dark blue-gray) - primary text for readability
  - Background: #ffffff (white) - clean, professional backgrounds
  - Muted: #e7e7e7 (light gray) - secondary text, borders, subtle elements

## 3. Typography Strategy

### Typography Philosophy

- **Font Selection Strategy**: Professional, highly readable fonts that convey expertise and trustworthiness for financial content
- **Hierarchy Philosophy**: Clear information architecture through font weight, size, and spacing to guide users through financial coaching information
- **Readability Standards**: Optimal line height (1.6rem), comfortable line length (65-75 characters), and sufficient spacing using REM units for financial content comprehension

### Font System

- **Primary Font**: Inter (sans-serif) - Modern, highly readable, professional appearance for body text and UI elements
- **Secondary Font**: Playfair Display (serif) - Elegant, sophisticated headings that convey expertise and premium service

## 4. Layout & Component Strategy

- **Layout & Spacing**: CSS Grid for complex layouts, Flexbox for components, consistent REM-based spacing scale (0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem), fluid design with clamp() for responsive typography and spacing
- **Component Design**: Atomic design methodology with clear interactive states, consistent feedback patterns, and professional component categories (navigation, forms, testimonials, CTAs)
- **Visual Assets**: Professional photography of Jennifer, clean iconography (Heroicons), subtle illustrations for financial concepts, optimized image loading with WebP format
- **Motion & Interaction**: Purposeful micro-animations for state changes and user feedback, 60fps performance, respect reduced motion preferences, smooth transitions for trust-building interactions

**Agents Used**: UI Designer, Frontend Architect
**Rules Applied**: WCAG 2.1 AA compliance, fluid responsive design with REM units, professional financial services aesthetic
