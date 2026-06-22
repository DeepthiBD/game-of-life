# LifePilot — Developer Platform
## RP-003 | Developer Platform Blueprint v1.0
### Engineering Excellence Board | June 2026 | Status: RATIFIED

---

> **Document Authority**: This document defines the LifePilot Developer Platform — the internal tooling, templates, golden paths, scaffolding system, and productivity standards that enable every engineer to contribute with speed, consistency, and confidence. The Developer Platform is itself a product. It has users (engineers), and it must be excellent.

---

## TABLE OF CONTENTS

1. Developer Platform Vision
2. Developer Portal
3. Golden Paths
4. Internal Templates
5. Scaffolding System
6. CLI (`pilot-cli`)
7. Generators
8. Boilerplates
9. Self-Service Development
10. Developer Experience (DX)
11. Engineering Productivity

---

## SECTION 1 — DEVELOPER PLATFORM VISION

### What is the Developer Platform?

The Developer Platform is the internal ecosystem of tools, templates, standards, and automation that makes the LifePilot engineering organisation fast, consistent, and high-quality. It is the difference between:

**Without a Developer Platform**:
> "I want to add a new module. I need to ask someone how to structure it, what tests to write, how to add translations, what service patterns to follow, how to register it in the router, and where the icons go. This takes 2 days and still produces inconsistent results."

**With a Developer Platform**:
> "I want to add a new module. I run `pnpm pilot new module money-quest`. The scaffold is created with correct structure, types registered, translation keys stubbed, route registered, and tests in place. I'm building the actual feature within 10 minutes."

### Platform Principles

| Principle | Statement |
|-----------|-----------|
| **Convention over configuration** | The scaffold produces the right answer. Engineers don't configure it from scratch. |
| **Golden Path is the easy path** | The correct, architecturally-aligned way to do something must be the easiest way. |
| **Self-documenting** | Generated code is annotated with comments that teach the pattern — not just the code. |
| **Zero-setup for new engineers** | Clone → install → dev. No tribal knowledge required to start contributing. |
| **Platform as a product** | The Developer Platform has a roadmap, a backlog, and an owner. DX regressions are bugs. |

### Platform Scope

```
Developer Platform
  ├── Developer Portal         (docs, guides, API reference)
  ├── Golden Paths             (the "right way" for common tasks)
  ├── Internal Templates       (reusable file templates)
  ├── Scaffolding System       (automated code generation)
  ├── CLI (pilot-cli)          (command-line developer tooling)
  ├── Generators               (code-level generators for entities, services, tests)
  ├── Boilerplates             (starter packages for new artifacts)
  ├── Self-Service Development (autonomous contribution without gatekeeping)
  ├── DX Standards             (measurement and improvement of developer experience)
  └── Engineering Productivity (metrics, tools, automation)
```

---

## SECTION 2 — DEVELOPER PORTAL

### Purpose
The Developer Portal is the single authoritative source of truth for all engineering knowledge at LifePilot. It is searchable, versioned, and always current — because it is generated from code where possible and maintained as code elsewhere.

### Portal Architecture

```
docs/
  ├── index.md                   ← Entry point and orientation
  ├── getting-started/           ← Onboarding and local setup
  │   ├── quickstart.md
  │   ├── environment-setup.md
  │   ├── first-contribution.md
  │   └── development-workflow.md
  ├── architecture/              ← Architecture docs (generated from RP-003)
  │   ├── overview.md
  │   ├── domain-model.md
  │   ├── service-layer.md
  │   ├── offline-first.md
  │   └── adr/                  ← Architecture Decision Records
  ├── golden-paths/              ← Step-by-step guides for common tasks
  │   ├── add-entity.md
  │   ├── add-service.md
  │   ├── add-module.md
  │   ├── add-translation.md
  │   ├── add-test.md
  │   └── add-feature-flag.md
  ├── reference/                 ← Auto-generated from code
  │   ├── types/                ← All 232 entity type docs (from JSDoc)
  │   ├── services/             ← All service API docs (from JSDoc)
  │   └── hooks/                ← All hook docs (from JSDoc)
  ├── standards/                 ← Engineering standards
  │   ├── coding-standards.md
  │   ├── testing-standards.md
  │   ├── naming-standards.md
  │   └── accessibility-standards.md
  ├── playbooks/                 ← Operational runbooks
  │   ├── incident-response.md
  │   ├── schema-migration.md
  │   ├── dpdp-erasure-request.md
  │   └── school-onboarding.md
  └── changelog/                ← Platform changelog per wave
```

### Portal Content Standards

| Content Type | Update Trigger | Owner |
|-------------|---------------|-------|
| Getting started | On any DX change | Platform Team |
| Golden paths | On any pattern change | Tech Lead |
| Type reference | Auto-generated from `types/index.ts` JSDoc | CI pipeline |
| Service reference | Auto-generated from `storageService.ts` JSDoc | CI pipeline |
| ADRs | On each EARB decision | Architect |
| Playbooks | On each incident post-mortem | On-call team |
| Changelog | On each wave completion | Tech Lead |

