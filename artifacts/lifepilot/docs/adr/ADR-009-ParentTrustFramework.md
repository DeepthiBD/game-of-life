# ADR-009 — Parent Trust Framework

**Status**: Accepted  
**Date**: June 2026  
**Deciders**: Product, Engineering, Leadership  
**Binding**: Yes — overrides growth-hacking, engagement, retention, and monetization decisions  
**Related**: XP-005, ADR-008 (Ethical Gamification)

---

## Context

LifePilot is used by children aged 8–18. Their parents are the primary trust relationship — they decide whether the app is installed, how long it is used, whether they recommend it to other families, and whether they allow their child to engage deeply with it.

Trust, once lost with parents, is unrecoverable for a child-safety platform. A single privacy scandal, manipulative mechanic, or perceived exploitation destroys years of goodwill.

The parent trust decision is not a marketing problem. It is an **architecture problem**. The product must be designed from the ground up to deserve trust — not to perform it.

---

## Decision

LifePilot adopts the **Parent Trust Framework (XP-005)** as a binding architectural and product constraint. All ten principles are non-negotiable.

---

## The Ten Principles

### 1 — Privacy First (Architecture)

**Decision**: Child content is private by default at the data layer — not just the UI layer.

Implementation:
- `Reflection`, `FlightLogEntry`, and `FutureLetter` records are **never** transmitted in raw form
- No third-party analytics SDKs in the child-facing app (no Firebase Analytics, Mixpanel, Amplitude)
- Event bus events that touch child content are **never** sent to external services without explicit aggregation and anonymisation
- A `PrivacyLevel` enum exists on all child-content entities: `private | shared_with_parent | shared_with_school`
- Default: `private` — parent sharing requires explicit child opt-in (not parent override)

**Why**: Privacy is a trust feature. If parents believe the app is surveilling their child, they remove it. If children believe their journal is visible to parents/teachers, they stop being honest. Both outcomes destroy the product's value.

---

### 2 — Offline First (Architecture)

**Decision**: The offline-first architecture established in ADR-002 is reaffirmed here as a **trust feature**, not just a technical feature.

Commitment:
- All core functionality works with zero network connectivity
- The app does not require a network connection to display previously saved data
- Sync (when added, Wave 2+) is transparent: the user sees exactly what will be synced and when

**Framing for parents**: "Everything your child saves stays on their device. Nothing leaves without your knowledge."

---

### 3 — No Social Comparison (Product)

**Decision**: No feature may compare one child to another, in any view, at any level.

Scope:
- Child view: zero peer data visible
- Parent view: single-child view only — no sibling comparisons
- School view: aggregate cohort data only, anonymised, no individual ranking
- Teacher view: class progress totals only — individual names never ranked

No exceptions. No "opt-in leaderboards". No "friendly challenges between classmates."

---

### 4 — No Manipulative Retention (Product + Engineering)

**Decision**: Retention mechanics that exploit psychological vulnerabilities are permanently prohibited.

Engineering gate: The `PROHIBITED_DARK_PATTERNS` and `PROHIBITED_XP_PATTERNS` constants in `ethics.ts` define the prohibited list. Any new feature that resembles a prohibited pattern requires a written exception reviewed by the founding team.

Notification architecture:
- All notifications are opt-in (user must explicitly enable)
- Maximum 1 per day
- Delivery window: morning only (7–12), user-configurable
- Emergency removal: unsubscribe from all notifications in ≤2 taps

---

### 5 — Growth Over Performance (Content + i18n)

**Decision**: All copy, prompts, XP messages, and notifications are reviewed against the growth mindset language rules in `ethics.ts` (`GROWTH_MINDSET.prohibited`).

This is enforced in:
- Content review (every new string in `en.json`)
- Notification copy review (before any notification template is shipped)
- In-app celebration messages (XP earn, level up, badge unlock)

---

### 6 — Future-Oriented Optimism (UX)

**Decision**: Every module must end with an optimistic forward-looking element.

Examples:
- Flight Log: "What are you looking forward to tomorrow?"
- Career Explorer: "Where could this path take you in 5 years?"
- Money Quest: "Imagine what Future You will think of this choice."
- Life Choices: "What does this tell you about who you're becoming?"

Screens that end on a neutral or backward-looking note are redesigned before shipping.

---

### 7 — Parents Are Co-Pilots (Feature Architecture)

**Decision**: The Parent (CoPilot) experience is a **separate, distinct interface** — not a window into the child's private space.

