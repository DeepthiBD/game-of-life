# LifePilot — Dependency Governance
## RP-003 | Dependency Governance Framework v1.0
### Enterprise Architecture Review Board | June 2026 | Status: RATIFIED

---

> **Document Authority**: This document is the definitive governance framework for all dependency relationships at LifePilot — code dependencies between layers and modules, package dependencies on third-party libraries, and the automated systems that enforce these rules. Dependency discipline is the single most important factor in preventing architectural decay. Every "quick shortcut" that crosses a dependency boundary is a crack in the foundation that widens over time.

---

## TABLE OF CONTENTS

1. Dependency Governance Principles
2. Allowed Dependencies
3. Forbidden Dependencies
4. Circular Dependency Detection
5. Package Layer Rules
6. Feature Isolation
7. Shared Library Governance
8. Dependency Validation
9. Automated Enforcement

---

## SECTION 1 — DEPENDENCY GOVERNANCE PRINCIPLES

### Why Dependency Governance Matters

Software entropy is real. Without enforced dependency rules, every codebase converges on the same failure mode: a tightly-coupled ball of mud where changing anything risks breaking everything, where a UI refactor requires a database change, where a test can't run without a browser.

LifePilot is designed to last 10+ years across 6 implementation waves. It will be maintained by teams that haven't been hired yet. Dependency discipline today is the gift we give to engineers in 2031.

### The Core Dependency Belief

> "A dependency is a coupling. Every coupling is a liability. The question is never 'can we add this dependency?' but 'is this coupling worth its cost?'"

### Governing Principles

| Principle | Statement |
|-----------|-----------|
| **DP-01 Directionality** | Dependencies flow in one direction only: inward toward the domain. No dependency ever points outward from the domain. |
| **DP-02 Stability** | Stable, slow-changing modules are depended upon. Volatile, fast-changing modules are not. |
| **DP-03 Minimality** | Every dependency — code and package — must earn its place. Default is to not add it. |
| **DP-04 Explicitness** | All cross-module communication is explicit and documented. Implicit coupling (shared globals, event name strings, side-effect imports) is forbidden. |
| **DP-05 Testability** | The dependency structure must allow any module to be tested in isolation, with mocks at every boundary. |
| **DP-06 Replaceability** | Any external package dependency must be replaceable. If removing it requires touching 50 files, the abstraction is wrong. |
| **DP-07 Zero Tolerance for Circles** | Circular dependencies are P0 defects. There are no acceptable circular dependencies. |

---

## SECTION 2 — ALLOWED DEPENDENCIES

### 2.1 Code Dependency Map (Canonical)

```
                        ┌─────────────────────┐
                        │   Domain Layer       │
                        │  types/index.ts      │
                        │  (zero imports)      │
                        └──────────┬──────────┘
                                   │ ← imported by everything
                    ┌──────────────┼──────────────┐
                    │              │              │
         ┌──────────▼───┐  ┌──────▼──────┐  ┌───▼──────────┐
         │ Storage Layer│  │ Utils Layer │  │ Config Layer  │
         │  db.ts        │  │ utils/      │  │ tokens.ts     │
         │  (→ types)    │  │ (→ types)   │  │ i18n.ts       │
         └──────────┬───┘  └──────┬──────┘  └───────────────┘
                    │              │
         ┌──────────▼──────────────▼──────────┐
         │          Service Layer              │
         │      storageService.ts              │
         │  (→ storage, types, utils)          │
         └──────────────┬─────────────────────┘
                        │ ← the only service consumer
                        │
         ┌──────────────▼─────────────────────┐
         │          Hooks Layer                │
         │      hooks/ (global)                │
         │  (→ services, types, utils)         │
         └──────────────┬─────────────────────┘
                        │
         ┌──────────────▼─────────────────────┐
         │        Presentation Layer           │
         │   pages/, components/, modules/     │
         │  (→ hooks, ui-components, types,    │
         │     utils, i18n)                    │
         └────────────────────────────────────┘
```

### 2.2 Allowed Dependency Table

