---
name: Modern Financial Interface
colors:
  surface: '#faf8ff'
  surface-dim: '#d6d9e9'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedfd'
  surface-container-high: '#e5e7f7'
  surface-container-highest: '#dfe2f1'
  on-surface: '#171b26'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#2c303c'
  inverse-on-surface: '#eef0ff'
  outline: '#6c7b72'
  outline-variant: '#bbcac0'
  surface-tint: '#006c4d'
  primary: '#006c4d'
  on-primary: '#ffffff'
  primary-container: '#0bca93'
  on-primary-container: '#004f37'
  inverse-primary: '#3bdfa7'
  secondary: '#006d3b'
  on-secondary: '#ffffff'
  secondary-container: '#47fd9a'
  on-secondary-container: '#00723e'
  tertiary: '#98471a'
  on-tertiary: '#ffffff'
  tertiary-container: '#ff9764'
  on-tertiary-container: '#762e01'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#60fdc1'
  primary-fixed-dim: '#3bdfa7'
  on-primary-fixed: '#002115'
  on-primary-fixed-variant: '#005139'
  secondary-fixed: '#5cffa0'
  secondary-fixed-dim: '#15e383'
  on-secondary-fixed: '#00210e'
  on-secondary-fixed-variant: '#00522b'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb693'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#793003'
  background: '#faf8ff'
  on-background: '#171b26'
  surface-variant: '#dfe2f1'
typography:
  kpi-display:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '800'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-normal:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  small-text:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
spacing:
  unit-min: 8px
  unit-mid: 16px
  unit-max: 24px
  gutter: 16px
  container-padding: 24px
---

## Overview

This design system is engineered for high-performance financial applications where precision, clarity, and data accessibility are critical. Every element—from color to typography to spacing—has been intentionally designed to support rapid decision-making in data-heavy environments.

## Color System

The palette balances visual hierarchy with professional sophistication, optimized for extended viewing periods in financial dashboards.

