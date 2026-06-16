import { getDemoUser } from "@/lib/demo/users";
import { getDemoUserIdClient } from "@/lib/auth/demo-session.client";
import type { FloBrainUser } from "@/lib/services/contracts";

export function getCurrentUserClient(): FloBrainUser {
  return getDemoUser(getDemoUserIdClient());
}
