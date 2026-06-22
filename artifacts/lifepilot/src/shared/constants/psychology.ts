// ============================================================
// LIFEPILOT — CHILD PSYCHOLOGY & DEVELOPMENT CONSTANTS
// XP-004 binding. All modules must comply.
// "Every child is capable of growth. A child's future is not fixed."
// ============================================================

// ── DEVELOPMENTAL RULES ───────────────────────────────────────

export const DEVELOPMENT_RULES = [
  { id: "growth-mindset",       rule: "Growth Mindset",         principle: "Learning and improvement — never fixed talent or intelligence" },
  { id: "no-shame",             rule: "No Shame",               principle: "No failure language, negative labels, or performance criticism" },
  { id: "no-comparison",        rule: "No Comparison",          principle: "No rankings, leaderboards, or public performance — growth is personal" },
  { id: "autonomy",             rule: "Autonomy",               principle: "Children choose their goals, reflections, and explorations" },
  { id: "intrinsic-motivation", rule: "Intrinsic Motivation",   principle: "Curiosity, purpose, personal growth — not pressure or reward loops" },
  { id: "self-efficacy",        rule: "Self-Efficacy",          principle: "'I can learn. I can improve. I can try again.' Every module reinforces this." },
  { id: "future-orientation",   rule: "Future Orientation",     principle: "Positive future imagination — no deterministic predictions" },
  { id: "decision-making",      rule: "Decision Making",        principle: "Scenarios, trade-offs, consequences — never right-vs-wrong lectures" },
  { id: "resilience",           rule: "Resilience",             principle: "Normalise mistakes, setbacks, uncertainty — promote recovery" },
  { id: "emotional-safety",     rule: "Emotional Safety",       principle: "Safe, respected, accepted, encouraged — never judged" },
  { id: "career-exploration",   rule: "Career Exploration",     principle: "Careers as possibilities — inspire curiosity, avoid labels" },
  { id: "financial-literacy",   rule: "Financial Literacy",     principle: "Choices, planning, delayed gratification — no fear-based messaging" },
  { id: "reflection",           rule: "Reflection",             principle: "Builds self-awareness — never homework, assessment, or interrogation" },
  { id: "future-me",            rule: "Future Me",              principle: "Hope, motivation, optimism — never predict outcomes or create dependency" },
  { id: "ai-safety",            rule: "AI Safety",              principle: "Encourage, clarify, guide — never diagnose, label, predict, or manipulate" },
  { id: "screen-time",          rule: "Screen Time Philosophy", principle: "Encourage real-world action — success is real-life growth, not time-in-app" },
] as const;

export type DevelopmentRule = typeof DEVELOPMENT_RULES[number]["id"];

// ── DEVELOPMENTAL QUALITIES ───────────────────────────────────

/** What LifePilot actively develops in children */
export const DEVELOPMENTAL_QUALITIES = [
  { id: "curiosity",         label: "Curiosity",         modules: ["careerExplorer", "lifeChoices", "moneyQuest"] },
  { id: "confidence",        label: "Confidence",        modules: ["flightPlan", "pilot", "cockpit"] },
  { id: "self-awareness",    label: "Self-awareness",    modules: ["flightLog", "lifeChoices", "futureMe"] },
  { id: "decision-making",   label: "Decision Making",   modules: ["lifeChoices", "moneyQuest"] },
  { id: "resilience",        label: "Resilience",        modules: ["flightPlan", "flightLog", "pilot"] },
  { id: "empathy",           label: "Empathy",           modules: ["lifeChoices", "flightLog"] },
  { id: "responsibility",    label: "Responsibility",    modules: ["flightPlan", "moneyQuest"] },
  { id: "future-thinking",   label: "Future Thinking",   modules: ["futureMe", "careerExplorer", "flightPlan"] },
  { id: "character",         label: "Character",         modules: ["lifeChoices", "flightLog", "futureMe"] },
] as const;

export type DevelopmentalQuality = typeof DEVELOPMENTAL_QUALITIES[number]["id"];

// ── GROWTH MINDSET LANGUAGE ───────────────────────────────────

