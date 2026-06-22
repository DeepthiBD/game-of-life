// ============================================================
// LIFEPILOT — VISUAL DESIGN SYSTEM CONSTANTS
// XP-002 binding. All modules must comply.
// "LifePilot should not feel like pages. It should feel like worlds."
// ============================================================

// ── BRAND COLOURS ────────────────────────────────────────────

/** Raw hex values — source of truth for CSS custom properties.
 *  Never reference these directly in components; use CSS_VARS instead. */
export const BRAND_HEX = {
  // Brand
  skyBlue:       "#3B9EE8",
  sunriseOrange: "#FF6B35",
  adventureYellow: "#FFD23F",
  forestGreen:   "#22A06B",
  softAmber:     "#F59E0B",
  gentleCoral:   "#F87171",

  // Text (no pure black)
  heroTitle:     "#17324D",
  heading:       "#244A68",
  bodyText:      "#36516B",
  secondaryText: "#5F7D95",

  // Sky Adventure background gradient stops
  skyTop:        "#DFF3FF",
  skyMid:        "#F7FBFF",
  skyBottom:     "#FFF8F0",

  // Future Horizon background
  horizonWarm:   "#FFF7ED",
  horizonGlow:   "#FFF0DC",

  // Dark mode
  nightSky:      "#0F172A",
  nightRaised:   "#1E293B",
  nightOverlay:  "#334155",

  // Module identity
  cockpit:       "#3B9EE8",
  pilot:         "#22A06B",
  flightPlan:    "#F59E0B",
  flightLog:     "#8B5CF6",
  futureMe:      "#EC4899",
  careerExplorer: "#0EA5E9",
  moneyQuest:    "#EAB308",
  lifeChoices:   "#6366F1",
} as const;

// ── CSS CUSTOM PROPERTY REFERENCES ───────────────────────────

/** Use these in component className/style — never raw hex values */
export const CSS_VARS = {
  color: {
    primary:        "var(--color-brand-primary)",
    secondary:      "var(--color-brand-secondary)",
    accent:         "var(--color-brand-accent)",
    success:        "var(--color-success)",
    warning:        "var(--color-warning)",
    error:          "var(--color-error)",

    textHero:       "var(--color-text-hero)",
    textHeading:    "var(--color-text-heading)",
    textBody:       "var(--color-text-primary)",
    textSecondary:  "var(--color-text-secondary)",
    textMuted:      "var(--color-text-muted)",

    surfaceBase:    "var(--color-surface-base)",
    surfaceRaised:  "var(--color-surface-raised)",
    surfaceOverlay: "var(--color-surface-overlay)",

    module: {
      cockpit:        "var(--color-module-cockpit)",
      pilot:          "var(--color-module-pilot)",
      flightPlan:     "var(--color-module-flight-plan)",
      flightLog:      "var(--color-module-flight-log)",
      futureMe:       "var(--color-module-future-me)",
      careerExplorer: "var(--color-module-career-explorer)",
      moneyQuest:     "var(--color-module-money-quest)",
      lifeChoices:    "var(--color-module-life-choices)",
    },
  },

  font: {
    sans: "var(--font-family-sans)",
  },
} as const;

// ── EXPERIENCE THEMES ─────────────────────────────────────────

export const EXPERIENCE_THEMES = {
  skyAdventure: {
    id: "sky-adventure",
    label: "Sky Adventure",
    description: "The child is the Pilot. Life is the Journey. The future is the Horizon.",
    modules: ["cockpit", "flightPlan", "flightLog", "pilot"],
    backgroundGradient: `linear-gradient(to bottom, ${BRAND_HEX.skyTop}, ${BRAND_HEX.skyMid}, ${BRAND_HEX.skyBottom})`,
    atmosphereElements: ["clouds", "horizon", "flight-path", "stars"],
  },

  journeyMap: {
    id: "journey-map",
    label: "Journey Map",
    description: "Trails, destinations, landmarks — a map the child is filling in.",
    modules: ["flightPlan", "careerExplorer"],
    atmosphereElements: ["trails", "destinations", "landmarks", "discovery-markers"],
  },

  futureHorizon: {
    id: "future-horizon",
    label: "Future Horizon",
    description: "Reserved for Future Me — sunrise, warm glow, possibility.",
    modules: ["futureMe"],
    backgroundGradient: `linear-gradient(to bottom, ${BRAND_HEX.horizonWarm}, ${BRAND_HEX.horizonGlow})`,
    atmosphereElements: ["sunrise", "warm-glow", "floating-messages", "journey-trail"],
  },
} as const;

