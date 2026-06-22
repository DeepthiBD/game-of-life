# LifePilot — Architecture Decision Record Governance
## RP-003 | ADR Governance Framework v1.0
### Enterprise Architecture Review Board | June 2026 | Status: RATIFIED

---

> **Document Authority**: This document defines the complete governance framework for Architecture Decision Records at LifePilot. ADRs are the constitutional memory of engineering decisions. They explain not just *what* was decided, but *why*, *what was rejected*, and *when to revisit*. Every significant architectural decision that is not captured in an ADR is a decision that will be re-litigated, misunderstood, or silently reversed — usually at the worst possible moment.

---

## TABLE OF CONTENTS

1. What is an ADR and Why It Matters
2. ADR Lifecycle
3. ADR Template
4. Approval Workflow
5. Superseding ADRs
6. Retiring ADRs
7. Decision Log
8. Review Cadence
9. ADR Registry (Current)
10. Governance Rules Summary

---

## SECTION 1 — WHAT IS AN ADR AND WHY IT MATTERS

### Definition

An **Architecture Decision Record (ADR)** is a short, focused document that captures a single significant architectural decision: the context that drove it, the options that were considered, the decision made, and the consequences — both positive and negative.

ADRs are not design documents. They are not requirements. They are not tutorials. They are **decision records** — a first-person account of a choice made at a point in time, with the reasoning preserved for every engineer who comes after.

### Why LifePilot Takes ADRs Seriously

LifePilot is a platform designed to last 10+ years. It has 232 entities, 124 types, an 11-version schema, and an architecture designed to support 6 implementation waves. The decisions made in 2026 will be lived with in 2034.

Without ADRs, this happens:
- An engineer in 2028 changes the routing library because "react-router is more popular than wouter" — not knowing the ADR explaining the conscious choice
- A team in 2029 redesigns the domain model because "the current structure seems unnecessary" — not knowing the 18-month design history
- A new architect in 2030 questions the offline-first mandate — not knowing the child-connectivity research that drove it

With ADRs, this happens instead:
- The 2028 engineer reads ADR-002, understands the reasoning, and either accepts it or proposes a superseding ADR through the proper process
- The 2029 team reads the domain model history ADRs and builds forward, not sideways
- The 2030 architect finds ADR-001 and gains 12 months of strategic thinking in 10 minutes of reading

### The ADR Contract

Every engineer who contributes to LifePilot accepts this contract:

1. **I will write an ADR before making a significant architectural decision** — not after, not "later"
2. **I will read relevant ADRs before proposing changes** to established patterns
3. **I will not relitigate a decided ADR** without new information and a formal superseding proposal
4. **I will update the ADR status** when a decision is superseded or retired
5. **I accept that an undocumented decision is an invalid decision** in the context of EARB governance

---

## SECTION 2 — ADR LIFECYCLE

### States

```
                    ┌──────────────────────────────────────────────────────┐
                    │                                                      │
   [Author drafts]  │                                                      │
         │          │                                                      │
         ▼          │                                                      │
    ┌─────────┐     │    ┌──────────┐     ┌─────────────┐                 │
    │PROPOSED │────▶│───▶│ ACCEPTED │────▶│  SUPERSEDED │                 │
    └─────────┘     │    └──────────┘     └─────────────┘                 │
         │          │         │                                            │
         │          │         ▼                                            │
         │          │    ┌──────────┐                                      │
         └──────────│───▶│ REJECTED │                                      │
                    │    └──────────┘                                      │
                    │         │                                            │
                    │         ▼                                            │
                    │    ┌──────────┐                                      │
                    │    │ RETIRED  │                                      │
                    │    └──────────┘                                      │
                    │                                                      │
                    └──────────────────────────────────────────────────────┘
```

### State Definitions

| State | Meaning | Who Can Set | Immutable? |
|-------|---------|-------------|-----------|
| **PROPOSED** | Draft under review. The decision has not been made. Discussion is open. | Author | No — author edits freely |
| **ACCEPTED** | Decision ratified. Governs all future implementation in scope. | EARB or Tech Lead (by type) | Yes — content frozen. Only status can change. |
| **REJECTED** | Decision considered and explicitly not taken. Preserved for future reference. | EARB or Tech Lead | Yes — content frozen |
| **SUPERSEDED** | A later ADR has replaced this decision. The old ADR is preserved with a link to its successor. | EARB | Yes — content frozen |
| **RETIRED** | The decision is no longer relevant (e.g., the technology it governed is no longer used). | EARB | Yes — content frozen |

### Lifecycle Rules

**Rule L-01**: An ADR in PROPOSED state may be freely edited by its author. Once ACCEPTED, the ADR document is **immutable** — not even typo corrections are made (create a new ADR to clarify).

