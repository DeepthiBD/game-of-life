# LifePilot — Architecture Overview

## System Summary

LifePilot is an **Offline-First Life Navigation PWA** built for children and teenagers aged 8–18 in India. All data lives in the user's device via IndexedDB (Dexie.js). The app functions completely without internet connectivity. Cloud sync is a Wave 2 addition — the offline experience is the primary experience, not a fallback.

---

## Architectural Style

- **Domain-Driven Design (DDD)** — 232 domain entities, 124 enumerations, all in `src/types/index.ts`
- **Feature-Driven Structure** — each product module (`cockpit`, `flightPlan`, etc.) is an isolated vertical slice
- **Repository Pattern** — all database access is mediated through typed repository classes
- **Storage Abstraction** — Dexie tables are never accessed outside the repository layer
- **Event-Driven (internal)** — a lightweight event bus decouples domain events from UI reactions
- **Offline-First** — IndexedDB is the primary persistence store; no backend is required for any Wave 1 feature

---

## Layer Diagram

```
┌──────────────────────────────────────────────────────────┐
│  Presentation Layer                                       │
│  modules/*/pages/ + components/                          │
│  (React components, hooks, i18n, framer-motion)          │
├──────────────────────────────────────────────────────────┤
│  Application Layer                                        │
│  hooks/ + core/featureflags + core/events                │
│  (useGoals, usePilot, useFeature, eventBus)              │
├──────────────────────────────────────────────────────────┤
│  Service Layer                                            │
│  storage/storageService.ts                               │
│  (orchestrates repositories, emits events)               │
├──────────────────────────────────────────────────────────┤
│  Repository Layer                                         │
│  storage/repositories/*                                  │
│  (typed CRUD over Dexie tables)                          │
├──────────────────────────────────────────────────────────┤
│  Infrastructure Layer                                     │
│  storage/db.ts + core/diagnostics + core/versioning      │
│  (Dexie init, schema, migration, logging)                │
├──────────────────────────────────────────────────────────┤
│  Domain Layer                                             │
│  types/index.ts                                           │
│  (232 entities, 124 enums — imports nothing)             │
└──────────────────────────────────────────────────────────┘
```

---

## Key Technology Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Offline storage | Dexie.js (IndexedDB) | Mature, typed, offline-capable — see ADR-003 |
| UI framework | React 19 + Vite 7 | See ADR-001 |
| Routing | wouter | Lighter than React Router for PWA use |
| i18n | i18next | Industry standard, lazy locale loading |
| Styling | Tailwind CSS v4 + shadcn/ui | Utility-first with accessible component primitives |
| Animations | framer-motion | Production-quality motion for a delightful experience |
| Testing | Vitest + RTL | Fast, Vite-native test runner |
| PWA | vite-plugin-pwa + Workbox | Proven offline caching strategy |

---

## Product Modules

| Module | Route | Status |
|--------|-------|--------|
| Cockpit (home) | `/cockpit` | Wave 1 |
| My Profile (Pilot) | `/pilot` | Wave 1 |
| Flight Plan (goals) | `/flight-plan` | Wave 1 |
| Flight Log (journal) | `/flight-log` | Wave 1 |
| Future Me (letters) | `/future-me` | Wave 1 |
| Career Explorer | `/career-explorer` | Wave 1 |
| MoneyQuest | `/money-quest` | Wave 1 |
| Life Choices | `/life-choices` | Wave 1 |
| Parent Companion | (disabled) | Wave 2 |
| School Edition | (disabled) | Wave 4 |
| Enterprise Edition | (disabled) | Wave 5 |
| AI Coach | (disabled) | Wave 6 |

---

## Implementation Waves

| Wave | Theme | Key Deliverables |
|------|-------|-----------------|
| 0 | Foundation | Domain model (232 entities), Dexie schema, i18n, app shell |
| 1 | MVP | All 8 core modules built, PWA, DPDP consent, content moderation |
| 2 | Server | Cloud sync, Parent Companion, premium learning paths |
| 3 | Identity | Career deep-dive, decision intelligence, advanced identity |
| 4 | School | School edition, teacher dashboard, cohort reporting |
| 5 | Enterprise | Multi-tenant, CSR mode, SCORM/LRS integration |
| 6 | AI | AI Coach, personalised recommendations, adaptive content |

---

## Non-Functional Requirements

| NFR | Target |
|-----|--------|
| First contentful paint (offline) | < 1.5s |
| Time to interactive | < 3s |
| Initial bundle size (gzipped) | < 200KB |
| Languages supported | 10 Indian languages |
| Minimum age supported | 8 years |
| Maximum age supported | 18 years |
| Offline capability | 100% — all Wave 1 features |
| WCAG compliance | 2.1 AA |
| DPDP compliance | Required before launch |

---

## Security Principles

- No secrets in client code
- All storage writes validated before persistence
- No external analytics (DPDP child-safety mandate)
- No advertising SDKs (child safety mandate)
- Input sanitised on write; max lengths enforced
- Content moderation for journal entries (Wave 1 — first-party only)
- Parental consent flow (Wave 1 — DPDP requirement)
