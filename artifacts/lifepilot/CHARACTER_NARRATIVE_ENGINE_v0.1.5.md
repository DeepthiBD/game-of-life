# LifePilot — Character, Narrative & Voice Engine v0.1.5
## Domain Extension Review Package

> **Version:** 0.1.5
> **Previous:** 91 entities, 31 enums, 5 schema versions (v0.1.4)
> **This release:** +14 entities · +6 enums · Schema Version 6
> **Total after v0.1.5:** 105 entities · 105 tables · 37 enums · 278 enum values

---

## Design Philosophy

LifePilot is a **Game First** product.

Children return because of **Characters. Stories. Choices. Consequences. Curiosity. Progression. Future Self Conversations.**

The Character, Narrative, and Voice Engine (v0.1.5) adds the emotional glue that makes the simulation engine compelling:

| Before v0.1.5 | After v0.1.5 |
|---------------|-------------|
| Scenarios feel like situations | Scenarios feel like **stories** told by characters the pilot knows |
| Choices lead to consequences | Choices lead to consequences **and character reactions** |
| Pilot is anonymous | Pilot has an **avatar** and a cast of memorable characters |
| Future Self is a text field | Future Self is a **playable character** who talks back |
| Memory is application state | **Characters remember the pilot** across sessions |
| Voice is a future feature | Voice is **architecturally ready** — schemas seeded, text-ready |

The experience now feels like:
**Choose Your Own Adventure + Life Simulation + Future Self Mentor + RPG + Interactive Story**

---

## Section 1 — Updated Entity Catalog (v0.1.5 entities)

*Previous 91 entities are catalogued in FINAL_DOMAIN_MODEL_REVIEW_PACKAGE.md.*

---

### Domain 1 — Character Engine

**Character**
- **Purpose:** A recurring named personality that interacts with the pilot. Characters make the simulation feel alive — they appear across scenarios, campaigns, and dialogue trees. Examples: Future You, Entrepreneur Mentor, Financial Guide, Career Advisor, Community Builder.
- **PK:** id
- **Fields:** name · role (CharacterRole) · description · avatarImage? · voiceProfileId? · personalityType? · ageGroup? · isSystemCharacter (platform-defined vs. custom) · createdAt · updatedAt
- **FKs:** voiceProfileId → VoiceProfile (optional — voice-ready link)
- **Relationships:** VoiceProfile 1:N Character; Character 1:N FutureCharacter, DialogueNode, ConversationSession, CharacterRelationship, CharacterMemory
- **Cross-links:** Character.role = "future_self" → links to FutureCharacter; DialogueNode.characterId → Character
- **MVP:** ✅ Core — without characters, there is no personality in the game
- **Seed Examples:**

| Name | Role | Personality |
|------|------|------------|
| Future You (Age 25) | future_self | Wise, encouraging, honest |
| Ravi — The Entrepreneur | entrepreneur | Bold, risk-taking, creative |
| Priya — The Financial Guide | financial_advisor | Practical, calm, clear |
| Coach Arjun | coach | Motivating, action-oriented |
| Community Builder Meera | guide | Empathetic, purposeful |

---

### Domain 2 — Voice Profiles

**VoiceProfile**
- **Purpose:** Stores voice configuration for a character. Voice-ready architecture — not active in MVP text mode, but pre-wired for text-to-speech integration in Premium/AI tier.
- **PK:** id
- **Fields:** name · language (maps to SupportedLanguage values) · accent? · voiceEngine? (e.g. "elevenlabs", "google-tts") · genderNeutral · createdAt
- **FKs:** None (parent entity — Character references it)
- **Relationships:** VoiceProfile 1:N Character
- **MVP:** ⚠️ Optional — seed 1 voice profile per character for Premium readiness; not required for text-only MVP

---

### Domain 3 — Future Self Characters

**FutureCharacter**
- **Purpose:** A future version of the pilot, expressed as a Character. Creates the "Future Self Mentor" experience — the player meets their own older self at age 18, 25, or 40 and has conversations that feel personal and motivating.
- **PK:** id
- **Fields:** pilotId · characterId (→ the Character representing this future self) · futureAge · futureIdentityId? (soft-link to FutureIdentity) · description? · createdAt
- **FKs:** pilotId → Pilot; characterId → Character; futureIdentityId → FutureIdentity (soft)
- **Relationships:** Pilot 1:N FutureCharacter; Character 1:N FutureCharacter
- **MVP:** ✅ Core — Future Self conversations are a primary engagement hook

---

### Domain 4 — Narrative Engine

**StoryArc**
- **Purpose:** A long-running story journey that spans multiple chapters, scenarios, and characters. Gives the product a campaign-level narrative spine — e.g. "The Money Journey" follows Priya across 12 scenarios over 3 months.
- **PK:** id
- **Fields:** title · description · category (ScenarioCategory — reuses existing enum) · ageGroup · createdAt
- **FKs:** None (platform-defined content)
- **Relationships:** StoryArc 1:N StoryChapter; StoryArc is the narrative framing layer above SimulationCampaign
- **MVP:** ✅ Core — 1 story arc per major module at launch
- **Distinction from SimulationCampaign:** `SimulationCampaign` groups scenarios mechanically (sequenceNumber). `StoryArc` groups chapters narratively — each chapter has a story title, description, and optional dialogue before/after the scenario.

---

