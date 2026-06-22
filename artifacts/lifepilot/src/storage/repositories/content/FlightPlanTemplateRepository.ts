import {
  FLIGHT_PLAN_TEMPLATES,
  FLIGHT_PLAN_TEMPLATE_CATEGORIES,
  getTemplatesByCategory,
  type FlightPlanTemplate,
  type FlightPlanTemplateCategory,
} from "@/modules/flightPlan/content/templates";

export class FlightPlanTemplateRepository {
  getAll(): FlightPlanTemplate[] { return FLIGHT_PLAN_TEMPLATES; }
  getCategories(): FlightPlanTemplateCategory[] { return FLIGHT_PLAN_TEMPLATE_CATEGORIES; }
  getByCategory(category: FlightPlanTemplateCategory): FlightPlanTemplate[] {
    return getTemplatesByCategory(category);
  }
  getById(id: string): FlightPlanTemplate | undefined {
    return FLIGHT_PLAN_TEMPLATES.find(t => t.id === id);
  }
  getFeatured(count = 3): FlightPlanTemplate[] {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const indices: number[] = [];
    let s = seed;
    while (indices.length < count) {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      const idx = Math.abs(s) % FLIGHT_PLAN_TEMPLATES.length;
      if (!indices.includes(idx)) indices.push(idx);
    }
    return indices.map(i => FLIGHT_PLAN_TEMPLATES[i]);
  }
}

export const flightPlanTemplateRepository = new FlightPlanTemplateRepository();
