import type { ReactNode } from "react";

import { getTeamDirectoryMembers } from "@/lib/demo/users";

export function generateStaticParams() {
  return getTeamDirectoryMembers().map((member) => ({ userId: member.id }));
}

export default function DirectChatLayout({ children }: { children: ReactNode }) {
  return children;
}
