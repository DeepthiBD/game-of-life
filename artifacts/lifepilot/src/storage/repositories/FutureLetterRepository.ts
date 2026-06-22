import { db } from "@/storage/db";
import type { FutureLetter } from "@/types";
import { BasePilotScopedRepository } from "./base/BaseRepository";

export class FutureLetterRepository extends BasePilotScopedRepository<FutureLetter> {
  protected readonly tableName = "futureLetters";
  protected get table() { return db.futureLetters; }

  async getUndelivered(pilotId: number): Promise<FutureLetter[]> {
    return db.futureLetters.where("pilotId").equals(pilotId)
      .filter(l => !l.delivered).toArray();
  }

  async getReadyToDeliver(pilotId: number): Promise<FutureLetter[]> {
    const now = new Date();
    return db.futureLetters.where("pilotId").equals(pilotId)
      .filter(l => !l.delivered && new Date(l.deliverAt) <= now).toArray();
  }

  async getDelivered(pilotId: number): Promise<FutureLetter[]> {
    return db.futureLetters.where("pilotId").equals(pilotId)
      .filter(l => l.delivered).toArray();
  }

  async markDelivered(id: number): Promise<void> {
    await db.futureLetters.update(id, {
      delivered: true,
      deliveredAt: new Date(),
      updatedAt: new Date(),
    } as Partial<FutureLetter>);
  }
}

export const futureLetterRepository = new FutureLetterRepository();
