# LifePilot — Localization Guide

## Overview

LifePilot supports 10 Indian languages from day one. Every piece of user-visible text is i18n-controlled — no hardcoded strings in JSX. This is enforced at code review and by ESLint rules.

---

## Supported Languages

| Code | Language | Script |
|------|----------|--------|
| `en` | English | Latin |
| `hi` | Hindi | Devanagari |
| `ta` | Tamil | Tamil |
| `te` | Telugu | Telugu |
| `kn` | Kannada | Kannada |
| `ml` | Malayalam | Malayalam |
| `mr` | Marathi | Devanagari |
| `bn` | Bengali | Bengali |
| `gu` | Gujarati | Gujarati |
| `pa` | Punjabi | Gurmukhi |

---

## Architecture

```
src/localization/
  i18n.ts              — i18next configuration, SUPPORTED_LANGUAGES export
  locales/
    en.json            — SOURCE OF TRUTH: English translations
    hi.json
    ta.json
    te.json
    kn.json
    ml.json
    mr.json
    bn.json
    gu.json
    pa.json
```

`en.json` is the canonical source. All other locale files must mirror its structure exactly.

---

## Using i18n in Components

```typescript
import { useTranslation } from "react-i18next";

function CockpitPage() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("modules.cockpit.name")}</h1>
      <p>{t("modules.cockpit.welcome", { name: pilot.name })}</p>
    </div>
  );
}
```

### With interpolation
```typescript
t("modules.cockpit.welcome", { name: "Priya" })
// → "Welcome back, Priya!"
```

### With pluralisation
```typescript
t("goals.count", { count: 3 })
// en: "3 goals"
// → key: "goals.count": "{{count}} goal" + "goals.count_plural": "{{count}} goals"
```

---

## i18n Key Conventions

Keys follow a dot-separated hierarchy:

```
app.*          — global app labels (app.name, app.loading, app.error)
nav.*          — navigation items (nav.cockpit, nav.flightPlan)
modules.*      — module-level strings (modules.cockpit.name, modules.cockpit.welcome)
common.*       — shared UI labels (common.save, common.cancel, common.delete)
forms.*        — form labels and validation messages
errors.*       — error messages
accessibility.*— screen reader labels
```

---

## Module i18n Mapping

The `MODULES` array in `src/theme/tokens.ts` uses `i18nId` (camelCase) for building i18n keys, not `id` (lowercase). Always use `module.i18nId`:

```typescript
// ✅ CORRECT
const label = t(`modules.${module.i18nId}.name`);

// ✗ WRONG — module.id is lowercase ("flightplan"), not the i18n key
const label = t(`modules.${module.id}.name`);
```

---

## Adding a New Translation Key

1. Add the key to `en.json` first (English is the source of truth)
2. Add the same key to all 9 other locale files
3. Run `pnpm pilot check i18n` to verify all locales are complete

```json
// en.json
{
  "modules": {
    "cockpit": {
      "name": "Cockpit",
      "newKey": "My new string"  // ← add here first
    }
  }
}
```

Then add to all other locale files. Use the English value as a fallback if translation is not yet available — but mark it with a `// TODO` comment in the code review.

---

## Language Selection

Language is:
1. Persisted to `localStorage` under key `lp_lang`
2. Read on app startup in `useLocale()` hook
3. Default: device browser language if supported; otherwise English

```typescript
// useLocale hook
const { language, setLanguage, supportedLanguages } = useLocale();

// Change language
setLanguage("hi"); // switches UI to Hindi
```

---

## Right-to-Left (RTL) Support

No current supported language is RTL. RTL support (for Arabic, Urdu) is a Wave 3+ consideration. The CSS architecture uses logical properties (`margin-inline-start` not `margin-left`) to prepare for RTL without requiring a future rewrite.

---

## i18n in Tests

Tests use a standard mock that returns the key as the translation value:

```typescript
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: "en" },
  }),
  Trans: ({ i18nKey }: { i18nKey: string }) => i18nKey,
}));
```

This means assertions check translation keys, not translated text:
```typescript
expect(screen.getByText("modules.cockpit.name")).toBeInTheDocument();
```
