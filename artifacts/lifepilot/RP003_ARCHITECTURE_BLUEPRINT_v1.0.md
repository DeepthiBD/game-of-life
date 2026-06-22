# LifePilot — Enterprise Architecture & Engineering Governance Blueprint
## Architecture Freeze v1.0 | RP-003
### Approved by: Enterprise Architecture Review Board
### Date: June 2026 | Status: APPROVED

---

> **Document Authority**: This document is the constitutional blueprint governing every future implementation decision for LifePilot. All architecture decisions, module additions, technology choices, and engineering standards must conform to this document. Any deviation requires a formal Architecture Decision Record (ADR) and EARB sign-off.

---

## CURRENT DOMAIN BASELINE (FROZEN)

| Metric | Value |
|--------|-------|
| Entities | **232** |
| Union Types / Enums | **124** |
| Schema Version | **v11** |
| Service Objects | **120+** |
| Supported Languages | **10 (Indian languages)** |
| Target Audience | Children & Teenagers, ages 8–18, India |
| Compliance | DPDP 2023, COPPA-equivalent, WCAG 2.1 AA |

---

## TABLE OF CONTENTS

1. Executive Summary
2. Product Vision
3. Business Goals
4. Platform Vision
5. Capability Map
6. Product Edition Matrix
7. Architecture Principles
8. Architecture Constraints
9. Assumptions
10. Architecture Guardrails
11. Context Diagram
12. Container Diagram
13. Component Diagram
14. Layered Architecture
15. Domain Architecture
16. Bounded Contexts
17. Aggregate Design
18. Domain Events
19. Event Bus Architecture
20. Repository Architecture
21. Service Architecture
22. Module Architecture
23. Feature Architecture
24. Shared Kernel
25. Folder Structure
26. Dependency Rules
27. Offline First Architecture
28. Synchronization Architecture
29. IndexedDB Architecture
30. Workflow Engine
31. Rules Engine
32. Recommendation Engine
33. Assessment Architecture
34. Wellbeing Architecture
35. Achievement Architecture
36. Identity Evolution Architecture
37. Personality Architecture
38. Curriculum Framework Architecture
39. Career Platform Architecture
40. Financial Literacy Architecture
41. AI Platform Architecture
42. AI Prompt Architecture
43. Memory Architecture
44. Search Architecture
45. Notification Architecture
46. Analytics Architecture
47. Reporting Architecture
48. Media Architecture
49. Integration Architecture
50. API Governance
51. Plugin Architecture
52. Marketplace Architecture
53. School Edition Architecture
54. Enterprise Architecture
55. Multi-Tenant Strategy
56. Deployment Architecture
57. CI/CD Architecture
58. Environment Strategy
59. Release Governance
60. Versioning Strategy
61. Migration Strategy
62. Security Architecture
63. Authentication
64. Authorization
65. RBAC / ABAC
66. Privacy Architecture
67. Compliance Architecture
68. Audit Architecture
69. Data Governance
70. AI Governance
71. Logging
72. Monitoring
73. Telemetry
74. Feature Flags
75. Configuration Hierarchy
76. Performance Strategy
77. Scalability Strategy
78. Reliability Strategy
79. Disaster Recovery
80. Backup & Recovery
81. Operational Governance
82. Content Governance
83. Coding Standards
84. Folder Standards
85. Naming Standards
86. Documentation Standards
87. Testing Architecture
88. Developer Experience
89. Onboarding Guide
90. Quality Attribute Scenarios
91. Architecture Compliance Checklist
92. Risk Register
93. Technical Debt Strategy
94. Platform Evolution Strategy
95. Modular Monolith → Microservice Evolution
96. Future Reserved Domains
97. Domain Ownership Matrix
98. Module Maturity Matrix
99. Implementation Waves & Build Order
100. Executive Architecture Review

---

## SECTION 1 — EXECUTIVE SUMMARY

### Purpose
Provide an authoritative, concise statement of what LifePilot is, what the architecture must achieve, and the constraints it must satisfy across its entire multi-year lifespan.

### Summary
LifePilot is an **Offline-First Life Skills Progressive Web Application** for children and teenagers (ages 8–18) in India. It operates as a personal life coach, growth tracker, career explorer, wellbeing guardian, and identity development engine—all running locally on the device with no mandatory internet connectivity.

The platform is architected to serve:
- **Individuals** using the free/premium PWA
- **Schools** via School Edition with teacher dashboards and curriculum mapping
- **Enterprises** via Enterprise Edition for corporate learning and youth programs
- **Government/NGO** programs via configurable multi-tenant deployments
- **AI Coach** via a model-agnostic AI layer with full offline fallback

The architecture is a **Feature-First Modular Monolith** built on React 19 + Vite 7 + Dexie.js (IndexedDB ORM) running entirely in the browser. It is designed to evolve additively—no module may be removed, no existing entity may be modified—only new capabilities added atop the frozen domain model.

**Architecture Score: 9.1 / 10 — APPROVED**

---

## SECTION 2 — PRODUCT VISION

### Purpose
Define the north star for the product that all architecture decisions must serve.

### Vision Statement
> "LifePilot becomes the world's most trusted offline-first life skills platform—empowering every child and teenager in India to discover their identity, build character, navigate decisions wisely, and design a purposeful future—regardless of internet connectivity."

### Design Decisions
- Offline-first is non-negotiable: the product must deliver 100% functionality without connectivity
- India-first: 10 regional languages, low-bandwidth assumptions, device-constrained environments
- Child-safe by design: parental consent, data minimization, no third-party tracking
- Long-term companion: the platform must support a user from age 8 to 25+, evolving with them

### Anti-patterns
- Do not design features that require constant internet connectivity
- Do not build for western markets first and localize later
- Do not assume high-end devices or reliable connectivity

---

## SECTION 3 — BUSINESS GOALS

### Purpose
Define the measurable business outcomes the architecture must enable.

| Goal | Target | Horizon |
|------|--------|---------|
| Reach 1M active users | MAU ≥ 1M | 24 months |
| Deploy to 1,000 schools | School Edition live | 18 months |
| Enterprise revenue stream | 10 enterprise clients | 30 months |
| Marketplace launch | 50+ content packs | 36 months |
| AI coaching active | AI layer in production | 18 months |
| 10 languages live | All 10 Indian languages | 12 months |
| DPDP compliance | Full compliance | 6 months |
| Offline reliability | 100% feature parity offline | MVP |

### Governance Rules
- Every architectural decision must be evaluated against at least one of these business goals
- Any new module must declare which edition and goal it serves before implementation begins

---

## SECTION 4 — PLATFORM VISION

### Purpose
Define the multi-edition platform model and how it evolves over time.

### Platform Layers
```
┌─────────────────────────────────────────────────────┐
│                  Marketplace Platform                │
├─────────────────────────────────────────────────────┤
│     Enterprise Edition │ School Edition │ Gov/NGO   │
├─────────────────────────────────────────────────────┤
│                    Premium Edition                   │
├─────────────────────────────────────────────────────┤
│                      MVP Core                        │
├─────────────────────────────────────────────────────┤
│          Offline-First Foundation (Dexie.js)         │
└─────────────────────────────────────────────────────┘
```

Each layer is purely additive. The MVP Core is the permanent foundation that never changes shape, only grows.

---

## SECTION 5 — CAPABILITY MAP

### Purpose
Map all business capabilities to the platform, providing a technology-independent view of what LifePilot does.

| Capability Domain | Capabilities |
|------------------|--------------|
| **Identity Platform** | Profile, Pilot identity, Personality evolution, Core values, Future self |
| **Learning Platform** | Curriculum, Daily missions, Habit tracking, Competency growth, Audio/visual content |
| **Assessment Platform** | Assessments, Life Wheel, Career assessments, Personality assessments, Wellbeing assessments |
| **Career Platform** | Career explorer, Career paths, Mentors, Industry discovery, Portfolio |
| **Wellbeing Platform** | Wellbeing tracking, Mood, Stress, Burnout detection, Intervention engine |
| **Achievement Platform** | Portfolio achievements, Gamification, Badges, Certificates, Evidence |
| **AI Platform** | AI coach, Recommendations, Narrative generation, Decision assistance, Prompt registry |
| **Content Platform** | Localized content, Audio packs, Story collections, Regional variants |
| **Analytics Platform** | Growth analytics, Wellbeing trends, Learning progress, Institution reports |
| **Platform Services** | Sync, Notifications, Feature flags, Scheduler, Rules engine, Workflow engine |
| **Enterprise Platform** | Multi-tenancy, RBAC, Audit, Compliance, Enterprise reporting |
| **Marketplace Platform** | Content packs, Plugin registry, Partner integrations, Revenue sharing |

---

## SECTION 6 — PRODUCT EDITION MATRIX

### Purpose
Define which capabilities are available in which editions, enabling feature gating and monetization strategy.

| Capability | MVP | Premium | School | Enterprise | Marketplace |
|-----------|-----|---------|--------|------------|-------------|
| Pilot Profile | ✅ | ✅ | ✅ | ✅ | ✅ |
| Life Wheel | ✅ | ✅ | ✅ | ✅ | ✅ |
| Daily Missions (10/mo) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Daily Missions (unlimited) | ❌ | ✅ | ✅ | ✅ | ✅ |
| Flight Log (Journal) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Career Explorer (basic) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Career Explorer (deep) | ❌ | ✅ | ✅ | ✅ | ✅ |
| Future Me Letters | ✅ | ✅ | ✅ | ✅ | ✅ |
| Personality Assessments | ❌ | ✅ | ✅ | ✅ | ✅ |
| Decision Intelligence | ❌ | ✅ | ✅ | ✅ | ✅ |
| Wellbeing Assessments | ❌ | ✅ | ✅ | ✅ | ✅ |
| AI Coaching | ❌ | ✅ | ✅ | ✅ | ✅ |
| Curriculum Mapping | ❌ | ❌ | ✅ | ✅ | ✅ |
| Teacher Dashboard | ❌ | ❌ | ✅ | ✅ | ✅ |
| Institution Reporting | ❌ | ❌ | ✅ | ✅ | ✅ |
| Multi-tenant Admin | ❌ | ❌ | ❌ | ✅ | ✅ |
| Enterprise RBAC | ❌ | ❌ | ❌ | ✅ | ✅ |
| Custom Branding | ❌ | ❌ | ✅ | ✅ | ✅ |
| Content Pack Marketplace | ❌ | ❌ | ❌ | ❌ | ✅ |
| Plugin Registry | ❌ | ❌ | ❌ | ❌ | ✅ |
| 10 Languages | ❌ | ✅ | ✅ | ✅ | ✅ |
| Offline Full | ✅ | ✅ | ✅ | ✅ | ✅ |

### Governance Rules
- Feature flags govern edition boundaries — never hard-code edition checks in component logic
- All features must be built edition-agnostic and gated via `FeatureFlag` entities
- Enterprise capabilities must never leak into MVP builds via bundle

---

## SECTION 7 — ARCHITECTURE PRINCIPLES

### Purpose
Define the immutable principles that govern every architectural decision. Violation requires EARB approval.

| # | Principle | Statement |
|---|-----------|-----------|
| AP-01 | **Offline First** | Every feature must work without internet. Connectivity is enhancement, not dependency. |
| AP-02 | **Additive Only** | No existing entity, field, enum, or service may be removed or modified. Only additions allowed. |
| AP-03 | **Feature First** | Capabilities are organized by feature/domain, not by technical layer. |
| AP-04 | **Domain Driven** | Bounded contexts own their data. No cross-context direct entity access. |
| AP-05 | **Privacy by Design** | PII is minimized at schema level. Consent gates all data collection. |
| AP-06 | **Security by Default** | DPDP compliance, parental consent, data residency all baked into foundation. |
| AP-07 | **AI Agnostic** | AI capabilities are provider-abstracted. Any model may be swapped without feature changes. |
| AP-08 | **Configuration over Code** | Feature behavior is driven by configuration (FeatureFlag, ContentPack, Rules) not if/else. |
| AP-09 | **Clean Boundaries** | Services call only their own repository. Cross-domain calls go through defined service interfaces. |
| AP-10 | **No God Objects** | No service handles more than one aggregate root's primary responsibility. |
| AP-11 | **i18n Mandatory** | No hardcoded strings in UI. All visible text comes from i18n translation files. |
| AP-12 | **Schema Versioning** | Every Dexie schema change increments the version. No destructive migrations. |
| AP-13 | **TypeScript Strict** | Zero `any` types. Strict mode enabled. All types declared in `src/types/index.ts`. |
| AP-14 | **Test Coverage** | Every service method must have at minimum a unit test. New pages require integration tests. |
| AP-15 | **Accessibility** | WCAG 2.1 AA minimum. All interactive elements keyboard-navigable. |

### Anti-patterns
- Bypassing the service layer to read IndexedDB directly from components
- Storing connectivity-dependent state as the source of truth
- Hardcoding feature availability in component logic
- Importing across bounded context boundaries

---

## SECTION 8 — ARCHITECTURE CONSTRAINTS

### Purpose
Define immutable constraints that bound the solution space.

| Constraint | Detail | Rationale |
|-----------|--------|-----------|
| **Browser-only runtime** | No server required for MVP. Dexie.js is the database. | Offline-first mandate |
| **IndexedDB storage limit** | ~50MB default quota on most Android devices | India device profile |
| **Bundle size** | Initial JS bundle ≤ 200KB gzipped | Low-bandwidth assumption |
| **No third-party analytics** | No Google Analytics, Mixpanel, etc. in MVP | DPDP / child privacy |
| **pnpm workspaces** | Monorepo managed by pnpm. No npm or yarn. | Established convention |
| **wouter routing** | react-router-dom installed but not used for routing. wouter only. | Established convention |
| **Tailwind CSS v4** | No inline styles in production code. No CSS-in-JS. | Established convention |
| **No class components** | React functional components + hooks only | Established convention |
| **TypeScript strict** | `strict: true` in tsconfig. Zero `any`. | Code quality |
| **Dexie for all local data** | No localStorage for structured data. Dexie only. | Consistency |

