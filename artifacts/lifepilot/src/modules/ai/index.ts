// ============================================================
// LIFEPILOT — AI MODULE (Wave 6 — not yet implemented)
// AI Coach, recommendations, reflections.
//
// GOVERNANCE CONSTRAINT (XP-004 Rule 13 — AI Safety):
//   AI may only encourage, clarify, and guide.
//   AI must never judge, compare, diagnose, or prescribe.
//   All AI interactions are opt-in and parent-visible.
//   No behavioural profiling. No data sent to third parties.
//
// Feature flag: aiCoach (disabled by default)
// See: docs/product/Roadmap.md Wave 6
//      docs/governance/XP-004-ChildPsychologyPrinciples.md Rule 13
// ============================================================

export const AI_MODULE_EDITION = "ai" as const;
export const AI_MODULE_WAVE = 6 as const;
