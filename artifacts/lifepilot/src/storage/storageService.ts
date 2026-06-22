import { db } from "./db";
import type {
  // v0.1.3
  PilotIdentity,
  LifeExperience,
  LifeChapter,
  DecisionRecord,
  RelationshipReflection,
  StrengthCatalog,
  PilotStrength,
  PurposeStatement,
  ImpactEvidence,
  FutureIdentity,
  LifeWheelSnapshot,
  // v0.1.4
  Scenario,
  ScenarioChoice,
  ChoiceConsequence,
  LifeState,
  LifeStateTransition,
  PilotScenarioPlay,
  ScenarioReflection,
  ScenarioReward,
  ScenarioOutcomePath,
  ScenarioPrerequisite,
  ScenarioUnlock,
  SimulationCampaign,
  CampaignScenario,
  // v0.1.5
  Character,
  VoiceProfile,
  FutureCharacter,
  StoryArc,
  StoryChapter,
  DialogueNode,
  DialogueChoice,
  ConversationSession,
  CharacterRelationship,
  CharacterMemory,
  VoiceInteraction,
  NarrativeTrigger,
  Avatar,
  AvatarUnlock,
  ConversationType,
  MemoryType,
  TriggerType,
  // v1.0
  LifeStateSnapshot,
  CharacterMemorySource,
  CharacterRelationshipEvent,
  CoPilotPermission,
  AudioAsset,
  AudioPackage,
  MemorySourceType,
  RelationshipEventType,
  PermissionType,
  // v1.4 — RP-003 Human-Centric Domains
  DevelopmentStage,
  DevelopmentStageType,
  GrowthDimension,
  GrowthDimensionType,
  DevelopmentMilestone,
  GrowthIndicator,
  Curriculum,
  CurriculumFramework,
  CurriculumModule,
  LearningOutcome,
  LearningOutcomeType,
  CompetencyMapping,
  PersonalityProfile,
  PersonalityFramework,
  PersonalityAssessment,
  PersonalityTrait,
  PersonalityTraitCategory,
  PersonalityGrowth,
  DecisionScenario,
  DecisionContext,
  DecisionScenarioOutcome,
  DecisionReflection,
  DecisionPattern,
  DecisionPatternType,
  LifeTimelineEvent,
  LifeTimelineEventType,
  TimelineCollection,
  TimelineNarrative,
  WellbeingProfile,
  WellbeingAssessment,
  WellbeingDimension,
  WellbeingDimensionType,
  WellbeingSnapshot,
  WellbeingTrend,
  LifeAchievement,
  LifeAchievementCategoryType,
  LifeAchievementStatus,
  LifeAchievementCategory,
  LifeAchievementProgress,
  LifeAchievementEvidence,
  LifeAchievementEvidenceType,
  LifePrinciple,
  PrincipleCategoryType,
  PersonalBelief,
  BeliefType,
  DecisionRule,
  DecisionRuleType,
  CoreValueEvolution,
  // v1.3 — RP-003
  FeatureFlag,
  FeatureFlagStatus,
  FeatureFlagScope,
  FeatureFlagAssignment,
  FeatureRollout,
  RolloutStrategy,
  Experiment,
  ExperimentStatus,
  ExperimentVariant,
  FeatureUsage,
  Subscription,
  SubscriptionStatus,
  SubscriptionTier,
  Entitlement,
  EntitlementType,
  UsageRecord,
  Invoice,
  InvoiceStatus,
  Payment,
  PaymentStatus,
  PaymentMethod,
  License,
  LicenseType,
  SeatAssignment,
  NotificationTemplate,
  NotificationTemplateType,
  NotificationCampaign,
  CampaignStatus,
  NotificationPreference,
  NotificationDelivery,
  DeliveryStatus,
  NotificationAnalytics,
  NotificationChannel,
  NotificationChannelType,
  Recommendation,
  RecommendationType,
  RecommendationStatus,
  RecommendationCandidate,
  RecommendationFeedback,
  RecommendationFeedbackType,
  RecommendationHistory,
  RecommendationModel,
  KnowledgeNode,
  KnowledgeNodeType,
  KnowledgeRelationship,
  KnowledgeRelationshipType,
  KnowledgeCluster,
  SemanticTag,
  Ontology,
  AIModel,
  AIModelProvider,
  AIModelType,
  PromptTemplate,
  PromptStatus,
  PromptVersion,
  PromptExecution,
  AIUsage,
  AIUsageType,
  AISafetyReview,
  SafetyReviewStatus,
  AIFeedback,
  ExternalIntegration,
  IntegrationType,
  IntegrationStatus,
  APIKey,
  Webhook,
  WebhookStatus,
  WebhookSubscription,
  OAuthConnection,
  OAuthStatus,
  SyncConnector,
  SyncDirection,
  IntegrationLog,
  IntegrationEvent,
  Language,
  ScriptType,
  Translation,
  LocalizedContent,
  CountryConfiguration,
  RegionalPolicy,
  RegionalPolicyType,
  TimezoneConfiguration,
  // v1.2 — RP-002
  Assessment,
  AssessmentType,
  AssessmentQuestion,
  AssessmentResponseType,
  AssessmentResponse,
  AssessmentResult,
  InstitutionReport,
  InstitutionReportType,
  ClassroomReport,
  CohortInsight,
  CohortType,
  Counsellor,
  CounsellorSpecialization,
  CounsellorAvailabilityStatus,
  CounsellorSession,
  CounsellorSessionType,
  AuditLog,
  AuditEntityType,
  AuditActionType,
  AuditActorType,
  InterventionRule,
  InterventionTriggerType,
  InterventionSeverity,
  InterventionRecommendation,
  InterventionRecommendationType,
  // v1.1
  EmergingIdentity,
  IdentitySignal,
  IdentitySignalType,
  IdentitySignalSourceType,
  IdentityMoment,
  FuturePath,
  FutureSnapshot,
  WorldLocation,
  LocationType,
  LocationCharacter,
  LocationScenario,
  PilotLocationVisit,
  LocationUnlock,
  PilotMemory,
  PilotMemoryType,
  MemoryReaction,
  MemoryReplay,
  CharacterArc,
  CharacterArcStage,
  Discovery,
  DiscoveryType,
  DiscoveryRarity,
  PilotDiscovery,
  DailyChallenge,
  ChallengeType,
  StreakReward,
  StreakRewardType,
  ConsentRecord,
  ConsentType,
  ConsentStatus,
  VoiceConsent,
  AIConsentRecord,
  SyncQueue,
  SyncStatus,
  ScenarioTemplate,
  DialogueTemplate,
  ContentPack,
  ContentPackType,
  ContentLocalizationStatus,
  LocalizationStatus,
  LocalizationTask,
  LocalizationTaskType,
  Pilot,
  Settings,
  LanguagePreference,
  FlightPlanGoal,
  FlightLogEntry,
  Reflection,
  FutureVision,
  FutureMilestone,
  FutureLetter,
  Achievement,
  Habit,
  HabitActivity,
  StorageResult,
  SupportedLanguage,
  TimelineEvent,
  // v0.1.1
  ContentItem,
  LearningPath,
  LearningPathStep,
  PilotLearningPath,
  SubscriptionPlan,
  PilotSubscription,
  Badge,
  Certificate,
  FamilyChallenge,
  FamilyChallengeParticipant,
  School,
  Teacher,
  Classroom,
  Program,
  Enrollment,
  Participation,
  Tenant,
  Organization,
  Deployment,
  // v0.1.2
  ActivityEvent,
  Notification,
  CareerRoadmap,
  CareerRoadmapStep,
  CompetencyCatalog,
  PilotCompetency,
  ValueCatalog,
  PilotValue,
  ContentRevision,
  ActivityEventType,
} from "../types";

// ============================================================
// GENERIC HELPERS
// ============================================================

async function safeRun<T>(fn: () => Promise<T>): Promise<StorageResult<T>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (err) {
    const error = err instanceof Error ? err.message : "Storage error";
    console.error("[LifePilot Storage]", err);
    return { success: false, error };
  }
}

// ============================================================
// PILOT SERVICE
// ============================================================

export const pilotService = {
  async getAll(): Promise<StorageResult<Pilot[]>> {
    return safeRun(() => db.pilots.orderBy("createdAt").toArray());
  },

  async getById(id: number): Promise<StorageResult<Pilot | undefined>> {
    return safeRun(() => db.pilots.get(id));
  },

  async getActive(): Promise<StorageResult<Pilot | undefined>> {
    return safeRun(() => db.pilots.where("isActive").equals(1).first());
  },

  async create(pilot: Omit<Pilot, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.pilots.add(pilot));
  },

  async update(id: number, changes: Partial<Pilot>): Promise<StorageResult<number>> {
    return safeRun(() => db.pilots.update(id, { ...changes, updatedAt: new Date() }));
  },

  async delete(id: number): Promise<StorageResult<void>> {
    return safeRun(() => db.pilots.delete(id));
  },
};

// ============================================================
// SETTINGS SERVICE
// ============================================================

export const settingsService = {
  async getForPilot(pilotId: number): Promise<StorageResult<Settings | undefined>> {
    return safeRun(() => db.settings.where("pilotId").equals(pilotId).first());
  },

  async upsert(settings: Omit<Settings, "id">): Promise<StorageResult<number>> {
    return safeRun(async () => {
      const existing = await db.settings.where("pilotId").equals(settings.pilotId).first();
      if (existing?.id) {
        await db.settings.update(existing.id, { ...settings, updatedAt: new Date() });
        return existing.id;
      }
      return db.settings.add(settings);
    });
  },
};

// ============================================================
// LANGUAGE PREFERENCE SERVICE
// ============================================================

export const languagePreferenceService = {
  async getForPilot(pilotId: number): Promise<StorageResult<LanguagePreference | undefined>> {
    return safeRun(() => db.languagePreferences.where("pilotId").equals(pilotId).first());
  },

  async set(pilotId: number, language: SupportedLanguage): Promise<StorageResult<number>> {
    return safeRun(async () => {
      const existing = await db.languagePreferences.where("pilotId").equals(pilotId).first();
      if (existing?.id) {
        await db.languagePreferences.update(existing.id, { language, updatedAt: new Date() });
        return existing.id;
      }
      return db.languagePreferences.add({ pilotId, language, updatedAt: new Date() });
    });
  },
};

// ============================================================
// GOAL SERVICE
// ============================================================

export const goalService = {
  async getForPilot(pilotId: number): Promise<StorageResult<FlightPlanGoal[]>> {
    return safeRun(() =>
      db.flightPlanGoals
        .where("pilotId")
        .equals(pilotId)
        .reverse()
        .sortBy("createdAt")
    );
  },

  async create(goal: Omit<FlightPlanGoal, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.flightPlanGoals.add(goal));
  },

  async update(id: number, changes: Partial<FlightPlanGoal>): Promise<StorageResult<number>> {
    return safeRun(() => db.flightPlanGoals.update(id, { ...changes, updatedAt: new Date() }));
  },

  async delete(id: number): Promise<StorageResult<void>> {
    return safeRun(() => db.flightPlanGoals.delete(id));
  },
};

// ============================================================
// JOURNAL SERVICE
// ============================================================

export const journalService = {
  async getForPilot(pilotId: number): Promise<StorageResult<FlightLogEntry[]>> {
    return safeRun(() =>
      db.flightLogEntries
        .where("pilotId")
        .equals(pilotId)
        .reverse()
        .sortBy("createdAt")
    );
  },

  async create(entry: Omit<FlightLogEntry, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.flightLogEntries.add(entry));
  },

  async update(id: number, changes: Partial<FlightLogEntry>): Promise<StorageResult<number>> {
    return safeRun(() => db.flightLogEntries.update(id, { ...changes, updatedAt: new Date() }));
  },

  async delete(id: number): Promise<StorageResult<void>> {
    return safeRun(() => db.flightLogEntries.delete(id));
  },
};

// ============================================================
// REFLECTION SERVICE
// ============================================================

export const reflectionService = {
  async getForPilot(pilotId: number): Promise<StorageResult<Reflection[]>> {
    return safeRun(() =>
      db.reflections.where("pilotId").equals(pilotId).reverse().sortBy("createdAt")
    );
  },

  async create(reflection: Omit<Reflection, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.reflections.add(reflection));
  },
};

// ============================================================
// FUTURE ME SERVICE
// ============================================================

export const futureMeService = {
  async getVisionsForPilot(pilotId: number): Promise<StorageResult<FutureVision[]>> {
    return safeRun(() =>
      db.futureVisions.where("pilotId").equals(pilotId).sortBy("createdAt")
    );
  },

  async getMilestonesForPilot(pilotId: number): Promise<StorageResult<FutureMilestone[]>> {
    return safeRun(() =>
      db.futureMilestones.where("pilotId").equals(pilotId).sortBy("targetDate")
    );
  },

  async getLettersForPilot(pilotId: number): Promise<StorageResult<FutureLetter[]>> {
    return safeRun(() =>
      db.futureLetters.where("pilotId").equals(pilotId).sortBy("deliverAt")
    );
  },

  async createLetter(letter: Omit<FutureLetter, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.futureLetters.add(letter));
  },
};

// ============================================================
// ACHIEVEMENT SERVICE
// ============================================================

export const achievementService = {
  async getForPilot(pilotId: number): Promise<StorageResult<Achievement[]>> {
    return safeRun(() =>
      db.achievements.where("pilotId").equals(pilotId).reverse().sortBy("unlockedAt")
    );
  },

  async create(achievement: Omit<Achievement, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.achievements.add(achievement));
  },
};

// ============================================================
// HABIT SERVICE
// ============================================================

export const habitService = {
  async getForPilot(pilotId: number): Promise<StorageResult<Habit[]>> {
    return safeRun(() =>
      db.habits.where("pilotId").equals(pilotId).sortBy("createdAt")
    );
  },

  async create(habit: Omit<Habit, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.habits.add(habit));
  },

  async update(id: number, changes: Partial<Habit>): Promise<StorageResult<number>> {
    return safeRun(() => db.habits.update(id, { ...changes, updatedAt: new Date() }));
  },

  async logActivity(activity: Omit<HabitActivity, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.habitActivities.add(activity));
  },

  async getActivitiesForHabit(habitId: number): Promise<StorageResult<HabitActivity[]>> {
    return safeRun(() =>
      db.habitActivities.where("habitId").equals(habitId).reverse().sortBy("completedAt")
    );
  },
};

// ============================================================
// TIMELINE SERVICE
// ============================================================

export const timelineService = {
  async getForPilot(pilotId: number, limit = 50): Promise<StorageResult<TimelineEvent[]>> {
    return safeRun(() =>
      db.timelineEvents
        .where("pilotId")
        .equals(pilotId)
        .reverse()
        .limit(limit)
        .sortBy("occurredAt")
    );
  },

  async create(event: Omit<TimelineEvent, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.timelineEvents.add(event));
  },
};

// ============================================================
// CONTENT SERVICE (v0.1.1)
// ============================================================

export const contentService = {
  async getAll(): Promise<StorageResult<ContentItem[]>> {
    return safeRun(() => db.contentItems.orderBy("createdAt").toArray());
  },

  async getByCategory(category: ContentItem["category"]): Promise<StorageResult<ContentItem[]>> {
    return safeRun(() =>
      db.contentItems.where("category").equals(category).sortBy("createdAt")
    );
  },

  async getPublished(): Promise<StorageResult<ContentItem[]>> {
    return safeRun(() =>
      db.contentItems.where("status").equals("published").sortBy("createdAt")
    );
  },

  async getById(id: number): Promise<StorageResult<ContentItem | undefined>> {
    return safeRun(() => db.contentItems.get(id));
  },

  async create(item: Omit<ContentItem, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.contentItems.add(item));
  },

  async update(id: number, changes: Partial<ContentItem>): Promise<StorageResult<number>> {
    return safeRun(() => db.contentItems.update(id, { ...changes, updatedAt: new Date() }));
  },
};

// ============================================================
// LEARNING PATH SERVICE (v0.1.1)
// ============================================================

export const learningPathService = {
  async getAll(): Promise<StorageResult<LearningPath[]>> {
    return safeRun(() => db.learningPaths.orderBy("createdAt").toArray());
  },

  async getById(id: number): Promise<StorageResult<LearningPath | undefined>> {
    return safeRun(() => db.learningPaths.get(id));
  },

  async create(path: Omit<LearningPath, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.learningPaths.add(path));
  },

  async getSteps(learningPathId: number): Promise<StorageResult<LearningPathStep[]>> {
    return safeRun(() =>
      db.learningPathSteps
        .where("learningPathId")
        .equals(learningPathId)
        .sortBy("sequenceNumber")
    );
  },

  async addStep(step: Omit<LearningPathStep, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.learningPathSteps.add(step));
  },

  async getProgressForPilot(pilotId: number): Promise<StorageResult<PilotLearningPath[]>> {
    return safeRun(() =>
      db.pilotLearningPaths.where("pilotId").equals(pilotId).sortBy("createdAt")
    );
  },

  async enrollPilot(entry: Omit<PilotLearningPath, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.pilotLearningPaths.add(entry));
  },

  async updateProgress(
    id: number,
    changes: Partial<PilotLearningPath>
  ): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.pilotLearningPaths.update(id, { ...changes, updatedAt: new Date() })
    );
  },
};

// ============================================================
// PILOT SUBSCRIPTION SERVICE (v0.1.1 — SubscriptionPlan + PilotSubscription)
// ============================================================

export const pilotSubscriptionService = {
  async getPlans(): Promise<StorageResult<SubscriptionPlan[]>> {
    return safeRun(() => db.subscriptionPlans.orderBy("name").toArray());
  },

  async createPlan(plan: Omit<SubscriptionPlan, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.subscriptionPlans.add(plan));
  },

  async getForPilot(pilotId: number): Promise<StorageResult<PilotSubscription | undefined>> {
    return safeRun(() =>
      db.pilotSubscriptions.where("pilotId").equals(pilotId).first()
    );
  },

  async subscribe(sub: Omit<PilotSubscription, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.pilotSubscriptions.add(sub));
  },

  async updateStatus(
    id: number,
    status: PilotSubscription["status"]
  ): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.pilotSubscriptions.update(id, { status, updatedAt: new Date() })
    );
  },
};

// ============================================================
// BADGE & CERTIFICATE SERVICE (v0.1.1)
// ============================================================

export const badgeService = {
  async getAll(): Promise<StorageResult<Badge[]>> {
    return safeRun(() => db.badges.orderBy("createdAt").toArray());
  },

  async getForAchievement(achievementId: number): Promise<StorageResult<Badge[]>> {
    return safeRun(() =>
      db.badges.where("achievementId").equals(achievementId).toArray()
    );
  },

  async create(badge: Omit<Badge, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.badges.add(badge));
  },
};

export const certificateService = {
  async getAll(): Promise<StorageResult<Certificate[]>> {
    return safeRun(() => db.certificates.orderBy("createdAt").toArray());
  },

  async getForAchievement(achievementId: number): Promise<StorageResult<Certificate[]>> {
    return safeRun(() =>
      db.certificates.where("achievementId").equals(achievementId).toArray()
    );
  },

  async create(cert: Omit<Certificate, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.certificates.add(cert));
  },
};

// ============================================================
// FAMILY CHALLENGE SERVICE (v0.1.1)
// ============================================================

export const familyChallengeService = {
  async getAll(): Promise<StorageResult<FamilyChallenge[]>> {
    return safeRun(() => db.familyChallenges.orderBy("createdAt").toArray());
  },

  async getActive(): Promise<StorageResult<FamilyChallenge[]>> {
    return safeRun(() =>
      db.familyChallenges.where("isActive").equals(1).sortBy("createdAt")
    );
  },

  async create(challenge: Omit<FamilyChallenge, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.familyChallenges.add(challenge));
  },

  async getParticipants(
    challengeId: number
  ): Promise<StorageResult<FamilyChallengeParticipant[]>> {
    return safeRun(() =>
      db.familyChallengeParticipants
        .where("challengeId")
        .equals(challengeId)
        .sortBy("joinedAt")
    );
  },

  async addParticipant(
    participant: Omit<FamilyChallengeParticipant, "id">
  ): Promise<StorageResult<number>> {
    return safeRun(() => db.familyChallengeParticipants.add(participant));
  },
};

// ============================================================
// SCHOOL SERVICE (v0.1.1)
// ============================================================

