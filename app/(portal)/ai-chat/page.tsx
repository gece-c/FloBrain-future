import { PageShell } from "@/components/layout/PageShell";

export default function AIChatPage() {
  return (
    <PageShell title="AI Chat" description="Top-level AI chat tab ready for backend integration.">
      <div className="rounded-xl border border-dashed border-fuchsia-300/40 p-4 text-sm text-zinc-600 dark:text-zinc-400">
        AI chat service is not connected yet. This page reserves the full shell and UX location.
      </div>
    </PageShell>
  );
}