| From Layer | May Import From | Notes |
|-----------|----------------|-------|
| `types/index.ts` | Nothing | Zero dependencies — domain is the root |
| `utils/index.ts` | `types/` only | Pure functions; no side effects |
| `theme/tokens.ts` | `types/` only | Static configuration |
| `storage/db.ts` | `types/` only | Database definition only |
| `storage/storageService.ts` | `storage/db.ts`, `types/`, `utils/` | Service layer; no UI imports |
| `hooks/` (global) | `storage/storageService.ts`, `types/`, `utils/`, `localization/` | Custom hooks; no component imports |
| `components/ui/` | `types/`, `utils/` | shadcn/ui primitives; no business logic |
| `components/common/` | `hooks/`, `types/`, `utils/`, `components/ui/` | Shared stateful components |
| `components/layout/` | `hooks/`, `types/`, `utils/`, `components/ui/`, `components/common/`, `theme/` | App shell; no module imports |
| `modules/[name]/hooks/` | `storage/storageService.ts`, `types/`, `utils/` | Module-local hooks |
| `modules/[name]/components/` | `modules/[name]/hooks/`, `types/`, `utils/`, `components/ui/`, `components/common/` | Module-local components |
| `modules/[name]/pages/` | `modules/[name]/components/`, `modules/[name]/hooks/`, `hooks/`, `components/`, `types/`, `utils/` | Route-level components |
| `app/Router.tsx` | `modules/*/pages/` (lazy), `components/layout/` | Route registry only |
| `app/AppProviders.tsx` | `hooks/`, `localization/`, `theme/`, `components/` | Provider tree only |

### 2.3 Allowed Module-to-Module Communication

Direct component imports between modules are **forbidden**. Modules communicate only through:

| Channel | Mechanism | Example |
|---------|-----------|---------|
| **Service layer** | Module A's hook calls a service; so does Module B | Both use `missionService.getForPilot()` |
| **URL / routing** | Module A links to Module B's route | `<Link to="/career-explorer">` |
| **Shared state** | Via a global hook backed by the service layer | `useCurrentPilot()` shared across modules |
| **EventBus** (Wave 2) | Domain events, not direct calls | `eventBus.publish(missionCompletedEvent)` |
| **Shared types** | Via `types/index.ts` only | `import type { Mission } from "@/types"` |

### 2.4 Allowed Package Dependencies

#### Runtime Dependencies (shipped to browser)

| Package | Allowed In | Rationale |
|---------|-----------|-----------|
| `react`, `react-dom` | All UI code | Core UI framework |
| `dexie` | `storage/` only | IndexedDB ORM — storage layer only |
| `wouter` | `app/Router.tsx` only | Routing — single import point |
| `i18next`, `react-i18next` | `localization/`, hooks, components | i18n — accessed via `useTranslation()` hook |
| `framer-motion` | `components/`, `modules/*/components/` | Animations — presentation layer only |
| `lucide-react` | `components/`, `modules/*/components/`, `theme/` | Icons — presentation layer only |
| `class-variance-authority`, `clsx`, `tailwind-merge` | `utils/`, `components/ui/` | Style utilities — presentation layer only |
| `@radix-ui/*` | `components/ui/` only | shadcn/ui primitives — design system only |
| `zod` | `storage/`, `api/` (future) | Schema validation |

#### Dev-Only Dependencies

| Package | Purpose |
|---------|---------|
| `vite`, `@vitejs/plugin-react` | Build tooling |
| `vite-plugin-pwa` | PWA build |
| `vitest`, `@vitest/ui` | Test runner |
| `@testing-library/react`, `@testing-library/dom` | Component testing |
| `jsdom` | Test DOM environment |
| `typescript` | Type checking |
| `eslint`, `prettier` | Lint and format |
| `tailwindcss` | CSS framework |
| `@types/*` | TypeScript type definitions |

---

## SECTION 3 — FORBIDDEN DEPENDENCIES

### 3.1 Absolute Forbidden Dependencies (Zero Exceptions)

These are violations of core architecture principles. No exception is possible without a Tier 5 ADR and unanimous EARB vote.

```
✗ Any component imports from storage/db.ts directly
  → db.ts is accessed ONLY through storageService.ts

✗ storage/storageService.ts imports any React hook or component
  → Service layer is framework-agnostic

✗ types/index.ts imports anything
  → Domain is the root; it depends on nothing

✗ Module A imports components from Module B
  → Modules are isolated; communicate via services and events only

✗ components/ui/ imports from any module, hook, or service
  → UI primitives are pure presentational building blocks

✗ utils/index.ts imports from storage, hooks, or components
  → Utils are pure functions with zero side effects

✗ Any test file imports a real Dexie instance
  → Tests use the class-based Dexie mock only
```

### 3.2 Forbidden Package Patterns

