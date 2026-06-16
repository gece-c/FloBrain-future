"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { GridContainer } from "@/components/layout/GridContainer";
import { PrimaryTabs } from "@/components/layout/PrimaryTabs";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";
import type { FloBrainUser } from "@/lib/services/contracts";

type PortalShellProps = {
  user: FloBrainUser;
  children: ReactNode;
};

export function PortalShell({ user, children }: PortalShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background to-[var(--theme-gradient-end-light)] dark:from-background dark:to-[var(--theme-surface-dark)]">
      <Sidebar mobileOpen={mobileNavOpen} onMobileClose={() => setMobileNavOpen(false)} />
      <div className="relative flex min-h-screen min-w-0 flex-1 flex-col">
        <TopNavbar user={user} onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex flex-1 flex-col py-4 md:py-6">
          <GridContainer className="flex-1">
            <div className="col-span-full">
              <PrimaryTabs />
              {children}
            </div>
          </GridContainer>
        </main>
      </div>
      {mobileNavOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-label="Close navigation menu"
          onClick={() => setMobileNavOpen(false)}
        />
      ) : null}
    </div>
  );
}
