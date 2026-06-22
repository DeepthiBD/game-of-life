import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleDollarSign, ArrowLeft } from "lucide-react";
import { pilotRepository } from "@/storage/repositories";
import { pilotDnaService } from "@/modules/pilotDna/PilotDnaService";
import type { Pilot } from "@/types";

const COLOR = "hsl(48,96%,43%)";

interface MoneyModule {
  id: string;
  emoji: string;
  label: string;
  tagline: string;
  color: string;
  concepts: { title: string; body: string }[];
  challenge: string;
  prompt: string;
}

const MONEY_MODULES: MoneyModule[] = [
  {
    id: "earn",
    emoji: "💪", label: "Earn", tagline: "How money is made",
    color: "#3B9EE8",
    concepts: [
      { title: "Money is a trade", body: "Money comes from trading something valuable — your time, your skills, your ideas, or your work. Everyone earns by offering something others need." },
      { title: "Skills have value", body: "The more useful or rare a skill, the more people are willing to pay for it. Learning new skills is one of the best investments you can make." },
      { title: "Ways young people earn", body: "Helping at home for pocket money, selling handmade crafts, tutoring younger students, creating content, or helping neighbours with tasks." },
      { title: "Multiple streams", body: "Most financially healthy adults have more than one way to earn. A side project, a skill you teach, or something you create can all add up." },
    ],
    challenge: "Name one skill you have that someone else might find useful. Could you ever be paid for it?",
    prompt: "What's one skill I'm building that could be valuable to others?",
  },
  {
    id: "save",
    emoji: "🏦", label: "Save", tagline: "Let your money grow",
    color: "#22A06B",
    concepts: [
      { title: "Pay yourself first", body: "Before spending on anything, set aside a portion of what you receive. Even ₹5 saved regularly adds up to something significant over time." },
      { title: "The 50-30-20 idea", body: "A simple guide: use roughly 50% for needs, 30% for things you enjoy, and 20% for saving. Adjust to what works for your life." },
      { title: "Savings goals work", body: "Saving for something specific — a book, a game, a gift — makes it easier. Name your goal, track your progress, feel the reward." },
      { title: "Time is money's ally", body: "The earlier you start saving, the more time your money has to grow. A small habit now is worth far more than a big decision later." },
    ],
    challenge: "Set a savings goal — any amount, any reason. How long will it take if you save a little each week?",
    prompt: "What's something I'm saving towards right now?",
  },
  {
    id: "spend",
    emoji: "🛍", label: "Spend Wisely", tagline: "Make every rupee count",
    color: "#F97316",
    concepts: [
      { title: "Needs vs Wants", body: "A need is something essential — food, school supplies, health. A want is something enjoyable but not essential. Both matter; it's the balance that counts." },
      { title: "The 24-hour rule", body: "Before buying something you want (but don't need urgently), wait 24 hours. Often the urge fades. If it doesn't, it might genuinely matter to you." },
      { title: "Compare before you buy", body: "The same thing is often available at different prices. Taking a moment to compare can save you real money for something that matters more." },
      { title: "Quality vs Quantity", body: "Sometimes spending a little more on something well-made means it lasts much longer than the cheaper option. Think about cost-per-use." },
    ],
    challenge: "Think of the last thing you bought. Was it a need or a want? Do you still use or enjoy it?",
    prompt: "What's one thing I can wait 24 hours before deciding to buy?",
  },
  {
    id: "give",
    emoji: "🎁", label: "Give", tagline: "Generosity makes money meaningful",
    color: "#EC4899",
    concepts: [
      { title: "Giving is a choice, not a duty", body: "The best giving comes from genuine care, not obligation. Even a small, thoughtful act of generosity has real impact." },
      { title: "You don't need money to give", body: "Time, attention, skill, and kindness are all forms of giving. Sometimes they're more valuable than money." },
      { title: "Giving changes you", body: "Research shows that people who give regularly feel happier and more connected. Generosity builds something inside you, not just outside." },
      { title: "India's giving culture", body: "Daan (donation) and seva (selfless service) are deep parts of Indian culture. They're wisdom worth carrying forward in your own way." },
    ],
    challenge: "Think of one way you could give this week — time, help, or something you no longer need.",
    prompt: "Who in my life could use some support — and what could I offer?",
  },
];

