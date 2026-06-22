# LifePilot — Product Roadmap

**Status**: Living document  
**Related**: [ProductVision](ProductVision.md) · [MVPBlueprint](MVPBlueprint.md)

---

## Wave 1 — Core Foundation (current)

**Goal**: Complete, governed, offline-capable product with all 8 core modules.

| Area | Status |
|------|--------|
| App shell + PWA | ✅ Foundation complete |
| Governance constants (XP-001–005) | ✅ Complete |
| Design system (XP-002) | ✅ Complete |
| Colour system + Sky Adventure theme | ✅ Complete |
| Cockpit with XP bar + feature cards | ✅ Complete |
| Domain types (30+ entities) | ✅ Complete |
| Dexie database (30+ tables) | ✅ Complete |
| Repository pattern + base class | ✅ Complete |
| Core infrastructure (events, flags, diagnostics) | ✅ Complete |
| 10 Indian language support | ✅ Foundation complete |
| Flight Plan, Flight Log, Future Me | 🔲 Module logic pending |
| Career Explorer, Money Quest, Life Choices | 🔲 Module logic pending |
| XP / gamification system | 🔲 Pending |
| Badge system | 🔲 Pending |

---

## Wave 2 — Domain + Data Maturity

**Goal**: Complete domain-driven structure migration. No new user features — engineering foundation.

- Migrate `src/types/` → `src/domain/`
- Migrate `src/storage/` → `src/data/`
- Migrate `src/components/` → `src/shared/ui/`
- Migrate `src/pages/` → `src/modules/[name]/pages/`
- Migrate `src/hooks/` → `src/shared/hooks/`
- Full test coverage for all repositories
- CI/CD with governance lint checks

---

## Wave 3 — Parent + Family

**Goal**: Parent trust layer — copilot view, family goals, family journeys.

- Parent dashboard (`src/modules/parent/parentdashboard/`)
- Copilot view (aggregate, no raw child content)
- Family goals (`src/modules/parent/familygoals/`)
- Family journeys (`src/modules/parent/familyjourneys/`)
- XP-005 full implementation

---

## Wave 4 — Premium Content

**Goal**: Monetisation — premium paths, advanced career roadmaps, premium content packs.

- Premium paths (`src/modules/premium/premiumpaths/`)
- Advanced career roadmaps (`src/modules/premium/advancedcareer/`)
- Premium content (`src/modules/premium/premiumcontent/`)
- Payment integration (Stripe — see monetisation skill)

---

## Wave 5 — School + Institution

**Goal**: School cohort tools — classrooms, reporting, facilitator interface. NEP alignment.

- Classrooms (`src/modules/school/classrooms/`)
- Cohorts and group tracking (`src/modules/school/cohorts/`)
- Progress reporting (`src/modules/school/reporting/`)
- Facilitator interface (`src/modules/school/facilitator/`)

---

## Wave 6 — AI + Enterprise

**Goal**: XP-004-compliant AI Coach, enterprise/CSR platform.

- AI Coach (`src/modules/ai/coach/`) — encourage, clarify, guide only
- AI Recommendations (`src/modules/ai/recommendations/`)
- AI-assisted Reflections (`src/modules/ai/reflections/`)
- Tenant management (`src/modules/enterprise/tenantmanagement/`)
- Analytics (`src/modules/enterprise/analytics/`)
- CSR programme tools (`src/modules/enterprise/csr/`)
