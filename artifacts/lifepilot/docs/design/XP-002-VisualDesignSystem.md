# XP-002 — LifePilot Visual Design System

**Version**: 1.0  
**Status**: Active — Binding on all modules, current and future  
**Authority**: Overrides generic SaaS UI conventions  
**Governs**: Colours · Typography · Illustrations · Layouts · Components · Animations · Micro Interactions · Accessibility · Child-Friendly Design · Visual Storytelling

---

## Design Philosophy

LifePilot is a **Life Navigation Adventure Platform** — not a school app, productivity tool, ERP, or dashboard.

Children should feel: **Curiosity · Wonder · Discovery · Possibility · Adventure · Growth · Optimism · Hope**

---

## Visual Immersion Principle

> **LifePilot should not feel like pages. It should feel like worlds.**

Every major screen must contain: Atmosphere · Illustration · Visual Storytelling · Journey Elements · Depth · Adventure

**Avoid**: Flat white screens · Generic dashboards · Enterprise UI patterns · Corporate layouts · Spreadsheet aesthetics

---

## Experience Themes

| Theme | Purpose | Elements |
|-------|---------|---------|
| **Sky Adventure** (primary) | Core adventure feel | The child is the Pilot; life is the journey; the future is the horizon |
| **Journey Map** (secondary) | Navigation + progress | Trails, destinations, landmarks, exploration paths |
| **Future Horizon** (special) | Future Me only | Sunrise, warm glow, distance, possibility, future destination |

---

## Emotional Design Goals

Every screen must create at least one: **Curiosity · Wonder · Confidence · Exploration · Achievement · Belonging · Optimism · Calm · Future Thinking**

---

## Visual References

**Inspired by**: Duolingo · Headspace · Khan Kids · Disney Adventure Books · Pixar Storytelling · Adventure Journals · Exploration Maps · Modern Mobile Games

**Never inspired by**: SAP · Oracle · Salesforce · Jira · Confluence · School ERP · Banking Apps · Project Management Tools

---

## Background System

| Theme | Gradient | Feel |
|-------|---------|------|
| **Sky Adventure** | Top `#DFF3FF` → Mid `#F7FBFF` → Bottom `#FFF8F0` | Looking out of an aircraft window |
| **Journey Map** | Subtle paths, exploration trails, discovery markers | Map and terrain feel |
| **Future Horizon** | Sunrise, warm glow, distance | Possibility and destination |

**Dark Mode**: Night Sky Theme — `#0F172A` background. Use stars, constellations, moonlight, soft gradients. Must still feel adventurous. Never plain black.

---

## Colour System

| Role | Name | Hex | Purpose |
|------|------|-----|---------|
| Primary | Sky Blue | `#3B9EE8` | Exploration, freedom, trust, optimism |
| Secondary | Sunrise Orange | `#FF6B35` | Adventure, action, energy |
| Accent | Adventure Yellow | `#FFD23F` | Discovery, highlights, rewards |
| Success | Forest Green | `#22A06B` | Growth, learning, progress |
| Warning | Soft Amber | `#F59E0B` | Gentle caution |
| Error | Gentle Coral | `#F87171` | Never harsh red |
| Background | Warm White / Soft Sky / Cloud White | `#FAFAF8` | Safe, clean |

**Colour rules**: No neon, no aggressive red, no enterprise palettes, no excessive black. Colours must feel friendly, safe, optimistic, inviting.

---

## Module Identity Colours

| Module | Colour | Hex |
|--------|--------|-----|
| Cockpit | Sky Blue | `#3B9EE8` |
| Flight Plan | Compass Gold | `#F59E0B` |
| Flight Log | Twilight Purple | `#8B5CF6` |
| Future Me | Sunrise Pink | `#EC4899` |
| Career Explorer | Space Teal | `#0EA5E9` |
| Money Quest | Treasure Gold | `#EAB308` |
| Life Choices | Wisdom Indigo | `#6366F1` |
| Pilot Profile | Forest Green | `#22A06B` |

---

## Typography

**Font**: Friendly sans-serif — readable, modern, child-friendly

### Text colours (no pure black)

| Element | Colour | Hex |
|---------|--------|-----|
| Hero titles | Deep Sky Navy | `#17324D` |
| Headings | — | `#244A68` |
| Body text | — | `#36516B` |
| Secondary text | — | `#5F7D95` |

### Type scale

