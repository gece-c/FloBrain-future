"use client";

import { LogOut } from "lucide-react";
import { useTransition } from "react";

import { logoutDemoUser } from "@/lib/auth/demo-auth.client";

type SignOutButtonProps = {
  variant?: "default" | "sidebar" | "danger" | "menu";
  className?: string;
  showIcon?: boolean;
  label?: string;
};

export function SignOutButton({
  variant = "default",
  className = "",
  showIcon = true,
  label = "Sign out",
}: SignOutButtonProps) {
  const [pending, startTransition] = useTransition();

  const variantClass =
    variant === "sidebar"
      ? "flex w-full items-center rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
      : variant === "menu"
        ? "flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
        : variant === "danger"
        ? "inline-flex items-center gap-2 rounded-xl border border-red-300/40 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 dark:border-red-400/20 dark:bg-red-950/20 dark:text-red-300 dark:hover:bg-red-950/40"
        : "inline-flex items-center gap-2 rounded-xl border border-fuchsia-200/50 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-fuchsia-50 dark:border-fuchsia-300/15 dark:text-zinc-200 dark:hover:bg-theme-hover";

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => logoutDemoUser())}
      className={`${variantClass} disabled:opacity-60 ${className}`}
      aria-label={label || "Sign out"}
    >
      {showIcon ? <LogOut className="h-4 w-4 shrink-0" /> : null}
      {label ? <span>{pending ? "Signing out…" : label}</span> : null}
    </button>
  );
}
