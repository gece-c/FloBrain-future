import { AIBuddyIconButton } from "@/components/ai-buddies/AIBuddyIconButton";
import { aiBuddies } from "@/lib/ai-buddies/data";

export function AIBuddyDock() {
  return (
    <aside className="fixed right-3 top-1/3 z-30 flex max-h-[min(70vh,32rem)] flex-col gap-2 overflow-y-auto">
      {aiBuddies.map((buddy) => {
        const Icon = buddy.icon;
        return (
          <AIBuddyIconButton
            key={buddy.label}
            label={buddy.label}
            icon={<Icon className="h-4 w-4" />}
            href={buddy.href}
          />
        );
      })}
    </aside>
  );
}
