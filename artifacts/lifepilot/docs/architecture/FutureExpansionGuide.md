# LifePilot — Future Expansion Guide

## Overview

LifePilot is designed for 10+ years of evolution across 6 implementation waves. This document describes the expansion strategy for each wave, the architectural patterns that enable it, and the decision points that will need new ADRs.

---

## Wave Roadmap

### Wave 0 — Foundation (COMPLETE)
**Theme**: Domain model and infrastructure  
**Delivered**: 232 entities, 124 enums, Dexie schema v11, i18n with 10 languages, app shell, routing, repository pattern, event bus, feature flags, diagnostics

### Wave 1 — MVP (Current)
**Theme**: Build all 8 core product modules  
**Deliverables**:
- Cockpit (home dashboard)
- Flight Plan (goals + milestones)
- Flight Log (reflection journal)
- Future Me (future self letters)
- Career Explorer (career discovery + roadmap)
- MoneyQuest (financial literacy)
- Life Choices (values + decisions)
- My Profile (Pilot profile)
- DPDP parental consent flow
- Content moderation (first-party, offline)
- PWA installability + offline caching
- Data export (JSON backup)
- Onboarding flow

### Wave 2 — Server + Premium
**Theme**: Backend, cloud sync, premium tier  
**Architecture additions needed**:
- REST API (`artifacts/api-server/`) — Express + Drizzle + PostgreSQL
- Cloud sync engine (offline-first sync queue → API)
- Authentication system (email + OTP, no passwords)
- Premium tier billing (Stripe or Razorpay)
- Parent Companion app (companion view, parent dashboard)
- Premium learning paths (curated content packs)
- Push notifications (service worker push)
- Repository pattern extension (cloud-backed repositories)

**New ADRs required**:
- ADR-008: Cloud Sync Architecture
- ADR-009: Authentication Strategy
- ADR-010: API Design

### Wave 3 — Career + Identity
**Theme**: Deep career intelligence and identity  
**Architecture additions**:
- Decision Intelligence engine (scenario simulation, consequence modelling)
- Advanced identity system (life chapters, core values evolution, future identity)
- Career deep-dive (informational interviews, job shadow tracking)
- Community layer (peer accountability, cohort challenges — privacy-first)
- Semantic content tagging (knowledge graph)

**New ADRs required**:
- ADR-011: Content Knowledge Graph
- ADR-012: Community Safety and Moderation

### Wave 4 — School Edition
**Theme**: Institutional deployment  
**Architecture additions**:
- Multi-class data isolation (school → class → student hierarchy)
- Teacher dashboard (progress overview, assignment creation)
- School admin dashboard (institution management, licence control)
- SCORM/LRS integration (connect to existing school LMS)
- Curriculum module (align LifePilot content to CBSE/ICSE curricula)
- Cohort analytics (aggregate insights, no individual PII)
- School content management system

**New ADRs required**:
- ADR-013: Multi-Tenant School Architecture
- ADR-014: LRS/SCORM Integration

### Wave 5 — Enterprise + CSR
**Theme**: Corporate social responsibility and enterprise  
**Architecture additions**:
- Enterprise tenant management (org-level configuration)
- CSR branding and whitelabelling
- Reporting for CSR impact measurement
- HRMS integration (for employee children programmes)
- Enterprise SSO (SAML, OIDC)
- Seat management + licence audit

**New ADRs required**:
- ADR-015: Enterprise Multi-Tenancy
- ADR-016: Enterprise SSO

### Wave 6 — Marketplace + AI
**Theme**: AI coaching and content marketplace  
**Architecture additions**:
- AI Coach (personalised recommendations, adaptive content, conversational coaching)
- Content marketplace (third-party educator content packs)
- AI safety review (content moderation for AI-generated responses, child safety)
- Personalisation engine (learning style detection, path optimisation)
- Revenue sharing for marketplace creators

**New ADRs required**:
- ADR-017: AI Coach Safety Architecture
- ADR-018: Content Marketplace

---

## Extensibility Patterns Built Into Wave 0

### 1. Feature Flags
Any new feature is introduced behind a feature flag. The `FeatureFlagKey` union type in `flags.ts` is extended; new flags default to `false`. No existing code changes.

### 2. Repository Pattern
New Dexie tables get a new repository class extending `BaseRepository` or `BasePilotScopedRepository`. No changes to existing repositories.

### 3. Schema Versioning
New tables are added in a new `version(N+1).stores()` block. Existing tables use `.stores({...existing...}, newTable: "++id, ...")`. Dexie migrates automatically.

### 4. Module Isolation
New product modules are added as new directories under `src/modules/`. Existing modules are never modified. The new module's page is registered in `App.tsx` behind a feature flag.

### 5. Event Bus
New domain events are added to `LifePilotEventType` and `events.ts`. Existing handlers are never modified. New handlers subscribe independently.

### 6. i18n
New modules add keys to all 10 locale JSON files. Existing keys are never renamed (would break localisation for all existing users).

---

## EARB Conditions Before Wave Launch

Before each wave, the EARB requires:

| Condition | Wave 1 | Wave 2+ |
|-----------|--------|---------|
| DPDP parental consent flow | ✅ Required | ✅ Maintained |
| Content moderation for free text | ✅ Required | ✅ Extended |
| E2E tests for all critical user journeys | ✅ Required | ✅ Extended |
| Accessibility audit | ✅ Required | ✅ Re-audited |
| Security penetration test | Wave 2 (before server) | ✅ Each wave |
| Privacy impact assessment | ✅ Required | ✅ Each wave |
| Data retention policy | Wave 2 (with server) | ✅ Maintained |

---

## Technology Evolution Decisions

| Decision | Current | Wave 2+ Trigger |
|----------|---------|----------------|
| Backend framework | None (offline-only) | Wave 2: Express + Drizzle |
| Database (server) | None | Wave 2: PostgreSQL |
| Authentication | None | Wave 2: JWT + OTP |
| Payments | None | Wave 2: Razorpay (India-first) or Stripe |
| AI provider | None | Wave 6: Evaluate at time; must be child-safe |
| Feature flags | First-party | Wave 3: Evaluate GrowthBook (open source, GDPR-friendly) |
| Monitoring | First-party diagnostics | Wave 2: Evaluate Sentry (self-hosted) |
