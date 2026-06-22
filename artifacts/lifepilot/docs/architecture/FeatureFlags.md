# LifePilot — Feature Flags Guide

## Overview

Feature flags control which product features are visible and active at runtime. They allow LifePilot to ship a single codebase that serves the free tier, premium tier, school edition, and enterprise edition — with the correct features enabled for each context.

---

## Flag Categories

| Category | Examples | Default |
|----------|---------|---------|
| **Core modules** (Wave 1) | cockpit, flightPlan, flightLog, futureMe, careerExplorer, moneyQuest, lifeChoices | ✅ Enabled |
| **Premium features** (Wave 2+) | parentCompanion, premiumLearningPaths, aiCoach | ❌ Disabled |
| **Platform editions** (Wave 4+) | schoolEdition, enterpriseEdition, csrMode | ❌ Disabled |
| **Infrastructure** (Wave 2+) | cloudSync, multiTenant, contentModeration, parentalConsent | ❌ Disabled |
| **Dev/debug** | devDiagnosticsPanel, devEventLog, devSchemaInspector | ❌ Disabled |

---

## Using Feature Flags

### In TypeScript (services, hooks)

```typescript
import { featureFlags } from "@/core/featureflags";

if (featureFlags.isEnabled("aiCoach")) {
  // render AI coach UI
}

if (featureFlags.isDisabled("schoolEdition")) {
  // hide school-specific nav
}
```

### In React components

```typescript
import { featureFlags } from "@/core/featureflags";

function NavigationItem({ flag, children }) {
  if (featureFlags.isDisabled(flag)) return null;
  return <>{children}</>;
}

// Usage
<NavigationItem flag="parentCompanion">
  <ParentCompanionLink />
</NavigationItem>
```

### Recommended: useFeature hook (create in src/hooks/)

```typescript
// src/hooks/useFeature.ts
import { featureFlags } from "@/core/featureflags";
import type { FeatureFlagKey } from "@/core/featureflags";

export function useFeature(key: FeatureFlagKey): boolean {
  return featureFlags.isEnabled(key);
}
```

---

## Overriding Flags in Development

Flags can be overridden in development via `localStorage`. These overrides are **never active in production**.

```typescript
import { featureFlags } from "@/core/featureflags";

// Enable a flag
featureFlags.enable("parentCompanion");

// Disable a flag
featureFlags.disable("cockpit");

// Reset to default
featureFlags.reset("parentCompanion");

// Reset all overrides
featureFlags.resetAll();

// See all current flag values
console.table(featureFlags.getAll());
```

Or directly in the browser console during development:
```javascript
// window access (dev only) — add to main.tsx if needed
window.featureFlags = featureFlags;
window.featureFlags.enable("devDiagnosticsPanel");
```

---

## Adding a New Flag

1. Add the key to `FeatureFlagKey` union type in `src/core/featureflags/flags.ts`
2. Add a `FeatureFlagDefinition` entry in `FLAG_DEFINITIONS`
3. Use `featureFlags.isEnabled("myNewFlag")` wherever the feature is gated

```typescript
// In flags.ts
export type FeatureFlagKey =
  | "cockpit"
  // ... existing flags ...
  | "myNewFlag";         // ← add here

export const FLAG_DEFINITIONS: Record<FeatureFlagKey, FeatureFlagDefinition> = {
  // ... existing definitions ...
  myNewFlag: {
    key: "myNewFlag",
    defaultEnabled: false,
    description: "Brief description of what this enables",
    wave: 2,             // which wave this ships in
    requiresAuth: false, // does it require a logged-in user?
  },
};
```

---

## Flag Resolution Order

```
1. LocalStorage overrides (development only)
   ↓ if no override
2. Default value from FLAG_DEFINITIONS
```

In Wave 2+, a third source will be added:
```
0. Remote config (server-side flag assignments for premium/school/enterprise users)
   ↓ if no remote config
1. LocalStorage overrides (dev only)
   ↓ if no override
2. Default value
```

---

## Flags and Routing

Feature flags must gate both the route AND the navigation item. A disabled route that still appears in the nav creates a dead link.

```typescript
// In Router.tsx — gate the route
{featureFlags.isEnabled("parentCompanion") && (
  <Route path="/parent" component={ParentCompanionPage} />
)}

// In Sidebar.tsx / BottomNav.tsx — gate the nav item
{featureFlags.isEnabled("parentCompanion") && (
  <NavItem to="/parent" icon={Users} labelKey="nav.parent" />
)}
```

---

## Wave Reference

| Wave | Flags that become enabled |
|------|--------------------------|
| 0 | — (foundation only) |
| 1 | cockpit, flightPlan, flightLog, futureMe, careerExplorer, moneyQuest, lifeChoices, contentModeration, parentalConsent |
| 2 | parentCompanion, premiumLearningPaths, cloudSync |
| 3 | (identity features — TBD) |
| 4 | schoolEdition, analyticsExport |
| 5 | enterpriseEdition, csrMode, multiTenant |
| 6 | aiCoach |
