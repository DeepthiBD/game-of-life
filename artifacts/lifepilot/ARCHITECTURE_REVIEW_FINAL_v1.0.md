# LifePilot — Final Architecture Review v1.0
## Pre-Freeze Gap Analysis · Chief Enterprise Architect

> **Phases reviewed:** RP-000A through RP-000F (all six)
> **Baseline:** 111 entities · 42 enums · 318 values · 7 schema versions
> **Instruction:** No redesign. No removals. No code. Identify ONLY genuinely missing concepts that would be expensive to add post-launch.

---

## Section 1 — Life Simulation Completeness Review

| Dimension | Entity Support | Status | Gap |
|-----------|---------------|--------|-----|
| **Identity** | PilotIdentity (evolving self-portrait), PilotStrength, PilotValue, PurposeStatement | ✅ Complete | — |
| **Experiences** | LifeExperience (12 categories), LifeChapter, LifeWheelSnapshot, RelationshipReflection | ✅ Complete | — |
| **Choices** | ScenarioChoice, DialogueChoice, LifeChoiceOption, DecisionRecord — 4 distinct surfaces | ✅ Complete | — |
| **Consequences** | ChoiceConsequence (short+long), LifeStateTransition (quantified), ScenarioOutcomePath (named) | ✅ Complete | — |
| **Growth** | PilotCompetency, PilotValue, PilotStrength, LifeState (live), LifeStateSnapshot (history) | ✅ Complete | — |
| **Future Self** | FutureCharacter, FutureIdentity, FutureVision, PurposeStatement, ConversationSession(future_self) | ✅ Complete | — |
| **Life Paths** | ScenarioOutcomePath, ScenarioUnlock (branching) | ⚠️ Partial | No first-class `LifePath` entity for named life trajectories spanning multiple modules |
| **Career Paths** | Career (10 categories), CareerExploration, CareerRoadmap, CareerRoadmapStep | ✅ Complete | — |
| **Financial Paths** | FinancialConcept (8 types), FinancialLessonProgress, finance scenarios | ⚠️ Partial | No `FinancialJourney` progression arc linking lessons → scenarios → LifeState growth |
| **Relationship Paths** | RelationshipReflection (privacy-first), CharacterRelationship, ConversationType: friendship | ⚠️ Partial | No `RelationshipJourney` entity — relationship development over time not tracked |
| **Leadership Paths** | LifeState.leadership, ScenarioCategory: leadership, Mission, Character (role: leader) | ⚠️ Partial | No `LeadershipJourney` or `LeadershipPortfolio` — cross-scenario leadership arc |
| **Purpose Discovery** | PurposeStatement (versioned, evolves over time) | ✅ Complete | — |
| **Character Development** | ValueCatalog, StrengthCatalog, PilotStrength, GrowthEvidence | ✅ Complete | — |
| **Life State Evolution** | LifeState (live) → LifeStateTransition (delta log) → LifeStateSnapshot (time series) | ✅ Complete | — |

### Missing Concepts (Section 1)

| Concept | Risk Level | Rationale |
|---------|-----------|-----------|
| `LifePath` — a named overarching life trajectory (e.g. "The Entrepreneur Path", "The Healer Path") that spans multiple modules and campaigns | **Important** | ScenarioOutcomePath names trajectory per scenario; there's no entity for a multi-module life narrative arc that ties Career + Finance + Leadership together into one named journey |
| `DomainJourney` — a progression arc within a domain (financial journey, leadership journey, career journey) that has a start, chapters, and a destination | **Important** | The gap between individual FinancialConcept lessons and the complete financial maturity journey — currently modelled only through StoryArc but StoryArc is narrative, not progression |

---

## Section 2 — Retention Engine Review

| Mechanic | Entity Support | Status | Gap |
|---------|---------------|--------|-----|
| **Avatar Progression** | Avatar, AvatarUnlock (AvatarUnlockType: 7 types) | ✅ Complete | — |
| **Character Attachment** | CharacterRelationship (level 1–10, trust 1–10), CharacterRelationshipEvent | ✅ Complete | — |
| **Mentor Relationships** | Character (role: mentor/coach), CharacterRelationship | ✅ Complete | — |
| **Future Self Relationships** | FutureCharacter, CharacterMemory, ConversationSession (future_self) | ✅ Complete | — |
| **Story Curiosity** | NarrativeTrigger (completing X → unlocks Y), StoryChapter sequence | ✅ Complete | — |
| **Unlockable Content** | ScenarioUnlock, NarrativeTrigger, ScenarioPrerequisite | ✅ Complete | — |
| **Long-Term Progression** | LifeState + LifeStateSnapshot + CharacterRelationship level | ✅ Complete | — |
| **Return Motivation** | 6 independent pull mechanics (chapter, relationship, avatar, LifeState insight, character, Future Self) | ✅ Complete | — |
| **Daily Engagement** | Notification (7 types), Habit + HabitActivity, ActivityEvent | ⚠️ Partial | No `DailyChallenge` entity — structured daily mini-task with a 24-hour window and streak reward |
| **Narrative Progression** | StoryChapter.sequenceNumber + NarrativeTrigger | ✅ Complete | — |

### Missing Entities (Section 2)

| Entity | Risk Level | Rationale |
|--------|-----------|-----------|
| `DailyChallenge` — a 24-hour mini-task (one question, one scenario choice, one reflection prompt) with streak tracking | **Important** | Notification + Habit can push daily engagement but neither provides structured daily content units. A child who has "today's challenge" is more likely to open the app than one who receives a generic notification |
| `StreakReward` — a milestone reward for maintaining a consecutive daily engagement streak (day 7, day 30, day 100) | **Optional** | AvatarUnlock covers this cosmetically but there's no explicit streak-milestone entity for non-cosmetic rewards (e.g., unlock a new character at day 30) |

---

## Section 3 — Social Without Social Media Review

