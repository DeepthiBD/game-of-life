// ============================================================
// ENUMERATIONS
// ============================================================

export type SupportedLanguage =
  | "en"
  | "hi"
  | "ta"
  | "te"
  | "kn"
  | "ml"
  | "mr"
  | "bn"
  | "gu"
  | "pa";

export type ThemeMode = "light" | "dark" | "system";

export type GoalCategory =
  | "academic"
  | "health"
  | "social"
  | "creative"
  | "financial"
  | "career"
  | "personal"
  | "community";

export type MetricType =
  | "numeric"
  | "boolean"
  | "percentage"
  | "rating"
  | "streak"
  | "duration";

export type MissionStatus =
  | "available"
  | "active"
  | "completed"
  | "failed"
  | "locked";

export type AchievementType =
  | "milestone"
  | "streak"
  | "skill"
  | "community"
  | "exploration"
  | "courage"
  | "kindness";

export type ReflectionType =
  | "daily"
  | "weekly"
  | "monthly"
  | "goal"
  | "event"
  | "gratitude"
  | "challenge";

export type CareerCategory =
  | "technology"
  | "arts"
  | "science"
  | "business"
  | "healthcare"
  | "education"
  | "sports"
  | "social"
  | "trades"
  | "government";

export type FinancialConceptType =
  | "earning"
  | "saving"
  | "spending"
  | "investing"
  | "giving"
  | "budgeting"
  | "taxes"
  | "insurance";

export type LifeRoleType =
  | "student"
  | "sibling"
  | "child"
  | "friend"
  | "community_member"
  | "team_member"
  | "leader"
  | "citizen";

export type ValueType =
  | "integrity"
  | "compassion"
  | "courage"
  | "respect"
  | "responsibility"
  | "gratitude"
  | "resilience"
  | "creativity"
  | "curiosity"
  | "fairness"
  | "family"
  | "service";

export type TimelineEventType =
  | "achievement"
  | "goal_completed"
  | "journal_entry"
  | "mission_completed"
  | "reflection"
  | "habit_streak"
  | "career_exploration"
  | "letter_opened"
  | "custom";

export type HabitFrequency = "daily" | "weekly" | "monthly" | "custom";

export type MoodRating = "great" | "good" | "okay" | "bad" | "awful";

// v0.1.2 enumerations

export type ActivityEventType =
  | "goal_created"
  | "goal_completed"
  | "mission_started"
  | "mission_completed"
  | "reflection_created"
  | "letter_created"
  | "letter_opened"
  | "career_explored"
  | "lesson_completed"
  | "habit_completed"
  | "value_practiced"
  | "project_completed";

export type NotificationType =
  | "future_letter"
  | "mission"
  | "habit"
  | "milestone"
  | "career"
  | "financial"
  | "system";

export type NotificationStatus =
  | "scheduled"
  | "delivered"
  | "read"
  | "dismissed";

export type ConversationCategory =
  | "career"
  | "money"
  | "gratitude"
  | "relationships"
  | "values"
  | "decisions"
  | "future"
  | "wellbeing";

export type CompetencyLevel =
  | "beginner"
  | "developing"
  | "proficient"
  | "advanced"
  | "expert";

// ============================================================
// CORE ENTITIES
// ============================================================