| Token | Size | Use |
|-------|------|-----|
| Hero | 48px+ | XP displays, hero numbers |
| Page Title | 32px | Route-level headings |
| Section Title | 24px | Module section headers |
| Card Title | 20px | Card headers |
| Body | 16px | All body copy — minimum |
| Caption | 14px | Metadata, timestamps |
| Small | 12px | System labels only |

**Rules**: No text below 16px for child users. Line height ≥ 1.6. Max 65ch per text block. Sentence case — never ALL CAPS.

---

## Illustration System

**Style**: Pixar-adjacent — warm, rounded, expressive, diverse, Indian-context characters

Every major screen must have: Illustration OR Journey element OR Character element OR Visual storytelling element

**Never**: Icon-only interfaces, stock photos, corporate iconography as illustration substitutes

---

## Component System

### Cards
- Min height: 120px
- Padding: 20–24px
- Border radius: 16–24px (friendly, not corporate)
- Shadow: soft elevation (4px blur, 8% opacity)
- Gap between cards: 16–20px

### Buttons
- Primary: 56px height, module identity colour, rounded (12–16px radius)
- Secondary: outlined, same radius
- Touch target minimum: 44px (56px for primary)

### Bottom Navigation (mobile)
- Height: 64px
- Active: icon scales 1.1x + module colour
- Inactive: muted colour
- Label: always visible (12px)
- Safe area padding: 88px on main content

### Module Cards (Cockpit grid)
- 2×4 grid on mobile
- Illustrated icon + module name + colour background
- Full colour gradient on active/featured state

---

## Layout System

| Breakpoint | Layout |
|-----------|--------|
| Mobile (< 768px) | 1-column, full-width cards, bottom nav |
| Tablet (768px+) | 2-column card grid, side nav optional |
| Desktop (1024px+) | 3-column grid, 240px fixed left sidebar |

Content max-width: 720px (never stretch to fill ultra-wide)  
Bottom nav safe area: 88px padding on main content  
Top area: Pilot greeting + XP bar — always visible

---

## Animation System

### Animation levels

| Level | Duration | Use |
|-------|---------|-----|
| Ambient | 8–20s loop | Background atmosphere (clouds, horizon drift) |
| Transition | 200–400ms | Page changes, modal open/close |
| Feedback | 100–300ms | Button tap, card press |
| Celebration | 400–1500ms | XP gain, badge unlock, goal complete |
| Narrative | 600–2000ms | Letter floating, career world opening |

All animation respects `prefers-reduced-motion` — degrades to instant state change.

### Standard presets

```
fadeIn:   opacity 0→1, 300ms ease-out
slideUp:  y 16→0 + opacity 0→1, 300ms ease-out
slideIn:  x -16→0 + opacity 0→1, 300ms ease-out
scaleIn:  scale 0.95→1 + opacity 0→1, 300ms ease-out
popIn:    scale 0.8→1 + opacity 0→1, spring (stiffness 400, damping 20)
```

---

## Micro Interactions

| Trigger | Animation | Duration |
|---------|-----------|---------|
| Tap card | Scale 0.97 → 1 (spring) | 120ms |
| Complete habit | Green ripple + particle burst | 300ms |
| Earn XP | Counter increments digit-by-digit | 400ms |
| Complete goal | Confetti burst (3 particles, module colour) | 600ms |
| Send Future Me letter | Letter floats up and fades | 800ms |
| Badge unlock | Card flip (3D, blank → coloured) | 500ms |
| Mood selected | Emoji scales + colour tints background | 200ms |
| Nav tab switch | Active icon scales 1.1x, label slides | 150ms |

---

## Accessibility

| Standard | Requirement |
|----------|------------|
| Contrast | WCAG 2.1 AA minimum (4.5:1 for text) |
| Touch targets | 44px minimum, 56px for primary actions |
| Focus rings | Visible on keyboard navigation |
| Motion | Respects `prefers-reduced-motion` |
| Text scale | No overflow at 200% text scale |
| Colour | Never sole indicator of state |
| ARIA | `aria-live` on all dynamic content |

---

## Screen Acceptance Gate

Before any screen ships:
1. ☐ Child is the hero — visual-first, adventure feel
2. ☐ Illustration or journey element present
3. ☐ Colours from module palette (no hardcoded hex)
4. ☐ Typography from token scale (no raw px values)
5. ☐ Cards use standard radius and shadow
6. ☐ Motion follows animation hierarchy
7. ☐ Loading: skeleton not spinner
8. ☐ Mobile-first verified
9. ☐ Touch targets ≥ 44px
10. ☐ WCAG 4.5:1 contrast verified
