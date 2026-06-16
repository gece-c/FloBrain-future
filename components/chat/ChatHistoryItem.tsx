"use client";

import { MessageSquare, Trash2, X } from "lucide-react";
import { useState } from "react";

type ChatHistoryItemProps = {
  title: string;
  preview: string;
  active: boolean;
  onSelect: () => void;
  onDelete: () => void;
};

export function ChatHistoryItem({ title, preview, active, onSelect, onDelete }: ChatHistoryItemProps) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div
      className={`group relative rounded-xl transition ${
        active
          ? "bg-fuchsia-100 text-fuchsia-900 dark:bg-theme-muted dark:text-fuchsia-100"
          : "text-zinc-700 hover:bg-fuchsia-50/80 dark:text-zinc-300 dark:hover:bg-theme-hover"
      }`}
    >
      <button type="button" onClick={onSelect} className="w-full px-3 py-2.5 pr-9 text-left">
        <p className="flex items-center gap-2 text-sm font-medium">
          <MessageSquare className="h-3.5 w-3.5 shrink-0 opacity-70" />
          <span className="truncate">{title}</span>
        </p>
        <p className="mt-1 truncate text-xs text-zinc-500 dark:text-zinc-400">{preview}</p>
      </button>

      {confirming ? (
        <div className="absolute inset-x-2 bottom-2 flex gap-1 rounded-lg border border-fuchsia-200/50 bg-theme-elevated p-1 shadow-sm dark:border-fuchsia-300/15 dark:bg-theme-panel">
          <button
            type="button"
            onClick={() => {
              onDelete();
              setConfirming(false);
            }}
            className="flex-1 rounded-md bg-red-600 px-2 py-1 text-[10px] font-medium text-white hover:bg-red-500"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="flex-1 rounded-md px-2 py-1 text-[10px] text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-theme-hover"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className={`absolute top-2 right-2 rounded-md p-1 text-zinc-400 transition hover:bg-theme-panel/85 hover:text-red-600 dark:hover:bg-theme-panel dark:hover:text-red-400 ${
            active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          aria-label={`Delete ${title}`}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

type ActiveChatToolbarProps = {
  title: string;
  onClose: () => void;
};

export function ActiveChatToolbar({ title, onClose }: ActiveChatToolbarProps) {
  return (
    <div className="flex items-center justify-between border-b border-fuchsia-200/40 px-4 py-2 dark:border-fuchsia-300/10">
      <p className="truncate text-sm font-medium text-zinc-800 dark:text-zinc-100">{title}</p>
      <button
        type="button"
        onClick={onClose}
        className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-zinc-500 transition hover:bg-fuchsia-50 hover:text-fuchsia-700 dark:hover:bg-theme-hover dark:hover:text-fuchsia-300"
      >
        <X className="h-3.5 w-3.5" />
        Close chat
      </button>
    </div>
  );
}
