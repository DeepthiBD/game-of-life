# LifePilot

An Offline-First Life Skills Platform PWA for children and teenagers (aged 8–18) in India. Built with React + Vite, Dexie.js for offline storage, and i18next supporting 10 Indian languages.

## Run & Operate

- `pnpm --filter @workspace/lifepilot run dev` — run the LifePilot web app (port auto-assigned via PORT env)
- `pnpm --filter @workspace/lifepilot run test` — run Vitest tests
- `pnpm --filter @workspace/lifepilot run test:coverage` — run with coverage
- `pnpm --filter @workspace/lifepilot run typecheck` — TypeScript check
- `pnpm run typecheck` — full typecheck across all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite 7 + Tailwind CSS v4 + shadcn/ui components
- Routing: wouter (NOT react-router-dom — installed but not used for routing)
- Offline: Dexie.js (IndexedDB ORM) + vite-plugin-pwa + Workbox
- i18n: i18next + react-i18next with 10 Indian languages
- Testing: Vitest + @testing-library/react + jsdom
- Animations: framer-motion

## Where things live

```
artifacts/lifepilot/src/
  app/           — ErrorBoundary, AppProviders (i18n + theme + locale)
  components/
    common/      — OfflineIndicator, ThemeToggle, LanguageSwitcher
    layout/      — AppShell (shell with header + sidebar + bottom nav)
    navigation/  — Sidebar (desktop), BottomNav (mobile)
    ui/          — shadcn/ui primitives
  hooks/         — useTheme, useLocale, useOfflineStatus
  localization/
    i18n.ts      — i18next config, SUPPORTED_LANGUAGES export
    locales/     — en, hi, ta, te, kn, ml, mr, bn, gu, pa JSON files
  modules/       — Module metadata stubs (cockpit, pilot, flightplan, etc.)
  pages/         — Route-level page components (all placeholder stubs)
  storage/
    db.ts        — LifePilotDatabase (Dexie) with 30+ tables
    storageService.ts — Service layer over db.ts
  theme/
    tokens.ts    — MODULES array (id, i18nId, path, icon, color, labelKey)
  types/index.ts — All domain types + enums (35+ entities)
  utils/index.ts — cn(), formatDate, formatRelativeDate, truncate, etc.
```

## Architecture decisions

- **Offline-first**: All data lives in IndexedDB via Dexie.js. No backend required for MVP. The app works completely offline.
- **wouter over react-router-dom**: Lighter weight, simpler API. `react-router-dom` is installed (scaffold default) but `wouter` is used for all routing.
- **i18nId vs id in MODULES**: Module IDs in tokens.ts are lowercase (`flightplan`) for consistency with DOM/CSS; `i18nId` maps to the camelCase i18n key (`flightPlan`). Use `module.i18nId` when building i18n keys.
- **JSX return types**: Don't annotate component return types as `JSX.Element` (not in scope without React import). Either omit or use `React.JSX.Element`. TypeScript infers correctly from JSX.
- **vite.config.ts**: Skips PORT/BASE_PATH validation in test mode (`VITEST=true` or `NODE_ENV=test`). Tests use default port 3000.
- **Design tokens**: All colors via CSS custom properties only — never hardcode. All visible text from i18n — never hardcode strings in JSX.

## Product modules (all placeholder stubs, not yet built)

| Module | Route | i18nId | Icon |
|--------|-------|--------|------|
| Cockpit (home) | `/cockpit` | cockpit | Home |
| My Profile | `/pilot` | pilot | User |
| Flight Plan (goals) | `/flight-plan` | flightPlan | Map |
| Flight Log (journal) | `/flight-log` | flightLog | BookOpen |
| Money Quest (financial) | `/money-quest` | moneyQuest | CircleDollarSign |
| Life Choices (values) | `/life-choices` | lifeChoices | Scale |
| Career Explorer | `/career-explorer` | careerExplorer | Telescope |
| Future Me (letters) | `/future-me` | futureMe | Star |

## User preferences

_No explicit preferences set yet._

## Gotchas

- Always use `module.i18nId` (not `module.id`) when building i18n translation keys from the MODULES array in tokens.ts
- Dexie tables declared as class fields (`pilots!: Table<Pilot>`) — the `!` is required since they're set by Dexie internals
- Test mocks for Dexie must use a `class`, not a plain function — Dexie is instantiated with `new`
- PWA icons (icon-192.png, icon-512.png) need to be placed in `public/icons/` before deployment

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- Domain model: `src/types/index.ts` is the source of truth for all entity types
- Database schema: `src/storage/db.ts` maps entities to Dexie tables
- i18n source of truth: `src/localization/locales/en.json` (all other languages follow its structure)
