"use client";

import type { ReactNode } from "react";

import { PortalAuthGate } from "@/components/auth/PortalAuthGate";
import { PortalShell } from "@/components/layout/PortalShell";

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <PortalAuthGate>
      <PortalShell>{children}</PortalShell>
    </PortalAuthGate>
  );
}
