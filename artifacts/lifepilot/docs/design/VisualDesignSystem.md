# LifePilot — Visual Design System
**Derived from**: XP-002  
**Version**: 1.0 | **Date**: June 2026  
**Authority**: Binding — overrides generic SaaS UI conventions  
**Governs**: All modules, current and future

---

## Part 1 — LifePilot Design Principles

### The foundational shift

LifePilot is not a school application. It is not a productivity application. It is not an ERP or a dashboard.

> **LifePilot is a Life Navigation Adventure Platform.**

This distinction governs every design decision — from background colour to button label to animation duration. Every time a design choice appears, the correct question is: "Does this feel like school, or does this feel like adventure?"

### The 7 design principles

**Principle 1 — The Child is the Hero**  
Every screen positions the child as a capable, adventurous protagonist. The interface serves the child's journey — it does not manage, assess, or measure the child.

*Test*: Does the child feel like the main character of this screen, or like a user filling in a form?

**Principle 2 — Worlds over Pages**  
LifePilot should feel like exploring worlds — not navigating pages. Major screens must contain atmosphere, illustration, visual storytelling, journey elements, depth, and adventure.

*Test*: Does this feel like entering a place, or like opening a document?

**Principle 3 — Immersion over Information**  
Information matters, but immersion comes first. Content is presented within an experience — not presented as a list of items to complete.

*Test*: Would a child stop and look at this screen, or skim and close it?

**Principle 4 — Curiosity over Completion**  
The product goal is not task completion — it is curiosity, exploration, and growth. Every screen should invite discovery, not demand action.

*Test*: Does this screen create curiosity about what comes next?

**Principle 5 — Warmth over Efficiency**  
Child-facing design prioritises emotional warmth over information density or workflow efficiency. White space is not waste — it is breathing room.

*Test*: Does this feel warm and safe, or clinical and efficient?

**Principle 6 — Future over Present**  
Every screen connects the child's present action to their future self. Visual design reinforces the temporal journey — this moment is part of a longer adventure.

*Test*: Does this screen help the child feel connected to their future?

**Principle 7 — Adventure over Assessment**  
There is no "pass" or "fail" state. There is no "correct" progress. Every interaction is an adventure — not an evaluation.

*Test*: Does this feel like play and discovery, or like a test?

---

## Part 2 — Colour System

### Brand palette

| Role | Name | Hex | Purpose |
|------|------|-----|---------|
| Primary | Sky Blue | `#3B9EE8` | Exploration, freedom, trust, optimism |
| Secondary | Sunrise Orange | `#FF6B35` | Adventure, action, energy |
| Accent | Adventure Yellow | `#FFD23F` | Discovery, highlights, rewards |
| Success | Forest Green | `#22A06B` | Growth, learning, progress |
| Warning | Soft Amber | `#F59E0B` | Gentle caution |
| Error | Gentle Coral | `#F87171` | Gentle — never harsh red |

### Text colours (never pure black)

| Role | Hex | Use |
|------|-----|-----|
| Hero titles | `#17324D` | Hero displays, major headings |
| Headings | `#244A68` | Section, card titles |
| Body text | `#36516B` | All body copy |
| Secondary text | `#5F7D95` | Captions, metadata, helper text |

### Module identity palette

Each module has a distinct identity colour used for: card headers, icons, progress indicators, tab active state, and celebration particles.

| Module | Name | Hex |
|--------|------|-----|
| Cockpit | Sky Blue | `#3B9EE8` |
| My Pilot Profile | Forest Green | `#22A06B` |
| Flight Plan | Compass Gold | `#F59E0B` |
| Flight Log | Twilight Purple | `#8B5CF6` |
| Future Me | Sunrise Pink | `#EC4899` |
| Career Explorer | Space Teal | `#0EA5E9` |
| Money Quest | Treasure Gold | `#EAB308` |
| Life Choices | Wisdom Indigo | `#6366F1` |

### Colour rules

| ❌ Prohibited | ✅ Required |
|-------------|------------|
| Neon colours | Friendly, safe palette |
| Aggressive red (`#FF0000`) | Gentle Coral (`#F87171`) |
| Pure black (`#000000`) | Deep Sky Navy (`#17324D`) |
| Corporate grey palettes | Warm, adventure-tinted neutrals |
| Excessive dark surfaces | Soft Sky backgrounds |

