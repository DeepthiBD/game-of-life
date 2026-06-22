# LifePilot — Ethical Gamification Guide

**Version**: 1.0 | **Date**: June 2026  
**Authority**: ADR-008 (binding)  
**For**: Engineers, designers, product managers, content writers

---

## The One Rule

> **LifePilot gamification exists to serve the child's growth — not to serve engagement metrics.**

Every gamification decision flows from this rule. When in doubt, ask: *"Does this serve the child's growth, or does this serve the app's retention?"*

If the answer is retention → do not ship it.

---

## The Eight Principles (Quick Reference)

| # | Principle | One-line rule |
|---|-----------|--------------|
| 1 | **No Shame** | Absence and failure are never punished — only welcomed back |
| 2 | **No Ranking** | Children are never compared to each other |
| 3 | **No Comparison** | Progress is always measured against the child's own past self |
| 4 | **No Dark Patterns** | No manipulative UI, false urgency, or deceptive design |
| 5 | **No Addiction Loops** | Designed for wellbeing, not maximum time-in-app |
| 6 | **No Manipulative Streaks** | Streaks celebrate — they never punish |
| 7 | **Growth Mindset** | Effort and progress are celebrated over outcomes and talent |
| 8 | **Celebrate Effort** | Every meaningful attempt earns recognition |

---

## Principle 1 — No Shame

### What shame looks like (never do this)

```
❌ "You missed 3 days of journalling."
❌ "Your streak has been broken."
❌ "You haven't completed any goals this week."
❌ "You're falling behind."
❌ "Only 10% progress on your flight plan."
```

### What no-shame looks like (always do this)

```
✅ "Welcome back, Captain! Your journey continues."
✅ "Life happened — and you're here now. That counts."
✅ "Ready to log something? Even one thought matters."
✅ "Your flight plan is waiting. Pick it up whenever you're ready."
```

### Implementation checklist
- [ ] No red indicators on missed habits or goals
- [ ] No negative counters ("3 days without logging")
- [ ] Welcome-back messages are warm and neutral — no guilt framing
- [ ] Empty states are invitations, not notices of absence
- [ ] Error messages never blame the user

---

## Principle 2 — No Ranking

### What ranking looks like (never do this)
```
❌ Leaderboard showing top 10 pilots in the school
❌ "You are #12 in your class"
❌ "Top Explorer this week: Priya"
❌ "Most missions completed: Arjun (47)"
❌ Class dashboard showing individual student rankings
```

### What no-ranking looks like (always do this)
```
✅ "You've completed 12 missions this month — that's your personal best!"
✅ School cohort view: "Class 8B — 85 missions completed this week" (anonymous total, no ranking)
✅ Parent view: "Priya's journey this month..." (private, personal)
```

### Data rules
- XP totals are **private** — never visible to peers
- Level badges are **private** — never shown on any shared view
- School analytics show **aggregate totals only** — no individual ranking ever
- Parent view is **single-child only** — no sibling comparisons

---

## Principle 3 — No Comparison

### Comparison vs. personal growth

| Type | Prohibited | Allowed |
|------|-----------|---------|
| Peer comparison | "Others your age have done X" | ❌ Never |
| Class comparison | "Your class average is Y" | ❌ Never |
| Sibling comparison | "Your sister did X" | ❌ Never |
| Self comparison | "You did more last month" | ✅ Always |
| Personal best | "That's your best streak yet!" | ✅ Always |
| Growth over time | "Look how far you've come since Day 1" | ✅ Always |

### The only valid comparisons
- Child vs. their own past: "You've logged 3× more reflections than last month"
- Child vs. their stated goal: "You're 60% of the way to your flight plan"
- Child vs. their personal best: "New personal record! 🎉"

---

## Principle 4 — No Dark Patterns

### Dark pattern catalogue (prohibited in LifePilot)

