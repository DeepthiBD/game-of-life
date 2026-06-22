import {
  REFLECTION_PROMPTS,
  REFLECTION_PROMPT_CATEGORIES,
  type ReflectionPrompt,
  type ReflectionPromptCategory,
} from "@/modules/flightLog/content/prompts";

export class ReflectionPromptRepository {
  getAll(): ReflectionPrompt[] { return REFLECTION_PROMPTS; }
  getCategories(): ReflectionPromptCategory[] { return REFLECTION_PROMPT_CATEGORIES; }
  getByCategory(category: ReflectionPromptCategory): ReflectionPrompt[] {
    return REFLECTION_PROMPTS.filter(p => p.category === category);
  }
  getById(id: string): ReflectionPrompt | undefined {
    return REFLECTION_PROMPTS.find(p => p.id === id);
  }
  getRandomPrompts(count = 3): ReflectionPrompt[] {
    const shuffled = [...REFLECTION_PROMPTS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
  getDailyPrompts(count = 3): ReflectionPrompt[] {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const indices: number[] = [];
    let s = seed;
    while (indices.length < count) {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      const idx = Math.abs(s) % REFLECTION_PROMPTS.length;
      if (!indices.includes(idx)) indices.push(idx);
    }
    return indices.map(i => REFLECTION_PROMPTS[i]);
  }
}

export const reflectionPromptRepository = new ReflectionPromptRepository();
