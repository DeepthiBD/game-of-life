// ============================================================
// LIFEPILOT — FUTURE ME WRITING PROMPTS
// 60 curated prompts to help children write letters to their future selves.
// Categories: identity(10), relationships(10), dreams(10),
//             challenges(10), India & world(10), gratitude & joy(10)
// ============================================================

export interface WritingPrompt {
  id: string;
  category: "identity" | "relationships" | "dreams" | "challenges" | "world" | "gratitude";
  text: string;
  starter?: string;
}

export const WRITING_PROMPTS: WritingPrompt[] = [
  // ── IDENTITY (10) ─────────────────────────────────────────
  { id: "wp-01", category: "identity", text: "Tell your future self something important about who you are right now.", starter: "Right now, I am..." },
  { id: "wp-02", category: "identity", text: "What are you most proud of today?", starter: "I'm really proud that..." },
  { id: "wp-03", category: "identity", text: "What kind of person do you want to be?", starter: "I want to be someone who..." },
  { id: "wp-04", category: "identity", text: "What does success look like for you — in your own words?", starter: "For me, success means..." },
  { id: "wp-05", category: "identity", text: "What makes you, you? What's the most uniquely you thing about yourself?", starter: "The thing that makes me most myself is..." },
  { id: "wp-06", category: "identity", text: "What are your three biggest strengths right now?", starter: "I'm getting better at..." },
  { id: "wp-07", category: "identity", text: "What values matter most to you today?", starter: "The things I believe in most are..." },
  { id: "wp-08", category: "identity", text: "How have you grown in the last year?", starter: "Compared to last year, I've become..." },
  { id: "wp-09", category: "identity", text: "What would you like your future self never to forget about who you are right now?", starter: "Please remember that I..." },
  { id: "wp-10", category: "identity", text: "Write whatever is in your heart right now, without editing it.", starter: "Dear Future Me..." },

  // ── RELATIONSHIPS (10) ────────────────────────────────────
  { id: "wp-11", category: "relationships", text: "Tell your future self about your best friend today.", starter: "My best friend right now is..." },
  { id: "wp-12", category: "relationships", text: "Tell your future self about someone who really matters to you.", starter: "There's someone very important in my life..." },
  { id: "wp-13", category: "relationships", text: "Who do you want to be for the people around you?", starter: "For the people I love, I want to be..." },
  { id: "wp-14", category: "relationships", text: "What have you learned from your family that you hope to carry with you always?", starter: "My family has taught me..." },
  { id: "wp-15", category: "relationships", text: "Is there someone you want to thank or reconnect with? Tell your future self.", starter: "I really want to tell..." },
  { id: "wp-16", category: "relationships", text: "What does a good friend look and feel like to you?", starter: "A great friend is someone who..." },
  { id: "wp-17", category: "relationships", text: "Tell your future self about someone who inspired you this year.", starter: "Someone who really inspired me was..." },
  { id: "wp-18", category: "relationships", text: "How do you want people to remember you?", starter: "I hope people remember me as..." },
  { id: "wp-19", category: "relationships", text: "What makes you laugh the most right now? Who do you laugh with?", starter: "The person who makes me laugh most is..." },
  { id: "wp-20", category: "relationships", text: "What does kindness look like in your everyday life?", starter: "The way I try to be kind is..." },

  // ── DREAMS (10) ───────────────────────────────────────────
  { id: "wp-21", category: "dreams", text: "What do you hope your future self has achieved?", starter: "I hope you have..." },
  { id: "wp-22", category: "dreams", text: "What's a dream you have right now that you hope came true?", starter: "I dream of..." },
  { id: "wp-23", category: "dreams", text: "Describe your perfect day — the one you're still working towards.", starter: "My perfect day would be..." },
  { id: "wp-24", category: "dreams", text: "What's something you're working on that you hope your future self has mastered?", starter: "I want to learn..." },
  { id: "wp-25", category: "dreams", text: "What's something you want to do that you haven't done yet?", starter: "I really want to try..." },
  { id: "wp-26", category: "dreams", text: "Where do you want to be in 5 years? Paint a picture.", starter: "In five years, I see myself..." },
  { id: "wp-27", category: "dreams", text: "What's a place you want to visit someday? Tell your future self why.", starter: "I dream of going to..." },
  { id: "wp-28", category: "dreams", text: "What would you create if you had all the time and resources in the world?", starter: "If I could create anything, I'd build..." },
  { id: "wp-29", category: "dreams", text: "What change do you want to make in the world — even a small one?", starter: "The difference I want to make is..." },
  { id: "wp-30", category: "dreams", text: "What questions do you have for your future self?", starter: "I want to ask you..." },

  // ── CHALLENGES (10) ───────────────────────────────────────
  { id: "wp-31", category: "challenges", text: "What's something you're struggling with that you hope is easier later?", starter: "Right now, the hardest thing is..." },
  { id: "wp-32", category: "challenges", text: "What's one fear you have right now that you hope no longer limits you?", starter: "I used to be scared of..." },
  { id: "wp-33", category: "challenges", text: "Tell your future self about a time you kept going even when it was hard.", starter: "There was a time when I almost gave up, but..." },
  { id: "wp-34", category: "challenges", text: "What's a mistake you made that taught you something important?", starter: "I once made a mistake, and what it taught me was..." },
  { id: "wp-35", category: "challenges", text: "What's something that feels impossible right now that you hope is possible later?", starter: "I hope that someday..." },
  { id: "wp-36", category: "challenges", text: "What's a promise you want to make to your future self?", starter: "I promise you that..." },
  { id: "wp-37", category: "challenges", text: "What advice do you want to give your future self from the present?", starter: "Here's what I want you to know..." },
  { id: "wp-38", category: "challenges", text: "What would make future you proud of present you?", starter: "I hope you're proud that I..." },
  { id: "wp-39", category: "challenges", text: "What's something you want to have learned by the time you read this?", starter: "By now, I hope you've learned..." },
  { id: "wp-40", category: "challenges", text: "What's one thing you want future you to do differently than you're doing now?", starter: "I want you to stop..." },

  // ── INDIA & WORLD (10) ───────────────────────────────────
  { id: "wp-41", category: "world", text: "What do you love most about where you live right now?", starter: "The thing I love most about my home is..." },
  { id: "wp-42", category: "world", text: "What do you want your future self to know about the India you're growing up in?", starter: "India right now is..." },
  { id: "wp-43", category: "world", text: "What's a festival, tradition, or celebration that means a lot to you?", starter: "One tradition I love is..." },
  { id: "wp-44", category: "world", text: "What's a big problem in the world you'd like to help solve someday?", starter: "One thing I want to change in the world is..." },
  { id: "wp-45", category: "world", text: "What's something about your culture or community that you're proud of?", starter: "I'm proud that my community..." },
  { id: "wp-46", category: "world", text: "What language or art form do you want to keep in your life as you grow?", starter: "Something from my heritage I want to hold onto is..." },
  { id: "wp-47", category: "world", text: "Tell your future self about a big event happening in the world right now.", starter: "Something big happening in the world right now is..." },
  { id: "wp-48", category: "world", text: "What do you want the world to look like when you're grown up?", starter: "I hope the world will be..." },
  { id: "wp-49", category: "world", text: "What's a place in India you want to visit that you haven't seen yet?", starter: "Someday I want to go to..." },
  { id: "wp-50", category: "world", text: "What do you think young people like you can do to make things better?", starter: "I believe young people can..." },

  // ── GRATITUDE & JOY (10) ─────────────────────────────────
  { id: "wp-51", category: "gratitude", text: "What's your favourite thing in the world right now?", starter: "My favourite thing right now is..." },
  { id: "wp-52", category: "gratitude", text: "What are you grateful for today?", starter: "I'm grateful for..." },
  { id: "wp-53", category: "gratitude", text: "What's something small about today that you want to preserve forever?", starter: "One small thing I want to remember..." },
  { id: "wp-54", category: "gratitude", text: "What's your favourite subject or activity — and why?", starter: "I love... because..." },
  { id: "wp-55", category: "gratitude", text: "What's a simple pleasure in life that makes you happy?", starter: "One small thing that makes me happy is..." },
  { id: "wp-56", category: "gratitude", text: "Who are three people you're grateful to have in your life right now?", starter: "I'm so grateful for..." },
  { id: "wp-57", category: "gratitude", text: "What's something beautiful you noticed this week?", starter: "Something beautiful I noticed was..." },
  { id: "wp-58", category: "gratitude", text: "What's a memory from this year that made you genuinely happy?", starter: "A happy memory I want to keep..." },
  { id: "wp-59", category: "gratitude", text: "What are you curious about right now?", starter: "I'm really curious about..." },
  { id: "wp-60", category: "gratitude", text: "What's one thing you want your future self to know that will make them smile?", starter: "Something that will make you smile..." },
];

export const WRITING_PROMPT_COUNT = WRITING_PROMPTS.length;

export function getRandomPrompts(count = 3, category?: WritingPrompt["category"]): WritingPrompt[] {
  const pool = category ? WRITING_PROMPTS.filter(p => p.category === category) : WRITING_PROMPTS;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getPromptsByCategory(category: WritingPrompt["category"]): WritingPrompt[] {
  return WRITING_PROMPTS.filter(p => p.category === category);
}
