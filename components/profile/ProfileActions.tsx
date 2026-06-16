"use client";

import Link from "next/link";
import { Settings } from "lucide-react";

import { SignOutButton } from "@/components/auth/SignOutButton";

export function ProfileActions() {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <Link
        href="/settings"
        className="inline-flex items-center gap-2 rounded-xl border border-fuchsia-200/50 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-fuchsia-50 dark:border-fuchsia-300/15 dark:text-zinc-200 dark:hover:bg-theme-hover"
      >
        <Settings className="h-4 w-4" />
        Account settings
      </Link>
      <SignOutButton variant="danger" />
    </div>
  );
}
