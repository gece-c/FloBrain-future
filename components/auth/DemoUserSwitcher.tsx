"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ChevronDown, Users } from "lucide-react";

import { navTextControl } from "@/components/layout/nav-controls";
import { setDemoUser } from "@/app/actions/demo-auth";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { notifyDemoUserChanged } from "@/components/auth/useCurrentUser";
import { demoUserPersonas, roleAccent } from "@/lib/demo/users";
import { getDemoUserIdClient } from "@/lib/auth/demo-session.client";
import { ROLE_LABELS } from "@/lib/rbac/permissions";
import type { FloBrainUser } from "@/lib/services/contracts";

type DemoUserSwitcherProps = {
  user: FloBrainUser;
};

export function DemoUserSwitcher({ user }: DemoUserSwitcherProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const activeDemoId = getDemoUserIdClient();

  const switchUser = (demoId: string) => {
    if (demoId === activeDemoId) {
      setOpen(false);
      return;
    }
    startTransition(async () => {
      await setDemoUser(demoId);
      notifyDemoUserChanged();
      router.refresh();
      setOpen(false);
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={pending}
        className={`${navTextControl} max-w-[11rem] justify-start gap-1.5 px-2.5 text-left font-normal`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Users className="h-3.5 w-3.5 shrink-0 text-fuchsia-600 dark:text-fuchsia-300" />
        <span className="min-w-0 truncate leading-none">
          <span className="block truncate text-xs font-medium">{user.name}</span>
          <span className="mt-0.5 block truncate text-[10px] font-normal text-zinc-500">{ROLE_LABELS[user.role]}</span>
        </span>
        <ChevronDown className="ml-auto h-3.5 w-3.5 shrink-0 opacity-60" />
      </button>

      {open ? (
        <>
          <button type="button" className="fixed inset-0 z-30 cursor-default" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-40 mt-1 w-72 rounded-xl border border-fuchsia-200/40 bg-theme-panel p-2 shadow-xl dark:border-fuchsia-300/15 dark:bg-theme-panel">
            <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">Switch demo persona</p>
            <ul className="max-h-64 space-y-1 overflow-y-auto" role="listbox">
              {demoUserPersonas.map((persona) => {
                const active = persona.demoId === activeDemoId;
                return (
                  <li key={persona.demoId}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      disabled={pending}
                      onClick={() => switchUser(persona.demoId)}
                      className={`w-full rounded-lg border px-2.5 py-2 text-left text-xs transition ${active ? roleAccent(persona.role) : "border-transparent hover:bg-fuchsia-500/5"}`}
                    >
                      <p className="font-medium">{persona.name}</p>
                      <p className="text-[10px] text-zinc-500">{persona.demoLabel}</p>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-2 border-t border-fuchsia-200/40 pt-2 dark:border-fuchsia-300/10">
              <SignOutButton variant="menu" />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
