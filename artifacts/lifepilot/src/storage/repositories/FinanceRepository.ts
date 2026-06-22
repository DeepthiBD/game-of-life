import { db } from "@/storage/db";
import type { FinancialConcept, FinancialLessonProgress } from "@/types";
import { BaseRepository, BasePilotScopedRepository } from "./base/BaseRepository";

export class FinancialConceptRepository extends BaseRepository<FinancialConcept> {
  protected readonly tableName = "financialConcepts";
  protected get table() { return db.financialConcepts; }

  async getByType(type: string): Promise<FinancialConcept[]> {
    return db.financialConcepts.filter(c => c.type === type).toArray();
  }

  async getByDifficulty(difficulty: string): Promise<FinancialConcept[]> {
    return db.financialConcepts.filter(c => c.difficulty === difficulty).toArray();
  }

  async search(query: string): Promise<FinancialConcept[]> {
    const lower = query.toLowerCase();
    return db.financialConcepts.filter(c =>
      c.title.toLowerCase().includes(lower) ||
      c.description.toLowerCase().includes(lower)
    ).toArray();
  }
}

export class FinancialLessonProgressRepository extends BasePilotScopedRepository<FinancialLessonProgress> {
  protected readonly tableName = "financialLessonProgress";
  protected get table() { return db.financialLessonProgress; }

  async getForConcept(pilotId: number, conceptId: number): Promise<FinancialLessonProgress | undefined> {
    return db.financialLessonProgress.where("pilotId").equals(pilotId)
      .filter(p => p.conceptId === conceptId).first();
  }

  async getCompleted(pilotId: number): Promise<FinancialLessonProgress[]> {
    return db.financialLessonProgress.where("pilotId").equals(pilotId)
      .filter(p => p.completed).toArray();
  }

  async countCompleted(pilotId: number): Promise<number> {
    return db.financialLessonProgress.where("pilotId").equals(pilotId)
      .filter(p => p.completed).count();
  }
}

export const financialConceptRepository = new FinancialConceptRepository();
export const financialLessonProgressRepository = new FinancialLessonProgressRepository();
