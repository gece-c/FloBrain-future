"use client";

import { DashboardTileGrid } from "@/components/dashboard/DashboardTileGrid";
import { useCurrentUser } from "@/components/auth/useCurrentUser";
import { ROLE_LABELS } from "@/lib/rbac/permissions";

export default function DashboardPage() {
  const user = useCurrentUser();

  return (
    <div className="space-y-4">
      <section className="bg-theme-panel border-subtle rounded-2xl border p-5">
        <h1 className="text-balance text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Welcome {user.name}. Role: <span className="font-medium">{ROLE_LABELS[user.role]}</span>
        </p>
      </section>

      <DashboardTileGrid user={user} />
    </div>
  );
}