export type ExperienceTheme = keyof typeof EXPERIENCE_THEMES;

// ── MODULE VISUAL IDENTITIES ──────────────────────────────────

export const MODULE_VISUAL = {
  cockpit: {
    colorHex:        BRAND_HEX.cockpit,
    colorName:       "Sky Blue",
    cssVar:          CSS_VARS.color.module.cockpit,
    theme:           "sky-adventure" as ExperienceTheme,
    atmosphericFeel: "alive, welcoming, journey-starting",
    forbidden:       ["KPI dashboards", "task lists", "numeric progress percentages"],
  },
  pilot: {
    colorHex:  BRAND_HEX.pilot,
    colorName: "Forest Green",
    cssVar:    CSS_VARS.color.module.pilot,
    theme:     "sky-adventure" as ExperienceTheme,
  },
  flightPlan: {
    colorHex:  BRAND_HEX.flightPlan,
    colorName: "Compass Gold",
    cssVar:    CSS_VARS.color.module.flightPlan,
    theme:     "journey-map" as ExperienceTheme,
  },
  flightLog: {
    colorHex:        BRAND_HEX.flightLog,
    colorName:       "Twilight Purple",
    cssVar:          CSS_VARS.color.module.flightLog,
    theme:           "sky-adventure" as ExperienceTheme,
    atmosphericFeel: "calm, reflective, private",
    uiRules:         ["conversation cards", "mood cards", "minimal typing", "single prompt"],
  },
  futureMe: {
    colorHex:        BRAND_HEX.futureMe,
    colorName:       "Sunrise Pink",
    cssVar:          CSS_VARS.color.module.futureMe,
    theme:           "future-horizon" as ExperienceTheme,
    atmosphericFeel: "magical, hopeful, wonder",
    uiRules:         ["floating messages", "sunrise warm glow", "no metrics", "no scores"],
  },
  careerExplorer: {
    colorHex:        BRAND_HEX.careerExplorer,
    colorName:       "Space Teal",
    cssVar:          CSS_VARS.color.module.careerExplorer,
    theme:           "journey-map" as ExperienceTheme,
    atmosphericFeel: "discoverable worlds, curiosity-inducing",
    careerWorlds:    ["Technology World", "Health World", "Law World", "Space World",
                      "Design World", "Entrepreneurship World", "Education World",
                      "Arts & Culture World"],
  },
  moneyQuest: {
    colorHex:        BRAND_HEX.moneyQuest,
    colorName:       "Treasure Gold",
    cssVar:          CSS_VARS.color.module.moneyQuest,
    theme:           "journey-map" as ExperienceTheme,
    atmosphericFeel: "adventure choices, decision paths",
    forbidden:       ["spreadsheets", "financial assessment scores", "fear-based content"],
  },
  lifeChoices: {
    colorHex:  BRAND_HEX.lifeChoices,
    colorName: "Wisdom Indigo",
    cssVar:    CSS_VARS.color.module.lifeChoices,
    theme:     "sky-adventure" as ExperienceTheme,
  },
} as const;

export type ModuleVisualId = keyof typeof MODULE_VISUAL;

// ── TYPOGRAPHY RULES ──────────────────────────────────────────