CoPilot view (Wave 2) will:
- Show **summary** information only (activity levels, not content)
- Offer **conversation starter cards** ("Ask your child what they discovered in Career Explorer today")
- Never show raw reflections, journal entries, or Future Me letters unless the child explicitly shares
- Have its own visual language (calm, information-rich, adult) — not the child's adventure visual

Parent is never shown:
- Journal entry text
- Future Me letter content
- Life Choices scenario answers
- Mood ratings (unless child shares)

---

### 8 — Child Autonomy (UX + Data)

**Decision**: Children control their own experience. Adults observe, not override.

- Children set their own goals — no parent-assigned goals
- Children choose their own journal prompts — no parent-set prompts
- Children control privacy of their content — parents cannot override to `public`
- Children can delete their own content — deletion is immediate and permanent
- Children can pause or disable any notification — no parental lock on notification settings

Exception: Account creation for under-13 requires parental consent (DPDP compliance, Wave 1+).

---

### 9 — Safe AI Principles (Future Architecture)

**Decision**: AI features (Wave 6+) must be designed within the Safe AI boundaries defined in XP-005.

Allowed AI behaviours:
- Guide: suggest a next step on a learning path
- Encourage: celebrate a reflection or effort
- Educate: explain a concept in age-appropriate language
- Clarify: help a child understand a scenario or choice
- Reflect: ask a question that helps the child think deeper

Prohibited AI behaviours:
- Diagnose: "Based on your responses, you may have anxiety"
- Label: "You are a visual learner" (fixed label)
- Predict: "At your current rate, you will achieve X by age 20"
- Replace: "Tell me your problems, I'm your friend" (dependency creation)
- Manipulate: any conversational dark pattern

AI safety review is required for every new AI feature before Wave 6 implementation.

---

### 10 — Parent Transparency (Communication + Legal)

**Decision**: The Privacy Policy and in-app transparency disclosures are written in plain language accessible to a non-technical Indian parent.

Transparency requirements:
- In-app: "Where is my child's data?" — answered in plain language in Settings
- At account creation: clear explanation of what is stored, where, and who can see it
- At every sync event (Wave 2+): notification of what was synced
- At account deletion: confirmation that all data is permanently removed

---

## Monetization Architecture

### Allowed revenue streams

| Stream | Trust rationale |
|--------|----------------|
| Premium content packs | Value exchange — content for payment. No data exchange. |
| Premium learning paths | Same as above |
| Family Pack (multi-child) | Supports family use — does not compromise privacy |
| School Program licence | Institutional sale — individual child data never used for revenue |
| Premium experiences | Functional enhancement — no manipulative upsell |

### Prohibited revenue streams

| Stream | Why prohibited |
|--------|---------------|
| Selling child data | Core trust violation. Permanent prohibition. |
| Advertising networks | Behaviour profiling to serve ads violates Principle 1 |
| Behavioural advertising | Same |
| Manipulative upsells | Violates Principle 4 |
| Pay-to-progress | Creates unfair access based on family wealth; violates Principle 8 (child autonomy) |

**Rule**: No revenue mechanism may involve the exchange or use of individual child data. Aggregated, anonymised, non-identifiable analytics may be used internally for product improvement only.

---

## Consequences

### Technical
- `PrivacyLevel` enum added to all child-content Dexie tables (Wave 1 database migration)
- No third-party analytics SDKs permitted in `artifacts/lifepilot/` package
- All sync architecture (Wave 2) must include explicit user consent at the field level
- `src/shared/constants/trust.ts` defines all trust-related constants, privacy defaults, and monetization rules

### Product
- The Parent (CoPilot) view is a separate product surface — never a "parent tab" in the child app
- School Edition analytics are aggregated server-side before any report is delivered
- AI features require a Safe AI review board sign-off before shipping

### Design
- Screen Acceptance Checklist (XP-001 Gate 1) extended with the 10-item Trust Review from XP-005
- Any feature that creates parent anxiety fails the gate immediately

---

## Rejected Alternatives

| Alternative | Reason rejected |
|------------|----------------|
| Parent can view child journal (opt-in) | Child will self-censor, destroying journal value. Trust of child lost. |
| Opt-in leaderboard | Creates social pressure even for those who opt out (see ADR-008) |
| Behavioural analytics (anonymised) | Slippery slope — anonymisation is reversible at scale. Not trusted. |
| "Family sharing" of achievements | Implicit comparison between siblings. Violates Principle 3. |
| AI emotional assessment | Prohibited by Principle 9. Labelling children. |

---

## References

- XP-005 Parent Trust Framework (source document)
- ADR-008 Ethical Gamification
- XP-001 Experience & Visual Design Constitution
- `src/shared/constants/trust.ts`
- India DPDP Act 2023 — child data protection requirements
