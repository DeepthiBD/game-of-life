// ============================================================
// LIFEPILOT — PILOT PREFERENCE REPOSITORY (RP-002A)
// Stores adventure style preferences per pilot.
// ============================================================

import { db } from "@/storage/db";
import type { PilotPreference, PilotAdventureStyle } from "@/types";
import { BasePilotScopedRepository } from "../base/BaseRepository";

export class PilotPreferenceRepository extends BasePilotScopedRepository<PilotPreference> {
  protected readonly tableName = "pilotPreferences";
  protected get table() { return db.pilotPreferences; }

  async getByStyle(pilotId: number, style: PilotAdventureStyle): Promise<PilotPreference | undefined> {
    return db.pilotPreferences
      .where("pilotId").equals(pilotId)
      .filter(p => p.adventureStyle === style)
      .first();
  }

  async upsertStyle(
    pilotId: number,
    adventureStyle: PilotAdventureStyle,
    source: "onboarding" | "observed",
  ): Promise<void> {
    const existing = await this.getByStyle(pilotId, adventureStyle);
    if (!existing) {
      const now = new Date();
      await this.create({ pilotId, adventureStyle, source, createdAt: now, updatedAt: now });
    }
  }

  async saveOnboardingStyles(pilotId: number, styles: PilotAdventureStyle[]): Promise<void> {
    for (const style of styles) {
      await this.upsertStyle(pilotId, style, "onboarding");
    }
  }

  async getAdventureStyles(pilotId: number): Promise<PilotAdventureStyle[]> {
    const all = await this.getAllForPilot(pilotId);
    return all.map(p => p.adventureStyle);
  }
}

export const pilotPreferenceRepository = new PilotPreferenceRepository();
