// ============================================================
// LIFEPILOT — LIFE CHOICES REPOSITORIES
// ============================================================

import { db } from "@/storage/db";
import type { LifeChoiceScenario, LifeChoiceOption, LifeChoiceOutcome } from "@/types";
import { BaseRepository, BasePilotScopedRepository } from "./base/BaseRepository";

export class LifeChoiceScenarioRepository extends BaseRepository<LifeChoiceScenario> {
  protected readonly tableName = "lifeChoiceScenarios";
  protected get table() { return db.lifeChoiceScenarios; }

  async getActive(): Promise<LifeChoiceScenario[]> {
    return db.lifeChoiceScenarios.filter(s => !!(s as { isActive?: boolean }).isActive).toArray();
  }

  async getByCategory(category: string): Promise<LifeChoiceScenario[]> {
    return db.lifeChoiceScenarios
      .filter(s => (s as { category?: string }).category === category)
      .toArray();
  }
}

export class LifeChoiceOptionRepository extends BaseRepository<LifeChoiceOption> {
  protected readonly tableName = "lifeChoiceOptions";
  protected get table() { return db.lifeChoiceOptions; }

  async getForScenario(scenarioId: number): Promise<LifeChoiceOption[]> {
    return db.lifeChoiceOptions.where("scenarioId").equals(scenarioId).toArray();
  }
}

export class LifeChoiceOutcomeRepository extends BasePilotScopedRepository<LifeChoiceOutcome> {
  protected readonly tableName = "lifeChoiceOutcomes";
  protected get table() { return db.lifeChoiceOutcomes; }

  async getForScenario(pilotId: number, scenarioId: number): Promise<LifeChoiceOutcome[]> {
    return db.lifeChoiceOutcomes
      .where("pilotId").equals(pilotId)
      .filter(o => (o as { scenarioId?: number }).scenarioId === scenarioId)
      .toArray();
  }

  async hasChosenScenario(pilotId: number, scenarioId: number): Promise<boolean> {
    const count = await db.lifeChoiceOutcomes
      .where("pilotId").equals(pilotId)
      .filter(o => (o as { scenarioId?: number }).scenarioId === scenarioId)
      .count();
    return count > 0;
  }
}

export const lifeChoiceScenarioRepository = new LifeChoiceScenarioRepository();
export const lifeChoiceOptionRepository = new LifeChoiceOptionRepository();
export const lifeChoiceOutcomeRepository = new LifeChoiceOutcomeRepository();
