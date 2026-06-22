import Dexie, { type Table } from "dexie";
import type {
  Pilot,
  Settings,
  LanguagePreference,
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
  // v1.0
  LifeStateSnapshot,
  CharacterMemorySource,
  CharacterRelationshipEvent,
  CoPilotPermission,
  AudioAsset,
  AudioPackage,
  // v1.1 — RP-001 gap closures
  // v1.2 — RP-002 strategic capability expansion
  // v1.4 — RP-003 Human-Centric Domains
  DevelopmentStage,
  GrowthDimension,
  DevelopmentMilestone,
  GrowthIndicator,
  Curriculum,
  CurriculumModule,
  LearningOutcome,
  CompetencyMapping,
  PersonalityProfile,
  PersonalityAssessment,
  PersonalityTrait,
  PersonalityGrowth,
  DecisionScenario,
  DecisionScenarioOutcome,
  DecisionReflection,
  DecisionPattern,
  LifeTimelineEvent,
  TimelineCollection,
  TimelineNarrative,
  WellbeingProfile,
  WellbeingAssessment,
  WellbeingDimension,
  WellbeingSnapshot,
  LifeAchievement,
  LifeAchievementCategory,
  LifeAchievementProgress,
  LifeAchievementEvidence,
  LifePrinciple,
  PersonalBelief,
  DecisionRule,
  CoreValueEvolution,
  // v1.3 — RP-003 platform infrastructure
  FeatureFlag,
  FeatureFlagAssignment,
  FeatureRollout,
  Experiment,
  ExperimentVariant,
  FeatureUsage,
  Subscription,
  Entitlement,
  UsageRecord,
  Invoice,
  Payment,
  License,
  SeatAssignment,
  NotificationTemplate,
  NotificationCampaign,
  NotificationPreference,
  NotificationDelivery,
  NotificationAnalytics,
  NotificationChannel,
  Recommendation,
  RecommendationCandidate,
  RecommendationFeedback,
  RecommendationHistory,
  RecommendationModel,
  KnowledgeNode,
  KnowledgeRelationship,
  KnowledgeCluster,
  SemanticTag,
  Ontology,
  AIModel,
  PromptTemplate,
  PromptVersion,
  PromptExecution,
  AIUsage,
  AISafetyReview,
  AIFeedback,
  ExternalIntegration,
  APIKey,
  Webhook,
  WebhookSubscription,
  OAuthConnection,
  SyncConnector,
  IntegrationLog,
  IntegrationEvent,
  Language,
  Translation,
  LocalizedContent,
  CountryConfiguration,
  RegionalPolicy,
  TimezoneConfiguration,
  // v1.2 — RP-002 strategic capability expansion
  Assessment,
  AssessmentQuestion,
  AssessmentResponse,
  AssessmentResult,
  InstitutionReport,
  ClassroomReport,
  CohortInsight,
  Counsellor,
  CounsellorSession,
  AuditLog,
  InterventionRule,
  InterventionRecommendation,
  EmergingIdentity,
  IdentitySignal,
  IdentityMoment,
  FuturePath,
  FutureSnapshot,
  WorldLocation,
  LocationCharacter,
  LocationScenario,
  PilotLocationVisit,
  LocationUnlock,
  PilotMemory,
  MemoryReaction,
  MemoryReplay,
  CharacterArc,
  CharacterArcStage,
  Discovery,
  PilotDiscovery,
  DailyChallenge,
  StreakReward,
  ConsentRecord,
  VoiceConsent,
  AIConsentRecord,
  SyncQueue,
  ScenarioTemplate,
  DialogueTemplate,
  ContentPack,
  ContentLocalizationStatus,
  LocalizationTask,
} from "../types";
import type {
  FlightPlanGoal,
  FlightLogEntry,
  Reflection,
  FutureVision,
  FutureMilestone,
  FutureLetter,
  Competency,
  CompetencyPractice,
  GrowthEvidence,
  Achievement,
  Mission,
  MissionCompletion,
  Habit,
  HabitActivity,
  Career,
  CareerSkill,
  CareerExploration,
  FinancialConcept,
  FinancialLessonProgress,
  LifeChoiceScenario,
  LifeChoiceOption,
  LifeChoiceOutcome,
  CoPilot,
  ConversationStarter,
  DecisionJournal,
  DecisionOutcome,
  LifeProject,
  LifeProjectMilestone,
  LifeRole,
  Value,
  ValuePractice,
  CultureStory,
  TimelineEvent,
  // v0.1.1 extensions
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
  // AI — reserved, modelled only
  AIConversation,
  AIRecommendation,
  AIInsight,
} from "../types";
import type {
  PilotInterest,
  PilotGrowthGoal,
  PilotPreference,
  PilotSignal,
  PilotAffinity,
  PilotAspiration,
  PilotContentHistory,
} from "../types";

export class LifePilotDatabase extends Dexie {
  // Core
  pilots!: Table<Pilot>;
  settings!: Table<Settings>;
  languagePreferences!: Table<LanguagePreference>;

  // Flight Plan
  flightPlanGoals!: Table<FlightPlanGoal>;

  // Flight Log
  flightLogEntries!: Table<FlightLogEntry>;
  reflections!: Table<Reflection>;

  // Future Me
  futureVisions!: Table<FutureVision>;
  futureMilestones!: Table<FutureMilestone>;
  futureLetters!: Table<FutureLetter>;

  // Competency & Growth
  competencies!: Table<Competency>;
  competencyPractices!: Table<CompetencyPractice>;
  growthEvidence!: Table<GrowthEvidence>;

