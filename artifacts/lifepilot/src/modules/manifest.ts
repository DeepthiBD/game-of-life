// ============================================================
// LIFEPILOT — MODULE MANIFEST
// Single source of truth for all module metadata.
// Hex colours are XP-002 identity colours — never change without
// updating index.css CSS vars and GovernanceIndex simultaneously.
// ============================================================

import type { FeatureFlagKey } from "@/core/featureflags/featureFlags";
import type { CompanionId } from "@/shared/constants/companions";

export type ModuleWave = 1 | 2 | 3 | 4 | 5 | 6;

export type ModuleEdition = "core" | "premium" | "parent" | "school" | "enterprise" | "ai";

export interface ModuleManifest {
  readonly id: string;
  readonly nameKey: string;
  readonly descriptionKey: string;
  readonly icon: string;
  /** XP-002 hex identity colour — used for CSS vars and inline gradients */
  readonly hex: string;
  readonly path: string;
  readonly featureFlagKey: FeatureFlagKey;
  readonly wave: ModuleWave;
  readonly edition: ModuleEdition;
  /** XP-002 companion assigned to this module. Undefined = no primary companion. */
  readonly companionId?: CompanionId;
}

// ── Wave 1 — Core modules ─────────────────────────────────────

export const COCKPIT_MANIFEST: ModuleManifest = {
  id:             "cockpit",
  nameKey:        "modules.cockpit.name",
  descriptionKey: "modules.cockpit.description",
  icon:           "✈️",
  hex:            "#3B9EE8",
  path:           "/cockpit",
  featureFlagKey: "cockpit",
  wave:           1,
  edition:        "core",
  companionId:    "futureYou",
} as const;

export const PILOT_MANIFEST: ModuleManifest = {
  id:             "pilot",
  nameKey:        "modules.pilot.name",
  descriptionKey: "modules.pilot.description",
  icon:           "👤",
  hex:            "#22A06B",
  path:           "/pilot",
  featureFlagKey: "cockpit", // pilot shares core flag; gets own flag in Wave 2
  wave:           1,
  edition:        "core",
} as const;

export const FLIGHT_PLAN_MANIFEST: ModuleManifest = {
  id:             "flightplan",
  nameKey:        "modules.flightPlan.name",
  descriptionKey: "modules.flightPlan.description",
  icon:           "🗺️",
  hex:            "#F59E0B",
  path:           "/flight-plan",
  featureFlagKey: "flightPlan",
  wave:           1,
  edition:        "core",
  companionId:    "futureYou",
} as const;

export const FLIGHT_LOG_MANIFEST: ModuleManifest = {
  id:             "flightlog",
  nameKey:        "modules.flightLog.name",
  descriptionKey: "modules.flightLog.description",
  icon:           "📔",
  hex:            "#8B5CF6",
  path:           "/flight-log",
  featureFlagKey: "flightLog",
  wave:           1,
  edition:        "core",
  companionId:    "futureYou",
} as const;

export const FUTURE_ME_MANIFEST: ModuleManifest = {
  id:             "futureme",
  nameKey:        "modules.futureMe.name",
  descriptionKey: "modules.futureMe.description",
  icon:           "🌟",
  hex:            "#EC4899",
  path:           "/future-me",
  featureFlagKey: "futureMe",
  wave:           1,
  edition:        "core",
  companionId:    "futureYou",
} as const;

export const MONEY_QUEST_MANIFEST: ModuleManifest = {
  id:             "moneyquest",
  nameKey:        "modules.moneyQuest.name",
  descriptionKey: "modules.moneyQuest.description",
  icon:           "💰",
  hex:            "#EAB308",
  path:           "/money-quest",
  featureFlagKey: "moneyQuest",
  wave:           1,
  edition:        "core",
  companionId:    "tara",
} as const;

export const CAREER_EXPLORER_MANIFEST: ModuleManifest = {
  id:             "careerexplorer",
  nameKey:        "modules.careerExplorer.name",
  descriptionKey: "modules.careerExplorer.description",
  icon:           "🔭",
  hex:            "#0EA5E9",
  path:           "/career-explorer",
  featureFlagKey: "careerExplorer",
  wave:           1,
  edition:        "core",
  companionId:    "tara",
} as const;

export const LIFE_CHOICES_MANIFEST: ModuleManifest = {
  id:             "lifechoices",
  nameKey:        "modules.lifeChoices.name",
  descriptionKey: "modules.lifeChoices.description",
  icon:           "⚖️",
  hex:            "#6366F1",
  path:           "/life-choices",
  featureFlagKey: "lifeChoices",
  wave:           1,
  edition:        "core",
  companionId:    "futureYou",
} as const;

// ── Ordered list — rendering order matches navigation order ───

export const CORE_MODULES: readonly ModuleManifest[] = [
  COCKPIT_MANIFEST,
  PILOT_MANIFEST,
  FLIGHT_PLAN_MANIFEST,
  FLIGHT_LOG_MANIFEST,
  MONEY_QUEST_MANIFEST,
  LIFE_CHOICES_MANIFEST,
  CAREER_EXPLORER_MANIFEST,
  FUTURE_ME_MANIFEST,
] as const;

// ── Future module stubs (Wave 3+) ─────────────────────────────
// These are placeholders — not yet implemented.
// Feature flags are already defined in flags.ts.

export const FUTURE_MODULE_STUBS: ReadonlyArray<{
  edition: ModuleEdition;
  wave: ModuleWave;
  description: string;
}> = [
  { edition: "parent",     wave: 3, description: "Parent companion, family goals, copilot view" },
  { edition: "premium",    wave: 4, description: "Premium learning paths, advanced career roadmaps" },
  { edition: "school",     wave: 5, description: "School cohorts, facilitator tools, NEP reporting" },
  { edition: "enterprise", wave: 6, description: "Enterprise/CSR, multi-tenant, analytics export" },
  { edition: "ai",         wave: 6, description: "AI Coach — XP-004 compliant encourage/clarify/guide only" },
] as const;

// ── Utility helpers ───────────────────────────────────────────

export function getManifestById(id: string): ModuleManifest | undefined {
  return CORE_MODULES.find((m) => m.id === id);
}

export function getManifestByPath(path: string): ModuleManifest | undefined {
  return CORE_MODULES.find((m) => m.path === path);
}

/** Returns hex colour for a module id, falling back to brand primary */
export function getModuleHex(id: string): string {
  return getManifestById(id)?.hex ?? "#3B9EE8";
}
