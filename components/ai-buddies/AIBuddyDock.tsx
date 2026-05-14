import { Briefcase, Database, Palette, Rocket } from "lucide-react";

import { AIBuddyIconButton } from "@/components/ai-buddies/AIBuddyIconButton";

export function AIBuddyDock() {
  return (
    <aside className="fixed right-3 top-1/3 z-30 flex flex-col gap-2">
      <AIBuddyIconButton label="Legal Buddy" icon={<Briefcase className="h-4 w-4" />} />
      <AIBuddyIconButton label="Data Buddy" icon={<Database className="h-4 w-4" />} />
      <AIBuddyIconButton label="Space Buddy" icon={<Rocket className="h-4 w-4" />} />
      <AIBuddyIconButton label="Design Buddy" icon={<Palette className="h-4 w-4" />} />
    </aside>
  );
}
