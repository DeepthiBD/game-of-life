import { db } from "@/storage/db";
import type { Reflection, ReflectionType } from "@/types";
import { BasePilotScopedRepository } from "./base/BaseRepository";

export class ReflectionRepository extends BasePilotScopedRepository<Reflection> {
  protected readonly tableName = "reflections";
  protected get table() { return db.reflections; }

  async getByType(pilotId: number, type: ReflectionType): Promise<Reflection[]> {
    return db.reflections.where("pilotId").equals(pilotId)
      .filter(r => r.type === type).toArray();
  }

  async getRecent(pilotId: number, limit = 10): Promise<Reflection[]> {
    const all = await db.reflections.where("pilotId").equals(pilotId).toArray();
    return all
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  async getForDateRange(pilotId: number, from: Date, to: Date): Promise<Reflection[]> {
    return db.reflections.where("pilotId").equals(pilotId)
      .filter(r => {
        const d = new Date(r.createdAt);
        return d >= from && d <= to;
      }).toArray();
  }

  async getForGoal(pilotId: number, goalId: number): Promise<Reflection[]> {
    return db.reflections.where("pilotId").equals(pilotId)
      .filter(r => r.linkedGoalId === goalId).toArray();
  }

  async getStreak(pilotId: number): Promise<number> {
    const reflections = await db.reflections.where("pilotId").equals(pilotId).toArray();
    if (reflections.length === 0) return 0;
    const dates = new Set(
      reflections.map(r => new Date(r.createdAt).toISOString().slice(0, 10))
    );
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      if (dates.has(d.toISOString().slice(0, 10))) streak++;
      else if (i > 0) break;
    }
    return streak;
  }
}

export const reflectionRepository = new ReflectionRepository();
