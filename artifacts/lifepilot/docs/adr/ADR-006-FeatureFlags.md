# ADR-006 — Feature Flag Architecture

**Status**: Accepted  
**Date**: June 2026  
**Deciders**: Engineering Lead, Product Lead, Architecture Review Board  
**Wave**: 0 (Foundation)

---

## Context

LifePilot will evolve across 6 implementation waves, serving 4 distinct tiers (free, premium, school, enterprise) in a single deployable PWA. Features must be gated based on:
1. **Wave readiness**: A feature built in Wave 1 but not complete is hidden
2. **Edition**: School edition features are invisible to free-tier users
3. **Rollout**: New features are enabled gradually (canary → all users)
4. **Development**: Debug and diagnostic features only in development builds

Without a principled feature flag system, this leads to scattered `if (import.meta.env.MODE === "school")` checks, hard-to-remove dead code, and impossible-to-test flag combinations.

---

## Decision

LifePilot uses a **first-party, offline-safe feature flag service** (`src/core/featureflags/`) with the following properties:
- All flags and their defaults are declared statically in `flags.ts`
- Flags are resolved at runtime (not build time) — one bundle serves all editions
- In development, flags can be overridden via localStorage
- In Wave 2+, flag values will be resolved from server-side config for premium/school/enterprise users
- No external feature flag service (LaunchDarkly, Unleash, etc.) in Wave 1

---

## Flag Resolution Order (Wave 1)

```
1. localStorage override (DEV only)
2. Default from FLAG_DEFINITIONS
```

## Flag Resolution Order (Wave 2+)

```
1. localStorage override (DEV only)
2. Server-side assignment (for authenticated premium/school/enterprise users)
3. Default from FLAG_DEFINITIONS
```

---

## Rationale

**Why not build-time flags**:
- LifePilot ships a single PWA bundle — it cannot ship different builds per edition
- Build-time flags require separate CI pipelines per edition (free, school, enterprise) — not viable at current scale
- Runtime flags allow QA to test any flag combination without a new build

**Why not an external service (LaunchDarkly, etc.) in Wave 1**:
- External feature flag services require network access — incompatible with offline-first
- DPDP compliance is unclear for sending feature flag requests to external services with child users
- Wave 1 flag requirements are simple enough for a first-party implementation
- Cost avoidance at early stage

**Why flags, not environment variables**:
- Environment variables are baked into the bundle at build time
- Flags can change per-session, per-user, per-edition without a rebuild

---

## Naming Conventions

- Flag keys are `camelCase` TypeScript string literals
- Flag keys match the feature or module they control: `cockpit`, `parentCompanion`, `aiCoach`
- Dev/debug flags are prefixed with `dev`: `devDiagnosticsPanel`, `devEventLog`

---

## What Flags Gate

1. **Routes**: Flagged routes are not registered with the router when the flag is off
2. **Navigation items**: Flagged nav items are hidden when the flag is off
3. **UI sections**: Flagged sections conditionally render
4. **Service behaviour**: Flagged services are no-ops when the flag is off

**Rule**: If a feature is flagged, ALL of its entry points must be flagged. A disabled route that is still linked in the nav is a bug.

---

## Consequences

**Positive**:
- One bundle serves all editions — simplified CI/CD
- QA can test any feature combination without a build
- Clean separation between "code is written" and "feature is available to users"
- Safe progressive rollout for new features

**Negative**:
- Flags must be kept in sync across `flags.ts`, router, and navigation — requires discipline
- Stale flags (features that are fully rolled out but still behind a flag) accumulate tech debt
- `FLAG_DEFINITIONS` grows over time — requires periodic pruning

**Mitigations**:
- `pnpm pilot check flags` validates flag consistency between `flags.ts`, `Router.tsx`, and navigation components
- Flag definition includes a `wave` field — flags from completed waves are candidates for removal
- Quarterly flag audit as part of EEB review

---

## Review

Next review: Wave 2. The server-side flag resolution will be documented as an extension to this ADR.
