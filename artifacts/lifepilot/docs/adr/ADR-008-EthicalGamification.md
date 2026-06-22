# ADR-008 — Ethical Gamification

**Status**: Accepted  
**Date**: June 2026  
**Deciders**: Product, Engineering  
**Binding**: Yes — this ADR supersedes any gamification pattern that conflicts with it

---

## Context

LifePilot is used by children and teenagers aged 8–18. Gamification is a powerful motivational tool, but it carries significant ethical risk when applied to this audience — especially around shame, social comparison, competitive pressure, and addictive retention mechanics.

Many apps in the education and social space use gamification patterns that are harmful:
- Streaks that punish absence ("you broke your streak!")
- Leaderboards that shame low performers while pressuring high performers
- Comparison mechanisms that make children feel inadequate
- Dark patterns designed to maximise time-in-app, not wellbeing
- Reward loops designed for addiction, not growth

LifePilot's audience — children in a critical developmental phase — are particularly vulnerable to these harms.

---

## Decision

LifePilot adopts **Ethical Gamification** as a binding architectural constraint.

The following eight principles are non-negotiable and override any product or business pressure to add engagement metrics:

---

## The Eight Principles

### 1. No Shame
> The app never communicates failure, inadequacy, or disappointment.

- No red X marks on missed habits
- No "you haven't logged in for 3 days" guilt messages
- No negative framing of any outcome
- Absence is met with a warm welcome back, never a penalty
- Missing a streak is acknowledged as "life happened — you're back now!"

**Implementation rule**: Every message about non-completion must be rewritten in positive framing before shipping.

---

### 2. No Ranking
> Children are never compared against each other.

- No leaderboards of any kind — not cohort, not class, not school
- No "top pilots" or "most active" lists
- No "you are ranked #12 in your school"
- No percentile displays ("you are in the top 20%")
- XP and levels are **private** — shown to the child only, never visible to peers

**Why this matters**: Ranking creates winners and losers. The losers — who need the most support — disengage fastest. LifePilot must work for every child, not just competitive ones.

---

### 3. No Comparison
> A child's progress is measured only against their own past self.

- "You've grown so much since last month" — not "others your age have done X"
- No peer benchmarks
- No class averages shown to students
- Parent view shows only the child's own journey — no comparisons to siblings or other children
- School view shows aggregate cohort data only (anonymised, no individual ranking)

**Implementation rule**: Any analytics or insight must compare `now vs. past self`, never `self vs. others`.

---

### 4. No Dark Patterns
> The app never uses deceptive or manipulative UI.

Prohibited dark patterns:
- False urgency ("offer expires in 10 minutes!")
- Confirmshaming ("No thanks, I don't want to grow")
- Hidden costs or locked-in flows
- Roach motel (easy in, hard out)
- Misdirection (making the "wrong" option harder to find)
- Disguised ads
- Fake social proof

**Rule**: Every UI decision must be audited against the Dark Patterns catalogue. If a pattern is identified — redesign.

---

### 5. No Addiction Loops
> The app is designed for wellbeing, not maximum time-in-app.

- Session length is never optimised as a success metric
- The app does not use variable reward schedules (slot machine mechanics)
- No infinite scroll on any feed
- No "just one more" prompts
- The app respects the child's time — sessions should feel complete and satisfying, not incomplete and hungry
- Success = child opens app with intention, does something meaningful, closes app feeling good

**Success metric**: Depth of engagement per session, not total time in app.

---

### 6. No Manipulative Streaks
> Streaks celebrate consistency — they never punish absence.

Allowed streak behaviour:
- Celebrate milestones: "7 days of flying! ✈️"
- Warm welcome back after absence: "Welcome back, Captain! Ready to continue your journey?"
- Optional streak freeze (1 per week) — no guilt attached
- Streaks are personal, private, and optional

Prohibited streak behaviour:
- "Your streak will be lost if you don't log in today!"
- Red counter showing days since last login
- Streak loss notification at night ("it's 11pm, don't break your streak!")
- Any pressure-based streak reminder

**Rule**: Streak notifications are sent at most once per day, at a time the user has set, and only if the user has explicitly opted in.

---

### 7. Encourage Growth Mindset
> Every message reinforces that ability is developed, not fixed.

Growth mindset principles embedded in LifePilot:
- Celebrate effort, not just outcomes: "You worked hard on that! ✨"
- Frame challenges as learning: "That was tough — and you learned from it"
- Mistakes are part of the journey, not failures
- "Yet" framing: "You haven't reached this goal *yet*"
- Emphasise progress over perfection
- Never use fixed-mindset language ("you're so smart", "you're not good at this")

**Language rules**:
| Fixed mindset | Growth mindset |
|--------------|----------------|
| "You're so smart!" | "You worked so hard on that!" |
| "You failed." | "You're still on your way there." |
| "I can't do this." | "I can't do this *yet*." |
| "You got it wrong." | "That was a tough one. What did you learn?" |
| "You're naturally talented." | "Your effort is paying off." |

---

### 8. Celebrate Effort
> Every meaningful attempt is acknowledged — not just completions.

- Logging a reflection is celebrated, even if short
- Starting a goal is celebrated, even if not finished
- Attempting a life choice scenario is celebrated, even if the child changes their mind
- Reading a career world earns XP — not just completing a roadmap
- Writing a Future Me letter earns XP the moment it's sent — not when it's "delivered"
- Partial habit completion is acknowledged: "You did 3 out of 5 this week — that's real progress!"

**XP award philosophy**:
- XP for opening a module (exploration reward)
- XP for logging anything (effort reward)
- XP for completing anything (completion reward)
- Completion XP is only slightly more than effort XP — effort is the core value

---

## Consequences

### Technical
- A `GamificationEthics` service validates all XP events before they're emitted to the event bus
- All notification templates are reviewed against principles 1, 6, and 7 before shipping
- No A/B tests on retention mechanics — only on learning outcomes

### Product
- The engagement north star metric is **meaningful sessions per week**, not DAU/MAU
- Streak freeze is a first-class feature, not an afterthought
- Parent dashboard never shows competitive data

### Design
- The Screen Acceptance Checklist (XP-001, Gate 1) includes ethical gamification compliance
- Any proposed leaderboard, ranking, or comparison feature requires ADR-008 exception review

---

## Rejected Alternatives

| Alternative | Reason rejected |
|------------|----------------|
| Class leaderboard (opt-in) | Even opt-in creates pressure and comparison anxiety |
| "Friendly" competitive challenges | Competition between children always creates losers |
| Streak penalties with "freeze" option | The existence of freeze implies streaks have teeth — still manipulative |
| Time-limited events | Creates urgency pressure; ruled out by principle 4 |
| Social sharing of XP/badges | Would create implicit comparison and performance anxiety |

---

## References

- XP-001 Experience & Visual Design Constitution (Gamification Rules section)
- `src/shared/constants/xp001.ts` — `GAMIFICATION_ALLOWED`, `GAMIFICATION_PROHIBITED`
- `src/shared/constants/ethics.ts` — detailed ethics implementation constants
- Carol Dweck — Growth Mindset research
- Nir Eyal — Hook Model (studied to avoid, not implement)
- Dark Patterns catalogue — darkpatterns.org
