import { PageShell } from "@/components/layout/PageShell";

type DirectChatPageProps = {
  params: Promise<{ userId: string }>;
};

export default async function DirectChatPage({ params }: DirectChatPageProps) {
  const { userId } = await params;

  return (
    <PageShell title="Direct Chat" description={`1:1 chat placeholder with user ${userId}.`}>
      <div className="rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">
        Backend integration pending. This is the direct chat shell.
      </div>
    </PageShell>
  );
}
