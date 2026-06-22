import { db } from "@/storage/db";
import type { Mission, MissionCompletion, MissionStatus } from "@/types";
import { BaseRepository, BasePilotScopedRepository } from "./base/BaseRepository";

export class MissionRepository extends BaseRepository<Mission> {
  protected readonly tableName = "missions";
  protected get table() { return db.missions; }

  async getByStatus(status: MissionStatus): Promise<Mission[]> {
    return db.missions.where("status").equals(status).toArray();
  }

  async getAvailable(): Promise<Mission[]> {
    return this.getByStatus("available");
  }

  async getByCategory(category: string): Promise<Mission[]> {
    return db.missions.where("category").equals(category).toArray();
  }

  async getByDifficulty(difficulty: string): Promise<Mission[]> {
    return db.missions.filter(m => m.difficulty === difficulty).toArray();
  }
}

export class MissionCompletionRepository extends BasePilotScopedRepository<MissionCompletion> {
  protected readonly tableName = "missionCompletions";
  protected get table() { return db.missionCompletions; }

  async getForMission(pilotId: number, missionId: number): Promise<MissionCompletion | undefined> {
    return db.missionCompletions.where("pilotId").equals(pilotId)
      .filter(c => c.missionId === missionId).first();
  }

  async hasCompleted(pilotId: number, missionId: number): Promise<boolean> {
    const record = await this.getForMission(pilotId, missionId);
    return record !== undefined;
  }

  async getTotalXpEarned(pilotId: number): Promise<number> {
    const completions = await db.missionCompletions.where("pilotId").equals(pilotId).toArray();
    return completions.reduce((sum, c) => sum + (c.xpEarned ?? 0), 0);
  }
}

export const missionRepository = new MissionRepository();
export const missionCompletionRepository = new MissionCompletionRepository();
