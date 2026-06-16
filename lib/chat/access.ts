import type { ChatRoom, ChatRoomKind } from "@/lib/chat/types";
import { canView, toAccessContext } from "@/lib/rbac/permissions";
import type { FloBrainUser } from "@/lib/services/contracts";

export function directRoomId(userId: string, otherUserId: string): string {
  const [a, b] = [userId, otherUserId].sort();
  return `dm-${a}-${b}`;
}

export function canAccessRoom(user: FloBrainUser, room: ChatRoom): boolean {
  if (!canView(toAccessContext(user), "communication.chat")) return false;

  if (room.kind === "all" || room.kind === "team") return true;
  return room.memberIds.includes(user.id);
}

export function getAccessibleRooms(user: FloBrainUser, rooms: ChatRoom[]): ChatRoom[] {
  return rooms.filter((room) => canAccessRoom(user, room));
}

export function roomsByKind(rooms: ChatRoom[], kind: ChatRoomKind): ChatRoom[] {
  return rooms.filter((room) => room.kind === kind);
}

export function findDirectRoom(user: FloBrainUser, otherUserId: string, rooms: ChatRoom[]): ChatRoom | undefined {
  const id = directRoomId(user.id, otherUserId);
  return rooms.find((room) => room.id === id && canAccessRoom(user, room));
}

export function displayNameForDirectRoom(user: FloBrainUser, room: ChatRoom, members: { id: string; name: string }[]): string {
  const otherId = room.memberIds.find((id) => id !== user.id);
  const other = members.find((member) => member.id === otherId);
  return other?.name ?? room.name;
}
