// ============================================================
// LIFEPILOT — XP-003 COPYWRITING CONSTANTS
// Voice, tone, terminology, and copy standards for all surfaces.
// "Words shape experience."
// ============================================================

// ── TERMINOLOGY SYSTEM ────────────────────────────────────────

/**
 * XP-003 mandatory terminology replacements.
 * Run a lint check against these before shipping any copy.
 */
export const TERMINOLOGY = {
  replace: {
    "goal":               "Flight Plan",
    "journal":            "Flight Log",
    "dashboard":          "Cockpit",
    "user":               "Pilot",
    "profile":            "Pilot Profile",
    "lesson":             "Mission / Adventure / Journey",
    "task":               "Mission Step",
    "reminder":           "Mission Alert / Journey Reminder",
    "progress":           "Journey Progress",
    "achievement":        "Milestone / Growth Moment / Explorer Badge",
    "career details":     "Explore Career Path",
    "financial literacy": "Money Quest",
    "future letter":      "Message From Future You",
    "notification":       "Flight Update",
    "submit":             "Land it / Launch / Send",
    "complete":           "Landed! / Accomplished! / Unlocked!",
    "failed":             "Still on the way / Not there yet",
    "error":              "Turbulence / Interruption",
  },
} as const;

/** Words that are strictly prohibited in child-facing copy (ADR-008 + XP-003) */
export const PROHIBITED_COPY_WORDS = [
  // Failure / shame
  "failed", "incomplete", "wrong", "incorrect", "behind", "overdue", "late",
  "error", "invalid", "rejected", "denied", "locked", "missed", "required",
  // Competition / comparison
  "rank", "leaderboard", "score", "grade", "performance", "assessment", "test",
  // Pressure
  "pressure", "deadline", "obligation", "urgent", "must", "should",
  // Fixed mindset / comparative success
  "perfect", "best student", "beat", "top student", "first place",
] as const;

// ── BUTTON COPY ──────────────────────────────────────────────

export const BUTTON_COPY = {
  preferred: [
    "Explore",
    "Continue",
    "Start Mission",
    "Discover",
    "Reflect",
    "Create",
    "Choose",
    "Save",
    "Review",
    "Open Message",
    "View Journey",
    "Land it!",
    "Launch!",
    "Send to the future",
    "Begin",
    "Keep going",
    "Not now",
    "Maybe later",
  ],

  prohibited: [
    "Submit",
    "Execute",
    "Complete Requirement",
    "Finish Assignment",
    "Perform Action",
    "Cancel",
    "Delete",
    "Dismiss",
    "Reject",
    "Abort",
  ],
} as const;

// ── PLACEHOLDER TEXT ─────────────────────────────────────────

export const PLACEHOLDERS = {
  reflectionTextArea:   "What's on your mind today?",
  flightPlanName:       "My destination is...",
  futureMeLetter:       "Dear Future Me,\n\nRight now I am...",
  pilotName:            "My name is...",
  pilotCity:            "My city is...",
  habitName:            "My habit is...",
  missionNote:          "What did you discover?",
  goalWhy:              "Because...",
  careerNote:           "What excites you about this path?",
} as const;

// ── CONFIRMATION MESSAGES ─────────────────────────────────────

export const CONFIRMATION_COPY = {
  goalCreated:        "Flight plan launched! ✈️",
  goalCompleted:      "You've landed! 🎉",
  reflectionLogged:   "Logged! ✨",
  letterSent:         "Sent to the future! ✨",
  badgeEarned:        "New Explorer Badge unlocked! 🏅",
  habitLogged:        "Done for today! ✅",
  missionDone:        "Mission accomplished! 🎯",
  levelUp:            "Level up! You're now a {{rank}}. 🚀",
  xpEarned:           "+{{xp}} XP — Effort rewarded! ✨",
  careerSaved:        "Added to your adventure paths! 🗺️",
  onboardingDone:     "Your journey begins now! ✈️",
} as const;

// ── ERROR MESSAGES ────────────────────────────────────────────

export const ERROR_COPY = {
  generic:      "Something got a little turbulent. Let's try again.",
  saveFailed:   "We couldn't save that right now. Your progress is safe — try again.",
  loadFailed:   "Something got in the way of loading this. Let's try once more.",
  offline:      "You're offline right now. Your journey data is safe on this device.",
  notFound:     "This path doesn't exist yet — back to Cockpit?",
  inputInvalid: "That didn't quite work. Could you check and try again?",
  featureGated: "This part of the journey isn't ready yet — coming soon!",
  sessionEnded: "Your session ended. Log back in to continue your journey.",
  syncFailed:   "We couldn't sync right now. Everything is safe on your device.",
  unknown:      "Something unexpected happened. Your journey is safe — let's try again.",
} as const;