**Rule L-02**: ACCEPTED ADRs are never deleted. Even RETIRED ADRs remain in the repository. The decision history is permanent.

**Rule L-03**: Only the EARB may change an ADR's status from ACCEPTED to SUPERSEDED or RETIRED. An individual engineer cannot unilaterally deprecate a decision.

**Rule L-04**: A REJECTED ADR is as valuable as an ACCEPTED one. Future engineers need to know *what was considered and why it was rejected*, not just what was chosen.

**Rule L-05**: An ADR must be PROPOSED before any implementation work begins on the decision it governs. "I built it and now I'm writing the ADR" is not the ADR process.

---

## SECTION 3 — ADR TEMPLATE

### File Naming Convention
```
docs/adr/ADR-NNN-imperative-short-title.md

Examples:
  ADR-001-use-dexie-for-indexeddb-access.md
  ADR-002-use-wouter-instead-of-react-router.md
  ADR-012-additive-only-domain-model-evolution.md
  ADR-031-repository-pattern-introduction-wave-2.md
```

- `NNN` is zero-padded to 3 digits
- The title is imperative, kebab-case, and ≤ 60 characters
- Do not include dates in the filename — they are inside the document
- Numbers are assigned sequentially by the ADR generator: `pnpm pilot generate adr "use dexie for indexeddb"`

---

### The Full ADR Template