### Dark mode

Background: `#0F172A` (Night Sky — not plain black)  
Atmosphere elements: Stars · Constellations · Moonlight · Soft gradients · Night horizon  
Rule: Must still feel adventurous. Dark mode is "night flight" — not "enterprise dark theme."

---

## Part 3 — Typography System

### Font choice

**Friendly sans-serif** — readable, modern, child-appropriate. No decorative, serif, or monospace fonts for UI text.

Indian language support is mandatory: the font stack must include system fallbacks for Devanagari, Tamil, Telugu, Kannada, Malayalam, Marathi, Bengali, Gujarati, and Punjabi scripts.

### Type scale

| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `hero` | 48px+ | 800 | XP displays, celebration numbers |
| `page-title` | 32px | 700 | Route-level page headings |
| `section-title` | 24px | 600 | Module section headers |
| `card-title` | 20px | 600 | Card headers |
| `body` | 16px | 400 | All body copy — absolute minimum |
| `caption` | 14px | 400 | Metadata, timestamps (use sparingly) |
| `small` | 12px | 400 | System labels only — not for content |

### Typography rules

| Rule | Standard |
|------|---------|
| Minimum body size | 16px — never below for children |
| Line height | 1.6 minimum for body |
| Max line length | 65 characters per line |
| Case | Sentence case only — never ALL CAPS |
| Pure black text | Prohibited — use `#17324D` or below |
| Text scale | No overflow at 200% browser text scale |

---

## Part 4 — Visual Theme System

### Primary theme — Sky Adventure

> The child is the Pilot. Life is the Journey. The future is the Horizon.

The Sky Adventure theme governs the core metaphor of every module:

| Real concept | Sky Adventure name |
|-------------|-------------------|
| Home screen | Cockpit |
| Goals | Flight Plan |
| Journal | Flight Log |
| Profile | Pilot Profile |
| Future letters | Future Me |
| Career exploration | Career Worlds |
| Financial literacy | Money Quest |
| Values & choices | Life Choices |
| Progress | Flight Path |
| Achievements | Explorer Badges |
| Streak | Flight Streak |

### Secondary theme — Journey Map

Applied to navigation, progress visualization, and exploration paths.

Elements: Trails · Destinations · Landmarks · Exploration paths · Discovery markers  
Feel: A map the child is filling in as they explore — not a checklist they are completing.

### Special theme — Future Horizon

Reserved exclusively for: Future Me · Future planning · Long-term vision · Dream building

Elements: Sunrise · Warm glow · Distance · Floating messages · Journey trail · Wonder  
Feel: Looking toward a bright, open, possibility-filled horizon.

---

## Part 5 — Background System

### Light mode backgrounds

| Theme | Gradient | Application |
|-------|---------|------------|
| **Sky Adventure** | `#DFF3FF → #F7FBFF → #FFF8F0` | Default app background — all screens |
| **Journey Map** | Soft parchment with subtle path overlays | Progress and map screens |
| **Future Horizon** | Warm sunrise: `#FFF7ED → #FFF0DC` | Future Me module |

Plain white (`#FFFFFF`) backgrounds are **prohibited on all screens**.

### Dark mode backgrounds

| Element | Value |
|---------|-------|
| Base background | `#0F172A` |
| Raised surface | `#1E293B` |
| Card surface | `#1E293B` |
| Overlay | `#334155` |
| Night elements | Stars, constellation dots, soft gradient overlays |

### Module-specific atmospheric overlays

Each module may apply a soft, low-opacity atmospheric overlay on the Sky Adventure background:

- **Cockpit**: Subtle cloud shapes, soft horizon glow
- **Career Explorer**: Star field, distant world silhouettes
- **Future Me**: Sunrise wash, floating particle dots
- **Flight Log**: Twilight soft gradient, calm texture
- **Money Quest**: Subtle treasure map texture overlay

---

## Part 6 — Illustration System

### Illustration is mandatory

Major screens must contain at least one of: Clouds · Stars · Maps · Paths · Trails · Mountains · Airplanes · Hot Air Balloons · Compasses · Horizons · Characters · Discovery Elements

