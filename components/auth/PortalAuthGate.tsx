"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { hasDemoSessionClient } from "@/lib/auth/demo-session.client";

type PortalAuthGateProps = {
  children: ReactNode;
};

export function PortalAuthGate({ children }: PortalAuthGateProps) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hasSession = hasDemoSessionClient();
    if (!hasSession) {
      router.replace("/login");
      return;
    }

    setReady(true);
  }, [router]);

  if (!ready) {
    return null;
  }

  return children;
}
