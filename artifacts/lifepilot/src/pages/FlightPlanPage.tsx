import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Plus, CheckCircle2, ArrowLeft, ChevronRight } from "lucide-react";
import { pilotRepository, goalRepository } from "@/storage/repositories";
import { flightPlanTemplateRepository } from "@/storage/repositories/content";
import { pilotDnaService } from "@/modules/pilotDna/PilotDnaService";
import type { Pilot, FlightPlanGoal } from "@/types";
import type { FlightPlanTemplate, FlightPlanTemplateCategory } from "@/modules/flightPlan/content/templates";

const COLOR = "#F59E0B";

const CATEGORIES: { id: FlightPlanTemplateCategory; emoji: string; label: string; color: string }[] = [
  { id: "confidence",     emoji: "💪", label: "Confidence",     color: "#3B9EE8" },
  { id: "learning",       emoji: "📚", label: "Learning",       color: "#6366F1" },
  { id: "creativity",     emoji: "🎨", label: "Creativity",     color: "#EC4899" },
  { id: "health",         emoji: "🌱", label: "Health",         color: "#22A06B" },
  { id: "friendships",    emoji: "🤝", label: "Friendships",    color: "#F59E0B" },
  { id: "leadership",     emoji: "⭐", label: "Leadership",     color: "#F97316" },
  { id: "responsibility", emoji: "🎯", label: "Responsibility", color: "#8B5CF6" },
];

type Step = "list" | "categories" | "templates" | "confirm";

