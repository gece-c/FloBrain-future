import { PageShell } from "@/components/layout/PageShell";

export default function SettingsPage() {
  return (
    <PageShell title="Settings" description="Personal preferences and workspace settings.">
      <div className="rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">
        Settings placeholder for profile, preferences, and notification controls.
      </div>
    </PageShell>
  );
}
