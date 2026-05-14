import { PageShell } from "@/components/layout/PageShell";
import { RoleGate } from "@/components/rbac/RoleGate";
import { authService } from "@/lib/services/mock";

export default function InvoicesPage() {
  const user = authService.getCurrentUser();
  return (
    <RoleGate role={user.role} permission="view.invoices">
      <PageShell title="Invoices / Payments" description="Executive-only finance visibility.">
        <div className="rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">
          Billing and payouts module placeholder.
        </div>
      </PageShell>
    </RoleGate>
  );
}
