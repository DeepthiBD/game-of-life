# LifePilot — Engineering Philosophy & Governance
## RP-003 | Engineering Constitution v1.0
### Ratified by: Engineering Excellence Board
### Date: June 2026 | Status: RATIFIED

---

> **Document Authority**: This document is the living engineering constitution of LifePilot. It defines not just *what* we build, but *how* and *why* we build it. Every engineer, architect, product manager, and AI system contributing to LifePilot is expected to internalize and uphold this constitution.

---

## 1. MISSION

### The Engineering Mission

> **"Build technology that genuinely changes the trajectory of a child's life — with zero excuses for quality, zero tolerance for harm, and zero compromise on trust."**

We are not building a feature factory. We are not shipping pixels. We are building the infrastructure of a young person's future — their goals, their identity, their decisions, their growth. Every line of code we write either supports that mission or undermines it. There is no neutral code in LifePilot.

### What Our Mission Demands of Engineering

| Demand | What it Means in Practice |
|--------|--------------------------|
| **Zero excuses for quality** | We do not ship known bugs. We do not merge untested code. We do not cut corners on child safety. |
| **Zero tolerance for harm** | Privacy violations, data breaches, and manipulative design patterns are treated as mission failures — not technical debt. |
| **Zero compromise on trust** | Offline reliability is not a feature — it is a covenant. When a student opens LifePilot in an area with no signal, it must work. Always. |
| **Genuine impact** | We measure success not by deploy frequency, but by whether a child wrote a goal, completed a mission, and came back tomorrow. |

### What We Are Building
- A **life companion** — present during critical identity formation years
- A **trust infrastructure** — earning and protecting the confidence of parents, schools, and governments
- A **platform for 10+ years** — a 12-year-old student becomes a 22-year-old professional using the same platform
- A **model for Indian edtech** — demonstrating that privacy, offline-first, and educational quality can coexist

---

## 2. ENGINEERING PRINCIPLES

> Principles are not aspirations. They are operating constraints. An engineer who violates a principle must defend the violation with evidence and get a formal exception — not apologize and move on.

### EP-01 — Offline First, Always
**Statement**: Every feature ships with full offline functionality. Connectivity is an enhancement, not a requirement.

**In Practice**:
- If you cannot describe how your feature works without internet, it is not ready to review
- Online-only features require explicit EARB exception and a user-visible disclosure
- The answer "we'll add offline support later" is not accepted

**Why**: 400 million students in India live in regions with intermittent connectivity. Building for connectivity is building for privilege.

---

### EP-02 — Additive Only
**Statement**: The domain model grows forward, never backward. No entity is removed, no field deleted, no enum renamed.

**In Practice**:
- Adding a field → always safe
- Renaming a field → create a new field, migrate, deprecate old (never rename in place)
- Removing an entity → archive behind a feature flag, never delete from schema

**Why**: LifePilot stores years of a pilot's life history. A schema change that destroys data is a harm against the user, not a technical event.

---

### EP-03 — Privacy by Construction
**Statement**: Privacy is not reviewed at the end. It is designed in at the first line of code.

**In Practice**:
- Before writing any data-collection feature, declare: what PII is collected, why, for how long, and what consent is required
- If you cannot answer these questions, you cannot write the feature
- PII in logs is a P0 incident, not a code review comment

**Why**: Our users are children. Their parents trust us with their most personal development data. That trust is our most valuable asset.

---

### EP-04 — Correctness Before Cleverness
**Statement**: Simple, correct, readable code is always preferred over clever, complex code.

**In Practice**:
- If a reviewer needs more than 60 seconds to understand what a function does, it needs to be simpler
- Performance optimizations require a measured baseline — optimize only after measuring
- Comments explain *why*, not *what* — if *what* needs explanation, refactor

**Why**: This platform will be maintained for 10+ years by teams who haven't been hired yet. Write for the engineer who joins in year 8.

---

### EP-05 — Explicit Over Implicit
**Statement**: Make behavior obvious. Avoid magic. Prefer boring, predictable code.

**In Practice**:
- No implicit state mutations — all state changes are explicit function calls
- No surprise side effects — a function that reads data must not write data
- Error states are explicit — `StorageResult<T>` with `success: boolean`, never throw-and-catch as control flow