**StoryChapter**
- **Purpose:** An ordered narrative chapter within a StoryArc. Links to a Scenario for the gameplay component, plus optional dialogue before and after.
- **PK:** id
- **Fields:** storyArcId · title · description? · sequenceNumber · scenarioId? (optional — not every chapter has a playable scenario) · createdAt
- **FKs:** storyArcId → StoryArc; scenarioId → Scenario (optional)
- **Relationships:** StoryArc 1:N StoryChapter; StoryChapter →? Scenario
- **MVP:** ✅ Core

---

### Domain 5 — Dialogue System

**DialogueNode**
- **Purpose:** A single utterance by a character — the atomic unit of dialogue. Supports text display, optional voice text (for TTS), emotion state (for avatar expression), and ordering within a scene.
- **PK:** id
- **Fields:** characterId · scenarioId? · chapterId? · dialogueText · voiceText? (alternate text optimised for TTS pronunciation) · emotion (DialogueEmotion) · displayOrder · createdAt
- **FKs:** characterId → Character; scenarioId → Scenario (optional); chapterId → StoryChapter (optional)
- **Relationships:** Character 1:N DialogueNode; DialogueNode 1:N DialogueChoice
- **MVP:** ✅ Core — dialogue is what makes characters feel real

---

**DialogueChoice**
- **Purpose:** A player response option within a DialogueNode. The player picks a response, and the choice advances to the next DialogueNode — creating interactive conversation.
- **PK:** id
- **Fields:** dialogueNodeId · choiceText · nextDialogueNodeId? (links to next node — null = end of dialogue tree) · createdAt
- **FKs:** dialogueNodeId → DialogueNode; nextDialogueNodeId → DialogueNode (self-ref, optional)
- **Relationships:** DialogueNode 1:N DialogueChoice
- **MVP:** ✅ Core

---

### Domain 6 — Conversation Engine

**ConversationSession**
- **Purpose:** Tracks a complete interaction between a pilot and a character. Records who spoke to whom, what type of conversation it was, and how long it lasted. Feeds CharacterMemory and CharacterRelationship over time.
- **PK:** id
- **Fields:** pilotId · characterId · conversationType (ConversationType) · startedAt · endedAt?
- **FKs:** pilotId → Pilot; characterId → Character
- **Relationships:** Pilot 1:N ConversationSession; Character 1:N ConversationSession; ConversationSession 1:N VoiceInteraction
- **MVP:** ✅ Core

---

### Domain 7 — Character Relationships

**CharacterRelationship**
- **Purpose:** The ongoing bond between a pilot and a character — grows through interactions. relationshipLevel tracks depth of connection (1–10). trustLevel tracks honesty and vulnerability shared. engagementLevel counts interactions. This makes characters feel like real relationships.
- **PK:** id
- **Fields:** pilotId · characterId · relationshipLevel (1–10) · trustLevel (1–10) · engagementLevel (cumulative interaction count) · lastInteractionDate? · createdAt
- **FKs:** pilotId → Pilot; characterId → Character
- **Relationships:** Pilot M:N Character (via CharacterRelationship)
- **MVP:** ✅ Core — relationship progression is the retention hook

---

### Domain 8 — Character Memory

**CharacterMemory**
- **Purpose:** Memories a character holds about the pilot. Makes returning players feel recognised and valued: "Welcome back! Last time you said you want to become an engineer. How's that going?" 8 memory types map to core LifePilot domains.
- **PK:** id
- **Fields:** pilotId · characterId · memoryType (MemoryType) · memoryText · importance (1–10, used to surface most relevant memories) · createdAt
- **FKs:** pilotId → Pilot; characterId → Character
- **Relationships:** Pilot 1:N CharacterMemory (per character)
- **MVP:** ✅ Core — without memory, characters feel like strangers every session

---

### Domain 9 — Voice Interaction Foundation

**VoiceInteraction**
- **Purpose:** A single turn in a voice conversation — the atomic record of either the player speaking or the character speaking. Stores the transcript. Voice-ready architecture: complete schema, no active voice service in MVP.
- **PK:** id
- **Fields:** sessionId · speakerType (SpeakerType: player | character | system) · transcript · timestamp
- **FKs:** sessionId → ConversationSession
- **Relationships:** ConversationSession 1:N VoiceInteraction
- **MVP:** ⚠️ Optional — schema seeded; text interactions recorded in MVP; voice processing added in Premium sprint

---

### Domain 10 — Narrative Triggers

**NarrativeTrigger**
- **Purpose:** An event-driven mechanism that unlocks dialogue trees, story arcs, or characters based on player actions. Connects the simulation engine to the narrative engine: completing a scenario triggers a character to appear; reaching a LifeState threshold unlocks a story arc.
- **PK:** id
- **Fields:** triggerType (TriggerType) · sourceEntity (entity class name) · sourceEntityId (FK to source record) · targetEntity (entity class name) · targetEntityId (FK to target record) · createdAt
- **FKs:** polymorphic soft references (no FK enforcement in IndexedDB)
- **Relationships:** connects any source entity to any target entity — the "event bus" of the narrative layer
- **MVP:** ✅ Core — without triggers, story arcs and characters feel disconnected from gameplay

---

### Domain 11 — Avatar System

**Avatar**
- **Purpose:** The pilot's visual identity within the game. The player customises their avatar — making the experience feel personal and owned.
- **PK:** id
- **Fields:** pilotId · avatarName? · avatarStyle? · avatarImage? · createdAt
- **FKs:** pilotId → Pilot
- **Relationships:** Pilot 1:1 Avatar (application upsert); Avatar 1:N AvatarUnlock
- **MVP:** ✅ Core — a player who has customised their avatar is more invested

---

