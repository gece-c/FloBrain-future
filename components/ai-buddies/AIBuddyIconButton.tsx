import type { ReactNode } from "react";

type AIBuddyIconButtonProps = {
  label: string;
  icon: ReactNode;
};

export function AIBuddyIconButton({ label, icon }: AIBuddyIconButtonProps) {
  return (
    <button
      className="rounded-xl border border-fuchsia-300/30 bg-white/80 p-2 text-fuchsia-700 transition hover:bg-fuchsia-100 dark:border-fuchsia-300/20 dark:bg-[#1b0c2d] dark:text-fuchsia-300 dark:hover:bg-[#2a1142]"
      aria-label={label}
      title={label}
    >
      {icon}
    </button>
  );
}
