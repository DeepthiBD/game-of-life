// ============================================================
// LIFEPILOT — COMPETENCY, PRACTICE & GROWTH REPOSITORIES
// ============================================================

import { db } from "@/storage/db";
import type { Competency, CompetencyPractice, GrowthEvidence } from "@/types";
import { BasePilotScopedRepository } from "./base/BaseRepository";

export class CompetencyRepository extends BasePilotScopedRepository<Competency> {
  protected readonly tableName = "competencies";
  protected get table() { return db.competencies; }

  async getByCategory(pilotId: number, category: string): Promise<Competency[]> {
    return db.competencies
      .where("pilotId").equals(pilotId)
      .filter(c => c.category === category)
      .toArray();
  }

  async incrementLevel(id: number): Promise<void> {
    const comp = await this.getById(id);
    if (comp) {
      await this.update(id, { level: (comp.level ?? 0) + 1 } as Partial<Competency>);
    }
  }
}

export class CompetencyPracticeRepository extends BasePilotScopedRepository<CompetencyPractice> {
  protected readonly tableName = "competencyPractices";
  protected get table() { return db.competencyPractices; }

  async getForCompetency(competencyId: number): Promise<CompetencyPractice[]> {
    return db.competencyPractices.where("competencyId").equals(competencyId).toArray();
  }

  async countForCompetency(competencyId: number): Promise<number> {
    return db.competencyPractices.where("competencyId").equals(competencyId).count();
  }
}

export class GrowthEvidenceRepository extends BasePilotScopedRepository<GrowthEvidence> {
  protected readonly tableName = "growthEvidence";
  protected get table() { return db.growthEvidence; }

  async getRecentForPilot(pilotId: number, limit = 10): Promise<GrowthEvidence[]> {
    const all = await this.getAllForPilot(pilotId);
    return all
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }
}

export const competencyRepository = new CompetencyRepository();
export const competencyPracticeRepository = new CompetencyPracticeRepository();
export const growthEvidenceRepository = new GrowthEvidenceRepository();