  // Missions & Achievements
  achievements!: Table<Achievement>;
  missions!: Table<Mission>;
  missionCompletions!: Table<MissionCompletion>;

  // Habits
  habits!: Table<Habit>;
  habitActivities!: Table<HabitActivity>;

  // Career Explorer
  careers!: Table<Career>;
  careerSkills!: Table<CareerSkill>;
  careerExplorations!: Table<CareerExploration>;

  // Money Quest
  financialConcepts!: Table<FinancialConcept>;
  financialLessonProgress!: Table<FinancialLessonProgress>;

  // Life Choices
  lifeChoiceScenarios!: Table<LifeChoiceScenario>;
  lifeChoiceOptions!: Table<LifeChoiceOption>;
  lifeChoiceOutcomes!: Table<LifeChoiceOutcome>;

  // Co-Pilot & Conversations
  coPilots!: Table<CoPilot>;
  conversationStarters!: Table<ConversationStarter>;
  decisionJournals!: Table<DecisionJournal>;
  decisionOutcomes!: Table<DecisionOutcome>;

  // Life Projects & Roles
  lifeProjects!: Table<LifeProject>;
  lifeProjectMilestones!: Table<LifeProjectMilestone>;
  lifeRoles!: Table<LifeRole>;
  values!: Table<Value>;
  valuePractices!: Table<ValuePractice>;

  // Culture & Timeline
  cultureStories!: Table<CultureStory>;
  timelineEvents!: Table<TimelineEvent>;

  // v0.1.1 — Content Domain
  contentItems!: Table<ContentItem>;

  // v0.1.1 — Learning Path Domain
  learningPaths!: Table<LearningPath>;
  learningPathSteps!: Table<LearningPathStep>;
  pilotLearningPaths!: Table<PilotLearningPath>;

  // v0.1.1 — Premium Domain
  subscriptionPlans!: Table<SubscriptionPlan>;
  pilotSubscriptions!: Table<PilotSubscription>;

  // v0.1.1 — Achievement Enhancement
  badges!: Table<Badge>;
  certificates!: Table<Certificate>;

  // v0.1.1 — Parent Domain Enhancement
  familyChallenges!: Table<FamilyChallenge>;
  familyChallengeParticipants!: Table<FamilyChallengeParticipant>;

  // v0.1.1 — School Domain
  schools!: Table<School>;
  teachers!: Table<Teacher>;
  classrooms!: Table<Classroom>;
  programs!: Table<Program>;
  enrollments!: Table<Enrollment>;
  participations!: Table<Participation>;

  // v0.1.1 — Enterprise / CSR Domain
  tenants!: Table<Tenant>;
  organizations!: Table<Organization>;
  deployments!: Table<Deployment>;

  // v0.1.1 — AI Domain (reserved — no services/screens)
  aiConversations!: Table<AIConversation>;
  aiRecommendations!: Table<AIRecommendation>;
  aiInsights!: Table<AIInsight>;

  // v0.1.2 — Activity Event System
  activityEvents!: Table<ActivityEvent>;

  // v0.1.2 — Notification Domain
  notifications!: Table<Notification>;

  // v0.1.2 — Career Roadmap Domain
  careerRoadmaps!: Table<CareerRoadmap>;
  careerRoadmapSteps!: Table<CareerRoadmapStep>;

  // v0.1.2 — Competency Catalog Model
  competencyCatalog!: Table<CompetencyCatalog>;
  pilotCompetencies!: Table<PilotCompetency>;

  // v0.1.2 — Value Catalog Model
  valueCatalog!: Table<ValueCatalog>;
  pilotValues!: Table<PilotValue>;

  // v0.1.2 — Content Revision History
  contentRevisions!: Table<ContentRevision>;

  // v0.1.3 — Identity Domain
  pilotIdentity!: Table<PilotIdentity>;

  // v0.1.3 — Life Experience Domain
  lifeExperiences!: Table<LifeExperience>;

  // v0.1.3 — Life Chapter Domain
  lifeChapters!: Table<LifeChapter>;

  // v0.1.3 — Decision Journey Domain
  decisionRecords!: Table<DecisionRecord>;

  // v0.1.3 — Relationship Reflection Domain
  relationshipReflections!: Table<RelationshipReflection>;

  // v0.1.3 — Strengths Domain
  strengthCatalog!: Table<StrengthCatalog>;
  pilotStrengths!: Table<PilotStrength>;

  // v0.1.3 — Purpose Domain
  purposeStatements!: Table<PurposeStatement>;

  // v0.1.3 — Real World Impact Domain
  impactEvidence!: Table<ImpactEvidence>;

  // v0.1.3 — Future Identity Domain
  futureIdentities!: Table<FutureIdentity>;

  // v0.1.3 — Life Balance Domain
  lifeWheelSnapshots!: Table<LifeWheelSnapshot>;

  // v1.0 — Freeze Gap Closures
  lifeStateSnapshots!: Table<LifeStateSnapshot>;
  characterMemorySources!: Table<CharacterMemorySource>;
  characterRelationshipEvents!: Table<CharacterRelationshipEvent>;
  coPilotPermissions!: Table<CoPilotPermission>;
  audioAssets!: Table<AudioAsset>;
  audioPackages!: Table<AudioPackage>;

  // v1.1 — RP-001: Emerging Identity Engine
  emergingIdentities!: Table<EmergingIdentity>;
  identitySignals!: Table<IdentitySignal>;
  identityMoments!: Table<IdentityMoment>;

  // v1.1 — RP-001: Future Path Engine
  futurePaths!: Table<FuturePath>;
  futureSnapshots!: Table<FutureSnapshot>;

