import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4">
      <section className="bg-elevated border-subtle w-full rounded-2xl border p-6 shadow-lg">
        <h1 className="text-balance text-2xl font-semibold">Create your FloBrain account</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Get started with email/password or Google.</p>
        <form className="mt-4 space-y-3">
          <input className="border-subtle w-full rounded-lg border bg-transparent px-3 py-2 text-sm" placeholder="Full name" />
          <input className="border-subtle w-full rounded-lg border bg-transparent px-3 py-2 text-sm" placeholder="Email" />
          <input className="border-subtle w-full rounded-lg border bg-transparent px-3 py-2 text-sm" placeholder="Password" type="password" />
          <Link href="/dashboard" className="block min-h-11 rounded-lg bg-fuchsia-600 px-3 py-2 text-center text-sm text-white">
            Create account
          </Link>
        </form>
        <button className="border-subtle mt-3 min-h-11 w-full rounded-lg border px-3 py-2 text-sm">Sign up with Google</button>
        <p className="mt-4 text-xs text-zinc-500">
          Already registered? <Link href="/login" className="text-fuchsia-600">Sign in</Link>
        </p>
      </section>
    </main>
  );
}