**Why**: Implicit behavior is a trap for the next engineer and a source of bugs in high-stakes educational contexts.

---

### EP-06 — Respect the Device
**Statement**: We build for a 3-year-old mid-range Android phone with 2GB RAM on a 2G connection.

**In Practice**:
- Bundle size budget is hard: 200KB gzipped initial load, enforced by CI
- No large libraries that don't earn their bytes
- Images are WebP, fonts are self-hosted, video is not in MVP
- Battery usage is a first-class concern — no polling, use event-driven patterns

**Why**: The student who most needs LifePilot is the one who cannot afford a high-end phone or fast internet. If we build for the premium device, we build for the privileged student.

---

### EP-07 — Test What Matters
**Statement**: Every service method has a test. Every critical user journey has an E2E test. Tests are first-class citizens.

**In Practice**:
- No PR merged without tests for new service methods
- Tests are written alongside the code, not after
- Test coverage is a lagging indicator — we focus on testing the right things, not just achieving a number

**Why**: A bug in a goal-tracking service is not a software error — it's a broken promise to a student who set their first life goal.

---

### EP-08 — No PII Left Behind
**Statement**: Personal data never appears in logs, telemetry, error messages, analytics, or debugging output.

**In Practice**:
- Use pilot ID hash in logs, never name or email
- AI prompts never contain raw PII unless explicit anonymization + consent chain is in place
- All data exports are encrypted

**Why**: A data breach affecting children is a news story, a legal liability, and a betrayal — in that order of severity.

---

### EP-09 — Every Language is a First-Class Language
**Statement**: Tamil is not a secondary language. Hindi is not the default. All 10 supported languages are equal.

**In Practice**:
- No feature ships in English-only — ever
- All translation strings added to `en.json` must be propagated to all 9 other locale files before merge
- UI layout must accommodate longer translated strings (Tamil and Bengali often run 30% longer)
- RTL-readiness considered from the start (Urdu support is a future reserved capability)

**Why**: Building for English is building for one demographic in a country of 1.4 billion.

---

### EP-10 — Every Decision Creates a Paper Trail
**Statement**: Architecture decisions, trade-offs, and exceptions are documented. Undocumented decisions are invalid decisions.

**In Practice**:
- Architecture changes → Architecture Decision Record (ADR)
- Exception to a principle → written justification + reviewer sign-off
- Security exception → Security team sign-off + time-bounded

**Why**: Institutional memory lives in documents, not in people's heads. Engineers leave. Documents stay.

---

## 3. ENGINEERING VALUES

Values are what guide us when principles don't give a clear answer. They represent who we are as a team.

### V-01 — Empathy for the User
We pause and ask: *what does a 14-year-old girl using LifePilot for the first time actually experience?* We don't assume technical literacy. We don't assume consistent internet. We don't assume a supportive home environment. We build with radical empathy for the user at the margin.

### V-02 — Ownership, Not Assignment
We own the things we build. "That's not my module" is not a statement we make. If you see a bug in someone else's code, you file it, and if it's critical, you fix it. We are collectively responsible for the experience every student has.

### V-03 — Intellectual Honesty
We say "I don't know" before we guess. We say "this approach has risks" before we ship. We don't over-engineer to look impressive and we don't cut corners to look fast. The code is what it is — we are honest about it.

### V-04 — Craft Matters
We take pride in clean code, thoughtful names, and well-structured tests. Quality is not a separate phase — it is the work. An engineer who consistently ships well-tested, clean, documented code is more valuable than one who ships fast and breaks things.

### V-05 — Constructive Disagreement
We disagree by presenting evidence, proposing alternatives, and respecting the final decision. We do not relitigate decided decisions without new information. We do not make code review personal.

### V-06 — Sustainable Pace
We do not celebrate crunch. Burnout produces bugs, and bugs in a child's life-skills platform are not acceptable. We build systems — not heroics — that let us ship reliably week after week, year after year.

### V-07 — Learning as Responsibility
We invest in understanding the domain — child development, Indian education systems, regional languages, behavioral psychology — not just the technology stack. The best LifePilot engineers understand what they're building *for*, not just *with*.

