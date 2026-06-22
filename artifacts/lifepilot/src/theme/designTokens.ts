// ============================================================
// LIFEPILOT — DESIGN TOKEN SYSTEM
// All visual tokens for the LifePilot design system.
// Values map to CSS custom properties defined in index.css.
// Never use raw values in components — always reference tokens.
// ============================================================

// ── COLOR TOKENS ──────────────────────────────────────────────

export const COLOR = {
  // Brand
  brand: {
    primary:    "var(--color-brand-primary)",
    secondary:  "var(--color-brand-secondary)",
    accent:     "var(--color-brand-accent)",
  },

  // Module palette — each module has a distinct identity
  module: {
    cockpit:        "var(--color-module-cockpit)",
    pilot:          "var(--color-module-pilot)",
    flightPlan:     "var(--color-module-flight-plan)",
    flightLog:      "var(--color-module-flight-log)",
    futureMe:       "var(--color-module-future-me)",
    moneyQuest:     "var(--color-module-money-quest)",
    careerExplorer: "var(--color-module-career-explorer)",
    lifeChoices:    "var(--color-module-life-choices)",
  },

  // Semantic
  semantic: {
    success:  "var(--color-success)",
    warning:  "var(--color-warning)",
    error:    "var(--color-error)",
    info:     "var(--color-info)",
  },

  // Surface
  surface: {
    base:     "var(--color-surface-base)",
    raised:   "var(--color-surface-raised)",
    overlay:  "var(--color-surface-overlay)",
    sunken:   "var(--color-surface-sunken)",
  },

  // Text
  text: {
    primary:   "var(--color-text-primary)",
    secondary: "var(--color-text-secondary)",
    muted:     "var(--color-text-muted)",
    inverse:   "var(--color-text-inverse)",
    disabled:  "var(--color-text-disabled)",
  },

  // Border
  border: {
    default: "var(--color-border-default)",
    subtle:  "var(--color-border-subtle)",
    strong:  "var(--color-border-strong)",
    focus:   "var(--color-border-focus)",
  },

  // Mood — used in reflection/wellbeing features
  mood: {
    1: "var(--color-mood-1)",   // very low
    2: "var(--color-mood-2)",
    3: "var(--color-mood-3)",
    4: "var(--color-mood-4)",
    5: "var(--color-mood-5)",   // neutral
    6: "var(--color-mood-6)",
    7: "var(--color-mood-7)",
    8: "var(--color-mood-8)",
    9: "var(--color-mood-9)",
    10: "var(--color-mood-10)", // very high
  },
} as const;

// ── TYPOGRAPHY TOKENS ─────────────────────────────────────────

export const TYPOGRAPHY = {
  fontFamily: {
    sans:  "var(--font-family-sans)",
    serif: "var(--font-family-serif)",
    mono:  "var(--font-family-mono)",
  },

  fontSize: {
    xs:   "var(--font-size-xs)",    // 12px
    sm:   "var(--font-size-sm)",    // 14px
    base: "var(--font-size-base)",  // 16px
    md:   "var(--font-size-md)",    // 18px
    lg:   "var(--font-size-lg)",    // 20px
    xl:   "var(--font-size-xl)",    // 24px
    "2xl": "var(--font-size-2xl)", // 30px
    "3xl": "var(--font-size-3xl)", // 36px
    "4xl": "var(--font-size-4xl)", // 48px
  },

  fontWeight: {
    regular:   "400",
    medium:    "500",
    semibold:  "600",
    bold:      "700",
    extrabold: "800",
  },

  lineHeight: {
    tight:   "1.25",
    snug:    "1.375",
    normal:  "1.5",
    relaxed: "1.625",
    loose:   "2",
  },

  letterSpacing: {
    tight:  "-0.025em",
    normal: "0em",
    wide:   "0.025em",
    wider:  "0.05em",
    widest: "0.1em",
  },
} as const;