| Pattern | Reason | Alternative |
|---------|--------|------------|
| `import * as X from "package"` | Prevents tree-shaking; inflates bundle | Named imports only |
| `require()` in TypeScript files | CommonJS in ESM context; breaks Vite | Use `import` |
| Direct `window.*` access outside a hook | Breaks SSR-readiness and testability | Wrap in a custom hook |
| `document.*` access in a service | Breaks the service layer's framework independence | Move to a hook or utility |
| `localStorage.*` for structured data | Bypasses Dexie; creates inconsistent state | Use Dexie via storageService |
| `sessionStorage.*` for any user data | Not offline-safe; not encrypted | Use Dexie via storageService |
| Any analytics SDK (GA, Mixpanel, etc.) | DPDP violation; child privacy | First-party analytics only via activityEventService |
| Any advertising SDK | DPDP violation; child safety mandate | Never — not in any edition |
| `eval()` or `new Function()` | XSS risk; violates CSP | Declarative alternatives only |
| Dynamic `import()` of user-supplied paths | Code injection risk | Static import paths only |

### 3.3 Forbidden Cross-Layer Patterns

```typescript
// ✗ FORBIDDEN: Component reads from db directly
function CareerPage() {
  useEffect(() => {
    db.careerPaths.toArray().then(setPaths); // VIOLATION
  }, []);
}

// ✗ FORBIDDEN: Service imports a component
import { Toast } from "@/components/ui/toast"; // in storageService.ts — VIOLATION

// ✗ FORBIDDEN: Module imports from sibling module
import { GoalCard } from "@/modules/flight-plan/components/GoalCard"; // in career-explorer — VIOLATION

// ✗ FORBIDDEN: Utility imports from storage
import { pilotService } from "@/storage/storageService"; // in utils/index.ts — VIOLATION

// ✗ FORBIDDEN: Skipping a layer
import { db } from "@/storage/db"; // in a React hook — VIOLATION (use storageService)
```

### 3.4 Forbidden Dependency Anti-patterns

**The God Import**
```typescript
// ✗ Importing the entire storageService when only one service is needed
import * as services from "@/storage/storageService";
services.pilotService.getById(1);

// ✅ Import only what you need
import { pilotService } from "@/storage/storageService";
```

**The Sneaky Circular**
```typescript
// ✗ utils imports from hooks which imports from utils
// utils/index.ts
import { useSomething } from "@/hooks/useSomething"; // creates a circle

// ✅ utils is pure — hooks import from utils, never the reverse
```

**The Bypass Import**
```typescript
// ✗ Importing an internal implementation detail instead of the public API
import { db } from "@/storage/db"; // component bypassing service layer

// ✅ Use the service
import { missionService } from "@/storage/storageService";
```

**The Ambient Global**
```typescript
// ✗ Using a globally mutated object to share state between modules
window.__lifePilotState = { currentPilot }; // VIOLATION

// ✅ Use the service layer backed by Dexie, accessed via hooks
const { pilot } = useCurrentPilot();
```

---

## SECTION 4 — CIRCULAR DEPENDENCY DETECTION

### Why Circulars Are P0 Defects

A circular dependency between A and B means:
- Neither A nor B can be independently loaded, tested, or replaced
- Module initialization order becomes undefined — leading to subtle, hard-to-diagnose runtime failures
- Tree-shaking fails — both modules are always bundled together
- Testing requires loading both modules even when testing only one

At LifePilot, a circular dependency between a service and a component means the offline-first service layer cannot be tested without a React testing environment. This is unacceptable.

### Detection Strategy

Circulars are detected at three points:

```
1. Compile time   → TypeScript project references catch some circles
2. Build time     → Vite's rollup bundler warns on circular imports
3. CI gate        → madge or eslint-plugin-import --cycles runs on every PR
4. Editor         → ESLint real-time feedback in VS Code
```

### Detection Tools

#### Tool 1: `madge` — Dependency Graph Analyser

```bash
# Detect all circular dependencies in the source tree
pnpm --filter @workspace/lifepilot exec madge --circular --extensions ts,tsx src/

# Generate a visual dependency graph (SVG)
pnpm --filter @workspace/lifepilot exec madge --image dependency-graph.svg src/

# Check only the storage layer for circles
pnpm --filter @workspace/lifepilot exec madge --circular src/storage/

# CI command (exits with code 1 if any circular found)
pnpm pilot check circular
```

Expected output when clean:
```
✔  No circular dependency found!
```

