# ADR-002 — Offline-First Architecture

**Status**: Accepted  
**Date**: June 2026  
**Deciders**: Engineering Lead, Architecture Review Board  
**Wave**: 0 (Foundation)

---

## Context

LifePilot targets children and teenagers across India, including those in areas with unreliable internet connectivity. Children use the app in schools, homes, and during travel — environments where network access is not guaranteed.

Two architecture options were considered:
1. **Online-first with offline fallback**: Primary persistence is a cloud database; IndexedDB is a cache
2. **Offline-first with future sync**: Primary persistence is IndexedDB; cloud sync is additive

---

## Decision

LifePilot is **offline-first**. All data lives in IndexedDB. The app is fully functional without any network connection. Cloud sync is a Wave 2 additive feature — it enhances the experience, it does not enable it.

---

## Rationale

**The Indian connectivity reality**:
- As of 2024, 35% of Indian internet users experience interruptions daily
- School networks are frequently throttled or blocked
- Rural broadband penetration is < 20% in many target states
- Mobile data is used carefully — many users are on prepaid limited plans

**For a life skills platform specifically**:
- A child journaling at 10 PM should not lose their reflection because WiFi dropped
- A goal that takes 3 months to achieve cannot depend on cloud writes for persistence
- Emotional content (future letters, reflection entries) must be safe on-device

**What offline-first means for LifePilot**:
- Every read is from IndexedDB — always instantaneous, always available
- Every write goes to IndexedDB — never blocked by network
- The PWA Service Worker caches all static assets — the app loads even with no network
- Wave 2 cloud sync will be additive: it copies data up to the cloud, but the local copy is always the source of truth

---

## Implementation

| Layer | Offline solution |
|-------|-----------------|
| App shell | Service Worker (Workbox) caches HTML, CSS, JS, fonts, icons |
| Data | Dexie.js (IndexedDB) — all domain data |
| Media assets | Workbox cache-first for images; offline fallback for uncached media |
| API (Wave 2+) | Background sync queue — writes buffer locally, sync when online |

---

## Consequences

**Positive**:
- 100% functionality without network — the app works everywhere
- Instant data reads (no network latency)
- Better privacy — data stays on device in Wave 1
- Lower operational cost in Wave 1 (no backend required)
- Simpler mental model for the user — "your data is yours, on your device"

**Negative**:
- Cross-device sync requires Wave 2 investment
- Data is lost if the user clears browser storage — must educate users about this
- Schema migrations on a distributed IndexedDB fleet are permanent — migrations must be additive

**Mitigations**:
- Export/backup feature in Wave 1 (export data as JSON)
- Clear user education: "Your data is stored on this device"
- Migration framework (Dexie versioned stores) ensures safe schema evolution

---

## Review

Next review: Wave 2 planning. At that point, the cloud sync architecture will be documented in a separate ADR (ADR-008).