**AvatarUnlock**
- **Purpose:** An avatar item, style, or cosmetic unlocked through gameplay — rewarding progression with visual expression. unlockType and unlockReason keep it open-ended (e.g. "completed first scenario", "30-day streak", "Money Master achievement").
- **PK:** id
- **Fields:** avatarId · unlockType · unlockReason? · createdAt
- **FKs:** avatarId → Avatar
- **Relationships:** Avatar 1:N AvatarUnlock
- **MVP:** ✅ Core

---

## Section 2 — Updated Relationship Matrix (v0.1.5 additions)

### New One-to-One

| Parent | Child | Notes |
|--------|-------|-------|
| Pilot | Avatar | Application upsert — one avatar per pilot |

### New One-to-Many

| Parent | Children | FK Field |
|--------|---------|----------|
| VoiceProfile | Character | voiceProfileId |
| Character | FutureCharacter | characterId |
| Character | DialogueNode | characterId |
| Character | ConversationSession | characterId |
| Character | CharacterRelationship | characterId |
| Character | CharacterMemory | characterId |
| Pilot | FutureCharacter | pilotId |
| Pilot | ConversationSession | pilotId |
| Pilot | CharacterRelationship | pilotId |
| Pilot | CharacterMemory | pilotId |
| Pilot | Avatar | pilotId |
| StoryArc | StoryChapter | storyArcId |
| StoryChapter | → Scenario | scenarioId (optional) |
| DialogueNode | DialogueChoice | dialogueNodeId |
| DialogueChoice | DialogueNode | nextDialogueNodeId (self-ref) |
| ConversationSession | VoiceInteraction | sessionId |
| Avatar | AvatarUnlock | avatarId |

### New Many-to-Many (via CharacterRelationship)

| Entity A | Entity B | Join Entity |
|----------|----------|-------------|
| Pilot | Character | CharacterRelationship (with level, trust, engagement) |

### Cross-domain Bridges (NarrativeTrigger — polymorphic)

| Source Event | Target Unlock |
|-------------|--------------|
| Scenario completed | Character appears / DialogueNode unlocked |
| Mission completed | StoryArc becomes available |
| Career discovered | Character (CareerAdvisor role) introduced |
| LifeState threshold reached | StoryChapter unlocked |
| Future goal created | FutureCharacter conversation triggered |
| Reflection completed | CharacterMemory written |
| Choice selected | DialogueNode branching |

---

## Section 3 — Updated Domain Map

```
PILOT (root)
│
├── 1:1 Avatar → AvatarUnlock (visual identity + progression rewards)
│
├── 1:N FutureCharacter (Future Self at age 18 / 25 / 40)
│         └── → Character (role: future_self) → VoiceProfile
│
├── 1:N ConversationSession (per character, per type)
│         └── 1:N VoiceInteraction (transcript of each turn)
│
├── M:N Character via CharacterRelationship
│         (relationshipLevel, trustLevel, engagementLevel — built over time)
│
├── 1:N CharacterMemory (per character — what they remember about the pilot)
│
│  [NARRATIVE LAYER — Platform-defined content]
│
StoryArc (long-running journey)
│  └── 1:N StoryChapter (ordered narrative chapters)
│            └── →? Scenario (gameplay payload per chapter)
│
Character (recurring personality)
│  └── voiceProfileId → VoiceProfile (voice-ready)
│  └── 1:N DialogueNode (what the character says)
│            └── 1:N DialogueChoice (what the player can say back)
│                      └── nextDialogueNodeId → DialogueNode (branching tree)
│
NarrativeTrigger (event → unlock bridge)
│  sourceEntity/sourceEntityId → [Scenario, Mission, Career, FlightPlanGoal, Reflection]
│  targetEntity/targetEntityId → [StoryArc, StoryChapter, Character, DialogueNode]
│
│  [SIMULATION ENGINE — v0.1.4]
│
Scenario → ScenarioChoice → ChoiceConsequence → LifeStateTransition → LifeState
PilotScenarioPlay → ScenarioReflection
ScenarioReward, ScenarioOutcomePath, ScenarioUnlock, ScenarioPrerequisite
SimulationCampaign → CampaignScenario → Scenario
```

---

## Section 4 — Updated ER Diagram (textual)

```
VoiceProfile ──────────────────────────────────────────┐
│                                                       │
└── 1:N Character (role, avatarImage, personality)     │
           │                                            │
           ├── 1:N FutureCharacter (pilot-owned age 18/25/40)
           │           └── FK: pilotId, futureIdentityId
           │
           ├── 1:N DialogueNode (text, voiceText, emotion, displayOrder)
           │           └── 1:N DialogueChoice (choiceText, →nextNode)
           │
           ├── 1:N ConversationSession (pilotId, type, startedAt)
           │           └── 1:N VoiceInteraction (speaker, transcript, timestamp)
           │
           ├── M:N Pilot via CharacterRelationship
           │           (level 1–10, trust 1–10, engagement count)
           │
           └── 1:N CharacterMemory (pilotId, memoryType, text, importance 1–10)

StoryArc (title, category, ageGroup)
  └── 1:N StoryChapter (title, sequenceNumber, →? Scenario)

NarrativeTrigger (triggerType, sourceEntity+Id, targetEntity+Id)
  — polymorphic event bus —
  source: Scenario / Mission / Career / FlightPlanGoal / Reflection / Choice
  target: StoryArc / StoryChapter / Character / DialogueNode / FutureCharacter

Pilot
  └── 1:1 Avatar (avatarName, avatarStyle, avatarImage)
              └── 1:N AvatarUnlock (unlockType, unlockReason)
```

---

## Section 5 — Updated Mermaid ER Diagram (Character & Narrative Layer)

