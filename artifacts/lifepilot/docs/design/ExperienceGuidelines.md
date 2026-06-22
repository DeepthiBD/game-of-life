# LifePilot — Experience Guidelines
**Derived from**: XP-001 Experience & Visual Design Constitution  
**Version**: 1.0 | **Date**: June 2026  
**Authority**: Binding on all Wave 1+ UI implementation

---

## Part 1 — LifePilot Experience Guidelines

### The One Sentence

> **LifePilot is the adventure a child lives every day — the app is their aircraft, the future is their horizon, and every reflection, goal, and discovery is a leg of the journey.**

### Experience Pillars

| Pillar | What it means in the product |
|--------|------------------------------|
| **Adventure** | Every session has a destination. Open with "What's next on your journey?" not "View your dashboard." |
| **Discovery** | Reveal information progressively. Career worlds, not career databases. Unfold content like a map. |
| **Growth** | Every small action is acknowledged. XP for reflections, not just completions. Growth moments, not scores. |
| **Hope** | The future is always visible. Future Me connects today's effort to tomorrow's self. Language is always optimistic. |
| **Exploration** | Paths are open, not corridors. Children choose where to go next, not follow a fixed lesson sequence. |
| **Possibility** | Nothing is closed off. Features are "coming soon on your journey" not "locked". |

### The Child-First Filter

Before any design decision, answer these three questions:

1. **Would a 12-year-old understand this instantly?** If no → simplify.
2. **Would a 10-year-old willingly open this after school?** If no → redesign.
3. **Would a 16-year-old feel proud, not embarrassed, to use this in public?** If no → elevate.

### Tone of Voice

| Situation | LifePilot says | Never says |
|-----------|---------------|-----------|
| Welcome | "Welcome back, Captain Priya! Ready for today's mission?" | "Hello User #4281" |
| Achievement | "You've unlocked a new Growth Moment! ✨" | "Task completed." |
| Encouragement | "Every step forward counts. Keep flying!" | "You are 23% complete." |
| Error | "Oops! Something got turbulent. Let's try again." | "Error 500: Internal server error." |
| Empty state | "Your Flight Log is ready for its first entry. What's on your mind?" | "No records found." |
| Future Me | "A message from your future self is waiting..." | "Future Letter #7 - Unread" |
| Prompt | "What made you smile today?" | "Enter journal entry:" |
| Streak | "You've been flying for 7 days! ✈️" | "Streak: 7 days (Don't break it!)" |

### What Success Feels Like

A session on LifePilot should leave the child feeling:
- Slightly more confident about their future
- That they learned something without being taught at
- That their thoughts and feelings matter
- Excited to come back tomorrow

---

## Part 2 — Visual Design System

### 2.1 Colour System

#### Brand Palette

| Token | Name | Hex (Light) | Feel |
|-------|------|-------------|------|
| `--color-brand-primary` | Sky Blue | `#3B9EE8` | Open skies, calm confidence, possibility |
| `--color-brand-secondary` | Sunrise Orange | `#FF6B35` | Energy, warmth, new beginnings |
| `--color-brand-accent` | Adventure Yellow | `#FFD23F` | Joy, discovery, excitement |
| `--color-success` | Forest Green | `#22A06B` | Growth, achievement, nature |
| `--color-surface-base` | Warm White | `#FAFAF8` | Safe, clean, inviting |
| `--color-surface-raised` | Soft Cloud | `#FFFFFF` | Cards, elevated surfaces |
| `--color-surface-sunken` | Mist | `#F0F4F8` | Backgrounds, input fields |

#### Module Identity Colours

| Module | Colour Name | Hex | Visual metaphor |
|--------|------------|-----|----------------|
| Cockpit | Sky Blue | `#3B9EE8` | Open sky, control |
| Flight Plan | Compass Gold | `#F59E0B` | Direction, goals |
| Flight Log | Twilight Purple | `#8B5CF6` | Reflection, depth |
| Future Me | Sunrise Pink | `#EC4899` | Dawn, hope, magic |
| Career Explorer | Space Teal | `#0EA5E9` | Wide horizons, exploration |
| Money Quest | Treasure Gold | `#EAB308` | Value, reward |
| Life Choices | Wisdom Indigo | `#6366F1` | Values, decisions |
| My Profile (Pilot) | Forest Green | `#22A06B` | Growth, identity |