export const TYPOGRAPHY_RULES = {
  bodyMinimumPx:         16,
  lineHeightMinimum:     1.6,
  maxLineLength:         "65ch",
  casing:                "sentence-case" as const,
  prohibitedCasing:      "ALL_CAPS" as const,
  prohibitedTextColor:   "#000000",

  scale: {
    hero:         { px: 48, weight: 800, use: "XP displays, hero numbers, celebration" },
    pageTitle:    { px: 32, weight: 700, use: "Route-level page headings" },
    sectionTitle: { px: 24, weight: 600, use: "Module section headers" },
    cardTitle:    { px: 20, weight: 600, use: "Card headers" },
    body:         { px: 16, weight: 400, use: "All body copy — absolute minimum" },
    caption:      { px: 14, weight: 400, use: "Metadata, timestamps — use sparingly" },
    small:        { px: 12, weight: 400, use: "System labels only — not for content" },
  },
} as const;

// ── CARD DESIGN STANDARDS ─────────────────────────────────────

export const CARD_STANDARDS = {
  minHeight:       120,
  paddingRange:    { min: 20, max: 24 },
  borderRadiusRange: { min: 16, max: 24 },
  shadow:          "0 4px 12px 0 rgb(0 0 0 / 0.08)",
  gapMobile:       16,
  gapTabletPlus:   20,
  prohibitedRadius: 0,
} as const;

// ── BUTTON STANDARDS ──────────────────────────────────────────

export const BUTTON_STANDARDS = {
  primary:   { heightPx: 56, radiusPx: 14 },
  secondary: { heightPx: 48, radiusPx: 12 },
  tertiary:  { heightPx: 44, radiusPx: 10 },
  icon:      { sizePx: 44, radiusPx: 9999 },

  /** Adventure-appropriate button labels */
  preferredLabels: [
    "Explore", "Discover", "Continue", "Start Mission",
    "Open Message", "Reflect", "Choose Path",
    "Begin Adventure", "Keep Flying", "See What's Next",
  ],

  /** Labels that break the adventure feel — avoid */
  prohibitedLabels: [
    "Submit", "Execute", "Process", "Run",
    "Confirm Operation", "OK", "Save Record", "Apply",
  ],
} as const;

// ── TOUCH TARGET STANDARDS ────────────────────────────────────

export const TOUCH_STANDARDS = {
  minimumPx:    44,
  primaryPx:    56,
  iconButtonPx: 44,
} as const;

// ── LAYOUT STANDARDS ──────────────────────────────────────────

export const LAYOUT_STANDARDS = {
  maxContentWidth:       720,
  bottomNavHeight:       64,
  bottomNavClearancePx:  88,
  cardGapMobile:         16,
  cardGapTablet:         20,
  sectionGap:            32,

  breakpoints: {
    mobile:  768,   // < 768 → 1 column, bottom nav
    tablet:  1024,  // 768–1023 → 2 column
    desktop: 1024,  // ≥ 1024 → 3 column, sidebar
  },

  pagePaddingPx: {
    mobile:  20,
    tablet:  32,
    desktop: 40,
  },
} as const;

// ── SPACING TOKENS ────────────────────────────────────────────

/** XP-002 named spacing tokens */
export const SPACING_TOKENS = {
  xs:  4,
  s:   8,
  m:   16,
  l:   24,
  xl:  32,
  xxl: 48,
} as const;

export type SpacingToken = keyof typeof SPACING_TOKENS;

// ── ANIMATION HIERARCHY ───────────────────────────────────────

export const ANIMATION_LEVELS = {
  ambient:    { durationMs: { min: 8000, max: 20000 }, loop: true,  use: "Background atmosphere" },
  transition: { durationMs: { min: 200,  max: 400 },   loop: false, use: "Page changes, modals" },
  feedback:   { durationMs: { min: 100,  max: 300 },   loop: false, use: "User input response" },
  celebration:{ durationMs: { min: 400,  max: 1500 },  loop: false, use: "Achievement moments" },
  narrative:  { durationMs: { min: 600,  max: 2000 },  loop: false, use: "Story moments" },
} as const;

export type AnimationLevel = keyof typeof ANIMATION_LEVELS;

export const ALLOWED_ANIMATIONS = [
  "card-float",
  "cloud-drift",
  "journey-path-reveal",
  "mission-complete-reveal",
  "badge-celebration",
  "future-message-glow",
  "progress-path-animation",
  "journey-expansion",
  "xp-counter-increment",
  "particle-burst-small",
] as const;