| Pattern | Example | Why prohibited |
|---------|---------|---------------|
| **False urgency** | "Only 2 hours left to complete today's mission!" | Creates anxiety, not motivation |
| **Confirmshaming** | "No thanks, I don't want to grow" | Manipulative, shame-adjacent |
| **Roach motel** | Easy to start a streak, hard to stop notifications | Disrespects user agency |
| **Disguised continuation** | Auto-advance to next lesson | Removes consent |
| **Misdirection** | "Skip" button is tiny and grey | Deceptive UI |
| **Fake scarcity** | "Limited time badge!" | False urgency on a digital item |
| **Social pressure** | "7 friends completed this today" | Comparison anxiety |
| **Hidden friction** | Difficult account deletion | Traps users |

### Pre-ship dark pattern audit
Before any new feature is shipped:
- [ ] Is there any time pressure or urgency framing?
- [ ] Is the "exit" or "skip" option as prominent as the "continue" option?
- [ ] Are notifications opt-in (not opt-out)?
- [ ] Is there any social proof that creates comparison pressure?
- [ ] Is account deletion or notification cancellation as easy as sign-up?

---

## Principle 5 — No Addiction Loops

### The difference: engagement vs. addiction

| Healthy engagement | Addiction loop |
|-------------------|---------------|
| Child opens app with intention | Child opens app out of anxiety |
| Session feels complete when closed | Session feels incomplete — always "one more" |
| Child feels satisfied after closing | Child feels guilty or anxious after closing |
| Next session driven by curiosity | Next session driven by fear of losing progress |

### Prohibited mechanics
- Variable reward schedules (random XP amounts — slot machine behaviour)
- Infinite scroll on any feed
- "Just one more" prompts after completing an action
- Notifications timed to moments of boredom or vulnerability
- Session time optimisation (longer is not better)

### Allowed engagement mechanics
- Meaningful completion loops (start → do → celebrate → close)
- Predictable rewards (complete this → earn that)
- Natural stopping points built into every module
- Sessions that feel finished — not "pull to see more"

### Success metrics (use these instead of time-in-app)
- Meaningful sessions per week (sessions where ≥1 action was completed)
- Reflection depth (voluntary word count, not minimum required)
- Goal completion rate (goals finished vs. abandoned)
- Return rate after 30 days (healthy re-engagement, not retention tricks)

---

## Principle 6 — No Manipulative Streaks

### Streak design rules

#### ✅ Allowed
```
"You've been on a 7-day journey! ✈️"  (celebration, no pressure)
"Welcome back! Ready to continue?"  (warm return, no guilt)
"Your journey is waiting — no rush."  (no urgency)
"3 days this week — you're building something!"  (effort, not perfection)
```

#### ❌ Prohibited
```
"Don't break your streak!"  (threat/pressure)
"Your streak ends at midnight!"  (false urgency)
"You haven't logged in for 3 days."  (guilt)
"Streak lost. Start again."  (shame + gameover framing)
"🔥 Streak at risk!"  (anxiety inducing)
```

### Streak mechanics
- Streak is **weekly** (active ≥1 day per week), not daily — less punishing for busy children
- **Streak freeze**: 1 free freeze per week, no guilt message, no "freeze used" counter visible
- Streak reset is framed as "starting a new chapter", never as failure
- Streak notifications: opt-in, once per day, morning only, user-chosen time

### Notification copy rules
```
✅ "Good morning! Your journey is ready when you are."
✅ "New day, new adventure. What will you discover today?"
❌ "You haven't logged in today — don't forget!"
❌ "Open LifePilot before your streak ends!"
```

---

## Principle 7 — Growth Mindset

### What to say (and what never to say)

| Situation | Fixed mindset (never) | Growth mindset (always) |
|-----------|----------------------|------------------------|
| Completed a mission | "You're so smart!" | "You put in real effort — it paid off!" |
| Didn't complete a goal | "You failed." | "You're still on your way there." |
| Struggling with a concept | "That's too hard for you" | "This one's tricky. Let's try a different path." |
| Achieved something difficult | "You're naturally talented." | "That took real work — and you did it." |
| Made a mistake | "You got it wrong." | "That was a tough one. What did it teach you?" |
| Trying for the first time | "Let's see if you're good at this" | "Trying something new is always a win." |

