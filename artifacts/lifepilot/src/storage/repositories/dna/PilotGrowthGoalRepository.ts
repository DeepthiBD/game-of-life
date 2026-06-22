// ============================================================
// LIFEPILOT — PILOT GROWTH GOAL REPOSITORY (RP-002A)
// Stores the growth goals a pilot wants to develop.
// Distinct from FlightPlanGoal — these are personality-level
// aspirations collected at onboarding and observed passively.
// ============================================================

import { db } from "@/storage/db";
import type { PilotGrowthGoal, PilotGrowthGoalType } from "@/types";
import { BasePilotScopedRepository } from "../base/BaseRepository";

export class PilotGrowthGoalRepository extends BasePilotScopedRepository<PilotGrowthGoal> {
  protected readonly tableName = "pilotGrowthGoals";
  protected get table() { return db.pilotGrowthGoals; }

  async getByGoal(pilotId: number, goal: PilotGrowthGoalType): Promise<PilotGrowthGoal | undefined> {
    return db.pilotGrowthGoals
      .where("pilotId").equals(pilotId)
      .filter(g => g.goal === goal)
      .first();
  }

  async upsertGoal(
    pilotId: number,
    goal: PilotGrowthGoalType,
    source: "onboarding" | "observed",
  ): Promise<void> {
    const existing = await this.getByGoal(pilotId, goal);
    if (!existing) {
      const now = new Date();
      await this.create({ pilotId, goal, source, createdAt: now, updatedAt: now });
    }
  }

  async saveOnboardingGoals(pilotId: number, goals: PilotGrowthGoalType[]): Promise<void> {
    for (const goal of goals) {
      await this.upsertGoal(pilotId, goal, "onboarding");
    }
  }

  async getGoalTypes(pilotId: number): Promise<PilotGrowthGoalType[]> {
    const all = await this.getAllForPilot(pilotId);
    return all.map(g => g.goal);
  }
}

export const pilotGrowthGoalRepository = new PilotGrowthGoalRepository();