Expected output when a circular exists:
```
✖  Circular dependency found!
   src/hooks/useCareer.ts → src/storage/storageService.ts → src/hooks/useCareer.ts
```

#### Tool 2: ESLint `import/no-cycle`

```json
// .eslintrc or eslint.config.js
{
  "rules": {
    "import/no-cycle": ["error", { "maxDepth": 5, "ignoreExternal": true }]
  }
}
```

This runs on every file save in VS Code and on every PR in CI. It is an `error`, not a `warn` — it blocks the build.

#### Tool 3: TypeScript Project References

Library packages in `lib/` are declared with TypeScript composite project references. If a circular reference between libs exists, `tsc --build` will fail with a clear error before any bundle is produced.

### Circular Dependency Taxonomy

| Type | Example | Severity | Resolution |
|------|---------|---------|-----------|
| **Direct circle** | A → B → A | P0 — Fix immediately | Extract shared dependency C |
| **Indirect circle** | A → B → C → A | P0 — Fix immediately | Restructure or extract shared dependency |
| **Type-only circle** | A imports type from B; B imports type from A | P1 — Fix in sprint | Move shared types to `types/index.ts` |
| **Dev-only circle** | Circle only in test files | P2 — Fix next sprint | Restructure test imports |

### Breaking a Circular Dependency

The resolution follows one of four strategies:

**Strategy 1 — Extract shared dependency**
```
Before: A → B → A
After:  A → C ← B   (C is the extracted shared module)
```

**Strategy 2 — Invert the dependency**
```
Before: Service → Hook → Service
After:  Hook → Service   (Hook depends on Service; Service never depends on Hook)
```

**Strategy 3 — Use an interface/event**
```
Before: ModuleA → ModuleB → ModuleA (direct component reference)
After:  ModuleA publishes event → EventBus → ModuleB subscribes
        (no direct dependency in either direction)
```

**Strategy 4 — Move shared types to the domain layer**
```
Before: ServiceA imports type from ServiceB → ServiceB imports type from ServiceA
After:  Both import the shared type from types/index.ts
        (the only place shared types live)
```

### Circular Dependency Resolution SLA

| Severity | SLA | Escalation |
|---------|-----|-----------|
| P0 (direct or indirect) | Fixed before PR merges | Blocks merge; author must resolve |
| P1 (type-only) | Fixed within current sprint | Tracked in tech debt backlog |
| P2 (dev-only) | Fixed next refactor sprint | Tracked in tech debt backlog |

---

## SECTION 5 — PACKAGE LAYER RULES

### 5.1 The Layer Hierarchy

```
Layer 0 — Domain (types/index.ts)
  ↑ imported by all layers
  ↓ imports nothing

Layer 1 — Infrastructure (storage/db.ts, utils/index.ts, theme/tokens.ts)
  ↑ imported by layers 2–5
  ↓ imports only: Layer 0

Layer 2 — Service (storage/storageService.ts)
  ↑ imported by layers 3–5
  ↓ imports only: Layers 0–1

Layer 3 — Application (hooks/, localization/)
  ↑ imported by layers 4–5
  ↓ imports only: Layers 0–2

Layer 4 — Component (components/ui/, components/common/, components/layout/)
  ↑ imported by layer 5
  ↓ imports only: Layers 0–3

Layer 5 — Presentation (modules/*/pages/, app/Router.tsx)
  ↑ imported by nothing
  ↓ imports only: Layers 0–4
```

### 5.2 Layer Violation Detection

`eslint-plugin-boundaries` enforces layer rules at the import level:

```javascript
// eslint.config.js (boundaries plugin configuration)
{
  "boundaries/element-types": ["error", {
    "default": "disallow",
    "rules": [
      // Layer 0: domain — imports nothing
      { "from": "domain", "allow": [] },

      // Layer 1: infrastructure — imports domain only
      { "from": "storage-db", "allow": ["domain"] },
      { "from": "utils", "allow": ["domain"] },
      { "from": "theme", "allow": ["domain"] },

      // Layer 2: service — imports infra + domain
      { "from": "service", "allow": ["storage-db", "utils", "domain"] },

      // Layer 3: application — imports service + infra + domain
      { "from": "hooks", "allow": ["service", "utils", "domain", "localization"] },

      // Layer 4: component — imports application + infra + domain
      { "from": "ui", "allow": ["utils", "domain"] },
      { "from": "components-common", "allow": ["hooks", "utils", "domain", "ui"] },
      { "from": "components-layout", "allow": ["hooks", "utils", "domain", "ui", "components-common", "theme"] },

      // Layer 5: presentation — imports everything above
      { "from": "modules", "allow": ["hooks", "service", "utils", "domain", "ui", "components-common", "components-layout"] },
      { "from": "pages", "allow": ["modules", "hooks", "service", "utils", "domain", "ui", "components-common", "components-layout"] },
    ]
  }]
}
```

