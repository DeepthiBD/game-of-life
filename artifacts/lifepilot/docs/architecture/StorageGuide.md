# LifePilot — Storage Guide

## Overview

LifePilot uses Dexie.js (IndexedDB) as its primary and only persistence store in Wave 1. All data lives on the user's device. No data is sent to any server without explicit sync (Wave 2+).

---

## Storage Architecture

```
User Action
    │
    ▼
React Component / Hook
    │  calls
    ▼
storageService.ts         ← orchestration layer
    │  calls
    ▼
Repository                ← domain-specific CRUD
    │  calls
    ▼
Dexie Table (db.ts)       ← IndexedDB tables
    │  writes to
    ▼
IndexedDB                 ← browser storage, on-device
```

---

## Database Initialisation

The database is a singleton defined in `src/storage/db.ts`:

```typescript
import { db } from "@/storage/db";
```

`db` is a `LifePilotDatabase` instance — a `Dexie` subclass. It opens and initialises automatically on first import. Schema migrations run automatically on version upgrade.

---

## Schema Versioning

Schema versions are declared in **descending order** in `db.ts` (newest first). This is a LifePilot convention to make the latest schema visually prominent:

```typescript
// db.ts — schema declared newest-first
this.version(11).stores({
  pilots: "++id, isActive",
  // ... v11 additions
});
this.version(10).stores({
  // ... v10 schema
});
// ... down to version 1
```

**Schema version is currently**: `11` (Schema v11, RP-003)

---

## Storage Limits

IndexedDB storage varies by browser and device. On most modern Android browsers:
- Chrome: ~80% of available disk space
- Firefox: Quota-based, typically several GB
- Safari: Historically 50MB, now expanded

LifePilot stores primarily text and small numbers. Even with 3 years of daily journaling, the total storage is unlikely to exceed 50MB for most users.

---

## Key Patterns

### The `isActive` Boolean Pattern

IndexedDB cannot create indexes on boolean values. LifePilot stores boolean-like fields as `0 | 1`:

```typescript
// ✅ CORRECT — index lookup on isActive
await db.pilots.where("isActive").equals(1).toArray();

// ✗ WRONG — boolean true is not the same as 1 in IDB indexes
await db.pilots.where("isActive").equals(true).toArray();
```

### Date Storage

All dates are stored as `Date` objects in TypeScript but serialised as ISO strings in IndexedDB. Always compare dates as `Date` objects:

```typescript
const isReady = new Date(letter.openOnDate) <= new Date();
```

### Compound Indexes

Some tables use compound indexes for common query patterns:

```typescript
// db.ts — compound index example
goals: "++id, pilotId, [pilotId+status], status, category"

// Repository use
db.goals.where("[pilotId+status]").equals([pilotId, "active"]).toArray();
```

---

## Migrations

Schema migrations are additive only — never rename or remove columns.

```typescript
// Safe migration — adding a new field
this.version(12).stores({
  pilots: "++id, isActive, schoolId",  // added schoolId index
}).upgrade(tx => {
  // Set default value for existing records
  return tx.table("pilots").toCollection().modify(pilot => {
    pilot.schoolId = null;
  });
});
```

---

## Data Export / Backup

Wave 1 provides a JSON export of all user data:

```typescript
// storageService.ts — planned for Wave 1
async exportAllData(pilotId: number): Promise<object> {
  const pilot = await db.pilots.get(pilotId);
  const goals = await db.goals.where("pilotId").equals(pilotId).toArray();
  // ... all tables
  return { exportedAt: new Date(), pilot, goals, ... };
}
```

Users are informed on first use that data lives on the device. The export feature lets them back up to a file.

---

## Testing

Never import real Dexie in tests. Use the class-based mock:

```typescript
vi.mock("@/storage/db", () => ({
  db: new MockLifePilotDatabase(),
}));
```

The `MockLifePilotDatabase` class is in `src/tests/utils.tsx`. It provides all tables as in-memory arrays.

---

## Storage Error Handling

All repository methods catch errors and log to `diagnostics`:

```typescript
// All errors surface via diagnostics.repositoryError()
// and are re-thrown for callers to handle contextually
```

The `StorageError` event is published to `eventBus` when a critical storage failure occurs, allowing the Cockpit to display an appropriate warning.

---

## Future: Cloud Sync (Wave 2)

In Wave 2, the storage layer will be extended with a `SyncQueue` table. Writes to IndexedDB will also write a sync record. A background service worker will drain the sync queue when online:

```
IndexedDB write → SyncQueue record created → SW detects online → API write → SyncQueue record cleared
```

This is additive — the offline-first behaviour is unchanged. The cloud copy is eventually consistent with the local copy, not the other way around.
