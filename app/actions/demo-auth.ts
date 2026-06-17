"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { DEMO_USER_COOKIE, getDemoPersona } from "@/lib/demo/users";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export async function setDemoUser(demoId: string) {
  if (!getDemoPersona(demoId)) {
    throw new Error("Unknown demo user");
  }

  const store = await cookies();
  store.set(DEMO_USER_COOKIE, demoId, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });
}

export async function loginAsDemoUser(demoId: string) {
  await setDemoUser(demoId);
  redirect("/dashboard");
}

export async function logoutDemoUser() {
  const store = await cookies();
  store.delete(DEMO_USER_COOKIE);
  redirect("/login");
}