---

## SECTION 9 — ASSUMPTIONS

### Purpose
Document assumptions that, if violated, would require architecture re-evaluation.

1. The primary user device is a mid-range Android smartphone (2–3GB RAM, Android 10+)
2. Connectivity is intermittent — offline periods of 1–7 days are normal
3. Children ages 8–12 will be guided by parents; ages 13–18 have higher autonomy
4. School Edition deployment is school-managed, not student-managed
5. Enterprise Edition is organization-managed with IT admin involvement
6. AI features are best-effort — offline fallback is always available
7. DPDP 2023 is the governing privacy law; state-level variations are handled via `RegionalPolicy`
8. All 10 Indian languages require full feature parity, not subset support
9. The domain model (232 entities, v11 schema) is frozen — no entity redesign is permitted

---

## SECTION 10 — ARCHITECTURE GUARDRAILS

### Purpose
Define hard limits that no implementation decision may cross.

| Guardrail | Rule |
|-----------|------|
| **G-01** | No component may directly access `db.*` — must go through a service |
| **G-02** | No service may own more than one aggregate root |
| **G-03** | No feature flag check in domain logic — only at feature entry points |
| **G-04** | No AI call without fallback content |
| **G-05** | No PII written to browser console or telemetry |
| **G-06** | No cross-tenant data access in any query |
| **G-07** | No hardcoded locale strings in JSX |
| **G-08** | No schema downgrade — schema version is monotonically increasing |
| **G-09** | No `any` type in TypeScript — use `unknown` with type guards |
| **G-10** | No sync operation that overwrites local unsynced changes without conflict resolution |
| **G-11** | No third-party script loaded without consent gate |
| **G-12** | No storage of raw AI model responses without prompt metadata |

---

## SECTION 11 — CONTEXT DIAGRAM

### Purpose
Show the high-level system boundaries and external actors.

```
                           ┌──────────────────────────────────────────┐
                           │              LifePilot PWA               │
                           │         (Browser / Offline-First)        │
                           │                                          │
  ┌──────────┐             │  ┌─────────────┐  ┌──────────────────┐  │
  │  Student │────────────▶│  │  IndexedDB  │  │  Service Worker  │  │
  └──────────┘             │  │  (Dexie.js) │  │  (Workbox PWA)   │  │
                           │  └─────────────┘  └──────────────────┘  │
  ┌──────────┐             │                                          │
  │  Parent  │────────────▶│  ┌─────────────┐  ┌──────────────────┐  │
  └──────────┘             │  │  i18n Layer │  │  Feature Flags   │  │
                           │  │ (10 langs)  │  │  (FeatureFlag)   │  │
  ┌──────────┐             │  └─────────────┘  └──────────────────┘  │
  │ Teacher  │────────────▶│                                          │
  └──────────┘             └──────────────┬───────────────────────────┘
                                          │ (optional, when online)
  ┌──────────┐                            ▼
  │Enterprise│─────────┐  ┌──────────────────────────────────────────┐
  │  Admin   │         │  │            Optional Cloud Layer          │
  └──────────┘         └─▶│  Sync API │ AI Gateway │ Content CDN    │
                           └──────────────────────────────────────────┘
                                          │
                           ┌──────────────▼───────────────────────────┐
                           │            External Services             │
                           │  AI Provider │ Payment Gateway │ SMS OTP │
                           └──────────────────────────────────────────┘
```

---

## SECTION 12 — CONTAINER DIAGRAM

### Purpose
Define the deployable containers and their relationships.

| Container | Technology | Responsibility |
|-----------|-----------|----------------|
| **PWA Shell** | React 19 + Vite 7 | Application shell, routing, layout |
| **Offline Store** | Dexie.js (IndexedDB) | All structured data, source of truth |
| **Service Worker** | Workbox | Asset caching, background sync, push notifications |
| **i18n Engine** | i18next | Translation, locale management |
| **AI Gateway** (optional) | Provider-agnostic REST client | Proxies AI requests; offline fallback |
| **Sync Engine** (optional) | Custom sync service | Conflict resolution, eventual consistency |
| **Admin API** (School/Enterprise) | Express / Node.js | Institution management, reporting |

### Future Containers (Reserved)
- Content Delivery API (CDN-backed content packs)
- Notification Service (push + in-app)
- Analytics Ingestion (privacy-preserving)
- Marketplace API

---

## SECTION 13 — COMPONENT DIAGRAM

### Purpose
Define the internal component structure within the PWA container.

```
src/
├── app/                    ← Application bootstrap, providers, error boundary
├── modules/                ← Feature modules (one per product domain)
│   ├── cockpit/            ← Home dashboard
│   ├── pilot/              ← Identity & profile
│   ├── flight-plan/        ← Goals
│   ├── flight-log/         ← Journal
│   ├── money-quest/        ← Financial literacy
│   ├── life-choices/       ← Values & decision intelligence
│   ├── career-explorer/    ← Career discovery
│   └── future-me/          ← Future letters & aspirations
├── components/
│   ├── ui/                 ← shadcn/ui primitives (no business logic)
│   ├── common/             ← Shared UI: OfflineIndicator, ThemeToggle
│   └── layout/             ← AppShell, navigation
├── storage/
│   ├── db.ts               ← Dexie database definition
│   └── storageService.ts   ← All service layer objects
├── hooks/                  ← Custom React hooks
├── localization/           ← i18n config + 10 locale JSON files
├── types/index.ts          ← SINGLE SOURCE OF TRUTH for all types
├── theme/tokens.ts         ← MODULES array, design tokens
└── utils/index.ts          ← Pure utility functions
```

---

## SECTION 14 — LAYERED ARCHITECTURE

### Purpose
Define the strict layer hierarchy and permitted dependency directions.

```
┌─────────────────────────────────────────┐
│  PRESENTATION LAYER                     │
│  Pages, Components, Hooks               │
│  → reads from: Service Layer            │
│  → NEVER directly accesses: db.*        │
├─────────────────────────────────────────┤
│  SERVICE LAYER                          │
│  storageService.ts service objects      │
│  → reads from: Repository / db.*        │
│  → NEVER imports from: Presentation     │
├─────────────────────────────────────────┤
│  REPOSITORY / STORAGE LAYER             │
│  db.ts (Dexie tables)                   │
│  → reads from: IndexedDB               │
│  → NEVER imports from: Service/UI       │
├─────────────────────────────────────────┤
│  DOMAIN LAYER                           │
│  types/index.ts — Interfaces, Enums     │
│  → imported by: ALL layers              │
│  → imports from: NOTHING               │
└─────────────────────────────────────────┘
```

### Dependency Rule (Strict)
- Presentation → Service → Repository → Domain
- Domain has zero dependencies
- No layer may skip a layer (no Presentation → Repository directly)
- No upward dependencies

### Anti-patterns
- Calling `db.pilots.toArray()` from a React component
- Importing a Page component into a service
- Putting business logic in a shadcn/ui component

---

## SECTION 15 — DOMAIN ARCHITECTURE

### Purpose
Define the major domains (bounded contexts) and their ownership of the 232 entities.

| Domain | Entities (count) | Aggregate Root |
|--------|-----------------|----------------|
| **Identity** | Pilot, EmergingIdentity, FutureIdentity, PersonalityProfile, PersonalBelief, LifePrinciple (20) | Pilot |
| **Learning** | Mission, Habit, DailyMission, Competency, Curriculum, CurriculumModule (25) | Pilot |
| **Assessment** | Assessment, AssessmentResult, LifeWheel, GrowthIndicator, DevelopmentMilestone (20) | Pilot |
| **Career** | CareerPath, CareerGoal, CareerExploration, CareerMentor, Industry (15) | Pilot |
| **Wellbeing** | WellbeingProfile, WellbeingAssessment, WellbeingDimension, WellbeingSnapshot (12) | Pilot |
| **Achievement** | LifeAchievement, AchievementProgress, AchievementEvidence, Badge, Certificate (15) | Pilot |
| **Decision Intelligence** | DecisionScenario, DecisionScenarioOutcome, DecisionReflection, DecisionPattern, DecisionRule (10) | Pilot |
| **Timeline** | LifeTimelineEvent, TimelineCollection, TimelineNarrative (8) | Pilot |
| **Financial Literacy** | FinancialGoal, SavingsTracker, FinancialLesson, MoneyChallenge (12) | Pilot |
| **Community** | Relationship, CommunityMember, Group, GroupMembership (10) | Pilot |
| **Platform** | FeatureFlag, Subscription, Notification, Recommendation, KnowledgeGraph (30) | Platform |
| **AI** | AIPrompt, AIInteraction, AIInsight, PromptTemplate, ModelConfig (15) | Platform |
| **Institution** | Institution, Cohort, Counsellor, Program, Tenant (15) | Institution |
| **Localization** | Language, Translation, LocalizedContent, CountryConfig (10) | Platform |

---

## SECTION 16 — BOUNDED CONTEXTS

### Purpose
Define the boundaries within which a domain model applies and how contexts communicate.

### Context Map
```
[Pilot Context] ──────────▶ [Learning Context]
      │                           │
      │                           ▼
      │                     [Assessment Context]
      │                           │
      ▼                           ▼
[Identity Context]          [Career Context]
      │
      ├──────────────────▶ [Wellbeing Context]
      │
      ├──────────────────▶ [Decision Context]
      │
      ├──────────────────▶ [Achievement Context]
      │
      └──────────────────▶ [Timeline Context]

[Platform Context] ──────▶ [All Contexts] (via Feature Flags)
[Institution Context] ───▶ [Pilot Context] (via Cohort membership)
[AI Context] ────────────▶ [All Contexts] (read-only, advisory)
```

### Context Communication Rules
- Contexts communicate via **domain events**, not direct entity access
- The Pilot ID is the shared key that crosses all contexts
- The Platform Context provides feature flags to all other contexts
- AI Context is read-only advisory — it cannot mutate domain entities

### Governance Rules
- No module may import entities from another module's service files
- Cross-context data needs go through defined service interfaces
- Shared concepts (pilotId, tenantId) live in the Shared Kernel only

---

## SECTION 17 — AGGREGATE DESIGN

### Purpose
Define the aggregate roots and their boundaries.

### Core Aggregates

**Pilot Aggregate** (Central)
- Root: `Pilot`
- Controls: `PilotPreference`, `PilotSubscription`, `PilotProfile`
- Invariant: A pilot must have a valid `identityStage` and `ageGroup`

**Goal Aggregate**
- Root: `FlightPlanGoal`
- Contains: `GoalMilestone`, `GoalCheckIn`, `GoalReflection`
- Invariant: Milestones must sum to ≤ 100% progress

**Mission Aggregate**
- Root: `Mission`
- Contains: `DailyMission`, `MissionCompletion`, `MissionReflection`

**Assessment Aggregate**
- Root: `Assessment`
- Contains: `AssessmentQuestion`, `AssessmentResult`, `AssessmentRecommendation`

**DecisionScenario Aggregate**
- Root: `DecisionScenario`
- Contains: `DecisionScenarioOutcome`, `DecisionReflection`

**Institution Aggregate**
- Root: `Institution`
- Contains: `Cohort`, `ProgramEnrollment`, `InstitutionBranding`

### Governance Rules
- Aggregate roots are the only entry point for mutations within their boundary
- No service may modify a child entity without going through the aggregate root's service
- Aggregates do not reference other aggregates by object — only by ID

---

## SECTION 18 — DOMAIN EVENTS

### Purpose
Define the domain events that flow between bounded contexts.

| Event | Source Context | Target Context | Trigger |
|-------|---------------|----------------|---------|
| `PilotCreated` | Identity | All | New pilot registered |
| `MissionCompleted` | Learning | Achievement, Timeline, AI | Daily mission finished |
| `AssessmentCompleted` | Assessment | Identity, AI, Wellbeing | Assessment result saved |
| `GoalAchieved` | Learning | Achievement, Timeline | Goal 100% complete |
| `WellbeingAlertTriggered` | Wellbeing | AI, Notification | Burnout risk detected |
| `IdentityStageChanged` | Identity | All | Age group or stage transition |
| `DecisionMade` | Decision | Timeline, AI | Decision scenario resolved |
| `AchievementEarned` | Achievement | Timeline, Notification | Life achievement completed |
| `SubscriptionUpgraded` | Platform | Feature Flags | Tier changed |
| `ContentPackInstalled` | Marketplace | Learning, Career | New content pack added |

### Event Schema Convention
```typescript
interface DomainEvent<T = unknown> {
  eventId: string;         // UUID
  eventType: string;       // e.g. "MissionCompleted"
  aggregateId: number;     // aggregate root ID
  pilotId: number;
  tenantId?: string;
  occurredAt: Date;
  payload: T;
  version: number;         // event schema version
}
```

---

## SECTION 19 — EVENT BUS ARCHITECTURE

### Purpose
Define how domain events are published, stored, and consumed.

### Design
The event bus in the offline-first phase is **synchronous and local**, implemented via an in-memory event emitter. Events are also persisted to the `SyncQueue` table for later relay when connectivity is available.

```
Component/Service
      │
      ▼ dispatch(event)
  EventBus (in-memory)
      │
      ├──▶ LocalEventStore (Dexie.syncQueue)
      │
      ├──▶ Registered Handler 1 (AI Context)
      ├──▶ Registered Handler 2 (Notification Context)
      └──▶ Registered Handler 3 (Analytics Context)
```

### Implementation Pattern
```typescript
// eventBus.ts
type Handler<T> = (event: DomainEvent<T>) => void;
const handlers = new Map<string, Handler<unknown>[]>();

export const eventBus = {
  publish<T>(event: DomainEvent<T>): void { ... },
  subscribe<T>(eventType: string, handler: Handler<T>): () => void { ... },
};
```

### Future Evolution
- When backend is added: event bus relays to server-sent events / WebSocket
- Eventual CQRS separation where read models are built from event streams

---

## SECTION 20 — REPOSITORY ARCHITECTURE

