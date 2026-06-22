// ============================================================
// LIFEPILOT — PILOT CONTENT HISTORY REPOSITORY (RP-002A)
// Tracks which content (adventures, prompts, messages) a pilot
// has seen, selected, skipped, or completed.
// Prevents repetition and enables novelty-first ordering.
// ============================================================

import { db } from "@/storage/db";
import type { PilotContentHistory } from "@/types";
import { BasePilotScopedRepository } from "../base/BaseRepository";

export class PilotContentHistoryRepository extends BasePilotScopedRepository<PilotContentHistory> {
  protected readonly tableName = "pilotContentHistory";
  protected get table() { return db.pilotContentHistory; }

  async record(
    pilotId: number,
    contentType: string,
    contentId: string,
    interactionType: PilotContentHistory["interactionType"],
  ): Promise<number> {
    return this.create({
      pilotId,
      contentType,
      contentId,
      interactionType,
      createdAt: new Date(),
    });
  }

  async hasSeenContent(pilotId: number, contentType: string, contentId: string): Promise<boolean> {
    const count = await db.pilotContentHistory
      .where("pilotId").equals(pilotId)
      .filter(h => h.contentType === contentType && h.contentId === contentId)
      .count();
    return count > 0;
  }

  async getSeenContentIds(pilotId: number, contentType: string): Promise<Set<string>> {
    const entries = await db.pilotContentHistory
      .where("pilotId").equals(pilotId)
      .filter(h => h.contentType === contentType)
      .toArray();
    return new Set(entries.map(h => h.contentId));
  }

  async getCompletedContentIds(pilotId: number, contentType: string): Promise<Set<string>> {
    const entries = await db.pilotContentHistory
      .where("pilotId").equals(pilotId)
      .filter(h => h.contentType === contentType && h.interactionType === "completed")
      .toArray();
    return new Set(entries.map(h => h.contentId));
  }
}

export const pilotContentHistoryRepository = new PilotContentHistoryRepository();
