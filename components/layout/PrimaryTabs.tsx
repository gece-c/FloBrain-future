"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const primaryTabs = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Chat Rooms", href: "/chatrooms" },
  { label: "AI Chat", href: "/ai-chat" },
];

export function PrimaryTabs() {
  const pathname = usePathname();

  return (
    <nav className="mb-4 flex items-center gap-2">
      {primaryTabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-xl px-3 py-1.5 text-sm ${active ? "bg-fuchsia-600 text-white" : "border border-fuchsia-300/20 bg-white/70 hover:bg-fuchsia-100 dark:bg-[#140824] dark:hover:bg-[#251237]"}`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
