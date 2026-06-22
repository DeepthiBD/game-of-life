// ============================================================
// LIFEPILOT — PARENT TRUST FRAMEWORK CONSTANTS
// XP-005 binding. All modules must comply.
// "LifePilot exists to support children — not to maximize screen time."
// ============================================================

// ── TRUST PRINCIPLES ─────────────────────────────────────────

export const TRUST_PRINCIPLES = [
  { id: "privacy-first",          label: "Privacy First",             description: "Child content is private by default at the data layer" },
  { id: "offline-first",          label: "Offline First",             description: "Full functionality without internet — trust is an architecture feature" },
  { id: "no-social-comparison",   label: "No Social Comparison",      description: "Children are never compared to peers, siblings, or cohort" },
  { id: "no-manipulation",        label: "No Manipulative Retention",  description: "No addiction loops, pressure tactics, or dark patterns" },
  { id: "growth-over-performance",label: "Growth Over Performance",    description: "Effort, resilience, and curiosity celebrated — not scores" },
  { id: "future-optimism",        label: "Future-Oriented Optimism",   description: "Every module connects the child to a hopeful, changeable future" },
  { id: "copilot",                label: "Parents Are Co-Pilots",      description: "Parents informed, never auditing — child is in control" },
  { id: "child-autonomy",         label: "Child Autonomy",             description: "Children own their journey — goals, reflections, and privacy choices" },
  { id: "safe-ai",                label: "Safe AI Principles",         description: "AI guides and encourages — never diagnoses, labels, or predicts" },
  { id: "transparency",           label: "Parent Transparency",        description: "Parents understand what is collected, where, and how to delete it" },
] as const;

export type TrustPrinciple = typeof TRUST_PRINCIPLES[number]["id"];

// ── PRIVACY LEVELS ───────────────────────────────────────────

/**
 * Privacy level for all child-created content.
 * Default is always `private`. Elevation requires child opt-in.
 */
export const PrivacyLevel = {
  PRIVATE:            "private",            // visible to child only (always the default)
  SHARED_WITH_PARENT: "shared_with_parent", // child opt-in — parent CoPilot view
  SHARED_WITH_SCHOOL: "shared_with_school", // child opt-in — school CoPilot view
} as const;

export type PrivacyLevelValue = typeof PrivacyLevel[keyof typeof PrivacyLevel];

/** Default privacy level applied to all new child content */
export const DEFAULT_PRIVACY_LEVEL: PrivacyLevelValue = PrivacyLevel.PRIVATE;

/**
 * Entities that carry a privacy level.
 * All of these must have `privacyLevel: PrivacyLevelValue` in their Dexie schema (Wave 1+).
 */
export const PRIVATE_CONTENT_ENTITIES = [
  "Reflection",
  "FlightLogEntry",
  "FutureLetter",
  "HabitActivity",
  "LifeChoiceResponse",
  "MoodEntry",
] as const;

// ── ALLOWED / PROHIBITED DATA COLLECTION ─────────────────────

export const DATA_COLLECTION = {
  allowed: [
    { field: "pilotName",       purpose: "Personalisation" },
    { field: "pilotAge",        purpose: "Age-appropriate content" },
    { field: "pilotGrade",      purpose: "Grade-appropriate content" },
    { field: "pilotCity",       purpose: "Localisation (city-level only, not precise location)" },
    { field: "preferredLanguage", purpose: "i18n personalisation" },
    { field: "xpLevel",         purpose: "Gamification, device-only" },
    { field: "moduleOpened",    purpose: "Aggregated product improvement (not individual tracking)" },
  ],

  neverCollect: [
    { field: "preciseLocation",   reason: "Privacy — city is the maximum granularity" },
    { field: "deviceIdentifier",  reason: "No cross-device tracking" },
    { field: "biometricData",     reason: "Never" },
    { field: "reflectionText",    reason: "Private content — device-only, never transmitted" },
    { field: "journalContent",    reason: "Private content — device-only, never transmitted" },
    { field: "futureLetterText",  reason: "Private content — device-only, never transmitted" },
    { field: "moodRating",        reason: "Private — never transmitted without explicit child opt-in" },
  ],
} as const;

// ── PROHIBITED THIRD-PARTY INTEGRATIONS ──────────────────────

/**
 * Third-party SDKs/services that are permanently prohibited in the child-facing app.
 */