### V-08 — Bias Toward Action
We do not wait for perfect information. We write the ADR, we propose the architecture, we build the prototype, we get feedback. Thoughtful action beats perfect paralysis every time.

---

## 4. QUALITY PHILOSOPHY

### The LifePilot Quality Standard

> "Quality is not a gate at the end of development. Quality is the discipline of every decision along the way."

### What Quality Means at LifePilot

**Quality is not:**
- A checkbox on a release form
- Something the QA team is responsible for
- A number on a coverage report
- Achievable by reviewing at the end

**Quality is:**
- Code that works correctly the first time, including edge cases
- Code that a future engineer can understand and safely modify
- Features that degrade gracefully under constraints (no connectivity, low storage, old device)
- A child's data that is never lost, corrupted, or exposed
- A promise kept to every user, every session

### The Five Dimensions of Quality

| Dimension | Question | Standard |
|-----------|---------|---------|
| **Correctness** | Does it do what it claims to do? | Zero known bugs shipped. All edge cases considered. |
| **Reliability** | Does it do it consistently? | Works offline, works on constrained devices, handles errors gracefully |
| **Maintainability** | Can the next engineer understand and safely change it? | Code reviewed for clarity, not just correctness |
| **Security** | Does it protect the user? | DPDP compliant, no PII exposure, child-safe content |
| **Accessibility** | Can every user use it? | WCAG 2.1 AA minimum, keyboard navigation, screen reader support |

### Quality Anti-patterns We Reject

- "We'll clean it up later" — later doesn't exist; now is when we do it
- "It works on my machine" — it works when tested across our device matrix or it doesn't work
- "The tests are slow so we don't run them" — fix the tests or fix the code
- "It's just placeholder text" — there is no such thing as temporary production code
- "We'll handle accessibility in v2" — WCAG 2.1 AA is a launch requirement, not a roadmap item

---

## 5. DEFINITION OF EXCELLENCE

### What Engineering Excellence Looks Like at LifePilot

An excellent piece of work at LifePilot:

**Domain understanding**: The engineer understood what the feature means for a child's development before writing a line of code.

**Clean design**: The entities, services, and components involved are named correctly, scoped correctly, and have single, clear responsibilities.

**Complete implementation**: All happy paths, all error paths, all offline paths. No "TODO: handle the offline case."

**Full test coverage**: Service methods tested, critical UI paths have integration tests, error states verified.

**i18n complete**: All user-visible strings are in i18n keys. All 10 locale files updated. Long-string layouts tested.

**No regressions**: Existing tests still pass. No TypeScript errors introduced.

**Documented where needed**: Complex logic has a comment explaining *why*. Architecture decisions have an ADR.

**Privacy-safe**: No PII in logs. Consent check where required. Data minimized.

**Accessible**: Keyboard navigable. Screen reader tested. Color contrast verified.

**Reviewed**: Code reviewed by a peer for correctness, maintainability, and alignment with principles.

### The Excellence Bar

> *If you wouldn't be comfortable presenting this code to a parent whose child's future depends on it — it is not ready to ship.*

---

## 6. ARCHITECTURE PHILOSOPHY

### The Core Architectural Belief

> "Architecture is a covenant between the engineer who writes it today and every engineer who maintains it for the next decade. Break the covenant and you break the team."

### Architecture as Foundation, Not Scaffolding

At LifePilot, architecture is not the overhead before the real work begins. Architecture *is* the work. The domain model is the product — before any UI is drawn, the entities are designed. The service layer is the product — before any component is wired, the service contract is defined.

This is why:
- The domain model (232 entities, v11 schema) was built before the UI
- The service layer (120+ service objects) was built before the pages
- The architecture blueprint was written before the features

### Architecture Principles in Practice

**Additive Evolution**: The architecture grows forward. We never break existing behavior. Every new schema version adds tables; never removes them. This is not just a technical rule — it is a commitment to every user who has been using the app for 3 years.

**Boundaries are real**: The layered architecture (Presentation → Service → Repository → Domain) is enforced by convention and code review, not by a build system. Engineers are trusted to respect boundaries. That trust is audited in every code review.

