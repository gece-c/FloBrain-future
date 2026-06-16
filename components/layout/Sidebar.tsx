"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HelpCircle, PanelLeftClose, PanelLeftOpen, Settings, X } from "lucide-react";
import { useState } from "react";

import { SignOutButton } from "@/components/auth/SignOutButton";
import { aiBuddies } from "@/lib/ai-buddies/data";

const bottomLinks = [
  { href: "/help", label: "Help", icon: HelpCircle },
  { href: "/settings", label: "Settings", icon: Settings },
];

type SidebarProps = {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
};

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const asideClass = [
    "bg-theme-sidebar border-subtle flex h-screen flex-col border-r p-3 transition-all",
    collapsed ? "w-20" : "w-56",
    "fixed inset-y-0 left-0 z-40 lg:static lg:sticky lg:top-0 lg:z-auto",
    mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
  ].join(" ");

  return (
    <aside className={asideClass} aria-hidden={!mobileOpen ? undefined : false}>
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <span className="text-sm font-semibold text-fuchsia-700 dark:text-fuchsia-300">Menu</span>
        <button
          type="button"
          className="bg-interactive border-subtle rounded-lg border p-2"
          onClick={onMobileClose}
          aria-label="Close navigation menu"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div
        className={`mb-4 flex items-center rounded-xl bg-fuchsia-600 px-3 py-2 text-sm font-semibold text-white ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        <span className={collapsed ? "hidden" : "block"}>Tools</span>
        <button
          type="button"
          className="hidden min-h-9 min-w-9 rounded p-1 hover:bg-white/20 lg:inline-flex lg:items-center lg:justify-center"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      <div className="border-subtle min-h-0 flex-1 space-y-2 overflow-y-auto border-t pt-3">
        <p
          className={`px-2 text-xs font-semibold tracking-wide text-fuchsia-700/80 uppercase dark:text-fuchsia-300/80 ${collapsed ? "hidden" : "block"}`}
        >
          AI Buddies
        </p>
        <div className="space-y-1 pb-2">
          {aiBuddies.map((buddy) => {
            const Icon = buddy.icon;
            const active = "href" in buddy && buddy.href === pathname;
            const className = `flex w-full items-center rounded-lg border px-3 py-2 text-sm transition ${
              collapsed ? "justify-center" : "gap-2"
            } ${
              active
                ? "border-fuchsia-500 bg-fuchsia-600 text-white"
                : "border-subtle bg-interactive text-fuchsia-700 hover:bg-interactive-hover dark:text-fuchsia-300"
            }`;

            if ("href" in buddy && buddy.href) {
              return (
                <Link
                  key={buddy.label}
                  href={buddy.href}
                  className={className}
                  aria-label={buddy.label}
                  title={buddy.label}
                  onClick={onMobileClose}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className={collapsed ? "hidden" : "inline"}>{buddy.label}</span>
                </Link>
              );
            }

            return (
              <button key={buddy.label} type="button" className={className} aria-label={buddy.label} title={buddy.label}>
                <Icon className="h-4 w-4 shrink-0" />
                <span className={collapsed ? "hidden" : "inline"}>{buddy.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-subtle mt-auto space-y-1 border-t pt-3">
        {bottomLinks.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center rounded-lg px-3 py-2 text-sm transition ${
                collapsed ? "justify-center" : "gap-2"
              } ${
                active
                  ? "bg-fuchsia-100 font-medium text-fuchsia-900 dark:bg-fuchsia-900/30 dark:text-fuchsia-100"
                  : "text-zinc-700 hover:bg-interactive-hover dark:text-zinc-200"
              }`}
              onClick={onMobileClose}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className={collapsed ? "hidden" : "inline"}>{link.label}</span>
            </Link>
          );
        })}
        <SignOutButton
          variant="sidebar"
          className={collapsed ? "justify-center px-2" : "gap-2"}
          showIcon
          label={collapsed ? "" : "Sign out"}
        />
      </div>
    </aside>
  );
}
