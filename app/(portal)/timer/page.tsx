import { PageShell } from "@/components/layout/PageShell";

export default function TimerPage() {
  return (
    <PageShell title="Detailed Time Tracker" description="Detailed session logs and tracked totals.">
      <div className="rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">
        Navbar timer is for quick start/stop. This page is for detailed history and reporting.
      </div>
    </PageShell>
  );
}
