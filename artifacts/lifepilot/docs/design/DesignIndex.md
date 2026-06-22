# LifePilot — Design Index

**Authority**: XP-002 is the binding visual design specification. This folder contains the implementation guides derived from it.  
**Governance source**: [XP-002 canonical spec](XP-002-VisualDesignSystem.md) lives here.  
**Related governance**: [GovernanceIndex](../governance/GovernanceIndex.md)

---

## Documents in this folder

| Document | Purpose |
|----------|---------|
| [XP-002 — Visual Design System](XP-002-VisualDesignSystem.md) | Canonical XP source — colours, typography, themes, components, animation, accessibility, 12-gate review |
| [Visual Design System](VisualDesignSystem.md) | 13-part implementation guide — design principles through module-by-module standards |
| [Experience Guidelines](ExperienceGuidelines.md) | UX implementation derived from XP-001 — 10 parts covering language, emotional experience, adventure design |

---

## Governance boundary

**Governance docs** (`docs/governance/`) = the *what* and *why* — principles, rules, ethical constraints.  
**Design docs** (`docs/design/`) = the *how* — visual implementation, component standards, UX patterns.

XP-002 sits in `docs/design/` because it IS the visual system — it is simultaneously a governance rule and a design specification. The [GovernanceIndex](../governance/GovernanceIndex.md) cross-references it.

---

## Future design documents (Wave 2+)

| Document | Status |
|----------|--------|
| ColorSystem.md | Planned — full swatch reference with A11y ratios |
| TypographySystem.md | Planned — scale, Indian script fonts, specimen |
| IllustrationSystem.md | Planned — style guide for commissioned illustration set |
| AnimationGuide.md | Planned — Lottie integration, ambient loops |
| ComponentCatalog.md | Planned — full Storybook-style component reference |
| UXPatterns.md | Planned — interaction patterns, flows, micro-copy |

---

## Design review gate (quick reference)

Run before every screen or component ships. All 12 must pass → see `runDesignReview()` in `src/shared/constants/design.ts`.

| # | Gate |
|---|------|
| 1 | Child feels like the hero |
| 2 | Visual-first — illustration or journey element present |
| 3 | Mobile-first — tested at 375px |
| 4 | Adventure feeling — not school or enterprise |
| 5 | Hopeful tone |
| 6 | Future-oriented element present |
| 7 | No ERP appearance |
| 8 | No corporate appearance |
| 9 | Accessible — WCAG AA, 44px targets, prefers-reduced-motion |
| 10 | Parent-safe |
| 11 | School-acceptable |
| 12 | Creates curiosity |
