/**
 * FloBrain Permission and Access Matrix
 * Role hierarchy: System Owner → Admin → Team Lead / PM → Team Member
 */

export type UserRole = "system-owner" | "admin" | "team-lead" | "team-member";

/** @deprecated Use UserRole. Kept for migration from older mock data. */
export type LegacyUserRole = "team-leader" | "executive";

export type AccessLevel = "full" | "view" | "limited" | "none" | "tbd";

export type FinanceTier = 1 | 2 | 3;

export type FinanceFeatureToggle =
  | "affiliateDashboard"
  | "commissions"
  | "referrals"
  | "leadConversion";

export type AppPermission =
  // Documentation
  | "documentation.floVault"
  // Teams
  | "teams.membersList"
  | "teams.management"
  | "teams.memberManagement"
  | "teams.evaluationConduct"
  | "teams.ownEvaluation"
  | "teams.taskDelegation"
  | "teams.directory"
  | "teams.stats"
  // Projects
  | "projects.progress"
  | "projects.productsDetail"
  | "projects.experientialLearning"
  | "projects.ventureStudios"
  | "projects.management"
  | "projects.campaignsMarketing"
  | "projects.milestones"
  | "projects.performanceMetrics"
  | "projects.budgetInvestor"
  | "projects.openActionItems"
  // Tasks
  | "tasks.companyWide"
  | "tasks.teamWide"
  | "tasks.perMember"
  // Onboarding
  | "onboarding.allInternsProgress"
  | "onboarding.selectedIntern"
  | "onboarding.masterclass"
  // Timer & calendar
  | "timer.personal"
  | "timer.teamView"
  | "calendar.teamView"
  | "calendar.personal"
  // Meetings
  | "meetings.teamEdit"
  | "meetings.buddyEdit"
  | "meetings.join"
  | "meetings.teamNotes"
  | "meetings.personalNotes"
  // Communication
  | "communication.chat"
  | "communication.roomSearch"
  | "communication.executiveLinks"
  | "communication.floPodcast"
  | "communication.youtubeFlo"
  // Notifications
  | "notifications.meetings"
  | "notifications.taskDeadlines"
  | "notifications.chat"
  // QA & technology
  | "qa.testing"
  | "qa.aiIntegration"
  | "qa.apiStatus"
  // Management & system
  | "management.systemOwner"
  | "management.admin"
  | "management.leadership"
  | "management.internalOps"
  | "management.systemLogs"
  // Finance
  | "finance.funding"
  | "finance.invoices"
  | "finance.myPayments"
  | "finance.contracts"
  | "finance.affiliateDashboard"
  | "finance.commissions"
  | "finance.referrals"
  | "finance.leadConversion"
  // FloVault
  | "floVault.viewDocuments"
  | "floVault.submitDocument"
  | "floVault.approveReject"
  | "floVault.shareApproved"
  | "floVault.viewArchived"
  | "floVault.archiveDocuments"
  | "floVault.manageStorage"
  // Custom & expansion slots
  | "custom.slot1"
  | "custom.slot2"
  | "custom.slot3"
  | "custom.slot4"
  | "custom.slot5"
  | "custom.publicA"
  | "custom.publicB"
  | "custom.publicC";

type BaseAccess = AccessLevel | "limited-dot";

const F = "full" as const;
const V = "view" as const;
const L = "limited" as const;
const L2 = "limited-dot" as const;
const N = "none" as const;
const T = "tbd" as const;

type RoleMatrix = Record<UserRole, BaseAccess>;

