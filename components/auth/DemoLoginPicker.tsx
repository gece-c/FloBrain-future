"use client";

import { useTransition } from "react";

import { loginAsDemoUser } from "@/lib/auth/demo-auth.client";
import { demoUserPersonas, roleAccent } from "@/lib/demo/users";
import { ROLE_LABELS } from "@/lib/rbac/permissions";

export function DemoLoginPicker() {
  const [pending, startTransition] = useTransition();

  const handleLogin = (demoId: string) => {
    startTransition(() => {
      loginAsDemoUser(demoId);
    });
  };

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-fuchsia-700/80 dark:text-fuchsia-300/80">Demo access</p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Choose a persona to preview that role&apos;s permissions.</p>
      </div>

      <div className="space-y-2">
        {demoUserPersonas.map((persona) => (
          <button
            key={persona.demoId}
            type="button"
            disabled={pending}
            onClick={() => handleLogin(persona.demoId)}
            className={`w-full rounded-xl border p-3 text-left transition hover:brightness-95 disabled:opacity-60 ${roleAccent(persona.role)}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold">{persona.name}</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">{persona.demoLabel}</p>
              </div>
              <span className="shrink-0 rounded-md bg-theme-panel/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide dark:bg-black/20">
                {ROLE_LABELS[persona.role]}
              </span>
            </div>
            <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">{persona.demoDescription}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
