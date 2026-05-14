import { PageShell } from "@/components/layout/PageShell";
import { documentsService } from "@/lib/services/mock";

export default function DocumentsPage() {
  const docs = documentsService.getDocuments();

  return (
    <PageShell title="Documents / Files" description="Document list. Add from Workspace by upload or external link.">
      <div className="space-y-2">
        {docs.map((doc) => (
          <div key={doc.id} className="rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">
            <p className="font-medium">{doc.name}</p>
            <p className="text-xs text-zinc-500">Source: {doc.source === "link" ? "Link" : "Upload"}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
