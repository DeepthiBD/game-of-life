// ============================================================
// LIFEPILOT — PILOT ASPIRATION REPOSITORY (RP-002A)
// Stores raw text extracts from letters and reflections.
// Used for internal context only — never shown back as analysis.
// ============================================================

import { db } from "@/storage/db";
import type { PilotAspiration, PilotSignalSource } from "@/types";
import { BasePilotScopedRepository } from "../base/BaseRepository";

export class PilotAspirationRepository extends BasePilotScopedRepository<PilotAspiration> {
  protected readonly tableName = "pilotAspirations";
  protected get table() { return db.pilotAspirations; }

  async record(
    pilotId: number,
    text: string,
    source: PilotSignalSource,
  ): Promise<number> {
    const now = new Date();
    return this.create({ pilotId, text, source, extractedAt: now, createdAt: now });
  }

  async getRecentForPilot(pilotId: number, limit = 10): Promise<PilotAspiration[]> {
    const all = await this.getAllForPilot(pilotId);
    return all
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async getBySource(pilotId: number, source: PilotSignalSource): Promise<PilotAspiration[]> {
    return db.pilotAspirations
      .where("pilotId").equals(pilotId)
      .filter(a => a.source === source)
      .toArray();
  }
}

export const pilotAspirationRepository = new PilotAspirationRepository();
