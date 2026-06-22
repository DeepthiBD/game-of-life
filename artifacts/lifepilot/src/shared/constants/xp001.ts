// ============================================================
// LIFEPILOT — XP-001 LANGUAGE SYSTEM CONSTANTS
// Canonical mapping of XP-001 language replacements.
// Used by ESLint rules and documentation tooling.
// ============================================================

/**
 * XP-001 Language System
 * Maps generic/educational terms to LifePilot adventure language.
 * Never use the "avoid" terms in JSX, copy, or i18n keys.
 */
export const XP001_LANGUAGE = {
  // Core identity
  "user":           "Pilot / Captain",
  "student":        "Pilot",
  "profile":        "Pilot Profile",
  "dashboard":      "Cockpit",

  // Content
  "goal":           "Flight Plan",
  "journal":        "Flight Log",
  "lesson":         "Mission / Adventure / Journey",
  "task":           "Mission",
  "homework":       "Challenge",
  "assessment":     "Discovery",
  "quiz":           "Challenge",

  // Progress
  "progress":       "Journey Progress",
  "score":          "Journey Points / XP",
  "level":          "Pilot Rank",
  "completed":      "Landed / Achieved / Unlocked",
  "submit":         "Launch / Land it / Send",

  // Achievements
  "achievements":   "Milestones / Growth Moments / Explorer Badges",
  "points":         "XP",
  "badge":          "Explorer Badge",

  // Notifications
  "reminder":       "Mission Alert / Journey Reminder",
  "notification":   "Mission Alert",

  // Career
  "career details": "Explore Career Path",
  "career list":    "Career Worlds",
  "job":            "Career Path",

  // Finance
  "financial literacy": "Money Quest",
} as const;

/**
 * XP-001 Emotional Goals
 * Every screen must target at least one of these.
 */
export const XP001_EMOTIONAL_GOALS = [
  "curiosity",
  "wonder",
  "hope",
  "confidence",
  "exploration",
  "achievement",
  "reflection",
  "optimism",
  "futurethinking",
] as const;

export type XP001EmotionalGoal = typeof XP001_EMOTIONAL_GOALS[number];

/**
 * XP-001 Gamification — Allowed
 */
export const GAMIFICATION_ALLOWED = [
  "milestones",
  "explorerBadges",
  "journeyProgress",
  "growthMoments",
  "adventurePaths",
  "discoveryRewards",
] as const;

/**
 * XP-001 Gamification — Prohibited
 */
export const GAMIFICATION_PROHIBITED = [
  "leaderboards",
  "rankingStudents",
  "competitivePressure",
  "infiniteStreakPressure",
  "darkPatterns",
  "manipulativeRetention",
] as const;

/**
 * XP-001 Colour palette — semantic names
 */
export const XP001_COLORS = {
  primary:    { name: "Sky Blue",       hex: "#3B9EE8" },
  secondary:  { name: "Sunrise Orange", hex: "#FF6B35" },
  accent:     { name: "Adventure Yellow", hex: "#FFD23F" },
  success:    { name: "Forest Green",   hex: "#22A06B" },
  background: { name: "Warm White",     hex: "#FAFAF8" },
} as const;

/**
 * XP-001 Module identity colours
 */
export const MODULE_COLORS = {
  cockpit:        { name: "Sky Blue",         hex: "#3B9EE8" },
  flightplan:     { name: "Compass Gold",     hex: "#F59E0B" },
  flightlog:      { name: "Twilight Purple",  hex: "#8B5CF6" },
  futureme:       { name: "Sunrise Pink",     hex: "#EC4899" },
  careerexplorer: { name: "Space Teal",       hex: "#0EA5E9" },
  moneyquest:     { name: "Treasure Gold",    hex: "#EAB308" },
  lifechoices:    { name: "Wisdom Indigo",    hex: "#6366F1" },
  pilot:          { name: "Forest Green",     hex: "#22A06B" },
} as const;

/**
 * XP-001 Career Worlds
 * Careers presented as illustrated worlds to explore, not database entries.
 */