### Required illustration per screen type

| Screen type | Illustration requirement |
|------------|------------------------|
| Module home | Full hero illustration (atmospheric, world-setting) |
| Mission card | Character or discovery element |
| Cockpit | Multiple ambient elements (horizon, flight indicators) |
| Future Me | Full atmospheric illustration (sunrise, floating letters) |
| Career World | World-specific immersive illustration |
| Empty state | Inviting character or adventure element — never a sad icon |
| Error state | Friendly character — curious, not distressed |
| Success/celebration | Character celebrating, confetti, stars |

### Illustration style guide

**Inspired by**: Pixar · Disney Adventure Books · Khan Kids (warm, rounded, diverse, expressive)

| Attribute | Standard |
|-----------|---------|
| Style | Warm, rounded, Pixar-adjacent — not flat vector icons |
| Characters | Diverse — gender, region, appearance, background |
| Indian context | Indian settings, clothing, landscapes where appropriate |
| Expressions | Curious, optimistic, confident — never sad as a default state |
| Colour | Consistent with brand palette — no off-brand illustration colours |

### Forbidden illustrations

Corporate workers · Office scenes · Stock business people · Enterprise graphics · Corporate icon packs used as illustration substitutes

---

## Part 7 — Component Catalog

### Core card types

| Component | Description | Visual standard |
|-----------|-------------|----------------|
| **Cockpit Card** | Module navigation tile | Illustrated icon, identity colour gradient, module name |
| **Journey Card** | Progress and milestone display | Path/trail element, progress indicator, adventure framing |
| **Mission Card** | Daily/weekly mission | Character or discovery illustration, XP badge, action button |
| **Future Me Card** | Letter preview | Floating message aesthetic, sunrise tint, glow effect |
| **Career World Card** | Career exploration entry | World name, atmospheric illustration, "Explore" CTA |
| **Money Quest Card** | Financial scenario entry | Decision card visual, treasure/choice element |
| **Reflection Card** | Flight Log entry | Calm, conversational, single prompt, mood element |
| **Milestone Card** | Achievement display | Badge, celebration element, growth framing |
| **Explorer Badge Card** | Badge unlock/display | 3D card flip animation, character quality name |
| **Adventure Path Card** | Long-term goal progress | Trail/path element, milestone markers |

### Card design standards

| Property | Value |
|----------|-------|
| Min height | 120px |
| Padding | 20–24px |
| Border radius | 16–24px (never sharp) |
| Shadow | Soft elevation: `0 4px 12px 0 rgb(0 0 0 / 0.08)` |
| Card gap | 16–20px |
| Background | Module tint or white — never plain grey |

### Button standards

| Type | Height | Radius | Standard |
|------|--------|--------|---------|
| Primary | 56px | 14px | Module identity colour, bold label |
| Secondary | 48px | 12px | Outlined, same radius |
| Tertiary/ghost | 44px | 10px | No border, text only |
| Icon button | 44×44px | Full | Icon + accessible label |

**Button copy rules**:

| ✅ Use | ❌ Avoid |
|-------|---------|
| Explore | Submit |
| Discover | Execute |
| Continue | Process |
| Start Mission | Run |
| Open Message | Confirm Operation |
| Reflect | OK |
| Choose Path | Save Record |

### Bottom navigation (mobile)

| Property | Value |
|----------|-------|
| Height | 64px |
| Active state | Icon scales 1.1×, module identity colour |
| Inactive state | Muted grey — `#94A3B8` |
| Label | Always visible, 12px |
| Safe area padding | 88px on main scroll content |
| Icons | 24px, consistent weight |

### Module card grid (Cockpit)

- 2×4 grid on mobile (8 modules)
- Full-colour gradient card per module
- Illustrated icon + module name
- Tap → scale 0.97 → 1 (spring) + navigate

---

## Part 8 — Animation Rules

### Animation philosophy

> **Animations should feel: Natural · Gentle · Playful · Calm · Encouraging**

Animation serves adventure, feedback, and celebration — never retention manipulation.

### Animation hierarchy