#### Gradient Palette (use sparingly — hero moments only)

| Name | Values | Use case |
|------|--------|---------|
| Sky Horizon | Sky Blue → Sunrise Orange | Hero banners, major achievements |
| Dawn | Sunrise Pink → Adventure Yellow | Future Me, hopeful moments |
| Deep Space | Space Teal → Twilight Purple | Career Explorer hero |
| Forest | Forest Green → Compass Gold | Habit completions, streaks |

#### Colour Rules
- Light mode is the **default and primary** experience
- Dark mode is an optional accessibility preference, not the default
- Gradients in hero areas only — never on text, never on interactive elements
- No dark enterprise colour schemes (charcoal, slate-heavy palettes)
- Never use colour as the only indicator of state (always pair with icon/text)

---

### 2.2 Typography System

#### Type Scale

| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `--font-size-4xl` | 48px | 800 | Hero numbers, XP displays |
| `--font-size-3xl` | 36px | 700 | Page titles, module names |
| `--font-size-2xl` | 30px | 700 | Section headers |
| `--font-size-xl` | 24px | 600 | Card titles, welcome greetings |
| `--font-size-lg` | 20px | 600 | Subheadings, labels |
| `--font-size-md` | 18px | 500 | Body emphasis, button text |
| `--font-size-base` | 16px | 400 | Body text |
| `--font-size-sm` | 14px | 400 | Secondary text, captions |
| `--font-size-xs` | 12px | 400 | Metadata, timestamps |

#### Typography Rules
- Minimum body size: **16px** — never smaller for child users
- Line height: **1.6 minimum** for readability (1.75 for Devanagari scripts)
- Maximum text block width: **65ch** — long lines are exhausting for young readers
- Sentence case for all UI text — NEVER ALL CAPS (aggressive, school-like)
- **Bold only for genuine emphasis** — do not bold decoratively
- Indian script system font fallbacks are always included in the font stack

---

### 2.3 Spacing & Layout

#### Card Design Principles
Cards are the primary surface. Every major entity is a card.

| Property | Value | Why |
|----------|-------|-----|
| Min card height | 120px | Feels substantial, easy to tap |
| Card padding | 20–24px | Breathing room inside |
| Card border radius | 16–24px | Friendly, not corporate |
| Card shadow | Soft elevation (4px blur, 8% opacity) | Lifted but not harsh |
| Card spacing (gap) | 16–20px | Visual separation between items |

#### Grid System
- **Mobile**: 1 column full-width cards
- **Tablet (768px+)**: 2-column card grid
- **Desktop (1024px+)**: 3-column card grid with 240px fixed left sidebar
- Content area max-width: `720px` — never stretch content to fill ultra-wide screens

#### Spacing Philosophy
- Generous white space is not wasted space — it is breathing room
- Bottom nav on mobile requires **88px bottom padding** on main content (avoids content behind nav)
- Top area: **pilot greeting + XP bar** — always visible, never hidden by scroll

---

### 2.4 Iconography

| Type | Use | Style |
|------|-----|-------|
| Navigation icons | Module nav | Lucide (outlined, 24px) |
| Action icons | Buttons, triggers | Lucide (outlined, 20px) |
| Module identity icons | Card headers | Lucide or custom (28–32px) |
| Emoji | Accents, reactions, choices | System emoji (not custom) |
| Decorative illustrations | Screen heroes, empty states | Custom (Pixar/Disney-inspired) |

**Rule**: Never an icon-only interface. Illustrations create emotional connection where icons cannot.

---

### 2.5 Motion Design

All motion follows the principle: **purposeful, playful, never distracting.**

