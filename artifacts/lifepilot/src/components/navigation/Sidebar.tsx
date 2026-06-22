import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  User,
  Map,
  BookOpen,
  Star,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../../utils";

interface NavItem {
  id:       string;
  path:     string;
  icon:     LucideIcon | null;
  emoji:    string | null;
  labelKey: string;
  color:    string;
}

/** MVP v1 — only these modules ship */
const MODULE_NAV: NavItem[] = [
  { id: "cockpit",    path: "/cockpit",      icon: Home,     emoji: null,  labelKey: "nav.cockpit",    color: "#3B9EE8" },
  { id: "pilot",      path: "/pilot",        icon: User,     emoji: null,  labelKey: "nav.pilot",      color: "#22A06B" },
  { id: "flightplan", path: "/flight-plan",  icon: Map,      emoji: null,  labelKey: "nav.flightPlan", color: "#F59E0B" },
  { id: "flightlog",  path: "/flight-log",   icon: BookOpen, emoji: null,  labelKey: "nav.flightLog",  color: "#8B5CF6" },
  { id: "futureme",   path: "/future-me",    icon: Star,     emoji: null,  labelKey: "nav.futureMe",   color: "#EC4899" },
  { id: "futureyou",  path: "/future-you",   icon: null,     emoji: "✨",  labelKey: "nav.futureYou",  color: "#EC4899" },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [location] = useLocation();
  const { t } = useTranslation();

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col transition-all duration-300 shrink-0",
        isCollapsed ? "w-[72px]" : "w-60"
      )}
      style={{
        background: "linear-gradient(180deg, #EBF5FF 0%, #F0F7FF 50%, #FFF0F8 100%)",
        borderRight: "1px solid rgba(59,158,232,0.15)",
      }}
      aria-label="Main navigation"
      data-testid="nav-sidebar"
    >
      {/* Logo */}
      <div
        className="flex items-center h-14 px-4 shrink-0"
        style={{ borderBottom: "1px solid rgba(59,158,232,0.12)" }}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-xl" aria-hidden="true">✈️</span>
            <span
              className="text-lg font-extrabold tracking-tight truncate"
              style={{ color: "#17324D" }}
            >
              LifePilot
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "p-1.5 rounded-lg transition-colors shrink-0",
            isCollapsed ? "mx-auto" : "ml-auto"
          )}
          style={{ color: "#5F7D95" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(59,158,232,0.10)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          data-testid="button-sidebar-toggle"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-2.5 py-3 space-y-0.5 overflow-y-auto">
        {MODULE_NAV.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.path}
              className={cn(
                "flex items-center gap-3 px-2.5 py-2.5 rounded-xl transition-all duration-150 group relative overflow-hidden",
                isCollapsed ? "justify-center" : ""
              )}
              style={isActive
                ? { background: `${item.color}18`, color: item.color }
                : { color: "#5F7D95" }}
              onMouseEnter={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(59,158,232,0.07)";
                  (e.currentTarget as HTMLElement).style.color = "#244A68";
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#5F7D95";
                }
              }}
              aria-current={isActive ? "page" : undefined}
              aria-label={t(item.labelKey)}
              data-testid={`nav-sidebar-${item.id}`}
            >
              {isActive && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                  style={{ background: item.color }}
                  aria-hidden="true"
                />
              )}

              {item.emoji ? (
                <span
                  className={cn(
                    "shrink-0 text-lg flex items-center justify-center w-[18px] h-[18px]",
                    isActive ? "scale-110" : "group-hover:scale-105"
                  )}
                  aria-hidden="true"
                >
                  {item.emoji}
                </span>
              ) : Icon ? (
                <Icon
                  className={cn("shrink-0 transition-transform duration-200", isActive ? "scale-110" : "group-hover:scale-105")}
                  style={{ width: 18, height: 18, color: isActive ? item.color : "inherit" }}
                />
              ) : null}

              {!isCollapsed && (
                <span className={cn("font-semibold text-sm truncate leading-tight", isActive ? "font-bold" : "")}>
                  {t(item.labelKey)}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Settings */}
      <div
        className="px-2.5 py-3 shrink-0"
        style={{ borderTop: "1px solid rgba(59,158,232,0.12)" }}
      >
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-2.5 py-2.5 rounded-xl transition-all duration-150 group",
            isCollapsed ? "justify-center" : ""
          )}
          style={location === "/settings" ? { background: "#6366F118", color: "#6366F1" } : { color: "#5F7D95" }}
          onMouseEnter={e => {
            if (location !== "/settings") {
              (e.currentTarget as HTMLElement).style.background = "rgba(59,158,232,0.07)";
              (e.currentTarget as HTMLElement).style.color = "#244A68";
            }
          }}
          onMouseLeave={e => {
            if (location !== "/settings") {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#5F7D95";
            }
          }}
          aria-current={location === "/settings" ? "page" : undefined}
          aria-label={t("settings.title")}
          data-testid="nav-sidebar-settings"
        >
          <Settings style={{ width: 18, height: 18, color: "inherit" }} className="shrink-0" />
          {!isCollapsed && (
            <span className="font-semibold text-sm truncate">{t("settings.title")}</span>
          )}
        </Link>
      </div>
    </aside>
  );
}
