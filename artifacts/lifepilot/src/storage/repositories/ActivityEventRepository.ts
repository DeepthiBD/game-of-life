import { db } from "@/storage/db";
import type { ActivityEvent, ActivityEventType } from "@/types";
import { BasePilotScopedRepository } from "./base/BaseRepository";

export class ActivityEventRepository extends BasePilotScopedRepository<ActivityEvent> {
  protected readonly tableName = "activityEvents";
  protected get table() { return db.activityEvents; }

  async getRecentForPilot(pilotId: number, limit = 50): Promise<ActivityEvent[]> {
    const all = await db.activityEvents.where("pilotId").equals(pilotId).toArray();
    return all
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  async getByEventType(pilotId: number, eventType: ActivityEventType): Promise<ActivityEvent[]> {
    return db.activityEvents.where("pilotId").equals(pilotId)
      .filter(e => e.eventType === eventType).toArray();
  }

  async getForEntity(pilotId: number, entityType: string, entityId: number): Promise<ActivityEvent[]> {
    return db.activityEvents.where("pilotId").equals(pilotId)
      .filter(e => e.entityType === entityType && e.entityId === entityId).toArray();
  }

  async getForDateRange(pilotId: number, from: Date, to: Date): Promise<ActivityEvent[]> {
    return db.activityEvents.where("pilotId").equals(pilotId)
      .filter(e => {
        const d = new Date(e.createdAt);
        return d >= from && d <= to;
      }).toArray();
  }

  async countByType(pilotId: number, eventType: ActivityEventType): Promise<number> {
    return db.activityEvents.where("pilotId").equals(pilotId)
      .filter(e => e.eventType === eventType).count();
  }
}

export const activityEventRepository = new ActivityEventRepository();