```markdown
# ADR-NNN: [Imperative Short Title]

<!--
  INSTRUCTIONS (delete before submitting):
  - Title: imperative verb phrase — "Use X", "Adopt Y pattern", "Reject Z approach"
  - Keep each section honest. A good ADR is not advocacy — it is a faithful record.
  - The Consequences section is the most important. Be specific. Be honest about the costs.
  - Do not edit this document after it is ACCEPTED. Clarifications go in a new ADR.
-->

## Status
PROPOSED

<!--
  Valid values: PROPOSED | ACCEPTED | REJECTED | SUPERSEDED by ADR-NNN | RETIRED
  Do not change status without EARB sign-off (except PROPOSED → author edits).
-->

## Date
YYYY-MM-DD

## Author(s)
[Name(s) of the engineer(s) who wrote this ADR]

## Reviewers
[Names of engineers who reviewed this ADR before EARB submission]

## EARB Approval
[Name of EARB member who ratified, and date — filled in at approval]

---

## 1. Context

<!--
  What is the situation that requires a decision?
  What problem are we solving? What forces are at play?
  What constraints exist (technical, organisational, regulatory)?
  What will happen if no decision is made?

  Write in present tense. Be factual, not argumentative.
  This section should be readable by someone with no prior context.
-->

[Describe the context in 3–8 paragraphs. Include:]
- The problem being solved
- The constraints in play (offline-first, DPDP, device targets, etc.)
- The trigger for this decision (new wave, user feedback, incident, etc.)
- Any relevant prior decisions this builds on (link to related ADRs)

---

## 2. Decision Drivers

<!--
  List the factors that matter most for this decision.
  These are the criteria against which options will be evaluated.
  Be explicit — unstated criteria lead to disputed decisions.
-->

| Driver | Weight | Notes |
|--------|--------|-------|
| Offline-first compatibility | Critical | Must work with no network |
| TypeScript type safety | High | Strict mode required |
| Bundle size impact | High | ≤ 200KB gzipped budget |
| Learning curve for new engineers | Medium | Team familiarity matters |
| Long-term maintenance cost | High | 10-year platform horizon |
| DPDP / privacy compliance | Critical | Non-negotiable |
| [Add additional drivers] | | |

---

## 3. Options Considered

<!--
  List every option that was seriously considered.
  Include "do nothing" if it was considered.
  Do NOT list options that were never seriously considered.
  Each option gets its own subsection.
-->

### Option A: [Name]

**Description**: [What is this option? What does choosing it mean in practice?]

**Pros**:
- [Concrete advantage with respect to decision drivers]
- [Concrete advantage]

**Cons**:
- [Concrete disadvantage with respect to decision drivers]
- [Concrete disadvantage]

**Unknowns / Risks**:
- [What don't we know? What might go wrong?]

**Implementation effort**: [Low / Medium / High / Unknown]

---

### Option B: [Name]

[Same structure as Option A]

---

### Option C: Do Nothing / Status Quo

[Always include this unless it is genuinely not a valid option, and explain why]

---

## 4. Decision

<!--
  State clearly what was decided.
  Use the same language as the ADR title.
  One sentence if possible.
  This is not the place for hedging or qualification — those go in Consequences.
-->

**We will [decision statement].**

[1–2 sentences of clarification if needed. No more.]

---

## 5. Rationale

<!--
  Explain why this option was chosen over the alternatives.
  Reference the decision drivers explicitly.
  If the decision was a close call, say so — and explain what tipped it.
  If there was disagreement, record the dissenting view and why the majority prevailed.
-->

[3–8 paragraphs explaining the reasoning. Include:]
- Which drivers most influenced the decision
- Why the chosen option outperformed the alternatives on those drivers
- Any dissenting views and why the majority prevailed
- Any external evidence, research, or precedent that supported the decision

---

## 6. Consequences

<!--
  This is the most important section. Be honest.
  List POSITIVE, NEGATIVE, and NEUTRAL consequences.
  Future engineers will judge the quality of this ADR by the honesty of this section.
-->

### Positive
- [Concrete benefit that will result from this decision]
- [Concrete benefit]

### Negative
- [Concrete cost or limitation that results from this decision]
- [Concrete cost — do not hide costs here]

### Neutral
- [Change in behaviour that is neither clearly positive nor negative]

### Future Constraints
- [What does this decision foreclose? What future decisions will be constrained by this one?]

---

## 7. Implementation Notes

<!--
  Optional but strongly recommended.
  Specific guidance for engineers implementing this decision.
  This is NOT the place for full implementation documentation — link to golden paths instead.
-->

- [Key implementation guideline]
- [Common pitfall to avoid]
- [Reference to relevant golden path or template]
- [Link to relevant external documentation]

---

## 8. Compliance

<!--
  Which architecture principles does this decision uphold or constrain?
  Which EARB guardrails does it satisfy?
-->

| Principle / Guardrail | Status | Notes |
|----------------------|--------|-------|
| AP-01 Offline First | ✅ Satisfied | [How] |
| AP-02 Additive Only | ✅ Satisfied | [How] |
| AP-13 TypeScript Strict | ✅ Satisfied | [How] |
| G-09 No `any` types | ✅ Satisfied | [How] |
| [Any other relevant principle] | | |

---

## 9. Review Date

<!--
  When should this decision be formally re-evaluated?
  This is a commitment — not a suggestion.
  Common triggers: wave completion, new technology availability, team size change,
  regulatory change, performance target missed.
-->

**Scheduled review**: [Date or milestone, e.g., "Wave 2 completion" or "December 2026"]

**Review trigger conditions** (any of these should prompt early review):
- [Condition that would make this decision worth revisiting]
- [Condition]

---

## 10. Related ADRs

| ADR | Relationship |
|-----|-------------|
| ADR-NNN: [Title] | Depends on |
| ADR-NNN: [Title] | Supersedes |
| ADR-NNN: [Title] | Related to |

---

## 11. References

- [Link to external documentation, research paper, or standard]
- [Link to GitHub discussion or PR where this was debated]
- [Link to relevant section of RP-003 Architecture Blueprint]

---

<!--
  EARB APPROVAL RECORD (filled in by EARB, not the author)
-->

## EARB Approval Record

| Field | Value |
|-------|-------|
| Submitted for review | YYYY-MM-DD |
| EARB session date | YYYY-MM-DD |
| Approved by | [EARB member name(s)] |
| Approval conditions | [None / Conditions listed] |
| Final status set | YYYY-MM-DD |
| Status | PROPOSED → ACCEPTED |
```

---

## SECTION 4 — APPROVAL WORKFLOW

### Decision Authority Matrix

Not all ADRs require full EARB review. The decision authority is tiered by impact:

| Decision Type | Examples | Approver | EARB Session Required? | Timeline |
|--------------|---------|----------|----------------------|----------|
| **Tier 1 — Module-level** | New service pattern within a module, local hook convention | Tech Lead | No — async approval | 2 business days |
| **Tier 2 — Cross-module** | Shared utility pattern, cross-domain service communication, new shared library | Tech Lead + 1 EARB member | No — async approval | 3 business days |
| **Tier 3 — Platform-wide** | New external dependency, build tool change, test framework change | Full EARB | Yes — synchronous session | 5 business days |
| **Tier 4 — Domain model** | New entity, new enum, schema version increment | Full EARB + domain owner | Yes — synchronous session | 5 business days |
| **Tier 5 — Constitutional** | Change to architecture principles, change to the additive-only rule, edition architecture change | Full EARB + EEB vote | Yes — dedicated session | 10 business days |

### Approval Workflow — Step by Step

