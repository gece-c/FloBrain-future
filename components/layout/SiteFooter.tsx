import { GridContainer } from "@/components/layout/GridContainer";

export function SiteFooter() {
  return (
    <footer className="bg-elevated border-subtle mt-auto border-t py-6">
      <GridContainer>
        <div className="col-span-full flex flex-col gap-2 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between dark:text-zinc-400">
          <p className="text-balance">FloBrain by FloLabs</p>
          <p className="text-balance">Team operating portal</p>
        </div>
      </GridContainer>
    </footer>
  );
}