### Purpose
Define the repository pattern over Dexie tables, ensuring clean separation.

### Pattern
Each aggregate root has a corresponding repository interface. The service layer uses only the repository interface, never `db.*` directly.

```typescript
// repositories/pilotRepository.ts
export interface PilotRepository {
  findById(id: number): Promise<Pilot | undefined>;
  findAll(): Promise<Pilot[]>;
  save(pilot: Omit<Pilot, "id">): Promise<number>;
  update(id: number, delta: Partial<Pilot>): Promise<number>;
  delete(id: number): Promise<void>;
}

// repositories/dexie/dexiePilotRepository.ts
export class DexiePilotRepository implements PilotRepository {
  async findById(id: number) { return db.pilots.get(id); }
  ...
}
```

### Benefits
- Repository interface can be swapped (e.g., for a server-backed implementation in School Edition)
- Unit tests mock the interface, not Dexie directly
- Enables eventual extraction to a microservice without changing service logic

### Governance Rules
- One repository per aggregate root
- Repository methods must be named: `findBy*`, `findAll*`, `save`, `update`, `delete`
- No business logic in repositories — filtering/sorting only
- All repository implementations must use `safeRun()` wrapper for error handling

---

## SECTION 21 — SERVICE ARCHITECTURE

### Purpose
Define the service layer pattern and conventions.

### `safeRun` Pattern
All service methods are wrapped in `safeRun()` which returns `StorageResult<T>`:

```typescript
export type StorageResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function safeRun<T>(fn: () => Promise<T>): Promise<StorageResult<T>> {
  try {
    return { success: true, data: await fn() };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}
```

### Service Naming Conventions
- File: `[domain]Service` (e.g., `pilotService`, `wellbeingAssessmentService`)
- Methods: `getForPilot`, `getById`, `getAll`, `create`, `update`, `archive`, `delete`
- Never expose `db` directly through a service

### Service Rules
- One service object per entity (or closely related entity group)
- Services may call other services for cross-domain reads (not writes)
- Services never import UI components or hooks
- Services are plain objects, not classes (exception: when implementing a repository interface)

### Anti-patterns
- Fat services that own multiple aggregate roots
- Services that contain presentation logic
- Services that call `db.*` without `safeRun` wrapping

---

## SECTION 22 — MODULE ARCHITECTURE

### Purpose
Define how product modules are structured and how they encapsulate features.

### Module Structure
Each product module (Cockpit, Pilot, FlightPlan, etc.) follows this structure:

```
modules/
  cockpit/
    components/       ← Module-local components
    hooks/            ← Module-local hooks
    pages/            ← Route-level components for this module
    utils/            ← Module-specific utilities
    index.ts          ← Public API (what the module exports)
```

### Module Metadata
Declared in `src/theme/tokens.ts` as the `MODULES` array:
```typescript
{ id: "cockpit", i18nId: "cockpit", path: "/cockpit", icon: Home, color: "..." }
```

### Module Rules
- A module owns its route, its pages, and its local components
- Modules communicate only via the service layer — never by importing each other's components
- Module-level routes are registered centrally in the router
- Each module declares its minimum edition requirement via feature flags

---

## SECTION 23 — FEATURE ARCHITECTURE

### Purpose
Define how individual features are built, gated, and evolved.

### Feature Lifecycle
```
Feature Spec → Feature Flag (disabled) → Implementation
→ QA on feature branch → Flag enabled for beta
→ Rollout via FeatureFlag/FeatureRollout → GA
```

### Feature Flag Integration
```tsx
function useFeature(flagKey: string): boolean {
  // reads from FeatureFlag table via featureFlagService
  // respects PilotSubscription tier
}

// Usage in component:
const hasDecisionIntelligence = useFeature("decision_intelligence");
if (!hasDecisionIntelligence) return <UpgradePrompt />;
```

### Governance Rules
- Every non-MVP feature must be behind a feature flag at launch
- Feature flags have a sunset date — they are removed after GA
- Flags are stored in `FeatureFlag` Dexie table, not in environment variables
- No features removed — only archived behind a permanent "legacy" flag

---

## SECTION 24 — SHARED KERNEL

### Purpose
Define the shared concepts and utilities available to all bounded contexts.

### Shared Kernel Contents
```
src/types/index.ts         ← All entity interfaces and enum types
src/utils/index.ts         ← cn(), formatDate, formatRelativeDate, truncate
src/storage/db.ts          ← Database definition (Dexie instance)
src/storage/storageService.ts ← Service layer (safeRun, StorageResult)
src/theme/tokens.ts        ← MODULES array, design tokens
src/localization/i18n.ts   ← i18next configuration
```

### Rules
- Shared Kernel types are immutable — additions only
- No feature-specific code in the shared kernel
- The shared kernel has no imports from module folders
- The Pilot ID is the universal cross-context identifier

---

## SECTION 25 — FOLDER STRUCTURE

### Purpose
Define the complete production folder structure with ownership and rules.

```
artifacts/lifepilot/
├── public/
│   ├── icons/              ← PWA icons (icon-192.png, icon-512.png)
│   ├── fonts/              ← Self-hosted fonts for offline use
│   └── offline.html        ← Offline fallback page
│
├── src/
│   ├── app/
│   │   ├── AppProviders.tsx       ← i18n, theme, locale providers
│   │   ├── ErrorBoundary.tsx      ← Global error boundary
│   │   └── Router.tsx             ← wouter route definitions
│   │
│   ├── modules/                   ← Feature modules (one per domain)
│   │   ├── cockpit/
│   │   ├── pilot/
│   │   ├── flight-plan/
│   │   ├── flight-log/
│   │   ├── money-quest/
│   │   ├── life-choices/
│   │   ├── career-explorer/
│   │   └── future-me/
│   │
│   ├── components/
│   │   ├── ui/                    ← shadcn/ui primitives ONLY
│   │   ├── common/                ← Shared stateful components
│   │   └── layout/                ← AppShell, navigation
│   │
│   ├── storage/
│   │   ├── db.ts                  ← Dexie DB + Table declarations
│   │   └── storageService.ts      ← All service objects
│   │
│   ├── repositories/              ← (FUTURE) Repository interfaces + implementations
│   │   ├── interfaces/
│   │   └── dexie/
│   │
│   ├── events/                    ← (FUTURE) EventBus + DomainEvent types
│   │
│   ├── hooks/                     ← Global hooks (useTheme, useLocale, etc.)
│   │
│   ├── localization/
│   │   ├── i18n.ts
│   │   └── locales/               ← en, hi, ta, te, kn, ml, mr, bn, gu, pa
│   │
│   ├── theme/
│   │   └── tokens.ts              ← MODULES array, CSS token names
│   │
│   ├── types/
│   │   └── index.ts               ← SINGLE SOURCE OF TRUTH — all types
│   │
│   └── utils/
│       └── index.ts               ← Pure utility functions
│
├── tests/
│   ├── unit/                      ← Vitest unit tests
│   ├── integration/               ← Component integration tests
│   └── e2e/                       ← Playwright E2E tests (future)
│
├── docs/                          ← Architecture docs, ADRs
│   └── adr/                       ← Architecture Decision Records
│
└── scripts/                       ← Build, migration, seed scripts
```

### Folder Ownership Rules
| Folder | Owner | Allowed Imports | Forbidden Imports |
|--------|-------|-----------------|-------------------|
| `modules/*` | Feature team | `components/`, `hooks/`, `storage/`, `types/`, `utils/` | Other `modules/*` directly |
| `components/ui/` | Design system | `types/` only | Any module, any storage |
| `storage/` | Data team | `types/` only | Any module, any component |
| `types/` | Architecture | Nothing | Everything else |

---

## SECTION 26 — DEPENDENCY RULES

### Purpose
Define allowed and forbidden dependency directions.

```
ALLOWED (→ means "may import from"):
  pages         → hooks, components, utils, types
  components    → hooks, utils, types
  hooks         → storage/storageService, utils, types
  storage/storageService → storage/db, types
  storage/db    → types
  types         → (nothing)
  utils         → types

FORBIDDEN:
  ✗ storage/* → components/*
  ✗ storage/* → hooks/*
  ✗ types/* → anything else
  ✗ module A → module B components directly
  ✗ components/ui → any module
  ✗ any file → db.ts (except storageService.ts)
```

### Future Service Boundaries
When the backend API is introduced:
- A new `api/` folder replaces direct `storageService` calls for online data
- Repository implementations switch from `DexieRepository` to `ApiRepository`
- No component code changes — only repository wiring changes

---

## SECTION 27 — OFFLINE FIRST ARCHITECTURE

### Purpose
Define the strategy that ensures 100% feature availability without connectivity.

### Architecture Principles
1. **Local-Write-First**: All writes go to IndexedDB immediately. Sync happens asynchronously.
2. **No Network Dependency**: Every feature must have a complete offline implementation.
3. **Optimistic UI**: UI updates immediately from local state; sync failures are surfaced quietly.
4. **Conflict Resolution**: Last-write-wins with `updatedAt` timestamp; conflict records stored in `SyncConflict`.
5. **Progressive Enhancement**: When online, AI features, rich media, and sync are enabled; core is always local.

### Storage Strategy
```
IndexedDB (Dexie v11)
  ├── All entity data (232 entity types)
  ├── Sync queue (pending operations)
  ├── Content cache (downloaded content packs)
  └── AI response cache (last N AI interactions)

Service Worker Cache (Workbox)
  ├── App shell (HTML, JS, CSS)
  ├── Translation files (all 10 languages)
  ├── PWA assets (icons, fonts)
  └── Content pack assets (images, audio)
```

### Offline Detection
```typescript
export function useOfflineStatus(): boolean {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  useEffect(() => {
    const setOnline = () => setIsOffline(false);
    const setOffline = () => setIsOffline(true);
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);
    return () => { window.removeEventListener(...) };
  }, []);
  return isOffline;
}
```

### Governance Rules
- No feature may show an error state when offline if the data exists locally
- All forms must queue submissions when offline and sync when online
- The `OfflineIndicator` component must always be visible in the AppShell
- No feature may block rendering on a network request

---

## SECTION 28 — SYNCHRONIZATION ARCHITECTURE

### Purpose
Define the strategy for syncing local data to the cloud when connectivity is available.

### Sync Model: Event-Sourced Delta Sync
```
Local Write → SyncQueue entry → Sync Engine (when online)
  → POST /api/sync/batch → Server applies delta → Returns conflicts
  → Conflict Resolution → Merge → Update local state
```

### SyncQueue Entry
```typescript
interface SyncQueueEntry {
  id?: number;
  entityType: string;
  entityId: number;
  operation: "create" | "update" | "delete";
  payload: string;          // JSON
  pilotId: number;
  tenantId?: string;
  status: "pending" | "syncing" | "synced" | "failed" | "conflict";
  retryCount: number;
  createdAt: Date;
  syncedAt?: Date;
}
```

### Conflict Resolution Strategy
| Conflict Type | Resolution |
|--------------|------------|
| Same field, different values | Last-write-wins (by `updatedAt`) |
| Local delete + remote update | Remote update wins (soft delete locally) |
| Local update + remote delete | Local update wins (restore entity) |
| Structural conflict | Flagged in `SyncConflict` for manual resolution |

### Future Evolution
- Operational Transform for collaborative features (shared goals, group cohorts)
- CRDT for wellbeing data that merges across devices

---

## SECTION 29 — INDEXEDDB ARCHITECTURE

### Purpose
Define the IndexedDB schema governance and Dexie conventions.

### Schema Versioning Rules
1. Schema version is monotonically increasing (current: v11)
2. Each version adds new stores — never removes or renames existing ones
3. New stores are added in `this.version(N).stores({...})`
4. Versions are declared in **descending order** in the constructor (highest first)
5. Index additions to existing stores require a version increment

### Index Strategy
| Query Pattern | Index Type |
|--------------|-----------|
| Single field lookup | Simple index: `fieldName` |
| Multi-condition filter | Compound index: `[field1+field2]` |
| Range queries (date) | Index on date field, use `.where("date").between()` |
| Boolean flags | Index: `isActive` with `.equals(1)` |

### Storage Limits
- Estimated usage per pilot: 2–5MB for 1 year of active usage
- Target: ≤ 20MB total for MVP features per pilot
- Content packs: max 10MB each, managed separately
- AI response cache: max 5MB, LRU eviction

### Governance Rules
- All Dexie `Table<T>` fields must use the `!` assertion (Dexie sets them internally)
- `isActive` boolean is stored as `0`/`1` — use `.equals(1)` in queries
- No raw JSON blobs > 16KB stored in a single field
- `createdAt` and `updatedAt` on all mutable entities

---

## SECTION 30 — WORKFLOW ENGINE

### Purpose
Define the workflow engine that powers multi-step processes (onboarding, programs, journeys).

### Architecture
The workflow engine is driven by `WorkflowDefinition` + `WorkflowInstance` entities already in the domain model.

```
WorkflowDefinition (template)
  └── WorkflowStep[] (ordered)
        └── WorkflowAction (type: assessment | mission | reflection | content)

WorkflowInstance (per-pilot execution)
  └── WorkflowStepCompletion[] (progress tracking)
```

### Engine Rules
- Workflows are declarative — defined as data, not code
- Step transitions may be conditional on prior step outcomes
- Workflows support branching (if value > threshold → path A, else path B)
- The engine is offline-capable — all workflow state is local

### Future Evolution
- Visual workflow builder for School Edition administrators
- AI-generated adaptive workflows based on pilot assessment results

---

## SECTION 31 — RULES ENGINE

### Purpose
Define the rules engine that powers intelligent behavior without hardcoded logic.

### Architecture
The rules engine evaluates `InterventionRule` entities against pilot state to produce `InterventionRecommendation` entries.

```typescript
interface InterventionRule {
  id?: number;
  ruleType: string;
  conditions: string;      // JSON condition tree
  actions: string;         // JSON action array
  priority: number;
  isActive: boolean;
}
```

