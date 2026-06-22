import { FUTURE_YOU } from "../shared/constants/companions";

const FUTURE_YOU_MESSAGES = [
  {
    id: "1",
    message: "I remember standing where you are. Every small step you take today shapes who I became.",
    mood: "hopeful",
    day: "Today",
  },
  {
    id: "2",
    message: "What small step can we take today? Even the tiniest action moves us forward.",
    mood: "encouraging",
    day: "Yesterday",
  },
  {
    id: "3",
    message: "What would make tomorrow easier? I learned that rest is part of the journey too.",
    mood: "gentle",
    day: "This week",
  },
];

const MOOD_COLORS: Record<string, { bg: string; border: string; dot: string }> = {
  hopeful:     { bg: "linear-gradient(135deg, #FFF0F8 0%, #FFE8F5 100%)", border: "#EC489920", dot: "#EC4899" },
  encouraging: { bg: "linear-gradient(135deg, #F0F8FF 0%, #E8F4FF 100%)", border: "#3B9EE820", dot: "#3B9EE8" },
  gentle:      { bg: "linear-gradient(135deg, #F0FBF6 0%, #E6F7F0 100%)", border: "#22A06B20", dot: "#22A06B" },
};

export default function FutureYouPage() {
  return (
    <div data-testid="page-future-you" className="pb-8">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden px-5 pt-8 pb-10 md:px-8"
        style={{ background: "linear-gradient(160deg, #FFE8F5 0%, #FFF0F8 50%, #F7FBFF 100%)" }}
      >
        {/* Atmospheric glow layers */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-40"
            style={{ background: "radial-gradient(circle, #FCE7F3 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full opacity-25"
            style={{ background: "radial-gradient(circle, #DFF3FF 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 text-center">
          {/* Companion avatar */}
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg"
            style={{ background: "linear-gradient(135deg, #EC4899, #BE185D)" }}
            aria-label="Future You companion"
          >
            {FUTURE_YOU.emoji}
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ color: "#17324D" }}>
            {FUTURE_YOU.name}
          </h1>
          <p className="text-sm font-medium max-w-xs mx-auto leading-relaxed" style={{ color: "#5F7D95" }}>
            {FUTURE_YOU.role}
          </p>

          {/* Companion purpose chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {FUTURE_YOU.purpose.slice(0, 3).map((p) => (
              <span
                key={p}
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: "rgba(236,72,153,0.12)", color: "#BE185D" }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── MESSAGES FROM FUTURE YOU ─────────────────────────── */}
      <div className="px-5 md:px-8 mt-6">
        <h2 className="text-base font-extrabold mb-4" style={{ color: "#17324D" }}>
          Messages for you ✨
        </h2>

        <div className="flex flex-col gap-4">
          {FUTURE_YOU_MESSAGES.map((msg) => {
            const colors = MOOD_COLORS[msg.mood] ?? MOOD_COLORS.hopeful;
            return (
              <div
                key={msg.id}
                className="relative overflow-hidden rounded-2xl p-5 shadow-sm"
                style={{
                  background: colors.bg,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: colors.dot }}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.dot }}>
                    {FUTURE_YOU.name} · {msg.day}
                  </span>
                </div>
                <p
                  className="text-base font-medium leading-relaxed"
                  style={{ color: "#17324D" }}
                >
                  "{msg.message}"
                </p>

                {/* Atmospheric corner glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-5 -right-5 w-16 h-16 rounded-full opacity-15"
                  style={{ background: colors.dot }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── WHAT FUTURE YOU NEVER DOES ───────────────────────── */}
      <div className="px-5 md:px-8 mt-8">
        <div
          className="rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg, #F7FBFF 0%, #EFF6FF 100%)",
            border: "1px solid rgba(59,158,232,0.15)",
          }}
        >
          <p className="text-sm font-bold mb-2" style={{ color: "#17324D" }}>
            A note from Future You
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#36516B" }}>
            I am not here to judge or predict. I am here to remind you that the person you are becoming is already inside you. One day at a time, Captain. 🌟
          </p>
        </div>
      </div>

    </div>
  );
}
