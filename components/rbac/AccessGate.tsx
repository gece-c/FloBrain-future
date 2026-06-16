import type { ReactNode } from "react";

import { AccessDenied } from "@/components/rbac/AccessDenied";
import { RoleGate } from "@/components/rbac/RoleGate";
import type { AppPermission } from "@/lib/rbac/permissions";
import type { FloBrainUser } from "@/lib/services/contracts";

type AccessGateProps = {
  user: FloBrainUser;
  permission: AppPermission;
  minLevel?: "view" | "full";
  children: ReactNode;
};

export function AccessGate({ user, permission, minLevel = "view", children }: AccessGateProps) {
  return (
    <RoleGate user={user} permission={permission} minLevel={minLevel} fallback={<AccessDenied />}>
      {children}
    </RoleGate>
  );
}
