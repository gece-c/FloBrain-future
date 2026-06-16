export type ChatRoomKind = "all" | "team" | "group" | "direct";

export type ChatMessage = {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
};

export type ChatRoom = {
  id: string;
  kind: ChatRoomKind;
  name: string;
  slug: string;
  teamName?: string;
  memberIds: string[];
  messages: ChatMessage[];
};

export type ChatMember = {
  id: string;
  name: string;
  teams: string[];
};