export const schoolService = {
  async getAll(): Promise<StorageResult<School[]>> {
    return safeRun(() => db.schools.orderBy("name").toArray());
  },

  async getById(id: number): Promise<StorageResult<School | undefined>> {
    return safeRun(() => db.schools.get(id));
  },

  async create(school: Omit<School, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.schools.add(school));
  },

  async getTeachers(schoolId: number): Promise<StorageResult<Teacher[]>> {
    return safeRun(() =>
      db.teachers.where("schoolId").equals(schoolId).sortBy("name")
    );
  },

  async createTeacher(teacher: Omit<Teacher, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.teachers.add(teacher));
  },

  async getClassrooms(schoolId: number): Promise<StorageResult<Classroom[]>> {
    return safeRun(() =>
      db.classrooms.where("schoolId").equals(schoolId).sortBy("name")
    );
  },

  async createClassroom(classroom: Omit<Classroom, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.classrooms.add(classroom));
  },

  async getPrograms(schoolId: number): Promise<StorageResult<Program[]>> {
    return safeRun(() =>
      db.programs.where("schoolId").equals(schoolId).sortBy("title")
    );
  },

  async createProgram(program: Omit<Program, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.programs.add(program));
  },

  async getEnrollmentsForPilot(pilotId: number): Promise<StorageResult<Enrollment[]>> {
    return safeRun(() =>
      db.enrollments.where("pilotId").equals(pilotId).sortBy("enrolledAt")
    );
  },

  async enroll(enrollment: Omit<Enrollment, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.enrollments.add(enrollment));
  },

  async getParticipationsForPilot(pilotId: number): Promise<StorageResult<Participation[]>> {
    return safeRun(() =>
      db.participations.where("pilotId").equals(pilotId).sortBy("joinedAt")
    );
  },

  async participate(participation: Omit<Participation, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.participations.add(participation));
  },
};

// ============================================================
// TENANT SERVICE (v0.1.1)
// ============================================================

export const tenantService = {
  async getAll(): Promise<StorageResult<Tenant[]>> {
    return safeRun(() => db.tenants.orderBy("name").toArray());
  },

  async getById(id: number): Promise<StorageResult<Tenant | undefined>> {
    return safeRun(() => db.tenants.get(id));
  },

  async create(tenant: Omit<Tenant, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.tenants.add(tenant));
  },

  async getOrganizations(tenantId: number): Promise<StorageResult<Organization[]>> {
    return safeRun(() =>
      db.organizations.where("tenantId").equals(tenantId).sortBy("name")
    );
  },

  async createOrganization(org: Omit<Organization, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.organizations.add(org));
  },

  async getDeployments(tenantId: number): Promise<StorageResult<Deployment[]>> {
    return safeRun(() =>
      db.deployments.where("tenantId").equals(tenantId).sortBy("createdAt")
    );
  },

  async createDeployment(dep: Omit<Deployment, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.deployments.add(dep));
  },
};

// NOTE: AI Domain (AIConversation, AIRecommendation, AIInsight) is RESERVED.
// Tables are registered in the database schema for future use.
// No service layer is intentionally provided until AI integration is scoped.

// ============================================================
// ACTIVITY EVENT SERVICE (v0.1.2)
// ============================================================

export const activityEventService = {
  async log(event: Omit<ActivityEvent, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.activityEvents.add(event));
  },

  async getForPilot(
    pilotId: number,
    limit = 100
  ): Promise<StorageResult<ActivityEvent[]>> {
    return safeRun(() =>
      db.activityEvents
        .where("pilotId")
        .equals(pilotId)
        .reverse()
        .limit(limit)
        .sortBy("createdAt")
    );
  },

  async getByType(
    pilotId: number,
    eventType: ActivityEventType
  ): Promise<StorageResult<ActivityEvent[]>> {
    return safeRun(() =>
      db.activityEvents
        .where("[pilotId+eventType]")
        .equals([pilotId, eventType])
        .reverse()
        .sortBy("createdAt")
    );
  },
};

// ============================================================
// NOTIFICATION SERVICE (v0.1.2)
// ============================================================

export const notificationService = {
  async getForPilot(pilotId: number): Promise<StorageResult<Notification[]>> {
    return safeRun(() =>
      db.notifications.where("pilotId").equals(pilotId).reverse().sortBy("scheduledAt")
    );
  },

  async getPending(pilotId: number): Promise<StorageResult<Notification[]>> {
    return safeRun(() =>
      db.notifications
        .where("pilotId")
        .equals(pilotId)
        .filter((n) => n.status === "scheduled" || n.status === "delivered")
        .sortBy("scheduledAt")
    );
  },

  async schedule(notification: Omit<Notification, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.notifications.add(notification));
  },

  async markRead(id: number): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.notifications.update(id, { status: "read", readAt: new Date() })
    );
  },

  async dismiss(id: number): Promise<StorageResult<number>> {
    return safeRun(() => db.notifications.update(id, { status: "dismissed" }));
  },
};

// ============================================================
// CAREER ROADMAP SERVICE (v0.1.2)
// ============================================================

export const careerRoadmapService = {
  async getForCareer(careerId: number): Promise<StorageResult<CareerRoadmap[]>> {
    return safeRun(() =>
      db.careerRoadmaps.where("careerId").equals(careerId).sortBy("createdAt")
    );
  },

  async getById(id: number): Promise<StorageResult<CareerRoadmap | undefined>> {
    return safeRun(() => db.careerRoadmaps.get(id));
  },

  async create(roadmap: Omit<CareerRoadmap, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.careerRoadmaps.add(roadmap));
  },

  async getSteps(roadmapId: number): Promise<StorageResult<CareerRoadmapStep[]>> {
    return safeRun(() =>
      db.careerRoadmapSteps.where("roadmapId").equals(roadmapId).sortBy("order")
    );
  },

  async addStep(step: Omit<CareerRoadmapStep, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.careerRoadmapSteps.add(step));
  },
};

// ============================================================
// COMPETENCY CATALOG SERVICE (v0.1.2)
// ============================================================

export const competencyCatalogService = {
  async getAll(): Promise<StorageResult<CompetencyCatalog[]>> {
    return safeRun(() => db.competencyCatalog.orderBy("name").toArray());
  },

  async getByCategory(category: string): Promise<StorageResult<CompetencyCatalog[]>> {
    return safeRun(() =>
      db.competencyCatalog.where("category").equals(category).sortBy("name")
    );
  },

  async create(entry: Omit<CompetencyCatalog, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.competencyCatalog.add(entry));
  },

  async getPilotCompetencies(pilotId: number): Promise<StorageResult<PilotCompetency[]>> {
    return safeRun(() =>
      db.pilotCompetencies.where("pilotId").equals(pilotId).sortBy("createdAt")
    );
  },

  async adopt(entry: Omit<PilotCompetency, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.pilotCompetencies.add(entry));
  },

  async updateLevel(
    id: number,
    changes: Pick<PilotCompetency, "currentLevel" | "targetLevel">
  ): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.pilotCompetencies.update(id, { ...changes, updatedAt: new Date() })
    );
  },
};

// ============================================================
// VALUE CATALOG SERVICE (v0.1.2)
// ============================================================

export const valueCatalogService = {
  async getAll(): Promise<StorageResult<ValueCatalog[]>> {
    return safeRun(() => db.valueCatalog.orderBy("name").toArray());
  },

  async getByCategory(category: string): Promise<StorageResult<ValueCatalog[]>> {
    return safeRun(() =>
      db.valueCatalog.where("category").equals(category).sortBy("name")
    );
  },

  async create(entry: Omit<ValueCatalog, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.valueCatalog.add(entry));
  },

  async getPilotValues(pilotId: number): Promise<StorageResult<PilotValue[]>> {
    return safeRun(() =>
      db.pilotValues
        .where("pilotId")
        .equals(pilotId)
        .reverse()
        .sortBy("importance")
    );
  },

  async adopt(entry: Omit<PilotValue, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.pilotValues.add(entry));
  },

  async updateImportance(id: number, importance: number): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.pilotValues.update(id, { importance, updatedAt: new Date() })
    );
  },
};

// ============================================================
// CONTENT REVISION SERVICE (v0.1.2)
// ============================================================

export const contentRevisionService = {
  async getForContent(contentId: number): Promise<StorageResult<ContentRevision[]>> {
    return safeRun(() =>
      db.contentRevisions
        .where("contentId")
        .equals(contentId)
        .reverse()
        .sortBy("version")
    );
  },

  async create(revision: Omit<ContentRevision, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.contentRevisions.add(revision));
  },

  async getLatest(contentId: number): Promise<StorageResult<ContentRevision | undefined>> {
    return safeRun(async () => {
      const revisions = await db.contentRevisions
        .where("contentId")
        .equals(contentId)
        .reverse()
        .sortBy("version");
      return revisions[0];
    });
  },
};

// ============================================================
// PILOT IDENTITY SERVICE (v0.1.3)
// ============================================================

export const pilotIdentityService = {
  async get(pilotId: number): Promise<StorageResult<PilotIdentity | undefined>> {
    return safeRun(async () => {
      const results = await db.pilotIdentity.where("pilotId").equals(pilotId).toArray();
      return results[0];
    });
  },

  async upsert(identity: Omit<PilotIdentity, "id">): Promise<StorageResult<number>> {
    return safeRun(async () => {
      const existing = await db.pilotIdentity
        .where("pilotId")
        .equals(identity.pilotId)
        .first();
      if (existing?.id !== undefined) {
        await db.pilotIdentity.update(existing.id, { ...identity, lastUpdated: new Date() });
        return existing.id;
      }
      return db.pilotIdentity.add({ ...identity, lastUpdated: new Date() });
    });
  },
};

// ============================================================
// LIFE EXPERIENCE SERVICE (v0.1.3)
// ============================================================

export const lifeExperienceService = {
  async getForPilot(pilotId: number): Promise<StorageResult<LifeExperience[]>> {
    return safeRun(() =>
      db.lifeExperiences
        .where("pilotId")
        .equals(pilotId)
        .reverse()
        .sortBy("experienceDate")
    );
  },

  async getForChapter(chapterId: number): Promise<StorageResult<LifeExperience[]>> {
    return safeRun(() =>
      db.lifeExperiences.where("chapterId").equals(chapterId).sortBy("experienceDate")
    );
  },

  async getByCategory(
    pilotId: number,
    category: LifeExperience["category"]
  ): Promise<StorageResult<LifeExperience[]>> {
    return safeRun(() =>
      db.lifeExperiences
        .where("pilotId")
        .equals(pilotId)
        .filter((e) => e.category === category)
        .sortBy("experienceDate")
    );
  },

  async create(experience: Omit<LifeExperience, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.lifeExperiences.add(experience));
  },

  async update(
    id: number,
    changes: Partial<Omit<LifeExperience, "id" | "pilotId">>
  ): Promise<StorageResult<number>> {
    return safeRun(() => db.lifeExperiences.update(id, changes));
  },
};

// ============================================================
// LIFE CHAPTER SERVICE (v0.1.3)
// ============================================================

export const lifeChapterService = {
  async getForPilot(pilotId: number): Promise<StorageResult<LifeChapter[]>> {
    return safeRun(() =>
      db.lifeChapters.where("pilotId").equals(pilotId).sortBy("startDate")
    );
  },

  async getById(id: number): Promise<StorageResult<LifeChapter | undefined>> {
    return safeRun(() => db.lifeChapters.get(id));
  },

  async create(chapter: Omit<LifeChapter, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.lifeChapters.add(chapter));
  },

  async close(id: number, endDate: Date): Promise<StorageResult<number>> {
    return safeRun(() => db.lifeChapters.update(id, { endDate }));
  },
};

// ============================================================
// DECISION RECORD SERVICE (v0.1.3)
// ============================================================

export const decisionRecordService = {
  async getForPilot(pilotId: number): Promise<StorageResult<DecisionRecord[]>> {
    return safeRun(() =>
      db.decisionRecords
        .where("pilotId")
        .equals(pilotId)
        .reverse()
        .sortBy("decisionDate")
    );
  },

  async getById(id: number): Promise<StorageResult<DecisionRecord | undefined>> {
    return safeRun(() => db.decisionRecords.get(id));
  },

  async create(record: Omit<DecisionRecord, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.decisionRecords.add(record));
  },

  async addReflection(id: number, reflection: string): Promise<StorageResult<number>> {
    return safeRun(() => db.decisionRecords.update(id, { reflection }));
  },
};

// ============================================================
// RELATIONSHIP REFLECTION SERVICE (v0.1.3)
// ============================================================

export const relationshipReflectionService = {
  async getForPilot(pilotId: number): Promise<StorageResult<RelationshipReflection[]>> {
    return safeRun(() =>
      db.relationshipReflections
        .where("pilotId")
        .equals(pilotId)
        .reverse()
        .sortBy("createdAt")
    );
  },

  async getByCategory(
    pilotId: number,
    category: RelationshipReflection["category"]
  ): Promise<StorageResult<RelationshipReflection[]>> {
    return safeRun(() =>
      db.relationshipReflections
        .where("pilotId")
        .equals(pilotId)
        .filter((r) => r.category === category)
        .sortBy("createdAt")
    );
  },

  async create(
    reflection: Omit<RelationshipReflection, "id">
  ): Promise<StorageResult<number>> {
    return safeRun(() => db.relationshipReflections.add(reflection));
  },
};

// ============================================================
// STRENGTH CATALOG SERVICE (v0.1.3)
// ============================================================

export const strengthCatalogService = {
  async getAll(): Promise<StorageResult<StrengthCatalog[]>> {
    return safeRun(() => db.strengthCatalog.orderBy("name").toArray());
  },

  async getByCategory(category: string): Promise<StorageResult<StrengthCatalog[]>> {
    return safeRun(() =>
      db.strengthCatalog.where("category").equals(category).sortBy("name")
    );
  },

  async create(entry: Omit<StrengthCatalog, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.strengthCatalog.add(entry));
  },

  async getPilotStrengths(pilotId: number): Promise<StorageResult<PilotStrength[]>> {
    return safeRun(() =>
      db.pilotStrengths.where("pilotId").equals(pilotId).sortBy("createdAt")
    );
  },

  async adopt(entry: Omit<PilotStrength, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.pilotStrengths.add(entry));
  },

  async updateConfidence(
    id: number,
    confidenceLevel: number,
    evidence?: string
  ): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.pilotStrengths.update(id, { confidenceLevel, evidence, updatedAt: new Date() })
    );
  },
};

// ============================================================
// PURPOSE STATEMENT SERVICE (v0.1.3)
// ============================================================

export const purposeStatementService = {
  async getForPilot(pilotId: number): Promise<StorageResult<PurposeStatement[]>> {
    return safeRun(() =>
      db.purposeStatements
        .where("pilotId")
        .equals(pilotId)
        .reverse()
        .sortBy("version")
    );
  },

  async getCurrent(pilotId: number): Promise<StorageResult<PurposeStatement | undefined>> {
    return safeRun(async () => {
      const all = await db.purposeStatements
        .where("pilotId")
        .equals(pilotId)
        .reverse()
        .sortBy("version");
      return all[0];
    });
  },

  async create(statement: Omit<PurposeStatement, "id">): Promise<StorageResult<number>> {
    return safeRun(async () => {
      const existing = await db.purposeStatements
        .where("pilotId")
        .equals(statement.pilotId)
        .count();
      return db.purposeStatements.add({ ...statement, version: existing + 1 });
    });
  },
};

// ============================================================
// IMPACT EVIDENCE SERVICE (v0.1.3)
// ============================================================

export const impactEvidenceService = {
  async getForPilot(pilotId: number): Promise<StorageResult<ImpactEvidence[]>> {
    return safeRun(() =>
      db.impactEvidence
        .where("pilotId")
        .equals(pilotId)
        .reverse()
        .sortBy("createdAt")
    );
  },

  async getForMission(missionId: number): Promise<StorageResult<ImpactEvidence[]>> {
    return safeRun(() =>
      db.impactEvidence.where("missionId").equals(missionId).sortBy("createdAt")
    );
  },

  async getByType(
    pilotId: number,
    impactType: ImpactEvidence["impactType"]
  ): Promise<StorageResult<ImpactEvidence[]>> {
    return safeRun(() =>
      db.impactEvidence
        .where("pilotId")
        .equals(pilotId)
        .filter((e) => e.impactType === impactType)
        .sortBy("createdAt")
    );
  },

  async create(evidence: Omit<ImpactEvidence, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.impactEvidence.add(evidence));
  },
};

// ============================================================
// FUTURE IDENTITY SERVICE (v0.1.3)
// ============================================================

export const futureIdentityService = {
  async getForPilot(pilotId: number): Promise<StorageResult<FutureIdentity[]>> {
    return safeRun(() =>
      db.futureIdentities.where("pilotId").equals(pilotId).sortBy("targetAge")
    );
  },

  async getById(id: number): Promise<StorageResult<FutureIdentity | undefined>> {
    return safeRun(() => db.futureIdentities.get(id));
  },

  async create(identity: Omit<FutureIdentity, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.futureIdentities.add(identity));
  },

  async update(
    id: number,
    changes: Partial<Omit<FutureIdentity, "id" | "pilotId">>
  ): Promise<StorageResult<number>> {
    return safeRun(() => db.futureIdentities.update(id, changes));
  },
};

// ============================================================
// LIFE WHEEL SERVICE (v0.1.3)
// ============================================================

export const lifeWheelService = {
  async getForPilot(pilotId: number): Promise<StorageResult<LifeWheelSnapshot[]>> {
    return safeRun(() =>
      db.lifeWheelSnapshots.where("pilotId").equals(pilotId).sortBy("snapshotDate")
    );
  },

  async getLatest(pilotId: number): Promise<StorageResult<LifeWheelSnapshot | undefined>> {
    return safeRun(async () => {
      const all = await db.lifeWheelSnapshots
        .where("pilotId")
        .equals(pilotId)
        .reverse()
        .sortBy("snapshotDate");
      return all[0];
    });
  },

  async record(snapshot: Omit<LifeWheelSnapshot, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.lifeWheelSnapshots.add(snapshot));
  },
};

// ============================================================
// SCENARIO SERVICE (v0.1.4)
// ============================================================

export const scenarioService = {
  async getAll(): Promise<StorageResult<Scenario[]>> {
    return safeRun(() => db.scenarios.orderBy("createdAt").toArray());
  },

  async getPublished(): Promise<StorageResult<Scenario[]>> {
    return safeRun(() =>
      db.scenarios.where("status").equals("published").sortBy("category")
    );
  },

  async getByCategory(category: Scenario["category"]): Promise<StorageResult<Scenario[]>> {
    return safeRun(() =>
      db.scenarios.where("category").equals(category).toArray()
    );
  },

  async getByAgeGroup(ageGroup: string): Promise<StorageResult<Scenario[]>> {
    return safeRun(() =>
      db.scenarios.where("ageGroup").equals(ageGroup).toArray()
    );
  },

  async getById(id: number): Promise<StorageResult<Scenario | undefined>> {
    return safeRun(() => db.scenarios.get(id));
  },

  async create(scenario: Omit<Scenario, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.scenarios.add(scenario));
  },

  async update(
    id: number,
    changes: Partial<Omit<Scenario, "id">>
  ): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.scenarios.update(id, { ...changes, updatedAt: new Date() })
    );
  },
};

// ============================================================
// SCENARIO CHOICE SERVICE (v0.1.4)
// ============================================================

export const scenarioChoiceService = {
  async getForScenario(scenarioId: number): Promise<StorageResult<ScenarioChoice[]>> {
    return safeRun(() =>
      db.scenarioChoices.where("scenarioId").equals(scenarioId).sortBy("displayOrder")
    );
  },

  async create(choice: Omit<ScenarioChoice, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.scenarioChoices.add(choice));
  },
};

// ============================================================
// CHOICE CONSEQUENCE SERVICE (v0.1.4)
// ============================================================

export const choiceConsequenceService = {
  async getForChoice(choiceId: number): Promise<StorageResult<ChoiceConsequence[]>> {
    return safeRun(() =>
      db.choiceConsequences.where("choiceId").equals(choiceId).sortBy("createdAt")
    );
  },

  async create(consequence: Omit<ChoiceConsequence, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.choiceConsequences.add(consequence));
  },
};

// ============================================================
// LIFE STATE SERVICE (v0.1.4)
// ============================================================

export const lifeStateService = {
  /** Get the current LifeState for a pilot (1:1 — returns the single record) */
  async get(pilotId: number): Promise<StorageResult<LifeState | undefined>> {
    return safeRun(() =>
      db.lifeState.where("pilotId").equals(pilotId).first()
    );
  },

  /** Initialise a LifeState with all dimensions at 50 */
  async initialise(pilotId: number): Promise<StorageResult<number>> {
    const initial: Omit<LifeState, "id"> = {
      pilotId,
      financialConfidence: 50,
      relationshipHealth: 50,
      resilience: 50,
      leadership: 50,
      careerAwareness: 50,
      decisionMaking: 50,
      emotionalAwareness: 50,
      healthAwareness: 50,
      ethicalReasoning: 50,
      communityContribution: 50,
      updatedAt: new Date(),
    };
    return safeRun(() => db.lifeState.add(initial));
  },

  /** Apply a delta to a single LifeState attribute — clamps result to 0–100 */
  async applyTransition(
    pilotId: number,
    attributeName: LifeStateTransition["attributeName"],
    changeValue: number
  ): Promise<StorageResult<number>> {
    return safeRun(async () => {
      const state = await db.lifeState.where("pilotId").equals(pilotId).first();
      if (!state || state.id === undefined) throw new Error("LifeState not found for pilot");
      const current = state[attributeName] as number;
      const updated = Math.min(100, Math.max(0, current + changeValue));
      return db.lifeState.update(state.id, {
        [attributeName]: updated,
        updatedAt: new Date(),
      });
    });
  },
};

