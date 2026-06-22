// ============================================================
// LIFEPILOT — usePilotDna HOOK (RP-002A)
// Provides personalization context to page components.
// Context is loaded lazily and cached in component state.
//
// Usage:
//   const { context, loading } = usePilotDna(pilotId);
//   const weighted = pilotDnaService.weightByAffinity(context, items);
// ============================================================

import { useState, useEffect } from "react";
import { pilotDnaService, type PilotDnaContext } from "./PilotDnaService";

const EMPTY_CONTEXT: PilotDnaContext = {
  interests: [],
  growthGoals: [],
  adventureStyles: [],
  affinityMap: {},
};

interface UsePilotDnaResult {
  context: PilotDnaContext;
  loading: boolean;
  refresh: () => void;
}

export function usePilotDna(pilotId: number | null | undefined): UsePilotDnaResult {
  const [context, setContext] = useState<PilotDnaContext>(EMPTY_CONTEXT);
  const [loading, setLoading] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!pilotId) {
      setContext(EMPTY_CONTEXT);
      return;
    }
    let cancelled = false;
    setLoading(true);
    pilotDnaService.getContext(pilotId).then(ctx => {
      if (!cancelled) {
        setContext(ctx);
        setLoading(false);
      }
    }).catch(() => {
      if (!cancelled) {
        setContext(EMPTY_CONTEXT);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [pilotId, tick]);

  return {
    context,
    loading,
    refresh: () => setTick(t => t + 1),
  };
}