### Rule Evaluation
```
Pilot State Snapshot → Rule Engine → Matching Rules
  → Sort by priority → Execute actions
    → Create recommendations / trigger notifications / update state
```

### Example Rule
```json
{
  "conditions": { "and": [
    { "field": "wellbeingAssessment.burnoutRisk", "op": "gte", "value": 8 },
    { "field": "habitStreak.daysMissed", "op": "gte", "value": 3 }
  ]},
  "actions": [{ "type": "create_recommendation", "category": "wellbeing_intervention" }]
}
```

### Governance Rules
- Rules are data — never hardcode rule logic in components
- All rules are versioned and auditable
- Rule changes require a content governance review

---

## SECTION 32 — RECOMMENDATION ENGINE

### Purpose
Define the recommendation engine that delivers personalized guidance.

### Architecture
```
Input:  Pilot state (assessments, goals, habits, wellbeing, personality)
        + ContentPackItem catalog
        + Rule outputs
        + AI insights (optional)

Processing: Scoring function → Rank items → Filter by edition + feature flag

Output: RecommendationQueue (ordered list of actionable items)
```

### Recommendation Types
| Type | Source | Example |
|------|--------|---------|
| Mission recommendation | Rules + assessment | "Try a leadership mission based on your DISC profile" |
| Career path suggestion | Career data + goals | "Software engineering matches your competencies" |
| Wellbeing intervention | Wellbeing rules | "Take a 5-minute breathing break — your stress is high" |
| Content suggestion | AI + content catalog | "This article on growth mindset fits your current stage" |

### Offline Strategy
- Rule-based recommendations are always available offline
- AI recommendations are cached from last online session
- Fallback recommendations exist for every scenario

---

## SECTION 33 — ASSESSMENT ARCHITECTURE

### Purpose
Define how assessments are built, administered, and scored.

### Assessment Types
| Type | Entities | Notes |
|------|----------|-------|
| Personality (Big Five, DISC, MBTI) | `PersonalityAssessment`, `PersonalityTrait` | Multi-framework |
| Life Wheel | `LifeWheelEntry` | Radial self-assessment |
| Career Readiness | `AssessmentResult` | Mapped to `CareerReadiness` |
| Wellbeing | `WellbeingAssessment` | 10-dimension model |
| Competency | `CompetencyAssessment` | Maps to curriculum outcomes |
| Values Clarification | `AssessmentResult` | Ranks `Value` entities |

### Assessment Flow
```
Assessment definition → Question presentation → Response capture
  → Local scoring (all scoring is local, offline)
  → AssessmentResult saved → Domain event: AssessmentCompleted
  → Triggers: AI insight, recommendation, timeline event, identity update
```

### Governance Rules
- Assessment scoring algorithms are open and explainable — no black box scoring
- All assessment results stored indefinitely (historical analysis)
- Assessment data classified as sensitive PII — extra encryption in sync

---

## SECTION 34 — WELLBEING ARCHITECTURE

### Purpose
Define the multi-dimensional wellbeing tracking and intervention system.

### 10-Dimension Wellbeing Model
Physical · Mental · Emotional · Social · Financial · Career · Learning · Purpose · Environmental · Spiritual (optional)

### Data Flow
```
Wellbeing event (manual check-in, mission completion, habit streak)
  → WellbeingAssessment.record()
  → WellbeingDimension scores updated
  → WellbeingSnapshot persisted
  → WellbeingProfile.trend recalculated
  → If burnoutRisk ≥ threshold → WellbeingAlertTriggered event
  → Rules engine creates InterventionRecommendation
  → AI Coach notified (if online)
```

### Privacy Rules
- Wellbeing data is the most sensitive PII category
- No wellbeing scores transmitted without explicit user consent
- School Edition: teacher sees aggregate cohort trends, never individual scores
- Enterprise Edition: HR sees team-level anonymized trends only

---

## SECTION 35 — ACHIEVEMENT ARCHITECTURE

### Purpose
Define the dual achievement model: gamification badges + portfolio life achievements.

### Two-Track Achievement Model

**Track 1: Gamification** (`Achievement` — v0.1.x)
- Points, badges, streaks
- Immediate dopamine feedback
- For ages 8–14 primarily

**Track 2: Portfolio** (`LifeAchievement` — v1.4)
- Verified, evidence-backed life achievements
- Resume/portfolio export
- Academic, leadership, career, community
- For ages 14–25

### Portfolio Export Pipeline
```
LifeAchievement (verified) + LifeAchievementEvidence
  → Portfolio Renderer (HTML template)
  → PDF export (print CSS)
  → Resume section export (structured JSON)
  → Timeline integration
```

### Governance Rules
- Gamification should not trivialize portfolio achievements — they are separate tracks
- Evidence upload must include file type validation and size limit (max 5MB per file)
- Achievement verification requires a secondary actor (counsellor, teacher, parent)

---

## SECTION 36 — IDENTITY EVOLUTION ARCHITECTURE

### Purpose
Define how pilot identity evolves over the platform lifecycle.

### Identity Model
```
Pilot (base profile)
  └── EmergingIdentity (current self-perception)
  └── FutureIdentity (aspired future self)
  └── FutureVision (5/10-year life vision)
  └── PersonalityProfile[] (over time — evolution tracked)
  └── CoreValueEvolution[] (value shifts over time)
  └── DevelopmentStage (age-based stage assignment)
  └── GrowthDimension[] (growth across 8 dimensions)
```

### Identity Change Events
- Age group transition → new DevelopmentStage assigned → new content unlocked
- Assessment completion → identity insight generated
- Value re-ranking → `CoreValueEvolution` recorded
- Future letter opened → identity reflection triggered

### Architecture Principle
Identity is never overwritten — only evolved. Every identity state is stored with a timestamp, enabling the "Life Replay" feature.

---

## SECTION 37 — PERSONALITY ARCHITECTURE

### Purpose
Define the multi-framework personality assessment and growth tracking.

### Supported Frameworks
- **Big Five** (OCEAN): Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism
- **DISC**: Dominance, Influence, Steadiness, Conscientiousness
- **MBTI**: 16 types (used informally — not clinical)
- **VIA Strengths**: 24 character strengths
- **Custom**: Extensible via `PersonalityFramework = "custom"`

### Growth Tracking
`PersonalityGrowth` records delta between assessments, enabling trend lines and AI-generated growth narratives.

### Privacy & Ethics
- Personality data is explicitly labeled as "exploratory self-understanding," not clinical diagnosis
- Results include educational disclaimers
- Parents of under-14s can view personality summary reports

---

## SECTION 38 — CURRICULUM FRAMEWORK ARCHITECTURE

### Purpose
Define how educational curricula (CBSE, ICSE, IB, NEP, etc.) integrate with LifePilot.

### Curriculum Hierarchy
```
Curriculum (e.g., CBSE Grade 9)
  └── CurriculumModule[] (e.g., "Leadership in Context")
        └── LearningOutcome[] (measurable outcomes)
        └── CompetencyMapping[] → Competency, Value, CareerPath
        └── Mission[] (daily missions fulfilling this module)
```

### Integration Points
- Assessment results map to `LearningOutcome.isAssessable` outcomes
- Mission completion contributes to curriculum module progress
- School Edition teachers see curriculum coverage per cohort

### School Edition Workflow
```
School Admin: Create Institution → Assign Curriculum
  → Teachers: Create Cohorts → Assign students (Pilots)
  → Students: Complete missions/assessments (local, offline)
  → Sync: Progress uploads when online → Teacher dashboard updated
```

---

## SECTION 39 — CAREER PLATFORM ARCHITECTURE

### Purpose
Define the career discovery and planning architecture.

### Career Discovery Flow
```
Career Assessment
  → StrengthProfile
  → CareerPath recommendations (rules + AI)
  → CareerGoal creation
  → Milestone planning
  → Industry exploration (ContentPack)
  → Mentor matching (School/Enterprise Edition)
  → Portfolio building (LifeAchievement)
```

### Career Data Model
`CareerPath` → `CareerGoal` → `CareerMilestone` → `CareerCheckIn` → `CareerReflection`
Linked to: `Competency`, `Strength`, `Industry`, `Mentor`, `Organization`

### Governance Rules
- Career suggestions are advisory — user always has final choice
- Career data from assessments is stored locally, not profiled centrally
- No career data sold or shared with employers without explicit opt-in

---

## SECTION 40 — FINANCIAL LITERACY ARCHITECTURE

### Purpose
Define the Money Quest (financial literacy) module architecture.

### Module Scope
- Financial goal setting (`FinancialGoal`)
- Savings tracking (`SavingsTracker`)
- Financial lessons (content-driven)
- Money challenge missions (`MoneyChallenge`)
- Financial health score (`FinancialHealthScore`)

### Age-Appropriate Design
- Ages 8–12: Basic concepts (saving, earning, needs vs wants)
- Ages 13–16: Budgeting, banking, investing basics
- Ages 17–18: Tax basics, EMI, credit, entrepreneurship basics

### Governance Rules
- No actual financial transactions — educational only
- No partnerships with financial institutions in MVP without transparency disclosure
- Financial content must be reviewed by a certified financial educator

---

## SECTION 41 — AI PLATFORM ARCHITECTURE

### Purpose
Define the provider-agnostic AI platform that powers coaching, recommendations, and narratives.

### Design Principles
- **Provider Abstraction**: AI calls go through a provider interface, never directly to OpenAI/Gemini/Anthropic
- **Offline Fallback**: Every AI feature has a rule-based or static fallback
- **Consent Gate**: AI features require explicit user opt-in
- **Prompt Registry**: All prompts are versioned and auditable
- **Cost Controls**: Token budgets per user tier enforced

### AI Platform Architecture
```
AI Feature (e.g., "Generate narrative for timeline")
  │
  ▼
AIRequestBuilder (assembles context from local data)
  │
  ▼
PromptRegistry (fetches versioned prompt template)
  │
  ▼
ModelRouter (selects provider based on config + availability)
  │
  ├──▶ Online: AI Provider API (OpenAI / Gemini / Anthropic)
  │                    │
  │                    ▼
  │             AIInteraction saved (with prompt metadata)
  │             AIInsight generated
  │
  └──▶ Offline: RuleBasedFallback (deterministic local logic)
```

### AI Provider Interface
```typescript
interface AIProvider {
  name: string;
  generate(prompt: string, config: AIGenerationConfig): Promise<AIResponse>;
  estimateTokens(prompt: string): number;
  isAvailable(): Promise<boolean>;
}
```

### Governance Rules
- No PII in prompts without explicit consent and anonymization
- All prompts stored with version ID
- AI responses stored with `promptId`, `modelId`, `tokenCount`
- Token budget: Free=0, Premium=500/day, School=2000/day, Enterprise=unlimited

---

## SECTION 42 — AI PROMPT ARCHITECTURE

### Purpose
Define the prompt management system.

### Prompt Registry
```typescript
interface PromptTemplate {
  id?: number;
  promptKey: string;         // e.g., "timeline.narrative.generate"
  version: number;
  template: string;          // Handlebars-style template
  variables: string;         // JSON schema of required variables
  modelId?: string;
  maxTokens: number;
  safetyFilters: string;
  isActive: boolean;
  createdAt: Date;
}
```

### Prompt Naming Convention
`[domain].[action].[variant]`
- `wellbeing.insight.daily`
- `career.recommendation.top3`
- `timeline.narrative.year_in_review`
- `decision.reflection.guided`

### Prompt Safety Rules
- All prompts include a system safety instruction preamble
- Prompts for under-14s have stricter content guardrails
- All prompts are reviewed by a child safety expert before activation
- No prompt may request PII from the AI model

---

## SECTION 43 — MEMORY ARCHITECTURE

### Purpose
Define how the AI maintains contextual memory about the pilot.

### Memory Model
AI memory is constructed from local data — no persistent memory on AI servers.

```
AI Context Window (per request):
  ├── Pilot summary (age, stage, top values, strengths)
  ├── Recent assessments (last 3 results)
  ├── Active goals (top 3)
  ├── Recent wellbeing snapshot
  ├── Current conversation history (last 5 exchanges)
  └── Relevant AIInsight[] (filtered by topic)
```

The memory is assembled by `AIContextBuilder` from Dexie data — never stored on external servers without consent.

### Memory Tiers
| Tier | Storage | Retention |
|------|---------|-----------|
| Session memory | In-memory only | Until app close |
| Recent memory | Dexie `AIInteraction` | Last 30 days |
| Long-term memory | Dexie `AIInsight` | Indefinite (local) |
| Cloud memory | Server-side (consent required) | Configurable |

---

## SECTION 44 — SEARCH ARCHITECTURE

### Purpose
Define offline-capable search across all content and pilot data.

### Search Strategy
- **Phase 1 (MVP)**: Dexie-based filtered queries, no full-text search
- **Phase 2 (Premium)**: In-browser full-text search using FlexSearch or Fuse.js
- **Phase 3 (Enterprise)**: Server-side search index for institution-wide queries

### Searchable Entities (Phase 2)
- Career paths, Missions, Content items, Journal entries, Achievements

### Governance Rules
- Search index is built from local data — no search queries sent to server in offline mode
- Search results respect feature flag edition gating
- Search latency target: < 200ms for up to 10,000 local records

---

## SECTION 45 — NOTIFICATION ARCHITECTURE

### Purpose
Define how notifications are generated and delivered.

### Notification Types
| Type | Delivery | Trigger |
|------|---------|---------|
| In-app badge | IndexedDB | Rule engine |
| In-app toast | React component | EventBus |
| PWA push | Service Worker | Server (optional) |
| Email digest | Server | Scheduled |

### Notification Pipeline
```
Domain Event / Rule Engine Trigger
  → notificationService.create()
  → Notification stored in Dexie
  → In-app: useNotifications() hook re-renders badge
  → Push (if online + consented): Service Worker push
```

### Governance Rules
- Children under 14: Push notifications require parental consent
- Notification frequency capped: max 3/day for free tier, configurable for others
- All notifications are opt-in, never opt-out by default

---

