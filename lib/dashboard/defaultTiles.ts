import type { AppPermission } from "@/lib/rbac/permissions";

import type { DashboardIconKey } from "./types";

export type DefaultDashboardTile = {
  id: string;
  title: string;
  description: string;
  href: string;
  iconKey: DashboardIconKey;
  permission?: AppPermission;
};

export const defaultDashboardTiles: DefaultDashboardTile[] = [
  {
    id: "my-workspace",
    title: "My Workspace",
    description: "My tasks, onboarding, brainwritings and tracker.",
    href: "/my-workspace",
    iconKey: "users",
  },
  {
    id: "workspace",
    title: "Workspace",
    description: "Tasks and approved/up-to-date documents.",
    href: "/workspace",
    iconKey: "folder-kanban",
  },
  {
    id: "meetings",
    title: "Meetings",
    description: "Links, recordings and notes pages.",
    href: "/meetings",
    iconKey: "video",
  },
  {
    id: "timer",
    title: "Timer",
    description: "Open detailed time tracking view.",
    href: "/timer",
    iconKey: "timer",
  },
  {
    id: "chatrooms",
    title: "Chat Rooms",
    description: "Team channels and direct chats.",
    href: "/chatrooms",
    iconKey: "message-square",
  },
  {
    id: "teams",
    title: "Teams",
    description: "Members directory, filters, and 1:1 chat.",
    href: "/teams",
    iconKey: "users",
  },
  {
    id: "team-management",
    title: "Team Management",
    description: "Onboarding and process overview.",
    href: "/teams",
    iconKey: "shield-check",
    permission: "view.teamManagement",
  },
  {
    id: "invoices",
    title: "Invoices / Payments",
    description: "Finance and payouts.",
    href: "/invoices",
    iconKey: "credit-card",
    permission: "view.invoices",
  },
  {
    id: "executive",
    title: "Executive Metrics",
    description: "System status and performance.",
    href: "/executive",
    iconKey: "bar-chart-3",
    permission: "view.executive",
  },
];