```
STEP 1 — AUTHOR: Draft the ADR
  ├── Run: pnpm pilot generate adr "short-title"
  ├── Fill in all sections of the template
  ├── Set status: PROPOSED
  ├── Identify the tier (see matrix above)
  └── Request peer review from 1–2 engineers

STEP 2 — PEER REVIEW (1–2 engineers)
  ├── Verify: context is accurate and complete
  ├── Verify: all serious options are listed
  ├── Verify: consequences are honest (no hidden costs)
  ├── Verify: compliance section is filled
  ├── Provide written feedback in PR comments
  └── Approve or request changes (1–2 review cycles)

STEP 3 — SUBMIT FOR APPROVAL
  ├── Create a PR titled: "[ADR-NNN] [Title]"
  ├── Tag PR with label: "adr" + tier label ("tier-1" through "tier-5")
  ├── Assign appropriate approver(s) per decision matrix
  └── Link any related implementation PR (implementation MUST NOT merge before ADR is ACCEPTED)

STEP 4 — APPROVAL (Tier 1–2: async | Tier 3–5: EARB session)
  ├── Tier 1–2: Tech Lead reviews PR, approves or requests changes
  ├── Tier 3–5: EARB session scheduled within the SLA window
  │   ├── Author presents the ADR (10 minutes max)
  │   ├── EARB discusses (open)
  │   ├── EARB votes (majority required for ACCEPTED; unanimous for Tier 5)
  │   └── Conditions of approval recorded (if any)
  └── EARB approval record filled in (Section 11 of template)

STEP 5 — MERGE AND REGISTER
  ├── Status updated to ACCEPTED (or REJECTED)
  ├── PR merged to main
  ├── Decision Log updated (Section 7 of this document)
  ├── Implementation PR may now be merged
  └── Relevant engineers notified via team channel
```

### The Separation Rule

> **No implementation code for a Tier 3–5 decision merges before the ADR is ACCEPTED.**

This rule is enforced by:
1. PR template reminder: "Does this PR require an ADR? Has the ADR been ACCEPTED?"
2. CI check: `pnpm pilot check adr-required` — scans for common pattern-change signals
3. Code review: reviewers reject implementation PRs that reference undecided ADRs

For Tier 1–2 decisions, the ADR may be approved asynchronously alongside the implementation PR — but the ADR PR must be merged first.

### Approval Fast-Track

For time-sensitive decisions (production incident, regulatory deadline), a **fast-track** process is available:

- EARB chair convenes an emergency session (virtual, ≥ 3 EARB members present)
- Author presents the ADR in 5 minutes
- Discussion capped at 15 minutes
- Decision reached in the session
- Fast-track is logged in the EARB session record
- Full ADR documentation completed within 48 hours of the fast-track decision

Fast-track is not a mechanism to avoid proper review. Abuse of fast-track is escalated to the EEB.

---

## SECTION 5 — SUPERSEDING ADRs

### When to Supersede

An ADR is superseded when a new decision changes, replaces, or overturns a previously ACCEPTED decision. Superseding is how the architecture evolves without losing its history.

**Supersede when**:
- New technology makes the original decision obsolete
- New requirements make the original constraints no longer valid
- The consequences of the original decision turned out differently than expected
- A new wave of the platform changes the scope in a way the original decision didn't anticipate
- Evidence (performance data, user research, incident analysis) contradicts the original reasoning

**Do NOT supersede when**:
- You simply prefer a different approach without new evidence
- You disagree with the original decision (raise it in EARB instead)
- The original decision is working well (don't fix what isn't broken)

### Superseding Process

```
STEP 1 — Write the superseding ADR
  ├── Use the standard ADR template
  ├── In Section 10 (Related ADRs): mark "Supersedes ADR-NNN"
  ├── In the Context section: explain why the original decision is no longer appropriate
  └── Explicitly describe what changes from the original decision

STEP 2 — Submit for approval (same tier as the original, minimum Tier 2)
  └── The superseding ADR goes through full approval workflow

STEP 3 — On ACCEPTED: update the original ADR
  ├── Change status to: SUPERSEDED by ADR-NNN
  ├── Add at top of original: "## SUPERSEDED\nThis decision was superseded by [ADR-NNN](link) on YYYY-MM-DD."
  └── Do NOT modify any other content of the original ADR

STEP 4 — Update the Decision Log
  └── Mark original entry as SUPERSEDED, add successor link
```

### Example Superseding Header (added to the superseded ADR)

```markdown
---
> ⚠️ **SUPERSEDED**
> This ADR was superseded by [ADR-031: Introduce Repository Pattern in Wave 2](ADR-031-introduce-repository-pattern-wave-2.md) on 2026-09-15.
> The original decision below is preserved for historical context.
---
```

### What Superseding Is NOT