| Concept | Entity Support | Status | Gap |
|---------|---------------|--------|-----|
| **Parent Participation** | CoPilot, CoPilotPermission (8 module types), ConversationStarter | ✅ Complete | — |
| **Mentor Participation** | Character (role: mentor/coach), CharacterRelationship | ✅ Complete | — |
| **Teacher Participation** | Teacher, Classroom, Enrollment, Program | ⚠️ Partial | Teacher can see that a student is enrolled; no `TeacherObservation` or student-progress view entity |
| **Counsellor Participation** | No counsellor entity | ❌ Missing | Teacher ≠ Counsellor in NEP 2020; counsellor role is distinct and requires different data access |
| **Family Missions** | FamilyChallenge, FamilyChallengeParticipant (deferred) | ⚠️ Modelled, deferred | Entities exist but not in MVP sprint |
| **Cooperative Challenges** | No cross-pilot entity | ⚠️ Gap | Classroom cooperative challenges (e.g., "class goal: 100 combined reflections") need an aggregate target entity |
| **Role Models** | Character (role: leader, historian, entrepreneur, explorer) | ✅ Complete | — |
| **Guided Reflection** | ConversationStarter, ScenarioReflection, Reflection (7 types) | ✅ Complete | — |
| **No public rankings** | No leaderboard entity exists | ✅ Safe | Cannot accidentally introduce global rankings — not in the model |
| **No likes/followers** | No social graph entity | ✅ Safe | Structurally impossible — no cross-pilot relationships |

### Missing Concepts (Section 3)

| Concept | Risk Level | Rationale |
|---------|-----------|-----------|
| `Counsellor` — a school counsellor entity with a distinct role (different from Teacher), access model, and programme scope | **Important** | NEP 2020 mandates school counsellors as distinct from subject teachers. Adding post-launch requires retrofitting Program and Enrollment with counsellor references |
| `ClassroomChallenge` — a shared classroom-level goal (aggregate of student actions, e.g. "200 combined reflections this month") | **Optional** | Cooperative mechanics without social comparison — the class succeeds together, not against each other |
| `TeacherObservation` — a brief structured note a teacher can leave on a student's progress (readable by the student with consent) | **Optional** | Currently teachers have no mechanism to contribute to a student's experience within the model |

---

## Section 4 — Content Engine Review

| Content Type | Entity Support | Status | Gap |
|-------------|---------------|--------|-----|
| **Scenarios** | Scenario (15 categories, 4 difficulties), PilotScenarioPlay | ✅ Complete | — |
| **Story Arcs** | StoryArc, StoryChapter | ✅ Complete | — |
| **Dialogues** | DialogueNode, DialogueChoice (branching tree) | ✅ Complete | — |
| **Characters** | Character (14 roles, 15+ system characters at seed) | ✅ Complete | — |
| **Career Stories** | Career + CareerExploration + ConversationType: career_exploration | ✅ Complete | — |
| **Financial Stories** | FinancialConcept (8 types) + finance scenarios + Priya character | ✅ Complete | — |
| **Cultural Stories** | CultureStory (10 languages, regional, offline) | ✅ Complete | — |
| **Mission Packs** | Mission (standalone), no MissionPack bundling entity | ⚠️ Partial | Missions exist individually; no bundle/series entity for curated mission collections |
| **Premium Story Packs** | ContentItem.isPremium (flag), no StoryPack as purchasable unit | ⚠️ Partial | Premium flag on individual items, but no "Story Pack" as a cohesive purchasable collection |
| **Localised Content** | SupportedLanguage on most entities (10 languages) | ✅ Complete | — |
| **Content Authoring** | No template entities | ❌ Missing | Content creators have no template layer — every scenario, dialogue, and story must be authored from scratch |
| **Content Localisation Status** | No tracking entity | ❌ Missing | No way to know which of 200 scenarios have been translated into Tamil vs Bengali |

### Missing Entities (Section 4)

| Entity | Risk Level | Rationale |
|--------|-----------|-----------|
| `ContentPack` — a named, purchasable collection of Scenarios + StoryArcs + Characters (e.g. "Career Explorer Pack", "Financial Mastery Pack") | **Important** | Without this, Premium monetisation is limited to individual ContentItem.isPremium flags; cohesive "pack" purchasing (higher ARPU) is impossible |
| `ContentLocalisationStatus` — tracks translation completion per ContentItem per language | **Important** | At 200 scenarios × 10 languages = 2000 translation tasks; without tracking, localisation management is impossible |
| `ScenarioTemplate` — a structural scaffold for scenario authoring with default fields, branching patterns, and consequence frameworks | **Important** | Without templates, authoring 500 scenarios requires 500 authors starting from scratch. Templates are the content engine's productivity multiplier |

---

## Section 5 — Experience Engine Review

| Dimension | Entity Support | Status | Gap |
|-----------|---------------|--------|-----|
| **Life Experiences** | LifeExperience (12 ExperienceCategory values) | ✅ Complete | — |
| **Experience Outcomes** | LifeExperience.lessonsLearned (free text) | ⚠️ Partial | No structured `ExperienceOutcome` — outcomes are unstructured strings, not typed for analysis |
| **Experience Reflection** | LifeExperience.reflection, Reflection entity (7 types) | ✅ Complete | — |
| **Experience Impact** | LifeExperience.impactLevel (ImpactLevel: 4 values), ImpactEvidence | ✅ Complete | — |
| **Experience Timeline** | TimelineEvent (9 types, polymorphic) | ✅ Complete | — |
| **Life Milestones** | FutureMilestone, LifeChapter, Achievement, Badge | ✅ Complete | — |
| **Life Lessons** | LifeExperience.lessonsLearned, ScenarioReflection.lessonLearned | ✅ Complete | — |
| **Growth Moments** | GrowthEvidence (evidence of competency growth) | ✅ Complete | — |

### Missing Entities (Section 5)

