"use client";

import { PageShell } from "@/components/layout/PageShell";
import { useCurrentUser } from "@/components/auth/useCurrentUser";
import { taskService } from "@/lib/services/mock";

export default function MyWorkspacePage() {
  const user = useCurrentUser();
  const myTasks = taskService.getAllTasks().filter((task) => task.assigneeId === user.id);

  return (
    <div className="space-y-4">
      <PageShell title="My Workspace" description="Personal productivity hub.">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-fuchsia-200/30 p-3 dark:border-fuchsia-300/10">
            <p className="font-medium">My Tasks</p>
            <p className="text-xs text-zinc-500">{myTasks.length} assigned to you</p>
          </div>
          <div className="rounded-xl border border-fuchsia-200/30 p-3 dark:border-fuchsia-300/10">
            <p className="font-medium">Onboarding Progress</p>
            <p className="text-xs text-zinc-500">6 of 9 steps complete</p>
          </div>
          <div className="rounded-xl border border-fuchsia-200/30 p-3 dark:border-fuchsia-300/10">
            <p className="font-medium">Masterclasses</p>
            <p className="text-xs text-zinc-500">2 active learning paths</p>
          </div>
          <div className="rounded-xl border border-fuchsia-200/30 p-3 dark:border-fuchsia-300/10">
            <p className="font-medium">Brainwritings</p>
            <p className="text-xs text-zinc-500">Personal notes and idea drafts</p>
          </div>
          <div className="rounded-xl border border-fuchsia-200/30 p-3 dark:border-fuchsia-300/10">
            <p className="font-medium">Detailed Time Tracker</p>
            <p className="text-xs text-zinc-500">Daily totals and task logs</p>
          </div>
        </div>
      </PageShell>
    </div>
  );
}