### 5.3 pnpm Workspace Package Layer Rules

Within the pnpm workspace:

| Package | Layer | May Depend On | May NOT Depend On |
|---------|-------|--------------|------------------|
| `lib/*` packages | Shared library | Other `lib/*` packages (via references) | `artifacts/*` packages |
| `artifacts/lifepilot` | Application | `lib/*` packages | Other `artifacts/*` packages |
| `artifacts/api-server` | Application | `lib/*` packages | `artifacts/lifepilot` |
| `scripts/pilot-cli` | Tooling | `lib/*` packages | Any `artifacts/*` package |

**Rule**: Artifact packages never depend on each other. Shared logic lives in `lib/`.

```yaml
# pnpm-workspace.yaml enforces this via catalog restrictions
# artifacts/* packages list only lib/* as workspace dependencies
```

---

## SECTION 6 — FEATURE ISOLATION

### What Feature Isolation Means

Feature isolation is the guarantee that a product feature — a module, a page, a domain capability — can be:

1. **Developed** without knowledge of other features' internals
2. **Tested** without loading other features
3. **Removed** (by feature flag) without breaking other features
4. **Measured** in isolation (bundle size, performance)
5. **Replaced** without touching unrelated code

### The Isolation Boundary

Each product module (`cockpit`, `pilot`, `flight-plan`, etc.) is a hard isolation boundary:

```
src/modules/career-explorer/
  ├── components/    ← private — not exported to other modules
  ├── hooks/         ← private — not exported to other modules
  ├── pages/         ← exposed to Router only (lazy import)
  ├── utils/         ← private — not exported to other modules
  └── index.ts       ← the ONLY public API of this module
```

The `index.ts` barrel file declares what is intentionally shared. If it's not in `index.ts`, it's private to the module:

```typescript
// src/modules/career-explorer/index.ts
// Only export what Router and AppShell legitimately need
export { default as CareerExplorerPage } from "./pages/CareerExplorerPage";
// Do NOT export internal components, hooks, or utilities
```

### Feature Flag Isolation

Features gated behind a feature flag are isolated at the import level — they should not be in the main bundle when the flag is off:

```typescript
// ✅ CORRECT: Lazy-loaded behind feature flag
function AppRouter() {
  const hasDecisionIntelligence = useFeature("decision_intelligence");
  return (
    <Switch>
      {hasDecisionIntelligence && (
        <Route
          path="/life-choices"
          component={lazy(() => import("@/modules/life-choices/pages/LifeChoicesPage"))}
        />
      )}
    </Switch>
  );
}

// ✗ WRONG: Eagerly importing a flagged feature
import LifeChoicesPage from "@/modules/life-choices/pages/LifeChoicesPage"; // always bundled
```

### Module Bundle Isolation

Each module is a lazy-loaded chunk. Bundle size rules:

| Module | Max Chunk Size (gzipped) |
|--------|------------------------|
| Core shell (`app/`, `components/`, `hooks/`) | 60KB |
| Each product module chunk | 30KB |
| `storage/storageService.ts` | 25KB |
| `types/index.ts` | 10KB |
| `localization/` (per language) | 15KB |
| Total initial load | 200KB |

`pnpm pilot check bundle` validates all chunks against these targets.

### Test Isolation Requirements

Every module must be testable with:
- A class-based Dexie mock (no real IndexedDB)
- No dependency on sibling modules' implementations
- No dependency on browser APIs beyond what the mock provides
- Mocked `useTranslation` hook (returns key as value)

```typescript
// Standard test setup — every module test file
vi.mock("@/storage/db", () => ({
  db: new MockLifePilotDatabase(), // class mock, not function mock
}));
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
```

---

## SECTION 7 — SHARED LIBRARY GOVERNANCE

### What Goes in a Shared Library

