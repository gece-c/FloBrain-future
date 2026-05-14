import Link from "next/link";
import { Trash2 } from "lucide-react";
import type { ReactNode } from "react";

type ModuleTileProps = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  onRemove?: () => void;
};

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function ModuleTile({ title, description, href, icon, onRemove }: ModuleTileProps) {
  const external = isExternalHref(href);

  const body = (
    <>
      <div className="mb-4 inline-flex rounded-lg bg-fuchsia-500/15 p-2 text-fuchsia-600 dark:text-fuchsia-300">{icon}</div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
    </>
  );

  const tileClass =
    "block rounded-2xl border border-fuchsia-200/45 bg-white/72 p-5 shadow-md shadow-fuchsia-200/30 ring-1 ring-white/55 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-fuchsia-300/60 hover:bg-white/78 hover:shadow-lg dark:border-fuchsia-300/20 dark:bg-[#140824]/78 dark:shadow-black/30 dark:ring-white/10 dark:hover:border-fuchsia-300/35 dark:hover:bg-[#1b0d30]/82";

  return (
    <div className="relative">
      {external ? (
        <a href={href} className={tileClass} target="_blank" rel="noopener noreferrer">
          {body}
        </a>
      ) : (
        <Link href={href} className={tileClass}>
          {body}
        </Link>
      )}
      {onRemove ? (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove();
          }}
          className="absolute right-3 top-3 z-10 rounded-lg border border-zinc-200/80 bg-white/90 p-1.5 text-zinc-500 shadow-sm transition hover:bg-red-50 hover:text-red-600 dark:border-zinc-600 dark:bg-[#1b0d30]/95 dark:hover:bg-red-950/40 dark:hover:text-red-400"
          aria-label={`Remove ${title}`}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </div>
  );
}
