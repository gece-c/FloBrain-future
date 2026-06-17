"use client";

import { DEMO_USER_COOKIE, getDemoPersona } from "@/lib/demo/users";
import { toAppPath } from "@/lib/site-path";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function setDemoUserCookie(demoId: string) {
  document.cookie = `${DEMO_USER_COOKIE}=${encodeURIComponent(demoId)}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
}

function clearDemoUserCookie() {
  document.cookie = `${DEMO_USER_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

export function setDemoUserClient(demoId: string) {
  if (!getDemoPersona(demoId)) {
    throw new Error("Unknown demo user");
  }
  setDemoUserCookie(demoId);
}

export function loginAsDemoUserClient(demoId: string, redirectTo = toAppPath("/dashboard/")) {
  setDemoUserClient(demoId);
  window.location.assign(redirectTo);
}

export function logoutDemoUserClient(redirectTo = toAppPath("/login/")) {
  clearDemoUserCookie();
  window.location.assign(redirectTo);
}
