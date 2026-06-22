# LifePilot — Accessibility Guide

## Commitment

LifePilot is for children aged 8–18, including children with disabilities. WCAG 2.1 AA compliance is not a checkbox — it is a product quality requirement. Every UI component must be usable with a keyboard, readable by a screen reader, and visible to users with colour blindness or low vision.

---

## Standards

| Standard | Target |
|----------|--------|
| WCAG | 2.1 Level AA |
| ARIA | WAI-ARIA 1.2 |
| Keyboard navigation | Full keyboard control of all interactive elements |
| Touch targets | Minimum 44×44px (WCAG 2.5.8) |
| Colour contrast | Minimum 4.5:1 for normal text, 3:1 for large text |
| Text scaling | All text scales to 200% without loss of content |

---

## Component Accessibility Requirements

### Interactive Elements

Every button, link, and interactive control must have:
- **Accessible name**: visible label OR `aria-label` OR `aria-labelledby`
- **Role**: correct ARIA role (buttons are `<button>`, not `<div onClick>`)
- **Focus visible**: visible focus ring on keyboard focus (at least 2px, high-contrast)
- **Touch target**: minimum 44×44px clickable area

```tsx
// ✅ CORRECT
<button
  aria-label={t("accessibility.closeDialog")}
  onClick={handleClose}
  className="min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-brand"
>
  <X size={20} />
</button>

// ✗ WRONG — no accessible name, not a button
<div onClick={handleClose}>
  <X size={20} />
</div>
```

### Images and Icons

```tsx
// Decorative icon (no meaning) — hide from screen readers
<Star aria-hidden="true" />

// Meaningful icon — label it
<Star aria-label={t("accessibility.favorited")} />
```

### Forms

```tsx
// Every input must have an associated label
<label htmlFor="goal-title">{t("forms.goalTitle")}</label>
<input
  id="goal-title"
  aria-required="true"
  aria-describedby="goal-title-error"
  ...
/>
{error && (
  <p id="goal-title-error" role="alert" aria-live="polite">
    {error}
  </p>
)}
```

### Modals and Dialogs

- Use `<Dialog>` from shadcn/ui — it manages focus trapping and ARIA automatically
- `aria-modal="true"` on the dialog container
- Focus moves to dialog on open; returns to trigger on close
- Escape key always closes the dialog

### Loading States

```tsx
// Screen readers must know when content is loading
<div aria-busy="true" aria-live="polite">
  <LoadingState />
</div>

// And when it finishes
<div aria-busy="false" aria-live="polite">
  {content}
</div>
```

### Progress and Metrics

```tsx
// Progress bars need a label and value
<div
  role="progressbar"
  aria-valuenow={progress}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label={t("accessibility.goalProgress", { title: goal.title })}
>
  <div style={{ width: `${progress}%` }} />
</div>
```

---

## Colour and Contrast

- All text meets 4.5:1 contrast ratio against its background
- Never use colour alone to convey meaning — always pair with text, icon, or pattern
- All design tokens reference CSS custom properties — contrast is verified in both light and dark mode

### Testing contrast:
```bash
# Use browser DevTools Accessibility panel
# Or: pnpm pilot check accessibility
```

---

## Keyboard Navigation

| Key | Expected behaviour |
|-----|--------------------|
| `Tab` | Move focus to next interactive element |
| `Shift+Tab` | Move focus to previous interactive element |
| `Enter` / `Space` | Activate button or select option |
| `Escape` | Close modal, dialog, or dropdown |
| `Arrow keys` | Navigate within menus, tabs, or carousels |
| `Home` / `End` | First/last item in a list |

**Rule**: If an interactive element is not reachable by Tab, it is an accessibility bug.

---

## Screen Reader Support

Test with at minimum:
- **Android**: TalkBack
- **iOS**: VoiceOver
- **Desktop**: NVDA (Windows), JAWS (Windows), VoiceOver (macOS)

### Live Regions

Use `aria-live` for dynamic content changes:
```tsx
// Polite: announces when user is idle
<p aria-live="polite">{statusMessage}</p>

// Assertive: announces immediately (use sparingly — errors only)
<p aria-live="assertive" role="alert">{errorMessage}</p>
```

---

## Language and Text Direction

```tsx
// Set lang attribute on <html> when language changes
document.documentElement.lang = language; // "hi", "ta", etc.

// Use logical CSS properties for future RTL readiness
// margin-inline-start not margin-left
// padding-inline-end not padding-right
```

---

## Accessibility Checklist (per component)

Before any component is merged:

- [ ] All interactive elements have an accessible name
- [ ] All interactive elements are keyboard-reachable
- [ ] Focus ring is visible (not `outline: none`)
- [ ] Touch targets are ≥ 44×44px
- [ ] Images have `alt` text (or `aria-hidden` if decorative)
- [ ] Dynamic content uses `aria-live` appropriately
- [ ] Error messages are associated with their inputs via `aria-describedby`
- [ ] Modal/dialog traps focus and returns it on close
- [ ] Text scales to 200% without overflow or loss of content
- [ ] Contrast ratio meets 4.5:1 minimum
- [ ] No information conveyed by colour alone
