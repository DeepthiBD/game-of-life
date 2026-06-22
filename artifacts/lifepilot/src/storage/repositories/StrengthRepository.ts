// ============================================================
// LIFEPILOT — STRENGTH & IMPACT REPOSITORIES
// ============================================================

import { db } from "@/storage/db";
import type { StrengthCatalog, PilotStrength, ImpactEvidence } from "@/types";
import { BaseRepository, BasePilotScopedRepository } from "./base/BaseRepository";

export class StrengthCatalogRepository extends BaseRepository<StrengthCatalog> {
  protected readonly tableName = "strengthCatalog";
  protected get table() { return db.strengthCatalog; }

  async getActive(): Promise<StrengthCatalog[]> {
    return db.strengthCatalog.filter(s => (s as { isActive?: boolean }).isActive !== false).toArray();
  }
}

export class PilotStrengthRepository extends BasePilotScopedRepository<PilotStrength> {
  protected readonly tableName = "pilotStrengths";
  protected get table() { return db.pilotStrengths; }

  async getTopStrengths(pilotId: number, limit = 5): Promise<PilotStrength[]> {
    const all = await this.getAllForPilot(pilotId);
    return all
      .sort((a, b) => ((b as { level?: number }).level ?? 0) - ((a as { level?: number }).level ?? 0))
      .slice(0, limit);
  }
}

export class ImpactEvidenceRepository extends BasePilotScopedRepository<ImpactEvidence> {
  protected readonly tableName = "impactEvidence";
  protected get table() { return db.impactEvidence; }

  async getRecentForPilot(pilotId: number, limit = 10): Promise<ImpactEvidence[]> {
    const all = await this.getAllForPilot(pilotId);
    return all
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }
}

export const strengthCatalogRepository = new StrengthCatalogRepository();
export const pilotStrengthRepository = new PilotStrengthRepository();
export const impactEvidenceRepository = new ImpactEvidenceRepository();
