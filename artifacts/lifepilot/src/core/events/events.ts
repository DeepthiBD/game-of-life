// ============================================================
// LIFEPILOT — DOMAIN EVENT DEFINITIONS
// All internal domain events emitted by the event bus.
// ============================================================

export type LifePilotEventType =
  | "GoalCreated"
  | "GoalUpdated"
  | "GoalCompleted"
  | "GoalAbandoned"
  | "MissionStarted"
  | "MissionCompleted"
  | "MissionFailed"
  | "ReflectionCreated"
  | "ReflectionUpdated"
  | "FutureLetterCreated"
  | "FutureLetterOpened"
  | "CareerExplored"
  | "CareerBookmarked"
  | "LessonCompleted"
  | "LessonStarted"
  | "HabitCompleted"
  | "HabitStreakAchieved"
  | "ProjectCreated"
  | "ProjectCompleted"
  | "NotificationDelivered"
  | "NotificationDismissed"
  | "ActivityLogged"
  | "PilotCreated"
  | "PilotUpdated"
  | "SettingsChanged"
  | "ThemeChanged"
  | "LanguageChanged"
  | "AppInitialised"
  | "OfflineDetected"
  | "OnlineRestored"
  | "StorageError"
  | "SchemaMigrated"
  | "FeatureFlagChanged"
  // RP-002A — Pilot DNA Engine
  | "PilotDnaOnboardingComplete"
  | "PilotDnaSignalRecorded"
  | "PilotDnaAffinityUpdated"
  | "PilotDnaContextRefreshed";

export interface LifePilotEvent<T = unknown> {
  readonly type: LifePilotEventType;
  readonly payload: T;
  readonly timestamp: number;
  readonly correlationId: string;
}

export interface GoalCreatedPayload {
  goalId: number;
  pilotId: number;
  title: string;
  category: string;
}

export interface GoalCompletedPayload {
  goalId: number;
  pilotId: number;
  completedAt: Date;
}

export interface MissionStartedPayload {
  missionId: number;
  pilotId: number;
  title: string;
}

export interface MissionCompletedPayload {
  missionId: number;
  pilotId: number;
  completedAt: Date;
  xpEarned?: number;
}

export interface ReflectionCreatedPayload {
  reflectionId: number;
  pilotId: number;
  type: string;
  date: Date;
}

export interface FutureLetterCreatedPayload {
  letterId: number;
  pilotId: number;
  openOnDate: Date;
}

export interface FutureLetterOpenedPayload {
  letterId: number;
  pilotId: number;
  openedAt: Date;
}

export interface CareerExploredPayload {
  careerId: number;
  pilotId: number;
  careerTitle: string;
}

export interface LessonCompletedPayload {
  lessonId: number;
  pilotId: number;
  moduleId: string;
  xpEarned?: number;
}

export interface HabitCompletedPayload {
  habitId: number;
  pilotId: number;
  streak: number;
}

export interface NotificationDeliveredPayload {
  notificationId: number;
  pilotId: number;
  type: string;
}

export interface PilotCreatedPayload {
  pilotId: number;
  name: string;
  ageGroup: string;
}

export interface SettingsChangedPayload {
  pilotId: number;
  key: string;
  previousValue: unknown;
  newValue: unknown;
}

export interface StorageErrorPayload {
  operation: string;
  table: string;
  error: string;
}

export interface SchemaMigratedPayload {
  fromVersion: number;
  toVersion: number;
  durationMs: number;
}

export interface FeatureFlagChangedPayload {
  flag: string;
  enabled: boolean;
}