- **Retroactive invalidation**: The original decision was correct given the information at the time. The superseding ADR does not imply the original was wrong — only that the context has changed.
- **Excuse for undocumented changes**: If implementation quietly changes from what an ACCEPTED ADR specifies, that is not superseding — that is a violation. Superseding requires a new ACCEPTED ADR first.
- **A way to bypass the additive-only rule**: The additive-only rule for the domain model can only be changed by a Tier 5 ADR with unanimous EARB vote.

---

## SECTION 6 — RETIRING ADRs

### When to Retire

An ADR is retired when the decision it records is no longer relevant — because the technology, feature, or context it governed has been removed or no longer applies.

**Retire when**:
- The technology governed by the ADR is no longer used in the codebase
- The feature the decision applies to has been fully removed (via proper deprecation process)
- The decision was scoped to a wave that is fully complete and the decision no longer has ongoing implications

**Do NOT retire when**:
- You want to re-open a previously decided question (supersede instead)
- The ADR's consequences are still relevant to current code
- The ADR documents a pattern that still exists even if the original motivation is gone

### Retirement Process

```
STEP 1 — Verify the ADR is truly no longer relevant
  ├── Confirm no current code depends on the decision
  ├── Confirm no future wave references this decision
  └── Get confirmation from the original author (if still at the company) or domain owner

STEP 2 — Submit a brief retirement proposal (no full ADR required)
  ├── GitHub issue or PR comment: "Proposing retirement of ADR-NNN because [reason]"
  └── Assign to Tech Lead for async approval (no EARB session required for retirement)

STEP 3 — On approval: update the retired ADR
  ├── Change status to: RETIRED
  ├── Add at top: "## RETIRED\nThis ADR was retired on YYYY-MM-DD. Reason: [brief reason]."
  └── Do NOT delete any content

STEP 4 — Update the Decision Log
  └── Mark as RETIRED with date and reason
```

### The Never-Delete Rule

ADRs are never deleted from the repository. Even REJECTED, SUPERSEDED, and RETIRED ADRs remain. The full decision history — including mistakes and rejected paths — is the institutional memory of the platform.

---

## SECTION 7 — DECISION LOG

### Purpose
The Decision Log is a single, always-current index of all ADRs. It is the first place any engineer goes to understand the architectural history of a decision. It is maintained in `docs/adr/DECISION_LOG.md` and updated on every ADR status change.

### Decision Log Format

```markdown
# LifePilot Architecture Decision Log
Last updated: YYYY-MM-DD | Total ADRs: NNN

## Index by Domain

### Foundation & Principles
| ADR | Title | Status | Date | Tier |
|-----|-------|--------|------|------|
| ADR-001 | Adopt offline-first as primary architecture principle | ACCEPTED | 2025-01 | 5 |
| ADR-002 | Use wouter instead of react-router-dom | ACCEPTED | 2025-01 | 2 |
| ADR-003 | Use Dexie.js as IndexedDB ORM | ACCEPTED | 2025-01 | 3 |
| ADR-004 | Establish additive-only domain model evolution rule | ACCEPTED | 2025-01 | 5 |
| ADR-005 | Use pnpm workspaces for monorepo management | ACCEPTED | 2025-01 | 3 |

### Domain Model
| ADR | Title | Status | Date | Tier |
|-----|-------|--------|------|------|
| ADR-010 | Freeze domain model at 232 entities, Schema v11 | ACCEPTED | 2026-06 | 5 |
| ADR-011 | Resolve naming collisions via Life* and DecisionScenario* prefixes | ACCEPTED | 2026-05 | 4 |
| ADR-012 | Store boolean isActive as 0/1 integer in IndexedDB | ACCEPTED | 2025-03 | 1 |

### Architecture Patterns
| ADR | Title | Status | Date | Tier |
|-----|-------|--------|------|------|
| ADR-020 | Adopt safeRun + StorageResult<T> pattern for all service methods | ACCEPTED | 2025-02 | 2 |
| ADR-021 | Reserve repository pattern implementation for Wave 2 | ACCEPTED | 2026-06 | 3 |
| ADR-022 | Use feature flags for all edition-gated capabilities | ACCEPTED | 2025-04 | 3 |
| ADR-023 | Adopt EventBus pattern (implementation deferred to Wave 2) | ACCEPTED | 2026-06 | 3 |

### Technology Choices
| ADR | Title | Status | Date | Tier |
|-----|-------|--------|------|------|
| ADR-030 | Use Tailwind CSS v4 (no inline styles, no CSS-in-JS) | ACCEPTED | 2025-01 | 2 |
| ADR-031 | Use shadcn/ui as component primitive library | ACCEPTED | 2025-01 | 2 |
| ADR-032 | Use framer-motion for animations | ACCEPTED | 2025-01 | 2 |
| ADR-033 | Use i18next + react-i18next for internationalisation | ACCEPTED | 2025-01 | 3 |
| ADR-034 | Use Vitest as test framework | ACCEPTED | 2025-01 | 2 |
| ADR-035 | Use vite-plugin-pwa + Workbox for PWA and offline caching | ACCEPTED | 2025-01 | 3 |

### Security & Privacy
| ADR | Title | Status | Date | Tier |
|-----|-------|--------|------|------|
| ADR-040 | DPDP 2023 as governing privacy framework | ACCEPTED | 2025-02 | 5 |
| ADR-041 | No third-party analytics in MVP (privacy-first telemetry) | ACCEPTED | 2025-03 | 3 |
| ADR-042 | Parental consent required for all data processing of under-14 pilots | ACCEPTED | 2025-02 | 5 |

### AI
| ADR | Title | Status | Date | Tier |
|-----|-------|--------|------|------|
| ADR-050 | AI features are opt-in and advisory only | ACCEPTED | 2025-06 | 4 |
| ADR-051 | All AI providers abstracted behind AIProvider interface | ACCEPTED | 2025-06 | 3 |
| ADR-052 | All prompts versioned and stored in PromptTemplate entity | ACCEPTED | 2025-06 | 3 |
| ADR-053 | Every AI feature must have an offline fallback | ACCEPTED | 2025-06 | 4 |

## Status Summary
| Status | Count |
|--------|-------|
| ACCEPTED | 22 |
| PROPOSED | 0 |
| REJECTED | 0 |
| SUPERSEDED | 0 |
| RETIRED | 0 |
| **Total** | **22** |
```

