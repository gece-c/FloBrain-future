import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";

const rooms = ["General", "Announcements", "Design", "Growth", "Engineering"];

export default function ChatRoomsPage() {
  return (
    <PageShell title="Chat Rooms" description="Immediate messaging access from the main tab.">
      <div className="grid gap-2 sm:grid-cols-2">
        {rooms.map((room) => (
          <div key={room} className="rounded-xl border border-fuchsia-200/30 p-3 dark:border-fuchsia-300/10">
            <p className="font-medium">{room}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Link href="/chatrooms/direct/u-2" className="rounded-lg bg-fuchsia-600 px-3 py-2 text-sm text-white">
          Open sample 1:1 chat
        </Link>
      </div>
    </PageShell>
  );
}
