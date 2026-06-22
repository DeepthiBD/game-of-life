import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, ArrowLeft, CheckCircle2 } from "lucide-react";
import { pilotRepository } from "@/storage/repositories";
import { pilotDnaService } from "@/modules/pilotDna/PilotDnaService";
import type { Pilot } from "@/types";

const COLOR = "hsl(338,90%,56%)";

interface ValueScenario {
  id: string;
  value: string;
  emoji: string;
  situation: string;
  options: { id: string; text: string; affinityNudge: Record<string, number> }[];
  reflection: string;
}

const SCENARIOS: ValueScenario[] = [
  {
    id: "sc-01", value: "Honesty", emoji: "🔍",
    situation: "Your friend copied your homework and got a better grade. The teacher hasn't noticed. What do you do?",
    options: [
      { id: "a", text: "Tell the teacher — honesty matters more than friendship pressure.", affinityNudge: { courage: 8, responsibility: 6 } },
      { id: "b", text: "Talk to your friend privately and ask them not to do it again.", affinityNudge: { empathy: 8, courage: 5 } },
      { id: "c", text: "Let it go this time — friendships are important too.", affinityNudge: { kindness: 5, empathy: 4 } },
    ],
    reflection: "What does honesty mean to you when it affects someone you care about?",
  },
  {
    id: "sc-02", value: "Courage", emoji: "🦁",
    situation: "You see a younger student being left out by a group. You don't know them, but you can see they're upset. What do you do?",
    options: [
      { id: "a", text: "Walk over and invite them to join you.", affinityNudge: { courage: 10, kindness: 8 } },
      { id: "b", text: "Tell a teacher or trusted adult what you saw.", affinityNudge: { responsibility: 7, courage: 5 } },
      { id: "c", text: "Smile at them — a small gesture of friendliness.", affinityNudge: { kindness: 6, empathy: 5 } },
    ],
    reflection: "Is there a difference between big courage and small courage?",
  },
  {
    id: "sc-03", value: "Kindness", emoji: "💛",
    situation: "A classmate did badly on a test and is visibly sad. You did well. What do you do?",
    options: [
      { id: "a", text: "Offer to study with them before the next test.", affinityNudge: { kindness: 10, leadership: 5 } },
      { id: "b", text: "Say something encouraging — a kind word costs nothing.", affinityNudge: { kindness: 8, empathy: 7 } },
      { id: "c", text: "Give them space — they may not want attention right now.", affinityNudge: { empathy: 8, calm: 5 } },
    ],
    reflection: "How does it feel when someone notices you're struggling?",
  },
  {
    id: "sc-04", value: "Fairness", emoji: "⚖️",
    situation: "Your group gets credit for a project, but one person did most of the work. The teacher doesn't know. What do you do?",
    options: [
      { id: "a", text: "Tell the teacher who contributed the most — fairness matters.", affinityNudge: { courage: 8, responsibility: 8 } },
      { id: "b", text: "Privately thank and acknowledge that person yourself.", affinityNudge: { kindness: 8, empathy: 6 } },
      { id: "c", text: "Make sure they get more credit in the next project.", affinityNudge: { responsibility: 7, leadership: 5 } },
    ],
    reflection: "What's the difference between fairness and equal treatment?",
  },
  {
    id: "sc-05", value: "Responsibility", emoji: "🎯",
    situation: "You forgot to complete a task you promised to do for your family. You have a reason — but is it an excuse? What do you do?",
    options: [
      { id: "a", text: "Own up, apologise, and complete the task now without excuses.", affinityNudge: { responsibility: 10, courage: 6 } },
      { id: "b", text: "Explain what happened honestly and ask for another chance.", affinityNudge: { responsibility: 7, courage: 6, empathy: 4 } },
      { id: "c", text: "Do the task quietly without making a big deal of it.", affinityNudge: { responsibility: 8, calm: 5 } },
    ],
    reflection: "What's the difference between a reason and an excuse?",
  },
  {
    id: "sc-06", value: "Empathy", emoji: "🌊",
    situation: "Your friend is upset about something that seems small to you, but clearly matters to them. How do you respond?",
    options: [
      { id: "a", text: "Listen without trying to fix or minimise — just be present.", affinityNudge: { empathy: 10, kindness: 7 } },
      { id: "b", text: "Gently share a similar experience so they don't feel alone.", affinityNudge: { empathy: 8, expression: 6 } },
      { id: "c", text: "Ask what kind of support they need — to fix it or just listen?", affinityNudge: { empathy: 9, leadership: 5 } },
    ],
    reflection: "Is there a difference between understanding someone and agreeing with them?",
  },
  {
    id: "sc-07", value: "Integrity", emoji: "🌟",
    situation: "You could easily take credit for an idea that was actually your teammate's. No one else would know. What do you do?",
    options: [
      { id: "a", text: "Give credit openly — the right thing doesn't need an audience.", affinityNudge: { responsibility: 10, courage: 7 } },
      { id: "b", text: "Share the idea jointly — say 'we came up with this together'.", affinityNudge: { empathy: 7, responsibility: 7 } },
      { id: "c", text: "Pull your teammate into the conversation so they can share it.", affinityNudge: { kindness: 8, leadership: 7 } },
    ],
    reflection: "Would you behave differently if everyone was watching?",
  },
  {
    id: "sc-08", value: "Resilience", emoji: "🔥",
    situation: "You tried hard at something — a sport, a performance, a competition — and didn't succeed. How do you move forward?",
    options: [
      { id: "a", text: "Reflect on what didn't work and make a plan to improve.", affinityNudge: { resilience: 10, curiosity: 6 } },
      { id: "b", text: "Take a break first — rest is part of recovery.", affinityNudge: { calm: 8, resilience: 6 } },
      { id: "c", text: "Find someone who's succeeded at this and ask for guidance.", affinityNudge: { resilience: 8, learning: 7 } },
    ],
    reflection: "Is failure the opposite of success, or part of the same journey?",
  },
  {
    id: "sc-09", value: "Generosity", emoji: "🎁",
    situation: "You have something someone else needs more than you do. It might cost you — time, money, or effort. What do you do?",
    options: [
      { id: "a", text: "Give it freely — you'll find a way to manage.", affinityNudge: { kindness: 10, resilience: 5 } },
      { id: "b", text: "Offer to share — both of you can benefit.", affinityNudge: { kindness: 8, empathy: 7 } },
      { id: "c", text: "Help them find another way to get what they need.", affinityNudge: { problem_solving: 8, kindness: 6 } },
    ],
    reflection: "What's the difference between generosity and giving more than you have?",
  },
  {
    id: "sc-10", value: "Leadership", emoji: "🧭",
    situation: "Your group is stuck and no one is taking charge. You see a clear path forward. What do you do?",
    options: [
      { id: "a", text: "Step up, share your idea, and invite others to refine it.", affinityNudge: { leadership: 10, courage: 7 } },
      { id: "b", text: "Quietly ask the person with the most experience to lead.", affinityNudge: { empathy: 7, responsibility: 6 } },
      { id: "c", text: "Suggest a quick vote so everyone chooses the direction together.", affinityNudge: { leadership: 7, empathy: 8 } },
    ],
    reflection: "Do you need a title to be a leader?",
  },
];

