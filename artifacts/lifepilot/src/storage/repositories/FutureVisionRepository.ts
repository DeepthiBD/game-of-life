// ============================================================
// LIFEPILOT — FUTURE VISION & MILESTONE REPOSITORIES
// ============================================================

import { db } from "@/storage/db";
import type { FutureVision, FutureMilestone } from "@/types";
import { BasePilotScopedRepository } from "./base/BaseRepository";

export class FutureVisionRepository extends BasePilotScopedRepository<FutureVision> {
  protected readonly tableName = "futureVisions";
  protected get table() { return db.futureVisions; }

  async getLatestForPilot(pilotId: number): Promise<FutureVision | undefined> {
    const all = await this.getAllForPilot(pilotId);
    return all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
  }
}

export class FutureMilestoneRepository extends BasePilotScopedRepository<FutureMilestone> {
  protected readonly tableName = "futureMilestones";
  protected get table() { return db.futureMilestones; }

  async getForVision(visionId: number): Promise<FutureMilestone[]> {
    return db.futureMilestones.where("visionId").equals(visionId).toArray();
  }

  async getAchievedForPilot(pilotId: number): Promise<FutureMilestone[]> {
    return db.futureMilestones
      .where("pilotId").equals(pilotId)
      .filter(m => !!m.achieved)
      .toArray();
  }

  async markAchieved(id: number): Promise<void> {
    await db.futureMilestones.update(id, { achieved: true } as Partial<FutureMilestone>);
  }
}

export const futureVisionRepository = new FutureVisionRepository();
export const futureMilestoneRepository = new FutureMilestoneRepository();
