// ============================================================
// LIFEPILOT — FEATURE FLAG DEFINITIONS
// Source of truth for all feature flags and their default values.
// ============================================================

export type FeatureFlagKey =
  // Core modules — enabled in all editions
  | "cockpit"
  | "flightPlan"
  | "flightLog"
  | "futureMe"
  | "careerExplorer"
  | "moneyQuest"
  | "lifeChoices"
  // Premium features — disabled until Wave 2+
  | "parentCompanion"
  | "schoolEdition"
  | "enterpriseEdition"
  | "csrMode"
  | "premiumLearningPaths"
  | "aiCoach"
  // Infrastructure flags — Wave 2+
  | "cloudSync"
  | "multiTenant"
  | "analyticsExport"
  | "contentModeration"
  | "parentalConsent"
  // DX / debug flags — development only
  | "devDiagnosticsPanel"
  | "devEventLog"
  | "devSchemaInspector";

export interface FeatureFlagDefinition {
  key: FeatureFlagKey;
  defaultEnabled: boolean;
  description: string;
  wave: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  requiresAuth: boolean;
}

export const FLAG_DEFINITIONS: Record<FeatureFlagKey, FeatureFlagDefinition> = {
  // Core modules — Wave 1
  cockpit: {
    key: "cockpit",
    defaultEnabled: true,
    description: "Mission control dashboard — home screen",
    wave: 1,
    requiresAuth: false,
  },
  flightPlan: {
    key: "flightPlan",
    defaultEnabled: true,
    description: "Goals and milestones planning module",
    wave: 1,
    requiresAuth: false,
  },
  flightLog: {
    key: "flightLog",
    defaultEnabled: true,
    description: "Daily reflection journal module",
    wave: 1,
    requiresAuth: false,
  },
  futureMe: {
    key: "futureMe",
    defaultEnabled: true,
    description: "Future self letters and vision module",
    wave: 1,
    requiresAuth: false,
  },
  careerExplorer: {
    key: "careerExplorer",
    defaultEnabled: true,
    description: "Career discovery and roadmap module",
    wave: 1,
    requiresAuth: false,
  },
  moneyQuest: {
    key: "moneyQuest",
    defaultEnabled: true,
    description: "Financial literacy and money skills module",
    wave: 1,
    requiresAuth: false,
  },
  lifeChoices: {
    key: "lifeChoices",
    defaultEnabled: true,
    description: "Values, decisions, and life choices module",
    wave: 1,
    requiresAuth: false,
  },

  // Premium — Wave 2+
  parentCompanion: {
    key: "parentCompanion",
    defaultEnabled: false,
    description: "Parent dashboard and companion app",
    wave: 2,
    requiresAuth: true,
  },
  schoolEdition: {
    key: "schoolEdition",
    defaultEnabled: false,
    description: "School edition with teacher and admin dashboards",
    wave: 4,
    requiresAuth: true,
  },
  enterpriseEdition: {
    key: "enterpriseEdition",
    defaultEnabled: false,
    description: "Enterprise / CSR multi-tenant edition",
    wave: 5,
    requiresAuth: true,
  },
  csrMode: {
    key: "csrMode",
    defaultEnabled: false,
    description: "CSR branding and reporting mode",
    wave: 5,
    requiresAuth: true,
  },
  premiumLearningPaths: {
    key: "premiumLearningPaths",
    defaultEnabled: false,
    description: "Curated premium learning path packs",
    wave: 2,
    requiresAuth: true,
  },
  aiCoach: {
    key: "aiCoach",
    defaultEnabled: false,
    description: "AI-powered coaching and personalisation",
    wave: 6,
    requiresAuth: true,
  },

  // Infrastructure
  cloudSync: {
    key: "cloudSync",
    defaultEnabled: false,
    description: "Background sync to cloud storage",
    wave: 2,
    requiresAuth: true,
  },
  multiTenant: {
    key: "multiTenant",
    defaultEnabled: false,
    description: "Multi-tenant data isolation",
    wave: 5,
    requiresAuth: true,
  },
  analyticsExport: {
    key: "analyticsExport",
    defaultEnabled: false,
    description: "First-party analytics export for school/enterprise",
    wave: 4,
    requiresAuth: true,
  },
  contentModeration: {
    key: "contentModeration",
    defaultEnabled: false,
    description: "Automated content safety scanning for journal entries",
    wave: 1,
    requiresAuth: false,
  },
  parentalConsent: {
    key: "parentalConsent",
    defaultEnabled: false,
    description: "DPDP-compliant parental consent flow",
    wave: 1,
    requiresAuth: false,
  },

  // Dev flags
  devDiagnosticsPanel: {
    key: "devDiagnosticsPanel",
    defaultEnabled: false,
    description: "In-app diagnostics overlay (dev only)",
    wave: 0,
    requiresAuth: false,
  },
  devEventLog: {
    key: "devEventLog",
    defaultEnabled: false,
    description: "In-app event bus log viewer (dev only)",
    wave: 0,
    requiresAuth: false,
  },
  devSchemaInspector: {
    key: "devSchemaInspector",
    defaultEnabled: false,
    description: "Dexie schema inspector panel (dev only)",
    wave: 0,
    requiresAuth: false,
  },
};