function getDailyScenarios(): ValueScenario[] {
  const dayIndex = Math.floor(Date.now() / 86_400_000);
  const shuffled = [...SCENARIOS].sort((a, b) => {
    const ia = parseInt(a.id.replace("sc-", ""), 10);
    const ib = parseInt(b.id.replace("sc-", ""), 10);
    return ((ia * 13 + dayIndex) % 17) - ((ib * 13 + dayIndex) % 17);
  });
  return shuffled.slice(0, 3);
}

export default function LifeChoicesPage(): React.ReactNode {
  const [pilot, setPilot] = useState<Pilot | null>(null);
  const [scenarios] = useState<ValueScenario[]>(getDailyScenarios);
  const [current, setCurrent] = useState(0);
  const [chosen, setChosen] = useState<Record<string, string>>({});
  const [thought, setThought] = useState("");
  const [phase, setPhase] = useState<"choose" | "reflect" | "done">("choose");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const p = await pilotRepository.getFirst();
    if (p) setPilot(p);
  }, []);

  useEffect(() => { load(); }, [load]);

  const scenario = scenarios[current];
  const isLastScenario = current === scenarios.length - 1;

  function handleChoice(optionId: string) {
    setChosen(prev => ({ ...prev, [scenario.id]: optionId }));
    setPhase("reflect");
  }

  async function handleReflect() {
    setSaving(true);
    try {
      const option = scenario.options.find(o => o.id === chosen[scenario.id]);
      if (pilot?.id && option) {
        await pilotDnaService.recordSignal(
          pilot.id, "life_choices", "preference", "ValueScenario",
          undefined, [scenario.value.toLowerCase()], option.affinityNudge,
        );
        if (thought.trim()) {
          await pilotDnaService.recordAspiration(pilot.id, thought.trim(), "life_choices");
        }
      }
      if (isLastScenario) {
        setPhase("done");
      } else {
        setCurrent(c => c + 1);
        setThought("");
        setPhase("choose");
      }
    } finally { setSaving(false); }
  }

  const chosenOption = scenario?.options.find(o => o.id === chosen[scenario?.id]);

  if (phase === "done") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center" data-testid="page-life-choices">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}>
          <div className="text-5xl mb-4">⚖️</div>
          <h2 className="text-2xl font-extrabold text-foreground mb-2">Values explored, Captain</h2>
          <p className="text-muted-foreground text-sm max-w-xs mb-6 leading-relaxed">
            Every choice you reflect on helps you understand what matters most to you. Come back tomorrow for more.
          </p>
          <div className="p-4 rounded-2xl text-left" style={{ background: "#FDF2F8", border: `1px solid ${COLOR}30` }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: COLOR }}>Values you explored today</p>
            {scenarios.map(s => (
              <div key={s.id} className="flex items-center gap-2 py-1">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: COLOR }} />
                <span className="text-sm font-medium text-foreground">{s.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col" data-testid="page-life-choices">
      <div className="px-6 pt-8 pb-5" style={{ background: "linear-gradient(160deg, #FDF2F8 0%, #ffffff 60%)" }}>
        <div className="flex items-center gap-2 mb-1">
          {phase === "reflect" && (
            <button onClick={() => setPhase("choose")} aria-label="Back">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
          <Scale className="w-5 h-5" style={{ color: COLOR }} />
          <h1 className="text-xl font-bold text-foreground">Life Choices</h1>
        </div>
        <p className="text-sm text-muted-foreground pl-7">
          {phase === "choose" ? `Scenario ${current + 1} of ${scenarios.length}` : "Reflect on your choice"}
        </p>
        <div className="flex gap-1.5 mt-3 pl-7">
          {scenarios.map((s, i) => (
            <div key={s.id} className="h-1.5 rounded-full transition-all"
              style={{ width: i <= current ? 24 : 8, background: i < current ? COLOR : i === current ? COLOR + "80" : "var(--border)" }} />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {phase === "choose" && (
            <motion.div key={`choose-${current}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="px-6 py-4 space-y-4 pb-8">
              <div className="flex items-center gap-2">
                <span className="text-xl">{scenario.emoji}</span>
                <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: COLOR + "15", color: COLOR }}>
                  {scenario.value}
                </span>
              </div>
              <div className="p-5 rounded-2xl" style={{ background: "#FDF2F8", border: `1px solid ${COLOR}20` }}>
                <p className="font-medium text-foreground leading-relaxed text-sm">{scenario.situation}</p>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">What would you do?</p>
              <div className="space-y-3">
                {scenario.options.map(opt => (
                  <motion.button key={opt.id} whileTap={{ scale: 0.98 }} onClick={() => handleChoice(opt.id)}
                    className="w-full text-left p-4 rounded-2xl text-sm font-medium transition-all"
                    style={{ background: "var(--card)", border: "2px solid var(--border)" }}>
                    {opt.text}
                  </motion.button>
                ))}
              </div>
              <p className="text-xs text-center text-muted-foreground pt-2">There are no wrong answers — only honest ones.</p>
            </motion.div>
          )}

          {phase === "reflect" && (
            <motion.div key={`reflect-${current}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="px-6 py-4 space-y-4 pb-8">
              <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: COLOR + "10", border: `2px solid ${COLOR}40` }}>
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: COLOR }} />
                <p className="text-sm font-semibold text-foreground leading-relaxed">{chosenOption?.text}</p>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Reflect</p>
                <p className="text-sm text-foreground leading-relaxed">{scenario.reflection}</p>
              </div>
              <div>
                <label htmlFor="lc-thought" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Your thoughts (optional)
                </label>
                <textarea id="lc-thought" value={thought} onChange={e => setThought(e.target.value)}
                  placeholder="Write whatever comes to mind…" rows={3}
                  className="w-full px-4 py-3 text-sm rounded-2xl border-2 border-border bg-background focus:outline-none resize-none leading-relaxed" />
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleReflect} disabled={saving}
                className="w-full py-4 rounded-2xl text-white font-bold disabled:opacity-50"
                style={{ background: `linear-gradient(135deg, ${COLOR}, #BE185D)` }}>
                {saving ? "Saving…" : isLastScenario ? "Complete Today's Choices ✓" : "Next Scenario →"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