| Type | Duration | Easing | Use |
|------|---------|--------|-----|
| Micro (icon state) | 100–150ms | ease-out | Toggle, check, tap feedback |
| Standard (card/modal) | 200–300ms | ease-in-out | Card expand, modal enter |
| Narrative (achievement) | 400–600ms | spring | Badge unlock, XP pop |
| Journey (page transition) | 300–500ms | ease-in-out | Route changes |
| Celebration (milestone) | 600–1200ms | spring+bounce | Level up, streak achieve |

Motion respects `prefers-reduced-motion` — all animations degrade gracefully to instant transitions.

---

## Part 3 — Illustration Strategy

### Role of Illustrations

Illustrations are not decoration — they are the emotional core of LifePilot's visual identity. They communicate what words cannot: wonder, possibility, warmth, and adventure.

### Illustration Style

| Property | Standard |
|----------|---------|
| Art direction | Friendly, warm, Pixar-adjacent — rounded forms, expressive characters |
| Colour palette | Aligned to module identity colours; warm gradients welcome |
| Character style | Simple, diverse, relatable — no stereotypical "student" imagery |
| World-building | Each module has its own visual world (sky, space, forest, ocean, city) |
| Cultural sensitivity | Indian settings, clothing, and context woven in naturally |
| Complexity | Simple at small sizes; detailed at hero sizes |

### Illustration Inventory (required per module)

| Module | Required illustrations |
|--------|----------------------|
| Cockpit | Pilot in cockpit/aircraft; horizon vista; morning sky |
| Flight Plan | Map with paths; compass; milestone flags |
| Flight Log | Open journal by a window; starry night reflection |
| Future Me | Sunrise horizon; floating letter; time trail |
| Career Explorer | World globes with career icons; adventure paths |
| Money Quest | Treasure chest; coins in motion; choice crossroads |
| Life Choices | Crossroads; scales; choice bubbles |
| My Profile | Pilot badge; growth tree; identity constellation |

### Empty State Illustrations

Every empty state requires a warm, encouraging illustration with a one-line invitation.

| State | Illustration concept | Message |
|-------|---------------------|---------|
| No goals yet | Clear horizon with one tiny plane | "Your Flight Plan awaits. Where do you want to go?" |
| No journal entries | Open notebook, warm light | "Your Flight Log is ready. What's on your mind today?" |
| No letters yet | Blank envelope, sunrise | "Write to Future You. They're waiting." |
| No careers explored | World map, one pin | "Your first Career World is just one tap away." |

### Illustration Rules
- Every major screen must contain at least one illustration or journey visual
- Illustrations are **never stock photos** — always purpose-drawn
- Never use corporate iconography as illustration substitutes
- SVG format preferred for scalability and performance
- All illustrations must pass the **child perception test**: a child should immediately recognise what it represents

---

## Part 4 — Interaction Principles

### Core Interaction Philosophy

Every interaction should feel like:
- A **discovery** (not a form)
- A **choice** (not a requirement)
- A **moment** (not a transaction)

### Interaction Principles

| Principle | Implementation |
|-----------|---------------|
| **Progressive disclosure** | Show the minimum needed to make a decision. Reveal details on demand, not all at once. |
| **Tap over type** | Prefer tappable choices, sliders, mood pickers, and quick-selects over open text fields. |
| **Confirmation through delight** | Celebrate every action with a micro-animation — not just a system toast. |
| **Reversibility** | Most actions are undoable. "Undo" is always available for 5 seconds after destructive actions. |
| **Context awareness** | Greet with time-aware messages (morning/afternoon/evening). Suggest relevant actions based on recent activity. |
| **Patience** | No time limits on reflections. No pressure to complete anything in one session. |
| **Forgiving** | Mistakes are recoverable. Error messages are warm, not accusatory. |

### Interaction Patterns

#### Quick Reflection (Flight Log)
1. Tap "Log a moment"
2. Mood picker appears (visual emoji scale, 1–5)
3. One conversation prompt appears (not a list)
4. Text area with 200-character soft limit
5. Tap "Land it" (not "Submit")
6. Micro-celebration animation
7. Return to Cockpit with XP awarded

Maximum steps: **5 taps** from Cockpit to completed reflection.

