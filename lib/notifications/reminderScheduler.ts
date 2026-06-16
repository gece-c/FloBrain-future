import type { MeetingItem, NotificationItem } from "@/lib/services/contracts";

function parseMeetingStart(startsAt: string, now: Date): Date {
  const [hours, minutes] = startsAt.split(":").map(Number);
  const start = new Date(now);
  start.setHours(hours, minutes, 0, 0);
  return start;
}

function meetingNotificationTitle(minutesUntilStart: number): string {
  if (minutesUntilStart <= 0) return "Meeting started";
  if (minutesUntilStart <= 10) return `Meeting in ${minutesUntilStart} minutes`;
  return "Meeting starting soon";
}

export function buildMeetingReminderNotifications(
  meetings: MeetingItem[],
  now = new Date(),
): NotificationItem[] {
  const reminders: NotificationItem[] = [];

  for (const meeting of meetings) {
    const start = parseMeetingStart(meeting.startsAt, now);
    const minutesUntilStart = Math.round((start.getTime() - now.getTime()) / 60_000);

    if (minutesUntilStart > 15 || minutesUntilStart < -30) continue;

    reminders.push({
      id: `meeting-reminder-${meeting.id}`,
      title: meetingNotificationTitle(minutesUntilStart),
      body: `${meeting.title} starts at ${meeting.startsAt}`,
      type: "meeting",
      unread: true,
      href: meeting.link,
    });
  }

  return reminders;
}
