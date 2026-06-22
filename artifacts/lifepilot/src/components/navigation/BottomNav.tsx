import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { Home, Map, BookOpen, Star } from "lucide-react";
import { cn } from "../../utils";

/** MVP v1 bottom nav — 5 primary destinations.
 *  Pilot Profile accessible via sidebar on desktop; excluded from mobile nav to keep it clean. */
const NAV_ITEMS = [
  { id: "cockpit",   path: "/cockpit",     icon: null,     emoji: null,  labelKey: "nav.cockpit",   color: "#3B9EE8" },
  { id: "flightplan",path: "/flight-plan", icon: Map,      emoji: null,  labelKey: "nav.flightPlan",color: "#F59E0B" },
  { id: "flightlog", path: "/flight-log",  icon: BookOpen, emoji: null,  labelKey: "nav.flightLog", color: "#8B5CF6" },
  { id: "futureme",  path: "/future-me",   icon: Star,     emoji: null,  labelKey: "nav.futureMe",  color: "#EC4899" },
  { id: "futureyou", path: "/future-you",  icon: null,     emoji: "✨",  labelKey: "nav.futureYou", color: "#EC4899" },
] as const;

export default function BottomNav() {
  const { t } = useTranslation();
  const [location] = useLocation();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 border-t z-40"
      style={{
        background: "linear-gradient(180deg, rgba(247,251,255,0.97) 0%, rgba(255,240,248,0.97) 100%)",
        borderColor: "rgba(59,158,232,0.15)",
      }}
      aria-label={t("accessibility.openMenu")}
      data-testid="nav-bottom"
    >
      <div className="flex items-center justify-around h-16 px-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;
          const activeColor = item.color;

          return (
            <Link
              key={item.id}
              href={item.path}
              className="flex flex-col items-center justify-center flex-1 min-h-[56px] px-1 gap-1 transition-all duration-150"
              aria-current={isActive ? "page" : undefined}
              aria-label={t(item.labelKey)}
              data-testid={`nav-bottom-${item.id}`}
            >
              <div className="relative flex items-center justify-center w-7 h-7">
                {item.emoji ? (
                  <span
                    className={cn(
                      "text-xl leading-none transition-transform duration-150",
                      isActive ? "scale-110" : "scale-95 opacity-60"
                    )}
                    aria-hidden="true"
                  >
                    {item.emoji}
                  </span>
                ) : Icon === null ? (
                  <Home
                    className="w-6 h-6"
                    style={{ color: isActive ? activeColor : "#94A3B8" }}
                    strokeWidth={isActive ? 2.5 : 1.75}
                  />
                ) : (
                  <Icon
                    className="w-6 h-6"
                    style={{ color: isActive ? activeColor : "#94A3B8" }}
                    strokeWidth={isActive ? 2.5 : 1.75}
                  />
                )}
                {isActive && (
                  <span
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: activeColor }}
                    aria-hidden="true"
                  />
                )}
              </div>
              <span
                className={cn("text-[10px] font-semibold truncate max-w-full leading-tight")}
                style={{ color: isActive ? activeColor : "#94A3B8" }}
              >
                {t(item.labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
