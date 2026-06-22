// ============================================================
// LIFEPILOT — PILOT DNA SERVICE (RP-002A)
// Observational personalization engine. NEVER diagnostic.
//
// Governance (binding):
//   XP-003 — Observational language only ("You seem interested in…")
//   XP-004 — No labelling, ranking, or comparing children
//   XP-005 — All data private, local-only, never profiled commercially
//
// Rules:
//   • Max 30% of any surface may be personalized; 70% must be universal
//   • Internal scores/signals are never exposed to UI components
//   • Use "You seem interested in X" — never "You are an X person"
//   • No recommendations, no predictions — context only
// ============================================================

import type {
  PilotInterestCategory,
  PilotGrowthGoalType,
  PilotAdventureStyle,
  PilotSignalSource,
  PilotSignalType,
} from "@/types";
import {
  pilotInterestRepository,
  pilotGrowthGoalRepository,
  pilotPreferenceRepository,
  pilotSignalRepository,
  pilotAffinityRepository,
  pilotAspirationRepository,
  pilotContentHistoryRepository,
} from "@/storage/repositories/dna";

// ── Public context shape (safe for UI) ─────────────────────
export interface PilotDnaContext {
  /** Interest categories collected at onboarding or observed */
  interests: PilotInterestCategory[];
  /** Growth goals from onboarding or observed behaviour */
  growthGoals: PilotGrowthGoalType[];
  /** Adventure style preferences */
  adventureStyles: PilotAdventureStyle[];
  /** Domain affinities as a name→strength map (internal, for weighting only) */
  affinityMap: Record<string, number>;
}

// ── Domain → affinity mapping ───────────────────────────────
const INTEREST_TO_AFFINITY: Partial<Record<PilotInterestCategory, string[]>> = {
  technology: ["curiosity", "problem_solving", "building"],
  science:    ["curiosity", "problem_solving", "learning"],
  art:        ["creativity", "expression"],
  music:      ["creativity", "expression"],
  building:   ["building", "problem_solving"],
  books:      ["curiosity", "learning", "imagination"],
  sports:     ["resilience", "teamwork", "health"],
  helping:    ["kindness", "empathy", "leadership"],
  animals:    ["kindness", "empathy", "nature"],
  nature:     ["curiosity", "calm", "nature"],
  space:      ["curiosity", "imagination", "learning"],
  gaming:     ["problem_solving", "strategy", "fun"],
  cooking:    ["creativity", "care", "learning"],
  movies:     ["creativity", "imagination", "expression"],
  business:   ["leadership", "problem_solving", "strategy"],
};

const GOAL_TO_AFFINITY: Partial<Record<PilotGrowthGoalType, string[]>> = {
  confidence:     ["resilience", "courage"],
  creativity:     ["creativity", "expression"],
  leadership:     ["leadership", "responsibility"],
  communication:  ["expression", "empathy"],
  learning:       ["curiosity", "learning"],
  focus:          ["calm", "resilience"],
  friendship:     ["empathy", "kindness", "teamwork"],
  responsibility: ["responsibility", "leadership"],
  kindness:       ["kindness", "empathy"],
  problem_solving:["problem_solving", "curiosity"],
};

// ── Service ─────────────────────────────────────────────────
class PilotDnaService {
  // ── Phase 1: Onboarding collection ──────────────────────

  async saveOnboardingProfile(
    pilotId: number,
    interests: PilotInterestCategory[],
    growthGoals: PilotGrowthGoalType[],
    adventureStyles: PilotAdventureStyle[],
  ): Promise<void> {
    const now = new Date();

    for (const category of interests) {
      await pilotInterestRepository.upsertCategory(pilotId, category, "onboarding", 40);
      for (const domain of INTEREST_TO_AFFINITY[category] ?? []) {
        await pilotAffinityRepository.nudge(pilotId, domain, 15);
      }
    }

    for (const goal of growthGoals) {
      await pilotGrowthGoalRepository.upsertGoal(pilotId, goal, "onboarding");
      for (const domain of GOAL_TO_AFFINITY[goal] ?? []) {
        await pilotAffinityRepository.nudge(pilotId, domain, 10);
      }
    }

    await pilotPreferenceRepository.saveOnboardingStyles(pilotId, adventureStyles);

    await pilotSignalRepository.recordSignal(
      pilotId, "onboarding", "preference", "OnboardingSession",
      undefined, [...interests, ...growthGoals, ...adventureStyles],
    );

    void now;
  }

