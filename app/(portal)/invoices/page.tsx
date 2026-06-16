import { AccessGate } from "@/components/rbac/AccessGate";
import { PageShell } from "@/components/layout/PageShell";
import { getCurrentUser } from "@/lib/auth/demo-session.server";

export default async function InvoicesPage() {
  const user = await getCurrentUser();
  return (
    <AccessGate user={user} permission="finance.invoices">
      <PageShell title="Invoices / Payments" description="Finance visibility based on your role and tier.">
        <div className="rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">
          Billing and payouts module placeholder.
        </div>
      </PageShell>
    </AccessGate>
  );
}
