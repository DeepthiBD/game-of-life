import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Telescope, ArrowLeft, ChevronRight, Sparkles } from "lucide-react";
import { pilotRepository } from "@/storage/repositories";
import { pilotDnaService } from "@/modules/pilotDna/PilotDnaService";
import type { Pilot, PilotInterestCategory } from "@/types";

const COLOR = "hsl(196,92%,40%)";

interface CareerCategory {
  id: PilotInterestCategory;
  emoji: string;
  label: string;
  color: string;
  tagline: string;
  careers: { title: string; description: string }[];
}

const CAREER_CATEGORIES: CareerCategory[] = [
  {
    id: "technology",
    emoji: "💻", label: "Technology", color: "#3B9EE8",
    tagline: "Build the tools that shape tomorrow",
    careers: [
      { title: "Software Developer", description: "Design and build apps, games, and websites that millions use." },
      { title: "Data Scientist", description: "Find patterns in information to help organisations make smart decisions." },
      { title: "Cybersecurity Expert", description: "Protect systems and people from digital threats." },
      { title: "AI/ML Engineer", description: "Teach machines to think, learn, and solve problems." },
      { title: "Game Developer", description: "Create interactive worlds and experiences people love." },
      { title: "UX Designer", description: "Make technology easy and delightful for everyone to use." },
    ],
  },
  {
    id: "science",
    emoji: "🔬", label: "Science", color: "#6366F1",
    tagline: "Ask questions, find answers, change the world",
    careers: [
      { title: "Research Scientist", description: "Discover new knowledge through experiments and observation." },
      { title: "Environmental Scientist", description: "Study and protect our natural world and ecosystems." },
      { title: "Astronomer", description: "Explore the universe — stars, planets, and everything beyond." },
      { title: "Biologist", description: "Understand living things from microscopic cells to entire ecosystems." },
      { title: "Chemist", description: "Explore matter and reactions to create new materials and medicines." },
      { title: "Geologist", description: "Study Earth's rocks and the forces that shape our planet." },
    ],
  },
  {
    id: "art",
    emoji: "🎨", label: "Arts & Design", color: "#EC4899",
    tagline: "Express what words cannot say",
    careers: [
      { title: "Graphic Designer", description: "Create visual communication — logos, posters, digital art." },
      { title: "Animator", description: "Bring characters and stories to life through motion." },
      { title: "Architect", description: "Design buildings and spaces where people live, work, and gather." },
      { title: "Fashion Designer", description: "Create clothing that expresses culture, personality, and art." },
      { title: "Illustrator", description: "Tell stories and ideas through pictures and visual art." },
      { title: "Art Director", description: "Shape the visual identity of films, brands, and publications." },
    ],
  },
  {
    id: "music",
    emoji: "🎵", label: "Music & Performing", color: "#8B5CF6",
    tagline: "Move hearts through sound and story",
    careers: [
      { title: "Musician / Composer", description: "Create and perform original music that moves people." },
      { title: "Actor / Performer", description: "Bring characters to life on stage, screen, or voice." },
      { title: "Music Producer", description: "Craft the sound of songs and albums in the studio." },
      { title: "Sound Designer", description: "Create audio landscapes for films, games, and experiences." },
      { title: "Dance Choreographer", description: "Design movement and expression for performance and storytelling." },
      { title: "Theatre Director", description: "Bring stories to life on stage by guiding a creative team." },
    ],
  },
  {
    id: "sports",
    emoji: "⚡", label: "Sports & Fitness", color: "#EF4444",
    tagline: "Push human potential to its limit",
    careers: [
      { title: "Professional Athlete", description: "Compete at the highest level in your chosen sport." },
      { title: "Sports Coach", description: "Train and develop athletes to reach their full potential." },
      { title: "Sports Physiotherapist", description: "Help athletes recover from injury and perform at their best." },
      { title: "Sports Psychologist", description: "Support athletes' mental performance and well-being." },
      { title: "Fitness Trainer", description: "Help people improve their health and physical well-being." },
      { title: "Sports Journalist", description: "Tell the stories behind the games and the athletes." },
    ],
  },
  {
    id: "business",
    emoji: "💡", label: "Business & Entrepreneurship", color: "#F59E0B",
    tagline: "Build something that matters",
    careers: [
      { title: "Entrepreneur", description: "Start your own venture and build something new from an idea." },
      { title: "Product Manager", description: "Shape products that solve real problems for real people." },
      { title: "Marketing Strategist", description: "Connect brands with the people who need them most." },
      { title: "Finance Manager", description: "Manage money intelligently to help organisations thrive." },
      { title: "Management Consultant", description: "Help organisations solve their toughest challenges." },
      { title: "Social Entrepreneur", description: "Build businesses that create positive change in the world." },
    ],
  },
  {
    id: "helping",
    emoji: "🤝", label: "Social Work & Helping", color: "#22A06B",
    tagline: "Be the support others need",
    careers: [
      { title: "Social Worker", description: "Support individuals and families through life's hardest moments." },
      { title: "Counsellor / Therapist", description: "Help people understand and heal their minds and emotions." },
      { title: "NGO Leader", description: "Run organisations that address social issues at scale." },
      { title: "Community Organiser", description: "Bring people together to create positive local change." },
      { title: "Child Development Specialist", description: "Support children's growth, learning, and well-being." },
      { title: "Human Rights Advocate", description: "Fight for dignity and fairness for every person." },
    ],
  },
  {
    id: "nature",
    emoji: "🌿", label: "Nature & Environment", color: "#16A34A",
    tagline: "Protect what the planet needs",
    careers: [
      { title: "Wildlife Biologist", description: "Study and protect animals and their natural habitats." },
      { title: "Conservation Scientist", description: "Preserve ecosystems and manage natural resources sustainably." },
      { title: "Climate Scientist", description: "Study Earth's climate and help society respond to change." },
      { title: "Forest Officer", description: "Manage and protect India's forests and biodiversity." },
      { title: "Marine Biologist", description: "Explore life in the oceans — from coral reefs to deep sea." },
      { title: "Sustainable Farmer", description: "Grow food in ways that nourish people and protect the earth." },
    ],
  },
  {
    id: "space",
    emoji: "🚀", label: "Space & Exploration", color: "#7C3AED",
    tagline: "Reach beyond what we know",
    careers: [
      { title: "Astronaut", description: "Travel beyond Earth and explore the universe firsthand." },
      { title: "Aerospace Engineer", description: "Design rockets, satellites, and the vehicles that explore space." },
      { title: "Astrophysicist", description: "Understand the physics of stars, galaxies, and the cosmos." },
      { title: "Mission Controller", description: "Manage space missions from the ground in real time." },
      { title: "Space Medic", description: "Protect the health of humans living and working in space." },
      { title: "Satellite Engineer", description: "Build and operate satellites that connect and inform the world." },
    ],
  },
  {
    id: "cooking",
    emoji: "🍳", label: "Crafts & Making", color: "#F97316",
    tagline: "Create with your hands and heart",
    careers: [
      { title: "Chef / Culinary Artist", description: "Create food that nourishes, delights, and brings people together." },
      { title: "Product Designer", description: "Design physical objects that are beautiful and functional." },
      { title: "Craftsperson / Artisan", description: "Make handcrafted objects that preserve tradition and skill." },
      { title: "Textile Designer", description: "Create fabrics, patterns, and woven art for fashion and home." },
      { title: "Carpenter / Woodworker", description: "Build functional and beautiful objects from natural materials." },
      { title: "Jewellery Designer", description: "Craft wearable art that carries personal and cultural meaning." },
    ],
  },
  {
    id: "books",
    emoji: "📚", label: "Writing & Storytelling", color: "#0EA5E9",
    tagline: "Shape how the world understands itself",
    careers: [
      { title: "Author / Novelist", description: "Write stories that transport readers to new worlds." },
      { title: "Journalist", description: "Investigate the truth and tell important stories to the public." },
      { title: "Screenwriter", description: "Create the scripts behind films, series, and shows." },
      { title: "Content Creator", description: "Build audiences through writing, video, or audio storytelling." },
      { title: "Poet", description: "Capture human experience in language that resonates deeply." },
      { title: "Editor", description: "Shape and strengthen the ideas and voices of other writers." },
    ],
  },
  {
    id: "gaming",
    emoji: "💊", label: "Healthcare & Wellness", color: "#06B6D4",
    tagline: "Help people live longer, better lives",
    careers: [
      { title: "Doctor / Physician", description: "Diagnose and treat illness, and keep communities healthy." },
      { title: "Nurse", description: "Provide hands-on care and support to patients every day." },
      { title: "Psychologist", description: "Help people understand their minds and overcome challenges." },
      { title: "Pharmacist", description: "Ensure medicines are safe, effective, and accessible." },
      { title: "Public Health Expert", description: "Design systems that keep entire populations healthy." },
      { title: "Medical Researcher", description: "Discover new treatments and cures through scientific study." },
    ],
  },
];

