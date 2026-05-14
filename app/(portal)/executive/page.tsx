import { PageShell } from "@/components/layout/PageShell";
import { RoleGate } from "@/components/rbac/RoleGate";
import { authService } from "@/lib/services/mock";

export default function ExecutivePage() {
  const user = authService.getCurrentUser();
  return (
    <RoleGate role={user.role} permission="view.executive">
      <PageShell title="Executive Metrics" description="System status, project progress and performance metrics.">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">System status: Healthy</div>
          <div className="rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">Project completion: 68%</div>
          <div className="rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">Team velocity: +12%</div>
        </div>
      </PageShell>
    </RoleGate>
  );
}
