# LifePilot — Engineering Metrics & Health Framework
## RP-003 | Engineering Metrics v1.0
### Engineering Excellence Board | June 2026 | Status: RATIFIED

---

> **Document Authority**: This document defines the complete engineering metrics framework for LifePilot. Metrics are not vanity — they are signals. Every metric defined here exists to answer a specific question about the health of the engineering organisation, the quality of the software, or the productivity of the team. Metrics that cannot answer a question are removed. Metrics that cannot be acted upon are never added.

---

## TABLE OF CONTENTS

1. Metrics Philosophy
2. DORA Metrics Framework
3. Lead Time
4. Deployment Frequency
5. Change Failure Rate
6. Mean Time to Recovery
7. Cycle Time
8. Code Churn
9. Technical Debt
10. Code Complexity
11. Coverage Trends
12. Defect Leakage
13. Developer Productivity
14. Velocity
15. Engineering Health Dashboard

---

## SECTION 1 — METRICS PHILOSOPHY

### Why We Measure

> "You cannot improve what you do not measure. You cannot measure what you do not define. You cannot define what you do not understand."

At LifePilot, engineering metrics serve three purposes:

**1. Early warning**: Surface problems before they become crises. A rising change failure rate is a warning sign. A plummeting coverage trend is a warning sign. Catching these early is vastly cheaper than fixing them late.

**2. Investment justification**: Every sprint has a finite amount of capacity. Metrics make the case for investing in quality, DX, and technical debt reduction — not as abstractions, but as evidence.

**3. Learning**: When something goes wrong — a production incident, a sprint miss, a quality regression — metrics tell the story of what happened, not just what the team remembers.

### What We Don't Do with Metrics

| Anti-Pattern | Why We Reject It |
|-------------|-----------------|
| Use metrics to evaluate individual engineers | Metrics measure systems, not people. Using coverage to judge an engineer destroys the metric's validity — engineers will game it. |
| Report metrics without context | A deployment frequency of "3 per week" means nothing without knowing what week, what type of deployments, and what the baseline is. |
| Chase metric targets at the expense of outcomes | A 100% coverage number achieved with trivial tests is worthless. We target meaningful coverage, not the number. |
| Ignore metrics that are declining | Metrics are only useful if someone acts on them. An ignored metric is a wasted measurement. |
| Add metrics we cannot act on | If a metric is declining and we cannot change our behaviour in response, the metric should not be tracked. |

### Metric Tiers

| Tier | Cadence | Audience | Purpose |
|------|---------|---------|---------|
| **T1 — Operational** | Real-time / daily | On-call, engineering leads | Immediate incident detection |
| **T2 — Sprint** | Weekly | Engineering team | Sprint health and delivery |
| **T3 — Executive** | Monthly | EEB, EARB, leadership | Trend analysis and investment decisions |
| **T4 — Strategic** | Quarterly | EARB, product leadership | Platform evolution and wave planning |

---

## SECTION 2 — DORA METRICS FRAMEWORK

### What DORA Measures

The DORA (DevOps Research and Assessment) four key metrics represent the most validated predictors of engineering organisational performance. LifePilot adopts them as the primary framework for measuring engineering delivery health.

```
DORA FOUR KEY METRICS
  ┌─────────────────────────────────────────────────────────────────┐
  │                                                                 │
  │  THROUGHPUT METRICS              STABILITY METRICS             │
  │  ┌───────────────────┐           ┌───────────────────────┐     │
  │  │  Lead Time for    │           │  Change Failure Rate   │     │
  │  │    Changes        │           │                        │     │
  │  └───────────────────┘           └───────────────────────┘     │
  │  ┌───────────────────┐           ┌───────────────────────┐     │
  │  │  Deployment       │           │  Mean Time to          │     │
  │  │  Frequency        │           │  Recovery (MTTR)       │     │
  │  └───────────────────┘           └───────────────────────┘     │
  │                                                                 │
  └─────────────────────────────────────────────────────────────────┘
```

### LifePilot DORA Performance Targets

| Metric | Elite (Target) | High | Medium | Low |
|--------|---------------|------|--------|-----|
| **Lead Time** | < 1 day | 1 day – 1 week | 1 week – 1 month | > 1 month |
| **Deployment Frequency** | Multiple/day | Weekly | Monthly | < Monthly |
| **Change Failure Rate** | < 5% | 5–10% | 10–15% | > 15% |
| **MTTR** | < 1 hour | < 1 day | < 1 week | > 1 week |

**Current wave target**: High performer across all four metrics by end of Wave 1.
**Strategic target**: Elite performer by Wave 3.

### DORA Measurement Infrastructure

```
Data Sources:
  ├── Git history          → Lead time, deployment frequency, commit frequency
  ├── CI/CD pipeline       → Build success/failure, deployment timestamps
  ├── Incident log         → Change failure rate, MTTR
  ├── PR metadata          → Review time, cycle time
  └── Sentry / monitoring  → Incident detection timestamps
```

---

