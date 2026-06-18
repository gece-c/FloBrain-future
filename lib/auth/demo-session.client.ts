import { DEFAULT_DEMO_USER_ID, DEMO_USER_COOKIE } from "@/lib/demo/users";

export const DEMO_USER_CHANGED_EVENT = "flobrain-demo-user-changed";

export function readDemoUserIdFromCookieString(cookieString: string): string {
  const match = cookieString
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${DEMO_USER_COOKIE}=`));
  if (!match) return DEFAULT_DEMO_USER_ID;
  return decodeURIComponent(match.slice(DEMO_USER_COOKIE.length + 1)) || DEFAULT_DEMO_USER_ID;
}

export function hasDemoSessionClient(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie
    .split(";")
    .map((part) => part.trim())
    .some((part) => part.startsWith(`${DEMO_USER_COOKIE}=`));
}

export function getDemoUserIdClient(): string {
  if (typeof document === "undefined") return DEFAULT_DEMO_USER_ID;
  return readDemoUserIdFromCookieString(document.cookie);
}

export function setDemoUserIdClient(demoId: string, maxAgeSeconds: number) {
  if (typeof document === "undefined") return;
  document.cookie = `${DEMO_USER_COOKIE}=${encodeURIComponent(demoId)}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
}

export function clearDemoUserIdClient() {
  if (typeof document === "undefined") return;
  document.cookie = `${DEMO_USER_COOKIE}=; path=/; max-age=0; samesite=lax`;
}