const permissionMatrix: Record<AppPermission, RoleMatrix> = {
  "documentation.floVault": { "system-owner": F, admin: F, "team-lead": L, "team-member": L },

  "teams.membersList": { "system-owner": F, admin: F, "team-lead": F, "team-member": V },
  "teams.management": { "system-owner": F, admin: F, "team-lead": F, "team-member": N },
  "teams.memberManagement": { "system-owner": F, admin: F, "team-lead": F, "team-member": N },
  "teams.evaluationConduct": { "system-owner": F, admin: F, "team-lead": F, "team-member": N },
  "teams.ownEvaluation": { "system-owner": F, admin: V, "team-lead": V, "team-member": V },
  "teams.taskDelegation": { "system-owner": F, admin: F, "team-lead": F, "team-member": N },
  "teams.directory": { "system-owner": F, admin: F, "team-lead": F, "team-member": V },
  "teams.stats": { "system-owner": F, admin: F, "team-lead": F, "team-member": V },

  "projects.progress": { "system-owner": F, admin: F, "team-lead": L, "team-member": V },
  "projects.productsDetail": { "system-owner": F, admin: F, "team-lead": L, "team-member": L },
  "projects.experientialLearning": { "system-owner": F, admin: F, "team-lead": L, "team-member": L },
  "projects.ventureStudios": { "system-owner": F, admin: F, "team-lead": L, "team-member": L },
  "projects.management": { "system-owner": F, admin: F, "team-lead": F, "team-member": N },
  "projects.campaignsMarketing": { "system-owner": F, admin: F, "team-lead": L, "team-member": L },
  "projects.milestones": { "system-owner": F, admin: F, "team-lead": L, "team-member": L },
  "projects.performanceMetrics": { "system-owner": F, admin: F, "team-lead": L, "team-member": N },
  "projects.budgetInvestor": { "system-owner": F, admin: F, "team-lead": L, "team-member": N },
  "projects.openActionItems": { "system-owner": F, admin: F, "team-lead": F, "team-member": L },

  "tasks.companyWide": { "system-owner": F, admin: F, "team-lead": F, "team-member": F },
  "tasks.teamWide": { "system-owner": F, admin: F, "team-lead": F, "team-member": F },
  "tasks.perMember": { "system-owner": F, admin: F, "team-lead": F, "team-member": F },

  "onboarding.allInternsProgress": { "system-owner": F, admin: F, "team-lead": F, "team-member": N },
  "onboarding.selectedIntern": { "system-owner": F, admin: V, "team-lead": V, "team-member": F },
  "onboarding.masterclass": { "system-owner": F, admin: F, "team-lead": F, "team-member": V },

  "timer.personal": { "system-owner": F, admin: F, "team-lead": F, "team-member": F },
  "timer.teamView": { "system-owner": F, admin: V, "team-lead": V, "team-member": N },
  "calendar.teamView": { "system-owner": F, admin: V, "team-lead": V, "team-member": N },
  "calendar.personal": { "system-owner": F, admin: V, "team-lead": V, "team-member": V },

  "meetings.teamEdit": { "system-owner": F, admin: F, "team-lead": F, "team-member": N },
  "meetings.buddyEdit": { "system-owner": F, admin: F, "team-lead": F, "team-member": F },
  "meetings.join": { "system-owner": F, admin: F, "team-lead": F, "team-member": F },
  "meetings.teamNotes": { "system-owner": F, admin: F, "team-lead": F, "team-member": V },
  "meetings.personalNotes": { "system-owner": F, admin: F, "team-lead": F, "team-member": F },

  "communication.chat": { "system-owner": F, admin: F, "team-lead": F, "team-member": F },
  "communication.roomSearch": { "system-owner": F, admin: F, "team-lead": F, "team-member": V },
  "communication.executiveLinks": { "system-owner": F, admin: F, "team-lead": L, "team-member": N },
  "communication.floPodcast": { "system-owner": F, admin: F, "team-lead": L, "team-member": L },
  "communication.youtubeFlo": { "system-owner": F, admin: F, "team-lead": L, "team-member": L },

  "notifications.meetings": { "system-owner": V, admin: V, "team-lead": V, "team-member": V },
  "notifications.taskDeadlines": { "system-owner": V, admin: V, "team-lead": V, "team-member": V },
  "notifications.chat": { "system-owner": V, admin: V, "team-lead": V, "team-member": V },

  "qa.testing": { "system-owner": F, admin: F, "team-lead": L, "team-member": L },
  "qa.aiIntegration": { "system-owner": F, admin: F, "team-lead": L, "team-member": L },
  "qa.apiStatus": { "system-owner": F, admin: F, "team-lead": L, "team-member": N },

  "management.systemOwner": { "system-owner": F, admin: N, "team-lead": N, "team-member": N },
  "management.admin": { "system-owner": F, admin: F, "team-lead": N, "team-member": N },
  "management.leadership": { "system-owner": F, admin: F, "team-lead": L, "team-member": N },
  "management.internalOps": { "system-owner": F, admin: F, "team-lead": L, "team-member": N },
  "management.systemLogs": { "system-owner": F, admin: L, "team-lead": L, "team-member": N },

  "finance.funding": { "system-owner": F, admin: L, "team-lead": L, "team-member": N },
  "finance.invoices": { "system-owner": F, admin: L2, "team-lead": L2, "team-member": L2 },
  "finance.myPayments": { "system-owner": F, admin: F, "team-lead": F, "team-member": V },
  "finance.contracts": { "system-owner": F, admin: L, "team-lead": L, "team-member": N },
  "finance.affiliateDashboard": { "system-owner": F, admin: F, "team-lead": L, "team-member": L },
  "finance.commissions": { "system-owner": F, admin: F, "team-lead": L, "team-member": L },
  "finance.referrals": { "system-owner": F, admin: F, "team-lead": L, "team-member": L },
  "finance.leadConversion": { "system-owner": F, admin: F, "team-lead": L, "team-member": L },

  "floVault.viewDocuments": { "system-owner": F, admin: F, "team-lead": F, "team-member": V },
  "floVault.submitDocument": { "system-owner": F, admin: F, "team-lead": F, "team-member": F },
  "floVault.approveReject": { "system-owner": F, admin: F, "team-lead": F, "team-member": N },
  "floVault.shareApproved": { "system-owner": F, admin: F, "team-lead": F, "team-member": N },
  "floVault.viewArchived": { "system-owner": F, admin: F, "team-lead": F, "team-member": N },
  "floVault.archiveDocuments": { "system-owner": F, admin: F, "team-lead": F, "team-member": N },
  "floVault.manageStorage": { "system-owner": F, admin: L, "team-lead": N, "team-member": N },

  "custom.slot1": { "system-owner": T, admin: T, "team-lead": T, "team-member": T },
  "custom.slot2": { "system-owner": T, admin: T, "team-lead": T, "team-member": T },
  "custom.slot3": { "system-owner": T, admin: T, "team-lead": T, "team-member": T },
  "custom.slot4": { "system-owner": T, admin: T, "team-lead": T, "team-member": T },
  "custom.slot5": { "system-owner": T, admin: T, "team-lead": T, "team-member": T },
  "custom.publicA": { "system-owner": T, admin: T, "team-lead": T, "team-member": T },
  "custom.publicB": { "system-owner": T, admin: T, "team-lead": T, "team-member": T },
  "custom.publicC": { "system-owner": T, admin: T, "team-lead": T, "team-member": T },
};