Shared libraries (`lib/*` packages) contain code that is:
- **Used by multiple artifacts** (not just one app)
- **Stable** — changes slowly and carefully
- **Framework-agnostic** where possible (prefer plain TypeScript over React-specific)
- **Well-typed** — declares its own types, does not re-export `any`
- **Fully tested** — higher test coverage requirement than application code (95% target)

### Current Shared Library Candidates

| Library | Purpose | Status |
|---------|---------|--------|
| `lib/domain-types` | Shared TypeScript types and enums (extracted from `types/index.ts`) | Planned (Wave 2) |
| `lib/validation-schemas` | Zod schemas for all domain entities | Planned (Wave 2) |
| `lib/i18n-keys` | Type-safe i18n key constants | Planned (Wave 2) |
| `lib/ui-tokens` | Design tokens (CSS custom properties, colour names) | Planned (Wave 3) |

### Shared Library Rules

**Rule SL-01**: A library must be used by at least 2 artifacts before it is created. Single-use code stays in the artifact.

**Rule SL-02**: A library must declare its peer dependencies correctly. React components in a library declare `react` as a `peerDependency`, not a `dependency`.

**Rule SL-03**: A library is composite TypeScript (`composite: true`, `emitDeclarationOnly: true`). It emits declaration files that artifacts consume.

**Rule SL-04**: A library must be added to the root `tsconfig.json` `references` array. An artifact that uses a library adds it to the artifact's `tsconfig.json` `references`.

**Rule SL-05**: Libraries never import from `artifacts/*`. The dependency arrow points only from artifact → lib.

**Rule SL-06**: A shared library's public API (its `index.ts` barrel) is its contract. Breaking changes to the public API require a version increment and EARB awareness.

**Rule SL-07**: Libraries are published to the workspace as `@workspace/[name]`. They are never published to npm — they are internal only.

### Shared Library Addition Workflow

```
STEP 1 — Justify the library
  ← Write a 1-paragraph justification: what 2+ artifacts use it, why it's stable

STEP 2 — Create the library package
  pnpm pilot create lib [library-name]
  ← Boilerplate creates tsconfig.json with composite: true

STEP 3 — Add to workspace references
  ← Root tsconfig.json references array updated
  ← Consuming artifact tsconfig.json references array updated

STEP 4 — Write tests (95% coverage target)
  ← Library tests run with: pnpm --filter @workspace/[lib-name] run test

STEP 5 — Build and verify
  pnpm run typecheck:libs
  ← Zero errors required before any artifact imports the library
```

### Shared Library Versioning

Shared libraries within the workspace do not use semantic versioning externally. They use the workspace protocol:

```json
// In artifacts/lifepilot/package.json
{
  "dependencies": {
    "@workspace/domain-types": "workspace:*"
  }
}
```

When a library's public API changes in a breaking way:
1. Add new export (additive — always safe)
2. Deprecate old export with `@deprecated` JSDoc
3. After all consumers migrate: remove old export in next wave

---

## SECTION 8 — DEPENDENCY VALIDATION

### What Dependency Validation Covers

Dependency validation is the set of automated and manual checks that verify the codebase conforms to the dependency rules defined in this document. It runs at four levels:

```
Level 1 — Real-time (editor)       → ESLint rules, TypeScript errors
Level 2 — Pre-commit (local)       → pnpm pilot check (lint + types + circular)
Level 3 — Pull request (CI)        → Full dependency audit pipeline
Level 4 — Scheduled (weekly)       → Full dependency graph analysis + security audit
```

### Validation Checks Catalogue

| Check | Tool | When | Fails On |
|-------|------|------|---------|
| Layer violation | `eslint-plugin-boundaries` | Real-time + CI | Any import that crosses a forbidden layer boundary |
| Circular dependency | `madge` + `import/no-cycle` | Real-time + CI | Any circular import chain, any depth |
| Forbidden import | Custom ESLint rules | Real-time + CI | `db.ts` imported outside `storageService.ts`; `any` type; hardcoded strings in JSX |
| Package security | `pnpm audit` | CI + weekly | High or critical vulnerability in any dependency |
| Outdated packages | `pnpm outdated` | Weekly | Major version lag > 6 months on critical packages |
| Bundle size | `vite-bundle-visualizer` + size-limit | CI | Any chunk exceeds its size budget |
| Unused dependencies | `depcheck` | Weekly | Any installed package with zero imports |
| Missing peer deps | `pnpm install` check | CI | Peer dependency warnings in install output |
| Cross-artifact import | Custom ESLint rule | CI | Any `artifacts/*` importing from another `artifacts/*` |
| Type-only circular | TypeScript `--noEmit` | CI | TypeScript reports circular reference error |

