"use client";

import Link from "next/link";
import { Briefcase, Database, HelpCircle, Palette, PanelLeftClose, PanelLeftOpen, Rocket, Settings } from "lucide-react";
import { useState } from "react";

const bottomLinks = [
  { href: "/help", label: "Help", icon: HelpCircle },
  { href: "/settings", label: "Settings", icon: Settings },
];

const aiBuddies = [
  { label: "Legal Buddy", icon: Briefcase },
  { label: "Data Buddy", icon: Database },
  { label: "Space Buddy", icon: Rocket },
  { label: "Design Buddy", icon: Palette },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`sticky top-0 flex h-screen flex-col border-r border-fuchsia-300/20 bg-white/70 p-3 transition-all dark:bg-[#120720] ${
        collapsed ? "w-20" : "w-56"
      }`}
    >
      <div
        className={`mb-4 flex items-center rounded-xl bg-fuchsia-600 px-3 py-2 text-sm font-semibold text-white ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        <span className={collapsed ? "hidden" : "block"}>Tools</span>
        <button
          type="button"
          className="rounded p-1 hover:bg-white/20"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      <div className="space-y-2 border-t border-fuchsia-300/20 pt-3">
        <p className={`px-2 text-xs font-semibold uppercase tracking-wide text-fuchsia-700/80 dark:text-fuchsia-300/80 ${collapsed ? "hidden" : "block"}`}>
          AI Buddies
        </p>
        <div className="space-y-1">
          {aiBuddies.map((buddy) => {
            const Icon = buddy.icon;
            return (
              <button
                key={buddy.label}
                type="button"
                className={`flex w-full items-center rounded-lg border border-fuchsia-300/30 bg-white/80 px-3 py-2 text-sm text-fuchsia-700 transition hover:bg-fuchsia-100 dark:border-fuchsia-300/20 dark:bg-[#1b0c2d] dark:text-fuchsia-300 dark:hover:bg-[#2a1142] ${
                  collapsed ? "justify-center" : "gap-2"
                }`}
                aria-label={buddy.label}
                title={buddy.label}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className={collapsed ? "hidden" : "inline"}>{buddy.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-auto space-y-1 border-t border-fuchsia-300/20 pt-3">
        {bottomLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-fuchsia-100 dark:text-zinc-200 dark:hover:bg-[#28123f] ${
                collapsed ? "justify-center" : "gap-2"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className={collapsed ? "hidden" : "inline"}>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