  // v1.1 — RP-001: World Engine
  worldLocations!: Table<WorldLocation>;
  locationCharacters!: Table<LocationCharacter>;
  locationScenarios!: Table<LocationScenario>;
  pilotLocationVisits!: Table<PilotLocationVisit>;
  locationUnlocks!: Table<LocationUnlock>;

  // v1.1 — RP-001: Pilot Memory Engine
  pilotMemories!: Table<PilotMemory>;
  memoryReactions!: Table<MemoryReaction>;
  memoryReplays!: Table<MemoryReplay>;

  // v1.1 — RP-001: Character Arc Engine
  characterArcs!: Table<CharacterArc>;
  characterArcStages!: Table<CharacterArcStage>;

  // v1.1 — RP-001: Discovery Engine
  discoveries!: Table<Discovery>;
  pilotDiscoveries!: Table<PilotDiscovery>;

  // v1.1 — RP-001: Retention Engine
  dailyChallenges!: Table<DailyChallenge>;
  streakRewards!: Table<StreakReward>;

  // v1.1 — RP-001: Critical Compliance
  consentRecords!: Table<ConsentRecord>;
  voiceConsents!: Table<VoiceConsent>;
  aiConsentRecords!: Table<AIConsentRecord>;
  syncQueue!: Table<SyncQueue>;

  // v1.1 — RP-001: Content Scale Engine
  scenarioTemplates!: Table<ScenarioTemplate>;
  dialogueTemplates!: Table<DialogueTemplate>;
  contentPacks!: Table<ContentPack>;
  contentLocalizationStatuses!: Table<ContentLocalizationStatus>;
  localizationTasks!: Table<LocalizationTask>;

  // v1.2 — RP-002: Assessment Engine
  assessments!: Table<Assessment>;
  assessmentQuestions!: Table<AssessmentQuestion>;
  assessmentResponses!: Table<AssessmentResponse>;
  assessmentResults!: Table<AssessmentResult>;

  // v1.2 — RP-002: Institution Reporting Engine
  institutionReports!: Table<InstitutionReport>;
  classroomReports!: Table<ClassroomReport>;
  cohortInsights!: Table<CohortInsight>;

  // v1.2 — RP-002: Counsellor Engine
  counsellors!: Table<Counsellor>;
  counsellorSessions!: Table<CounsellorSession>;

  // v1.2 — RP-002: Compliance Audit Engine
  auditLogs!: Table<AuditLog>;

  // v1.2 — RP-002: Intervention Engine
  interventionRules!: Table<InterventionRule>;
  interventionRecommendations!: Table<InterventionRecommendation>;

  // v1.4 — RP-003: Human Development Framework
  developmentStages!: Table<DevelopmentStage>;
  growthDimensions!: Table<GrowthDimension>;
  developmentMilestones!: Table<DevelopmentMilestone>;
  growthIndicators!: Table<GrowthIndicator>;

  // v1.4 — RP-003: Curriculum Framework
  curricula!: Table<Curriculum>;
  curriculumModules!: Table<CurriculumModule>;
  learningOutcomes!: Table<LearningOutcome>;
  competencyMappings!: Table<CompetencyMapping>;

  // v1.4 — RP-003: Personality Evolution
  personalityProfiles!: Table<PersonalityProfile>;
  personalityAssessments!: Table<PersonalityAssessment>;
  personalityTraits!: Table<PersonalityTrait>;
  personalityGrowths!: Table<PersonalityGrowth>;

  // v1.4 — RP-003: Decision Intelligence
  decisionScenarios!: Table<DecisionScenario>;
  decisionScenarioOutcomes!: Table<DecisionScenarioOutcome>;
  decisionReflections!: Table<DecisionReflection>;
  decisionPatterns!: Table<DecisionPattern>;

  // v1.4 — RP-003: Life Timeline
  lifeTimelineEvents!: Table<LifeTimelineEvent>;
  timelineCollections!: Table<TimelineCollection>;
  timelineNarratives!: Table<TimelineNarrative>;

  // v1.4 — RP-003: Wellbeing Framework
  wellbeingProfiles!: Table<WellbeingProfile>;
  wellbeingAssessments!: Table<WellbeingAssessment>;
  wellbeingDimensions!: Table<WellbeingDimension>;
  wellbeingSnapshots!: Table<WellbeingSnapshot>;

  // v1.4 — RP-003: Achievement Framework (portfolio-grade, distinct from gamification achievements)
  lifeAchievements!: Table<LifeAchievement>;
  lifeAchievementCategories!: Table<LifeAchievementCategory>;
  lifeAchievementProgresses!: Table<LifeAchievementProgress>;
  lifeAchievementEvidences!: Table<LifeAchievementEvidence>;

  // v1.4 — RP-003: Personal Operating System
  lifePrinciples!: Table<LifePrinciple>;
  personalBeliefs!: Table<PersonalBelief>;
  decisionRules!: Table<DecisionRule>;
  coreValueEvolutions!: Table<CoreValueEvolution>;

  // v1.3 — RP-003: Feature Management Engine
  featureFlags!: Table<FeatureFlag>;
  featureFlagAssignments!: Table<FeatureFlagAssignment>;
  featureRollouts!: Table<FeatureRollout>;
  experiments!: Table<Experiment>;
  experimentVariants!: Table<ExperimentVariant>;
  featureUsages!: Table<FeatureUsage>;

