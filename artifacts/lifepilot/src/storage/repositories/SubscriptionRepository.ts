// ============================================================
// LIFEPILOT — SUBSCRIPTION & PREMIUM REPOSITORIES
// ============================================================

import { db } from "@/storage/db";
import type { SubscriptionPlan, PilotSubscription } from "@/types";
import { BaseRepository, BasePilotScopedRepository } from "./base/BaseRepository";

export class SubscriptionPlanRepository extends BaseRepository<SubscriptionPlan> {
  protected readonly tableName = "subscriptionPlans";
  protected get table() { return db.subscriptionPlans; }

  async getActive(): Promise<SubscriptionPlan[]> {
    return db.subscriptionPlans.toArray();
  }
}

export class PilotSubscriptionRepository extends BasePilotScopedRepository<PilotSubscription> {
  protected readonly tableName = "pilotSubscriptions";
  protected get table() { return db.pilotSubscriptions; }

  async getActiveForPilot(pilotId: number): Promise<PilotSubscription | undefined> {
    return db.pilotSubscriptions
      .where("pilotId").equals(pilotId)
      .filter(s => s.status === "active")
      .first();
  }

  async isPremium(pilotId: number): Promise<boolean> {
    const active = await this.getActiveForPilot(pilotId);
    return !!active;
  }
}

export const subscriptionPlanRepository = new SubscriptionPlanRepository();
export const pilotSubscriptionRepository = new PilotSubscriptionRepository();