| Level | Duration | Use | Examples |
|-------|---------|-----|---------|
| **Ambient** | 8–20s loop | Background atmosphere | Cloud drift, horizon glow, star twinkle |
| **Transition** | 200–400ms | Page changes, modal | Slide up, fade in, scale in |
| **Feedback** | 100–300ms | User input response | Button tap, card press, toggle |
| **Celebration** | 400–1500ms | Achievement moments | XP gain, badge unlock, goal complete |
| **Narrative** | 600–2000ms | Story moments | Letter floating, world opening, horizon reveal |

### Standard animation presets (Framer Motion)

```typescript
fadeIn:  { initial: { opacity: 0 }, animate: { opacity: 1 }, duration: 300 }
slideUp: { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, duration: 300 }
slideIn: { initial: { opacity: 0, x: -16 }, animate: { opacity: 1, x: 0 }, duration: 300 }
scaleIn: { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, duration: 300 }
popIn:   { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 },
           transition: { type: "spring", stiffness: 400, damping: 20 } }
```

### Allowed animations

Card Float · Cloud Drift · Journey Path Reveal · Mission Complete Reveal · Badge Celebration · Future Message Glow · Progress Path Animation · Journey Expansion · XP Counter Increment · Particle Burst (module colour, 3 particles max)

### Forbidden animations

| Animation | Reason |
|-----------|--------|
| Flashing / strobing | Accessibility — seizure risk |
| Casino effects (spin, slot) | Ethical — addictive mechanics |
| Aggressive movement | Child experience — creates anxiety |
| Reward explosions (massive particle storms) | Ethical gamification |
| Attention traps (looping, persistent) | Screen time — prevents natural stopping |
| Manipulative retention effects | Ethical — XP-004 Rule 5 |

### `prefers-reduced-motion` rule

**Mandatory**: All animations must degrade to instant state change under `prefers-reduced-motion: reduce`. No exceptions.

