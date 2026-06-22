import { db } from "@/storage/db";
import type { Career, CareerExploration, CareerRoadmap, CareerRoadmapStep, CareerCategory } from "@/types";
import { BaseRepository, BasePilotScopedRepository } from "./base/BaseRepository";

export class CareerRepository extends BaseRepository<Career> {
  protected readonly tableName = "careers";
  protected get table() { return db.careers; }

  async getByCategory(category: CareerCategory): Promise<Career[]> {
    return db.careers.where("category").equals(category).toArray();
  }

  async searchByTitle(query: string): Promise<Career[]> {
    const lower = query.toLowerCase();
    return db.careers.filter(c =>
      c.title.toLowerCase().includes(lower) ||
      c.description.toLowerCase().includes(lower)
    ).toArray();
  }

  async getOfflineAvailable(): Promise<Career[]> {
    return db.careers.filter(c => c.isOfflineAvailable).toArray();
  }
}

export class CareerExplorationRepository extends BasePilotScopedRepository<CareerExploration> {
  protected readonly tableName = "careerExplorations";
  protected get table() { return db.careerExplorations; }

  async getForCareer(pilotId: number, careerId: number): Promise<CareerExploration | undefined> {
    return db.careerExplorations.where("pilotId").equals(pilotId)
      .filter(e => e.careerId === careerId).first();
  }

  async getRecent(pilotId: number, limit = 10): Promise<CareerExploration[]> {
    const all = await db.careerExplorations.where("pilotId").equals(pilotId).toArray();
    return all
      .sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime())
      .slice(0, limit);
  }
}

export class CareerRoadmapRepository extends BaseRepository<CareerRoadmap> {
  protected readonly tableName = "careerRoadmaps";
  protected get table() { return db.careerRoadmaps; }

  async getForCareer(careerId: number): Promise<CareerRoadmap | undefined> {
    return db.careerRoadmaps.where("careerId").equals(careerId).first();
  }

  async getSteps(roadmapId: number): Promise<CareerRoadmapStep[]> {
    return db.careerRoadmapSteps.where("roadmapId").equals(roadmapId).sortBy("order");
  }
}

export const careerRepository = new CareerRepository();
export const careerExplorationRepository = new CareerExplorationRepository();
export const careerRoadmapRepository = new CareerRoadmapRepository();