### Portal Governance Rules

- The portal is updated in the same PR as the code change it documents
- "I'll document it later" is treated the same as "I'll test it later" — not acceptable
- All new golden paths are reviewed by 2 engineers who followed them from scratch
- Auto-generated reference docs are regenerated in CI on every merge to main
- The portal search must return results for every public type and service method

### Portal Anti-patterns

- Docs that describe what the code used to do (stale docs are worse than no docs)
- Docs that only exist in Notion or Confluence (docs live in the repo, alongside the code)
- Docs that require a team member to explain them (if it needs explaining, rewrite it)
- "Ask X, they know how this works" (if only one person knows, it must be documented)

---

## SECTION 3 — GOLDEN PATHS

### What is a Golden Path?

A Golden Path is the LifePilot-recommended, architecturally-correct, fully-tested, DX-optimised way to accomplish a common engineering task. Following the Golden Path produces code that:

- Conforms to all architecture principles
- Passes all quality gates automatically
- Is consistent with every other instance of the same pattern in the codebase
- Requires no tribal knowledge or asking for help

**Golden Paths are not suggestions. They are the default.** Deviating from a Golden Path requires a written justification and Tech Lead approval.

---

### Golden Path 1 — Add a New Entity

**Trigger**: A new domain entity needs to be added to the domain model.

**Prerequisite**: EARB approval (any new entity modifies the frozen domain model).

```
STEP 1 — Declare the type
  File: src/types/index.ts
  Add interface MyNewEntity { ... }
  Add enum if new enum values needed
  ← JSDoc comment: explain what this entity represents in business terms

STEP 2 — Register in the database
  File: src/storage/db.ts
  Add: myNewEntities!: Table<MyNewEntity>;
  Add to schema version N+1: { myNewEntities: "++id, pilotId, ..." }
  ← Version must be incremented; add version ABOVE current highest version

STEP 3 — Create the service
  File: src/storage/storageService.ts
  Add service object: myNewEntityService = { ... }
  Methods: getForPilot, getById, getAll, create, update, archive
  All methods wrapped in safeRun()

STEP 4 — Write the tests
  File: tests/unit/myNewEntityService.test.ts
  Test: create, getById (found), getById (not found), getForPilot, update, archive

STEP 5 — Add translation keys (if user-visible)
  File: src/localization/locales/en.json
  Add keys under appropriate namespace
  Propagate to all 9 other locale files

STEP 6 — Run validation
  pnpm --filter @workspace/lifepilot run typecheck
  pnpm --filter @workspace/lifepilot run test
  ← Both must pass with zero errors
```

**Time to complete**: 30–45 minutes following this path.
**Generator**: `pnpm pilot generate entity MyNewEntity` (auto-executes steps 1–3, stubs steps 4–5).

---

### Golden Path 2 — Add a New Module (Product Feature Area)

**Trigger**: A new top-level product module needs to be created (e.g., a new product area).

**Prerequisite**: Product approval + EARB awareness.

```
STEP 1 — Register the module in tokens
  File: src/theme/tokens.ts
  Add to MODULES array: { id, i18nId, path, icon, color, labelKey }
  ← Use module.i18nId (camelCase) for i18n keys, module.id (lowercase) for CSS/DOM

STEP 2 — Create the module folder
  Path: src/modules/[module-id]/
  Structure:
    components/   ← module-local components
    hooks/        ← module-local hooks
    pages/        ← route-level page components
    utils/        ← module-specific utilities
    index.ts      ← public API

STEP 3 — Create the index page (placeholder)
  File: src/modules/[module-id]/pages/[ModuleId]Page.tsx
  Pattern: functional component, uses useTranslation, renders i18n title
  ← Must NOT have hardcoded strings

STEP 4 — Register the route
  File: src/app/Router.tsx
  Add: <Route path="/[module-path]" component={lazy(() => import("..."))} />

STEP 5 — Add navigation entries
  File: src/components/navigation/Sidebar.tsx   ← desktop nav
  File: src/components/navigation/BottomNav.tsx ← mobile nav
  ← Use module data from MODULES array, not hardcoded

STEP 6 — Add translation keys
  File: src/localization/locales/en.json
  Add namespace: { "[i18nId]": { "title": "...", "subtitle": "..." } }
  Propagate to all 9 other locale files

STEP 7 — Verify integration
  pnpm --filter @workspace/lifepilot run dev
  Navigate to the route — module renders, nav shows entry, no TypeScript errors
```

**Generator**: `pnpm pilot generate module career-explorer` (auto-executes steps 1–4, stubs 5–6).

---

### Golden Path 3 — Add a Translation Key

**Trigger**: Any new user-visible string needs to be added.

```
STEP 1 — Add to English source
  File: src/localization/locales/en.json
  Key convention: "namespace.component.element"
  Example: "careerExplorer.pathCard.readMore"

STEP 2 — Propagate to all other locales
  Files: hi.json, ta.json, te.json, kn.json, ml.json, mr.json, bn.json, gu.json, pa.json
  Add the same key with the SAME English value as a placeholder
  ← Placeholder English is acceptable; missing key is not

STEP 3 — Use in component
  const { t } = useTranslation();
  return <span>{t("careerExplorer.pathCard.readMore")}</span>

STEP 4 — Verify
  Switch language in the app — no [missing: key] strings visible
```

