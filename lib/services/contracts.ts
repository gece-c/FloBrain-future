import type { UserRole } from "@/lib/rbac/permissions";

export type FloBrainUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  teams: string[];
};

export type FloBrainTask = {
  id: string;
  title: string;
  assigneeId: string;
  teams: string[];
  project: string;
  status: "todo" | "in-progress" | "done";
  tags: string[];
  relatedTaskIds: string[];
  description: string;
};

export type FloBrainTaskComment = {
  id: string;
  taskId: string;
  authorName: string;
  body: string;
  createdAt: string;
};

export type FloBrainDocument = {
  id: string;
  name: string;
  source: "upload" | "link";
  url?: string;
  fileName?: string;
  approved: boolean;
  upToDate: boolean;
};

export type FloBrainNote = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

export type MeetingItem = {
  id: string;
  title: string;
  startsAt: string;
  link: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  type: "meeting" | "general";
  unread: boolean;
};

export interface AuthService {
  getCurrentUser(): FloBrainUser;
}

export interface TaskService {
  getAllTasks(): FloBrainTask[];
  createTask(input: Omit<FloBrainTask, "id">): FloBrainTask;
  getTaskById(taskId: string): FloBrainTask | null;
  updateTask(taskId: string, updates: Partial<Omit<FloBrainTask, "id">>): FloBrainTask | null;
  updateTaskStatus(taskId: string, status: FloBrainTask["status"]): FloBrainTask | null;
  getComments(taskId: string): FloBrainTaskComment[];
  addComment(taskId: string, body: string, authorName: string): FloBrainTaskComment | null;
  getKnownProjects(): string[];
  getKnownTeams(): string[];
}

export interface DocumentsService {
  getDocuments(): FloBrainDocument[];
  createDocument(input: Omit<FloBrainDocument, "id">): FloBrainDocument;
  toggleApproved(documentId: string): FloBrainDocument | null;
  toggleUpToDate(documentId: string): FloBrainDocument | null;
}

export interface NotesService {
  getNotes(): FloBrainNote[];
  createNote(input: Omit<FloBrainNote, "id" | "createdAt">): FloBrainNote;
  deleteNote(noteId: string): boolean;
}

export interface MeetingService {
  getMeetings(): MeetingItem[];
}

export interface NotificationService {
  getNotifications(): NotificationItem[];
}
