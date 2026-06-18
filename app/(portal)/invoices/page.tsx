"use client";

import { AccessGate } from "@/components/rbac/AccessGate";
import { PageShell } from "@/components/layout/PageShell";
import { useCurrentUser } from "@/components/auth/useCurrentUser";

export default function InvoicesPage() {
  const user = useCurrentUser();

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