export const GROWTH_MINDSET_LANGUAGE = {
  /** Positive phrases — use these */
  affirmations: [
    "You kept going — that's what matters most.",
    "Look how far you've come since you started.",
    "Every attempt makes you a little better.",
    "That challenge just helped you grow.",
    "Trying something new is always a win.",
    "Real effort, real growth.",
    "You're building something, one day at a time.",
    "Practice is how all great pilots learn to fly.",
    "Growth happens one step at a time. You're stepping.",
    "You can't do this yet — and that's completely okay.",
  ],

  /** Fixed-to-growth substitutions */
  replacements: {
    "you're so smart":          "you worked so hard on that",
    "you're a natural":         "you've been practising — it shows",
    "you failed":               "you're still on your way there",
    "you can't do this":        "you can't do this yet",
    "you got it wrong":         "that was tough — what did it teach you?",
    "you're the best":          "you've really put in the effort",
    "it comes naturally":       "your dedication is paying off",
    "you're not a maths person": "maths is something you can get better at",
  } as Record<string, string>,

  /** Fixed mindset phrases — never use */
  prohibited: [
    "you're so smart",
    "you're a natural",
    "you failed",
    "you can't do this",
    "you got it wrong",
    "you are the best",
    "it comes naturally to you",
    "you're talented",
    "you're not good at this",
    "you should be better at this",
    "you're behind",
    "you're not a [subject] person",
  ],
} as const;

// ── SELF-EFFICACY PHRASES ─────────────────────────────────────

/** Language that builds "I can" belief — use in missions, cockpit, and feedback */
export const SELF_EFFICACY_PHRASES = [
  "I can learn this.",
  "I can improve with practice.",
  "I can adapt when things change.",
  "I can try again.",
  "Every pilot learns by flying.",
  "Skills grow with practice.",
  "You get better at things by doing them.",
  "This is learnable.",
  "Explore this path — anyone can start here.",
] as const;

// ── RESILIENCE PHRASES ────────────────────────────────────────

/** Use these when acknowledging setbacks, absences, or incomplete states */
export const RESILIENCE_PHRASES = {
  returningAfterAbsence: [
    "Life happened — and you're back now. That counts.",
    "Every great pilot has pauses. Welcome back! ✈️",
    "Great to see you again. Your journey is right where you left it.",
    "Ready to continue? Everything is waiting for you.",
  ],

  goalPaused: [
    "This flight plan is on hold. That's okay — you can pick it up anytime.",
    "Goals pause. Journeys don't end.",
    "Paused, not abandoned. Whenever you're ready.",
  ],

  streakReset: [
    "New chapter starting. Every great pilot has pauses. 🌅",
    "Ready for a fresh start? Your journey continues.",
    "This is just a new chapter. Keep flying.",
  ],

  missionIncomplete: [
    "You're still on your way there. No rush.",
    "This one's waiting for you whenever you're ready.",
    "Every great adventure has its own timeline.",
  ],

  lowMood: [
    "It's okay to feel this way. You're not alone.",
    "Tough days are part of every journey. You're still flying.",
    "Thank you for checking in. Take your time.",
  ],
} as const;

// ── CAREER EXPLORATION RULES ──────────────────────────────────

export const CAREER_EXPLORATION_RULES = {
  /** Allowed career framing */
  allowed: [
    "You could explore this path.",
    "Here's what people in this field do every day.",
    "This is one path some people find exciting.",
    "Design is a skill you can develop and explore.",
    "The Technology World is full of possibilities.",
  ],

  /** Prohibited career framing */
  prohibited: [
    "You are suited to technology.",
    "Based on your profile, consider engineering.",
    "This is the right career for you.",
    "Your assessment suggests law.",
    "You'll be a great designer.",
    "You are not cut out for medicine.",
    "This career is out of reach for you.",
    "You should be a [career].",
  ],

  /** Prohibited career mechanics */
  prohibitedMechanics: [
    "aptitude_test_producing_career_labels",
    "match_score_between_child_and_career",
    "career_ranking_by_prestige_or_income",
    "ai_predicted_career_outcomes",
    "career_certainty_claims",
  ],
} as const;