## SECTION 46 — ANALYTICS ARCHITECTURE

### Purpose
Define privacy-preserving analytics for product improvement.

### Privacy-First Analytics Model
- **No third-party analytics** (no Google Analytics, Mixpanel, etc.)
- **Local-first**: All analytics events written to Dexie `ActivityEvent` first
- **Aggregate-only sync**: Only aggregate metrics (never individual events) sync to server
- **Differential privacy**: Noise injection before aggregation for small cohorts

### Analytics Events (Local)
Powered by existing `ActivityEvent` entity:
```
eventType: "mission_completed" | "goal_created" | "assessment_taken" | ...
entityType: "Mission" | "Goal" | "Assessment" | ...
entityId: number
metadata: JSON (non-PII only)
```

### Governance Rules
- No user ID in analytics events transmitted externally — use cohort-level aggregates
- DPDP requires explicit consent before any analytics sync
- Analytics data older than 2 years is auto-deleted from server

---

## SECTION 47 — REPORTING ARCHITECTURE

### Purpose
Define reporting for School and Enterprise editions.

### Report Types
| Report | Edition | Generated By |
|--------|---------|-------------|
| Individual Progress Report | Premium+ | PDF from local data |
| Class Cohort Summary | School | Server aggregation |
| Institution Dashboard | School/Enterprise | Real-time server query |
| Wellbeing Heatmap | School/Enterprise | Anonymized aggregates |
| Career Readiness Index | School/Enterprise | Cohort analysis |
| Compliance Report | Enterprise | Audit log export |

### Privacy Rules
- Individual reports generated locally, never sent to server without consent
- Cohort reports use k-anonymity (minimum cohort size = 5 students)
- Teachers cannot see individual wellbeing scores — only anonymized class averages

---

## SECTION 48 — MEDIA ARCHITECTURE

### Purpose
Define how audio, video, and image assets are managed offline.

### Media Storage Strategy
```
ContentPack (downloaded from CDN when online)
  └── AudioAsset[] (motivational audio, guided exercises)
  └── MediaContent[] (images, icons, illustrations)

Service Worker Cache (Workbox)
  └── PWA shell assets
  └── Core media (bundled with app)
  └── Content pack media (downloaded on demand)
```

### Media Governance
- All media files must have offline-cached equivalents
- Audio files: MP3, max 2MB per file
- Images: WebP with AVIF fallback, max 500KB per image
- Video: Not supported in MVP (bandwidth constraints)
- Media license: All bundled media must be CC-licensed or owned

---

## SECTION 49 — INTEGRATION ARCHITECTURE

### Purpose
Define how LifePilot integrates with external systems.

### Integration Model
Powered by the `ExternalIntegration` + `SyncConnector` entities:

```
ExternalIntegration (configuration)
  └── SyncConnector (sync rules)
  └── IntegrationLog (audit trail)
  └── IntegrationEvent (event stream)
```

### Integration Categories
| Category | Examples | Direction |
|----------|---------|-----------|
| School SIS | Edunext, iSAMS, Fedena | Import student roster |
| Payment | Razorpay, Stripe | Subscription management |
| AI Providers | OpenAI, Gemini, Anthropic | AI feature enhancement |
| Content CDN | Cloudflare R2 | Content pack delivery |
| SMS/OTP | MSG91, Twilio | Phone verification |
| Government | DIKSHA, UDISE | NEP curriculum alignment |

### Integration Governance Rules
- All integrations must implement the `ExternalIntegration` interface
- No integration may store credentials in code — use `integrationConfig.credentialVault`
- All integration sync must go through `SyncConnector` with audit logging
- Integration failures must not break offline functionality

---

## SECTION 50 — API GOVERNANCE

### Purpose
Define the standards for all internal and external APIs.

### API Design Standards
- **REST** for all server APIs (JSON, camelCase fields)
- **Versioned routes**: `/api/v1/...`
- **Paginated responses**: all list endpoints paginated (default page=1, limit=20)
- **Error format**: `{ success: false, error: { code, message, details } }`
- **Success format**: `{ success: true, data: T, meta?: { page, total } }`

### API Security
- JWT Bearer token authentication for all authenticated endpoints
- Rate limiting: 60 requests/minute per user (configurable per tier)
- CORS: explicit allowlist, no wildcard in production
- Input validation: Zod schemas on all inputs

### Naming Standards
```
GET    /api/v1/pilots/:id
POST   /api/v1/pilots
PATCH  /api/v1/pilots/:id
DELETE /api/v1/pilots/:id
GET    /api/v1/pilots/:id/assessments
POST   /api/v1/pilots/:id/assessments
```

### Anti-patterns
- Never expose Dexie entity structures directly in API responses — use DTOs
- Never use DELETE for soft deletes — use PATCH with `{ isActive: false }`
- Never return all fields — use field selection or response DTOs

---

## SECTION 51 — PLUGIN ARCHITECTURE

### Purpose
Define the extensibility model for Marketplace plugins.

### Plugin Interface
```typescript
interface LifePilotPlugin {
  id: string;
  version: string;
  name: string;
  description: string;
  editionsRequired: Edition[];
  permissions: PluginPermission[];
  onInstall(): Promise<void>;
  onUninstall(): Promise<void>;
  routes?: PluginRoute[];
  menuItems?: PluginMenuItem[];
  hooks?: PluginHook[];
}
```

### Plugin Sandboxing
- Plugins run in isolated module scope
- Plugins declare required permissions at install time
- Plugins may not access `db.*` directly — only through a restricted `PluginAPI`
- Plugin code reviewed before Marketplace listing

### Plugin API Surface
```typescript
interface PluginAPI {
  pilot: { getCurrentPilot(): Promise<PilotSummary> };
  missions: { list(filter): Promise<MissionSummary[]> };
  achievements: { create(data): Promise<void> };
  events: { subscribe(eventType, handler): Unsubscribe };
  // ... scoped, permission-gated API
}
```

---

## SECTION 52 — MARKETPLACE ARCHITECTURE

### Purpose
Define the content and plugin marketplace.

### Marketplace Entities
`Marketplace`, `ContentPack`, `ContentPackItem`, `MarketplaceListing`, `MarketplacePurchase`

### Content Pack Types
| Type | Examples |
|------|---------|
| Curriculum pack | NEP Grade 9 life skills curriculum |
| Career pack | Healthcare career deep-dive |
| Language pack | Advanced Tamil content |
| Personality pack | Extended Big Five assessment |
| School pack | School-branded mission set |
| Audio pack | Guided meditation and mindfulness |

### Revenue Model
- Free packs: sponsored by NGOs/government
- Paid packs: revenue share (70% creator / 30% platform)
- School bundles: institution-licensed at per-student rates

### Governance Rules
- All marketplace content reviewed for child safety before listing
- Content packs are installed to Dexie locally after purchase/download
- Expired licenses disable content (via FeatureFlag expiry)

---

## SECTION 53 — SCHOOL EDITION ARCHITECTURE

### Purpose
Define the architecture extensions required for School Edition.

### School Edition Components
```
Institution (school)
  └── Cohort (class)
        └── PilotCohortMembership (student-class link)
        └── Counsellor (assigned counsellor)

Program (school program)
  └── ProgramEnrollment (student in program)
  └── Curriculum (CBSE, ICSE, etc.)
```

### Teacher/Counsellor Dashboard (Server-Side)
- Cohort progress view (aggregated, privacy-safe)
- Curriculum coverage report
- Wellbeing heatmap (anonymized)
- Flag students at risk (opt-in, consent-based)
- Assign missions/assessments to cohort

### Privacy Architecture for Schools
- Schools operate under a data processing agreement (DPA)
- Student data stored in school-region data residency
- Teachers cannot see raw student data without student consent (age 14+)
- Parental consent required for data processing of under-14 students
- Right to erasure honored within 30 days

---

## SECTION 54 — ENTERPRISE ARCHITECTURE

### Purpose
Define the architecture for Enterprise Edition deployments.

### Enterprise Features
- Dedicated tenant with custom domain and branding
- LDAP/SSO integration
- Enterprise RBAC (HR Admin, Manager, Employee, Coach roles)
- Cohort = Team/Department
- Custom program creation
- Enterprise analytics and compliance reporting
- Priority support SLA

### Multi-Tenant Data Model
```
Tenant (enterprise org)
  └── TenantConfig (branding, feature flags, SSO)
  └── Pilot (employees, with tenantId set)
  └── Institution (enterprise org as "institution")
  └── Cohort (teams/departments)
```

### Enterprise Governance
- Enterprise data isolated at row level (tenantId on every query)
- No cross-tenant data access in any query (enforced at service layer)
- Full audit trail of all data access
- Data residency: India-region by default, configurable

---

## SECTION 55 — MULTI-TENANT STRATEGY

### Purpose
Define the tenancy model across all editions.

### Tenancy Model: Shared Database, Row-Level Isolation
- All tenants share the IndexedDB schema (offline)
- Server-side: shared database with `tenantId` column on all tenant-scoped entities
- No per-tenant schema customization (additive extension only via content packs)

### Tenant Identification
```typescript
// Every cross-tenant entity includes:
interface TenantScoped {
  tenantId?: string;    // null = personal/no institution
  pilotId: number;
}
```

### Governance Rules
- Every server query for tenant-scoped data MUST include `WHERE tenantId = ?`
- Service layer enforces tenantId filter — not the route handler
- Tenant provisioning goes through `tenantService.provision()` — never manual DB inserts
- Tenant deletion triggers cascading data deletion with 30-day soft-delete window

---

## SECTION 56 — DEPLOYMENT ARCHITECTURE

### Purpose
Define the production deployment model.

### MVP Deployment (Offline PWA Only)
```
GitHub → CI/CD → Build (Vite) → Replit Deploy (static)
  → Service Worker registered → PWA installable
```

### Full Platform Deployment
```
┌─────────────────────────────────────────────────────┐
│  CDN (Cloudflare)                                   │
│  → Static PWA assets (HTML, JS, CSS, fonts)        │
│  → Content pack assets                              │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│  Application Server (Node.js / Express)             │
│  → /api/v1/* routes                                 │
│  → Sync endpoint                                    │
│  → AI Gateway proxy                                 │
│  → School/Enterprise APIs                           │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│  Database (PostgreSQL — server-side persistence)    │
│  → Mirror of IndexedDB schema (for sync)            │
│  → Institution/tenant data                          │
│  → Analytics aggregates                             │
└─────────────────────────────────────────────────────┘
```

### Region Strategy
- Primary region: India (Mumbai / ap-south-1)
- DPDP requires Indian user data to remain in India
- CDN: global edge for static assets

---

## SECTION 57 — CI/CD ARCHITECTURE

### Purpose
Define the continuous integration and delivery pipeline.

### Pipeline Stages
```
Code Push (GitHub)
  → Lint (ESLint)
  → Type Check (tsc --noEmit)
  → Unit Tests (Vitest)
  → Build (Vite)
  → Bundle Size Check (≤ 200KB gzipped)
  → E2E Tests (Playwright — future)
  → Security Scan (Semgrep)
  → Deploy to Preview (Replit)
  → Manual QA Gate
  → Deploy to Production
```

### Quality Gates (Mandatory before merge)
- Zero TypeScript errors
- Zero lint errors
- All Vitest tests pass
- Bundle size within limit
- No new `any` types introduced
- Accessibility audit pass (axe-core)

### Branch Strategy
```
main          ← Protected. Only CI-passing PRs merged here.
feature/*     ← Feature branches. Squash merged into main.
release/*     ← Release preparation branches.
hotfix/*      ← Emergency fixes. Merged to main + release.
```

---

## SECTION 58 — ENVIRONMENT STRATEGY

### Purpose
Define deployment environments and configuration.

| Environment | Purpose | Data |
|-------------|---------|------|
| Development | Local dev | Seeded test data |
| Preview | PR preview | Isolated test data |
| Staging | Pre-release validation | Production-like (anonymized) |
| Production | Live users | Real data |

### Environment Variables
```
VITE_APP_VERSION=1.4.0
VITE_AI_GATEWAY_URL=https://ai.lifepilot.in/v1
VITE_SYNC_API_URL=https://api.lifepilot.in/v1
VITE_FEATURE_ENV=production
VITE_SENTRY_DSN=...
```

### Rules
- No secrets in environment variables accessible to the browser (`VITE_*`)
- API keys live only on the server
- Feature flags override environment config for A/B testing

---

## SECTION 59 — RELEASE GOVERNANCE

### Purpose
Define the release management process.

### Release Types
| Type | Frequency | Scope |
|------|-----------|-------|
| Patch | As needed | Bug fixes, content updates |
| Minor | Bi-weekly | New features, non-breaking additions |
| Major | Quarterly | New editions, significant architecture additions |

### Release Checklist
- [ ] All tests passing
- [ ] Schema migration tested on v(N-1) data
- [ ] Changelog updated
- [ ] DPDP compliance review (for data-touching changes)
- [ ] Security review sign-off
- [ ] Performance budget validated
- [ ] Localization strings complete for all 10 languages
- [ ] Accessibility audit pass

---

## SECTION 60 — VERSIONING STRATEGY

### Purpose
Define how the platform, API, schema, and features are versioned.

| Artifact | Versioning | Current |
|----------|-----------|---------|
| Platform | Semantic (MAJOR.MINOR.PATCH) | 1.4.0 |
| Dexie Schema | Integer, monotonic | 11 |
| API | URL prefix (/api/v1/) | v1 |
| Prompt Templates | Integer per template | Varies |
| Content Packs | Semantic | Per pack |
| Domain Model | RP-0XX releases | RP-003 |

### Governance Rules
- Schema version is never decremented
- API v1 is supported for minimum 24 months after v2 launch
- Platform MAJOR increments require EARB approval
- Prompt template versions are immutable once published

---

## SECTION 61 — MIGRATION STRATEGY

### Purpose
Define how database and data migrations are handled.

