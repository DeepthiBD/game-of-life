// ============================================================
// LIFEPILOT — FLIGHT LOG ENTRY REPOSITORY
// ============================================================

import { db } from "@/storage/db";
import type { FlightLogEntry } from "@/types";
import { BasePilotScopedRepository } from "./base/BaseRepository";

export class FlightLogEntryRepository extends BasePilotScopedRepository<FlightLogEntry> {
  protected readonly tableName = "flightLogEntries";
  protected get table() { return db.flightLogEntries; }

  async getRecentForPilot(pilotId: number, limit = 10): Promise<FlightLogEntry[]> {
    const all = await this.getAllForPilot(pilotId);
    return all
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  async getByMood(pilotId: number, mood: string): Promise<FlightLogEntry[]> {
    return db.flightLogEntries
      .where("pilotId").equals(pilotId)
      .filter(e => e.mood === mood)
      .toArray();
  }

  async getLinkedToGoal(pilotId: number, goalId: number): Promise<FlightLogEntry[]> {
    return db.flightLogEntries
      .where("pilotId").equals(pilotId)
      .filter(e => e.linkedGoalId === goalId)
      .toArray();
  }

  async getThisWeek(pilotId: number): Promise<FlightLogEntry[]> {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return db.flightLogEntries
      .where("pilotId").equals(pilotId)
      .filter(e => new Date(e.createdAt) >= weekAgo)
      .toArray();
  }
}

export const flightLogEntryRepository = new FlightLogEntryRepository();
