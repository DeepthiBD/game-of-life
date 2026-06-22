// ============================================================
// LIFEPILOT — PILOT SIGNAL REPOSITORY (RP-002A)
// Records passive observations from all modules.
// Used by PilotDnaService to update affinities.
// Never queried directly by UI components.
// ============================================================

import { db } from "@/storage/db";
import type { PilotSignal, PilotSignalSource, PilotSignalType } from "@/types";
import { BasePilotScopedRepository } from "../base/BaseRepository";

export class PilotSignalRepository extends BasePilotScopedRepository<PilotSignal> {
  protected readonly tableName = "pilotSignals";
  protected get table() { return db.pilotSignals; }

  async recordSignal(
    pilotId: number,
    source: PilotSignalSource,
    signalType: PilotSignalType,
    entityType: string,
    entityId?: number,
    tags?: string[],
  ): Promise<number> {
    return this.create({
      pilotId,
      source,
      signalType,
      entityType,
      entityId,
      tags: tags ? JSON.stringify(tags) : undefined,
      createdAt: new Date(),
    });
  }

  async getRecentForPilot(pilotId: number, limit = 50): Promise<PilotSignal[]> {
    const all = await this.getAllForPilot(pilotId);
    return all
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async getBySource(pilotId: number, source: PilotSignalSource): Promise<PilotSignal[]> {
    return db.pilotSignals
      .where("pilotId").equals(pilotId)
      .filter(s => s.source === source)
      .toArray();
  }

  async countSinceDate(pilotId: number, since: Date): Promise<number> {
    return db.pilotSignals
      .where("pilotId").equals(pilotId)
      .filter(s => s.createdAt >= since)
      .count();
  }
}

export const pilotSignalRepository = new PilotSignalRepository();
