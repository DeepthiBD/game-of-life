# LifePilot — Repository Pattern Guide

## What is the Repository Pattern?

The Repository pattern sits between the domain model and the database. It provides a collection-like interface to domain entities, hiding all Dexie-specific code from the rest of the application.

**Why**: Without repositories, components and services couple directly to Dexie — making testing harder, code noisier, and future database migrations painful. With repositories, the database engine is swappable; only the repositories change.

---

## Architecture

```
Component / Hook
       │
       ▼
storageService.ts   ← orchestrates, emits events, enforces validation
       │
       ▼
Repository          ← typed CRUD operations over one or more Dexie tables
       │
       ▼
db.ts (Dexie)       ← raw database access — never called outside repositories
```

---

## Using a Repository

### Direct repository access (in tests or service layer only)

```typescript
import { goalRepository } from "@/storage/repositories";

// Read
const goals = await goalRepository.getAllForPilot(pilotId);
const goal  = await goalRepository.getById(42);

// Write
const newId = await goalRepository.create({ pilotId, title: "Learn to code", ... });
await goalRepository.update(42, { status: "completed" });
await goalRepository.delete(42);

// Queries
const active    = await goalRepository.getActiveForPilot(pilotId);
const financial = await goalRepository.getByCategory(pilotId, "financial");
```

### Via hooks in components (preferred in UI code)

```typescript
// Don't call repositories directly from components.
// Use the hook layer instead:
const { goals, createGoal, updateGoal } = useGoals(pilotId);
```

---

## Base Classes

### `BaseRepository<T>` — for entities without a `pilotId`

Use for catalogue entities shared across all pilots (career paths, content items, financial concepts).

```typescript
export class CareerPathRepository extends BaseRepository<CareerPath> {
  protected readonly tableName = "careerPaths";
  protected get table() { return db.careerPaths; }

  // Add domain-specific queries here
  async getByCategory(category: string): Promise<CareerPath[]> { ... }
}
```

### `BasePilotScopedRepository<T>` — for entities owned by a pilot

Use for anything with a `pilotId` field. Extends `BaseRepository` with:
- `getAllForPilot(pilotId)`
- `countForPilot(pilotId)`
- `deleteAllForPilot(pilotId)`

```typescript
export class GoalRepository extends BasePilotScopedRepository<Goal> {
  protected readonly tableName = "goals";
  protected get table() { return db.goals; }
}
```

---

## Repository Contract (`IRepository<T>`)

Every repository implements:

| Method | Signature | Notes |
|--------|-----------|-------|
| `getById` | `(id) → T \| undefined` | Returns undefined, never throws for not-found |
| `getAll` | `() → T[]` | All records — use with care on large tables |
| `create` | `(entity) → id` | Omit `id` — auto-assigned by Dexie |
| `update` | `(id, Partial<T>) → void` | Partial updates only — unchanged fields preserved |
| `delete` | `(id) → void` | Hard delete — use soft-delete pattern where needed |
| `count` | `() → number` | Efficient count without loading all rows |
| `exists` | `(id) → boolean` | Existence check |
| `findWhere` | `(predicate) → T[]` | In-memory filter — for simple cases only |

---

## Writing a New Repository

1. Create `src/storage/repositories/MyEntityRepository.ts`
2. Extend `BaseRepository` or `BasePilotScopedRepository`
3. Declare `tableName` and `get table()`
4. Add domain-specific query methods
5. Export a singleton instance
6. Add the export to `src/storage/repositories/index.ts`

```typescript
// src/storage/repositories/MyEntityRepository.ts
import { db } from "@/storage/db";
import type { MyEntity } from "@/types";
import { BasePilotScopedRepository } from "./base/BaseRepository";

export class MyEntityRepository extends BasePilotScopedRepository<MyEntity> {
  protected readonly tableName = "myEntities";
  protected get table() { return db.myEntities; }

  async getByStatus(pilotId: number, status: string): Promise<MyEntity[]> {
    return db.myEntities.where("pilotId").equals(pilotId)
      .filter(e => e.status === status).toArray();
  }
}

export const myEntityRepository = new MyEntityRepository();
```

---

## Error Handling

All base repository methods catch errors, log them via `diagnostics.repositoryError()`, and re-throw. This means:
- Diagnostics always has a record of what failed
- Callers (services, hooks) can catch and handle errors contextually
- Never swallow errors silently

```typescript
// In a service or hook — catch at the appropriate level
try {
  const goals = await goalRepository.getAllForPilot(pilotId);
} catch (err) {
  // Show user-friendly error; the diagnostics buffer already has the detail
  setError("Failed to load goals. Please try again.");
}
```

---

## Testing Repositories

Repositories are tested with a class-based Dexie mock. Never use real IndexedDB in tests.

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { GoalRepository } from "@/storage/repositories/GoalRepository";

vi.mock("@/storage/db", () => ({
  db: new MockLifePilotDatabase(), // class-based mock
}));

describe("GoalRepository", () => {
  it("returns active goals for pilot", async () => {
    const repo = new GoalRepository();
    const goals = await repo.getActiveForPilot(1);
    expect(goals).toBeDefined();
  });
});
```

See `src/tests/utils.tsx` for the `MockLifePilotDatabase` class.

---

## Available Repositories

| Repository | Entity | Scope |
|-----------|--------|-------|
| `pilotRepository` | `Pilot` | — |
| `goalRepository` | `Goal`, `GoalMilestone` | Pilot |
| `missionRepository` | `Mission`, `MissionStep` | Pilot |
| `reflectionRepository` | `Reflection`, `ReflectionPrompt` | Pilot |
| `futureLetterRepository` | `FutureLetter` | Pilot |
| `careerPathRepository` | `CareerPath` | — (catalogue) |
| `careerRoadmapRepository` | `CareerRoadmap`, `CareerRoadmapStep` | Pilot |
| `financialConceptRepository` | `FinancialConcept` | — (catalogue) |
| `savingsGoalRepository` | `SavingsGoal` | Pilot |
| `transactionRepository` | `Transaction` | Pilot |
| `notificationRepository` | `Notification` | Pilot |
| `activityEventRepository` | `ActivityEvent` | Pilot |
| `habitRepository` | `Habit`, `HabitEntry` | Pilot |
| `contentRepository` | `ContentItem` | — (catalogue) |
| `learningPathRepository` | `LearningPath`, `LearningPathLesson` | — (catalogue) |
