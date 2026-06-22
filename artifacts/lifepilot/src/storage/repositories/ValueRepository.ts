// ============================================================
// LIFEPILOT — VALUE & VALUE PRACTICE REPOSITORIES
// ============================================================

import { db } from "@/storage/db";
import type { Value, ValuePractice } from "@/types";
import { BasePilotScopedRepository } from "./base/BaseRepository";

export class ValueRepository extends BasePilotScopedRepository<Value> {
  protected readonly tableName = "values";
  protected get table() { return db.values; }

  async getActiveForPilot(pilotId: number): Promise<Value[]> {
    return db.values
      .where("pilotId").equals(pilotId)
      .filter(v => (v as { isActive?: boolean }).isActive !== false)
      .toArray();
  }
}

export class ValuePracticeRepository extends BasePilotScopedRepository<ValuePractice> {
  protected readonly tableName = "valuePractices";
  protected get table() { return db.valuePractices; }

  async getForValue(valueId: number): Promise<ValuePractice[]> {
    return db.valuePractices
      .filter(p => (p as { valueId?: number }).valueId === valueId)
      .toArray();
  }

  async getRecentForPilot(pilotId: number, limit = 10): Promise<ValuePractice[]> {
    const all = await this.getAllForPilot(pilotId);
    return all
      .sort((a, b) => new Date(b.practicedAt ?? b.createdAt ?? 0).getTime() - new Date(a.practicedAt ?? a.createdAt ?? 0).getTime())
      .slice(0, limit);
  }
}

export const valueRepository = new ValueRepository();
export const valuePracticeRepository = new ValuePracticeRepository();
