import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Plus, ChevronRight } from "lucide-react";
import { pilotRepository, reflectionRepository } from "@/storage/repositories";
import { reflectionPromptRepository } from "@/storage/repositories/content";
import { pilotDnaService } from "@/modules/pilotDna/PilotDnaService";
import type { Pilot, Reflection, MoodRating } from "@/types";
import type { ReflectionPrompt } from "@/modules/flightLog/content/prompts";

const COLOR = "#8B5CF6";
const MOODS: { id: MoodRating; emoji: string; label: string }[] = [
  { id: "great", emoji: "😄", label: "Great" },
  { id: "good",  emoji: "🙂", label: "Good" },
  { id: "okay",  emoji: "😐", label: "Okay" },
  { id: "bad",   emoji: "😔", label: "Low" },
  { id: "awful", emoji: "😢", label: "Hard" },
];

export default function FlightLogPage(): React.ReactNode {
  const [pilot, setPilot] = useState<Pilot | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"list" | "compose">("list");
  const [recentEntries, setRecentEntries] = useState<Reflection[]>([]);
  const [dailyPrompts, setDailyPrompts] = useState<ReflectionPrompt[]>([]);
  const [selectedMood, setSelectedMood] = useState<MoodRating>("okay");
  const [selectedPrompt, setSelectedPrompt] = useState<ReflectionPrompt | null>(null);
  const [answer, setAnswer] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    const p = await pilotRepository.getFirst();
    if (!p?.id) { setLoading(false); return; }
    setPilot(p);
    const [entries, prompts] = await Promise.all([
      reflectionRepository.getRecent(p.id, 7),
      Promise.resolve(reflectionPromptRepository.getDailyPrompts(3)),
    ]);
    setRecentEntries(entries);
    setDailyPrompts(prompts);
    setSelectedPrompt(prompts[0] ?? null);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleSave() {
    if (!pilot?.id || !answer.trim() || !selectedPrompt) return;
    setSaving(true);
    try {
      const now = new Date();
      await reflectionRepository.create({
        pilotId: pilot.id,
        type: "daily",
        question: selectedPrompt.text,
        answer: answer.trim(),
        createdAt: now,
        updatedAt: now,
      });
      void pilotDnaService.recordSignal(
        pilot.id, "flight_log", "engagement", "Reflection",
        undefined, [selectedPrompt.category, selectedMood],
      );
      setSaved(true);
      setAnswer("");
      setMode("list");
      await load();
      setTimeout(() => setSaved(false), 3000);
    } finally { setSaving(false); }
  }

  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

  if (loading) return (
    <div className="flex-1 flex items-center justify-center" data-testid="page-flight-log">
      <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: COLOR, borderTopColor: "transparent" }} />
    </div>
  );

  return (
    <div className="flex-1 flex flex-col" data-testid="page-flight-log">
      {/* Header */}
      <div className="px-6 pt-8 pb-5" style={{ background: `linear-gradient(160deg, #EDE9FE 0%, #ffffff 60%)` }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-5 h-5" style={{ color: COLOR }} />
              <h1 className="text-xl font-bold text-foreground">Flight Log</h1>
            </div>
            <p className="text-sm text-muted-foreground">{today}</p>
          </div>
          {saved && (
            <motion.span initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "#D1FAE5", color: "#22A06B" }}>
              Saved ✓
            </motion.span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {mode === "list" ? (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6 py-4 space-y-4">
              {/* New entry CTA */}
              <motion.button whileTap={{ scale: 0.98 }} onClick={() => setMode("compose")}
                className="w-full flex items-center justify-between p-5 rounded-2xl text-white shadow-md"
                style={{ background: `linear-gradient(135deg, ${COLOR}, #7C3AED)` }}>
                <div className="text-left">
                  <p className="font-bold text-lg">Today's Reflection</p>
                  <p className="text-sm opacity-80">What's on your mind, Captain?</p>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
              </motion.button>

              {/* Recent entries */}
              {recentEntries.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Recent Entries</p>
                  <div className="space-y-3">
                    {recentEntries.map(entry => (
                      <div key={entry.id} className="p-4 rounded-2xl bg-card border border-border">
                        <p className="text-xs text-muted-foreground mb-1">
                          {new Date(entry.createdAt).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                        </p>
                        <p className="text-sm font-medium text-muted-foreground mb-2 line-clamp-1">{entry.question}</p>
                        <p className="text-sm text-foreground line-clamp-2">{entry.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {recentEntries.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-4xl mb-3">📖</p>
                  <p className="font-semibold text-foreground">Your log is ready for you</p>
                  <p className="text-sm text-muted-foreground mt-1">Tap above to write your first reflection.</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="compose" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="px-6 py-4 space-y-5">
              {/* Mood */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">How are you feeling?</p>
                <div className="flex gap-2 justify-between">
                  {MOODS.map(m => (
                    <button key={m.id} onClick={() => setSelectedMood(m.id)}
                      className="flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl transition-all"
                      style={{ background: selectedMood === m.id ? "#EDE9FE" : "var(--card)", border: `2px solid ${selectedMood === m.id ? COLOR : "var(--border)"}` }}
                      aria-label={m.label} aria-pressed={selectedMood === m.id}>
                      <span className="text-2xl">{m.emoji}</span>
                      <span className="text-xs font-medium" style={{ color: selectedMood === m.id ? COLOR : "var(--muted-foreground)" }}>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt selection */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Choose a prompt</p>
                <div className="space-y-2">
                  {dailyPrompts.map(p => (
                    <button key={p.id} onClick={() => setSelectedPrompt(p)}
                      className="w-full text-left p-4 rounded-2xl transition-all flex items-center justify-between gap-3"
                      style={{ background: selectedPrompt?.id === p.id ? "#EDE9FE" : "var(--card)", border: `2px solid ${selectedPrompt?.id === p.id ? COLOR : "var(--border)"}` }}
                      aria-pressed={selectedPrompt?.id === p.id}>
                      <span className="text-sm font-medium text-foreground">{p.text}</span>
                      {selectedPrompt?.id === p.id && <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: COLOR }} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Answer */}
              <div>
                <label htmlFor="log-answer" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  {selectedPrompt?.text ?? "Your reflection"}
                </label>
                <textarea id="log-answer" value={answer} onChange={e => setAnswer(e.target.value)}
                  placeholder="Write whatever comes to mind…" rows={5}
                  className="w-full px-4 py-3 text-sm rounded-2xl border-2 border-border bg-background focus:outline-none resize-none leading-relaxed"
                  style={{ ["--tw-ring-color" as string]: COLOR }} />
              </div>

              <div className="flex gap-3 pb-8">
                <button onClick={() => { setMode("list"); setAnswer(""); }}
                  className="flex-1 py-3 rounded-2xl border-2 border-border font-semibold text-muted-foreground">
                  Cancel
                </button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleSave} disabled={!answer.trim() || saving}
                  className="flex-2 flex-[2] py-3 rounded-2xl text-white font-bold disabled:opacity-50"
                  style={{ background: COLOR }}>
                  {saving ? "Saving…" : "Save Reflection"}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
