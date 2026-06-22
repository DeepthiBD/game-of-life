# LifePilot — Testing Guide

## Philosophy

Tests are not a safety net — they are documentation of intent. A test says: "this is what this code is supposed to do." Good tests survive refactoring, catch regressions, and make new engineers confident to change code.

LifePilot's testing strategy follows the **Testing Trophy** (not pyramid): emphasis on integration tests over unit tests, because the integration of storage → service → hook → component is where most bugs live.

---

## Test Stack

| Tool | Purpose |
|------|---------|
| **Vitest** | Test runner — Vite-native, fast, compatible with RTL |
| **@testing-library/react** | Component testing — queries by accessibility role, not implementation |
| **@testing-library/dom** | DOM assertions |
| **jsdom** | Browser environment simulation |

---

## Running Tests

```bash
# Run all tests
pnpm --filter @workspace/lifepilot run test

# Run with coverage
pnpm --filter @workspace/lifepilot run test:coverage

# Run in watch mode (development)
pnpm --filter @workspace/lifepilot run test --watch

# Run a specific file
pnpm --filter @workspace/lifepilot run test src/tests/storage.test.ts

# TypeScript check (no test run)
pnpm --filter @workspace/lifepilot run typecheck
```

---

## Test Structure

```
src/tests/
  setup.ts          — global test setup (mocks, environment)
  utils.tsx         — test utilities, render helpers, MockLifePilotDatabase
  storage.test.ts   — storageService tests (repository integration)
  hooks.test.ts     — custom hook tests
  localization.test.ts — i18n coverage tests
```

Module-specific tests live alongside the module:
```
src/modules/cockpit/
  components/
    CockpitCard.tsx
    CockpitCard.test.tsx   ← component test next to the component
  hooks/
    useCockpit.ts
    useCockpit.test.ts     ← hook test next to the hook
```

---

## Standard Test Setup

Every test file starts with:

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";

// Always mock Dexie — never use real IndexedDB in tests
vi.mock("@/storage/db", () => ({
  db: new MockLifePilotDatabase(),
}));

// Always mock i18n
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key, i18n: { language: "en" } }),
  Trans: ({ i18nKey }: { i18nKey: string }) => i18nKey,
}));
```

---

## The MockLifePilotDatabase

The Dexie mock is a **class** (not a function mock). Dexie is instantiated with `new`, so the mock must also be instantiable:

```typescript
// src/tests/utils.tsx

export class MockLifePilotDatabase {
  // Each table is an in-memory array with chainable Dexie-like API
  pilots = createMockTable<Pilot>();
  goals = createMockTable<Goal>();
  missions = createMockTable<Mission>();
  reflections = createMockTable<Reflection>();
  // ... all 30+ tables
}
```

The `createMockTable` helper returns an object with `toArray()`, `where()`, `equals()`, `get()`, `add()`, `update()`, `delete()`, `count()` — matching the Dexie Table API.

---

## Writing Component Tests

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import { GoalCard } from "./GoalCard";

describe("GoalCard", () => {
  it("displays the goal title", () => {
    const goal = { id: 1, title: "Learn to code", status: "active", ... };
    render(<GoalCard goal={goal} />);
    expect(screen.getByRole("heading", { name: /goals.title/i })).toBeInTheDocument();
  });

  it("calls onComplete when complete button is clicked", async () => {
    const onComplete = vi.fn();
    const goal = { id: 1, title: "Learn to code", status: "active", ... };
    render(<GoalCard goal={goal} onComplete={onComplete} />);
    await userEvent.click(screen.getByRole("button", { name: /goals.complete/i }));
    expect(onComplete).toHaveBeenCalledWith(1);
  });
});
```

**Rules**:
- Query by role, label, or accessible name — never by CSS class or test ID (unless absolutely necessary)
- Use `userEvent` for realistic user interactions (not `fireEvent`)
- Assert on user-visible outcomes, not internal implementation

---

## Writing Repository Tests

```typescript
import { describe, it, expect, vi } from "vitest";
import { GoalRepository } from "@/storage/repositories/GoalRepository";

vi.mock("@/storage/db", () => ({ db: new MockLifePilotDatabase() }));

describe("GoalRepository", () => {
  it("creates a goal and returns its id", async () => {
    const repo = new GoalRepository();
    const id = await repo.create({ pilotId: 1, title: "My goal", status: "active", ... });
    expect(id).toBeGreaterThan(0);
  });

  it("returns only active goals for a pilot", async () => {
    const repo = new GoalRepository();
    const active = await repo.getActiveForPilot(1);
    expect(active.every(g => g.status === "active")).toBe(true);
  });
});
```

---

## Coverage Targets

| Area | Minimum | Target |
|------|---------|--------|
| `storage/storageService.ts` | 90% | 95% |
| `storage/repositories/*` | 80% | 90% |
| `hooks/*` (global hooks) | 75% | 85% |
| `modules/*/hooks/` | 70% | 80% |
| `components/common/` | 60% | 70% |
| `core/*` (events, flags, diagnostics) | 80% | 90% |
| Overall | 70% | 80% |

---

## Test Anti-patterns

```typescript
// ✗ ANTI-PATTERN: Testing implementation, not behaviour
it("calls db.goals.where", async () => {
  await goalService.getActive(1);
  expect(db.goals.where).toHaveBeenCalled(); // WHO CARES HOW — test what it returns
});

// ✅ PATTERN: Testing behaviour
it("returns only active goals", async () => {
  const goals = await goalService.getActiveForPilot(1);
  expect(goals.every(g => g.status === "active")).toBe(true);
});

// ✗ ANTI-PATTERN: Querying by CSS class
screen.getByClassName("goal-card__title");

// ✅ PATTERN: Querying by role
screen.getByRole("heading", { level: 2 });
```