export default function CareerExplorerPage(): React.ReactNode {
  const [pilot, setPilot] = useState<Pilot | null>(null);
  const [selected, setSelected] = useState<CareerCategory | null>(null);
  const [browsed, setBrowsed] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    const p = await pilotRepository.getFirst();
    if (p) setPilot(p);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleCategorySelect(cat: CareerCategory) {
    setSelected(cat);
    if (!browsed.has(cat.id)) {
      setBrowsed(prev => new Set([...prev, cat.id]));
      if (pilot?.id) {
        await pilotDnaService.recordSignal(
          pilot.id,
          "career_explorer",
          "browse",
          "CareerCategory",
          undefined,
          [cat.id],
          { [cat.id]: 8, curiosity: 5 },
        );
      }
    }
  }

  return (
    <div className="flex-1 flex flex-col" data-testid="page-career-explorer">

      {/* Header */}
      <div className="px-6 pt-8 pb-5" style={{ background: "linear-gradient(160deg, #E0F2FE 0%, #ffffff 60%)" }}>
        <div className="flex items-center gap-2 mb-1">
          {selected && (
            <button onClick={() => setSelected(null)} aria-label="Back">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
          <Telescope className="w-5 h-5" style={{ color: COLOR }} />
          <h1 className="text-xl font-bold text-foreground">Career Explorer</h1>
        </div>
        <p className="text-sm text-muted-foreground pl-7">
          {selected ? selected.tagline : "Explore the world of work, Captain"}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="px-5 py-4">

              {browsed.size > 0 && (
                <div className="flex items-center gap-2 mb-4 px-1">
                  <Sparkles className="w-4 h-4" style={{ color: COLOR }} />
                  <p className="text-xs font-semibold text-muted-foreground">
                    You've explored {browsed.size} area{browsed.size !== 1 ? "s" : ""} — keep going!
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                {CAREER_CATEGORIES.map(cat => (
                  <motion.button
                    key={cat.id}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleCategorySelect(cat)}
                    className="relative flex flex-col items-start gap-2 p-4 rounded-2xl text-left overflow-hidden"
                    style={{
                      background: browsed.has(cat.id) ? cat.color + "12" : "var(--card)",
                      border: `2px solid ${browsed.has(cat.id) ? cat.color + "60" : "var(--border)"}`,
                    }}
                  >
                    <span className="text-2xl">{cat.emoji}</span>
                    <span className="font-bold text-sm text-foreground leading-tight">{cat.label}</span>
                    <span className="text-xs text-muted-foreground leading-tight line-clamp-2">{cat.tagline}</span>
                    {browsed.has(cat.id) && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: cat.color }} aria-label="Explored" />
                    )}
                  </motion.button>
                ))}
              </div>

              <p className="text-xs text-center text-muted-foreground mt-6 px-4">
                Every great career starts with curiosity. Tap any area to explore.
              </p>
            </motion.div>
          ) : (
            <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="px-5 py-4 space-y-3 pb-8">

              <div className="p-5 rounded-2xl mb-2" style={{ background: selected.color + "12", border: `1px solid ${selected.color}30` }}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selected.emoji}</span>
                  <div>
                    <p className="font-extrabold text-lg text-foreground">{selected.label}</p>
                    <p className="text-sm text-muted-foreground">{selected.tagline}</p>
                  </div>
                </div>
              </div>

              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">
                Careers in {selected.label}
              </p>

              {selected.careers.map((career, i) => (
                <motion.div
                  key={career.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border"
                >
                  <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center"
                    style={{ background: selected.color + "15" }}>
                    <ChevronRight className="w-4 h-4" style={{ color: selected.color }} />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{career.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{career.description}</p>
                  </div>
                </motion.div>
              ))}

              <div className="mt-4 p-4 rounded-2xl" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
                <p className="text-xs font-bold text-green-700 mb-1">💡 Captain's Note</p>
                <p className="text-xs text-green-900 leading-relaxed">
                  There's no single right career — there are thousands of paths worth exploring. Your curiosity right now is the best compass you have.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
