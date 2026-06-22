import { db } from "@/storage/db";
import type { FlightPlanGoal, GoalCategory } from "@/types";
import { BasePilotScopedRepository } from "./base/BaseRepository";

export class GoalRepository extends BasePilotScopedRepository<FlightPlanGoal> {
  protected readonly tableName = "flightPlanGoals";
  protected get table() { return db.flightPlanGoals; }

  async getActiveForPilot(pilotId: number): Promise<FlightPlanGoal[]> {
    return db.flightPlanGoals.where("pilotId").equals(pilotId)
      .filter(g => g.status === "active").toArray();
  }

  async getCompletedForPilot(pilotId: number): Promise<FlightPlanGoal[]> {
    return db.flightPlanGoals.where("pilotId").equals(pilotId)
      .filter(g => g.status === "completed").toArray();
  }

  async getByCategory(pilotId: number, category: GoalCategory): Promise<FlightPlanGoal[]> {
    return db.flightPlanGoals.where("pilotId").equals(pilotId)
      .filter(g => g.category === category).toArray();
  }

  async updateProgress(id: number, progress: number): Promise<void> {
    await db.flightPlanGoals.update(id, { progress, updatedAt: new Date() } as Partial<FlightPlanGoal>);
  }
}

export const goalRepository = new GoalRepository();
