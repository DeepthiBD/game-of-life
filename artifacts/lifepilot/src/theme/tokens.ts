export const MODULES = [
  { id: "cockpit",       i18nId: "cockpit",       path: "/cockpit",         icon: "✈️", color: "hsl(217 91% 60%)", labelKey: "nav.cockpit" },
  { id: "pilot",         i18nId: "pilot",         path: "/pilot",           icon: "👤", color: "hsl(142 76% 36%)", labelKey: "nav.pilot" },
  { id: "flightplan",    i18nId: "flightPlan",    path: "/flight-plan",     icon: "🗺️", color: "hsl(32 95% 44%)",  labelKey: "nav.flightPlan" },
  { id: "flightlog",     i18nId: "flightLog",     path: "/flight-log",      icon: "📔", color: "hsl(270 76% 53%)", labelKey: "nav.flightLog" },
  { id: "moneyquest",    i18nId: "moneyQuest",    path: "/money-quest",     icon: "💰", color: "hsl(48 96% 43%)",  labelKey: "nav.moneyQuest" },
  { id: "lifechoices",   i18nId: "lifeChoices",   path: "/life-choices",    icon: "⚖️", color: "hsl(338 90% 56%)", labelKey: "nav.lifeChoices" },
  { id: "careerexplorer",i18nId: "careerExplorer",path: "/career-explorer", icon: "🔭", color: "hsl(196 92% 40%)", labelKey: "nav.careerExplorer" },
  { id: "futureme",      i18nId: "futureMe",      path: "/future-me",       icon: "🌟", color: "hsl(280 67% 55%)", labelKey: "nav.futureMe" },
] as const;

export const BOTTOM_NAV_MODULES = MODULES.slice(0, 5);

export const SPACING = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
} as const;

export const RADIUS = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  full: "9999px",
} as const;

export const ELEVATION = {
  0: "none",
  1: "0 1px 3px rgba(0,0,0,0.08)",
  2: "0 4px 8px rgba(0,0,0,0.10)",
  3: "0 8px 24px rgba(0,0,0,0.12)",
  4: "0 16px 48px rgba(0,0,0,0.16)",
} as const;