### Growth mindset language patterns

**Celebrate effort, not talent**
```
✅ "You kept going — that's what matters most."
✅ "Look at how much you've practised this week!"
✅ "That took courage to try."
```

**"Yet" framing**
```
✅ "You haven't reached this flight plan destination *yet*."
✅ "This career world is still a mystery — *yet*."
```

**Progress over perfection**
```
✅ "Every reflection you write makes you a little wiser."
✅ "3 missions this week — that's 3 more than zero!"
✅ "You're building a habit one day at a time."
```

**Challenges as growth**
```
✅ "That challenge just helped you grow."
✅ "Difficult things are where the real growth happens."
```

---

## Principle 8 — Celebrate Effort

### XP philosophy

LifePilot awards XP for **effort**, not just **completion**.

| Action | XP type | Rationale |
|--------|---------|-----------|
| Open a module for the first time | Exploration XP | Curiosity rewarded |
| Write a reflection (any length) | Effort XP | Showing up rewarded |
| Start a flight plan | Effort XP | Intention rewarded |
| Complete a flight plan | Completion XP | Achievement rewarded |
| Send a Future Me letter | Effort XP | Writing to your future self is the act, not reading it later |
| Explore a Career World | Exploration XP | Discovery rewarded |
| Try a Life Choices scenario | Effort XP | Engagement rewarded |
| Log a habit | Effort XP | Consistency rewarded |
| Complete a mission | Completion XP | Achievement rewarded |

**Ratio**: Effort XP ≈ 60–70% of Completion XP. Completion matters, but effort is the core.

### Partial effort acknowledgement

When something is partially done:
```
✅ "You did 4 out of 7 habits this week — that's real progress!"
✅ "You've started your flight plan. Every journey begins with the first step."
✅ "Even a short reflection counts. You showed up."
```

Never:
```
❌ "Incomplete: 4/7"
❌ "57% — below your target"
❌ "Try to do better next week"
```

---

## Implementation Rules for Engineers

### XP event validation
All XP events must include a `reason` field from the `XP_REASON` enum. If the reason doesn't appear in `ETHICAL_XP_REASONS`, it must be reviewed before shipping.

### Notification template review
All notification copy must pass the following automated checks before shipping:
1. Does not contain: "streak", "losing", "breaking", "don't forget" (in pressure contexts)
2. Does not contain: "you haven't", "you failed", "you missed"
3. Does contain: one of the warm welcome patterns

### Analytics constraints
- Never track or store per-child session duration as a KPI
- Never expose individual child data in any multi-child view
- All analytics queries on user data must include `WHERE pilot_id = $ownPilotId` — no cross-pilot queries in the child-facing app

### Feature flag gate
`feature.gamification.ethics_strict` is always ON in production. It enables:
- XP event validation against ethical XP reasons
- Notification copy scanning before send
- Streak reset friendly messaging

---

## Quick Reference Card

> Print this and put it next to your desk.

```
┌─────────────────────────────────────────────────────┐
│           LIFEPILOT ETHICS QUICK CHECK               │
├─────────────────────────────────────────────────────┤
│ Before shipping any gamification feature, ask:       │
│                                                       │
│ 1. Does this shame or guilt anyone?      → NO        │
│ 2. Does this rank or compare children?   → NO        │
│ 3. Is this comparison to another child?  → NO        │
│ 4. Is any pattern manipulative?          → NO        │
│ 5. Is this designed to maximise time?    → NO        │
│ 6. Does the streak have teeth/pressure?  → NO        │
│ 7. Does it reward effort, not talent?    → YES       │
│ 8. Is every attempt celebrated?          → YES       │
│                                                       │
│ All YES/NO correct → approved to ship.               │
│ Any wrong → redesign.                                │
└─────────────────────────────────────────────────────┘
```
