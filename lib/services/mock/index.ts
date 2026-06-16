import type {
  AuthService,
  DocumentsService,
  FloBrainDocument,
  FloBrainNote,
  FloBrainTask,
  FloBrainTaskComment,
  FloBrainUser,
  MeetingItem,
  MeetingService,
  NotesService,
  NotificationItem,
  NotificationService,
  TaskService,
} from "@/lib/services/contracts";
import { getCurrentUserClient } from "@/lib/auth/demo-session.client-user";
import { buildMeetingReminderNotifications } from "@/lib/notifications/reminderScheduler";

const tasks: FloBrainTask[] = [
  {
    id: "t-1",
    title: "Finalize launch checklist",
    assigneeId: "u-ceren-g",
    teams: ["Growth"],
    project: "Launch 2026",
    status: "in-progress",
    tags: ["launch", "priority"],
    relatedTaskIds: ["t-2"],
    description: "Close remaining pre-launch tasks and confirm go-live readiness.",
  },
  {
    id: "t-2",
    title: "Design onboarding cards",
    assigneeId: "u-diogo-s",
    teams: ["Design"],
    project: "Onboarding UX",
    status: "todo",
    tags: ["design", "onboarding"],
    relatedTaskIds: ["t-1"],
    description: "Create final onboarding cards and handoff specs to engineering.",
  },
  {
    id: "t-3",
    title: "Review budget summary",
    assigneeId: "u-mohamed-a",
    teams: ["Finance"],
    project: "Q2 Planning",
    status: "done",
    tags: ["finance"],
    relatedTaskIds: [],
    description: "Validate spend and update the summary for leadership review.",
  },
];

const taskComments: FloBrainTaskComment[] = [
  {
    id: "tc-1",
    taskId: "t-1",
    authorName: "Ceren G.",
    body: "Waiting for final approvals from legal.",
    createdAt: new Date().toISOString(),
  },
];

const documents: FloBrainDocument[] = [
  { id: "d-1", name: "Brand Guidelines", source: "upload", fileName: "Brand Guidelines.pdf", approved: true, upToDate: true },
  { id: "d-2", name: "Q2 Planning Draft", source: "link", url: "https://docs.google.com/document/d/abc", approved: false, upToDate: true },
  { id: "d-3", name: "Security SOP", source: "upload", fileName: "Security SOP.docx", approved: true, upToDate: false },
];

const notes: FloBrainNote[] = [
  {
    id: "n-1",
    title: "Sprint Retro",
    body: "Capture wins and blockers for this sprint.",
    createdAt: new Date().toISOString(),
  },
];

const meetings: MeetingItem[] = [
  { id: "m-1", title: "Daily Team Sync", startsAt: "09:30", link: "https://meet.flobrain.local/sync" },
  { id: "m-2", title: "Project Review", startsAt: "14:00", link: "https://meet.flobrain.local/review" },
];

const generalNotifications: NotificationItem[] = [
  {
    id: "n-2",
    title: "Task updated",
    body: "Design onboarding cards moved to in-progress",
    type: "task",
    unread: true,
    href: "/tasks/t-2",
  },
  {
    id: "n-3",
    title: "New chat message",
    body: "Diogo sent a message in #design-team",
    type: "chat",
    unread: true,
    href: "/chatrooms",
  },
];

const createId = (prefix: string, listLength: number) => `${prefix}-${listLength + 1}`;

export const authService: AuthService = {
  getCurrentUser: () => getCurrentUserClient(),
};

export const taskService: TaskService = {
  getAllTasks: () => tasks,
  createTask: (input) => {
    const created: FloBrainTask = { ...input, id: createId("t", tasks.length) };
    tasks.unshift(created);
    return created;
  },
  updateTaskStatus: (taskId, status) => {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return null;
    task.status = status;
    return task;
  },
  getTaskById: (taskId) => tasks.find((item) => item.id === taskId) ?? null,
  updateTask: (taskId, updates) => {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return null;
    Object.assign(task, updates);
    return task;
  },
  getComments: (taskId) => taskComments.filter((comment) => comment.taskId === taskId),
  addComment: (taskId, body, authorName) => {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return null;
    const created: FloBrainTaskComment = {
      id: createId("tc", taskComments.length),
      taskId,
      authorName,
      body,
      createdAt: new Date().toISOString(),
    };
    taskComments.unshift(created);
    return created;
  },
  getKnownProjects: () => Array.from(new Set(tasks.map((item) => item.project))).sort(),
  getKnownTeams: () => Array.from(new Set(tasks.flatMap((item) => item.teams))).sort(),
};

export const documentsService: DocumentsService = {
  getDocuments: () => documents,
  createDocument: (input) => {
    const created: FloBrainDocument = { ...input, id: createId("d", documents.length) };
    documents.unshift(created);
    return created;
  },
  toggleApproved: (documentId) => {
    const document = documents.find((item) => item.id === documentId);
    if (!document) return null;
    document.approved = !document.approved;
    return document;
  },
  toggleUpToDate: (documentId) => {
    const document = documents.find((item) => item.id === documentId);
    if (!document) return null;
    document.upToDate = !document.upToDate;
    return document;
  },
};

export const notesService: NotesService = {
  getNotes: () => notes,
  createNote: (input) => {
    const created: FloBrainNote = {
      ...input,
      id: createId("note", notes.length),
      createdAt: new Date().toISOString(),
    };
    notes.unshift(created);
    return created;
  },
  deleteNote: (noteId) => {
    const noteIndex = notes.findIndex((item) => item.id === noteId);
    if (noteIndex === -1) return false;
    notes.splice(noteIndex, 1);
    return true;
  },
};

export const meetingService: MeetingService = {
  getMeetings: () => meetings,
};

export const notificationService: NotificationService = {
  getNotifications: () => {
    const meetingReminders = buildMeetingReminderNotifications(meetings);
    const demoMeetingReminder: NotificationItem = {
      id: "n-1",
      title: "Meeting in 10 minutes",
      body: "Daily Team Sync starts at 09:30",
      type: "meeting",
      unread: true,
      href: meetings[0]?.link ?? "/meetings/links",
    };

    return [...(meetingReminders.length > 0 ? meetingReminders : [demoMeetingReminder]), ...generalNotifications];
  },
};
