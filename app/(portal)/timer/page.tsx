import { AccessGate } from "@/components/rbac/AccessGate";
import { RoleGate } from "@/components/rbac/RoleGate";
import { PageShell } from "@/components/layout/PageShell";
import { getCurrentUser } from "@/lib/auth/demo-session.server";

export default async function TimerPage() {
  const user = await getCurrentUser();

  return (
    <AccessGate user={user} permission="timer.personal">
      <PageShell title="Detailed Time Tracker" description="Detailed session logs and tracked totals.">
        <div className="rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">
          Navbar timer is for quick start/stop. This page is for detailed history and reporting.
        </div>

        <RoleGate user={user} permission="timer.teamView">
          <div className="mt-3 rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">
            Team time tracking view (read-only for your role).
          </div>
        </RoleGate>
      </PageShell>
    </AccessGate>
  );
}
