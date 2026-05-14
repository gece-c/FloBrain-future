import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";

const members = [
  { id: "u-1", name: "Aylin Kaya", role: "team-leader", team: "Growth" },
  { id: "u-2", name: "Deniz Aras", role: "team-member", team: "Design" },
  { id: "u-3", name: "Mert Demir", role: "executive", team: "Management" },
];

export default function TeamsPage() {
  return (
    <PageShell title="Teams Directory" description="Search by name and filter by team or role.">
      <div className="mb-3 grid gap-2 sm:grid-cols-3">
        <input placeholder="Search by name" className="rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm" />
        <select className="rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm">
          <option>Filter by team</option>
          <option>Growth</option>
          <option>Design</option>
          <option>Management</option>
        </select>
        <select className="rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm">
          <option>Filter by role</option>
          <option>team-member</option>
          <option>team-leader</option>
          <option>executive</option>
        </select>
      </div>
      <div className="space-y-2">
        {members.map((member) => (
          <div key={member.id} className="flex items-center justify-between rounded-xl border border-fuchsia-200/30 p-3 dark:border-fuchsia-300/10">
            <div>
              <p className="text-sm font-medium">{member.name}</p>
              <p className="text-xs text-zinc-500">{member.team} | {member.role}</p>
            </div>
            <Link href={`/chatrooms/direct/${member.id}`} className="rounded-lg bg-fuchsia-600 px-2 py-1 text-xs text-white">
              1:1 Chat
            </Link>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
