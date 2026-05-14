import {
  BarChart3,
  Briefcase,
  Calendar,
  CreditCard,
  ExternalLink,
  FileText,
  FolderKanban,
  Globe,
  Home,
  Link2,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  Users,
  Video,
} from "lucide-react";
import type { ReactNode } from "react";

import type { DashboardIconKey } from "@/lib/dashboard/types";

const className = "h-4 w-4";

export const dashboardIconMap: Record<DashboardIconKey, ReactNode> = {
  "bar-chart-3": <BarChart3 className={className} />,
  briefcase: <Briefcase className={className} />,
  calendar: <Calendar className={className} />,
  "credit-card": <CreditCard className={className} />,
  "external-link": <ExternalLink className={className} />,
  "file-text": <FileText className={className} />,
  "folder-kanban": <FolderKanban className={className} />,
  globe: <Globe className={className} />,
  home: <Home className={className} />,
  "link-2": <Link2 className={className} />,
  "message-square": <MessageSquare className={className} />,
  "shield-check": <ShieldCheck className={className} />,
  sparkles: <Sparkles className={className} />,
  star: <Star className={className} />,
  timer: <Timer className={className} />,
  users: <Users className={className} />,
  video: <Video className={className} />,
};

export function isValidDashboardIconKey(key: string): key is DashboardIconKey {
  return Object.prototype.hasOwnProperty.call(dashboardIconMap, key);
}

export function dashboardIconFor(key: string): ReactNode {
  if (isValidDashboardIconKey(key)) return dashboardIconMap[key];
  return dashboardIconMap.sparkles;
}

export const customTileIconChoices: { value: DashboardIconKey; label: string }[] = [
  { value: "link-2", label: "Link" },
  { value: "globe", label: "Web" },
  { value: "external-link", label: "External" },
  { value: "file-text", label: "Document" },
  { value: "calendar", label: "Calendar" },
  { value: "briefcase", label: "Work" },
  { value: "home", label: "Home" },
  { value: "star", label: "Star" },
  { value: "sparkles", label: "Other" },
];
