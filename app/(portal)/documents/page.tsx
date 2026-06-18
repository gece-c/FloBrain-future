"use client";

import { AccessGate } from "@/components/rbac/AccessGate";
import { RoleGate } from "@/components/rbac/RoleGate";
import { PageShell } from "@/components/layout/PageShell";
import { useCurrentUser } from "@/components/auth/useCurrentUser";
import { documentsService } from "@/lib/services/mock";

export default function DocumentsPage() {
  const user = useCurrentUser();
  const docs = documentsService.getDocuments();

  return (
    <AccessGate user={user} permission="floVault.viewDocuments">
      <PageShell title="FloVault" description="Confidential documents hosted in external storage. View up-to-date docs; submit for approval.">
        <RoleGate user={user} permission="floVault.submitDocument" minLevel="full">
          <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">You can submit documents for approval from Workspace.</p>
        </RoleGate>

        <div className="space-y-2">
          {docs.map((doc) => (
            <div key={doc.id} className="rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">
              <p className="font-medium">{doc.name}</p>
              <p className="text-xs text-zinc-500">
                Source: {doc.source === "link" ? "Link" : "Upload"} | Approved: {doc.approved ? "Yes" : "No"} | Up-to-date:{" "}
                {doc.upToDate ? "Yes" : "No"}
              </p>
            </div>
          ))}
        </div>

        <RoleGate user={user} permission="floVault.approveReject" minLevel="full">
          <p className="mt-4 text-xs text-zinc-500">Approve/reject controls available for your role.</p>
        </RoleGate>

        <RoleGate user={user} permission="floVault.viewArchived" minLevel="view">
          <p className="mt-2 text-xs text-zinc-500">Archived documents section available.</p>
        </RoleGate>
      </PageShell>
    </AccessGate>
  );
}
