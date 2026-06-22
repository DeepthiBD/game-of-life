// ============================================================
// LIFEPILOT — FUTURE MESSAGE REPOSITORY (Content / Static)
// Serves curated Future You messages. No Dexie — pure static data.
// Tracks read/delivered state separately in IndexedDB if needed.
// ============================================================

import {
  FUTURE_YOU_MESSAGES,
  FUTURE_MESSAGE_CATEGORIES,
  type FutureMessage,
  type FutureMessageCategory,
} from "@/modules/futureYou/content/messages";

export class FutureMessageRepository {
  getAll(): FutureMessage[] {
    return FUTURE_YOU_MESSAGES;
  }

  getByCategory(category: FutureMessageCategory): FutureMessage[] {
    return FUTURE_YOU_MESSAGES.filter(m => m.category === category);
  }

  getById(id: string): FutureMessage | undefined {
    return FUTURE_YOU_MESSAGES.find(m => m.id === id);
  }

  getCategories(): FutureMessageCategory[] {
    return FUTURE_MESSAGE_CATEGORIES;
  }

  /** Deterministic daily message — same day always returns same message. */
  getDailyMessage(): FutureMessage {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const idx = Math.abs(seed * 1664525 + 1013904223) % FUTURE_YOU_MESSAGES.length;
    return FUTURE_YOU_MESSAGES[Math.abs(idx)];
  }

  /** Deterministic daily message scoped to a category. */
  getDailyMessageByCategory(category: FutureMessageCategory): FutureMessage {
    const pool = this.getByCategory(category);
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const idx = Math.abs(seed * 6364136223846793005 + 1442695040888963407) % pool.length;
    return pool[Math.abs(idx) % pool.length];
  }

  /** Returns N messages, spread across categories, no repeats. */
  getCuratedFeed(count: number): FutureMessage[] {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const result: FutureMessage[] = [];
    const used = new Set<string>();
    let s = seed;
    while (result.length < count) {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      const idx = Math.abs(s) % FUTURE_YOU_MESSAGES.length;
      const msg = FUTURE_YOU_MESSAGES[idx];
      if (!used.has(msg.id)) {
        used.add(msg.id);
        result.push(msg);
      }
    }
    return result;
  }
}

export const futureMessageRepository = new FutureMessageRepository();