// ── FINANCIAL LITERACY RULES ──────────────────────────────────

export const FINANCIAL_LITERACY_RULES = {
  approach: "scenario_based_choice_consequence" as const,

  /** Allowed financial framing */
  allowed: [
    "Saving now gives Future You more choices.",
    "Every choice has trade-offs. What matters most to you?",
    "Here's what happened after that choice...",
    "Different choices lead to different futures.",
    "You've completed 3 Money Quest adventures!",
    "Money is a tool you learn to use.",
  ],

  /** Prohibited financial framing */
  prohibited: [
    "If you don't save, you'll be poor.",
    "Spending is irresponsible.",
    "You made the wrong financial decision.",
    "Rich people save; poor people spend.",
    "You need to be smarter with money.",
    "Financial literacy assessment score: 62%.",
  ],
} as const;

// ── EMOTIONAL SAFETY ──────────────────────────────────────────

export const EMOTIONAL_SAFETY = {
  /** Mood scale labels (5-point, non-numerical display) */
  moodLabels: {
    1: "Struggling",
    2: "A little low",
    3: "Okay",
    4: "Good",
    5: "Amazing!",
  } as Record<number, string>,

  /** Adapted prompts for low mood (1–2 on mood scale) */
  lowMoodPrompts: [
    "What might help you feel a little better?",
    "What's one small thing that felt okay today?",
    "Who could you reach out to right now?",
    "Is there anything that made you feel even slightly hopeful today?",
    "What would you tell a friend who was feeling this way?",
  ],

  /** Validation for low mood — never cheerful, always validating */
  lowMoodValidation: [
    "It's okay to feel this way. Thank you for checking in.",
    "Tough days are part of every journey. You're still here — that matters.",
    "Every pilot has hard days. Yours is noted and respected.",
  ],

  /** "Not today" option label — always visible */
  notTodayLabel: "Not feeling it today — that's okay",

  /** Crisis signal response (static — no AI involvement) */
  crisisResponse: {
    message: "It sounds like you're going through something difficult. Please talk to a trusted adult — a parent, teacher, or counsellor.",
    helplines: [
      { name: "iCall",                   number: "9152987821" },
      { name: "Vandrevala Foundation",   number: "1860-2662-345" },
      { name: "Snehi",                   number: "044-24640050" },
    ],
  },
} as const;

// ── SCREEN TIME RULES ─────────────────────────────────────────

export const SCREEN_TIME = {
  /** Healthy session length (minutes) */
  healthySessionRange: { min: 10, max: 20 },

  /** Real-world action prompts per module */
  realWorldActions: {
    careerExplorer: "Ask someone you know who works in this field what their day is like.",
    moneyQuest:     "Try this choice for real this week. What would you actually do?",
    lifeChoices:    "Talk to a family member about the choice you made. What do they think?",
    flightLog:      "If you could tell one person about today's reflection, who would it be?",
    futureMe:       "Could you share what you wrote with someone you trust?",
    flightPlan:     "Tell a family member about your flight plan. Ask them for one tip.",
  } as Record<string, string>,

  /** Family conversation starters (shown on Cockpit after module use) */
  familyConversationStarters: {
    careerExplorer: "Ask your family: 'What job would you choose if you could choose anything?'",
    moneyQuest:     "Ask your family: 'What's the best money decision you ever made?'",
    lifeChoices:    "Ask your family: 'What's a hard choice you've had to make?'",
    futureMe:       "Ask your family: 'What advice would you give your 15-year-old self?'",
    flightPlan:     "Ask your family: 'What's one goal you're working toward right now?'",
  } as Record<string, string>,

  /** Prohibited screen time mechanics */
  prohibited: [
    "infinite_scroll",
    "auto_advance_to_next_content",
    "just_one_more_prompts",
    "session_length_optimisation",
    "engagement_maximisation",
  ],
} as const;

// ── PSYCHOLOGICAL RISK ASSESSMENT ─────────────────────────────

