import type { AppPermission } from "@/lib/rbac/permissions";

/** Maps portal routes to the primary permission required for access. */
export const routePermissions: Record<string, AppPermission> = {
  "/dashboard": "communication.chat",
  "/my-workspace": "onboarding.selectedIntern",
  "/workspace": "tasks.companyWide",
  "/tasks": "tasks.companyWide",
  "/documents": "floVault.viewDocuments",
  "/meetings": "meetings.join",
  "/meetings/links": "meetings.join",
  "/meetings/recordings": "meetings.join",
  "/meetings/notes": "meetings.teamNotes",
  "/timer": "timer.personal",
  "/chatrooms": "communication.chat",
  "/ai-chat": "qa.aiIntegration",
  "/teams": "teams.directory",
  "/executive": "projects.progress",
  "/invoices": "finance.invoices",
  "/profile": "communication.chat",
  "/settings": "communication.chat",
  "/help": "communication.chat",
};

export function permissionForRoute(pathname: string): AppPermission | undefined {
  if (routePermissions[pathname]) return routePermissions[pathname];

  if (pathname.startsWith("/tasks/")) return "tasks.perMember";
  if (pathname.startsWith("/chatrooms/direct/")) return "communication.chat";

  return undefined;
}
