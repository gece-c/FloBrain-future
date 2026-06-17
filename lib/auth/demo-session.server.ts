import { cookies } from "next/headers";

import { DEFAULT_DEMO_USER_ID, DEMO_USER_COOKIE, getDemoUser } from "@/lib/demo/users";
import type { FloBrainUser } from "@/lib/services/contracts";

export async function getDemoUserIdServer(): Promise<string> {
  const store = await cookies();
  return store.get(DEMO_USER_COOKIE)?.value ?? DEFAULT_DEMO_USER_ID;
}

export async function getCurrentUser(): Promise<FloBrainUser> {
  const demoId = await getDemoUserIdServer();
  return getDemoUser(demoId);
}
