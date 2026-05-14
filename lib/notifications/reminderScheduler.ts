import type { MeetingItem, NotificationItem } from "@/lib/services/contracts";

export function buildMeetingReminderNotifications(meetings: MeetingItem[]): NotificationItem[] {
  return meetings.slice(0, 2).map((meeting, index) => ({
    id: `meeting-reminder-${meeting.id}-${index}`,
    title: `Meeting reminder`,
    body: `${meeting.title} starts at ${meeting.startsAt}`,
    type: "meeting",
    unread: true,
  }));
}
