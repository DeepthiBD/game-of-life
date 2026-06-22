# LifePilot — Architecture Index

**Stack**: React 19 + Vite 7 + TypeScript strict + Dexie.js + wouter + i18next + Tailwind v4 + shadcn/ui + framer-motion + vite-plugin-pwa  
**Philosophy**: Offline-first, domain-driven, event-driven, feature-flagged  
**Related**: [ADRs](../adr/) document every major architectural decision

---

## Documents in this folder

| Document | Purpose |
|----------|---------|
| [Architecture.md](Architecture.md) | System overview, layers, data flow, offline model |
| [ArchitectureReviewPack.md](ArchitectureReviewPack.md) | Review checklist and decision rationale |
| [RepositoryGuide.md](RepositoryGuide.md) | Repository pattern — contracts, base class, entity repos |
| [StorageGuide.md](StorageGuide.md) | Dexie/IndexedDB schema, table mapping, migration strategy |
| [LocalizationGuide.md](LocalizationGuide.md) | i18next setup, 10-language support, locale file structure |
| [AccessibilityGuide.md](AccessibilityGuide.md) | WCAG AA standards, child-specific requirements, testing |
| [TestingGuide.md](TestingGuide.md) | Vitest + @testing-library, Dexie mocking, coverage |
| [FeatureFlags.md](FeatureFlags.md) | Feature flag system — Wave gating, rollout strategy |
| [FutureExpansionGuide.md](FutureExpansionGuide.md) | Module expansion plan, premium, parent, school, enterprise, AI |
| [VersionLog.md](VersionLog.md) | Version history and changelog |

---

## ADR index

| ADR | Decision |
|-----|---------|
| [ADR-001](../adr/ADR-001-React.md) | React 19 + Vite 7 as UI framework |
| [ADR-002](../adr/ADR-002-OfflineFirst.md) | Offline-first with IndexedDB as primary store |
| [ADR-003](../adr/ADR-003-Dexie.md) | Dexie.js as IndexedDB ORM |
| [ADR-004](../adr/ADR-004-LocalizationFirst.md) | i18next + 10 Indian languages from day one |
| [ADR-005](../adr/ADR-005-DomainDrivenDesign.md) | Domain-driven design with repository pattern |
| [ADR-006](../adr/ADR-006-FeatureFlags.md) | Feature flags for Wave-gated module releases |
| [ADR-007](../adr/ADR-007-EventArchitecture.md) | Event bus for cross-module communication |
| [ADR-008](../adr/ADR-008-EthicalGamification.md) | Ethical XP + gamification system |
| [ADR-009](../adr/ADR-009-ParentTrustFramework.md) | Parent trust + privacy architecture |
| [ADR-010](../adr/ADR-010-ChildPsychologyPrinciples.md) | Child psychology binding rules |
| [ADR-011](../adr/ADR-011-VisualDesignSystem.md) | Visual design system (XP-002) |

---

## Current src structure

```
src/
├── app/              — ErrorBoundary, AppProviders (i18n + theme)
├── core/             — Cross-cutting infrastructure
│   ├── config/       — App config, environment
│   ├── diagnostics/  — Error tracking, health checks
│   ├── events/       — Event bus (cross-module communication)
│   ├── featureflags/ — Wave-gated feature flag system
│   └── versioning/   — App version management
├── modules/          — Feature modules (domain-aligned)
│   ├── cockpit/      — Home / mission control
│   ├── pilot/        — Pilot profile
│   ├── flightplan/   — Goals and flight plan
│   ├── flightlog/    — Journal and reflection
│   ├── futureme/     — Future Me letters
│   ├── moneyquest/   — Financial literacy
│   ├── lifechoices/  — Values and choices
│   ├── careerexplorer/ — Career worlds
│   ├── premium/      — [Future Wave 4] Premium content
│   ├── parent/       — [Future Wave 3] Parent dashboard
│   ├── school/       — [Future Wave 5] School/cohort tools
│   ├── enterprise/   — [Future Wave 6] Enterprise/CSR
│   └── ai/           — [Future Wave 6] AI coach
├── shared/           — Cross-module shared code
│   ├── constants/    — Typed XP-001–005 governance constants
│   └── ui/           — (planned) shadcn/ui + custom primitives
├── storage/          — Data layer (→ domain/data in future migration)
│   ├── db.ts         — LifePilotDatabase (Dexie, 30+ tables)
│   ├── storageService.ts
│   └── repositories/ — Entity repositories with base class
├── localization/     — i18next config + 10 locale JSON files
├── theme/            — Design tokens, MODULES array
├── types/            — Domain types and enums (→ domain/ in future)
├── components/       — Shared UI components (→ shared/ui/ in future)
│   ├── common/       — OfflineIndicator, ThemeToggle, LanguageSwitcher
│   ├── layout/       — AppShell
│   ├── navigation/   — Sidebar, BottomNav
│   └── ui/           — shadcn/ui primitives
├── hooks/            — Custom React hooks (→ shared/hooks/ in future)
├── pages/            — Route-level page stubs (→ modules/ in future)
├── utils/            — Utility functions (→ shared/utils/ in future)
└── tests/            — Test suites
```

### Planned future migration (non-breaking, per-wave)

| Current | Target | Wave |
|---------|--------|------|
| `src/types/` | `src/domain/entities/` + `src/domain/enums/` | 2 |
| `src/storage/` | `src/data/` | 2 |
| `src/components/` | `src/shared/ui/` | 2 |
| `src/hooks/` | `src/shared/hooks/` | 2 |
| `src/utils/` | `src/shared/utils/` | 2 |
| `src/pages/` | `src/modules/[name]/pages/` | 3 |
| `src/localization/` | `src/core/localization/` | 2 |
