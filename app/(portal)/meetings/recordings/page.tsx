import { PageShell } from "@/components/layout/PageShell";

export default function MeetingRecordingsPage() {
  return (
    <PageShell title="Meeting Recordings" description="Recording library placeholder.">
      <div className="rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">No recordings connected yet.</div>
    </PageShell>
  );
}
