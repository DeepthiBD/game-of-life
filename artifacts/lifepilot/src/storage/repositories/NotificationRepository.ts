import { db } from "@/storage/db";
import type { Notification, NotificationType, NotificationStatus } from "@/types";
import { BasePilotScopedRepository } from "./base/BaseRepository";

export class NotificationRepository extends BasePilotScopedRepository<Notification> {
  protected readonly tableName = "notifications";
  protected get table() { return db.notifications; }

  async getScheduled(pilotId: number): Promise<Notification[]> {
    return db.notifications.where("pilotId").equals(pilotId)
      .filter(n => n.status === "scheduled").toArray();
  }

  async getByStatus(pilotId: number, status: NotificationStatus): Promise<Notification[]> {
    return db.notifications.where("pilotId").equals(pilotId)
      .filter(n => n.status === status).toArray();
  }

  async getByType(pilotId: number, type: NotificationType): Promise<Notification[]> {
    return db.notifications.where("pilotId").equals(pilotId)
      .filter(n => n.type === type).toArray();
  }

  async markRead(id: number): Promise<void> {
    await db.notifications.update(id, {
      status: "delivered" as NotificationStatus,
      readAt: new Date(),
    } as Partial<Notification>);
  }

  async getUnread(pilotId: number): Promise<Notification[]> {
    return db.notifications.where("pilotId").equals(pilotId)
      .filter(n => !n.readAt).toArray();
  }

  async countUnread(pilotId: number): Promise<number> {
    return db.notifications.where("pilotId").equals(pilotId)
      .filter(n => !n.readAt).count();
  }
}

export const notificationRepository = new NotificationRepository();