| Entity | Risk Level | Rationale |
|--------|-----------|-----------|
| `ExperienceTag` — pilot-defined tags on LifeExperiences (e.g. "failure", "proud", "turning point", "family") | **Optional** | Enables pattern discovery: "You have 8 experiences tagged 'leadership' — you are already a leader." Without tags, experiences are searchable by category only |
| `LifeLesson` — a standalone first-class entity for "lessons I have learned" with importance and source, distinct from the free-text field in LifeExperience | **Optional** | If LifePilot builds a "My Lessons" collection screen, a join between experiences and a structured LessonType enum would be needed |

---

## Section 6 — Future Self Engine Review

| Capability | Entity Support | Status | Gap |
|-----------|---------------|--------|-----|
| **Future Letters** | FutureLetter (time-locked, delivered on date) | ✅ Complete | — |
| **Future Conversations** | ConversationSession (type: future_self), CharacterMemory | ✅ Complete | — |
| **Future Characters** | FutureCharacter (pilot's own future at configurable ages) | ✅ Complete | — |
| **Future Identities** | FutureIdentity (multiple per pilot, soft-linked to FutureVision) | ✅ Complete | — |
| **Future Possibilities** | FutureVision (one imagined future state) | ⚠️ Partial | One FutureVision per horizon — no entity for multiple competing possible futures at the same age |
| **Alternative Futures** | ScenarioOutcomePath (names trajectory per scenario) | ⚠️ Partial | ScenarioOutcomePath labels where a pattern leads; no first-class "FuturePath" modelling two divergent life arcs side-by-side |
| **Multiple Future Paths** | ScenarioUnlock (branching scenarios) | ⚠️ Partial | Branching exists at scenario level; no meta-entity for "Branch A: The Entrepreneur" vs "Branch B: The Scientist" |
| **Future Regret Simulation** | No entity | ❌ Missing | "What if I had chosen differently at Scenario X?" is a powerful engagement mechanic with no model support |
| **Future Opportunity Simulation** | FutureIdentity + ScenarioOutcomePath | ⚠️ Partial | Available futures from choices are not surfaced as named playable paths |

### Missing Concepts (Section 6)

| Concept | Risk Level | Rationale |
|---------|-----------|-----------|
| `FuturePath` — a named, playable alternative life trajectory defined by a pattern of choices (e.g. "The Entrepreneur Path" — if pilot chose boldly in finance + leadership scenarios). Distinct from ScenarioOutcomePath (per-scenario) | **Important** | The most compelling mechanic in life simulation games is seeing two diverging futures and choosing which one to pursue. Adding this post-launch requires retrofitting ScenarioChoice → FuturePath attribution |
| `ScenarioReplayRequest` — a pilot's intent to replay a scenario with different choices, triggering the "what-if" simulation | **Optional** | Powerful for reflection and engagement; low urgency if FuturePath is modelled first |

---

## Section 7 — Character Engine Review

| Capability | Entity Support | Status | Gap |
|-----------|---------------|--------|-----|
| **Mentors** | Character (role: mentor, coach) | ✅ Complete | — |
| **Guides** | Character (role: guide, historian) | ✅ Complete | — |
| **Friends** | Character (role: friend) | ✅ Complete | — |
| **Role Models** | Character (role: leader, entrepreneur, explorer, inventor) | ✅ Complete | — |
| **Historical Figures** | Character (role: historian) | ✅ Complete | — |
| **Career Experts** | Character (role: career_advisor) | ✅ Complete | — |
| **Future Self** | FutureCharacter + Character (role: future_self) | ✅ Complete | — |
| **Character Memory** | CharacterMemory (8 MemoryType values) + CharacterMemorySource | ✅ Complete | — |
| **Relationship Progression** | CharacterRelationship (level, trust, engagement) + CharacterRelationshipEvent | ✅ Complete | — |
| **Emotional Attachment** | CharacterRelationship.trustLevel + DialogueNode.emotion (9 values) | ✅ Complete | — |
| **Character Reputation** | No dedicated entity | ⚠️ Partial | trustLevel + relationshipLevel capture depth of bond; no "reputation" concept for what the pilot thinks of the character's credibility or wisdom |
| **Character Trust** | CharacterRelationship.trustLevel (1–10) | ✅ Complete | — |
| **Character Affinity** | CharacterRelationship.relationshipLevel + trustLevel | ⚠️ Partial | Affinity is the sum of relationship + trust + shared values — no composite affinity score |

### Gaps (Section 7)

| Concept | Risk Level | Rationale |
|---------|-----------|-----------|
| `CharacterReputation` — the pilot's perception of a character's credibility and wisdom, distinct from relationship closeness (trust) and engagement frequency | **Optional** | A mentor's advice carries weight only if the pilot respects them. A reputation score (0–100) builds separately from trust and enables richer dialogue branching ("Priya has high reputation — she recommends saving. You trust her advice.") |
| `CharacterAffinity` — a composite of relationship + trust + shared values, used to determine which character the pilot is most bonded with | **Optional** | Derived from existing fields; could be computed rather than stored, depending on query patterns |

---

## Section 8 — Voice Engine Review

| Capability | Entity Support | Status | Gap |
|-----------|---------------|--------|-----|
| **Voice Profiles** | VoiceProfile (language, accent, voiceEngine, genderNeutral) | ✅ Complete | — |
| **Voice Conversations** | ConversationSession + VoiceInteraction (transcript, speakerType) | ✅ Complete | — |
| **Voice Memory** | CharacterMemory (content of what was said in conversation) | ✅ Complete | — |
| **Offline Audio** | AudioAsset (per character, per language, typed) + AudioPackage (downloadable bundle) | ✅ Complete | — |
| **Voice Assets** | AudioAsset (7 AudioAssetType values) | ✅ Complete | — |
| **Speech To Text Readiness** | VoiceInteraction.transcript (speakerType: player) | ✅ Complete | — |
| **Text To Speech Readiness** | DialogueNode.voiceText + VoiceProfile.voiceEngine | ✅ Complete | — |
| **Premium Voice Features** | VoiceProfile.voiceEngine + AudioPackage (Premium-gated) | ✅ Complete | — |
| **STT Consent for Minors** | No entity | ❌ Missing | India's DPDP Act 2023 requires explicit parental consent before processing a child's voice data |

### Missing Entities (Section 8)

| Entity | Risk Level | Rationale |
|--------|-----------|-----------|
| `VoiceConsent` — explicit, versioned consent record for STT voice processing, tied to CoPilot approval, required before VoiceInteraction (speakerType: player) is activated | **Critical** | DPDP Act 2023 (India) and COPPA (if applicable) mandate verifiable parental consent before recording a minor's voice. Adding this post-STT-launch is a regulatory retrofit — consent records must exist before any voice data is stored |

---

## Section 9 — World Engine Review

### Assessment: A World Engine Domain Should Be Reserved

The model currently has no concept of **place** — every scenario, character, and story arc exists in abstract module-space. For LifePilot to fulfil its "life simulation game" identity at scale, characters must live somewhere. Priya works in "The Money Café." Coach Arjun trains at "The Leadership Arena." Future You lives in "The Future Hub." The Startup Hub is where entrepreneur scenarios happen.

Without location entities, the game world is invisible. Players navigate menus, not a world.

**Adding location post-launch is expensive** because it requires:
- `Character.locationId` FK on every character
- `Scenario.locationId` FK on every scenario
- `StoryChapter.locationId` FK on every chapter
- The UX metaphor shifts from "modules" to "world map" — a significant product change

### Recommended Reserve Entities

| Entity | Purpose |
|--------|---------|
| `WorldLocation` | A named place in the LifePilot world (school, community centre, startup hub, future city, virtual library, coaching arena) |
| `LocationCharacter` | Which characters inhabit which location (Priya lives in The Money Café, Coach Arjun in The Arena) |
| `LocationScenario` | Which scenarios happen at which location |
| `PilotLocationVisit` | Player's history of visiting each location (builds attachment to place) |
| `LocationUnlock` | A location that becomes available after completing content milestones |

### Reserved Location Seeds

| Location | Characters | Scenario Categories |
|---------|-----------|-------------------|
| The Money Café | Priya (financial_advisor) | finance, budgeting |
| The Arena | Coach Arjun (coach) | leadership, resilience |
| The Career Tower | Dr Kavya (career_advisor) | career, entrepreneurship |
| The Future Hub | Future You (future_self) | future_self conversations |
| The Neighbourhood | Meera (guide), Sam (friend) | community, friendship |
| The Library | The Historian (historian) | culture, citizenship |
| The Startup Hub | Ravi (entrepreneur) | entrepreneurship, innovation |
| The School | Teacher characters | school scenarios |
| The Family Home | Grandma Kamala (parent_figure) | family, values |

**Verdict: Reserve `WorldLocation` + `LocationCharacter` + `LocationScenario` + `PilotLocationVisit` + `LocationUnlock` in v1.1. Do not block MVP on this, but add FK stubs now.**

---

## Section 10 — Memory Engine Review

| Capability | Entity Support | Status | Gap |
|-----------|---------------|--------|-----|
| **Character Memories** | CharacterMemory (8 MemoryType) + CharacterMemorySource (provenance) | ✅ Complete | — |
| **Player Memories** | No `PilotMemory` entity | ❌ Missing | The pilot has no personal "memory scrapbook" — only characters remember things |
| **Important Decisions** | DecisionRecord (real), ScenarioReflection (simulation) | ✅ Complete | — |
| **Milestones** | FutureMilestone, Achievement, Badge, LifeChapter | ✅ Complete | — |
| **Achievements** | Achievement, Badge, Certificate | ✅ Complete | — |
| **Life Lessons** | LifeExperience.lessonsLearned, ScenarioReflection.lessonLearned | ✅ Complete | — |
| **Personal Timeline** | TimelineEvent (9 types, polymorphic) | ✅ Complete | — |
| **Memory Collections** | No `MemoryCollection` or `PilotScrapbook` | ❌ Missing | A curated, player-assembled collection of meaningful moments |
| **Memory Replay** | No replay entity | ⚠️ Missing | "Revisit this memory" requires a replay entry — no model support |
| **Future Recall** | CharacterMemory (Future Self references past) | ✅ Complete | — |

### Missing Entities (Section 10)

| Entity | Risk Level | Rationale |
|--------|-----------|-----------|
| `PilotMemory` — a first-class memory record the pilot saves themselves: a screenshot moment, a completed scenario, a conversation highlight, a letter written. The pilot's own "what I remember" collection | **Important** | Characters remember the pilot (CharacterMemory) but the pilot has no equivalent "my memories" concept. A 13-year-old who can revisit "my proudest moments" is more emotionally invested |
| `MemoryCollection` — a curated, named album of PilotMemory entries (e.g. "My Proudest Moments", "Things Future Me Should Know") | **Optional** | Enables the "trophy room" or "scrapbook" product surface. Cheap to add if PilotMemory is modelled first; expensive to retrofit if PilotMemory is skipped |

---

## Section 11 — Inventory Engine Review

### Assessment: A Soft Inventory Engine Should Be Modelled

The model has distributed collectibles: Achievement, Badge, Certificate, AvatarUnlock, FutureLetter (time-locked), CultureStory (discoverable), Career (exploration), ScenarioOutcomePath (earned).

None of these are connected by a unified "inventory" concept. A pilot cannot see everything they have earned in one place.

### Recommendation

Do **not** build a heavyweight Inventory Engine at v1.0. Model a lightweight `PilotInventoryItem` as a polymorphic join that aggregates across earned entities. This costs one table and enables a "My Collection" screen without architectural debt.

| Entity | Purpose | Notes |
|--------|---------|-------|
| `PilotInventoryItem` | A polymorphic join: pilotId + itemType (enum) + itemId + earnedAt | itemType: badge / certificate / avatar_style / future_letter / career_discovery / story_pack / scenario_path |
| `InventoryItemType` | Enum of collectible item types | Replaces the free-type reference |

**This is Optional — but cheap now, expensive later.** If a "My Collection" screen appears in the product roadmap (high probability given engagement goals), this entity must exist.

---

## Section 12 — Content Creation Risk Review

### Assessment: The Biggest Operational Risk in the Model

The domain model is optimised for runtime (what players experience). It is not optimised for creation time (what content creators produce). At launch, LifePilot will need:

- 50+ scenarios (minimum)
- 8+ story arcs × 8 chapters each = 64+ chapters
- 500+ dialogue nodes across 15 characters
- 10 language translations of all the above

Without a template layer, this is a manual bottleneck that does not scale.

| Missing Entity | Risk | Why Expensive Post-Launch |
|---------------|------|--------------------------|
| `ScenarioTemplate` — a structural scaffold for authoring scenarios: default category, difficulty curve, number of choices (2 or 3), consequence framework, reward type | **Critical** | Without templates, every scenario author invents structure independently — inconsistency compounds across 200 scenarios. Templates are the authoring pipeline's foundation |
| `DialogueTemplate` — a branching dialogue scaffold with character role, emotion progression, and standard node count | **Important** | 500 dialogue nodes without templates means 500 ad-hoc structures. A template enforces: opening node (excited) → 2 choices → consequence node (proud/concerned) → closing node (hopeful) |
| `ContentPack` — a named, versioned bundle of scenarios + story arcs + characters + missions, with isPremium flag, targetAgeGroup, and language coverage | **Important** | Premium monetisation at scale needs packs. "Career Explorer Pack — Hindi — Grade 9–10" is a unit of sale. Without this entity, Premium is per-item, not per-bundle |
| `LocalisationTask` — tracks which ContentItem, Scenario, DialogueNode, or CultureStory is assigned to which translator, in which language, at what status | **Important** | At 200 scenarios × 10 languages = 2000 tasks with no tracking entity, localisation becomes a spreadsheet — eventually a spreadsheet disaster |
| `ContentReviewFlag` — a flag on ContentItem/Scenario/DialogueNode indicating it has been reviewed for age-appropriateness and cultural sensitivity | **Optional** | Necessary before School Edition deployment; adding post-launch requires a full content audit |

---

## Section 13 — School Edition Review

| Concept | Entity Support | Status | Gap |
|---------|---------------|--------|-----|
| **School** | School (name, city, state, affiliationCode, isActive) | ✅ Complete | — |
| **Class / Classroom** | Classroom (teacherId, schoolId, name, gradeLevel) | ✅ Complete | — |
| **Teacher** | Teacher (schoolId, name, email, subject) | ✅ Complete | — |
| **Counsellor** | No entity | ❌ Missing | NEP 2020 mandates distinct counsellor role — different from subject teacher |
| **Program** | Program (schoolId, title, category, dates) | ✅ Complete | — |
| **Student Groups** | No entity | ⚠️ Missing | Sub-groups within a classroom (special need groups, advanced groups, counsellor-assigned groups) |
| **Institution Reporting** | No reporting entity | ❌ Missing | School principals / CSR managers need aggregate progress reports |
| **Life Skill Programs** | Program + ContentItem + LearningPath | ✅ Complete | — |
| **Career Programs** | Program + Career + CareerExploration | ✅ Complete | — |
| **Pilot.schoolId** | ✅ Added in v1.0 | ✅ Complete | — |

### Missing Concepts (Section 13)

| Concept | Risk | Rationale |
|---------|------|-----------|
| `Counsellor` — a school counsellor entity with distinct access rights (different from Teacher), linked to Program and with the ability to observe student progress via a separate permission model | **Important** | Indian schools under NEP 2020 distinguish subject teachers from school counsellors. Counsellors design life skills programs and need a different data view than teachers |
| `StudentGroup` — a named sub-group within a Classroom (special needs, advanced, counsellor-referred), with its own program assignments | **Optional** | Required for differentiated instruction in school edition |
| `InstitutionReport` — an aggregate snapshot of student cohort progress: completion rates, average LifeState scores, mission completion, top careers explored — for principals, NGO managers, CSR officers | **Important** | Enterprise customers (schools, NGOs, CSR programs) will require this before signing. Adding post-launch requires aggregating from 111 tables with no report entity to anchor the design |

---

## Section 14 — Premium Edition Review

| Feature | Entity Support | Status | Gap |
|---------|---------------|--------|-----|
| **AI Mentor** | AIConversation (reserved), CharacterMemory (LLM context), VoiceProfile | ✅ Architecturally ready | — |
| **Voice Mentor** | AudioAsset, AudioPackage, VoiceProfile, VoiceInteraction | ✅ Complete | — |
| **Advanced Simulations** | ScenarioDifficulty: expert, LifeState 10 axes, ScenarioOutcomePath | ✅ Complete | — |
| **Premium Story Packs** | ContentItem.isPremium (flag) | ⚠️ Partial | No `ContentPack` entity — premium is per-item, not per-bundle |
| **Career Packs** | CareerRoadmap + CareerRoadmapStep | ⚠️ Partial | No `ContentPack` with type: career — career packs can't be sold as a unit |
| **Financial Packs** | FinancialConcept + finance scenarios | ⚠️ Partial | Same — no bundle entity |
| **Future Self Coaching** | FutureCharacter + CharacterMemory + ConversationSession(future_self) | ✅ Complete | — |
| **Family Features** | FamilyChallenge + FamilyChallengeParticipant + CoPilot + CoPilotPermission | ✅ Complete (deferred) | — |

### Missing Concepts (Section 14)

| Concept | Risk | Rationale |
|---------|------|-----------|
| `ContentPack` — a named, purchasable bundle of Scenarios + StoryArcs + Characters + Missions with isPremium flag, targetLanguage, ageGroup, and contentType (career / finance / leadership / culture) | **Important** | The unit of Premium monetisation. "Career Explorer Pack — Grade 9 — Hindi" is a product; individual ContentItem.isPremium flags are not. Without ContentPack, premium sales are item-by-item (low ARPU); with it, packs command higher prices |
| `AIConsentRecord` — explicit, versioned consent from the CoPilot (parent/guardian) for AI processing of a child's data | **Critical** | Distinct from VoiceConsent. DPDP Act 2023 requires separate consent for AI inference. Adding post-AI-launch is a legal retrofit |

---

## Section 15 — Top 20 Most Expensive Missing Things

### CRITICAL — Block if not addressed before launch

| # | Missing Concept | Type | Why Expensive Post-Launch |
|---|----------------|------|--------------------------|
| 1 | **`SyncQueue`** | Entity | Multi-device sync without this causes data loss. Post-launch, every offline write is at risk for multi-device pilots. Currently there is no entity to track unsynced local mutations | 
| 2 | **`ConsentRecord`** (DPDP/COPPA) | Entity | India's Digital Personal Data Protection Act 2023 requires verifiable parental consent for children's data processing. A `ConsentRecord` (pilotId, coPilotId, consentType, version, grantedAt, revokedAt) must exist before any data leaves the device. Adding post-launch means retroactively obtaining and storing consent for all existing users |
| 3 | **`VoiceConsent`** | Entity | Explicit parental consent for STT voice recording of a child. Required before VoiceInteraction (speakerType: player) is ever written. Must precede the Premium voice launch — cannot be retrofitted without re-obtaining consent from all users |
| 4 | **`ScenarioTemplate`** | Entity | The content authoring pipeline's foundation. Without templates, scaling to 500+ scenarios requires proportional human effort. Adding post-launch means retroactively normalising 200+ hand-crafted scenarios into a template structure — destructive migration risk |
| 5 | **`WorldLocation`** (reserved) | Domain | If locations are ever added to the game world, every Character, Scenario, StoryChapter, and DialogueNode needs a `locationId` FK. Retrofitting FKs on 111 tables in a live product is a multi-sprint migration |

### IMPORTANT — Address before School / Premium launch

| # | Missing Concept | Type | Why Expensive Post-Launch |
|---|----------------|------|--------------------------|
| 6 | **`ContentPack`** | Entity | Premium monetisation unit. Adding post-launch when individual items are already sold breaks pricing and entitlement logic |
| 7 | **`FuturePath`** | Entity | The branching life trajectory mechanic. Post-launch addition requires attribution from existing ScenarioChoice records — a data archaeology problem |
| 8 | **`InstitutionReport`** | Entity | Required by Enterprise customers before signing. Post-launch addition requires a full aggregation architecture design across 111 tables |
| 9 | **`Counsellor`** | Entity | NEP-mandated role distinct from Teacher. Post-launch addition requires retrofitting Program, Enrollment, and permission models |
| 10 | **`ContentLocalisationStatus`** | Entity | At 200+ scenarios × 10 languages = 2000+ tasks. Post-launch, tracking localisation without this entity requires external tools that diverge from the model |
| 11 | **`AIConsentRecord`** | Entity | Required before AI processing of any child's data. DPDP violation risk if AI features launch without it |
| 12 | **`PilotMemory`** | Entity | The pilot's personal memory scrapbook. If CharacterMemory (character→pilot) exists, symmetric PilotMemory (pilot→their own moments) creates a complete memory architecture. Adding post-launch is non-breaking but creates an asymmetric model |
| 13 | **`ContentPack`** (School edition) | Entity | School curriculum packs are a different product from consumer packs; both need ContentPack with edition scoping |
| 14 | **`DailyChallenge`** | Entity | Structured daily engagement requires an entity. Post-launch addition requires backfilling with content for all active users immediately |
| 15 | **`LocalisationTask`** | Entity | At scale, localisation management without a tracking entity requires external tooling that creates divergence between the domain model and the operational reality |

### OPTIONAL — Address in v1.1 post-launch sprint

| # | Missing Concept | Type | Why It Matters |
|---|----------------|------|----------------|
| 16 | `AuditLog` | Entity | Children's data access audit trail — DPDP compliance, low urgency at launch |
| 17 | `StudentGroup` | Entity | School differentiation — needed before advanced school programmes |
| 18 | `ClassroomChallenge` | Entity | Cooperative classroom mechanics — needed before School Edition cooperative features |
| 19 | `ScenarioTemplate` | Entity | Content authoring productivity — needed before content team scales beyond 5 authors |
| 20 | `MemoryCollection` | Entity | "My Scrapbook" engagement surface — needed if PilotMemory is built |

---

## Section 16 — Final Domain Freeze Decision

```
╔════════════════════════════════════════════════════════════════════╗
║                                                                    ║
║     LIFEPILOT DOMAIN MODEL v1.0                                    ║
║     MINOR GAPS IDENTIFIED                                          ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

### Rationale

The core model is architecturally complete and buildable. RP-001 Foundation Sprint should begin.

The identified gaps fall into four buckets:

**Bucket 1 — Legal / Compliance (add before STT and AI features launch)**

| Entity | Add When |
|--------|---------|
| `ConsentRecord` | Before any data leaves the device |
| `VoiceConsent` | Before STT is activated in Premium |
| `AIConsentRecord` | Before AI features are activated |

These do not block RP-001. They must exist before Premium or AI sprints begin.

**Bucket 2 — Operational (add before content scales beyond prototype)**

| Entity | Add When |
|--------|---------|
| `SyncQueue` | Before multi-device beta |
| `ScenarioTemplate` | Before content team exceeds 3 authors |
| `ContentLocalisationStatus` | Before second language is translated |
| `ContentPack` | Before Premium launch |
| `LocalisationTask` | Before second language team begins |

These do not block RP-001. They block the first commercial sprint.

**Bucket 3 — Product (add in v1.1 based on engagement data)**

| Entity | Add When |
|--------|---------|
| `PilotMemory` | When engagement data shows replay behaviour |
| `DailyChallenge` | When daily retention metric is below target |
| `FuturePath` | When branching narrative is on the roadmap |
| `WorldLocation` (reserved) | When world-map UX is confirmed on roadmap |
| `InstitutionReport` | Before first Enterprise contract |

**Bucket 4 — School Edition (add in School Sprint)**

| Entity | Add When |
|--------|---------|
| `Counsellor` | Before School Edition launch |
| `StudentGroup` | Before differentiated instruction features |
| `ClassroomChallenge` | Before cooperative school features |

### Freeze Status

| Phase | Status |
|-------|--------|
| RP-000A Core Domains | ✅ Frozen |
| RP-000B Growth Domains | ✅ Frozen |
| RP-000C Future Self Domains | ✅ Frozen |
| RP-000D Simulation Engine | ✅ Frozen |
| RP-000E Character Narrative Voice | ✅ Frozen |
| RP-000F Freeze Gap Closure | ✅ Frozen |
| **RP-001 Foundation Sprint** | **CLEARED TO BEGIN** |

---

## Section 17 — The Most Important Question

> *"Can this domain model support a story-driven life simulation game where a 13-year-old creates an avatar, builds relationships with characters, talks to Future Self, makes life choices, experiences consequences, learns financial literacy, explores careers, develops confidence, unlocks stories, builds memories, feels emotionally invested, and returns voluntarily because they want to know what happens next?"*

---

**YES. With complete, production-ready entity support for every element of this journey. Here is the evidence.**

---

### Creates an avatar

`Avatar` is a first-class entity with `avatarName`, `avatarStyle`, and `avatarImage`. It is created in onboarding — the first thing a pilot owns. `AvatarUnlock` adds cosmetic rewards through gameplay using a typed `AvatarUnlockType` enum (7 unlock types). Avatar progression is decoupled from payment — all unlocks in MVP come from gameplay. A pilot who has customised their avatar is more invested in their account's survival.

---

### Builds relationships with characters

`Character` offers 15 named system personalities across 14 CharacterRole values. `CharacterRelationship` tracks three independent dimensions simultaneously: `relationshipLevel` (closeness, 1–10), `trustLevel` (honesty depth, 1–10), and `engagementLevel` (session count). `CharacterRelationshipEvent` (8 RelationshipEventType values) records every event that moved the relationship — the pilot always knows *why* they grew or dropped. This is the difference between a game mechanic and an opaque system.

---

### Talks to Future Self

`FutureCharacter` is the pilot's own future self expressed as a playable `Character`. `ConversationSession` (type: future_self) opens a dedicated session. `CharacterMemory` (8 MemoryType values) feeds the opening line — *"Last time we spoke, you were worried about your exams. How did that go?"* — with provenance from `CharacterMemorySource` proving it came from a real `Reflection` or `PilotScenarioPlay`. This is not a generic chatbot. It is a character who remembers the pilot because the model records what to remember and why.

---

### Makes life choices

The model offers four distinct choice surfaces at different levels of commitment:

| Surface | Entity | Commitment Level |
|---------|--------|-----------------|
| Life simulation | ScenarioChoice | High — life consequences |
| Conversation | DialogueChoice | Medium — relationship consequences |
| Values alignment | LifeChoiceOption | Reflective — no direct consequence |
| Real life | DecisionRecord | Autobiographical |

None carry a "WRONG ANSWER" label. All feed forward into CharacterMemory, LifeState, and CharacterRelationship.

---

### Experiences consequences

`ChoiceConsequence` delivers two time horizons: `shortTermOutcome` (immediate feedback) and `longTermOutcome` (shown after reflection). `LifeStateTransition` writes a precise numeric delta to one of 10 `LifeState` dimensions. `ScenarioOutcomePath` names the emerging life trajectory. The pilot sees three things: what happened now, what will happen later, and the name of the path they are on. Consequences are concrete, personal, and deferred — the most powerful learning architecture in games.

---

### Learns financial literacy

`FinancialConcept` covers 8 types from earning through insurance. `FinancialLessonProgress` tracks completion and score. Finance-category `Scenario` entries wire `LifeState.financialConfidence` through `LifeStateTransition`. `Character` Priya (role: financial_advisor) appears in finance `StoryArc` chapters, delivers `DialogueNode` utterances with `DialogueEmotion`, and her `CharacterMemory` records what the pilot learned. `LifeStateSnapshot` charts financial confidence growth month over month. The parent sees it via `CoPilotPermission: view_financial_journey`.

---

### Explores careers

`Career` spans 10 `CareerCategory` values with associated `CareerSkill` requirements. `CareerExploration` records interest rating and notes per career. `Character` Dr Kavya (role: career_advisor) is unlocked via `NarrativeTrigger` (triggerType: career_discovered). `ConversationSession` (type: career_exploration) creates a structured mentoring conversation. `LifeState.careerAwareness` accumulates. `CareerRoadmap` + `CareerRoadmapStep` (Premium) provides the structured pathway.

---

### Develops confidence

`LifeState.decisionMaking` rises with every informed choice. `PilotStrength` tracks recognised strengths with evidence. `CharacterRelationship.trustLevel` with mentors grows as the pilot follows advice. `AchievementType: courage` fires when a hard scenario is attempted. `CharacterMemory` (memoryType: achievement) means Coach Arjun opens the next session with: *"Last time you chose the brave path. That took courage. I remember."* Confidence is accumulated evidence, not a score.

---

### Unlocks stories

`NarrativeTrigger` (7 TriggerType values) fires on scenario completion, mission completion, career discovery, life state threshold, goal creation, reflection, or choice selection. The target of every trigger can be a `StoryArc`, `StoryChapter`, `Character`, `DialogueNode`, or `FutureCharacter`. `ScenarioUnlock` links a specific choice in a scenario to a future scenario becoming available. Every action a pilot takes today can unlock a narrative tomorrow. The trigger engine is the curiosity machine.

---

### Builds memories

`CharacterMemory` gives every named character a private, typed, importance-ranked memory of the pilot (8 MemoryType values, getMostImportant() query). `CharacterMemorySource` anchors each memory to the exact event that created it. `TimelineEvent` (9 types) builds a chronological life arc. `ScenarioReflection.lessonLearned` and `LifeExperience.lessonsLearned` create a lesson archive. The model's one gap here is a `PilotMemory` entity (the pilot's own "my favourite moments" collection) — identified as Important and planned for v1.1.

---

### Feels emotionally invested

The emotional investment architecture has six independent dimensions:

| Dimension | Entity | How Investment Is Built |
|-----------|--------|------------------------|
| Visual identity | Avatar | "This is me" |
| Social bond | CharacterRelationship + CharacterMemory | "Future You remembers me" |
| Ownership of consequences | LifeState + ScenarioOutcomePath | "My choices shaped this life" |
| Curiosity | NarrativeTrigger + StoryChapter | "Something is waiting" |
| Recognition | AchievementType: courage/kindness | "The game sees who I am" |
| Future self | FutureCharacter + PurposeStatement | "I'm building toward something real" |

No single mechanic carries the weight of investment. All six work together. A child who has an avatar, a relationship with Future You, a named life path, two pending unlocks, a badge for courage, and a growing financial confidence score is invested six times over.

---

### Returns voluntarily because they want to know what happens next

Six independent pull mechanics create six simultaneous reasons to return tomorrow:

| Mechanic | Entity | What the Pilot Sees |
|---------|--------|---------------------|
| Story chapter | StoryChapter.sequenceNumber | "Chapter 5 of The Money Journey is ready" |
| Relationship milestone | CharacterRelationship level + CharacterRelationshipEvent | "Future You reached Trust Level 5. She has something to tell you." |
| Pending unlock | ScenarioUnlock + NarrativeTrigger | "Your choice unlocked The Investment Challenge" |
| Growth insight | LifeStateSnapshot delta | "Your resilience grew 12 points this month" |
| New character | NarrativeTrigger (career_discovered → Character) | "Coach Arjun heard you explored engineering. He wants to meet." |
| Memory | CharacterMemory + FutureCharacter | "Future You remembers your goal. She wants to check in." |

A child does not decide to return. The model creates pull — something is waiting, someone remembers them, a story is unfinished, a character is ready.

---

### Final Answer

**YES. Unconditionally.**

The LifePilot domain model v1.0 supports every element of this experience at the architecture level. The gaps identified in this review are real but none block the core promise:

> A 13-year-old opens LifePilot and does not feel like they are using a learning app. They feel like they are living in a game that knows them, remembers them, cares about their choices, and always has something waiting for them tomorrow.

Every sentence of that description has an entity, a relationship, and a typed service in the model.

---

## Output Summary

### Missing Entities (priority order)

| Priority | Entity | Section | Risk |
|---------|--------|---------|------|
| 1 | `ConsentRecord` | Legal | Critical |
| 2 | `VoiceConsent` | Section 8 | Critical |
| 3 | `SyncQueue` | Section 15 | Critical |
| 4 | `ScenarioTemplate` | Section 12 | Critical |
| 5 | `AIConsentRecord` | Section 14 | Critical |
| 6 | `ContentPack` | Section 4/14 | Important |
| 7 | `FuturePath` | Section 6 | Important |
| 8 | `InstitutionReport` | Section 13 | Important |
| 9 | `Counsellor` | Section 13 | Important |
| 10 | `ContentLocalisationStatus` | Section 12 | Important |
| 11 | `PilotMemory` | Section 10 | Important |
| 12 | `DailyChallenge` | Section 2 | Important |
| 13 | `LocalisationTask` | Section 12 | Important |
| 14 | `WorldLocation` (reserved) | Section 9 | Important (reserved) |
| 15 | `PilotInventoryItem` | Section 11 | Optional |
| 16 | `StudentGroup` | Section 13 | Optional |
| 17 | `ClassroomChallenge` | Section 3 | Optional |
| 18 | `MemoryCollection` | Section 10 | Optional |
| 19 | `AuditLog` | Section 15 | Optional |
| 20 | `StreakReward` | Section 2 | Optional |

### Missing Relationships

| Relationship | Between | Priority |
|-------------|---------|---------|
| `ConsentRecord` → Pilot + CoPilot | Legal compliance chain | Critical |
| `ScenarioTemplate` → Scenario | Authoring pipeline | Important |
| `ContentPack` → Scenario + StoryArc + Character | Premium bundle | Important |
| `FuturePath` → ScenarioChoice (attribution) | Branching futures | Important |
| `PilotMemory` → TimelineEvent / PilotScenarioPlay / Reflection | Memory scrapbook | Important |
| `Counsellor` → School + Program + Pilot | School edition | Important |
| `WorldLocation` → Character + Scenario + StoryChapter | World engine | Reserved |
| `DailyChallenge` → Scenario + Notification | Daily engagement | Important |

### Missing / Reserved Domains

| Domain | Status | When to Build |
|--------|--------|--------------|
| **Legal & Compliance** (ConsentRecord, VoiceConsent, AIConsentRecord, AuditLog) | ❌ Missing — Critical | Before Premium/AI launch |
| **World Engine** (WorldLocation, LocationCharacter, LocationScenario, PilotLocationVisit) | ⚠️ Reserved — Important | v1.1 when world-map UX confirmed |
| **Content Authoring** (ScenarioTemplate, DialogueTemplate, ContentPack, LocalisationTask) | ❌ Missing — Important | Before content team scales |
| **Memory Collection** (PilotMemory, MemoryCollection) | ⚠️ Reserved — Important | v1.1 post-engagement data |
| **Future Paths** (FuturePath, ScenarioReplayRequest) | ⚠️ Reserved — Important | v1.1 when branching narrative confirmed |  
| **School II** (Counsellor, StudentGroup, ClassroomChallenge, InstitutionReport) | ❌ Missing — Important | Before School Edition launch |

---

*Document status: Pre-freeze architecture review*
*Model baseline: v1.0 (111 entities · 42 enums · 7 schema versions)*
*Freeze decision: MINOR GAPS IDENTIFIED — RP-001 CLEARED TO BEGIN*
*Critical pre-launch additions: ConsentRecord · VoiceConsent · AIConsentRecord · SyncQueue · ScenarioTemplate*