export const PSYCH_RISK_DIMENSIONS = [
  {
    id: "shame",
    dimension: "Shame potential",
    low: "No failure states",
    medium: "Neutral failure states",
    high: "Visible failure labels",
  },
  {
    id: "comparison",
    dimension: "Comparison potential",
    low: "No peer data",
    medium: "Aggregated peer data",
    high: "Individual comparison",
  },
  {
    id: "pressure",
    dimension: "Pressure potential",
    low: "No urgency",
    medium: "Optional urgency",
    high: "Required urgency",
  },
  {
    id: "dependency",
    dimension: "Dependency potential",
    low: "Natural stopping points",
    medium: "Mild pull",
    high: "'Just one more' mechanics",
  },
  {
    id: "fixed-mindset",
    dimension: "Fixed mindset potential",
    low: "Effort framing",
    medium: "Neutral framing",
    high: "Talent/ability framing",
  },
  {
    id: "privacy",
    dimension: "Privacy risk",
    low: "Private by default",
    medium: "Configurable",
    high: "Public by default",
  },
  {
    id: "ai-harm",
    dimension: "AI harm potential",
    low: "No AI",
    medium: "Guided AI (XP-004 compliant)",
    high: "Unconstrained AI",
  },
] as const;

export type PsychRiskDimension = typeof PSYCH_RISK_DIMENSIONS[number]["id"];
export type PsychRiskLevel = "low" | "medium" | "high";

// ── REVIEW CHECKLISTS ─────────────────────────────────────────

export const CHILD_EXPERIENCE_CHECK = [
  { id: "hopeful",   question: "Would a child feel hopeful after this interaction?" },
  { id: "capable",   question: "Would a child feel capable — not incompetent or judged?" },
  { id: "respected", question: "Would a child feel respected — not talked down to?" },
  { id: "safe",      question: "Would a child feel safe — privacy, no judgement, no pressure?" },
  { id: "curious",   question: "Would a child feel curious — wanting to explore more?" },
] as const;

export const PARENT_TRUST_ALIGNMENT = [
  { id: "growth",     question: "Does this help my child grow as a person?" },
  { id: "comfort",    question: "Am I comfortable with my child having this interaction?" },
  { id: "character",  question: "Does this build my child's confidence and character?" },
  { id: "habits",     question: "Does this encourage healthy habits and reflection?" },
  { id: "recommend",  question: "Would I recommend this to another parent?" },
] as const;

export const SCHOOL_ALIGNMENT_CHECK = [
  { id: "character",   question: "Does this support character development?" },
  { id: "nep",         question: "Does this support future readiness (NEP alignment)?" },
  { id: "life-skills", question: "Does this support life skills development?" },
  { id: "wellbeing",   question: "Does this promote healthy student wellbeing?" },
  { id: "counsellor",  question: "Would a school counsellor endorse this interaction?" },
] as const;

/**
 * Run all XP-004 review checks.
 * Returns any failing questions (those answered `false` when they should be `true`).
 */
export function runDevelopmentReview(answers: {
  child: Record<string, boolean>;
  parent: Record<string, boolean>;
  school: Record<string, boolean>;
}): string[] {
  const failures: string[] = [];

  CHILD_EXPERIENCE_CHECK.forEach(({ id, question }) => {
    if (!answers.child[id]) failures.push(`[Child] ${question}`);
  });
  PARENT_TRUST_ALIGNMENT.forEach(({ id, question }) => {
    if (!answers.parent[id]) failures.push(`[Parent] ${question}`);
  });
  SCHOOL_ALIGNMENT_CHECK.forEach(({ id, question }) => {
    if (!answers.school[id]) failures.push(`[School] ${question}`);
  });

  return failures;
}

/**
 * Check growth mindset compliance.
 * Returns prohibited phrases found in the copy string.
 */
export function checkGrowthMindset(copy: string): string[] {
  const lower = copy.toLowerCase();
  return GROWTH_MINDSET_LANGUAGE.prohibited.filter(phrase => lower.includes(phrase));
}