## SECTION 3 — LEAD TIME

### Definition

**Lead Time for Changes** = time from the first commit on a branch to that code being live in production.

```
Code committed → PR opened → PR reviewed → PR merged → CI passes → Deployed → LIVE

|←────────────────── Lead Time ───────────────────────────────────────────────→|
```

### Why Lead Time Matters

Lead time is the primary feedback loop metric. Short lead time means engineers discover whether their work actually solves the problem — quickly. Long lead time means features sit in review queues, integration is deferred, and the team loses the ability to respond to user needs.

### Lead Time Breakdown

| Sub-metric | Definition | Target |
|-----------|-----------|--------|
| **Coding time** | First commit → PR opened | < 1 day per feature |
| **Review time** | PR opened → PR approved | < 4 hours |
| **Merge time** | PR approved → merged | < 1 hour |
| **Build time** | Merge → CI passes | < 5 minutes |
| **Deploy time** | CI passes → live in production | < 15 minutes |
| **Total lead time** | First commit → live | < 1 day (target) |

### Lead Time Measurement

```typescript
// Conceptual measurement model
interface LeadTimeMeasurement {
  prId: string;
  firstCommitAt: Date;
  prOpenedAt: Date;
  prApprovedAt: Date;
  prMergedAt: Date;
  ciBuildCompletedAt: Date;
  deployedToProductionAt: Date;

  // Computed
  codingTimeHours: number;       // firstCommit → prOpened
  reviewTimeHours: number;       // prOpened → prApproved
  mergeTimeHours: number;        // prApproved → prMerged
  buildTimeMinutes: number;      // prMerged → ciCompleted
  deployTimeMinutes: number;     // ciCompleted → deployed
  totalLeadTimeHours: number;    // firstCommit → deployed
}
```

### Lead Time Targets by Change Type

| Change Type | Target Lead Time | Notes |
|------------|-----------------|-------|
| Hotfix (P0) | < 2 hours | Fast-track review + deploy |
| Bug fix | < 1 day | Standard pipeline |
| Feature (small) | 1–2 days | < 200 lines changed |
| Feature (medium) | 2–5 days | New module page or service |
| Feature (large) | 5–10 days | New module or major domain addition |
| Architecture change | 10–20 days | ADR required; extra review cycles |

### Lead Time Health Alerts

| Condition | Severity | Action |
|-----------|---------|--------|
| PR open > 24 hours without review | Warning | Ping reviewer; escalate to Tech Lead |
| PR open > 48 hours without review | Critical | Tech Lead takes ownership of review |
| Lead time P90 > 5 days (rolling 4 weeks) | Warning | Sprint retrospective investigation |
| Lead time P90 > 10 days (rolling 4 weeks) | Critical | EEB investigation; DX improvement sprint |

---

## SECTION 4 — DEPLOYMENT FREQUENCY

### Definition

**Deployment Frequency** = how often the team deploys code to production.

This is not the number of commits or PRs — it is actual production deployments.

### Why Deployment Frequency Matters

High deployment frequency means:
- Features reach users faster
- Each deployment is smaller and lower risk
- The team has more practice deploying (reducing deployment-induced incidents)
- Rollback is faster when things go wrong (less to undo)

Low deployment frequency is a symptom of either low throughput (not building enough) or high friction (building but unable to ship).

### LifePilot Deployment Targets

| Wave | Environment | Target Frequency |
|------|-------------|-----------------|
| Wave 0 (current) | Replit preview | On every merged PR |
| Wave 1 (MVP) | Production PWA | Daily (or on PR merge) |
| Wave 2+ (server) | API + PWA | Multiple times per day |
| School Edition | Staged deployment | Weekly scheduled release |
| Enterprise Edition | Customer-controlled | Configurable per contract |

### Deployment Types

| Type | Frequency | Audience | Rollback Time |
|------|-----------|---------|--------------|
| **Hotfix** | As needed | All users | < 15 minutes |
| **Patch** | Daily | All users | < 15 minutes |
| **Minor release** | Weekly | All users (staged rollout) | < 30 minutes |
| **Major release** | Per wave | Canary → all users over 72h | < 1 hour |
| **Schema migration** | Per DB change | Coordinated with app deploy | Complex — see runbook |

### Deployment Frequency Measurement

```
Tracked in CI/CD pipeline:
  deploymentLog {
    deploymentId: uuid
    deployedAt: Date
    environment: "preview" | "staging" | "production"
    commitSha: string
    deployedBy: string    // CI system or engineer
    durationSeconds: number
    status: "success" | "failed" | "rolled-back"
    relatedPrIds: string[]
  }
```

### Deployment Frequency Health Signals

| Signal | Meaning | Action |
|--------|---------|--------|
| > 5 days since last production deploy | Throughput problem | Investigate PR queue; check for blockers |
| Deploy frequency dropping trend (4 weeks) | Team friction or scope creep | DX review + sprint retrospective |
| > 3 failed deploys in a week | Stability problem | Freeze non-critical work; investigate |
| Deploys only on specific days | Batch mentality | Move to continuous deployment |