// ============================================================
// LIFE STATE TRANSITION SERVICE (v0.1.4)
// ============================================================

export const lifeStateTransitionService = {
  async getForConsequence(
    consequenceId: number
  ): Promise<StorageResult<LifeStateTransition[]>> {
    return safeRun(() =>
      db.lifeStateTransitions.where("consequenceId").equals(consequenceId).toArray()
    );
  },

  async create(
    transition: Omit<LifeStateTransition, "id">
  ): Promise<StorageResult<number>> {
    return safeRun(() => db.lifeStateTransitions.add(transition));
  },
};

// ============================================================
// PILOT SCENARIO PLAY SERVICE (v0.1.4)
// ============================================================

export const pilotScenarioPlayService = {
  async getForPilot(pilotId: number): Promise<StorageResult<PilotScenarioPlay[]>> {
    return safeRun(() =>
      db.pilotScenarioPlays.where("pilotId").equals(pilotId).sortBy("playStartedAt")
    );
  },

  async getForScenario(
    pilotId: number,
    scenarioId: number
  ): Promise<StorageResult<PilotScenarioPlay[]>> {
    return safeRun(() =>
      db.pilotScenarioPlays
        .where("pilotId")
        .equals(pilotId)
        .filter((p) => p.scenarioId === scenarioId)
        .sortBy("playStartedAt")
    );
  },

  async getById(id: number): Promise<StorageResult<PilotScenarioPlay | undefined>> {
    return safeRun(() => db.pilotScenarioPlays.get(id));
  },

  async create(play: Omit<PilotScenarioPlay, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.pilotScenarioPlays.add(play));
  },

  async complete(id: number): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.pilotScenarioPlays.update(id, { playCompletedAt: new Date() })
    );
  },
};

// ============================================================
// SCENARIO REFLECTION SERVICE (v0.1.4)
// ============================================================

export const scenarioReflectionService = {
  async getForPlay(playId: number): Promise<StorageResult<ScenarioReflection | undefined>> {
    return safeRun(() =>
      db.scenarioReflections.where("playId").equals(playId).first()
    );
  },

  async create(
    reflection: Omit<ScenarioReflection, "id">
  ): Promise<StorageResult<number>> {
    return safeRun(() => db.scenarioReflections.add(reflection));
  },
};

// ============================================================
// SCENARIO REWARD SERVICE (v0.1.4)
// ============================================================

export const scenarioRewardService = {
  async getForScenario(scenarioId: number): Promise<StorageResult<ScenarioReward[]>> {
    return safeRun(() =>
      db.scenarioRewards.where("scenarioId").equals(scenarioId).toArray()
    );
  },

  async create(reward: Omit<ScenarioReward, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.scenarioRewards.add(reward));
  },
};

// ============================================================
// SCENARIO OUTCOME PATH SERVICE (v0.1.4)
// ============================================================

export const scenarioOutcomePathService = {
  async getForScenario(scenarioId: number): Promise<StorageResult<ScenarioOutcomePath[]>> {
    return safeRun(() =>
      db.scenarioOutcomePaths.where("scenarioId").equals(scenarioId).toArray()
    );
  },

  async create(path: Omit<ScenarioOutcomePath, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.scenarioOutcomePaths.add(path));
  },
};

// ============================================================
// SCENARIO PREREQUISITE SERVICE (v0.1.4)
// ============================================================

export const scenarioPrerequisiteService = {
  async getForScenario(scenarioId: number): Promise<StorageResult<ScenarioPrerequisite[]>> {
    return safeRun(() =>
      db.scenarioPrerequisites.where("scenarioId").equals(scenarioId).toArray()
    );
  },

  async create(
    prerequisite: Omit<ScenarioPrerequisite, "id">
  ): Promise<StorageResult<number>> {
    return safeRun(() => db.scenarioPrerequisites.add(prerequisite));
  },

  /** Check if a pilot meets all prerequisites for a scenario */
  async checkEligibility(
    pilotId: number,
    scenarioId: number
  ): Promise<StorageResult<boolean>> {
    return safeRun(async () => {
      const prereqs = await db.scenarioPrerequisites
        .where("scenarioId")
        .equals(scenarioId)
        .toArray();

      if (prereqs.length === 0) return true;

      for (const prereq of prereqs) {
        if (prereq.requiredScenarioId !== undefined) {
          const played = await db.pilotScenarioPlays
            .where("pilotId")
            .equals(pilotId)
            .filter(
              (p) =>
                p.scenarioId === prereq.requiredScenarioId &&
                p.playCompletedAt !== undefined
            )
            .first();
          if (!played) return false;
        }

        if (
          prereq.requiredLifeStateAttribute !== undefined &&
          prereq.requiredValue !== undefined
        ) {
          const state = await db.lifeState
            .where("pilotId")
            .equals(pilotId)
            .first();
          if (!state) return false;
          const attr = state[prereq.requiredLifeStateAttribute as keyof LifeState];
          if (typeof attr !== "number" || attr < prereq.requiredValue) return false;
        }
      }

      return true;
    });
  },
};

// ============================================================
// SCENARIO UNLOCK SERVICE (v0.1.4)
// ============================================================

export const scenarioUnlockService = {
  async getUnlockedBy(
    sourceScenarioId: number,
    sourceChoiceId: number
  ): Promise<StorageResult<ScenarioUnlock[]>> {
    return safeRun(() =>
      db.scenarioUnlocks
        .where("sourceScenarioId")
        .equals(sourceScenarioId)
        .filter((u) => u.sourceChoiceId === sourceChoiceId)
        .toArray()
    );
  },

  async create(unlock: Omit<ScenarioUnlock, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.scenarioUnlocks.add(unlock));
  },
};

// ============================================================
// SIMULATION CAMPAIGN SERVICE (v0.1.4)
// ============================================================

export const simulationCampaignService = {
  async getAll(): Promise<StorageResult<SimulationCampaign[]>> {
    return safeRun(() => db.simulationCampaigns.orderBy("title").toArray());
  },

  async getByCategory(
    category: SimulationCampaign["category"]
  ): Promise<StorageResult<SimulationCampaign[]>> {
    return safeRun(() =>
      db.simulationCampaigns.where("category").equals(category).toArray()
    );
  },

  async getById(id: number): Promise<StorageResult<SimulationCampaign | undefined>> {
    return safeRun(() => db.simulationCampaigns.get(id));
  },

  async create(campaign: Omit<SimulationCampaign, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.simulationCampaigns.add(campaign));
  },

  async getScenarios(campaignId: number): Promise<StorageResult<CampaignScenario[]>> {
    return safeRun(() =>
      db.campaignScenarios
        .where("campaignId")
        .equals(campaignId)
        .sortBy("sequenceNumber")
    );
  },

  async addScenario(
    entry: Omit<CampaignScenario, "id">
  ): Promise<StorageResult<number>> {
    return safeRun(() => db.campaignScenarios.add(entry));
  },
};

// ============================================================
// CHARACTER SERVICE (v0.1.5)
// ============================================================

export const characterService = {
  async getAll(): Promise<StorageResult<Character[]>> {
    return safeRun(() => db.characters.orderBy("name").toArray());
  },

  async getSystemCharacters(): Promise<StorageResult<Character[]>> {
    return safeRun(() =>
      db.characters.where("isSystemCharacter").equals(1).toArray()
    );
  },

  async getByRole(role: Character["role"]): Promise<StorageResult<Character[]>> {
    return safeRun(() =>
      db.characters.where("role").equals(role).toArray()
    );
  },

  async getById(id: number): Promise<StorageResult<Character | undefined>> {
    return safeRun(() => db.characters.get(id));
  },

  async create(character: Omit<Character, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.characters.add(character));
  },

  async update(
    id: number,
    changes: Partial<Omit<Character, "id">>
  ): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.characters.update(id, { ...changes, updatedAt: new Date() })
    );
  },
};

// ============================================================
// VOICE PROFILE SERVICE (v0.1.5)
// ============================================================

export const voiceProfileService = {
  async getAll(): Promise<StorageResult<VoiceProfile[]>> {
    return safeRun(() => db.voiceProfiles.orderBy("name").toArray());
  },

  async getByLanguage(language: string): Promise<StorageResult<VoiceProfile[]>> {
    return safeRun(() =>
      db.voiceProfiles.where("language").equals(language).toArray()
    );
  },

  async getById(id: number): Promise<StorageResult<VoiceProfile | undefined>> {
    return safeRun(() => db.voiceProfiles.get(id));
  },

  async create(profile: Omit<VoiceProfile, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.voiceProfiles.add(profile));
  },
};

// ============================================================
// FUTURE CHARACTER SERVICE (v0.1.5)
// ============================================================

export const futureCharacterService = {
  async getForPilot(pilotId: number): Promise<StorageResult<FutureCharacter[]>> {
    return safeRun(() =>
      db.futureCharacters.where("pilotId").equals(pilotId).sortBy("futureAge")
    );
  },

  async getById(id: number): Promise<StorageResult<FutureCharacter | undefined>> {
    return safeRun(() => db.futureCharacters.get(id));
  },

  async create(fc: Omit<FutureCharacter, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.futureCharacters.add(fc));
  },
};

// ============================================================
// STORY ARC SERVICE (v0.1.5)
// ============================================================

export const storyArcService = {
  async getAll(): Promise<StorageResult<StoryArc[]>> {
    return safeRun(() => db.storyArcs.orderBy("title").toArray());
  },

  async getByCategory(category: StoryArc["category"]): Promise<StorageResult<StoryArc[]>> {
    return safeRun(() =>
      db.storyArcs.where("category").equals(category).toArray()
    );
  },

  async getById(id: number): Promise<StorageResult<StoryArc | undefined>> {
    return safeRun(() => db.storyArcs.get(id));
  },

  async create(arc: Omit<StoryArc, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.storyArcs.add(arc));
  },

  async getChapters(storyArcId: number): Promise<StorageResult<StoryChapter[]>> {
    return safeRun(() =>
      db.storyChapters
        .where("storyArcId")
        .equals(storyArcId)
        .sortBy("sequenceNumber")
    );
  },

  async addChapter(chapter: Omit<StoryChapter, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.storyChapters.add(chapter));
  },
};

// ============================================================
// DIALOGUE SERVICE (v0.1.5)
// ============================================================

export const dialogueService = {
  /** Get all dialogue nodes for a scenario, ordered by displayOrder */
  async getNodesForScenario(scenarioId: number): Promise<StorageResult<DialogueNode[]>> {
    return safeRun(() =>
      db.dialogueNodes
        .where("scenarioId")
        .equals(scenarioId)
        .sortBy("displayOrder")
    );
  },

  /** Get all dialogue nodes for a story chapter */
  async getNodesForChapter(chapterId: number): Promise<StorageResult<DialogueNode[]>> {
    return safeRun(() =>
      db.dialogueNodes
        .where("chapterId")
        .equals(chapterId)
        .sortBy("displayOrder")
    );
  },

  async getNodeById(id: number): Promise<StorageResult<DialogueNode | undefined>> {
    return safeRun(() => db.dialogueNodes.get(id));
  },

  async createNode(node: Omit<DialogueNode, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.dialogueNodes.add(node));
  },

  /** Get all player choice options for a dialogue node */
  async getChoicesForNode(dialogueNodeId: number): Promise<StorageResult<DialogueChoice[]>> {
    return safeRun(() =>
      db.dialogueChoices.where("dialogueNodeId").equals(dialogueNodeId).toArray()
    );
  },

  async createChoice(choice: Omit<DialogueChoice, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.dialogueChoices.add(choice));
  },
};

// ============================================================
// CONVERSATION SESSION SERVICE (v0.1.5)
// ============================================================

export const conversationSessionService = {
  async getForPilot(pilotId: number): Promise<StorageResult<ConversationSession[]>> {
    return safeRun(() =>
      db.conversationSessions.where("pilotId").equals(pilotId).sortBy("startedAt")
    );
  },

  async getForCharacter(
    pilotId: number,
    characterId: number
  ): Promise<StorageResult<ConversationSession[]>> {
    return safeRun(() =>
      db.conversationSessions
        .where("pilotId")
        .equals(pilotId)
        .filter((s) => s.characterId === characterId)
        .sortBy("startedAt")
    );
  },

  async getByType(
    pilotId: number,
    type: ConversationType
  ): Promise<StorageResult<ConversationSession[]>> {
    return safeRun(() =>
      db.conversationSessions
        .where("pilotId")
        .equals(pilotId)
        .filter((s) => s.conversationType === type)
        .sortBy("startedAt")
    );
  },

  async getById(id: number): Promise<StorageResult<ConversationSession | undefined>> {
    return safeRun(() => db.conversationSessions.get(id));
  },

  async start(session: Omit<ConversationSession, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.conversationSessions.add(session));
  },

  async end(id: number): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.conversationSessions.update(id, { endedAt: new Date() })
    );
  },
};

// ============================================================
// CHARACTER RELATIONSHIP SERVICE (v0.1.5)
// ============================================================

export const characterRelationshipService = {
  /** Get or initialise the relationship between a pilot and a character */
  async get(
    pilotId: number,
    characterId: number
  ): Promise<StorageResult<CharacterRelationship | undefined>> {
    return safeRun(() =>
      db.characterRelationships
        .where("pilotId")
        .equals(pilotId)
        .filter((r) => r.characterId === characterId)
        .first()
    );
  },

  async getAllForPilot(pilotId: number): Promise<StorageResult<CharacterRelationship[]>> {
    return safeRun(() =>
      db.characterRelationships.where("pilotId").equals(pilotId).toArray()
    );
  },

  async create(rel: Omit<CharacterRelationship, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.characterRelationships.add(rel));
  },

  async recordInteraction(
    pilotId: number,
    characterId: number,
    engagementDelta: number = 1
  ): Promise<StorageResult<number>> {
    return safeRun(async () => {
      const existing = await db.characterRelationships
        .where("pilotId")
        .equals(pilotId)
        .filter((r) => r.characterId === characterId)
        .first();

      if (existing && existing.id !== undefined) {
        return db.characterRelationships.update(existing.id, {
          engagementLevel: existing.engagementLevel + engagementDelta,
          lastInteractionDate: new Date(),
        });
      }

      return db.characterRelationships.add({
        pilotId,
        characterId,
        relationshipLevel: 1,
        trustLevel: 1,
        engagementLevel: engagementDelta,
        lastInteractionDate: new Date(),
        createdAt: new Date(),
      });
    });
  },
};

// ============================================================
// CHARACTER MEMORY SERVICE (v0.1.5)
// ============================================================

export const characterMemoryService = {
  async getForCharacter(
    pilotId: number,
    characterId: number
  ): Promise<StorageResult<CharacterMemory[]>> {
    return safeRun(() =>
      db.characterMemories
        .where("pilotId")
        .equals(pilotId)
        .filter((m) => m.characterId === characterId)
        .sortBy("importance")
    );
  },

  async getByType(
    pilotId: number,
    characterId: number,
    type: MemoryType
  ): Promise<StorageResult<CharacterMemory[]>> {
    return safeRun(() =>
      db.characterMemories
        .where("pilotId")
        .equals(pilotId)
        .filter((m) => m.characterId === characterId && m.memoryType === type)
        .toArray()
    );
  },

  async create(memory: Omit<CharacterMemory, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.characterMemories.add(memory));
  },

  /** Get the N most important memories a character has about a pilot */
  async getMostImportant(
    pilotId: number,
    characterId: number,
    limit: number = 5
  ): Promise<StorageResult<CharacterMemory[]>> {
    return safeRun(async () => {
      const all = await db.characterMemories
        .where("pilotId")
        .equals(pilotId)
        .filter((m) => m.characterId === characterId)
        .toArray();
      return all.sort((a, b) => b.importance - a.importance).slice(0, limit);
    });
  },
};

// ============================================================
// VOICE INTERACTION SERVICE (v0.1.5)
// ============================================================

export const voiceInteractionService = {
  async getForSession(sessionId: number): Promise<StorageResult<VoiceInteraction[]>> {
    return safeRun(() =>
      db.voiceInteractions.where("sessionId").equals(sessionId).sortBy("timestamp")
    );
  },

  async create(
    interaction: Omit<VoiceInteraction, "id">
  ): Promise<StorageResult<number>> {
    return safeRun(() => db.voiceInteractions.add(interaction));
  },
};

// ============================================================
// NARRATIVE TRIGGER SERVICE (v0.1.5)
// ============================================================

export const narrativeTriggerService = {
  async getByType(type: TriggerType): Promise<StorageResult<NarrativeTrigger[]>> {
    return safeRun(() =>
      db.narrativeTriggers.where("triggerType").equals(type).toArray()
    );
  },

  async getBySource(
    sourceEntity: string,
    sourceEntityId: number
  ): Promise<StorageResult<NarrativeTrigger[]>> {
    return safeRun(() =>
      db.narrativeTriggers
        .where("sourceEntity")
        .equals(sourceEntity)
        .filter((t) => t.sourceEntityId === sourceEntityId)
        .toArray()
    );
  },

  async getByTarget(
    targetEntity: string,
    targetEntityId: number
  ): Promise<StorageResult<NarrativeTrigger[]>> {
    return safeRun(() =>
      db.narrativeTriggers
        .where("targetEntity")
        .equals(targetEntity)
        .filter((t) => t.targetEntityId === targetEntityId)
        .toArray()
    );
  },

  async create(trigger: Omit<NarrativeTrigger, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.narrativeTriggers.add(trigger));
  },
};

// ============================================================
// AVATAR SERVICE (v0.1.5)
// ============================================================

export const avatarService = {
  async getForPilot(pilotId: number): Promise<StorageResult<Avatar | undefined>> {
    return safeRun(() =>
      db.avatars.where("pilotId").equals(pilotId).first()
    );
  },

  async create(avatar: Omit<Avatar, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.avatars.add(avatar));
  },

  async update(
    id: number,
    changes: Partial<Omit<Avatar, "id">>
  ): Promise<StorageResult<number>> {
    return safeRun(() => db.avatars.update(id, changes));
  },

  async getUnlocks(avatarId: number): Promise<StorageResult<AvatarUnlock[]>> {
    return safeRun(() =>
      db.avatarUnlocks.where("avatarId").equals(avatarId).sortBy("createdAt")
    );
  },

  async addUnlock(unlock: Omit<AvatarUnlock, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.avatarUnlocks.add(unlock));
  },
};

// ============================================================
// LIFE STATE SNAPSHOT SERVICE (v1.0)
// ============================================================

export const lifeStateSnapshotService = {
  async getForPilot(pilotId: number): Promise<StorageResult<LifeStateSnapshot[]>> {
    return safeRun(() =>
      db.lifeStateSnapshots.where("pilotId").equals(pilotId).sortBy("snapshotDate")
    );
  },

  async getLatestForPilot(pilotId: number): Promise<StorageResult<LifeStateSnapshot | undefined>> {
    return safeRun(async () => {
      const all = await db.lifeStateSnapshots.where("pilotId").equals(pilotId).sortBy("snapshotDate");
      return all[all.length - 1];
    });
  },

  async getRange(
    pilotId: number,
    from: Date,
    to: Date
  ): Promise<StorageResult<LifeStateSnapshot[]>> {
    return safeRun(() =>
      db.lifeStateSnapshots
        .where("[pilotId+snapshotDate]")
        .between([pilotId, from], [pilotId, to], true, true)
        .toArray()
    );
  },

  async create(snapshot: Omit<LifeStateSnapshot, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.lifeStateSnapshots.add(snapshot));
  },
};

// ============================================================
// CHARACTER MEMORY SOURCE SERVICE (v1.0)
// ============================================================

export const characterMemorySourceService = {
  async getForMemory(characterMemoryId: number): Promise<StorageResult<CharacterMemorySource[]>> {
    return safeRun(() =>
      db.characterMemorySources
        .where("characterMemoryId")
        .equals(characterMemoryId)
        .sortBy("createdAt")
    );
  },

  async getBySourceType(
    sourceType: MemorySourceType
  ): Promise<StorageResult<CharacterMemorySource[]>> {
    return safeRun(() =>
      db.characterMemorySources.where("sourceType").equals(sourceType).toArray()
    );
  },

  async create(
    source: Omit<CharacterMemorySource, "id">
  ): Promise<StorageResult<number>> {
    return safeRun(() => db.characterMemorySources.add(source));
  },
};