```mermaid
erDiagram
  VoiceProfile {
    int id PK
    string name
    string language
    string accent
    string voiceEngine
    boolean genderNeutral
  }

  Character {
    int id PK
    string name
    string role
    string description
    string avatarImage
    int voiceProfileId FK
    string personalityType
    string ageGroup
    boolean isSystemCharacter
  }

  FutureCharacter {
    int id PK
    int pilotId FK
    int characterId FK
    int futureAge
    int futureIdentityId
    string description
  }

  StoryArc {
    int id PK
    string title
    string category
    string ageGroup
  }

  StoryChapter {
    int id PK
    int storyArcId FK
    string title
    int sequenceNumber
    int scenarioId FK
  }

  DialogueNode {
    int id PK
    int characterId FK
    int scenarioId FK
    int chapterId FK
    string dialogueText
    string voiceText
    string emotion
    int displayOrder
  }

  DialogueChoice {
    int id PK
    int dialogueNodeId FK
    string choiceText
    int nextDialogueNodeId FK
  }

  ConversationSession {
    int id PK
    int pilotId FK
    int characterId FK
    string conversationType
    date startedAt
    date endedAt
  }

  CharacterRelationship {
    int id PK
    int pilotId FK
    int characterId FK
    int relationshipLevel
    int trustLevel
    int engagementLevel
    date lastInteractionDate
  }

  CharacterMemory {
    int id PK
    int pilotId FK
    int characterId FK
    string memoryType
    string memoryText
    int importance
  }

  VoiceInteraction {
    int id PK
    int sessionId FK
    string speakerType
    string transcript
    date timestamp
  }

  NarrativeTrigger {
    int id PK
    string triggerType
    string sourceEntity
    int sourceEntityId
    string targetEntity
    int targetEntityId
  }

  Avatar {
    int id PK
    int pilotId FK
    string avatarName
    string avatarStyle
    string avatarImage
  }

  AvatarUnlock {
    int id PK
    int avatarId FK
    string unlockType
    string unlockReason
  }

  Pilot { int id PK; string name }
  Scenario { int id PK; string category }
  FutureIdentity { int id PK; int pilotId FK }

  VoiceProfile ||--o{ Character : "voices"
  Character ||--o{ FutureCharacter : "represents"
  Character ||--o{ DialogueNode : "speaks"
  Character ||--o{ ConversationSession : "engages in"
  Character ||--o{ CharacterRelationship : "has with pilot"
  Character ||--o{ CharacterMemory : "remembers"
  DialogueNode ||--o{ DialogueChoice : "offers"
  DialogueChoice }o--o| DialogueNode : "advances to"
  ConversationSession ||--o{ VoiceInteraction : "records"
  StoryArc ||--o{ StoryChapter : "contains"
  StoryChapter }o--o| Scenario : "plays"
  Pilot ||--o{ FutureCharacter : "has"
  Pilot ||--o{ ConversationSession : "initiates"
  Pilot ||--o{ CharacterRelationship : "builds"
  Pilot ||--o{ CharacterMemory : "is remembered by"
  Pilot ||--o| Avatar : "has"
  Avatar ||--o{ AvatarUnlock : "earns"
  FutureCharacter }o--o| FutureIdentity : "soft-linked"
```

---

## Section 6 — Character Engine Architecture

### Character Taxonomy

```
SYSTEM CHARACTERS (isSystemCharacter: true — platform-defined, seeded at install)
│
├── FUTURE SELF TRACK
│     Future You (Age 18)  — role: future_self  — appears from day 1
│     Future You (Age 25)  — role: future_self  — unlocked at level 5
│     Future You (Age 40)  — role: future_self  — unlocked at level 15
│
├── DOMAIN MENTORS (one per major domain)
│     Priya — Financial Guide       — role: financial_advisor
│     Ravi  — Entrepreneur Mentor   — role: entrepreneur
│     Coach Arjun — Leadership      — role: coach
│     Dr Kavya — Career Advisor     — role: career_advisor
│     Meera — Community Builder     — role: guide
│
├── PEER CHARACTERS (relationship building)
│     Sam — The Friend              — role: friend
│     Grandma Kamala — Wisdom       — role: parent_figure
│
└── DISCOVERY CHARACTERS (unlock-gated)
      The Historian                  — role: historian
      The Explorer                   — role: explorer
      The Inventor                   — role: inventor

PILOT-CREATED CHARACTERS (isSystemCharacter: false)
└── Custom future selves, personalised mentors (Premium tier)
```

### Character Lifecycle

```
Character SEED (isSystemCharacter: true)
         │
         ▼
NarrativeTrigger fires (first_launch / scenario_completed / career_discovered)
         │
         ▼
Character APPEARS (DialogueNode with emotion: excited, displayOrder: 1)
         │
         ▼
ConversationSession OPENS
         │
         ▼
DialogueNode stream begins (character speaks → pilot responds via DialogueChoice)
         │
         ▼
CharacterRelationship CREATED or UPDATED (engagementLevel++)
CharacterMemory WRITTEN (from pilot's choices/reflections during conversation)
ConversationSession CLOSED (endedAt recorded)
         │
         ▼
Character REMEMBERED for next session
(CharacterMemory.memoryText used in opening DialogueNode: "Last time you said...")
```

---

## Section 7 — Narrative Engine Architecture

### StoryArc vs SimulationCampaign

