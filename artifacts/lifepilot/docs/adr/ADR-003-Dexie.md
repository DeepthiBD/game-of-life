# ADR-003 — Dexie.js as the Offline Storage Engine

**Status**: Accepted  
**Date**: June 2026  
**Deciders**: Engineering Lead, Architecture Review Board  
**Wave**: 0 (Foundation)

---

## Context

The offline-first architecture (ADR-002) requires an IndexedDB abstraction. Raw IndexedDB is notoriously verbose and error-prone. Several abstraction libraries were evaluated:

1. **Dexie.js** — IndexedDB wrapper with TypeScript support
2. **RxDB** — Reactive database with replication plugins
3. **PouchDB** — CouchDB-compatible local database
4. **localForage** — Simple key-value store over IndexedDB/localStorage
5. **IDB** — Thin, promise-based IndexedDB wrapper

---

## Decision

We use **Dexie.js v4** as the IndexedDB abstraction for all client-side data persistence.

---

## Rationale

| Factor | Dexie | RxDB | PouchDB | localForage | IDB |
|--------|-------|------|---------|-------------|-----|
| TypeScript support | ★★★★★ | ★★★★ | ★★★ | ★★★ | ★★★★ |
| Schema versioning | ★★★★★ | ★★★★ | ★★★ | ✗ | ★★ |
| Query API richness | ★★★★★ | ★★★★ | ★★★★ | ★ | ★★ |
| React integration | ★★★★★ | ★★★ | ★★ | ★★ | ★★ |
| Bundle size | ★★★★ (20KB) | ★★ (large) | ★★★ | ★★★★★ | ★★★★★ |
| Migration support | ★★★★★ | ★★★ | ★★★ | ✗ | ★★ |
| Future sync readiness | ★★★★ | ★★★★★ | ★★★★★ | ★ | ★★ |
| Community maturity | ★★★★★ | ★★★ | ★★★★ | ★★★ | ★★★ |

**Key deciding factors**:

1. **Versioned schema migrations**: Dexie's `version(N).stores()` API makes schema evolution safe and explicit. With 232 entities and a 10-year roadmap, safe migration is critical.

2. **TypeScript-first**: Dexie v4's `Table<T, TKey>` generic gives compile-time safety on every database access.

3. **Query richness**: Dexie's `.where()`, `.equals()`, `.anyOf()`, `.between()`, compound indexes — these are needed for the repository pattern (filtering goals by status, reflections by date range, etc.).

4. **React hooks via `useLiveQuery`**: The `dexie-react-hooks` package enables reactive queries that automatically re-render components when underlying data changes — without any Redux or external state manager.

5. **20KB gzipped**: Acceptable for the bundle budget. Alternatives like RxDB are significantly larger.

**Why not RxDB**: RxDB's bundle size (> 200KB), complex setup, and CouchDB-centric sync model are overkill for Wave 1. Its sync advantages are not needed until Wave 2.

**Why not PouchDB**: PouchDB's sync model (CouchDB replication protocol) doesn't align with the Wave 2 architecture (REST API sync). Migration would be needed.

---

## Schema Design Principles

1. **Descending version order in code** — versions are declared from newest to oldest in `db.ts`
2. **Additive migrations only** — new columns added with defaults; columns are never renamed or removed
3. **`isActive` stored as 0/1** — IndexedDB cannot index booleans; use `.equals(1)` not `.equals(true)`
4. **Dexie table fields require `!`** — `pilots!: Table<Pilot>` — the `!` is required since Dexie sets fields via internals

---

## Consequences

**Positive**:
- Type-safe database access on all 232 entity tables
- Safe schema migration framework built in
- Reactive queries with `useLiveQuery` — real-time UI updates without polling
- Rich query API supports repository pattern without raw SQL

**Negative**:
- IndexedDB storage is not encrypted at rest (Wave 2: evaluate at-rest encryption)
- Storage is cleared if the user clears browser data — the user must be informed
- Compound index support is limited vs. SQL — complex queries need application-side filtering

---

## Review

Next review: Wave 2, when cloud sync is introduced. A separate ADR will document the sync strategy.