export type AllowedAnimation = typeof ALLOWED_ANIMATIONS[number];

export const FORBIDDEN_ANIMATIONS = [
  "flashing",
  "strobing",
  "casino-spin",
  "slot-machine",
  "aggressive-movement",
  "reward-explosion",
  "attention-trap-loop",
  "manipulative-retention",
  "auto-advance",
] as const;

export type ForbiddenAnimation = typeof FORBIDDEN_ANIMATIONS[number];

// ── MICRO INTERACTIONS ────────────────────────────────────────

export const MICRO_INTERACTIONS = [
  {
    trigger:   "tap-card",
    animation: "scale 0.97→1 (spring)",
    durationMs: 120,
    easing:    "spring",
  },
  {
    trigger:   "complete-habit",
    animation: "green ripple + 3 particle burst",
    durationMs: 300,
    easing:    "ease-out",
  },
  {
    trigger:   "earn-xp",
    animation: "counter increments digit-by-digit",
    durationMs: 400,
    easing:    "ease-out",
  },
  {
    trigger:   "complete-goal",
    animation: "confetti burst (3 particles, module colour)",
    durationMs: 600,
    easing:    "ease-out",
  },
  {
    trigger:   "send-future-me-letter",
    animation: "letter floats up and fades toward horizon",
    durationMs: 800,
    easing:    "ease-in-out",
  },
  {
    trigger:   "badge-unlock",
    animation: "card flip 3D (blank → coloured, character revealed)",
    durationMs: 500,
    easing:    "ease-in-out",
  },
  {
    trigger:   "mood-selected",
    animation: "emoji scales 1.3×, background tints to mood colour",
    durationMs: 200,
    easing:    "spring",
  },
  {
    trigger:   "nav-tab-switch",
    animation: "active icon scales 1.1×, inactive dims, label slides",
    durationMs: 150,
    easing:    "ease-out",
  },
] as const;

// ── BADGE SYSTEM ──────────────────────────────────────────────

export const BADGE_CATEGORIES = [
  {
    id: "curiosity",
    label: "Curiosity",
    examples: ["First World Explored", "Curious Mind", "5 Worlds Visited"],
  },
  {
    id: "exploration",
    label: "Exploration",
    examples: ["Adventure Starter", "Path Finder", "World Traveller"],
  },
  {
    id: "kindness",
    label: "Kindness",
    examples: ["Empathy Explorer", "Heart of Gold"],
  },
  {
    id: "leadership",
    label: "Leadership",
    examples: ["Vision Setter", "Goal Keeper"],
  },
  {
    id: "responsibility",
    label: "Responsibility",
    examples: ["Mission Completer", "Promise Keeper"],
  },
  {
    id: "reflection",
    label: "Reflection",
    examples: ["Journal Starter", "Deep Thinker", "30 Days of Reflection"],
  },
  {
    id: "resilience",
    label: "Resilience",
    examples: ["Back in Flight", "New Chapter", "Bounce Back"],
  },
  {
    id: "consistency",
    label: "Consistency",
    examples: ["7-Day Flyer", "30-Day Journey", "Season Pilot"],
  },
] as const;

export type BadgeCategory = typeof BADGE_CATEGORIES[number]["id"];

export const PROHIBITED_BADGE_CATEGORIES = [
  "rankings",
  "scores",
  "comparisons",
  "performance-labels",
  "best-or-top-designations",
  "competition",
] as const;

// ── ILLUSTRATION REQUIREMENTS ─────────────────────────────────