  // ── Phase 2: Passive signal recording ───────────────────

  async recordSignal(
    pilotId: number,
    source: PilotSignalSource,
    signalType: PilotSignalType,
    entityType: string,
    entityId?: number,
    tags?: string[],
    affinityNudges?: Record<string, number>,
  ): Promise<void> {
    await pilotSignalRepository.recordSignal(
      pilotId, source, signalType, entityType, entityId, tags,
    );
    if (affinityNudges) {
      for (const [domain, delta] of Object.entries(affinityNudges)) {
        await pilotAffinityRepository.nudge(pilotId, domain, delta);
      }
    }
  }

  async recordAspiration(
    pilotId: number,
    text: string,
    source: PilotSignalSource,
  ): Promise<void> {
    await pilotAspirationRepository.record(pilotId, text, source);
  }

  async recordContentInteraction(
    pilotId: number,
    contentType: string,
    contentId: string,
    interactionType: "seen" | "selected" | "skipped" | "completed",
  ): Promise<void> {
    await pilotContentHistoryRepository.record(pilotId, contentType, contentId, interactionType);
  }

  // ── Personalization context (for internal use) ───────────

  async getContext(pilotId: number): Promise<PilotDnaContext> {
    const [interests, growthGoals, adventureStyles, affinityMap] = await Promise.all([
      pilotInterestRepository.getTopInterests(pilotId, 5).then(list => list.map(i => i.category)),
      pilotGrowthGoalRepository.getGoalTypes(pilotId),
      pilotPreferenceRepository.getAdventureStyles(pilotId),
      pilotAffinityRepository.getDomainMap(pilotId),
    ]);
    return { interests, growthGoals, adventureStyles, affinityMap };
  }

  // ── Personalization helpers ──────────────────────────────

  /**
   * From a pool of items, returns up to `max` personalized items plus
   * enough universal items to fill `totalSlots`, honouring the 70/30 rule.
   * Items are typed with a `tags` field for interest matching.
   */
  selectWithPersonalization<T extends { id: string; tags?: string[] }>(
    context: PilotDnaContext,
    allItems: T[],
    totalSlots: number,
    maxPersonalizedRatio = 0.3,
  ): T[] {
    const maxPersonalized = Math.floor(totalSlots * maxPersonalizedRatio);
    const minUniversal = totalSlots - maxPersonalized;

    const { interests } = context;
    const interestSet = new Set<string>(interests);

    const personalized: T[] = [];
    const universal: T[] = [];

    for (const item of allItems) {
      const isRelevant = item.tags?.some(t => interestSet.has(t));
      if (isRelevant) personalized.push(item);
      else universal.push(item);
    }

    const selectedPersonalized = personalized.slice(0, maxPersonalized);
    const selectedUniversal = universal.slice(0, Math.max(minUniversal, totalSlots - selectedPersonalized.length));

    return [...selectedPersonalized, ...selectedUniversal].slice(0, totalSlots);
  }

  /**
   * Returns items weighted by affinity — higher affinity domains appear first.
   * Uses a soft shuffle so the order feels natural rather than algorithmic.
   */
  weightByAffinity<T extends { affinityDomains?: string[] }>(
    context: PilotDnaContext,
    items: T[],
  ): T[] {
    const { affinityMap } = context;
    return [...items].sort((a, b) => {
      const scoreA = (a.affinityDomains ?? []).reduce((s, d) => s + (affinityMap[d] ?? 0), 0);
      const scoreB = (b.affinityDomains ?? []).reduce((s, d) => s + (affinityMap[d] ?? 0), 0);
      return scoreB - scoreA;
    });
  }

  /**
   * Returns content IDs the pilot has already seen (for novelty filtering).
   */
  async getSeenContentIds(pilotId: number, contentType: string): Promise<Set<string>> {
    return pilotContentHistoryRepository.getSeenContentIds(pilotId, contentType);
  }
}

export const pilotDnaService = new PilotDnaService();
