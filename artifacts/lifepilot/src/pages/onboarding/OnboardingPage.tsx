import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { pilotRepository, goalRepository, futureLetterRepository } from "@/storage/repositories";
import { flightPlanTemplateRepository } from "@/storage/repositories/content";
import { getRandomPrompts } from "@/modules/futureME/content/writingPrompts";
import type { FlightPlanTemplate } from "@/modules/flightPlan/content/templates";

// ── Avatar options ──────────────────────────────────────────────────────────
const AVATARS = [
  { id: "explorer",  emoji: "🧭", label: "Explorer",  color: "#3B9EE8" },
  { id: "inventor",  emoji: "⚙️",  label: "Inventor",  color: "#F59E0B" },
  { id: "dreamer",   emoji: "🌙", label: "Dreamer",   color: "#8B5CF6" },
  { id: "artist",    emoji: "🎨", label: "Artist",    color: "#EC4899" },
  { id: "builder",   emoji: "🔨", label: "Builder",   color: "#22A06B" },
  { id: "athlete",   emoji: "⚡", label: "Athlete",   color: "#EF4444" },
  { id: "reader",    emoji: "📚", label: "Reader",    color: "#6366F1" },
  { id: "creator",   emoji: "✨", label: "Creator",   color: "#F97316" },
];

const PREFERENCES = [
  { id: "confidence",  label: "Confidence",     emoji: "💪" },
  { id: "friendships", label: "Friendships",    emoji: "🤝" },
  { id: "learning",    label: "Learning",       emoji: "📚" },
  { id: "creativity",  label: "Creativity",     emoji: "🎨" },
  { id: "sports",      label: "Sports",         emoji: "⚽" },
  { id: "helping",     label: "Helping Others", emoji: "🌟" },
];

const STEP_COUNT = 6;