### Dexie Migration Rules
1. New `this.version(N).stores({...})` block added for each schema increment
2. Blocks declared in descending order (highest version first in constructor)
3. Migration function added only when data transformation is needed:
```typescript
this.version(12).stores({ newTable: "++id, ..." })
  .upgrade(async (tx) => {
    // data transformation logic
    await tx.table("existingTable").toCollection().modify((record) => { ... });
  });
```
4. Migration must be tested on real v(N-1) data before release
5. Rollback: schema downgrades are NOT supported — use feature flags to disable broken features

### Server-Side Migration
- PostgreSQL migrations via SQL migration files (sequential, numbered)
- Migrations are additive only (no column removal)
- Migration tested in Staging before Production deployment

---

## SECTION 62 — SECURITY ARCHITECTURE

### Purpose
Define the comprehensive security posture.

### Security Layers
| Layer | Control |
|-------|---------|
| **Data at rest** | IndexedDB encrypted via browser security model; server data AES-256 |
| **Data in transit** | TLS 1.3 minimum for all API calls |
| **Authentication** | Session-based for MVP; JWT for API |
| **Authorization** | RBAC enforced at service layer |
| **Input validation** | Zod schemas on all user inputs |
| **Output encoding** | React DOM handles XSS by default |
| **Dependency security** | `pnpm audit` in CI pipeline |
| **Content Security Policy** | Strict CSP headers on all responses |

### Child Safety (Critical)
- No advertising networks
- No third-party social logins for under-13 (COPPA-equivalent)
- Parental consent flow for all data collection for under-14
- No direct messaging between minors (future community feature requires moderation)
- Content moderation on all user-generated text (journal, future letters)

### DPDP 2023 Compliance
- Data fiduciary registration with Data Protection Board
- Privacy Notice in all 10 supported languages
- Consent management via `ConsentRecord` entity
- Data Principal rights: access, correction, erasure, nomination
- Data localisation: all Indian user data stored in India

---

## SECTION 63 — AUTHENTICATION

### Purpose
Define the authentication system.

### Authentication Tiers
| Tier | Method | Notes |
|------|--------|-------|
| Individual (MVP) | PIN / passphrase (local only) | No server required |
| Premium | Email OTP + session JWT | Razorpay-linked account |
| School Edition | Institution SSO or email | LDAP/SAML optional |
| Enterprise | SAML 2.0 / OIDC | Corporate IdP integration |

### Pilot Identity (Local MVP)
- Pilot is created locally on first app launch
- Optional: link to phone number via OTP for cloud sync
- Biometric authentication for app unlock (device permission required)

### Session Management
- Session token stored in HttpOnly cookie (server sessions)
- Token refresh: 7-day expiry, automatic refresh on activity
- Logout: invalidate server session + clear local token

---

## SECTION 64 — AUTHORIZATION

### Purpose
Define the authorization model.

### Authorization Principle
All authorization checks happen at the **service layer**, not the route handler or component.

```typescript
// In service method:
async function getWellbeingReport(requesterId: number, targetPilotId: number) {
  const requester = await pilotService.getById(requesterId);
  if (!canViewWellbeingData(requester, targetPilotId)) {
    throw new UnauthorizedError("Insufficient permission");
  }
  // ... proceed
}
```

### Authorization Rules
- Pilots can only read/write their own data (except where explicit sharing is set up)
- Teachers can read cohort aggregate data (not individual)
- Counsellors can read individual data if student has consented
- Enterprise admins can access tenant-scoped data only
- Platform admins have read access to all data with full audit logging

---

## SECTION 65 — RBAC / ABAC

### Purpose
Define the role and attribute-based access control model.

### Roles
| Role | Scope | Capabilities |
|------|-------|-------------|
| `pilot` | Own data | Full CRUD on own entities |
| `parent` | Child pilot data | Read + consent management |
| `counsellor` | Cohort (with consent) | Read assessments, wellbeing (consented) |
| `teacher` | Cohort | Read aggregate progress |
| `institution_admin` | Institution | Manage cohorts, curricula, programs |
| `enterprise_admin` | Tenant | Manage users, config, reports |
| `platform_admin` | Global | Read-only audit; no data modification |
| `marketplace_reviewer` | Marketplace | Content review and approval |

### ABAC Rules (Attribute-Based)
- `ageGroup < 14` → requires `parentConsent = true` for data sync
- `edition = "free"` → feature flags cap access
- `tenantId ≠ requester.tenantId` → always denied, no exception

### Powered by `RoleAssignment` entity in domain model.

---

## SECTION 66 — PRIVACY ARCHITECTURE

### Purpose
Define the privacy-by-design implementation.

### PII Classification
| Classification | Examples | Storage | Sync |
|---------------|---------|---------|------|
| **Critical PII** | Name, DOB, phone, email | Encrypted field | Consent required |
| **Sensitive PII** | Wellbeing scores, personality, beliefs | Encrypted + consent | Explicit opt-in |
| **Behavioral data** | Mission completion, habits | Pseudonymized | Analytics opt-in |
| **Aggregated data** | Cohort averages | No PII | School/enterprise |
| **Public data** | Curriculum content, career descriptions | Open | Always synced |

### Data Minimization
- Collect only what is necessary for the feature
- Age is stored as `ageGroup` (range), not exact birthdate
- Profile photo is optional and stored locally only

### Consent Architecture
`ConsentRecord` entity tracks:
- Consent type (data sync, AI, analytics, push notifications)
- Consent state (granted/revoked)
- Consent date
- Consentee (pilot or parent for minors)

### Right to Erasure
```typescript
async function erasePilotData(pilotId: number): Promise<void> {
  // Cascading delete across all 232 entity tables for this pilotId
  // Preserves anonymized aggregates (cohort data)
  // Issues deletion event to sync engine for server-side erasure
  // Must complete within 30 days (DPDP requirement)
}
```

---

## SECTION 67 — COMPLIANCE ARCHITECTURE

### Purpose
Define the compliance framework.

### Applicable Regulations
| Regulation | Applicability | Status |
|-----------|--------------|--------|
| DPDP 2023 | All Indian users | Design compliant |
| IT Act 2000 | Platform operations | Compliant |
| NEP 2020 | School Edition | Curriculum aligned |
| UDISE+ | School integration | API integration planned |
| WCAG 2.1 AA | All users | Target standard |
| COPPA-equivalent | Under-13 users | Parental consent flow |

### Compliance Controls
- `ConsentRecord` for all data processing consent
- `RegionalPolicy` for state-level regulatory variations
- `AuditLog` for all sensitive data access
- `DataDeletionRequest` entity for right-to-erasure tracking

---

## SECTION 68 — AUDIT ARCHITECTURE

### Purpose
Define comprehensive audit trail capabilities.

### Audit Events
```typescript
interface AuditLog {
  id?: number;
  actorId: number;           // who performed the action
  actorRole: string;
  action: AuditActionType;   // "read" | "create" | "update" | "delete" | "export"
  entityType: string;
  entityId: number;
  tenantId?: string;
  ipAddress?: string;
  metadata?: string;         // non-PII context
  occurredAt: Date;
}
```

### What is Audited
- All access to wellbeing and personality data
- All admin actions (cohort changes, program enrollment)
- All data export events
- All consent record changes
- All feature flag changes
- All AI interactions (pilotId, promptId, tokenCount — no content)

### Retention
- Audit logs retained for 7 years (regulatory requirement)
- Audit logs are append-only (immutable)
- Audit logs exported to SIEM in Enterprise Edition

---

## SECTION 69 — DATA GOVERNANCE

### Purpose
Define enterprise data governance standards.

### Data Governance Framework

**Master Data**: `Pilot`, `Institution`, `Curriculum`, `CareerPath` — managed centrally
**Reference Data**: `DevelopmentStage`, `GrowthDimension`, `Language` — platform-managed, versioned
**Transaction Data**: Missions, Assessments, Goals — pilot-owned, private
**Metadata**: `FeatureFlag`, `PromptTemplate`, `WorkflowDefinition` — platform-managed

### Data Retention Policy
| Data Type | Retention | Action at Expiry |
|----------|-----------|-----------------|
| Mission completions | 10 years | Archive (no delete) |
| Wellbeing assessments | 5 years | Archive |
| Journal entries | User-controlled | Delete on request |
| Audit logs | 7 years | Immutable archive |
| AI interactions | 90 days | Auto-delete |
| Analytics events | 2 years | Aggregate then delete |
| Sync queue | 30 days | Auto-purge on success |

### Data Quality Rules
- No orphaned records (pilotId must reference a valid Pilot)
- All dates stored as UTC `Date` objects in Dexie
- `createdAt` is immutable after insert
- `updatedAt` is updated by service layer, never by components

### Backup Strategy
- IndexedDB: exported to encrypted JSON on demand (user-initiated)
- Server DB: daily snapshots, 30-day retention, cross-region replication
- Content packs: stored on CDN with versioned checksums

---

## SECTION 70 — AI GOVERNANCE

### Purpose
Define the enterprise AI governance framework.

### AI Governance Principles
| Principle | Implementation |
|-----------|---------------|
| **Transparency** | AI-generated content labeled "AI Suggested" |
| **Explainability** | AI insights include reason codes |
| **Human Override** | Any AI recommendation can be dismissed |
| **Privacy** | No PII in external AI prompts without consent |
| **Bias Monitoring** | Regular audit of recommendation distribution across demographics |
| **Safety** | Content safety filters on all AI outputs |
| **Consent** | AI features require explicit opt-in |
| **Child Safety** | Stricter filters for under-14 users |

### Responsible AI Standards
- No AI decision is final — always advisory
- AI Coach persona is clearly non-human
- No emotional manipulation patterns in prompts
- Escalation path: AI flags distress → suggests human counsellor

### AI Cost Governance
| Tier | Daily Token Budget | Monthly Cap |
|------|-----------------|-----------| 
| Free | 0 tokens | — |
| Premium | 50,000 tokens | 1.5M |
| School | 200,000 tokens/school | 6M |
| Enterprise | Configurable | Contract |

### Model Registry
```typescript
interface AIModelConfig {
  modelId: string;          // e.g., "gpt-4o-mini"
  provider: string;         // "openai" | "gemini" | "anthropic" | "local"
  maxContextTokens: number;
  costPer1kInputTokens: number;
  costPer1kOutputTokens: number;
  safetyLevel: "standard" | "child_safe" | "strict";
  isActive: boolean;
}
```

### Hallucination Handling
- Factual claims (career statistics, health advice) have source citations
- AI outputs for assessments are disclaimed as "for reflection, not clinical diagnosis"
- Confidence scores surfaced where available

### AI Audit Trail
Every AI interaction stored:
```typescript
AIInteraction {
  pilotId, promptTemplateId, promptVersion, modelId,
  inputTokens, outputTokens, latencyMs,
  safetyFilterTriggered, humanOverrideUsed,
  createdAt
}
// NOTE: prompt/response content NOT stored unless consent given
```

---

## SECTION 71 — LOGGING

### Purpose
Define logging standards across all layers.

### Log Levels
| Level | Use Case |
|-------|---------|
| `error` | Unhandled exceptions, data corruption |
| `warn` | Degraded functionality, fallback activated |
| `info` | Significant lifecycle events (app init, schema migration) |
| `debug` | Development only — removed in production builds |

### Logging Rules
- **No PII in logs** — ever. Use pilotId hash, not name/email
- **No AI prompt/response content in logs**
- **No console.log in production** — use structured logger
- Server: Pino JSON logger (compatible with log aggregation tools)
- Client: structured log to Dexie `AppLog` table (local), sampled to server

---

## SECTION 72 — MONITORING

### Purpose
Define production monitoring strategy.

### Monitoring Stack
| What | Tool | Threshold |
|------|------|-----------|
| Error rate | Sentry | Alert if > 1% of sessions |
| App startup time | Custom perf mark | Alert if P95 > 3s |
| Dexie query latency | Custom perf mark | Alert if P95 > 500ms |
| Service Worker health | Workbox metrics | Alert if cache miss > 20% |
| AI API latency | Custom timer | Alert if P95 > 5s |
| Sync success rate | SyncQueue analysis | Alert if < 95% |

### Alerting Rules
- Production error spike → PagerDuty → On-call engineer within 15 minutes
- Availability drop below 99.5% → Incident opened
- DPDP compliance breach → Immediate escalation to DPO

---

## SECTION 73 — TELEMETRY

### Purpose
Define privacy-safe telemetry collection.

### Telemetry Events (Opt-In)
```
app.launched           → startup_time_ms
feature.used           → feature_key, edition
assessment.completed   → assessment_type (no scores)
sync.completed         → records_synced, duration_ms
ai.request.completed   → model, latency_ms, tokens (no content)
error.occurred         → error_type, component (no user data)
```

### Privacy Rules for Telemetry
- Opt-in only — no telemetry without consent
- No PII in telemetry events
- Device ID is a random UUID (not tied to Pilot ID)
- Telemetry data auto-deleted after 90 days

---

## SECTION 74 — FEATURE FLAGS

### Purpose
Define the feature flag system architecture.

### Flag Types
| Type | Example | Scope |
|------|---------|-------|
| Release flag | `ai_coaching_v1` | Gradual rollout |
| Edition flag | `enterprise_rbac` | Edition gating |
| Experiment flag | `dashboard_layout_b` | A/B test |
| Kill switch | `disable_ai_on_error` | Emergency |

### Flag Evaluation Order
1. Emergency overrides (kill switches)
2. Pilot-specific assignments (`FeatureFlagAssignment`)
3. Edition-based defaults (`PilotSubscription.tier`)
4. Rollout percentage (`FeatureRollout.rolloutPercentage`)
5. Default value

### Implementation
```typescript
export function useFeature(flagKey: string): boolean {
  const pilot = useCurrentPilot();
  const subscription = usePilotSubscription();
  return featureFlagService.evaluate(flagKey, {
    pilotId: pilot.id,
    tier: subscription.tier,
  });
}
```

---

## SECTION 75 — CONFIGURATION HIERARCHY

### Purpose
Define how configuration flows from platform level to feature level.

