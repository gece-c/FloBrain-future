import type { ReactNode } from "react";

const TASK_IDS = ["t-1", "t-2", "t-3"];

export function generateStaticParams() {
  return TASK_IDS.map((taskId) => ({ taskId }));
}

export default function TaskDetailLayout({ children }: { children: ReactNode }) {
  return children;
}