**Simplicity at scale**: We choose boring technology that works. React, Dexie, TypeScript, Vitest. These are not exciting choices. They are reliable choices that 10 engineers can understand, 5 years from now, without rereading documentation.

**Design for the next engineer**: Architecture decisions are made imagining the engineer who joins 3 years from now. Will they understand the folder structure? Will the naming conventions be obvious? Will the tests describe what the code does?

### What Architecture is NOT

- A beautiful diagram that nobody reads
- An excuse to delay building
- A license to over-engineer simple problems
- The responsibility of one person — architecture belongs to the team

---

## 7. CODE PHILOSOPHY

### The LifePilot Code Standard

> "Code is read far more often than it is written. Write for the reader."

### Code Values

**Readable**: Variable names are complete words. Functions do one thing. Files have a single responsibility. The code tells a story that a new engineer can follow.

**Predictable**: The function named `getForPilot` returns pilot data. The function named `create` creates a record. No surprises. No side effects hidden inside what looks like a read operation.

**Minimal**: We write the minimum code that correctly solves the problem. We don't add abstractions until we have two or more concrete uses for them. We don't add configuration options that nobody asked for.

**Safe**: TypeScript strict mode. `safeRun()` wrapping. `StorageResult<T>` checked before use. No uncaught promise rejections. No unguarded `.data` access on potentially failed operations.

**Consistent**: The codebase reads as if written by one engineer. Naming conventions, import ordering, error handling patterns, and file organization are the same everywhere — because the team agreed on them and follows them.

### Code Anti-patterns We Reject

```typescript
// BAD: Magic number with no explanation
if (score > 7) { ... }

// GOOD: Named constant with semantic meaning
const WELLBEING_ALERT_THRESHOLD = 7;
if (score > WELLBEING_ALERT_THRESHOLD) { ... }
```

```typescript
// BAD: Silent error swallowing
try {
  await db.pilots.add(pilot);
} catch {
  // silently fails
}

// GOOD: Explicit error handling via StorageResult
const result = await pilotService.create(pilot);
if (!result.success) {
  handleError(result.error);
  return;
}
const pilotId = result.data;
```

```typescript
// BAD: Component accessing db directly
function PilotPage() {
  const [pilot, setPilot] = useState(null);
  useEffect(() => {
    db.pilots.get(1).then(setPilot); // VIOLATION: direct db access
  }, []);
}

// GOOD: Component uses service via hook
function PilotPage() {
  const { pilot } = usePilot(1); // hook calls pilotService internally
}
```

### The Single Rule That Covers Everything

> *If you have to explain what the code does during code review, the code needs to be rewritten — not explained.*

---

## 8. TESTING PHILOSOPHY

### The Testing Belief

> "Tests are not a safety net. Tests are a specification. They describe what the code is supposed to do, and they enforce it forever."

### Why We Test

We do not test to reach a coverage number. We test because:

1. **We cannot manually test 232 entities across 10 languages on 5 device types for every release**
2. **Tests catch regressions** — when someone adds a feature in Domain 3 that breaks Domain 7, the tests tell us before the student does
3. **Tests are documentation** — a well-named test tells the next engineer what the service is supposed to do
4. **Tests give us confidence to ship** — we can refactor the service layer in Wave 2 because the tests will catch anything we break

### What We Test

**Service methods** (highest priority): Every method in `storageService.ts` has at least one test covering the happy path, and one covering the error path.

**Utility functions**: Pure functions are trivially testable and provide immense value — 95% coverage target.

**Critical user journeys** (E2E): The first-time onboarding, creating a goal, completing a mission, taking a life wheel assessment. These are tested end-to-end with Playwright.

**Offline behavior**: Tests that verify features work correctly when the app is in offline state.

### What We Don't Test

- shadcn/ui primitive components (library responsibility)
- Static markup with no logic
- Trivial getters/setters with no business logic

### Testing Rules

