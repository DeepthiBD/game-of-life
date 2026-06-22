// ============================================================
// LIFEPILOT — ETHICAL GAMIFICATION CONSTANTS
// ADR-008 binding. All gamification must comply.
// "The app exists to serve the child's growth — not engagement metrics."
// ============================================================

// ── PRINCIPLES ───────────────────────────────────────────────

export const ETHICAL_PRINCIPLES = [
  { id: "no-shame",             label: "No Shame",                description: "Absence and failure are never punished — only welcomed back" },
  { id: "no-ranking",           label: "No Ranking",              description: "Children are never compared to each other" },
  { id: "no-comparison",        label: "No Comparison",           description: "Progress is measured only against the child's own past self" },
  { id: "no-dark-patterns",     label: "No Dark Patterns",        description: "No manipulative UI, false urgency, or deceptive design" },
  { id: "no-addiction-loops",   label: "No Addiction Loops",      description: "Designed for wellbeing — not maximum time-in-app" },
  { id: "no-manipulative-streaks", label: "No Manipulative Streaks", description: "Streaks celebrate — they never punish" },
  { id: "growth-mindset",       label: "Growth Mindset",          description: "Effort and progress are celebrated over outcomes and talent" },
  { id: "celebrate-effort",     label: "Celebrate Effort",        description: "Every meaningful attempt earns recognition" },
] as const;

export type EthicalPrinciple = typeof ETHICAL_PRINCIPLES[number]["id"];

// ── XP AWARD REASONS (ethical, explicitly named) ─────────────

/**
 * All XP events must use one of these reasons.
 * New reasons require ADR-008 review.
 */
export const XP_REASONS = {
  // Exploration rewards — curiosity
  MODULE_OPENED_FIRST_TIME:   { xp: 10,  category: "exploration", label: "Explored something new"           },
  CAREER_WORLD_EXPLORED:      { xp: 10,  category: "exploration", label: "Explored a Career World"          },
  LIFE_CHOICE_ATTEMPTED:      { xp: 10,  category: "exploration", label: "Tried a Life Choices scenario"    },
  MONEY_QUEST_STARTED:        { xp: 10,  category: "exploration", label: "Started a Money Quest"            },

  // Effort rewards — showing up
  REFLECTION_WRITTEN:         { xp: 15,  category: "effort",      label: "Wrote a reflection"               },
  HABIT_LOGGED:               { xp: 10,  category: "effort",      label: "Logged a habit"                   },
  GOAL_STARTED:               { xp: 10,  category: "effort",      label: "Started a flight plan"            },
  FUTURE_LETTER_SENT:         { xp: 20,  category: "effort",      label: "Wrote to Future You"              },
  MISSION_STARTED:            { xp: 10,  category: "effort",      label: "Accepted a mission"               },
  CAREER_SAVED:               { xp: 10,  category: "effort",      label: "Saved a career path"              },
  DAILY_CHECKIN:              { xp: 5,   category: "effort",      label: "Checked in today"                 },

  // Completion rewards — achievement
  MISSION_COMPLETED:          { xp: 25,  category: "completion",  label: "Mission accomplished!"            },
  GOAL_COMPLETED:             { xp: 50,  category: "completion",  label: "Flight plan landed!"              },
  HABIT_STREAK_7:             { xp: 30,  category: "completion",  label: "7-day habit journey"              },
  HABIT_STREAK_30:            { xp: 100, category: "completion",  label: "30-day habit journey"             },
  MONEY_QUEST_COMPLETED:      { xp: 30,  category: "completion",  label: "Money Quest complete!"            },
  LIFE_CHOICES_REFLECTED:     { xp: 20,  category: "completion",  label: "Life Choice reflected on"         },
  FUTURE_LETTER_READ:         { xp: 15,  category: "completion",  label: "Read a message from past you"     },
  ONBOARDING_COMPLETED:       { xp: 50,  category: "completion",  label: "Journey started!"                 },
} as const;

export type XpReason = keyof typeof XP_REASONS;
export type XpCategory = "exploration" | "effort" | "completion";

/**
 * XP ratio philosophy:
 * - effort XP ≈ 60–70% of completion XP
 * - completion matters, but effort is the core value
 */
