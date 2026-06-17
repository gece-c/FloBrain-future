import type { ReactNode } from "react";

import { PortalShell } from "@/components/layout/PortalShell";
import { getCurrentUser } from "@/lib/auth/demo-session.server";

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  return <PortalShell user={user}>{children}</PortalShell>;
}
