"use client";

import { useCallback, useSyncExternalStore } from "react";

import { DEMO_USER_CHANGED_EVENT } from "@/lib/auth/demo-session.client";
import { getCurrentUserClient } from "@/lib/auth/demo-session.client-user";
import type { FloBrainUser } from "@/lib/services/contracts";

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(DEMO_USER_CHANGED_EVENT, onStoreChange);
  return () => window.removeEventListener(DEMO_USER_CHANGED_EVENT, onStoreChange);
}

function getSnapshot(): FloBrainUser {
  return getCurrentUserClient();
}

function getServerSnapshot(): FloBrainUser {
  return getCurrentUserClient();
}

export function notifyDemoUserChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(DEMO_USER_CHANGED_EVENT));
  }
}

export function useCurrentUser(): FloBrainUser {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useRefreshAfterDemoSwitch() {
  return useCallback(() => {
    notifyDemoUserChanged();
  }, []);
}