// ============================================================
// CHARACTER RELATIONSHIP EVENT SERVICE (v1.0)
// ============================================================

export const characterRelationshipEventService = {
  async getForRelationship(
    relationshipId: number
  ): Promise<StorageResult<CharacterRelationshipEvent[]>> {
    return safeRun(() =>
      db.characterRelationshipEvents
        .where("relationshipId")
        .equals(relationshipId)
        .sortBy("createdAt")
    );
  },

  async getForCharacter(
    pilotId: number,
    characterId: number
  ): Promise<StorageResult<CharacterRelationshipEvent[]>> {
    return safeRun(() =>
      db.characterRelationshipEvents
        .where("[pilotId+characterId]")
        .equals([pilotId, characterId])
        .toArray()
    );
  },

  async getByType(
    relationshipId: number,
    eventType: RelationshipEventType
  ): Promise<StorageResult<CharacterRelationshipEvent[]>> {
    return safeRun(() =>
      db.characterRelationshipEvents
        .where("relationshipId")
        .equals(relationshipId)
        .filter((e) => e.eventType === eventType)
        .toArray()
    );
  },

  async create(
    event: Omit<CharacterRelationshipEvent, "id">
  ): Promise<StorageResult<number>> {
    return safeRun(() => db.characterRelationshipEvents.add(event));
  },
};

// ============================================================
// CO-PILOT PERMISSION SERVICE (v1.0)
// ============================================================

export const coPilotPermissionService = {
  async getForPilot(pilotId: number): Promise<StorageResult<CoPilotPermission[]>> {
    return safeRun(() =>
      db.coPilotPermissions.where("pilotId").equals(pilotId).toArray()
    );
  },

  async getForCoPilot(
    pilotId: number,
    coPilotId: number
  ): Promise<StorageResult<CoPilotPermission[]>> {
    return safeRun(() =>
      db.coPilotPermissions
        .where("pilotId")
        .equals(pilotId)
        .filter((p) => p.coPilotId === coPilotId)
        .toArray()
    );
  },

  async isGranted(
    pilotId: number,
    coPilotId: number,
    permissionType: PermissionType
  ): Promise<StorageResult<boolean>> {
    return safeRun(async () => {
      const perm = await db.coPilotPermissions
        .where("pilotId")
        .equals(pilotId)
        .filter((p) => p.coPilotId === coPilotId && p.permissionType === permissionType)
        .first();
      return perm?.granted === true;
    });
  },

  async grant(
    permission: Omit<CoPilotPermission, "id">
  ): Promise<StorageResult<number>> {
    return safeRun(() => db.coPilotPermissions.add({ ...permission, granted: true }));
  },

  async revoke(id: number): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.coPilotPermissions.update(id, { granted: false, revokedAt: new Date() })
    );
  },
};

// ============================================================
// AUDIO ASSET SERVICE (v1.0)
// ============================================================

export const audioAssetService = {
  async getForCharacter(characterId: number): Promise<StorageResult<AudioAsset[]>> {
    return safeRun(() =>
      db.audioAssets.where("characterId").equals(characterId).toArray()
    );
  },

  async getForCharacterAndLanguage(
    characterId: number,
    language: string
  ): Promise<StorageResult<AudioAsset[]>> {
    return safeRun(() =>
      db.audioAssets
        .where("characterId")
        .equals(characterId)
        .filter((a) => a.language === language)
        .toArray()
    );
  },

  async getByType(
    characterId: number,
    assetType: string
  ): Promise<StorageResult<AudioAsset | undefined>> {
    return safeRun(() =>
      db.audioAssets
        .where("characterId")
        .equals(characterId)
        .filter((a) => a.assetType === assetType)
        .first()
    );
  },

  async create(asset: Omit<AudioAsset, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.audioAssets.add(asset));
  },

  async update(
    id: number,
    changes: Partial<Omit<AudioAsset, "id">>
  ): Promise<StorageResult<number>> {
    return safeRun(() => db.audioAssets.update(id, changes));
  },
};

// ============================================================
// AUDIO PACKAGE SERVICE (v1.0)
// ============================================================

export const audioPackageService = {
  async getAll(): Promise<StorageResult<AudioPackage[]>> {
    return safeRun(() => db.audioPackages.toArray());
  },

  async getByLanguage(language: string): Promise<StorageResult<AudioPackage[]>> {
    return safeRun(() =>
      db.audioPackages.where("language").equals(language).toArray()
    );
  },

  async getById(id: number): Promise<StorageResult<AudioPackage | undefined>> {
    return safeRun(() => db.audioPackages.get(id));
  },

  async create(pkg: Omit<AudioPackage, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.audioPackages.add(pkg));
  },
};

// ============================================================
// EMERGING IDENTITY SERVICE (v1.1)
// ============================================================

export const emergingIdentityService = {
  async getAll(): Promise<StorageResult<EmergingIdentity[]>> {
    return safeRun(() => db.emergingIdentities.where("isActive").equals(1).toArray());
  },

  async getById(id: number): Promise<StorageResult<EmergingIdentity | undefined>> {
    return safeRun(() => db.emergingIdentities.get(id));
  },

  async create(identity: Omit<EmergingIdentity, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.emergingIdentities.add(identity));
  },
};

export const identitySignalService = {
  async getForPilot(pilotId: number): Promise<StorageResult<IdentitySignal[]>> {
    return safeRun(() =>
      db.identitySignals.where("pilotId").equals(pilotId).sortBy("createdAt")
    );
  },

  async getByType(
    pilotId: number,
    signalType: IdentitySignalType
  ): Promise<StorageResult<IdentitySignal[]>> {
    return safeRun(() =>
      db.identitySignals
        .where("pilotId")
        .equals(pilotId)
        .filter((s) => s.signalType === signalType)
        .toArray()
    );
  },

  async getBySource(
    pilotId: number,
    sourceType: IdentitySignalSourceType
  ): Promise<StorageResult<IdentitySignal[]>> {
    return safeRun(() =>
      db.identitySignals
        .where("pilotId")
        .equals(pilotId)
        .filter((s) => s.sourceType === sourceType)
        .toArray()
    );
  },

  async sumBySignalType(
    pilotId: number
  ): Promise<StorageResult<Record<IdentitySignalType, number>>> {
    return safeRun(async () => {
      const signals = await db.identitySignals.where("pilotId").equals(pilotId).toArray();
      return signals.reduce(
        (acc, s) => {
          acc[s.signalType] = (acc[s.signalType] ?? 0) + s.value;
          return acc;
        },
        {} as Record<IdentitySignalType, number>
      );
    });
  },

  async create(signal: Omit<IdentitySignal, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.identitySignals.add(signal));
  },
};

export const identityMomentService = {
  async getForPilot(pilotId: number): Promise<StorageResult<IdentityMoment[]>> {
    return safeRun(() =>
      db.identityMoments.where("pilotId").equals(pilotId).sortBy("unlockedAt")
    );
  },

  async getForIdentity(
    pilotId: number,
    emergingIdentityId: number
  ): Promise<StorageResult<IdentityMoment[]>> {
    return safeRun(() =>
      db.identityMoments
        .where("pilotId")
        .equals(pilotId)
        .filter((m) => m.emergingIdentityId === emergingIdentityId)
        .toArray()
    );
  },

  async create(moment: Omit<IdentityMoment, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.identityMoments.add(moment));
  },
};

// ============================================================
// FUTURE PATH SERVICE (v1.1)
// ============================================================

export const futurePathService = {
  async getAll(): Promise<StorageResult<FuturePath[]>> {
    return safeRun(() => db.futurePaths.toArray());
  },

  async getFree(): Promise<StorageResult<FuturePath[]>> {
    return safeRun(() =>
      db.futurePaths.where("isPremium").equals(0).toArray()
    );
  },

  async getById(id: number): Promise<StorageResult<FuturePath | undefined>> {
    return safeRun(() => db.futurePaths.get(id));
  },

  async create(path: Omit<FuturePath, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.futurePaths.add(path));
  },
};

export const futureSnapshotService = {
  async getForPath(futurePathId: number): Promise<StorageResult<FutureSnapshot[]>> {
    return safeRun(() =>
      db.futureSnapshots.where("futurePathId").equals(futurePathId).sortBy("age")
    );
  },

  async getAtAge(
    futurePathId: number,
    age: number
  ): Promise<StorageResult<FutureSnapshot | undefined>> {
    return safeRun(() =>
      db.futureSnapshots
        .where("futurePathId")
        .equals(futurePathId)
        .filter((s) => s.age === age)
        .first()
    );
  },

  async create(snapshot: Omit<FutureSnapshot, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.futureSnapshots.add(snapshot));
  },
};

// ============================================================
// WORLD ENGINE SERVICES (v1.1)
// ============================================================

export const worldLocationService = {
  async getAll(): Promise<StorageResult<WorldLocation[]>> {
    return safeRun(() =>
      db.worldLocations.where("isActive").equals(1).toArray()
    );
  },

  async getByType(locationType: LocationType): Promise<StorageResult<WorldLocation[]>> {
    return safeRun(() =>
      db.worldLocations.where("locationType").equals(locationType).toArray()
    );
  },

  async getById(id: number): Promise<StorageResult<WorldLocation | undefined>> {
    return safeRun(() => db.worldLocations.get(id));
  },

  async getUnlocked(maxLevel: number): Promise<StorageResult<WorldLocation[]>> {
    return safeRun(() =>
      db.worldLocations
        .where("isActive")
        .equals(1)
        .filter((l) => l.unlockLevel <= maxLevel)
        .toArray()
    );
  },

  async create(location: Omit<WorldLocation, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.worldLocations.add(location));
  },
};

export const locationCharacterService = {
  async getCharactersAt(locationId: number): Promise<StorageResult<LocationCharacter[]>> {
    return safeRun(() =>
      db.locationCharacters.where("locationId").equals(locationId).toArray()
    );
  },

  async getLocationsForCharacter(
    characterId: number
  ): Promise<StorageResult<LocationCharacter[]>> {
    return safeRun(() =>
      db.locationCharacters.where("characterId").equals(characterId).toArray()
    );
  },

  async create(lc: Omit<LocationCharacter, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.locationCharacters.add(lc));
  },
};

export const locationScenarioService = {
  async getScenariosAt(locationId: number): Promise<StorageResult<LocationScenario[]>> {
    return safeRun(() =>
      db.locationScenarios.where("locationId").equals(locationId).toArray()
    );
  },

  async getLocationsForScenario(
    scenarioId: number
  ): Promise<StorageResult<LocationScenario[]>> {
    return safeRun(() =>
      db.locationScenarios.where("scenarioId").equals(scenarioId).toArray()
    );
  },

  async create(ls: Omit<LocationScenario, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.locationScenarios.add(ls));
  },
};

export const pilotLocationVisitService = {
  async getForPilot(pilotId: number): Promise<StorageResult<PilotLocationVisit[]>> {
    return safeRun(() =>
      db.pilotLocationVisits
        .where("pilotId")
        .equals(pilotId)
        .sortBy("lastVisitedAt")
    );
  },

  async getVisit(
    pilotId: number,
    locationId: number
  ): Promise<StorageResult<PilotLocationVisit | undefined>> {
    return safeRun(() =>
      db.pilotLocationVisits
        .where("pilotId")
        .equals(pilotId)
        .filter((v) => v.locationId === locationId)
        .first()
    );
  },

  async recordVisit(
    pilotId: number,
    locationId: number
  ): Promise<StorageResult<number>> {
    return safeRun(async () => {
      const existing = await db.pilotLocationVisits
        .where("pilotId")
        .equals(pilotId)
        .filter((v) => v.locationId === locationId)
        .first();
      if (existing?.id) {
        await db.pilotLocationVisits.update(existing.id, {
          visitCount: existing.visitCount + 1,
          lastVisitedAt: new Date(),
        });
        return existing.id;
      }
      return db.pilotLocationVisits.add({
        pilotId,
        locationId,
        visitCount: 1,
        firstVisitedAt: new Date(),
        lastVisitedAt: new Date(),
      });
    });
  },
};

export const locationUnlockService = {
  async getForPilot(pilotId: number): Promise<StorageResult<LocationUnlock[]>> {
    return safeRun(() =>
      db.locationUnlocks.where("pilotId").equals(pilotId).sortBy("unlockedAt")
    );
  },

  async hasUnlocked(
    pilotId: number,
    locationId: number
  ): Promise<StorageResult<boolean>> {
    return safeRun(async () => {
      const unlock = await db.locationUnlocks
        .where("pilotId")
        .equals(pilotId)
        .filter((u) => u.locationId === locationId)
        .first();
      return unlock !== undefined;
    });
  },

  async unlock(unlock: Omit<LocationUnlock, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.locationUnlocks.add(unlock));
  },
};

// ============================================================
// PILOT MEMORY ENGINE SERVICES (v1.1)
// ============================================================

export const pilotMemoryService = {
  async getForPilot(pilotId: number): Promise<StorageResult<PilotMemory[]>> {
    return safeRun(() =>
      db.pilotMemories.where("pilotId").equals(pilotId).sortBy("createdAt")
    );
  },

  async getByType(
    pilotId: number,
    memoryType: PilotMemoryType
  ): Promise<StorageResult<PilotMemory[]>> {
    return safeRun(() =>
      db.pilotMemories
        .where("pilotId")
        .equals(pilotId)
        .filter((m) => m.memoryType === memoryType)
        .toArray()
    );
  },

  async getMostImportant(
    pilotId: number,
    limit = 10
  ): Promise<StorageResult<PilotMemory[]>> {
    return safeRun(async () => {
      const all = await db.pilotMemories.where("pilotId").equals(pilotId).toArray();
      return all.sort((a, b) => b.importance - a.importance).slice(0, limit);
    });
  },

  async create(memory: Omit<PilotMemory, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.pilotMemories.add(memory));
  },
};

export const memoryReactionService = {
  async getForMemory(pilotMemoryId: number): Promise<StorageResult<MemoryReaction[]>> {
    return safeRun(() =>
      db.memoryReactions.where("pilotMemoryId").equals(pilotMemoryId).sortBy("createdAt")
    );
  },

  async add(reaction: Omit<MemoryReaction, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.memoryReactions.add(reaction));
  },
};

export const memoryReplayService = {
  async getForMemory(
    pilotMemoryId: number
  ): Promise<StorageResult<MemoryReplay | undefined>> {
    return safeRun(() =>
      db.memoryReplays.where("pilotMemoryId").equals(pilotMemoryId).first()
    );
  },

  async recordReplay(pilotMemoryId: number): Promise<StorageResult<number>> {
    return safeRun(async () => {
      const existing = await db.memoryReplays
        .where("pilotMemoryId")
        .equals(pilotMemoryId)
        .first();
      if (existing?.id) {
        await db.memoryReplays.update(existing.id, {
          viewCount: existing.viewCount + 1,
          lastViewedAt: new Date(),
        });
        return existing.id;
      }
      return db.memoryReplays.add({
        pilotMemoryId,
        lastViewedAt: new Date(),
        viewCount: 1,
      });
    });
  },
};

// ============================================================
// CHARACTER ARC ENGINE SERVICES (v1.1)
// ============================================================

export const characterArcService = {
  async getForCharacter(characterId: number): Promise<StorageResult<CharacterArc[]>> {
    return safeRun(() =>
      db.characterArcs.where("characterId").equals(characterId).toArray()
    );
  },

  async getById(id: number): Promise<StorageResult<CharacterArc | undefined>> {
    return safeRun(() => db.characterArcs.get(id));
  },

  async create(arc: Omit<CharacterArc, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.characterArcs.add(arc));
  },
};

export const characterArcStageService = {
  async getForArc(
    characterArcId: number
  ): Promise<StorageResult<CharacterArcStage[]>> {
    return safeRun(() =>
      db.characterArcStages
        .where("characterArcId")
        .equals(characterArcId)
        .sortBy("stageNumber")
    );
  },

  async getCurrentStage(
    characterArcId: number
  ): Promise<StorageResult<CharacterArcStage | undefined>> {
    return safeRun(async () => {
      const stages = await db.characterArcStages
        .where("characterArcId")
        .equals(characterArcId)
        .sortBy("stageNumber");
      return stages[0];
    });
  },

  async create(stage: Omit<CharacterArcStage, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.characterArcStages.add(stage));
  },
};

// ============================================================
// DISCOVERY ENGINE SERVICES (v1.1)
// ============================================================

export const discoveryService = {
  async getAll(): Promise<StorageResult<Discovery[]>> {
    return safeRun(() => db.discoveries.toArray());
  },

  async getByType(discoveryType: DiscoveryType): Promise<StorageResult<Discovery[]>> {
    return safeRun(() =>
      db.discoveries.where("discoveryType").equals(discoveryType).toArray()
    );
  },

  async getByRarity(rarity: DiscoveryRarity): Promise<StorageResult<Discovery[]>> {
    return safeRun(() =>
      db.discoveries.where("rarity").equals(rarity).toArray()
    );
  },

  async create(discovery: Omit<Discovery, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.discoveries.add(discovery));
  },
};

export const pilotDiscoveryService = {
  async getForPilot(pilotId: number): Promise<StorageResult<PilotDiscovery[]>> {
    return safeRun(() =>
      db.pilotDiscoveries.where("pilotId").equals(pilotId).sortBy("discoveredAt")
    );
  },

  async hasDiscovered(
    pilotId: number,
    discoveryId: number
  ): Promise<StorageResult<boolean>> {
    return safeRun(async () => {
      const pd = await db.pilotDiscoveries
        .where("pilotId")
        .equals(pilotId)
        .filter((d) => d.discoveryId === discoveryId)
        .first();
      return pd !== undefined;
    });
  },

  async record(pd: Omit<PilotDiscovery, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.pilotDiscoveries.add(pd));
  },
};

// ============================================================
// RETENTION ENGINE SERVICES (v1.1)
// ============================================================

export const dailyChallengeService = {
  async getForDate(activeDate: Date): Promise<StorageResult<DailyChallenge[]>> {
    return safeRun(() =>
      db.dailyChallenges.where("activeDate").equals(activeDate).toArray()
    );
  },

  async getByType(
    challengeType: ChallengeType
  ): Promise<StorageResult<DailyChallenge[]>> {
    return safeRun(() =>
      db.dailyChallenges.where("challengeType").equals(challengeType).toArray()
    );
  },

  async getUpcoming(from: Date): Promise<StorageResult<DailyChallenge[]>> {
    return safeRun(() =>
      db.dailyChallenges
        .where("activeDate")
        .aboveOrEqual(from)
        .sortBy("activeDate")
    );
  },

  async create(
    challenge: Omit<DailyChallenge, "id">
  ): Promise<StorageResult<number>> {
    return safeRun(() => db.dailyChallenges.add(challenge));
  },
};

export const streakRewardService = {
  async getAll(): Promise<StorageResult<StreakReward[]>> {
    return safeRun(() =>
      db.streakRewards.orderBy("daysRequired").toArray()
    );
  },

  async getForStreak(
    daysRequired: number
  ): Promise<StorageResult<StreakReward | undefined>> {
    return safeRun(() =>
      db.streakRewards.where("daysRequired").equals(daysRequired).first()
    );
  },

  async getEarned(
    currentStreak: number
  ): Promise<StorageResult<StreakReward[]>> {
    return safeRun(() =>
      db.streakRewards
        .where("daysRequired")
        .belowOrEqual(currentStreak)
        .toArray()
    );
  },

  async create(reward: Omit<StreakReward, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.streakRewards.add(reward));
  },
};

// ============================================================
// CRITICAL COMPLIANCE SERVICES (v1.1)
// ============================================================

export const consentRecordService = {
  async getForPilot(pilotId: number): Promise<StorageResult<ConsentRecord[]>> {
    return safeRun(() =>
      db.consentRecords.where("pilotId").equals(pilotId).sortBy("createdAt")
    );
  },

  async isGranted(
    pilotId: number,
    consentType: ConsentType
  ): Promise<StorageResult<boolean>> {
    return safeRun(async () => {
      const record = await db.consentRecords
        .where("pilotId")
        .equals(pilotId)
        .filter(
          (r) =>
            r.consentType === consentType && r.consentStatus === "granted"
        )
        .first();
      return record !== undefined;
    });
  },

  async grant(
    record: Omit<ConsentRecord, "id">
  ): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.consentRecords.add({ ...record, consentStatus: "granted" as ConsentStatus, grantedAt: new Date() })
    );
  },

  async revoke(id: number): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.consentRecords.update(id, {
        consentStatus: "revoked" as ConsentStatus,
        revokedAt: new Date(),
      })
    );
  },
};