export default function MoneyQuestPage(): React.ReactNode {
  const [pilot, setPilot] = useState<Pilot | null>(null);
  const [selected, setSelected] = useState<MoneyModule | null>(null);
  const [thoughts, setThoughts] = useState<Record<string, string>>({});
  const [savedThoughts, setSavedThoughts] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const p = await pilotRepository.getFirst();
    if (p) setPilot(p);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleModuleOpen(mod: MoneyModule) {
    setSelected(mod);
    if (pilot?.id) {
      await pilotDnaService.recordSignal(
        pilot.id, "money_quest", "browse", "MoneyModule",
        undefined, [mod.id], { problem_solving: 4, learning: 4 },
      );
    }
  }

  async function handleSaveThought(mod: MoneyModule) {
    const text = thoughts[mod.id]?.trim();
    if (!text || !pilot?.id) return;
    setSaving(true);
    try {
      await pilotDnaService.recordAspiration(pilot.id, text, "money_quest");
      await pilotDnaService.recordSignal(
        pilot.id, "money_quest", "engagement", "MoneyReflection",
        undefined, [mod.id], { problem_solving: 6, learning: 5, resilience: 3 },
      );
      setSavedThoughts(prev => new Set([...prev, mod.id]));
    } finally { setSaving(false); }
  }

  return (
    <div className="flex-1 flex flex-col" data-testid="page-money-quest">

      {/* Header */}
      <div className="px-6 pt-8 pb-5" style={{ background: "linear-gradient(160deg, #FFFBEB 0%, #ffffff 60%)" }}>
        <div className="flex items-center gap-2 mb-1">
          {selected && (
            <button onClick={() => setSelected(null)} aria-label="Back">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
          <CircleDollarSign className="w-5 h-5" style={{ color: COLOR }} />
          <h1 className="text-xl font-bold text-foreground">Money Quest</h1>
        </div>
        <p className="text-sm text-muted-foreground pl-7">
          {selected ? selected.tagline : "Master your money universe, Captain"}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {!selected ? (
            /* ── Module grid ── */
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="px-5 py-4 space-y-3">

              <div className="grid grid-cols-2 gap-3">
                {MONEY_MODULES.map((mod, i) => (
                  <motion.button
                    key={mod.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleModuleOpen(mod)}
                    className="flex flex-col items-start gap-2 p-5 rounded-2xl text-left"
                    style={{
                      background: savedThoughts.has(mod.id) ? mod.color + "12" : "var(--card)",
                      border: `2px solid ${savedThoughts.has(mod.id) ? mod.color + "60" : "var(--border)"}`,
                    }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
                      style={{ background: mod.color + "15" }}>
                      {mod.emoji}
                    </div>
                    <p className="font-bold text-foreground text-sm">{mod.label}</p>
                    <p className="text-xs text-muted-foreground leading-tight">{mod.tagline}</p>
                  </motion.button>
                ))}
              </div>

              {/* Insight card */}
              <div className="mt-4 p-4 rounded-2xl" style={{ background: "#FFFBEB", border: `1px solid ${COLOR}40` }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: COLOR }}>Captain's Wisdom</p>
                <p className="text-sm text-foreground leading-relaxed">
                  "Do not save what is left after spending, but spend what is left after saving." — Warren Buffett
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Indian Proverb</p>
                <p className="text-sm text-foreground leading-relaxed italic">
                  "A paisa saved is a paisa earned." — The same wisdom, closer to home.
                </p>
              </div>
            </motion.div>
          ) : (
            /* ── Module detail ── */
            <motion.div key={selected.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="px-5 py-4 space-y-4 pb-8">

              {/* Hero */}
              <div className="p-5 rounded-2xl" style={{ background: selected.color + "12", border: `1px solid ${selected.color}30` }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: selected.color + "20" }}>
                    {selected.emoji}
                  </div>
                  <div>
                    <p className="font-extrabold text-lg text-foreground">{selected.label}</p>
                    <p className="text-sm text-muted-foreground">{selected.tagline}</p>
                  </div>
                </div>
              </div>

              {/* Concepts */}
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">What to know</p>
              <div className="space-y-3">
                {selected.concepts.map((concept, i) => (
                  <motion.div key={concept.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="p-4 rounded-2xl bg-card border border-border">
                    <p className="font-bold text-foreground text-sm mb-1">{concept.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{concept.body}</p>
                  </motion.div>
                ))}
              </div>

              {/* Challenge */}
              <div className="p-4 rounded-2xl" style={{ background: selected.color + "08", border: `2px dashed ${selected.color}50` }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: selected.color }}>
                  🎯 Today's Challenge
                </p>
                <p className="text-sm text-foreground leading-relaxed">{selected.challenge}</p>
              </div>

              {/* Reflection */}
              <div>
                <label htmlFor={`mq-${selected.id}`} className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  {selected.prompt}
                </label>
                <textarea
                  id={`mq-${selected.id}`}
                  value={thoughts[selected.id] ?? ""}
                  onChange={e => setThoughts(prev => ({ ...prev, [selected.id]: e.target.value }))}
                  placeholder="Write your thoughts here…"
                  rows={3}
                  className="w-full px-4 py-3 text-sm rounded-2xl border-2 border-border bg-background focus:outline-none resize-none leading-relaxed"
                />
              </div>

              {savedThoughts.has(selected.id) ? (
                <div className="flex items-center gap-2 p-3 rounded-2xl" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
                  <span className="text-green-600 font-bold text-sm">✓ Reflection saved</span>
                </div>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSaveThought(selected)}
                  disabled={saving || !thoughts[selected.id]?.trim()}
                  className="w-full py-3 rounded-2xl text-white font-bold disabled:opacity-40 text-sm"
                  style={{ background: `linear-gradient(135deg, ${selected.color}, ${selected.color}CC)` }}
                >
                  {saving ? "Saving…" : "Save My Reflection"}
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
