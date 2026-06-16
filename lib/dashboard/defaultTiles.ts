import type { AppPermission } from "@/lib/rbac/permissions";

import type { DashboardIconKey } from "./types";

export type DefaultDashboardTile = {
  id: string;
  title: string;
  description: string;
  href: string;
  iconKey: DashboardIconKey;
  permission?: AppPermission;
  /** When set, tile requires full (edit) access instead of view */
  requireFull?: boolean;
};

export const defaultDashboardTiles: DefaultDashboardTile[] = [
  {
    id: "my-workspace",
    title: "My Workspace",
    description: "My tasks, onboarding, brainwritings and tracker.",
    href: "/my-workspace",
    iconKey: "users",
    permission: "onboarding.selectedIntern",
  },
  {
    id: "workspace",
    title: "Workspace",
    description: "Tasks and approved/up-to-date documents.",
    href: "/workspace",
    iconKey: "folder-kanban",
    permission: "tasks.companyWide",
  },
  {
    id: "meetings",
    title: "Meetings",
    description: "Links, recordings and notes pages.",
    href: "/meetings",
    iconKey: "video",
    permission: "meetings.join",
  },
  {
    id: "timer",
    title: "Timer",
    description: "Open detailed time tracking view.",
    href: "/timer",
    iconKey: "timer",
    permission: "timer.personal",
  },
  {
    id: "chatrooms",
    title: "Chat Rooms",
    description: "Team channels and direct chats.",
    href: "/chatrooms",
    iconKey: "message-square",
    permission: "communication.chat",
  },
  {
    id: "teams",
    title: "Teams",
    description: "Members directory, filters, and 1:1 chat.",
    href: "/teams",
    iconKey: "users",
    permission: "teams.directory",
  },
  {
    id: "team-management",
    title: "Team Management",
    description: "Onboarding, evaluation, and member management.",
    href: "/teams",
    iconKey: "shield-check",
    permission: "teams.management",
  },
  {
    id: "flovault",
    title: "FloVault",
    description: "Confidential documents and approvals.",
    href: "/documents",
    iconKey: "file-text",
    permission: "floVault.viewDocuments",
  },
  {
    id: "invoices",
    title: "Invoices / Payments",
    description: "Finance and payouts.",
    href: "/invoices",
    iconKey: "credit-card",
    permission: "finance.invoices",
  },
  {
    id: "executive",
    title: "Executive Metrics",
    description: "System status and performance.",
    href: "/executive",
    iconKey: "bar-chart-3",
    permission: "projects.progress",
  },
  {
    id: "onboarding",
    title: "Intern Onboarding",
    description: "Track all interns progress.",
    href: "/my-workspace",
    iconKey: "briefcase",
    permission: "onboarding.allInternsProgress",
  },
  {
    id: "system-logs",
    title: "Flo Chronos",
    description: "System log access.",
    href: "/executive",
    iconKey: "sparkles",
    permission: "management.systemLogs",
  },
];
