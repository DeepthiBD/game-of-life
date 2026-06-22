import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit2, CheckCircle2 } from "lucide-react";
import { pilotRepository } from "@/storage/repositories";
import type { Pilot } from "@/types";

interface AvatarOption {
  id: string; emoji: string; label: string; color: string; bg: string; description: string;
}
const AVATARS: AvatarOption[] = [
  { id: "explorer",  emoji: "🧭", label: "Explorer",  color: "#3B9EE8", bg: "#EBF5FD", description: "You love discovering new ideas and places." },
  { id: "inventor",  emoji: "⚙️",  label: "Inventor",  color: "#F59E0B", bg: "#FEF3C7", description: "You see solutions where others see problems." },
  { id: "dreamer",   emoji: "🌙", label: "Dreamer",   color: "#8B5CF6", bg: "#EDE9FE", description: "You imagine futures others haven't thought of." },
  { id: "artist",    emoji: "🎨", label: "Artist",    color: "#EC4899", bg: "#FCE7F3", description: "You express things the world needs to hear." },
  { id: "builder",   emoji: "🔨", label: "Builder",   color: "#22A06B", bg: "#D1FAE5", description: "You create things that matter and last." },
  { id: "athlete",   emoji: "⚡", label: "Athlete",   color: "#EF4444", bg: "#FEE2E2", description: "You know effort and discipline are everything." },
  { id: "reader",    emoji: "📚", label: "Reader",    color: "#6366F1", bg: "#E0E7FF", description: "You believe knowledge opens every door." },
  { id: "creator",   emoji: "✨", label: "Creator",   color: "#F97316", bg: "#FFEDD5", description: "You bring new things into the world." },
];
const getAvatar = (id?: string) => AVATARS.find(a => a.id === id) ?? AVATARS[0];

export default function PilotPage(): React.ReactNode {
  const [pilot, setPilot] = useState<Pilot | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("explorer");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    pilotRepository.getFirst().then(p => {
      if (p) { setPilot(p); setName(p.name); setSelectedAvatar(p.avatarUrl ?? "explorer"); }
      else setEditing(true);
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    if (!name.trim()) return;
    setSaving(true);
    try {
      const now = new Date();
      if (pilot?.id) {
        await pilotRepository.update(pilot.id, { name: name.trim(), avatarUrl: selectedAvatar, updatedAt: now });
        setPilot(prev => prev ? { ...prev, name: name.trim(), avatarUrl: selectedAvatar } : prev);
      } else {
        const id = await pilotRepository.create({ name: name.trim(), avatarUrl: selectedAvatar, isActive: true, createdAt: now, updatedAt: now });
        setPilot({ id, name: name.trim(), avatarUrl: selectedAvatar, isActive: true, createdAt: now, updatedAt: now });
      }
      setEditing(false);
    } finally { setSaving(false); }
  }

  if (loading) return (
    <div className="flex-1 flex items-center justify-center" data-testid="page-pilot">
      <div className="w-8 h-8 border-4 border-[#22A06B] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const av = getAvatar(editing ? selectedAvatar : (pilot?.avatarUrl ?? "explorer"));

  if (editing) return (
    <div className="flex-1 flex flex-col" data-testid="page-pilot">
      <div className="px-6 pt-8 pb-4" style={{ background: `linear-gradient(160deg, ${av.bg} 0%, #ffffff 60%)` }}>
        <h1 className="text-2xl font-bold text-foreground mb-1">{pilot ? "Edit Your Profile" : "Create Your Captain Profile"}</h1>
        <p className="text-muted-foreground text-sm">Choose your identity, Captain</p>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Choose your avatar</p>
          <div className="grid grid-cols-4 gap-3">
            {AVATARS.map(a => (
              <motion.button key={a.id} whileTap={{ scale: 0.92 }} onClick={() => setSelectedAvatar(a.id)}
                className="flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all"
                style={{ background: selectedAvatar === a.id ? a.bg : "transparent", border: `2px solid ${selectedAvatar === a.id ? a.color : "transparent"}` }}
                aria-label={`Select ${a.label}`} aria-pressed={selectedAvatar === a.id}>
                <span className="text-3xl" role="img" aria-hidden="true">{a.emoji}</span>
                <span className="text-xs font-semibold text-center" style={{ color: a.color }}>{a.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: av.bg }}>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ background: av.color + "20" }}>{av.emoji}</div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: av.color }}>Captain</p>
            <p className="text-lg font-bold text-foreground">{name || "Your Name"}</p>
            <p className="text-sm text-muted-foreground">{av.label}</p>
          </div>
        </div>

        <div>
          <label htmlFor="pilot-name" className="block text-sm font-semibold text-foreground mb-2">Your captain name</label>
          <input id="pilot-name" type="text" value={name} onChange={e => setName(e.target.value)}
            placeholder="Enter your name" maxLength={30}
            className="w-full px-4 py-3 text-lg font-medium rounded-2xl border-2 border-border bg-background focus:outline-none focus:border-[#22A06B] transition-colors" />
        </div>

        <motion.button whileTap={{ scale: 0.97 }} onClick={handleSave} disabled={!name.trim() || saving}
          className="w-full py-4 rounded-2xl text-white font-bold text-lg disabled:opacity-50"
          style={{ background: av.color }}>
          {saving ? "Saving…" : pilot ? "Save Changes" : "Begin My Journey"}
        </motion.button>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col" data-testid="page-pilot">
      <div className="px-6 pt-8 pb-6" style={{ background: `linear-gradient(160deg, ${av.bg} 0%, #ffffff 70%)` }}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}
              className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-sm"
              style={{ background: av.color + "20", border: `2px solid ${av.color}30` }}>
              {av.emoji}
            </motion.div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: av.color }}>Captain</p>
              <h1 className="text-2xl font-bold text-foreground">{pilot?.name}</h1>
              <p className="text-sm text-muted-foreground">{av.label}</p>
            </div>
          </div>
          <button onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold"
            style={{ background: av.color + "15", color: av.color }} aria-label="Edit profile">
            <Edit2 className="w-3.5 h-3.5" /> Edit
          </button>
        </div>
      </div>

      <div className="flex-1 px-6 py-6 space-y-4">
        <div className="p-5 rounded-2xl" style={{ background: av.bg }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: av.color }}>Your Avatar</p>
          <p className="font-bold text-foreground text-lg">{av.label}</p>
          <p className="text-sm text-muted-foreground mt-1">{av.description}</p>
        </div>
        <div className="p-5 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5" style={{ color: av.color }} />
            <h2 className="font-semibold text-foreground">Your Journey</h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Log reflections, set flight plans, and write letters to your future self. Every action builds the captain you're becoming.
          </p>
        </div>
      </div>
    </div>
  );
}
