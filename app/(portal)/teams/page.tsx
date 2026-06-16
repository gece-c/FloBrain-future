import Link from "next/link";

import { AccessGate } from "@/components/rbac/AccessGate";
import { RoleGate } from "@/components/rbac/RoleGate";
import { PageShell } from "@/components/layout/PageShell";
import { getCurrentUser } from "@/lib/auth/demo-session.server";
import { ROLE_LABELS, normalizeRole, type UserRole } from "@/lib/rbac/permissions";
import { getTeamDirectoryMembers } from "@/lib/demo/users";

const members = getTeamDirectoryMembers();

const roleFilterOptions: UserRole[] = ["system-owner", "admin", "team-lead", "team-member"];

export default async function TeamsPage() {
  const user = await getCurrentUser();

  return (
    <AccessGate user={user} permission="teams.directory">
      <PageShell title="Teams Directory" description="Search by name and filter by team or role.">
        <div className="mb-3 grid gap-2 sm:grid-cols-3">
          <input placeholder="Search by name" className="rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm" />
          <select className="rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm">
            <option>Filter by team</option>
            <option>Growth</option>
            <option>Design</option>
            <option>Management</option>
            <option>Executive</option>
          </select>
          <select className="rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm">
            <option>Filter by role</option>
            {roleFilterOptions.map((role) => (
              <option key={role} value={role}>
                {ROLE_LABELS[role]}
              </option>
            ))}
          </select>
        </div>

        <RoleGate user={user} permission="teams.management" minLevel="full">
          <div className="mb-3 rounded-xl border border-fuchsia-300/30 bg-fuchsia-500/5 p-3 text-sm dark:border-fuchsia-300/10">
            <p className="font-semibold">Team management</p>
            <p className="text-xs text-zinc-500">Member management, evaluations, and task delegation controls appear here.</p>
          </div>
        </RoleGate>

        <div className="space-y-2">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between rounded-xl border border-fuchsia-200/30 p-3 dark:border-fuchsia-300/10">
              <div>
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-zinc-500">
                  {member.team} | {ROLE_LABELS[normalizeRole(member.role)]}
                </p>
              </div>
              <Link href={`/chatrooms/direct/${member.id}`} className="rounded-lg bg-fuchsia-600 px-2 py-1 text-xs text-white">
                1:1 Chat
              </Link>
            </div>
          ))}
        </div>
      </PageShell>
    </AccessGate>
  );
}
