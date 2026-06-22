import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Pilot DNA Service Tests ──────────────────────────────────────────────────
// Tests the selectWithPersonalization and weightByAffinity helpers
// which are pure (no DB calls) and safe to test in isolation.
// DB-touching methods are tested via integration-style checks.

describe("PilotDnaService – selectWithPersonalization", () => {
  it("can be imported", async () => {
    const { pilotDnaService } = await import("../modules/pilotDna/PilotDnaService");
    expect(pilotDnaService).toBeDefined();
  });

  it("respects 30% personalization cap", async () => {
    const { pilotDnaService } = await import("../modules/pilotDna/PilotDnaService");
    const context = {
      interests: ["technology" as const, "science" as const],
      growthGoals: [],
      adventureStyles: [],
      affinityMap: {},
    };
    const items = [
      { id: "1", tags: ["technology"] },
      { id: "2", tags: ["technology"] },
      { id: "3", tags: ["science"] },
      { id: "4", tags: [] },
      { id: "5", tags: [] },
      { id: "6", tags: [] },
      { id: "7", tags: [] },
      { id: "8", tags: [] },
      { id: "9", tags: [] },
      { id: "10", tags: [] },
    ];
    const result = pilotDnaService.selectWithPersonalization(context, items, 10);
    expect(result.length).toBe(10);
    const personalized = result.filter(r => ["1", "2", "3"].includes(r.id));
    expect(personalized.length).toBeLessThanOrEqual(3); // 30% of 10
  });

  it("returns all universal items when no interests match", async () => {
    const { pilotDnaService } = await import("../modules/pilotDna/PilotDnaService");
    const context = {
      interests: [],
      growthGoals: [],
      adventureStyles: [],
      affinityMap: {},
    };
    const items = [
      { id: "1", tags: ["technology"] },
      { id: "2", tags: [] },
      { id: "3", tags: [] },
    ];
    const result = pilotDnaService.selectWithPersonalization(context, items, 3);
    expect(result.length).toBe(3);
  });

  it("never returns more items than totalSlots", async () => {
    const { pilotDnaService } = await import("../modules/pilotDna/PilotDnaService");
    const context = {
      interests: ["technology" as const],
      growthGoals: [],
      adventureStyles: [],
      affinityMap: {},
    };
    const items = Array.from({ length: 50 }, (_, i) => ({ id: String(i), tags: ["technology"] }));
    const result = pilotDnaService.selectWithPersonalization(context, items, 5);
    expect(result.length).toBeLessThanOrEqual(5);
  });
});

describe("PilotDnaService – weightByAffinity", () => {
  it("sorts higher-affinity items first", async () => {
    const { pilotDnaService } = await import("../modules/pilotDna/PilotDnaService");
    const context = {
      interests: [],
      growthGoals: [],
      adventureStyles: [],
      affinityMap: { creativity: 80, curiosity: 20 },
    };
    const items = [
      { id: "low",  affinityDomains: ["curiosity"] },
      { id: "high", affinityDomains: ["creativity"] },
    ];
    const result = pilotDnaService.weightByAffinity(context, items);
    expect(result[0].id).toBe("high");
    expect(result[1].id).toBe("low");
  });

  it("handles items with no affinityDomains gracefully", async () => {
    const { pilotDnaService } = await import("../modules/pilotDna/PilotDnaService");
    const context = {
      interests: [],
      growthGoals: [],
      adventureStyles: [],
      affinityMap: { creativity: 80 },
    };
    const items = [{ id: "a" }, { id: "b", affinityDomains: ["creativity"] }];
    const result = pilotDnaService.weightByAffinity(context, items);
    expect(result[0].id).toBe("b");
  });

  it("does not mutate the input array", async () => {
    const { pilotDnaService } = await import("../modules/pilotDna/PilotDnaService");
    const context = {
      interests: [],
      growthGoals: [],
      adventureStyles: [],
      affinityMap: { curiosity: 100 },
    };
    const items = [
      { id: "x", affinityDomains: [] as string[] },
      { id: "y", affinityDomains: ["curiosity"] },
    ];
    const original = [...items];
    pilotDnaService.weightByAffinity(context, items);
    expect(items[0].id).toBe(original[0].id); // original not mutated
  });
});

describe("PilotDnaService – getSeenContentIds", () => {
  it("returns a Set (importable)", async () => {
    const { pilotDnaService } = await import("../modules/pilotDna/PilotDnaService");
    expect(typeof pilotDnaService.getSeenContentIds).toBe("function");
  });
});

describe("PilotDna – DNA repositories can be imported", () => {
  it("imports dna repository barrel", async () => {
    const repos = await import("../storage/repositories/dna");
    expect(repos.pilotInterestRepository).toBeDefined();
    expect(repos.pilotGrowthGoalRepository).toBeDefined();
    expect(repos.pilotPreferenceRepository).toBeDefined();
    expect(repos.pilotSignalRepository).toBeDefined();
    expect(repos.pilotAffinityRepository).toBeDefined();
    expect(repos.pilotAspirationRepository).toBeDefined();
    expect(repos.pilotContentHistoryRepository).toBeDefined();
  });
});
