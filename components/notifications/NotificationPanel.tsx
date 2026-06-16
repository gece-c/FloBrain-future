"use client";

import Link from "next/link";

import type { NotificationItem, NotificationType } from "@/lib/services/contracts";

type NotificationPanelProps = {
  open: boolean;
  notifications: NotificationItem[];
  onNotificationClick?: () => void;
};

const ACTION_LABELS: Record<NotificationType, string> = {
  meeting: "Open meeting",
  task: "View task",
  chat: "Open chat",
  document: "View document",
  general: "View",
};

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function NotificationEntry({
  item,
  onNotificationClick,
}: {
  item: NotificationItem;
  onNotificationClick?: () => void;
}) {
  const content = (
    <>
      <p className="font-medium">{item.title}</p>
      <p className="mt-1 text-zinc-600 dark:text-zinc-400">{item.body}</p>
      <p className="mt-1 text-[10px] font-medium text-fuchsia-600 dark:text-fuchsia-300">
        {ACTION_LABELS[item.type]}
      </p>
    </>
  );

  const className =
    "block rounded-xl border border-fuchsia-200/30 p-2 text-xs transition hover:border-fuchsia-300/50 hover:bg-fuchsia-50/70 dark:border-fuchsia-300/10 dark:hover:bg-fuchsia-950/30";

  if (isExternalHref(item.href)) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNotificationClick}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className} onClick={onNotificationClick}>
      {content}
    </Link>
  );
}

export function NotificationPanel({ open, notifications, onNotificationClick }: NotificationPanelProps) {
  if (!open) return null;

  return (
    <aside className="absolute right-0 top-12 z-20 w-80 rounded-2xl border border-fuchsia-300/20 bg-theme-panel p-3 shadow-xl dark:bg-theme-panel">
      <h3 className="mb-2 text-sm font-semibold">Notifications</h3>
      <div className="space-y-2">
        {notifications.map((item) => (
          <NotificationEntry key={item.id} item={item} onNotificationClick={onNotificationClick} />
        ))}
      </div>
    </aside>
  );
}
