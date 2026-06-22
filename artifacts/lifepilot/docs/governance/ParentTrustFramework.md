# LifePilot — Parent Trust Framework
**Derived from**: XP-005 Parent Trust Framework  
**Version**: 1.0 | **Date**: June 2026  
**Authority**: Binding. Overrides growth, engagement, retention, and monetization decisions.

---

## Part 1 — Parent Trust Charter

### The Promise

> **LifePilot is on your child's side — always. And yours.**

LifePilot makes four promises to every parent:

**1. Your child's inner life stays private.**  
Journals, reflections, and letters to their future self are private by default. You will never secretly see them. Your child will always know what you can and cannot see.

**2. The app works without the internet.**  
Everything your child saves stays on their device. Nothing leaves without your knowledge. You don't need to worry about what's being collected while your child is offline.

**3. We will never manipulate your child.**  
No addictive loops. No "don't break your streak!" pressure. No leaderboards. No dark patterns. The app exists to serve your child's growth — not our engagement metrics.

**4. We are on the same team.**  
LifePilot is not trying to replace you. We want to give you more to talk about together — career conversations, money conversations, values conversations. You are the co-pilot.

---

### The Ten Commitments (summarised for parents)

| # | Commitment | What it means for your family |
|---|-----------|-------------------------------|
| 1 | **Privacy First** | Your child's journal is theirs. You see only what they choose to share. |
| 2 | **Offline First** | The app works without Wi-Fi. Data stays on the device. |
| 3 | **No Comparison** | Your child is never ranked against classmates, siblings, or anyone else. |
| 4 | **No Manipulation** | No pressure tactics, addiction loops, or dark patterns — ever. |
| 5 | **Growth First** | We celebrate effort and resilience — not test scores or performance rankings. |
| 6 | **Optimism** | Every part of the app helps your child believe their future is bright and changeable. |
| 7 | **You're the Co-Pilot** | LifePilot gives you conversation starters — not surveillance reports. |
| 8 | **Child Ownership** | Your child sets their own goals and reflects in their own time. They are not constantly evaluated. |
| 9 | **Safe AI** | Future AI features will guide and encourage — never diagnose, label, or predict. |
| 10 | **Full Transparency** | You can always ask what data exists, where it lives, and how to delete it. |

---

## Part 2 — Trust Design Principles

### Design principle: "Trust by default, not by policy"

Trust is not achieved by writing a good Privacy Policy. Trust is achieved when the product, at every moment, makes the safest, most respectful choice automatically — without the user having to configure it.

### The three defaults

| Default | What it means |
|---------|--------------|
| **Private by default** | All child-created content starts at `PrivacyLevel.private`. Sharing is opt-in. |
| **Offline by default** | All features work offline. Sync is opt-in and transparent. |
| **Off by default** | All notifications, sharing, and non-essential features require explicit opt-in. |

### Trust design checklist (for designers)

Before designing any screen, answer:
- [ ] What data does this screen require? Is the minimum used?
- [ ] Who can see the output of this screen? Is it private by default?
- [ ] Does this screen create any anxiety for the child or parent?
- [ ] Does this screen encourage any manipulative behaviour?
- [ ] Is the "exit" as easy as the "enter" for every action on this screen?

### Anti-patterns (never design these)

| Anti-pattern | Why it breaks trust |
|-------------|---------------------|
| Parent can see child journal | Child self-censors, destroys journal value, child loses trust in app |
| Class leaderboard | Creates shame for low performers, anxiety for high performers |
| "AI says your child seems stressed" | Diagnosis by algorithm is dangerous and inaccurate |
| Notification at 11pm | Exploits vulnerability, creates parental concern |
| "Invite friends to compare" | Comparison anxiety, social pressure |
| Account deletion is buried | Signals the app doesn't respect user agency |
| Premium content blocks progress | Pay-to-progress is unfair and manipulative |

---

## Part 3 — Privacy Principles

### Data minimisation

LifePilot collects only what the product needs to function. Nothing more.

| Data type | Collected | Rationale |
|-----------|-----------|-----------|
| Pilot name, age, grade, city | Yes | Personalisation |
| Module usage (which modules opened) | Aggregated only | Product improvement |
| Content (reflections, journals, letters) | Device-only | Personal expression — never transmitted |
| Mood ratings | Device-only | Reflection data — never transmitted |
| XP and level | Device-only | Gamification — never transmitted |
| Goals and habits | Device-only | Planning data — never transmitted |
| Career explorations | Device-only | Discovery data — never transmitted |

