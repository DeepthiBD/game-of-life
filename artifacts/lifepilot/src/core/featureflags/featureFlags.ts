// ============================================================
// LIFEPILOT — FEATURE FLAG SERVICE
// Runtime feature flag evaluation. Flags are resolved from:
//   1. LocalStorage overrides (dev/QA use only)
//   2. Default values from FLAG_DEFINITIONS
// In future waves, overrides will come from Dexie + cloud config.
// ============================================================

import { eventBus } from "../events/eventBus";
import { type FeatureFlagKey, FLAG_DEFINITIONS } from "./flags";

const STORAGE_KEY = "lp_feature_flags_override";
const IS_DEV = import.meta.env.DEV;

type FlagOverrides = Partial<Record<FeatureFlagKey, boolean>>;

class FeatureFlagService {
  private _overrides: FlagOverrides = {};

  constructor() {
    this._loadOverrides();
  }

  isEnabled(key: FeatureFlagKey): boolean {
    if (key in this._overrides) {
      return this._overrides[key] as boolean;
    }
    return FLAG_DEFINITIONS[key]?.defaultEnabled ?? false;
  }

  isDisabled(key: FeatureFlagKey): boolean {
    return !this.isEnabled(key);
  }

  enable(key: FeatureFlagKey): void {
    this._setOverride(key, true);
  }

  disable(key: FeatureFlagKey): void {
    this._setOverride(key, false);
  }

  reset(key: FeatureFlagKey): void {
    delete this._overrides[key];
    this._persistOverrides();
    eventBus.publish("FeatureFlagChanged", { flag: key, enabled: FLAG_DEFINITIONS[key]?.defaultEnabled ?? false });
  }

  resetAll(): void {
    this._overrides = {};
    if (IS_DEV) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // localStorage unavailable — silently skip
      }
    }
  }

  getAll(): Record<FeatureFlagKey, boolean> {
    const result = {} as Record<FeatureFlagKey, boolean>;
    for (const key of Object.keys(FLAG_DEFINITIONS) as FeatureFlagKey[]) {
      result[key] = this.isEnabled(key);
    }
    return result;
  }

  getDefinition(key: FeatureFlagKey) {
    return FLAG_DEFINITIONS[key];
  }

  private _setOverride(key: FeatureFlagKey, value: boolean): void {
    const previous = this.isEnabled(key);
    this._overrides[key] = value;
    this._persistOverrides();
    if (previous !== value) {
      eventBus.publish("FeatureFlagChanged", { flag: key, enabled: value });
    }
  }

  private _loadOverrides(): void {
    if (!IS_DEV) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        this._overrides = JSON.parse(raw) as FlagOverrides;
      }
    } catch {
      this._overrides = {};
    }
  }

  private _persistOverrides(): void {
    if (!IS_DEV) return;
    try {
      if (Object.keys(this._overrides).length === 0) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this._overrides));
      }
    } catch {
      // localStorage unavailable — in-memory only
    }
  }
}

export const featureFlags = new FeatureFlagService();
export type { FeatureFlagKey };