export interface Pilot {
  id?: number;
  name: string;
  avatarUrl?: string;
  dateOfBirth?: Date;
  grade?: string;
  school?: string;
  city?: string;
  bio?: string;
  isActive: boolean;
  /** v0.1.2 — Multi-tenant readiness. Optional; unused in MVP. FK → Tenant */
  tenantId?: number;
  /** v1.0 — School Edition readiness. All fields optional; no MVP dependency. */
  schoolId?: number;
  /** v1.0 — Structured grade level (e.g. "Grade 8"). Complements legacy grade string. */
  gradeLevel?: string;
  /** v1.0 — Section/division within a classroom (e.g. "A", "B"). */
  section?: string;
  /** v1.0 — Enrollment code used to auto-join a Classroom in School Edition. */
  enrollmentCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Settings {
  id?: number;
  pilotId: number;
  theme: ThemeMode;
  fontSize: "small" | "medium" | "large";
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  dashboardLayout: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LanguagePreference {
  id?: number;
  pilotId: number;
  language: SupportedLanguage;
  updatedAt: Date;
}

// ============================================================
// FLIGHT PLAN MODULE
// ============================================================

export interface FlightPlanGoal {
  id?: number;
  pilotId: number;
  title: string;
  description?: string;
  category: GoalCategory;
  status: "active" | "completed" | "paused" | "abandoned";
  targetDate?: Date;
  progress: number;
  milestones?: string;
  whyItMatters?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// FLIGHT LOG MODULE
// ============================================================

export interface FlightLogEntry {
  id?: number;
  pilotId: number;
  title?: string;
  content: string;
  mood: MoodRating;
  tags?: string;
  linkedGoalId?: number;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reflection {
  id?: number;
  pilotId: number;
  type: ReflectionType;
  question: string;
  answer: string;
  linkedGoalId?: number;
  linkedEntryId?: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// FUTURE ME MODULE
// ============================================================

export interface FutureVision {
  id?: number;
  pilotId: number;
  title: string;
  description: string;
  targetAge?: number;
  targetYear?: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FutureMilestone {
  id?: number;
  pilotId: number;
  visionId?: number;
  title: string;
  description?: string;
  targetDate: Date;
  achieved: boolean;
  achievedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface FutureLetter {
  id?: number;
  pilotId: number;
  title: string;
  content: string;
  deliverAt: Date;
  delivered: boolean;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// COMPETENCY & GROWTH
// ============================================================

export interface Competency {
  id?: number;
  pilotId: number;
  name: string;
  description?: string;
  category: string;
  level: CompetencyLevel;
  targetLevel?: CompetencyLevel;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompetencyPractice {
  id?: number;
  /** Legacy FK → Competency (pilot-owned). Retained for backward compatibility. */
  competencyId: number;
  /** v0.1.2 — FK → PilotCompetency (catalog-based). Use this going forward. */
  pilotCompetencyId?: number;
  pilotId: number;
  description: string;
  durationMinutes?: number;
  reflection?: string;
  practicedAt: Date;
  createdAt: Date;
}

export interface GrowthEvidence {
  id?: number;
  pilotId: number;
  /** Legacy FK → Competency (pilot-owned). Retained for backward compatibility. */
  competencyId?: number;
  /** v0.1.2 — FK → PilotCompetency (catalog-based). Use this going forward. */
  pilotCompetencyId?: number;
  goalId?: number;
  title: string;
  description: string;
  evidenceType: "reflection" | "achievement" | "practice" | "feedback" | "self_rating";
  mediaUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// MISSIONS & ACHIEVEMENTS
// ============================================================

export interface Achievement {
  id?: number;
  pilotId: number;
  title: string;
  description: string;
  badgeIcon?: string;
  category: string;
  type: AchievementType;
  points?: number;
  unlockedAt: Date;
  createdAt: Date;
}

export interface Mission {
  id?: number;
  title: string;
  description: string;
  category: string;
  status: MissionStatus;
  difficulty: "easy" | "medium" | "hard" | "epic";
  xpReward?: number;
  badgeReward?: string;
  prerequisites?: string;
  estimatedDays?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MissionCompletion {
  id?: number;
  pilotId: number;
  missionId: number;
  completedAt: Date;
  reflection?: string;
  evidenceUrl?: string;
  xpEarned?: number;
  createdAt: Date;
}

// ============================================================
// HABITS
// ============================================================

export interface Habit {
  id?: number;
  pilotId: number;
  title: string;
  description?: string;
  category: string;
  frequency: HabitFrequency;
  targetCount?: number;
  currentStreak: number;
  longestStreak: number;
  isActive: boolean;
  reminderTime?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HabitActivity {
  id?: number;
  habitId: number;
  pilotId: number;
  completed: boolean;
  note?: string;
  completedAt: Date;
  createdAt: Date;
}

// ============================================================
// CAREER EXPLORER
// ============================================================

export interface Career {
  id?: number;
  title: string;
  description: string;
  category: CareerCategory;
  educationRequired?: string;
  averageSalary?: string;
  growthOutlook?: string;
  requiredSkills?: string;
  relatedCareers?: string;
  isOfflineAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CareerSkill {
  id?: number;
  careerId: number;
  name: string;
  description?: string;
  level: "essential" | "helpful" | "advanced";
  createdAt: Date;
}

export interface CareerExploration {
  id?: number;
  pilotId: number;
  careerId: number;
  interestRating?: number;
  notes?: string;
  savedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// MONEY QUEST
// ============================================================

export interface FinancialConcept {
  id?: number;
  title: string;
  description: string;
  type: FinancialConceptType;
  content: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  xpReward?: number;
  prerequisites?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FinancialLessonProgress {
  id?: number;
  pilotId: number;
  conceptId: number;
  completed: boolean;
  score?: number;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// LIFE CHOICES
// ============================================================

export interface LifeChoiceScenario {
  id?: number;
  title: string;
  description: string;
  context: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  ageGroup: "child" | "teen" | "both";
  isOfflineAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LifeChoiceOption {
  id?: number;
  scenarioId: number;
  text: string;
  consequenceShort?: string;
  consequenceLong?: string;
  valueAlignment?: string;
  order: number;
  createdAt: Date;
}

export interface LifeChoiceOutcome {
  id?: number;
  pilotId: number;
  scenarioId: number;
  optionChosenId: number;
  reflection?: string;
  chosenAt: Date;
  revisitedAt?: Date;
  createdAt: Date;
}

// ============================================================
// CO-PILOT & CONVERSATIONS
// ============================================================

export interface CoPilot {
  id?: number;
  pilotId: number;
  name: string;
  relationship: string;
  contactInfo?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationStarter {
  id?: number;
  topic: string;
  question: string;
  /** Legacy free-text category. Retained for backward compatibility. */
  category: string;
  /** v0.1.2 — Structured category enum. Preferred over free-text category. */
  conversationCategory?: ConversationCategory;
  ageGroup: "child" | "teen" | "both";
  language: SupportedLanguage;
  createdAt: Date;
}

export interface DecisionJournal {
  id?: number;
  pilotId: number;
  title: string;
  situation: string;
  options?: string;
  chosenOption?: string;
  reasoning?: string;
  expectedOutcome?: string;
  decidedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface DecisionOutcome {
  id?: number;
  decisionId: number;
  pilotId: number;
  actualOutcome: string;
  reflection?: string;
  rating?: number;
  recordedAt: Date;
  createdAt: Date;
}

// ============================================================
// LIFE PROJECTS & ROLES
// ============================================================

export interface LifeProject {
  id?: number;
  pilotId: number;
  title: string;
  description?: string;
  category: string;
  status: "planning" | "active" | "paused" | "completed" | "abandoned";
  startDate?: Date;
  targetDate?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface LifeProjectMilestone {
  id?: number;
  projectId: number;
  pilotId: number;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  completedAt?: Date;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LifeRole {
  id?: number;
  pilotId: number;
  type: LifeRoleType;
  customName?: string;
  description?: string;
  responsibilities?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Value {
  id?: number;
  pilotId: number;
  type: ValueType;
  customName?: string;
  description?: string;
  importance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ValuePractice {
  id?: number;
  /** Legacy FK → Value (pilot-owned). Retained for backward compatibility. */
  valueId: number;
  /** v0.1.2 — FK → PilotValue (catalog-based). Use this going forward. */
  pilotValueId?: number;
  pilotId: number;
  description: string;
  reflection?: string;
  practicedAt: Date;
  createdAt: Date;
}

// ============================================================
// CULTURE & TIMELINE
// ============================================================

export interface CultureStory {
  id?: number;
  title: string;
  description: string;
  region?: string;
  language: SupportedLanguage;
  category: string;
  content: string;
  moralLesson?: string;
  ageGroup: "child" | "teen" | "both";
  isOfflineAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimelineEvent {
  id?: number;
  pilotId: number;
  type: TimelineEventType;
  title: string;
  description?: string;
  linkedEntityId?: number;
  linkedEntityType?: string;
  occurredAt: Date;
  createdAt: Date;
}

// ============================================================
// v0.1.2 — ACTIVITY EVENT SYSTEM
// ============================================================

export interface ActivityEvent {
  id?: number;
  pilotId: number;
  eventType: ActivityEventType;
  /** Name of the entity type that triggered the event (e.g. "FlightPlanGoal") */
  entityType: string;
  /** ID of the triggering entity */
  entityId: number;
  /** Optional JSON metadata for additional context */
  metadata?: string;
  createdAt: Date;
}

// ============================================================
// v0.1.2 — NOTIFICATION DOMAIN
// ============================================================

export interface Notification {
  id?: number;
  pilotId: number;
  type: NotificationType;
  title: string;
  message: string;
  scheduledAt: Date;
  status: NotificationStatus;
  readAt?: Date;
  createdAt: Date;
}

// ============================================================
// v0.1.2 — CAREER ROADMAP DOMAIN
// ============================================================

export interface CareerRoadmap {
  id?: number;
  careerId: number;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CareerRoadmapStep {
  id?: number;
  roadmapId: number;
  title: string;
  description?: string;
  order: number;
  estimatedAge?: number;
  createdAt: Date;
}

// ============================================================
// v0.1.2 — COMPETENCY CATALOG MODEL
// ============================================================

/**
 * Universal competency catalogue — not pilot-owned.
 * Examples: Resilience, Leadership, Empathy, Communication.
 * Replaces the per-pilot Competency entity for new data going forward.
 * The original Competency entity is retained for backward compatibility.
 */
export interface CompetencyCatalog {
  id?: number;
  name: string;
  description?: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * A pilot's adoption of a catalog competency, with their current and target level.
 * FK → CompetencyCatalog + Pilot.
 */
export interface PilotCompetency {
  id?: number;
  pilotId: number;
  /** FK → CompetencyCatalog */
  competencyId: number;
  currentLevel: CompetencyLevel;
  targetLevel?: CompetencyLevel;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// v0.1.2 — VALUE CATALOG MODEL
// ============================================================

/**
 * Universal value catalogue — not pilot-owned.
 * Examples: Integrity, Courage, Compassion, Service.
 * Replaces the per-pilot Value entity for new data going forward.
 * The original Value entity is retained for backward compatibility.
 */
export interface ValueCatalog {
  id?: number;
  name: string;
  description?: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * A pilot's adoption of a catalog value, with their importance ranking.
 * FK → ValueCatalog + Pilot.
 */
export interface PilotValue {
  id?: number;
  pilotId: number;
  /** FK → ValueCatalog */
  valueId: number;
  importance: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// v0.1.2 — CONTENT REVISION HISTORY
// ============================================================

export interface ContentRevision {
  id?: number;
  contentId: number;
  version: number;
  changeSummary?: string;
  publishedAt: Date;
  createdAt: Date;
}

// ============================================================
// CONTENT DOMAIN
// ============================================================

export type ContentCategory =
  | "career"
  | "finance"
  | "mission"
  | "culture"
  | "reflection"
  | "future_self"
  | "life_skill"
  | "health"
  | "law"
  | "entrepreneurship";

export type ContentStatus = "draft" | "published" | "archived";

export type ContentDifficulty = "beginner" | "intermediate" | "advanced";

export interface ContentItem {
  id?: number;
  title: string;
  description?: string;
  category: ContentCategory;
  difficulty: ContentDifficulty;
  language: SupportedLanguage;
  version: number;
  status: ContentStatus;
  // Optional links to supported entities
  linkedCareerId?: number;
  linkedMissionId?: number;
  linkedReflectionId?: number;
  linkedFinancialConceptId?: number;
  linkedCultureStoryId?: number;
  linkedFutureLetterId?: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// LEARNING PATH DOMAIN
// ============================================================

export interface LearningPath {
  id?: number;
  title: string;
  description?: string;
  category: ContentCategory;
  difficulty: ContentDifficulty;
  createdAt: Date;
  updatedAt: Date;
}

export interface LearningPathStep {
  id?: number;
  learningPathId: number;
  contentId: number;
  sequenceNumber: number;
  createdAt: Date;
}

export interface PilotLearningPath {
  id?: number;
  pilotId: number;
  learningPathId: number;
  progress: number;
  status: "not_started" | "in_progress" | "completed" | "paused";
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// PREMIUM DOMAIN
// ============================================================

export interface SubscriptionPlan {
  id?: number;
  name: string;
  description?: string;
  features?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PilotSubscription {
  id?: number;
  pilotId: number;
  planId: number;
  status: SubscriptionStatus;
  startedAt: Date;
  expiresAt?: Date;
  cancelledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// ACHIEVEMENT DOMAIN ENHANCEMENT
// ============================================================

export interface Badge {
  id?: number;
  name: string;
  description?: string;
  iconUrl?: string;
  // Optional link to the achievement that generates this badge
  achievementId?: number;
  createdAt: Date;
}

export interface Certificate {
  id?: number;
  title: string;
  description?: string;
  templateUrl?: string;
  // Optional link to the achievement that generates this certificate
  achievementId?: number;
  createdAt: Date;
}

// ============================================================
// PARENT / CO-PILOT DOMAIN ENHANCEMENT
// ============================================================

export interface FamilyChallenge {
  id?: number;
  title: string;
  description?: string;
  category?: string;
  difficulty?: ContentDifficulty;
  durationDays?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Join: CoPilot ↔ FamilyChallenge
export interface FamilyChallengeParticipant {
  id?: number;
  challengeId: number;
  coPilotId: number;
  joinedAt: Date;
  completedAt?: Date;
  createdAt: Date;
}

// ============================================================
// SCHOOL DOMAIN
// ============================================================

export interface School {
  id?: number;
  name: string;
  city?: string;
  state?: string;
  country?: string;
  affiliationCode?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Teacher {
  id?: number;
  schoolId: number;
  name: string;
  email?: string;
  subject?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Classroom {
  id?: number;
  teacherId: number;
  schoolId: number;
  name: string;
  gradeLevel?: string;
  academicYear?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Program {
  id?: number;
  schoolId: number;
  title: string;
  description?: string;
  category?: ContentCategory;
  startDate?: Date;
  endDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Enrollment {
  id?: number;
  pilotId: number;
  classroomId: number;
  enrolledAt: Date;
  status: "active" | "completed" | "dropped";
  createdAt: Date;
  updatedAt: Date;
}

export interface Participation {
  id?: number;
  pilotId: number;
  programId: number;
  joinedAt: Date;
  status: "enrolled" | "completed" | "dropped";
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// ENTERPRISE / CSR DOMAIN
// ============================================================

export type TenantType =
  | "individual"
  | "school"
  | "ngo"
  | "csr"
  | "enterprise";

export interface Tenant {
  id?: number;
  name: string;
  type: TenantType;
  contactEmail?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Organization {
  id?: number;
  tenantId: number;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Deployment {
  id?: number;
  tenantId: number;
  name: string;
  description?: string;
  region?: string;
  status: "active" | "inactive" | "suspended";
  launchedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// AI DOMAIN — RESERVED (model only; no implementation)
// ============================================================

/** @reserved No implementation — future AI integration placeholder */
export interface AIConversation {
  id?: number;
  pilotId: number;
  createdAt: Date;
  updatedAt: Date;
}

/** @reserved No implementation — future AI integration placeholder */
export interface AIRecommendation {
  id?: number;
  pilotId: number;
  createdAt: Date;
  updatedAt: Date;
}

/** @reserved No implementation — future AI integration placeholder */
export interface AIInsight {
  id?: number;
  pilotId: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// v0.1.3 ENUMERATIONS — Human Development Domains
// ============================================================

export type ExperienceCategory =
  | "family"
  | "school"
  | "friendship"
  | "achievement"
  | "failure"
  | "challenge"
  | "adventure"
  | "community"
  | "health"
  | "leadership"
  | "service"
  | "creativity";

export type ImpactLevel = "low" | "medium" | "high" | "transformational";

export type RelationshipCategory =
  | "parent"
  | "sibling"
  | "friend"
  | "teacher"
  | "mentor"
  | "community";

export type ImpactType =
  | "family"
  | "community"
  | "environment"
  | "leadership"
  | "helping_others"
  | "learning"
  | "creativity";

// ============================================================
// v0.1.3 ENTITIES — Identity Domain
// ============================================================

/** 1:1 with Pilot — evolving self-awareness record */
export interface PilotIdentity {
  id?: number;
  pilotId: number;
  strengthsSummary?: string;
  interestsSummary?: string;
  preferredLearningStyle?: string;
  energySources?: string;
  growthAreas?: string;
  selfDescription?: string;
  lastUpdated: Date;
}

// ============================================================
// v0.1.3 ENTITIES — Life Experience Domain
// ============================================================

export interface LifeExperience {
  id?: number;
  pilotId: number;
  chapterId?: number;
  title: string;
  description?: string;
  experienceDate: Date;
  category: ExperienceCategory;
  impactLevel: ImpactLevel;
  lessonsLearned?: string;
  reflection?: string;
  createdAt: Date;
}

// ============================================================
// v0.1.3 ENTITIES — Life Chapter Domain
// ============================================================

export interface LifeChapter {
  id?: number;
  pilotId: number;
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  chapterTheme?: string;
  createdAt: Date;
}

// ============================================================
// v0.1.3 ENTITIES — Decision Journey Domain
// ============================================================

/** Real decisions lived by the pilot — distinct from the hypothetical DecisionJournal */
export interface DecisionRecord {
  id?: number;
  pilotId: number;
  title: string;
  context?: string;
  optionsConsidered?: string;
  decisionTaken: string;
  reasoning?: string;
  reflection?: string;
  decisionDate: Date;
  createdAt: Date;
}

// ============================================================
// v0.1.3 ENTITIES — Relationship Reflection Domain
// ============================================================

/** Privacy-first: stores only reflection; never stores personal details of others */
export interface RelationshipReflection {
  id?: number;
  pilotId: number;
  category: RelationshipCategory;
  reflection: string;
  gratitude?: string;
  lessonLearned?: string;
  createdAt: Date;
}

// ============================================================
// v0.1.3 ENTITIES — Strengths Domain
// ============================================================

export interface StrengthCatalog {
  id?: number;
  name: string;
  description?: string;
  category: string;
}

export interface PilotStrength {
  id?: number;
  pilotId: number;
  strengthId: number;
  confidenceLevel?: number;
  evidence?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// v0.1.3 ENTITIES — Purpose Domain
// ============================================================

/** Evolving purpose statements — versioned over time */
export interface PurposeStatement {
  id?: number;
  pilotId: number;
  statement: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// v0.1.3 ENTITIES — Real World Impact Domain
// ============================================================

export interface ImpactEvidence {
  id?: number;
  pilotId: number;
  missionId?: number;
  description: string;
  impactType: ImpactType;
  reflection?: string;
  createdAt: Date;
}

// ============================================================
// v0.1.3 ENTITIES — Future Identity Domain
// ============================================================

/** Future-self identity — evolves and may reference existing Future Me entities */
export interface FutureIdentity {
  id?: number;
  pilotId: number;
  title: string;
  targetAge?: number;
  description?: string;
  visionStatement?: string;
  /** Optional soft reference → FutureVision.id */
  linkedVisionId?: number;
  /** Optional soft reference → FutureLetter.id */
  linkedLetterId?: number;
  /** Optional soft reference → FutureMilestone.id */
  linkedMilestoneId?: number;
  createdAt: Date;
}

// ============================================================
// v0.1.3 ENTITIES — Life Balance Domain
// ============================================================

/** Wheel of Life snapshot — scores 1–10 per dimension */
export interface LifeWheelSnapshot {
  id?: number;
  pilotId: number;
  healthScore: number;
  learningScore: number;
  familyScore: number;
  friendshipScore: number;
  moneyScore: number;
  purposeScore: number;
  funScore: number;
  contributionScore: number;
  snapshotDate: Date;
}

// ============================================================
// v0.1.4 ENUMERATIONS — Simulation Engine
// ============================================================

export type ScenarioCategory =
  | "finance"
  | "career"
  | "entrepreneurship"
  | "leadership"
  | "friendship"
  | "family"
  | "school"
  | "ethics"
  | "health"
  | "community"
  | "digital_life"
  | "law"
  | "citizenship"
  | "relationships"
  | "work_life_balance";

export type ScenarioDifficulty = "beginner" | "intermediate" | "advanced" | "expert";

export type RewardType =
  | "competency_progress"
  | "value_progress"
  | "strength_progress"
  | "mission_unlock"
  | "scenario_unlock"
  | "reflection_unlock";

export type ScenarioStatus = "draft" | "published" | "archived";

// ============================================================
// v0.1.4 ENTITIES — Simulation Engine
// ============================================================

/** Life-simulation scenario — a situated real-world situation with branching choices */
export interface Scenario {
  id?: number;
  title: string;
  description: string;
  category: ScenarioCategory;
  difficulty: ScenarioDifficulty;
  /** e.g. "8-11" | "12-15" | "16-18" | "all" */
  ageGroup: string;
  /** Estimated play time in minutes */
  estimatedDuration: number;
  /** JSON-serialised string[] of learning objectives */
  learningObjectives: string;
  isRepeatable: boolean;
  status: ScenarioStatus;
  // Content alignment — optional FK cross-references to domain entities
  linkedCareerId?: number;
  linkedFinancialConceptId?: number;
  linkedMissionId?: number;
  linkedFutureVisionId?: number;
  linkedFutureIdentityId?: number;
  linkedCompetencyId?: number;
  linkedValueId?: number;
  linkedStrengthId?: number;
  createdAt: Date;
  updatedAt: Date;
}

/** A single choice presented within a Scenario */
export interface ScenarioChoice {
  id?: number;
  scenarioId: number;
  title: string;
  description: string;
  displayOrder: number;
  createdAt: Date;
}

/** Consequences of selecting a ScenarioChoice — short-term and long-term outcomes + reflection prompt */
export interface ChoiceConsequence {
  id?: number;
  choiceId: number;
  shortTermOutcome: string;
  longTermOutcome: string;
  reflectionPrompt: string;
  createdAt: Date;
}

/** Live state of a pilot across 10 life dimensions — updated by every consequence */
export interface LifeState {
  id?: number;
  pilotId: number;
  /** Financial confidence score 0–100 */
  financialConfidence: number;
  /** Quality of relationships 0–100 */
  relationshipHealth: number;
  /** Resilience capacity 0–100 */
  resilience: number;
  /** Leadership capability 0–100 */
  leadership: number;
  /** Career self-awareness 0–100 */
  careerAwareness: number;
  /** Decision-making quality 0–100 */
  decisionMaking: number;
  /** Emotional self-awareness 0–100 */
  emotionalAwareness: number;
  /** Health awareness 0–100 */
  healthAwareness: number;
  /** Ethical reasoning quality 0–100 */
  ethicalReasoning: number;
  /** Community contribution 0–100 */
  communityContribution: number;
  updatedAt: Date;
}

/** A single LifeState attribute delta applied when a consequence is resolved */
export interface LifeStateTransition {
  id?: number;
  consequenceId: number;
  /** Name of the LifeState attribute being modified */
  attributeName: keyof Omit<LifeState, "id" | "pilotId" | "updatedAt">;
  /** Positive or negative delta (e.g. +2, -1) */
  changeValue: number;
  createdAt: Date;
}

/** Records a pilot's single play of a scenario — the choice they made */
export interface PilotScenarioPlay {
  id?: number;
  pilotId: number;
  scenarioId: number;
  selectedChoiceId: number;
  playStartedAt: Date;
  playCompletedAt?: Date;
}

/** Reflection written after completing a scenario play (1:1 with PilotScenarioPlay) */
export interface ScenarioReflection {
  id?: number;
  /** FK → PilotScenarioPlay */
  playId: number;
  reflection: string;
  lessonLearned: string;
  createdAt: Date;
}

/** A reward unlocked by completing a scenario — wired to growth/values/strengths systems */
export interface ScenarioReward {
  id?: number;
  scenarioId: number;
  title: string;
  description: string;
  rewardType: RewardType;
  /** Magnitude of the reward (e.g. XP points, progress delta) */
  value: number;
}

/** A named future path unlocked by a set of scenario choices — e.g. "Financially Secure Path" */
export interface ScenarioOutcomePath {
  id?: number;
  scenarioId: number;
  name: string;
  description: string;
  futureImpact: string;
  createdAt: Date;
}

/** Gate conditions before a scenario is unlocked — prior scenario or LifeState threshold */
export interface ScenarioPrerequisite {
  id?: number;
  scenarioId: number;
  /** Must have completed this scenario to unlock */
  requiredScenarioId?: number;
  /** LifeState attribute name that must meet the threshold */
  requiredLifeStateAttribute?: string;
  /** Minimum value required for the LifeState attribute */
  requiredValue?: number;
}

/** Defines which future scenario is unlocked by a specific choice in a source scenario */
export interface ScenarioUnlock {
  id?: number;
  sourceScenarioId: number;
  sourceChoiceId: number;
  targetScenarioId: number;
  createdAt: Date;
}

/** A grouped journey of scenarios — e.g. "Money Mastery Campaign", "Young Entrepreneur" */
export interface SimulationCampaign {
  id?: number;
  title: string;
  description: string;
  category: ScenarioCategory;
  ageGroup: string;
  createdAt: Date;
}

/** Join entity linking an ordered Scenario into a SimulationCampaign */
export interface CampaignScenario {
  id?: number;
  campaignId: number;
  scenarioId: number;
  sequenceNumber: number;
}

// ============================================================
// v0.1.5 — CHARACTER, NARRATIVE & VOICE ENGINE
// ============================================================

// --- Enumerations ---

export type CharacterRole =
  | "future_self"
  | "mentor"
  | "coach"
  | "guide"
  | "friend"
  | "parent_figure"
  | "teacher"
  | "career_advisor"
  | "financial_advisor"
  | "historian"
  | "leader"
  | "explorer"
  | "inventor"
  | "entrepreneur";

export type DialogueEmotion =
  | "happy"
  | "curious"
  | "confident"
  | "reflective"
  | "excited"
  | "concerned"
  | "hopeful"
  | "proud"
  | "supportive";

export type ConversationType =
  | "future_self"
  | "mentoring"
  | "career_exploration"
  | "financial_guidance"
  | "reflection"
  | "leadership"
  | "friendship"
  | "entrepreneurship";

export type MemoryType =
  | "goal"
  | "career"
  | "money"
  | "achievement"
  | "reflection"
  | "value"
  | "mission"
  | "choice";

export type SpeakerType = "player" | "character" | "system";

export type TriggerType =
  | "scenario_completed"
  | "mission_completed"
  | "choice_selected"
  | "career_discovered"
  | "life_state_threshold"
  | "future_goal_created"
  | "reflection_completed";

// --- Domain 1: Character Engine ---

/** Platform-defined recurring personality that interacts with the player */
export interface Character {
  id?: number;
  name: string;
  role: CharacterRole;
  description: string;
  avatarImage?: string;
  voiceProfileId?: number;
  personalityType?: string;
  ageGroup?: string;
  isSystemCharacter: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// --- Domain 2: Voice Profiles ---

/** Voice configuration for a character — voice-ready architecture */
export interface VoiceProfile {
  id?: number;
  name: string;
  language: string;
  accent?: string;
  voiceEngine?: string;
  genderNeutral: boolean;
  createdAt: Date;
}

// --- Domain 3: Future Self Characters ---

/** A future version of the player — linked to a Character and FutureIdentity */
export interface FutureCharacter {
  id?: number;
  pilotId: number;
  characterId: number;
  futureAge: number;
  futureIdentityId?: number;
  description?: string;
  createdAt: Date;
}

// --- Domain 4: Narrative Engine ---

/** A long-running story journey — e.g. "Money Journey", "Entrepreneur Journey" */
export interface StoryArc {
  id?: number;
  title: string;
  description: string;
  category: ScenarioCategory;
  ageGroup: string;
  createdAt: Date;
}

/** An ordered chapter within a StoryArc — links to a Scenario */
export interface StoryChapter {
  id?: number;
  storyArcId: number;
  title: string;
  description?: string;
  sequenceNumber: number;
  scenarioId?: number;
  createdAt: Date;
}

// --- Domain 5: Dialogue System ---

/** A single character dialogue node — text, voice text, emotion */
export interface DialogueNode {
  id?: number;
  characterId: number;
  scenarioId?: number;
  chapterId?: number;
  dialogueText: string;
  voiceText?: string;
  emotion: DialogueEmotion;
  displayOrder: number;
  createdAt: Date;
}

/** A player response option from a DialogueNode — links to next node */
export interface DialogueChoice {
  id?: number;
  dialogueNodeId: number;
  choiceText: string;
  nextDialogueNodeId?: number;
  createdAt: Date;
}

// --- Domain 6: Conversation Engine ---

/** Tracks a full interaction session between a pilot and a character */
export interface ConversationSession {
  id?: number;
  pilotId: number;
  characterId: number;
  conversationType: ConversationType;
  startedAt: Date;
  endedAt?: Date;
}

// --- Domain 7: Character Relationships ---

/** Ongoing connection between a pilot and a character — builds over time */
export interface CharacterRelationship {
  id?: number;
  pilotId: number;
  characterId: number;
  relationshipLevel: number;
  trustLevel: number;
  engagementLevel: number;
  lastInteractionDate?: Date;
  createdAt: Date;
}

// --- Domain 8: Character Memory ---

/** A meaningful memory a character holds about the pilot */
export interface CharacterMemory {
  id?: number;
  pilotId: number;
  characterId: number;
  memoryType: MemoryType;
  memoryText: string;
  importance: number;
  createdAt: Date;
}

// --- Domain 9: Voice Interaction Foundation ---

/** A single turn in a voice conversation — transcript of player or character speech */
export interface VoiceInteraction {
  id?: number;
  sessionId: number;
  speakerType: SpeakerType;
  transcript: string;
  timestamp: Date;
}

// --- Domain 10: Narrative Triggers ---

/** Event-driven trigger that unlocks dialogue, story arcs, or characters */
export interface NarrativeTrigger {
  id?: number;
  triggerType: TriggerType;
  sourceEntity: string;
  sourceEntityId: number;
  targetEntity: string;
  targetEntityId: number;
  createdAt: Date;
}

// --- Domain 11: Avatar System ---

/** Player visual identity */
export interface Avatar {
  id?: number;
  pilotId: number;
  avatarName?: string;
  avatarStyle?: string;
  avatarImage?: string;
  createdAt: Date;
}

/** An avatar item or style unlocked by the pilot */
export interface AvatarUnlock {
  id?: number;
  avatarId: number;
  unlockType: string;
  unlockReason?: string;
  createdAt: Date;
}

// ============================================================
// v1.0 ENUMS — Freeze Gap Closures
// ============================================================

/** Source type for a CharacterMemory provenance record */
export type MemorySourceType =
  | "scenario"
  | "dialogue"
  | "conversation"
  | "mission"
  | "experience"
  | "reflection"
  | "choice"
  | "career_activity"
  | "financial_activity"
  | "goal";

/** Event type for CharacterRelationship progression log */
export type RelationshipEventType =
  | "conversation"
  | "mission"
  | "scenario"
  | "advice_accepted"
  | "advice_ignored"
  | "milestone"
  | "achievement"
  | "reflection";

/** Permission types a CoPilot may be granted on a pilot's data */
export type PermissionType =
  | "view_progress"
  | "view_growth"
  | "view_missions"
  | "view_reflections"
  | "view_financial_journey"
  | "view_career_journey"
  | "view_future_self"
  | "view_character_activity";

/** Asset type for pre-cached offline voice audio */
export type AudioAssetType =
  | "dialogue"
  | "greeting"
  | "story"
  | "mission"
  | "future_self"
  | "career_guide"
  | "financial_guide";

/** Type-safe avatar cosmetic unlock category */
export type AvatarUnlockType =
  | "scenario_completion"
  | "mission_completion"
  | "streak"
  | "relationship_milestone"
  | "premium"
  | "achievement"
  | "special";

// ============================================================
// v1.0 ENTITIES — Freeze Gap Closures
// ============================================================

// --- LifeState History ---

/**
 * Historical snapshot of a pilot's LifeState at a point in time.
 * Enables charting growth over weeks/months.
 * Pilot 1:N LifeStateSnapshot · LifeState 1:N LifeStateSnapshot
 */
export interface LifeStateSnapshot {
  id?: number;
  pilotId: number;
  lifeStateId: number;
  snapshotDate: Date;
  financialConfidenceScore: number;
  resilienceScore: number;
  leadershipScore: number;
  careerAwarenessScore: number;
  decisionMakingScore: number;
  emotionalAwarenessScore: number;
  healthAwarenessScore: number;
  ethicalReasoningScore: number;
  communityContributionScore: number;
  relationshipHealthScore: number;
  overallGrowthScore: number;
  createdAt: Date;
}

// --- Character Memory Provenance ---

/**
 * Explains why a CharacterMemory entry exists — the source event that created it.
 * CharacterMemory 1:N CharacterMemorySource
 */
export interface CharacterMemorySource {
  id?: number;
  characterMemoryId: number;
  sourceType: MemorySourceType;
  sourceEntity: string;
  sourceEntityId: number;
  createdAt: Date;
}

// --- Character Relationship Events ---

/**
 * A logged event that caused a CharacterRelationship to change.
 * Creates an audit trail of relationship progression.
 * CharacterRelationship 1:N CharacterRelationshipEvent
 */
export interface CharacterRelationshipEvent {
  id?: number;
  pilotId: number;
  characterId: number;
  relationshipId: number;
  eventType: RelationshipEventType;
  changeAmount: number;
  reason?: string;
  createdAt: Date;
}

// --- Co-Pilot Permissions ---

/**
 * Controls what a CoPilot (parent/guardian/mentor) can view.
 * Pilot owns which modules are visible to each CoPilot.
 * Pilot 1:N CoPilotPermission
 */
export interface CoPilotPermission {
  id?: number;
  pilotId: number;
  coPilotId: number;
  permissionType: PermissionType;
  granted: boolean;
  grantedAt?: Date;
  revokedAt?: Date;
}

// --- Audio Asset (Offline Voice Readiness) ---

/**
 * A single pre-cached voice audio asset for a character.
 * Enables offline voice playback in Premium tier.
 * Character 1:N AudioAsset
 */
export interface AudioAsset {
  id?: number;
  characterId: number;
  language: SupportedLanguage;
  assetType: AudioAssetType;
  assetPath: string;
  duration?: number;
  version: number;
  createdAt: Date;
}

/**
 * A downloadable bundle of AudioAssets for offline voice playback.
 * Installed once; character voices available without connectivity.
 */
export interface AudioPackage {
  id?: number;
  name: string;
  language: SupportedLanguage;
  version: number;
  packageSize?: number;
  createdAt: Date;
}

// ============================================================
// RP-001 GAP-CLOSURE ADDITIONS (v1.1)
// Sections 1–9: Emerging Identity · Future Paths · World Engine ·
// Pilot Memory · Character Arc · Discovery · Retention ·
// Critical Compliance · Content Scale
// ============================================================

// ------------------------------------------------------------------
// SECTION 1 — EMERGING IDENTITY ENGINE
// ------------------------------------------------------------------

/** Signals that accumulate toward an EmergingIdentity. */
export type IdentitySignalType =
  | "curiosity"
  | "leadership"
  | "creativity"
  | "service"
  | "discipline"
  | "resilience"
  | "initiative"
  | "empathy";

/** What kind of event generated an IdentitySignal. */
export type IdentitySignalSourceType =
  | "scenario"
  | "dialogue"
  | "conversation"
  | "mission"
  | "experience"
  | "reflection"
  | "choice"
  | "career_activity"
  | "financial_activity"
  | "goal";

/**
 * A life direction naturally emerging from repeated choices.
 * Examples: Explorer · Builder · Creator · Leader · Mentor · Entrepreneur
 * Global catalog entity — not pilot-scoped.
 */
export interface EmergingIdentity {
  id?: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
}

/**
 * A signal generated by a pilot action that contributes toward
 * an EmergingIdentity. Pilot 1:N IdentitySignal.
 */
export interface IdentitySignal {
  id?: number;
  pilotId: number;
  signalType: IdentitySignalType;
  sourceType: IdentitySignalSourceType;
  sourceId: number;
  value: number;
  createdAt: Date;
}

/**
 * A memorable identity-defining moment awarded to a pilot.
 * Examples: "The Builder Within" · "The First Brave Choice"
 * Pilot 1:N IdentityMoment · EmergingIdentity 1:N IdentityMoment.
 */
export interface IdentityMoment {
  id?: number;
  pilotId: number;
  emergingIdentityId: number;
  title: string;
  description: string;
  triggerSource: IdentitySignalSourceType;
  triggerId: number;
  unlockedAt: Date;
}

// ------------------------------------------------------------------
// SECTION 2 — FUTURE PATH ENGINE
// ------------------------------------------------------------------

/**
 * A named alternative life trajectory spanning multiple modules.
 * Examples: The Entrepreneur Path · The Scientist Path · The Creator Path.
 * ScenarioChoice → FuturePath · LifeState → FuturePath.
 */
export interface FuturePath {
  id?: number;
  name: string;
  description: string;
  theme: string;
  ageRange: string;
  isPremium: boolean;
}

/**
 * A possible future state within a FuturePath at a given age.
 * FuturePath 1:N FutureSnapshot.
 */
export interface FutureSnapshot {
  id?: number;
  futurePathId: number;
  age: number;
  career: string;
  lifestyleDescription: string;
  financialState: string;
  relationshipState: string;
  wellbeingState: string;
  imageReference?: string;
  summary: string;
}

// ------------------------------------------------------------------
// SECTION 3 — WORLD ENGINE
// ------------------------------------------------------------------

/** The type of place a WorldLocation represents. */
export type LocationType =
  | "school"
  | "community"
  | "career"
  | "finance"
  | "future"
  | "family"
  | "startup"
  | "library"
  | "sports"
  | "innovation";

/**
 * A named place in the LifePilot game world.
 * Examples: Money Café · Career Tower · Future Hub · The Arena · Startup Hub.
 * WorldLocation → Character · WorldLocation → Scenario · Pilot → WorldLocation.
 */
export interface WorldLocation {
  id?: number;
  name: string;
  description: string;
  icon: string;
  locationType: LocationType;
  unlockLevel: number;
  isActive: boolean;
}

/** Which characters inhabit which WorldLocation. */
export interface LocationCharacter {
  id?: number;
  locationId: number;
  characterId: number;
}

/** Which scenarios happen at which WorldLocation. */
export interface LocationScenario {
  id?: number;
  locationId: number;
  scenarioId: number;
}

/** Pilot's history of visiting each WorldLocation. */
export interface PilotLocationVisit {
  id?: number;
  pilotId: number;
  locationId: number;
  visitCount: number;
  firstVisitedAt: Date;
  lastVisitedAt: Date;
}

/** A location that becomes available after a milestone is reached. */
export interface LocationUnlock {
  id?: number;
  pilotId: number;
  locationId: number;
  unlockReason: string;
  unlockedAt: Date;
}

// ------------------------------------------------------------------
// SECTION 4 — PILOT MEMORY ENGINE
// ------------------------------------------------------------------

/** Category of a moment the pilot saves to their personal scrapbook. */
export type PilotMemoryType =
  | "first_business_attempt"
  | "future_letter"
  | "big_decision"
  | "great_conversation"
  | "achievement"
  | "proudest_moment"
  | "milestone"
  | "reflection";

/**
 * What event sourced a PilotMemory entry.
 * Kept separate from MemorySourceType (which sources CharacterMemory provenance).
 */
export type PilotMemorySourceType =
  | "scenario"
  | "dialogue"
  | "reflection"
  | "achievement"
  | "future_letter"
  | "decision"
  | "goal"
  | "experience"
  | "conversation";

/** An emotional tag the pilot applies when revisiting a memory. */
export type MemoryReactionType =
  | "proud"
  | "surprised"
  | "grateful"
  | "determined"
  | "nostalgic"
  | "inspired";

/**
 * The pilot's personal scrapbook — memorable moments they save themselves.
 * Examples: First Business Attempt · Big Decision · Proudest Moment.
 * Pilot 1:N PilotMemory.
 */
export interface PilotMemory {
  id?: number;
  pilotId: number;
  memoryType: PilotMemoryType;
  title: string;
  description: string;
  sourceType: PilotMemorySourceType;
  sourceId: number;
  importance: number;
  createdAt: Date;
}

/**
 * An emotional reaction the pilot records when revisiting a memory.
 * PilotMemory 1:N MemoryReaction.
 */
export interface MemoryReaction {
  id?: number;
  pilotMemoryId: number;
  reactionType: MemoryReactionType;
  createdAt: Date;
}

/**
 * Tracks how many times and when a pilot last replayed a memory.
 * PilotMemory 1:1 MemoryReplay (upserted on each view).
 */
export interface MemoryReplay {
  id?: number;
  pilotMemoryId: number;
  lastViewedAt: Date;
  viewCount: number;
}

// ------------------------------------------------------------------
// SECTION 5 — CHARACTER ARC ENGINE
// ------------------------------------------------------------------

/**
 * A character's personal evolution arc driven by the pilot's choices.
 * Character 1:N CharacterArc.
 */
export interface CharacterArc {
  id?: number;
  characterId: number;
  name: string;
  description: string;
}

/**
 * A single stage in a character's evolution arc.
 * CharacterArc 1:N CharacterArcStage · ScenarioChoice → CharacterArcStage.
 */
export interface CharacterArcStage {
  id?: number;
  characterArcId: number;
  stageNumber: number;
  title: string;
  description: string;
  unlockCriteria: string;
}

// ------------------------------------------------------------------
// SECTION 6 — DISCOVERY ENGINE
// ------------------------------------------------------------------

/** The category of hidden content a Discovery represents. */
export type DiscoveryType =
  | "secret_character"
  | "rare_future_path"
  | "hidden_story"
  | "special_letter"
  | "secret_mentor"
  | "hidden_scenario"
  | "rare_avatar";

/** How hard a Discovery is to find. */
export type DiscoveryRarity = "common" | "uncommon" | "rare" | "legendary";

/** What a Discovery rewards the pilot with. */
export type DiscoveryRewardType =
  | "character"
  | "story_arc"
  | "avatar_style"
  | "future_path"
  | "scenario"
  | "letter";

/**
 * A hidden piece of content unlocked by specific pilot actions.
 * Examples: Secret Character · Rare Future Path · Hidden Story Arc.
 * Global catalog entity — not pilot-scoped until PilotDiscovery is created.
 */
export interface Discovery {
  id?: number;
  title: string;
  description: string;
  discoveryType: DiscoveryType;
  rarity: DiscoveryRarity;
  unlockCriteria: string;
  rewardType: DiscoveryRewardType;
}

/**
 * Records that a specific pilot has found a specific Discovery.
 * Pilot 1:N PilotDiscovery · Discovery 1:N PilotDiscovery.
 */
export interface PilotDiscovery {
  id?: number;
  pilotId: number;
  discoveryId: number;
  discoveredAt: Date;
}

// ------------------------------------------------------------------
// SECTION 7 — RETENTION ENGINE
// ------------------------------------------------------------------

/** The activity type of a DailyChallenge. */
export type ChallengeType =
  | "scenario"
  | "reflection"
  | "dialogue"
  | "career_exploration"
  | "financial_activity"
  | "mission"
  | "future_self"
  | "identity";

/** What a StreakReward grants for maintaining consecutive daily engagement. */
export type StreakRewardType =
  | "avatar_unlock"
  | "character_unlock"
  | "story_arc"
  | "discovery"
  | "badge";

/**
 * A structured 24-hour mini-task with a single action and streak reward.
 * DailyChallenge → Scenario · DailyChallenge → Notification.
 */
export interface DailyChallenge {
  id?: number;
  title: string;
  description: string;
  challengeType: ChallengeType;
  difficulty: ScenarioDifficulty;
  rewardType: StreakRewardType;
  activeDate: Date;
}

/**
 * A milestone reward for maintaining a consecutive daily streak.
 * Pilot 1:N StreakReward (via NarrativeTrigger or direct award).
 */
export interface StreakReward {
  id?: number;
  daysRequired: number;
  rewardType: StreakRewardType;
  rewardReference: string;
}

// ------------------------------------------------------------------
// SECTION 8 — CRITICAL COMPLIANCE
// ------------------------------------------------------------------

/** The category of consent being recorded. */
export type ConsentType =
  | "data_processing"
  | "voice_recording"
  | "ai_inference"
  | "analytics";

/** The current state of a consent record. */
export type ConsentStatus = "granted" | "revoked" | "pending" | "expired";

/** The state of a pending sync item in the offline queue. */
export type SyncStatus = "pending" | "syncing" | "synced" | "failed" | "conflict";

/** The type of write operation in the sync queue. */
export type SyncOperationType = "create" | "update" | "delete";

/**
 * Verifiable parental consent for a child's data processing.
 * Required by DPDP Act 2023 (India) before any data leaves the device.
 * Pilot 1:N ConsentRecord · CoPilot 1:N ConsentRecord.
 */
export interface ConsentRecord {
  id?: number;
  pilotId: number;
  coPilotId: number;
  consentType: ConsentType;
  consentStatus: ConsentStatus;
  consentVersion: string;
  grantedAt?: Date;
  revokedAt?: Date;
  expiresAt?: Date;
  ipAddress?: string;
  createdAt: Date;
}

/**
 * Explicit parental consent for STT voice recording of a child.
 * Must exist before VoiceInteraction (speakerType: player) is ever stored.
 * Pilot 1:1 VoiceConsent (per CoPilot granting STT consent).
 */
export interface VoiceConsent {
  id?: number;
  pilotId: number;
  coPilotId: number;
  consentStatus: ConsentStatus;
  consentVersion: string;
  grantedAt?: Date;
  revokedAt?: Date;
  createdAt: Date;
}

/**
 * Explicit parental consent for AI inference on a child's data.
 * Required before AIConversation or AIRecommendation is generated.
 * Pilot 1:1 AIConsentRecord (per CoPilot granting AI consent).
 */
export interface AIConsentRecord {
  id?: number;
  pilotId: number;
  coPilotId: number;
  consentStatus: ConsentStatus;
  consentVersion: string;
  aiProviderScope: string;
  grantedAt?: Date;
  revokedAt?: Date;
  createdAt: Date;
}

/**
 * A pending offline mutation waiting to sync to any future backend.
 * Prevents data loss in multi-device scenarios.
 * One row per unsynced IndexedDB write.
 */
export interface SyncQueue {
  id?: number;
  tableName: string;
  recordId: number;
  operationType: SyncOperationType;
  payload: string;
  syncStatus: SyncStatus;
  retryCount: number;
  lastAttemptAt?: Date;
  syncedAt?: Date;
  createdAt: Date;
}

// ------------------------------------------------------------------
// SECTION 9 — CONTENT SCALE ENGINE
// ------------------------------------------------------------------

/** The edition/audience category of a ContentPack. */
export type ContentPackType =
  | "career"
  | "finance"
  | "leadership"
  | "culture"
  | "future_self"
  | "family"
  | "resilience";

/** The translation pipeline state of a content item in a given language. */
export type LocalizationStatus =
  | "not_started"
  | "in_progress"
  | "review"
  | "approved"
  | "published";

/** The type of content entity a LocalizationTask covers. */
export type LocalizationTaskType =
  | "scenario"
  | "dialogue_node"
  | "story_arc"
  | "mission"
  | "culture_story"
  | "character_description";

/**
 * A structural scaffold for scenario authoring.
 * Gives content creators a standard starting point: category, difficulty,
 * number of choices, consequence framework, and default reward type.
 */
export interface ScenarioTemplate {
  id?: number;
  name: string;
  description: string;
  defaultCategory: ScenarioCategory;
  defaultDifficulty: ScenarioDifficulty;
  choiceCount: number;
  consequenceFramework: string;
  defaultRewardType: string;
  isPremium: boolean;
  createdAt: Date;
}

/**
 * A branching dialogue scaffold enforcing standard emotion progression.
 * Example: opening(excited) → 2 choices → consequence(proud/concerned) → closing(hopeful).
 */
export interface DialogueTemplate {
  id?: number;
  name: string;
  characterRole: CharacterRole;
  openingEmotion: DialogueEmotion;
  closingEmotion: DialogueEmotion;
  nodeCount: number;
  choiceCount: number;
  description: string;
  createdAt: Date;
}

/**
 * A named, purchasable bundle of Scenarios + StoryArcs + Characters + Missions.
 * The unit of Premium monetisation.
 * Example: "Career Explorer Pack — Hindi — Grade 9–10"
 */
export interface ContentPack {
  id?: number;
  name: string;
  description: string;
  packType: ContentPackType;
  targetLanguage: SupportedLanguage;
  targetAgeGroup: string;
  isPremium: boolean;
  version: number;
  createdAt: Date;
}

/**
 * Tracks the localisation completion state of a content entity in one language.
 * At 200 scenarios × 10 languages = 2000 rows — the localisation dashboard.
 */
export interface ContentLocalizationStatus {
  id?: number;
  entityType: LocalizationTaskType;
  entityId: number;
  language: SupportedLanguage;
  localizationStatus: LocalizationStatus;
  lastUpdatedAt: Date;
  publishedAt?: Date;
}

/**
 * A single translation assignment for one content entity in one language.
 * Enables per-translator assignment, status tracking, and QA workflow.
 */
export interface LocalizationTask {
  id?: number;
  taskType: LocalizationTaskType;
  entityId: number;
  language: SupportedLanguage;
  assignedTo?: string;
  localizationStatus: LocalizationStatus;
  dueDate?: Date;
  completedAt?: Date;
  createdAt: Date;
}

// ============================================================
// RP-002: ASSESSMENT ENGINE
// ============================================================

/** The category of assessment framework. */
export type AssessmentType =
  | "self_awareness"
  | "leadership"
  | "decision_making"
  | "financial_literacy"
  | "future_readiness"
  | "emotional_intelligence"
  | "values"
  | "resilience";

/** The response format expected for an AssessmentQuestion. */
export type AssessmentResponseType =
  | "likert_scale"
  | "multiple_choice"
  | "yes_no"
  | "numeric"
  | "text";

/**
 * An assessment framework measuring a specific life-skills dimension.
 * Example: "Future Readiness Assessment — Grade 9–10 — v2"
 */
export interface Assessment {
  id?: number;
  title: string;
  description: string;
  assessmentType: AssessmentType;
  targetAgeGroup: string;
  version: number;
  isActive: boolean;
  createdAt: Date;
}

/**
 * A single question belonging to an Assessment.
 * Optionally linked to a CompetencyCatalog or ValueCatalog for competency mapping.
 */
export interface AssessmentQuestion {
  id?: number;
  assessmentId: number;
  questionText: string;
  displayOrder: number;
  responseType: AssessmentResponseType;
  competencyId?: number;
  valueId?: number;
  createdAt: Date;
}

/**
 * A pilot's answer to a single AssessmentQuestion.
 * responseValue is stored as a string to support all responseType formats.
 */
export interface AssessmentResponse {
  id?: number;
  pilotId: number;
  assessmentQuestionId: number;
  responseValue: string;
  submittedAt: Date;
}

/**
 * Calculated assessment outcome for a pilot on a specific Assessment.
 * Stores before/after scores to prove measurable growth.
 * Example: Before Program 42 → After Program 71 → Improvement +29
 */
export interface AssessmentResult {
  id?: number;
  pilotId: number;
  assessmentId: number;
  score: number;
  percentile?: number;
  previousScore?: number;
  improvementDelta?: number;
  calculatedAt: Date;
}

// ============================================================
// RP-002: INSTITUTION REPORTING ENGINE
// ============================================================

/** School-wide report type. */
export type InstitutionReportType =
  | "identity_distribution"
  | "competency_distribution"
  | "engagement_metrics"
  | "growth_trends"
  | "assessment_outcomes"
  | "attendance"
  | "counsellor_sessions";

/** Cohort insight category. */
export type CohortType =
  | "top_emerging_identities"
  | "most_improved_competencies"
  | "engagement_trends"
  | "assessment_comparison"
  | "career_interests";

/**
 * School-wide analytics snapshot generated for the School Edition dashboard.
 * Derived — never duplicates source-of-truth data. References existing entities via queries.
 * Example: "Identity Distribution — Spring 2026 — St. Mary's High School"
 */
export interface InstitutionReport {
  id?: number;
  schoolId: number;
  reportType: InstitutionReportType;
  reportPeriodStart: Date;
  reportPeriodEnd: Date;
  generatedAt: Date;
  snapshotData: string;
}

/**
 * Class-level analytics report generated per Classroom.
 * Example: "Grade 8A Leadership Growth Report — Term 2"
 */
export interface ClassroomReport {
  id?: number;
  classroomId: number;
  reportType: InstitutionReportType;
  reportPeriodStart: Date;
  reportPeriodEnd: Date;
  generatedAt: Date;
  snapshotData: string;
}

/**
 * Derived insight about a cohort (school or classroom group).
 * insightData is a JSON blob of aggregated cohort analytics.
 * Example: Top 3 emerging identities across Grade 9 cohort.
 */
export interface CohortInsight {
  id?: number;
  schoolId: number;
  cohortType: CohortType;
  insightData: string;
  generatedAt: Date;
}

// ============================================================
// RP-002: COUNSELLOR ENGINE
// ============================================================

/** Domain specialisation of a school counsellor. */
export type CounsellorSpecialization =
  | "academic"
  | "career"
  | "emotional"
  | "behavioural"
  | "family"
  | "college_readiness";

/** Current availability state of a counsellor. */
export type CounsellorAvailabilityStatus =
  | "available"
  | "busy"
  | "on_leave"
  | "unavailable";

/** Type of counselling session. */
export type CounsellorSessionType =
  | "individual"
  | "group"
  | "crisis"
  | "career_guidance"
  | "follow_up"
  | "assessment_review";

/**
 * A school-affiliated counsellor.
 * Privacy-aware: linked only to the School, never directly to Pilot data.
 * Parent permission (CoPilotPermission) gates pilot data access.
 */
export interface Counsellor {
  id?: number;
  schoolId: number;
  name: string;
  email?: string;
  specialization: CounsellorSpecialization;
  qualification: string;
  availabilityStatus: CounsellorAvailabilityStatus;
  isActive: boolean;
  createdAt: Date;
}

/**
 * A guidance session between a pilot and a counsellor.
 * notes and recommendations are encrypted-at-rest in production.
 * Only accessible if parent has granted permission via CoPilotPermission.
 */
export interface CounsellorSession {
  id?: number;
  counsellorId: number;
  pilotId: number;
  sessionDate: Date;
  sessionType: CounsellorSessionType;
  notes?: string;
  recommendations?: string;
  followUpDate?: Date;
  assessmentId?: number;
  createdAt: Date;
}

// ============================================================
// RP-002: COMPLIANCE AUDIT ENGINE
// ============================================================

/** The type of entity the AuditLog record references. */
export type AuditEntityType =
  | "pilot"
  | "consent_record"
  | "voice_consent"
  | "ai_consent_record"
  | "assessment"
  | "counsellor_session"
  | "data_export"
  | "pilot_memory"
  | "sync_queue"
  | "school"
  | "enrollment"
  | "content_pack";

/** The action that was performed. */
export type AuditActionType =
  | "consent_granted"
  | "consent_revoked"
  | "assessment_submitted"
  | "counsellor_session_created"
  | "data_export_requested"
  | "account_created"
  | "account_deleted"
  | "data_accessed"
  | "sync_completed"
  | "report_generated";

/** Who performed the action. */
export type AuditActorType =
  | "pilot"
  | "co_pilot"
  | "counsellor"
  | "teacher"
  | "school_admin"
  | "system";

/**
 * An immutable, append-only audit record for compliance and governance.
 * Covers DPDP Act 2023 traceability requirements.
 * Design: never updated or deleted. Only written to SyncQueue when offline.
 * metadata is a JSON string with action-specific context.
 */
export interface AuditLog {
  id?: number;
  entityType: AuditEntityType;
  entityId: number;
  actionType: AuditActionType;
  actorType: AuditActorType;
  actorId: number;
  timestamp: Date;
  metadata?: string;
}

// ============================================================
// RP-002: INTERVENTION ENGINE
// ============================================================

/** The type of trigger condition an InterventionRule monitors. */
export type InterventionTriggerType =
  | "confidence_below_threshold"
  | "engagement_decline"
  | "identity_stagnation"
  | "streak_broken"
  | "assessment_score_low"
  | "counsellor_referral"
  | "missed_daily_challenge"
  | "competency_stagnation";

/** Severity level of an InterventionRule. */
export type InterventionSeverity = "low" | "medium" | "high" | "critical";

/** The type of recommended action to take. */
export type InterventionRecommendationType =
  | "mission"
  | "reflection"
  | "counsellor_session"
  | "parent_conversation"
  | "daily_challenge"
  | "career_exploration"
  | "future_letter"
  | "competency_practice";

/** The type of entity the recommendation targets. */
export type InterventionTargetEntityType =
  | "mission"
  | "reflection"
  | "counsellor_session"
  | "daily_challenge"
  | "scenario"
  | "career"
  | "competency"
  | "notification";

/**
 * A declarative rule that defines a trigger condition for proactive support.
 * Examples:
 *   — Confidence Score < 30 → severity: high
 *   — Engagement Decline > 20% → severity: medium
 *   — Identity Stagnation > 60 days → severity: low
 */
export interface InterventionRule {
  id?: number;
  name: string;
  description: string;
  triggerType: InterventionTriggerType;
  threshold: number;
  severity: InterventionSeverity;
  isActive: boolean;
  createdAt: Date;
}

/**
 * A proactive recommendation generated when an InterventionRule fires.
 * Connected to Competencies, Identity Engine, DailyChallenge, Counsellor, and Notifications.
 * targetEntityId references the specific entity being recommended (e.g. a Mission id).
 */
export interface InterventionRecommendation {
  id?: number;
  interventionRuleId: number;
  pilotId: number;
  recommendationType: InterventionRecommendationType;
  targetEntityType: InterventionTargetEntityType;
  targetEntityId?: number;
  isActedUpon: boolean;
  actedUponAt?: Date;
  generatedAt: Date;
}

// ============================================================
// RP-003 HUMAN-CENTRIC DOMAINS (v1.4 — Schema v11)
// ============================================================

// ── DOMAIN 1 — HUMAN DEVELOPMENT FRAMEWORK ──────────────────

export type DevelopmentStageType =
  | "childhood"
  | "early_adolescence"
  | "mid_adolescence"
  | "late_adolescence"
  | "young_adult"
  | "adult"
  | "mature_adult";

export type GrowthDimensionType =
  | "emotional"
  | "character"
  | "leadership"
  | "purpose"
  | "competency"
  | "identity"
  | "career_readiness"
  | "life_readiness";

export interface DevelopmentStage {
  id?: number;
  stageType: DevelopmentStageType;
  name: string;
  ageRangeMin: number;
  ageRangeMax: number;
  description: string;
  keyFocuses: string;
  isActive: boolean;
  createdAt: Date;
}

export interface GrowthDimension {
  id?: number;
  dimensionType: GrowthDimensionType;
  name: string;
  description: string;
  parentDimensionId?: number;
  isActive: boolean;
  createdAt: Date;
}

export interface DevelopmentMilestone {
  id?: number;
  developmentStageId: number;
  growthDimensionId: number;
  title: string;
  description: string;
  pilotId?: number;
  isReached: boolean;
  reachedAt?: Date;
  evidence?: string;
  createdAt: Date;
}

export interface GrowthIndicator {
  id?: number;
  pilotId: number;
  growthDimensionId: number;
  value: number;
  notes?: string;
  assessmentResultId?: number;
  recordedAt: Date;
}

// ── DOMAIN 2 — CURRICULUM FRAMEWORK ─────────────────────────

export type CurriculumFramework =
  | "cbse"
  | "icse"
  | "ib"
  | "igcse"
  | "cambridge"
  | "nep"
  | "state_board"
  | "university"
  | "corporate"
  | "custom";

export type LearningOutcomeType = "knowledge" | "skill" | "attitude" | "competency" | "value";

export interface Curriculum {
  id?: number;
  framework: CurriculumFramework;
  name: string;
  description: string;
  gradeLevel?: string;
  version: string;
  isActive: boolean;
  createdAt: Date;
}

export interface CurriculumModule {
  id?: number;
  curriculumId: number;
  title: string;
  description: string;
  sequenceOrder: number;
  durationHours?: number;
  isActive: boolean;
  createdAt: Date;
}

export interface LearningOutcome {
  id?: number;
  curriculumModuleId: number;
  outcomeType: LearningOutcomeType;
  statement: string;
  competencyId?: number;
  valueId?: number;
  isAssessable: boolean;
  createdAt: Date;
}

export interface CompetencyMapping {
  id?: number;
  curriculumModuleId: number;
  competencyId?: number;
  valueId?: number;
  careerPathId?: number;
  mappingStrength: number;
  notes?: string;
  createdAt: Date;
}

// ── DOMAIN 3 — PERSONALITY EVOLUTION ────────────────────────

export type PersonalityFramework =
  | "big_five"
  | "disc"
  | "mbti"
  | "via_strengths"
  | "enneagram"
  | "custom";

export type PersonalityTraitCategory =
  | "openness"
  | "conscientiousness"
  | "extraversion"
  | "agreeableness"
  | "neuroticism"
  | "disc_d"
  | "disc_i"
  | "disc_s"
  | "disc_c"
  | "custom";

export interface PersonalityProfile {
  id?: number;
  pilotId: number;
  framework: PersonalityFramework;
  version: number;
  summaryType?: string;
  description?: string;
  isBaseline: boolean;
  createdAt: Date;
}

export interface PersonalityAssessment {
  id?: number;
  personalityProfileId: number;
  assessmentResultId?: number;
  framework: PersonalityFramework;
  rawData?: string;
  completedAt: Date;
  createdAt: Date;
}

export interface PersonalityTrait {
  id?: number;
  personalityProfileId: number;
  traitCategory: PersonalityTraitCategory;
  traitName: string;
  score: number;
  percentile?: number;
  confidence: number;
  description?: string;
}

export interface PersonalityGrowth {
  id?: number;
  pilotId: number;
  traitCategory: PersonalityTraitCategory;
  fromScore: number;
  toScore: number;
  fromProfileId: number;
  toProfileId: number;
  growthNotes?: string;
  recordedAt: Date;
}

// ── DOMAIN 4 — DECISION INTELLIGENCE ────────────────────────
// Note: DecisionOutcome (v0.1.x) already exists — new richer entity is DecisionScenarioOutcome

export type DecisionContext =
  | "career"
  | "education"
  | "relationships"
  | "financial"
  | "health"
  | "values"
  | "lifestyle"
  | "identity"
  | "other";

export type DecisionPatternType =
  | "impulsive"
  | "analytical"
  | "avoidant"
  | "collaborative"
  | "intuitive"
  | "values_driven"
  | "risk_averse"
  | "risk_tolerant";

export interface DecisionScenario {
  id?: number;
  pilotId: number;
  title: string;
  context: DecisionContext;
  situation: string;
  stakeholders?: string;
  constraints?: string;
  emotionalState?: string;
  confidence: number;
  urgency: number;
  decidedAt?: Date;
  createdAt: Date;
}

export interface DecisionScenarioOutcome {
  id?: number;
  decisionScenarioId: number;
  chosenOption: string;
  alternativesConsidered?: string;
  risksAcknowledged?: string;
  expectedImpact?: string;
  actualOutcome?: string;
  satisfactionScore?: number;
  regretScore?: number;
  longtermImpact?: string;
  reviewedAt?: Date;
  createdAt: Date;
}

export interface DecisionReflection {
  id?: number;
  decisionScenarioId: number;
  pilotId: number;
  lessonsLearned: string;
  wouldChooseDifferently: boolean;
  wisdomGained?: string;
  timelineEventId?: number;
  reflectedAt: Date;
}

export interface DecisionPattern {
  id?: number;
  pilotId: number;
  patternType: DecisionPatternType;
  occurrenceCount: number;
  lastObservedAt: Date;
  aiInsight?: string;
  isAcknowledged: boolean;
  updatedAt: Date;
}

// ── DOMAIN 5 — LIFE TIMELINE ─────────────────────────────────
// Note: TimelineEvent and TimelineEventType (v0.1.x) already exist — richer versions named Life*

export type LifeTimelineEventType =
  | "assessment"
  | "mission"
  | "reflection"
  | "identity_change"
  | "decision"
  | "achievement"
  | "career_goal"
  | "counsellor_session"
  | "future_letter"
  | "wellbeing_event"
  | "milestone"
  | "custom";

export interface LifeTimelineEvent {
  id?: number;
  pilotId: number;
  eventType: LifeTimelineEventType;
  title: string;
  summary?: string;
  entityType?: string;
  entityId?: number;
  collectionId?: number;
  emotionalTag?: string;
  significanceScore: number;
  isPrivate: boolean;
  occurredAt: Date;
  createdAt: Date;
}

export interface TimelineCollection {
  id?: number;
  pilotId: number;
  name: string;
  description?: string;
  coverImageUrl?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimelineNarrative {
  id?: number;
  pilotId: number;
  title: string;
  narrativeText: string;
  collectionId?: number;
  startEventId?: number;
  endEventId?: number;
  isAiGenerated: boolean;
  generatedAt: Date;
}
// Note: startEventId / endEventId reference LifeTimelineEvent.id

// ── DOMAIN 6 — WELLBEING FRAMEWORK ──────────────────────────

export type WellbeingDimensionType =
  | "physical"
  | "mental"
  | "emotional"
  | "social"
  | "financial"
  | "career"
  | "learning"
  | "purpose"
  | "environmental"
  | "spiritual";

export type WellbeingTrend = "improving" | "stable" | "declining" | "fluctuating" | "unknown";

export interface WellbeingProfile {
  id?: number;
  pilotId: number;
  overallScore: number;
  trend: WellbeingTrend;
  lastAssessedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface WellbeingAssessment {
  id?: number;
  pilotId: number;
  wellbeingProfileId: number;
  overallScore: number;
  stressLevel: number;
  happinessLevel: number;
  energyLevel: number;
  motivationLevel: number;
  lifeSatisfaction: number;
  burnoutRisk: number;
  resilienceScore: number;
  notes?: string;
  assessedAt: Date;
}

export interface WellbeingDimension {
  id?: number;
  wellbeingAssessmentId: number;
  dimensionType: WellbeingDimensionType;
  score: number;
  notes?: string;
  trend: WellbeingTrend;
}

export interface WellbeingSnapshot {
  id?: number;
  pilotId: number;
  dimensionType: WellbeingDimensionType;
  score: number;
  trend: WellbeingTrend;
  snapshotDate: Date;
  source?: string;
}

// ── DOMAIN 7 — ACHIEVEMENT FRAMEWORK ────────────────────────
// Note: Achievement (v0.1.x) already exists (gamification badges) — portfolio achievements use Life* prefix

export type LifeAchievementCategoryType =
  | "academic"
  | "leadership"
  | "career"
  | "health"
  | "financial"
  | "community_service"
  | "entrepreneurship"
  | "learning"
  | "life_milestone"
  | "custom";

export type LifeAchievementStatus = "in_progress" | "completed" | "verified" | "exported";
export type LifeAchievementEvidenceType =
  | "document"
  | "photo"
  | "video"
  | "link"
  | "certificate"
  | "testimonial"
  | "self_report";

export interface LifeAchievement {
  id?: number;
  pilotId: number;
  title: string;
  description: string;
  categoryType: LifeAchievementCategoryType;
  achievementStatus: LifeAchievementStatus;
  isVerified: boolean;
  verifiedBy?: string;
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
}

export interface LifeAchievementCategory {
  id?: number;
  categoryType: LifeAchievementCategoryType;
  name: string;
  description: string;
  iconName?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface LifeAchievementProgress {
  id?: number;
  lifeAchievementId: number;
  pilotId: number;
  progressPercentage: number;
  milestone?: string;
  notes?: string;
  recordedAt: Date;
}

export interface LifeAchievementEvidence {
  id?: number;
  lifeAchievementId: number;
  evidenceType: LifeAchievementEvidenceType;
  title: string;
  url?: string;
  description?: string;
  uploadedAt: Date;
}

// ── DOMAIN 8 — PERSONAL OPERATING SYSTEM ────────────────────

export type PrincipleCategoryType =
  | "guiding_principle"
  | "moral_framework"
  | "personal_rule"
  | "commitment"
  | "belief_statement"
  | "constitution";

export type BeliefType = "core" | "limiting" | "empowering" | "contextual" | "evolving";

export type DecisionRuleType =
  | "always"
  | "never"
  | "when_condition"
  | "priority_order"
  | "threshold";

export interface LifePrinciple {
  id?: number;
  pilotId: number;
  principleCategory: PrincipleCategoryType;
  title: string;
  statement: string;
  origin?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PersonalBelief {
  id?: number;
  pilotId: number;
  beliefType: BeliefType;
  statement: string;
  evidence?: string;
  isConscious: boolean;
  challengedAt?: Date;
  evolvedTo?: string;
  createdAt: Date;
}

export interface DecisionRule {
  id?: number;
  pilotId: number;
  ruleType: DecisionRuleType;
  title: string;
  rule: string;
  context?: DecisionContext;
  isActive: boolean;
  createdAt: Date;
}

export interface CoreValueEvolution {
  id?: number;
  pilotId: number;
  valueId: number;
  fromRank?: number;
  toRank?: number;
  fromIntensity?: number;
  toIntensity?: number;
  reason?: string;
  triggeredBy?: string;
  evolvedAt: Date;
}

// ============================================================
// RP-003 DOMAIN 1: FEATURE MANAGEMENT ENGINE
// ============================================================

export type FeatureFlagStatus = "enabled" | "disabled" | "rollout" | "experiment" | "deprecated";
export type FeatureFlagScope = "pilot" | "school" | "enterprise" | "tenant" | "global";
export type RolloutStrategy = "percentage" | "allowlist" | "blocklist" | "geography" | "plan_tier" | "device_type";
export type ExperimentStatus = "draft" | "running" | "paused" | "completed" | "archived";
export type ExperimentVariantType = "control" | "variant_a" | "variant_b" | "variant_c";

export interface FeatureFlag {
  id?: number;
  name: string;
  description: string;
  flagStatus: FeatureFlagStatus;
  scope: FeatureFlagScope;
  isActive: boolean;
  rolloutPercentage?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeatureFlagAssignment {
  id?: number;
  featureFlagId: number;
  scopeEntityId: number;
  scope: FeatureFlagScope;
  isEnabled: boolean;
  assignedAt: Date;
  expiresAt?: Date;
}

export interface FeatureRollout {
  id?: number;
  featureFlagId: number;
  strategy: RolloutStrategy;
  targetValue: string;
  percentage?: number;
  startedAt: Date;
  endedAt?: Date;
  isActive: boolean;
}

export interface Experiment {
  id?: number;
  featureFlagId: number;
  name: string;
  description: string;
  hypothesis: string;
  experimentStatus: ExperimentStatus;
  startedAt?: Date;
  endedAt?: Date;
  createdAt: Date;
}

export interface ExperimentVariant {
  id?: number;
  experimentId: number;
  variantType: ExperimentVariantType;
  name: string;
  description: string;
  trafficPercentage: number;
  isControl: boolean;
}

export interface FeatureUsage {
  id?: number;
  featureFlagId: number;
  pilotId?: number;
  schoolId?: number;
  tenantId?: number;
  experimentVariantId?: number;
  usedAt: Date;
  sessionId?: string;
}

// ============================================================
// RP-003 DOMAIN 2: SUBSCRIPTION & LICENSING ENGINE
// (SubscriptionPlan and PilotSubscription preserved from v0.x)
// ============================================================

export type SubscriptionStatus = "active" | "paused" | "cancelled" | "expired" | "trial" | "grace_period";
export type SubscriptionTier = "free" | "premium" | "family" | "school" | "enterprise" | "white_label";
export type EntitlementType = "feature_access" | "content_pack" | "seat_count" | "api_calls" | "storage" | "assessments";
export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled" | "refunded";
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded" | "disputed";
export type PaymentMethod = "upi" | "card" | "netbanking" | "wallet" | "bank_transfer" | "razorpay" | "stripe";
export type LicenseType = "individual" | "family" | "school" | "enterprise" | "white_label" | "partner";

export interface Subscription {
  id?: number;
  pilotId?: number;
  schoolId?: number;
  tenantId?: number;
  subscriptionPlanId: number;
  subscriptionStatus: SubscriptionStatus;
  tier: SubscriptionTier;
  startedAt: Date;
  renewsAt?: Date;
  cancelledAt?: Date;
  trialEndsAt?: Date;
  createdAt: Date;
}

export interface Entitlement {
  id?: number;
  subscriptionId: number;
  entitlementType: EntitlementType;
  limit?: number;
  used?: number;
  featureName: string;
  isActive: boolean;
  validFrom: Date;
  validUntil?: Date;
}

export interface UsageRecord {
  id?: number;
  subscriptionId: number;
  entitlementType: EntitlementType;
  quantity: number;
  recordedAt: Date;
  metadata?: string;
}

export interface Invoice {
  id?: number;
  subscriptionId: number;
  invoiceStatus: InvoiceStatus;
  amountDue: number;
  amountPaid: number;
  currency: string;
  issuedAt: Date;
  dueAt: Date;
  paidAt?: Date;
  createdAt: Date;
}

export interface Payment {
  id?: number;
  invoiceId: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  amount: number;
  currency: string;
  gatewayTransactionId?: string;
  gatewayProvider: string;
  attemptedAt: Date;
  completedAt?: Date;
  failureReason?: string;
}

export interface License {
  id?: number;
  schoolId?: number;
  tenantId?: number;
  licenseType: LicenseType;
  seatCount: number;
  usedSeats: number;
  licenseKey: string;
  isActive: boolean;
  validFrom: Date;
  validUntil: Date;
  createdAt: Date;
}

export interface SeatAssignment {
  id?: number;
  licenseId: number;
  pilotId: number;
  assignedAt: Date;
  revokedAt?: Date;
  isActive: boolean;
}

// ============================================================
// RP-003 DOMAIN 3: NOTIFICATION PLATFORM
// (Notification entity preserved from v0.x)
// ============================================================

export type NotificationTemplateType =
  | "onboarding"
  | "mission_complete"
  | "streak"
  | "counsellor_session"
  | "assessment_result"
  | "daily_challenge"
  | "intervention"
  | "campaign";

export type CampaignStatus = "draft" | "scheduled" | "running" | "paused" | "completed" | "cancelled";
export type DeliveryStatus = "queued" | "sent" | "delivered" | "failed" | "bounced" | "read";
export type NotificationChannelType = "push" | "email" | "sms" | "whatsapp" | "in_app";

export interface NotificationTemplate {
  id?: number;
  templateType: NotificationTemplateType;
  channel: NotificationChannelType;
  language: SupportedLanguage;
  subject?: string;
  bodyTemplate: string;
  isActive: boolean;
  version: number;
  createdAt: Date;
}

export interface NotificationCampaign {
  id?: number;
  name: string;
  description: string;
  notificationTemplateId: number;
  campaignStatus: CampaignStatus;
  scheduledAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  targetFilter?: string;
  createdAt: Date;
}

export interface NotificationPreference {
  id?: number;
  pilotId: number;
  channel: NotificationChannelType;
  isEnabled: boolean;
  quietHoursStart?: string;
  quietHoursEnd?: string;
  updatedAt: Date;
}

export interface NotificationDelivery {
  id?: number;
  notificationId?: number;
  campaignId?: number;
  pilotId: number;
  channel: NotificationChannelType;
  deliveryStatus: DeliveryStatus;
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  failureReason?: string;
  retryCount: number;
  createdAt: Date;
}

export interface NotificationAnalytics {
  id?: number;
  campaignId: number;
  channel: NotificationChannelType;
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  failedCount: number;
  bouncedCount: number;
  calculatedAt: Date;
}

export interface NotificationChannel {
  id?: number;
  channel: NotificationChannelType;
  isEnabled: boolean;
  providerName: string;
  providerConfig?: string;
  priority: number;
  updatedAt: Date;
}

// ============================================================
// RP-003 DOMAIN 4: RECOMMENDATION ENGINE
// ============================================================

export type RecommendationType =
  | "career"
  | "mission"
  | "learning"
  | "content"
  | "coach"
  | "future_path"
  | "competency"
  | "assessment";

export type RecommendationStatus = "pending" | "shown" | "acted_upon" | "dismissed" | "expired";
export type RecommendationFeedbackType = "helpful" | "not_helpful" | "irrelevant" | "already_done";

export interface Recommendation {
  id?: number;
  pilotId: number;
  recommendationType: RecommendationType;
  recommendationStatus: RecommendationStatus;
  targetEntityType: string;
  targetEntityId?: number;
  score: number;
  modelId?: number;
  generatedAt: Date;
  expiresAt?: Date;
}

export interface RecommendationCandidate {
  id?: number;
  recommendationModelId: number;
  candidateEntityType: string;
  candidateEntityId: number;
  baseScore: number;
  features?: string;
  isActive: boolean;
  updatedAt: Date;
}

export interface RecommendationFeedback {
  id?: number;
  recommendationId: number;
  pilotId: number;
  feedbackType: RecommendationFeedbackType;
  feedbackText?: string;
  givenAt: Date;
}

export interface RecommendationHistory {
  id?: number;
  pilotId: number;
  recommendationId: number;
  recommendationType: RecommendationType;
  targetEntityId?: number;
  shownAt: Date;
  interactedAt?: Date;
  wasActedUpon: boolean;
}

export interface RecommendationModel {
  id?: number;
  name: string;
  description: string;
  recommendationType: RecommendationType;
  version: number;
  isActive: boolean;
  configJson?: string;
  createdAt: Date;
}

// ============================================================
// RP-003 DOMAIN 5: KNOWLEDGE GRAPH ENGINE
// ============================================================

export type KnowledgeNodeType =
  | "competency"
  | "career"
  | "value"
  | "identity"
  | "concept"
  | "skill"
  | "domain"
  | "person"
  | "place"
  | "event";

export type KnowledgeRelationshipType =
  | "is_a"
  | "has_a"
  | "requires"
  | "enables"
  | "related_to"
  | "opposite_of"
  | "part_of"
  | "leads_to";

export interface KnowledgeNode {
  id?: number;
  label: string;
  nodeType: KnowledgeNodeType;
  description?: string;
  entityType?: string;
  entityId?: number;
  ontologyId?: number;
  isActive: boolean;
  createdAt: Date;
}

export interface KnowledgeRelationship {
  id?: number;
  fromNodeId: number;
  toNodeId: number;
  relationshipType: KnowledgeRelationshipType;
  weight: number;
  isDirected: boolean;
  createdAt: Date;
}

export interface KnowledgeCluster {
  id?: number;
  name: string;
  description: string;
  ontologyId?: number;
  isActive: boolean;
  createdAt: Date;
}

export interface SemanticTag {
  id?: number;
  tag: string;
  entityType: string;
  entityId: number;
  knowledgeNodeId?: number;
  confidence: number;
  createdAt: Date;
}

export interface Ontology {
  id?: number;
  name: string;
  description: string;
  domain: string;
  version: string;
  isActive: boolean;
  createdAt: Date;
}

// ============================================================
// RP-003 DOMAIN 6: AI GOVERNANCE ENGINE
// ============================================================

export type AIModelProvider = "openai" | "anthropic" | "google" | "mistral" | "cohere" | "custom";
export type AIModelType = "completion" | "chat" | "embedding" | "classification" | "moderation";
export type PromptStatus = "draft" | "review" | "approved" | "deprecated" | "archived";
export type SafetyReviewStatus = "pending" | "approved" | "rejected" | "escalated";
export type AIUsageType =
  | "chat"
  | "recommendation"
  | "assessment_scoring"
  | "content_generation"
  | "translation"
  | "safety_check";

export interface AIModel {
  id?: number;
  provider: AIModelProvider;
  modelType: AIModelType;
  modelName: string;
  version: string;
  contextWindowTokens: number;
  costPerInputToken: number;
  costPerOutputToken: number;
  isActive: boolean;
  createdAt: Date;
}

export interface PromptTemplate {
  id?: number;
  aiModelId: number;
  name: string;
  description: string;
  promptStatus: PromptStatus;
  useCase: AIUsageType;
  isActive: boolean;
  createdAt: Date;
}

export interface PromptVersion {
  id?: number;
  promptTemplateId: number;
  version: number;
  promptText: string;
  systemPrompt?: string;
  promptStatus: PromptStatus;
  safetyReviewId?: number;
  createdAt: Date;
}

export interface PromptExecution {
  id?: number;
  promptVersionId: number;
  pilotId?: number;
  inputTokens: number;
  outputTokens: number;
  latencyMs: number;
  wasSuccessful: boolean;
  errorMessage?: string;
  executedAt: Date;
}

export interface AIUsage {
  id?: number;
  pilotId?: number;
  aiModelId: number;
  usageType: AIUsageType;
  promptExecutionId?: number;
  inputTokens: number;
  outputTokens: number;
  costEstimateUsd: number;
  recordedAt: Date;
}

export interface AISafetyReview {
  id?: number;
  promptVersionId: number;
  reviewerActorType: string;
  reviewerActorId: number;
  safetyReviewStatus: SafetyReviewStatus;
  notes?: string;
  reviewedAt?: Date;
  createdAt: Date;
}

export interface AIFeedback {
  id?: number;
  promptExecutionId: number;
  pilotId?: number;
  rating: number;
  feedbackText?: string;
  wasHallucination: boolean;
  wasHarmful: boolean;
  givenAt: Date;
}

// ============================================================
// RP-003 DOMAIN 7: INTEGRATION PLATFORM
// ============================================================

export type IntegrationType =
  | "lms"
  | "crm"
  | "hrm"
  | "calendar"
  | "communication"
  | "payment"
  | "ai"
  | "analytics";

export type IntegrationStatus = "active" | "inactive" | "error" | "pending_auth" | "rate_limited";
export type WebhookStatus = "active" | "inactive" | "failing" | "disabled";
export type OAuthStatus = "connected" | "disconnected" | "expired" | "revoked";
export type SyncDirection = "inbound" | "outbound" | "bidirectional";

export interface ExternalIntegration {
  id?: number;
  name: string;
  integrationType: IntegrationType;
  integrationStatus: IntegrationStatus;
  tenantId?: number;
  schoolId?: number;
  baseUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface APIKey {
  id?: number;
  externalIntegrationId?: number;
  tenantId?: number;
  keyHash: string;
  label: string;
  isActive: boolean;
  lastUsedAt?: Date;
  expiresAt?: Date;
  createdAt: Date;
}

export interface Webhook {
  id?: number;
  externalIntegrationId?: number;
  tenantId?: number;
  targetUrl: string;
  webhookStatus: WebhookStatus;
  secretHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WebhookSubscription {
  id?: number;
  webhookId: number;
  eventType: string;
  isActive: boolean;
  createdAt: Date;
}

export interface OAuthConnection {
  id?: number;
  externalIntegrationId: number;
  tenantId?: number;
  schoolId?: number;
  oAuthStatus: OAuthStatus;
  expiresAt?: Date;
  scopeGranted?: string;
  connectedAt?: Date;
  createdAt: Date;
}

export interface SyncConnector {
  id?: number;
  externalIntegrationId: number;
  syncDirection: SyncDirection;
  entityType: string;
  isActive: boolean;
  lastSyncAt?: Date;
  nextSyncAt?: Date;
  createdAt: Date;
}

export interface IntegrationLog {
  id?: number;
  externalIntegrationId: number;
  eventType: string;
  status: string;
  payload?: string;
  responseCode?: number;
  errorMessage?: string;
  loggedAt: Date;
}

export interface IntegrationEvent {
  id?: number;
  externalIntegrationId: number;
  eventType: string;
  entityType: string;
  entityId?: number;
  direction: SyncDirection;
  processedAt?: Date;
  isProcessed: boolean;
  createdAt: Date;
}

// ============================================================
// RP-003 DOMAIN 8: LOCALIZATION PLATFORM
// ============================================================

export type ScriptType =
  | "latin"
  | "devanagari"
  | "bengali"
  | "telugu"
  | "tamil"
  | "kannada"
  | "malayalam"
  | "gujarati"
  | "gurmukhi"
  | "odia";

export type RegionalPolicyType =
  | "data_residency"
  | "content_moderation"
  | "age_verification"
  | "consent"
  | "currency"
  | "right_to_deletion";

export interface Language {
  id?: number;
  code: SupportedLanguage;
  nativeName: string;
  englishName: string;
  scriptType: ScriptType;
  isRtl: boolean;
  isActive: boolean;
  isPremium: boolean;
  createdAt: Date;
}

export interface Translation {
  id?: number;
  entityType: string;
  entityId: number;
  fieldName: string;
  language: SupportedLanguage;
  translatedValue: string;
  localizationStatus: LocalizationStatus;
  translatedAt: Date;
  reviewedAt?: Date;
}

export interface LocalizedContent {
  id?: number;
  entityType: string;
  entityId: number;
  language: SupportedLanguage;
  contentJson: string;
  localizationStatus: LocalizationStatus;
  publishedAt?: Date;
  updatedAt: Date;
}

export interface CountryConfiguration {
  id?: number;
  countryCode: string;
  countryName: string;
  defaultLanguage: SupportedLanguage;
  currency: string;
  dateFormat: string;
  timezoneDefault: string;
  isActive: boolean;
  isPremiumMarket: boolean;
  createdAt: Date;
}

export interface RegionalPolicy {
  id?: number;
  countryCode: string;
  policyType: RegionalPolicyType;
  policyDetails: string;
  isActive: boolean;
  effectiveFrom: Date;
  effectiveUntil?: Date;
  createdAt: Date;
}

export interface TimezoneConfiguration {
  id?: number;
  timezoneId: string;
  displayName: string;
  utcOffsetMinutes: number;
  countryCode: string;
  isDst: boolean;
  isActive: boolean;
}

// ============================================================
// UI TYPES
// ============================================================

export interface LanguageOption {
  code: SupportedLanguage;
  nativeName: string;
  englishName: string;
  rtl?: boolean;
}

export interface NavigationItem {
  labelKey: string;
  icon: string;
  path: string;
  moduleId: string;
}

export interface Module {
  id: string;
  nameKey: string;
  descriptionKey: string;
  icon: string;
  path: string;
  color: string;
}

export type StorageResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// ============================================================
// RP-002A — PILOT DNA ENGINE
// ============================================================
// Observational-only. Never diagnostic. Never surfaced to UI.
// Governance: XP-004 (no labelling), XP-005 (privacy), XP-003 (observational language).

export type PilotInterestCategory =
  | "space"
  | "technology"
  | "sports"
  | "animals"
  | "nature"
  | "art"
  | "music"
  | "books"
  | "building"
  | "business"
  | "cooking"
  | "movies"
  | "helping"
  | "science"
  | "gaming";

export type PilotGrowthGoalType =
  | "confidence"
  | "creativity"
  | "leadership"
  | "communication"
  | "learning"
  | "focus"
  | "friendship"
  | "responsibility"
  | "kindness"
  | "problem_solving";

export type PilotAdventureStyle =
  | "exploring"
  | "building"
  | "creating"
  | "helping"
  | "learning"
  | "competing"
  | "leading";

export type PilotSignalSource =
  | "onboarding"
  | "flight_log"
  | "flight_plan"
  | "adventure"
  | "future_me"
  | "career_explorer"
  | "life_choices"
  | "money_quest"
  | "future_you";

export type PilotSignalType =
  | "interest"
  | "curiosity"
  | "growth"
  | "aspiration"
  | "preference"
  | "completion"
  | "engagement"
  | "browse";

export interface PilotInterest {
  id?: number;
  pilotId: number;
  category: PilotInterestCategory;
  source: "onboarding" | "observed";
  /** 1–100, internal weighting only — never exposed to UI */
  strength: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PilotGrowthGoal {
  id?: number;
  pilotId: number;
  goal: PilotGrowthGoalType;
  source: "onboarding" | "observed";
  createdAt: Date;
  updatedAt: Date;
}

export interface PilotPreference {
  id?: number;
  pilotId: number;
  adventureStyle: PilotAdventureStyle;
  source: "onboarding" | "observed";
  createdAt: Date;
  updatedAt: Date;
}

export interface PilotSignal {
  id?: number;
  pilotId: number;
  source: PilotSignalSource;
  signalType: PilotSignalType;
  /** e.g. "Reflection" | "FlightPlanGoal" | "Adventure" */
  entityType: string;
  entityId?: number;
  /** JSON-encoded string array of observed tags */
  tags?: string;
  createdAt: Date;
}

export interface PilotAffinity {
  id?: number;
  pilotId: number;
  /** e.g. "creativity" | "curiosity" | "kindness" */
  domain: string;
  /** 0–100, internal weighting only — never exposed to UI */
  strength: number;
  lastSignalAt: Date;
  updatedAt: Date;
}

export interface PilotAspiration {
  id?: number;
  pilotId: number;
  /** Raw text extract — never shown back as analysis */
  text: string;
  source: PilotSignalSource;
  extractedAt: Date;
  createdAt: Date;
}

export interface PilotContentHistory {
  id?: number;
  pilotId: number;
  /** "adventure" | "prompt" | "message" | "template" */
  contentType: string;
  contentId: string;
  interactionType: "seen" | "selected" | "skipped" | "completed";
  createdAt: Date;
}
