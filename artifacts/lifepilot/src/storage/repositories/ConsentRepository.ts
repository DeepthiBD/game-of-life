// ============================================================
// LIFEPILOT — CONSENT REPOSITORIES
// Covers: ConsentRecord, VoiceConsent, AIConsentRecord
// ============================================================

import { db } from "@/storage/db";
import type { ConsentRecord, VoiceConsent, AIConsentRecord } from "@/types";
import { BasePilotScopedRepository } from "./base/BaseRepository";

export class ConsentRecordRepository extends BasePilotScopedRepository<ConsentRecord> {
  protected readonly tableName = "consentRecords";
  protected get table() { return db.consentRecords; }

  async getForPilot(pilotId: number): Promise<ConsentRecord[]> {
    return this.getAllForPilot(pilotId);
  }

  async hasConsented(pilotId: number, consentType: string): Promise<boolean> {
    const count = await db.consentRecords
      .where("pilotId").equals(pilotId)
      .filter(c => (c as { consentType?: string }).consentType === consentType && !!(c as { granted?: boolean }).granted)
      .count();
    return count > 0;
  }
}

export class VoiceConsentRepository extends BasePilotScopedRepository<VoiceConsent> {
  protected readonly tableName = "voiceConsents";
  protected get table() { return db.voiceConsents; }

  async getLatestForPilot(pilotId: number): Promise<VoiceConsent | undefined> {
    const all = await this.getAllForPilot(pilotId);
    return all.sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())[0];
  }
}

export class AIConsentRecordRepository extends BasePilotScopedRepository<AIConsentRecord> {
  protected readonly tableName = "aiConsentRecords";
  protected get table() { return db.aiConsentRecords; }

  async hasAIConsent(pilotId: number): Promise<boolean> {
    const count = await db.aiConsentRecords
      .where("pilotId").equals(pilotId)
      .filter(c => !!(c as { granted?: boolean }).granted)
      .count();
    return count > 0;
  }
}

export const consentRecordRepository = new ConsentRecordRepository();
export const voiceConsentRepository = new VoiceConsentRepository();
export const aiConsentRecordRepository = new AIConsentRecordRepository();
