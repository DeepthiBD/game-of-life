# ADR-010 — Child Psychology & Development Principles

**Status**: Accepted  
**Date**: June 2026  
**Binding**: Yes — mandatory for all modules  
**Related**: XP-004, ADR-008 (Ethical Gamification), ADR-009 (Parent Trust)

---

## Context

LifePilot is used by children aged 8–18 during a critical period of identity formation, self-esteem development, and future orientation. Design and product decisions that seem neutral for adult users can have outsized impact on children — both positive and negative.

Specific risks for child-facing digital products:
- Fixed mindset reinforcement through performance scoring
- Self-esteem damage through shame, comparison, and ranking
- Motivation undermining through external reward dependency
- Unrealistic future predictions that create anxiety or false certainty
- Emotional manipulation through AI or dark patterns
- Screen time dependency that displaces real-world growth

XP-004 establishes 16 binding developmental rules that prevent these harms and actively support healthy development.

---

## Decision

All 16 rules in XP-004 are adopted as binding constraints. They are encoded in `src/shared/constants/psychology.ts` and integrated into the Screen Acceptance Checklist.

---

## Implementation Decisions per Rule

### Rule 1 — Growth Mindset
**Architecture**: All XP messages, mission completions, and feedback strings are reviewed against `GROWTH_MINDSET.prohibited` in `ethics.ts`. Fixed-mindset language triggers a mandatory copy rewrite.

**Product**: No "talent" indicators. No innate ability claims. Every skill shown in Career Explorer is framed as learnable.

---

### Rule 2 — No Shame
**Architecture**: `PROHIBITED_COPY_WORDS` in `copy.ts` enforces this at the constant level. No red indicators on missed actions. Empty states are invitations, not failure notices.

**Design**: Missed habits → warm invitation back. Broken streaks → "new chapter" framing. Incomplete goals → "still in flight" framing.

---

### Rule 3 — No Comparison
**Architecture**: `COMPARISON_RULES.prohibited` in `trust.ts` defines all prohibited comparison types. No cross-pilot queries are permitted in child-facing code. Parent and school views show aggregate data only.

**Product**: XP totals and pilot levels are private — never visible to peers, teachers, or in any multi-child view.

---

### Rule 4 — Autonomy
**Architecture**: No parent-assigned goals, missions, or prompts. No teacher-forced content. All content entry is child-initiated.

**Data**: Deletion is always available and immediate. Children can reset their journey. No lock-in.

**Product**: "Suggested" content is always framed as discovery, never as assignment.

---

### Rule 5 — Intrinsic Motivation
**Architecture**: `XP_REASONS` in `ethics.ts` weights exploration and effort XP at 40–65% of completion XP. Discovery is rewarded equally to achievement.

**Product**: No streak pressure. No fear of losing progress. No artificial urgency. Variable reward (slot machine) mechanics permanently prohibited (`PROHIBITED_XP_PATTERNS`).

---

### Rule 6 — Self-Efficacy
**Architecture**: Every error message includes a recovery action. Every incomplete state has a "try again" path. No dead ends.

**Content**: Mission descriptions use "you can" and "you'll discover" framing. Career Explorer uses "you could become" not "you should become".

**Copy rule**: Self-efficacy language is enforced via `SELF_EFFICACY_PHRASES` in `psychology.ts`.

---

### Rule 7 — Future Orientation
**Architecture**: Future Me is a first-class module, not an optional add-on. Every module in the Cockpit includes at least one future-linking element.

**Copy rule**: Future-linking prompts are required in reflection prompt banks (`REFLECTION_PROMPTS.futureLinking`).

**Prohibited**: Deterministic language — "you will become", "you are destined for", "your future is X".

---

### Rule 8 — Decision Making
**Architecture**: Life Choices and Money Quest are built on scenario-based learning — choices → consequences → reflection. No didactic lecturing.

**Design rule**: Consequence reveals are visual and narrative — never text-wall explanations of why the child was wrong.

**Copy rule**: Outcome reveals use "here's what happened" framing, not "the correct answer was".