### Decision Log Maintenance Rules

**Rule DL-01**: The Decision Log is updated in the same commit that changes an ADR's status. They are never out of sync.

**Rule DL-02**: ADRs are indexed by domain, not just sequentially. An engineer asking "how did we decide to handle privacy?" can find all privacy ADRs without reading every ADR.

**Rule DL-03**: The Decision Log is auto-validated by CI: `pnpm pilot check adr-log` verifies that every ADR file has a corresponding entry and every entry links to an existing file.

**Rule DL-04**: The Summary statistics at the bottom of the Decision Log are auto-generated by `pnpm pilot list adrs --summary` and updated on every ADR merge.

### Searching the Decision Log

```bash
# Find all ADRs related to privacy
pnpm pilot list adrs --tag privacy

# Find all ACCEPTED ADRs in the domain model domain
pnpm pilot list adrs --domain "domain-model" --status accepted

# Find ADRs due for review this quarter
pnpm pilot list adrs --review-before 2026-12-31

# Find all ADRs that supersede or are superseded by ADR-021
pnpm pilot list adrs --related ADR-021

# Open the most recent ADR
pnpm pilot open adr latest
```

---

## SECTION 8 — REVIEW CADENCE

### Why ADRs Need Scheduled Reviews

An ADR captures the best decision given the information available at a point in time. Information changes. Technology evolves. The platform grows. User research reveals new realities. Regulations change. An ADR with no review date is an ADR that will quietly become obsolete — its guidance followed out of habit rather than merit.

The review cadence is the mechanism that keeps ADRs alive and relevant.

### Review Triggers

| Trigger Type | Description | Action |
|-------------|-------------|--------|
| **Scheduled review date** | The review date specified in the ADR has arrived | Initiate formal review |
| **Wave boundary** | A new implementation wave begins | Review all ADRs tagged for that wave |
| **Platform incident** | A production incident reveals that an ADR's assumptions were wrong | Immediate review, possible superseding |
| **Technology event** | A major dependency releases a breaking change or becomes unmaintained | Review all ADRs referencing that technology |
| **Regulatory change** | DPDP or other applicable regulation is amended | Review all privacy and security ADRs |
| **Team size milestone** | Team grows past 10, 25, 50 engineers | Review process ADRs (governance, DX) |
| **Performance target missed** | A measurable NFR target is missed | Review ADRs that govern the affected area |
| **Engineer request** | Any engineer may formally request an ADR review | Submitted to Tech Lead; reviewed within 5 days |

### Review Process

```
STEP 1 — IDENTIFY: Tech Lead identifies ADRs due for review
  ├── Monthly: pnpm pilot list adrs --review-before [30-days-from-now]
  └── At each wave: pnpm pilot list adrs --wave [wave-number]

STEP 2 — ASSESS: For each ADR due for review, answer:
  ├── Is the context still accurate?
  ├── Are the consequences playing out as expected?
  ├── Has new information emerged that changes the calculus?
  ├── Is the implementation still consistent with the decision?
  └── Is the review date still appropriate?

STEP 3 — DECIDE: One of four outcomes:
  ├── REAFFIRM: Decision is still correct. Update review date. No ADR changes.
  ├── AMEND NOTE: Add a "Review Note" at the bottom of the ADR (non-immutable section)
  │              to record observations without changing the original content.
  ├── SUPERSEDE: Decision needs to change. Write a new ADR.
  └── RETIRE: Decision no longer applies. Follow retirement process.

STEP 4 — RECORD: Record outcome in the Decision Log
  └── Regardless of outcome, the review date in the Decision Log is updated
```

