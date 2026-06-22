import { db } from "@/storage/db";
import type { ContentItem, LearningPath, LearningPathStep, SupportedLanguage, ContentCategory } from "@/types";
import { BaseRepository } from "./base/BaseRepository";

export class ContentRepository extends BaseRepository<ContentItem> {
  protected readonly tableName = "contentItems";
  protected get table() { return db.contentItems; }

  async getByCategory(category: ContentCategory): Promise<ContentItem[]> {
    return db.contentItems.where("category").equals(category).toArray();
  }

  async getByDifficulty(difficulty: string): Promise<ContentItem[]> {
    return db.contentItems.where("difficulty").equals(difficulty).toArray();
  }

  async getByLanguage(language: SupportedLanguage): Promise<ContentItem[]> {
    return db.contentItems.where("language").equals(language).toArray();
  }

  async getByStatus(status: string): Promise<ContentItem[]> {
    return db.contentItems.where("status").equals(status).toArray();
  }

  async searchByTitle(query: string): Promise<ContentItem[]> {
    const lower = query.toLowerCase();
    return db.contentItems.filter(c =>
      c.title.toLowerCase().includes(lower) ||
      (c.description ?? "").toLowerCase().includes(lower)
    ).toArray();
  }
}

export class LearningPathRepository extends BaseRepository<LearningPath> {
  protected readonly tableName = "learningPaths";
  protected get table() { return db.learningPaths; }

  async getByCategory(category: ContentCategory): Promise<LearningPath[]> {
    return db.learningPaths.where("category").equals(category).toArray();
  }

  async getByDifficulty(difficulty: string): Promise<LearningPath[]> {
    return db.learningPaths.where("difficulty").equals(difficulty).toArray();
  }

  async getSteps(learningPathId: number): Promise<LearningPathStep[]> {
    return db.learningPathSteps.where("learningPathId").equals(learningPathId)
      .sortBy("sequenceNumber");
  }
}

export const contentRepository = new ContentRepository();
export const learningPathRepository = new LearningPathRepository();
