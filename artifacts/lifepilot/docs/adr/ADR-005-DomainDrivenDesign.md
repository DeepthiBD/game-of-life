# ADR-005 — Domain-Driven Design

**Status**: Accepted  
**Date**: June 2026  
**Deciders**: Engineering Lead, Architecture Review Board  
**Wave**: 0 (Foundation)

---

## Context

LifePilot has a rich, complex domain: pilots (users), goals, missions, habits, reflections, future letters, career roadmaps, financial concepts, life choices, school editions, enterprise tenants, AI coaching — 232 entities across 8 product modules and 4 platform tiers.

Without a principled approach to modelling this complexity, the codebase will collapse into an unmaintainable mixture of UI logic, database calls, and business rules. The question is: what organising principle governs the structure of the code?

---

## Decision

LifePilot is built using **Domain-Driven Design (DDD)** principles, adapted for a frontend-first, offline-first PWA context.

---

## What DDD Means for LifePilot

We adopt DDD patterns pragmatically — not dogmatically. LifePilot is a PWA, not a traditional enterprise backend. The following DDD patterns are applied:

| DDD Concept | LifePilot Implementation |
|-------------|------------------------|
| **Domain Layer** | `src/types/index.ts` — 232 entity interfaces, 124 enums. Zero imports. Zero business logic. |
| **Repository Pattern** | `src/storage/repositories/*` — all database access behind typed repository classes |
| **Service Layer** | `src/storage/storageService.ts` — orchestrates repositories, enforces validation, emits events |
| **Domain Events** | `src/core/events/` — lightweight event bus for cross-module communication |
| **Bounded Contexts** | `src/modules/*` — each product module is an isolated bounded context |
| **Ubiquitous Language** | Glossary enforced in code: Pilot (not User), Mission (not Task), Flight Plan (not Goals), etc. |
| **Value Objects** | Enumerations and types that carry meaning without identity (e.g., `GoalCategory`, `MoodLevel`) |

---

## Ubiquitous Language

The domain language is enforced in code. These are the canonical terms:

| Domain term | Meaning | Never say |
|-------------|---------|-----------|
| **Pilot** | The user — a child/teenager using LifePilot | User, Student, Kid, Child |
| **Co-Pilot** | A parent or mentor | Parent, Guardian, Teacher |
| **Mission** | A short-term challenge or task | Task, Todo, Challenge |
| **Flight Plan** | The goals and milestones module | Goals, Objectives |
| **Flight Log** | The journal/reflection module | Journal, Diary |
| **Future Me** | The future self letters module | Time capsule, Letter |
| **Cockpit** | The home/dashboard module | Dashboard, Home, Hub |
| **XP** | Experience points — the progression currency | Points, Score, Stars |

---

## Rationale

**Why DDD for a PWA**:
1. The domain is genuinely complex — 232 entities with rich relationships cannot be managed by ad-hoc file organisation
2. The bounded context model (one module = one context) maps naturally to React's lazy-loaded module chunks
3. The repository pattern is the only way to make the offline-first storage layer testable
4. Domain events decouple modules that would otherwise share state through prop drilling or global stores

**Why not Redux / Zustand / Jotai**:
- Global state management is not needed when each module manages its own state via Dexie `useLiveQuery`
- A shared state store between modules would couple the modules, violating the bounded context boundary
- Domain events provide the necessary cross-module communication channel without shared state

---

## The Domain Layer

`src/types/index.ts` is sacred. It:
- Contains ONLY interfaces, types, and enums
- Imports NOTHING
- Has NO business logic
- Is NEVER modified without an architectural discussion

Any change to `src/types/index.ts` that is not purely additive (adding new types) requires a Tier 4 ADR.

---

## Consequences

**Positive**:
- Clear, navigable structure even at 232 entities
- Testable at every layer (domain types, repositories, services, hooks, components)
- New developers can find any behaviour by knowing what layer it lives in
- Future waves (school, enterprise, AI) add new bounded contexts without touching existing ones

**Negative**:
- More files and layers than a simple CRUD approach
- Requires discipline to keep layers separate (enforced by ESLint boundaries)
- Higher initial investment in structure

**Mitigations**:
- Golden Path generators (`pnpm pilot create entity`) scaffold the boilerplate automatically
- ESLint layer boundaries prevent accidental coupling

---

## Review

Next review: Wave 2. The repository pattern will be extended with the full repository abstraction to support cloud sync backends.