### Review Cadence by Tier

| Tier | Default Review Cadence | Additional Trigger |
|------|----------------------|-------------------|
| **Tier 1** (module-level) | 12 months | Wave boundary |
| **Tier 2** (cross-module) | 6 months | Wave boundary |
| **Tier 3** (platform-wide) | 6 months | Wave boundary + major dependency release |
| **Tier 4** (domain model) | At each wave boundary | Any schema issue in production |
| **Tier 5** (constitutional) | 12 months | Regulatory change + team size milestone |

### The EARB ADR Review Session

At each wave boundary, the EARB conducts a formal **ADR Review Session**:

**Agenda**:
1. Review Decision Log status summary (10 minutes)
2. Review all ADRs with passed review dates (5 minutes each, max 10 ADRs per session)
3. Review ADRs tagged for the completed wave (10 minutes per ADR)
4. Identify ADRs needed for the next wave (planning)
5. Assign authorship for upcoming ADRs

**Session Output**:
- Updated Decision Log (status changes, new review dates)
- List of ADRs to be written for the next wave
- List of ADRs to be superseded (with owners assigned)
- Session notes committed to `docs/adr/sessions/`

### Proactive ADR Planning

The EARB maintains an **ADR Backlog** — a list of decisions that need to be made but have not yet been written. This backlog is reviewed at each EARB session.

```markdown
# docs/adr/BACKLOG.md — ADR Backlog

## Wave 2 Decisions Needed
- [ ] Repository pattern implementation approach (Tier 3) — Owner: [TBD] — By: 2026-08-01
- [ ] EventBus implementation approach (Tier 3) — Owner: [TBD] — By: 2026-08-01
- [ ] storageService.ts file splitting strategy (Tier 2) — Owner: [TBD] — By: 2026-07-15
- [ ] Server-side sync API design (Tier 3) — Owner: [TBD] — By: 2026-09-01
- [ ] AI Gateway provider selection (Tier 3) — Owner: [TBD] — By: 2026-09-01

## Wave 3 Decisions Needed (planned)
- [ ] Career Explorer data model extensions (Tier 4)
- [ ] Portfolio export format (Tier 2)
- [ ] AI Coaching persona design (Tier 3)
```

---

## SECTION 9 — ADR REGISTRY (SEED)

The following are the foundational ADRs that should exist when this governance framework is adopted. They represent decisions already made through the RP-003 process and should be formalised as ADRs immediately.

| Priority | ADR Title | Tier | Author | Target Date |
|----------|-----------|------|--------|-------------|
| P0 | Adopt offline-first as primary architecture principle | 5 | Chief Architect | Immediate |
| P0 | Establish additive-only domain model evolution rule | 5 | Chief Architect | Immediate |
| P0 | DPDP 2023 as governing privacy framework | 5 | DPO + Tech Lead | Immediate |
| P0 | Parental consent required for under-14 data processing | 5 | DPO + Tech Lead | Immediate |
| P1 | Use wouter instead of react-router-dom | 2 | Tech Lead | Week 1 |
| P1 | Use Dexie.js as IndexedDB ORM | 3 | Tech Lead | Week 1 |
| P1 | Use pnpm workspaces for monorepo | 3 | Tech Lead | Week 1 |
| P1 | Adopt safeRun + StorageResult<T> service pattern | 2 | Tech Lead | Week 1 |
| P1 | Use Tailwind CSS v4 (no CSS-in-JS) | 2 | Tech Lead | Week 1 |
| P1 | Use i18next with 10 Indian language support | 3 | Tech Lead | Week 1 |
| P1 | Freeze domain model at 232 entities Schema v11 | 5 | EARB | Week 1 |
| P2 | AI features are opt-in and advisory only | 4 | AI Lead | Week 2 |
| P2 | All AI providers abstracted behind interface | 3 | AI Lead | Week 2 |
| P2 | No third-party analytics in MVP | 3 | DPO + Tech Lead | Week 2 |
| P2 | Reserve repository pattern for Wave 2 | 3 | Tech Lead | Week 2 |
| P2 | Defer EventBus implementation to Wave 2 | 3 | Tech Lead | Week 2 |

---

## SECTION 10 — GOVERNANCE RULES SUMMARY