```typescript
// Tests describe behavior, not implementation
it("returns a StorageResult with success:false when pilot is not found", async () => {
  const result = await pilotService.getById(9999);
  expect(result.success).toBe(false);
});

// Tests are independent — no shared state between tests
beforeEach(() => {
  db = new MockLifePilotDatabase(); // fresh mock for every test
});

// Tests use realistic data — not "test123" and arbitrary numbers
const testPilot = {
  name: "Arjun",
  ageGroup: "teen_mid",
  identityStage: "explorer",
  createdAt: new Date("2024-01-01"),
};
```

### The Test Quality Standard

A test is excellent when:
- Its name describes the behavior being verified, in plain English
- It tests one thing (one assertion focus per test)
- It uses realistic, meaningful test data
- It fails for exactly the right reason when the code is broken
- It does not depend on the order other tests run in

---

## 9. AI PHILOSOPHY

### The Core AI Belief

> "AI is a tool that serves the pilot's growth — never a system that replaces human judgment, exploits emotional vulnerability, or extracts value from a child's data."

### What AI Can Do at LifePilot

✅ Suggest a mission based on a pilot's current goals and personality assessment
✅ Generate a reflective narrative from a timeline of achievements
✅ Offer a different perspective on a difficult decision scenario
✅ Celebrate a milestone with a personalized, encouraging message
✅ Detect wellbeing distress signals and recommend professional support

### What AI Cannot Do at LifePilot

❌ Make final decisions about a pilot's life path
❌ Collect PII for model training without explicit opt-in
❌ Operate without a human override capability
❌ Generate content without a safety filter appropriate to the user's age
❌ Use persuasive or manipulative language patterns to drive engagement
❌ Replace a licensed counsellor for mental health concerns
❌ Operate without an offline fallback for every feature

### The AI Design Constraints

**Advisory only**: Every AI output is labeled as a suggestion. The word "AI" is always disclosed in the UI. AI Coach is clearly non-human.

**Child-appropriate**: AI prompts for users under 14 use strict content guardrails. No dark patterns. No manufactured urgency. No FOMO.

**Consent-gated**: AI features are opt-in. A student who declines AI coaching gets a complete product experience without it.

**Explainable**: AI recommendations include a human-readable reason. "We suggest this career path because your assessment showed strong analytical thinking and you expressed interest in science." Not just "Recommended for you."

**Fallback-guaranteed**: If the AI provider is down, the feature degrades to a rule-based or static response — never to an error state.

**Prompt discipline**: Prompts are versioned, reviewed for safety, and tested against adversarial inputs before production. Prompts are treated as code — they live in version control and require review to change.

### The AI Ethics Standard

Before any AI feature ships, answer these questions:
1. Would a parent be comfortable with this AI interaction if they saw it verbatim?
2. Could this output harm a vulnerable adolescent?
3. Does the AI's presence here serve the pilot, or does it serve the platform's engagement metrics?
4. Is there a clear path for the pilot to reject AI input and take their own path?

If any answer gives pause, the feature is not ready.

---

## 10. DOCUMENTATION PHILOSOPHY

### The Documentation Belief

> "Documentation is not a chore. It is an act of respect for every engineer who comes after you."

### What Documentation Does at LifePilot

- **Types have comments** that explain what the entity represents in human terms, not just technical terms
- **Service methods have JSDoc** that explains parameters, return values, and edge cases
- **Architecture decisions have ADRs** that explain context, decision, and consequences — not just the decision
- **The `replit.md` is the truth** — it is the first document every new engineer reads and it is always current
- **The MODULES array in `tokens.ts`** documents the product structure in code

### Documentation Rules

**Write it now**: Documentation written a week after the code is documentation written for a future engineer who needs to guess context. Write it alongside the code.

**Write for the person who doesn't know**: Don't document what is obvious from the code. Document the *why*, the *trade-off*, the *gotcha*.

**Update it when the code changes**: A lie is worse than no documentation. If the code changed and the docs didn't, the docs are a trap.

**ADRs are immutable**: Once accepted, an ADR is never modified — it is superseded by a new ADR. This preserves the historical reasoning.

### The Documentation Standard

Every significant contribution includes:

| Artifact | Documentation Requirement |
|----------|--------------------------|
| New entity | JSDoc comment explaining what it represents in business terms |
| New service | JSDoc for each public method |
| Architecture decision | ADR filed in `docs/adr/` |
| New schema version | Version comment in `db.ts` |
| New feature flag | Entry in feature flag registry |
| Known limitation | `// NOTE:` comment in code, `KNOWN_LIMITATIONS.md` entry |