---

## SECTION 5 — CHANGE FAILURE RATE

### Definition

**Change Failure Rate (CFR)** = percentage of deployments that result in a production incident requiring a hotfix, rollback, or patch within 24 hours.

```
CFR = (Failed Deployments / Total Deployments) × 100%

A "failed deployment" is one that causes:
  - A production incident (P0 or P1)
  - A user-visible bug requiring same-day fix
  - A rollback
  - An emergency hotfix
```

### Why CFR Matters

CFR measures the quality of what we ship. A high CFR means the engineering pipeline is not catching defects before production — either testing is insufficient, review is inadequate, or the deployment process itself is introducing errors.

At LifePilot, a production failure is not just a technical event — it is a broken experience for a child using the platform. CFR is therefore a proxy for user trust.

### CFR Targets

| Period | Target CFR | Alarm Threshold |
|--------|-----------|----------------|
| Wave 1 (MVP) | < 10% | > 15% |
| Wave 2 (with server) | < 7% | > 10% |
| Wave 3+ | < 5% | > 8% |

### CFR Root Cause Classification

Every production incident is classified by root cause to identify systemic patterns:

| Root Cause Category | Typical Fix |
|--------------------|-------------|
| **Insufficient test coverage** | Add tests for the uncovered path |
| **Missing edge case** | Improve test scenarios; add property-based testing |
| **Integration failure** | Add integration test between affected modules |
| **Schema migration failure** | Improve migration test procedure |
| **Environment difference** | Improve staging environment parity |
| **Dependency update breaking change** | Add regression tests after dependency updates |
| **Concurrent modification** | Improve synchronisation; add write conflict detection |

### CFR Reduction Actions

| CFR Range | Action |
|-----------|--------|
| < 5% | Maintain — no action required |
| 5–10% | Investigate root cause classification; target most common category |
| 10–15% | Freeze low-priority feature work; dedicate sprint to test coverage and review quality |
| > 15% | Engineering halt on new features; full quality remediation sprint |

---

## SECTION 6 — MEAN TIME TO RECOVERY

### Definition

**Mean Time to Recovery (MTTR)** = the average time from when a production incident is detected to when the service is fully restored.

```
MTTR = Mean of (Recovery Time - Detection Time) across all incidents

Timeline:
  User reports issue / Monitor alerts
        │
        ▼ (Detection Time)
  Incident opened
        │
        ▼
  Investigation → diagnosis → fix → deploy → verify
        │
        ▼ (Recovery Time)
  Service fully restored, incident closed
```

### Why MTTR Matters

MTTR measures the team's ability to respond to failure. Low MTTR requires:
- Good observability (fast detection)
- Runbooks (fast diagnosis)
- Deployment automation (fast fix deployment)
- Rollback capability (fast worst-case recovery)

For LifePilot, an offline-first app, many production failures are not "the app is down" — they are "a feature is broken" or "data is not syncing." MTTR applies to both.

### MTTR Targets by Incident Severity

| Severity | Definition | Detection Target | MTTR Target |
|---------|-----------|-----------------|------------|
| **P0 — Critical** | Data loss, complete app failure, security breach | < 5 minutes | < 1 hour |
| **P1 — Major** | Core feature broken for > 10% of users | < 15 minutes | < 4 hours |
| **P2 — Minor** | Feature broken for < 10% of users | < 1 hour | < 1 business day |
| **P3 — Cosmetic** | Visual bug, non-functional issue | Next business day | < 1 week |

### MTTR Infrastructure

**Fast Detection**:
- Sentry for unhandled errors (real-time alerts)
- Service Worker health monitoring
- Synthetic monitoring for critical user journeys (ping every 5 minutes)
- User-reported issue fast path (in-app feedback button)

**Fast Diagnosis**:
- Structured logs with request correlation IDs
- Dexie error events logged to `AppLog` table
- Breadcrumb trail in error reports (last 10 user actions before error)
- Incident runbooks for top 10 failure scenarios

**Fast Recovery**:
- Feature kill switch via `FeatureFlag` entity (disable any feature instantly without deploy)
- One-command rollback: `pnpm pilot deploy rollback --to [commit]`
- Database snapshot restore tested monthly

### MTTR Post-Mortem Trigger

Any P0 or P1 incident triggers a mandatory blameless post-mortem within 48 hours. Post-mortem output:
- Timeline of detection → recovery
- Root cause (not "human error" — the systemic root cause)
- Specific improvement actions with owners and due dates
- Update to MTTR targets if appropriate

---

## SECTION 7 — CYCLE TIME

### Definition

**Cycle Time** = time from when work begins on a task to when it is delivered to users. Cycle time is more granular than lead time — it applies to individual tickets and stories, not just deployments.

```
Ticket moves to "In Progress"
        │
        ▼ (Cycle Time starts)
  Development → Review → Merge → Deploy
        │
        ▼ (Cycle Time ends)
  Feature live in production
```

