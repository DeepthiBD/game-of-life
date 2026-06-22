// ============================================================
// LIFEPILOT — ACHIEVEMENT, BADGE & CERTIFICATE REPOSITORIES
// ============================================================

import { db } from "@/storage/db";
import type { Achievement, Badge, Certificate } from "@/types";
import { BaseRepository, BasePilotScopedRepository } from "./base/BaseRepository";

export class AchievementRepository extends BasePilotScopedRepository<Achievement> {
  protected readonly tableName = "achievements";
  protected get table() { return db.achievements; }

  async getByType(pilotId: number, type: string): Promise<Achievement[]> {
    return db.achievements
      .where("pilotId").equals(pilotId)
      .filter(a => a.type === type)
      .toArray();
  }

  async getRecentForPilot(pilotId: number, limit = 5): Promise<Achievement[]> {
    const all = await this.getAllForPilot(pilotId);
    return all
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }
}

export class BadgeRepository extends BaseRepository<Badge> {
  protected readonly tableName = "badges";
  protected get table() { return db.badges; }

  async getAll(): Promise<Badge[]> {
    return db.badges.toArray();
  }

  async getByAchievement(achievementId: number): Promise<Badge[]> {
    return db.badges.where("achievementId").equals(achievementId).toArray();
  }
}

export class CertificateRepository extends BaseRepository<Certificate> {
  protected readonly tableName = "certificates";
  protected get table() { return db.certificates; }

  async getByAchievement(achievementId: number): Promise<Certificate[]> {
    return db.certificates.where("achievementId").equals(achievementId).toArray();
  }
}

export const achievementRepository = new AchievementRepository();
export const badgeRepository = new BadgeRepository();
export const certificateRepository = new CertificateRepository();