**Primary Color (#0BCA93):** A vibrant teal green reserved for primary actions, success states, and key performance indicators. This color signals confidence and positive outcomes.

**Secondary Color (#31EF8D):** A neon green accent used exclusively for highlighting growth trends, upward movements, and secondary call-to-action elements.

**Text & Hierarchy:** Pure black (#000000) is used for all body text to maximize contrast and readability. Interactive elements and button backgrounds use a deep charcoal (#1A1B1F) to establish clear visual weight and decision emphasis.

**Structural Elements:** Borders and container divisions rely on a neutral dark gray (#353945) to maintain visual definition without distraction. This replaces standard light-gray borders for a more defined, professional appearance.

**Surface Layers:** Light purple-tinted backgrounds (#faf8ff, #f2f3ff) provide subtle visual depth while maintaining legibility. These cool neutrals support extended focus without eye strain.

## Typography

**Font Family:** Inter exclusively. This sans-serif typeface ensures consistency, legibility, and a systematic appearance across all touchpoints.

**KPI Display (24px, 800 weight):** The hero style for all primary financial metrics. Use this style to ensure key numbers immediately capture user attention.

**Headline (18px, 600 weight):** For section titles, dashboard headers, and modal titles.

**Body Text (14px, 400 weight):** Standard text for descriptions, data tables, and content passages. Kept at 14px to support data density without compromising readability.

**Body Bold (14px, 600 weight):** Emphasis within body-text blocks without creating separate visual layers.

**Label Caps (12px, 700 weight):** Reserved for table headers, metadata, and field labels. All caps with 0.05em tracking reinforces hierarchy.

**Small Text (12px, 400 weight):** For secondary information, tooltips, and supporting details.

## Layout & Spacing System

All spacing is based on an **8px grid unit**, ensuring proportional, predictable layouts.

**Spacing Values:**
- Minimum unit: 8px (internal component padding, tight spacing)
- Mid unit: 16px (standard gutters, section spacing)
- Maximum unit: 24px (outer margins, major section separation)

**Grid Structure:** 12-column fluid grid for dashboard layouts, with 16px gutters. Content scales responsively while maintaining visual rhythm and proportion.

**Touch Targets:** All interactive elements must be at least 44x44px to meet accessibility standards and ensure comfortable mobile interaction.

## Elevation & Visual Depth

This system prioritizes clean, flat surfaces over heavy shadows and skeuomorphism.

**Primary Depth Method:** Tonal layering and structural borders (#353945) establish hierarchy without shadow effects.

**Subtle Elevation (when required):** Modals, dropdowns, and floating panels use a 4px blur shadow with minimal opacity (maximum 10%) to create gentle separation without visual heaviness.

**Container Definition:** Cards and panels rely on border strokes rather than drop shadows. This maintains the flat, systematic aesthetic while preserving visual structure.

## Shapes & Corners

**Angular Geometry:** The design system uses sharp, rectangular corners (0px radius) for all primary UI elements—inputs, cards, containers, and chips. This creates a crisp, data-forward aesthetic.

**Exception:** Primary action buttons (Save, Submit, Login) use a 50% border radius to distinguish them as critical user decisions.

This sharp language reflects the precision required in financial environments while maintaining visual sophistication.

## Component Guidelines

### Buttons

**Primary Buttons:** Deep charcoal background (#1A1B1F) with white text. Text is always uppercase for emphasis.

**Secondary Buttons:** White or transparent background with #1A1B1F text and #353945 border.

**Hover State:** Lighten the background by 10% or add a 2px bottom border in the primary color (#0BCA93).

**Focus State:** Apply a 2px outline in the primary color with 4px offset.

### Input Fields

**Border:** #353945, 1px stroke, 0px radius.

**Placeholder Text:** #BDBDBD (light gray) to distinguish from entered values.

**Focus State:** Border transitions to primary color (#0BCA93) with no shadow.

**Disabled State:** Reduce opacity to 50% and set background to surface-container (#eaedfd).

### KPI Cards

**Structure:** Cards featuring the 24px KPI Display typography as the primary metric value.

**Growth Indicators:** Secondary color (#31EF8D) for positive trends (e.g., "+12%"), with error red (#ba1a1a) for negative trends.

**Border:** #353945, 1px stroke for definition.

**Padding:** 16px to 24px depending on card size, following the spacing grid.

### Status Chips & Tags

**Shape:** Fully rounded (9999px radius) for visual distinction from sharp rectangular elements.

**Fill:** Low-opacity (20-30%) primary or secondary color with high-contrast text.

**Use:** Status indicators, labels, and metadata tags.

### Lists & Tables

**Row Separators:** 1px dividers using #353945 to distinguish rows without visual heaviness.

**Header Row:** Label Caps typography in dark gray text on a subtle background (surface-container-high #e5e7f7).

**Data Rows:** Body Normal typography with consistent 16px padding.

**Hover State:** Light tint background (surface-container #eaedfd) on interactive rows.

## Language & Localization

All interface text is in English to ensure global consistency and professional standardization across all financial environments.

## Core Design Principles

### Responsiveness

Fluid grids and media queries ensure the interface adapts seamlessly from **320px (mobile) to 1920px (desktop)**. All layouts scale proportionally without breaking visual hierarchy or usability.

### Minimalism

Embrace white space. Remove decorative elements and unnecessary visual complexity. Focus on functional clarity where every element serves a purpose. This approach accelerates user comprehension in data-intensive environments.

### Accessibility

- Minimum 4.5:1 contrast ratio for all body text (WCAG AA standard)
- All interactive elements sized at 44x44px minimum
- Color is never the sole indicator of meaning; support with icons or text labels
- Semantic HTML and ARIA labels for screen reader compatibility

### Consistency

Apply styles uniformly across all components. Deviations should be intentional and documented. Consistency builds user confidence and reduces cognitive load.

### Data Clarity

The design system exists to serve data. Visual elements should enhance, not compete with, the information they present. KPIs are always the primary focus, with supporting context secondary.