### Cycle Time Breakdown

| Phase | Definition | Target |
|-------|-----------|--------|
| **Development** | "In Progress" → PR opened | < 2 days |
| **Review** | PR opened → approved | < 4 hours |
| **Merge** | Approved → merged to main | < 1 hour |
| **Release** | Merged → live in production | < 15 minutes (continuous deploy) |
| **Total cycle time** | In Progress → live | < 3 days |

### Cycle Time by Ticket Size

| T-shirt Size | Story Points | Cycle Time Target |
|-------------|-------------|-----------------|
| XS (translation key, copy fix) | 1 | < 4 hours |
| S (small feature, bug fix) | 2–3 | < 1 day |
| M (new component, service method) | 5 | 1–3 days |
| L (new page, new module feature) | 8 | 3–5 days |
| XL (new module, architecture change) | 13+ | 5–10 days |

### Cycle Time Efficiency Ratio

```
Cycle Time Efficiency = (Active Work Time / Total Elapsed Time) × 100%

Example:
  A ticket takes 5 days elapsed, but only 8 hours of active work was done.
  Efficiency = 8 / (5 × 8) = 20% — 80% of time was waiting

Target: > 40% efficiency (most DORA elite teams achieve 40–60%)
```

When efficiency is low, the root cause is almost always one of:
- Waiting for review (improve review SLA)
- Waiting for answers on requirements (improve ticket definition)
- Waiting for a blocking dependency (improve sprint planning)
- Waiting for CI (improve build speed)

---

## SECTION 8 — CODE CHURN

### Definition

**Code Churn** = percentage of code written in a sprint that is rewritten or deleted within 2 weeks of being written.

High churn signals one of:
- Poorly understood requirements (building the wrong thing)
- Technical debt being paid on code that was rushed
- Excessive rework from code review
- Architectural uncertainty resolved by trial-and-error

### Churn Measurement

```bash
# Measure churn for a specific file or directory
git log --follow --diff-filter=M --since="14 days ago" -- src/modules/cockpit/

# Identify high-churn files (changed 5+ times in 30 days)
pnpm pilot metrics churn --threshold 5 --days 30
```

### Churn Targets

| Metric | Target | Alarm |
|--------|--------|-------|
| Codebase-wide churn rate | < 10% | > 20% |
| Module-level churn rate | < 15% | > 30% |
| High-churn file count (> 5 edits in 30 days) | < 5 files | > 10 files |

### Healthy vs. Unhealthy Churn

| Churn Type | Healthy? | Signal |
|-----------|---------|--------|
| Refactoring planned infrastructure code | ✅ Yes | Investment in quality |
| Iterating on a new module post-feedback | ✅ Yes | Normal product iteration |
| Rewriting code that was just written because requirements changed | ⚠️ Warning | Requirements process problem |
| Repeatedly editing the same service method | ❌ No | Design instability |
| High churn in `types/index.ts` | ❌ No | Domain model instability — EARB concern |

---

## SECTION 9 — TECHNICAL DEBT

### Definition

**Technical Debt** is the accumulated cost of shortcuts, deferred improvements, and known imperfections in the codebase. Like financial debt, it accrues interest — small amounts of debt become large amounts of maintenance burden over time.

### Debt Classification

| Class | Example | Interest Rate |
|-------|---------|--------------|
| **Intentional / Strategic** | Placeholder service stubs for Wave 2 features | Low — planned for a known future date |
| **Accumulated** | `storageService.ts` as a single large file | Medium — slows every edit to the file |
| **Reckless** | No tests for a critical service method | High — any change risks undetected regression |
| **Forced** | Browser API workaround for IndexedDB limitation | Low — external; revisit with browser updates |
| **Outdated** | Dependency on a deprecated library version | High — security risk grows over time |

### Technical Debt Registry

All known technical debt is tracked in `docs/TECHNICAL_DEBT.md`:

```markdown
# Technical Debt Registry

## Active Debt

| ID | Description | Class | Effort | Interest | Owner | Target Wave |
|----|-------------|-------|--------|----------|-------|-------------|
| TD-001 | storageService.ts is a single 2000-line file | Accumulated | 3 days | Medium | Tech Lead | Wave 2 |
| TD-002 | Repository pattern not yet implemented | Intentional | 5 days | Medium | Architecture | Wave 2 |
| TD-003 | EventBus not implemented (direct calls used) | Intentional | 2 days | Low | Architecture | Wave 2 |
| TD-004 | No E2E tests for critical user journeys | Reckless | 4 days | High | QA Lead | Wave 1 |
| TD-005 | Parental consent flow not implemented | Reckless | 5 days | Critical | Platform | Wave 1 |
| TD-006 | Content moderation not implemented for journal | Reckless | 3 days | Critical | Platform | Wave 1 |

## Retired Debt
(moved here when resolved)
```

### Debt Metrics

