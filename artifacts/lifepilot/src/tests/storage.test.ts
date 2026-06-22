import { describe, it, expect } from "vitest";

describe("Storage module", () => {
  it("db module can be imported", async () => {
    const { db } = await import("../storage/db");
    expect(db).toBeDefined();
  });

  it("storage service module can be imported", async () => {
    const service = await import("../storage/storageService");
    expect(service.pilotService).toBeDefined();
    expect(service.settingsService).toBeDefined();
    expect(service.goalService).toBeDefined();
    expect(service.journalService).toBeDefined();
    expect(service.habitService).toBeDefined();
    expect(service.futureMeService).toBeDefined();
    expect(service.timelineService).toBeDefined();
    expect(service.achievementService).toBeDefined();
  });
});
