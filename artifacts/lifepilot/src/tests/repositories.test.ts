import { describe, it, expect } from "vitest";

// ── Repository Import Tests ──────────────────────────────────────────────────
// Validates that every repository barrel exports are present and importable.
// Does not test Dexie CRUD (requires IndexedDB) — those are covered
// by the storage.test.ts smoke test and manual integration testing.

describe("Main repository barrel exports", () => {
  it("exports pilotRepository", async () => {
    const { pilotRepository } = await import("../storage/repositories");
    expect(pilotRepository).toBeDefined();
    expect(typeof pilotRepository.getFirst).toBe("function");
    expect(typeof pilotRepository.create).toBe("function");
    expect(typeof pilotRepository.update).toBe("function");
  });

  it("exports goalRepository", async () => {
    const { goalRepository } = await import("../storage/repositories");
    expect(goalRepository).toBeDefined();
    expect(typeof goalRepository.getActiveForPilot).toBe("function");
  });

  it("exports reflectionRepository", async () => {
    const { reflectionRepository } = await import("../storage/repositories");
    expect(reflectionRepository).toBeDefined();
    expect(typeof reflectionRepository.getRecent).toBe("function");
  });

  it("exports futureLetterRepository", async () => {
    const { futureLetterRepository } = await import("../storage/repositories");
    expect(futureLetterRepository).toBeDefined();
    expect(typeof futureLetterRepository.getUndelivered).toBe("function");
    expect(typeof futureLetterRepository.getDelivered).toBe("function");
    expect(typeof futureLetterRepository.getReadyToDeliver).toBe("function");
    expect(typeof futureLetterRepository.markDelivered).toBe("function");
  });

  it("exports habitRepository", async () => {
    const { habitRepository } = await import("../storage/repositories");
    expect(habitRepository).toBeDefined();
  });

  it("exports achievementRepository", async () => {
    const { achievementRepository } = await import("../storage/repositories");
    expect(achievementRepository).toBeDefined();
  });

  it("exports habitRepository", async () => {
    const { habitRepository } = await import("../storage/repositories");
    expect(habitRepository).toBeDefined();
  });
});

describe("Content repository barrel exports", () => {
  it("exports flightPlanTemplateRepository", async () => {
    const { flightPlanTemplateRepository } = await import("../storage/repositories/content");
    expect(flightPlanTemplateRepository).toBeDefined();
    expect(typeof flightPlanTemplateRepository.getByCategory).toBe("function");
    expect(typeof flightPlanTemplateRepository.getFeatured).toBe("function");
    expect(typeof flightPlanTemplateRepository.getAll).toBe("function");
  });

  it("exports reflectionPromptRepository", async () => {
    const { reflectionPromptRepository } = await import("../storage/repositories/content");
    expect(reflectionPromptRepository).toBeDefined();
    expect(typeof reflectionPromptRepository.getDailyPrompts).toBe("function");
    expect(typeof reflectionPromptRepository.getByCategory).toBe("function");
  });

  it("exports futureMessageRepository", async () => {
    const { futureMessageRepository } = await import("../storage/repositories/content");
    expect(futureMessageRepository).toBeDefined();
    expect(typeof futureMessageRepository.getDailyMessage).toBe("function");
    expect(typeof futureMessageRepository.getCuratedFeed).toBe("function");
    expect(typeof futureMessageRepository.getByCategory).toBe("function");
  });

  it("exports adventureRepository", async () => {
    const { adventureRepository } = await import("../storage/repositories/content");
    expect(adventureRepository).toBeDefined();
    expect(typeof adventureRepository.getTodaysAdventures).toBe("function");
    expect(typeof adventureRepository.getByCategory).toBe("function");
    expect(typeof adventureRepository.getAll).toBe("function");
  });
});

describe("DNA repository barrel exports", () => {
  it("all 7 DNA repos are exported", async () => {
    const dna = await import("../storage/repositories/dna");
    const expectedExports = [
      "pilotInterestRepository",
      "pilotGrowthGoalRepository",
      "pilotPreferenceRepository",
      "pilotSignalRepository",
      "pilotAffinityRepository",
      "pilotAspirationRepository",
      "pilotContentHistoryRepository",
    ];
    for (const name of expectedExports) {
      expect(dna[name as keyof typeof dna], `${name} should be exported`).toBeDefined();
    }
  });
});

describe("FlightLogEntry repository", () => {
  it("is exported from main barrel", async () => {
    const { flightLogEntryRepository } = await import("../storage/repositories");
    expect(flightLogEntryRepository).toBeDefined();
  });
});

describe("LifeProject repository", () => {
  it("is exported from main barrel", async () => {
    const { lifeProjectRepository, lifeRoleRepository } = await import("../storage/repositories");
    expect(lifeProjectRepository).toBeDefined();
    expect(lifeRoleRepository).toBeDefined();
  });
});

describe("Identity repositories", () => {
  it("pilotIdentityRepository is exported", async () => {
    const { pilotIdentityRepository } = await import("../storage/repositories");
    expect(pilotIdentityRepository).toBeDefined();
  });

  it("lifeWheelSnapshotRepository is exported", async () => {
    const { lifeWheelSnapshotRepository } = await import("../storage/repositories");
    expect(lifeWheelSnapshotRepository).toBeDefined();
    expect(typeof lifeWheelSnapshotRepository.getLatestForPilot).toBe("function");
  });

  it("purposeStatementRepository is exported", async () => {
    const { purposeStatementRepository } = await import("../storage/repositories");
    expect(purposeStatementRepository).toBeDefined();
    expect(typeof purposeStatementRepository.getLatestForPilot).toBe("function");
  });
});

describe("EmergingIdentity repositories", () => {
  it("emergingIdentityRepository is exported", async () => {
    const { emergingIdentityRepository } = await import("../storage/repositories");
    expect(emergingIdentityRepository).toBeDefined();
  });

  it("pilotMemoryRepository is exported", async () => {
    const { pilotMemoryRepository } = await import("../storage/repositories");
    expect(pilotMemoryRepository).toBeDefined();
  });
});

describe("Consent repositories", () => {
  it("consentRecordRepository is exported", async () => {
    const { consentRecordRepository } = await import("../storage/repositories");
    expect(consentRecordRepository).toBeDefined();
  });
});

describe("Subscription repositories", () => {
  it("pilotSubscriptionRepository is exported", async () => {
    const { pilotSubscriptionRepository } = await import("../storage/repositories");
    expect(pilotSubscriptionRepository).toBeDefined();
  });
});
