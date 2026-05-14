import { PageShell } from "@/components/layout/PageShell";
import { authService } from "@/lib/services/mock";

export default function ProfilePage() {
  const user = authService.getCurrentUser();

  return (
    <PageShell title="Profile" description="Your account and access information.">
      <div className="space-y-2 rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">
        <p><span className="font-medium">Name:</span> {user.name}</p>
        <p><span className="font-medium">Email:</span> {user.email}</p>
        <p><span className="font-medium">Role:</span> {user.role}</p>
        <p><span className="font-medium">Teams:</span> {user.teams.join(", ")}</p>
      </div>
    </PageShell>
  );
}