// ── SPACING TOKENS ────────────────────────────────────────────

export const SPACING = {
  0:   "0px",
  px:  "1px",
  0.5: "2px",
  1:   "4px",
  1.5: "6px",
  2:   "8px",
  2.5: "10px",
  3:   "12px",
  3.5: "14px",
  4:   "16px",
  5:   "20px",
  6:   "24px",
  7:   "28px",
  8:   "32px",
  9:   "36px",
  10:  "40px",
  12:  "48px",
  14:  "56px",
  16:  "64px",
  20:  "80px",
  24:  "96px",
  32:  "128px",
  40:  "160px",
  48:  "192px",
  56:  "224px",
  64:  "256px",
} as const;

// ── RADIUS TOKENS ─────────────────────────────────────────────

export const RADIUS = {
  none:  "0px",
  sm:    "4px",
  base:  "6px",
  md:    "8px",
  lg:    "12px",
  xl:    "16px",
  "2xl": "20px",
  "3xl": "24px",
  full:  "9999px",
} as const;

// ── SHADOW TOKENS ─────────────────────────────────────────────

export const SHADOW = {
  none: "none",
  xs:   "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  sm:   "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md:   "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg:   "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl:   "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl":"0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner:"inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
} as const;

// ── ELEVATION TOKENS ──────────────────────────────────────────
// Elevation combines shadow + z-index for consistent layering.

export const ELEVATION = {
  ground:   { shadow: SHADOW.none, zIndex: 0 },
  raised:   { shadow: SHADOW.sm,   zIndex: 1 },
  floating: { shadow: SHADOW.md,   zIndex: 10 },
  overlay:  { shadow: SHADOW.lg,   zIndex: 20 },
  modal:    { shadow: SHADOW.xl,   zIndex: 30 },
  toast:    { shadow: SHADOW["2xl"], zIndex: 40 },
  tooltip:  { shadow: SHADOW.md,   zIndex: 50 },
} as const;

// ── MOTION TOKENS ─────────────────────────────────────────────

export const MOTION = {
  duration: {
    instant:  "0ms",
    fast:     "100ms",
    base:     "200ms",
    moderate: "300ms",
    slow:     "500ms",
    slower:   "700ms",
    slowest:  "1000ms",
  },

  easing: {
    linear:      "linear",
    easeIn:      "cubic-bezier(0.4, 0, 1, 1)",
    easeOut:     "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut:   "cubic-bezier(0.4, 0, 0.2, 1)",
    spring:      "cubic-bezier(0.34, 1.56, 0.64, 1)",
    anticipate:  "cubic-bezier(0.36, 0, 0.66, -0.56)",
  },

  // Framer Motion presets
  framer: {
    fadeIn:   { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
    slideUp:  { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } },
    slideIn:  { initial: { opacity: 0, x: -16 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 16 } },
    scaleIn:  { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 } },
    popIn:    { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 20 } } },
  },
} as const;

// ── BREAKPOINT TOKENS ─────────────────────────────────────────

export const BREAKPOINTS = {
  sm:  "640px",   // small phones
  md:  "768px",   // tablets (portrait)
  lg:  "1024px",  // tablets (landscape) / small laptops
  xl:  "1280px",  // desktops
  "2xl": "1536px", // large desktops
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

// ── TOUCH TARGET TOKENS ───────────────────────────────────────
// Minimum tap target size per WCAG 2.5.8 (24×24px recommended minimum; 44×44px ideal)

export const TOUCH = {
  minimum: "24px",
  standard: "44px",
  comfortable: "48px",
  large: "56px",
} as const;

// ── Z-INDEX TOKENS ────────────────────────────────────────────

export const Z_INDEX = {
  hide:     -1,
  auto:     "auto",
  base:     0,
  raised:   1,
  dropdown: 10,
  sticky:   20,
  overlay:  30,
  modal:    40,
  popover:  50,
  toast:    60,
  tooltip:  70,
} as const;