export default function OnboardingPage(): React.ReactNode {
  const [, navigate] = useLocation();
  const [checkingPilot, setCheckingPilot] = useState(true);
  const [step, setStep] = useState(0);
  const [pilotId, setPilotId] = useState<number | null>(null);

  // Step 1 — preferences
  const [prefs, setPrefs] = useState<string[]>([]);
  // Step 2 — profile
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("explorer");
  // Step 3 — flight plan
  const [featuredTemplates, setFeaturedTemplates] = useState<FlightPlanTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<FlightPlanTemplate | null>(null);
  // Step 4 — letter
  const [letterPrompts, setLetterPrompts] = useState(getRandomPrompts(1));
  const [letterContent, setLetterContent] = useState("");
  // Step 5 — adventure
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    pilotRepository.getFirst().then(p => {
      if (p) navigate("/cockpit");
      else {
        setFeaturedTemplates(flightPlanTemplateRepository.getFeatured(4));
        setCheckingPilot(false);
      }
    });
  }, [navigate]);

  function togglePref(id: string) {
    setPrefs(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  }

  async function handleFinish() {
    if (!pilotId) return;
    setSaving(true);
    try {
      // Save flight plan if selected
      if (selectedTemplate) {
        await goalRepository.create({
          pilotId,
          title: selectedTemplate.title,
          description: selectedTemplate.description,
          category: selectedTemplate.goalCategory,
          status: "active",
          progress: 0,
          whyItMatters: selectedTemplate.whyItMatters,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      // Save first letter if written
      if (letterContent.trim()) {
        const deliverAt = new Date();
        deliverAt.setMonth(deliverAt.getMonth() + 6);
        await futureLetterRepository.create({
          pilotId,
          title: "My First Letter to Future Me",
          content: letterContent.trim(),
          deliverAt,
          delivered: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      navigate("/cockpit");
    } finally { setSaving(false); }
  }

  async function createProfile() {
    if (!name.trim()) return;
    setSaving(true);
    try {
      const now = new Date();
      const id = await pilotRepository.create({ name: name.trim(), avatarUrl: avatar, isActive: true, createdAt: now, updatedAt: now });
      setPilotId(id);
      setStep(3);
    } finally { setSaving(false); }
  }

  if (checkingPilot) return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ background: "linear-gradient(160deg, #DFF3FF 0%, #F7FBFF 45%, #FFF8F0 100%)" }}>
      <div className="w-8 h-8 border-4 border-[#3B9EE8] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const av = AVATARS.find(a => a.id === avatar) ?? AVATARS[0];

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden" style={{ background: "linear-gradient(160deg, #DFF3FF 0%, #F7FBFF 45%, #FFF8F0 100%)" }}>
      {/* Progress dots */}
      <div className="flex justify-center gap-2 pt-12 pb-4 flex-shrink-0">
        {Array.from({ length: STEP_COUNT }).map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full transition-all duration-300"
            style={{ background: i <= step ? "#3B9EE8" : "#CBD5E1", transform: i === step ? "scale(1.25)" : "scale(1)" }} />
        ))}
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* Step 0: Tara Introduction */}
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}
              className="flex flex-col items-center text-center px-8 py-6 max-w-sm mx-auto">
              <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl mb-6 shadow-lg" style={{ background: "linear-gradient(135deg, #3B9EE8, #7C3AED)" }}>
                🌟
              </div>
              <h2 className="text-3xl font-extrabold mb-3" style={{ color: "#17324D" }}>Hi Captain!</h2>
              <div className="space-y-3 text-base" style={{ color: "#36516B" }}>
                <p className="leading-relaxed">I'm <strong style={{ color: "#3B9EE8" }}>Tara</strong>. Your companion on this journey.</p>
                <p className="leading-relaxed">This is <strong style={{ color: "#17324D" }}>your</strong> adventure.</p>
                <p className="leading-relaxed">There are no right answers.</p>
                <p className="leading-relaxed font-semibold" style={{ color: "#3B9EE8" }}>Only possibilities.</p>
              </div>
              <div className="mt-8 p-4 rounded-2xl text-sm italic" style={{ background: "rgba(255,255,255,0.7)", color: "#5F7D95" }}>
                "I remember standing where you are. Every small step you take today shapes who I became."
              </div>
            </motion.div>
          )}

          {/* Step 1: Preferences */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              className="px-6 py-4 max-w-sm mx-auto">
              <h2 className="text-2xl font-extrabold text-center mb-2" style={{ color: "#17324D" }}>What would you like to grow in?</h2>
              <p className="text-center text-sm text-muted-foreground mb-6">Choose as many as you like</p>
              <div className="grid grid-cols-2 gap-3">
                {PREFERENCES.map(p => {
                  const active = prefs.includes(p.id);
                  return (
                    <motion.button key={p.id} whileTap={{ scale: 0.93 }} onClick={() => togglePref(p.id)}
                      className="flex items-center gap-3 p-4 rounded-2xl font-semibold text-sm transition-all"
                      style={{ background: active ? "#EBF5FD" : "rgba(255,255,255,0.8)", border: `2px solid ${active ? "#3B9EE8" : "rgba(255,255,255,0.5)"}`, color: active ? "#3B9EE8" : "#36516B" }}
                      aria-pressed={active}>
                      <span className="text-2xl">{p.emoji}</span>{p.label}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2: Profile creation */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              className="px-6 py-4 max-w-sm mx-auto space-y-5">
              <div className="text-center">
                <h2 className="text-2xl font-extrabold mb-1" style={{ color: "#17324D" }}>Create Your Captain Profile</h2>
                <p className="text-sm text-muted-foreground">Choose who you are</p>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {AVATARS.map(a => (
                  <motion.button key={a.id} whileTap={{ scale: 0.9 }} onClick={() => setAvatar(a.id)}
                    className="flex flex-col items-center gap-1 p-2 rounded-2xl transition-all"
                    style={{ background: avatar === a.id ? a.color + "15" : "rgba(255,255,255,0.7)", border: `2px solid ${avatar === a.id ? a.color : "transparent"}` }}
                    aria-label={a.label} aria-pressed={avatar === a.id}>
                    <span className="text-3xl">{a.emoji}</span>
                    <span className="text-xs font-semibold" style={{ color: a.color }}>{a.label}</span>
                  </motion.button>
                ))}
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: av.color + "15", border: `1px solid ${av.color}30` }}>
                <span className="text-3xl">{av.emoji}</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: av.color }}>Captain</p>
                  <p className="font-bold text-foreground">{name || "Your Name"}</p>
                </div>
              </div>
              <div>
                <label htmlFor="ob-name" className="block text-sm font-semibold text-foreground mb-2">What's your name?</label>
                <input id="ob-name" type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="Enter your name" maxLength={30}
                  className="w-full px-4 py-3 text-lg font-medium rounded-2xl border-2 bg-white/80 border-border focus:outline-none focus:border-[#3B9EE8] transition-colors" />
              </div>
            </motion.div>
          )}

          {/* Step 3: First Flight Plan */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              className="px-6 py-4 max-w-sm mx-auto space-y-4">
              <div className="text-center">
                <h2 className="text-2xl font-extrabold mb-1" style={{ color: "#17324D" }}>Your First Flight Plan</h2>
                <p className="text-sm text-muted-foreground">Pick something to grow. You can always change it.</p>
              </div>
              <div className="space-y-3">
                {featuredTemplates.map(t => (
                  <motion.button key={t.id} whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTemplate(prev => prev?.id === t.id ? null : t)}
                    className="w-full text-left p-4 rounded-2xl transition-all"
                    style={{ background: selectedTemplate?.id === t.id ? "#FEF3C7" : "rgba(255,255,255,0.8)", border: `2px solid ${selectedTemplate?.id === t.id ? "#F59E0B" : "rgba(255,255,255,0.5)"}` }}
                    aria-pressed={selectedTemplate?.id === t.id}>
                    <p className="font-bold text-foreground">{t.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{t.description}</p>
                  </motion.button>
                ))}
                <button onClick={() => setStep(4)} className="w-full py-3 text-sm font-medium text-muted-foreground">
                  Skip for now →
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: First Future Me Letter */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              className="px-6 py-4 max-w-sm mx-auto space-y-4">
              <div className="text-center">
                <h2 className="text-2xl font-extrabold mb-1" style={{ color: "#17324D" }}>Write to Future You</h2>
                <p className="text-sm text-muted-foreground">{letterPrompts[0]?.text}</p>
              </div>
              <textarea value={letterContent} onChange={e => setLetterContent(e.target.value)}
                placeholder={letterPrompts[0]?.starter ?? "Dear Future Me…"} rows={6}
                className="w-full px-4 py-3 text-sm rounded-2xl border-2 border-border bg-white/80 focus:outline-none resize-none leading-relaxed" />
              <button onClick={() => setStep(5)} className="w-full py-3 text-sm font-medium text-muted-foreground">
                Skip for now →
              </button>
            </motion.div>
          )}

          {/* Step 5: First Adventure */}
          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              className="flex flex-col items-center text-center px-8 py-6 max-w-sm mx-auto">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-4 shadow-lg" style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}>
                🎯
              </div>
              <h2 className="text-2xl font-extrabold mb-2" style={{ color: "#17324D" }}>Your First Adventure</h2>
              <div className="p-5 rounded-2xl mb-4 w-full" style={{ background: "#FEF3C7", border: "1px solid #F59E0B30" }}>
                <p className="font-bold text-foreground text-lg mb-2">Find one thing today that makes you curious.</p>
                <p className="text-sm text-muted-foreground leading-relaxed">It could be anything — a question, an object, an idea, a person. Just notice it.</p>
              </div>
              <p className="text-sm text-muted-foreground">You're ready, Captain. Your journey begins now.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-6 pb-10 pt-4 flex-shrink-0">
        <div className="max-w-sm mx-auto">
          {step < STEP_COUNT - 1 ? (
            <motion.button whileTap={{ scale: 0.97 }}
              onClick={async () => {
                if (step === 2) { await createProfile(); }
                else setStep(s => s + 1);
              }}
              disabled={(step === 2 && !name.trim()) || saving}
              className="w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #3B9EE8, #2B7DC0)" }}>
              {saving ? "Saving…" : step === 0 ? "Let's Go! →" : step === 1 ? "Next →" : step === 2 ? "Create My Profile →" : step === 3 ? (selectedTemplate ? "Launch This Plan →" : "Next →") : "Next →"}
            </motion.button>
          ) : (
            <motion.button whileTap={{ scale: 0.97 }} onClick={handleFinish} disabled={saving}
              className="w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #3B9EE8, #2B7DC0)" }}>
              {saving ? "Starting your journey…" : "Begin My Journey 🚀"}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
