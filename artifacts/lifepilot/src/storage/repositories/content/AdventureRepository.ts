import {
  ADVENTURES,
  ADVENTURE_CATEGORIES,
  getTodaysAdventures,
  getAdventuresByCategory,
  type Adventure,
  type AdventureCategory,
} from "@/modules/adventure/content/adventures";

export class AdventureRepository {
  getAll(): Adventure[] { return ADVENTURES; }
  getCategories(): AdventureCategory[] { return ADVENTURE_CATEGORIES; }
  getByCategory(category: AdventureCategory): Adventure[] { return getAdventuresByCategory(category); }
  getById(id: string): Adventure | undefined { return ADVENTURES.find(a => a.id === id); }
  getTodaysAdventures(count = 3): Adventure[] { return getTodaysAdventures(count); }
  getTodaysAdventure(): Adventure { return getTodaysAdventures(1)[0]; }
}

export const adventureRepository = new AdventureRepository();