```
Platform Config (immutable, hardcoded defaults)
  └── Edition Config (per subscription tier)
        └── Tenant Config (per institution)
              └── Cohort Config (per class/team)
                    └── Pilot Config (per user)
                          └── Feature Flag overrides
```

Each level overrides the parent. The most specific level wins.

---

## SECTION 76 — PERFORMANCE STRATEGY

### Purpose
Define measurable performance targets and strategies to achieve them.

### Performance Targets (Non-Negotiable)

| Metric | Target | Measurement |
|--------|--------|------------|
| App startup (cold) | ≤ 3 seconds | Chrome DevTools |
| App startup (warm) | ≤ 1 second | Service Worker cache |
| Initial JS bundle | ≤ 200KB gzipped | Vite bundle analyzer |
| Route transition | ≤ 300ms | Navigation timing |
| Dexie read (single) | ≤ 10ms | Performance mark |
| Dexie read (list 100) | ≤ 100ms | Performance mark |
| Dexie write | ≤ 50ms | Performance mark |
| AI response (online) | ≤ 5 seconds | P95 |
| Search (local, 10K records) | ≤ 200ms | Measured |

### Performance Strategies
- **Code splitting**: Lazy-load each module (dynamic `import()`)
- **Virtual lists**: Render only visible items in long lists (react-virtual)
- **Dexie indexes**: Indexed queries only — no `.toArray().filter()` for large datasets
- **Image optimization**: WebP, responsive sizes, lazy loading
- **Service Worker**: Pre-cache critical assets; stale-while-revalidate for content

---

## SECTION 77 — SCALABILITY STRATEGY

### Purpose
Define how the platform scales from MVP to global platform.

### Scalability Phases

**Phase 1 (MVP)**: Single-user browser app. No server. Scales infinitely per user.

**Phase 2 (Sync + Premium)**: Server adds sync endpoint. Scales horizontally behind load balancer.

**Phase 3 (School Edition)**: Server-side aggregation and reports. Read replicas for reporting queries.

**Phase 4 (Enterprise)**: Per-tenant resource isolation. Potential tenant-dedicated DB clusters for large enterprises.

**Phase 5 (Global)**: Multi-region active-active with data residency routing.

---

## SECTION 78 — RELIABILITY STRATEGY

### Purpose
Define reliability targets and mechanisms.

| Target | Value |
|--------|-------|
| Availability (server) | 99.9% uptime |
| Offline availability | 100% (by design) |
| Crash-free sessions | ≥ 99.5% |
| Data loss tolerance | Zero (all writes committed before ACK) |
| RTO (Recovery Time) | < 1 hour |
| RPO (Recovery Point) | < 5 minutes (with continuous sync) |

### Reliability Mechanisms
- Service Worker ensures app loads even with no server
- Dexie transactions ensure atomic writes
- Sync queue retries with exponential backoff (max 3 retries, then manual intervention)
- Error boundaries at module level — one module crashing doesn't crash the app

---

## SECTION 79 — DISASTER RECOVERY

### Purpose
Define the disaster recovery plan.

### Recovery Scenarios
| Scenario | RTO | Strategy |
|----------|-----|----------|
| Client browser data loss | 1 day | Restore from last sync to server |
| Server DB failure | 1 hour | Failover to replica; restore from snapshot |
| CDN outage | 30 min | App still works offline from Service Worker cache |
| AI provider outage | Immediate | Automatic fallback to rule-based responses |
| Region failure | 4 hours | Traffic rerouted to DR region |

---

## SECTION 80 — BACKUP & RECOVERY

### Purpose
Define backup procedures.

### Client-Side Backup
- User can export all data as encrypted JSON (Data Portability — DPDP right)
- Export includes all Dexie tables for the pilot
- Import restores from JSON (for device migration)

### Server-Side Backup
- Continuous WAL archiving (PostgreSQL)
- Daily full snapshot
- 30-day retention for daily snapshots
- 1-year retention for weekly snapshots
- Cross-region replication to DR site

---

## SECTION 81 — OPERATIONAL GOVERNANCE

### Purpose
Define how the platform is operated in production.

### Operational Runbook Topics
1. Deployment playbook
2. Incident response playbook
3. DPDP compliance incident playbook
4. AI service degradation playbook
5. Data erasure request fulfillment
6. School Edition onboarding playbook
7. Tenant provisioning playbook

### On-Call Rotation
- 24/7 on-call for Severity 1 (data breach, full outage)
- Business hours for Severity 2 (feature degradation)
- Next business day for Severity 3 (cosmetic issues)

---

## SECTION 82 — CONTENT GOVERNANCE

### Purpose
Define how content (missions, assessments, career descriptions, audio) is created and managed.

### Content Creation Pipeline
```
Content Creator → Draft → Content Review (child safety, accuracy)
  → Localization (10 languages) → Accessibility Review
  → Feature Flag (beta) → GA Release
```

### Content Standards
- All content reviewed for age-appropriateness (separate guidelines for 8–12 and 13–18)
- No violent, sexual, or politically sensitive content
- Career descriptions reviewed by domain experts annually
- Wellbeing content reviewed by a licensed counsellor
- Financial content reviewed by a certified financial educator

### Content Versioning
- Content has a version field — updates create new versions, old versions archived
- School Edition: institutions lock to a content version for a semester

---

## SECTION 83 — CODING STANDARDS

### Purpose
Define non-negotiable coding standards for all contributors.

### TypeScript Standards
```typescript
// GOOD: Typed function, no any
function formatScore(score: number, max: number): string {
  return `${Math.round((score / max) * 100)}%`;
}

// BAD: any type, untyped return
function formatScore(score: any) {
  return (score / 10) * 100 + "%";
}
```

### React Standards
- Functional components only (no class components)
- Hooks for all stateful logic
- JSX return type: omit annotation or use `React.JSX.Element` (never `JSX.Element`)
- `key` prop on all list items — use stable IDs, never array index
- No `useEffect` for data fetching — use custom hooks that call services

### Async / Error Handling
- All service calls wrapped in `safeRun()`
- All `StorageResult` checked for `success` before using `data`
- No unhandled promise rejections

### Import Ordering
```typescript
// 1. React + external libraries
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// 2. Internal: types
import type { Pilot } from "@/types";

// 3. Internal: services
import { pilotService } from "@/storage/storageService";

// 4. Internal: components
import { Button } from "@/components/ui/button";

// 5. Internal: utils
import { cn } from "@/utils";
```

---

## SECTION 84 — FOLDER STANDARDS

### Purpose
Define folder naming and organization standards.

| Rule | Standard |
|------|----------|
| Module folders | kebab-case: `career-explorer/` |
| Component files | PascalCase: `CareerCard.tsx` |
| Hook files | camelCase: `useCareerPaths.ts` |
| Service/utility files | camelCase: `careerService.ts` |
| Test files | Same name + `.test.ts`: `careerService.test.ts` |
| Locale files | ISO 639-1 code: `hi.json`, `ta.json` |
| Type files | Single file: `types/index.ts` |

---

## SECTION 85 — NAMING STANDARDS

### Purpose
Define naming conventions for all code artifacts.

| Artifact | Convention | Example |
|----------|-----------|---------|
| Interfaces | PascalCase, no `I` prefix | `Pilot`, `WellbeingProfile` |
| Types | PascalCase | `WellbeingTrend`, `EditionType` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_SYNC_RETRIES` |
| Services | camelCase object | `pilotService`, `wellbeingProfileService` |
| Hooks | `use` prefix | `usePilot`, `useOfflineStatus` |
| Components | PascalCase | `AppShell`, `OfflineIndicator` |
| Events | PascalCase noun | `MissionCompleted`, `PilotCreated` |
| Feature flags | snake_case | `ai_coaching_v1`, `enterprise_rbac` |
| i18n keys | camelCase, dot-separated | `cockpit.greeting.morning` |
| Dexie tables | camelCase plural | `pilots`, `wellbeingAssessments` |
| DB indexes | field name(s) | `pilotId`, `[pilotId+createdAt]` |

---

## SECTION 86 — DOCUMENTATION STANDARDS

### Purpose
Define documentation requirements.

### Required Documentation
| Artifact | Documentation Required |
|----------|----------------------|
| New entity | JSDoc comment on interface |
| New service method | JSDoc with @param, @returns |
| New hook | JSDoc with usage example |
| Architecture decision | ADR in `docs/adr/` |
| New schema version | Comment in `db.ts` version block |
| New feature flag | Entry in feature flag registry doc |

### ADR Format
```markdown
# ADR-NNN: [Short Title]

## Status: [Proposed | Accepted | Deprecated]
## Date: YYYY-MM-DD

## Context
Why was this decision needed?

## Decision
What was decided?

## Consequences
What are the trade-offs?
```

---

## SECTION 87 — TESTING ARCHITECTURE

### Purpose
Define the testing strategy across all layers.

### Testing Pyramid
```
         ▲ E2E (Playwright) — Critical user journeys
        ▲▲▲ Integration — Component + service interactions
      ▲▲▲▲▲▲▲ Unit — Service methods, utils, hooks
```

### Test Coverage Targets
| Layer | Minimum Coverage |
|-------|-----------------|
| Service methods | 90% |
| Utility functions | 95% |
| Critical hooks | 80% |
| Page components | Integration test per page |
| E2E journeys | Top 5 user flows |

### Test Conventions
```typescript
// Unit test: services
describe("pilotService", () => {
  let db: MockDatabase;
  beforeEach(() => { db = new MockDexieDatabase(); });

  it("creates a pilot and returns the id", async () => {
    const result = await pilotService.create({ name: "Test", ... });
    expect(result.success).toBe(true);
    expect(typeof result.data).toBe("number");
  });
});
```

### Dexie Test Mock Rules
- Dexie mock must be a `class`, not a plain function (Dexie is instantiated with `new`)
- Mock must implement all table methods used in the service under test
- No real IndexedDB access in unit tests

---

## SECTION 88 — DEVELOPER EXPERIENCE

### Purpose
Define the standards for a world-class developer experience.

### Local Development Setup
```bash
# 1. Clone and install
git clone [repo]
pnpm install

# 2. Start the app
pnpm --filter @workspace/lifepilot run dev

# 3. Run tests
pnpm --filter @workspace/lifepilot run test

# 4. Typecheck
pnpm --filter @workspace/lifepilot run typecheck
```

### DX Principles
- First `pnpm dev` to working app in < 2 minutes
- TypeScript errors are the first line of defense — zero tolerance
- Vitest runs in watch mode with HMR
- No manual environment setup — sensible defaults for all config
- Comprehensive `replit.md` as the developer contract

---

## SECTION 89 — ONBOARDING GUIDE

### Purpose
Define the onboarding path for new engineers.

### Day 1 Checklist
- [ ] Read `replit.md` — project overview and conventions
- [ ] Read this Architecture Blueprint (RP-003)
- [ ] Run `pnpm install && pnpm --filter @workspace/lifepilot run dev`
- [ ] Browse `src/types/index.ts` — understand the domain model
- [ ] Browse `src/storage/storageService.ts` — understand the service pattern
- [ ] Run `pnpm test` — all 13 tests passing
- [ ] Read one ADR from `docs/adr/`

### Day 2–3 Checklist
- [ ] Implement a new service method (guided task)
- [ ] Write a unit test for the service method
- [ ] Add a translation key to `en.json`
- [ ] Copy it to all 9 other language files

### Week 1 Milestone
Contributing a feature in a designated "good first issue" module with tests and i18n.

---

## SECTION 90 — QUALITY ATTRIBUTE SCENARIOS

### Purpose
Define concrete scenarios for evaluating architecture quality.

| QA Scenario | Stimulus | Response | Measure |
|------------|---------|---------|---------|
| Offline reliability | Airplane mode for 7 days | All features available locally | Zero error states |
| Performance | Cold start on mid-range Android | First meaningful paint | ≤ 3 seconds |
| Scalability | 100K concurrent school users | Server response time | P99 ≤ 2 seconds |
| Security | SQL injection attempt | Request rejected | 100% rejection |
| DPDP compliance | Data erasure request | Pilot data deleted | Within 30 days |
| Schema migration | Upgrade from v10 to v11 | No data loss | Zero records lost |
| AI failure | AI provider down | App continues working | Fallback in < 1s |
| Multi-language | Switch to Tamil | UI fully in Tamil | Zero English strings |

---

## SECTION 91 — ARCHITECTURE COMPLIANCE CHECKLIST

### Purpose
Mandatory checklist before any feature is merged.

```
DOMAIN MODEL
[ ] No existing entity modified or removed
[ ] New entity declared in types/index.ts
[ ] New entity imported in db.ts
[ ] New entity has Table<T> field in LifePilotDatabase class
[ ] New schema version added with correct index definitions
[ ] New entity imported in storageService.ts
[ ] New service object added with safeRun-wrapped methods

LOCALIZATION
[ ] All user-visible strings in i18n translation files
[ ] Translation key added to en.json
[ ] Translation key propagated to all 9 other language files

PRIVACY
[ ] No PII logged to console
[ ] Sensitive data fields identified and documented
[ ] Consent check added for new data-collecting feature

OFFLINE
[ ] Feature works with no network connection
[ ] Service Worker cache updated if new assets added
[ ] Sync queue entry created for sync-eligible writes

TESTING
[ ] Unit tests for all new service methods (≥ 90% coverage)
[ ] Integration test for new page component
[ ] No test uses real IndexedDB (mock only)

ACCESSIBILITY
[ ] All interactive elements keyboard-accessible
[ ] ARIA labels on icon-only buttons
[ ] Color contrast ≥ 4.5:1 for text

PERFORMANCE
[ ] No new synchronous heavy computation in render path
[ ] Large lists use virtual rendering
[ ] New Dexie queries use indexed fields only

