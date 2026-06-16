import Link from "next/link";
import { ShieldOff } from "lucide-react";

type AccessDeniedProps = {
  title?: string;
  description?: string;
};

export function AccessDenied({
  title = "Access restricted",
  description = "Your role does not include access to this area. Contact an admin if you need permission.",
}: AccessDeniedProps) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-fuchsia-200/30 bg-theme-panel/80 p-8 text-center dark:border-fuchsia-300/10 dark:bg-theme-panel/80">
      <ShieldOff className="mb-3 h-10 w-10 text-fuchsia-500/70" />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      <Link
        href="/dashboard"
        className="mt-4 rounded-lg bg-fuchsia-600 px-4 py-2 text-sm font-medium text-white hover:bg-fuchsia-500"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