// ── SUCCESS MESSAGES ─────────────────────────────────────────

export const SUCCESS_COPY = {
  generic: [
    "Great progress today! ✨",
    "Another step on your journey. 🌟",
    "Nice work exploring! Keep going.",
    "Future You will appreciate this. ✈️",
    "You showed up — that's what matters most.",
  ],

  effort: [
    "You worked hard on that — it shows! ✨",
    "Real effort, real growth. 🌟",
    "Every step forward counts. You're moving! ✈️",
    "Look at you, building something real.",
    "That took courage. Well done.",
  ],

  milestones: {
    "streak-7":  "7 days of showing up! You're building something real. 🔥",
    "streak-30": "30-day journey! That's dedication. 🌟",
    "streak-100":"100 days on your journey — incredible! 🚀",
    "goals-1":   "First flight plan landed! The journey has begun. 🎉",
    "goals-5":   "5 flight plans landed! You're a navigator now. ✈️",
    "level-up":  "New pilot rank: {{rank}}! The skies are yours. 🚀",
  },
} as const;

// ── NOTIFICATION TEMPLATES ────────────────────────────────────

export const NOTIFICATION_TEMPLATES = {
  /** Daily journey reminder (rotate through these) */
  dailyReminder: [
    "Good morning! Your journey is waiting whenever you're ready. ✈️",
    "A new day, a new adventure. What will you discover today?",
    "Ready to explore something new today?",
    "Your journey is right where you left it. Ready to continue?",
  ],

  /** Future Me letter ready to read */
  futureMeReady: [
    "A message from Future You is waiting to be opened. ✨",
    "Future You left you a note. Ready to read it?",
  ],

  /** New content available */
  newContent: [
    "A new adventure path is ready to explore.",
    "Ready for a quick mission today?",
    "A new Career World just opened up. Have a look!",
  ],

  /** Welcome back after absence (warm, no guilt) */
  welcomeBack: [
    "Welcome back! Your journey is right where you left it.",
    "Great to see you again. Ready to continue?",
    "Life happens — and you're back now. That counts. ✈️",
  ],

  /** Streak milestones (celebration only, never pressure) */
  streakMilestone: [
    "You've been on a {{count}}-day journey! ✈️ Keep flying!",
    "{{count}} days of showing up — that's something to be proud of! 🌟",
  ],

  /** What to never send (for reference / lint) */
  prohibited: [
    "Don't break your streak! Log in now.",
    "Your streak ends at midnight!",
    "You haven't opened the app in 3 days.",
    "Complete now — you are overdue.",
    "Urgent: action required.",
    "You are falling behind.",
    "Others are doing better than you.",
  ],
} as const;

// ── REFLECTION PROMPTS ────────────────────────────────────────
// Full bank — rotate daily (see also FLIGHT_LOG_PROMPTS in xp001.ts)

export const REFLECTION_PROMPTS = {
  dailyCheckin: [
    "What surprised you today?",
    "What made you smile today?",
    "What are you looking forward to tomorrow?",
    "What made today worth remembering?",
    "How do you feel right now — in one word?",
  ],

  growth: [
    "What challenge helped you grow today?",
    "What did you discover about yourself today?",
    "What would you do differently tomorrow?",
    "What's something you tried for the first time recently?",
    "What's one small thing you're proud of today?",
  ],

  futureLinking: [
    "What would Future You thank you for today?",
    "What is one step you took toward who you want to become?",
    "If Future You could send you a message right now, what might they say?",
    "What's one thing you're building — even slowly — toward your future?",
  ],

  gratitude: [
    "Who inspired you today?",
    "How did you show kindness today?",
    "Who would you like to thank today, and why?",
    "What's something or someone you're grateful for right now?",
  ],

  curiosity: [
    "What's something you want to learn more about?",
    "What question is stuck in your mind right now?",
    "What's something you saw or heard that made you think?",
  ],

  prohibited: [
    "Describe your day in 200 words.",
    "Complete the reflection entry below.",
    "Provide a detailed account of your learning today.",
    "Rate your performance from 1 to 10.",
    "List three things you accomplished.",
    "Evaluate your progress against your goals.",
  ],
} as const;

// ── FUTURE ME COPY ────────────────────────────────────────────

