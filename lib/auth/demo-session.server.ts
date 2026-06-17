import { DEFAULT_DEMO_USER_ID, getDemoUser } from "@/lib/demo/users";
import type { FloBrainUser } from "@/lib/services/contracts";

/** Static export has no server cookies; client auth resolves after hydration. */
export async function getDemoUserIdServer(): Promise<string> {
  return DEFAULT_DEMO_USER_ID;
}

export async function getCurrentUser(): Promise<FloBrainUser> {
  const demoId = await getDemoUserIdServer();
  return getDemoUser(demoId);
}