### Documentation Anti-patterns

```typescript
// USELESS: Restates the obvious
// Gets pilot by id
async getById(id: number) { ... }

// USEFUL: Explains non-obvious behavior
// Returns the pilot for this id. If not found, returns
// { success: true, data: undefined } — not a failure.
// Use getById when undefined is a valid expected outcome.
async getById(id: number) { ... }
```

---

## 11. SECURITY PHILOSOPHY

### The Security Belief

> "Security is not a feature we add. It is a lens through which every feature is built."

### Security at LifePilot is Different

We are not securing a bank account or a business transaction. We are securing a child's identity, their mental health data, their personality assessments, their beliefs and dreams, their future letters to themselves. A breach is not a financial event — it is a violation of a child's trust at the most formative years of their life.

This changes everything about how we think about security:

### The Security Standard

**Threat model first**: Before building any feature that handles data, the threat model is written. Who wants this data? How could it be accessed? What is the harm if it is?

**Minimum privilege always**: A teacher cannot see individual student wellbeing scores. A counsellor cannot see data without student consent. A platform admin cannot modify data. Privilege is the minimum required for the role's legitimate function.

**No PII in unsafe places — ever**: Not in logs. Not in URLs. Not in error messages. Not in AI prompts without consent and anonymization. Not in analytics events. This is a P0 violation.

**Child safety is non-negotiable**: Content moderation on all user-generated text. Parental consent for data processing of under-14s. No direct messaging between minors without age verification and moderation. No behavioral advertising. No dark patterns.

**DPDP 2023 is the floor, not the ceiling**: We implement the minimum the law requires, then go further because our users deserve it.

### Security Review Triggers

Every PR that touches these areas requires explicit security review:
- Any new data collection
- Any new integration with external service
- Any change to consent management
- Any change to authentication or session management
- Any AI feature that processes pilot data
- Any new role or permission

### Security Anti-patterns

- "We'll encrypt it later" — data written in plaintext is data breached
- "Only internal users see this log" — internal logs are breached logs
- "The user agreed to the terms of service" — Terms of Service is not consent for every data use under DPDP
- "It's just metadata" — metadata is data; location + timestamp + device ID is PII

---

## 12. DEVELOPER EXPERIENCE PHILOSOPHY

### The Developer Experience Belief

> "The developer is the user of the engineering system. If the engineering system is painful to use, we build the wrong things, slowly."

### What Developer Experience Means at LifePilot

**Immediate productivity**: A new engineer should have a working local environment within 10 minutes of cloning the repository. Not 2 days. Not "follow this 20-step guide." 10 minutes.

**Fast feedback loops**: TypeScript errors are visible in the editor in real-time. Tests run in seconds. Build is fast. No waiting for CI to tell you something your editor should have told you.

**Predictable conventions**: A new engineer can add a new entity, add a new service, add a new translation key, and add a test — by following existing patterns — without asking anyone.

**Low-friction quality**: Quality gates (typecheck, lint, test) run automatically and fast. Engineers don't skip them because they're slow — they run them because they're faster than writing bugs.

**Honest tooling**: The tools tell you the truth. If your code has a type error, you see it. If a test fails, you see why. No flaky tests that are "expected to fail sometimes."

### DX Standards

| Standard | Target |
|----------|--------|
| `pnpm install` to first app render | < 2 minutes |
| `pnpm test` full run | < 30 seconds |
| `pnpm typecheck` | < 20 seconds |
| Hot module replacement after edit | < 500ms |
| New entity → working service | < 30 minutes (following patterns) |
| Onboarding to first PR | < 3 days |

### DX Investment Rules

- Slow tests are fixed, not tolerated
- Confusing error messages are improved, not documented
- Manual steps that could be automated are automated
- The `replit.md` is updated when anything in the developer experience changes

---

## 13. OPERATIONAL PHILOSOPHY

### The Operations Belief

> "Operational excellence is built into the system from day one — not retrofitted when production breaks at 2am."

### Operations Principles

