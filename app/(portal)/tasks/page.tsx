import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";
import { taskService } from "@/lib/services/mock";

export default function TasksPage() {
  const tasks = taskService.getAllTasks();

  return (
    <PageShell title="Tasks" description="All tasks view across teams. Add new tasks from Workspace only.">
      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">
            <p className="font-medium">{task.title}</p>
            <p className="text-xs text-zinc-500">{task.teams.join(", ")} | {task.project} | {task.status}</p>
            <Link href={`/tasks/${task.id}`} className="mt-2 inline-block rounded-lg border border-fuchsia-300/40 px-2 py-1 text-xs">
              Open task page
            </Link>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