```
ADR-RULE-01  An ADR must be written before significant implementation begins.
ADR-RULE-02  An ACCEPTED ADR is immutable. Its status may change; its content may not.
ADR-RULE-03  ADRs are never deleted from the repository, regardless of status.
ADR-RULE-04  No Tier 3–5 implementation code merges before the governing ADR is ACCEPTED.
ADR-RULE-05  Only the EARB may move an ADR from ACCEPTED to SUPERSEDED or RETIRED.
ADR-RULE-06  A REJECTED ADR is preserved and remains searchable. Rejection is not erasure.
ADR-RULE-07  All ADRs have a review date. No ADR may be submitted without a review date.
ADR-RULE-08  The Decision Log is updated in the same commit as an ADR status change.
ADR-RULE-09  A disagreement with an ACCEPTED ADR is resolved by proposing a superseding ADR,
             not by silently implementing a different approach.
ADR-RULE-10  The additive-only rule can only be changed by a Tier 5 ADR with unanimous EARB vote.
ADR-RULE-11  Fast-track approvals require ≥ 3 EARB members and are logged separately.
ADR-RULE-12  Every ADR references at least one Architecture Principle from RP-003 Section 7.
ADR-RULE-13  The CLI `pilot generate adr` is the only approved way to create new ADR files
             (ensures sequential numbering and correct file naming).
ADR-RULE-14  All ADRs for a wave boundary are reviewed by EARB before the next wave begins.
ADR-RULE-15  An engineer may propose any ADR. An engineer may NOT approve their own ADR.
```

---

## APPENDIX A — ANTI-PATTERNS IN ADR WRITING

### The Advocacy ADR
**Problem**: The context section is written to justify a decision already made, not to describe the situation honestly.
**Signal**: Only one option is listed. All pros go to the chosen option. All cons go to the rejected option.
**Fix**: Write the context before deciding. Have a reviewer who prefers a different option review the alternatives section.

### The Implementation Manual
**Problem**: The ADR contains 10 pages of implementation code and step-by-step instructions.
**Signal**: ADR is longer than 4 pages. Contains code blocks > 20 lines.
**Fix**: ADR describes the decision; implementation goes in a golden path or template.

### The Foregone Conclusion
**Problem**: The ADR is written after the code is shipped, as a post-hoc justification.
**Signal**: The ADR date is after the implementation PR date. The "consequences" section says "so far so good."
**Fix**: Establish the ADR-first rule enforced in PR templates and code review.

### The Missing Costs
**Problem**: The consequences section only lists benefits. Costs are omitted or downplayed.
**Signal**: "Negative" consequences section says "none identified" or "minimal."
**Fix**: Every architectural decision has costs. If you cannot name them, you do not understand the decision well enough to write the ADR.

### The Eternal Draft
**Problem**: An ADR sits in PROPOSED for months. Implementation proceeds without approval.
**Signal**: PROPOSED ADR older than the approval SLA. Related implementation PR is merged.
**Fix**: SLA enforcement. Implementation cannot merge while governing ADR is PROPOSED.

### The Orphaned Superseder
**Problem**: A new ADR supersedes an old one, but the old ADR's status is never updated.
**Signal**: Decision Log shows ACCEPTED ADR, but a newer ADR supersedes it without the original being updated.
**Fix**: ADR merge CI check: superseding ADR must include a patch to the original ADR's status field.

---

## APPENDIX B — ADR QUALITY CHECKLIST

Before submitting an ADR for approval, verify:

```
CONTENT QUALITY
[ ] Title is imperative (verb phrase), specific, and ≤ 60 characters
[ ] Context section describes the situation, not the solution
[ ] At least 2 options considered (including status quo where applicable)
[ ] Each option's pros and cons are written from a neutral perspective
[ ] Consequences section names at least 1 negative consequence
[ ] Review date is specific (not "sometime next year")
[ ] All relevant Architecture Principles cited in Compliance section

PROCESS QUALITY
[ ] ADR number is sequential (generated by pilot-cli)
[ ] At least 1 peer has reviewed the draft
[ ] Implementation PR is NOT yet merged (for Tier 3+)
[ ] Tier is correctly assessed per the Decision Authority Matrix
[ ] Related ADRs are linked

GOVERNANCE QUALITY
[ ] Author is not listed as the sole approver
[ ] EARB session is scheduled (for Tier 3–5)
[ ] No content from the RP-003 Blueprint is duplicated — reference it instead
[ ] The ADR is self-contained — a reader with no prior context can understand it
```

---

*End of LifePilot ADR Governance Framework v1.0*

*This framework takes effect immediately. All future architectural decisions must follow this process. The founding ADRs listed in Section 9 must be formalised within 2 weeks of ratification.*