TYPE SAFETY
[ ] Zero TypeScript errors
[ ] No `any` types introduced
[ ] All function return types explicit
```

---

## SECTION 92 — RISK REGISTER

### Purpose
Document architecture risks and mitigations.

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| IndexedDB quota exceeded on low-storage devices | Medium | High | Storage quota management + user alerts |
| Dexie v11 schema migration failure | Low | Critical | Migration test on v10 data before release |
| AI provider cost overrun | Medium | High | Token budgets + kill switch |
| DPDP non-compliance | Low | Critical | DPO review of every data-touching feature |
| TypeScript `any` proliferation | Medium | Medium | CI strict mode + ESLint `no-explicit-any` |
| Third-party dependency vulnerability | Medium | High | `pnpm audit` in CI; weekly dependency updates |
| Content pack size explosion | Low | Medium | Max size limits + CDN compression |
| School Edition sync conflicts | Medium | Medium | Conflict resolution + counsellor review workflow |
| Child data breach | Very Low | Critical | Encryption + DPDP breach notification < 72hr |
| Performance regression | Medium | High | Bundle size check + Lighthouse in CI |

---

## SECTION 93 — TECHNICAL DEBT STRATEGY

### Purpose
Define how technical debt is managed.

### Debt Classification
| Class | Example | Action |
|-------|---------|--------|
| **Intentional** | Placeholder service stubs | Tracked in ADR, scheduled for next wave |
| **Accumulated** | No repository layer yet | Refactor sprint every 6 weeks |
| **Forced** | Browser API limitation workaround | Revisit with each browser version |

### Debt Management Rules
- Every piece of intentional debt gets a `// TODO(ADR-NNN):` comment
- Debt backlog reviewed monthly
- No new debt accepted without team approval + ADR reference
- Zero debt tolerance for security and privacy code paths

### Current Known Debt
1. `storageService.ts` is a single large file — to be split into module-level service files (Wave 2)
2. Repository pattern not yet implemented — `db.*` accessed directly in services (Wave 2)
3. EventBus not yet implemented — direct service calls used (Wave 2)
4. E2E tests not yet written — Playwright setup planned (Wave 1)

---

## SECTION 94 — PLATFORM EVOLUTION STRATEGY

### Purpose
Define the long-term platform evolution roadmap.

### Evolution Phases

**Current**: Feature-First Modular Monolith (offline PWA, Dexie, no server)

**Phase 2** (6 months): Add optional server for sync + AI gateway. Still offline-first.

**Phase 3** (12 months): School Edition server APIs. Reporting and dashboards.

**Phase 4** (18 months): Enterprise multi-tenant server. SAML/OIDC. Enterprise RBAC.

**Phase 5** (24 months): Marketplace platform. Plugin registry. Content CDN.

**Phase 6** (36 months): Global multi-region. Potential microservice extraction for AI and sync.

### Evolution Guardrails
- No phase requires redesign of previous phases
- Each phase adds server capability without removing offline fallback
- Each phase is independently deployable

---

## SECTION 95 — MODULAR MONOLITH → MICROSERVICE EVOLUTION

### Purpose
Define the path from current monolith to future microservices if needed.

### Service Extraction Candidates (In Priority Order)
| Service | Trigger for Extraction | Dependencies |
|---------|----------------------|--------------|
| AI Gateway | AI traffic > 10K requests/day | AI providers |
| Sync Service | Sync load > 1M events/day | DB + SyncQueue |
| Notification Service | Push at scale | Firebase / APNs |
| Analytics Service | Analytics at scale | ClickHouse |
| Content CDN Service | Content pack delivery at scale | Object storage |
| Reporting Service | Report generation at scale | Read replica |

### Extraction Principles
- Extract only when current approach becomes the bottleneck
- Repository interfaces enable seamless extraction (swap `DexieRepository` for `ApiRepository`)
- Event-driven architecture enables async decoupling before extraction
- API contracts established before extraction begins

---

## SECTION 96 — FUTURE RESERVED DOMAINS

### Purpose
Reserve domain name space for future capabilities.

| Domain | Entities Reserved | Notes |
|--------|-----------------|-------|
| `social/` | Groups, feeds, connections | Post-Enterprise Edition |
| `marketplace/` | Plugin registry, content store | Wave 5 |
| `gamification/` | Leaderboards, tournaments | School Edition extension |
| `mentorship/` | Mentor marketplace, matching | Enterprise Edition |
| `counselling/` | Appointment booking, session notes | School Edition |
| `enterprise-reporting/` | BI integrations, custom reports | Enterprise Edition |
| `government/` | DIKSHA, UDISE integrations | Government Edition |

These domain folders must not be created until the respective wave begins.

---

## SECTION 97 — DOMAIN OWNERSHIP MATRIX

### Purpose
Define clear ownership of each domain.

| Domain | Code Owner Team | Review Required |
|--------|----------------|----------------|
| Core Platform | Platform Team | EARB for schema changes |
| Identity & Personality | Growth Team | Privacy review |
| Learning & Curriculum | Education Team | Content review |
| Career | Career Team | Expert review |
| Wellbeing | Wellbeing Team | Counsellor review |
| AI Platform | AI Team | AI governance review |
| Security & Compliance | Security Team | DPDP review |
| School Edition | EdTech Team | School pilot review |
| Enterprise | Enterprise Team | Legal review |
| Marketplace | Product Team | Safety review |

---

## SECTION 98 — MODULE MATURITY MATRIX

### Purpose
Track the maturity level of each product module.

| Module | Design | Data Model | Service Layer | UI | Tests | i18n | A11y | Status |
|--------|--------|-----------|--------------|-----|-------|------|------|--------|
| Cockpit | ✅ | ✅ | ✅ | 🟡 | 🟡 | ✅ | 🟡 | In Progress |
| Pilot Profile | ✅ | ✅ | ✅ | 🟡 | 🟡 | ✅ | 🟡 | In Progress |
| Flight Plan | ✅ | ✅ | ✅ | 🟡 | 🟡 | ✅ | 🟡 | In Progress |
| Flight Log | ✅ | ✅ | ✅ | 🟡 | 🟡 | ✅ | 🟡 | In Progress |
| Money Quest | ✅ | ✅ | ✅ | ❌ | 🟡 | ✅ | ❌ | Planned |
| Life Choices | ✅ | ✅ | ✅ | ❌ | 🟡 | ✅ | ❌ | Planned |
| Career Explorer | ✅ | ✅ | ✅ | ❌ | 🟡 | ✅ | ❌ | Planned |
| Future Me | ✅ | ✅ | ✅ | ❌ | 🟡 | ✅ | ❌ | Planned |
| Wellbeing | ✅ | ✅ | ✅ | ❌ | 🟡 | ✅ | ❌ | Planned |
| Personality | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | Planned |
| Achievements | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | Planned |
| Decision Intel | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | Planned |

✅ Complete | 🟡 In Progress / Partial | ❌ Not Started

---

## SECTION 99 — IMPLEMENTATION WAVES & BUILD ORDER

### Purpose
Define the recommended build order for the platform.

### Wave 0 — Foundation (COMPLETE)
- [x] Domain model (232 entities, Schema v11)
- [x] Dexie database + service layer
- [x] i18next (10 Indian languages)
- [x] AppShell + navigation
- [x] Theme + design tokens
- [x] PWA setup (Service Worker, manifest)
- [x] TypeScript strict + testing infrastructure

### Wave 1 — Core MVP (Next)
- [ ] Cockpit page (dashboard)
- [ ] Pilot profile creation flow
- [ ] First-time onboarding wizard
- [ ] Flight Log (journal) — write and read
- [ ] Flight Plan (goals) — create, track, complete
- [ ] Basic habits module
- [ ] Life Wheel self-assessment
- [ ] Offline indicator + offline-safe UX patterns
- [ ] E2E tests for critical journeys

### Wave 2 — Premium Foundation
- [ ] Optional server (sync endpoint + AI gateway)
- [ ] Personality assessment (Big Five)
- [ ] Decision Intelligence (scenario → outcome → reflection)
- [ ] Wellbeing assessment (10 dimensions)
- [ ] Life Timeline (LifeTimelineEvent-driven)
- [ ] Repository layer refactor (extract from storageService.ts)
- [ ] EventBus implementation

### Wave 3 — Career & Identity
- [ ] Career Explorer (paths, goals, milestones)
- [ ] Future Me (letters, future identity)
- [ ] Life Achievements (portfolio)
- [ ] Identity Evolution (development stages, growth dimensions)
- [ ] Money Quest (financial literacy)
- [ ] AI Coaching (first prompts: daily check-in, goal suggestions)

### Wave 4 — School Edition
- [ ] Institution + Cohort management
- [ ] Teacher/Counsellor dashboard
- [ ] Curriculum mapping (CBSE, ICSE, NEP)
- [ ] Cohort progress reporting (anonymized)
- [ ] School Edition feature flags and branding
- [ ] SAML/SSO integration

### Wave 5 — Enterprise Edition
- [ ] Multi-tenant architecture (tenantId enforcement)
- [ ] Enterprise RBAC (full role hierarchy)
- [ ] Enterprise admin portal
- [ ] LDAP/OIDC integration
- [ ] Compliance reporting
- [ ] Enterprise SLA and support tooling

### Wave 6 — Marketplace & AI
- [ ] Content Pack marketplace
- [ ] Plugin registry
- [ ] AI Coach persona (full conversation)
- [ ] AI-generated narratives (timeline, personality insights)
- [ ] Multi-agent AI architecture (coach + specialist agents)
- [ ] AI governance dashboard

---

## SECTION 100 — EXECUTIVE ARCHITECTURE REVIEW

### Purpose
Final Enterprise Architecture Review Board assessment of the LifePilot architecture.

---

### EARB Assessment Scorecard

| Dimension | Score | Rating | Notes |
|-----------|-------|--------|-------|
| **Architecture Quality** | 9.0/10 | Excellent | Clean layers, strong domain model, additive design |
| **Business Alignment** | 9.5/10 | Excellent | Every architecture decision serves the product vision |
| **Capability Coverage** | 9.0/10 | Excellent | All 12 capability domains addressed |
| **Domain Completeness** | 9.5/10 | Excellent | 232 entities, 124 types, complete service layer |
| **Scalability** | 8.5/10 | Very Good | Offline-first scales; server scaling planned but not built |
| **Maintainability** | 9.0/10 | Excellent | Additive-only, strong conventions, ADR process |
| **Security** | 8.5/10 | Very Good | Child safety and DPDP addressed; pen testing needed |
| **Offline First** | 10/10 | Outstanding | 100% offline by design; no compromises |
| **AI Readiness** | 8.5/10 | Very Good | Provider abstraction, prompt registry, governance defined |
| **Premium Readiness** | 8.0/10 | Very Good | Edition matrix clear; premium UI not yet built |
| **School Readiness** | 7.5/10 | Good | Architecture ready; implementation in Wave 4 |
| **Enterprise Readiness** | 7.0/10 | Good | Multi-tenant strategy sound; implementation in Wave 5 |
| **Marketplace Readiness** | 7.0/10 | Good | Plugin model defined; marketplace in Wave 6 |
| **Developer Experience** | 9.0/10 | Excellent | Strong conventions, clear ownership, great DX tooling |
| **Operational Readiness** | 7.5/10 | Good | Monitoring defined; runbooks to be written |
| **Governance Maturity** | 9.0/10 | Excellent | EARB process, ADRs, compliance checklists defined |
| **Future Proofing** | 9.5/10 | Excellent | Reserved domains, extraction path, additive evolution |
| **Technical Debt Risk** | 8.5/10 | Very Good | Known debt documented, strategy defined |

### Overall Architecture Score

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   OVERALL ARCHITECTURE SCORE:  8.7 / 10                    │
│                                                              │
│   Architecture Readiness:   9.0 / 10                       │
│   Governance Maturity:      9.0 / 10                       │
│   Security Score:           8.5 / 10                       │
│   Operational Readiness:    7.5 / 10                       │
│   Developer Experience:     9.0 / 10                       │
│   Maintainability:          9.0 / 10                       │
│   Enterprise Readiness:     7.0 / 10                       │
│   AI Readiness:             8.5 / 10                       │
│   Future Readiness:         9.5 / 10                       │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

### Remaining Strategic Gaps

| Gap | Priority | Recommended Wave |
|-----|----------|-----------------|
| Repository pattern not implemented | High | Wave 2 |
| EventBus not implemented | High | Wave 2 |
| E2E test suite not yet written | High | Wave 1 |
| `storageService.ts` needs splitting into module files | Medium | Wave 2 |
| Server-side API not built | Deferred | Wave 2 |
| Pen testing not conducted | Medium | Pre-School Edition |
| Accessibility audit not completed | Medium | Wave 1 |
| AI prompt templates not written | Medium | Wave 3 |
| Content moderation for journal entries | High | Pre-MVP GA |
| Parental consent flow not built | High | Wave 1 |

---

### EARB Verdict

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   VERDICT:  APPROVED WITH CONDITIONS                        ║
║                                                              ║
║   The LifePilot architecture is sound, well-governed,       ║
║   and uniquely strong in its offline-first design.          ║
║   The domain model is comprehensive and frozen correctly.   ║
║   The additive evolution principle is well-enforced.        ║
║                                                              ║
║   CONDITIONS FOR FULL APPROVAL:                             ║
║   1. Parental consent flow implemented before MVP GA        ║
║   2. Content moderation for user-generated text before GA   ║
║   3. E2E test suite covering top 5 user journeys (Wave 1)  ║
║   4. Repository pattern refactor (Wave 2)                   ║
║   5. Accessibility audit (WCAG 2.1 AA) before School Ed.    ║
║   6. Penetration test before Enterprise Edition launch      ║
║                                                              ║
║   This architecture can support the complete LifePilot      ║
║   vision — from MVP to global platform — without           ║
║   requiring fundamental architectural redesign.             ║
║                                                              ║
║   Signed: Enterprise Architecture Review Board              ║
║   Date: June 2026                                           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

---

*End of LifePilot Enterprise Architecture & Engineering Governance Blueprint v1.0*

*Next review: At Wave 2 completion (estimated: Q4 2026)*
*Document owner: Chief Enterprise Architect*
*Classification: Internal — Architecture Team*
