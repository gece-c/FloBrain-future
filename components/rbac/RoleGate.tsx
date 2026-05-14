import type { ReactNode } from "react";

import { hasPermission, type AppPermission, type UserRole } from "@/lib/rbac/permissions";

type RoleGateProps = {
  role: UserRole;
  permission: AppPermission;
  children: ReactNode;
};

export function RoleGate({ role, permission, children }: RoleGateProps) {
  if (!hasPermission(role, permission)) return null;
  return <>{children}</>;
}
