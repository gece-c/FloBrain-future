import type { FloBrainUser } from "@/lib/services/contracts";
import { ROLE_LABELS, type UserRole } from "@/lib/rbac/permissions";

export type DemoUserPersona = FloBrainUser & {
  demoId: string;
  demoLabel: string;
  demoDescription: string;
};

export const DEFAULT_DEMO_USER_ID = "demo-team-lead";

export const DEMO_USER_COOKIE = "flobrain-demo-user";

export const demoUserPersonas: DemoUserPersona[] = [
  {
    demoId: "demo-system-owner",
    demoLabel: ROLE_LABELS["system-owner"],
    demoDescription: "Full platform access including system owner management.",
    id: "u-john-h",
    name: "John H.",
    email: "john@flobrain.local",
    role: "system-owner",
    teams: ["Executive"],
    financeTier: 3,
    financeToggles: {
      affiliateDashboard: true,
      commissions: true,
      referrals: true,
      leadConversion: true,
    },
  },
  {
    demoId: "demo-admin",
    demoLabel: ROLE_LABELS.admin,
    demoDescription: "Admin management, finance, and leadership tools. No system owner controls.",
    id: "u-mohamed-a",
    name: "Mohamed A.",
    email: "mohamed@flobrain.local",
    role: "admin",
    teams: ["Management"],
    financeTier: 3,
    financeToggles: {
      affiliateDashboard: true,
      commissions: true,
      referrals: true,
      leadConversion: true,
    },
  },
  {
    demoId: "demo-team-lead",
    demoLabel: ROLE_LABELS["team-lead"],
    demoDescription: "Team management, evaluations, and delegation. Some areas need IAB grants.",
    id: "u-ceren-g",
    name: "Ceren G.",
    email: "ceren@flobrain.local",
    role: "team-lead",
    teams: ["Growth", "Design"],
    financeTier: 2,
    grants: [
      { permission: "projects.performanceMetrics", level: "view" },
      { permission: "communication.executiveLinks", level: "view" },
      { permission: "finance.funding", level: "view" },
    ],
  },
  {
    demoId: "demo-team-member",
    demoLabel: ROLE_LABELS["team-member"],
    demoDescription: "Standard member view: directory, tasks, chat, own onboarding.",
    id: "u-diogo-s",
    name: "Diogo S.",
    email: "diogo@flobrain.local",
    role: "team-member",
    teams: ["Design"],
    financeTier: 2,
  },
  {
    demoId: "demo-team-member-tier1",
    demoLabel: "Team Member (Tier 1)",
    demoDescription: "Pay-to-learn tier: limited finance and project visibility.",
    id: "u-claudia-l",
    name: "Claudia L.",
    email: "claudia@flobrain.local",
    role: "team-member",
    teams: ["Growth"],
    financeTier: 1,
  },
  {
    demoId: "demo-team-member-grants",
    demoLabel: "Team Member (with grants)",
    demoDescription: "IAB grants from admin: elevated project and executive link access.",
    id: "u-serina-z",
    name: "Serina Z.",
    email: "serina@flobrain.local",
    role: "team-member",
    teams: ["Growth"],
    financeTier: 2,
    grants: [
      { permission: "projects.progress", level: "view" },
      { permission: "projects.productsDetail", level: "view" },
      { permission: "communication.executiveLinks", level: "view" },
      { permission: "finance.affiliateDashboard", level: "view" },
    ],
    financeToggles: { affiliateDashboard: true },
  },
  {
    demoId: "demo-team-member-rebecca",
    demoLabel: ROLE_LABELS["team-member"],
    demoDescription: "Standard member on the Design team.",
    id: "u-rebecca-a",
    name: "Rebecca A.",
    email: "rebecca@flobrain.local",
    role: "team-member",
    teams: ["Design"],
    financeTier: 2,
  },
  {
    demoId: "demo-team-member-kendra",
    demoLabel: ROLE_LABELS["team-member"],
    demoDescription: "Standard member on the Growth team.",
    id: "u-kendra-l",
    name: "Kendra L.",
    email: "kendra@flobrain.local",
    role: "team-member",
    teams: ["Growth"],
    financeTier: 2,
  },
];

const personaById = new Map(demoUserPersonas.map((p) => [p.demoId, p]));

export function getDemoPersona(demoId: string): DemoUserPersona | undefined {
  return personaById.get(demoId);
}

export function getDemoUser(demoId: string): FloBrainUser {
  const persona = getDemoPersona(demoId);
  if (!persona) return stripPersonaMeta(demoUserPersonas[0]);
  return stripPersonaMeta(persona);
}

function stripPersonaMeta(persona: DemoUserPersona): FloBrainUser {
  const { demoId: _id, demoLabel: _label, demoDescription: _desc, ...user } = persona;
  return user;
}

export function roleAccent(role: UserRole): string {
  const accents: Record<UserRole, string> = {
    "system-owner": "border-amber-400/50 bg-amber-500/10",
    admin: "border-fuchsia-400/50 bg-fuchsia-500/10",
    "team-lead": "border-sky-400/50 bg-sky-500/10",
    "team-member": "border-zinc-400/40 bg-zinc-500/10",
  };
  return accents[role];
}

export function getTeamDirectoryMembers() {
  return demoUserPersonas.map((persona) => ({
    id: persona.id,
    name: persona.name,
    role: persona.role,
    team: persona.teams[0] ?? "General",
  }));
}
