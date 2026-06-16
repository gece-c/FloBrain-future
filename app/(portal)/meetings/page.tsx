import Link from "next/link";

import { AccessGate } from "@/components/rbac/AccessGate";
import { RoleGate } from "@/components/rbac/RoleGate";
import { PageShell } from "@/components/layout/PageShell";
import { getCurrentUser } from "@/lib/auth/demo-session.server";

const sections = [
  { label: "Meeting Links", href: "/meetings/links" },
  { label: "Meeting Recordings", href: "/meetings/recordings" },
  { label: "Meeting Notes", href: "/meetings/notes", permission: "meetings.teamNotes" as const },
];

export default async function MeetingsPage() {
  const user = await getCurrentUser();

  return (
    <AccessGate user={user} permission="meetings.join">
      <PageShell title="Meetings" description="Access links, recordings and note pages.">
        <RoleGate user={user} permission="meetings.teamEdit" minLevel="full">
          <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">You can add and edit team meetings.</p>
        </RoleGate>

        <div className="grid gap-2 sm:grid-cols-3">
          {sections.map((section) => {
            const link = (
              <Link key={section.href} href={section.href} className="rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">
                {section.label}
              </Link>
            );
            if (section.permission) {
              return (
                <RoleGate key={section.href} user={user} permission={section.permission}>
                  {link}
                </RoleGate>
              );
            }
            return link;
          })}
        </div>
      </PageShell>
    </AccessGate>
  );
}
