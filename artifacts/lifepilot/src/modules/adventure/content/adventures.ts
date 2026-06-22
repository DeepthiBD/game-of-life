// ============================================================
// LIFEPILOT — ADVENTURE REPOSITORY
// 100 daily micro-adventures for the Adventure Engine.
// Curiosity(30) Confidence(20) Kindness(20) Creativity(20) Exploration(10)
// ============================================================

export type AdventureCategory =
  | "curiosity"
  | "confidence"
  | "kindness"
  | "creativity"
  | "exploration";

export interface Adventure {
  id: string;
  category: AdventureCategory;
  title: string;
  description: string;
  duration: "5min" | "15min" | "30min" | "anytime";
}

export const ADVENTURES: Adventure[] = [
  // ── CURIOSITY (30) ────────────────────────────────────────
  { id: "adv-cur-01", category: "curiosity", title: "Learn one new word", description: "Pick up a dictionary, open any page, and learn one word you've never used before. Use it in a sentence today.", duration: "5min" },
  { id: "adv-cur-02", category: "curiosity", title: "Notice something you've never noticed before", description: "Look at a familiar place — your room, your street, your school — and find one detail you've never paid attention to.", duration: "5min" },
  { id: "adv-cur-03", category: "curiosity", title: "Ask a question you've never asked", description: "Ask someone around you a question you've genuinely wondered about but never asked.", duration: "anytime" },
  { id: "adv-cur-04", category: "curiosity", title: "Find out how something works", description: "Pick any object near you — a pen, a fan, a clock — and figure out how it actually works.", duration: "15min" },
  { id: "adv-cur-05", category: "curiosity", title: "Map your world", description: "Draw a simple map of a place that matters to you — your house, your school route, your favourite spot.", duration: "15min" },
  { id: "adv-cur-06", category: "curiosity", title: "Read the back of something", description: "Pick up any product at home and read all the text on it. What do you discover?", duration: "5min" },
  { id: "adv-cur-07", category: "curiosity", title: "Watch clouds for five minutes", description: "Lie down or sit outside and watch the sky for five full minutes. What do you see?", duration: "5min" },
  { id: "adv-cur-08", category: "curiosity", title: "Explore a new type of music", description: "Listen to one song from a music style you've never explored before. What does it make you feel?", duration: "5min" },
  { id: "adv-cur-09", category: "curiosity", title: "Ask 'why' five times", description: "Pick any fact you know and ask 'why' five times in a row. See where the chain of thinking takes you.", duration: "5min" },
  { id: "adv-cur-10", category: "curiosity", title: "Cook or make something new", description: "Prepare one simple thing — a drink, a snack, a dish — that you've never made before.", duration: "30min" },
  { id: "adv-cur-11", category: "curiosity", title: "Look at something tiny up close", description: "Find a small object and examine it as closely as you can. A leaf, a coin, a piece of fabric. What do you see?", duration: "5min" },
  { id: "adv-cur-12", category: "curiosity", title: "Read about someone who inspires you", description: "Spend 10 minutes reading or watching something about a person — historical or living — who interests you.", duration: "15min" },
  { id: "adv-cur-13", category: "curiosity", title: "Count something unusual", description: "Count how many of something you can find in a minute — birds, blue objects, windows. What did you discover?", duration: "5min" },
  { id: "adv-cur-14", category: "curiosity", title: "Try writing with your non-dominant hand", description: "Write your name or a sentence with your non-dominant hand. Notice how it feels.", duration: "5min" },
  { id: "adv-cur-15", category: "curiosity", title: "Listen to silence", description: "Find the quietest spot near you and sit in silence for two full minutes. What do you hear?", duration: "5min" },
  { id: "adv-cur-16", category: "curiosity", title: "Find a new route", description: "Walk or travel by a different route than usual. What do you notice that you wouldn't have seen?", duration: "15min" },
  { id: "adv-cur-17", category: "curiosity", title: "Make up a story about a stranger", description: "Observe someone you don't know from a distance and make up a kind, interesting story about their day.", duration: "5min" },
  { id: "adv-cur-18", category: "curiosity", title: "Look at the stars", description: "Spend five minutes looking at the night sky. Can you find any patterns or constellations?", duration: "5min" },
  { id: "adv-cur-19", category: "curiosity", title: "Interview a grandparent or elder", description: "Ask an older person one question about what life was like when they were your age.", duration: "15min" },
  { id: "adv-cur-20", category: "curiosity", title: "Learn three facts about your city", description: "Find three things about the history or culture of your city that you didn't know before.", duration: "15min" },
  { id: "adv-cur-21", category: "curiosity", title: "Try a new food", description: "Eat something you've never tried before. Any new flavour counts.", duration: "anytime" },
  { id: "adv-cur-22", category: "curiosity", title: "Invent a game", description: "Make up a simple game using things you have at home. Teach it to someone.", duration: "15min" },
  { id: "adv-cur-23", category: "curiosity", title: "Watch a documentary clip", description: "Watch 10 minutes of a documentary about any topic you know little about.", duration: "15min" },
  { id: "adv-cur-24", category: "curiosity", title: "Explore a Wikipedia rabbit hole", description: "Pick any topic on Wikipedia and follow the links wherever they take you for 15 minutes.", duration: "15min" },
  { id: "adv-cur-25", category: "curiosity", title: "Notice smells today", description: "Pay deliberate attention to smells throughout your day. How many different ones do you notice?", duration: "anytime" },
  { id: "adv-cur-26", category: "curiosity", title: "Build something with what's around you", description: "Use whatever you can find nearby — paper, pencils, rubber bands — to build something. Anything counts.", duration: "15min" },
  { id: "adv-cur-27", category: "curiosity", title: "Read a poem", description: "Read one poem — any poem — slowly. Read it again. What does it make you think about?", duration: "5min" },
  { id: "adv-cur-28", category: "curiosity", title: "Change your perspective", description: "Look at a familiar space from an unusual angle — lying on the floor, from outside a window, from a higher spot.", duration: "5min" },
  { id: "adv-cur-29", category: "curiosity", title: "Plant something", description: "Plant a seed, water a plant, or simply pot a cutting. Watch it over the next few days.", duration: "15min" },
  { id: "adv-cur-30", category: "curiosity", title: "Draw what you see outside", description: "Sit near a window or outdoors and spend 10 minutes sketching what's in front of you. Perfection not required.", duration: "15min" },

  // ── CONFIDENCE (20) ───────────────────────────────────────
  { id: "adv-con-01", category: "confidence", title: "Say something kind about yourself", description: "Write down three things you genuinely like about yourself. Say them out loud once.", duration: "5min" },
  { id: "adv-con-02", category: "confidence", title: "Share an opinion", description: "Share a genuine opinion with someone today on any topic — even if you're not sure they'll agree.", duration: "anytime" },
  { id: "adv-con-03", category: "confidence", title: "Do something a little scary", description: "Choose one small thing that makes you mildly nervous — and do it today. Report back to your Flight Log.", duration: "anytime" },
  { id: "adv-con-04", category: "confidence", title: "Introduce yourself to someone new", description: "Start a conversation with someone you don't know well today.", duration: "anytime" },
  { id: "adv-con-05", category: "confidence", title: "Ask for what you need", description: "Identify something you need and ask for it clearly and kindly today.", duration: "anytime" },
  { id: "adv-con-06", category: "confidence", title: "Speak up in class or at home", description: "Volunteer an answer, idea, or question in a group today — even if you feel uncertain.", duration: "anytime" },
  { id: "adv-con-07", category: "confidence", title: "Do something you're proud of quietly", description: "Do one thing today that you're proud of — and don't tell anyone. Just know.", duration: "anytime" },
  { id: "adv-con-08", category: "confidence", title: "Compliment someone genuinely", description: "Give a real, specific compliment to someone today. Notice how it feels.", duration: "anytime" },
  { id: "adv-con-09", category: "confidence", title: "Try something you're not good at yet", description: "Spend 10 minutes on something you find difficult. You don't have to succeed — just try.", duration: "15min" },
  { id: "adv-con-10", category: "confidence", title: "Present something to someone", description: "Explain, teach, or show something you know to at least one person today.", duration: "15min" },
  { id: "adv-con-11", category: "confidence", title: "Write a list of your strengths", description: "Write down five genuine strengths you have. No false modesty — be honest about what you're good at.", duration: "5min" },
  { id: "adv-con-12", category: "confidence", title: "Stand tall for one hour", description: "Pay attention to your posture for one full hour. Walk and sit with intention.", duration: "anytime" },
  { id: "adv-con-13", category: "confidence", title: "Make a decision without asking anyone", description: "Choose something — a meal, a route, a plan — and commit to your decision without checking with others.", duration: "anytime" },
  { id: "adv-con-14", category: "confidence", title: "Read something aloud", description: "Read a page of a book, a poem, or an article out loud, to yourself or to someone else.", duration: "5min" },
  { id: "adv-con-15", category: "confidence", title: "Disagree respectfully", description: "If you genuinely disagree with something today, express it — kindly, calmly, and clearly.", duration: "anytime" },
  { id: "adv-con-16", category: "confidence", title: "Teach someone something", description: "Teach something you know — however small — to someone else today.", duration: "15min" },
  { id: "adv-con-17", category: "confidence", title: "Record yourself speaking", description: "Record a short voice message or video of yourself talking about any topic. Watch it back once.", duration: "5min" },
  { id: "adv-con-18", category: "confidence", title: "Write a letter to your future self", description: "Write one paragraph to yourself five years from now. Be honest. Be kind.", duration: "15min" },
  { id: "adv-con-19", category: "confidence", title: "Finish something you started", description: "Pick one small task that's been waiting — and finish it today.", duration: "anytime" },
  { id: "adv-con-20", category: "confidence", title: "Celebrate a small win", description: "Identify one thing you did well this week and give yourself a moment to actually feel good about it.", duration: "5min" },

  // ── KINDNESS (20) ─────────────────────────────────────────
  { id: "adv-kin-01", category: "kindness", title: "Thank someone", description: "Thank someone today for something specific — not just 'thanks' but why it matters.", duration: "anytime" },
  { id: "adv-kin-02", category: "kindness", title: "Write a kind note", description: "Leave a handwritten kind note for someone — a family member, friend, or classmate.", duration: "5min" },
  { id: "adv-kin-03", category: "kindness", title: "Help without being asked", description: "Do one helpful thing today without anyone asking you. Don't mention it.", duration: "anytime" },
  { id: "adv-kin-04", category: "kindness", title: "Listen fully to someone", description: "When someone talks to you today, put everything else down and listen completely. Ask one follow-up question.", duration: "anytime" },
  { id: "adv-kin-05", category: "kindness", title: "Include someone", description: "If you notice someone who seems left out today — in class, at home, online — find one way to include them.", duration: "anytime" },
  { id: "adv-kin-06", category: "kindness", title: "Smile at three people", description: "Give a genuine smile to three different people today. Notice what happens.", duration: "anytime" },
  { id: "adv-kin-07", category: "kindness", title: "Do a chore without being told", description: "Do one household chore or helpful task before anyone asks.", duration: "15min" },
  { id: "adv-kin-08", category: "kindness", title: "Be patient today", description: "Find one situation today where patience is needed — and choose to be patient.", duration: "anytime" },
  { id: "adv-kin-09", category: "kindness", title: "Share something", description: "Share something today — food, time, knowledge, or a laugh — with someone else.", duration: "anytime" },
  { id: "adv-kin-10", category: "kindness", title: "Check in on someone", description: "Send a message or ask in person how someone is doing today. Really mean it.", duration: "5min" },
  { id: "adv-kin-11", category: "kindness", title: "Pick up litter", description: "Pick up at least three pieces of litter from your environment today.", duration: "5min" },
  { id: "adv-kin-12", category: "kindness", title: "Make someone laugh", description: "Find a way to bring a genuine laugh or smile to someone today.", duration: "anytime" },
  { id: "adv-kin-13", category: "kindness", title: "Be kind to yourself", description: "Identify one way you've been too hard on yourself recently. Speak to yourself the way you'd speak to a good friend.", duration: "5min" },
  { id: "adv-kin-14", category: "kindness", title: "Apologise if needed", description: "If you've said or done something that hurt someone — even a little — find a genuine way to acknowledge it.", duration: "anytime" },
  { id: "adv-kin-15", category: "kindness", title: "Donate something", description: "Find one thing you no longer need and set it aside to give away or donate.", duration: "15min" },
  { id: "adv-kin-16", category: "kindness", title: "Protect an animal", description: "Do one thing to be kind to an animal today — feed a stray, give water to a bird, move an insect safely.", duration: "5min" },
  { id: "adv-kin-17", category: "kindness", title: "Say something encouraging", description: "Tell someone today that you believe in them — specifically and genuinely.", duration: "anytime" },
  { id: "adv-kin-18", category: "kindness", title: "Hold the door or make way", description: "Let someone else go first today — literally or figuratively.", duration: "anytime" },
  { id: "adv-kin-19", category: "kindness", title: "Remember someone's special day", description: "Think of a birthday, anniversary, or something important to someone you care about. Acknowledge it.", duration: "5min" },
  { id: "adv-kin-20", category: "kindness", title: "Give your full attention", description: "For one meal or conversation today, put your phone away completely and just be present.", duration: "anytime" },

  // ── CREATIVITY (20) ───────────────────────────────────────
  { id: "adv-cre-01", category: "creativity", title: "Draw something without lifting your pen", description: "Draw any image in one continuous line without lifting your pen from the paper.", duration: "5min" },
  { id: "adv-cre-02", category: "creativity", title: "Write a six-word story", description: "Tell a complete story in exactly six words. Try more than one version.", duration: "5min" },
  { id: "adv-cre-03", category: "creativity", title: "Rearrange your space", description: "Move or rearrange something in your room or study area. Notice how it changes the feeling.", duration: "15min" },
  { id: "adv-cre-04", category: "creativity", title: "Make music with everyday objects", description: "Create a rhythm using objects around you — tapping, clapping, tapping on surfaces.", duration: "5min" },
  { id: "adv-cre-05", category: "creativity", title: "Design your ideal day", description: "Write or draw out your perfect day — from morning to night — in as much detail as you like.", duration: "15min" },
  { id: "adv-cre-06", category: "creativity", title: "Invent a new word", description: "Create a new word for something that doesn't have a name yet. What's it called? What does it mean?", duration: "5min" },
  { id: "adv-cre-07", category: "creativity", title: "Doodle freely for ten minutes", description: "Set a timer for 10 minutes and doodle anything that comes to mind. No judgment, no plan.", duration: "15min" },
  { id: "adv-cre-08", category: "creativity", title: "Write a haiku about today", description: "Write a haiku (5-7-5 syllables) about something from your day.", duration: "5min" },
  { id: "adv-cre-09", category: "creativity", title: "Photograph five beautiful things", description: "Use your phone or any camera to photograph five things you find beautiful today.", duration: "15min" },
  { id: "adv-cre-10", category: "creativity", title: "Create from scraps", description: "Use only scrap paper, old newspapers, or leftover materials to make something.", duration: "30min" },
  { id: "adv-cre-11", category: "creativity", title: "Redesign your favourite food", description: "Imagine your favourite dish reimagined in a completely unexpected way. Draw or describe it.", duration: "5min" },
  { id: "adv-cre-12", category: "creativity", title: "Write a letter to a fictional character", description: "Choose any character from a book, film, or story and write them a genuine letter.", duration: "15min" },
  { id: "adv-cre-13", category: "creativity", title: "Imagine an alternate history", description: "Pick one historical event and imagine how things would be different if it had gone another way.", duration: "15min" },
  { id: "adv-cre-14", category: "creativity", title: "Create a playlist for your mood", description: "Build a playlist of 5-10 songs that perfectly matches how you feel today or want to feel.", duration: "15min" },
  { id: "adv-cre-15", category: "creativity", title: "Write a different ending", description: "Take a story you know — a book, movie, or real event — and write an alternative ending.", duration: "15min" },
  { id: "adv-cre-16", category: "creativity", title: "Design your dream room", description: "Draw or describe your ideal room in detail — colours, furniture, technology, windows, everything.", duration: "15min" },
  { id: "adv-cre-17", category: "creativity", title: "Tell a story using only pictures", description: "Draw a 4-panel wordless comic about anything — your day, a fantasy, a joke.", duration: "15min" },
  { id: "adv-cre-18", category: "creativity", title: "Create something using only circles", description: "Draw a picture using only circular shapes of different sizes.", duration: "5min" },
  { id: "adv-cre-19", category: "creativity", title: "Fold something from paper", description: "Make something from a single sheet of paper — an origami figure, a boat, a plane, or anything.", duration: "15min" },
  { id: "adv-cre-20", category: "creativity", title: "Describe your day as a film", description: "If today were a film, what genre would it be? Who would play you? What's the tagline?", duration: "5min" },

  // ── EXPLORATION (10) ──────────────────────────────────────
  { id: "adv-exp-01", category: "exploration", title: "Explore a part of your home you overlook", description: "Go to a corner, shelf, drawer, or area of your home you usually ignore. What do you find?", duration: "15min" },
  { id: "adv-exp-02", category: "exploration", title: "Walk somewhere you've never walked", description: "Take a walk in a direction you don't usually go. Go for at least 10 minutes.", duration: "15min" },
  { id: "adv-exp-03", category: "exploration", title: "Visit a library or bookshop", description: "Spend time in a library or bookshop — physical or online — and find one book that surprises you.", duration: "30min" },
  { id: "adv-exp-04", category: "exploration", title: "Explore a culture different from yours", description: "Read about, watch, or listen to something from a culture or country very different from your own.", duration: "15min" },
  { id: "adv-exp-05", category: "exploration", title: "Learn about your neighbourhood's history", description: "Find out one interesting fact about the history of the area where you live.", duration: "15min" },
  { id: "adv-exp-06", category: "exploration", title: "Find something new in your city", description: "Discover one place, street, or landmark in your city that you didn't know about before.", duration: "30min" },
  { id: "adv-exp-07", category: "exploration", title: "Explore a new creative hobby for 30 minutes", description: "Try something you've never tried before — sketching, baking, journaling, coding, origami, anything.", duration: "30min" },
  { id: "adv-exp-08", category: "exploration", title: "Try a sport or physical activity you haven't done", description: "Do 15 minutes of a physical activity you've never tried or rarely do.", duration: "15min" },
  { id: "adv-exp-09", category: "exploration", title: "Visit a museum, exhibition, or heritage site", description: "Visit — physically or online — any museum, art gallery, or heritage space.", duration: "30min" },
  { id: "adv-exp-10", category: "exploration", title: "Spend one hour without screens", description: "Put all screens away for one full hour. Notice what you do, think, and feel instead.", duration: "anytime" },
];

export const ADVENTURE_COUNT = ADVENTURES.length;
export const ADVENTURE_CATEGORIES: AdventureCategory[] = [
  "curiosity", "confidence", "kindness", "creativity", "exploration",
];

/** Daily deterministic adventure selection — same day always returns same adventures. */
export function getTodaysAdventures(count = 3): Adventure[] {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const indices: number[] = [];
  let s = seed;
  while (indices.length < count) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const idx = Math.abs(s) % ADVENTURES.length;
    if (!indices.includes(idx)) indices.push(idx);
  }
  return indices.map(i => ADVENTURES[i]);
}

/** Get all adventures for a category. */
export function getAdventuresByCategory(category: AdventureCategory): Adventure[] {
  return ADVENTURES.filter(a => a.category === category);
}
