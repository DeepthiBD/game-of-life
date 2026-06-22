import React from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../navigation/Sidebar";
import BottomNav from "../navigation/BottomNav";
import OfflineIndicator from "../common/OfflineIndicator";
import ThemeToggle from "../common/ThemeToggle";
import LanguageSwitcher from "../common/LanguageSwitcher";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen overflow-hidden text-foreground">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <OfflineIndicator />

        {/* Header */}
        <header
          className="h-14 flex items-center justify-between px-4 z-30 shrink-0"
          style={{
            background: "rgba(255,255,255,0.70)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(59,158,232,0.12)",
          }}
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2 md:hidden">
            <span className="text-xl" aria-hidden="true">✈️</span>
            <span className="text-lg font-extrabold tracking-tight" style={{ color: "#17324D" }}>
              LifePilot
            </span>
          </div>

          {/* Desktop spacer (sidebar handles logo) */}
          <div className="hidden md:block" />

          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scroll-smooth relative">
          <div className="max-w-5xl mx-auto w-full min-h-full flex flex-col">
            {children}
            {/* Bottom nav clearance on mobile */}
            <div className="h-22 md:hidden shrink-0" aria-hidden="true" />
          </div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