### The `pnpm pilot check` Command Suite

```bash
# Run all dependency checks
pnpm pilot check all

# Individual checks
pnpm pilot check circular      # madge circular dependency scan
pnpm pilot check layers        # eslint-plugin-boundaries layer violations
pnpm pilot check bundle        # chunk size against budget
pnpm pilot check security      # pnpm audit (high + critical)
pnpm pilot check unused        # depcheck unused packages
pnpm pilot check i18n          # missing translation keys across all locales
pnpm pilot check schema        # db.ts schema vs storageService consistency
pnpm pilot check types         # full TypeScript typecheck
pnpm pilot check adr-required  # detect pattern changes that need an ADR
```

### Validation Output Format

All `pilot check` commands produce machine-readable output for CI and human-readable output for engineers:

```
$ pnpm pilot check layers

🔍  Layer dependency validation

  ✅  src/storage/db.ts         — imports domain only ✓
  ✅  src/storage/storageService.ts — imports storage + domain only ✓
  ✅  src/hooks/usePilot.ts     — imports service + domain only ✓
  ✅  src/components/ui/        — imports domain + utils only ✓
  ❌  src/modules/cockpit/components/CockpitCard.tsx
       → imports from src/storage/db (line 3) — LAYER VIOLATION
       → Layer: module-component cannot import from storage-db
       → Fix: import from storageService via a hook instead

  Result: 1 violation found — build BLOCKED
```

### Security Vulnerability Handling

```
pnpm audit output levels:
  info      → Log, no action required
  low       → Track in security backlog, fix within 30 days
  moderate  → Fix within 14 days
  high      → Fix before next release, blocks release gate
  critical  → Fix before next commit merges, P0 incident opened
```

When a vulnerable package is found:

```
STEP 1 — Check: is the vulnerability reachable in our usage?
  ← If not (e.g., the vulnerable code path is never called): document + accept risk

STEP 2 — Check: is there a patched version?
  ← If yes: update via pnpm update [package]
  ← If no: find an alternative package or remove the dependency

STEP 3 — If accepting risk: add to .auditignore with expiry date and justification
  ← Accepted risks reviewed monthly; any accepted risk > 90 days requires EARB review

STEP 4 — Document in Security Risk Register
```

---

## SECTION 9 — AUTOMATED ENFORCEMENT

### Enforcement Philosophy

> "Rules that are not enforced automatically are not rules — they are suggestions. At LifePilot, dependency rules are enforced automatically. Violations block commits, block PRs, and block deployments."

The enforcement stack operates at three stages: **never committed**, **never merged**, **never deployed**.

### Stage 1 — Never Committed (Pre-commit Hooks)

Managed by `husky` + `lint-staged`:

```json
// .husky/pre-commit
#!/bin/sh
pnpm pilot check circular --staged
pnpm pilot check layers --staged
pnpm lint-staged
```

```json
// lint-staged configuration
{
  "src/**/*.{ts,tsx}": [
    "eslint --max-warnings 0",
    "tsc-files --noEmit"
  ]
}
```

**What this catches**: Circular dependencies, layer violations, lint errors, and TypeScript errors — before the commit is ever made.

**Engineer experience**: The pre-commit hook runs in < 5 seconds on staged files only. It is fast enough to not be frustrating.

**Bypass**: `git commit --no-verify` is available but its use is logged and audited. Excessive bypass use triggers a DX review.

### Stage 2 — Never Merged (CI Pipeline)

Every PR triggers the full CI dependency validation pipeline:

```yaml
# .github/workflows/dependency-check.yml (or Replit CI equivalent)

name: Dependency Governance

on: [pull_request]

jobs:
  circular-deps:
    name: Circular Dependency Check
    steps:
      - run: pnpm pilot check circular
      - run: echo "Exit code $?" && [ $? -eq 0 ]  # Fails PR if circles found

  layer-violations:
    name: Layer Boundary Check
    steps:
      - run: pnpm --filter @workspace/lifepilot run lint
        env:
          ESLINT_BOUNDARIES: true   # enables boundaries plugin rules

  bundle-size:
    name: Bundle Size Check
    steps:
      - run: pnpm --filter @workspace/lifepilot run build
      - run: pnpm pilot check bundle
        # Fails if any chunk exceeds its budget

  security-audit:
    name: Security Audit
    steps:
      - run: pnpm audit --audit-level high
        # Fails on high or critical vulnerabilities

  type-check:
    name: TypeScript Check
    steps:
      - run: pnpm run typecheck
        # Full workspace typecheck including libs

  cross-artifact:
    name: Cross-Artifact Dependency Check
    steps:
      - run: pnpm pilot check cross-artifact
        # Verifies no artifacts/* imports from another artifacts/*
```

