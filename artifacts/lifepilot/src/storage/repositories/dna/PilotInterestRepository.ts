// ============================================================
// LIFEPILOT — PILOT INTEREST REPOSITORY (RP-002A)
// Stores declared and observed interest categories per pilot.
// Internal use only — never expose interest scores to UI.
// ============================================================

import { db } from "@/storage/db";
import type { PilotInterest, PilotInterestCategory } from "@/types";
import { BasePilotScopedRepository } from "../base/BaseRepository";

export class PilotInterestRepository extends BasePilotScopedRepository<PilotInterest> {
  protected readonly tableName = "pilotInterests";
  protected get table() { return db.pilotInterests; }

  async getByCategory(pilotId: number, category: PilotInterestCategory): Promise<PilotInterest | undefined> {
    return db.pilotInterests
      .where("pilotId").equals(pilotId)
      .filter(i => i.category === category)
      .first();
  }

  async upsertCategory(
    pilotId: number,
    category: PilotInterestCategory,
    source: "onboarding" | "observed",
    strengthDelta = 10,
  ): Promise<void> {
    const existing = await this.getByCategory(pilotId, category);
    const now = new Date();
    if (existing?.id != null) {
      const newStrength = Math.min(100, existing.strength + strengthDelta);
      await this.update(existing.id, { strength: newStrength, updatedAt: now });
    } else {
      await this.create({
        pilotId,
        category,
        source,
        strength: Math.min(100, strengthDelta),
        createdAt: now,
        updatedAt: now,
      });
    }
  }

  async getTopInterests(pilotId: number, limit = 3): Promise<PilotInterest[]> {
    const all = await this.getAllForPilot(pilotId);
    return all.sort((a, b) => b.strength - a.strength).slice(0, limit);
  }

  async clearOnboardingInterests(pilotId: number): Promise<void> {
    const onboarding = await db.pilotInterests
      .where("pilotId").equals(pilotId)
      .filter(i => i.source === "onboarding")
      .toArray();
    for (const i of onboarding) {
      if (i.id != null) await this.delete(i.id);
    }
  }
}

export const pilotInterestRepository = new PilotInterestRepository();