**Observability by default**: Every significant operation emits a structured log. Every significant failure has a traceable path from symptom to root cause. We don't debug production by guessing.

**Fail loudly in development, silently (with logging) in production**: A missing config in development throws an exception. The same issue in production logs a warning and activates the fallback — but never crashes the user's session.

**Graceful degradation over hard failure**: If the AI provider is down, the AI coach shows cached suggestions. If the sync fails, the local data is the source of truth until sync succeeds. If a non-critical module fails, the rest of the app keeps working.

**Runbooks exist before incidents**: On-call engineers have documented procedures before the incident happens. "What do you do when the sync queue backs up?" has a written answer in the runbook, not an improvised one at 3am.

**Incidents are learning, not blame**: Post-mortems are blameless. We ask "what in our system allowed this to happen?" not "who made this mistake?" The output is a system improvement, not a performance review entry.

### What "Production Ready" Means

Before any feature is live:
- Monitoring is configured for it
- An alert threshold is defined
- A graceful degradation path exists
- A runbook entry exists for its most likely failure mode
- It has been tested in an environment that mirrors production

---

## 14. CONTINUOUS IMPROVEMENT

### The Improvement Belief

> "The platform we build in year 3 should look back at year 1 with admiration for the foundation — and humility about the gaps."

### The Improvement Engine

**Retrospectives every sprint**: Not just "what went well / what didn't" — but "what in our system made this easy or hard? What would make the next sprint better?"

**Technical debt is visible**: The debt backlog is a real, prioritized, reviewed list. Debt is not swept under the rug — it is named, sized, and scheduled.

**Blameless post-mortems**: Every significant incident generates a written post-mortem within 72 hours. The post-mortem includes: timeline, root cause, contributing factors, and concrete system improvements.

**Refactor sprints**: Every 6 weeks, a portion of sprint capacity is reserved for non-feature technical improvement. This is not negotiable and is not cancelled for "delivery pressure."

**Architecture reviews at wave boundaries**: Before starting each implementation wave, the architecture blueprint is reviewed, updated, and re-ratified by the EARB.

### Continuous Improvement Standards

| Cadence | Activity |
|---------|---------|
| Every PR | Code review for quality and principle adherence |
| Every sprint | Retrospective; tech debt review |
| Every 6 weeks | Refactor sprint |
| Every wave boundary | Architecture review |
| Every major release | Performance audit |
| Every quarter | Security review |
| Every year | Full EARB architecture assessment |

### The Anti-Pattern We Fight

"We don't have time to improve it — we need to ship the next feature."

This statement is accepted when the product is genuinely at risk. It is rejected when it is used as a structural policy. A team that never improves its system ships features of declining quality on a codebase of increasing fragility. That is not a sustainable engineering organization.

---

## 15. DECISION MAKING FRAMEWORK

### The Decision Belief

> "Good decisions are documented. Great decisions are revisitable. Bad decisions are the ones nobody wrote down."

### Decision Types and Authorities

| Decision Type | Who Decides | Process | Documented Where |
|--------------|-------------|---------|-----------------|
| Code-level design | Individual engineer | Self + PR review | PR description |
| Module architecture | Module owner | Team sync | ADR |
| Cross-module architecture | Tech Lead | Architecture review | ADR |
| New domain entity | Tech Lead + EARB | EARB session | ADR + types/index.ts |
| Schema version increment | Tech Lead | EARB sign-off | ADR + db.ts comment |
| New external dependency | Tech Lead | Security review | ADR |
| New edition capability | Product + Tech Lead + EARB | EARB session | ADR + feature matrix |
| Privacy-impacting feature | Tech Lead + DPO | Privacy review | ADR + DPDP checklist |
| AI feature | Tech Lead + AI governance | AI review | ADR + prompt registry |

### The Decision Framework

For any significant decision, answer these questions:

**1. What problem are we solving?**
State the problem in one sentence. If you cannot, the problem is not understood well enough to decide.

**2. What are the options?**
At minimum two options (including "do nothing"). A decision with one option is not a decision — it is a mandate.

**3. What are the trade-offs?**
Every option has costs. State them honestly. The option you prefer should have its costs stated most honestly.