export const PROHIBITED_THIRD_PARTY = [
  { name: "Firebase Analytics",  reason: "Behavioural analytics SDK — violates Privacy First" },
  { name: "Google Analytics",    reason: "Behavioural analytics — violates Privacy First" },
  { name: "Mixpanel",            reason: "Behavioural analytics — violates Privacy First" },
  { name: "Amplitude",           reason: "Behavioural analytics — violates Privacy First" },
  { name: "Facebook SDK",        reason: "Advertising network — violates Privacy First" },
  { name: "Meta Pixel",          reason: "Behavioural advertising — violates Privacy First" },
  { name: "AppsFlyer",           reason: "Attribution/tracking — violates Privacy First" },
  { name: "Adjust",              reason: "Attribution/tracking — violates Privacy First" },
  { name: "Crashlytics (standalone)", reason: "Sends device data — use aggregated crash reports only" },
] as const;

// ── COPILOT VIEW RULES ────────────────────────────────────────

/**
 * What the parent CoPilot view may and may not show.
 */
export const COPILOT_VIEW = {
  /** Data visible in parent CoPilot view */
  visible: [
    { data: "modulesExplored",        format: "list of module names only — no content" },
    { data: "reflectionCount",        format: "count only — no text" },
    { data: "careerWorldsExplored",   format: "world names only — no notes" },
    { data: "flightPlanTitles",       format: "titles only — no details unless child shares" },
    { data: "pilotLevel",             format: "level name and XP band — no breakdown" },
    { data: "weeklyActivitySummary",  format: "number of sessions — no content" },
  ],

  /** Data never visible in parent CoPilot view */
  neverVisible: [
    { data: "journalText",            reason: "Private — child owns it" },
    { data: "futureLetterContent",    reason: "Private — child owns it" },
    { data: "moodRatings",            reason: "Private — unless child explicitly shares" },
    { data: "lifeChoicesAnswers",     reason: "Private — child owns it" },
    { data: "individualHabitDetails", reason: "Aggregated visible only" },
    { data: "timeInApp",              reason: "We don't track this — not a meaningful metric" },
    { data: "siblingComparisons",     reason: "No comparison — ever" },
  ],

  /** Conversation starter cards shown in CoPilot view */
  conversationStarters: {
    careerExplorer:  "[Name] explored {{worldName}} today. Ask them which part of it excited them most!",
    flightPlan:      "[Name] set a new flight plan this week. Ask them where they want to go.",
    flightLog:       "[Name] logged a reflection. Ask them what surprised them today.",
    futureMe:        "[Name] wrote a message to their future self. When are they hoping to read it?",
    moneyQuest:      "[Name] completed a Money Quest. Ask them what choice they would make with ₹500.",
    lifeChoices:     "[Name] explored a Life Choices scenario. Ask them which path they chose.",
    milestone:       "[Name] reached a milestone! Celebrate with them — they earned it.",
  },
} as const;

// ── MONETIZATION RULES ────────────────────────────────────────

export const MONETIZATION = {
  allowed: [
    { stream: "premium_content_packs",    rationale: "Value exchange — content for payment, no data exchange" },
    { stream: "premium_learning_paths",   rationale: "Value exchange — enhanced journeys" },
    { stream: "family_pack_licence",      rationale: "Multi-child use — supports family without compromising privacy" },
    { stream: "school_programme_licence", rationale: "Institutional — no individual child data used for revenue" },
    { stream: "premium_experiences",      rationale: "Functional enhancement — no manipulative upsell" },
  ],

  prohibited: [
    { stream: "selling_child_data",       reason: "Permanent prohibition — core trust violation" },
    { stream: "advertising_networks",     reason: "Behavioural profiling of children" },
    { stream: "behavioural_advertising",  reason: "Same — violates Privacy First" },
    { stream: "manipulative_upsells",     reason: "Violates No Manipulative Retention (Principle 4)" },
    { stream: "pay_to_progress",          reason: "Unfair access; violates Child Autonomy (Principle 8)" },
    { stream: "freemium_with_guilt",      reason: "Shame-based upsell — violates ADR-008 (No Shame)" },
  ],
} as const;

// ── SAFE AI PRINCIPLES ────────────────────────────────────────