| Metric | Definition | Target |
|--------|-----------|--------|
| **Total debt items** | Count of tracked debt entries | Trending downward |
| **High/critical debt items** | Debt items with high or critical interest | 0 at wave boundary |
| **Debt retirement rate** | Items retired per sprint | ≥ 1 per sprint |
| **Debt addition rate** | New items added per sprint | < items retired |
| **Oldest unresolved debt** | Age of the oldest tracked debt item | < 6 months |

### Technical Debt Governance Rules

- **Rule TD-01**: Every `// TODO`, `// FIXME`, or `// HACK` comment must reference a debt registry ID (`// TODO(TD-NNN):`)
- **Rule TD-02**: No new intentional debt accepted without Tech Lead approval + registry entry
- **Rule TD-03**: No reckless debt accepted — ever. "We'll add tests later" is not accepted.
- **Rule TD-04**: Debt items with Critical interest must be resolved before the wave they're assigned to begins
- **Rule TD-05**: The debt registry is reviewed monthly by the EEB

### Debt Capacity Allocation

| Sprint Composition | Wave 1 | Wave 2 | Wave 3+ |
|--------------------|--------|--------|---------|
| New features | 70% | 65% | 70% |
| Technical debt reduction | 20% | 25% | 20% |
| DX / tooling / infrastructure | 10% | 10% | 10% |

---

## SECTION 10 — CODE COMPLEXITY

### Why Complexity Matters

Complexity is the primary driver of maintenance cost. A function with a cyclomatic complexity of 15 is not just harder to understand — it has 15 independent execution paths, each of which is a potential bug and requires its own test case. Unchecked complexity turns maintainable code into legacy code.

### Complexity Metrics

| Metric | Definition | Tool | Target |
|--------|-----------|------|--------|
| **Cyclomatic Complexity** | Number of independent paths through a function | ESLint `complexity` rule | ≤ 10 per function |
| **Cognitive Complexity** | How hard the code is to understand (SonarQube model) | sonarjs ESLint plugin | ≤ 15 per function |
| **Function Length** | Lines of code per function | ESLint `max-lines-per-function` | ≤ 50 lines |
| **File Length** | Lines of code per file | ESLint `max-lines` | ≤ 300 lines |
| **Parameter Count** | Arguments per function | ESLint `max-params` | ≤ 4 parameters |
| **Nesting Depth** | Maximum nesting level in a function | ESLint `max-depth` | ≤ 4 levels |

### Complexity Rules in ESLint

```json
{
  "rules": {
    "complexity": ["warn", { "max": 10 }],
    "sonarjs/cognitive-complexity": ["error", 15],
    "max-lines-per-function": ["warn", { "max": 50, "skipBlankLines": true, "skipComments": true }],
    "max-lines": ["warn", { "max": 300, "skipBlankLines": true, "skipComments": true }],
    "max-params": ["warn", { "max": 4 }],
    "max-depth": ["error", { "max": 4 }]
  }
}
```

### Complexity Hotspot Detection

```bash
# Find the 10 most complex files in the codebase
pnpm pilot metrics complexity --top 10

# Find functions exceeding complexity threshold
pnpm pilot metrics complexity --threshold 10 --type function

# Track complexity trend over time
pnpm pilot metrics complexity --trend --weeks 8
```

### Complexity Trend Alerts

| Condition | Action |
|-----------|--------|
| Average file complexity increasing for 3 consecutive sprints | Complexity review; refactor sprint item |
| Any new function with complexity > 15 | Block PR; mandatory refactor before merge |
| `storageService.ts` exceeds 2500 lines | Emergency split — escalate to Tech Lead |
| Any new file > 400 lines | Flag in code review; plan split within sprint |

---

## SECTION 11 — COVERAGE TRENDS

### Coverage Philosophy

Coverage is a proxy for confidence, not a goal in itself. 100% coverage of trivial code is worthless. 80% coverage of service methods and critical paths is highly valuable.

We track coverage **trends**, not just snapshots. A codebase at 75% coverage trending downward is more concerning than one at 60% trending upward.

### Coverage Targets

| Code Area | Minimum Coverage | Target | Why |
|-----------|-----------------|--------|-----|
| `storage/storageService.ts` — all methods | 90% | 95% | Service layer is the data safety net |
| `utils/index.ts` — all functions | 90% | 95% | Pure functions are trivially testable |
| `hooks/` — global hooks | 80% | 85% | Hooks drive UI data flow |
| `modules/*/hooks/` | 75% | 85% | Module-local business logic |
| `components/common/` | 60% | 70% | Shared stateful components |
| `modules/*/pages/` | 50% | 60% | Integration tests preferred over unit tests |
| `components/ui/` | N/A | N/A | shadcn/ui primitives — library tested upstream |
| **Overall codebase** | 70% | 80% | Baseline confidence |

### Coverage Measurement

```bash
# Run tests with coverage report
pnpm --filter @workspace/lifepilot run test:coverage

# Output: text, JSON, HTML
# HTML report at: coverage/index.html
# JSON report at: coverage/coverage-final.json (used by CI trend tracker)
```

### Coverage Trend Tracking