### Privacy levels (all child content)

```
PrivacyLevel.private         → visible to child only (default)
PrivacyLevel.sharedWithParent → visible to child + linked parent account (child opt-in)
PrivacyLevel.sharedWithSchool → visible to child + school CoPilot view (child opt-in)
```

Child opt-in is required for any level above `private`. Parent override is not permitted.

### Data storage

| Environment | Storage | Notes |
|-------------|---------|-------|
| Wave 0–1 (MVP) | IndexedDB (device-only) | No server. Nothing leaves the device. |
| Wave 2+ (Sync) | Encrypted cloud sync | Opt-in. Transparent. User sees what syncs. |
| School Edition | Aggregated server reports | No individual data in reports. |

### Data deletion

- Child can delete any content immediately — deletion is permanent
- Account deletion removes all device data — confirmation required, then immediate
- If sync is enabled (Wave 2+): deletion propagates to cloud within 24 hours
- No "retention period" for child content — deletion is final

### What LifePilot never does

- ❌ Sells any child data (including anonymised data) to any third party
- ❌ Uses child content to train AI models (without explicit, informed consent)
- ❌ Integrates advertising networks or behavioural analytics SDKs
- ❌ Shares individual child data with schools without child opt-in
- ❌ Allows parent to access private child content without child consent

---

## Part 4 — Family Engagement Principles

### The CoPilot philosophy

Parents are co-pilots, not passengers and not pilots.

| Role | What it means |
|------|--------------|
| **Co-Pilot (parent)** | Informed. Present. Supportive. Sees the journey at a high level. Trusts the child with the controls. |
| **Pilot (child)** | In control. Making choices. Reflecting voluntarily. Growing. |
| **Aircraft (app)** | Supports the journey. Does not fly itself. |

### What the Parent CoPilot view shows

| Visible to parent | Not visible to parent |
|-------------------|-----------------------|
| Which modules the child has explored (not what they wrote) | Journal text |
| How many reflections logged (not what they said) | Future Me letter content |
| Which career worlds explored (not what they thought) | Mood ratings (unless shared) |
| XP level and rank (high-level) | Life Choices answers |
| Active flight plans (titles only, unless shared) | Habit streaks details |

### Conversation starter cards

The CoPilot view surfaces conversation prompts based on child activity:

```
"[Name] explored the Technology World today. Ask them which career excited them most!"
"[Name] set a new flight plan this week. Ask them what they're aiming for."
"[Name] wrote in their flight log. Ask them what surprised them today."
```

These are prompts — not surveillance. The parent is given the opportunity to connect, not to audit.

### Family engagement rules

- No parent can assign goals, missions, or prompts to the child
- No parent can see individual session details, time-in-app, or usage patterns
- No sibling comparison in any CoPilot view
- The CoPilot view is calm, information-rich, adult — not the child's adventure visual language

---

## Part 5 — Ethical AI Principles

### The Safe AI boundary (XP-005 Principle 9)

Future AI systems in LifePilot must operate strictly within these boundaries.

### ✅ AI is allowed to:

| Behaviour | Example |
|-----------|---------|
| **Guide** | "Based on your interest in healthcare, you might explore the Health World next." |
| **Encourage** | "You've been reflecting every day this week — that takes real commitment!" |
| **Educate** | "Compound interest means your savings grow faster over time. Here's how..." |
| **Clarify** | "A budget is just a plan for how to use your money. Let's make one together." |
| **Reflect** | "That was a tough Life Choice scenario. What did it make you think about?" |

### ❌ AI is never allowed to:

| Behaviour | Example (prohibited) | Why |
|-----------|---------------------|-----|
| **Diagnose** | "Your mood logs suggest you may be experiencing anxiety." | Medical diagnosis requires professionals |
| **Label** | "You're a visual learner." | Fixed labels limit growth mindset |
| **Predict** | "At your current rate, you'll struggle to get into engineering." | Predictions about life outcomes are harmful |
| **Replace** | "Tell me all your problems — I'm always here for you." | Dependency creation; replaces human relationships |
| **Manipulate** | Any persuasive technique designed to increase app usage | Dark pattern via AI is still a dark pattern |