export const SAFE_AI = {
  allowed: [
    { behaviour: "guide",     example: "Based on your interests, you might explore the Health World next." },
    { behaviour: "encourage", example: "You've been reflecting every day this week — real commitment!" },
    { behaviour: "educate",   example: "Compound interest means your savings grow faster over time." },
    { behaviour: "clarify",   example: "A budget is just a plan for your money. Let's make one." },
    { behaviour: "reflect",   example: "That was a tough scenario. What did it make you think about?" },
  ],

  prohibited: [
    { behaviour: "diagnose",  example: "Your responses suggest you may be experiencing anxiety.",  reason: "Medical diagnosis requires professionals" },
    { behaviour: "label",     example: "You're a visual learner.",                                 reason: "Fixed labels limit growth mindset" },
    { behaviour: "predict",   example: "At your current rate, you'll struggle with engineering.",   reason: "Life outcome predictions are harmful" },
    { behaviour: "replace",   example: "Tell me all your problems — I'm always here for you.",     reason: "Creates dependency, replaces human relationships" },
    { behaviour: "manipulate",example: "Open the app every day or you'll lose your AI insights.",  reason: "Dark pattern via AI is still a dark pattern" },
  ],

  crisisProtocol: {
    trigger: "language suggesting serious distress detected by AI",
    response: "Display static message: 'It sounds like you're going through something difficult. Please talk to a trusted adult — a parent, teacher, or counsellor.'",
    helplines: [
      { name: "iCall",         number: "9152987821" },
      { name: "Vandrevala Foundation", number: "1860-2662-345" },
      { name: "Snehi",         number: "044-24640050" },
    ],
    neverDo: [
      "Attempt AI counselling for crisis situations",
      "Transmit crisis signal data automatically",
      "Diagnose mental health conditions",
    ],
  },
} as const;

// ── NOTIFICATION CONFIG (trust-aligned) ──────────────────────

export const NOTIFICATION_CONFIG = {
  optIn: true,                           // Always opt-in, never opt-out
  maxPerDay: 1,                          // Maximum 1 notification per day
  deliveryWindow: { startHour: 7, endHour: 12 }, // Morning only — no bedtime pressure
  unsubscribeMaxTaps: 2,                 // Unsubscribe from all in ≤2 taps
  prohibitedContent: [
    "streak pressure",                   // "Don't break your streak!"
    "fear of loss",                      // "You'll lose your progress!"
    "guilt messaging",                   // "You haven't logged in for 3 days"
    "false urgency",                     // "Today is your last chance!"
    "comparison",                        // "Your classmates are ahead of you"
  ],
} as const;

// ── TRUST REVIEW CHECKLIST ────────────────────────────────────

/**
 * XP-005 Screen Trust Review — 10 criteria.
 * All must pass. No exceptions.
 */
export const TRUST_REVIEW_CHECKLIST = [
  { id: 1,  criterion: "Builds trust — increases or maintains parent/child/school trust"         },
  { id: 2,  criterion: "Protects privacy — minimum data, private by default"                      },
  { id: 3,  criterion: "Encourages growth — celebrates effort, learning, resilience"              },
  { id: 4,  criterion: "Avoids shame — no guilt, failure framing, or negative reinforcement"     },
  { id: 5,  criterion: "Avoids comparison — no peer, sibling, or cohort comparisons"             },
  { id: 6,  criterion: "Avoids manipulation — no dark patterns, false urgency, pressure"         },
  { id: 7,  criterion: "Encourages family conversations — gives families something to discuss"    },
  { id: 8,  criterion: "Child remains the hero — child is in control and making choices"         },
  { id: 9,  criterion: "Parent remains co-pilot — parent views are informative, not surveillance" },
  { id: 10, criterion: "Future remains hopeful — connects child to a positive, changeable future" },
] as const;

// ── TRUST TEST BATTERY ────────────────────────────────────────

export const PARENT_PERCEPTION_TEST = [
  "Would a parent feel comfortable sitting beside their child using this?",
  "Would a parent recommend this to another parent?",
  "Would a parent believe this builds character?",
  "Would a parent believe this encourages positive life choices?",
] as const;

export const SCHOOL_TRUST_TEST = [
  "Would a school believe this supports life skills?",
  "Would a school believe this aligns with future readiness?",
  "Would a school believe this promotes student wellbeing?",
] as const;

export const CHILD_TRUST_TEST = [
  "Would a child feel safe?",
  "Would a child feel respected?",
  "Would a child feel encouraged?",
  "Would a child feel ownership?",
  "Would a child feel hopeful?",
] as const;

/**
 * Run all three trust tests.
 * Returns names of any tests that fail (answers that should be `true` but are `false`).
 */
export function runTrustTests(answers: {
  parent: boolean[];
  school: boolean[];
  child: boolean[];
}): string[] {
  const failures: string[] = [];

  PARENT_PERCEPTION_TEST.forEach((q, i) => {
    if (!answers.parent[i]) failures.push(`[Parent] ${q}`);
  });
  SCHOOL_TRUST_TEST.forEach((q, i) => {
    if (!answers.school[i]) failures.push(`[School] ${q}`);
  });
  CHILD_TRUST_TEST.forEach((q, i) => {
    if (!answers.child[i]) failures.push(`[Child] ${q}`);
  });

  return failures;
}
