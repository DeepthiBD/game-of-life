# LifePilot — Governance Index

**Authority**: All XP documents are binding on all modules, current and future.  
**Process**: Any change to a governance document requires a corresponding ADR.  
**Enforcement**: All Wave approvals require a governance checklist sign-off.

---

## XP Documents — Source of Truth

These are the canonical specifications. They override product intuition, design preference, and engineering convenience.

| Document | Covers | Status |
|----------|--------|--------|
| [XP-001 — Experience Constitution](XP-001-ExperienceConstitution.md) | Core UX principles, screen acceptance, language system | Active |
| [XP-002 — Visual Design System](../design/XP-002-VisualDesignSystem.md) | Colours, typography, illustration, animation, components | Active |
| [XP-003 — Copywriting Guide](XP-003-CopywritingGuide.md) | Voice, tone, terminology, prohibited words | Active |
| [XP-004 — Child Psychology Principles](XP-004-ChildPsychologyPrinciples.md) | 16 development rules, self-efficacy, resilience, AI safety | Active |
| [XP-005 — Parent Trust Framework](XP-005-ParentTrustFramework.md) | Privacy, copilot view, monetisation ethics | Active |

> **Note on XP-002**: The canonical source spec lives here under governance. The 13-part implementation guide lives in `docs/design/` since it crosses into visual implementation territory.

---

## Implementation Guides (derived from XP docs)

These expand XP documents into full operational guides for designers, writers, and engineers.

| Guide | Derived from | Location |
|-------|-------------|----------|
| [Copywriting Guide](CopywritingGuide.md) | XP-003 | governance/ |
| [Child Psychology Principles](ChildPsychologyPrinciples.md) | XP-004 | governance/ |
| [Parent Trust Framework](ParentTrustFramework.md) | XP-005 | governance/ |
| [Gamification Ethics](GamificationEthics.md) | ADR-008 | governance/ |
| [Experience Guidelines](../design/ExperienceGuidelines.md) | XP-001 | design/ |
| [Visual Design System](../design/VisualDesignSystem.md) | XP-002 | design/ |

---

## Governance Review Gates

Every new screen, module, or content addition must pass all applicable gates:

### Screen Acceptance (XP-001)
- [ ] 12 XP-001 screen acceptance questions — all pass

### Design Review (XP-002)
- [ ] 12 XP-002 design review gates — all pass
- [ ] Parent visual test: Safe · Positive · Healthy · Trustworthy
- [ ] Child visual test: "This is my adventure. I want to explore."
- [ ] School visual test: Professional · Educational · Life Skills

### Child Psychology (XP-004)
- [ ] All 16 development rules pass
- [ ] Child experience check (5 questions) — all pass
- [ ] Parent trust alignment (5 questions) — all pass
- [ ] School alignment (5 questions) — all pass
- [ ] Psychological risk matrix — no HIGH ratings

### Copywriting (XP-003)
- [ ] No prohibited copy words (`scanCopyForProhibitedWords()`)
- [ ] Terminology compliance (`checkTerminologyCompliance()`)
- [ ] Growth mindset language check (`checkGrowthMindset()`)
- [ ] Error messages follow recovery pattern
- [ ] Adventure-appropriate button labels

### Parent Trust (XP-005)
- [ ] Privacy level is `private` by default
- [ ] No third-party analytics in child-facing code
- [ ] No comparison data across children
- [ ] AI constraints satisfied (if AI feature)
- [ ] Monetisation ethics pass

---

## ADR Cross-reference

| ADR | Governance area |
|-----|----------------|
| [ADR-008](../adr/ADR-008-EthicalGamification.md) | Ethical gamification (supports XP-004 Rule 5) |
| [ADR-009](../adr/ADR-009-ParentTrustFramework.md) | Parent trust architecture (implements XP-005) |
| [ADR-010](../adr/ADR-010-ChildPsychologyPrinciples.md) | Child psychology binding (implements XP-004) |
| [ADR-011](../adr/ADR-011-VisualDesignSystem.md) | Visual design system (implements XP-002) |

---

## TypeScript Constants (code-level enforcement)

All governance rules are codified as typed constants. Import from `src/shared/constants/`:

| Module | Constants file | Key exports |
|--------|---------------|-------------|
| XP-001 | `xp001.ts` | `SCREEN_ACCEPTANCE`, `LANGUAGE_SYSTEM`, `runScreenAcceptance()` |
| XP-002 | `design.ts` | `BRAND_HEX`, `MODULE_VISUAL`, `DESIGN_REVIEW_GATE`, `runDesignReview()` |
| XP-003 | `copy.ts` | `TERMINOLOGY`, `PROHIBITED_COPY_WORDS`, `scanCopyForProhibitedWords()` |
| XP-004 | `psychology.ts` | `DEVELOPMENT_RULES`, `GROWTH_MINDSET_LANGUAGE`, `runDevelopmentReview()` |
| XP-005 | `trust.ts` | `PrivacyLevel`, `SAFE_AI`, `MONETIZATION`, `runTrustTests()` |
| Ethics | `ethics.ts` | `PROHIBITED_XP_PATTERNS`, `ETHICAL_METRICS` |
