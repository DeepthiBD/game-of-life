// ============================================================
// LIFEPILOT — DECISION JOURNAL & OUTCOME REPOSITORIES
// ============================================================

import { db } from "@/storage/db";
import type { DecisionJournal, DecisionOutcome } from "@/types";
import { BasePilotScopedRepository } from "./base/BaseRepository";

export class DecisionJournalRepository extends BasePilotScopedRepository<DecisionJournal> {
  protected readonly tableName = "decisionJournals";
  protected get table() { return db.decisionJournals; }

  async getRecentForPilot(pilotId: number, limit = 10): Promise<DecisionJournal[]> {
    const all = await this.getAllForPilot(pilotId);
    return all
      .sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())
      .slice(0, limit);
  }
}

export class DecisionOutcomeRepository extends BasePilotScopedRepository<DecisionOutcome> {
  protected readonly tableName = "decisionOutcomes";
  protected get table() { return db.decisionOutcomes; }

  async getForJournal(journalId: number): Promise<DecisionOutcome[]> {
    return db.decisionOutcomes
      .filter(o => (o as { decisionJournalId?: number }).decisionJournalId === journalId)
      .toArray();
  }
}

export const decisionJournalRepository = new DecisionJournalRepository();
export const decisionOutcomeRepository = new DecisionOutcomeRepository();
