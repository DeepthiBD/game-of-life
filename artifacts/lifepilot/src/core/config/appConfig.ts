// ============================================================
// LIFEPILOT — CENTRALISED APP CONFIGURATION
// No secrets. No API keys. No credentials.
// All values are safe for the client bundle.
// ============================================================

export const APP_CONFIG = {
  app: {
    name: "LifePilot",
    tagline: "Navigate your life journey",
    version: __APP_VERSION__,
    schemaVersion: 11,
  },

  database: {
    name: "LifePilotDB",
    schemaVersion: 11,
  },

  pwa: {
    cacheVersion: "v1",
    offlineFallback: "/offline.html",
    updateCheckIntervalMs: 60 * 60 * 1000, // 1 hour
  },

  localization: {
    defaultLanguage: "en" as const,
    supportedLanguages: ["en", "hi", "ta", "te", "kn", "ml", "mr", "bn", "gu", "pa"] as const,
    fallbackLanguage: "en" as const,
    storageSyncKey: "lp_lang",
  },

  theme: {
    defaultMode: "system" as const,
    storageSyncKey: "lp_theme",
  },

  content: {
    minAgeYears: 8,
    maxAgeYears: 18,
    defaultMoodScale: 10,
    maxGoalMilestones: 20,
    maxReflectionLength: 5000,
    maxFutureLetterLength: 10000,
  },

  pilot: {
    defaultXpPerMission: 50,
    defaultXpPerGoal: 100,
    defaultXpPerReflection: 20,
    defaultXpPerLetter: 30,
    xpLevelThresholds: [0, 100, 250, 500, 1000, 2000, 4000, 8000],
  },

  diagnostics: {
    bufferSize: 500,
    persistLogsToDb: false, // Wave 2 — enabled when AppLog table is wired up
  },

  security: {
    maxInputLength: 10000,
    allowedHtmlTags: [] as string[], // no HTML allowed in user input
    sanitizeOnWrite: true,
  },
} as const;

export type AppConfig = typeof APP_CONFIG;