### AI transparency requirements

- AI suggestions are always labelled as AI ("Your AI Coach suggests...")
- AI can always be dismissed with one tap — no friction
- AI conversation history is stored device-only (same as all child content)
- AI does not have access to content from other children — no cross-child inference
- A "why did AI say this?" explanation is always available

### AI safety review gate (Wave 6+)

Every AI feature requires:
1. A description of what data the AI uses to make its suggestion
2. A list of what the AI cannot infer or recommend
3. A review of potential harmful outputs and mitigations
4. Sign-off from at least two senior team members before shipping

---

## Part 6 — Child Safety Principles

### The child safety baseline

| Principle | Requirement |
|-----------|------------|
| **No contact** | LifePilot has no social/messaging features. Children cannot contact each other. |
| **No public profiles** | No child profile is ever publicly visible. All profiles are private. |
| **No stranger danger** | No user-generated content from unknown users is shown to children. |
| **Content safety** | All content (missions, prompts, career info) is pre-reviewed for age-appropriateness. |
| **Age-appropriate prompts** | Flight Log prompts are reviewed for grade-level (8–11, 12–14, 15–18) appropriateness. |
| **No crisis escalation** | If a child expresses distress (if AI detects crisis-adjacent language), a static "talk to someone you trust" message appears — not AI advice. |
| **No location data** | LifePilot never requests or stores precise location data. City (for localisation) is the maximum. |

### Crisis safety protocol (Wave 6+)

If any AI feature detects language suggesting serious distress:
1. Do **not** attempt AI counselling
2. Display: "It sounds like you're going through something difficult. Please talk to a trusted adult — a parent, teacher, or counsellor."
3. Show a static helpline list (iCall, Vandrevala, Snehi — India context)
4. Log a `CrisisSignal` event (device-only) for the child to review later if they choose
5. Never transmit crisis signal data automatically

### Child data protection (India DPDP Act 2023)

| Requirement | LifePilot approach |
|-------------|-------------------|
| Parental consent for under-13 | Required at account creation |
| Verifiable parental consent | Email/SMS verification to parent |
| Right to erasure | Account deletion removes all data immediately |
| Purpose limitation | Data used only for stated purpose (personalisation) |
| Data minimisation | Minimum required data collected |

---

## Part 7 — Monetization Ethics Framework

### Revenue philosophy

LifePilot generates revenue by creating genuine value for families and schools — never by exploiting child data or psychological vulnerabilities.

### Revenue matrix

| Revenue stream | Allowed | Notes |
|---------------|---------|-------|
| Premium content packs | ✅ | Value exchange — content for payment |
| Premium learning paths | ✅ | Value exchange — enhanced journeys |
| Family Pack licence | ✅ | Multi-child, supports family use |
| School Programme licence | ✅ | Institutional. No individual child data used for revenue. |
| Premium experiences (Future Me deluxe, etc.) | ✅ | Functional enhancement |
| Selling child data | ❌ | Permanent prohibition — core trust violation |
| Advertising networks | ❌ | Behavioural profiling of children |
| Behavioural advertising | ❌ | Same |
| Manipulative upsells | ❌ | Violates Principle 4 (No Manipulative Retention) |
| Pay-to-progress | ❌ | Creates unfair access; violates Principle 8 (Child Autonomy) |
| Freemium with guilt | ❌ | "Unlock to not feel bad" — manipulative framing |

### Monetization design rules

- Premium features are **clearly labelled** before the child interacts with them
- No feature gate appears mid-interaction (not after the child has already invested time)
- Free tier must be genuinely useful — not artificially crippled to drive upgrades
- "Upgrade" prompts are calm, clear, and dismissible in one tap — no repeated nagging
- School Edition pricing is never communicated to the child

---

## Part 8 — Trust Review Checklist

Used at every screen review. All 10 criteria must pass.

### Full checklist