```typescript
const shouldAnimate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

---

## Part 9 — Micro Interaction Guide

### Standard micro interactions

| Trigger | Animation | Duration | Easing |
|---------|-----------|---------|--------|
| Tap card | Scale 0.97→1 (spring) | 120ms | Spring |
| Complete habit | Green ripple + 3 particle burst | 300ms | ease-out |
| Earn XP | Counter increments digit by digit | 400ms | ease-out |
| Complete goal | Confetti burst (3 particles, module colour) | 600ms | ease-out |
| Send Future Me letter | Letter floats up and fades toward horizon | 800ms | ease-in-out |
| Badge unlock | Card flip 3D (blank → coloured, character revealed) | 500ms | ease-in-out |
| Mood selected | Emoji scales 1.3×, background tints to mood colour | 200ms | Spring |
| Nav tab switch | Active icon scales 1.1×, inactive dims, label slides | 150ms | ease-out |
| Button press | Slight scale down (0.97) on press | 80ms | ease-in |
| Mission unlock | Border glow pulses × 2, then fades | 600ms | ease-in-out |

### Micro interaction rules

1. **Immediate**: Every tap gets a visual response within 80ms — even if the action takes longer
2. **Proportional**: Bigger achievement = longer/richer animation (but still bounded)
3. **Purposeful**: Every animation communicates something — progress, success, connection
4. **Controllable**: All micro interactions respect `prefers-reduced-motion`
5. **Non-blocking**: Micro interactions never block the next user action

---

## Part 10 — Layout Rules

### Mobile-first grid

| Breakpoint | Columns | Card layout | Navigation |
|-----------|---------|------------|-----------|
| Mobile (`< 768px`) | 1 | Full-width cards, vertical stack | Bottom nav (64px) |
| Tablet (`768px+`) | 2 | 2-column card grid | Bottom nav or side nav |
| Desktop (`1024px+`) | 3 | 3-column grid | 240px fixed left sidebar |

### Layout constants

| Token | Value |
|-------|-------|
| Max content width | 720px (centred on wide screens) |
| Page horizontal padding | 20px (mobile), 32px (tablet), 40px (desktop) |
| Bottom nav clearance | 88px padding on main scroll content |
| Card gap | 16px (mobile), 20px (tablet+) |
| Section gap | 32px |

### Spacing system

| Token | px value | Use |
|-------|---------|-----|
| `xs` | 4px | Icon gaps, tight internal spacing |
| `s` | 8px | Internal component padding |
| `m` | 16px | Card padding, section gaps |
| `l` | 24px | Card padding (large), section headers |
| `xl` | 32px | Page padding, major section gaps |
| `xxl` | 48px | Screen-level spacing |

### Layout principles

- **Single column preferred** — never force a child to scan horizontally
- **Large cards** — minimum 120px tall, generous padding
- **Large touch areas** — 44px minimum, 56px for primary actions
- **Minimal clutter** — never more than 3 primary elements visible at once
- **Short interaction flows** — no action requires more than 3 taps

### Cockpit visual layout

The Cockpit must contain (in order, scrollable):

1. **Greeting header** — "Welcome back, Captain [Name]! ✈️" + XP bar
2. **Featured module card** — today's highlighted module, full-width, illustrated
3. **Today's mission** — if active, prominent card
4. **Message from Future You** — if available, teaser card (mysterious, magical feel)
5. **Module grid** — 2×4 tile navigation
6. **Upcoming milestones** — next achievements in journey

**Never**: KPI tables · Progress percentages · Numeric performance indicators · Task completion lists

---

## Part 11 — Accessibility Standards

### Baseline requirements

| Standard | Requirement |
|----------|------------|
| Colour contrast | WCAG 2.1 AA minimum — 4.5:1 for text, 3:1 for large text |
| Touch targets | 44px minimum, 56px for primary actions |
| Focus rings | Visible, high-contrast (3px, brand blue) on keyboard navigation |
| Motion | `prefers-reduced-motion` respected by all animations |
| Text scale | No overflow or truncation at 200% browser text scale |
| Colour alone | Never the sole indicator of state — always icon or text accompaniment |
| Screen readers | All dynamic content has `aria-live` regions |
| Alt text | All illustrations and decorative images have meaningful alt text |
| Language | `lang` attribute set per locale (Indian language support) |

### Child-specific accessibility

| Requirement | Rationale |
|-------------|-----------|
| 16px body minimum | Children aged 8–11 have lower reading fluency |
| 1.6 line height minimum | Improved readability for developing readers |
| 65ch max line length | Prevents eye-tracking difficulty in younger children |
| No ALL CAPS text | Harder to read for children (all-caps reduces word shape recognition) |
| Sentence case everywhere | More natural reading pattern for children |

### Future accessibility goals

- Dyslexia-friendly font option (e.g. OpenDyslexic toggle)
- High contrast mode (beyond WCAG AA — AAA for key screens)
- Audio prompts for young children (8–10) on key interactions
- RTL layout support (for Urdu future expansion)

---

## Part 12 — Module Visual Standards

### Cockpit

> Must feel alive — not like a dashboard.

- Warm sky gradient background
- Animated ambient elements (cloud drift, horizon glow)
- Greeting card with Pilot name — prominent
- Module tiles: full-colour identity gradients, illustrated icons
- XP bar: always visible in header, animated on change
- Never: tables, lists of tasks, numeric KPIs, progress percentages

### Future Me

> Most magical experience in the product.

- Future Horizon theme (sunrise, warm glow)
- Floating letter visual effects
- Warm tinted background (`#FFF7ED`)
- Letter composing: minimal UI, full-screen writing surface
- Letter viewing: envelope-to-content animation
- No metrics, no scores, no assessments
- Tone: wonder · hope · connection · time travel

### Career Explorer

> Careers are Worlds — each one is discoverable and immersive.

- Career Worlds displayed as tiles with world-specific illustrations
- World names: "Technology World", "Health World", "Law World", "Space World"
- Entry animation: world opens as the child zooms in
- Content: daily life, real practitioners (diverse, Indian context), roadmaps as "paths"
- Copy: possibility language only — "you could explore", "one path could be"

### Money Quest

> Financial decisions as adventure choices — never as financial education content.

- Decision cards: choice A vs choice B, visual contrast
- Consequence reveal: narrative and visual, never textbook
- Adventure path: treasure trail progressing through Money Quest chapters
- Never: spreadsheets, tables, financial assessment scores, fear-based content

### Flight Log

> Calm, reflective, private.

