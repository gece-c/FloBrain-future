"use client";

import { Bell } from "lucide-react";

type NotificationBellProps = {
  unreadCount: number;
  onClick: () => void;
};

export function NotificationBell({ unreadCount, onClick }: NotificationBellProps) {
  return (
    <button
      onClick={onClick}
      className="relative rounded-xl border border-fuchsia-300/30 bg-white/70 p-2 dark:border-fuchsia-300/20 dark:bg-[#1b0c2d]"
      aria-label="Open notifications"
    >
      <Bell className="h-4 w-4" />
      {unreadCount > 0 ? (
        <span className="absolute -right-1 -top-1 rounded-full bg-fuchsia-600 px-1.5 text-[10px] text-white">{unreadCount}</span>
      ) : null}
    </button>
  );
}
