// ============================================================
// LIFEPILOT — EMERGING IDENTITY REPOSITORIES (RP-001)
// Note: EmergingIdentity, FuturePath, FutureSnapshot are catalog
// entities (no pilotId) — use BaseRepository.
// IdentitySignal, IdentityMoment, PilotMemory, MemoryReaction
// are pilot-scoped or memory-scoped as appropriate.
// ============================================================

import { db } from "@/storage/db";
import type {
  EmergingIdentity,
  IdentitySignal,
  IdentityMoment,
  FuturePath,
  FutureSnapshot,
  PilotMemory,
  MemoryReaction,
} from "@/types";
import { BaseRepository, BasePilotScopedRepository } from "./base/BaseRepository";

export class EmergingIdentityRepository extends BaseRepository<EmergingIdentity> {
  protected readonly tableName = "emergingIdentities";
  protected get table() { return db.emergingIdentities; }

  async getActive(): Promise<EmergingIdentity[]> {
    return db.emergingIdentities.filter(e => e.isActive).toArray();
  }
}

export class IdentitySignalRepository extends BasePilotScopedRepository<IdentitySignal> {
  protected readonly tableName = "identitySignals";
  protected get table() { return db.identitySignals; }

  async getRecentForPilot(pilotId: number, limit = 20): Promise<IdentitySignal[]> {
    const all = await this.getAllForPilot(pilotId);
    return all
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }
}

export class IdentityMomentRepository extends BasePilotScopedRepository<IdentityMoment> {
  protected readonly tableName = "identityMoments";
  protected get table() { return db.identityMoments; }
}

export class FuturePathRepository extends BaseRepository<FuturePath> {
  protected readonly tableName = "futurePaths";
  protected get table() { return db.futurePaths; }

  async getFree(): Promise<FuturePath[]> {
    return db.futurePaths.filter(p => !p.isPremium).toArray();
  }
}

export class FutureSnapshotRepository extends BaseRepository<FutureSnapshot> {
  protected readonly tableName = "futureSnapshots";
  protected get table() { return db.futureSnapshots; }

  async getForPath(futurePathId: number): Promise<FutureSnapshot[]> {
    return db.futureSnapshots.where("futurePathId").equals(futurePathId).toArray();
  }
}

export class PilotMemoryRepository extends BasePilotScopedRepository<PilotMemory> {
  protected readonly tableName = "pilotMemories";
  protected get table() { return db.pilotMemories; }

  async getRecentForPilot(pilotId: number, limit = 10): Promise<PilotMemory[]> {
    const all = await this.getAllForPilot(pilotId);
    return all
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }
}

export class MemoryReactionRepository extends BaseRepository<MemoryReaction> {
  protected readonly tableName = "memoryReactions";
  protected get table() { return db.memoryReactions; }

  async getForMemory(pilotMemoryId: number): Promise<MemoryReaction[]> {
    return db.memoryReactions.where("pilotMemoryId").equals(pilotMemoryId).toArray();
  }
}

export const emergingIdentityRepository = new EmergingIdentityRepository();
export const identitySignalRepository = new IdentitySignalRepository();
export const identityMomentRepository = new IdentityMomentRepository();
export const futurePathRepository = new FuturePathRepository();
export const futureSnapshotRepository = new FutureSnapshotRepository();
export const pilotMemoryRepository = new PilotMemoryRepository();
export const memoryReactionRepository = new MemoryReactionRepository();
