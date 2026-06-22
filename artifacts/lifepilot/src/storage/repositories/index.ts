// ============================================================
// LIFEPILOT — REPOSITORY BARREL EXPORT
// ============================================================

// ── Core ────────────────────────────────────────────────────
export { pilotRepository, PilotRepository } from "./PilotRepository";
export {
  settingsRepository,
  SettingsRepository,
  languagePreferenceRepository,
  LanguagePreferenceRepository,
} from "./SettingsRepository";

// ── Flight Plan ──────────────────────────────────────────────
export { goalRepository, GoalRepository } from "./GoalRepository";

// ── Flight Log ───────────────────────────────────────────────
export { reflectionRepository, ReflectionRepository } from "./ReflectionRepository";
export { flightLogEntryRepository, FlightLogEntryRepository } from "./FlightLogEntryRepository";

// ── Future Me ────────────────────────────────────────────────
export { futureLetterRepository, FutureLetterRepository } from "./FutureLetterRepository";
export {
  futureVisionRepository,
  FutureVisionRepository,
  futureMilestoneRepository,
  FutureMilestoneRepository,
} from "./FutureVisionRepository";

// ── Missions & Achievements ──────────────────────────────────
export {
  missionRepository,
  MissionRepository,
  missionCompletionRepository,
  MissionCompletionRepository,
} from "./MissionRepository";
export {
  achievementRepository,
  AchievementRepository,
  badgeRepository,
  BadgeRepository,
  certificateRepository,
  CertificateRepository,
} from "./AchievementRepository";

// ── Habits ───────────────────────────────────────────────────
export { habitRepository, HabitRepository } from "./HabitRepository";

// ── Competency & Growth ──────────────────────────────────────
export {
  competencyRepository,
  CompetencyRepository,
  competencyPracticeRepository,
  CompetencyPracticeRepository,
  growthEvidenceRepository,
  GrowthEvidenceRepository,
} from "./CompetencyRepository";

// ── Strengths & Impact ───────────────────────────────────────
export {
  strengthCatalogRepository,
  StrengthCatalogRepository,
  pilotStrengthRepository,
  PilotStrengthRepository,
  impactEvidenceRepository,
  ImpactEvidenceRepository,
} from "./StrengthRepository";

// ── Career Explorer ──────────────────────────────────────────
export {
  careerRepository,
  CareerRepository,
  careerExplorationRepository,
  CareerExplorationRepository,
  careerRoadmapRepository,
  CareerRoadmapRepository,
} from "./CareerRepository";

// ── Money Quest ──────────────────────────────────────────────
export {
  financialConceptRepository,
  FinancialConceptRepository,
  financialLessonProgressRepository,
  FinancialLessonProgressRepository,
} from "./FinanceRepository";

// ── Life Choices ─────────────────────────────────────────────
export {
  lifeChoiceScenarioRepository,
  LifeChoiceScenarioRepository,
  lifeChoiceOptionRepository,
  LifeChoiceOptionRepository,
  lifeChoiceOutcomeRepository,
  LifeChoiceOutcomeRepository,
} from "./LifeChoiceRepository";

// ── Values ───────────────────────────────────────────────────
export {
  valueRepository,
  ValueRepository,
  valuePracticeRepository,
  ValuePracticeRepository,
} from "./ValueRepository";

// ── Life Projects & Roles ────────────────────────────────────
export {
  lifeProjectRepository,
  LifeProjectRepository,
  lifeProjectMilestoneRepository,
  LifeProjectMilestoneRepository,
  lifeRoleRepository,
  LifeRoleRepository,
} from "./LifeProjectRepository";

// ── Decisions ────────────────────────────────────────────────
export {
  decisionJournalRepository,
  DecisionJournalRepository,
  decisionOutcomeRepository,
  DecisionOutcomeRepository,
} from "./DecisionRepository";

// ── Identity Domain ──────────────────────────────────────────
export {
  pilotIdentityRepository,
  PilotIdentityRepository,
  lifeExperienceRepository,
  LifeExperienceRepository,
  lifeChapterRepository,
  LifeChapterRepository,
  decisionRecordRepository,
  DecisionRecordRepository,
  relationshipReflectionRepository,
  RelationshipReflectionRepository,
  futureIdentityRepository,
  FutureIdentityRepository,
  purposeStatementRepository,
  PurposeStatementRepository,
  lifeWheelSnapshotRepository,
  LifeWheelSnapshotRepository,
} from "./IdentityRepository";

// ── Emerging Identity & Memory (RP-001) ──────────────────────
export {
  emergingIdentityRepository,
  EmergingIdentityRepository,
  identitySignalRepository,
  IdentitySignalRepository,
  identityMomentRepository,
  IdentityMomentRepository,
  futurePathRepository,
  FuturePathRepository,
  futureSnapshotRepository,
  FutureSnapshotRepository,
  pilotMemoryRepository,
  PilotMemoryRepository,
  memoryReactionRepository,
  MemoryReactionRepository,
} from "./EmergingIdentityRepository";

// ── Consent ──────────────────────────────────────────────────
export {
  consentRecordRepository,
  ConsentRecordRepository,
  voiceConsentRepository,
  VoiceConsentRepository,
  aiConsentRecordRepository,
  AIConsentRecordRepository,
} from "./ConsentRepository";

// ── Subscription ─────────────────────────────────────────────
export {
  subscriptionPlanRepository,
  SubscriptionPlanRepository,
  pilotSubscriptionRepository,
  PilotSubscriptionRepository,
} from "./SubscriptionRepository";

// ── Notifications ────────────────────────────────────────────
export { notificationRepository, NotificationRepository } from "./NotificationRepository";

// ── Activity & Content ───────────────────────────────────────
export { activityEventRepository, ActivityEventRepository } from "./ActivityEventRepository";
export {
  contentRepository,
  ContentRepository,
  learningPathRepository,
  LearningPathRepository,
} from "./ContentRepository";

// ── Contracts & base classes ─────────────────────────────────
export type {
  IRepository,
  IFilterableRepository,
  IPilotScopedRepository,
  IResult,
} from "./contracts/IRepository";
export { ok, fail } from "./contracts/IRepository";
export { BaseRepository, BasePilotScopedRepository } from "./base/BaseRepository";