export const voiceConsentService = {
  async getForPilot(
    pilotId: number
  ): Promise<StorageResult<VoiceConsent | undefined>> {
    return safeRun(() =>
      db.voiceConsents
        .where("pilotId")
        .equals(pilotId)
        .filter((c) => c.consentStatus === "granted")
        .first()
    );
  },

  async isGranted(pilotId: number): Promise<StorageResult<boolean>> {
    return safeRun(async () => {
      const consent = await db.voiceConsents
        .where("pilotId")
        .equals(pilotId)
        .filter((c) => c.consentStatus === "granted")
        .first();
      return consent !== undefined;
    });
  },

  async grant(consent: Omit<VoiceConsent, "id">): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.voiceConsents.add({ ...consent, consentStatus: "granted" as ConsentStatus, grantedAt: new Date() })
    );
  },

  async revoke(id: number): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.voiceConsents.update(id, {
        consentStatus: "revoked" as ConsentStatus,
        revokedAt: new Date(),
      })
    );
  },
};

export const aiConsentRecordService = {
  async getForPilot(
    pilotId: number
  ): Promise<StorageResult<AIConsentRecord | undefined>> {
    return safeRun(() =>
      db.aiConsentRecords
        .where("pilotId")
        .equals(pilotId)
        .filter((c) => c.consentStatus === "granted")
        .first()
    );
  },

  async isGranted(pilotId: number): Promise<StorageResult<boolean>> {
    return safeRun(async () => {
      const record = await db.aiConsentRecords
        .where("pilotId")
        .equals(pilotId)
        .filter((c) => c.consentStatus === "granted")
        .first();
      return record !== undefined;
    });
  },

  async grant(record: Omit<AIConsentRecord, "id">): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.aiConsentRecords.add({ ...record, consentStatus: "granted" as ConsentStatus, grantedAt: new Date() })
    );
  },

  async revoke(id: number): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.aiConsentRecords.update(id, {
        consentStatus: "revoked" as ConsentStatus,
        revokedAt: new Date(),
      })
    );
  },
};

export const syncQueueService = {
  async getPending(): Promise<StorageResult<SyncQueue[]>> {
    return safeRun(() =>
      db.syncQueue.where("syncStatus").equals("pending").sortBy("createdAt")
    );
  },

  async getFailed(): Promise<StorageResult<SyncQueue[]>> {
    return safeRun(() =>
      db.syncQueue.where("syncStatus").equals("failed").toArray()
    );
  },

  async getForTable(tableName: string): Promise<StorageResult<SyncQueue[]>> {
    return safeRun(() =>
      db.syncQueue.where("tableName").equals(tableName).toArray()
    );
  },

  async enqueue(item: Omit<SyncQueue, "id">): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.syncQueue.add({
        ...item,
        syncStatus: "pending" as SyncStatus,
        retryCount: 0,
        createdAt: new Date(),
      })
    );
  },

  async markSynced(id: number): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.syncQueue.update(id, {
        syncStatus: "synced" as SyncStatus,
        syncedAt: new Date(),
      })
    );
  },

  async markFailed(id: number, retryCount: number): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.syncQueue.update(id, {
        syncStatus: "failed" as SyncStatus,
        retryCount,
        lastAttemptAt: new Date(),
      })
    );
  },

  async clearSynced(): Promise<StorageResult<void>> {
    return safeRun(async () => {
      await db.syncQueue.where("syncStatus").equals("synced").delete();
    });
  },
};

// ============================================================
// CONTENT SCALE ENGINE SERVICES (v1.1)
// ============================================================

export const scenarioTemplateService = {
  async getAll(): Promise<StorageResult<ScenarioTemplate[]>> {
    return safeRun(() => db.scenarioTemplates.toArray());
  },

  async getFree(): Promise<StorageResult<ScenarioTemplate[]>> {
    return safeRun(() =>
      db.scenarioTemplates.where("isPremium").equals(0).toArray()
    );
  },

  async getById(id: number): Promise<StorageResult<ScenarioTemplate | undefined>> {
    return safeRun(() => db.scenarioTemplates.get(id));
  },

  async create(
    template: Omit<ScenarioTemplate, "id">
  ): Promise<StorageResult<number>> {
    return safeRun(() => db.scenarioTemplates.add(template));
  },

  async update(
    id: number,
    changes: Partial<Omit<ScenarioTemplate, "id">>
  ): Promise<StorageResult<number>> {
    return safeRun(() => db.scenarioTemplates.update(id, changes));
  },
};

export const dialogueTemplateService = {
  async getAll(): Promise<StorageResult<DialogueTemplate[]>> {
    return safeRun(() => db.dialogueTemplates.toArray());
  },

  async getById(id: number): Promise<StorageResult<DialogueTemplate | undefined>> {
    return safeRun(() => db.dialogueTemplates.get(id));
  },

  async create(
    template: Omit<DialogueTemplate, "id">
  ): Promise<StorageResult<number>> {
    return safeRun(() => db.dialogueTemplates.add(template));
  },
};

export const contentPackService = {
  async getAll(): Promise<StorageResult<ContentPack[]>> {
    return safeRun(() => db.contentPacks.toArray());
  },

  async getByType(packType: ContentPackType): Promise<StorageResult<ContentPack[]>> {
    return safeRun(() =>
      db.contentPacks.where("packType").equals(packType).toArray()
    );
  },

  async getFree(): Promise<StorageResult<ContentPack[]>> {
    return safeRun(() =>
      db.contentPacks.where("isPremium").equals(0).toArray()
    );
  },

  async getById(id: number): Promise<StorageResult<ContentPack | undefined>> {
    return safeRun(() => db.contentPacks.get(id));
  },

  async create(pack: Omit<ContentPack, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.contentPacks.add(pack));
  },
};

export const contentLocalizationStatusService = {
  async getForEntity(
    entityType: LocalizationTaskType,
    entityId: number
  ): Promise<StorageResult<ContentLocalizationStatus[]>> {
    return safeRun(() =>
      db.contentLocalizationStatuses
        .where("entityType")
        .equals(entityType)
        .filter((s) => s.entityId === entityId)
        .toArray()
    );
  },

  async getByStatus(
    localizationStatus: LocalizationStatus
  ): Promise<StorageResult<ContentLocalizationStatus[]>> {
    return safeRun(() =>
      db.contentLocalizationStatuses
        .where("localizationStatus")
        .equals(localizationStatus)
        .toArray()
    );
  },

  async upsert(
    entityType: LocalizationTaskType,
    entityId: number,
    language: string,
    status: LocalizationStatus
  ): Promise<StorageResult<number>> {
    return safeRun(async () => {
      const existing = await db.contentLocalizationStatuses
        .where("entityType")
        .equals(entityType)
        .filter((s) => s.entityId === entityId && s.language === language)
        .first();
      if (existing?.id) {
        await db.contentLocalizationStatuses.update(existing.id, {
          localizationStatus: status,
          lastUpdatedAt: new Date(),
          ...(status === "published" ? { publishedAt: new Date() } : {}),
        });
        return existing.id;
      }
      return db.contentLocalizationStatuses.add({
        entityType,
        entityId,
        language: language as ContentLocalizationStatus["language"],
        localizationStatus: status,
        lastUpdatedAt: new Date(),
      });
    });
  },
};

export const localizationTaskService = {
  async getByStatus(
    status: LocalizationStatus
  ): Promise<StorageResult<LocalizationTask[]>> {
    return safeRun(() =>
      db.localizationTasks
        .where("localizationStatus")
        .equals(status)
        .sortBy("createdAt")
    );
  },

  async getForEntity(
    taskType: LocalizationTaskType,
    entityId: number
  ): Promise<StorageResult<LocalizationTask[]>> {
    return safeRun(() =>
      db.localizationTasks
        .where("taskType")
        .equals(taskType)
        .filter((t) => t.entityId === entityId)
        .toArray()
    );
  },

  async getAssignedTo(
    assignedTo: string
  ): Promise<StorageResult<LocalizationTask[]>> {
    return safeRun(() =>
      db.localizationTasks
        .filter((t) => t.assignedTo === assignedTo)
        .toArray()
    );
  },

  async create(task: Omit<LocalizationTask, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.localizationTasks.add(task));
  },

  async updateStatus(
    id: number,
    status: LocalizationStatus
  ): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.localizationTasks.update(id, {
        localizationStatus: status,
        ...(status === "approved" ? { completedAt: new Date() } : {}),
      })
    );
  },
};

// ============================================================
// ASSESSMENT ENGINE SERVICES (v1.2)
// ============================================================

export const assessmentService = {
  async getAll(): Promise<StorageResult<Assessment[]>> {
    return safeRun(() => db.assessments.where("isActive").equals(1).toArray());
  },

  async getByType(assessmentType: AssessmentType): Promise<StorageResult<Assessment[]>> {
    return safeRun(() =>
      db.assessments
        .where("assessmentType")
        .equals(assessmentType)
        .filter((a) => a.isActive)
        .toArray()
    );
  },

  async getById(id: number): Promise<StorageResult<Assessment | undefined>> {
    return safeRun(() => db.assessments.get(id));
  },

  async create(assessment: Omit<Assessment, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.assessments.add(assessment));
  },
};

export const assessmentQuestionService = {
  async getForAssessment(
    assessmentId: number
  ): Promise<StorageResult<AssessmentQuestion[]>> {
    return safeRun(() =>
      db.assessmentQuestions
        .where("assessmentId")
        .equals(assessmentId)
        .sortBy("displayOrder")
    );
  },

  async getByResponseType(
    assessmentId: number,
    responseType: AssessmentResponseType
  ): Promise<StorageResult<AssessmentQuestion[]>> {
    return safeRun(() =>
      db.assessmentQuestions
        .where("assessmentId")
        .equals(assessmentId)
        .filter((q) => q.responseType === responseType)
        .toArray()
    );
  },

  async getByCompetency(
    competencyId: number
  ): Promise<StorageResult<AssessmentQuestion[]>> {
    return safeRun(() =>
      db.assessmentQuestions.filter((q) => q.competencyId === competencyId).toArray()
    );
  },

  async create(
    question: Omit<AssessmentQuestion, "id">
  ): Promise<StorageResult<number>> {
    return safeRun(() => db.assessmentQuestions.add(question));
  },
};

export const assessmentResponseService = {
  async getForPilot(pilotId: number): Promise<StorageResult<AssessmentResponse[]>> {
    return safeRun(() =>
      db.assessmentResponses.where("pilotId").equals(pilotId).sortBy("submittedAt")
    );
  },

  async getForQuestion(
    assessmentQuestionId: number
  ): Promise<StorageResult<AssessmentResponse[]>> {
    return safeRun(() =>
      db.assessmentResponses
        .where("assessmentQuestionId")
        .equals(assessmentQuestionId)
        .toArray()
    );
  },

  async getPilotAnswersForAssessment(
    pilotId: number,
    assessmentId: number
  ): Promise<StorageResult<AssessmentResponse[]>> {
    return safeRun(async () => {
      const questions = await db.assessmentQuestions
        .where("assessmentId")
        .equals(assessmentId)
        .toArray();
      const questionIds = new Set(questions.map((q) => q.id));
      return db.assessmentResponses
        .where("pilotId")
        .equals(pilotId)
        .filter((r) => questionIds.has(r.assessmentQuestionId))
        .toArray();
    });
  },

  async submit(response: Omit<AssessmentResponse, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.assessmentResponses.add(response));
  },
};

export const assessmentResultService = {
  async getForPilot(pilotId: number): Promise<StorageResult<AssessmentResult[]>> {
    return safeRun(() =>
      db.assessmentResults.where("pilotId").equals(pilotId).sortBy("calculatedAt")
    );
  },

  async getLatest(
    pilotId: number,
    assessmentId: number
  ): Promise<StorageResult<AssessmentResult | undefined>> {
    return safeRun(async () => {
      const results = await db.assessmentResults
        .where("pilotId")
        .equals(pilotId)
        .filter((r) => r.assessmentId === assessmentId)
        .sortBy("calculatedAt");
      return results[results.length - 1];
    });
  },

  async getImprovementDelta(
    pilotId: number,
    assessmentId: number
  ): Promise<StorageResult<number | null>> {
    return safeRun(async () => {
      const latest = await db.assessmentResults
        .where("pilotId")
        .equals(pilotId)
        .filter((r) => r.assessmentId === assessmentId)
        .sortBy("calculatedAt");
      if (latest.length < 2) return null;
      const newest = latest[latest.length - 1];
      return newest.improvementDelta ?? null;
    });
  },

  async save(result: Omit<AssessmentResult, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.assessmentResults.add(result));
  },
};

// ============================================================
// INSTITUTION REPORTING ENGINE SERVICES (v1.2)
// ============================================================

export const institutionReportService = {
  async getForSchool(schoolId: number): Promise<StorageResult<InstitutionReport[]>> {
    return safeRun(() =>
      db.institutionReports.where("schoolId").equals(schoolId).sortBy("generatedAt")
    );
  },

  async getByType(
    schoolId: number,
    reportType: InstitutionReportType
  ): Promise<StorageResult<InstitutionReport[]>> {
    return safeRun(() =>
      db.institutionReports
        .where("schoolId")
        .equals(schoolId)
        .filter((r) => r.reportType === reportType)
        .toArray()
    );
  },

  async getLatest(
    schoolId: number,
    reportType: InstitutionReportType
  ): Promise<StorageResult<InstitutionReport | undefined>> {
    return safeRun(async () => {
      const reports = await db.institutionReports
        .where("schoolId")
        .equals(schoolId)
        .filter((r) => r.reportType === reportType)
        .sortBy("generatedAt");
      return reports[reports.length - 1];
    });
  },

  async save(report: Omit<InstitutionReport, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.institutionReports.add(report));
  },
};

export const classroomReportService = {
  async getForClassroom(
    classroomId: number
  ): Promise<StorageResult<ClassroomReport[]>> {
    return safeRun(() =>
      db.classroomReports
        .where("classroomId")
        .equals(classroomId)
        .sortBy("generatedAt")
    );
  },

  async getByType(
    classroomId: number,
    reportType: InstitutionReportType
  ): Promise<StorageResult<ClassroomReport[]>> {
    return safeRun(() =>
      db.classroomReports
        .where("classroomId")
        .equals(classroomId)
        .filter((r) => r.reportType === reportType)
        .toArray()
    );
  },

  async save(report: Omit<ClassroomReport, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.classroomReports.add(report));
  },
};

export const cohortInsightService = {
  async getForSchool(schoolId: number): Promise<StorageResult<CohortInsight[]>> {
    return safeRun(() =>
      db.cohortInsights.where("schoolId").equals(schoolId).sortBy("generatedAt")
    );
  },

  async getByType(
    schoolId: number,
    cohortType: CohortType
  ): Promise<StorageResult<CohortInsight | undefined>> {
    return safeRun(async () => {
      const results = await db.cohortInsights
        .where("schoolId")
        .equals(schoolId)
        .filter((i) => i.cohortType === cohortType)
        .sortBy("generatedAt");
      return results[results.length - 1];
    });
  },

  async save(insight: Omit<CohortInsight, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.cohortInsights.add(insight));
  },
};

// ============================================================
// COUNSELLOR ENGINE SERVICES (v1.2)
// ============================================================

export const counsellorService = {
  async getForSchool(schoolId: number): Promise<StorageResult<Counsellor[]>> {
    return safeRun(() =>
      db.counsellors
        .where("schoolId")
        .equals(schoolId)
        .filter((c) => c.isActive)
        .toArray()
    );
  },

  async getAvailable(schoolId: number): Promise<StorageResult<Counsellor[]>> {
    return safeRun(() =>
      db.counsellors
        .where("schoolId")
        .equals(schoolId)
        .filter(
          (c) => c.isActive && c.availabilityStatus === ("available" as CounsellorAvailabilityStatus)
        )
        .toArray()
    );
  },

  async getBySpecialization(
    schoolId: number,
    specialization: CounsellorSpecialization
  ): Promise<StorageResult<Counsellor[]>> {
    return safeRun(() =>
      db.counsellors
        .where("schoolId")
        .equals(schoolId)
        .filter((c) => c.isActive && c.specialization === specialization)
        .toArray()
    );
  },

  async getById(id: number): Promise<StorageResult<Counsellor | undefined>> {
    return safeRun(() => db.counsellors.get(id));
  },

  async create(counsellor: Omit<Counsellor, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.counsellors.add(counsellor));
  },

  async updateAvailability(
    id: number,
    availabilityStatus: CounsellorAvailabilityStatus
  ): Promise<StorageResult<number>> {
    return safeRun(() => db.counsellors.update(id, { availabilityStatus }));
  },
};

export const counsellorSessionService = {
  async getForPilot(pilotId: number): Promise<StorageResult<CounsellorSession[]>> {
    return safeRun(() =>
      db.counsellorSessions.where("pilotId").equals(pilotId).sortBy("sessionDate")
    );
  },

  async getForCounsellor(
    counsellorId: number
  ): Promise<StorageResult<CounsellorSession[]>> {
    return safeRun(() =>
      db.counsellorSessions
        .where("counsellorId")
        .equals(counsellorId)
        .sortBy("sessionDate")
    );
  },

  async getByType(
    pilotId: number,
    sessionType: CounsellorSessionType
  ): Promise<StorageResult<CounsellorSession[]>> {
    return safeRun(() =>
      db.counsellorSessions
        .where("pilotId")
        .equals(pilotId)
        .filter((s) => s.sessionType === sessionType)
        .toArray()
    );
  },

  async getUpcoming(
    counsellorId: number,
    from: Date
  ): Promise<StorageResult<CounsellorSession[]>> {
    return safeRun(() =>
      db.counsellorSessions
        .where("counsellorId")
        .equals(counsellorId)
        .filter((s) => s.sessionDate >= from)
        .sortBy("sessionDate")
    );
  },

  async create(
    session: Omit<CounsellorSession, "id">
  ): Promise<StorageResult<number>> {
    return safeRun(() => db.counsellorSessions.add(session));
  },

  async addFollowUp(id: number, followUpDate: Date): Promise<StorageResult<number>> {
    return safeRun(() => db.counsellorSessions.update(id, { followUpDate }));
  },
};

// ============================================================
// COMPLIANCE AUDIT ENGINE SERVICE (v1.2)
// ============================================================

export const auditLogService = {
  async getForEntity(
    entityType: AuditEntityType,
    entityId: number
  ): Promise<StorageResult<AuditLog[]>> {
    return safeRun(() =>
      db.auditLogs
        .where("entityType")
        .equals(entityType)
        .filter((l) => l.entityId === entityId)
        .sortBy("timestamp")
    );
  },

  async getByAction(
    actionType: AuditActionType
  ): Promise<StorageResult<AuditLog[]>> {
    return safeRun(() =>
      db.auditLogs.where("actionType").equals(actionType).sortBy("timestamp")
    );
  },

  async getByActor(
    actorType: AuditActorType,
    actorId: number
  ): Promise<StorageResult<AuditLog[]>> {
    return safeRun(() =>
      db.auditLogs
        .where("actorType")
        .equals(actorType)
        .filter((l) => l.actorId === actorId)
        .sortBy("timestamp")
    );
  },

  async getInRange(from: Date, to: Date): Promise<StorageResult<AuditLog[]>> {
    return safeRun(() =>
      db.auditLogs
        .where("timestamp")
        .between(from, to)
        .toArray()
    );
  },

  async append(log: Omit<AuditLog, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.auditLogs.add({ ...log, timestamp: log.timestamp ?? new Date() }));
  },
};

// ============================================================
// INTERVENTION ENGINE SERVICES (v1.2)
// ============================================================

export const interventionRuleService = {
  async getActive(): Promise<StorageResult<InterventionRule[]>> {
    return safeRun(() => db.interventionRules.where("isActive").equals(1).toArray());
  },

  async getByTriggerType(
    triggerType: InterventionTriggerType
  ): Promise<StorageResult<InterventionRule[]>> {
    return safeRun(() =>
      db.interventionRules
        .where("triggerType")
        .equals(triggerType)
        .filter((r) => r.isActive)
        .toArray()
    );
  },

  async getBySeverity(
    severity: InterventionSeverity
  ): Promise<StorageResult<InterventionRule[]>> {
    return safeRun(() =>
      db.interventionRules
        .where("severity")
        .equals(severity)
        .filter((r) => r.isActive)
        .toArray()
    );
  },

  async getById(id: number): Promise<StorageResult<InterventionRule | undefined>> {
    return safeRun(() => db.interventionRules.get(id));
  },

  async create(rule: Omit<InterventionRule, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.interventionRules.add(rule));
  },

  async setActive(id: number, isActive: boolean): Promise<StorageResult<number>> {
    return safeRun(() => db.interventionRules.update(id, { isActive }));
  },
};

