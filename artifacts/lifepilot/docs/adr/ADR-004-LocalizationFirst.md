# ADR-004 — Localisation-First Development

**Status**: Accepted  
**Date**: June 2026  
**Deciders**: Engineering Lead, Product Lead, Architecture Review Board  
**Wave**: 0 (Foundation)

---

## Context

LifePilot serves children across India — a country with 22 officially recognised languages and hundreds of dialects. The platform must be meaningful and accessible in the language a child thinks and speaks in, not just in English. Starting with English and "adding translations later" is not acceptable — it leads to untranslatable hardcoded strings, structural assumptions baked into the UI, and a product that feels like a translation of an English product rather than something native.

---

## Decision

**Localisation is a first-class concern from day one.** No user-visible string is ever hardcoded in JSX. All strings live in locale files. The i18n architecture is established in Wave 0 and never treated as optional.

---

## Languages Supported at Launch

| Code | Language |
|------|----------|
| `en` | English |
| `hi` | Hindi |
| `ta` | Tamil |
| `te` | Telugu |
| `kn` | Kannada |
| `ml` | Malayalam |
| `mr` | Marathi |
| `bn` | Bengali |
| `gu` | Gujarati |
| `pa` | Punjabi |

These 10 languages together cover > 90% of India's literate population.

---

## Rationale

**Why 10 languages from day one (not progressive)**:
- Writing i18n-compatible code from scratch is a one-time cost. Retrofitting a non-i18n codebase with i18n is 10× more expensive and produces subtle bugs.
- Every component built with `t("key")` is localisation-ready without further changes.
- Educational equity: a child in Tamil Nadu reading about career paths in their mother tongue is more likely to engage and retain than a child reading a translation of an English-first product.

**Why i18next**:
- Industry standard with the largest ecosystem of plugins and React integration (react-i18next)
- Supports all required features: interpolation, pluralisation, namespaces, lazy locale loading
- Zero-dependency fallback: if a key is missing in a locale, it falls back to English automatically

---

## Rules Enforced

1. **No hardcoded user-visible strings in JSX** — ESLint rule enforced
2. **English (`en.json`) is the source of truth** — all other locales mirror its structure
3. **Always use `module.i18nId` (not `module.id`)** when building i18n keys from the MODULES array
4. **`pnpm pilot check i18n`** runs before every release to detect missing keys across all 10 locales
5. **Locale files are flat JSON** — no JavaScript, no dynamic keys — enables static analysis

---

## Typography Considerations

Different scripts require different line heights, font metrics, and text rendering:
- **Devanagari** (Hindi, Marathi): Taller script — `line-height: 1.6` minimum
- **Tamil, Telugu, Kannada, Malayalam**: Complex scripts — system fonts preferred; avoid custom fonts that don't include all glyphs
- **Bengali, Gujarati, Punjabi**: Similar to Devanagari in height requirements
- **English**: Standard Latin metrics

The CSS variable `--font-family-sans` references a font stack that gracefully falls back to the OS system font for each script.

---

## Content Localisation (beyond UI strings)

Wave 1 scope: UI strings only (navigation, labels, messages, error text).

Wave 2+ scope: Content localisation — reflection prompts, mission content, career descriptions — will be stored in the `LocalizedContent` Dexie table and delivered via the `ContentRevision` system.

---

## Consequences

**Positive**:
- Every component built from Wave 0 is localisation-ready
- Adding new languages in future requires only adding a new JSON locale file — no code changes
- Better user engagement for non-English speakers
- Complies with Digital India accessibility expectations

**Negative**:
- Additional effort to maintain all 10 locale files (mitigated by `pilot check i18n`)
- Some UI layouts need extra space for longer translations (Hindi/Tamil text is often longer than English)

**Mitigations**:
- All layouts use flex/grid — they accommodate variable text lengths without fixed-width assumptions
- `pilot check i18n` CI gate prevents partial translations from shipping

---

## Review

Next review: Wave 2. At that point, content localisation (not just UI string localisation) will be addressed in a separate ADR.
