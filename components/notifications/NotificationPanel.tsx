import type { NotificationItem } from "@/lib/services/contracts";

type NotificationPanelProps = {
  open: boolean;
  notifications: NotificationItem[];
};

export function NotificationPanel({ open, notifications }: NotificationPanelProps) {
  if (!open) return null;

  return (
    <aside className="absolute right-0 top-12 z-20 w-80 rounded-2xl border border-fuchsia-300/20 bg-white p-3 shadow-xl dark:bg-[#140824]">
      <h3 className="mb-2 text-sm font-semibold">Notifications</h3>
      <div className="space-y-2">
        {notifications.map((item) => (
          <div key={item.id} className="rounded-xl border border-fuchsia-200/30 p-2 text-xs dark:border-fuchsia-300/10">
            <p className="font-medium">{item.title}</p>
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">{item.body}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