export const interventionRecommendationService = {
  async getForPilot(
    pilotId: number
  ): Promise<StorageResult<InterventionRecommendation[]>> {
    return safeRun(() =>
      db.interventionRecommendations
        .where("pilotId")
        .equals(pilotId)
        .sortBy("generatedAt")
    );
  },

  async getPending(
    pilotId: number
  ): Promise<StorageResult<InterventionRecommendation[]>> {
    return safeRun(() =>
      db.interventionRecommendations
        .where("pilotId")
        .equals(pilotId)
        .filter((r) => !r.isActedUpon)
        .toArray()
    );
  },

  async getByType(
    pilotId: number,
    recommendationType: InterventionRecommendationType
  ): Promise<StorageResult<InterventionRecommendation[]>> {
    return safeRun(() =>
      db.interventionRecommendations
        .where("pilotId")
        .equals(pilotId)
        .filter((r) => r.recommendationType === recommendationType)
        .toArray()
    );
  },

  async getForRule(
    interventionRuleId: number
  ): Promise<StorageResult<InterventionRecommendation[]>> {
    return safeRun(() =>
      db.interventionRecommendations
        .where("interventionRuleId")
        .equals(interventionRuleId)
        .toArray()
    );
  },

  async create(
    recommendation: Omit<InterventionRecommendation, "id">
  ): Promise<StorageResult<number>> {
    return safeRun(() => db.interventionRecommendations.add(recommendation));
  },

  async markActedUpon(id: number): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.interventionRecommendations.update(id, {
        isActedUpon: true,
        actedUponAt: new Date(),
      })
    );
  },
};

// ============================================================
// HUMAN DEVELOPMENT FRAMEWORK SERVICES (v1.4)
// ============================================================

export const developmentStageService = {
  async getAll(): Promise<StorageResult<DevelopmentStage[]>> {
    return safeRun(() => db.developmentStages.where("isActive").equals(1).toArray());
  },
  async getForAge(age: number): Promise<StorageResult<DevelopmentStage | undefined>> {
    return safeRun(() =>
      db.developmentStages
        .filter((s) => s.isActive && s.ageRangeMin <= age && s.ageRangeMax >= age)
        .first()
    );
  },
  async getByType(stageType: DevelopmentStageType): Promise<StorageResult<DevelopmentStage | undefined>> {
    return safeRun(() =>
      db.developmentStages.where("stageType").equals(stageType).first()
    );
  },
  async create(stage: Omit<DevelopmentStage, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.developmentStages.add(stage));
  },
};

export const growthDimensionService = {
  async getAll(): Promise<StorageResult<GrowthDimension[]>> {
    return safeRun(() => db.growthDimensions.where("isActive").equals(1).toArray());
  },
  async getByType(dimensionType: GrowthDimensionType): Promise<StorageResult<GrowthDimension | undefined>> {
    return safeRun(() =>
      db.growthDimensions.where("dimensionType").equals(dimensionType).first()
    );
  },
  async getChildren(parentDimensionId: number): Promise<StorageResult<GrowthDimension[]>> {
    return safeRun(() =>
      db.growthDimensions
        .filter((d) => d.parentDimensionId === parentDimensionId && d.isActive)
        .toArray()
    );
  },
  async create(dimension: Omit<GrowthDimension, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.growthDimensions.add(dimension));
  },
};

export const developmentMilestoneService = {
  async getForPilot(pilotId: number): Promise<StorageResult<DevelopmentMilestone[]>> {
    return safeRun(() =>
      db.developmentMilestones.where("pilotId").equals(pilotId).toArray()
    );
  },
  async getReached(pilotId: number): Promise<StorageResult<DevelopmentMilestone[]>> {
    return safeRun(() =>
      db.developmentMilestones
        .where("pilotId").equals(pilotId)
        .filter((m) => m.isReached)
        .toArray()
    );
  },
  async getForStage(developmentStageId: number): Promise<StorageResult<DevelopmentMilestone[]>> {
    return safeRun(() =>
      db.developmentMilestones.where("developmentStageId").equals(developmentStageId).toArray()
    );
  },
  async markReached(id: number): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.developmentMilestones.update(id, { isReached: true, reachedAt: new Date() })
    );
  },
  async create(milestone: Omit<DevelopmentMilestone, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.developmentMilestones.add(milestone));
  },
};

export const growthIndicatorService = {
  async getForPilot(pilotId: number): Promise<StorageResult<GrowthIndicator[]>> {
    return safeRun(() =>
      db.growthIndicators.where("pilotId").equals(pilotId).sortBy("recordedAt")
    );
  },
  async getForDimension(pilotId: number, growthDimensionId: number): Promise<StorageResult<GrowthIndicator[]>> {
    return safeRun(() =>
      db.growthIndicators
        .where("pilotId").equals(pilotId)
        .filter((g) => g.growthDimensionId === growthDimensionId)
        .sortBy("recordedAt")
    );
  },
  async record(indicator: Omit<GrowthIndicator, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.growthIndicators.add(indicator));
  },
};

// ============================================================
// CURRICULUM FRAMEWORK SERVICES (v1.4)
// ============================================================

export const curriculumService = {
  async getActive(): Promise<StorageResult<Curriculum[]>> {
    return safeRun(() => db.curricula.where("isActive").equals(1).toArray());
  },
  async getByFramework(framework: CurriculumFramework): Promise<StorageResult<Curriculum[]>> {
    return safeRun(() =>
      db.curricula.where("framework").equals(framework).filter((c) => c.isActive).toArray()
    );
  },
  async getById(id: number): Promise<StorageResult<Curriculum | undefined>> {
    return safeRun(() => db.curricula.get(id));
  },
  async create(curriculum: Omit<Curriculum, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.curricula.add(curriculum));
  },
};

export const curriculumModuleService = {
  async getForCurriculum(curriculumId: number): Promise<StorageResult<CurriculumModule[]>> {
    return safeRun(() =>
      db.curriculumModules
        .where("curriculumId").equals(curriculumId)
        .filter((m) => m.isActive)
        .sortBy("sequenceOrder")
    );
  },
  async getById(id: number): Promise<StorageResult<CurriculumModule | undefined>> {
    return safeRun(() => db.curriculumModules.get(id));
  },
  async create(module: Omit<CurriculumModule, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.curriculumModules.add(module));
  },
};

export const learningOutcomeService = {
  async getForModule(curriculumModuleId: number): Promise<StorageResult<LearningOutcome[]>> {
    return safeRun(() =>
      db.learningOutcomes.where("curriculumModuleId").equals(curriculumModuleId).toArray()
    );
  },
  async getAssessable(curriculumModuleId: number): Promise<StorageResult<LearningOutcome[]>> {
    return safeRun(() =>
      db.learningOutcomes
        .where("curriculumModuleId").equals(curriculumModuleId)
        .filter((o) => o.isAssessable)
        .toArray()
    );
  },
  async getByType(outcomeType: LearningOutcomeType): Promise<StorageResult<LearningOutcome[]>> {
    return safeRun(() =>
      db.learningOutcomes.where("outcomeType").equals(outcomeType).toArray()
    );
  },
  async create(outcome: Omit<LearningOutcome, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.learningOutcomes.add(outcome));
  },
};

export const competencyMappingService = {
  async getForModule(curriculumModuleId: number): Promise<StorageResult<CompetencyMapping[]>> {
    return safeRun(() =>
      db.competencyMappings.where("curriculumModuleId").equals(curriculumModuleId).toArray()
    );
  },
  async getForCompetency(competencyId: number): Promise<StorageResult<CompetencyMapping[]>> {
    return safeRun(() =>
      db.competencyMappings.where("competencyId").equals(competencyId).toArray()
    );
  },
  async getStrong(curriculumModuleId: number, threshold = 0.7): Promise<StorageResult<CompetencyMapping[]>> {
    return safeRun(() =>
      db.competencyMappings
        .where("curriculumModuleId").equals(curriculumModuleId)
        .filter((m) => m.mappingStrength >= threshold)
        .toArray()
    );
  },
  async create(mapping: Omit<CompetencyMapping, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.competencyMappings.add(mapping));
  },
};

// ============================================================
// PERSONALITY EVOLUTION SERVICES (v1.4)
// ============================================================

export const personalityProfileService = {
  async getForPilot(pilotId: number): Promise<StorageResult<PersonalityProfile[]>> {
    return safeRun(() =>
      db.personalityProfiles.where("pilotId").equals(pilotId).sortBy("createdAt")
    );
  },
  async getBaseline(pilotId: number): Promise<StorageResult<PersonalityProfile | undefined>> {
    return safeRun(() =>
      db.personalityProfiles
        .where("pilotId").equals(pilotId)
        .filter((p) => p.isBaseline)
        .first()
    );
  },
  async getLatestForFramework(pilotId: number, framework: PersonalityFramework): Promise<StorageResult<PersonalityProfile | undefined>> {
    return safeRun(async () => {
      const profiles = await db.personalityProfiles
        .where("pilotId").equals(pilotId)
        .filter((p) => p.framework === framework)
        .sortBy("createdAt");
      return profiles[profiles.length - 1];
    });
  },
  async create(profile: Omit<PersonalityProfile, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.personalityProfiles.add(profile));
  },
};

export const personalityTraitService = {
  async getForProfile(personalityProfileId: number): Promise<StorageResult<PersonalityTrait[]>> {
    return safeRun(() =>
      db.personalityTraits.where("personalityProfileId").equals(personalityProfileId).toArray()
    );
  },
  async getByCategory(personalityProfileId: number, traitCategory: PersonalityTraitCategory): Promise<StorageResult<PersonalityTrait | undefined>> {
    return safeRun(() =>
      db.personalityTraits
        .where("personalityProfileId").equals(personalityProfileId)
        .filter((t) => t.traitCategory === traitCategory)
        .first()
    );
  },
  async create(trait: Omit<PersonalityTrait, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.personalityTraits.add(trait));
  },
};

export const personalityGrowthService = {
  async getForPilot(pilotId: number): Promise<StorageResult<PersonalityGrowth[]>> {
    return safeRun(() =>
      db.personalityGrowths.where("pilotId").equals(pilotId).sortBy("recordedAt")
    );
  },
  async getByTrait(pilotId: number, traitCategory: PersonalityTraitCategory): Promise<StorageResult<PersonalityGrowth[]>> {
    return safeRun(() =>
      db.personalityGrowths
        .where("pilotId").equals(pilotId)
        .filter((g) => g.traitCategory === traitCategory)
        .sortBy("recordedAt")
    );
  },
  async record(growth: Omit<PersonalityGrowth, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.personalityGrowths.add(growth));
  },
};

// ============================================================
// DECISION INTELLIGENCE SERVICES (v1.4)
// ============================================================

export const decisionScenarioService = {
  async getForPilot(pilotId: number): Promise<StorageResult<DecisionScenario[]>> {
    return safeRun(() =>
      db.decisionScenarios.where("pilotId").equals(pilotId).sortBy("createdAt")
    );
  },
  async getByContext(pilotId: number, context: DecisionContext): Promise<StorageResult<DecisionScenario[]>> {
    return safeRun(() =>
      db.decisionScenarios
        .where("pilotId").equals(pilotId)
        .filter((d) => d.context === context)
        .toArray()
    );
  },
  async getById(id: number): Promise<StorageResult<DecisionScenario | undefined>> {
    return safeRun(() => db.decisionScenarios.get(id));
  },
  async create(scenario: Omit<DecisionScenario, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.decisionScenarios.add(scenario));
  },
};

export const decisionScenarioOutcomeService = {
  async getForScenario(decisionScenarioId: number): Promise<StorageResult<DecisionScenarioOutcome | undefined>> {
    return safeRun(() =>
      db.decisionScenarioOutcomes.where("decisionScenarioId").equals(decisionScenarioId).first()
    );
  },
  async getReviewed(): Promise<StorageResult<DecisionScenarioOutcome[]>> {
    return safeRun(() =>
      db.decisionScenarioOutcomes.filter((o) => o.reviewedAt != null).toArray()
    );
  },
  async create(outcome: Omit<DecisionScenarioOutcome, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.decisionScenarioOutcomes.add(outcome));
  },
  async updateActualOutcome(id: number, actualOutcome: string, satisfactionScore: number): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.decisionScenarioOutcomes.update(id, { actualOutcome, satisfactionScore, reviewedAt: new Date() })
    );
  },
};

export const decisionReflectionService = {
  async getForPilot(pilotId: number): Promise<StorageResult<DecisionReflection[]>> {
    return safeRun(() =>
      db.decisionReflections.where("pilotId").equals(pilotId).sortBy("reflectedAt")
    );
  },
  async getForScenario(decisionScenarioId: number): Promise<StorageResult<DecisionReflection[]>> {
    return safeRun(() =>
      db.decisionReflections.where("decisionScenarioId").equals(decisionScenarioId).toArray()
    );
  },
  async create(reflection: Omit<DecisionReflection, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.decisionReflections.add(reflection));
  },
};

export const decisionPatternService = {
  async getForPilot(pilotId: number): Promise<StorageResult<DecisionPattern[]>> {
    return safeRun(() =>
      db.decisionPatterns.where("pilotId").equals(pilotId).sortBy("occurrenceCount")
    );
  },
  async getDominant(pilotId: number): Promise<StorageResult<DecisionPattern | undefined>> {
    return safeRun(async () => {
      const patterns = await db.decisionPatterns
        .where("pilotId").equals(pilotId)
        .sortBy("occurrenceCount");
      return patterns[patterns.length - 1];
    });
  },
  async getByType(pilotId: number, patternType: DecisionPatternType): Promise<StorageResult<DecisionPattern | undefined>> {
    return safeRun(() =>
      db.decisionPatterns
        .where("pilotId").equals(pilotId)
        .filter((p) => p.patternType === patternType)
        .first()
    );
  },
  async upsert(pilotId: number, patternType: DecisionPatternType): Promise<StorageResult<number>> {
    return safeRun(async () => {
      const existing = await db.decisionPatterns
        .where("pilotId").equals(pilotId)
        .filter((p) => p.patternType === patternType)
        .first();
      if (existing?.id) {
        return db.decisionPatterns.update(existing.id, {
          occurrenceCount: existing.occurrenceCount + 1,
          lastObservedAt: new Date(),
          updatedAt: new Date(),
        });
      }
      return db.decisionPatterns.add({
        pilotId,
        patternType,
        occurrenceCount: 1,
        lastObservedAt: new Date(),
        isAcknowledged: false,
        updatedAt: new Date(),
      });
    });
  },
};

// ============================================================
// LIFE TIMELINE SERVICES (v1.4)
// ============================================================

export const lifeTimelineEventService = {
  async getForPilot(pilotId: number): Promise<StorageResult<LifeTimelineEvent[]>> {
    return safeRun(() =>
      db.lifeTimelineEvents.where("pilotId").equals(pilotId).sortBy("occurredAt")
    );
  },
  async getByType(pilotId: number, eventType: LifeTimelineEventType): Promise<StorageResult<LifeTimelineEvent[]>> {
    return safeRun(() =>
      db.lifeTimelineEvents
        .where("pilotId").equals(pilotId)
        .filter((e) => e.eventType === eventType)
        .sortBy("occurredAt")
    );
  },
  async getForCollection(collectionId: number): Promise<StorageResult<LifeTimelineEvent[]>> {
    return safeRun(() =>
      db.lifeTimelineEvents.where("collectionId").equals(collectionId).sortBy("occurredAt")
    );
  },
  async getSignificant(pilotId: number, minScore = 7): Promise<StorageResult<LifeTimelineEvent[]>> {
    return safeRun(() =>
      db.lifeTimelineEvents
        .where("pilotId").equals(pilotId)
        .filter((e) => e.significanceScore >= minScore)
        .sortBy("occurredAt")
    );
  },
  async record(event: Omit<LifeTimelineEvent, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.lifeTimelineEvents.add(event));
  },
};

export const timelineCollectionService = {
  async getForPilot(pilotId: number): Promise<StorageResult<TimelineCollection[]>> {
    return safeRun(() =>
      db.timelineCollections.where("pilotId").equals(pilotId).sortBy("createdAt")
    );
  },
  async getPublic(pilotId: number): Promise<StorageResult<TimelineCollection[]>> {
    return safeRun(() =>
      db.timelineCollections
        .where("pilotId").equals(pilotId)
        .filter((c) => c.isPublic)
        .toArray()
    );
  },
  async create(collection: Omit<TimelineCollection, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.timelineCollections.add(collection));
  },
};

export const timelineNarrativeService = {
  async getForPilot(pilotId: number): Promise<StorageResult<TimelineNarrative[]>> {
    return safeRun(() =>
      db.timelineNarratives.where("pilotId").equals(pilotId).sortBy("generatedAt")
    );
  },
  async getAiGenerated(pilotId: number): Promise<StorageResult<TimelineNarrative[]>> {
    return safeRun(() =>
      db.timelineNarratives
        .where("pilotId").equals(pilotId)
        .filter((n) => n.isAiGenerated)
        .toArray()
    );
  },
  async create(narrative: Omit<TimelineNarrative, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.timelineNarratives.add(narrative));
  },
};

// ============================================================
// WELLBEING FRAMEWORK SERVICES (v1.4)
// ============================================================

export const wellbeingProfileService = {
  async getForPilot(pilotId: number): Promise<StorageResult<WellbeingProfile | undefined>> {
    return safeRun(() =>
      db.wellbeingProfiles.where("pilotId").equals(pilotId).first()
    );
  },
  async upsert(pilotId: number, overallScore: number, trend: WellbeingTrend): Promise<StorageResult<number>> {
    return safeRun(async () => {
      const existing = await db.wellbeingProfiles.where("pilotId").equals(pilotId).first();
      const now = new Date();
      if (existing?.id) {
        return db.wellbeingProfiles.update(existing.id, {
          overallScore,
          trend,
          lastAssessedAt: now,
          updatedAt: now,
        });
      }
      return db.wellbeingProfiles.add({
        pilotId,
        overallScore,
        trend,
        lastAssessedAt: now,
        createdAt: now,
        updatedAt: now,
      });
    });
  },
};

export const wellbeingAssessmentService = {
  async getForPilot(pilotId: number): Promise<StorageResult<WellbeingAssessment[]>> {
    return safeRun(() =>
      db.wellbeingAssessments.where("pilotId").equals(pilotId).sortBy("assessedAt")
    );
  },
  async getLatest(pilotId: number): Promise<StorageResult<WellbeingAssessment | undefined>> {
    return safeRun(async () => {
      const assessments = await db.wellbeingAssessments
        .where("pilotId").equals(pilotId)
        .sortBy("assessedAt");
      return assessments[assessments.length - 1];
    });
  },
  async getAtRisk(burnoutThreshold = 7): Promise<StorageResult<WellbeingAssessment[]>> {
    return safeRun(() =>
      db.wellbeingAssessments.filter((a) => a.burnoutRisk >= burnoutThreshold).toArray()
    );
  },
  async record(assessment: Omit<WellbeingAssessment, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.wellbeingAssessments.add(assessment));
  },
};

export const wellbeingDimensionService = {
  async getForAssessment(wellbeingAssessmentId: number): Promise<StorageResult<WellbeingDimension[]>> {
    return safeRun(() =>
      db.wellbeingDimensions.where("wellbeingAssessmentId").equals(wellbeingAssessmentId).toArray()
    );
  },
  async getByType(wellbeingAssessmentId: number, dimensionType: WellbeingDimensionType): Promise<StorageResult<WellbeingDimension | undefined>> {
    return safeRun(() =>
      db.wellbeingDimensions
        .where("wellbeingAssessmentId").equals(wellbeingAssessmentId)
        .filter((d) => d.dimensionType === dimensionType)
        .first()
    );
  },
  async record(dimension: Omit<WellbeingDimension, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.wellbeingDimensions.add(dimension));
  },
};

export const wellbeingSnapshotService = {
  async getForPilot(pilotId: number): Promise<StorageResult<WellbeingSnapshot[]>> {
    return safeRun(() =>
      db.wellbeingSnapshots.where("pilotId").equals(pilotId).sortBy("snapshotDate")
    );
  },
  async getByDimension(pilotId: number, dimensionType: WellbeingDimensionType): Promise<StorageResult<WellbeingSnapshot[]>> {
    return safeRun(() =>
      db.wellbeingSnapshots
        .where("pilotId").equals(pilotId)
        .filter((s) => s.dimensionType === dimensionType)
        .sortBy("snapshotDate")
    );
  },
  async snap(snapshot: Omit<WellbeingSnapshot, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.wellbeingSnapshots.add(snapshot));
  },
};

// ============================================================
// ACHIEVEMENT FRAMEWORK SERVICES (v1.4)
// ============================================================

