export type UserRole = "team-member" | "team-leader" | "executive";

export type AppPermission =
  | "view.invoices"
  | "view.executive"
  | "view.teamManagement";

const rolePermissions: Record<UserRole, AppPermission[]> = {
  "team-member": [],
  "team-leader": ["view.teamManagement"],
  executive: ["view.teamManagement", "view.invoices", "view.executive"],
};

export function hasPermission(role: UserRole, permission: AppPermission): boolean {
  return rolePermissions[role].includes(permission);
}