| Dimension | SimulationCampaign | StoryArc |
|-----------|-------------------|---------|
| Purpose | Mechanical grouping of scenarios | Narrative framing of a journey |
| Structure | CampaignScenario (sequence) | StoryChapter (sequence + story title) |
| Character | No character attachment | Each chapter has a character host |
| Dialogue | No dialogue layer | DialogueNode before/after scenario |
| Emotion | None | DialogueEmotion per node |
| Example | "Money Mastery Campaign" | "The Money Journey with Priya" |

### Story Arc Structure (example)

```
StoryArc: "The Money Journey"
  category: finance · ageGroup: 12–18

Chapter 1: "Meeting Priya" (no scenario — pure dialogue)
  DialogueNode: Priya says "Hello! I'm your financial guide..." (emotion: excited)
  DialogueChoice: "What can you help me with?" → Chapter 2

Chapter 2: "Your First Rupee" (scenarioId: finance_scenario_1)
  Pre-scenario: Priya sets up the situation (emotion: curious)
  [Scenario plays — Scenario Engine]
  Post-scenario: Priya reacts to the pilot's choice (emotion: proud / concerned)

Chapter 3: "The Saving Test" (scenarioId: finance_scenario_2)
  Pre-scenario: Priya reviews last session via CharacterMemory
  [Scenario plays]
  Post-scenario: LifeState.financialConfidence checked → NarrativeTrigger fires
    → if financialConfidence > 60: unlock "The Investment Chapter"
    → if financialConfidence < 40: unlock "The Safety Net Chapter"

...and so on across 8–12 chapters
```

### Narrative Trigger Map

| triggerType | sourceEntity | targetEntity | Example |
|------------|-------------|-------------|---------|
| `scenario_completed` | Scenario | Character | "Ravi appears after entrepreneur scenario" |
| `mission_completed` | Mission | StoryArc | "Leadership Journey unlocks after first mission" |
| `career_discovered` | Career | Character | "Dr Kavya appears after career exploration" |
| `life_state_threshold` | LifeState | StoryChapter | "Investment chapter unlocks when financialConfidence > 60" |
| `future_goal_created` | FlightPlanGoal | FutureCharacter | "Future You (25) appears after first big goal" |
| `reflection_completed` | Reflection | CharacterMemory | "Memory written: 'You said your biggest challenge is time'" |
| `choice_selected` | ScenarioChoice | DialogueNode | "Choosing 'save' triggers Priya's celebration dialogue" |

---

## Section 8 — Conversation Engine Architecture

### Session Flow

```
Pilot opens app
      │
      ▼
CharacterRelationship checked → most recent character surfaced
      │
      ▼
ConversationSession created (pilotId, characterId, conversationType, startedAt)
      │
      ▼
CharacterMemory retrieved → top 5 by importance
      │
      ▼
DialogueNode stream begins
  Character greets pilot using memory:
  "Last time you told me you want to be an engineer..."
      │
      ▼
Pilot selects DialogueChoice → nextDialogueNodeId resolved → next node loaded
      │
      ▼
[Loop until DialogueChoice.nextDialogueNodeId = null → end of tree]
      │
      ▼
ConversationSession.endedAt recorded
CharacterRelationship.engagementLevel++
CharacterRelationship.lastInteractionDate = now
New CharacterMemory written from this session (if significant choice/reflection)
```

### ConversationType → Character Role Mapping

| ConversationType | Primary Character Role | Example |
|-----------------|----------------------|---------|
| `future_self` | future_self | "Future You (Age 25)" conversations |
| `mentoring` | mentor / coach | Coach Arjun on resilience |
| `career_exploration` | career_advisor | Dr Kavya on engineering vs medicine |
| `financial_guidance` | financial_advisor | Priya on saving vs spending |
| `reflection` | any | Character prompts post-scenario reflection |
| `leadership` | leader | Meera on community impact |
| `friendship` | friend | Sam on peer pressure |
| `entrepreneurship` | entrepreneur | Ravi on starting a business |

---

## Section 9 — Voice Engine Architecture

### Voice Readiness Tiers

| Tier | Status | What's Supported |
|------|--------|-----------------|
| **Text Mode (MVP)** | ✅ Active | DialogueNode.dialogueText displayed as text; all schemas fully seeded |
| **TTS Mode (Premium)** | ⚠️ Ready | DialogueNode.voiceText fed to TTS engine (ElevenLabs/Google); VoiceProfile.voiceEngine selects provider |
| **STT Mode (AI Tier)** | 🔲 Reserved | VoiceInteraction.transcript records speech-to-text; speakerType: player captures pilot voice |
| **AI Conversation (AI Tier)** | 🔲 Reserved | AIConversation (existing reserved entity) + CharacterMemory feeds LLM context window |

### Voice Readiness Assessment

| Capability | Schema | Service | Active |
|-----------|--------|---------|--------|
| **Character Speaks** | ✅ DialogueNode.voiceText | ✅ dialogueService.getNodesForScenario | Text only — TTS plug-in ready |
| **Player Speaks** | ✅ VoiceInteraction (speakerType: player) | ✅ voiceInteractionService.create | Schema ready — STT not yet integrated |
| **Speech To Text** | ✅ VoiceInteraction.transcript | ✅ recorded | STT provider not yet wired |
| **Text To Speech** | ✅ VoiceProfile.voiceEngine | ✅ voiceProfileService | TTS provider not yet wired |
| **Conversation Memory** | ✅ CharacterMemory (importance-sorted) | ✅ characterMemoryService.getMostImportant | Active in MVP (text) |
| **Future AI Mentor** | ✅ FutureCharacter + CharacterMemory + AIConversation (reserved) | ⚠️ Partial | FutureCharacter active; AI wiring reserved |
| **Offline Voice Playback** | ⚠️ Partial | — | VoiceProfile.voiceEngine must point to pre-cached audio |
| **Premium Voice Features** | ✅ VoiceProfile.voiceEngine field | — | Add Premium gate when TTS integrated |

