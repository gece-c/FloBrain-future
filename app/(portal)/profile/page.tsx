"use client";

import { PageShell } from "@/components/layout/PageShell";
import { ProfileActions } from "@/components/profile/ProfileActions";
import { useCurrentUser } from "@/components/auth/useCurrentUser";
import { getAccess, ROLE_LABELS, toAccessContext } from "@/lib/rbac/permissions";

export default function ProfilePage() {
  const user = useCurrentUser();
  const context = toAccessContext(user);

  return (
    <PageShell title="Profile" description="Your account and access information.">
      <div className="space-y-2 rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">
        <p>
          <span className="font-medium">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-medium">Role:</span> {ROLE_LABELS[user.role]}
        </p>
        <p>
          <span className="font-medium">Teams:</span> {user.teams.join(", ")}
        </p>
        {user.financeTier ? (
          <p>
            <span className="font-medium">Finance tier:</span> Tier {user.financeTier}
          </p>
        ) : null}
        {user.grants && user.grants.length > 0 ? (
          <div>
            <p className="font-medium">Individual access grants:</p>
            <ul className="mt-1 list-inside list-disc text-xs text-zinc-500">
              {user.grants.map((grant) => (
                <li key={grant.permission}>
                  {grant.permission} ({grant.level})
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="mt-4 rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">
        <p className="font-medium">Sample access levels</p>
        <ul className="mt-2 space-y-1 text-xs text-zinc-500">
          <li>Invoices: {getAccess(context, "finance.invoices")}</li>
          <li>Team management: {getAccess(context, "teams.management")}</li>
          <li>Executive metrics: {getAccess(context, "projects.progress")}</li>
          <li>FloVault approve: {getAccess(context, "floVault.approveReject")}</li>
        </ul>
      </div>

      <ProfileActions />
    </PageShell>
  );
}
