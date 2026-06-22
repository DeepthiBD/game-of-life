import { db } from "@/storage/db";
import type { Habit, HabitActivity } from "@/types";
import { BasePilotScopedRepository } from "./base/BaseRepository";

export class HabitRepository extends BasePilotScopedRepository<Habit> {
  protected readonly tableName = "habits";
  protected get table() { return db.habits; }

  async getActiveForPilot(pilotId: number): Promise<Habit[]> {
    return db.habits.where("pilotId").equals(pilotId)
      .filter(h => h.isActive).toArray();
  }

  async getByCategory(pilotId: number, category: string): Promise<Habit[]> {
    return db.habits.where("pilotId").equals(pilotId)
      .filter(h => h.category === category).toArray();
  }

  async getActivities(habitId: number): Promise<HabitActivity[]> {
    return db.habitActivities.where("habitId").equals(habitId).toArray();
  }

  async getActivitiesForPilot(pilotId: number, limit = 30): Promise<HabitActivity[]> {
    const all = await db.habitActivities.where("pilotId").equals(pilotId).toArray();
    return all
      .sort((a, b) => new Date(b.completedAt ?? b.createdAt).getTime() - new Date(a.completedAt ?? a.createdAt).getTime())
      .slice(0, limit);
  }

  async logActivity(activity: Omit<HabitActivity, "id">): Promise<number> {
    return db.habitActivities.add(activity as HabitActivity);
  }

  async getCurrentStreak(habitId: number): Promise<number> {
    const habit = await db.habits.get(habitId);
    return habit?.currentStreak ?? 0;
  }
}

export const habitRepository = new HabitRepository();