export const ILLUSTRATION_REQUIREMENTS = {
  majorScreenElements: [
    "clouds", "stars", "maps", "paths", "trails", "mountains",
    "airplanes", "hot-air-balloons", "compasses", "horizons",
    "characters", "discovery-elements",
  ],

  screenRequirements: {
    "module-home":   "Full hero illustration (atmospheric, world-setting)",
    "mission-card":  "Character or discovery element",
    cockpit:         "Multiple ambient elements (horizon, flight indicators)",
    futureMe:        "Full atmospheric illustration (sunrise, floating letters)",
    "career-world":  "World-specific immersive illustration",
    "empty-state":   "Inviting character or adventure element — never sad icon",
    "error-state":   "Friendly character — curious, not distressed",
    "success-state": "Character celebrating, confetti, stars",
  } as Record<string, string>,

  style: {
    inspiration:  "Pixar, Disney Adventure Books, Khan Kids",
    characters:   "Diverse — gender, region, appearance",
    context:      "Indian settings and context where appropriate",
    expressions:  "Curious, optimistic, confident",
    forbidden: [
      "corporate workers",
      "office scenes",
      "stock business people",
      "enterprise graphics",
      "corporate icon packs as illustration substitutes",
    ],
  },
} as const;

// ── ACCESSIBILITY STANDARDS ───────────────────────────────────

export const ACCESSIBILITY_STANDARDS = {
  contrastRatioText:       4.5,
  contrastRatioLargeText:  3.0,
  touchTargetMinPx:        44,
  touchTargetPrimaryPx:    56,
  textScaleTestPercent:    200,
  bodyMinPx:               16,
  lineHeightMin:           1.6,
  maxLineLength:           "65ch",
  focusRingWidth:          "3px",
  focusRingColor:          BRAND_HEX.skyBlue,
  requireAriaLive:         true,
  prefersReducedMotion:    "mandatory — all animations must degrade to instant state change",
} as const;

// ── DESIGN REVIEW GATE ────────────────────────────────────────

/** XP-002 v1.0 Design Review Gate — 12 gates, all must pass.
 *  Updated: gate 2 is now "companion-present" (XP-002 v1.0). */
export const DESIGN_REVIEW_GATE = [
  { id: "hero",               question: "Does the child feel like the hero of this screen?" },
  { id: "companion-present",  question: "Is a companion present where appropriate for this module?" },
  { id: "visual-storytelling", question: "Does visual storytelling exist — illustration or journey element?" },
  { id: "mobile-first",       question: "Is this mobile-first — tested at 375px?" },
  { id: "no-erp",             question: "No ERP appearance — no tables, dense forms, corporate grey?" },
  { id: "no-dashboard",       question: "No dashboard appearance — no KPI panels, no admin layout?" },
  { id: "no-corporate",       question: "No corporate appearance — no stock imagery, enterprise patterns?" },
  { id: "curiosity",          question: "Does this create curiosity — wanting to explore more?" },
  { id: "hopeful",            question: "Does this feel hopeful in tone?" },
  { id: "parent-safe",        question: "Parent-safe — would a parent feel proud their child uses this?" },
  { id: "school-ok",          question: "School-acceptable — looks like a life skills tool, not a game?" },
  { id: "accessible",         question: "Accessible — WCAG AA, 44px touch targets, prefers-reduced-motion?" },
] as const;

export type DesignReviewGateId = typeof DESIGN_REVIEW_GATE[number]["id"];

/**
 * Run the XP-002 design review gate.
 * Returns the label of any failing gate (answered false).
 */
export function runDesignReview(answers: Partial<Record<DesignReviewGateId, boolean>>): string[] {
  return DESIGN_REVIEW_GATE
    .filter(({ id }) => answers[id] === false)
    .map(({ question }) => question);
}

// ── VISUAL REFERENCE CHECK ────────────────────────────────────

/** Design inspiration sources — use to keep aesthetic consistent */
export const VISUAL_REFERENCES = {
  inspireSources: [
    "Duolingo",
    "Headspace",
    "Khan Kids",
    "Disney Adventure Books",
    "Pixar Storytelling",
    "Adventure Journals",
    "Exploration Maps",
    "Modern Mobile Games",
  ],

  /** UI patterns to actively avoid */
  avoidSources: [
    "SAP",
    "Oracle",
    "Salesforce",
    "Jira",
    "Confluence",
    "School ERP Products",
    "Banking Apps",
    "Project Management Tools",
  ],
} as const;