export const CAREER_WORLDS = [
  { id: "law",             emoji: "⚖️", label: "Law World" },
  { id: "space",           emoji: "🚀", label: "Space World" },
  { id: "health",          emoji: "🏥", label: "Health World" },
  { id: "technology",      emoji: "💻", label: "Technology World" },
  { id: "design",          emoji: "🎨", label: "Design World" },
  { id: "entrepreneurship",emoji: "📈", label: "Entrepreneurship World" },
  { id: "education",       emoji: "📚", label: "Education World" },
  { id: "environment",     emoji: "🌿", label: "Environment World" },
  { id: "sports",          emoji: "🏆", label: "Sports World" },
  { id: "arts",            emoji: "🎭", label: "Arts World" },
  { id: "agriculture",     emoji: "🌾", label: "Agriculture World" },
  { id: "government",      emoji: "🏛️", label: "Public Service World" },
] as const;

export type CareerWorldId = typeof CAREER_WORLDS[number]["id"];

/**
 * XP-001 Goal status labels (XP-001 language)
 */
export const GOAL_STATUS_LABELS = {
  active:    "In flight",
  completed: "Landed!",
  paused:    "On the ground",
  abandoned: "Course changed",
} as const;

/**
 * XP-001 Pilot rank names (by level band)
 */
export const PILOT_RANKS = [
  { minLevel: 1,  maxLevel: 2,  rank: "Junior Pilot"  },
  { minLevel: 3,  maxLevel: 5,  rank: "Explorer"      },
  { minLevel: 6,  maxLevel: 9,  rank: "Navigator"     },
  { minLevel: 10, maxLevel: 14, rank: "Captain"       },
  { minLevel: 15, maxLevel: Infinity, rank: "Ace Pilot" },
] as const;

export function getPilotRank(level: number): string {
  return PILOT_RANKS.find(r => level >= r.minLevel && level <= r.maxLevel)?.rank ?? "Junior Pilot";
}

/**
 * XP-001 Cockpit Quick Actions
 */
export const COCKPIT_ACTIONS = [
  { id: "log-moment",      label: "Log a moment",      icon: "BookOpen",   module: "flightlog"      },
  { id: "set-flightplan",  label: "Set a flight plan",  icon: "Map",        module: "flightplan"     },
  { id: "write-future",    label: "Write to Future You",icon: "Star",       module: "futureme"       },
  { id: "explore-career",  label: "Explore a career",   icon: "Telescope",  module: "careerexplorer" },
  { id: "start-quest",     label: "Start a quest",      icon: "CircleDollarSign", module: "moneyquest" },
] as const;

/**
 * XP-001 Flight Log Prompts
 * Rotated daily — conversational, not prescriptive.
 */
export const FLIGHT_LOG_PROMPTS = [
  "What surprised you today?",
  "What made you smile today?",
  "What would Future You thank you for?",
  "What challenge helped you grow?",
  "What did you discover today?",
  "What are you looking forward to tomorrow?",
  "What are you proud of today?",
  "How did you show kindness today?",
  "What is one thing you learned today?",
  "What would you do differently tomorrow?",
  "What made today worth remembering?",
  "Who inspired you today?",
] as const;

export type FlightLogPrompt = typeof FLIGHT_LOG_PROMPTS[number];

/**
 * XP-001 Screen Acceptance Gate
 * 12 criteria. All must pass. If any fail → redesign.
 */
export const XP001_SCREEN_GATES = [
  { id: 1,  criterion: "Child is the hero"                       },
  { id: 2,  criterion: "Visual-first design"                     },
  { id: 3,  criterion: "Minimal text"                            },
  { id: 4,  criterion: "Feels like exploration"                  },
  { id: 5,  criterion: "Encouraging language"                    },
  { id: 6,  criterion: "Future-oriented"                         },
  { id: 7,  criterion: "No school appearance"                    },
  { id: 8,  criterion: "No ERP appearance"                       },
  { id: 9,  criterion: "No corporate dashboard appearance"       },
  { id: 10, criterion: "Mobile-first"                            },
  { id: 11, criterion: "Parent-safe"                             },
  { id: 12, criterion: "School-acceptable"                       },
] as const;
