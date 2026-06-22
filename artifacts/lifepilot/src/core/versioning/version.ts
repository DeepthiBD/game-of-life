// ============================================================
// LIFEPILOT — VERSION CONSTANTS
// Single source of truth for all version numbers.
// ============================================================

export const APP_VERSION = __APP_VERSION__;
export const APP_NAME = "LifePilot";

export const SCHEMA_VERSION = 12;

export const WAVE_VERSIONS = {
  wave0: "0.1.x",
  wave1: "1.0.x",
  wave2: "1.1.x",
  wave3: "2.0.x",
  wave4: "2.1.x",
  wave5: "3.0.x",
  wave6: "4.0.x",
} as const;

export const BUILD_INFO = {
  schemaVersion: SCHEMA_VERSION,
  appVersion: APP_VERSION,
  buildTime: new Date().toISOString(),
} as const;

export function isSchemaCompatible(version: number): boolean {
  return version >= 1 && version <= SCHEMA_VERSION;
}