Coverage is tracked as a time series, not a snapshot. The CI pipeline records coverage after every merge to `main`:

```
coverage-trend.json (updated by CI on every main merge)
{
  "measurements": [
    { "date": "2026-06-01", "overall": 72.4, "services": 88.1, "hooks": 76.2 },
    { "date": "2026-06-08", "overall": 73.1, "services": 89.4, "hooks": 77.0 },
    ...
  ]
}
```

### Coverage Health Rules

| Condition | Severity | Action |
|-----------|---------|--------|
| Overall coverage drops > 2% in a sprint | Warning | Tech Lead investigation; test sprint item |
| Service coverage drops below 85% | Critical | Block non-critical features; add missing tests |
| Any new service method with 0% coverage | Blocker | PR cannot merge |
| Coverage trend declining for 3 consecutive sprints | Critical | Dedicated test coverage sprint |
| New file added with 0 tests | Warning | Flagged in code review; tests required before next sprint |

### Coverage Anti-patterns

```typescript
// ✗ ANTI-PATTERN: Coverage padding with trivial tests
it("returns undefined for undefined input", () => {
  // Tests nothing meaningful; exists only to inflate the number
  expect(someFunc(undefined)).toBeUndefined();
});

// ✗ ANTI-PATTERN: Testing implementation not behaviour
it("calls db.pilots.get", () => {
  // Testing that a specific internal function was called — brittle
  await pilotService.getById(1);
  expect(db.pilots.get).toHaveBeenCalled();
});

// ✅ PATTERN: Testing behaviour
it("returns success:false when pilot does not exist", async () => {
  // Tests what matters: what the service returns when data is missing
  const result = await pilotService.getById(9999);
  expect(result.success).toBe(true);
  expect(result.data).toBeUndefined();
});
```

---

## SECTION 12 — DEFECT LEAKAGE

### Definition

**Defect Leakage** = percentage of bugs that escape a quality gate and are discovered in a later stage.

```
Defect Leakage Rate = (Bugs found in Stage N+1 / Total bugs found in Stage N + Stage N+1) × 100%

Quality Gates (in order):
  Stage 1: Developer (TypeScript + ESLint + unit tests)
  Stage 2: Code Review (peer review)
  Stage 3: CI (automated test suite + integration)
  Stage 4: Staging (QA environment)
  Stage 5: Production (live users)
```

### Defect Leakage Targets

| From Stage | To Stage | Target Leakage Rate |
|-----------|---------|-------------------|
| Developer | Code Review | < 15% |
| Code Review | CI | < 5% |
| CI | Staging | < 3% |
| Staging | Production | < 1% |
| **Production Defect Rate** | — | < 0.5 bugs/feature shipped |

### Defect Classification

Every bug is tagged at discovery with:

```typescript
interface Defect {
  id: string;
  severity: "p0" | "p1" | "p2" | "p3";
  detectedStage: "development" | "review" | "ci" | "staging" | "production";
  escapedFrom: "development" | "review" | "ci" | "staging" | null;
  rootCause: DefectRootCause;
  featureArea: string;           // which module/service
  timeToDetect: number;          // hours from introduction to detection
  timeToFix: number;             // hours from detection to fix merged
  wasRegressionTest: boolean;    // did we add a test to catch recurrence?
}
```

### Defect Leakage Analysis

```bash
# Monthly defect leakage report
pnpm pilot metrics defects --period 30days

Output:
  Defects detected by stage:
    Development:  42 (63%) ← caught by developer
    Code Review:  14 (21%) ← caught in review
    CI:            5 (7%)  ← caught by automated tests
    Staging:       4 (6%)  ← caught in QA
    Production:    2 (3%)  ← leaked to users ❌

  Leakage rate: 3% (from staging to production)
  Target:       1%

  Top escape categories:
    - Missing edge case in offline sync (2 defects)
    - i18n key missing in one language (1 defect)
    - Schema migration not tested on v10 data (1 defect)
```

### Defect Leakage Reduction Actions

| Pattern | Action |
|---------|--------|
| Multiple production bugs in same module | Module-level test coverage audit |
| Multiple i18n-related production bugs | Add `pilot check i18n` to pre-commit |
| Multiple schema migration bugs | Improve migration test procedure |
| Multiple offline-related production bugs | Add offline integration test suite |

---

## SECTION 13 — DEVELOPER PRODUCTIVITY

### Measuring Productivity Correctly

Developer productivity is **not** measured by:
- Lines of code written (bad code is fast to write)
- Number of commits (small commits are usually better)
- Number of PRs merged (quality > quantity)
- Hours worked (sustainable pace is the goal)

Developer productivity **is** measured by:
- Value delivered per unit of effort
- Time spent on meaningful work vs. friction
- Quality of what is produced
- Team's ability to maintain and extend what was built

### Developer Productivity Metrics

