"use client";

import {
  ArrowUp,
  Code2,
  ImageIcon,
  LayoutTemplate,
  Palette,
  PenTool,
  Plus,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { useState } from "react";

import { ActiveChatToolbar, ChatHistoryItem } from "@/components/chat/ChatHistoryItem";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Conversation = {
  id: string;
  title: string;
  preview: string;
  messages: ChatMessage[];
};

const designTools = [
  { name: "Figma", icon: PenTool, accent: "from-[#A259FF] to-[#F24E1E]" },
  { name: "Claude Design", icon: Sparkles, accent: "from-[#D97757] to-[#C96A4A]" },
  { name: "OpenArt", icon: ImageIcon, accent: "from-[#6366F1] to-[#8B5CF6]" },
  { name: "Canva", icon: LayoutTemplate, accent: "from-[#00C4CC] to-[#7D2AE8]" },
  { name: "Cursor", icon: Code2, accent: "from-[#1E1E1E] to-[#3C3C3C]" },
] as const;

const pastConversations: Conversation[] = [
  {
    id: "1",
    title: "Brand refresh moodboard",
    preview: "Let's explore warmer accent colors…",
    messages: [
      { id: "d1-m1", role: "user", content: "Let's explore warmer accent colors for the brand refresh moodboard." },
      {
        id: "d1-m2",
        role: "assistant",
        content:
          "I'd lean into amber and coral accents against your existing fuchsia base, they add warmth without losing the FloBrain identity. Want me to suggest a 3-color palette?",
      },
      { id: "d1-m3", role: "user", content: "Yes, and note which ones pass WCAG on dark mode." },
      {
        id: "d1-m4",
        role: "assistant",
        content:
          "• Primary warm accent: #F59E0B on #140824 (AA for large text)\n• Secondary: #FB7185 on #140824 (AA for UI labels)\n• Highlight: #FCD34D, use sparingly for badges only",
      },
    ],
  },
  {
    id: "2",
    title: "Landing page wireframes",
    preview: "Can you tighten the hero spacing?",
    messages: [
      { id: "d2-m1", role: "user", content: "Can you tighten the hero spacing on the landing page wireframes?" },
      {
        id: "d2-m2",
        role: "assistant",
        content:
          "Reduce top padding from 96px to 64px, bring the CTA group 24px closer to the headline, and cap line length at 640px. That should feel more focused on mobile too.",
      },
      { id: "d2-m3", role: "user", content: "What about the illustration, still too tall?" },
      {
        id: "d2-m4",
        role: "assistant",
        content: "Scale it to 85% and align to the text baseline. The current aspect ratio pushes the fold below the fold on 13\" laptops.",
      },
    ],
  },
  {
    id: "3",
    title: "Icon set for mobile nav",
    preview: "I need 24px stroke icons…",
    messages: [
      { id: "d3-m1", role: "user", content: "I need 24px stroke icons for the mobile nav, consistent 1.5px stroke." },
      {
        id: "d3-m2",
        role: "assistant",
        content:
          "Use a 24×24 grid with 2px inset. Match Lucide-style geometry: rounded caps, 1.5px stroke, no fills except notification dots.",
      },
      { id: "d3-m3", role: "user", content: "Can you list the five icons we need?" },
      {
        id: "d3-m4",
        role: "assistant",
        content: "Home, Chat, Workspace, Timer, and Profile, active state gets fuchsia-600 stroke; inactive uses zinc-400.",
      },
    ],
  },
];

export function DesignBuddyWorkspace() {
  const [conversations, setConversations] = useState(pastConversations);
  const [activeConvoId, setActiveConvoId] = useState<string | null>(pastConversations[0]?.id ?? null);
  const [message, setMessage] = useState("");

  const activeConvo = conversations.find((convo) => convo.id === activeConvoId);

  function startNewChat() {
    const id = `new-${Date.now()}`;
    setConversations((current) => [
      { id, title: "New design chat", preview: "Start typing to chat…", messages: [] },
      ...current,
    ]);
    setActiveConvoId(id);
  }

  function deleteConversation(id: string) {
    setConversations((current) => current.filter((convo) => convo.id !== id));
    if (activeConvoId === id) setActiveConvoId(null);
  }

  function sendMessage(content: string) {
    const trimmed = content.trim();
    if (!trimmed || !activeConvoId) return;

    const userMessage: ChatMessage = { id: `u-${Date.now()}`, role: "user", content: trimmed };
    const assistantMessage: ChatMessage = {
      id: `a-${Date.now()}`,
      role: "assistant",
      content: "I'll refine that once the design service is connected, for now this is a demo reply.",
    };

    setConversations((current) =>
      current.map((convo) =>
        convo.id === activeConvoId
          ? {
              ...convo,
              preview: trimmed,
              messages: [...convo.messages, userMessage, assistantMessage],
            }
          : convo,
      ),
    );
    setMessage("");
  }

  return (
    <section className="flex h-[calc(100dvh-11rem)] min-h-[32rem] flex-col overflow-hidden rounded-2xl border border-fuchsia-300/25 bg-theme-panel/95 shadow-lg shadow-fuchsia-900/5 dark:border-fuchsia-300/15 dark:bg-theme-panel/95">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-fuchsia-200/40 px-5 py-4 dark:border-fuchsia-300/10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-fuchsia-600 dark:text-fuchsia-300">
            Design workspace
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {designTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.name}
                  type="button"
                  className="group flex min-w-[6.5rem] flex-col items-center gap-2 rounded-xl border border-fuchsia-200/50 bg-theme-elevated px-3 py-2.5 text-center transition hover:border-fuchsia-400/60 hover:bg-fuchsia-50/80 dark:border-fuchsia-300/15 dark:bg-theme-elevated dark:hover:border-fuchsia-400/40 dark:hover:bg-theme-hover"
                  title={`Open ${tool.name}`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${tool.accent} text-white shadow-sm`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-200">{tool.name}</span>
                </button>
              );
            })}
            <button
              type="button"
              className="flex min-w-[6.5rem] flex-col items-center gap-2 rounded-xl border border-dashed border-fuchsia-300/50 bg-fuchsia-50/40 px-3 py-2.5 text-center transition hover:border-fuchsia-400 hover:bg-fuchsia-50 dark:border-fuchsia-300/25 dark:bg-theme-elevated/60 dark:hover:bg-theme-hover"
              title="Add tool shortcut"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-fuchsia-300/40 bg-theme-elevated text-fuchsia-600 dark:bg-theme-panel dark:text-fuchsia-300">
                <Plus className="h-4 w-4" />
              </span>
              <span className="text-xs font-medium text-fuchsia-700 dark:text-fuchsia-300">Add Tool</span>
            </button>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-fuchsia-300/40 bg-gradient-to-r from-fuchsia-600 to-fuchsia-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:from-fuchsia-500 hover:to-fuchsia-400"
        >
          <UserPlus className="h-4 w-4" />
          Add buddy to meeting
          <Plus className="h-3.5 w-3.5 opacity-80" />
        </button>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="flex w-52 shrink-0 flex-col border-r border-fuchsia-200/40 dark:border-fuchsia-300/10">
          <div className="border-b border-fuchsia-200/40 p-2 dark:border-fuchsia-300/10">
            <button
              type="button"
              onClick={startNewChat}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-fuchsia-300/40 bg-fuchsia-50 px-3 py-2 text-sm font-medium text-fuchsia-700 transition hover:bg-fuchsia-100 dark:border-fuchsia-300/20 dark:bg-theme-elevated dark:text-fuchsia-300 dark:hover:bg-theme-hover"
            >
              <Plus className="h-4 w-4" />
              New chat
            </button>
          </div>
          <div className="border-b border-fuchsia-200/40 px-4 py-2 dark:border-fuchsia-300/10">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Past conversations
            </p>
          </div>
          <div className="flex-1 space-y-1 overflow-y-auto p-2">
            {conversations.length === 0 ? (
              <p className="px-2 py-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
                No design chats yet.
              </p>
            ) : (
              conversations.map((convo) => (
                <ChatHistoryItem
                  key={convo.id}
                  title={convo.title}
                  preview={convo.preview}
                  active={convo.id === activeConvoId}
                  onSelect={() => setActiveConvoId(convo.id)}
                  onDelete={() => deleteConversation(convo.id)}
                />
              ))
            )}
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {activeConvo ? (
            <ActiveChatToolbar title={activeConvo.title} onClose={() => setActiveConvoId(null)} />
          ) : null}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            {activeConvo && activeConvo.messages.length > 0 ? (
              <div className="mx-auto flex max-w-2xl flex-col gap-4">
                {activeConvo.messages.map((entry) => (
                  <div
                    key={entry.id}
                    className={`flex ${entry.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                        entry.role === "user"
                          ? "bg-fuchsia-600 text-white"
                          : "border border-fuchsia-200/40 bg-theme-elevated text-zinc-800 dark:border-fuchsia-300/10 dark:bg-theme-elevated dark:text-zinc-100"
                      }`}
                    >
                      {entry.content}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-fuchsia-700 text-white shadow-md shadow-fuchsia-500/30">
                  <Palette className="h-7 w-7" />
                </div>
                <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                  Hi, how can I assist you design?
                </h2>
                <p className="mt-2 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
                  Ask for feedback, generate concepts, or pull in one of your design tools above.
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-fuchsia-200/40 p-4 dark:border-fuchsia-300/10">
            <form
              className="flex items-center gap-2 rounded-2xl border border-fuchsia-200/50 bg-theme-elevated px-3 py-2 shadow-sm dark:border-fuchsia-300/15 dark:bg-theme-elevated"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage(message);
              }}
            >
              <button
                type="button"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-fuchsia-50 hover:text-fuchsia-600 dark:hover:bg-theme-hover dark:hover:text-fuchsia-300"
                aria-label="Attach file"
              >
                <Plus className="h-4 w-4" />
              </button>
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Type here to chat..."
                className="min-w-0 flex-1 bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
              />
              <button
                type="submit"
                disabled={!message.trim() || !activeConvoId}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fuchsia-600 text-white transition hover:bg-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