| # | Criterion | Check |
|---|-----------|-------|
| 1 | Builds trust — does this increase or maintain parent/child/school trust? | ☐ |
| 2 | Protects privacy — is the minimum data used, private by default? | ☐ |
| 3 | Encourages growth — does this celebrate effort, learning, resilience? | ☐ |
| 4 | Avoids shame — no guilt, failure framing, or negative reinforcement? | ☐ |
| 5 | Avoids comparison — no peer, sibling, or cohort comparisons visible? | ☐ |
| 6 | Avoids manipulation — no dark patterns, false urgency, pressure? | ☐ |
| 7 | Encourages family conversations — does this give families something to talk about? | ☐ |
| 8 | Child remains the hero — is the child in control, making choices? | ☐ |
| 9 | Parent remains co-pilot — are parent views informative, not surveillance? | ☐ |
| 10 | Future remains hopeful — does this connect the child to a positive future? | ☐ |

**All 10 must pass. No exceptions.**

### Trust test battery

Run all three perception tests:

**Parent test** (4 questions)  
☐ Comfortable sitting beside child?  
☐ Would recommend to another parent?  
☐ Builds character?  
☐ Encourages positive choices?

**School test** (3 questions)  
☐ Supports life skills?  
☐ Aligns with future readiness?  
☐ Promotes student wellbeing?

**Child test** (5 questions)  
☐ Feels safe?  
☐ Feels respected?  
☐ Feels encouraged?  
☐ Feels ownership?  
☐ Feels hopeful?

**If any answer is NO → Redesign.**

---

## Part 9 — Module Approval Checklist

Run for every new module before Wave review.

### Phase 1 — Experience (XP-001)
- [ ] Child is the hero
- [ ] XP-001 language system used throughout
- [ ] Visual-first design — illustration or journey element present
- [ ] No school, ERP, or corporate dashboard appearance
- [ ] Mobile-first

### Phase 2 — Ethics (ADR-008)
- [ ] No shame in any message or state
- [ ] No ranking or comparison
- [ ] No dark patterns
- [ ] No addiction loops
- [ ] Streaks celebrate, never punish
- [ ] Growth mindset language throughout
- [ ] Effort rewarded, not just completion

### Phase 3 — Trust (XP-005)
- [ ] Child content private by default
- [ ] Offline functionality verified
- [ ] No social comparison in any view
- [ ] No manipulative retention mechanism
- [ ] Parent view shows summary only, not content
- [ ] Child has control over privacy of their own data
- [ ] Safe AI principles applied (if AI used)
- [ ] Monetization features clearly labelled and dismissible

### Phase 4 — Technical
- [ ] TypeScript: zero errors
- [ ] Repository pattern used for all data access
- [ ] Feature flag gate if wave-gated
- [ ] All strings in i18n (zero hardcoded)
- [ ] Accessibility gates passed (WCAG 2.1 AA)

**All four phases must pass. Module approval requires all gates green.**

---

## Part 10 — Long-Term Trust Strategy

### Trust is compounding

Every week that LifePilot operates within these principles compounds trust. Every parent recommendation compounds it further. Every school adoption validates it.

Trust is the moat. Features can be copied. Trust cannot.

### Trust milestones (by wave)

| Wave | Trust milestone |
|------|----------------|
| 0–1 | Architecture trust: offline-first, private-by-default, no third-party analytics. Demonstrated to early parents. |
| 2 | Sync trust: transparent sync with field-level consent. Parents can see and control exactly what syncs. |
| 3 | AI trust: Safe AI boundaries implemented and published. "AI Coach" behaviour document public. |
| 4 | School trust: DPDP-compliant school edition with published data architecture. School data never touches child content. |
| 5 | Enterprise trust: configurable compliance layer. Enterprise clients can verify data isolation. |
| 6 | Long-term trust: independent audit of privacy practices. Published results. Community advisory council. |

### Trust reputation management

- **Privacy incidents**: If any data incident occurs, the response is transparent and immediate — no delay, no minimisation
- **Feature vetoes**: Any team member can raise a trust concern on any feature. Trust concerns are escalated to the founding team, not buried
- **Parent feedback loop**: A parent advisory panel is formed by Wave 2 — real parents review proposed features before shipping
- **School advisory panel**: School counsellors and teachers review School Edition features before Wave 4

### The long game

LifePilot's goal is to be the app that Indian parents feel **proud** to have installed for their children — the app that teachers recommend, that grandparents understand, that children voluntarily show their families.

That reputation is earned one trust decision at a time. This framework is how those decisions are made consistently.
