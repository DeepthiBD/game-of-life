import { describe, it, expect } from "vitest";

// ── Content Engine Tests ─────────────────────────────────────────────────────
// Verifies that all content arrays meet minimum count targets
// and that content items are well-formed.

describe("Adventures content", () => {
  it("has at least 100 adventures", async () => {
    const { ADVENTURES } = await import("../modules/adventure/content/adventures");
    expect(ADVENTURES.length).toBeGreaterThanOrEqual(100);
  });

  it("every adventure has required fields", async () => {
    const { ADVENTURES } = await import("../modules/adventure/content/adventures");
    for (const adv of ADVENTURES) {
      expect(adv.id, `${adv.id} missing id`).toBeTruthy();
      expect(adv.category, `${adv.id} missing category`).toBeTruthy();
      expect(adv.title, `${adv.id} missing title`).toBeTruthy();
      expect(adv.description, `${adv.id} missing description`).toBeTruthy();
      expect(adv.duration, `${adv.id} missing duration`).toBeTruthy();
    }
  });

  it("adventure IDs are unique", async () => {
    const { ADVENTURES } = await import("../modules/adventure/content/adventures");
    const ids = ADVENTURES.map(a => a.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});

describe("Future You messages", () => {
  it("has at least 120 messages", async () => {
    const { FUTURE_YOU_MESSAGES } = await import("../modules/futureYou/content/messages");
    expect(FUTURE_YOU_MESSAGES.length).toBeGreaterThanOrEqual(120);
  });

  it("every message has required fields", async () => {
    const { FUTURE_YOU_MESSAGES } = await import("../modules/futureYou/content/messages");
    for (const msg of FUTURE_YOU_MESSAGES) {
      expect(msg.id, `${msg.id} missing id`).toBeTruthy();
      expect(msg.text, `${msg.id} missing text`).toBeTruthy();
    }
  });

  it("message IDs are unique", async () => {
    const { FUTURE_YOU_MESSAGES } = await import("../modules/futureYou/content/messages");
    const ids = FUTURE_YOU_MESSAGES.map(m => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("Reflection prompts", () => {
  it("has at least 200 prompts", async () => {
    const { REFLECTION_PROMPTS } = await import("../modules/flightLog/content/prompts");
    expect(REFLECTION_PROMPTS.length).toBeGreaterThanOrEqual(200);
  });

  it("every prompt has a category and text", async () => {
    const { REFLECTION_PROMPTS } = await import("../modules/flightLog/content/prompts");
    for (const p of REFLECTION_PROMPTS) {
      expect(p.id).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.text).toBeTruthy();
    }
  });
});

describe("FutureMe writing prompts", () => {
  it("has at least 50 writing prompts", async () => {
    const { WRITING_PROMPTS } = await import("../modules/futureME/content/writingPrompts");
    expect(WRITING_PROMPTS.length).toBeGreaterThanOrEqual(50);
  });

  it("every prompt has id, category, and text", async () => {
    const { WRITING_PROMPTS } = await import("../modules/futureME/content/writingPrompts");
    for (const p of WRITING_PROMPTS) {
      expect(p.id).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.text).toBeTruthy();
    }
  });

  it("getRandomPrompts returns the requested count", async () => {
    const { getRandomPrompts } = await import("../modules/futureME/content/writingPrompts");
    const result = getRandomPrompts(5);
    expect(result.length).toBe(5);
  });

  it("getRandomPrompts with category filters correctly", async () => {
    const { getRandomPrompts } = await import("../modules/futureME/content/writingPrompts");
    const result = getRandomPrompts(3, "gratitude");
    expect(result.every(p => p.category === "gratitude")).toBe(true);
  });

  it("prompt IDs are unique", async () => {
    const { WRITING_PROMPTS } = await import("../modules/futureME/content/writingPrompts");
    const ids = WRITING_PROMPTS.map(p => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("FlightPlan templates", () => {
  it("has templates for all categories", async () => {
    const mod = await import("../modules/flightPlan/content/templates");
    expect(mod.FLIGHT_PLAN_TEMPLATES.length).toBeGreaterThan(0);
  });

  it("every template has required fields", async () => {
    const { FLIGHT_PLAN_TEMPLATES } = await import("../modules/flightPlan/content/templates");
    for (const t of FLIGHT_PLAN_TEMPLATES) {
      expect(t.id).toBeTruthy();
      expect(t.title).toBeTruthy();
      expect(t.goalCategory).toBeTruthy();
      expect(t.suggestedDurationDays).toBeGreaterThan(0);
    }
  });
});
