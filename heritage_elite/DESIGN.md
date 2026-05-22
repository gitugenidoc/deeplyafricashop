---
name: Heritage Elite
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#bfc9be'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#899389'
  outline-variant: '#3f4940'
  surface-tint: '#86d89d'
  primary: '#86d89d'
  on-primary: '#00391b'
  primary-container: '#006233'
  on-primary-container: '#89dba0'
  inverse-primary: '#146c3c'
  secondary: '#e9c349'
  on-secondary: '#3c2f00'
  secondary-container: '#af8d11'
  on-secondary-container: '#342800'
  tertiary: '#ffb3ae'
  on-tertiary: '#68000b'
  tertiary-container: '#a9121f'
  on-tertiary-container: '#ffb8b2'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#a1f5b7'
  primary-fixed-dim: '#86d89d'
  on-primary-fixed: '#00210d'
  on-primary-fixed-variant: '#00522a'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ae'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930015'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-display:
    fontFamily: Libre Caslon Text
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

This design system embodies the prestige and vibrancy of modern African football culture. It balances high-end editorial sophistication with the kinetic energy of the pitch. The aesthetic is rooted in "Premium Heritage"—a style that treats digital interfaces like luxury physical artifacts, such as gold-embossed passports or exclusive club memberships.

The visual language avoids generic tropes in favor of:
- **Sophisticated Minimalism:** Clean layouts with expansive "breathable" dark space.
- **Cultural Precision:** Geometric motifs derived from the provided logo used as subtle textures rather than loud patterns.
- **Tactile Luxury:** Subtle gradients and fine gold linework that suggest physical quality and exclusivity.
- **Kinetic Focus:** Bold, high-contrast typography that mirrors the intensity of the sport while maintaining a refined, authoritative tone.

## Colors

The palette is anchored in a deep, obsidian dark mode (`#0a0a0a`) to establish a premium foundation. 

- **Primary Green (#006233):** Used for growth, energy, and the pitch. Reserved for primary actions and active states.
- **Secondary Gold (#d4af37):** Representing excellence and heritage. Used for accents, borders, and high-tier status indicators.
- **Tertiary Red (#c1272d):** Used sparingly for urgent notifications, critical alerts, or intense highlights to ensure visual impact without overwhelming the premium aesthetic.
- **Neutrals:** A range of deep grays (starting at `#141414`) are used for surface layering to create depth without relying on pure blacks.

## Typography

The typography strategy employs a "High-Contrast Pairing" to bridge traditional prestige with modern utility.

- **Headlines:** `Libre Caslon Text` provides an authoritative, editorial feel. Use this for page titles, featured athletes, and storytelling sections.
- **Body & UI:** `Hanken Grotesk` offers a sharp, contemporary sans-serif contrast. It ensures maximum readability for data-heavy sections like league tables or player stats.
- **Labels:** Small caps with increased letter spacing are used for secondary metadata, categories, and breadcrumbs to reinforce the "passport" aesthetic.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop to maintain an editorial, magazine-like structure. 

- **Grid:** A 12-column grid is used for desktop (1280px max-width), transitioning to a 4-column grid for mobile.
- **Rhythm:** An 8px base unit governs all padding and margins. 
- **Margins:** Generous outer margins (`64px` on desktop) are essential to maintain the "premium" feel, preventing the content from feeling crowded.
- **Mobile Reflow:** For mobile, typography scales down and horizontal padding is reduced to `16px`, but vertical spacing remains generous to ensure a luxurious scrolling experience.

## Elevation & Depth

This design system avoids traditional heavy shadows, opting for **Tonal Layers** and **Low-Contrast Outlines** to define hierarchy.

- **Surfaces:** Depth is created by lightening the background color slightly as elements "rise" (e.g., the base is `#0a0a0a`, a card is `#141414`, and a modal is `#1c1c1c`).
- **Gold Accents:** Fine, 1px gold (`#d4af37`) borders are used on top-tier components like "Member Cards" or "Featured Matches" to denote premium status.
- **Backdrop Blurs:** For overlays and navigation bars, a heavy glassmorphism effect (blur: 20px) is used to maintain context of the vibrant green and red accents appearing in background imagery.

## Shapes

The shape language is **Soft** but structured. 

- **Corners:** A `0.25rem` (4px) base radius provides a modern, precise feel without being overly clinical or too friendly (rounded).
- **Interactive Elements:** Buttons and input fields use the same 4px radius. 
- **Icons:** Use geometric, sharp-edged icons that complement the linework of the logo's cultural motifs.

## Components

### Buttons
- **Primary:** Solid Green (`#006233`) with white text. High contrast, sharp 4px corners.
- **Secondary:** Transparent with a 1px Gold (`#d4af37`) border. Used for "exclusive" actions or secondary navigation.
- **Ghost:** No background or border; uses `label-caps` typography in Gold.

### Cards
Cards should not have shadows. Instead, use a solid background fill of `#141414`. For featured content, add a 1px top-border in Gold or Green.

### Input Fields
Dark backgrounds (`#050505`) with a 1px subtle gray border. On focus, the border transitions to Green (`#006233`) with a soft glow.

### Chips & Badges
Small, pill-shaped markers for "Live," "Exclusive," or "New." Use high-contrast backgrounds (Red for Live, Gold for Exclusive) with `label-caps` typography.

### Lists
Clean, border-bottom separated items. Use `Hanken Grotesk` for list data, ensuring generous vertical padding (16px+) to maintain the premium breathing room.