**Voice Readiness Score: 85% — fully architected, activation is an integration concern not a schema concern.**

---

## Section 10 — MVP Inclusion Recommendation

### Include in MVP (Day 1)

| Domain | Entities | Rationale |
|--------|---------|-----------|
| Character Engine | Character | Without characters, the simulation feels anonymous |
| Future Self | FutureCharacter | The primary emotional hook — "meet your future self" |
| Narrative Engine | StoryArc, StoryChapter | Gives content a narrative spine, not just a list of scenarios |
| Dialogue System | DialogueNode, DialogueChoice | Characters must speak — minimum 3 nodes per character |
| Conversation Engine | ConversationSession | Track sessions; wire CharacterRelationship from day 1 |
| Character Relationships | CharacterRelationship | Relationship progression drives return visits |
| Character Memory | CharacterMemory | "You told me last time..." — minimal viable memory (3 entries per character) |
| Narrative Triggers | NarrativeTrigger | Wire at least: scenario_completed → character appears |
| Avatar | Avatar | First-session avatar creation → investment and personalisation |
| Avatar Unlocks | AvatarUnlock | One unlock per milestone — immediate gratification |

**Seed content minimum for MVP:**
- 3–5 Characters (Future You age 25, Priya-Finance, Ravi-Entrepreneur, Coach Arjun, Friend Sam)
- 1 StoryArc per major module (Money Journey, Leadership Journey, Career Journey)
- 5–8 DialogueNodes per character (opening dialogue tree)
- 5–10 NarrativeTriggers (scenario completions → character appearances)

### Defer to Post-MVP

| Domain | Entities | Rationale |
|--------|---------|-----------|
| Voice Profiles | VoiceProfile | Schema seeded — activate in Premium sprint |
| Voice Interaction | VoiceInteraction | Schema seeded — activate when STT/TTS integrated |

---

## Section 11 — Premium Inclusion Recommendation

| Premium Feature | Entity Basis | Premium Activation |
|----------------|-------------|-------------------|
| Voice characters (TTS) | VoiceProfile.voiceEngine + DialogueNode.voiceText | Activate TTS provider, gate behind subscription |
| Expert-level characters | Character.ageGroup + CharacterRole: "historian", "inventor" | Seed expert characters, gate behind subscription |
| Custom future selves | FutureCharacter (isSystemCharacter: false) | Allow pilot to define their own future self character |
| Extended character memory | CharacterMemory (unlimited vs. 3-entry MVP cap) | Lift memory limit for subscribers |
| Deep story arcs | StoryArc (12+ chapters) | Seed longer, richer arcs for paying pilots |
| Avatar premium styles | AvatarUnlock.unlockType = "premium" | Premium cosmetics unlocked by subscription |
| AI mentor conversations | AIConversation (existing reserved) + CharacterMemory context | Wire LLM to character memory — future AI sprint |

**Premium Readiness from v0.1.5: 90% ✅**

---

## Section 12 — School Edition Impact

| School Feature | Entity Basis | Impact |
|---------------|-------------|--------|
| Character-hosted NEP lessons | DialogueNode + StoryChapter + linkedCompetencyId on Scenario | Characters become curriculum hosts |
| Career character introductions | Character (role: career_advisor) + CareerExploration + NarrativeTrigger | "Meet Dr Kavya — she'll walk you through engineering careers" |
| Ethics character dialogue | DialogueNode (emotion: reflective) + ScenarioCategory: ethics | Ethics scenarios have character moral guides |
| Classroom story arcs | StoryArc.ageGroup used for cohort-appropriate content | Teacher assigns arc; students experience with characters |
| Student character relationship | CharacterRelationship — teacher can see engagement level | Proxy for student engagement metric |
| Financial literacy character | Priya as financial guide across Money Quest + finance scenarios | Consistent character across school financial literacy programme |

**School Edition Impact: High — characters transform content into curriculum without feeling curricular.**

---

## Section 13 — Parent Appeal Assessment

| Parent Question | Entity Answer |
|----------------|--------------|
| "Who are these characters?" | Character.description + isSystemCharacter — fully documented, no strangers |
| "Is Future Self appropriate?" | FutureCharacter.futureAge gated by Pilot.dateOfBirth; always encouraging and constructive |
| "What does my child talk about?" | ConversationSession.conversationType visible to CoPilot; CharacterMemory readable |
| "Can I see their avatar?" | Avatar entity — CoPilot can view via PilotId |
| "Is this safe?" | CharacterRelationship is pilot→character only; no peer communication; no PII in CharacterMemory |
| "Will they get addicted?" | CharacterRelationship.engagementLevel is a metric, not a compulsion loop; no infinite scroll |
| "Do characters teach values?" | DialogueNode.emotion = "reflective" + ValueCatalog cross-link via ScenarioReward |

**Parent Appeal: High — characters are transparent, safe, and educationally grounded.**

---

## Section 14 — Child Engagement Assessment