**Generator**: `pnpm pilot add-translation careerExplorer.pathCard.readMore "Read More"` (auto-executes steps 1–2).

---

### Golden Path 4 — Add a Feature Flag

**Trigger**: A new feature needs to be gated by edition, rollout, or experiment.

```
STEP 1 — Define the flag key (kebab_snake convention)
  Examples: "ai_coaching_v1", "decision_intelligence", "enterprise_rbac"

STEP 2 — Register in the flag registry
  File: docs/feature-flags.md
  Add: key, description, default value, editions enabled, sunset date

STEP 3 — Seed the flag in the database (for development)
  File: scripts/seed/featureFlags.ts
  Add seed entry for local development

STEP 4 — Implement the flag check
  const hasFeature = useFeature("my_new_flag");
  if (!hasFeature) return <UpgradePrompt />;

STEP 5 — Write tests for both flag states
  it("renders content when flag is enabled", ...)
  it("renders upgrade prompt when flag is disabled", ...)
```

---

### Golden Path 5 — Add a Schema Migration

**Trigger**: A new entity or index needs to be added to the Dexie schema.

```
STEP 1 — Increment the schema version (N = current highest + 1)

STEP 2 — Add the new version block ABOVE all existing version blocks
  this.version(N).stores({
    newTable: "++id, pilotId, [pilotId+createdAt]",
    // if adding index to existing table:
    existingTable: "++id, existingIndex, newIndex",
  });
  // Add .upgrade() only if data transformation is needed

STEP 3 — Add Table<T> field to LifePilotDatabase class
  newTable!: Table<NewEntity>;

STEP 4 — Test the migration
  ← Create a v(N-1) database with test data
  ← Open with the new code
  ← Verify all existing data is intact
  ← Verify new table is accessible

STEP 5 — Document the version in a comment
  // v12 (June 2026): Adds newTable for [feature]. See ADR-NNN.
```

---

### Golden Path 6 — Write a Service Unit Test

**Trigger**: Any new or modified service method.

```typescript
// File: tests/unit/[entityName]Service.test.ts

import { describe, it, expect, beforeEach, vi } from "vitest";
import { [entityName]Service } from "@/storage/storageService";

// Dexie mock must be a CLASS (not a function mock)
class MockLifePilotDatabase {
  [tableName] = {
    add: vi.fn().mockResolvedValue(1),
    get: vi.fn().mockResolvedValue(undefined),
    where: vi.fn().mockReturnThis(),
    equals: vi.fn().mockReturnThis(),
    toArray: vi.fn().mockResolvedValue([]),
    update: vi.fn().mockResolvedValue(1),
    delete: vi.fn().mockResolvedValue(undefined),
  };
}

describe("[entityName]Service", () => {
  let mockDb: MockLifePilotDatabase;

  beforeEach(() => {
    mockDb = new MockLifePilotDatabase();
    vi.doMock("@/storage/db", () => ({ db: mockDb }));
  });

  it("creates an entity and returns its id", async () => {
    mockDb.[tableName].add.mockResolvedValue(42);
    const result = await [entityName]Service.create({ pilotId: 1, ... });
    expect(result.success).toBe(true);
    expect(result.data).toBe(42);
  });

  it("returns success:false when an error occurs", async () => {
    mockDb.[tableName].add.mockRejectedValue(new Error("DB error"));
    const result = await [entityName]Service.create({ pilotId: 1, ... });
    expect(result.success).toBe(false);
    expect(result.error).toBeTruthy();
  });
});
```

---

## SECTION 4 — INTERNAL TEMPLATES

### Purpose
Internal templates are versioned, curated file templates that produce architecturally-correct code when used. They are the raw material that generators use, and the reference that engineers read when they want to understand the correct pattern.

### Template Registry

```
scripts/templates/
  ├── entity.template.ts           ← New domain entity type definition
  ├── service.template.ts          ← New service object (safeRun pattern)
  ├── service.test.template.ts     ← Unit test for a service (Dexie mock pattern)
  ├── module-page.template.tsx     ← Module index page (i18n, no hardcoded strings)
  ├── module-component.template.tsx ← Module-local component
  ├── module-hook.template.ts      ← Custom hook (useTranslation + useOfflineStatus)
  ├── feature-flag.template.ts     ← Feature flag guard component
  ├── adr.template.md              ← Architecture Decision Record
  ├── translation-namespace.template.json ← New i18n namespace stub
  └── repository.template.ts       ← Repository interface + Dexie implementation (Wave 2)
```

---

### Template: Entity Type

