import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { AppProviders } from "./app/providers";
import { ErrorBoundary } from "./app/ErrorBoundary";
import AppShell from "./components/layout/AppShell";
import NotFoundPage from "./pages/NotFoundPage";

// ── MVP v1 routes only ────────────────────────────────────────
const LaunchPage        = lazy(() => import("./pages/LaunchPage"));
const OnboardingPage    = lazy(() => import("./pages/onboarding/OnboardingPage"));
const PilotPage         = lazy(() => import("./pages/PilotPage"));
const CockpitPage       = lazy(() => import("./pages/CockpitPage"));
const FlightPlanPage    = lazy(() => import("./pages/FlightPlanPage"));
const FlightLogPage     = lazy(() => import("./pages/FlightLogPage"));
const FutureMePage      = lazy(() => import("./pages/FutureMePage"));
const FutureYouPage     = lazy(() => import("./pages/FutureYouPage"));
const SettingsPage      = lazy(() => import("./pages/SettingsPage"));

function PageLoader() {
  return (
    <div
      className="flex-1 flex items-center justify-center"
      aria-label="Loading page"
      role="status"
    >
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {/* Launch + onboarding — full-screen, no shell */}
        <Route path="/launch"      component={LaunchPage} />
        <Route path="/onboarding"  component={OnboardingPage} />

        {/* Root → launch */}
        <Route path="/">
          <Redirect to="/launch" />
        </Route>

        {/* MVP modules */}
        <Route path="/cockpit"     component={CockpitPage} />
        <Route path="/pilot"       component={PilotPage} />
        <Route path="/flight-plan" component={FlightPlanPage} />
        <Route path="/flight-log"  component={FlightLogPage} />
        <Route path="/future-me"   component={FutureMePage} />
        <Route path="/future-you"  component={FutureYouPage} />
        <Route path="/settings"    component={SettingsPage} />

        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppShell>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
            >
              Skip to main content
            </a>
            <main id="main-content" className="flex-1 flex flex-col">
              <AppRoutes />
            </main>
          </AppShell>
        </WouterRouter>
      </AppProviders>
    </ErrorBoundary>
  );
}
