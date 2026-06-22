// ============================================================
// LIFEPILOT — SETTINGS REPOSITORY
// ============================================================

import { db } from "@/storage/db";
import type { Settings, LanguagePreference, SupportedLanguage } from "@/types";
import { BaseRepository, BasePilotScopedRepository } from "./base/BaseRepository";

export class SettingsRepository extends BasePilotScopedRepository<Settings> {
  protected readonly tableName = "settings";
  protected get table() { return db.settings; }

  async getForPilot(pilotId: number): Promise<Settings | undefined> {
    return db.settings.where("pilotId").equals(pilotId).first();
  }

  async upsertForPilot(pilotId: number, changes: Partial<Omit<Settings, "id">>): Promise<void> {
    const existing = await this.getForPilot(pilotId);
    const now = new Date();
    if (existing?.id != null) {
      await this.update(existing.id, { ...changes, updatedAt: now } as Partial<Settings>);
    } else {
      await this.create({ pilotId, updatedAt: now, ...changes } as Omit<Settings, "id">);
    }
  }
}

export class LanguagePreferenceRepository extends BasePilotScopedRepository<LanguagePreference> {
  protected readonly tableName = "languagePreferences";
  protected get table() { return db.languagePreferences; }

  async getForPilot(pilotId: number): Promise<LanguagePreference | undefined> {
    return db.languagePreferences.where("pilotId").equals(pilotId).first();
  }

  async setLanguage(pilotId: number, language: SupportedLanguage): Promise<void> {
    const existing = await this.getForPilot(pilotId);
    const now = new Date();
    if (existing?.id != null) {
      await this.update(existing.id, { language, updatedAt: now } as Partial<LanguagePreference>);
    } else {
      await this.create({ pilotId, language, updatedAt: now } as Omit<LanguagePreference, "id">);
    }
  }
}

export class CoPilotRepository extends BaseRepository<{ id?: number; pilotId: number; [key: string]: unknown }> {
  protected readonly tableName = "coPilots";
  protected get table() { return db.coPilots as never; }
}

export const settingsRepository = new SettingsRepository();
export const languagePreferenceRepository = new LanguagePreferenceRepository();