export const XP_RATIO_PHILOSOPHY = {
  exploration: 0.4,  // 40% weight vs completion
  effort:      0.65, // 65% weight vs completion
  completion:  1.0,  // baseline
} as const;

// ── PROHIBITED XP PATTERNS ───────────────────────────────────

/**
 * These XP mechanisms are explicitly prohibited by ADR-008.
 * Do not implement.
 */
export const PROHIBITED_XP_PATTERNS = [
  "leaderboard_position_bonus",   // bonus XP for being #1
  "social_comparison_bonus",      // bonus XP for beating peers
  "streak_pressure_multiplier",   // multiplier that threatens to disappear
  "time_pressure_bonus",          // bonus XP for completing within a deadline
  "random_reward_jackpot",        // variable reward (slot machine) mechanics
] as const;

// ── STREAK ETHICS ────────────────────────────────────────────

export const STREAK_CONFIG = {
  /** Streak is weekly (active ≥1 day per week) — not daily. Less punishing. */
  granularity: "weekly" as const,

  /** Number of streak freezes per week — no guilt attached */
  freezesPerWeek: 1,

  /** Streak resets are framed as "new chapter", never as failure */
  resetFraming: "new-chapter" as const,

  /** Max notifications per day about streaks */
  maxNotificationsPerDay: 1,

  /** Notifications are opt-in, never opt-out */
  notificationsOptIn: true,

  /** Notification window: morning only (avoids bedtime pressure) */
  notificationWindow: { startHour: 7, endHour: 12 } as const,
} as const;

// ── SHAME-FREE MESSAGE TEMPLATES ─────────────────────────────

export const SHAME_FREE_MESSAGES = {
  welcomeBack: [
    "Welcome back, Captain! Your journey continues.",
    "Great to see you again! Ready to explore?",
    "You're back — and that's what matters. Let's go!",
    "Your adventure is right where you left it. ✈️",
    "Life happened — and you're here now. That counts.",
  ],

  streakCelebration: [
    "{{count}} days on your journey! ✈️",
    "You've been flying for {{count}} days! Keep it up!",
    "{{count}}-day journey — you're building something real!",
    "Look at you — {{count}} days of showing up! ✨",
  ],

  streakReset: [
    "New chapter starting. Every great pilot has pauses. 🌅",
    "Ready for a fresh start? Your journey continues now.",
    "Great pilots rest and return. Welcome back! ✈️",
  ],

  partialCompletion: [
    "{{done}} out of {{total}} this week — real progress!",
    "Every step counts. You did {{done}} this week — that's great!",
    "{{done}} steps on your journey this week. Building!",
  ],

  effortCelebration: [
    "You showed up — that's what matters most. ✨",
    "Every reflection makes you a little wiser.",
    "You took a step forward today. That counts!",
    "Effort is everything. You put in the work. 🌟",
  ],
} as const;

// ── GROWTH MINDSET LANGUAGE ───────────────────────────────────

export const GROWTH_MINDSET = {
  /** "Yet" framing — always append when expressing something not achieved */
  yetSuffix: " — yet.",

  /** Effort praise (use instead of talent praise) */
  effortPraise: [
    "You worked hard on that!",
    "You kept going — that's what counts.",
    "Real effort, real growth. ✨",
    "That took courage to try.",
    "Look at how much you've practised!",
    "You put in the work — and it shows.",
  ],

  /** Challenge reframes */
  challengeReframes: [
    "That was tough — and you learned from it.",
    "Difficult things are where the real growth happens.",
    "Every challenge is a growth moment in disguise.",
    "That challenge just helped you grow.",
  ],

  /** Fixed mindset phrases — never use these */
  prohibited: [
    "You're so smart!",
    "You're naturally talented.",
    "You failed.",
    "You can't do this.",
    "You're not good at this.",
    "You got it wrong.",
    "Try harder next time.",
    "You should have done better.",
  ],
} as const;

// ── DARK PATTERN AUDIT ────────────────────────────────────────

/**
 * Prohibited dark patterns (ADR-008, Principle 4).
 * Run UI designs against this list before implementation.
 */