export default function FlightPlanPage(): React.ReactNode {
  const [pilot, setPilot] = useState<Pilot | null>(null);
  const [loading, setLoading] = useState(true);
  const [goals, setGoals] = useState<FlightPlanGoal[]>([]);
  const [step, setStep] = useState<Step>("list");
  const [selectedCat, setSelectedCat] = useState<FlightPlanTemplateCategory | null>(null);
  const [templates, setTemplates] = useState<FlightPlanTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<FlightPlanTemplate | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const p = await pilotRepository.getFirst();
    if (!p?.id) { setLoading(false); return; }
    setPilot(p);
    const active = await goalRepository.getActiveForPilot(p.id);
    setGoals(active);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function handleCategorySelect(cat: FlightPlanTemplateCategory) {
    setSelectedCat(cat);
    setTemplates(flightPlanTemplateRepository.getByCategory(cat));
    setStep("templates");
    if (pilot?.id) {
      void pilotDnaService.recordSignal(
        pilot.id, "flight_plan", "browse", "GoalCategory", undefined, [cat],
      );
    }
  }

  async function handleCreate() {
    if (!pilot?.id || !selectedTemplate) return;
    setSaving(true);
    try {
      const now = new Date();
      await goalRepository.create({
        pilotId: pilot.id,
        title: selectedTemplate.title,
        description: selectedTemplate.description,
        category: selectedTemplate.goalCategory,
        status: "active",
        progress: 0,
        whyItMatters: selectedTemplate.whyItMatters,
        createdAt: now,
        updatedAt: now,
      });
      void pilotDnaService.recordSignal(
        pilot.id, "flight_plan", "growth", "Goal",
        undefined, [selectedTemplate.goalCategory],
        { [selectedTemplate.goalCategory]: 8, responsibility: 4 },
      );
      await load();
      setStep("list");
      setSelectedCat(null);
      setSelectedTemplate(null);
    } finally { setSaving(false); }
  }

  const catInfo = (cat: string) => CATEGORIES.find(c => c.id === cat) ?? CATEGORIES[0];

  if (loading) return (
    <div className="flex-1 flex items-center justify-center" data-testid="page-flight-plan">
      <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: COLOR, borderTopColor: "transparent" }} />
    </div>
  );

  return (
    <div className="flex-1 flex flex-col" data-testid="page-flight-plan">
      <div className="px-6 pt-8 pb-5" style={{ background: "linear-gradient(160deg, #FEF3C7 0%, #ffffff 60%)" }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {(step !== "list") && (
                <button onClick={() => { if (step === "confirm") setStep("templates"); else if (step === "templates") setStep("categories"); else setStep("list"); }} aria-label="Back">
                  <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                </button>
              )}
              <Map className="w-5 h-5" style={{ color: COLOR }} />
              <h1 className="text-xl font-bold text-foreground">Flight Plan</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              {step === "list" && `${goals.length} active plan${goals.length !== 1 ? "s" : ""}`}
              {step === "categories" && "Choose a category"}
              {step === "templates" && "Pick a plan"}
              {step === "confirm" && "Ready to launch?"}
            </p>
          </div>
          {step === "list" && (
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => setStep("categories")}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white font-semibold text-sm shadow-sm"
              style={{ background: COLOR }}>
              <Plus className="w-4 h-4" /> New Plan
            </motion.button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === "list" && (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 py-4 space-y-4">
              {goals.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-4xl mb-3">🗺️</p>
                  <p className="font-bold text-foreground text-lg">No active plans yet</p>
                  <p className="text-sm text-muted-foreground mt-2 mb-6">Launch your first flight plan and start building the captain you want to be.</p>
                  <motion.button whileTap={{ scale: 0.97 }} onClick={() => setStep("categories")}
                    className="px-6 py-3 rounded-2xl text-white font-bold" style={{ background: COLOR }}>
                    Launch My First Plan
                  </motion.button>
                </div>
              ) : (
                goals.map(goal => {
                  const ci = catInfo(goal.category);
                  return (
                    <div key={goal.id} className="p-5 rounded-2xl bg-card border border-border">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: ci.color + "15" }}>
                          {ci.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-foreground">{goal.title}</p>
                          <p className="text-xs font-medium mt-0.5" style={{ color: ci.color }}>{ci.label}</p>
                          {goal.whyItMatters && <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">{goal.whyItMatters}</p>}
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span>Progress</span><span>{goal.progress}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all" style={{ width: `${goal.progress}%`, background: ci.color }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </motion.div>
          )}

          {step === "categories" && (
            <motion.div key="cats" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="px-6 py-4">
              <div className="grid grid-cols-2 gap-3">
                {CATEGORIES.map(cat => (
                  <motion.button key={cat.id} whileTap={{ scale: 0.96 }} onClick={() => handleCategorySelect(cat.id)}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border text-left"
                    style={{ borderColor: cat.color + "40" }}>
                    <span className="text-2xl">{cat.emoji}</span>
                    <span className="font-semibold text-foreground text-sm">{cat.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "templates" && (
            <motion.div key="tmpl" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="px-6 py-4 space-y-3">
              {templates.map(t => (
                <motion.button key={t.id} whileTap={{ scale: 0.98 }}
                  onClick={() => { setSelectedTemplate(t); setStep("confirm"); }}
                  className="w-full text-left p-4 rounded-2xl bg-card border-2 border-border flex items-center gap-3 transition-all hover:border-[#F59E0B]/40">
                  <div className="flex-1">
                    <p className="font-bold text-foreground">{t.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{t.description}</p>
                    <p className="text-xs font-medium mt-2" style={{ color: COLOR }}>{t.suggestedDurationDays} days</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </motion.button>
              ))}
            </motion.div>
          )}

          {step === "confirm" && selectedTemplate && (
            <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="px-6 py-4 space-y-4 pb-8">
              <div className="p-5 rounded-2xl" style={{ background: "#FEF3C7" }}>
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-5 h-5" style={{ color: COLOR }} />
                  <p className="font-bold text-foreground">{selectedTemplate.title}</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedTemplate.description}</p>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Why it matters</p>
                <p className="text-sm text-foreground leading-relaxed">{selectedTemplate.whyItMatters}</p>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Duration</p>
                <p className="font-semibold text-foreground">{selectedTemplate.suggestedDurationDays} days</p>
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleCreate} disabled={saving}
                className="w-full py-4 rounded-2xl text-white font-bold text-lg disabled:opacity-50"
                style={{ background: `linear-gradient(135deg, ${COLOR}, #D97706)` }}>
                {saving ? "Launching…" : "Launch This Plan 🚀"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