---

### Rule 9 — Resilience
**Architecture**: Setback states (missed goals, broken habits, low mood) are explicitly designed as recovery moments, not failure moments.

**Copy rule**: All setback-adjacent copy is reviewed against `RESILIENCE_PHRASES` in `psychology.ts`.

**Design**: Streaks reset to "new chapter" — never "you lost your streak". Goals "paused" or "course changed" — never "abandoned" in visible UI.

---

### Rule 10 — Emotional Safety
**Architecture**: Flight Log content is private by default (`PrivacyLevel.PRIVATE`). No content is ever transmitted without explicit child consent.

**Design**: Reflection prompts are gentle and non-pressuring. No minimum word counts. No required fields in reflections. "Not feeling it today? That's okay." is always an option.

**Copy rule**: All child-facing copy is reviewed against the 5-question Child Experience Check.

---

### Rule 11 — Career Exploration
**Architecture**: Careers are presented as worlds to explore — not as predictions or assignments. Career Roadmaps are framed as "one possible path" — not "the path".

**Copy rule**: Career copy never uses certainty language ("you'll be a doctor") — always possibility language ("you could explore medicine").

**Product**: No career aptitude tests. No "you are suited to X" outputs. Exploration only.

---

### Rule 12 — Financial Literacy
**Architecture**: Money Quest uses scenario-based decision making — never textbook financial instruction. Concepts are introduced through stories and choices.

**Copy rule**: No fear-based money messaging ("if you don't save, you'll be poor"). Empowerment framing only ("every small choice builds your future").

---

### Rule 13 — Reflection
**Architecture**: All reflection prompts are optional. No minimum reflection length. No required daily reflection frequency. Prompts rotate — never repeat two days in a row.

**Design**: Flight Log interface is conversational (single prompt, large text area, warm visual) — not form-like.

**Copy rule**: Reflection prompts must pass the "trusted friend" test — would a trusted friend ask this? If not, rewrite.

---

### Rule 14 — Future Me
**Architecture**: Future Me letters are the child's private property. Never transmitted without consent. No AI reads or analyses letter content.

**Copy rule**: Future Me copy never uses outcome-predicting language. Letters are always framed as "a moment of connection with your future self" — not as goal commitments or performance contracts.

**Design**: Future Me is magical, not transactional.

---

### Rule 15 — AI Safety
**Architecture**: `SAFE_AI.prohibited` in `trust.ts` defines all prohibited AI behaviours. AI features (Wave 6+) require a Safety Review before shipping.

**Crisis protocol**: Distress signals trigger a static helpline display — never AI counselling.

**Data boundary**: AI has no access to content from other children. No cross-child inference.

---

### Rule 16 — Screen Time Philosophy
**Architecture**: Session completion is designed in — natural stopping points exist in every module. No infinite scroll. No "just one more" prompts.

**Product north star**: `ETHICAL_METRICS.primaryNorthStar = "meaningful_sessions_per_week"` — not time-in-app.

**Copy rule**: App copy encourages real-world action: "Try this in real life", "Talk to a family member about this", "Write about this in your own notebook".

---

## Consequences

### All modules
- Every new module must be reviewed against all 16 rules before Wave approval
- Module Approval Checklist (XP-005 Part 9) extended with Psychology Gate

### Content
- Mission content reviewed by a child development lens before shipping
- Reflection prompts reviewed against Rules 2, 3, 10, 13 specifically

### AI (Wave 6+)
- AI Coach design document must address each of the 16 rules explicitly before implementation begins

---

## References
- XP-004 Child Psychology & Development Principles (source)
- `src/shared/constants/psychology.ts`
- ADR-008 Ethical Gamification
- ADR-009 Parent Trust Framework
- Carol Dweck — Growth Mindset (2006)
- Bandura — Self-Efficacy: The Exercise of Control (1997)
- Ryan & Deci — Self-Determination Theory (intrinsic motivation)
- Seligman — Learned Optimism / Positive Psychology
- India NCPCR Guidelines on Child Digital Safety