  // v1.3 — RP-003: Subscription & Licensing Engine
  subscriptions!: Table<Subscription>;
  entitlements!: Table<Entitlement>;
  usageRecords!: Table<UsageRecord>;
  invoices!: Table<Invoice>;
  payments!: Table<Payment>;
  licenses!: Table<License>;
  seatAssignments!: Table<SeatAssignment>;

  // v1.3 — RP-003: Notification Platform
  notificationTemplates!: Table<NotificationTemplate>;
  notificationCampaigns!: Table<NotificationCampaign>;
  notificationPreferences!: Table<NotificationPreference>;
  notificationDeliveries!: Table<NotificationDelivery>;
  notificationAnalytics!: Table<NotificationAnalytics>;
  notificationChannels!: Table<NotificationChannel>;

  // v1.3 — RP-003: Recommendation Engine
  recommendations!: Table<Recommendation>;
  recommendationCandidates!: Table<RecommendationCandidate>;
  recommendationFeedbacks!: Table<RecommendationFeedback>;
  recommendationHistories!: Table<RecommendationHistory>;
  recommendationModels!: Table<RecommendationModel>;

  // v1.3 — RP-003: Knowledge Graph Engine
  knowledgeNodes!: Table<KnowledgeNode>;
  knowledgeRelationships!: Table<KnowledgeRelationship>;
  knowledgeClusters!: Table<KnowledgeCluster>;
  semanticTags!: Table<SemanticTag>;
  ontologies!: Table<Ontology>;

  // v1.3 — RP-003: AI Governance Engine
  aiModels!: Table<AIModel>;
  promptTemplates!: Table<PromptTemplate>;
  promptVersions!: Table<PromptVersion>;
  promptExecutions!: Table<PromptExecution>;
  aiUsages!: Table<AIUsage>;
  aiSafetyReviews!: Table<AISafetyReview>;
  aiFeedbacks!: Table<AIFeedback>;

  // v1.3 — RP-003: Integration Platform
  externalIntegrations!: Table<ExternalIntegration>;
  apiKeys!: Table<APIKey>;
  webhooks!: Table<Webhook>;
  webhookSubscriptions!: Table<WebhookSubscription>;
  oAuthConnections!: Table<OAuthConnection>;
  syncConnectors!: Table<SyncConnector>;
  integrationLogs!: Table<IntegrationLog>;
  integrationEvents!: Table<IntegrationEvent>;

  // v1.3 — RP-003: Localization Platform
  languages!: Table<Language>;
  translations!: Table<Translation>;
  localizedContents!: Table<LocalizedContent>;
  countryConfigurations!: Table<CountryConfiguration>;
  regionalPolicies!: Table<RegionalPolicy>;
  timezoneConfigurations!: Table<TimezoneConfiguration>;

  // v0.1.5 — Character, Narrative & Voice Engine
  characters!: Table<Character>;
  voiceProfiles!: Table<VoiceProfile>;
  futureCharacters!: Table<FutureCharacter>;
  storyArcs!: Table<StoryArc>;
  storyChapters!: Table<StoryChapter>;
  dialogueNodes!: Table<DialogueNode>;
  dialogueChoices!: Table<DialogueChoice>;
  conversationSessions!: Table<ConversationSession>;
  characterRelationships!: Table<CharacterRelationship>;
  characterMemories!: Table<CharacterMemory>;
  voiceInteractions!: Table<VoiceInteraction>;
  narrativeTriggers!: Table<NarrativeTrigger>;
  avatars!: Table<Avatar>;
  avatarUnlocks!: Table<AvatarUnlock>;

  // v0.1.4 — Simulation Engine
  scenarios!: Table<Scenario>;
  scenarioChoices!: Table<ScenarioChoice>;
  choiceConsequences!: Table<ChoiceConsequence>;
  lifeState!: Table<LifeState>;
  lifeStateTransitions!: Table<LifeStateTransition>;
  pilotScenarioPlays!: Table<PilotScenarioPlay>;
  scenarioReflections!: Table<ScenarioReflection>;
  scenarioRewards!: Table<ScenarioReward>;
  scenarioOutcomePaths!: Table<ScenarioOutcomePath>;
  scenarioPrerequisites!: Table<ScenarioPrerequisite>;
  scenarioUnlocks!: Table<ScenarioUnlock>;
  simulationCampaigns!: Table<SimulationCampaign>;
  campaignScenarios!: Table<CampaignScenario>;

  // RP-002A — Pilot DNA Engine (observational personalization)
  pilotInterests!: Table<PilotInterest>;
  pilotGrowthGoals!: Table<PilotGrowthGoal>;
  pilotPreferences!: Table<PilotPreference>;
  pilotSignals!: Table<PilotSignal>;
  pilotAffinities!: Table<PilotAffinity>;
  pilotAspirations!: Table<PilotAspiration>;
  pilotContentHistory!: Table<PilotContentHistory>;