export const lifeAchievementService = {
  async getForPilot(pilotId: number): Promise<StorageResult<LifeAchievement[]>> {
    return safeRun(() =>
      db.lifeAchievements.where("pilotId").equals(pilotId).sortBy("createdAt")
    );
  },
  async getByCategory(pilotId: number, categoryType: LifeAchievementCategoryType): Promise<StorageResult<LifeAchievement[]>> {
    return safeRun(() =>
      db.lifeAchievements
        .where("pilotId").equals(pilotId)
        .filter((a) => a.categoryType === categoryType)
        .toArray()
    );
  },
  async getVerified(pilotId: number): Promise<StorageResult<LifeAchievement[]>> {
    return safeRun(() =>
      db.lifeAchievements
        .where("pilotId").equals(pilotId)
        .filter((a) => a.isVerified)
        .toArray()
    );
  },
  async getByStatus(pilotId: number, achievementStatus: LifeAchievementStatus): Promise<StorageResult<LifeAchievement[]>> {
    return safeRun(() =>
      db.lifeAchievements
        .where("pilotId").equals(pilotId)
        .filter((a) => a.achievementStatus === achievementStatus)
        .toArray()
    );
  },
  async create(achievement: Omit<LifeAchievement, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.lifeAchievements.add(achievement));
  },
  async setStatus(id: number, achievementStatus: LifeAchievementStatus): Promise<StorageResult<number>> {
    return safeRun(() => db.lifeAchievements.update(id, { achievementStatus }));
  },
  async verify(id: number, verifiedBy: string): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.lifeAchievements.update(id, {
        isVerified: true,
        verifiedBy,
        achievementStatus: "verified" as LifeAchievementStatus,
      })
    );
  },
};

export const lifeAchievementCategoryService = {
  async getAll(): Promise<StorageResult<LifeAchievementCategory[]>> {
    return safeRun(() => db.lifeAchievementCategories.where("isActive").equals(1).toArray());
  },
  async getByType(categoryType: LifeAchievementCategoryType): Promise<StorageResult<LifeAchievementCategory | undefined>> {
    return safeRun(() =>
      db.lifeAchievementCategories.where("categoryType").equals(categoryType).first()
    );
  },
  async create(category: Omit<LifeAchievementCategory, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.lifeAchievementCategories.add(category));
  },
};

export const lifeAchievementProgressService = {
  async getForAchievement(lifeAchievementId: number): Promise<StorageResult<LifeAchievementProgress[]>> {
    return safeRun(() =>
      db.lifeAchievementProgresses.where("lifeAchievementId").equals(lifeAchievementId).sortBy("recordedAt")
    );
  },
  async getLatest(lifeAchievementId: number): Promise<StorageResult<LifeAchievementProgress | undefined>> {
    return safeRun(async () => {
      const entries = await db.lifeAchievementProgresses
        .where("lifeAchievementId").equals(lifeAchievementId)
        .sortBy("recordedAt");
      return entries[entries.length - 1];
    });
  },
  async record(progress: Omit<LifeAchievementProgress, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.lifeAchievementProgresses.add(progress));
  },
};

export const lifeAchievementEvidenceService = {
  async getForAchievement(lifeAchievementId: number): Promise<StorageResult<LifeAchievementEvidence[]>> {
    return safeRun(() =>
      db.lifeAchievementEvidences.where("lifeAchievementId").equals(lifeAchievementId).toArray()
    );
  },
  async getByType(lifeAchievementId: number, evidenceType: LifeAchievementEvidenceType): Promise<StorageResult<LifeAchievementEvidence[]>> {
    return safeRun(() =>
      db.lifeAchievementEvidences
        .where("lifeAchievementId").equals(lifeAchievementId)
        .filter((e) => e.evidenceType === evidenceType)
        .toArray()
    );
  },
  async add(evidence: Omit<LifeAchievementEvidence, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.lifeAchievementEvidences.add(evidence));
  },
};

// ============================================================
// PERSONAL OPERATING SYSTEM SERVICES (v1.4)
// ============================================================

export const lifePrincipleService = {
  async getForPilot(pilotId: number): Promise<StorageResult<LifePrinciple[]>> {
    return safeRun(() =>
      db.lifePrinciples.where("pilotId").equals(pilotId).filter((p) => p.isActive).toArray()
    );
  },
  async getByCategory(pilotId: number, principleCategory: PrincipleCategoryType): Promise<StorageResult<LifePrinciple[]>> {
    return safeRun(() =>
      db.lifePrinciples
        .where("pilotId").equals(pilotId)
        .filter((p) => p.principleCategory === principleCategory && p.isActive)
        .toArray()
    );
  },
  async create(principle: Omit<LifePrinciple, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.lifePrinciples.add(principle));
  },
  async archive(id: number): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.lifePrinciples.update(id, { isActive: false, updatedAt: new Date() })
    );
  },
};

export const personalBeliefService = {
  async getForPilot(pilotId: number): Promise<StorageResult<PersonalBelief[]>> {
    return safeRun(() =>
      db.personalBeliefs.where("pilotId").equals(pilotId).sortBy("createdAt")
    );
  },
  async getByType(pilotId: number, beliefType: BeliefType): Promise<StorageResult<PersonalBelief[]>> {
    return safeRun(() =>
      db.personalBeliefs
        .where("pilotId").equals(pilotId)
        .filter((b) => b.beliefType === beliefType)
        .toArray()
    );
  },
  async getLimiting(pilotId: number): Promise<StorageResult<PersonalBelief[]>> {
    return safeRun(() =>
      db.personalBeliefs
        .where("pilotId").equals(pilotId)
        .filter((b) => b.beliefType === "limiting")
        .toArray()
    );
  },
  async create(belief: Omit<PersonalBelief, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.personalBeliefs.add(belief));
  },
  async evolve(id: number, evolvedTo: string): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.personalBeliefs.update(id, { evolvedTo, challengedAt: new Date() })
    );
  },
};

export const decisionRuleService = {
  async getForPilot(pilotId: number): Promise<StorageResult<DecisionRule[]>> {
    return safeRun(() =>
      db.decisionRules.where("pilotId").equals(pilotId).filter((r) => r.isActive).toArray()
    );
  },
  async getByType(pilotId: number, ruleType: DecisionRuleType): Promise<StorageResult<DecisionRule[]>> {
    return safeRun(() =>
      db.decisionRules
        .where("pilotId").equals(pilotId)
        .filter((r) => r.ruleType === ruleType && r.isActive)
        .toArray()
    );
  },
  async create(rule: Omit<DecisionRule, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.decisionRules.add(rule));
  },
  async archive(id: number): Promise<StorageResult<number>> {
    return safeRun(() => db.decisionRules.update(id, { isActive: false }));
  },
};

export const coreValueEvolutionService = {
  async getForPilot(pilotId: number): Promise<StorageResult<CoreValueEvolution[]>> {
    return safeRun(() =>
      db.coreValueEvolutions.where("pilotId").equals(pilotId).sortBy("evolvedAt")
    );
  },
  async getForValue(pilotId: number, valueId: number): Promise<StorageResult<CoreValueEvolution[]>> {
    return safeRun(() =>
      db.coreValueEvolutions
        .where("pilotId").equals(pilotId)
        .filter((e) => e.valueId === valueId)
        .sortBy("evolvedAt")
    );
  },
  async record(evolution: Omit<CoreValueEvolution, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.coreValueEvolutions.add(evolution));
  },
};

// ============================================================
// FEATURE MANAGEMENT ENGINE SERVICES (v1.3)
// ============================================================

export const featureFlagService = {
  async getAll(): Promise<StorageResult<FeatureFlag[]>> {
    return safeRun(() => db.featureFlags.where("isActive").equals(1).toArray());
  },
  async getByScope(scope: FeatureFlagScope): Promise<StorageResult<FeatureFlag[]>> {
    return safeRun(() =>
      db.featureFlags.where("scope").equals(scope).filter((f) => f.isActive).toArray()
    );
  },
  async getByStatus(flagStatus: FeatureFlagStatus): Promise<StorageResult<FeatureFlag[]>> {
    return safeRun(() => db.featureFlags.where("flagStatus").equals(flagStatus).toArray());
  },
  async getById(id: number): Promise<StorageResult<FeatureFlag | undefined>> {
    return safeRun(() => db.featureFlags.get(id));
  },
  async create(flag: Omit<FeatureFlag, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.featureFlags.add(flag));
  },
  async setStatus(id: number, flagStatus: FeatureFlagStatus): Promise<StorageResult<number>> {
    return safeRun(() => db.featureFlags.update(id, { flagStatus, updatedAt: new Date() }));
  },
};

export const featureFlagAssignmentService = {
  async getForFlag(featureFlagId: number): Promise<StorageResult<FeatureFlagAssignment[]>> {
    return safeRun(() =>
      db.featureFlagAssignments.where("featureFlagId").equals(featureFlagId).toArray()
    );
  },
  async isEnabled(
    featureFlagId: number,
    scope: FeatureFlagScope,
    scopeEntityId: number
  ): Promise<StorageResult<boolean>> {
    return safeRun(async () => {
      const assignment = await db.featureFlagAssignments
        .where("featureFlagId").equals(featureFlagId)
        .filter((a) => a.scope === scope && a.scopeEntityId === scopeEntityId)
        .first();
      return assignment?.isEnabled ?? false;
    });
  },
  async assign(assignment: Omit<FeatureFlagAssignment, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.featureFlagAssignments.add(assignment));
  },
};

export const featureRolloutService = {
  async getActiveForFlag(featureFlagId: number): Promise<StorageResult<FeatureRollout[]>> {
    return safeRun(() =>
      db.featureRollouts
        .where("featureFlagId").equals(featureFlagId)
        .filter((r) => r.isActive)
        .toArray()
    );
  },
  async getByStrategy(strategy: RolloutStrategy): Promise<StorageResult<FeatureRollout[]>> {
    return safeRun(() =>
      db.featureRollouts.where("strategy").equals(strategy).filter((r) => r.isActive).toArray()
    );
  },
  async create(rollout: Omit<FeatureRollout, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.featureRollouts.add(rollout));
  },
};

export const experimentService = {
  async getRunning(): Promise<StorageResult<Experiment[]>> {
    return safeRun(() =>
      db.experiments.where("experimentStatus").equals("running" as ExperimentStatus).toArray()
    );
  },
  async getForFlag(featureFlagId: number): Promise<StorageResult<Experiment[]>> {
    return safeRun(() =>
      db.experiments.where("featureFlagId").equals(featureFlagId).toArray()
    );
  },
  async getById(id: number): Promise<StorageResult<Experiment | undefined>> {
    return safeRun(() => db.experiments.get(id));
  },
  async create(experiment: Omit<Experiment, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.experiments.add(experiment));
  },
  async setStatus(id: number, experimentStatus: ExperimentStatus): Promise<StorageResult<number>> {
    return safeRun(() => db.experiments.update(id, { experimentStatus }));
  },
};

export const experimentVariantService = {
  async getForExperiment(experimentId: number): Promise<StorageResult<ExperimentVariant[]>> {
    return safeRun(() =>
      db.experimentVariants.where("experimentId").equals(experimentId).toArray()
    );
  },
  async getControl(experimentId: number): Promise<StorageResult<ExperimentVariant | undefined>> {
    return safeRun(() =>
      db.experimentVariants
        .where("experimentId").equals(experimentId)
        .filter((v) => v.isControl)
        .first()
    );
  },
  async create(variant: Omit<ExperimentVariant, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.experimentVariants.add(variant));
  },
};

export const featureUsageService = {
  async getForFlag(featureFlagId: number): Promise<StorageResult<FeatureUsage[]>> {
    return safeRun(() =>
      db.featureUsages.where("featureFlagId").equals(featureFlagId).sortBy("usedAt")
    );
  },
  async getForPilot(pilotId: number): Promise<StorageResult<FeatureUsage[]>> {
    return safeRun(() =>
      db.featureUsages.where("pilotId").equals(pilotId).sortBy("usedAt")
    );
  },
  async record(usage: Omit<FeatureUsage, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.featureUsages.add(usage));
  },
};

// ============================================================
// SUBSCRIPTION & LICENSING ENGINE SERVICES (v1.3)
// ============================================================

export const subscriptionService = {
  async getActive(): Promise<StorageResult<Subscription[]>> {
    return safeRun(() =>
      db.subscriptions.where("subscriptionStatus").equals("active" as SubscriptionStatus).toArray()
    );
  },
  async getForPilot(pilotId: number): Promise<StorageResult<Subscription[]>> {
    return safeRun(() =>
      db.subscriptions.where("pilotId").equals(pilotId).sortBy("createdAt")
    );
  },
  async getForSchool(schoolId: number): Promise<StorageResult<Subscription[]>> {
    return safeRun(() =>
      db.subscriptions.where("schoolId").equals(schoolId).toArray()
    );
  },
  async getActivePilotSubscription(pilotId: number): Promise<StorageResult<Subscription | undefined>> {
    return safeRun(() =>
      db.subscriptions
        .where("pilotId").equals(pilotId)
        .filter((s) => s.subscriptionStatus === "active")
        .first()
    );
  },
  async getByTier(tier: SubscriptionTier): Promise<StorageResult<Subscription[]>> {
    return safeRun(() =>
      db.subscriptions.where("tier").equals(tier).toArray()
    );
  },
  async create(sub: Omit<Subscription, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.subscriptions.add(sub));
  },
  async setStatus(id: number, subscriptionStatus: SubscriptionStatus): Promise<StorageResult<number>> {
    return safeRun(() => db.subscriptions.update(id, { subscriptionStatus }));
  },
};

export const entitlementService = {
  async getForSubscription(subscriptionId: number): Promise<StorageResult<Entitlement[]>> {
    return safeRun(() =>
      db.entitlements.where("subscriptionId").equals(subscriptionId).filter((e) => e.isActive).toArray()
    );
  },
  async getByType(subscriptionId: number, entitlementType: EntitlementType): Promise<StorageResult<Entitlement | undefined>> {
    return safeRun(() =>
      db.entitlements
        .where("subscriptionId").equals(subscriptionId)
        .filter((e) => e.entitlementType === entitlementType && e.isActive)
        .first()
    );
  },
  async hasEntitlement(subscriptionId: number, entitlementType: EntitlementType): Promise<StorageResult<boolean>> {
    return safeRun(async () => {
      const e = await db.entitlements
        .where("subscriptionId").equals(subscriptionId)
        .filter((ent) => ent.entitlementType === entitlementType && ent.isActive)
        .first();
      return e !== undefined;
    });
  },
  async create(entitlement: Omit<Entitlement, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.entitlements.add(entitlement));
  },
  async incrementUsage(id: number): Promise<StorageResult<number>> {
    return safeRun(async () => {
      const e = await db.entitlements.get(id);
      return db.entitlements.update(id, { used: (e?.used ?? 0) + 1 });
    });
  },
};

export const usageRecordService = {
  async getForSubscription(subscriptionId: number): Promise<StorageResult<UsageRecord[]>> {
    return safeRun(() =>
      db.usageRecords.where("subscriptionId").equals(subscriptionId).sortBy("recordedAt")
    );
  },
  async record(usage: Omit<UsageRecord, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.usageRecords.add(usage));
  },
};

export const invoiceService = {
  async getForSubscription(subscriptionId: number): Promise<StorageResult<Invoice[]>> {
    return safeRun(() =>
      db.invoices.where("subscriptionId").equals(subscriptionId).sortBy("createdAt")
    );
  },
  async getOverdue(): Promise<StorageResult<Invoice[]>> {
    return safeRun(() =>
      db.invoices.where("invoiceStatus").equals("overdue" as InvoiceStatus).toArray()
    );
  },
  async create(invoice: Omit<Invoice, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.invoices.add(invoice));
  },
  async setStatus(id: number, invoiceStatus: InvoiceStatus): Promise<StorageResult<number>> {
    return safeRun(() => db.invoices.update(id, { invoiceStatus }));
  },
};

export const paymentService = {
  async getForInvoice(invoiceId: number): Promise<StorageResult<Payment[]>> {
    return safeRun(() =>
      db.payments.where("invoiceId").equals(invoiceId).sortBy("attemptedAt")
    );
  },
  async getByStatus(paymentStatus: PaymentStatus): Promise<StorageResult<Payment[]>> {
    return safeRun(() =>
      db.payments.where("paymentStatus").equals(paymentStatus).toArray()
    );
  },
  async getByMethod(paymentMethod: PaymentMethod): Promise<StorageResult<Payment[]>> {
    return safeRun(() =>
      db.payments.where("paymentMethod").equals(paymentMethod).toArray()
    );
  },
  async record(payment: Omit<Payment, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.payments.add(payment));
  },
  async setStatus(id: number, paymentStatus: PaymentStatus): Promise<StorageResult<number>> {
    return safeRun(() => db.payments.update(id, { paymentStatus }));
  },
};

export const licenseService = {
  async getForSchool(schoolId: number): Promise<StorageResult<License[]>> {
    return safeRun(() =>
      db.licenses.where("schoolId").equals(schoolId).filter((l) => l.isActive).toArray()
    );
  },
  async getByType(licenseType: LicenseType): Promise<StorageResult<License[]>> {
    return safeRun(() =>
      db.licenses.where("licenseType").equals(licenseType).filter((l) => l.isActive).toArray()
    );
  },
  async hasAvailableSeat(licenseId: number): Promise<StorageResult<boolean>> {
    return safeRun(async () => {
      const license = await db.licenses.get(licenseId);
      return license ? license.usedSeats < license.seatCount : false;
    });
  },
  async create(license: Omit<License, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.licenses.add(license));
  },
  async incrementSeats(id: number): Promise<StorageResult<number>> {
    return safeRun(async () => {
      const l = await db.licenses.get(id);
      return db.licenses.update(id, { usedSeats: (l?.usedSeats ?? 0) + 1 });
    });
  },
};

export const seatAssignmentService = {
  async getForLicense(licenseId: number): Promise<StorageResult<SeatAssignment[]>> {
    return safeRun(() =>
      db.seatAssignments.where("licenseId").equals(licenseId).filter((s) => s.isActive).toArray()
    );
  },
  async getForPilot(pilotId: number): Promise<StorageResult<SeatAssignment | undefined>> {
    return safeRun(() =>
      db.seatAssignments.where("pilotId").equals(pilotId).filter((s) => s.isActive).first()
    );
  },
  async assign(assignment: Omit<SeatAssignment, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.seatAssignments.add(assignment));
  },
  async revoke(id: number): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.seatAssignments.update(id, { isActive: false, revokedAt: new Date() })
    );
  },
};

// ============================================================
// NOTIFICATION PLATFORM SERVICES (v1.3)
// ============================================================

export const notificationTemplateService = {
  async getActive(channel: NotificationChannelType): Promise<StorageResult<NotificationTemplate[]>> {
    return safeRun(() =>
      db.notificationTemplates.where("channel").equals(channel).filter((t) => t.isActive).toArray()
    );
  },
  async getByType(templateType: NotificationTemplateType, channel: NotificationChannelType): Promise<StorageResult<NotificationTemplate | undefined>> {
    return safeRun(() =>
      db.notificationTemplates
        .where("templateType").equals(templateType)
        .filter((t) => t.channel === channel && t.isActive)
        .first()
    );
  },
  async create(template: Omit<NotificationTemplate, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.notificationTemplates.add(template));
  },
};

export const notificationCampaignService = {
  async getByStatus(campaignStatus: CampaignStatus): Promise<StorageResult<NotificationCampaign[]>> {
    return safeRun(() =>
      db.notificationCampaigns.where("campaignStatus").equals(campaignStatus).toArray()
    );
  },
  async getScheduled(before: Date): Promise<StorageResult<NotificationCampaign[]>> {
    return safeRun(() =>
      db.notificationCampaigns
        .where("campaignStatus").equals("scheduled" as CampaignStatus)
        .filter((c) => c.scheduledAt != null && c.scheduledAt <= before)
        .toArray()
    );
  },
  async create(campaign: Omit<NotificationCampaign, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.notificationCampaigns.add(campaign));
  },
  async setStatus(id: number, campaignStatus: CampaignStatus): Promise<StorageResult<number>> {
    return safeRun(() => db.notificationCampaigns.update(id, { campaignStatus }));
  },
};