- Calm atmospheric background (twilight, gentle)
- Single prompt per session — conversation-card style
- Minimal chrome: large text area, no formatting toolbar
- Mood check-in first: 5 emoji options (not numbers)
- "Not today" always prominently available
- No word counts, no minimum requirements, no progress indicators on content

### Badge System

Badges celebrate character qualities — not performance rankings.

| Badge category | Examples |
|---------------|---------|
| Curiosity | "First World Explored", "Curious Mind", "5 Worlds Visited" |
| Exploration | "Adventure Starter", "Path Finder", "World Traveller" |
| Kindness | "Empathy Explorer", "Heart of Gold" |
| Leadership | "Vision Setter", "Goal Keeper" |
| Responsibility | "Mission Completer", "Promise Keeper" |
| Reflection | "Journal Starter", "Deep Thinker", "30 Days of Reflection" |
| Resilience | "Back in Flight", "New Chapter", "Bounce Back" |
| Consistency | "7-Day Flyer", "30-Day Journey", "Season Pilot" |

**Prohibited badge categories**: Rankings · Scores · Comparisons · Performance labels · "Best" or "Top" designations

---

## Part 13 — Design Review Checklist & Future Expansion Strategy

### 12-Gate Design Review

Before any screen or component ships, verify all 12 gates:

| Gate | Question | On fail |
|------|----------|---------|
| 1 | Does the child feel like the hero of this screen? | Redesign |
| 2 | Is this visual-first (illustration or journey element present)? | Redesign |
| 3 | Is this mobile-first (tested at 375px)? | Redesign |
| 4 | Does this feel like adventure (not school or enterprise)? | Redesign |
| 5 | Does this feel hopeful in tone? | Redesign |
| 6 | Is there a future-oriented element or connection? | Redesign |
| 7 | No ERP appearance (no tables, no dense forms, no corporate grey)? | Redesign |
| 8 | No corporate appearance (no stock imagery, no enterprise UI patterns)? | Redesign |
| 9 | Accessible (WCAG AA, 44px touch targets, `prefers-reduced-motion`)? | Fix |
| 10 | Parent-safe (would a parent feel proud their child uses this)? | Redesign |
| 11 | School-acceptable (looks like a life skills tool, not a game)? | Adjust |
| 12 | Does this create curiosity — wanting to explore more? | Redesign |

All 12 must pass. If any fail → redesign before Wave approval.

### Parent visual test

A parent should think: **Safe · Positive · Healthy · Constructive · Trustworthy**

### Child visual test

A child should think: **"This is my adventure. I want to explore. This feels fun. This feels different."**

### School visual test

A school should think: **Professional · Educational · Life Skills Focused · Future Ready**

---

### Future Design Expansion Strategy

**Wave 2 — Illustration depth**
- Commission a complete custom illustration set (Indian characters, all 8 modules, 40+ scenes)
- Consistent character cast: 4–5 recurring characters across all modules
- Scene: Career Worlds, milestone celebrations, error states, empty states, onboarding

**Wave 3 — Animation upgrade**
- Lottie integration for complex celebration animations
- Ambient loop animations per module (cloud drift for Cockpit, stars for Career Explorer)
- Career World entry animations (zoom-in immersive transition)

**Wave 4 — Personalisation**
- Pilot avatar creator (character customisation — Indian-context clothing, appearance)
- Custom cockpit background selection (Sky Adventure variants)
- Dark mode full implementation (Night Sky — stars, constellations, moonlight)

**Wave 5 — Adaptive design**
- Age-tier UI adaptation (Junior Pilot 8–11 vs Navigator 15–18: typography scale, card complexity)
- Dyslexia-friendly font toggle
- High contrast mode (WCAG AAA)
- Reduced animation mode (beyond `prefers-reduced-motion` — manual toggle)

**Wave 6 — Platform extensions**
- Tablet-optimised layouts (landscape 2-column, split-pane navigation)
- Desktop experience (full sidebar, larger illustration zones, keyboard navigation)
- PWA install promotion UI (custom install banner, home screen icon)

**Guiding principle for all future design work**:  
> The visual system exists to help children feel like the capable, curious, hopeful protagonists of their own life adventure. Every expansion must serve this — not add complexity for complexity's sake.
