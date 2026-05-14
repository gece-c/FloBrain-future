import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4">
      <section className="w-full rounded-2xl border border-fuchsia-300/25 bg-white/90 p-6 shadow-lg dark:bg-[#140824]">
        <h1 className="text-2xl font-semibold">Create your FloBrain account</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Get started with email/password or Google.</p>
        <form className="mt-4 space-y-3">
          <input className="w-full rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm" placeholder="Full name" />
          <input className="w-full rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm" placeholder="Email" />
          <input className="w-full rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm" placeholder="Password" type="password" />
          <Link href="/dashboard" className="block rounded-lg bg-fuchsia-600 px-3 py-2 text-center text-sm text-white">
            Create account
          </Link>
        </form>
        <button className="mt-3 w-full rounded-lg border border-fuchsia-300/30 px-3 py-2 text-sm">Sign up with Google</button>
        <p className="mt-4 text-xs text-zinc-500">
          Already registered? <Link href="/login" className="text-fuchsia-600">Sign in</Link>
        </p>
      </section>
    </main>
  );
}