export const notificationPreferenceService = {
  async getForPilot(pilotId: number): Promise<StorageResult<NotificationPreference[]>> {
    return safeRun(() =>
      db.notificationPreferences.where("pilotId").equals(pilotId).toArray()
    );
  },
  async isEnabled(pilotId: number, channel: NotificationChannelType): Promise<StorageResult<boolean>> {
    return safeRun(async () => {
      const pref = await db.notificationPreferences
        .where("pilotId").equals(pilotId)
        .filter((p) => p.channel === channel)
        .first();
      return pref?.isEnabled ?? true;
    });
  },
  async upsert(pilotId: number, channel: NotificationChannelType, isEnabled: boolean): Promise<StorageResult<number>> {
    return safeRun(async () => {
      const existing = await db.notificationPreferences
        .where("pilotId").equals(pilotId)
        .filter((p) => p.channel === channel)
        .first();
      if (existing?.id) {
        return db.notificationPreferences.update(existing.id, { isEnabled, updatedAt: new Date() });
      }
      return db.notificationPreferences.add({ pilotId, channel, isEnabled, updatedAt: new Date() });
    });
  },
};

export const notificationDeliveryService = {
  async getForPilot(pilotId: number): Promise<StorageResult<NotificationDelivery[]>> {
    return safeRun(() =>
      db.notificationDeliveries.where("pilotId").equals(pilotId).sortBy("createdAt")
    );
  },
  async getFailed(): Promise<StorageResult<NotificationDelivery[]>> {
    return safeRun(() =>
      db.notificationDeliveries.where("deliveryStatus").equals("failed" as DeliveryStatus).toArray()
    );
  },
  async getForCampaign(campaignId: number): Promise<StorageResult<NotificationDelivery[]>> {
    return safeRun(() =>
      db.notificationDeliveries.filter((d) => d.campaignId === campaignId).toArray()
    );
  },
  async record(delivery: Omit<NotificationDelivery, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.notificationDeliveries.add(delivery));
  },
  async markRead(id: number): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.notificationDeliveries.update(id, { deliveryStatus: "read" as DeliveryStatus, readAt: new Date() })
    );
  },
};

export const notificationAnalyticsService = {
  async getForCampaign(campaignId: number): Promise<StorageResult<NotificationAnalytics[]>> {
    return safeRun(() =>
      db.notificationAnalytics.where("campaignId").equals(campaignId).sortBy("calculatedAt")
    );
  },
  async save(analytics: Omit<NotificationAnalytics, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.notificationAnalytics.add(analytics));
  },
};

export const notificationChannelService = {
  async getEnabled(): Promise<StorageResult<NotificationChannel[]>> {
    return safeRun(() =>
      db.notificationChannels.where("isEnabled").equals(1).sortBy("priority")
    );
  },
  async getByChannel(channel: NotificationChannelType): Promise<StorageResult<NotificationChannel | undefined>> {
    return safeRun(() =>
      db.notificationChannels.where("channel").equals(channel).first()
    );
  },
  async upsert(channel: Omit<NotificationChannel, "id">): Promise<StorageResult<number>> {
    return safeRun(async () => {
      const existing = await db.notificationChannels.where("channel").equals(channel.channel).first();
      if (existing?.id) {
        return db.notificationChannels.update(existing.id, { ...channel, updatedAt: new Date() });
      }
      return db.notificationChannels.add(channel);
    });
  },
};

// ============================================================
// RECOMMENDATION ENGINE SERVICES (v1.3)
// ============================================================

export const recommendationService = {
  async getForPilot(pilotId: number): Promise<StorageResult<Recommendation[]>> {
    return safeRun(() =>
      db.recommendations.where("pilotId").equals(pilotId).sortBy("generatedAt")
    );
  },
  async getPending(pilotId: number): Promise<StorageResult<Recommendation[]>> {
    return safeRun(() =>
      db.recommendations
        .where("pilotId").equals(pilotId)
        .filter((r) => r.recommendationStatus === "pending" || r.recommendationStatus === "shown")
        .toArray()
    );
  },
  async getByType(pilotId: number, recommendationType: RecommendationType): Promise<StorageResult<Recommendation[]>> {
    return safeRun(() =>
      db.recommendations
        .where("pilotId").equals(pilotId)
        .filter((r) => r.recommendationType === recommendationType)
        .toArray()
    );
  },
  async create(rec: Omit<Recommendation, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.recommendations.add(rec));
  },
  async setStatus(id: number, recommendationStatus: RecommendationStatus): Promise<StorageResult<number>> {
    return safeRun(() => db.recommendations.update(id, { recommendationStatus }));
  },
};

export const recommendationFeedbackService = {
  async getForRecommendation(recommendationId: number): Promise<StorageResult<RecommendationFeedback[]>> {
    return safeRun(() =>
      db.recommendationFeedbacks.where("recommendationId").equals(recommendationId).toArray()
    );
  },
  async getByType(feedbackType: RecommendationFeedbackType): Promise<StorageResult<RecommendationFeedback[]>> {
    return safeRun(() =>
      db.recommendationFeedbacks.where("feedbackType").equals(feedbackType).toArray()
    );
  },
  async submit(feedback: Omit<RecommendationFeedback, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.recommendationFeedbacks.add(feedback));
  },
};

export const recommendationHistoryService = {
  async getForPilot(pilotId: number): Promise<StorageResult<RecommendationHistory[]>> {
    return safeRun(() =>
      db.recommendationHistories.where("pilotId").equals(pilotId).sortBy("shownAt")
    );
  },
  async getActedUpon(pilotId: number): Promise<StorageResult<RecommendationHistory[]>> {
    return safeRun(() =>
      db.recommendationHistories
        .where("pilotId").equals(pilotId)
        .filter((h) => h.wasActedUpon)
        .toArray()
    );
  },
  async record(history: Omit<RecommendationHistory, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.recommendationHistories.add(history));
  },
};

export const recommendationModelService = {
  async getActive(): Promise<StorageResult<RecommendationModel[]>> {
    return safeRun(() => db.recommendationModels.where("isActive").equals(1).toArray());
  },
  async getActiveForType(recommendationType: RecommendationType): Promise<StorageResult<RecommendationModel | undefined>> {
    return safeRun(() =>
      db.recommendationModels
        .where("recommendationType").equals(recommendationType)
        .filter((m) => m.isActive)
        .first()
    );
  },
  async create(model: Omit<RecommendationModel, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.recommendationModels.add(model));
  },
};

// ============================================================
// KNOWLEDGE GRAPH ENGINE SERVICES (v1.3)
// ============================================================

export const knowledgeNodeService = {
  async getByType(nodeType: KnowledgeNodeType): Promise<StorageResult<KnowledgeNode[]>> {
    return safeRun(() =>
      db.knowledgeNodes.where("nodeType").equals(nodeType).filter((n) => n.isActive).toArray()
    );
  },
  async getForEntity(entityType: string, entityId: number): Promise<StorageResult<KnowledgeNode[]>> {
    return safeRun(() =>
      db.knowledgeNodes
        .where("entityType").equals(entityType)
        .filter((n) => n.entityId === entityId && n.isActive)
        .toArray()
    );
  },
  async getById(id: number): Promise<StorageResult<KnowledgeNode | undefined>> {
    return safeRun(() => db.knowledgeNodes.get(id));
  },
  async create(node: Omit<KnowledgeNode, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.knowledgeNodes.add(node));
  },
};

export const knowledgeRelationshipService = {
  async getFromNode(fromNodeId: number): Promise<StorageResult<KnowledgeRelationship[]>> {
    return safeRun(() =>
      db.knowledgeRelationships.where("fromNodeId").equals(fromNodeId).toArray()
    );
  },
  async getToNode(toNodeId: number): Promise<StorageResult<KnowledgeRelationship[]>> {
    return safeRun(() =>
      db.knowledgeRelationships.where("toNodeId").equals(toNodeId).toArray()
    );
  },
  async getByType(relationshipType: KnowledgeRelationshipType): Promise<StorageResult<KnowledgeRelationship[]>> {
    return safeRun(() =>
      db.knowledgeRelationships.where("relationshipType").equals(relationshipType).toArray()
    );
  },
  async create(rel: Omit<KnowledgeRelationship, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.knowledgeRelationships.add(rel));
  },
};

export const semanticTagService = {
  async getForEntity(entityType: string, entityId: number): Promise<StorageResult<SemanticTag[]>> {
    return safeRun(() =>
      db.semanticTags
        .where("entityType").equals(entityType)
        .filter((t) => t.entityId === entityId)
        .toArray()
    );
  },
  async getByTag(tag: string): Promise<StorageResult<SemanticTag[]>> {
    return safeRun(() => db.semanticTags.where("tag").equals(tag).toArray());
  },
  async getForNode(knowledgeNodeId: number): Promise<StorageResult<SemanticTag[]>> {
    return safeRun(() =>
      db.semanticTags.where("knowledgeNodeId").equals(knowledgeNodeId).toArray()
    );
  },
  async tag(tag: Omit<SemanticTag, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.semanticTags.add(tag));
  },
};

export const ontologyService = {
  async getActive(): Promise<StorageResult<Ontology[]>> {
    return safeRun(() => db.ontologies.where("isActive").equals(1).toArray());
  },
  async getByDomain(domain: string): Promise<StorageResult<Ontology[]>> {
    return safeRun(() =>
      db.ontologies.where("domain").equals(domain).filter((o) => o.isActive).toArray()
    );
  },
  async create(ontology: Omit<Ontology, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.ontologies.add(ontology));
  },
};

// ============================================================
// AI GOVERNANCE ENGINE SERVICES (v1.3)
// ============================================================

export const aiModelService = {
  async getActive(): Promise<StorageResult<AIModel[]>> {
    return safeRun(() => db.aiModels.where("isActive").equals(1).toArray());
  },
  async getByProvider(provider: AIModelProvider): Promise<StorageResult<AIModel[]>> {
    return safeRun(() =>
      db.aiModels.where("provider").equals(provider).filter((m) => m.isActive).toArray()
    );
  },
  async getByType(modelType: AIModelType): Promise<StorageResult<AIModel[]>> {
    return safeRun(() =>
      db.aiModels.where("modelType").equals(modelType).filter((m) => m.isActive).toArray()
    );
  },
  async getById(id: number): Promise<StorageResult<AIModel | undefined>> {
    return safeRun(() => db.aiModels.get(id));
  },
  async create(model: Omit<AIModel, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.aiModels.add(model));
  },
};

export const promptTemplateService = {
  async getActiveForUseCase(useCase: AIUsageType): Promise<StorageResult<PromptTemplate[]>> {
    return safeRun(() =>
      db.promptTemplates
        .where("useCase").equals(useCase)
        .filter((p) => p.isActive && p.promptStatus === "approved")
        .toArray()
    );
  },
  async getForModel(aiModelId: number): Promise<StorageResult<PromptTemplate[]>> {
    return safeRun(() =>
      db.promptTemplates.where("aiModelId").equals(aiModelId).filter((p) => p.isActive).toArray()
    );
  },
  async create(template: Omit<PromptTemplate, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.promptTemplates.add(template));
  },
  async setStatus(id: number, promptStatus: PromptStatus): Promise<StorageResult<number>> {
    return safeRun(() => db.promptTemplates.update(id, { promptStatus }));
  },
};

export const promptVersionService = {
  async getApprovedForTemplate(promptTemplateId: number): Promise<StorageResult<PromptVersion | undefined>> {
    return safeRun(async () => {
      const versions = await db.promptVersions
        .where("promptTemplateId").equals(promptTemplateId)
        .filter((v) => v.promptStatus === "approved")
        .sortBy("version");
      return versions[versions.length - 1];
    });
  },
  async getHistory(promptTemplateId: number): Promise<StorageResult<PromptVersion[]>> {
    return safeRun(() =>
      db.promptVersions.where("promptTemplateId").equals(promptTemplateId).sortBy("version")
    );
  },
  async create(version: Omit<PromptVersion, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.promptVersions.add(version));
  },
};

export const promptExecutionService = {
  async getForVersion(promptVersionId: number): Promise<StorageResult<PromptExecution[]>> {
    return safeRun(() =>
      db.promptExecutions.where("promptVersionId").equals(promptVersionId).sortBy("executedAt")
    );
  },
  async getFailures(promptVersionId: number): Promise<StorageResult<PromptExecution[]>> {
    return safeRun(() =>
      db.promptExecutions
        .where("promptVersionId").equals(promptVersionId)
        .filter((e) => !e.wasSuccessful)
        .toArray()
    );
  },
  async record(execution: Omit<PromptExecution, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.promptExecutions.add(execution));
  },
};

export const aiUsageService = {
  async getForPilot(pilotId: number): Promise<StorageResult<AIUsage[]>> {
    return safeRun(() =>
      db.aiUsages.where("pilotId").equals(pilotId).sortBy("recordedAt")
    );
  },
  async getByType(usageType: AIUsageType): Promise<StorageResult<AIUsage[]>> {
    return safeRun(() =>
      db.aiUsages.where("usageType").equals(usageType).toArray()
    );
  },
  async getTotalCost(pilotId: number): Promise<StorageResult<number>> {
    return safeRun(async () => {
      const usages = await db.aiUsages.where("pilotId").equals(pilotId).toArray();
      return usages.reduce((sum, u) => sum + u.costEstimateUsd, 0);
    });
  },
  async record(usage: Omit<AIUsage, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.aiUsages.add(usage));
  },
};

export const aiSafetyReviewService = {
  async getPending(): Promise<StorageResult<AISafetyReview[]>> {
    return safeRun(() =>
      db.aiSafetyReviews.where("safetyReviewStatus").equals("pending" as SafetyReviewStatus).toArray()
    );
  },
  async getForVersion(promptVersionId: number): Promise<StorageResult<AISafetyReview[]>> {
    return safeRun(() =>
      db.aiSafetyReviews.where("promptVersionId").equals(promptVersionId).toArray()
    );
  },
  async create(review: Omit<AISafetyReview, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.aiSafetyReviews.add(review));
  },
  async setStatus(id: number, safetyReviewStatus: SafetyReviewStatus): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.aiSafetyReviews.update(id, { safetyReviewStatus, reviewedAt: new Date() })
    );
  },
};

export const aiFeedbackService = {
  async getForExecution(promptExecutionId: number): Promise<StorageResult<AIFeedback[]>> {
    return safeRun(() =>
      db.aiFeedbacks.where("promptExecutionId").equals(promptExecutionId).toArray()
    );
  },
  async getHallucinations(): Promise<StorageResult<AIFeedback[]>> {
    return safeRun(() =>
      db.aiFeedbacks.filter((f) => f.wasHallucination).toArray()
    );
  },
  async submit(feedback: Omit<AIFeedback, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.aiFeedbacks.add(feedback));
  },
};

// ============================================================
// INTEGRATION PLATFORM SERVICES (v1.3)
// ============================================================

export const externalIntegrationService = {
  async getActive(): Promise<StorageResult<ExternalIntegration[]>> {
    return safeRun(() => db.externalIntegrations.where("isActive").equals(1).toArray());
  },
  async getByType(integrationType: IntegrationType): Promise<StorageResult<ExternalIntegration[]>> {
    return safeRun(() =>
      db.externalIntegrations.where("integrationType").equals(integrationType).filter((i) => i.isActive).toArray()
    );
  },
  async getForSchool(schoolId: number): Promise<StorageResult<ExternalIntegration[]>> {
    return safeRun(() =>
      db.externalIntegrations.where("schoolId").equals(schoolId).filter((i) => i.isActive).toArray()
    );
  },
  async getById(id: number): Promise<StorageResult<ExternalIntegration | undefined>> {
    return safeRun(() => db.externalIntegrations.get(id));
  },
  async create(integration: Omit<ExternalIntegration, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.externalIntegrations.add(integration));
  },
  async setStatus(id: number, integrationStatus: IntegrationStatus): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.externalIntegrations.update(id, { integrationStatus, updatedAt: new Date() })
    );
  },
};

export const webhookService = {
  async getActive(tenantId: number): Promise<StorageResult<Webhook[]>> {
    return safeRun(() =>
      db.webhooks
        .where("tenantId").equals(tenantId)
        .filter((w) => w.webhookStatus === "active")
        .toArray()
    );
  },
  async getByStatus(webhookStatus: WebhookStatus): Promise<StorageResult<Webhook[]>> {
    return safeRun(() =>
      db.webhooks.where("webhookStatus").equals(webhookStatus).toArray()
    );
  },
  async create(webhook: Omit<Webhook, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.webhooks.add(webhook));
  },
  async setStatus(id: number, webhookStatus: WebhookStatus): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.webhooks.update(id, { webhookStatus, updatedAt: new Date() })
    );
  },
};

export const integrationLogService = {
  async getForIntegration(externalIntegrationId: number): Promise<StorageResult<IntegrationLog[]>> {
    return safeRun(() =>
      db.integrationLogs.where("externalIntegrationId").equals(externalIntegrationId).sortBy("loggedAt")
    );
  },
  async getErrors(externalIntegrationId: number): Promise<StorageResult<IntegrationLog[]>> {
    return safeRun(() =>
      db.integrationLogs
        .where("externalIntegrationId").equals(externalIntegrationId)
        .filter((l) => l.status === "error")
        .toArray()
    );
  },
  async append(log: Omit<IntegrationLog, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.integrationLogs.add(log));
  },
};

export const integrationEventService = {
  async getPending(): Promise<StorageResult<IntegrationEvent[]>> {
    return safeRun(() =>
      db.integrationEvents.filter((e) => !e.isProcessed).sortBy("createdAt")
    );
  },
  async getForIntegration(externalIntegrationId: number): Promise<StorageResult<IntegrationEvent[]>> {
    return safeRun(() =>
      db.integrationEvents.where("externalIntegrationId").equals(externalIntegrationId).sortBy("createdAt")
    );
  },
  async enqueue(event: Omit<IntegrationEvent, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.integrationEvents.add(event));
  },
  async markProcessed(id: number): Promise<StorageResult<number>> {
    return safeRun(() =>
      db.integrationEvents.update(id, { isProcessed: true, processedAt: new Date() })
    );
  },
};

// ============================================================
// LOCALIZATION PLATFORM SERVICES (v1.3)
// ============================================================

export const languageService = {
  async getActive(): Promise<StorageResult<Language[]>> {
    return safeRun(() => db.languages.where("isActive").equals(1).toArray());
  },
  async getFree(): Promise<StorageResult<Language[]>> {
    return safeRun(() =>
      db.languages.where("isActive").equals(1).filter((l) => !l.isPremium).toArray()
    );
  },
  async getByCode(code: string): Promise<StorageResult<Language | undefined>> {
    return safeRun(() => db.languages.where("code").equals(code).first());
  },
  async create(language: Omit<Language, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.languages.add(language));
  },
};

export const translationService = {
  async getForEntity(entityType: string, entityId: number, language: string): Promise<StorageResult<Translation[]>> {
    return safeRun(() =>
      db.translations
        .where("entityType").equals(entityType)
        .filter((t) => t.entityId === entityId && t.language === language)
        .toArray()
    );
  },
  async getField(entityType: string, entityId: number, fieldName: string, language: string): Promise<StorageResult<Translation | undefined>> {
    return safeRun(() =>
      db.translations
        .where("entityType").equals(entityType)
        .filter((t) => t.entityId === entityId && t.fieldName === fieldName && t.language === language)
        .first()
    );
  },
  async upsert(translation: Omit<Translation, "id">): Promise<StorageResult<number>> {
    return safeRun(async () => {
      const existing = await db.translations
        .where("entityType").equals(translation.entityType)
        .filter((t) =>
          t.entityId === translation.entityId &&
          t.fieldName === translation.fieldName &&
          t.language === translation.language
        )
        .first();
      if (existing?.id) {
        return db.translations.update(existing.id, {
          translatedValue: translation.translatedValue,
          localizationStatus: translation.localizationStatus,
          translatedAt: new Date(),
        });
      }
      return db.translations.add(translation);
    });
  },
};

export const countryConfigurationService = {
  async getActive(): Promise<StorageResult<CountryConfiguration[]>> {
    return safeRun(() => db.countryConfigurations.where("isActive").equals(1).toArray());
  },
  async getByCode(countryCode: string): Promise<StorageResult<CountryConfiguration | undefined>> {
    return safeRun(() => db.countryConfigurations.where("countryCode").equals(countryCode).first());
  },
  async create(config: Omit<CountryConfiguration, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.countryConfigurations.add(config));
  },
};

export const regionalPolicyService = {
  async getActive(countryCode: string): Promise<StorageResult<RegionalPolicy[]>> {
    return safeRun(() =>
      db.regionalPolicies
        .where("countryCode").equals(countryCode)
        .filter((p) => p.isActive)
        .toArray()
    );
  },
  async getByType(countryCode: string, policyType: RegionalPolicyType): Promise<StorageResult<RegionalPolicy | undefined>> {
    return safeRun(() =>
      db.regionalPolicies
        .where("countryCode").equals(countryCode)
        .filter((p) => p.policyType === policyType && p.isActive)
        .first()
    );
  },
  async create(policy: Omit<RegionalPolicy, "id">): Promise<StorageResult<number>> {
    return safeRun(() => db.regionalPolicies.add(policy));
  },
};