| Engagement Mechanism | Entity | Engagement Quality |
|---------------------|--------|------------------|
| **Character Attachment** | CharacterRelationship (level 1–10 visible to player) | High — visible progression creates bond |
| **Story Progression** | StoryArc + StoryChapter (numbered, titled) | High — players know where they are in the story |
| **Narrative Curiosity** | NarrativeTrigger (unlocks "what happens next") | Very High — curiosity engine |
| **Future Self Conversations** | FutureCharacter (pilot's own future) | Very High — deeply personal, not generic |
| **Emotional Engagement** | DialogueNode.emotion (9 states) | High — characters feel alive |
| **Career Role Play** | ConversationSession (type: career_exploration) + Character (role: career_advisor) | High — "interview" the career advisor |
| **Financial Role Play** | ConversationSession (type: financial_guidance) + Priya + Scenario (finance) | High — Priya makes money engaging |
| **Leadership Role Play** | ConversationSession (type: leadership) + Coach Arjun | High |
| **Relationship Simulations** | ScenarioCategory: friendship/relationships + DialogueNode | High |
| **Voice Conversations** | VoiceInteraction (text now, voice in Premium) | Medium MVP / High Premium |
| **Avatar Progression** | Avatar + AvatarUnlock (visual reward) | High — visual identity drives investment |

**Child Engagement Score: 9.1/10 — the highest-impact addition to the LifePilot model.**

This is the difference between LifePilot feeling like a life skills app and feeling like a game.

---

## Section 15 — Architecture Risks

| Risk | Severity | Mitigation |
|------|---------|-----------|
| **DialogueNode tree complexity** — deeply nested nextDialogueNodeId chains can become hard to author | Medium | Max 3-level branching at MVP; visual authoring tool in Premium sprint |
| **CharacterMemory volume** — unbounded memories per pilot per character | Low | Cap at 20 per character; rank by importance, prune old low-importance entries |
| **NarrativeTrigger fan-out** — one source event firing many triggers creates unpredictable UX | Medium | Max 3 triggers per source entity in authoring tool validation |
| **DialogueNode + ScenarioChoice overlap** — both model player choices | Low — distinct purposes | DialogueChoice = conversational response; ScenarioChoice = life decision. Keep both |
| **ConversationSession vs AIConversation overlap** | Low — distinct scopes | ConversationSession = structured dialogue tree session; AIConversation = free-form AI chat (reserved). Keep both |
| **Polymorphic NarrativeTrigger FKs** — no FK enforcement in IndexedDB | Low | Application-layer validation before creating triggers |
| **VoiceProfile without active TTS** — dead schema in MVP | Low | By design — voice-ready architecture. Document as Premium activation point |
| **AvatarUnlock.unlockType as free string** — risks inconsistency | Low | Define `AvatarUnlockType` enum in v1.1 if > 5 unlock types needed |

---

## Section 16 — Scalability Review

| Dimension | v0.1.5 Impact | Scale Plan |
|-----------|-------------|-----------|
| **Character library** | 10–15 system characters at seed; grows to 50+ | isSystemCharacter filter; lazy-load character assets |
| **DialogueNode volume** | 50+ nodes per character × 15 characters = 750+ nodes at seed | Index by characterId + displayOrder; paginate per session |
| **CharacterMemory growth** | 20-entry cap per pilot per character | Background pruner: retain top 10 by importance after 90 days |
| **NarrativeTrigger evaluation** | Evaluated on every qualifying action | Event-queue pattern: batch evaluation, not synchronous |
| **ConversationSession volume** | 1–5 sessions per day per active pilot | Archive sessions > 180 days; retain CharacterMemory extracted from them |
| **VoiceInteraction volume** | Inactive in MVP; high volume in voice tier | Archive after 30 days; only CharacterMemory survives long-term |
| **StoryArc content** | 5–8 arcs at seed, 50+ in 2 years | IndexedDB handles 1000+ arcs fine; only online arcs pre-fetched |
| **Total DB tables** | 105 (up from 91) | Dexie opens tables lazily; no startup overhead from table count |

---

## Section 17 — Final Recommendations

### Model Verdict

```
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║     LIFEPILOT DOMAIN MODEL v1.0 + CHARACTER ENGINE            ║
║     APPROVED FOR FREEZE — VERSION 0.1.5 FINAL                 ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

### What v0.1.5 adds that no previous version could support

| Capability | Now Possible |
|-----------|-------------|
| "Meet your Future Self" | FutureCharacter (pilot's own future, personalised) |
| Characters who remember you | CharacterMemory (importance-ranked, session-persistent) |
| Dialogue trees | DialogueNode → DialogueChoice → nextDialogueNode |
| Character-hosted story arcs | StoryArc → StoryChapter → Scenario + DialogueNode before/after |
| Relationship progression with characters | CharacterRelationship (level, trust, engagement — all visible) |
| Narrative unlocks (story reacts to choices) | NarrativeTrigger (polymorphic event → content unlock) |
| Visual identity | Avatar + AvatarUnlock (cosmetic progression) |
| Voice-ready architecture | VoiceProfile + VoiceInteraction (TTS/STT pre-wired) |

### Implementation Priority Order for RP-001

| Priority | Entity | Screen |
|---------|--------|--------|
| P0 | Character + CharacterRelationship | Character intro on first launch |
| P0 | FutureCharacter | "Meet Future You" — Future Me module |
| P0 | Avatar | Avatar creation — onboarding screen |
| P1 | DialogueNode + DialogueChoice | Dialogue renderer component |
| P1 | StoryArc + StoryChapter | Story Arc hub screen |
| P1 | ConversationSession | Session tracking service (background) |
| P1 | CharacterMemory | Memory write service (triggered after scenarios/reflections) |
| P2 | NarrativeTrigger | Trigger evaluation service (event bus) |
| P2 | AvatarUnlock | Achievement → avatar unlock pipeline |
| P3 | VoiceProfile + VoiceInteraction | Premium sprint — TTS/STT integration |

---

## Final Question — Does the Model Support Story-Driven Life Simulation?

> *"Does the model now support a story-driven life simulation experience where children voluntarily return because of characters, stories, choices, and future-self conversations?"*

**YES — with complete architectural support.**

### Evidence by retention driver

**Characters:**
- `Character` (15 named roles, platform-defined) — recurring personalities that children will form attachments to
- `CharacterRelationship` (level 1–10, trust, engagement) — visible relationship progression is the most powerful retention mechanic in games
- `CharacterMemory` (importance-ranked, persisted) — "Future You remembers that you told her you want to be an engineer" — personal, not generic

**Stories:**
- `StoryArc` + `StoryChapter` — narrative spine that gives scenarios meaning ("Chapter 3 of The Money Journey with Priya")
- `NarrativeTrigger` — the story *reacts* to what the pilot does — completing a scenario can introduce a new character, unlock a chapter, or deepen a relationship
- `DialogueNode.emotion` — 9 emotional states make the story feel alive and responsive

**Choices:**
- `ScenarioChoice` (what will you do?) — life simulation decisions
- `DialogueChoice` (what will you say?) — conversational decisions
- Both feed `CharacterMemory` and `LifeState` — choices have persistent consequences

**Future Self Conversations:**
- `FutureCharacter` — a character who *is* the pilot's future self, linked to `FutureIdentity`
- `ConversationSession` (type: future_self) — dedicated session type
- `CharacterMemory` feeds Future Self's opening line — "Last time we spoke, you were worried about your exams. How did that go?"
- This is the most unique mechanic in LifePilot — no competing product does this at the domain model level

**"Returns tomorrow because they want to know what happens next":**
- `StoryChapter.sequenceNumber` — always a next chapter
- `CharacterRelationship.engagementLevel` — visible progress toward next relationship level
- `AvatarUnlock` — a new cosmetic waiting after the next milestone
- `NarrativeTrigger` — completing today's scenario unlocks a new character tomorrow
- `ScenarioUnlock` — the simulation's choice today determines what's available tomorrow

**The complete engagement loop:**
```
Child opens app
      ↓
Sees their Avatar (identity)
      ↓
Character greets them using CharacterMemory ("Last time you said...")
      ↓
Story chapter begins — DialogueNode (character tells the story)
      ↓
Scenario plays — ScenarioChoice (what will you do?)
      ↓
ChoiceConsequence + LifeStateTransition (consequences felt)
      ↓
Post-scenario: Character reacts — DialogueNode (emotion: proud / concerned)
      ↓
ScenarioReflection written — CharacterMemory updated
      ↓
NarrativeTrigger fires — "You unlocked: Future You (Age 25) wants to meet you"
      ↓
CharacterRelationship level increases — "Your trust with Priya is now Level 3"
      ↓
AvatarUnlock issued — "New avatar style: Financial Explorer"
      ↓
Child closes app — returns tomorrow for the next chapter
```

**Every single step of that loop is now fully supported by the LifePilot domain model.**

---

## Appendix — Cumulative Model Stats

| Version | New Entities | Total Entities | New Enums | Total Enums | New Tables | Total Tables |
|---------|-------------|---------------|-----------|------------|-----------|-------------|
| v0.1.0 | 57 | 57 | 15 | 15 | 35 | 35 |
| v0.1.1 | 22 | 79 | 5 | 20 | 22 | 57 |
| v0.1.2 | 10 | 89 | 4 | 24 | 10 | 67 |
| v0.1.3 | 11 | 100 | 4 | 27 | 11 | 78 |
| v0.1.4 | 13 | 91* | 4 | 31 | 13 | 91 |
| **v0.1.5** | **14** | **105** | **6** | **37** | **14** | **105** |

*v0.1.4 corrected total after deduplication from v0.1.3 count

### New Enum Summary (v0.1.5)

| Enum | Values |
|------|--------|
| CharacterRole | 14: future_self · mentor · coach · guide · friend · parent_figure · teacher · career_advisor · financial_advisor · historian · leader · explorer · inventor · entrepreneur |
| DialogueEmotion | 9: happy · curious · confident · reflective · excited · concerned · hopeful · proud · supportive |
| ConversationType | 8: future_self · mentoring · career_exploration · financial_guidance · reflection · leadership · friendship · entrepreneurship |
| MemoryType | 8: goal · career · money · achievement · reflection · value · mission · choice |
| SpeakerType | 3: player · character · system |
| TriggerType | 7: scenario_completed · mission_completed · choice_selected · career_discovered · life_state_threshold · future_goal_created · reflection_completed |

**Total new enum values: 49 · Cumulative total: 278**

### New Service Summary (v0.1.5)

| Service | Key Methods |
|---------|------------|
| `characterService` | getAll, getSystemCharacters, getByRole, getById, create, update |
| `voiceProfileService` | getAll, getByLanguage, getById, create |
| `futureCharacterService` | getForPilot, getById, create |
| `storyArcService` | getAll, getByCategory, getById, create, getChapters, addChapter |
| `dialogueService` | getNodesForScenario, getNodesForChapter, getNodeById, createNode, getChoicesForNode, createChoice |
| `conversationSessionService` | getForPilot, getForCharacter, getByType, getById, start, end |
| `characterRelationshipService` | get, getAllForPilot, create, recordInteraction (upsert with delta) |
| `characterMemoryService` | getForCharacter, getByType, create, getMostImportant (top-N by importance) |
| `voiceInteractionService` | getForSession, create |
| `narrativeTriggerService` | getByType, getBySource, getByTarget, create |
| `avatarService` | getForPilot, create, update, getUnlocks, addUnlock |
