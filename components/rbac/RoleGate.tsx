import type { ReactNode } from "react";

import {
  getAccess,
  toAccessContext,
  type AccessContext,
  type AppPermission,
} from "@/lib/rbac/permissions";
import type { FloBrainUser } from "@/lib/services/contracts";

type RoleGateProps = {
  user: FloBrainUser | AccessContext;
  permission: AppPermission;
  /** Minimum access required. Defaults to "view". */
  minLevel?: "view" | "full";
  fallback?: ReactNode;
  children: ReactNode;
};

function resolveContext(user: FloBrainUser | AccessContext): AccessContext {
  if ("email" in user) return toAccessContext(user);
  return user;
}

export function RoleGate({ user, permission, minLevel = "view", fallback = null, children }: RoleGateProps) {
  const context = resolveContext(user);
  const access = getAccess(context, permission);

  if (minLevel === "full") {
    if (access !== "full") return <>{fallback}</>;
  } else if (access === "none" || access === "tbd") {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
