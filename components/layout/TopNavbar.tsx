"use client";

import Link from "next/link";
import { Menu, Moon, Sun, UserCircle2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useMemo, useState } from "react";

import { DemoUserSwitcher } from "@/components/auth/DemoUserSwitcher";
import { Logo } from "@/components/layout/Logo";
import { navIconControl } from "@/components/layout/nav-controls";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { NotificationPanel } from "@/components/notifications/NotificationPanel";
import { PersistentTimer } from "@/components/timer/PersistentTimer";
import type { FloBrainUser } from "@/lib/services/contracts";
import { notificationService } from "@/lib/services/mock";

type TopNavbarProps = {
  user: FloBrainUser;
  onMenuClick?: () => void;
};

export function TopNavbar({ user, onMenuClick }: TopNavbarProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const notifications = useMemo(() => notificationService.getNotifications(), []);
  const unreadCount = notifications.filter((item) => item.unread).length;

  return (
    <header className="bg-theme-navbar/90 border-subtle sticky top-0 z-40 flex h-16 items-center justify-between border-b px-4 backdrop-blur-sm">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className={`${navIconControl} lg:hidden`}
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Menu className="h-4 w-4" />
        </button>
        <Link href="/dashboard" className="flex min-w-0 items-center gap-2.5 text-fuchsia-700 dark:text-fuchsia-300">
          <Logo className="h-7 w-7 shrink-0" />
          <span className="text-balance truncate text-base font-bold tracking-tight">FloBrain</span>
        </Link>
      </div>

      <div className="relative flex h-10 items-center gap-2">
        <button
          className={navIconControl}
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          <Sun className="hidden h-4 w-4 dark:block" />
          <Moon className="h-4 w-4 dark:hidden" />
        </button>
        <NotificationBell unreadCount={unreadCount} onClick={() => setOpen((v) => !v)} />
        <NotificationPanel open={open} notifications={notifications} onNotificationClick={() => setOpen(false)} />
        <PersistentTimer />
        <DemoUserSwitcher user={user} />
        <Link href="/profile" className={navIconControl} aria-label="Profile">
          <UserCircle2 className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}
