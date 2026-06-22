// ============================================================
// LIFEPILOT — COMPANION SYSTEM
// XP-002 v1.0 binding.
// "Children should feel accompanied. Never managed."
// ============================================================

export type CompanionId = "futureYou" | "tara";

export interface CompanionDefinition {
  readonly id: CompanionId;
  readonly emoji: string;
  readonly name: string;
  readonly role: string;
  readonly purpose: readonly string[];
  /** Module ids this companion appears in */
  readonly appearsIn: readonly string[];
  readonly exampleLines: readonly string[];
  readonly neverDoes: readonly string[];
  readonly personality: readonly string[];
}

// ── PRIMARY COMPANION ─────────────────────────────────────────

/** ✨ Future You — future version of the child.
 *  Brings hope, motivation, future thinking, resilience, self-belief.
 *  Appears in: Future Me, Flight Plans, Flight Logs, Life Choices. */
export const FUTURE_YOU: CompanionDefinition = {
  id: "futureYou",
  emoji: "✨",
  name: "Future You",
  role: "Future version of the child — hopeful, patient, non-judgmental",
  purpose: ["Hope", "Motivation", "Future Thinking", "Resilience", "Self-belief"],
  appearsIn: ["futureme", "flightplan", "flightlog", "lifechoices"],
  exampleLines: [
    "I remember standing where you are.",
    "What small step can we take today?",
    "What would make tomorrow easier?",
  ],
  neverDoes: [
    "Predict success",
    "Judge",
    "Criticize",
    "Create pressure",
    "Guarantee outcomes",
  ],
  personality: ["Warm", "Hopeful", "Patient", "Encouraging", "Future-oriented"],
} as const;

// ── SECONDARY COMPANION ───────────────────────────────────────

/** 🧭 Tara — adventure friend, explorer guide, discovery companion.
 *  Brings curiosity, exploration, discovery, learning.
 *  Appears in: Career Explorer, Money Quest, Life Choices. */
export const TARA: CompanionDefinition = {
  id: "tara",
  emoji: "🧭",
  name: "Tara",
  role: "Adventure friend, Explorer guide, Discovery companion",
  purpose: [
    "Curiosity",
    "Exploration",
    "Discovery",
    "Learning",
    "Career Exploration",
    "Money Decisions",
    "Life Choices",
  ],
  appearsIn: ["careerexplorer", "moneyquest", "lifechoices"],
  exampleLines: [
    "Ready for a new adventure Captain?",
    "Want to explore Technology World?",
    "Let's see where this path leads.",
  ],
  neverDoes: [],
  personality: ["Friendly", "Playful", "Encouraging", "Wise", "Supportive"],
} as const;

/** All companions indexed by id */
export const COMPANIONS: Record<CompanionId, CompanionDefinition> = {
  futureYou: FUTURE_YOU,
  tara: TARA,
} as const;

// ── COMPANION CARD TYPES ──────────────────────────────────────

/** XP-002: Preferred card formats — companions speak through cards, not forms.
 *  Always prefer these over tables, spreadsheets, or administrative UI. */
export const COMPANION_CARD_TYPES = [
  "conversation-card",
  "story-card",
  "choice-card",
  "journey-card",
  "discovery-card",
  "mission-card",
  "reflection-card",
] as const;

export type CompanionCardType = typeof COMPANION_CARD_TYPES[number];

// ── LIFEPILOT STORY ───────────────────────────────────────────

/** XP-002: The canonical narrative metaphor — every module maps to this story.
 *  Use this language in UI copy, companions, and module descriptions. */
export const LIFEPILOT_STORY = {
  childRole:      "Captain",
  lifeIs:         "The Journey",
  futureIs:       "The Horizon",
  growthIs:       "The Flight Path",
  goalsAre:       "Flight Plans",
  reflectionsAre: "Flight Logs",
  careersAre:     "Worlds to Explore",
  moneyIs:        "A Quest",
  choicesAre:     "Crossroads",
} as const;

// ── SCREEN STRUCTURE REQUIREMENTS ────────────────────────────

/** XP-002: Every major screen must contain all of these elements. */
export const SCREEN_STRUCTURE_REQUIREMENTS = [
  "companion-presence",
  "illustration",
  "journey-context",
  "primary-action",
  "exploration-opportunity",
  "progress-context",
  "emotional-context",
] as const;

export type ScreenStructureElement = typeof SCREEN_STRUCTURE_REQUIREMENTS[number];

// ── COCKPIT SECTIONS ──────────────────────────────────────────

/** XP-002 Cockpit Experience: required sections for the home screen.
 *  "Cockpit is home base. NOT dashboard." */
export const COCKPIT_SECTIONS = [
  "welcome-captain",
  "message-from-future-you",
  "todays-adventure",
  "explore-new-worlds",
  "journey-progress",
  "upcoming-milestones",
] as const;

export type CockpitSection = typeof COCKPIT_SECTIONS[number];

// ── MODULE EXPERIENCE STANDARDS ───────────────────────────────

/** XP-002: Per-module experience requirements and forbidden patterns */
export const MODULE_EXPERIENCE_STANDARDS = {
  cockpit: {
    companionId:      "futureYou" as CompanionId,
    requiredSections: COCKPIT_SECTIONS,
    visualStorytelling: true,
    forbidden: ["KPI dashboards", "admin task lists", "numeric progress percentages"],
  },
  futureme: {
    companionId:        "futureYou" as CompanionId,
    atmosphericElements: [
      "sunrise", "future-horizon", "warm-glow", "floating-messages", "journey-trail",
    ],
    emotionalGoals: ["wonder", "optimism", "hope"],
    forbidden: ["metrics", "scores", "progress percentages", "evaluation"],
  },
  careerexplorer: {
    companionId: "tara" as CompanionId,
    concept:     "Careers are worlds — children should feel they are exploring",
    forbidden:   ["database entries", "job description lists", "corporate descriptions"],
  },
  moneyquest: {
    companionId: "tara" as CompanionId,
    cardTypes:   [
      "decision-cards", "choice-paths", "story-moments",
      "exploration-routes", "trade-off-challenges",
    ],
    forbidden: ["spreadsheets", "financial dashboards", "accounting interfaces"],
  },
  flightlog: {
    companionId:    "futureYou" as CompanionId,
    emotionalGoals: ["safe", "personal", "calm", "supportive", "reflective"],
    forbidden:      ["homework feel", "assessment", "evaluation", "grading"],
  },
  lifechoices: {
    companions:     ["futureYou", "tara"] as CompanionId[],
    primaryCompanionId: "futureYou" as CompanionId,
    concept:        "Choices are Crossroads — never right/wrong, always exploration",
    forbidden:      ["right answer labels", "scoring", "moral judgment"],
  },
} as const;
