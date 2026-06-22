// ============================================================
// LIFEPILOT — CORE LAYER BARREL
// Single import point for all cross-cutting infrastructure.
// Nothing in core/ may import from modules/, shared/, or pages/.
// ============================================================

export { eventBus } from "./events/eventBus";
export type { EventHandler } from "./events/eventBus";
export type {
  LifePilotEvent,
  LifePilotEventType,
  GoalCreatedPayload,
  GoalCompletedPayload,
  MissionStartedPayload,
  MissionCompletedPayload,
  ReflectionCreatedPayload,
  FutureLetterCreatedPayload,
  FutureLetterOpenedPayload,
  CareerExploredPayload,
  LessonCompletedPayload,
  HabitCompletedPayload,
  NotificationDeliveredPayload,
  PilotCreatedPayload,
  SettingsChangedPayload,
  StorageErrorPayload,
  SchemaMigratedPayload,
  FeatureFlagChangedPayload,
} from "./events/events";

export { featureFlags } from "./featureflags/featureFlags";
export type { FeatureFlagKey } from "./featureflags/featureFlags";
export { FLAG_DEFINITIONS } from "./featureflags/flags";
export type { FeatureFlagDefinition } from "./featureflags/flags";

export { diagnostics } from "./diagnostics/diagnostics";
export type {
  DiagnosticEntry,
  DiagnosticSeverity,
  DiagnosticCategory,
} from "./diagnostics/diagnostics";

export { APP_CONFIG } from "./config/appConfig";
export type { AppConfig } from "./config/appConfig";

export {
  APP_VERSION,
  APP_NAME,
  SCHEMA_VERSION,
  WAVE_VERSIONS,
  BUILD_INFO,
  isSchemaCompatible,
} from "./versioning/version";
