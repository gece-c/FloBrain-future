import Link from "next/link";
import type { ReactNode } from "react";

type AIBuddyIconButtonProps = {
  label: string;
  icon: ReactNode;
  href?: string;
};

export function AIBuddyIconButton({ label, icon, href }: AIBuddyIconButtonProps) {
  const className =
    "rounded-xl border border-fuchsia-300/30 bg-theme-panel/85 p-2 text-fuchsia-700 transition hover:bg-fuchsia-100 dark:border-fuchsia-300/20 dark:bg-theme-elevated dark:text-fuchsia-300 dark:hover:bg-theme-muted";

  if (href) {
    return (
      <Link href={href} className={className} aria-label={label} title={label}>
        {icon}
      </Link>
    );
  }

  return (
    <button type="button" className={className} aria-label={label} title={label}>
      {icon}
    </button>
  );
}
