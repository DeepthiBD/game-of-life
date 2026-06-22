# LifePilot — Architecture Review Pack (ARP-001)
**Classification**: External Architecture Audit  
**Version**: 1.0  
**Date**: June 2026  
**Status**: Wave 0 Foundation — Submitted for Review  
**Prepared by**: Engineering Architecture Team  
**Review scope**: Wave 0 Foundation (complete) + Wave 1–6 scalability readiness

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Folder Structure](#2-folder-structure)
3. [Domain Layer](#3-domain-layer)
4. [Repository Layer](#4-repository-layer)
5. [Database Layer](#5-database-layer)
6. [Event Architecture](#6-event-architecture)
7. [Feature Flags](#7-feature-flags)
8. [Localization](#8-localization)
9. [Design System](#9-design-system)
10. [Routing](#10-routing)
11. [Testing Framework](#11-testing-framework)
12. [Documentation](#12-documentation)
13. [Scalability Review](#13-scalability-review)
14. [Risks](#14-risks)
15. [Architecture Freeze Candidate](#15-architecture-freeze-candidate)
16. [Next Prompt — RP-002 Inputs](#16-next-prompt--rp-002-inputs)

---

## 1. Architecture Overview

### Architecture Style

**Offline-First, Domain-Driven, Feature-Modular Progressive Web Application**

LifePilot is built as a single-page PWA with no mandatory backend dependency in Wave 1. The architecture combines:

- **Offline-First** — IndexedDB (Dexie.js) is the primary store; network is additive
- **Domain-Driven Design (DDD)** — domain types are isolated, zero-dependency; bounded contexts map to product modules
- **Repository Pattern** — all storage access mediated through typed repository classes
- **Event-Driven (in-process)** — lightweight synchronous event bus for cross-module coordination
- **Feature-Modular** — each product module is a vertical slice with its own routes, components, and hooks
- **Progressive Enhancement** — PWA installable; Wave 2 adds backend without changing Wave 1 behaviour

### Key Principles

| Principle | Statement |
|-----------|-----------|
| **Offline-first** | The app is fully functional without any network connection. Cloud sync is additive, not enabling. |
| **Domain integrity** | `src/types/index.ts` is the single source of truth for all entity shapes. It imports nothing. |
| **Repository isolation** | Dexie tables are never accessed outside the repository layer. No component touches `db.*` directly. |
| **Localisation-first** | No user-visible string is hardcoded in JSX. All text flows through i18next. |
| **Accessibility as baseline** | WCAG 2.1 AA compliance is a product quality requirement, not a post-launch concern. |
| **Design token discipline** | All colours, spacing, and motion reference CSS custom properties. No raw values in components. |
| **Child-safe by default** | No external analytics, no advertising SDKs, no third-party tracking. DPDP compliance required. |
| **Wave-gated features** | Every incomplete or future feature is behind a feature flag. No dead routes in nav. |

### Architectural Layers

```
┌──────────────────────────────────────────────────────────────────────────┐
│  PRESENTATION LAYER                                                        │
│  src/modules/*/pages/ + src/components/                                   │
│  React 19 components, framer-motion animations, shadcn/ui primitives      │
│  Uses hooks for all data access; never calls repositories directly         │
├──────────────────────────────────────────────────────────────────────────┤
│  APPLICATION LAYER                                                         │
│  src/hooks/ + src/core/featureflags/ + src/core/events/                   │
│  Custom hooks (useGoals, usePilot, useHabits, useFeature)                 │
│  Feature flag resolution; event subscription; i18n                        │
├──────────────────────────────────────────────────────────────────────────┤
│  SERVICE LAYER                                                             │
│  src/storage/storageService.ts                                             │
│  Orchestrates repositories; enforces validation; publishes domain events   │
├──────────────────────────────────────────────────────────────────────────┤
│  REPOSITORY LAYER                                                          │
│  src/storage/repositories/*                                                │
│  Typed CRUD + domain queries over Dexie tables                             │
│  BaseRepository + BasePilotScopedRepository base classes                   │
├──────────────────────────────────────────────────────────────────────────┤
│  INFRASTRUCTURE LAYER                                                      │
│  src/storage/db.ts + src/core/diagnostics/ + src/core/versioning/         │
│  Dexie initialisation, schema versioning (v11), migrations, logging        │
├──────────────────────────────────────────────────────────────────────────┤
│  DOMAIN LAYER                                                              │
│  src/types/index.ts                                                        │
│  232 entity interfaces, 124 enumerations — imports nothing                 │
└──────────────────────────────────────────────────────────────────────────┘
```

**Cross-cutting concerns** (serve all layers):

| Concern | Location |
|---------|----------|
| Events | `src/core/events/` |
| Feature Flags | `src/core/featureflags/` |
| Diagnostics | `src/core/diagnostics/` |
| Versioning | `src/core/versioning/` |
| Configuration | `src/core/config/` |
| Design Tokens | `src/theme/designTokens.ts` |
| Shared Constants | `src/shared/constants/` |

### Design Decisions

| Decision | Choice | ADR |
|----------|--------|-----|
| UI framework | React 19 + Vite 7 | ADR-001 |
| Offline strategy | IndexedDB (Dexie.js) primary | ADR-002, ADR-003 |
| Localisation | i18next, 10 Indian languages from day one | ADR-004 |
| Domain model | DDD bounded contexts, 232 entities | ADR-005 |
| Feature access control | First-party feature flags, Wave-gated | ADR-006 |
| Cross-module coordination | Synchronous in-process event bus | ADR-007 |
| Routing | wouter (not react-router-dom) | — |
| Styling | Tailwind CSS v4 + shadcn/ui + CSS custom properties | — |
| Animation | framer-motion | — |
| PWA | vite-plugin-pwa + Workbox | — |

### Scalability Strategy

**Horizontal (more users)**: Wave 1 is fully client-side — there is no server to scale. Wave 2 introduces a stateless REST API behind a load balancer. Each user's data is isolated in their own device's IndexedDB; the server holds a replicated copy indexed by `pilotId`.

**Vertical (more features)**: Each new product module is added as an isolated bounded context under `src/modules/`. Existing modules are not modified. New feature flags gate new capability. The Dexie schema is extended additively.

**Institutional (school/enterprise)**: Wave 4+ introduces multi-tenancy via a `tenantId` discriminator in all server-side tables. The client-side model already has `schoolId`, `tenantId`, and `organizationId` fields in relevant entities.

**AI (Wave 6)**: The event bus provides the integration surface — AI responses are injected as events. AI conversation tables (`aiConversations`, `aiRecommendations`, `aiInsights`) are pre-declared in the Wave 0 schema.

### Extension Strategy

| Extension point | Mechanism |
|----------------|-----------|
| New product module | Add `src/modules/<name>/`, register route + nav, gate with feature flag |
| New entity | Add interface to `types/index.ts`, add Dexie table in new schema version, add repository |
| New language | Add `src/localization/locales/<code>.json` mirroring `en.json` structure |
| New backend | Implement `IRemoteRepository<T>` adaptor; repositories delegate to remote or local based on sync state |
| New platform tier | Add feature flags for tier capabilities; configure via server-side flag resolution |

---

## 2. Folder Structure

```
artifacts/lifepilot/
├── public/
│   ├── icons/                        PWA icons (icon-192.png, icon-512.png)
│   ├── offline.html                  Offline fallback page
│   └── robots.txt
│
├── src/
│   ├── app/
│   │   ├── ErrorBoundary.tsx         Top-level React error boundary
│   │   ├── AppProviders.tsx          i18n + theme + locale providers
│   │   └── App.tsx                   Root router + lazy module loading
│   │
│   ├── core/
│   │   ├── events/
│   │   │   ├── eventBus.ts           Singleton event bus (pub/sub, typed)
│   │   │   ├── events.ts             All 30+ event type declarations + payloads
│   │   │   └── index.ts              Barrel export
│   │   ├── featureflags/
│   │   │   ├── featureFlags.ts       FeatureFlagService (resolve, override, reset)
│   │   │   ├── flags.ts              FLAG_DEFINITIONS: all 25 flags with wave + defaults
│   │   │   └── index.ts              Barrel export
│   │   ├── diagnostics/
│   │   │   ├── diagnostics.ts        DiagnosticsService (ring buffer, severity levels)
│   │   │   └── index.ts              Barrel export
│   │   ├── versioning/
│   │   │   └── version.ts            AppVersion: schema + app version; migration detection
│   │   └── config/
│   │       └── appConfig.ts          AppConfig: env resolution, defaults
│   │
│   ├── domain/                       (alias: src/types — domain is the canonical term)
│   │   └── → src/types/index.ts      232 entity interfaces, 124 enumerations
│   │
│   ├── storage/
│   │   ├── db.ts                     LifePilotDatabase (Dexie subclass, schema v11, 50+ tables)
│   │   ├── storageService.ts         Service layer: orchestrates repos, validates, emits events
│   │   └── repositories/
│   │       ├── contracts/
│   │       │   └── IRepository.ts    IRepository<T>, IFilterableRepository<T>, IPilotScopedRepository<T>
│   │       ├── base/
│   │       │   └── BaseRepository.ts BaseRepository<T> + BasePilotScopedRepository<T>
│   │       ├── PilotRepository.ts
│   │       ├── GoalRepository.ts           (FlightPlanGoal)
│   │       ├── MissionRepository.ts        (Mission + MissionCompletion)
│   │       ├── ReflectionRepository.ts     (Reflection)
│   │       ├── FutureLetterRepository.ts   (FutureLetter)
│   │       ├── CareerRepository.ts         (Career + CareerExploration + CareerRoadmap)
│   │       ├── FinanceRepository.ts        (FinancialConcept + FinancialLessonProgress)
│   │       ├── NotificationRepository.ts   (Notification)
│   │       ├── ActivityEventRepository.ts  (ActivityEvent)
│   │       ├── HabitRepository.ts          (Habit + HabitActivity)
│   │       ├── ContentRepository.ts        (ContentItem + LearningPath)
│   │       └── index.ts                    Barrel export
│   │
│   ├── events/                       (alias → src/core/events)
│   │
│   ├── modules/
│   │   ├── cockpit/
│   │   │   ├── pages/CockpitPage.tsx
│   │   │   ├── components/
│   │   │   └── hooks/useCockpit.ts
│   │   ├── pilot/
│   │   │   ├── pages/PilotPage.tsx
│   │   │   ├── components/
│   │   │   └── hooks/usePilot.ts
│   │   ├── flightplan/
│   │   │   ├── pages/FlightPlanPage.tsx
│   │   │   ├── components/
│   │   │   └── hooks/useFlightPlan.ts
│   │   ├── flightlog/
│   │   │   ├── pages/FlightLogPage.tsx
│   │   │   ├── components/
│   │   │   └── hooks/useFlightLog.ts
│   │   ├── futureme/
│   │   │   ├── pages/FutureMePage.tsx
│   │   │   ├── components/
│   │   │   └── hooks/useFutureMe.ts
│   │   ├── careerexplorer/
│   │   │   ├── pages/CareerExplorerPage.tsx
│   │   │   ├── components/
│   │   │   └── hooks/useCareerExplorer.ts
│   │   ├── moneyquest/
│   │   │   ├── pages/MoneyQuestPage.tsx
│   │   │   ├── components/
│   │   │   └── hooks/useMoneyQuest.ts
│   │   └── lifechoices/
│   │       ├── pages/LifeChoicesPage.tsx
│   │       ├── components/
│   │       └── hooks/useLifeChoices.ts
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── OfflineIndicator.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── layout/
│   │   │   └── AppShell.tsx          Header + sidebar + bottom nav shell
│   │   ├── navigation/
│   │   │   ├── Sidebar.tsx           Desktop navigation
│   │   │   └── BottomNav.tsx         Mobile navigation
│   │   └── ui/                       shadcn/ui primitives (Button, Dialog, etc.)
│   │
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   ├── useLocale.ts
│   │   ├── useOfflineStatus.ts
│   │   └── useFeature.ts             Reads featureFlags.isEnabled(key)
│   │
│   ├── localization/
│   │   ├── i18n.ts                   i18next config + SUPPORTED_LANGUAGES
│   │   └── locales/
│   │       ├── en.json               SOURCE OF TRUTH (all other locales mirror this)
│   │       ├── hi.json               Hindi
│   │       ├── ta.json               Tamil
│   │       ├── te.json               Telugu
│   │       ├── kn.json               Kannada
│   │       ├── ml.json               Malayalam
│   │       ├── mr.json               Marathi
│   │       ├── bn.json               Bengali
│   │       ├── gu.json               Gujarati
│   │       └── pa.json               Punjabi
│   │
│   ├── pages/                        Route-level page stubs (pre-module build)
│   │
│   ├── shared/
│   │   └── constants/
│   │       └── index.ts              APP_NAME, ROUTES, STORAGE_KEYS, PILOT, CONTENT, PAGINATION
│   │
│   ├── theme/
│   │   ├── tokens.ts                 MODULES array with id, i18nId, path, icon, color
│   │   └── designTokens.ts           COLOR, TYPOGRAPHY, SPACING, RADIUS, SHADOW, MOTION, Z_INDEX
│   │
│   ├── types/
│   │   └── index.ts                  232 entity interfaces, 124 enumerations (zero imports)
│   │
│   └── utils/
│       └── index.ts                  cn(), formatDate, formatRelativeDate, truncate
│
├── tests/
│   ├── setup.ts                      Global Vitest setup
│   ├── utils.tsx                     Test render helpers, MockLifePilotDatabase class
│   ├── storage.test.ts               storageService integration tests
│   ├── hooks.test.ts                 Custom hook tests
│   └── localization.test.ts          i18n coverage tests
│
├── docs/
│   ├── adr/
│   │   ├── ADR-001-React.md
│   │   ├── ADR-002-OfflineFirst.md
│   │   ├── ADR-003-Dexie.md
│   │   ├── ADR-004-LocalizationFirst.md
│   │   ├── ADR-005-DomainDrivenDesign.md
│   │   ├── ADR-006-FeatureFlags.md
│   │   └── ADR-007-EventArchitecture.md
│   ├── Architecture.md
│   ├── ArchitectureReviewPack.md     ← THIS DOCUMENT
│   ├── RepositoryGuide.md
│   ├── FeatureFlags.md
│   ├── LocalizationGuide.md
│   ├── AccessibilityGuide.md
│   ├── StorageGuide.md
│   ├── FutureExpansionGuide.md
│   ├── TestingGuide.md
│   └── VersionLog.md
│
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── package.json
└── index.html
```

---

## 3. Domain Layer

**Source of truth**: `src/types/index.ts` — 232 entity interfaces, 124 enumerations. Zero imports. Zero business logic.

### 3.1 Core Domain

#### Pilot
**Purpose**: The primary user entity. One child or teenager = one Pilot.  
**Primary Key**: `id` (auto-increment)  
**Foreign Keys**: None (root aggregate)  
**Relationships**: One Pilot → many of everything else  
**Dependencies**: None

**Fields**: `id, name, dateOfBirth, age, grade, school?, city?, state?, languageCode, theme, avatarUrl?, xp, level, streak, lastActiveAt, isActive, createdAt, updatedAt`

#### Settings
**Purpose**: Per-pilot application preferences.  
**PK**: `id`  
**FK**: `pilotId → Pilot`  
**Relationships**: One-to-one with Pilot  
**Fields**: `id, pilotId, notifications, theme, language, accessibility, privacy, createdAt, updatedAt`

#### LanguagePreference
**Purpose**: Tracks the pilot's chosen interface language.  
**PK**: `id`  
**FK**: `pilotId → Pilot`

---

### 3.2 Growth Domain

#### Competency
**Purpose**: A skill or character trait the pilot is developing (pilot-owned, legacy model).  
**PK**: `id` | **FK**: `pilotId → Pilot`  
**Relationships**: → CompetencyPractice, → GrowthEvidence

#### CompetencyPractice
**Purpose**: A recorded practice session for a competency.  
**PK**: `id` | **FK**: `competencyId → Competency`, `pilotId → Pilot`  
**Note**: `pilotCompetencyId` links to the catalog model (v0.1.2+)

#### GrowthEvidence
**Purpose**: Evidence artefact attached to a competency (reflection, achievement, peer feedback).  
**PK**: `id` | **FK**: `pilotId → Pilot`, `competencyId?, pilotCompetencyId?, goalId?`

#### Achievement
**Purpose**: An unlocked badge or milestone.  
**PK**: `id` | **FK**: `pilotId → Pilot`

#### Habit
**Purpose**: A recurring behaviour the pilot commits to track.  
**PK**: `id` | **FK**: `pilotId → Pilot`  
**Relationships**: → HabitActivity

#### HabitActivity
**Purpose**: A single logged completion of a habit.  
**PK**: `id` | **FK**: `habitId → Habit`, `pilotId → Pilot`

#### Mission
**Purpose**: A short-term platform-issued challenge (catalogue — no pilotId).  
**PK**: `id`  
**Relationships**: → MissionCompletion

#### MissionCompletion
**Purpose**: Records that a pilot completed a specific mission.  
**PK**: `id` | **FK**: `pilotId → Pilot`, `missionId → Mission`

#### CompetencyCatalog
**Purpose**: Platform-defined competency catalogue (v0.1.2+, replaces pilot-owned Competency for new data).  
**PK**: `id`  
**Relationships**: → PilotCompetency

#### PilotCompetency
**Purpose**: A pilot's adoption of a catalogue competency with their self-assessment.  
**PK**: `id` | **FK**: `pilotId → Pilot`, `catalogId → CompetencyCatalog`

---

### 3.3 Reflection Domain

#### FlightLogEntry
**Purpose**: A journal entry (the day's experience, mood, thoughts).  
**PK**: `id` | **FK**: `pilotId → Pilot`, `linkedGoalId? → FlightPlanGoal`  
**Relationships**: → Reflection

#### Reflection
**Purpose**: A structured prompt-answer pair linked to an entry or goal.  
**PK**: `id` | **FK**: `pilotId → Pilot`, `linkedGoalId?, linkedEntryId?`

#### DecisionJournal
**Purpose**: Records a decision the pilot made, for later reflection.  
**PK**: `id` | **FK**: `pilotId → Pilot`  
**Relationships**: → DecisionOutcome

#### DecisionOutcome
**Purpose**: The later-recorded outcome of a journalled decision.  
**PK**: `id` | **FK**: `pilotId → Pilot`, `journalId → DecisionJournal`

#### RelationshipReflection
**Purpose**: Reflections on a relationship (parent, friend, mentor).  
**PK**: `id` | **FK**: `pilotId → Pilot`

#### DecisionRecord (v0.1.2)
**Purpose**: Structured decision log with options, criteria, and outcome tracking.  
**PK**: `id` | **FK**: `pilotId → Pilot`

---

### 3.4 Future Domain

#### FutureVision
**Purpose**: A long-range aspiration the pilot articulates (who they want to be).  
**PK**: `id` | **FK**: `pilotId → Pilot`  
**Relationships**: → FutureMilestone

#### FutureMilestone
**Purpose**: A checkpoint on the path to a FutureVision.  
**PK**: `id` | **FK**: `pilotId → Pilot`, `visionId? → FutureVision`

#### FutureLetter
**Purpose**: A letter written to one's future self, with a scheduled delivery date.  
**PK**: `id` | **FK**: `pilotId → Pilot`  
**Key fields**: `deliverAt: Date, delivered: boolean, deliveredAt?: Date`

#### FutureIdentity (v0.1.2)
**Purpose**: A modelled future version of the pilot (age, archetype, characteristics).  
**PK**: `id` | **FK**: `pilotId → Pilot`

#### FlightPlanGoal
**Purpose**: A structured goal with category, progress tracking, and optional milestones (JSON).  
**PK**: `id` | **FK**: `pilotId → Pilot`  
**Key fields**: `category: GoalCategory, status, progress: number, targetDate?`

---

### 3.5 Career Domain

#### Career
**Purpose**: A career option in the catalogue (no pilotId — shared across all pilots).  
**PK**: `id`  
**Relationships**: → CareerSkill, → CareerExploration, → CareerRoadmap

#### CareerSkill
**Purpose**: A skill associated with a specific career.  
**PK**: `id` | **FK**: `careerId → Career`

#### CareerExploration
**Purpose**: Records that a pilot has explored a career (with interest rating and notes).  
**PK**: `id` | **FK**: `pilotId → Pilot`, `careerId → Career`

#### CareerRoadmap
**Purpose**: A catalogue roadmap for a career path (no pilotId — shared).  
**PK**: `id` | **FK**: `careerId → Career`  
**Relationships**: → CareerRoadmapStep

#### CareerRoadmapStep
**Purpose**: One step on a career roadmap (ordered, with estimated age).  
**PK**: `id` | **FK**: `roadmapId → CareerRoadmap`

#### PilotCompetency (cross-domain)
Appears in both Growth and Career contexts. See Growth domain.

---

### 3.6 Finance Domain

#### FinancialConcept
**Purpose**: A financial literacy topic (budgeting, saving, investing — catalogue).  
**PK**: `id`  
**Key fields**: `type: FinancialConceptType, difficulty, content, xpReward?`

#### FinancialLessonProgress
**Purpose**: Tracks a pilot's completion of a financial concept lesson.  
**PK**: `id` | **FK**: `pilotId → Pilot`, `conceptId → FinancialConcept`

#### LifeChoiceScenario
**Purpose**: A values-based decision scenario (catalogue).  
**PK**: `id`  
**Relationships**: → LifeChoiceOption, → LifeChoiceOutcome

#### LifeChoiceOption
**Purpose**: One option within a LifeChoiceScenario.  
**PK**: `id` | **FK**: `scenarioId → LifeChoiceScenario`

#### LifeChoiceOutcome
**Purpose**: Records the pilot's choice and its consequences.  
**PK**: `id` | **FK**: `pilotId → Pilot`, `scenarioId → LifeChoiceScenario`

---

### 3.7 Content Domain

#### ContentItem
**Purpose**: A reusable piece of structured content (article, video, quiz).  
**PK**: `id`  
**Key fields**: `category, difficulty, language: SupportedLanguage, status, version`  
**Relationships**: linked to Career, Mission, Reflection, FinancialConcept via optional FK fields

#### LearningPath
**Purpose**: A curated sequence of content items for a topic.  
**PK**: `id`  
**Relationships**: → LearningPathStep

#### LearningPathStep
**Purpose**: One content item in a learning path at a specific sequence position.  
**PK**: `id` | **FK**: `learningPathId → LearningPath`, `contentId → ContentItem`

#### PilotLearningPath
**Purpose**: A pilot's progress through a learning path.  
**PK**: `id` | **FK**: `pilotId → Pilot`, `learningPathId → LearningPath`

#### ContentRevision
**Purpose**: Version-tracks changes to content items for offline sync.  
**PK**: `id` | **FK**: `contentItemId → ContentItem`

#### CultureStory
**Purpose**: A cultural story or parable from Indian tradition, used in lessons.  
**PK**: `id`

#### TimelineEvent
**Purpose**: A historical or cultural event on a pilot's timeline of learning.  
**PK**: `id`

---

### 3.8 Premium Domain (Wave 2+)

#### SubscriptionPlan
**Purpose**: Defines the features and price of a subscription tier.  
**PK**: `id`

#### PilotSubscription
**Purpose**: A pilot's active or historical subscription.  
**PK**: `id` | **FK**: `pilotId → Pilot`, `planId → SubscriptionPlan`

#### Badge
**Purpose**: A visual badge earned by a pilot.  
**PK**: `id` | **FK**: `pilotId → Pilot`

#### Certificate
**Purpose**: A completion certificate earned by a pilot.  
**PK**: `id` | **FK**: `pilotId → Pilot`

---

### 3.9 Parent Domain (Wave 2+)

#### CoPilot
**Purpose**: A parent or mentor linked to a pilot.  
**PK**: `id` | **FK**: `pilotId → Pilot`

#### ConversationStarter
**Purpose**: A prompt for a parent-child conversation.  
**PK**: `id` | **FK**: `pilotId → Pilot`, `coPilotId? → CoPilot`

#### FamilyChallenge
**Purpose**: A shared goal or activity for pilot + co-pilot.  
**PK**: `id`  
**Relationships**: → FamilyChallengeParticipant

---

### 3.10 School Domain (Wave 4+)

#### School
**Purpose**: An educational institution in the platform.  
**PK**: `id`

#### Teacher
**Purpose**: An educator at a school.  
**PK**: `id` | **FK**: `schoolId → School`

#### Classroom
**Purpose**: A class or section within a school.  
**PK**: `id` | **FK**: `schoolId → School`, `teacherId → Teacher`

#### Program
**Purpose**: A structured curriculum programme offered by a school.  
**PK**: `id` | **FK**: `schoolId → School`

#### Enrollment
**Purpose**: A pilot's enrollment in a school programme.  
**PK**: `id` | **FK**: `pilotId → Pilot`, `programId → Program`

---

### 3.11 Enterprise Domain (Wave 5+)

#### Tenant
**Purpose**: An enterprise customer (organisation) in a multi-tenant deployment.  
**PK**: `id`

#### Organization
**Purpose**: A sub-unit within a tenant (business unit, department).  
**PK**: `id` | **FK**: `tenantId → Tenant`

#### Deployment
**Purpose**: A configured instance of LifePilot for an enterprise tenant.  
**PK**: `id` | **FK**: `tenantId → Tenant`

---

### 3.12 AI Domain (Wave 6+)

#### AIConversation
**Purpose**: A coaching session between a pilot and the AI Coach.  
**PK**: `id` | **FK**: `pilotId → Pilot`

#### AIRecommendation
**Purpose**: A personalised content or action recommendation from the AI.  
**PK**: `id` | **FK**: `pilotId → Pilot`

#### AIInsight
**Purpose**: A pattern or insight surfaced by the AI from the pilot's data.  
**PK**: `id` | **FK**: `pilotId → Pilot`

---

## 4. Repository Layer

All repositories live in `src/storage/repositories/`. They extend `BaseRepository<T>` or `BasePilotScopedRepository<T>` and implement `IRepository<T>` / `IFilterableRepository<T>`.

### 4.1 Base Contract (IRepository)

| Method | Signature |
|--------|-----------|
| `getById` | `(id) → T \| undefined` |
| `getAll` | `() → T[]` |
| `create` | `(Omit<T, "id">) → id` |
| `update` | `(id, Partial<T>) → void` |
| `delete` | `(id) → void` |
| `count` | `() → number` |
| `exists` | `(id) → boolean` |
| `findWhere` | `((T) → boolean) → T[]` |

`BasePilotScopedRepository<T>` adds:
- `getAllForPilot(pilotId) → T[]`
- `countForPilot(pilotId) → number`
- `deleteAllForPilot(pilotId) → void`

---

### 4.2 Repository Inventory

#### PilotRepository
**Responsibilities**: CRUD for Pilot; activation/deactivation; lookup by active status  
**Dexie table**: `db.pilots`  
**Scope**: Global (not pilot-scoped — root entity)  
**Domain queries**: `getActive()`, `getByLanguage(code)`, `updateXP(id, xp)`, `updateStreak(id, streak)`  
**Future extension**: In Wave 2, delegates reads to server if pilot is authenticated and online

---

#### GoalRepository
**Responsibilities**: CRUD for FlightPlanGoal; active/completed/abandoned filtering; category filtering; progress updates  
**Dexie table**: `db.flightPlanGoals`  
**Scope**: Pilot-scoped  
**Domain queries**: `getActiveForPilot(pilotId)`, `getCompletedForPilot(pilotId)`, `getByCategory(pilotId, category)`, `updateProgress(id, progress)`  
**Future extension**: Add `getByDateRange()` for analytics wave

---

#### MissionRepository
**Responsibilities**: CRUD for Mission (catalogue); filter by status, category, difficulty  
**Dexie table**: `db.missions`  
**Scope**: Global (catalogue)  
**Domain queries**: `getAvailable()`, `getByStatus(status)`, `getByCategory(category)`, `getByDifficulty(difficulty)`  
**Note**: Mission has no `pilotId`. Use `MissionCompletionRepository` for pilot engagement.

#### MissionCompletionRepository
**Responsibilities**: Record and query mission completions per pilot; XP totals  
**Dexie table**: `db.missionCompletions`  
**Scope**: Pilot-scoped  
**Domain queries**: `getForMission(pilotId, missionId)`, `hasCompleted(pilotId, missionId)`, `getTotalXpEarned(pilotId)`  
**Future extension**: Sync completions to server for cross-device persistence

---

#### ReflectionRepository
**Responsibilities**: CRUD for Reflection; date-range queries; type filtering; reflection streak calculation  
**Dexie table**: `db.reflections`  
**Scope**: Pilot-scoped  
**Domain queries**: `getByType(pilotId, type)`, `getRecent(pilotId, limit)`, `getForDateRange(pilotId, from, to)`, `getForGoal(pilotId, goalId)`, `getStreak(pilotId)`  
**Future extension**: Feed reflections to AI Coach for pattern analysis

---

#### FutureLetterRepository
**Responsibilities**: CRUD for FutureLetter; delivery readiness detection; delivered/undelivered filtering  
**Dexie table**: `db.futureLetters`  
**Scope**: Pilot-scoped  
**Domain queries**: `getUndelivered(pilotId)`, `getReadyToDeliver(pilotId)`, `getDelivered(pilotId)`, `markDelivered(id)`  
**Key note**: Uses `deliverAt` / `delivered` / `deliveredAt` (NOT `openOnDate` / `isOpened`)  
**Future extension**: Server-side scheduled delivery notifications (Wave 2)

---

#### CareerRepository
**Responsibilities**: CRUD for Career catalogue; category/title search; offline availability filter  
**Dexie table**: `db.careers`  
**Scope**: Global (catalogue)  
**Domain queries**: `getByCategory(category)`, `searchByTitle(query)`, `getOfflineAvailable()`

#### CareerExplorationRepository
**Responsibilities**: Records a pilot's exploration of a career; interest ratings; recent explorations  
**Dexie table**: `db.careerExplorations`  
**Scope**: Pilot-scoped  
**Domain queries**: `getForCareer(pilotId, careerId)`, `getRecent(pilotId, limit)`

#### CareerRoadmapRepository
**Responsibilities**: CRUD for CareerRoadmap catalogue; retrieve ordered steps  
**Dexie table**: `db.careerRoadmaps`  
**Scope**: Global (catalogue)  
**Domain queries**: `getForCareer(careerId)`, `getSteps(roadmapId)`  
**Key note**: CareerRoadmap has no `pilotId` — it is a shared catalogue entity

---

#### FinancialConceptRepository
**Responsibilities**: CRUD for FinancialConcept catalogue; type/difficulty filtering; search  
**Dexie table**: `db.financialConcepts`  
**Scope**: Global (catalogue)  
**Domain queries**: `getByType(type)`, `getByDifficulty(difficulty)`, `search(query)`

#### FinancialLessonProgressRepository
**Responsibilities**: Tracks per-pilot progress through financial lessons; completion count  
**Dexie table**: `db.financialLessonProgress`  
**Scope**: Pilot-scoped  
**Domain queries**: `getForConcept(pilotId, conceptId)`, `getCompleted(pilotId)`, `countCompleted(pilotId)`

---

#### NotificationRepository
**Responsibilities**: CRUD for Notification; status management; unread tracking  
**Dexie table**: `db.notifications`  
**Scope**: Pilot-scoped  
**Domain queries**: `getScheduled(pilotId)`, `getByStatus(pilotId, status)`, `getByType(pilotId, type)`, `markRead(id)`, `getUnread(pilotId)`, `countUnread(pilotId)`  
**Status values**: `scheduled | delivered | read | dismissed`

---

#### ActivityEventRepository
**Responsibilities**: Append-only audit log of domain events per pilot; type/entity queries; date-range queries  
**Dexie table**: `db.activityEvents`  
**Scope**: Pilot-scoped  
**Domain queries**: `getRecentForPilot(pilotId, limit)`, `getByEventType(pilotId, type)`, `getForEntity(pilotId, entityType, entityId)`, `getForDateRange(pilotId, from, to)`, `countByType(pilotId, type)`  
**Note**: Uses `createdAt` (NOT `occurredAt` — does not exist on this entity)

---

#### HabitRepository
**Responsibilities**: CRUD for Habit; active habit filtering; category filtering; activity logging; streak reads  
**Dexie tables**: `db.habits`, `db.habitActivities`  
**Scope**: Pilot-scoped  
**Domain queries**: `getActiveForPilot(pilotId)`, `getByCategory(pilotId, category)`, `getActivities(habitId)`, `getActivitiesForPilot(pilotId, limit)`, `logActivity(activity)`, `getCurrentStreak(habitId)`  
**Key note**: `HabitActivity` is the correct entity name (`HabitEntry` does not exist)

---

#### ContentRepository
**Responsibilities**: CRUD for ContentItem catalogue; category/difficulty/language/status filtering; title search  
**Dexie table**: `db.contentItems`  
**Scope**: Global (catalogue)  
**Domain queries**: `getByCategory(category)`, `getByDifficulty(difficulty)`, `getByLanguage(language)`, `getByStatus(status)`, `searchByTitle(query)`

#### LearningPathRepository
**Responsibilities**: CRUD for LearningPath catalogue; step retrieval  
**Dexie tables**: `db.learningPaths`, `db.learningPathSteps`  
**Scope**: Global (catalogue)  
**Domain queries**: `getByCategory(category)`, `getByDifficulty(difficulty)`, `getSteps(learningPathId)`  
**Key note**: `LearningPathStep` is the correct entity name; table is `db.learningPathSteps`

---

## 5. Database Layer

### 5.1 Technology

**Dexie.js v4** — TypeScript-first IndexedDB abstraction.  
**Current schema version**: 11  
**Total tables**: 52

### 5.2 Table Inventory (Schema v11)

| Table | Entity | Scope |
|-------|--------|-------|
| `pilots` | `Pilot` | — |
| `settings` | `Settings` | Pilot |
| `languagePreferences` | `LanguagePreference` | Pilot |
| `flightPlanGoals` | `FlightPlanGoal` | Pilot |
| `flightLogEntries` | `FlightLogEntry` | Pilot |
| `reflections` | `Reflection` | Pilot |
| `futureVisions` | `FutureVision` | Pilot |
| `futureMilestones` | `FutureMilestone` | Pilot |
| `futureLetters` | `FutureLetter` | Pilot |
| `competencies` | `Competency` | Pilot |
| `competencyPractices` | `CompetencyPractice` | Pilot |
| `growthEvidence` | `GrowthEvidence` | Pilot |
| `achievements` | `Achievement` | Pilot |
| `missions` | `Mission` | Global |
| `missionCompletions` | `MissionCompletion` | Pilot |
| `habits` | `Habit` | Pilot |
| `habitActivities` | `HabitActivity` | Pilot |
| `careers` | `Career` | Global |
| `careerSkills` | `CareerSkill` | Global |
| `careerExplorations` | `CareerExploration` | Pilot |
| `financialConcepts` | `FinancialConcept` | Global |
| `financialLessonProgress` | `FinancialLessonProgress` | Pilot |
| `lifeChoiceScenarios` | `LifeChoiceScenario` | Global |
| `lifeChoiceOptions` | `LifeChoiceOption` | Global |
| `lifeChoiceOutcomes` | `LifeChoiceOutcome` | Pilot |
| `coPilots` | `CoPilot` | Pilot |
| `conversationStarters` | `ConversationStarter` | Pilot |
| `decisionJournals` | `DecisionJournal` | Pilot |
| `decisionOutcomes` | `DecisionOutcome` | Pilot |
| `lifeProjects` | `LifeProject` | Pilot |
| `lifeProjectMilestones` | `LifeProjectMilestone` | Pilot |
| `lifeRoles` | `LifeRole` | Pilot |
| `values` | `Value` | Pilot |
| `valuePractices` | `ValuePractice` | Pilot |
| `cultureStories` | `CultureStory` | Global |
| `timelineEvents` | `TimelineEvent` | Global |
| `contentItems` | `ContentItem` | Global |
| `learningPaths` | `LearningPath` | Global |
| `learningPathSteps` | `LearningPathStep` | Global |
| `pilotLearningPaths` | `PilotLearningPath` | Pilot |
| `subscriptionPlans` | `SubscriptionPlan` | Global |
| `pilotSubscriptions` | `PilotSubscription` | Pilot |
| `badges` | `Badge` | Pilot |
| `certificates` | `Certificate` | Pilot |
| `familyChallenges` | `FamilyChallenge` | Global |
| `familyChallengeParticipants` | `FamilyChallengeParticipant` | Pilot |
| `schools`, `teachers`, `classrooms`, `programs`, `enrollments`, `participations` | School entities | Wave 4 |
| `tenants`, `organizations`, `deployments` | Enterprise entities | Wave 5 |
| `aiConversations`, `aiRecommendations`, `aiInsights` | AI entities | Wave 6 |
| `activityEvents` | `ActivityEvent` | Pilot |
| `notifications` | `Notification` | Pilot |
| `careerRoadmaps`, `careerRoadmapSteps` | Career roadmap | Global |
| `competencyCatalog`, `pilotCompetencies` | Growth catalog | Global/Pilot |
| `valueCatalog`, `pilotValues` | Values catalog | Global/Pilot |
| `contentRevisions` | `ContentRevision` | Global |
| `pilotIdentity` | `PilotIdentity` | Pilot |
| `lifeExperiences` | `LifeExperience` | Pilot |
| `lifeChapters` | `LifeChapter` | Pilot |
| `decisionRecords` | `DecisionRecord` | Pilot |
| `relationshipReflections` | `RelationshipReflection` | Pilot |
| `strengthCatalog`, `pilotStrengths` | Strength catalog | Global/Pilot |
| `purposeStatements` | `PurposeStatement` | Pilot |
| `impactEvidence` | `ImpactEvidence` | Pilot |
| `futureIdentities` | `FutureIdentity` | Pilot |
| `lifeWheelSnapshots` | `LifeWheelSnapshot` | Pilot |
| `lifeStateSnapshots` | `LifeStateSnapshot` | Pilot |

### 5.3 Versioning Strategy

Schema versions are declared in **descending order** (newest first) in `db.ts`. This makes the current schema immediately visible at the top of the file.

```
version(11) → current schema (all Wave 0 tables)
version(10) → previous iteration
...
version(1)  → initial schema
```

**Rule**: Every schema change increments the version. Dexie handles the migration automatically on database open.

### 5.4 Migration Strategy

All migrations are **additive only**. Columns are never renamed or deleted.

| Allowed | Prohibited |
|---------|-----------|
| Adding new tables | Dropping tables |
| Adding new indexed columns | Renaming columns |
| Adding new compound indexes | Changing primary key type |
| Writing `.upgrade()` to set defaults | Removing indexes |

`.upgrade(tx)` callbacks set default values for new columns on existing records.

### 5.5 Index Strategy

| Pattern | Indexed field example | Purpose |
|---------|----------------------|---------|
| Primary key | `++id` | Auto-increment, O(log n) lookup |
| Foreign key | `pilotId` | Fast pilot-scoped queries |
| Status | `status` | Filter by lifecycle state |
| Compound | `[pilotId+status]` | Filter by pilot AND status without full scan |
| Category | `category` | Content/career catalogue filtering |
| Language | `language` | Locale-specific content retrieval |

**Boolean index limitation**: IndexedDB cannot index booleans. `isActive`, `delivered`, `completed` are stored as `true/false` but filtered in application code (`.filter()`), or stored as `0/1` for indexed use with `.where("isActive").equals(1)`.

### 5.6 Offline Storage Strategy

| Layer | Technology | Scope |
|-------|-----------|-------|
| App shell (HTML/CSS/JS) | Workbox + service worker | Cached on install |
| Static assets | Workbox cache-first | Cached on first access |
| Domain data | IndexedDB (Dexie) | Persisted on write |
| Fonts | Workbox cache-first | Cached on first use |
| Images | Workbox stale-while-revalidate | Cached, refreshed in background |

Storage limit guidance communicated to users on first launch: "Your data lives on this device. Clearing browser data removes it."

### 5.7 Future Cloud Sync Strategy (Wave 2)

```
Write to IndexedDB
     ↓
SyncQueue entry created (with operation: create/update/delete, entityType, entityId)
     ↓  (when online)
Service worker BackgroundSync fires
     ↓
REST API write (POST/PATCH/DELETE)
     ↓
SyncQueue entry cleared
```

**Conflict resolution**: Last-write-wins on `updatedAt` timestamp. The local copy is always the source of truth for reads. The server copy is the authoritative backup for cross-device sync.

### 5.8 Future Multi-Tenant Strategy (Wave 4+)

On the server side, all data is partitioned by `tenantId`. School and enterprise tables carry `tenantId` at the row level, enforced by row-level security (PostgreSQL RLS in Wave 2+). The IndexedDB schema already has `schoolId`, `tenantId`, and `organizationId` fields on relevant entities for eventual propagation from the server.

---

## 6. Event Architecture

### 6.1 Event Bus Design

**Type**: Synchronous, in-process, singleton pub/sub  
**Location**: `src/core/events/eventBus.ts`  
**Dependencies**: Zero npm dependencies  
**Persistence**: In-memory ring buffer (last 100 events) for diagnostic inspection  
**Guarantee**: At-most-once delivery (no retry); handlers are isolated (one handler failure does not affect others)

```
Publisher (storageService)
    │  eventBus.publish("GoalCompleted", payload)
    ↓
EventBus
    │  Iterates handlers registered for "GoalCompleted"
    │  Catches and logs any handler error
    ↓
Handler 1 (XP service)  →  awards XP to pilot
Handler 2 (Cockpit hook) → refreshes progress summary
Handler 3 (ActivityEvent repo) → appends audit record
```

### 6.2 Event Types (Wave 0 — declared)

**Goal Events**
- `GoalCreated` | `GoalUpdated` | `GoalCompleted` | `GoalAbandoned`

**Mission Events**
- `MissionStarted` | `MissionCompleted` | `MissionFailed`

**Reflection Events**
- `ReflectionCreated` | `ReflectionUpdated`

**Future Me Events**
- `FutureLetterCreated` | `FutureLetterDelivered`

**Career Events**
- `CareerExplored` | `CareerBookmarked`

**Learning Events**
- `LessonStarted` | `LessonCompleted`

**Habit Events**
- `HabitCompleted` | `HabitStreakAchieved`

**Pilot Events**
- `PilotCreated` | `PilotUpdated`

**Notification Events**
- `NotificationDelivered` | `NotificationDismissed`

**Platform Events**
- `AppInitialised` | `OfflineDetected` | `OnlineRestored` | `SettingsChanged`

**Infrastructure Events**
- `StorageError` | `SchemaMigrated` | `FeatureFlagChanged`

### 6.3 Event Producers

| Producer | Events published |
|---------|------------------|
| `storageService.ts` | All domain events (goal, mission, reflection, habit, career, letter) |
| `db.ts` | `SchemaMigrated` |
| `featureFlags.ts` | `FeatureFlagChanged` |
| `AppProviders.tsx` | `AppInitialised` |
| `useOfflineStatus.ts` | `OfflineDetected`, `OnlineRestored` |

### 6.4 Event Consumers

| Consumer | Events consumed |
|---------|----------------|
| XP service (planned) | `GoalCompleted`, `MissionCompleted`, `HabitCompleted`, `LessonCompleted`, `ReflectionCreated`, `FutureLetterCreated` |
| Cockpit hooks | `GoalCompleted`, `MissionCompleted`, `HabitCompleted` |
| ActivityEventRepository | All domain events (appends audit record) |
| Diagnostics | `StorageError`, `SchemaMigrated` |
| Notification service | `GoalCompleted`, `HabitStreakAchieved`, `FutureLetterDelivered` |

### 6.5 Dependency Flow

```
Domain Events flow in one direction only:

storageService (produces)
    → eventBus (routes)
        → hooks / UI (consumes)
        → ActivityEvent repo (appends)
        → XP service (awards)

NO circular event chains permitted.
NO component publishes events directly.
NO event handler publishes another event synchronously.
```

### 6.6 Future AI Integration Points (Wave 6)

The event bus provides the primary AI integration surface:
- AI Coach subscribes to `ReflectionCreated`, `GoalCompleted`, `LessonCompleted` to generate personalised prompts
- AI recommendations are injected as `AIRecommendationGenerated` events consumed by the Cockpit module
- AI responses from server are pushed via WebSocket and injected into the local bus as events — components do not need to know the origin is remote

---

## 7. Feature Flags

### 7.1 Architecture

**Service**: `src/core/featureflags/featureFlags.ts` — `FeatureFlagService` singleton  
**Definitions**: `src/core/featureflags/flags.ts` — `FLAG_DEFINITIONS` with key, default, wave, description  
**Resolution order**:
1. `localStorage` override (development only — stripped in production)
2. Server-side assignment (Wave 2+ for premium/school/enterprise users)
3. Default from `FLAG_DEFINITIONS`

**Type safety**: `FeatureFlagKey` is a TypeScript union literal — invalid keys are caught at compile time.

### 7.2 Enabled Features (Wave 0 defaults)

| Flag Key | Module | Default |
|----------|--------|---------|
| `cockpit` | Cockpit / Dashboard | ✅ enabled |
| `pilot` | My Profile | ✅ enabled |
| `flightPlan` | Goals | ✅ enabled |
| `flightLog` | Journal / Reflection | ✅ enabled |
| `futureMe` | Future Self Letters | ✅ enabled |
| `careerExplorer` | Career Discovery | ✅ enabled |
| `moneyQuest` | Financial Literacy | ✅ enabled |
| `lifeChoices` | Values / Decisions | ✅ enabled |

### 7.3 Disabled Features (Wave 0 defaults — will enable in stated wave)

| Flag Key | Module | Enable Wave |
|----------|--------|------------|
| `parentCompanion` | Parent / CoPilot | Wave 2 |
| `premiumLearningPaths` | Premium content packs | Wave 2 |
| `cloudSync` | Cross-device sync | Wave 2 |
| `parentalConsent` | DPDP parental consent flow | Wave 1 |
| `contentModeration` | First-party content moderation | Wave 1 |
| `dataExport` | JSON data backup | Wave 1 |
| `schoolEdition` | School tenant mode | Wave 4 |
| `analyticsExport` | School cohort analytics | Wave 4 |
| `enterpriseEdition` | Enterprise multi-tenant | Wave 5 |
| `csrMode` | CSR branding / reporting | Wave 5 |
| `multiTenant` | Multi-tenant server isolation | Wave 5 |
| `aiCoach` | AI Coaching | Wave 6 |
| `contentMarketplace` | Third-party content | Wave 6 |

### 7.4 Developer / Debug Flags

| Flag Key | Purpose | Default |
|----------|---------|---------|
| `devDiagnosticsPanel` | In-app diagnostics UI panel | ❌ disabled |
| `devEventLog` | Visible event stream in dev tools | ❌ disabled |
| `devSchemaInspector` | Dexie table inspector panel | ❌ disabled |

### 7.5 Enforcement Rules

1. Disabled route → not registered with router
2. Disabled module → not shown in navigation
3. Disabled service → no-op when called
4. Dev flags → never evaluate to `true` in production

---

## 8. Localization

### 8.1 Supported Languages

| Code | Language | Script | Coverage |
|------|----------|--------|---------|
| `en` | English | Latin | 100% (source) |
| `hi` | Hindi | Devanagari | 100% |
| `ta` | Tamil | Tamil | 100% |
| `te` | Telugu | Telugu | 100% |
| `kn` | Kannada | Kannada | 100% |
| `ml` | Malayalam | Malayalam | 100% |
| `mr` | Marathi | Devanagari | 100% |
| `bn` | Bengali | Bengali | 100% |
| `gu` | Gujarati | Gujarati | 100% |
| `pa` | Punjabi | Gurmukhi | 100% |

These 10 languages cover > 90% of India's literate population.

### 8.2 Translation Structure

```
src/localization/locales/en.json  ← SOURCE OF TRUTH

Key namespaces:
  app.*          — global labels (app.name, app.tagline, app.loading)
  nav.*          — navigation (nav.cockpit, nav.flightPlan, nav.futureMe)
  modules.*      — module strings (modules.cockpit.name, modules.flightPlan.welcome)
  common.*       — shared UI (common.save, common.cancel, common.retry)
  forms.*        — field labels + validation (forms.goalTitle, forms.required)
  errors.*       — error messages (errors.offlineRequired, errors.saveFailed)
  accessibility.*— SR labels (accessibility.closeDialog, accessibility.goalProgress)
  onboarding.*   — onboarding flow strings
  settings.*     — settings labels
```

All other locale files (`hi.json`, `ta.json`, etc.) mirror `en.json` exactly. Structure divergence is a build error.

### 8.3 Key Strategy

- Keys are dot-separated namespaces: `modules.cockpit.name`
- Keys use camelCase at every level: `flightPlan` (not `flight_plan`)
- Module keys always use `module.i18nId` (camelCase) — NOT `module.id` (lowercase)
  - Example: `modules.flightPlan.name` ✅ — NOT `modules.flightplan.name` ✗
- Keys are never renamed after release (breaks offline users with cached translations)
- New keys are always added to all 10 locale files simultaneously

### 8.4 Fallback Strategy

```
Requested locale (e.g. "ta")
    ↓  key not found
English ("en") fallback
    ↓  key not found in English either
Raw key displayed (dev-mode warning fired)
```

i18next handles this automatically via `fallbackLng: "en"` configuration.

### 8.5 Future Language Expansion

Adding a new language requires:
1. Add the language code to `SUPPORTED_LANGUAGES` in `i18n.ts`
2. Create `src/localization/locales/<code>.json` mirroring `en.json`
3. No code changes anywhere else required

RTL support (Urdu, Arabic) is a Wave 3+ consideration. CSS logical properties (`margin-inline-start`) are used throughout to avoid a layout rewrite.

---

## 9. Design System

### 9.1 Design Tokens (`src/theme/designTokens.ts`)

All token values reference CSS custom properties defined in `src/index.css`. Components never use raw values.

| Token Group | Purpose |
|------------|---------|
| `COLOR.brand.*` | Brand primary, secondary, accent |
| `COLOR.module.*` | Per-module identity colours (8 colours) |
| `COLOR.semantic.*` | success, warning, error, info |
| `COLOR.surface.*` | base, raised, overlay, sunken |
| `COLOR.text.*` | primary, secondary, muted, inverse, disabled |
| `COLOR.border.*` | default, subtle, strong, focus |
| `COLOR.mood[1-10]` | Mood spectrum for reflection/wellbeing features |
| `TYPOGRAPHY.fontFamily.*` | sans, serif, mono |
| `TYPOGRAPHY.fontSize.*` | xs → 4xl (9 steps) |
| `TYPOGRAPHY.fontWeight.*` | regular → extrabold |
| `TYPOGRAPHY.lineHeight.*` | tight → loose (5 steps) |
| `SPACING[0-64]` | 0px → 256px (30 steps, 4px base) |
| `RADIUS.*` | none → full (9 steps) |
| `SHADOW.*` | none → 2xl + inner (8 values) |
| `ELEVATION.*` | ground → tooltip (7 levels, shadow + z-index) |
| `MOTION.duration.*` | instant → slowest (7 steps) |
| `MOTION.easing.*` | linear → anticipate (6 curves) |
| `MOTION.framer.*` | fadeIn, slideUp, slideIn, scaleIn, popIn presets |
| `BREAKPOINTS.*` | sm → 2xl (5 breakpoints) |
| `TOUCH.*` | minimum (24px) → large (56px) tap target sizes |
| `Z_INDEX.*` | hide (-1) → tooltip (70) |

### 9.2 Components

| Tier | Source | Examples |
|------|--------|---------|
| Primitives | shadcn/ui (Radix UI) | Button, Dialog, Input, Select, Tabs, Toast, Switch |
| Layouts | Custom | AppShell, Sidebar, BottomNav |
| Common | Custom | OfflineIndicator, ThemeToggle, LanguageSwitcher |
| Module-specific | Custom per module | GoalCard, HabitRow, CareerCard, ReflectionPrompt |

### 9.3 Layouts

| Layout | Breakpoint | Description |
|--------|-----------|-------------|
| Mobile (bottom nav) | < 768px | BottomNav (5 primary tabs) + content area |
| Tablet (sidebar collapsed) | 768px–1024px | Collapsible left sidebar + content |
| Desktop (sidebar expanded) | > 1024px | Fixed left sidebar (240px) + content |

Content area uses `max-w-3xl mx-auto` for readability — LifePilot is content-first, not dashboard-first.

### 9.4 Accessibility Standards

| Standard | Target |
|----------|--------|
| WCAG | 2.1 Level AA |
| Touch targets | Minimum 44×44px (WCAG 2.5.8) |
| Colour contrast | 4.5:1 normal text, 3:1 large text |
| Focus ring | 2px solid, high-contrast, never suppressed |
| Screen readers | VoiceOver (iOS/macOS), TalkBack (Android), NVDA/JAWS (Windows) |
| Keyboard navigation | All interactive elements reachable by Tab |
| Dynamic regions | `aria-live="polite"` for status; `role="alert"` for errors |
| Modal focus | Focus trapped; returned to trigger on close |

### 9.5 Responsive Strategy

- **Mobile-first**: Base styles target mobile; breakpoints add tablet/desktop enhancements
- **Logical CSS properties**: `margin-inline-start` not `margin-left` — RTL-ready
- **Variable text lengths**: Flexbox/grid layouts accommodate longer translations without fixed widths
- **System font fallback**: Script-appropriate system fonts for complex Indian scripts

---

## 10. Routing

All routing via **wouter** (`react-router-dom` is installed but not used).

| Route | Module | Status | Feature Flag |
|-------|--------|--------|-------------|
| `/` | Root redirect → `/cockpit` | Active | — |
| `/cockpit` | Cockpit (home dashboard) | Active | `cockpit` |
| `/pilot` | My Profile | Active | `pilot` |
| `/flight-plan` | Goals + Milestones | Active | `flightPlan` |
| `/flight-log` | Reflection Journal | Active | `flightLog` |
| `/future-me` | Future Self Letters | Active | `futureMe` |
| `/career-explorer` | Career Discovery | Active | `careerExplorer` |
| `/money-quest` | Financial Literacy | Active | `moneyQuest` |
| `/life-choices` | Values + Decisions | Active | `lifeChoices` |
| `/settings` | Application Settings | Active | — |
| `/onboarding` | First-run onboarding | Active (Wave 1) | — |
| `/parent` | Parent Companion | Disabled | `parentCompanion` |
| `/school` | School Dashboard | Disabled | `schoolEdition` |
| `/enterprise` | Enterprise Admin | Disabled | `enterpriseEdition` |
| `*` | 404 Not Found | Active | — |

**Route protection**: In Wave 1, all routes are unprotected (no auth). Wave 2 adds `<ProtectedRoute>` wrapper that redirects unauthenticated users to onboarding.

**Route gating**: Disabled feature-flagged routes are not registered with the wouter `<Router>`. They do not appear in the navigation. A direct URL to a disabled route returns 404.

---

## 11. Testing Framework

### 11.1 Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Vitest | 2+ | Test runner (Vite-native, fast) |
| @testing-library/react | 14+ | Component testing (role-based queries) |
| @testing-library/dom | 10+ | DOM assertions |
| @testing-library/user-event | 14+ | Realistic user interaction simulation |
| jsdom | 24+ | Browser environment simulation |
| c8 / v8 | — | Coverage provider |

### 11.2 Unit Tests

**Scope**: Pure utility functions, design token exports, shared constants, enum values

**Location**: Colocated with source — `utils/index.test.ts`, `shared/constants/index.test.ts`

**Coverage target**: 100% for utility functions

**Example test types**:
- `cn()` classname merging
- `formatDate()` locale-aware formatting
- `getAgeGroup()` age bracket classification
- `truncate()` string truncation

### 11.3 Repository Tests

**Scope**: Each repository's domain queries (not base CRUD — that is tested in BaseRepository tests)

**Key constraint**: All tests use `MockLifePilotDatabase` (class-based Dexie mock). Never use real IndexedDB in tests.

**Why class-based mock**: Dexie is instantiated with `new LifePilotDatabase()`. A `vi.fn()` mock cannot be used with `new`. The mock class implements the same table API (`.where()`, `.equals()`, `.filter()`, `.toArray()`, `.get()`, `.add()`, `.update()`, `.delete()`, `.count()`).

**Coverage target**: 80% of all repository methods

**Example test types**:
- `goalRepository.getActiveForPilot(1)` returns only goals with `status === "active"`
- `futureLetterRepository.getReadyToDeliver(1)` returns only letters where `deliverAt <= now && !delivered`
- `missionCompletionRepository.getTotalXpEarned(1)` sums `xpEarned` correctly
- `reflectionRepository.getStreak(1)` calculates consecutive days correctly

### 11.4 Storage Tests (storageService.ts)

**Scope**: Integration tests across the service + repository layers

**Tested behaviours**:
- Create operations publish the correct domain event
- Validation prevents invalid data from reaching the database
- XP award operations call the correct repository method
- Error propagation from repository to service caller

**Coverage target**: 90% of service methods

### 11.5 Localization Tests

**Scope**: Verify all 10 locale files have complete key coverage vs. `en.json`

**Strategy**:
- `localization.test.ts` reads `en.json` as the expected key set
- Iterates all 9 non-English locale files
- Asserts every key in `en.json` exists in each locale file
- Fails build if any locale is missing any key

**CI gate**: This test runs in CI before every release. A missing translation key blocks the release.

### 11.6 Route Tests

**Scope**: Verify routing renders the correct module component for each active route

**Strategy**:
- Render `<App />` with mocked wouter `MemoryRouter`
- Navigate to each route
- Assert the expected page component is mounted

### 11.7 Coverage Strategy

| Area | Minimum | Target |
|------|---------|--------|
| `src/utils/` | 100% | 100% |
| `src/storage/repositories/` | 80% | 90% |
| `src/storage/storageService.ts` | 90% | 95% |
| `src/hooks/` | 75% | 85% |
| `src/core/` (events, flags, diagnostics) | 80% | 90% |
| `src/modules/*/hooks/` | 70% | 80% |
| Overall | 70% | 80% |

Coverage reports generated to `coverage/` directory. HTML report available at `coverage/index.html`.

---

## 12. Documentation

| Document | Location | Purpose |
|----------|----------|---------|
| **Architecture Review Pack** | `docs/ArchitectureReviewPack.md` | This document. External audit reference for all architectural decisions, layer contracts, and scalability readiness. |
| **Architecture Overview** | `docs/Architecture.md` | High-level architecture description, layer diagram, technology decisions, and wave roadmap. Primary onboarding document for new engineers. |
| **Repository Guide** | `docs/RepositoryGuide.md` | How to use and extend the repository pattern. Available repositories, base classes, error handling, and testing patterns. |
| **Feature Flags Guide** | `docs/FeatureFlags.md` | How feature flags work, how to use them in code, how to add new flags, and the wave-to-flag mapping. |
| **Localization Guide** | `docs/LocalizationGuide.md` | i18n architecture, key conventions, module i18n mapping (i18nId vs id), adding new keys and languages. |
| **Accessibility Guide** | `docs/AccessibilityGuide.md` | WCAG 2.1 AA component requirements, keyboard navigation, screen reader patterns, contrast rules, per-component checklist. |
| **Storage Guide** | `docs/StorageGuide.md` | Dexie architecture, schema versioning, boolean/date patterns, migration rules, data export, test mocking. |
| **Future Expansion Guide** | `docs/FutureExpansionGuide.md` | Wave roadmap (Wave 0–6), extension points, EARB conditions, technology evolution decisions. |
| **Testing Guide** | `docs/TestingGuide.md` | Test stack, commands, MockLifePilotDatabase, component and repository test patterns, coverage targets, anti-patterns. |
| **Version Log** | `docs/VersionLog.md` | Schema and domain model version history, architecture document revision history, release roadmap. |
| **ADR-001: React** | `docs/adr/ADR-001-React.md` | Why React 19 + Vite 7 was chosen over Vue 3, Svelte, and Flutter Web. |
| **ADR-002: Offline-First** | `docs/adr/ADR-002-OfflineFirst.md` | Why IndexedDB-primary is the right architecture for India's connectivity reality. |
| **ADR-003: Dexie.js** | `docs/adr/ADR-003-Dexie.md` | Why Dexie.js was chosen over RxDB, PouchDB, localForage, and raw IDB. |
| **ADR-004: Localisation-First** | `docs/adr/ADR-004-LocalizationFirst.md` | Why 10 languages from day one; the cost of localisation retrofit vs. localisation-native. |
| **ADR-005: Domain-Driven Design** | `docs/adr/ADR-005-DomainDrivenDesign.md` | Why DDD bounded contexts were chosen; ubiquitous language definitions; the sacred domain layer rule. |
| **ADR-006: Feature Flags** | `docs/adr/ADR-006-FeatureFlags.md` | First-party vs. external flag service; build-time vs. runtime flags; flag enforcement rules. |
| **ADR-007: Event Architecture** | `docs/adr/ADR-007-EventArchitecture.md` | Synchronous in-process event bus; why not Redux, Zustand, or external message brokers. |

---

## 13. Scalability Review

### Assessment Criteria

For each tier, we assess: data model readiness, service layer readiness, infrastructure readiness, and known blockers.

---

### 13.1 MVP (Wave 1) — Score: 9.5 / 10

| Dimension | Assessment |
|-----------|-----------|
| Data model | ✅ All 8 module entities fully declared; all repositories implemented and type-verified |
| Storage | ✅ Dexie schema v11; 52 tables; offline-first; migration-safe |
| Feature flags | ✅ All Wave 1 flags declared; correctly gated routes and nav |
| i18n | ✅ 10 languages ready; all locale files complete |
| Event system | ✅ All domain events declared and typed |
| PWA | ✅ vite-plugin-pwa + Workbox configured |
| Diagnostics | ✅ In-memory ring buffer with severity levels |
| Accessibility | ✅ WCAG 2.1 AA guidelines documented and enforced in code review |
| Blocker | ⚠️ DPDP parental consent flow (gated flag, not yet built) — required before India launch |

**Assessment**: Foundation is production-ready for Wave 1 module development. All infrastructure is in place. Module UI (pages, components, hooks) remains to be built.

---

### 13.2 Premium (Wave 2) — Score: 7.5 / 10

| Dimension | Assessment |
|-----------|-----------|
| Data model | ✅ SubscriptionPlan, PilotSubscription, Badge, Certificate entities declared |
| Feature flags | ✅ `premiumLearningPaths`, `parentCompanion`, `cloudSync` declared (disabled) |
| Auth entities | ✅ CoPilot declared; auth session model not yet declared |
| Backend | ❌ No API server, no auth, no database schema for server-side (Wave 2 requires new ADRs) |
| Sync engine | ❌ SyncQueue not yet declared in schema |
| Payments | ❌ Payment provider not selected or integrated |

**Assessment**: Domain model is pre-built. Infrastructure layer requires significant new work (API server, auth, sync engine, payments). New ADRs (008–010) required.

---

### 13.3 Parent Companion (Wave 2) — Score: 7 / 10

| Dimension | Assessment |
|-----------|-----------|
| Data model | ✅ CoPilot, ConversationStarter, FamilyChallenge entities declared |
| Feature flag | ✅ `parentCompanion` flag declared |
| Permission model | ⚠️ CoPilotPermission entity exists but permission enforcement not designed |
| Real-time (parent view) | ❌ No WebSocket or push notification infrastructure |
| DPDP consent | ⚠️ Parental consent flag declared but flow not built |

**Assessment**: Good foundation. Needs permission model design and consent flow before any parent-facing feature can ship.

---

### 13.4 School Edition (Wave 4) — Score: 6 / 10

| Dimension | Assessment |
|-----------|-----------|
| Data model | ✅ School, Teacher, Classroom, Program, Enrollment, Participation all declared |
| Feature flag | ✅ `schoolEdition`, `analyticsExport` declared |
| Multi-tenancy | ⚠️ `schoolId` field on Pilot; no server-side tenant isolation designed |
| Teacher dashboard | ❌ No teacher-specific entities or UI declared |
| Analytics | ❌ No aggregation or reporting layer |
| LRS/SCORM | ❌ Not declared |

**Assessment**: Domain pre-built. Requires multi-tenant server architecture (ADR-013), LRS integration (ADR-014), and significant UI work.

---

### 13.5 CSR Edition (Wave 5) — Score: 5.5 / 10

| Dimension | Assessment |
|-----------|-----------|
| Data model | ✅ Tenant, Organization, Deployment entities declared |
| Feature flag | ✅ `csrMode`, `enterpriseEdition` declared |
| Branding system | ❌ No whitelabel theming system |
| Reporting | ❌ No CSR impact measurement entities |
| SSO | ❌ No SAML/OIDC integration declared |

**Assessment**: Foundational entities present. Large amount of infrastructure and product design required.

---

### 13.6 Enterprise Edition (Wave 5) — Score: 5 / 10

| Dimension | Assessment |
|-----------|-----------|
| Data model | ✅ Tenant, Organization, Deployment declared |
| Feature flag | ✅ `enterpriseEdition`, `multiTenant` declared |
| Multi-tenant isolation | ❌ Row-level security not designed |
| HRMS integration | ❌ Not declared |
| Seat management | ❌ Not declared |
| Audit logging | ⚠️ ActivityEvent is a start; enterprise audit trail more complex |

**Assessment**: Early scaffolding only. Full enterprise architecture requires ADR-015 (multi-tenancy) and ADR-016 (SSO).

---

### 13.7 AI Coach (Wave 6) — Score: 5 / 10

| Dimension | Assessment |
|-----------|-----------|
| Data model | ✅ AIConversation, AIRecommendation, AIInsight declared |
| Feature flag | ✅ `aiCoach` declared |
| Event bus integration | ✅ Event bus designed as primary AI integration surface |
| AI provider | ❌ Not selected; child-safety evaluation not done |
| Content safety | ❌ No AI response safety layer designed |
| Privacy impact | ❌ Not assessed (child data → AI provider = DPDP complexity) |

**Assessment**: Architectural surface for AI integration is ready (event bus). Product, safety, privacy, and infrastructure design is Wave 6 work. Requires ADR-017.

---

### Overall Scalability Summary

| Tier | Score | Blocker |
|------|-------|---------|
| MVP | 9.5/10 | DPDP consent flow |
| Premium | 7.5/10 | API server, auth, sync, payments |
| Parent Companion | 7/10 | Permission model, DPDP consent |
| School Edition | 6/10 | Multi-tenant server, teacher UI, LRS |
| CSR Edition | 5.5/10 | Branding system, reporting |
| Enterprise Edition | 5/10 | Multi-tenancy isolation, SSO |
| AI Coach | 5/10 | AI provider selection, child safety |

---

## 14. Risks

### 14.1 Architecture Risks

| Risk | Severity | Likelihood | Mitigation |
|------|---------|-----------|-----------|
| **Dexie schema complexity** — 52 tables is large for IndexedDB; query performance on older devices may degrade | High | Medium | Benchmark on target devices (2GB RAM Android); add compound indexes where measured; consider lazy table population |
| **Boolean index limitation** — `isActive`, `completed`, `delivered` cannot be indexed in IndexedDB; large tables require full scans for these filters | Medium | High | Accepted; mitigated by always pre-filtering on `pilotId` (indexed) first, then filtering booleans in application code |
| **In-process synchronous events** — slow event handlers block the publishing call | Medium | Low | Handlers must be < 5ms; no I/O in handlers; audited at code review |
| **Repository count growth** — as domain grows, number of repository classes could exceed 40+ | Low | Medium | Mitigated by clear pattern; Golden Path generator scaffolds new repos |

### 14.2 Data Risks

| Risk | Severity | Likelihood | Mitigation |
|------|---------|-----------|-----------|
| **Browser storage deletion** — user clears browser data, loses all Wave 1 data | Critical | Medium | User education on first launch; Wave 1 data export feature (JSON backup) |
| **IndexedDB quota exceeded** — device storage full; writes silently fail | High | Low | Storage quota check on app launch; warn user at 80% of estimated quota |
| **Schema migration failure** — Dexie version upgrade fails mid-migration, leaving DB in inconsistent state | High | Very Low | Dexie wraps migrations in transactions; if migration fails, DB stays at previous version. `SchemaMigrated` event only fires on success. |
| **Stale cached translations** — Service Worker caches locale JSON files; new keys not delivered to offline users | Medium | Medium | Cache-bust locale files on version bump; include locale version in filename or cache key |
| **Data loss on multiple profiles** — multiple children on one device (one browser) share IndexedDB; no profile isolation | High | Medium | Multi-profile support (multiple Pilot records) is designed but requires profile switching UI (Wave 1 backlog) |

### 14.3 Scalability Risks

| Risk | Severity | Likelihood | Mitigation |
|------|---------|-----------|-----------|
| **Wave 2 sync conflict resolution** — last-write-wins is simple but can cause data loss if same record is edited on two devices offline | Medium | Medium | Operational transforms or vector clocks to be evaluated in ADR-008; CRDT-based fields for counters (XP, streak) |
| **Content catalogue growth** — 52 tables but catalogue data (careers, content, learning paths) loaded entirely into IndexedDB; large catalogues will slow startup | Medium | Medium | Lazy-load catalogue tables; paginate large lists; consider IndexedDB pagination API |
| **TypeScript strictness with large types** — `types/index.ts` at 4000+ lines; tsc compile time growing | Low | Medium | Split into domain-namespaced files in Wave 2; import from `@/types/core`, `@/types/school`, etc. |

### 14.4 Maintenance Risks

| Risk | Severity | Likelihood | Mitigation |
|------|---------|-----------|-----------|
| **Locale file drift** — one of 10 locale files gets a missing key added late | High | High | `localization.test.ts` CI gate catches missing keys before release |
| **Feature flag accumulation** — old flags never cleaned up become noise | Medium | Medium | Quarterly flag audit; `wave` field on each flag indicates when it can be promoted to permanent |
| **`types/index.ts` modification without design review** — non-additive changes break existing data | Critical | Low | Enforced by code review policy: any change to `types/index.ts` requires ARB sign-off |
| **Repository layer bypass** — developer accesses `db.*` directly from a component | High | Medium | ESLint `no-restricted-imports` rule to block direct `db` imports outside the repository layer |
| **Dependency drift** — Dexie, React, Vite, shadcn components may release breaking changes | Medium | Medium | Renovate bot for automated dependency updates; pin major versions in CI |

---

## 15. Architecture Freeze Candidate

### Strengths

1. **Domain model is production-complete for Wave 0–6**: 232 entities and 124 enumerations cover all planned features. Future waves add to the model, not restructure it.

2. **Repository pattern is correctly implemented**: BaseRepository and BasePilotScopedRepository eliminate duplicated Dexie code. All entity repositories are type-verified against actual Dexie table declarations — zero TypeScript errors in the full repository layer.

3. **Offline-first is a genuine first principle**: Every component, hook, and service reads from IndexedDB. There is no request/response chain that can fail offline. The PWA shell caches ensure zero-network load.

4. **Localisation-first from day one**: With 10 locale files and a CI gate that blocks missing keys, localisation debt is structurally impossible to accumulate.

5. **Feature flags enable a single-bundle multi-tier product**: One deployable PWA serves free, premium, school, and enterprise editions with correctly gated capabilities. No separate builds.

6. **Event architecture decouples bounded contexts**: Modules communicate via typed events, not direct imports. Adding XP for a new action requires adding a single event handler — no changes to the action's own code.

7. **Design token system is comprehensive**: 7 token categories covering colour, typography, spacing, radius, shadow, elevation, motion, and z-index. Enforced via CSS custom properties — no raw values in components.

8. **ADR coverage is complete**: All 7 foundational architecture decisions are documented with context, rationale, alternatives considered, and consequences. Future engineers can understand why the codebase is structured as it is.

9. **Documentation set is production-grade**: 10 guides + 7 ADRs + this ARP. New team members have a complete reference set.

10. **TypeScript strict mode — zero errors**: The full repository layer, core modules, design tokens, and shared constants pass `tsc --noEmit` with zero errors.

---

### Weaknesses

1. **Wave 1 module UI is not yet built**: The infrastructure is complete; the product modules (pages, components, hooks for each of the 8 modules) are stubs. This is appropriate for Wave 0 but must be the focus of Wave 1.

2. **No Wave 2 server design**: The offline-first foundation deliberately deferred all server architecture. Wave 2 requires significant new ADRs (auth, sync, API, payments) before coding begins.

3. **DPDP compliance not built**: The `parentalConsent` flag is declared but the consent flow, data minimisation checks, and children's data handling policy are not implemented. This is a legal requirement for India launch.

4. **No automated ESLint layer enforcement**: The architecture defines layer rules (no direct `db` access from components; events only published from services) but ESLint `no-restricted-imports` rules have not yet been configured to enforce them automatically.

5. **No CI pipeline defined**: Test commands and typecheck commands are defined, but no `.github/workflows/*.yml` or equivalent CI configuration exists. Lint, typecheck, test, and locale coverage gates are not yet automated.

6. **Multi-profile UI not built**: Multiple children using one device (one browser instance) cannot switch between profiles without a Pilot switching UI. The data model supports multiple Pilots; the UI does not.

7. **Content catalogue is empty**: The career, content, financial concept, and learning path tables are declared but contain no data. Wave 1 requires a content seeding strategy.

---

### Missing Areas

| Area | Priority | Wave |
|------|---------|------|
| DPDP parental consent flow | Critical | Wave 1 |
| Data export (JSON backup) | High | Wave 1 |
| Onboarding flow (Pilot creation) | High | Wave 1 |
| Content seeding strategy | High | Wave 1 |
| ESLint layer boundary enforcement | High | Wave 1 |
| CI/CD pipeline | High | Wave 1 |
| Multi-profile UI (Pilot switcher) | Medium | Wave 1 |
| PWA icon assets | Medium | Wave 1 |
| Offline fallback page | Medium | Wave 1 |
| Module 8 UI implementations | Critical | Wave 1 |
| API server architecture | Critical | Wave 2 |
| Auth strategy (ADR-009) | Critical | Wave 2 |
| Cloud sync engine (ADR-008) | Critical | Wave 2 |
| SyncQueue schema declaration | High | Wave 2 |
| Payment integration | High | Wave 2 |

---

### Recommended Improvements (before Freeze)

1. **Add ESLint layer rules** (`no-restricted-imports`) to programmatically enforce: no `db.*` outside repositories; no event publishing from components; no cross-module direct imports.

2. **Add CI pipeline** with gates: `typecheck` → `test` → `test:coverage` → `localization coverage` → `build`. Block merge on any failure.

3. **Seed content data** for careers (50 entries), financial concepts (30 entries), and missions (40 entries) to make the Wave 1 product functional.

4. **Declare `SyncQueue` table** in Dexie schema v12 now — even though Wave 2 is future, pre-declaring the table prevents a schema version bump from being needed on Wave 2 day one.

5. **Split `types/index.ts`** into domain-namespaced modules (`types/core.ts`, `types/growth.ts`, `types/career.ts`, etc.) with a barrel `types/index.ts` re-exporting all. The current 4000+ line single file is approaching a maintenance threshold.

---

### Architecture Score

| Dimension | Score |
|-----------|-------|
| Domain model completeness | 9.5/10 |
| Layer separation and contracts | 9/10 |
| Offline-first correctness | 10/10 |
| Event architecture | 8.5/10 |
| Localisation architecture | 9.5/10 |
| Accessibility design | 8/10 |
| Design token system | 9/10 |
| Feature flag architecture | 8.5/10 |
| Documentation completeness | 9/10 |
| Test architecture | 7.5/10 |
| CI/CD readiness | 4/10 |
| Wave 2+ readiness | 7/10 |
| **Overall** | **8.3/10** |

---

### Readiness Score

| Tier | Readiness |
|------|----------|
| Architecture freeze (Wave 0) | 8.3/10 |
| Wave 1 module development start | 9/10 (infrastructure complete) |
| Production launch | 6/10 (DPDP, CI, content seeding, module UI required) |

---

### Recommendation

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                           │
│   RECOMMENDATION:   APPROVE WITH CONDITIONS                               │
│                                                                           │
│   The Wave 0 foundation architecture is APPROVED for freeze subject       │
│   to the following conditions being met before Wave 1 coding begins:      │
│                                                                           │
│   CONDITION 1 (BLOCKER): Add ESLint layer boundary rules.                 │
│   CONDITION 2 (BLOCKER): Establish CI pipeline with all quality gates.    │
│   CONDITION 3 (REQUIRED): Define DPDP compliance implementation plan.     │
│   CONDITION 4 (REQUIRED): Define content seeding strategy.                │
│   CONDITION 5 (ADVISED): Split types/index.ts into domain namespaces.     │
│   CONDITION 6 (ADVISED): Pre-declare SyncQueue table in schema v12.       │
│                                                                           │
│   Conditions 1 and 2 must be resolved before Wave 1 PR #1.               │
│   Conditions 3 and 4 must be resolved before Wave 1 MVP release.          │
│   Conditions 5 and 6 are recommended before Wave 2 planning begins.       │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 16. Next Prompt — RP-002 Inputs

The following inputs are recommended for the RP-002 prompt to the next engineering session. These address the APPROVE WITH CONDITIONS items and begin Wave 1 module development.

---

### RP-002-A: CI/CD and Code Quality Gates

```
PROJECT: LifePilot
CONTEXT: Wave 0 foundation is complete (ADRs, repositories, event bus, feature flags, design tokens, documentation).
OBJECTIVE: Establish code quality infrastructure.

TASKS:
1. Add ESLint rules to enforce layer boundaries:
   - No direct db.* imports outside src/storage/repositories/
   - No eventBus.publish() calls outside src/storage/storageService.ts
   - No cross-module imports between src/modules/* directories
2. Configure GitHub Actions CI pipeline with:
   - pnpm install
   - typecheck (zero errors required)
   - test (all tests pass required)
   - test:coverage (70% minimum required)
   - localization coverage check (all 10 locales, no missing keys)
   - build (verifies Vite build completes)
3. Configure Renovate for automated dependency updates (weekly, grouped by package category).
```

---

### RP-002-B: DPDP Compliance Implementation

```
PROJECT: LifePilot
CONTEXT: LifePilot is a children's platform subject to India's Digital Personal Data Protection Act (DPDP) 2023.
OBJECTIVE: Implement DPDP compliance for Wave 1 India launch.

TASKS:
1. Design and build the parental consent flow (gated by parentalConsent feature flag):
   - Age gate on first launch (is the user under 18?)
   - If yes: collect parent/guardian contact and send consent request
   - Store consent status in Settings.privacy
   - Block product access until consent is received
2. Implement data minimisation review:
   - Audit every entity field; mark optional fields as truly optional
   - Remove any PII collection not required for product function
3. Implement data deletion (Right to Erasure):
   - deleteAllForPilot() across all pilot-scoped repositories
   - Clear all localStorage keys for the pilot
4. Privacy notice: Surface localised privacy notice on first launch and in Settings
5. Document: Data Processing Register (what data is collected, why, retention period)
```

---

### RP-002-C: Content Seeding Strategy

```
PROJECT: LifePilot
CONTEXT: All catalogue tables (careers, financialConcepts, missions, contentItems, learningPaths) are empty.
OBJECTIVE: Seed Wave 1 catalogue content so the product is functional.

TASKS:
1. Create seed data files in src/storage/seeds/:
   - careers.json — 50 career entries covering Indian context (agriculture tech, healthcare, engineering, creative, civic)
   - financialConcepts.json — 30 financial literacy topics (saving, budgeting, UPI, investing basics, insurance)
   - missions.json — 40 platform missions across all 8 modules
   - lifeChoiceScenarios.json — 20 values-based decision scenarios
2. Create a DatabaseSeeder class that:
   - Checks if catalogue tables are empty on app first launch
   - If empty, populates from seed JSON files
   - Marks seed version in Settings so re-seeding does not overwrite user data
3. Localise seed content: provide all 10 language variants for career titles, concept descriptions, mission text
```

---

### RP-002-D: Wave 1 — Module UI Implementation (Cockpit)

```
PROJECT: LifePilot
CONTEXT: Wave 0 foundation is complete. All infrastructure is in place. Begin Wave 1 module UI.
OBJECTIVE: Build the Cockpit module (home dashboard).

SCOPE: Cockpit module only. Do not modify any other module.

DELIVERABLES:
1. useCockpit hook (src/modules/cockpit/hooks/useCockpit.ts):
   - Reads active goals, today's habits, pending missions, XP/level, streak
   - Subscribes to GoalCompleted, HabitCompleted events to refresh
2. CockpitPage (src/modules/cockpit/pages/CockpitPage.tsx):
   - Pilot greeting (name + level badge)
   - Progress overview: goals, streak, XP bar
   - Today's missions (max 3)
   - Today's habits (checklist)
   - Quick access to all 8 modules
   - FutureLetter notification if a letter is ready to deliver
3. Cockpit components (src/modules/cockpit/components/):
   - PilotGreeting, XPBar, StreakBadge, GoalProgressCard, HabitChecklist, ModuleGrid, FutureLetterAlert
4. All text from i18n. No hardcoded strings.
5. All colours from design tokens. No hardcoded values.
6. WCAG 2.1 AA: all interactive elements labelled, keyboard-navigable, 44px touch targets.
7. Vitest tests for useCockpit hook and all components.
```

---

### RP-002-E: Multi-Profile UI (Pilot Switcher)

```
PROJECT: LifePilot
CONTEXT: The data model supports multiple Pilot records in IndexedDB. No UI exists to switch between profiles.
OBJECTIVE: Build Pilot profile creation and switching.

DELIVERABLES:
1. Onboarding flow: Pilot creation wizard (name, age, language, avatar selection)
2. Profile switcher: accessible from settings sidebar; shows all Pilot records on device; allows switching active pilot
3. LastPilotId: persist to localStorage (key: lp_last_pilot_id); auto-select on app launch
4. New Pilot creation from profile switcher
```

---

*End of Architecture Review Pack — ARP-001*

*Document classification: External Architecture Audit — Unrestricted distribution*  
*Next review: End of Wave 1 (target Q4 2026)*
