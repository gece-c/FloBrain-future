import { PageShell } from "@/components/layout/PageShell";
import { meetingService } from "@/lib/services/mock";

export default function MeetingLinksPage() {
  const meetings = meetingService.getMeetings();
  return (
    <PageShell title="Meeting Links">
      <div className="space-y-2">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">
            <p className="font-medium">{meeting.title}</p>
            <p>{meeting.startsAt}</p>
            <a className="text-fuchsia-600" href={meeting.link}>{meeting.link}</a>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
