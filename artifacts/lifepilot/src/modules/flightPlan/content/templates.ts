// ============================================================
// LIFEPILOT — FLIGHT PLAN TEMPLATE REPOSITORY
// 50 curated flight plan suggestions across 7 categories.
// These are starting points, not prescriptions.
// ============================================================
import type { GoalCategory } from "@/types";

export type FlightPlanTemplateCategory =
  | "confidence"
  | "learning"
  | "creativity"
  | "health"
  | "friendships"
  | "leadership"
  | "responsibility";

const CATEGORY_TO_GOAL: Record<FlightPlanTemplateCategory, GoalCategory> = {
  confidence: "personal",
  learning: "academic",
  creativity: "creative",
  health: "health",
  friendships: "social",
  leadership: "personal",
  responsibility: "personal",
};

export interface FlightPlanTemplate {
  id: string;
  templateCategory: FlightPlanTemplateCategory;
  goalCategory: GoalCategory;
  title: string;
  description: string;
  whyItMatters: string;
  suggestedDurationDays: number;
}

export const FLIGHT_PLAN_TEMPLATES: FlightPlanTemplate[] = [
  // ── CONFIDENCE (8) ────────────────────────────────────────
  {
    id: "fp-con-01",
    templateCategory: "confidence",
    goalCategory: CATEGORY_TO_GOAL.confidence,
    title: "Speak Up More",
    description: "Share at least one opinion or answer every day — in class, at home, or with friends.",
    whyItMatters: "Your voice matters. The more you use it, the more natural it feels.",
    suggestedDurationDays: 21,
  },
  {
    id: "fp-con-02",
    templateCategory: "confidence",
    goalCategory: CATEGORY_TO_GOAL.confidence,
    title: "Try Something New Each Week",
    description: "Each week, try one thing you've never done before — no matter how small.",
    whyItMatters: "Every new attempt builds proof that you can handle the unfamiliar.",
    suggestedDurationDays: 42,
  },
  {
    id: "fp-con-03",
    templateCategory: "confidence",
    goalCategory: CATEGORY_TO_GOAL.confidence,
    title: "Daily Affirmation Practice",
    description: "Start each morning by saying three true, positive things about yourself.",
    whyItMatters: "What you tell yourself every day shapes how you see yourself.",
    suggestedDurationDays: 30,
  },
  {
    id: "fp-con-04",
    templateCategory: "confidence",
    goalCategory: CATEGORY_TO_GOAL.confidence,
    title: "Face One Small Fear",
    description: "Identify one small thing that makes you nervous, and do it this month.",
    whyItMatters: "Facing small fears builds the courage for bigger ones.",
    suggestedDurationDays: 30,
  },
  {
    id: "fp-con-05",
    templateCategory: "confidence",
    goalCategory: CATEGORY_TO_GOAL.confidence,
    title: "Make One New Friend",
    description: "Start a conversation with someone new — in class, in your building, or online.",
    whyItMatters: "Every friendship started with one brave hello.",
    suggestedDurationDays: 30,
  },
  {
    id: "fp-con-06",
    templateCategory: "confidence",
    goalCategory: CATEGORY_TO_GOAL.confidence,
    title: "Perform or Present Something",
    description: "Share something you've made or know — a poem, a project, a skill — with at least one person.",
    whyItMatters: "Being seen for who you are builds real confidence.",
    suggestedDurationDays: 14,
  },
  {
    id: "fp-con-07",
    templateCategory: "confidence",
    goalCategory: CATEGORY_TO_GOAL.confidence,
    title: "Keep a Wins Journal",
    description: "Write down one small win every evening — something you did well or tried today.",
    whyItMatters: "Tracking small victories shows you how far you actually travel.",
    suggestedDurationDays: 30,
  },
  {
    id: "fp-con-08",
    templateCategory: "confidence",
    goalCategory: CATEGORY_TO_GOAL.confidence,
    title: "Stand By a Decision",
    description: "This month, make three decisions on your own — without asking for approval — and stick with them.",
    whyItMatters: "Trusting yourself is the foundation of real confidence.",
    suggestedDurationDays: 30,
  },

  // ── LEARNING (8) ──────────────────────────────────────────
  {
    id: "fp-lrn-01",
    templateCategory: "learning",
    goalCategory: CATEGORY_TO_GOAL.learning,
    title: "Read More",
    description: "Read for at least 20 minutes every day — any book, any topic, any language.",
    whyItMatters: "Reading is the quietest superpower you can build.",
    suggestedDurationDays: 30,
  },
  {
    id: "fp-lrn-02",
    templateCategory: "learning",
    goalCategory: CATEGORY_TO_GOAL.learning,
    title: "Learn a New Language Skill",
    description: "Study or practise any language skill for 15 minutes a day — a new language or your own.",
    whyItMatters: "Language opens every door.",
    suggestedDurationDays: 60,
  },
  {
    id: "fp-lrn-03",
    templateCategory: "learning",
    goalCategory: CATEGORY_TO_GOAL.learning,
    title: "Master a School Subject",
    description: "Choose one subject you find difficult and spend 20 extra minutes on it every other day.",
    whyItMatters: "The subject that feels hardest now could become your strongest one.",
    suggestedDurationDays: 45,
  },
  {
    id: "fp-lrn-04",
    templateCategory: "learning",
    goalCategory: CATEGORY_TO_GOAL.learning,
    title: "Complete an Online Course or Tutorial",
    description: "Find a free online resource on any topic you're curious about and complete at least one module per week.",
    whyItMatters: "Self-directed learning is a lifelong skill that starts now.",
    suggestedDurationDays: 42,
  },
  {
    id: "fp-lrn-05",
    templateCategory: "learning",
    goalCategory: CATEGORY_TO_GOAL.learning,
    title: "Learn to Type Faster",
    description: "Practise typing for 10 minutes a day. Track your words per minute.",
    whyItMatters: "Typing fast lets you get your thoughts out before you lose them.",
    suggestedDurationDays: 30,
  },
  {
    id: "fp-lrn-06",
    templateCategory: "learning",
    goalCategory: CATEGORY_TO_GOAL.learning,
    title: "Explore Coding",
    description: "Spend 30 minutes a week learning to code — any language, any platform, any level.",
    whyItMatters: "Understanding how software works is one of the most useful things you can know.",
    suggestedDurationDays: 60,
  },
  {
    id: "fp-lrn-07",
    templateCategory: "learning",
    goalCategory: CATEGORY_TO_GOAL.learning,
    title: "Build a Study Habit",
    description: "Study at the same time and same place every day, even if only for 30 minutes.",
    whyItMatters: "Consistency in studying matters more than total hours.",
    suggestedDurationDays: 21,
  },
  {
    id: "fp-lrn-08",
    templateCategory: "learning",
    goalCategory: CATEGORY_TO_GOAL.learning,
    title: "Learn About Indian History",
    description: "Read or watch one piece of content about Indian history or culture each week.",
    whyItMatters: "Understanding where we come from helps us know where we're going.",
    suggestedDurationDays: 60,
  },

  // ── CREATIVITY (7) ────────────────────────────────────────
  {
    id: "fp-cre-01",
    templateCategory: "creativity",
    goalCategory: CATEGORY_TO_GOAL.creativity,
    title: "Learn Drawing",
    description: "Spend 20 minutes drawing every day — anything. Fill a sketchbook over the coming weeks.",
    whyItMatters: "Drawing trains you to see, not just to look.",
    suggestedDurationDays: 30,
  },
  {
    id: "fp-cre-02",
    templateCategory: "creativity",
    goalCategory: CATEGORY_TO_GOAL.creativity,
    title: "Write Every Day",
    description: "Write for 10 minutes every day — a journal entry, a story, a poem, anything.",
    whyItMatters: "Writing is how you discover what you actually think.",
    suggestedDurationDays: 30,
  },
  {
    id: "fp-cre-03",
    templateCategory: "creativity",
    goalCategory: CATEGORY_TO_GOAL.creativity,
    title: "Learn a Musical Instrument",
    description: "Practise any instrument — or even just rhythm on a surface — for 15 minutes a day.",
    whyItMatters: "Music builds patience, focus, and a relationship with beauty.",
    suggestedDurationDays: 60,
  },
  {
    id: "fp-cre-04",
    templateCategory: "creativity",
    goalCategory: CATEGORY_TO_GOAL.creativity,
    title: "Start a Creative Project",
    description: "Begin one creative project — a comic, a song, a story, a game — and work on it a little each week.",
    whyItMatters: "The world needs what you will make.",
    suggestedDurationDays: 60,
  },
  {
    id: "fp-cre-05",
    templateCategory: "creativity",
    goalCategory: CATEGORY_TO_GOAL.creativity,
    title: "Learn Photography",
    description: "Take at least five intentional photographs every day. Look for light, angle, and meaning.",
    whyItMatters: "Photography teaches you to find beauty in ordinary moments.",
    suggestedDurationDays: 21,
  },
  {
    id: "fp-cre-06",
    templateCategory: "creativity",
    goalCategory: CATEGORY_TO_GOAL.creativity,
    title: "Learn Craft or Handwork",
    description: "Explore any hands-on craft — embroidery, origami, knitting, pottery — for an hour a week.",
    whyItMatters: "Making things with your hands connects your mind to the physical world.",
    suggestedDurationDays: 42,
  },
  {
    id: "fp-cre-07",
    templateCategory: "creativity",
    goalCategory: CATEGORY_TO_GOAL.creativity,
    title: "Cook One New Recipe Per Week",
    description: "Learn one new recipe each week and make it yourself.",
    whyItMatters: "Cooking is creativity you can share and eat.",
    suggestedDurationDays: 42,
  },

  // ── HEALTH (7) ────────────────────────────────────────────
  {
    id: "fp-hlt-01",
    templateCategory: "health",
    goalCategory: CATEGORY_TO_GOAL.health,
    title: "Practise Football",
    description: "Practise football — dribbling, passing, or playing — for at least 30 minutes three times a week.",
    whyItMatters: "Sport is how we build strength, resilience, and belonging.",
    suggestedDurationDays: 42,
  },
  {
    id: "fp-hlt-02",
    templateCategory: "health",
    goalCategory: CATEGORY_TO_GOAL.health,
    title: "Walk or Run Every Day",
    description: "Walk or run for at least 20 minutes every day, rain or shine.",
    whyItMatters: "Moving your body daily changes your energy, mood, and health.",
    suggestedDurationDays: 30,
  },
  {
    id: "fp-hlt-03",
    templateCategory: "health",
    goalCategory: CATEGORY_TO_GOAL.health,
    title: "Drink More Water",
    description: "Drink at least 6-8 glasses of water every day for a month.",
    whyItMatters: "Hydration affects your energy, focus, and how you feel.",
    suggestedDurationDays: 30,
  },
  {
    id: "fp-hlt-04",
    templateCategory: "health",
    goalCategory: CATEGORY_TO_GOAL.health,
    title: "Sleep Better",
    description: "Set a consistent bedtime and wake-up time, and stick to it — even on weekends.",
    whyItMatters: "Sleep is the foundation of every good habit.",
    suggestedDurationDays: 21,
  },
  {
    id: "fp-hlt-05",
    templateCategory: "health",
    goalCategory: CATEGORY_TO_GOAL.health,
    title: "Learn a Yoga or Stretching Routine",
    description: "Practise a 10-minute yoga or stretching sequence each morning.",
    whyItMatters: "Flexibility in the body builds flexibility in the mind.",
    suggestedDurationDays: 21,
  },
  {
    id: "fp-hlt-06",
    templateCategory: "health",
    goalCategory: CATEGORY_TO_GOAL.health,
    title: "Reduce Screen Time Before Bed",
    description: "No screens for the last 30 minutes before bedtime for one month.",
    whyItMatters: "What you do before sleep shapes the quality of your rest.",
    suggestedDurationDays: 30,
  },
  {
    id: "fp-hlt-07",
    templateCategory: "health",
    goalCategory: CATEGORY_TO_GOAL.health,
    title: "Eat More Fruits and Vegetables",
    description: "Include at least one fruit and one vegetable in your meals every day.",
    whyItMatters: "Food is the fuel for everything you want to do.",
    suggestedDurationDays: 30,
  },

  // ── FRIENDSHIPS (7) ───────────────────────────────────────
  {
    id: "fp-fri-01",
    templateCategory: "friendships",
    goalCategory: CATEGORY_TO_GOAL.friendships,
    title: "Strengthen a Friendship",
    description: "Reach out to one friend you haven't spoken to in a while. Make a plan to meet or talk.",
    whyItMatters: "Friendships don't maintain themselves — they need attention.",
    suggestedDurationDays: 30,
  },
  {
    id: "fp-fri-02",
    templateCategory: "friendships",
    goalCategory: CATEGORY_TO_GOAL.friendships,
    title: "Be a Better Listener",
    description: "Each day, practise listening fully to one conversation — without interrupting or checking your phone.",
    whyItMatters: "Being truly heard is one of the greatest gifts one person can give another.",
    suggestedDurationDays: 21,
  },
  {
    id: "fp-fri-03",
    templateCategory: "friendships",
    goalCategory: CATEGORY_TO_GOAL.friendships,
    title: "Make a New Friend",
    description: "Introduce yourself to someone new this month. Have at least one real conversation.",
    whyItMatters: "Every friendship you have right now started with a first conversation.",
    suggestedDurationDays: 30,
  },
  {
    id: "fp-fri-04",
    templateCategory: "friendships",
    goalCategory: CATEGORY_TO_GOAL.friendships,
    title: "Do Something Kind for a Friend Weekly",
    description: "Once a week, do something thoughtful for a friend — a note, a favour, a surprise.",
    whyItMatters: "Friendship is built in the small, consistent moments.",
    suggestedDurationDays: 42,
  },
  {
    id: "fp-fri-05",
    templateCategory: "friendships",
    goalCategory: CATEGORY_TO_GOAL.friendships,
    title: "Resolve a Misunderstanding",
    description: "If there's a friendship that feels strained, take one small step to repair it this month.",
    whyItMatters: "The courage to repair matters as much as the courage to connect.",
    suggestedDurationDays: 30,
  },
  {
    id: "fp-fri-06",
    templateCategory: "friendships",
    goalCategory: CATEGORY_TO_GOAL.friendships,
    title: "Spend Quality Time Offline",
    description: "Once a week, spend time with a friend doing something together — no screens.",
    whyItMatters: "Presence is a form of love.",
    suggestedDurationDays: 42,
  },
  {
    id: "fp-fri-07",
    templateCategory: "friendships",
    goalCategory: CATEGORY_TO_GOAL.friendships,
    title: "Be the Friend Who Shows Up",
    description: "When a friend needs support this month, be the one who actually shows up — in person, by message, or by action.",
    whyItMatters: "Being reliable is rare. Being reliable is loved.",
    suggestedDurationDays: 30,
  },

  // ── LEADERSHIP (7) ────────────────────────────────────────
  {
    id: "fp-led-01",
    templateCategory: "leadership",
    goalCategory: CATEGORY_TO_GOAL.leadership,
    title: "Lead a Group Project",
    description: "Volunteer to take the lead on one team or group task this month.",
    whyItMatters: "Leadership is learned by doing — not by waiting.",
    suggestedDurationDays: 30,
  },
  {
    id: "fp-led-02",
    templateCategory: "leadership",
    goalCategory: CATEGORY_TO_GOAL.leadership,
    title: "Organise Something",
    description: "Plan and organise one event or activity — for your family, friends, or class.",
    whyItMatters: "Organisation is leadership in action.",
    suggestedDurationDays: 30,
  },
  {
    id: "fp-led-03",
    templateCategory: "leadership",
    goalCategory: CATEGORY_TO_GOAL.leadership,
    title: "Mentor Someone Younger",
    description: "Spend time helping or teaching someone younger than you — a sibling, a classmate, a neighbour.",
    whyItMatters: "You solidify what you know by sharing it.",
    suggestedDurationDays: 30,
  },
  {
    id: "fp-led-04",
    templateCategory: "leadership",
    goalCategory: CATEGORY_TO_GOAL.leadership,
    title: "Stand Up for What's Right",
    description: "If you see something unfair this month, speak up — kindly but clearly.",
    whyItMatters: "Speaking up is how change begins.",
    suggestedDurationDays: 30,
  },
  {
    id: "fp-led-05",
    templateCategory: "leadership",
    goalCategory: CATEGORY_TO_GOAL.leadership,
    title: "Run a Community Project",
    description: "Start a small project that helps your family, building, or community in some way.",
    whyItMatters: "Leaders create the change they want to see, starting small.",
    suggestedDurationDays: 60,
  },
  {
    id: "fp-led-06",
    templateCategory: "leadership",
    goalCategory: CATEGORY_TO_GOAL.leadership,
    title: "Practise Public Speaking",
    description: "Give a short speech or talk — to your family, friends, or class — at least once this month.",
    whyItMatters: "Your ideas are worth sharing. The world needs to hear them.",
    suggestedDurationDays: 30,
  },
  {
    id: "fp-led-07",
    templateCategory: "leadership",
    goalCategory: CATEGORY_TO_GOAL.leadership,
    title: "Make Decisions Thoughtfully",
    description: "For one month, before making any decision — big or small — pause and think about impact.",
    whyItMatters: "Good leaders think before they act.",
    suggestedDurationDays: 30,
  },

  // ── RESPONSIBILITY (6) ────────────────────────────────────
  {
    id: "fp-res-01",
    templateCategory: "responsibility",
    goalCategory: CATEGORY_TO_GOAL.responsibility,
    title: "Help At Home",
    description: "Take on one regular household responsibility — cooking, cleaning, shopping — for a full month.",
    whyItMatters: "Contributing to your family is how you become part of something larger than yourself.",
    suggestedDurationDays: 30,
  },
  {
    id: "fp-res-02",
    templateCategory: "responsibility",
    goalCategory: CATEGORY_TO_GOAL.responsibility,
    title: "Manage Your Time Better",
    description: "Plan your day each morning and track how closely you follow your plan.",
    whyItMatters: "Your time is your most important resource. Learn to use it intentionally.",
    suggestedDurationDays: 21,
  },
  {
    id: "fp-res-03",
    templateCategory: "responsibility",
    goalCategory: CATEGORY_TO_GOAL.responsibility,
    title: "Keep Your Space Tidy",
    description: "Spend 10 minutes tidying your study or living space every day.",
    whyItMatters: "A tidy space makes space for a tidy mind.",
    suggestedDurationDays: 21,
  },
  {
    id: "fp-res-04",
    templateCategory: "responsibility",
    goalCategory: CATEGORY_TO_GOAL.responsibility,
    title: "Track Your Money",
    description: "Keep a simple record of what you spend and receive each day for one month.",
    whyItMatters: "Understanding where your money goes is the beginning of financial wisdom.",
    suggestedDurationDays: 30,
  },
  {
    id: "fp-res-05",
    templateCategory: "responsibility",
    goalCategory: CATEGORY_TO_GOAL.responsibility,
    title: "Be On Time",
    description: "For one month, make a conscious effort to be on time — for school, meals, appointments, and commitments.",
    whyItMatters: "Being on time is a form of respect for other people.",
    suggestedDurationDays: 30,
  },
  {
    id: "fp-res-06",
    templateCategory: "responsibility",
    goalCategory: CATEGORY_TO_GOAL.responsibility,
    title: "Complete What You Start",
    description: "Make a list of unfinished things in your life. Commit to completing or honestly closing each one.",
    whyItMatters: "Finishing things builds integrity — the alignment between what you say and what you do.",
    suggestedDurationDays: 30,
  },
];

export const FLIGHT_PLAN_TEMPLATE_COUNT = FLIGHT_PLAN_TEMPLATES.length;
export const FLIGHT_PLAN_TEMPLATE_CATEGORIES: FlightPlanTemplateCategory[] = [
  "confidence", "learning", "creativity", "health", "friendships", "leadership", "responsibility",
];

export function getTemplatesByCategory(category: FlightPlanTemplateCategory): FlightPlanTemplate[] {
  return FLIGHT_PLAN_TEMPLATES.filter(t => t.templateCategory === category);
}
