"use client";

import { getDemoPersona } from "@/lib/demo/users";

import { clearDemoUserIdClient, setDemoUserIdClient } from "@/lib/auth/demo-session.client";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function appPath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!basePath) return normalized;
  return `${basePath.replace(/\/$/, "")}${normalized}`;
}

export function setDemoUser(demoId: string) {
  if (!getDemoPersona(demoId)) {
    throw new Error("Unknown demo user");
  }

  setDemoUserIdClient(demoId, COOKIE_MAX_AGE_SECONDS);
}

export function loginAsDemoUser(demoId: string) {
  setDemoUser(demoId);
  window.location.assign(appPath("/dashboard"));
}

export function logoutDemoUser() {
  clearDemoUserIdClient();
  window.location.assign(appPath("/login"));
}