**PR gate**: All jobs must pass green before a PR can be merged. No exceptions. No manual overrides without EARB approval and a recorded justification.

**Required PR checks** (cannot be bypassed by repository admins):
- `circular-deps`
- `layer-violations`
- `type-check`
- `security-audit` (high/critical)

**Non-blocking PR checks** (reported but do not block merge):
- `bundle-size` (warning only unless exceeds hard limit)
- `unused-dependencies` (weekly scheduled, not per-PR)

### Stage 3 — Never Deployed (Deploy Gate)

Before any production deployment:

```bash
# deploy-gate.sh — runs in CI before deploy step
set -e

echo "Running pre-deploy dependency validation..."

pnpm audit --audit-level high        # No high/critical vulns
pnpm pilot check circular            # No circular deps
pnpm pilot check bundle              # Bundle within budget
pnpm pilot check schema              # Schema consistency
pnpm run typecheck                   # Zero type errors
pnpm run test                        # All tests passing

echo "All dependency checks passed — proceeding with deployment"
```

### Enforcement Bypass Protocol

When a legitimate emergency requires bypassing an enforcement gate:

```
STEP 1 — Author: document the bypass in writing
  "Bypassing [check name] because [reason]. Risk: [risk description]. 
   Permanent fix: [planned resolution] by [date]."

STEP 2 — EARB or Tech Lead: approve the bypass in writing (Slack + GitHub comment)

STEP 3 — Author: add temporary bypass with expiry
  // eslint-disable-next-line import/no-cycle -- BYPASS: [ticket ref], expires [date]

STEP 4 — Create a P1 ticket to remove the bypass
  ← Ticket must be in the current or next sprint

STEP 5 — Post-bypass review at next EARB session
  ← Bypasses older than the stated expiry are P0 incidents
```

### Enforcement Metrics Dashboard

The following metrics are tracked weekly and reviewed monthly by the Engineering Excellence Board:

| Metric | Target | Alert Threshold |
|--------|--------|----------------|
| Circular dependencies in codebase | 0 | > 0 |
| Layer violations (ESLint errors) | 0 | > 0 |
| Security vulnerabilities (high+) | 0 | > 0 |
| Security vulnerabilities (moderate) | ≤ 3 | > 5 |
| Active bypass annotations | 0 | > 2 |
| Expired bypass annotations | 0 | > 0 |
| Unused packages | 0 | > 5 |
| Bundle size over budget | 0 chunks | > 0 chunks |
| Pre-commit hook bypass rate | < 1% of commits | > 3% of commits |

Metrics are generated by `pnpm pilot metrics dependencies` and published to the team dashboard weekly.

---

## SUMMARY — DEPENDENCY GOVERNANCE AT A GLANCE

```
ALLOWED DIRECTIONS:
  Presentation → Application → Service → Infrastructure → Domain
  (each layer imports only from layers below it)

FORBIDDEN DIRECTIONS:
  Domain → anything
  Service → Presentation
  Module A → Module B (components or hooks)
  Any layer → db.ts (except storageService.ts)

CIRCULAR DEPENDENCIES:
  Zero tolerance. P0 defect. Blocks merge.

PACKAGE RULES:
  Runtime packages: only in their designated layer
  Dev packages: never in production imports
  New packages: Tier 3 ADR required before adding

FEATURE ISOLATION:
  Each module is its own chunk
  Modules export only via index.ts
  Feature-flagged features are lazy-loaded

SHARED LIBRARIES:
  Created only when 2+ artifacts need the same code
  Always in lib/* workspace packages
  Artifacts never import from other artifacts

AUTOMATED ENFORCEMENT:
  Pre-commit: circular + layer + lint (< 5 seconds)
  PR gate:    full dependency audit (blocks merge)
  Deploy gate: full validation before production
  Weekly:     security + unused + outdated audit
```

---

*End of LifePilot Dependency Governance Framework v1.0*

*Next review: Wave 2 completion (when repository pattern and EventBus are introduced — these will add new allowed dependency paths that must be documented here).*