  constructor() {
    super("LifePilotDB");

    this.version(1).stores({
      // Core
      pilots: "++id, name, isActive, createdAt",
      settings: "++id, pilotId, updatedAt",
      languagePreferences: "++id, pilotId, language, updatedAt",

      // Flight Plan
      flightPlanGoals: "++id, pilotId, status, category, targetDate, createdAt",

      // Flight Log
      flightLogEntries: "++id, pilotId, mood, linkedGoalId, createdAt",
      reflections: "++id, pilotId, type, linkedGoalId, linkedEntryId, createdAt",

      // Future Me
      futureVisions: "++id, pilotId, createdAt",
      futureMilestones: "++id, pilotId, visionId, achieved, targetDate",
      futureLetters: "++id, pilotId, deliverAt, delivered, createdAt",

      // Competency & Growth
      competencies: "++id, pilotId, category, level, createdAt",
      competencyPractices: "++id, competencyId, pilotId, practicedAt",
      growthEvidence: "++id, pilotId, competencyId, goalId, evidenceType, createdAt",

      // Missions & Achievements
      achievements: "++id, pilotId, category, type, unlockedAt",
      missions: "++id, status, category, difficulty, createdAt",
      missionCompletions: "++id, pilotId, missionId, completedAt",

      // Habits
      habits: "++id, pilotId, category, frequency, isActive, createdAt",
      habitActivities: "++id, habitId, pilotId, completed, completedAt",

      // Career Explorer
      careers: "++id, category, isOfflineAvailable, createdAt",
      careerSkills: "++id, careerId, level",
      careerExplorations: "++id, pilotId, careerId, savedAt",

      // Money Quest
      financialConcepts: "++id, type, difficulty, createdAt",
      financialLessonProgress: "++id, pilotId, conceptId, completed",

      // Life Choices
      lifeChoiceScenarios: "++id, category, difficulty, ageGroup, isOfflineAvailable",
      lifeChoiceOptions: "++id, scenarioId, order",
      lifeChoiceOutcomes: "++id, pilotId, scenarioId, optionChosenId, chosenAt",

      // Co-Pilot & Conversations
      coPilots: "++id, pilotId, isActive, createdAt",
      conversationStarters: "++id, category, ageGroup, language",
      decisionJournals: "++id, pilotId, decidedAt, createdAt",
      decisionOutcomes: "++id, decisionId, pilotId, recordedAt",

      // Life Projects & Roles
      lifeProjects: "++id, pilotId, status, category, createdAt",
      lifeProjectMilestones: "++id, projectId, pilotId, completed, order",
      lifeRoles: "++id, pilotId, type, isActive, createdAt",
      values: "++id, pilotId, type, importance, createdAt",
      valuePractices: "++id, valueId, pilotId, practicedAt",

      // Culture & Timeline
      cultureStories: "++id, language, category, ageGroup, isOfflineAvailable",
      timelineEvents: "++id, pilotId, type, occurredAt, createdAt",
    });

    // v0.1.1 — Future-ready domain extensions
    this.version(2).stores({
      // Content Domain
      contentItems: "++id, category, difficulty, language, status, version, createdAt",

      // Learning Path Domain
      learningPaths: "++id, category, difficulty, createdAt",
      learningPathSteps: "++id, learningPathId, contentId, sequenceNumber",
      pilotLearningPaths: "++id, pilotId, learningPathId, status, createdAt",

      // Premium Domain
      subscriptionPlans: "++id, name, createdAt",
      pilotSubscriptions: "++id, pilotId, planId, status, startedAt",

      // Achievement Enhancement
      badges: "++id, achievementId, createdAt",
      certificates: "++id, achievementId, createdAt",

      // Parent Domain Enhancement
      familyChallenges: "++id, isActive, createdAt",
      familyChallengeParticipants: "++id, challengeId, coPilotId, joinedAt",

      // School Domain
      schools: "++id, name, isActive, createdAt",
      teachers: "++id, schoolId, isActive, createdAt",
      classrooms: "++id, teacherId, schoolId, isActive, createdAt",
      programs: "++id, schoolId, category, isActive, createdAt",
      enrollments: "++id, pilotId, classroomId, status, enrolledAt",
      participations: "++id, pilotId, programId, status, joinedAt",

      // Enterprise / CSR Domain
      tenants: "++id, type, isActive, createdAt",
      organizations: "++id, tenantId, isActive, createdAt",
      deployments: "++id, tenantId, status, createdAt",

      // AI Domain — reserved, indexed only
      aiConversations: "++id, pilotId, createdAt",
      aiRecommendations: "++id, pilotId, createdAt",
      aiInsights: "++id, pilotId, createdAt",
    });

    // v0.1.2 — Domain freeze enhancements
    this.version(3).stores({
      // Multi-tenant: add tenantId index to pilots (field is optional, unused in MVP)
      pilots: "++id, name, isActive, tenantId, createdAt",

      // Activity Event System
      activityEvents: "++id, pilotId, eventType, entityType, entityId, createdAt",

      // Notification Domain
      notifications: "++id, pilotId, type, status, scheduledAt, createdAt",

      // Career Roadmap Domain
      careerRoadmaps: "++id, careerId, createdAt",
      careerRoadmapSteps: "++id, roadmapId, order",

      // Competency Catalog Model
      competencyCatalog: "++id, name, category, createdAt",
      pilotCompetencies: "++id, pilotId, competencyId, currentLevel, createdAt",

      // Value Catalog Model
      valueCatalog: "++id, name, category, createdAt",
      pilotValues: "++id, pilotId, valueId, importance, createdAt",

      // Content Revision History
      contentRevisions: "++id, contentId, version, publishedAt",
    });

    // v0.1.3 — Human Development domains
    this.version(4).stores({
      // Identity Domain (1:1 with Pilot)
      pilotIdentity: "++id, pilotId, lastUpdated",

      // Life Experience Domain
      lifeExperiences: "++id, pilotId, chapterId, category, impactLevel, experienceDate, createdAt",

      // Life Chapter Domain
      lifeChapters: "++id, pilotId, startDate, createdAt",

      // Decision Journey Domain
      decisionRecords: "++id, pilotId, decisionDate, createdAt",

      // Relationship Reflection Domain
      relationshipReflections: "++id, pilotId, category, createdAt",

      // Strengths Domain
      strengthCatalog: "++id, name, category",
      pilotStrengths: "++id, pilotId, strengthId, createdAt",

      // Purpose Domain
      purposeStatements: "++id, pilotId, version, createdAt",

      // Real World Impact Domain
      impactEvidence: "++id, pilotId, missionId, impactType, createdAt",

      // Future Identity Domain
      futureIdentities: "++id, pilotId, targetAge, createdAt",

      // Life Balance Domain
      lifeWheelSnapshots: "++id, pilotId, snapshotDate",
    });

    // v0.1.4 — Simulation Engine
    this.version(5).stores({
      // Scenario Content
      scenarios: "++id, category, difficulty, ageGroup, status, createdAt",
      scenarioChoices: "++id, scenarioId, displayOrder",
      choiceConsequences: "++id, choiceId, createdAt",

      // Life State (1:1 with Pilot — upsert pattern)
      lifeState: "++id, pilotId, updatedAt",

      // Life State Transitions (consequence → attribute delta log)
      lifeStateTransitions: "++id, consequenceId, attributeName, createdAt",

      // Scenario Playthrough
      pilotScenarioPlays: "++id, pilotId, scenarioId, selectedChoiceId, playStartedAt",
      scenarioReflections: "++id, playId, createdAt",

      // Rewards, Paths, Prerequisites, Unlocks
      scenarioRewards: "++id, scenarioId, rewardType",
      scenarioOutcomePaths: "++id, scenarioId, createdAt",
      scenarioPrerequisites: "++id, scenarioId, requiredScenarioId",
      scenarioUnlocks: "++id, sourceScenarioId, sourceChoiceId, targetScenarioId, createdAt",

      // Simulation Campaigns
      simulationCampaigns: "++id, category, ageGroup, createdAt",
      campaignScenarios: "++id, campaignId, scenarioId, sequenceNumber",
    });

    // v1.0 — Freeze gap closures: LifeState history, memory provenance,
    //         relationship events, co-pilot permissions, offline audio
    this.version(7).stores({
      // School Edition readiness — add schoolId index to pilots
      pilots: "++id, name, isActive, tenantId, schoolId, createdAt",

      // LifeState History
      lifeStateSnapshots: "++id, pilotId, lifeStateId, snapshotDate, createdAt",

      // Character Memory Provenance
      characterMemorySources: "++id, characterMemoryId, sourceType, sourceEntity, sourceEntityId, createdAt",

      // Character Relationship Events
      characterRelationshipEvents: "++id, pilotId, characterId, relationshipId, eventType, createdAt",

      // Co-Pilot Permissions
      coPilotPermissions: "++id, pilotId, coPilotId, permissionType, granted",

      // Offline Voice Readiness
      audioAssets: "++id, characterId, language, assetType, version, createdAt",
      audioPackages: "++id, language, version, createdAt",
    });

    // v1.1 — RP-001 Gap Closures
    this.version(8).stores({
      // Section 1: Emerging Identity Engine
      emergingIdentities: "++id, isActive",
      identitySignals: "++id, pilotId, signalType, sourceType, createdAt",
      identityMoments: "++id, pilotId, emergingIdentityId, unlockedAt",

      // Section 2: Future Path Engine
      futurePaths: "++id, isPremium",
      futureSnapshots: "++id, futurePathId, age",

      // Section 3: World Engine
      worldLocations: "++id, locationType, unlockLevel, isActive",
      locationCharacters: "++id, locationId, characterId",
      locationScenarios: "++id, locationId, scenarioId",
      pilotLocationVisits: "++id, pilotId, locationId, lastVisitedAt",
      locationUnlocks: "++id, pilotId, locationId, unlockedAt",

      // Section 4: Pilot Memory Engine
      pilotMemories: "++id, pilotId, memoryType, importance, createdAt",
      memoryReactions: "++id, pilotMemoryId, reactionType, createdAt",
      memoryReplays: "++id, pilotMemoryId, lastViewedAt",

      // Section 5: Character Arc Engine
      characterArcs: "++id, characterId",
      characterArcStages: "++id, characterArcId, stageNumber",

      // Section 6: Discovery Engine
      discoveries: "++id, discoveryType, rarity",
      pilotDiscoveries: "++id, pilotId, discoveryId, discoveredAt",

      // Section 7: Retention Engine
      dailyChallenges: "++id, activeDate, challengeType",
      streakRewards: "++id, daysRequired",

      // Section 8: Critical Compliance
      consentRecords: "++id, pilotId, coPilotId, consentType, consentStatus, createdAt",
      voiceConsents: "++id, pilotId, coPilotId, consentStatus, createdAt",
      aiConsentRecords: "++id, pilotId, coPilotId, consentStatus, createdAt",
      syncQueue: "++id, tableName, recordId, syncStatus, createdAt",

      // Section 9: Content Scale Engine
      scenarioTemplates: "++id, defaultCategory, defaultDifficulty, isPremium, createdAt",
      dialogueTemplates: "++id, characterRole, createdAt",
      contentPacks: "++id, packType, targetLanguage, isPremium, createdAt",
      contentLocalizationStatuses: "++id, entityType, entityId, language, localizationStatus, lastUpdatedAt",
      localizationTasks: "++id, taskType, entityId, language, localizationStatus, createdAt",
    });

    // v1.2 — RP-002 Strategic Capability Expansion
    this.version(9).stores({
      // Domain 1: Assessment Engine
      assessments: "++id, assessmentType, targetAgeGroup, isActive, createdAt",
      assessmentQuestions: "++id, assessmentId, displayOrder, responseType",
      assessmentResponses: "++id, pilotId, assessmentQuestionId, submittedAt",
      assessmentResults: "++id, pilotId, assessmentId, calculatedAt",

      // Domain 2: Institution Reporting Engine
      institutionReports: "++id, schoolId, reportType, generatedAt",
      classroomReports: "++id, classroomId, reportType, generatedAt",
      cohortInsights: "++id, schoolId, cohortType, generatedAt",

      // Domain 3: Counsellor Engine
      counsellors: "++id, schoolId, specialization, availabilityStatus, isActive, createdAt",
      counsellorSessions: "++id, counsellorId, pilotId, sessionDate, sessionType, createdAt",

      // Domain 4: Compliance Audit Engine
      auditLogs: "++id, entityType, entityId, actionType, actorType, actorId, timestamp",

      // Domain 5: Intervention Engine
      interventionRules: "++id, triggerType, severity, isActive, createdAt",
      interventionRecommendations: "++id, interventionRuleId, pilotId, recommendationType, isActedUpon, generatedAt",
    });

    // v1.3 — RP-003 Platform Infrastructure
    this.version(10).stores({
      // Domain 1: Feature Management Engine
      featureFlags: "++id, flagStatus, scope, isActive, createdAt",
      featureFlagAssignments: "++id, featureFlagId, scopeEntityId, scope, isEnabled, assignedAt",
      featureRollouts: "++id, featureFlagId, strategy, isActive, startedAt",
      experiments: "++id, featureFlagId, experimentStatus, createdAt",
      experimentVariants: "++id, experimentId, variantType, isControl",
      featureUsages: "++id, featureFlagId, pilotId, usedAt",

      // Domain 2: Subscription & Licensing Engine
      subscriptions: "++id, pilotId, schoolId, tenantId, subscriptionPlanId, subscriptionStatus, tier, createdAt",
      entitlements: "++id, subscriptionId, entitlementType, isActive, validFrom",
      usageRecords: "++id, subscriptionId, entitlementType, recordedAt",
      invoices: "++id, subscriptionId, invoiceStatus, dueAt, createdAt",
      payments: "++id, invoiceId, paymentStatus, paymentMethod, attemptedAt",
      licenses: "++id, schoolId, tenantId, licenseType, isActive, validUntil",
      seatAssignments: "++id, licenseId, pilotId, isActive, assignedAt",

      // Domain 3: Notification Platform
      notificationTemplates: "++id, templateType, channel, language, isActive, createdAt",
      notificationCampaigns: "++id, notificationTemplateId, campaignStatus, scheduledAt, createdAt",
      notificationPreferences: "++id, pilotId, channel, isEnabled, updatedAt",
      notificationDeliveries: "++id, pilotId, channel, deliveryStatus, createdAt",
      notificationAnalytics: "++id, campaignId, channel, calculatedAt",
      notificationChannels: "++id, channel, isEnabled, priority",

      // Domain 4: Recommendation Engine
      recommendations: "++id, pilotId, recommendationType, recommendationStatus, generatedAt",
      recommendationCandidates: "++id, recommendationModelId, candidateEntityType, isActive",
      recommendationFeedbacks: "++id, recommendationId, pilotId, feedbackType, givenAt",
      recommendationHistories: "++id, pilotId, recommendationType, shownAt",
      recommendationModels: "++id, recommendationType, isActive, createdAt",

      // Domain 5: Knowledge Graph Engine
      knowledgeNodes: "++id, nodeType, entityType, entityId, ontologyId, isActive, createdAt",
      knowledgeRelationships: "++id, fromNodeId, toNodeId, relationshipType, createdAt",
      knowledgeClusters: "++id, ontologyId, isActive, createdAt",
      semanticTags: "++id, tag, entityType, entityId, knowledgeNodeId, createdAt",
      ontologies: "++id, domain, isActive, createdAt",

      // Domain 6: AI Governance Engine
      aiModels: "++id, provider, modelType, isActive, createdAt",
      promptTemplates: "++id, aiModelId, promptStatus, useCase, isActive, createdAt",
      promptVersions: "++id, promptTemplateId, version, promptStatus, createdAt",
      promptExecutions: "++id, promptVersionId, pilotId, wasSuccessful, executedAt",
      aiUsages: "++id, pilotId, aiModelId, usageType, recordedAt",
      aiSafetyReviews: "++id, promptVersionId, safetyReviewStatus, createdAt",
      aiFeedbacks: "++id, promptExecutionId, pilotId, wasHallucination, wasHarmful, givenAt",

      // Domain 7: Integration Platform
      externalIntegrations: "++id, integrationType, integrationStatus, tenantId, schoolId, isActive, createdAt",
      apiKeys: "++id, externalIntegrationId, tenantId, isActive, createdAt",
      webhooks: "++id, externalIntegrationId, tenantId, webhookStatus, createdAt",
      webhookSubscriptions: "++id, webhookId, eventType, isActive, createdAt",
      oAuthConnections: "++id, externalIntegrationId, tenantId, schoolId, oAuthStatus, createdAt",
      syncConnectors: "++id, externalIntegrationId, syncDirection, entityType, isActive, createdAt",
      integrationLogs: "++id, externalIntegrationId, eventType, status, loggedAt",
      integrationEvents: "++id, externalIntegrationId, eventType, entityType, isProcessed, createdAt",

      // Domain 8: Localization Platform
      languages: "++id, code, isActive, isPremium",
      translations: "++id, entityType, entityId, language, localizationStatus, translatedAt",
      localizedContents: "++id, entityType, entityId, language, localizationStatus, updatedAt",
      countryConfigurations: "++id, countryCode, isActive",
      regionalPolicies: "++id, countryCode, policyType, isActive, effectiveFrom",
      timezoneConfigurations: "++id, timezoneId, countryCode, isActive",
    });

    // v1.4 — RP-003 Human-Centric Domains
    this.version(11).stores({
      // Domain 1: Human Development Framework
      developmentStages: "++id, stageType, isActive",
      growthDimensions: "++id, dimensionType, parentDimensionId, isActive",
      developmentMilestones: "++id, developmentStageId, growthDimensionId, pilotId, isReached, createdAt",
      growthIndicators: "++id, pilotId, growthDimensionId, recordedAt",

      // Domain 2: Curriculum Framework
      curricula: "++id, framework, isActive, createdAt",
      curriculumModules: "++id, curriculumId, sequenceOrder, isActive",
      learningOutcomes: "++id, curriculumModuleId, outcomeType, isAssessable",
      competencyMappings: "++id, curriculumModuleId, competencyId, valueId, careerPathId",

      // Domain 3: Personality Evolution
      personalityProfiles: "++id, pilotId, framework, isBaseline, createdAt",
      personalityAssessments: "++id, personalityProfileId, framework, completedAt",
      personalityTraits: "++id, personalityProfileId, traitCategory",
      personalityGrowths: "++id, pilotId, traitCategory, recordedAt",

      // Domain 4: Decision Intelligence
      decisionScenarios: "++id, pilotId, context, createdAt",
      decisionScenarioOutcomes: "++id, decisionScenarioId, createdAt",
      decisionReflections: "++id, decisionScenarioId, pilotId, reflectedAt",
      decisionPatterns: "++id, pilotId, patternType, occurrenceCount, lastObservedAt",

      // Domain 5: Life Timeline
      lifeTimelineEvents: "++id, pilotId, eventType, collectionId, significanceScore, occurredAt",
      timelineCollections: "++id, pilotId, isPublic, createdAt",
      timelineNarratives: "++id, pilotId, collectionId, isAiGenerated, generatedAt",

      // Domain 6: Wellbeing Framework
      wellbeingProfiles: "++id, pilotId, trend, lastAssessedAt",
      wellbeingAssessments: "++id, pilotId, wellbeingProfileId, burnoutRisk, assessedAt",
      wellbeingDimensions: "++id, wellbeingAssessmentId, dimensionType, trend",
      wellbeingSnapshots: "++id, pilotId, dimensionType, trend, snapshotDate",

      // Domain 7: Achievement Framework (portfolio-grade)
      lifeAchievements: "++id, pilotId, categoryType, achievementStatus, isVerified, createdAt",
      lifeAchievementCategories: "++id, categoryType, isActive",
      lifeAchievementProgresses: "++id, lifeAchievementId, pilotId, recordedAt",
      lifeAchievementEvidences: "++id, lifeAchievementId, evidenceType, uploadedAt",

      // Domain 8: Personal Operating System
      lifePrinciples: "++id, pilotId, principleCategory, isActive, createdAt",
      personalBeliefs: "++id, pilotId, beliefType, isConscious, createdAt",
      decisionRules: "++id, pilotId, ruleType, isActive, createdAt",
      coreValueEvolutions: "++id, pilotId, valueId, evolvedAt",
    });

    // v0.1.5 — Character, Narrative & Voice Engine
    this.version(6).stores({
      // Domain 1: Character Engine
      characters: "++id, role, ageGroup, isSystemCharacter, createdAt",

      // Domain 2: Voice Profiles
      voiceProfiles: "++id, language, createdAt",

      // Domain 3: Future Self Characters
      futureCharacters: "++id, pilotId, characterId, futureAge, createdAt",

      // Domain 4: Narrative Engine
      storyArcs: "++id, category, ageGroup, createdAt",
      storyChapters: "++id, storyArcId, sequenceNumber, scenarioId, createdAt",

      // Domain 5: Dialogue System
      dialogueNodes: "++id, characterId, scenarioId, chapterId, displayOrder, createdAt",
      dialogueChoices: "++id, dialogueNodeId, nextDialogueNodeId, createdAt",

      // Domain 6: Conversation Engine
      conversationSessions: "++id, pilotId, characterId, conversationType, startedAt",

      // Domain 7: Character Relationships
      characterRelationships: "++id, pilotId, characterId, lastInteractionDate, createdAt",

      // Domain 8: Character Memory
      characterMemories: "++id, pilotId, characterId, memoryType, createdAt",

      // Domain 9: Voice Interaction Foundation
      voiceInteractions: "++id, sessionId, speakerType, timestamp",

      // Domain 10: Narrative Triggers
      narrativeTriggers: "++id, triggerType, sourceEntity, sourceEntityId, targetEntity, targetEntityId, createdAt",

      // Domain 11: Avatar System
      avatars: "++id, pilotId, createdAt",
      avatarUnlocks: "++id, avatarId, unlockType, createdAt",
    });

    // RP-002A — Pilot DNA Engine (observational personalization, never diagnostic)
    this.version(7).stores({
      pilotInterests: "++id, pilotId, category, source, createdAt",
      pilotGrowthGoals: "++id, pilotId, goal, source, createdAt",
      pilotPreferences: "++id, pilotId, adventureStyle, source, createdAt",
      pilotSignals: "++id, pilotId, source, signalType, entityType, createdAt",
      pilotAffinities: "++id, pilotId, domain, updatedAt",
      pilotAspirations: "++id, pilotId, source, createdAt",
      pilotContentHistory: "++id, pilotId, contentType, contentId, createdAt",
    });
  }
}

export const db = new LifePilotDatabase();

export default db;
