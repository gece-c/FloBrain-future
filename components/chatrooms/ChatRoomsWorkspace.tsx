"use client";

import {
  ArrowUp,
  Hash,
  MessageCircle,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

import {
  directRoomId,
  displayNameForDirectRoom,
  roomsByKind,
} from "@/lib/chat/access";
import { findChatRoomByDirectPair } from "@/lib/chat/data";
import type { ChatMember, ChatMessage, ChatRoom } from "@/lib/chat/types";
import type { FloBrainUser } from "@/lib/services/contracts";

type ChatRoomsWorkspaceProps = {
  user: FloBrainUser;
  initialRooms: ChatRoom[];
  members: ChatMember[];
  canSearch: boolean;
  initialRoomId?: string;
  initialDirectUserId?: string;
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function buildInitialRooms(
  accessibleRooms: ChatRoom[],
  user: FloBrainUser,
  members: ChatMember[],
  initialDirectUserId?: string,
): ChatRoom[] {
  if (!initialDirectUserId) return accessibleRooms;

  const id = directRoomId(user.id, initialDirectUserId);
  if (accessibleRooms.some((room) => room.id === id)) return accessibleRooms;

  const other = members.find((member) => member.id === initialDirectUserId);
  if (!other) return accessibleRooms;

  const existing = findChatRoomByDirectPair(user.id, initialDirectUserId);
  if (existing) {
    return [...accessibleRooms, existing];
  }

  return [
    ...accessibleRooms,
    {
      id,
      kind: "direct",
      name: other.name,
      slug: other.name.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-"),
      memberIds: [user.id, initialDirectUserId],
      messages: [],
    },
  ];
}

function resolveInitialRoomId(
  rooms: ChatRoom[],
  initialRoomId?: string,
  initialDirectUserId?: string,
  userId?: string,
): string | null {
  if (initialRoomId && rooms.some((room) => room.id === initialRoomId)) return initialRoomId;
  if (initialDirectUserId && userId) {
    const dmId = directRoomId(userId, initialDirectUserId);
    if (rooms.some((room) => room.id === dmId)) return dmId;
  }
  return rooms.find((room) => room.kind === "all")?.id ?? rooms[0]?.id ?? null;
}

function RoomSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-4 first:mt-0">
      <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {title}
      </p>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function RoomButton({
  active,
  label,
  prefix,
  unread,
  onClick,
}: {
  active: boolean;
  label: string;
  prefix?: "hash" | "dm";
  unread?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition ${
        active
          ? "bg-fuchsia-100 font-medium text-fuchsia-900 dark:bg-theme-muted dark:text-fuchsia-100"
          : "text-zinc-600 hover:bg-fuchsia-50/80 dark:text-zinc-300 dark:hover:bg-theme-hover"
      }`}
    >
      {prefix === "hash" ? (
        <Hash className="h-4 w-4 shrink-0 opacity-60" />
      ) : prefix === "dm" ? (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-fuchsia-600/15 text-[10px] font-semibold text-fuchsia-700 dark:text-fuchsia-300">
          {label.charAt(0)}
        </span>
      ) : null}
      <span className="truncate">{label}</span>
      {unread ? <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-fuchsia-500" /> : null}
    </button>
  );
}

export function ChatRoomsWorkspace({
  user,
  initialRooms,
  members,
  canSearch,
  initialRoomId,
  initialDirectUserId,
}: ChatRoomsWorkspaceProps) {
  const [rooms, setRooms] = useState(() =>
    buildInitialRooms(initialRooms, user, members, initialDirectUserId),
  );
  const [activeRoomId, setActiveRoomId] = useState<string | null>(() =>
    resolveInitialRoomId(
      buildInitialRooms(initialRooms, user, members, initialDirectUserId),
      initialRoomId,
      initialDirectUserId,
      user.id,
    ),
  );
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");

  const memberMap = useMemo(() => new Map(members.map((member) => [member.id, member])), [members]);

  const allRooms = roomsByKind(rooms, "all");
  const teamRooms = roomsByKind(rooms, "team");
  const groupRooms = roomsByKind(rooms, "group");
  const directRooms = roomsByKind(rooms, "direct");

  const activeRoom = rooms.find((room) => room.id === activeRoomId);

  const filteredRooms = useMemo(() => {
    if (!query.trim() || !canSearch) return null;
    const lower = query.toLowerCase();
    return rooms.filter((room) => {
      const label =
        room.kind === "direct" ? displayNameForDirectRoom(user, room, members) : room.name;
      return label.toLowerCase().includes(lower) || room.slug.includes(lower);
    });
  }, [canSearch, members, query, rooms, user]);

  function openDirectChat(otherUserId: string) {
    const other = memberMap.get(otherUserId);
    if (!other || otherUserId === user.id) return;

    const id = directRoomId(user.id, otherUserId);
    const existing = rooms.find((room) => room.id === id);
    if (existing) {
      setActiveRoomId(id);
      return;
    }

    const fromData = findChatRoomByDirectPair(user.id, otherUserId);
    if (fromData) {
      setRooms((current) => [...current, fromData]);
      setActiveRoomId(id);
      return;
    }

    const newRoom: ChatRoom = {
      id,
      kind: "direct",
      name: other.name,
      slug: other.name.toLowerCase().replace(/\s+/g, "-"),
      memberIds: [user.id, otherUserId],
      messages: [],
    };
    setRooms((current) => [...current, newRoom]);
    setActiveRoomId(id);
  }

  function sendMessage() {
    const trimmed = message.trim();
    if (!trimmed || !activeRoom) return;

    const entry: ChatMessage = {
      id: `local-${Date.now()}`,
      authorId: user.id,
      authorName: user.name,
      content: trimmed,
      createdAt: new Date().toISOString(),
    };

    setRooms((current) =>
      current.map((room) =>
        room.id === activeRoom.id ? { ...room, messages: [...room.messages, entry] } : room,
      ),
    );
    setMessage("");
  }

  function roomLabel(room: ChatRoom) {
    if (room.kind === "direct") return displayNameForDirectRoom(user, room, members);
    return room.name;
  }

  const headerSubtitle =
    activeRoom?.kind === "team"
      ? `${activeRoom.teamName} team channel · visible to everyone`
      : activeRoom?.kind === "all"
        ? "Company-wide channel · visible to everyone"
        : activeRoom?.kind === "group"
          ? `${activeRoom.memberIds.length} members`
          : activeRoom?.kind === "direct"
            ? "Direct message"
            : "";

  return (
    <section className="flex h-[calc(100dvh-11rem)] min-h-[32rem] overflow-hidden rounded-2xl border border-fuchsia-300/25 bg-theme-panel/95 shadow-lg shadow-fuchsia-900/5 dark:border-fuchsia-300/15 dark:bg-theme-panel/95">
      <aside className="flex w-60 shrink-0 flex-col border-r border-fuchsia-200/40 dark:border-fuchsia-300/10">
        <div className="border-b border-fuchsia-200/40 px-3 py-3 dark:border-fuchsia-300/10">
          <h1 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Chat Rooms</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Channels, groups, and DMs</p>
          {canSearch ? (
            <label className="relative mt-3 block">
              <Search className="pointer-events-none absolute top-2.5 left-2.5 h-3.5 w-3.5 text-zinc-400" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search rooms..."
                className="w-full rounded-lg border border-fuchsia-200/50 bg-theme-elevated py-2 pr-2 pl-8 text-xs outline-none focus:border-fuchsia-400 dark:border-fuchsia-300/15 dark:bg-theme-elevated"
              />
            </label>
          ) : null}
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {filteredRooms ? (
            <RoomSection title="Search results">
              {filteredRooms.length === 0 ? (
                <p className="px-2 text-xs text-zinc-500">No rooms match your search.</p>
              ) : (
                filteredRooms.map((room) => (
                  <RoomButton
                    key={room.id}
                    active={room.id === activeRoomId}
                    label={roomLabel(room)}
                    prefix={room.kind === "direct" ? "dm" : "hash"}
                    onClick={() => setActiveRoomId(room.id)}
                  />
                ))
              )}
            </RoomSection>
          ) : (
            <>
              <RoomSection title="All">
                {allRooms.map((room) => (
                  <RoomButton
                    key={room.id}
                    active={room.id === activeRoomId}
                    label={room.name}
                    prefix="hash"
                    onClick={() => setActiveRoomId(room.id)}
                  />
                ))}
              </RoomSection>

              <RoomSection title="Teams">
                {teamRooms.map((room) => (
                  <RoomButton
                    key={room.id}
                    active={room.id === activeRoomId}
                    label={room.name}
                    prefix="hash"
                    onClick={() => setActiveRoomId(room.id)}
                  />
                ))}
              </RoomSection>

              <RoomSection title="Groups">
                {groupRooms.map((room) => (
                  <RoomButton
                    key={room.id}
                    active={room.id === activeRoomId}
                    label={room.name}
                    prefix="hash"
                    onClick={() => setActiveRoomId(room.id)}
                  />
                ))}
              </RoomSection>

              <RoomSection title="Direct Messages">
                {directRooms.map((room) => (
                  <RoomButton
                    key={room.id}
                    active={room.id === activeRoomId}
                    label={roomLabel(room)}
                    prefix="dm"
                    onClick={() => setActiveRoomId(room.id)}
                  />
                ))}
                {members
                  .filter((member) => member.id !== user.id)
                  .filter((member) => !directRooms.some((room) => room.memberIds.includes(member.id)))
                  .slice(0, 3)
                  .map((member) => (
                    <RoomButton
                      key={`start-${member.id}`}
                      active={false}
                      label={member.name}
                      prefix="dm"
                      onClick={() => openDirectChat(member.id)}
                    />
                  ))}
              </RoomSection>
            </>
          )}
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {activeRoom ? (
          <>
            <header className="flex items-center justify-between border-b border-fuchsia-200/40 px-5 py-3 dark:border-fuchsia-300/10">
              <div className="flex items-center gap-2">
                {activeRoom.kind === "direct" ? (
                  <MessageCircle className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-300" />
                ) : (
                  <Hash className="h-5 w-5 text-fuchsia-600 dark:text-fuchsia-300" />
                )}
                <div>
                  <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {activeRoom.kind === "direct" ? roomLabel(activeRoom) : activeRoom.name}
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{headerSubtitle}</p>
                </div>
              </div>
              {activeRoom.kind === "group" ? (
                <span className="inline-flex items-center gap-1 rounded-lg border border-fuchsia-200/40 px-2 py-1 text-xs text-zinc-600 dark:border-fuchsia-300/10 dark:text-zinc-300">
                  <Users className="h-3.5 w-3.5" />
                  {activeRoom.memberIds.length}
                </span>
              ) : null}
            </header>

            <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
              {activeRoom.messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    {activeRoom.kind === "direct"
                      ? `This is the beginning of your direct message with ${roomLabel(activeRoom)}.`
                      : `Welcome to #${activeRoom.slug}.`}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Send a message to get started.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeRoom.messages.map((entry) => {
                    const isSelf = entry.authorId === user.id;
                    return (
                      <div key={entry.id} className={`flex gap-3 ${isSelf ? "flex-row-reverse" : ""}`}>
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                            isSelf
                              ? "bg-fuchsia-600 text-white"
                              : "bg-fuchsia-100 text-fuchsia-800 dark:bg-theme-muted dark:text-fuchsia-200"
                          }`}
                        >
                          {entry.authorName.charAt(0)}
                        </span>
                        <div className={`max-w-[75%] ${isSelf ? "text-right" : ""}`}>
                          <div className={`mb-0.5 flex items-baseline gap-2 ${isSelf ? "justify-end" : ""}`}>
                            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                              {isSelf ? "You" : entry.authorName}
                            </span>
                            <span className="text-[10px] text-zinc-400">{formatTime(entry.createdAt)}</span>
                          </div>
                          <p
                            className={`inline-block rounded-2xl px-3 py-2 text-sm ${
                              isSelf
                                ? "bg-fuchsia-600 text-white"
                                : "border border-fuchsia-200/40 bg-theme-elevated text-zinc-800 dark:border-fuchsia-300/10 dark:bg-theme-elevated dark:text-zinc-100"
                            }`}
                          >
                            {entry.content}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="border-t border-fuchsia-200/40 p-4 dark:border-fuchsia-300/10">
              <form
                className="flex items-center gap-2 rounded-2xl border border-fuchsia-200/50 bg-theme-elevated px-3 py-2 shadow-sm dark:border-fuchsia-300/15 dark:bg-theme-elevated"
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage();
                }}
              >
                <button
                  type="button"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-fuchsia-50 hover:text-fuchsia-600 dark:hover:bg-theme-hover dark:hover:text-fuchsia-300"
                  aria-label="Add attachment"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder={`Message ${activeRoom.kind === "direct" ? roomLabel(activeRoom) : `#${activeRoom.slug}`}`}
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
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-sm text-zinc-500">
            Select a room to start chatting.
          </div>
        )}
      </div>
    </section>
  );
}