#### Goal Setting (Flight Plan)
1. Tap "Set a new flight plan"
2. Visual category picker (illustrated category cards)
3. Goal title (single text field, large)
4. Target date (date picker, optional)
5. Tap "Launch" (not "Save")
6. Animated goal card appears in Flight Plan

Maximum steps: **4 taps** to create a goal.

#### Career Exploration
1. Browse Career Worlds (illustrated grid)
2. Tap a Career World
3. Animated world opens (careers inside the world)
4. Tap a career
5. Career story unfolds (visual roadmap, not text wall)
6. "Save to my path" or "Explore more"

Maximum steps: **3 taps** from Cockpit to reading a career story.

---

## Part 5 — Micro Interaction Rules

Micro interactions are the heartbeat of LifePilot. They acknowledge every action with a moment of delight.

### Trigger → Feedback Matrix

| Trigger | Micro interaction | Duration |
|---------|-----------------|---------|
| Tap any card | Card scales to 0.97, returns with spring | 120ms |
| Complete a habit | Checkbox fills with a green ripple + particle burst | 300ms |
| Earn XP | XP counter increments digit by digit with bounce | 400ms |
| Complete a goal | Confetti burst (3 particles, module colour) | 600ms |
| Send a letter to Future Me | Letter floats upward and fades | 800ms |
| Streak milestone | Banner slides in from top, holds 2s, slides out | 2000ms |
| Level up | Full screen celebration (star burst, pilot rank reveal) | 1500ms |
| Mood selected | Emoji scales up then settles, colour tints background | 200ms |
| Tab / nav switch | Active icon scales up 10%, label slides in | 150ms |
| Badge unlock | Badge flips from blank to coloured (3D card flip) | 500ms |
| Long press | Haptic pulse (on supported devices) + visual ring | 200ms |

### Rules
- **Never skip micro interactions for performance** — they are load-bearing UX, not decoration
- All micro interactions degrade to instant state change if `prefers-reduced-motion` is set
- Particle effects are **tasteful** (3–6 particles maximum) — not a screen full of confetti
- Sound effects are **off by default** — enabled in settings only

---

## Part 6 — Animation Rules

### Animation Hierarchy

**Level 1 — Ambient** (always running, very subtle)  
Examples: floating clouds on Cockpit hero, slow horizon gradient shift  
Duration: Looping, 8–20s per cycle  
Performance: CSS only, GPU-accelerated  

**Level 2 — Transition** (route changes, modal open/close)  
Examples: page slide in from right, modal scale-fade from centre  
Duration: 200–400ms  
Framework: framer-motion `AnimatePresence`  

**Level 3 — Feedback** (response to user action)  
Examples: card tap, button press, toggle  
Duration: 100–300ms  
Framework: framer-motion spring  

**Level 4 — Celebration** (earned moments)  
Examples: XP gain, badge unlock, goal completion  
Duration: 400–1500ms  
Framework: framer-motion with custom keyframes  

**Level 5 — Narrative** (storytelling sequences)  
Examples: letter floating to Future Me, career world opening  
Duration: 600–2000ms  
Framework: framer-motion, sequenced  

### Standard Animation Presets (from `designTokens.ts`)

```
fadeIn:   opacity 0→1, duration: moderate (300ms), easing: ease-out
slideUp:  y 16→0 + opacity 0→1, duration: moderate, easing: ease-out
slideIn:  x -16→0 + opacity 0→1, duration: moderate, easing: ease-out
scaleIn:  scale 0.95→1 + opacity 0→1, duration: moderate, easing: ease-out
popIn:    scale 0.8→1 + opacity 0→1, spring (stiffness 400, damping 20)
```

### Animation Don'ts
- No spinning loaders (use skeleton screens instead)
- No progress bars that jump (animate frame by frame)
- No animations longer than 2 seconds without user initiation
- No looping animations that are distracting (ambient must be barely perceptible)
- No animation on error states — errors need immediate clarity, not theatrics

### Page Transition System

```
Enter:  slideUp (y: 16→0, opacity 0→1, 300ms ease-out)
Exit:   fadeOut (opacity 1→0, 150ms ease-in)
Modal enter:  scaleIn (scale 0.95→1, 200ms spring)
Modal exit:   scaleOut (scale 1→0.95, opacity 1→0, 150ms ease-in)
```

