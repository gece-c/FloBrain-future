"use client";

import { useState } from "react";

type MeetingReminderToastProps = {
  title: string;
  body: string;
};

export function MeetingReminderToast({ title, body }: MeetingReminderToastProps) {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 w-80 rounded-2xl border border-fuchsia-300/30 bg-white p-3 shadow-lg dark:bg-[#150826]">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{body}</p>
      <div className="mt-3 flex gap-2 text-xs">
        <button className="rounded bg-fuchsia-600 px-2 py-1 text-white">Join</button>
        <button className="rounded border border-fuchsia-300/40 px-2 py-1">Snooze</button>
        <button className="rounded border border-fuchsia-300/40 px-2 py-1" onClick={() => setOpen(false)}>
          Dismiss
        </button>
      </div>
    </div>
  );
}
