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
    <nav className="mb-4 flex flex-wrap items-center gap-2">
      {primaryTabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-xl px-3 py-1.5 text-sm ${
              active
                ? "bg-fuchsia-600 text-white"
                : "bg-interactive border-subtle border hover:bg-interactive-hover"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
