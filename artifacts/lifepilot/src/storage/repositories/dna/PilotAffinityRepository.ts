// ============================================================
// LIFEPILOT — PILOT AFFINITY REPOSITORY (RP-002A)
// Stores computed affinity strengths per domain per pilot.
// Affinities are derived from signals — never shown to users.
// ============================================================

import { db } from "@/storage/db";
import type { PilotAffinity } from "@/types";
import { BasePilotScopedRepository } from "../base/BaseRepository";

export class PilotAffinityRepository extends BasePilotScopedRepository<PilotAffinity> {
  protected readonly tableName = "pilotAffinities";
  protected get table() { return db.pilotAffinities; }

  async getByDomain(pilotId: number, domain: string): Promise<PilotAffinity | undefined> {
    return db.pilotAffinities
      .where("pilotId").equals(pilotId)
      .filter(a => a.domain === domain)
      .first();
  }

  async nudge(pilotId: number, domain: string, delta: number): Promise<void> {
    const now = new Date();
    const existing = await this.getByDomain(pilotId, domain);
    if (existing?.id != null) {
      const newStrength = Math.max(0, Math.min(100, existing.strength + delta));
      await this.update(existing.id, { strength: newStrength, lastSignalAt: now, updatedAt: now });
    } else {
      await this.create({
        pilotId,
        domain,
        strength: Math.max(0, Math.min(100, delta)),
        lastSignalAt: now,
        updatedAt: now,
      });
    }
  }

  async getTopDomains(pilotId: number, limit = 5): Promise<PilotAffinity[]> {
    const all = await this.getAllForPilot(pilotId);
    return all.sort((a, b) => b.strength - a.strength).slice(0, limit);
  }

  async getDomainMap(pilotId: number): Promise<Record<string, number>> {
    const all = await this.getAllForPilot(pilotId);
    return Object.fromEntries(all.map(a => [a.domain, a.strength]));
  }
}

export const pilotAffinityRepository = new PilotAffinityRepository();