---

## Part 7 — Module Experience Standards

### Standard — Every Module

Every module must pass this baseline before any module-specific review:

| Standard | Requirement |
|----------|------------|
| Entry animation | Module page slides in with `slideUp` on first mount |
| Empty state | Warm illustration + single-line invitation — never a blank page |
| Loading state | Skeleton cards — never spinners |
| Error state | Friendly message + retry action — never technical error text |
| Minimum card size | 120px height, full-width on mobile |
| Typography | Min 16px body, module identity colour for headers |
| i18n | 100% — zero hardcoded strings |
| Touch targets | All interactive elements ≥ 44px (56px for primary actions) |
| XP integration | Every meaningful action awards XP |

---

### Cockpit — Experience Standard

**Emotional target**: Hope + Confidence + Readiness for adventure

| Section | Component standard |
|---------|-------------------|
| Hero greeting | "Welcome back, Captain [Name]!" + time-aware sub-greeting + animated sky gradient |
| Pilot level | Level badge with XP ring progress — always visible |
| Today's mission | 1–3 mission cards, large, illustrated, tap to start |
| Journey progress | Visual progress bar (not percentage numbers) for active goals |
| Future Me alert | If a letter is ready: glowing envelope card with "A message is waiting..." |
| Module grid | 8 illustrated module cards in 2×4 grid — icons + names, coloured by module |
| Streak | Flame icon + day count — encouraging, not pressuring |

**Prohibited elements**: KPI tiles, number-heavy dashboards, progress percentages, any table or list

---

### Flight Plan — Experience Standard

**Emotional target**: Confidence + Agency + Future-thinking

| Element | Standard |
|---------|---------|
| Goal cards | Large illustrated card — title, category icon, visual progress arc |
| Progress | Circular arc (not %) showing goal progress |
| Add goal | Floating action button (Sky Blue, 56px, compass icon) |
| Goal creation | Illustrated category picker → single title field → optional date → Launch animation |
| Milestone view | Visual path with checkpoint flags |
| Status | "In flight" / "Landed!" / "Paused" — never "Active" / "Completed" / "Paused" |
| Empty state | Clear sky, single plane, "Where do you want to go?" |

---

### Flight Log — Experience Standard

**Emotional target**: Reflection + Safety + Self-awareness

| Element | Standard |
|---------|---------|
| Entry prompt | Single question — never a list of prompts |
| Mood picker | 5-point emoji scale (not numbers, not sliders) |
| Text area | Conversational placeholder ("What's on your mind?"), soft limit 500 chars |
| Submit | "Land it" button — not "Save" or "Submit" |
| Entry cards | Date + mood emoji + first line of entry — never full text on card |
| Empty state | Open journal by a window — "Your Flight Log is ready" |

---

### Future Me — Experience Standard

**Emotional target**: Wonder + Hope + Connection to future self

| Element | Standard |
|---------|---------|
| Hero | Sunrise horizon illustration with floating envelope |
| Letter list | Timeline view — letters appear as floating envelope cards |
| Ready to read | Glowing envelope — "A message from your past self is waiting..." |
| Letter creation | Full-screen editor, warm background, "To Future [Name]" header |
| Delivery date | "Your future self will read this on [date]" — not "Delivery date: 01/01/2027" |
| Post-send | Letter floats upward + sparkle animation + "Sent to the future! ✨" |

---

### Career Explorer — Experience Standard

**Emotional target**: Curiosity + Wonder + Possibility

| Element | Standard |
|---------|---------|
| Home | Illustrated world grid (2×3 on mobile) — each career world has an icon + coloured background |
| World entry | Zoom-in animation as world "opens" |
| Career cards | Illustrated card with career title + 2-line description + key skills as chips |
| Roadmap | Visual adventure path with milestone flags and age markers |
| Save | "Add to my path" — not "Bookmark" |
| Empty explore | World map with one pin — "Your first career world is one tap away" |

---

### Money Quest — Experience Standard