| Metric | Definition | Target |
|--------|-----------|--------|
| **Feature delivery rate** | Story points delivered per sprint | Stable or increasing trend |
| **Rework rate** | % of sprint capacity spent on rework (bugs, revisions) | < 15% |
| **Friction time** | Engineer hours per week lost to tooling, waiting, context-switching | < 2 hours |
| **First-time PR pass rate** | PRs approved without revision requests | > 70% |
| **PR review time** | Time to first review after PR opened | < 4 hours |
| **DX satisfaction** | Monthly survey score (1–5) | ≥ 4.0 |
| **Onboarding time** | Days to first merged PR for new engineer | ≤ 3 days |
| **Cognitive overhead** | Engineer-reported friction score (monthly survey) | ≤ 2/10 |

### The Developer Friction Survey

Monthly, all engineers answer 5 questions anonymously (1–5 scale):

```
1. How much of my time this week was spent on meaningful work?
   (1 = mostly friction, 5 = almost all meaningful)

2. How easy was it to find the information I needed to complete my work?
   (1 = very hard, 5 = very easy)

3. How much confidence did I have in the safety of my changes?
   (1 = very low, 5 = very high)

4. How satisfied am I with our development tools and processes?
   (1 = very dissatisfied, 5 = very satisfied)

5. What is the single biggest thing slowing you down right now?
   (free text)
```

Results are reviewed by the EEB. Free-text responses drive the DX backlog.

### Productivity Investment Matrix

| Investment | Expected Return | Priority |
|-----------|----------------|---------|
| CLI generator for new entity | -2h boilerplate per entity | High |
| Fast CI pipeline (< 3min) | -30min wait per PR | High |
| Comprehensive golden paths | -1 day ramp-up per feature | High |
| Local validation suite | -15min of CI feedback cycles | Medium |
| Type-safe i18n keys | -30min debugging per missing key | Medium |
| Auto-generated service stubs | -1h writing boilerplate per service | Medium |

---

## SECTION 14 — VELOCITY

### Definition

**Velocity** = the amount of work a team completes in a sprint, measured in story points.

Velocity is a **planning tool**, not a performance measurement. It is used to predict how much work can fit in a sprint — not to compare teams or evaluate engineers.

### Velocity Measurement

```
Sprint Velocity = Sum of story points for completed tickets
                  (completed = deployed to production or preview, not "done in code")

Rolling Average Velocity = Mean of last 4 sprints
```

### Story Point Reference Scale (LifePilot)

| Points | Size | Examples |
|--------|------|---------|
| 1 | XS — trivial | Fix a typo, add a translation key, update a comment |
| 2 | S — small | Add a service method, fix a bug, add a unit test |
| 3 | S-M — small-medium | Add a custom hook, build a small component, add a feature flag |
| 5 | M — medium | Build a module page, add a new entity + service, integration test suite |
| 8 | L — large | New module, major service refactor, schema migration |
| 13 | XL — very large | Should be split — too large for reliable estimation |

### Velocity Health Rules

| Condition | Action |
|-----------|--------|
| Sprint velocity < 70% of rolling average | Investigate blockers; adjust next sprint scope |
| Sprint velocity > 130% of rolling average | Audit completion definition; check for undetected tech debt |
| Velocity declining over 3 consecutive sprints | Systemic issue — EEB investigation |
| High variance (> ±40% sprint to sprint) | Estimation calibration session |
| Consistent underestimate for same ticket type | Re-calibrate estimates for that type |

### Velocity Anti-patterns

| Anti-pattern | Problem | Fix |
|-------------|---------|-----|
| Inflating estimates to "hit targets" | Velocity becomes meaningless for planning | Treat velocity as a tool, not a target |
| Counting incomplete work as delivered | Incomplete work is zero points | Only count deployed/reviewable work |
| Comparing velocity across teams | Teams have different contexts | Velocity is intra-team only |
| Adding velocity pressure | Engineers pad estimates; churn increases | Velocity is a planning input, not a KPI |

---

## SECTION 15 — ENGINEERING HEALTH DASHBOARD

### Purpose

The Engineering Health Dashboard is the single pane of glass where the health of the engineering organisation is visible at a glance. It is accessible to all engineers, updated automatically, and the basis for every EEB and EARB discussion.

### Dashboard Architecture

```
Engineering Health Dashboard
  ├── Real-time panel      → P0/P1 incidents, CI status, deployment status
  ├── Sprint panel         → Current velocity, cycle time, CFR (rolling 4 weeks)
  ├── Quality panel        → Coverage trend, defect leakage, complexity hotspots
  ├── DORA panel           → 4 key metrics, trend vs. targets
  ├── Debt panel           → Technical debt registry summary, debt aging
  ├── DX panel             → Survey scores, friction metrics, DX backlog
  └── Alerts panel         → Active threshold breaches, pending actions
```

### Dashboard Data Sources

| Panel | Primary Data Source | Update Frequency |
|-------|-------------------|-----------------|
| Real-time | CI/CD pipeline + Sentry | Live |
| Sprint | GitHub PR analytics + story point tracking | Daily |
| Quality | CI coverage output + ESLint complexity | Per-merge |
| DORA | Deployment log + incident log | Per-deployment / per-incident |
| Debt | `docs/TECHNICAL_DEBT.md` | Weekly (on debt registry update) |
| DX | Survey responses | Monthly |
| Alerts | All above sources | Real-time |

