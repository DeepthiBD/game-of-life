import { Link } from "wouter";

export default function LaunchPage() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #DFF3FF 0%, #F7FBFF 45%, #FFF8F0 100%)",
      }}
      data-testid="page-launch"
    >
      {/* Atmospheric sky layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, #BEE3F8 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-10 right-0 w-80 h-80 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #DFF3FF 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-20 left-1/4 w-72 h-72 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #FFF8F0 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-16 right-1/3 w-64 h-64 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #FFE8F5 0%, transparent 70%)" }}
        />

        {/* Horizon line */}
        <div
          className="absolute bottom-1/3 left-0 right-0 h-px opacity-20"
          style={{ background: "linear-gradient(90deg, transparent, #3B9EE8, transparent)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-sm w-full">

        {/* Logo mark */}
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-xl"
          style={{ background: "linear-gradient(135deg, #3B9EE8, #2B7DC0)" }}
        >
          <span className="text-4xl" role="img" aria-label="LifePilot">✈️</span>
        </div>

        {/* Brand */}
        <h1 className="text-4xl font-extrabold mb-2" style={{ color: "#17324D" }}>
          LifePilot
        </h1>
        <p className="text-base font-medium mb-2" style={{ color: "#5F7D95" }}>
          Navigate your life journey
        </p>

        {/* Story tagline */}
        <div
          className="mt-4 mb-8 px-5 py-3 rounded-2xl text-sm font-medium leading-relaxed"
          style={{
            background: "rgba(255,255,255,0.70)",
            border: "1px solid rgba(59,158,232,0.15)",
            color: "#36516B",
          }}
        >
          You are the <strong style={{ color: "#17324D" }}>Captain</strong>.
          Life is your <strong style={{ color: "#17324D" }}>Journey</strong>.
          The future is your <strong style={{ color: "#17324D" }}>Horizon</strong>.
        </div>

        {/* Begin CTA */}
        <Link
          href="/onboarding"
          className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-white font-extrabold text-lg shadow-lg transition-transform duration-150 active:scale-95 hover:shadow-xl"
          style={{ background: "linear-gradient(135deg, #3B9EE8, #2B7DC0)" }}
          data-testid="btn-begin-journey"
        >
          Begin Your Journey
          <span aria-hidden="true" className="text-xl">→</span>
        </Link>

        <p className="mt-4 text-xs font-medium" style={{ color: "#5F7D95" }}>
          Free · Private · Offline first
        </p>
      </div>

      {/* Bottom companion hint */}
      <div
        className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-2 px-6"
        aria-hidden="true"
      >
        <span className="text-lg">✨</span>
        <p className="text-xs font-medium italic" style={{ color: "#5F7D95" }}>
          "I remember standing where you are."
        </p>
      </div>
    </div>
  );
}
