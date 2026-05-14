"use client";

import Link from "next/link";
import { Moon, Sun, UserCircle2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useMemo, useState } from "react";

import { NotificationBell } from "@/components/notifications/NotificationBell";
import { NotificationPanel } from "@/components/notifications/NotificationPanel";
import { PersistentTimer } from "@/components/timer/PersistentTimer";
import { notificationService } from "@/lib/services/mock";

export function TopNavbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const notifications = useMemo(() => notificationService.getNotifications(), []);
  const unreadCount = notifications.filter((item) => item.unread).length;

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-fuchsia-300/20 bg-white/80 px-4 py-3 backdrop-blur dark:bg-[#0e091ae6]">
      <p className="text-base font-bold tracking-tight text-fuchsia-700 dark:text-fuchsia-300">FloBrain</p>

      <div className="relative flex items-center gap-2">
        <button
          className="rounded-xl border border-fuchsia-300/30 bg-white/70 p-2 dark:border-fuchsia-300/20 dark:bg-[#1b0c2d]"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          <Sun className="hidden h-4 w-4 dark:block" />
          <Moon className="h-4 w-4 dark:hidden" />
        </button>
        <NotificationBell unreadCount={unreadCount} onClick={() => setOpen((v) => !v)} />
        <NotificationPanel open={open} notifications={notifications} />
        <PersistentTimer />
        <Link href="/profile" className="rounded-xl border border-fuchsia-300/30 bg-white/70 p-2 dark:border-fuchsia-300/20 dark:bg-[#1b0c2d]" aria-label="Profile">
          <UserCircle2 className="h-5 w-5" />
        </Link>
      </div>
    </header>
  );
}