const FINANCE_TOGGLE_PERMISSIONS: Partial<Record<AppPermission, FinanceFeatureToggle>> = {
  "finance.affiliateDashboard": "affiliateDashboard",
  "finance.commissions": "commissions",
  "finance.referrals": "referrals",
  "finance.leadConversion": "leadConversion",
};

export const ROLE_LABELS: Record<UserRole, string> = {
  "system-owner": "System Owner",
  admin: "Admin",
  "team-lead": "Team Lead / PM",
  "team-member": "Team Member",
};

export const ROLE_HIERARCHY: UserRole[] = ["system-owner", "admin", "team-lead", "team-member"];

export type AccessGrant = {
  permission: AppPermission;
  level: "full" | "view";
};

export type FinanceFeatureToggles = Partial<Record<FinanceFeatureToggle, boolean>>;

export type AccessContext = {
  role: UserRole;
  grants?: AccessGrant[];
  financeTier?: FinanceTier;
  financeToggles?: FinanceFeatureToggles;
};

export function normalizeRole(role: UserRole | LegacyUserRole | string): UserRole {
  if (role === "team-leader") return "team-lead";
  if (role === "executive") return "admin";
  if (role === "system-owner" || role === "admin" || role === "team-lead" || role === "team-member") {
    return role;
  }
  return "team-member";
}

function resolveDotAccess(tier: FinanceTier | undefined): AccessLevel {
  if (!tier) return "none";
  if (tier >= 3) return "full";
  return "view";
}

function resolveLimitedAccess(context: AccessContext, permission: AppPermission, base: BaseAccess): AccessLevel {
  const grant = context.grants?.find((g) => g.permission === permission);
  if (grant) return grant.level;

  const toggleKey = FINANCE_TOGGLE_PERMISSIONS[permission];
  if (toggleKey && context.financeToggles?.[toggleKey]) return "full";

  if (base === L2) return resolveDotAccess(context.financeTier);

  return "none";
}

export function getBaseAccess(role: UserRole | string, permission: AppPermission): AccessLevel {
  const normalized = normalizeRole(role);
  const base = permissionMatrix[permission]?.[normalized] ?? N;
  if (base === L2) return "limited";
  return base;
}

export function getAccess(context: AccessContext, permission: AppPermission): AccessLevel {
  const role = normalizeRole(context.role);
  const row = permissionMatrix[permission];
  if (!row) return N;

  const base = row[role];
  if (base === T) return T;
  if (base === N) return N;
  if (base === F || base === V) return base;
  if (base === L || base === L2) return resolveLimitedAccess(context, permission, base);

  return N;
}

export function canView(context: AccessContext, permission: AppPermission): boolean {
  const access = getAccess(context, permission);
  return access === "full" || access === "view";
}

export function canEdit(context: AccessContext, permission: AppPermission): boolean {
  const access = getAccess(context, permission);
  return access === "full";
}

export function isReadOnly(context: AccessContext, permission: AppPermission): boolean {
  const access = getAccess(context, permission);
  return access === "view" || (access === "limited" && !canEdit(context, permission));
}

/** @deprecated Use canView with AccessContext */
export function hasPermission(role: UserRole | string, permission: AppPermission): boolean {
  return canView({ role: normalizeRole(role) }, permission);
}

export function toAccessContext(user: {
  role: UserRole | LegacyUserRole | string;
  grants?: AccessGrant[];
  financeTier?: FinanceTier;
  financeToggles?: FinanceFeatureToggles;
}): AccessContext {
  return {
    role: normalizeRole(user.role),
    grants: user.grants,
    financeTier: user.financeTier,
    financeToggles: user.financeToggles,
  };
}

export function canGrantPermission(granter: AccessContext, permission: AppPermission, level: "full" | "view"): boolean {
  const granterAccess = getAccess(granter, permission);
  if (granterAccess === "none" || granterAccess === "tbd") return false;
  if (level === "full") return granterAccess === "full";
  return granterAccess === "full" || granterAccess === "view";
}
