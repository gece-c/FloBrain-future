import { getChatMembers } from "@/lib/chat/members";

export function generateStaticParams() {
  return getChatMembers().map((member) => ({ userId: member.id }));
}

export default function DirectChatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