**4. What do we recommend and why?**
One clear recommendation with the primary reasoning. Not "it depends" — take a position.

**5. What would change this decision?**
What new information, if it emerged, would lead to a different decision? This keeps decisions revisitable.

**6. When will we review this decision?**
Every decision has a review date. Architecture does not stay decided forever.

### Escalation Path

When engineers disagree on a decision:
1. Present both positions in writing
2. Tech Lead makes the call
3. Either party may escalate to EARB (within 24 hours)
4. EARB decision is final — document it in an ADR

**The one thing we do not do**: Let disagreements fester undecided. An imperfect decision made and documented is always better than paralysis.

---

## 16. GOVERNANCE MODEL

### The Governance Belief

> "Governance is not bureaucracy. It is the system that lets 10 engineers work on the same codebase for 10 years without creating chaos."

### Governance Bodies

**Enterprise Architecture Review Board (EARB)**
- Composition: Chief Architect, Tech Leads (domain), Security Lead, DPO representative
- Meets: Monthly (regular) + on-demand (for urgent decisions)
- Authority: Domain model changes, architecture decisions, new external dependencies, security exceptions, principle exceptions
- Outputs: ADRs, principle updates, exception records

**Engineering Excellence Board (EEB)**
- Composition: Tech Leads, Senior Engineers, QA Lead
- Meets: Bi-weekly
- Authority: Coding standards, testing standards, DX improvements, refactor sprint prioritization
- Outputs: Standard updates, refactor sprint plans, quality metrics review

**Content Governance Board (CGB)**
- Composition: Education Lead, Child Safety Reviewer, Counsellor Representative, Localization Lead
- Meets: Monthly
- Authority: All content (missions, assessments, AI prompts, career descriptions)
- Outputs: Content approval, content retirement, localization sign-off

**Privacy & Compliance Board (PCB)**
- Composition: DPO, Legal, Tech Lead, Security Lead
- Meets: Quarterly + on any privacy-impacting feature
- Authority: DPDP compliance, consent architecture, data retention, breach response
- Outputs: Compliance attestations, DPDP impact assessments, breach notifications

### Code Review Governance

| PR Type | Required Reviewers | Required Checks |
|---------|-------------------|-----------------|
| Standard feature | 1 peer | TypeCheck + Tests + Lint |
| New entity / schema | Tech Lead + EARB member | + ADR filed |
| Security-impacting | Security Lead | + Security review |
| Privacy-impacting | DPO | + DPDP checklist |
| AI feature | AI governance reviewer | + Prompt safety review |
| School Edition | EdTech Lead | + Child safety review |

### The Governance Principles

**Governance enables speed**: The purpose of governance is to prevent the costly, slow disasters that come from undocumented, unreviewed decisions. It is not the purpose of governance to slow down good decisions.

**Light process for small decisions, heavy process for big ones**: Fixing a typo in a translation file does not require EARB approval. Changing the schema does.

**Governance is everyone's responsibility**: Governance is not the job of the governance bodies alone. Every engineer who submits a PR is practicing governance. Every engineer who raises a concern in code review is practicing governance.

**Document decisions, not just outcomes**: The EARB decision is documented with context and reasoning — not just the decision. Future engineers will thank us.

### Governance Anti-patterns

- "It's too small to need an ADR" — small decisions accumulate into architectural drift
- "We'll get sign-off later" — retroactive approval is not approval
- "The governance process is blocking us" — if governance is consistently blocking delivery, the process is wrong, not the work
- "Everyone knows this was decided" — if it's not written down, it was not decided

---

## RATIFICATION

This Engineering Philosophy document is the governing constitution of the LifePilot engineering organization. It supersedes all prior informal agreements, team norms, and undocumented conventions.

It is a living document. Proposals to amend it go through the Engineering Excellence Board. Amendments require consensus and are recorded with the date and rationale.

**Effective Date**: June 2026

**Next Review**: December 2026 (at Wave 2 completion)

**Classification**: Internal — All Engineering Staff

---

*"We are not building software. We are building the infrastructure of a child's future. That is the standard we hold ourselves to, every day, in every commit."*

---

*End of LifePilot Engineering Philosophy & Governance Constitution v1.0*
