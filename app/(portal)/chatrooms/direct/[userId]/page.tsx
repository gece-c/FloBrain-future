"use client";

import { AccessGate } from "@/components/rbac/AccessGate";
import { ChatRoomsWorkspace } from "@/components/chatrooms/ChatRoomsWorkspace";
import { useCurrentUser } from "@/components/auth/useCurrentUser";
import { getAccessibleRooms } from "@/lib/chat/access";
import { chatRooms } from "@/lib/chat/data";
import { getChatMembers } from "@/lib/chat/members";
import { canView, toAccessContext } from "@/lib/rbac/permissions";
import { useParams } from "next/navigation";

export default function DirectChatPage() {
  const params = useParams<{ userId: string }>();
  const userId = params.userId;
  const user = useCurrentUser();
  const accessibleRooms = getAccessibleRooms(user, chatRooms);
  const members = getChatMembers();
  const canSearch = canView(toAccessContext(user), "communication.roomSearch");

  return (
    <AccessGate user={user} permission="communication.chat">
      <ChatRoomsWorkspace
        user={user}
        initialRooms={accessibleRooms}
        members={members}
        canSearch={canSearch}
        initialDirectUserId={userId}
      />
    </AccessGate>
  );
}