export const FUTURE_ME_COPY = {
  emptyState:       "Write your first message to Future You. They're waiting to hear from you.",
  emptyStateAction: "Write to Future You",
  letterWaiting:    "A message from your past self is waiting... ✨",
  letterReady:      "Future You left you a note. Ready to read it?",
  locked:           "Future You isn't ready to read this yet...",
  lockedSub:        "It arrives on {{date}}.",
  sendAction:       "Send to the future",
  sentTitle:        "Sent to the future! ✨",
  sentSub:          "Your message is on its way to Future You. They'll be so glad you wrote.",
  readHeader:       "A message from your past self",
  readSub:          "This was written by you on {{date}}. They believed in you then — and still do.",
  letterOpener:     "Dear Future {{name}},",
  placeholder:      "Right now I am... / I hope that by the time you read this...",
  deliveryPrompt:   "When should Future You read this?",
  timeOptions: {
    oneMonth:    "1 month from now",
    threeMonths: "3 months from now",
    sixMonths:   "6 months from now",
    oneYear:     "1 year from now",
    custom:      "Choose a date",
  },
} as const;

// ── PARENT COMMUNICATION COPY ─────────────────────────────────

export const PARENT_COPY = {
  copilotWelcome:    "Here's what {{name}} has been exploring this week.",
  conversationStarters: {
    careerExplorer: "Ask {{name}} what they discovered in Career Explorer today!",
    flightPlan:     "{{name}} set a new flight plan this week. Ask them where they want to go.",
    flightLog:      "{{name}} logged a reflection. Ask them what surprised them today.",
    futureMe:       "{{name}} wrote a message to Future {{name}}. Ask when they're hoping to read it!",
    moneyQuest:     "{{name}} completed a Money Quest. Ask what choice they made with ₹500.",
    milestone:      "{{name}} reached a milestone! This is a great moment to celebrate together.",
  },
  privateContent:    "{{name}} has chosen to keep their Flight Log private.",
  privateContentSub: "That's their space — and it's safe. Ask them what's on their mind today.",
  quietWeek:         "It's been a quiet week for {{name}}. A gentle nudge might help.",
  achievement:       "{{name}} reached a milestone this week! A great moment to celebrate together.",
} as const;

// ── AI COMMUNICATION RULES ────────────────────────────────────

export const AI_COPY_RULES = {
  allowedBehaviours: [
    "Ask thoughtful questions",
    "Encourage reflection",
    "Suggest possibilities",
    "Support exploration",
    "Guide toward next steps",
    "Celebrate effort",
  ],

  prohibitedBehaviours: [
    "Predict a child's future",
    "Judge a child's choices",
    "Label a child's personality or abilities",
    "Replace parents, teachers, or mentors",
    "Diagnose emotional or mental health states",
    "Create dependency or emotional attachment",
  ],

  labelPrefix: "Your AI Coach suggests:",
  dismissLabel: "Not for me right now",
} as const;

// ── COPY REVIEW CHECKLIST ─────────────────────────────────────

export const COPY_REVIEW_CHECKLIST = [
  { id: 1,  check: "Uses XP-003 terminology (Flight Plan not Goal; Pilot not User)" },
  { id: 2,  check: "Encouraging tone — at least one positive element" },
  { id: 3,  check: "Hopeful tone — at least one forward-looking element" },
  { id: 4,  check: "Child-safe — appropriate for age 10–16" },
  { id: 5,  check: "No shame language" },
  { id: 6,  check: "No comparison language" },
  { id: 7,  check: "No pressure language" },
  { id: 8,  check: "Future-oriented where relevant" },
  { id: 9,  check: "Adventure-oriented — in XP-003 spirit" },
  { id: 10, check: "Growth mindset — effort praised, not talent or rank" },
] as const;

export type CopyCheckId = typeof COPY_REVIEW_CHECKLIST[number]["id"];

/**
 * Scan copy string for prohibited words.
 * Returns list of found prohibited words, or empty array if clean.
 */
export function scanCopyForProhibitedWords(copy: string): string[] {
  const lower = copy.toLowerCase();
  return PROHIBITED_COPY_WORDS.filter(word => lower.includes(word));
}

/**
 * Check copy for XP-003 terminology compliance.
 * Returns list of prohibited terms found, or empty array if clean.
 */
export function checkTerminologyCompliance(copy: string): string[] {
  const lower = copy.toLowerCase();
  return Object.keys(TERMINOLOGY.replace).filter(term => lower.includes(term));
}
