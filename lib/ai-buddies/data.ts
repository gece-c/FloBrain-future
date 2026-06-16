import type { LucideIcon } from "lucide-react";
import {
  Atom,
  Briefcase,
  CircleDollarSign,
  ClipboardList,
  Code2,
  Cpu,
  Database,
  HeartPulse,
  Megaphone,
  Mic,
  Palette,
  Plane,
  Rocket,
  Users,
} from "lucide-react";

export type AIBuddy = {
  label: string;
  icon: LucideIcon;
  href?: string;
};

export const aiBuddies: AIBuddy[] = [
  { label: "Data Buddy", icon: Database },
  { label: "Design Buddy", icon: Palette, href: "/design-buddy" },
  { label: "Developer Buddy", icon: Code2 },
  { label: "Finance Buddy", icon: CircleDollarSign },
  { label: "Health Buddy", icon: HeartPulse },
  { label: "HR Buddy", icon: Users },
  { label: "IoT Buddy", icon: Cpu },
  { label: "Legal Buddy", icon: Briefcase },
  { label: "Marketing Buddy", icon: Megaphone },
  { label: "PM Buddy", icon: ClipboardList },
  { label: "Podcast Buddy", icon: Mic },
  { label: "Quantum Buddy", icon: Atom },
  { label: "Space Buddy", icon: Rocket },
  { label: "Travel Buddy", icon: Plane },
];
