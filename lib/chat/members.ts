import { demoUserPersonas } from "@/lib/demo/users";
import type { ChatMember } from "@/lib/chat/types";

export function getChatMembers(): ChatMember[] {
  return demoUserPersonas.map((persona) => ({
    id: persona.id,
    name: persona.name,
    teams: persona.teams,
  }));
}