**Emotional target**: Curiosity + Agency + Future-thinking

| Element | Standard |
|---------|---------|
| Entry | Illustrated treasure map or adventure scene |
| Scenarios | Story card format — "You receive ₹500 for your birthday. What do you do?" |
| Choices | Large illustrated choice cards (4 max per scenario) |
| Outcome | Animated reveal — visual consequence shown, not just text |
| Progress | Coins earned displayed as growing treasure pile |
| Concepts | Story-format cards — never text walls or definition boxes |

---

### Life Choices — Experience Standard

**Emotional target**: Reflection + Values clarity + Agency

| Element | Standard |
|---------|---------|
| Scenario entry | Full-screen scenario card with illustration |
| Choice display | 2–4 large illustrated choice cards |
| Outcome reveal | Animated consequence reveal + reflection prompt |
| Values summary | Visual constellation of chosen values — not a list |
| Reflection | Single post-choice question — not a form |

---

## Part 8 — Screen Acceptance Checklist

Before any screen (page, modal, or component) is accepted for merge, it must pass this checklist.

### Gate 1 — Experience (XP-001)
- [ ] Child is the hero — language is addressed to the Pilot, not about them
- [ ] Follows XP-001 language system (Flight Plan, not Goal; Captain, not User; etc.)
- [ ] Visual-first — illustration or journey element present
- [ ] Minimal text — no walls of text; max 3 lines without visual break
- [ ] Feels like exploration — open, inviting, not form-like
- [ ] Encouraging language — no neutral/clinical/negative phrasing
- [ ] Future-oriented — connects action to future self where relevant
- [ ] No school appearance — no worksheet, report card, or grade-like elements
- [ ] No corporate dashboard — no KPI tiles, no data tables, no admin UI patterns
- [ ] Mobile-first — primary experience is mobile; desktop is enhancement

### Gate 2 — Design System
- [ ] All colours from design tokens (CSS custom properties) — no hardcoded hex values
- [ ] All spacing from SPACING token scale — no arbitrary pixel values
- [ ] All text from TYPOGRAPHY tokens — no raw font-size in component style
- [ ] Cards use standard border-radius (16–24px) and shadow (soft elevation)
- [ ] Illustrations present where required by module standard
- [ ] Motion follows animation rules — level correct, duration within range
- [ ] Loading state uses skeleton, not spinner

### Gate 3 — Accessibility
- [ ] All interactive elements have accessible labels
- [ ] Touch targets ≥ 44px (56px for primary actions)
- [ ] Focus ring visible on keyboard navigation
- [ ] No information conveyed by colour alone
- [ ] `aria-live` on dynamic content
- [ ] Tested at 200% text scale — no overflow or content loss
- [ ] Contrast ratio ≥ 4.5:1 for all text

### Gate 4 — i18n
- [ ] Zero hardcoded strings in JSX
- [ ] All keys exist in all 10 locale files
- [ ] Uses `module.i18nId` (not `module.id`) for module translation keys
- [ ] Locale switcher test passed (all 3 tested: en, hi, ta)

### Gate 5 — Technical
- [ ] TypeScript: zero errors on `tsc --noEmit`
- [ ] No direct `db.*` access outside repository layer
- [ ] Events published only from `storageService.ts`
- [ ] Feature flag check present if feature is wave-gated
- [ ] Vitest tests written for component and any associated hook

**All 5 gates must pass. No partial approvals.**

---

## Part 9 — Design Review Checklist

Used during design review (before implementation begins).

### Product Design Review

| Question | Must answer yes |
|----------|----------------|
| Does this feel like an adventure? | Yes |
| Would a 12-year-old understand this without help? | Yes |
| Is the primary action obvious in 2 seconds? | Yes |
| Is there a delight moment in this interaction? | Yes |
| Does it connect to the child's future self in any way? | Yes |

### Visual Review

| Question | Must answer yes |
|----------|----------------|
| Is there an illustration or journey visual? | Yes |
| Are the colours from the module palette? | Yes |
| Are the cards large enough for comfortable mobile use? | Yes |
| Is the typography readable for a 10-year-old? | Yes |
| Does the overall feel match XP-001 (Pixar, not SaaS)? | Yes |

