# QF Design System — Project Memory

## Overview
This is the Qatar Foundation Design System containing core brand elements and dashboard design samples for the Communications team.

## Project Structure
- **Design System Core**: `index.html` - Main design system with colors, typography, spacing, icons, and chart components
- **Sample Dashboards**:
  - `dashboard.html` - Social Media Dashboard sample
  - `digital-dashboard.html` - Digital Media Analytics Dashboard sample
- **Deploy Folder**: `deploy/` - Production-ready files for Netlify

## Brand Elements Included
- **Colors**: Sidra Green (primary), Sage (secondary), Warm Gray neutrals, Categorical, Semantic
- **Typography**: QF Font (variable font), type scale
- **Spacing**: 4px base unit system
- **Icons**: IBM Carbon icon guidelines
- **Charts**: Stat cards, bar charts, donut, treemap, bubble, waffle, and more

## Repository
- GitHub: https://github.com/designbysoil/comms-dashboard.git
- Main branch: main

## Deployment
- Netlify site: https://qf-design-system.netlify.app
- Deploy command: `npx netlify-cli deploy --prod`
- Deploy from the `deploy/` folder

## Sidebar Navigation Pattern
Default pattern for guide pages (see `art-direction.html` in `/ec/` folder for reference):

### Structure
- Fixed left sidebar, no background (transparent, uses page bg `#F5F5F3`)
- Width: `w-52` (208px), with `pt-8 pl-6` padding
- Header: uppercase small text label (e.g., "QF DESIGN SYSTEM")

### Vertical Bar
- Continuous `border-left: 2px solid #E0E0DC` on the `<nav>` element
- Each nav item has `margin-left: -2px` to overlay the border
- Each item has its own `border-left: 2px solid transparent`
- Active item: `border-left-color: #0B241C` (dark bar appears)

### Nav Items
- **Section headers**: `font-size: 13px`, `color: #737370`, `padding: 6px 20px 6px 14px`
- **Sub-items**: `font-size: 12px`, `color: #9A9A96`, `padding: 4px 20px 4px 26px`
- Active state: `color: #0B241C`, `font-weight: 500` (sections only)

### Scroll Spy
- Track ALL items individually (both sections and sub-items)
- Use `data-section` attribute linking to element IDs
- Iterate backwards through items to find last one above threshold (`scrollTop >= sectionTop - 100`)
- Throttle with `requestAnimationFrame`

### Header Style
- Breadcrumb text above title (e.g., "Qatar Foundation")
- Large title with inline action button (e.g., Download)
- Subtitle below
- Aligned with centered content container (`max-w-3xl mx-auto px-8`)

## Workflow
- **Changelog**: After each significant change, update the Changelog section in `index.html` (search for `id="changelog"`). Add a new entry with the date and list of changes.
- **Download Feature**: Users can download the HTML file directly from the site for use in AI prompts.
