# ADR-007 — Internal Event Architecture

**Status**: Accepted  
**Date**: June 2026  
**Deciders**: Engineering Lead, Architecture Review Board  
**Wave**: 0 (Foundation)

---

## Context

LifePilot's product modules (Cockpit, Flight Plan, Flight Log, Career Explorer, etc.) are isolated bounded contexts. They cannot import from each other's internal implementations. Yet they need to react to each other's domain events:

- When a goal is completed → Cockpit updates its progress summary
- When a mission is completed → XP is awarded → Pilot profile updates
- When a future letter is ready to open → Cockpit shows a notification
- When a habit is completed → a streak is updated → possible achievement unlocked

Without an event mechanism, modules must either:
1. Import from each other (violates bounded context isolation)
2. Use a global state manager (creates tight coupling via shared state shape)
3. Trigger cascading service calls from a single mega-service (creates a God Service)

---

## Decision

LifePilot uses a **lightweight, synchronous, in-process event bus** (`src/core/events/eventBus.ts`) for all cross-module domain event communication.

Properties:
- **Synchronous**: Events are dispatched and handled in the same call stack — no async message queues in Wave 1
- **In-process**: Events never leave the browser — no WebSockets, no server push in Wave 1
- **Type-safe**: Every event type is declared with a typed payload interface
- **Observable**: Events are logged to an in-memory ring buffer (100 events) for diagnostics
- **No external dependency**: Zero npm dependencies — a plain TypeScript class

---

## Event Types

All domain events are declared in `src/core/events/events.ts`:

| Category | Events |
|----------|--------|
| **Goals** | GoalCreated, GoalUpdated, GoalCompleted, GoalAbandoned |
| **Missions** | MissionStarted, MissionCompleted, MissionFailed |
| **Reflection** | ReflectionCreated, ReflectionUpdated |
| **Future Me** | FutureLetterCreated, FutureLetterOpened |
| **Career** | CareerExplored, CareerBookmarked |
| **Learning** | LessonStarted, LessonCompleted |
| **Habits** | HabitCompleted, HabitStreakAchieved |
| **Pilot** | PilotCreated, PilotUpdated |
| **Notifications** | NotificationDelivered, NotificationDismissed |
| **Platform** | AppInitialised, OfflineDetected, OnlineRestored, SettingsChanged |
| **Infrastructure** | StorageError, SchemaMigrated, FeatureFlagChanged |

---

## Usage Patterns

### Publishing (in service layer only)

```typescript
import { eventBus } from "@/core/events";

// After successfully completing a goal in storageService:
eventBus.publish<GoalCompletedPayload>("GoalCompleted", {
  goalId: goal.id!,
  pilotId: goal.pilotId,
  completedAt: new Date(),
});
```

### Subscribing (in hooks or module initialisation)

```typescript
import { eventBus } from "@/core/events";

// In a hook that tracks XP
useEffect(() => {
  const unsub = eventBus.subscribe("GoalCompleted", (event) => {
    const { pilotId } = event.payload;
    // Award XP to pilot
    pilotService.awardXP(pilotId, PILOT.XP_PER_GOAL);
  });
  return unsub; // Clean up on unmount
}, []);
```

### One-time handlers

```typescript
eventBus.once("SchemaMigrated", (event) => {
  diagnostics.info("migration", `Schema migrated to v${event.payload.toVersion}`);
});
```

---

## Architectural Rules

1. **Events are published ONLY from the service layer** — never from components or hooks
2. **Events are never used as a substitute for direct API calls within a module** — they are for cross-module communication only
3. **Event handlers must be idempotent where possible** — the same event may fire multiple times
4. **Handlers must not throw** — the event bus catches handler errors and logs them, but the publisher must not be affected
5. **Events flow in one direction** — an event handler must not publish another event synchronously (risk of infinite loops)

---

## Rationale

**Why synchronous (not async)**:
- Async events (setTimeout, queueMicrotask) complicate testing significantly
- The event volume in Wave 1 is low — synchronous dispatch is fast enough
- Simpler mental model: publish → handlers run → done

**Why in-process (not a message broker)**:
- Wave 1 has no backend — there is no message broker to connect to
- The offline-first constraint means no reliable connection to an external broker
- In-process is sufficient for all Wave 1 cross-module coordination

**Why not Redux/Zustand**:
- These are state managers, not event buses
- State managers couple modules that share the state shape
- The event bus decouples publisher from subscriber — the publisher doesn't know who's listening

---

## Wave 2+ Evolution

In Wave 2, the event system will be extended:
- **Persistence**: Events published to IndexedDB (`ActivityEvent` table) for audit and analytics
- **Cloud sync**: Selected domain events will be forwarded to the backend as telemetry (privacy-preserving, no PII)
- **Real-time**: Push events from server (new content, parent alerts) will be injected as events into the bus

These extensions will be documented in ADR-008 (Event System Evolution).

---

## Consequences

**Positive**:
- Modules remain isolated — no direct cross-module imports
- Cockpit can react to goal completions without knowing anything about the Flight Plan module
- XP and achievement logic can listen to events without being coupled to every action's code path
- The event log provides a debugging window into the sequence of domain events

**Negative**:
- Synchronous event dispatch means slow handlers block the publisher
- Event chains are implicit — harder to trace than direct function calls
- No ordering guarantee if multiple handlers subscribe to the same event

**Mitigations**:
- Handlers are required to be fast (< 5ms) — slow handlers go to a separate async queue (Wave 2)
- Event types and payloads are typed — accidental misuse is caught at compile time
- The in-memory event log (100 events) aids debugging

---

## Review

Next review: Wave 2. At that point, event persistence and cloud forwarding will be documented.