export const PROHIBITED_DARK_PATTERNS = [
  { id: "false-urgency",        description: "Timer countdowns or 'offer expires' on non-time-limited content" },
  { id: "confirmshaming",       description: "'No thanks, I don't want to grow' cancel button copy" },
  { id: "roach-motel",          description: "Easy to opt in to notifications, hard to opt out" },
  { id: "disguised-ads",        description: "Sponsored content that looks like organic content" },
  { id: "misdirection",         description: "Primary action is visually dominant; exit/skip is hidden" },
  { id: "fake-scarcity",        description: "'Limited' badges or rewards on digital items" },
  { id: "social-pressure",      description: "'N friends completed this today' comparison prompts" },
  { id: "hidden-costs",         description: "Premium features not clearly labelled before interaction" },
  { id: "infinite-scroll",      description: "Any feed or list that loads automatically without a stop" },
  { id: "just-one-more",        description: "Auto-advance to next mission/lesson without consent" },
  { id: "slot-machine-xp",      description: "Variable reward amounts designed to create unpredictability" },
] as const;

export type DarkPatternId = typeof PROHIBITED_DARK_PATTERNS[number]["id"];

// ── COMPARISON RULES ──────────────────────────────────────────

export const COMPARISON_RULES = {
  /** Allowed comparison types */
  allowed: [
    "self_vs_past_self",
    "self_vs_personal_best",
    "self_vs_stated_goal",
    "cohort_aggregate_anonymous", // school analytics only, no individual data
  ],

  /** Prohibited comparison types */
  prohibited: [
    "self_vs_peer",
    "self_vs_class_average",
    "self_vs_sibling",
    "self_vs_grade_cohort_individual",
    "leaderboard_position",
    "ranking",
    "percentile_vs_peers",
  ],
} as const;

// ── METRICS (ethical north stars) ────────────────────────────

/**
 * Ethical success metrics for LifePilot.
 * These replace time-in-app and DAU/MAU as north stars.
 */
export const ETHICAL_METRICS = {
  primaryNorthStar: "meaningful_sessions_per_week",
  description: "Sessions where at least one meaningful action was completed",

  secondaryMetrics: [
    { id: "reflection_depth",          description: "Voluntary word count per reflection (not required minimum)" },
    { id: "goal_completion_rate",       description: "Flight plans landed vs. abandoned" },
    { id: "return_after_30_days",       description: "Healthy re-engagement rate (not retention tricks)" },
    { id: "module_diversity",           description: "Number of different modules explored in a week" },
    { id: "effort_xp_ratio",            description: "Percentage of XP earned through effort (not just completion)" },
  ],

  prohibited: [
    "time_in_app_minutes",
    "daily_active_users",
    "streak_length_average",
    "notification_open_rate",
    "sessions_per_day",
  ],
} as const;

// ── SCREEN ACCEPTANCE — ETHICS GATE ──────────────────────────

/**
 * Ethics questions for the Screen Acceptance Checklist (Gate 1, XP-001).
 * All must be "correct answer" before any screen ships.
 */
export const ETHICS_GATE_QUESTIONS = [
  { id: "no-shame",       question: "Does this shame or guilt anyone?",                  correctAnswer: false },
  { id: "no-ranking",     question: "Does this rank or compare children to each other?",  correctAnswer: false },
  { id: "no-comparison",  question: "Is there any comparison to another child?",          correctAnswer: false },
  { id: "no-dark",        question: "Does this use any prohibited dark pattern?",         correctAnswer: false },
  { id: "no-addiction",   question: "Is this optimised for time-in-app?",                 correctAnswer: false },
  { id: "no-streak",      question: "Does the streak have pressure or punishment?",       correctAnswer: false },
  { id: "growth",         question: "Does this reward effort, not just talent?",          correctAnswer: true  },
  { id: "effort",         question: "Is every meaningful attempt celebrated?",            correctAnswer: true  },
] as const;

export type EthicsGateQuestion = typeof ETHICS_GATE_QUESTIONS[number]["id"];

/**
 * Validate a screen against the ethics gate.
 * Returns a list of failing criteria, or empty array if all pass.
 */
export function validateEthicsGate(
  answers: Record<EthicsGateQuestion, boolean>
): Array<{ id: EthicsGateQuestion; question: string }> {
  return ETHICS_GATE_QUESTIONS.filter(
    gate => answers[gate.id] !== gate.correctAnswer
  ).map(gate => ({ id: gate.id, question: gate.question }));
}
