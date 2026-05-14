import type { ReactNode } from "react";

import { PrimaryTabs } from "@/components/layout/PrimaryTabs";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { MeetingReminderToast } from "@/components/notifications/MeetingReminderToast";
import { buildMeetingReminderNotifications } from "@/lib/notifications/reminderScheduler";
import { meetingService } from "@/lib/services/mock";

export default function PortalLayout({ children }: { children: ReactNode }) {
  const reminder = buildMeetingReminderNotifications(meetingService.getMeetings())[0];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white to-fuchsia-100/40 dark:from-[#21002E] dark:to-[#0E091A]">
      <Sidebar />
      <div className="relative flex min-h-screen flex-1 flex-col">
        <TopNavbar />
        <main className="flex-1 p-4">
          <PrimaryTabs />
          {children}
        </main>
      </div>
      {reminder ? <MeetingReminderToast title={reminder.title} body={reminder.body} /> : null}
    </div>
  );
}
