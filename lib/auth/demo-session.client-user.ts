import { DEFAULT_DEMO_USER_ID, getDemoUser } from "@/lib/demo/users";
import { getDemoUserIdClient } from "@/lib/auth/demo-session.client";
import type { FloBrainUser } from "@/lib/services/contracts";

const defaultUser = getDemoUser(DEFAULT_DEMO_USER_ID);

let cachedDemoId = DEFAULT_DEMO_USER_ID;
let cachedUser: FloBrainUser = defaultUser;

export function getCurrentUserClient(): FloBrainUser {
  const demoId = getDemoUserIdClient();
  if (demoId === cachedDemoId) {
    return cachedUser;
  }

  cachedDemoId = demoId;
  cachedUser = getDemoUser(demoId);
  return cachedUser;
}

export function getDefaultUserClient(): FloBrainUser {
  return defaultUser;
}
