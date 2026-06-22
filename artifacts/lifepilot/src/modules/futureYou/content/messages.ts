// ============================================================
// LIFEPILOT — FUTURE YOU MESSAGE REPOSITORY
// 120 curated messages from Future You to the present child.
// 15 messages × 8 categories = 120 total.
// Governance: never judge, never predict, never lecture, never pressure.
// ============================================================

export type FutureMessageCategory =
  | "encouragement"
  | "reflection"
  | "curiosity"
  | "growth"
  | "confidence"
  | "resilience"
  | "perspective"
  | "gratitude";

export interface FutureMessage {
  id: string;
  category: FutureMessageCategory;
  text: string;
}

export const FUTURE_YOU_MESSAGES: FutureMessage[] = [
  // ── ENCOURAGEMENT (15) ────────────────────────────────────
  { id: "enc-01", category: "encouragement", text: "I remember standing where you are. Every small step you take today shapes who I became." },
  { id: "enc-02", category: "encouragement", text: "You are braver than you think. I know — because I was you." },
  { id: "enc-03", category: "encouragement", text: "That thing you're worried about? You'll figure it out. You always do." },
  { id: "enc-04", category: "encouragement", text: "Every day you show up is a day that matters." },
  { id: "enc-05", category: "encouragement", text: "The small things you do today are the big things I remember." },
  { id: "enc-06", category: "encouragement", text: "You don't have to be perfect. You just have to keep going." },
  { id: "enc-07", category: "encouragement", text: "I'm proud of you for trying — even when it feels hard." },
  { id: "enc-08", category: "encouragement", text: "Your kindness today becomes who I am tomorrow." },
  { id: "enc-09", category: "encouragement", text: "Keep going. The best parts of this journey are still ahead." },
  { id: "enc-10", category: "encouragement", text: "You are exactly where you need to be right now." },
  { id: "enc-11", category: "encouragement", text: "The courage you show today — even in small moments — I carry it with me." },
  { id: "enc-12", category: "encouragement", text: "You belong here. In this world. In this moment." },
  { id: "enc-13", category: "encouragement", text: "Everything you're learning, every little thing, it all adds up." },
  { id: "enc-14", category: "encouragement", text: "Some days are hard. You get through them. That's the whole story." },
  { id: "enc-15", category: "encouragement", text: "I believe in you. Always have. Always will." },

  // ── REFLECTION (15) ───────────────────────────────────────
  { id: "ref-01", category: "reflection", text: "What made you smile today? I want to remember that feeling." },
  { id: "ref-02", category: "reflection", text: "What was the hardest part of today? You got through it. That means something." },
  { id: "ref-03", category: "reflection", text: "Who helped you today, even in a small way?" },
  { id: "ref-04", category: "reflection", text: "What surprised you about yourself today?" },
  { id: "ref-05", category: "reflection", text: "If today had a colour, what would it be?" },
  { id: "ref-06", category: "reflection", text: "What would you do differently if today started over?" },
  { id: "ref-07", category: "reflection", text: "What's one thing you learned — not from books, but from life?" },
  { id: "ref-08", category: "reflection", text: "Who made you laugh today? Hold that person close." },
  { id: "ref-09", category: "reflection", text: "What moment from today do you want to remember forever?" },
  { id: "ref-10", category: "reflection", text: "What did today teach you that yesterday couldn't?" },
  { id: "ref-11", category: "reflection", text: "What's one thing you want to say to yourself at the end of today?" },
  { id: "ref-12", category: "reflection", text: "If you could do one small thing differently tomorrow, what would it be?" },
  { id: "ref-13", category: "reflection", text: "What did you notice today that you've never noticed before?" },
  { id: "ref-14", category: "reflection", text: "What are you looking forward to tomorrow?" },
  { id: "ref-15", category: "reflection", text: "If today were a chapter in a book, what would you title it?" },

  // ── CURIOSITY (15) ────────────────────────────────────────
  { id: "cur-01", category: "curiosity", text: "What are you curious about right now? Follow that thread." },
  { id: "cur-02", category: "curiosity", text: "What question do you have that no one has answered for you yet?" },
  { id: "cur-03", category: "curiosity", text: "What would you explore if there were no rules about what to explore?" },
  { id: "cur-04", category: "curiosity", text: "Learn one new word today. Let it surprise you." },
  { id: "cur-05", category: "curiosity", text: "Look at something ordinary today as if you're seeing it for the first time." },
  { id: "cur-06", category: "curiosity", text: "What's something you want to understand better?" },
  { id: "cur-07", category: "curiosity", text: "Ask a question today that you've never asked before." },
  { id: "cur-08", category: "curiosity", text: "What would happen if you tried the thing you've been curious about?" },
  { id: "cur-09", category: "curiosity", text: "Notice something in your world today that you usually walk past." },
  { id: "cur-10", category: "curiosity", text: "What would you like to know more about — more than anything?" },
  { id: "cur-11", category: "curiosity", text: "What's a skill you've always wanted to try but haven't yet?" },
  { id: "cur-12", category: "curiosity", text: "What happens when you look closely at something small today?" },
  { id: "cur-13", category: "curiosity", text: "Curiosity is a superpower. What's yours pointed at right now?" },
  { id: "cur-14", category: "curiosity", text: "What's one thing about the world that you find genuinely amazing?" },
  { id: "cur-15", category: "curiosity", text: "The best adventures start with a simple question. What's yours today?" },

  // ── GROWTH (15) ───────────────────────────────────────────
  { id: "gro-01", category: "growth", text: "What small step can we take today? Even the tiniest action moves us forward." },
  { id: "gro-02", category: "growth", text: "Growth doesn't always feel like growth. Sometimes it just feels like trying." },
  { id: "gro-03", category: "growth", text: "The you of today is already ahead of the you of yesterday." },
  { id: "gro-04", category: "growth", text: "Every time you practise something, you're building a future version of yourself." },
  { id: "gro-05", category: "growth", text: "What's one thing you're getting better at — even slowly?" },
  { id: "gro-06", category: "growth", text: "Struggle is how we grow. Not a sign we're failing." },
  { id: "gro-07", category: "growth", text: "The things that challenge you now are the things you'll teach others someday." },
  { id: "gro-08", category: "growth", text: "You don't have to grow at someone else's pace. Your growth is your own." },
  { id: "gro-09", category: "growth", text: "What would you attempt if you knew you'd improve over time?" },
  { id: "gro-10", category: "growth", text: "The goal isn't perfection. The goal is forward." },
  { id: "gro-11", category: "growth", text: "One day, what feels hard now will feel natural. Keep going." },
  { id: "gro-12", category: "growth", text: "Growth is quiet. It happens in the small moments between the big ones." },
  { id: "gro-13", category: "growth", text: "You've already changed more than you realise. Look back a little." },
  { id: "gro-14", category: "growth", text: "Small consistent effort beats one big heroic push. Every time." },
  { id: "gro-15", category: "growth", text: "What are you becoming? It's more than you imagine." },

  // ── CONFIDENCE (15) ───────────────────────────────────────
  { id: "con-01", category: "confidence", text: "You have something to offer this world that no one else can give." },
  { id: "con-02", category: "confidence", text: "Your voice matters. Say the thing you've been keeping inside." },
  { id: "con-03", category: "confidence", text: "That idea you had? It's worth exploring. Really." },
  { id: "con-04", category: "confidence", text: "You are more capable than your doubts tell you." },
  { id: "con-05", category: "confidence", text: "It's okay to take up space. You deserve to be here." },
  { id: "con-06", category: "confidence", text: "The next time fear shows up, remember: you've pushed through before." },
  { id: "con-07", category: "confidence", text: "You don't need permission to be yourself." },
  { id: "con-08", category: "confidence", text: "Your opinion is worth having. Share it — thoughtfully, honestly, bravely." },
  { id: "con-09", category: "confidence", text: "The things you do quietly — helping, caring, noticing — those things matter." },
  { id: "con-10", category: "confidence", text: "I know your self-doubt by name. It's not telling you the truth." },
  { id: "con-11", category: "confidence", text: "You are allowed to believe in yourself. That's not arrogance. That's truth." },
  { id: "con-12", category: "confidence", text: "Standing up for what you believe in — even once — changes you forever." },
  { id: "con-13", category: "confidence", text: "The strongest thing you can do is be honestly, completely you." },
  { id: "con-14", category: "confidence", text: "Someone today needed you to show up. And you did." },
  { id: "con-15", category: "confidence", text: "Trust yourself a little more today than you did yesterday." },

  // ── RESILIENCE (15) ───────────────────────────────────────
  { id: "res-01", category: "resilience", text: "Hard days come. You've survived every difficult day so far. That's 100%." },
  { id: "res-02", category: "resilience", text: "Getting back up is not a small thing. It is the whole thing." },
  { id: "res-03", category: "resilience", text: "You don't have to be okay right now. But you do have to keep going." },
  { id: "res-04", category: "resilience", text: "Rest is not giving up. Rest is preparation." },
  { id: "res-05", category: "resilience", text: "The difficult chapter you're in right now is not the last chapter." },
  { id: "res-06", category: "resilience", text: "What would you tell a friend going through what you're going through?" },
  { id: "res-07", category: "resilience", text: "You are allowed to feel broken and still be whole." },
  { id: "res-08", category: "resilience", text: "Failure isn't falling. Failure is deciding not to get back up." },
  { id: "res-09", category: "resilience", text: "You've faced hard things before. Something in you knows how to handle this." },
  { id: "res-10", category: "resilience", text: "A difficult moment does not define you. How you move through it does." },
  { id: "res-11", category: "resilience", text: "Take it one hour at a time when one day feels too big." },
  { id: "res-12", category: "resilience", text: "Your setbacks are just detours. The destination hasn't changed." },
  { id: "res-13", category: "resilience", text: "Being resilient doesn't mean not hurting. It means continuing despite hurting." },
  { id: "res-14", category: "resilience", text: "What helped you get through a hard time before? That's still in you." },
  { id: "res-15", category: "resilience", text: "I made it through. Which means you will too. I promise." },

  // ── PERSPECTIVE (15) ──────────────────────────────────────
  { id: "per-01", category: "perspective", text: "Zoom out. The problem that feels enormous today is smaller than you think." },
  { id: "per-02", category: "perspective", text: "How would you see this situation if it happened to your best friend?" },
  { id: "per-03", category: "perspective", text: "What will you think about this moment five years from now?" },
  { id: "per-04", category: "perspective", text: "Every person you meet is carrying something invisible. Be gentle." },
  { id: "per-05", category: "perspective", text: "The world is bigger than any one test, any one day, any one mistake." },
  { id: "per-06", category: "perspective", text: "Your story isn't over. This is just one page." },
  { id: "per-07", category: "perspective", text: "Not everyone sees things the way you do. That's not a problem — it's possibility." },
  { id: "per-08", category: "perspective", text: "What's the kindest way to understand what just happened?" },
  { id: "per-09", category: "perspective", text: "Sometimes what feels like a setback is quietly a new direction." },
  { id: "per-10", category: "perspective", text: "You are not just your results. You are your effort, your intention, your care." },
  { id: "per-11", category: "perspective", text: "What if the challenge you're facing is preparing you for something?" },
  { id: "per-12", category: "perspective", text: "The view changes when you move. Step to one side and look again." },
  { id: "per-13", category: "perspective", text: "Everything feels permanent until it isn't. Almost nothing is permanent." },
  { id: "per-14", category: "perspective", text: "You have more control than you feel right now. Start with the next small choice." },
  { id: "per-15", category: "perspective", text: "This too will become a story you tell. What kind of story do you want it to be?" },

  // ── GRATITUDE (15) ────────────────────────────────────────
  { id: "gra-01", category: "gratitude", text: "What made today worth showing up for?" },
  { id: "gra-02", category: "gratitude", text: "Name three things — any three things — that exist in your world right now." },
  { id: "gra-03", category: "gratitude", text: "Who in your life do you take for granted? Maybe say something to them today." },
  { id: "gra-04", category: "gratitude", text: "What small pleasure did you experience today that you almost missed?" },
  { id: "gra-05", category: "gratitude", text: "Gratitude isn't about pretending everything is fine. It's about noticing what is." },
  { id: "gra-06", category: "gratitude", text: "What's something in your life that, once upon a time, you hoped for?" },
  { id: "gra-07", category: "gratitude", text: "Thank someone today — even for something small. Watch what happens." },
  { id: "gra-08", category: "gratitude", text: "What would today look like if you noticed every good thing in it?" },
  { id: "gra-09", category: "gratitude", text: "You have more than you sometimes remember. Let that in." },
  { id: "gra-10", category: "gratitude", text: "What part of your life are you grateful for that you've never said out loud?" },
  { id: "gra-11", category: "gratitude", text: "Kindness comes back around. Yours already has." },
  { id: "gra-12", category: "gratitude", text: "What simple thing happened today that you're glad happened?" },
  { id: "gra-13", category: "gratitude", text: "Someone or something helped you become who you are. Do you know what it is?" },
  { id: "gra-14", category: "gratitude", text: "Notice the people around you today. They are part of your story." },
  { id: "gra-15", category: "gratitude", text: "At the end of today: what are you glad was in it?" },
];

export const FUTURE_MESSAGE_COUNT = FUTURE_YOU_MESSAGES.length;
export const FUTURE_MESSAGE_CATEGORIES: FutureMessageCategory[] = [
  "encouragement", "reflection", "curiosity", "growth",
  "confidence", "resilience", "perspective", "gratitude",
];
