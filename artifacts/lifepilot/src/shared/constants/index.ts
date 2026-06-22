// ============================================================
// LIFEPILOT — SHARED CONSTANTS
// Application-wide constants. No business logic here.
// All strings that appear in code (not UI) live here.
// ============================================================

export * from './xp001';
export * from './ethics';
export * from './trust';
export * from './copy';
export * from './psychology';
export * from './design';
export * from './companions';

// ── APP ───────────────────────────────────────────────────────

export const APP_NAME = "LifePilot";
export const APP_TAGLINE = "Navigate your life journey";
export const APP_VERSION_KEY = "lp_app_version";

// ── ROUTES ────────────────────────────────────────────────────

export const ROUTES = {
  ROOT:            "/",
  COCKPIT:         "/cockpit",
  PILOT:           "/pilot",
  FLIGHT_PLAN:     "/flight-plan",
  FLIGHT_LOG:      "/flight-log",
  FUTURE_ME:       "/future-me",
  CAREER_EXPLORER: "/career-explorer",
  MONEY_QUEST:     "/money-quest",
  LIFE_CHOICES:    "/life-choices",
  SETTINGS:        "/settings",
  NOT_FOUND:       "*",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

// ── STORAGE KEYS (localStorage / sessionStorage) ──────────────

export const STORAGE_KEYS = {
  LANGUAGE:      "lp_lang",
  THEME:         "lp_theme",
  FEATURE_FLAGS: "lp_feature_flags_override",
  ONBOARDING:    "lp_onboarding_complete",
  LAST_PILOT_ID: "lp_last_pilot_id",
} as const;

// ── DATABASE ──────────────────────────────────────────────────

export const DB_NAME = "LifePilotDB";
export const DB_SCHEMA_VERSION = 11;

// ── PILOT ─────────────────────────────────────────────────────

export const PILOT = {
  MIN_NAME_LENGTH: 1,
  MAX_NAME_LENGTH: 50,
  MIN_AGE: 8,
  MAX_AGE: 18,
  DEFAULT_XP: 0,
  XP_LEVELS: [0, 100, 250, 500, 1000, 2000, 4000, 8000, 15000, 30000],
  XP_PER_MISSION: 50,
  XP_PER_GOAL: 100,
  XP_PER_REFLECTION: 20,
  XP_PER_HABIT: 10,
  XP_PER_LETTER: 30,
} as const;

// ── CONTENT ───────────────────────────────────────────────────

export const CONTENT = {
  MAX_GOAL_TITLE_LENGTH:       100,
  MAX_GOAL_DESCRIPTION_LENGTH: 500,
  MAX_REFLECTION_LENGTH:       5000,
  MAX_FUTURE_LETTER_LENGTH:    10000,
  MAX_HABIT_NAME_LENGTH:       80,
  MAX_MILESTONE_TITLE_LENGTH:  100,
  DEFAULT_MOOD_SCALE:          10,
  MAX_TAGS_PER_ITEM:           10,
} as const;

// ── PAGINATION ────────────────────────────────────────────────

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE:     100,
  RECENT_ITEMS_LIMIT: 10,
} as const;

// ── MODULES ───────────────────────────────────────────────────

export const MODULE_IDS = {
  COCKPIT:         "cockpit",
  PILOT:           "pilot",
  FLIGHT_PLAN:     "flightplan",
  FLIGHT_LOG:      "flightlog",
  FUTURE_ME:       "futureme",
  MONEY_QUEST:     "moneyquest",
  CAREER_EXPLORER: "careerexplorer",
  LIFE_CHOICES:    "lifechoices",
} as const;

export type ModuleId = (typeof MODULE_IDS)[keyof typeof MODULE_IDS];

// ── ACCESSIBILITY ─────────────────────────────────────────────

export const A11Y = {
  MIN_TOUCH_TARGET_PX: 44,
  MIN_CONTRAST_RATIO:  4.5,
  FOCUS_RING_WIDTH:    "2px",
  FOCUS_RING_OFFSET:   "2px",
} as const;

// ── PWA ───────────────────────────────────────────────────────

export const PWA = {
  UPDATE_CHECK_INTERVAL_MS: 60 * 60 * 1000,
  CACHE_NAME_PREFIX:        "lp-cache",
  OFFLINE_FALLBACK_PATH:    "/offline.html",
} as const;

// ── LOCALIZATION ──────────────────────────────────────────────

export const SUPPORTED_LANGUAGE_CODES = [
  "en", "hi", "ta", "te", "kn", "ml", "mr", "bn", "gu", "pa",
] as const;

export const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  hi: "हिंदी",
  ta: "தமிழ்",
  te: "తెలుగు",
  kn: "ಕನ್ನಡ",
  ml: "മലയാളം",
  mr: "मराठी",
  bn: "বাংলা",
  gu: "ગુજરાતી",
  pa: "ਪੰਜਾਬੀ",
};

// ── AGE GROUPS ────────────────────────────────────────────────

export const AGE_GROUPS = {
  JUNIOR:   { label: "Junior Pilot", minAge: 8,  maxAge: 11 },
  EXPLORER: { label: "Explorer",     minAge: 12, maxAge: 14 },
  NAVIGATOR:{ label: "Navigator",    minAge: 15, maxAge: 18 },
} as const;

export function getAgeGroup(age: number): keyof typeof AGE_GROUPS | null {
  for (const [key, group] of Object.entries(AGE_GROUPS)) {
    if (age >= group.minAge && age <= group.maxAge) {
      return key as keyof typeof AGE_GROUPS;
    }
  }
  return null;
}
