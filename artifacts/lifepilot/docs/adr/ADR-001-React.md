# ADR-001 — React as the UI Framework

**Status**: Accepted  
**Date**: June 2026  
**Deciders**: Engineering Lead, Architecture Review Board  
**Wave**: 0 (Foundation)

---

## Context

LifePilot needs a UI framework for building a cross-platform PWA targeting children and teenagers in India. The app must run offline, support 10 languages, be installable, and work on low-end Android devices with limited memory.

Candidates evaluated:
1. **React** (with Vite)
2. **Vue 3** (with Vite)
3. **SvelteKit**
4. **Flutter Web**

---

## Decision

We use **React 19 with Vite 7** as the UI framework and build tool.

---

## Rationale

| Factor | React | Vue 3 | Svelte | Flutter Web |
|--------|-------|-------|--------|-------------|
| Ecosystem maturity | ★★★★★ | ★★★★ | ★★★ | ★★★ |
| Available talent in India | ★★★★★ | ★★★ | ★★ | ★★★ |
| Component library availability (shadcn/ui, Radix) | ★★★★★ | ★★★ | ★★ | ★★ |
| i18n library quality (react-i18next) | ★★★★★ | ★★★★ | ★★★ | ★★★ |
| PWA support | ★★★★ | ★★★★ | ★★★★ | ★★★ |
| Bundle size (initial) | ★★★ | ★★★★ | ★★★★★ | ★★ |
| TypeScript support | ★★★★★ | ★★★★★ | ★★★★ | ★★★★ |
| Offline-first library support (Dexie React) | ★★★★★ | ★★★ | ★★ | ★ |

**Key deciding factors**:
1. React has the deepest ecosystem for the specific libraries LifePilot needs: Dexie React hooks, react-i18next, Radix UI, framer-motion, shadcn/ui.
2. The Indian engineering talent pool strongly favours React — critical for team hiring in Waves 2–5.
3. React 19 concurrent features enable smoother UX for large lists (missions, career paths, reflection entries) without blocking the main thread.
4. Vite 7 delivers < 3s HMR and < 5-minute CI builds, directly supporting our engineering metrics targets.

**Why not Svelte**: Smaller ecosystem for the specific libraries LifePilot needs. The bundle size advantage (Svelte has no runtime) is offset by Dexie, framer-motion, and i18next — which are bundled regardless of framework.

**Why not Flutter Web**: Flutter Web's offline story, i18n ecosystem, and accessibility tools are significantly less mature. The specialised skill set is harder to hire for.

---

## Consequences

**Positive**:
- Full ecosystem access (shadcn/ui, Radix, react-i18next, dexie, framer-motion)
- Largest talent pool in India
- React 19 concurrent rendering for smooth UX
- Extensive testing tooling (Vitest + RTL)

**Negative**:
- Larger initial bundle than Svelte (~130KB gzipped for React alone)
- React's rendering model requires careful optimisation for low-end devices

**Mitigations**:
- Lazy-load all module chunks (each module is its own Rollup chunk)
- `useMemo` and `useCallback` where measured to be necessary
- Strict bundle size budget enforced in CI

---

## Review

Next review: End of Wave 1. If core module performance on low-end devices (< 2GB RAM) is unacceptable, revisit the lazy-loading strategy.