```typescript
// scripts/templates/entity.template.ts
// TEMPLATE: Replace {{EntityName}} with PascalCase entity name.
// TEMPLATE: Replace {{entityDescription}} with a business-level description.

/**
 * {{EntityName}} — {{entityDescription}}
 *
 * Domain: {{domainName}}
 * Aggregate: {{aggregateRoot}}
 * Schema introduced: v{{schemaVersion}}
 * Additive-only: never remove or rename fields.
 */
export interface {{EntityName}} {
  /** Auto-incremented primary key (Dexie) */
  id?: number;

  /** Pilot this entity belongs to */
  pilotId: number;

  /** Whether this record is active (stored as 0|1 in IndexedDB) */
  isActive: boolean;

  /** ISO 8601 creation timestamp */
  createdAt: Date;

  /** ISO 8601 last-modified timestamp */
  updatedAt: Date;
}
```

---

### Template: Service Object

```typescript
// scripts/templates/service.template.ts
// TEMPLATE: Replace {{EntityName}} / {{entityName}} / {{tableName}}

import { db } from "./db";
import { safeRun, type StorageResult } from "./storageService";
import type { {{EntityName}} } from "@/types";

export const {{entityName}}Service = {

  async getForPilot(pilotId: number): Promise<StorageResult<{{EntityName}}[]>> {
    return safeRun(() =>
      db.{{tableName}}
        .where("pilotId")
        .equals(pilotId)
        .and((r) => r.isActive)
        .toArray()
    );
  },

  async getById(id: number): Promise<StorageResult<{{EntityName}} | undefined>> {
    return safeRun(() => db.{{tableName}}.get(id));
  },

  async create(
    data: Omit<{{EntityName}}, "id" | "createdAt" | "updatedAt">
  ): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.{{tableName}}.add({
        ...data,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );
  },

  async update(
    id: number,
    delta: Partial<Omit<{{EntityName}}, "id" | "pilotId" | "createdAt">>
  ): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.{{tableName}}.update(id, { ...delta, updatedAt: new Date() })
    );
  },

  async archive(id: number): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.{{tableName}}.update(id, { isActive: false, updatedAt: new Date() })
    );
  },
};
```

---

### Template: Module Page

```tsx
// scripts/templates/module-page.template.tsx
// TEMPLATE: Replace {{ModuleName}} / {{modulePath}} / {{i18nNamespace}}

import { useTranslation } from "react-i18next";

/**
 * {{ModuleName}}Page — Route-level component for the {{modulePath}} module.
 * All strings must come from i18n — never hardcode visible text.
 */
export default function {{ModuleName}}Page() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-2xl font-bold tracking-tight">
        {t("{{i18nNamespace}}.title")}
      </h1>
      <p className="text-muted-foreground">
        {t("{{i18nNamespace}}.subtitle")}
      </p>
      {/* TODO: Implement {{ModuleName}} feature content */}
    </div>
  );
}
```

---

### Template: ADR

```markdown
<!-- scripts/templates/adr.template.md -->
# ADR-NNN: [Short, Imperative Title — e.g., "Use Dexie for IndexedDB access"]

## Status
[Proposed | Accepted | Deprecated | Superseded by ADR-NNN]

## Date
YYYY-MM-DD

## Context
What is the problem or situation that prompted this decision?
What constraints exist? What options were considered?

## Decision
What was decided? Be specific.

## Rationale
Why was this option chosen over the alternatives?
What evidence, data, or principles guided this decision?

## Consequences
**Positive**: What does this make easier?
**Negative**: What does this make harder? What is the cost?
**Neutral**: What does this change without a clear value judgment?

## Review Date
When should this decision be re-evaluated? (e.g., "At Wave 2 completion")

## Alternatives Considered
| Option | Why Rejected |
|--------|-------------|
| ...    | ...          |
```

---

## SECTION 5 — SCAFFOLDING SYSTEM

### Purpose
The scaffolding system is the automation layer that reads templates, applies variable substitution, creates files in the correct locations, and updates dependent files (router, service registry, translation files) — all in a single command.

### Scaffolding Philosophy

**Scaffolding produces production-quality stubs, not placeholder garbage.** A scaffolded file should be committable on day one — it follows all conventions, it has correct types, it has translation keys, and it has a passing test stub.

**Scaffolding is opinionated.** The scaffolding system makes the correct architectural decision for you. You do not get configuration options for things that have a clearly correct answer.

**Scaffolding is not a one-time tool.** It is run whenever a new entity, module, service, or translation namespace is needed — by senior engineers and junior engineers alike.

### Scaffolding Engine Architecture

```
scripts/scaffold/
  ├── engine.ts               ← Core template engine (variable substitution)
  ├── writers/
  │   ├── fileWriter.ts       ← Creates files from templates
  │   ├── registryWriter.ts   ← Updates index files and registry files
  │   ├── routerWriter.ts     ← Injects route into Router.tsx
  │   └── translationWriter.ts ← Adds keys to all 10 locale files
  ├── validators/
  │   ├── nameValidator.ts    ← Validates naming conventions
  │   └── conflictChecker.ts  ← Checks for naming collisions
  └── templates/
      └── [all templates from Section 4]
```

### Scaffolding Variable Model

