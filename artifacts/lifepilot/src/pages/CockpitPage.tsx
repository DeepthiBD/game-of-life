import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { Map, BookOpen, Star, Zap } from "lucide-react";
import { FUTURE_YOU } from "../shared/constants/companions";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getFutureYouMessage(): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86_400_000,
  );
  return FUTURE_YOU.exampleLines[dayOfYear % FUTURE_YOU.exampleLines.length];
}

export default function CockpitPage() {
  const { t } = useTranslation();

  return (
    <div data-testid="page-cockpit" className="pb-24 md:pb-8">

      {/* ── HERO — Welcome Captain + Journey Progress ──────────── */}
      <div className="relative overflow-hidden px-5 pt-7 pb-7 md:px-8">
        {/* Sky atmosphere */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-40"
            style={{ background: "radial-gradient(circle, #DFF3FF 0%, transparent 70%)" }}
          />
          <div
            className="absolute top-4 right-32 w-40 h-40 rounded-full opacity-25"
            style={{ background: "radial-gradient(circle, #BEE3F8 0%, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-8 left-1/3 w-48 h-48 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #FFF8F0 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1
                className="text-2xl md:text-3xl font-extrabold leading-tight"
                style={{ color: "#17324D" }}
              >
                {getGreeting()}, Captain! ✈️
              </h1>
              <p className="mt-1 text-sm font-medium" style={{ color: "#5F7D95" }}>
                {t("cockpit.exploreModules")}
              </p>
            </div>

            {/* Pilot level */}
            <div
              className="shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-2xl text-white shadow-md"
              style={{ background: "linear-gradient(135deg, #3B9EE8, #2B7DC0)" }}
            >
              <span className="text-xs font-bold uppercase tracking-wide opacity-80">Pilot</span>
              <span className="text-xl font-extrabold leading-none">Lv 1</span>
            </div>
          </div>

          {/* Journey Progress bar */}
          <div className="mt-4 flex items-center gap-3">
            <Zap className="w-4 h-4 shrink-0" style={{ color: "#F59E0B" }} />
            <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: "#D4E9F7" }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: "18%", background: "linear-gradient(90deg, #3B9EE8, #F59E0B)" }}
              />
            </div>
            <span className="text-xs font-bold whitespace-nowrap" style={{ color: "#3B9EE8" }}>
              180 / 1 000 XP
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-8 flex flex-col gap-4">

        {/* ── FUTURE YOU — companion message ──────────────────── */}
        <Link href="/future-you" className="group block">
          <div
            className="relative overflow-hidden rounded-2xl px-5 py-4 flex items-start gap-4 shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md"
            style={{
              background: "linear-gradient(135deg, #FFF0F8 0%, #FFE8F5 100%)",
              border: "1px solid #EC489920",
            }}
          >
            {/* Companion avatar */}
            <div
              className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-sm"
              style={{ background: "linear-gradient(135deg, #EC4899, #BE185D)" }}
              aria-label="Future You companion"
            >
              {FUTURE_YOU.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#EC4899" }}>
                {FUTURE_YOU.name}
              </p>
              <p className="text-sm font-medium leading-relaxed" style={{ color: "#17324D" }}>
                "{getFutureYouMessage()}"
              </p>
            </div>
            <div className="shrink-0 flex items-center self-center" style={{ color: "#EC4899" }}>
              <span className="text-sm font-bold">→</span>
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-5 -right-5 w-20 h-20 rounded-full opacity-10"
              style={{ background: "#EC4899" }}
            />
          </div>
        </Link>

        {/* ── TODAY'S ADVENTURE ───────────────────────────────── */}
        <Link href="/flight-plan" className="group block">
          <div
            className="relative overflow-hidden rounded-2xl p-5 shadow-md transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #FFF8ED 0%, #FFF3E0 100%)", border: "1px solid #F59E0B28" }}
          >
            <div className="flex items-start gap-4">
              <div
                className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm text-2xl"
                style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}
                aria-hidden="true"
              >
                🎯
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#F59E0B" }}>
                  Today's Adventure
                </p>
                <p className="font-extrabold text-lg leading-snug" style={{ color: "#17324D" }}>
                  Set your first flight plan
                </p>
                <p className="text-sm mt-1" style={{ color: "#5F7D95" }}>
                  Chart where you want to go, Captain
                </p>
              </div>
            </div>
            <div
              className="mt-4 flex items-center gap-1 text-sm font-bold"
              style={{ color: "#F59E0B" }}
            >
              Begin Adventure <span aria-hidden="true">→</span>
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-5 -right-5 w-24 h-24 rounded-full opacity-15"
              style={{ background: "#F59E0B" }}
            />
          </div>
        </Link>

        {/* ── MODULE CARDS — Flight Plan · Flight Log · Future Me  */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Flight Plan */}
          <Link href="/flight-plan" className="group block">
            <div
              className="relative overflow-hidden rounded-2xl p-5 h-full flex flex-col gap-3 shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md"
              style={{ background: "linear-gradient(135deg, #FFFBF0 0%, #FFF8E6 100%)", border: "1px solid #F59E0B20" }}
              data-testid="card-module-flightplan"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                style={{ background: "#F59E0B", color: "#fff" }}
              >
                <Map className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-sm leading-tight" style={{ color: "#17324D" }}>
                  {t("modules.flightPlan.name")}
                </p>
                <p className="text-xs mt-1 leading-relaxed line-clamp-2" style={{ color: "#5F7D95" }}>
                  {t("modules.flightPlan.description")}
                </p>
              </div>
              <div
                className="mt-auto text-xs font-bold flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "#F59E0B" }}
              >
                Explore →
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-3 -right-3 w-14 h-14 rounded-full opacity-15"
                style={{ background: "#F59E0B" }}
              />
            </div>
          </Link>

          {/* Flight Log */}
          <Link href="/flight-log" className="group block">
            <div
              className="relative overflow-hidden rounded-2xl p-5 h-full flex flex-col gap-3 shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md"
              style={{ background: "linear-gradient(135deg, #F8F5FF 0%, #F3EFFF 100%)", border: "1px solid #8B5CF620" }}
              data-testid="card-module-flightlog"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                style={{ background: "#8B5CF6", color: "#fff" }}
              >
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-sm leading-tight" style={{ color: "#17324D" }}>
                  {t("modules.flightLog.name")}
                </p>
                <p className="text-xs mt-1 leading-relaxed line-clamp-2" style={{ color: "#5F7D95" }}>
                  {t("modules.flightLog.description")}
                </p>
              </div>
              <div
                className="mt-auto text-xs font-bold flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "#8B5CF6" }}
              >
                Reflect →
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-3 -right-3 w-14 h-14 rounded-full opacity-15"
                style={{ background: "#8B5CF6" }}
              />
            </div>
          </Link>

          {/* Future Me */}
          <Link href="/future-me" className="group block">
            <div
              className="relative overflow-hidden rounded-2xl p-5 h-full flex flex-col gap-3 shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md"
              style={{ background: "linear-gradient(135deg, #FFF0F8 0%, #FFE8F5 100%)", border: "1px solid #EC489920" }}
              data-testid="card-module-futureme"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                style={{ background: "#EC4899", color: "#fff" }}
              >
                <Star className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-sm leading-tight" style={{ color: "#17324D" }}>
                  {t("modules.futureMe.name")}
                </p>
                <p className="text-xs mt-1 leading-relaxed line-clamp-2" style={{ color: "#5F7D95" }}>
                  {t("modules.futureMe.description")}
                </p>
              </div>
              <div
                className="mt-auto text-xs font-bold flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "#EC4899" }}
              >
                Open →
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-3 -right-3 w-14 h-14 rounded-full opacity-15"
                style={{ background: "#EC4899" }}
              />
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
