import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Plus, ArrowLeft, Lock, Mail } from "lucide-react";
import { pilotRepository, futureLetterRepository } from "@/storage/repositories";
import { getRandomPrompts, type WritingPrompt } from "@/modules/futureME/content/writingPrompts";
import { pilotDnaService } from "@/modules/pilotDna/PilotDnaService";
import type { Pilot, FutureLetter } from "@/types";

const COLOR = "#EC4899";

const DELIVERY_OPTIONS = [
  { id: "3m",  label: "3 Months",  months: 3 },
  { id: "6m",  label: "6 Months",  months: 6 },
  { id: "1y",  label: "1 Year",    months: 12 },
];

function addMonths(date: Date, n: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + n);
  return d;
}

function daysUntil(date: Date): number {
  return Math.max(0, Math.ceil((new Date(date).getTime() - Date.now()) / 86400000));
}

export default function FutureMePage(): React.ReactNode {
  const [pilot, setPilot] = useState<Pilot | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"list" | "compose">("list");
  const [pending, setPending] = useState<FutureLetter[]>([]);
  const [delivered, setDelivered] = useState<FutureLetter[]>([]);
  const [prompts, setPrompts] = useState<WritingPrompt[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<WritingPrompt | null>(null);
  const [content, setContent] = useState("");
  const [delivery, setDelivery] = useState("6m");
  const [saving, setSaving] = useState(false);
  const [openLetter, setOpenLetter] = useState<FutureLetter | null>(null);

  const load = useCallback(async () => {
    const p = await pilotRepository.getFirst();
    if (!p?.id) { setLoading(false); return; }
    setPilot(p);
    const [u, d] = await Promise.all([
      futureLetterRepository.getUndelivered(p.id),
      futureLetterRepository.getDelivered(p.id),
    ]);
    const ready = await futureLetterRepository.getReadyToDeliver(p.id);
    for (const r of ready) { if (r.id) await futureLetterRepository.markDelivered(r.id); }
    const [u2, d2] = await Promise.all([
      futureLetterRepository.getUndelivered(p.id),
      futureLetterRepository.getDelivered(p.id),
    ]);
    setPending(u2.length !== u.length ? u2 : u);
    setDelivered(d2.length !== d.length ? d2 : d);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    setPrompts(getRandomPrompts(3));
  }, [load]);

  async function handleSend() {
    if (!pilot?.id || !content.trim()) return;
    setSaving(true);
    try {
      const opt = DELIVERY_OPTIONS.find(o => o.id === delivery) ?? DELIVERY_OPTIONS[1];
      const deliverAt = addMonths(new Date(), opt.months);
      await futureLetterRepository.create({
        pilotId: pilot.id,
        title: "Letter to Future Me",
        content: content.trim(),
        deliverAt,
        delivered: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      void pilotDnaService.recordAspiration(pilot.id, content.trim().slice(0, 200), "future_me");
      void pilotDnaService.recordSignal(
        pilot.id, "future_me", "aspiration", "FutureLetter",
        undefined, selectedPrompt ? [selectedPrompt.category] : [],
      );
      setContent("");
      setSelectedPrompt(null);
      setMode("list");
      await load();
    } finally { setSaving(false); }
  }

  if (loading) return (
    <div className="flex-1 flex items-center justify-center" data-testid="page-future-me">
      <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: COLOR, borderTopColor: "transparent" }} />
    </div>
  );

  if (openLetter) return (
    <div className="flex-1 flex flex-col" data-testid="page-future-me">
      <div className="px-6 pt-8 pb-4" style={{ background: "linear-gradient(160deg, #FCE7F3 0%, #ffffff 60%)" }}>
        <button onClick={() => setOpenLetter(null)} className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5" style={{ color: COLOR }} />
          <h1 className="text-xl font-bold text-foreground">A Letter from the Past</h1>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Written on {new Date(openLetter.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="p-5 rounded-2xl" style={{ background: "#FFF5F9", border: `1px solid ${COLOR}20` }}>
          <p className="text-base text-foreground leading-relaxed whitespace-pre-wrap">{openLetter.content}</p>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4">Dear Future You — From Past You, with love 💌</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col" data-testid="page-future-me">
      <div className="px-6 pt-8 pb-5" style={{ background: "linear-gradient(160deg, #FCE7F3 0%, #ffffff 60%)" }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {mode === "compose" && (
                <button onClick={() => { setMode("list"); setContent(""); setSelectedPrompt(null); }} aria-label="Back">
                  <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                </button>
              )}
              <Star className="w-5 h-5" style={{ color: COLOR }} />
              <h1 className="text-xl font-bold text-foreground">Future Me</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              {mode === "list" ? `${pending.length} sealed · ${delivered.length} delivered` : "Write to your future self"}
            </p>
          </div>
          {mode === "list" && (
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setPrompts(getRandomPrompts(3)); setMode("compose"); }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white font-semibold text-sm shadow-sm"
              style={{ background: COLOR }}>
              <Plus className="w-4 h-4" /> Write
            </motion.button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {mode === "list" ? (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 py-4 space-y-5">
              {pending.length === 0 && delivered.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-4xl mb-3">✉️</p>
                  <p className="font-bold text-foreground text-lg">No letters yet</p>
                  <p className="text-sm text-muted-foreground mt-2 mb-6">Write your first letter to Future You. It will be waiting when the time comes.</p>
                  <motion.button whileTap={{ scale: 0.97 }} onClick={() => { setPrompts(getRandomPrompts(3)); setMode("compose"); }}
                    className="px-6 py-3 rounded-2xl text-white font-bold" style={{ background: COLOR }}>
                    Write My First Letter
                  </motion.button>
                </div>
              )}

              {pending.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Sealed Letters</p>
                  <div className="space-y-3">
                    {pending.map(letter => (
                      <div key={letter.id} className="p-4 rounded-2xl border-2" style={{ borderColor: COLOR + "30", background: "#FFF5F9" }}>
                        <div className="flex items-center gap-2 mb-1">
                          <Lock className="w-4 h-4" style={{ color: COLOR }} />
                          <p className="font-semibold text-foreground text-sm">Letter to Future Me</p>
                        </div>
                        <p className="text-xs text-muted-foreground">Opens in {daysUntil(letter.deliverAt)} days — {new Date(letter.deliverAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {delivered.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Delivered Letters</p>
                  <div className="space-y-3">
                    {delivered.map(letter => (
                      <motion.button key={letter.id} whileTap={{ scale: 0.98 }} onClick={() => setOpenLetter(letter)}
                        className="w-full text-left p-4 rounded-2xl border border-border bg-card">
                        <div className="flex items-center gap-2 mb-1">
                          <Mail className="w-4 h-4" style={{ color: COLOR }} />
                          <p className="font-semibold text-foreground text-sm">Letter from Past You</p>
                        </div>
                        <p className="text-xs text-muted-foreground">Written {new Date(letter.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                        <p className="text-sm text-foreground mt-2 line-clamp-2 opacity-70">{letter.content}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="compose" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="px-6 py-4 space-y-5 pb-8">
              {/* Prompt picker */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Choose a starter (optional)</p>
                <div className="space-y-2">
                  {prompts.map(p => (
                    <button key={p.id} onClick={() => { setSelectedPrompt(p); if (!content) setContent(p.starter ?? ""); }}
                      className="w-full text-left p-3 rounded-xl text-sm transition-all"
                      style={{ background: selectedPrompt?.id === p.id ? "#FCE7F3" : "var(--card)", border: `2px solid ${selectedPrompt?.id === p.id ? COLOR : "var(--border)"}` }}
                      aria-pressed={selectedPrompt?.id === p.id}>
                      <span className="font-medium text-foreground">{p.text}</span>
                      {p.starter && <span className="text-muted-foreground ml-1 text-xs">"{p.starter}"</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <label htmlFor="letter-content" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Your letter</label>
                <textarea id="letter-content" value={content} onChange={e => setContent(e.target.value)}
                  placeholder="Dear Future Me…" rows={7}
                  className="w-full px-4 py-3 text-sm rounded-2xl border-2 border-border bg-background focus:outline-none resize-none leading-relaxed" />
              </div>

              {/* Delivery date */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">When should it arrive?</p>
                <div className="flex gap-2">
                  {DELIVERY_OPTIONS.map(opt => (
                    <button key={opt.id} onClick={() => setDelivery(opt.id)}
                      className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all"
                      style={{ background: delivery === opt.id ? "#FCE7F3" : "var(--card)", border: `2px solid ${delivery === opt.id ? COLOR : "var(--border)"}`, color: delivery === opt.id ? COLOR : "var(--foreground)" }}
                      aria-pressed={delivery === opt.id}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button whileTap={{ scale: 0.97 }} onClick={handleSend} disabled={!content.trim() || saving}
                className="w-full py-4 rounded-2xl text-white font-bold text-lg disabled:opacity-50"
                style={{ background: `linear-gradient(135deg, ${COLOR}, #DB2777)` }}>
                {saving ? "Sealing…" : "Seal & Send 💌"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