```typescript
interface ScaffoldContext {
  // Core
  EntityName: string;          // PascalCase: "WellbeingSnapshot"
  entityName: string;          // camelCase: "wellbeingSnapshot"
  entity_name: string;         // snake_case: "wellbeing_snapshot"
  entity-name: string;         // kebab-case: "wellbeing-snapshot"
  ENTITY_NAME: string;         // SCREAMING_SNAKE: "WELLBEING_SNAPSHOT"
  tableName: string;           // Dexie table: "wellbeingSnapshots"

  // Module-specific
  modulePath: string;          // URL path: "/wellbeing"
  moduleIcon: string;          // Lucide icon name: "Heart"
  moduleColor: string;         // CSS token: "var(--color-wellbeing)"
  i18nNamespace: string;       // i18n namespace: "wellbeing"

  // Schema
  schemaVersion: number;       // Current schema version + 1
  domainName: string;          // Domain: "Wellbeing"
  aggregateRoot: string;       // Aggregate root: "Pilot"
  schemaDate: string;          // ISO date: "2026-06"

  // Meta
  adtNumber: string;           // Next ADR number: "ADR-042"
}
```

---

## SECTION 6 — CLI (`pilot-cli`)

### Purpose
`pilot-cli` is the LifePilot engineering command-line interface. It is the primary interface to the scaffolding system, developer utilities, and common engineering tasks. It lives in `scripts/pilot-cli/` and is available as `pnpm pilot [command]` from the workspace root.

### CLI Design Principles

- **One command per task**: `pilot generate entity` not `pilot g e`
- **Interactive when ambiguous**: If required arguments are missing, prompt interactively
- **Dry run by default**: `--dry-run` shows what would be created without creating it
- **Verbose by default**: Show every file created or modified
- **Undo support**: `--undo` reverses the last scaffold operation

### Command Reference

```
pilot generate entity <EntityName>        Generate entity type + service + test stub
pilot generate module <module-name>       Generate module folder + page + route + nav entry
pilot generate service <EntityName>       Generate service object for existing entity
pilot generate test <ServiceName>         Generate test file for existing service
pilot generate adr <"short-title">        Generate ADR file with next sequential number
pilot generate hook <hookName>            Generate custom hook stub

pilot add translation <key> <"value">     Add translation key to all 10 locale files
pilot add feature-flag <flag-key>         Add feature flag to registry and seed

pilot check types                         Run tsc --noEmit with readable output
pilot check tests                         Run Vitest with readable summary
pilot check bundle                        Analyse bundle size against budget
pilot check i18n                          Find missing translation keys across locales
pilot check schema                        Validate db.ts schema consistency

pilot list entities                       List all 232 entities with table names
pilot list modules                        List all modules with routes and status
pilot list flags                          List all feature flags with status
pilot list services                       List all service objects

pilot doctor                              Diagnose local environment health
pilot onboard                             Interactive new engineer onboarding checklist
pilot migrate schema                      Generate schema migration boilerplate for next version
```

### CLI Implementation

```typescript
// scripts/pilot-cli/src/index.ts
import { Command } from "commander";
import { generateEntity } from "./commands/generate/entity";
import { generateModule } from "./commands/generate/module";
import { addTranslation } from "./commands/add/translation";
import { checkTypes } from "./commands/check/types";

const program = new Command();

program
  .name("pilot")
  .description("LifePilot Developer CLI")
  .version("1.0.0");

program
  .command("generate <type> <name>")
  .description("Generate scaffolded code (entity | module | service | test | hook | adr)")
  .option("--dry-run", "Preview output without writing files")
  .option("--undo", "Reverse the last generate operation")
  .action(async (type, name, options) => {
    switch (type) {
      case "entity": await generateEntity(name, options); break;
      case "module": await generateModule(name, options); break;
      // ...
    }
  });

program.parse();
```

### CLI Output Format

```
$ pnpm pilot generate entity WellbeingSnapshot

🏗  Generating entity: WellbeingSnapshot

  ✅  src/types/index.ts          — Added WellbeingSnapshot interface (line 847)
  ✅  src/storage/db.ts           — Added wellbeingSnapshots table + incremented to v12
  ✅  src/storage/storageService.ts — Added wellbeingSnapshotService object
  ✅  tests/unit/wellbeingSnapshotService.test.ts — Created test stub (5 test cases)
  ✅  src/localization/locales/en.json — No translation keys needed for this entity

  📋  Next steps:
      1. Fill in WellbeingSnapshot fields in src/types/index.ts
      2. Define correct Dexie indexes in db.ts (check compound index needs)
      3. Implement service method bodies
      4. Run: pnpm pilot check types
      5. Run: pnpm pilot check tests

  ⏱  Completed in 1.2s
```

---

## SECTION 7 — GENERATORS

### Purpose
Generators are the individual units of the scaffolding system. Each generator is a focused function that produces one type of artifact. They can be called via the CLI or composed into larger workflows.

### Generator Catalogue

