import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";

const sections = [
  { label: "Meeting Links", href: "/meetings/links" },
  { label: "Meeting Recordings", href: "/meetings/recordings" },
  { label: "Meeting Notes", href: "/meetings/notes" },
];

export default function MeetingsPage() {
  return (
    <PageShell title="Meetings" description="Access links, recordings and note pages.">
      <div className="grid gap-2 sm:grid-cols-3">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className="rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">
            {section.label}
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
