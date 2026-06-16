import Link from "next/link";

import { DemoLoginPicker } from "@/components/auth/DemoLoginPicker";
import { Logo } from "@/components/layout/Logo";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg items-center px-4 py-8">
      <section className="bg-elevated border-subtle w-full rounded-2xl border p-6 shadow-lg">
        <div className="flex items-center gap-2.5 text-fuchsia-700 dark:text-fuchsia-300">
          <Logo className="h-8 w-8" />
          <h1 className="text-balance text-2xl font-semibold">Welcome to FloBrain</h1>
        </div>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Demo mode: pick a persona to explore role-based access.</p>

        <div className="mt-5">
          <DemoLoginPicker />
        </div>

        <p className="mt-5 text-xs text-zinc-500">
          Production sign-in (email / Google) will replace this flow.{" "}
          <Link href="/signup" className="text-fuchsia-600">
            Create account
          </Link>
        </p>
      </section>
    </main>
  );
}
