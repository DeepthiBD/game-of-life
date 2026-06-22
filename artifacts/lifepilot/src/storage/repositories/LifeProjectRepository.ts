// ============================================================
// LIFEPILOT — LIFE PROJECT, MILESTONE & ROLE REPOSITORIES
// ============================================================

import { db } from "@/storage/db";
import type { LifeProject, LifeProjectMilestone, LifeRole } from "@/types";
import { BasePilotScopedRepository } from "./base/BaseRepository";

export class LifeProjectRepository extends BasePilotScopedRepository<LifeProject> {
  protected readonly tableName = "lifeProjects";
  protected get table() { return db.lifeProjects; }

  async getActiveForPilot(pilotId: number): Promise<LifeProject[]> {
    return db.lifeProjects
      .where("pilotId").equals(pilotId)
      .filter(p => (p as { status?: string }).status === "active")
      .toArray();
  }
}

export class LifeProjectMilestoneRepository extends BasePilotScopedRepository<LifeProjectMilestone> {
  protected readonly tableName = "lifeProjectMilestones";
  protected get table() { return db.lifeProjectMilestones; }

  async getForProject(projectId: number): Promise<LifeProjectMilestone[]> {
    return db.lifeProjectMilestones
      .filter(m => (m as { projectId?: number }).projectId === projectId)
      .toArray();
  }

  async markComplete(id: number): Promise<void> {
    await this.update(id, { completedAt: new Date() } as Partial<LifeProjectMilestone>);
  }
}

export class LifeRoleRepository extends BasePilotScopedRepository<LifeRole> {
  protected readonly tableName = "lifeRoles";
  protected get table() { return db.lifeRoles; }

  async getActiveForPilot(pilotId: number): Promise<LifeRole[]> {
    return db.lifeRoles
      .where("pilotId").equals(pilotId)
      .filter(r => r.isActive)
      .toArray();
  }
}

export const lifeProjectRepository = new LifeProjectRepository();
export const lifeProjectMilestoneRepository = new LifeProjectMilestoneRepository();
export const lifeRoleRepository = new LifeRoleRepository();