#### Entity Generator
**Input**: Entity name (PascalCase), domain, aggregate root
**Outputs**:
- Interface in `types/index.ts`
- `Table<T>` field in `db.ts`
- Schema version increment in `db.ts`
- Service object in `storageService.ts`
- Test file in `tests/unit/`

**Collision detection**: Checks for existing entities with the same name, warns about potential naming conflicts with the 232 existing entities.

#### Module Generator
**Input**: Module name (kebab-case), icon (Lucide name), color (CSS token), i18n namespace
**Outputs**:
- Module folder at `src/modules/[name]/`
- Index page at `src/modules/[name]/pages/[Name]Page.tsx`
- Entry in `MODULES` array in `tokens.ts`
- Route registration in `Router.tsx`
- Navigation entries in `Sidebar.tsx` and `BottomNav.tsx`
- Translation namespace stub in all 10 locale files

#### Service Generator
**Input**: Entity name (existing entity)
**Outputs**:
- Service object with 6 standard methods, all `safeRun`-wrapped
- Appended to `storageService.ts` in alphabetical position

#### Test Generator
**Input**: Service name (existing service)
**Outputs**:
- Full test file with Dexie class mock
- Test stubs for all methods (happy path + error path)
- Named following `[serviceName].test.ts` convention

#### Translation Generator
**Input**: i18n key, English value, optional description
**Outputs**:
- Key added to `en.json` in the correct namespace position
- Key added to all 9 other locale files with English placeholder value
- Outputs which files were modified and which keys were added

#### ADR Generator
**Input**: Short title (imperative, e.g., "use-wouter-for-routing")
**Outputs**:
- ADR file at `docs/adr/ADR-NNN-[slug].md`
- Auto-increments to next available ADR number
- Pre-fills date, status (Proposed), and all section headers

#### Feature Flag Generator
**Input**: Flag key (snake_case), description, default value, editions
**Outputs**:
- Entry in `docs/feature-flags.md` registry
- Seed entry in `scripts/seed/featureFlags.ts`
- Type-safe flag key added to `FeatureFlagKey` union type

### Generator Architecture

```typescript
// scripts/scaffold/generators/entityGenerator.ts

interface EntityGeneratorOptions {
  name: string;           // PascalCase entity name
  domain: string;         // Domain name
  aggregateRoot: string;  // Aggregate root entity name
  dryRun?: boolean;
}

export async function generateEntity(options: EntityGeneratorOptions): Promise<GeneratorResult> {
  const ctx = buildContext(options);

  await validateNoConflict(ctx.EntityName, existingEntities);

  const plan: FileOperation[] = [
    { type: "inject", file: "src/types/index.ts", template: "entity", position: "after:// [DOMAIN] ENTITIES" },
    { type: "inject", file: "src/storage/db.ts", template: "db-table", position: "class-body" },
    { type: "inject", file: "src/storage/db.ts", template: "db-schema", position: "version-block" },
    { type: "inject", file: "src/storage/storageService.ts", template: "service", position: "alphabetical" },
    { type: "create", file: `tests/unit/${ctx.entityName}Service.test.ts`, template: "service.test" },
  ];

  if (options.dryRun) {
    printPlan(plan);
    return { dryRun: true, operations: plan };
  }

  return executeOperations(plan, ctx);
}
```

---

## SECTION 8 — BOILERPLATES

### Purpose
Boilerplates are complete starting points for entirely new artifacts (apps, packages, services) within the pnpm workspace. Unlike templates (single files) and generators (single artifacts), boilerplates are complete, runnable starting points.

### Boilerplate Catalogue

#### `boilerplate-web-module`
A complete React + Vite artifact scaffolded to match the LifePilot design system.

```
pnpm pilot create artifact my-new-app --boilerplate web-module
```

Produces:
- `artifacts/my-new-app/` with Vite config, TypeScript, Tailwind v4
- AppShell imported from workspace design system (future)
- i18next configured with 10 Indian languages
- Dexie database stub
- Vitest configured
- PWA plugin configured
- `replit-artifact/artifact.toml` with service config

#### `boilerplate-api-service`
A complete Express + TypeScript API service for server-side features.

```
pnpm pilot create artifact my-api --boilerplate api-service
```

Produces:
- `artifacts/my-api/` with Express, Pino logger, Zod validation
- Health endpoint at `/api/healthz`
- Standard error handler middleware
- Standard request logger middleware
- OpenAPI spec stub at `api-spec/openapi.yaml`
- Drizzle ORM + PostgreSQL stub
- Vitest configured

#### `boilerplate-content-pack`
A structured starting point for a new Marketplace content pack.

```
pnpm pilot create content-pack my-content-pack --type curriculum
```

Produces:
- `content-packs/my-content-pack/`
- `manifest.json` (pack metadata, version, dependencies)
- `missions/` folder with mission stubs
- `locales/` folder with 10 language stubs
- `assets/` folder with asset manifest

#### `boilerplate-lib-package`
A shared library package for reusable code.

```
pnpm pilot create lib my-lib
```

