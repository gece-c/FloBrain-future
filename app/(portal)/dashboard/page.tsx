import { DashboardTileGrid } from "@/components/dashboard/DashboardTileGrid";
import { authService } from "@/lib/services/mock";

export default function DashboardPage() {
  const user = authService.getCurrentUser();

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-fuchsia-300/20 bg-white/80 p-5 dark:bg-[#140824]">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Welcome {user.name}. Role: <span className="font-medium">{user.role}</span>
        </p>
      </section>

      <DashboardTileGrid userRole={user.role} />
    </div>
  );
}