### Language Review

| Question | Must answer yes |
|----------|----------------|
| Does it use XP-001 language (Flight Plan, Captain, etc.)? | Yes |
| Is every string encouraging and age-appropriate? | Yes |
| Are error messages warm and non-accusatory? | Yes |
| Are empty states invitations, not notifications of absence? | Yes |
| Is there zero educational/corporate/administrative language? | Yes |

### Perception Tests

| Audience | Question | Answer must be |
|----------|----------|---------------|
| Child | "Is this my adventure?" | Yes |
| Child | "Do I want to come back?" | Yes |
| Parent | "Is this safe and positive?" | Yes |
| Parent | "Does this feel manipulative?" | No |
| School | "Does this support life skills?" | Yes |

**If any answer fails → Redesign before implementation.**

---

## Part 10 — Future UI Expansion Strategy

### Expansion Principles

1. **New modules inherit the XP-001 constitution** — no new module can deviate from language system, visual style, or emotional goals
2. **New modules must pass all 5 Screen Acceptance Gates** before Wave 1 review
3. **Character system expansion** — as LifePilot grows, the Pilot avatar and any companion characters become richer, not replaced
4. **World-building compounds** — Career Worlds, Money Quest adventures, and Life Choices scenarios expand within their established visual worlds, not by creating new visual languages

### Wave-by-Wave UI Expansion

| Wave | UI additions |
|------|-------------|
| 1 | All 8 core module UIs; onboarding flow; Pilot creation; profile switching |
| 2 | Parent Companion UI (CoPilot view — calm, information-rich, different visual language from child view); Premium content visuals; Sync status indicator |
| 3 | Identity journey (deeper Future Me, life chapters, life arc visualisations); Decision Intelligence UI (branching choice trees); Community glimpses (privacy-first) |
| 4 | School Edition: teacher view (data-rich, not child-playful); student school-mode toggle; classroom leaderboard alternative (cohort achievements, not ranking) |
| 5 | Enterprise/CSR: configurable branding layer; reporting dashboards (adult-oriented, data-rich — different design language from child product) |
| 6 | AI Coach: conversational UI (chat-like but Pixar-warm, not clinical chatbot); AI insight cards on Cockpit; personalized adventure path visualisation |

### Character System Roadmap

| Wave | Character additions |
|------|--------------------|
| 1 | Pilot avatar (custom character selection — diverse, Indian-context characters) |
| 2 | CoPilot character (parent companion — distinct visual identity) |
| 3 | Future Self preview (aged-up version of Pilot avatar, revealed progressively) |
| 4 | Mentor characters (career world guides — domain-specific characters for each career world) |
| 6 | AI Coach character (friendly, non-humanoid AI companion — not a robot cliché) |

### Illustration Library Growth

New illustrations are added when:
- A new module is built (requires full module illustration set)
- A new gamification reward is introduced (badge art, achievement art)
- A new cultural context is added (regional story illustrations)
- A new age tier is introduced (Junior Pilot 8–11 visual style vs. Navigator 15–18)

Illustration additions must maintain:
- Consistent art direction (Pixar-friendly, warm, diverse)
- Indian cultural representation without stereotyping
- Expansion of existing visual worlds (not creation of new visual languages)

### Age-Adaptive UI (Future)

| Tier | Age | Visual style adjustments |
|------|-----|--------------------------|
| Junior Pilot | 8–11 | Larger cards, more illustrations, simpler language, brighter colours |
| Explorer | 12–14 | Current default style |
| Navigator | 15–18 | Slightly more refined, subtler animations, deeper content visible |

UI adapts based on `pilot.age` at render time — no separate code paths, just token adjustments.

### Internationalisation of Visuals

- Currency symbols localise to Indian context: ₹ (Rupee) is the default
- Illustrations use Indian settings, clothing, and context
- Cultural festivals integrated into seasonal Cockpit themes (Diwali, Holi, Pongal, Eid, Christmas, etc.)
- Regional content packs include region-appropriate illustration styles (Wave 3+)
