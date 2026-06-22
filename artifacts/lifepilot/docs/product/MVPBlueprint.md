# LifePilot — MVP Blueprint

**Status**: Wave 1 in progress  
**Related**: [ProductVision](ProductVision.md) · [Roadmap](Roadmap.md)

---

## MVP Scope (Wave 1)

The MVP delivers the complete foundation: all 8 modules as working experiences, fully offline, in all 10 supported languages.

### In scope

| Area | Deliverable |
|------|------------|
| **App shell** | PWA, offline, install prompt, all 10 languages |
| **Cockpit** | Welcome, XP bar, feature cards, module grid, streak |
| **Pilot Profile** | Basic profile — name, avatar choice, language preference |
| **Flight Plan** | Goal creation, flight plan management, progress tracking |
| **Flight Log** | Mood check-in, daily reflection prompt, private journal |
| **Future Me** | Letter writing, letter archive, Future You reveal |
| **Career Explorer** | Career Worlds browsing, world detail, save to explore |
| **Money Quest** | Scenario-based financial decisions, adventure path |
| **Life Choices** | Values scenarios, choice reflection, consequence reveal |
| **Gamification** | XP system, levels, badges, streaks — ethical (ADR-008) |
| **Privacy** | All data local (IndexedDB), `PrivacyLevel.PRIVATE` default |

### Out of scope (Wave 2+)

- Parent dashboard / copilot view
- School cohorts and facilitator tools
- Premium content
- AI Coach
- Cloud sync / account system
- Push notifications
- Enterprise features

---

## Success criteria

| Metric | Target |
|--------|--------|
| Loads offline after first visit | 100% |
| First Contentful Paint | < 1.5s |
| All 10 languages functional | 100% |
| Typecheck errors | 0 |
| Core Web Vitals (LCP) | < 2.5s |
| WCAG AA compliance | Pass |
| XP-002 12-gate design review | All screens pass |
| XP-004 child experience check | All screens pass |

---

## Governance compliance (per wave)

Every module shipped in Wave 1 must pass:
- XP-001 screen acceptance (12 gates)
- XP-002 design review (12 gates)
- XP-004 child experience check (5 questions)
- XP-005 parent trust alignment (5 questions)
- ADR-008 ethical gamification constraints
