import { db } from "@/storage/db";
import type { Pilot } from "@/types";
import { BaseRepository } from "./base/BaseRepository";

export class PilotRepository extends BaseRepository<Pilot> {
  protected readonly tableName = "pilots";
  protected get table() { return db.pilots; }

  async getActive(): Promise<Pilot[]> {
    return db.pilots.where("isActive").equals(1).toArray();
  }

  async getByName(name: string): Promise<Pilot | undefined> {
    return db.pilots.where("name").equalsIgnoreCase(name).first();
  }

  async getFirst(): Promise<Pilot | undefined> {
    return db.pilots.orderBy("id").first();
  }
}

export const pilotRepository = new PilotRepository();
