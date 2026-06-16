import { AccessGate } from "@/components/rbac/AccessGate";
import { ChatRoomsWorkspace } from "@/components/chatrooms/ChatRoomsWorkspace";
import { getAccessibleRooms } from "@/lib/chat/access";
import { chatRooms } from "@/lib/chat/data";
import { getChatMembers } from "@/lib/chat/members";
import { getCurrentUser } from "@/lib/auth/demo-session.server";
import { canView, toAccessContext } from "@/lib/rbac/permissions";

type DirectChatPageProps = {
  params: Promise<{ userId: string }>;
};

export default async function DirectChatPage({ params }: DirectChatPageProps) {
  const { userId } = await params;
  const user = await getCurrentUser();
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