Produces:
- `lib/my-lib/` with TypeScript composite config
- `src/index.ts` barrel export
- `tsconfig.json` with `composite: true`, `declarationMap: true`
- Added to root `tsconfig.json` references

### Boilerplate Quality Standard

Every boilerplate must:
- Pass `typecheck` with zero errors immediately after scaffolding
- Have a working `dev` script that starts the service
- Include at least one passing test
- Include documentation in the README
- Follow all workspace naming conventions

---

## SECTION 9 — SELF-SERVICE DEVELOPMENT

### Purpose
Self-service development means every engineer can make any standard contribution — add an entity, add a module, add a translation, write a test — without asking anyone, without waiting for a review gate, without needing tribal knowledge. The system guides them.

### Self-Service Maturity Levels

**Level 1 — Guided** (current state)
- Golden paths documented
- Templates available
- Manual process, but all steps documented

**Level 2 — Automated** (target: Wave 2)
- CLI automates all standard tasks
- Scaffolding handles file creation and injection
- Engineers write logic, not boilerplate

**Level 3 — Validated** (target: Wave 3)
- CLI validates contributions before they are submitted for review
- `pilot check` catches architecture violations before CI
- Contribution quality is verified locally, not discovered in code review

**Level 4 — Self-Optimising** (future)
- The system learns from usage patterns
- Underused golden paths are improved
- DX metrics drive platform investment automatically

### Self-Service Boundaries

| Task | Self-Service? | Notes |
|------|--------------|-------|
| Add a new entity to existing domain | ✅ Yes | Golden Path 1 + generator |
| Add a new module | ✅ Yes | Golden Path 2 + generator |
| Add translation keys | ✅ Yes | `pilot add translation` |
| Add a feature flag | ✅ Yes | `pilot add feature-flag` |
| Add a new domain | ❌ No | Requires EARB review |
| Modify an existing entity | ❌ No | Frozen domain model — additive only |
| Add an external dependency | ❌ No | Requires Tech Lead + security review |
| Add a new edition capability | ❌ No | Requires product + EARB approval |

### Self-Service Infrastructure Requirements

```
For self-service to work, the following must be true:
  1. Golden paths are accurate (validated by a new engineer following them cold)
  2. CLI is installed and working (part of pnpm install postinstall)
  3. Templates are current (updated in same PR as pattern changes)
  4. Conflict detection works (CLI warns before creating a conflicting entity)
  5. Local validation is fast (< 30 seconds for all checks)
```

---

## SECTION 10 — DEVELOPER EXPERIENCE (DX)

### Measuring Developer Experience

DX is not a feeling — it is a set of measurable outcomes. We measure it and we improve it.

### DX Metrics

| Metric | Definition | Target | Current |
|--------|-----------|--------|---------|
| **Time to First Commit** | Minutes from `git clone` to first passing test | ≤ 15 minutes | TBD |
| **Time to First Feature** | Days from onboarding to first merged PR | ≤ 3 days | TBD |
| **Build Time** | `pnpm dev` cold start to HMR ready | ≤ 30 seconds | TBD |
| **Test Feedback Latency** | Time from `pnpm test` to results | ≤ 30 seconds | TBD |
| **Typecheck Feedback Latency** | Time from `pnpm typecheck` to results | ≤ 20 seconds | TBD |
| **Scaffold Time** | Time from `pilot generate entity` to committed code | ≤ 10 minutes | TBD |
| **DX Satisfaction** | Monthly engineer survey (1–5 scale) | ≥ 4.0 | TBD |
| **Time Lost to DX Friction** | Weekly engineer time report (hours blocked by tooling) | ≤ 2 hours/week | TBD |
| **PR Review Latency** | Median time from PR opened to first review | ≤ 4 hours | TBD |

### DX Debt Registry

DX regressions are treated as bugs. They are registered in a DX debt backlog with severity:

| Severity | Example | SLA to Fix |
|----------|---------|-----------|
| **P0** — DX blocker | Build broken, tests not running | Same day |
| **P1** — DX friction | Scaffold generates invalid code | Within 3 days |
| **P2** — DX annoyance | Slow test, confusing error message | Within 2 weeks |
| **P3** — DX wish | Nice-to-have CLI improvement | Roadmap |

### DX Investment Commitment

- Platform team allocates minimum **20% of sprint capacity** to DX improvement
- DX regressions are never accepted as "acceptable trade-offs"
- Every sprint retrospective includes a DX section: "What made you slower this week?"
- New engineer onboarding includes a structured DX feedback session at day 3 and day 30

### DX Anti-patterns We Actively Fight

**"It works, don't touch it"**: Working but painful tooling is a DX bug. It is fixed, not tolerated.

**"Just read the docs"**: Docs that need to be read to do a standard task are docs that replace a missing tool. Build the tool.

**"That's how it's always been"**: The setup script that requires 5 manual steps "because that's how it's been" is a 5-step automation waiting to happen.

**"Engineers should know this"**: Engineers should know their domain. They should not need to know the internal mechanics of our build tooling, locale file conventions, or router registration patterns. That's what the CLI is for.

