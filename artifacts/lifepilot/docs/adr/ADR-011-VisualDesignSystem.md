# ADR-011 — LifePilot Visual Design System

**Status**: Accepted  
**Date**: June 2026  
**Binding**: Yes — all modules, current and future  
**Related**: XP-002, ADR-010 (Child Psychology), ADR-009 (Parent Trust)

---

## Context

LifePilot is a Life Navigation Adventure Platform for children aged 8–18. The product's visual design carries enormous weight — it is the primary signal to a child of whether this app is "for me", whether it is safe, and whether it is worth engaging with. It is also the primary signal to parents and schools of whether this is a trustworthy, age-appropriate product.

Generic UI patterns (flat white screens, dashboards, corporate cards, form-heavy flows) signal to children that this is another school tool — and cause immediate disengagement. The risk is not visual preference; it is product failure.

XP-002 defines the complete visual language that transforms LifePilot from a database interface into a life navigation adventure. It overrides all generic SaaS UI conventions.

---

## Decision

XP-002 is adopted in full as the binding visual design specification. All design decisions are implemented as typed TypeScript constants in `src/shared/constants/design.ts`, extended from `src/theme/designTokens.ts`. CSS custom properties derive from these tokens — no hardcoded hex values are permitted anywhere in component code.

---

## Key Decisions

### 1. Sky Adventure as the primary experience theme

The "child is the Pilot, life is the Journey, the future is the Horizon" metaphor is the foundational identity. Every module name, copy choice, and visual element reinforces this metaphor. This is not cosmetic — it is the product's core promise.

**Why**: Children who see themselves as the protagonist of their own adventure are more engaged, more intrinsically motivated, and more resilient (XP-004 Rule 6 — Self-Efficacy).

---

### 2. Immersive backgrounds — never plain white

All screens use the Sky Adventure gradient (`#DFF3FF → #F7FBFF → #FFF8F0`) or a module-specific variant. Plain white backgrounds are explicitly prohibited.

**Why**: White screens signal school/productivity. The gradient creates the "looking out of an aircraft window" atmosphere that differentiates LifePilot in the first 200ms of a child's attention.

---

### 3. Module identity colours — typed constants, never hardcoded

Each module has a named identity colour. These are defined in `DESIGN_TOKENS.moduleColors` and referenced via CSS custom properties. No component file may contain a raw hex value.

**Why**: Module colours are a navigation system. Consistent colour identity helps children build spatial memory of the app and creates emotional associations (blue = cockpit, purple = journal, etc.).

---

### 4. Typography scale — 16px body minimum, no ALL CAPS

Body text minimum is 16px for children. ALL CAPS is prohibited — it reads as shouting. Sentence case only. No pure black (`#000000`) for any text.

**Why**: Children aged 8–11 have lower reading fluency than adults. 16px minimum is a developmental accessibility requirement, not a preference.

---

### 5. Animation hierarchy — 5 levels, `prefers-reduced-motion` mandatory

All animations are classified into 5 levels (ambient → narrative). All animations degrade to instant state change under `prefers-reduced-motion`. Forbidden animations (flashing, casino effects, aggressive movement, attention traps) are typed in `FORBIDDEN_ANIMATIONS`.

**Why**: Animation serves adventure and feedback — not retention manipulation. Forbidden animation patterns violate ADR-008 (Ethical Gamification) and XP-004 Rule 5 (Intrinsic Motivation).

---

### 6. Card radius 16–24px, soft shadow — never flat or sharp

All cards use large border radius and soft shadow. Sharp-cornered cards signal enterprise/school tools and violate the adventure feel.

**Why**: Round, soft cards are perceptually safer and friendlier to children, particularly 8–11 year olds. This is consistent with every successful child-facing product (Duolingo, Headspace, Khan Kids).

---

### 7. Touch targets — 44px minimum, 56px for primary

All interactive elements meet 44px minimum. Primary actions use 56px. This exceeds the Apple HIG minimum.

**Why**: Children (especially 8–12) have lower fine motor precision than adults. 44px minimum reduces tapping errors significantly.

---

### 8. Badge system — curiosity and character, not competition

Badges celebrate: Curiosity · Exploration · Kindness · Leadership · Responsibility · Reflection · Resilience · Consistency. Competition badges are explicitly prohibited.

**Why**: Competition badges violate XP-004 Rule 3 (No Comparison). Character badges reinforce identity formation positively.

---

### 9. 12-gate Design Review before any screen ships

A 12-question design review gate (child feels like hero → creates curiosity) must pass before any screen is approved. This is typed in `DESIGN_REVIEW_GATE` and enforced in the Wave approval process.

**Why**: Without an enforced gate, individual component decisions drift toward generic SaaS patterns. The gate prevents aesthetic entropy.

---

### 10. Cockpit = alive, never KPI dashboard

The Cockpit screen displays: Welcome Captain · Journey Progress · Today's Mission · Message from Future You · Explore New Paths · Upcoming Milestones. It must never display numeric KPIs, tables, or task lists.

**Why**: A dashboard triggers "school/work" mental models. A living cockpit triggers "adventure" mental models — the entire product experience depends on the first screen being correct.

---

## Consequences

- All component files: import colours via `CSS_VARS` from `design.ts`, never hardcode
- All new screens: complete 12-gate Design Review before Wave approval
- All new modules: register an identity colour in `DESIGN_TOKENS.moduleColors`
- All animation code: check `FORBIDDEN_ANIMATIONS` and implement `prefers-reduced-motion` fallback
- Design team / future contractors: XP-002 is handed to them as the first deliverable

## References
- XP-002 LifePilot Visual Design System (source)
- `src/shared/constants/design.ts`
- `src/theme/designTokens.ts`
- ADR-008 Ethical Gamification
- ADR-010 Child Psychology (Rules 1, 5, 6 directly relevant)
- WCAG 2.1 AA
- Apple Human Interface Guidelines (touch targets)
