// ============================================================
// LIFEPILOT — IDENTITY DOMAIN REPOSITORIES
// Covers: PilotIdentity, LifeExperience, LifeChapter,
//         DecisionRecord, RelationshipReflection,
//         FutureIdentity, PurposeStatement, LifeWheelSnapshot
// ============================================================

import { db } from "@/storage/db";
import type {
  PilotIdentity,
  LifeExperience,
  LifeChapter,
  DecisionRecord,
  RelationshipReflection,
  FutureIdentity,
  PurposeStatement,
  LifeWheelSnapshot,
} from "@/types";
import { BasePilotScopedRepository } from "./base/BaseRepository";

export class PilotIdentityRepository extends BasePilotScopedRepository<PilotIdentity> {
  protected readonly tableName = "pilotIdentity";
  protected get table() { return db.pilotIdentity; }

  async getForPilot(pilotId: number): Promise<PilotIdentity | undefined> {
    return db.pilotIdentity.where("pilotId").equals(pilotId).first();
  }
}

export class LifeExperienceRepository extends BasePilotScopedRepository<LifeExperience> {
  protected readonly tableName = "lifeExperiences";
  protected get table() { return db.lifeExperiences; }

  async getRecentForPilot(pilotId: number, limit = 10): Promise<LifeExperience[]> {
    const all = await this.getAllForPilot(pilotId);
    return all
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }
}

export class LifeChapterRepository extends BasePilotScopedRepository<LifeChapter> {
  protected readonly tableName = "lifeChapters";
  protected get table() { return db.lifeChapters; }

  async getCurrentForPilot(pilotId: number): Promise<LifeChapter | undefined> {
    return db.lifeChapters
      .where("pilotId").equals(pilotId)
      .filter(c => !c.endDate)
      .first();
  }
}

export class DecisionRecordRepository extends BasePilotScopedRepository<DecisionRecord> {
  protected readonly tableName = "decisionRecords";
  protected get table() { return db.decisionRecords; }
}

export class RelationshipReflectionRepository extends BasePilotScopedRepository<RelationshipReflection> {
  protected readonly tableName = "relationshipReflections";
  protected get table() { return db.relationshipReflections; }
}

export class FutureIdentityRepository extends BasePilotScopedRepository<FutureIdentity> {
  protected readonly tableName = "futureIdentities";
  protected get table() { return db.futureIdentities; }

  async getLatestForPilot(pilotId: number): Promise<FutureIdentity | undefined> {
    const all = await this.getAllForPilot(pilotId);
    return all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
  }
}

export class PurposeStatementRepository extends BasePilotScopedRepository<PurposeStatement> {
  protected readonly tableName = "purposeStatements";
  protected get table() { return db.purposeStatements; }

  async getLatestForPilot(pilotId: number): Promise<PurposeStatement | undefined> {
    const all = await this.getAllForPilot(pilotId);
    return all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
  }
}

export class LifeWheelSnapshotRepository extends BasePilotScopedRepository<LifeWheelSnapshot> {
  protected readonly tableName = "lifeWheelSnapshots";
  protected get table() { return db.lifeWheelSnapshots; }

  async getLatestForPilot(pilotId: number): Promise<LifeWheelSnapshot | undefined> {
    const all = await this.getAllForPilot(pilotId);
    return all.sort((a, b) => new Date(b.snapshotDate).getTime() - new Date(a.snapshotDate).getTime())[0];
  }
}

export const pilotIdentityRepository = new PilotIdentityRepository();
export const lifeExperienceRepository = new LifeExperienceRepository();
export const lifeChapterRepository = new LifeChapterRepository();
export const decisionRecordRepository = new DecisionRecordRepository();
export const relationshipReflectionRepository = new RelationshipReflectionRepository();
export const futureIdentityRepository = new FutureIdentityRepository();
export const purposeStatementRepository = new PurposeStatementRepository();
export const lifeWheelSnapshotRepository = new LifeWheelSnapshotRepository();