**Flaky tests**: A test that sometimes passes and sometimes fails is not a test — it is randomized doubt. Flaky tests are fixed within one sprint of discovery, not worked around.

### Local Environment Health: `pilot doctor`

```
$ pnpm pilot doctor

🩺  LifePilot Developer Environment Health Check

  ✅  Node.js 24.x detected
  ✅  pnpm 10.x detected
  ✅  TypeScript 5.9 installed
  ✅  Vitest installed
  ✅  Vite 7 installed
  ✅  10 locale files present (en, hi, ta, te, kn, ml, mr, bn, gu, pa)
  ✅  db.ts schema version matches storageService exports
  ✅  All MODULES in tokens.ts have registered routes in Router.tsx
  ✅  All MODULES have translation keys in en.json
  ⚠️  hi.json is missing 3 translation keys (run: pnpm pilot check i18n)
  ✅  Local Dexie mock is a class (Dexie mock pattern compliant)
  ✅  No TypeScript errors detected
  ✅  All 13 tests passing

  Result: 1 warning — run suggested commands to resolve
```

---

## SECTION 11 — ENGINEERING PRODUCTIVITY

### The Productivity Belief

> "Engineering productivity is not about working faster. It is about removing the work that should not exist."

The highest-productivity engineering organisation is not one where engineers work the most hours. It is one where the maximum fraction of engineer time is spent on *solving the actual problem* rather than fighting tools, writing boilerplate, waiting for builds, or re-learning patterns.

### Productivity Investment Areas

#### 1. Feedback Loop Acceleration

The time between "I write code" and "I know if it's correct" is the single most important DX metric. We attack it on every dimension:

- **Editor**: TypeScript strict mode + ESLint + real-time type checking in VS Code
- **Tests**: Vitest watch mode with HMR — tests re-run in < 1 second on file save
- **Build**: Vite HMR — changes visible in the browser in < 500ms
- **CI**: Full pipeline < 3 minutes — engineers wait for CI, not CI waits for engineers
- **Code review**: Automated checks catch 80% of issues before human review begins

#### 2. Cognitive Load Reduction

Engineers should spend their mental energy on domain problems, not tool mechanics:

- **Naming conventions**: One convention per artifact type, documented, enforced by CLI
- **Folder structure**: Predictable — you know where any file belongs before opening the folder
- **Service patterns**: One pattern (`safeRun` + `StorageResult`) — no decision required
- **Test patterns**: One pattern (class mock + happy path + error path) — no decision required
- **Import ordering**: Auto-enforced by ESLint + Prettier — not a thing engineers think about

#### 3. Automation of Repetitive Work

Anything an engineer does more than twice that doesn't require judgment should be automated:

| Repetitive Task | Automation |
|----------------|-----------|
| Add entity + service + test | `pilot generate entity` |
| Add i18n key to 10 files | `pilot add translation` |
| Create ADR with next number | `pilot generate adr` |
| Check all locale files for missing keys | `pilot check i18n` |
| Validate schema version consistency | `pilot check schema` |
| Increment schema version | `pilot migrate schema` |

#### 4. Standards that Prevent Rework

The most expensive engineer time is time spent redoing work. We prevent it by:

- **Golden paths**: Build it right the first time, not after code review feedback
- **Architecture compliance checklist**: Know before submitting whether the PR will pass
- **`pilot check` before `git push`**: Catch issues locally, not in CI
- **Pair review on first entity of a type**: New engineers pair on their first entity — not for oversight, but to make sure the golden path is clear

### Productivity Metrics and Targets

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| **Engineer time on domain logic** | ≥ 70% of coding time | Time tracking + survey |
| **Engineer time on tooling/boilerplate** | ≤ 15% of coding time | Time tracking + survey |
| **Engineer time on rework** | ≤ 15% of coding time | PR revision count |
| **First-time PR pass rate** | ≥ 75% | GitHub PR analytics |
| **Time from entity idea to merged code** | ≤ 2 days | PR analytics |
| **Lines of boilerplate per feature** | Trending down | Code analysis |
| **Build failure rate (unrelated to code)** | < 1% | CI analytics |

### Engineering Productivity Review

**Monthly**: DX metrics reviewed by Engineering Excellence Board. Any metric moving in the wrong direction for 2 consecutive months triggers a dedicated improvement sprint.

**Quarterly**: Full developer experience survey. Survey results are reviewed by the entire engineering team, not just leadership. Improvement actions are committed with owners and dates.

**Annually**: External developer experience audit — engineers from outside the team evaluate the development experience from scratch and provide unfiltered feedback.

---

## RATIFICATION

This Developer Platform Blueprint is ratified by the Engineering Excellence Board and takes effect immediately. All new tooling, templates, and CLI commands must conform to the standards defined here.

**Effective Date**: June 2026
**Next Review**: At Wave 2 completion (target: Q4 2026)
**Platform Owner**: Engineering Excellence Lead
**CLI Package**: `scripts/pilot-cli/` — `@workspace/pilot-cli`

---

*End of LifePilot Developer Platform Blueprint v1.0*