### Dashboard Metric Summary — Target State

```
┌─────────────────────────────────────────────────────────────────────────┐
│  LIFEPILOT ENGINEERING HEALTH DASHBOARD                    June 2026   │
├──────────────────────────┬──────────────────────────────────────────────┤
│  DORA METRICS            │  QUALITY METRICS                             │
│  Lead Time:     1.2 days │  Test Coverage:    73%  ↑                   │
│  Deploy Freq:   4.2/week │  CFR:              8.1% ↓ (target: < 10%)   │
│  Change CFR:    8.1%     │  Defect Leakage:   4.2% → (target: < 3%)   │
│  MTTR:          2.1 hrs  │  Complexity P90:   7.2  ✓                   │
├──────────────────────────┼──────────────────────────────────────────────┤
│  DELIVERY METRICS        │  DEBT & HEALTH                               │
│  Velocity:      42 pts   │  Active Debt Items:  6                       │
│  Velocity Trend: ↑ +8%  │  Critical Debt:      2  ⚠️                   │
│  Cycle Time:    2.8 days │  Oldest Item:        45 days                │
│  Rework Rate:   12%      │  Debt Retirement:    1/sprint               │
├──────────────────────────┼──────────────────────────────────────────────┤
│  DEVELOPER EXPERIENCE    │  ACTIVE ALERTS                               │
│  DX Score:      4.1/5   │  ⚠️  defect-leakage > target (4.2% > 3%)    │
│  Friction Time: 1.8 hrs  │  ⚠️  hi.json missing 3 translation keys     │
│  1st PR Pass:   71%      │  ✅  No P0/P1 incidents active               │
│  Onboard Time:  2.5 days │  ✅  Security audit: 0 high/critical vulns   │
└──────────────────────────┴──────────────────────────────────────────────┘
```

### Health Scoring

Each area of the dashboard produces a colour-coded health score:

| Colour | Meaning | Action |
|--------|---------|--------|
| 🟢 Green | All metrics within target | No action required |
| 🟡 Yellow | 1–2 metrics approaching threshold | Monitor; plan improvement |
| 🟠 Orange | 1 metric breaching threshold | Assign owner; sprint item |
| 🔴 Red | Critical metric breaching threshold | Immediate EEB attention |

### Dashboard Access

```
URL: internal.lifepilot.dev/engineering-health
Access: All engineers (read), Tech Leads (read + comment), EEB (full)

CLI shortcut:
  pnpm pilot dashboard         → open in browser
  pnpm pilot dashboard --text  → text summary in terminal
  pnpm pilot dashboard --alert → show only active alerts
```

### Dashboard Review Cadence

| Review | Frequency | Audience | Format |
|--------|-----------|---------|--------|
| On-call check | Daily | On-call engineer | Real-time panel only |
| Sprint review | Weekly | Engineering team | Full dashboard walkthrough |
| EEB review | Monthly | Engineering Excellence Board | Trend analysis + actions |
| EARB review | Quarterly | EARB | Strategic metrics + wave health |

### Dashboard Governance Rules

- **Rule D-01**: Every metric on the dashboard must have a defined target and an alert threshold
- **Rule D-02**: Every alert must have an assigned owner within 24 hours
- **Rule D-03**: An alert unresolved for > 2 sprints is escalated to the EEB
- **Rule D-04**: Dashboard data is automated — no manually-entered metrics (they become stale)
- **Rule D-05**: Adding a new metric requires: definition, data source, target, threshold, and action protocol — all four before it appears on the dashboard
- **Rule D-06**: Metrics are reviewed for relevance annually — any metric not acted upon in 12 months is removed

---

## METRICS QUICK REFERENCE

```
DORA TARGETS (Wave 1)
  Lead Time:             < 1 day
  Deployment Frequency:  Daily
  Change Failure Rate:   < 10%
  MTTR:                  < 4 hours

QUALITY TARGETS
  Test Coverage (overall): ≥ 75%
  Service Coverage:        ≥ 90%
  Defect Leakage:          < 3% to production
  Cyclomatic Complexity:   ≤ 10 per function
  Circular Dependencies:   0

DELIVERY TARGETS
  Cycle Time (median):     < 3 days
  First-time PR pass rate: > 70%
  Rework Rate:             < 15%
  Code Churn:              < 10%

HEALTH TARGETS
  Technical Debt (critical): 0 at wave boundary
  DX Satisfaction Score:    ≥ 4.0 / 5
  Friction Time:            < 2 hours/week
  Bundle Size (initial):    < 200KB gzipped
```

---

*End of LifePilot Engineering Metrics & Health Framework v1.0*

*Next review: End of Wave 1. Targets will be updated based on actual baseline measurements established during Wave 1 delivery.*
