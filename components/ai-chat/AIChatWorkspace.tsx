"use client";

import { ArrowUp, Bot, Plus, Sparkles } from "lucide-react";
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

const starterConversations: Conversation[] = [
  {
    id: "1",
    title: "Sprint planning help",
    preview: "What should we prioritize this week?",
    messages: [
      { id: "m1", role: "user", content: "What should we prioritize this week?" },
      {
        id: "m2",
        role: "assistant",
        content:
          "Based on your open tasks, I'd focus on the launch checklist first, then onboarding card designs. Want me to draft a priority list?",
      },
    ],
  },
  {
    id: "2",
    title: "Meeting summary draft",
    preview: "Summarize today's team sync…",
    messages: [
      { id: "m3", role: "user", content: "Summarize today's team sync in bullet points." },
      {
        id: "m4",
        role: "assistant",
        content:
          "• Launch checklist is 80% complete\n• Design handoff scheduled for Thursday\n• Budget review moved to next week",
      },
    ],
  },
  {
    id: "3",
    title: "Quick brainstorm",
    preview: "Ideas for onboarding improvements…",
    messages: [
      { id: "m5", role: "user", content: "Ideas for onboarding improvements for new team members?" },
      {
        id: "m6",
        role: "assistant",
        content:
          "• Add a guided first-week checklist in My Workspace\n• Short video masterclasses per role\n• Buddy DM prompts on day 1 and day 3\n• Progress visible to team leads only",
      },
      { id: "m7", role: "user", content: "Which of those is lowest effort to ship first?" },
      {
        id: "m8",
        role: "assistant",
        content: "The checklist + buddy DM prompts, both reuse existing workspace and chat surfaces.",
      },
    ],
  },
];

const suggestedPrompts = [
  "Summarize my open tasks",
  "Draft a meeting agenda",
  "Help me write a status update",
];

export function AIChatWorkspace() {
  const [conversations, setConversations] = useState(starterConversations);
  const [activeConvoId, setActiveConvoId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const activeConvo = conversations.find((convo) => convo.id === activeConvoId);

  function startNewChat() {
    const id = `new-${Date.now()}`;
    const newConvo: Conversation = {
      id,
      title: "New conversation",
      preview: "Start typing to chat…",
      messages: [],
    };
    setConversations((current) => [newConvo, ...current]);
    setActiveConvoId(id);
  }

  function deleteConversation(id: string) {
    setConversations((current) => current.filter((convo) => convo.id !== id));
    if (activeConvoId === id) setActiveConvoId(null);
  }

  function sendMessage(content: string) {
    const trimmed = content.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = { id: `u-${Date.now()}`, role: "user", content: trimmed };
    const assistantMessage: ChatMessage = {
      id: `a-${Date.now()}`,
      role: "assistant",
      content:
        "I'm a placeholder assistant for now. Once the AI service is connected, I'll answer with real workspace context.",
    };

    setConversations((current) => {
      if (activeConvoId) {
        return current.map((convo) =>
          convo.id === activeConvoId
            ? {
                ...convo,
                title: convo.messages.length === 0 ? trimmed.slice(0, 32) : convo.title,
                preview: trimmed,
                messages: [...convo.messages, userMessage, assistantMessage],
              }
            : convo,
        );
      }

      const id = `new-${Date.now()}`;
      setActiveConvoId(id);
      return [
        {
          id,
          title: trimmed.slice(0, 32),
          preview: trimmed,
          messages: [userMessage, assistantMessage],
        },
        ...current,
      ];
    });

    setMessage("");
  }

  return (
    <section className="flex h-[calc(100dvh-11rem)] min-h-[32rem] flex-col overflow-hidden rounded-2xl border border-fuchsia-300/25 bg-theme-panel/95 shadow-lg shadow-fuchsia-900/5 dark:border-fuchsia-300/15 dark:bg-theme-panel/95">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-fuchsia-200/40 px-5 py-4 dark:border-fuchsia-300/10">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-fuchsia-700 text-white shadow-sm">
            <Bot className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">FloBrain AI</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">General assistant for your workspace</p>
          </div>
        </div>
        <label className="text-sm text-zinc-600 dark:text-zinc-300">
          <span className="sr-only">Model</span>
          <select className="rounded-xl border border-fuchsia-200/50 bg-theme-elevated px-3 py-2 text-sm outline-none focus:border-fuchsia-400 dark:border-fuchsia-300/15 dark:bg-theme-elevated">
            <option>FloBrain Standard</option>
            <option>FloBrain Pro</option>
          </select>
        </label>
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
          <div className="flex-1 space-y-1 overflow-y-auto p-2">
            {conversations.length === 0 ? (
              <p className="px-2 py-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
                No chats yet. Start a new conversation.
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
                  <Sparkles className="h-7 w-7" />
                </div>
                <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                  How can I help you today?
                </h2>
                <p className="mt-2 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
                  Ask about tasks, meetings, documents, or anything in your workspace.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      className="rounded-full border border-fuchsia-200/50 bg-theme-elevated px-3 py-1.5 text-xs text-zinc-700 transition hover:border-fuchsia-400 hover:bg-fuchsia-50 dark:border-fuchsia-300/15 dark:bg-theme-elevated dark:text-zinc-200 dark:hover:bg-theme-hover"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-fuchsia-200/40 p-4 dark:border-fuchsia-300/10">
            <form
              className="mx-auto flex max-w-2xl items-center gap-2 rounded-2xl border border-fuchsia-200/50 bg-theme-elevated px-3 py-2 shadow-sm dark:border-fuchsia-300/15 dark:bg-theme-elevated"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage(message);
              }}
            >
              <button
                type="button"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-fuchsia-50 hover:text-fuchsia-600 dark:hover:bg-theme-hover dark:hover:text-fuchsia-300"
                aria-label="Attach context"
              >
                <Plus className="h-4 w-4" />
              </button>
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Message FloBrain AI..."
                className="min-w-0 flex-1 bg-transparent text-sm text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
              />
              <button
                type="submit"
                disabled={!message.trim()}
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
