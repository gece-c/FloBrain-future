"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";

import { PageShell } from "@/components/layout/PageShell";
import { authService, documentsService, taskService } from "@/lib/services/mock";
type TaskStatusFilter = "all" | "todo" | "in-progress" | "done";

export default function WorkspacePage() {
  const user = useMemo(() => authService.getCurrentUser(), []);
  const [tasks, setTasks] = useState(() => taskService.getAllTasks());
  const [documents, setDocuments] = useState(() => documentsService.getDocuments());

  const [taskTitle, setTaskTitle] = useState("");
  const [taskProject, setTaskProject] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskTagsInput, setTaskTagsInput] = useState("");
  const [taskTeams, setTaskTeams] = useState<string[]>([]);
  const [taskRelatedIds, setTaskRelatedIds] = useState<string[]>([]);
  const [taskStatusFilter, setTaskStatusFilter] = useState<TaskStatusFilter>("all");
  const [taskTeamFilter, setTaskTeamFilter] = useState("all");
  const [taskSearch, setTaskSearch] = useState("");
  const [taskProjectFilter, setTaskProjectFilter] = useState("all");

  const [documentLink, setDocumentLink] = useState("");

  const teams = useMemo(() => Array.from(new Set(tasks.flatMap((task) => task.teams))).sort(), [tasks]);
  const projects = useMemo(() => Array.from(new Set(tasks.map((task) => task.project))).sort(), [tasks]);

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = taskStatusFilter === "all" || task.status === taskStatusFilter;
    const teamMatch = taskTeamFilter === "all" || task.teams.includes(taskTeamFilter);
    const projectMatch = taskProjectFilter === "all" || task.project === taskProjectFilter;
    const searchMatch = task.title.toLowerCase().includes(taskSearch.toLowerCase());
    return statusMatch && teamMatch && projectMatch && searchMatch;
  });

  const myTasksCount = tasks.filter((task) => task.assigneeId === user.id).length;
  const teamTasksCount = tasks.filter((task) => task.teams.some((team) => user.teams.includes(team))).length;

  const handleCreateTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = taskTitle.trim();
    if (!title) return;
    const selectedTeams = taskTeams.length > 0 ? taskTeams : [user.teams[0] ?? "General"];
    const parsedTags = taskTagsInput
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    taskService.createTask({
      title,
      assigneeId: user.id,
      teams: selectedTeams,
      project: taskProject.trim() || "General",
      status: "todo",
      tags: parsedTags,
      relatedTaskIds: taskRelatedIds,
      description: taskDescription.trim(),
    });
    setTaskTitle("");
    setTaskProject("");
    setTaskDescription("");
    setTaskTagsInput("");
    setTaskTeams([]);
    setTaskRelatedIds([]);
    setTasks(taskService.getAllTasks());
  };

  const cycleTaskStatus = (taskId: string, currentStatus: "todo" | "in-progress" | "done") => {
    const nextStatus = currentStatus === "todo" ? "in-progress" : currentStatus === "in-progress" ? "done" : "todo";
    taskService.updateTaskStatus(taskId, nextStatus);
    setTasks(taskService.getAllTasks());
  };

  const toggleSelectedTeam = (team: string) => {
    setTaskTeams((prev) => (prev.includes(team) ? prev.filter((item) => item !== team) : [...prev, team]));
  };

  const toggleRelatedTask = (taskId: string) => {
    setTaskRelatedIds((prev) => (prev.includes(taskId) ? prev.filter((item) => item !== taskId) : [...prev, taskId]));
  };

  const handleUploadDocument = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    documentsService.createDocument({
      name: file.name,
      source: "upload",
      fileName: file.name,
      approved: false,
      upToDate: true,
    });
    setDocuments(documentsService.getDocuments());
    event.target.value = "";
  };

  const handleAddDocumentLink = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = documentLink.trim();
    if (!url) return;
    documentsService.createDocument({
      name: url,
      source: "link",
      url,
      approved: false,
      upToDate: true,
    });
    setDocumentLink("");
    setDocuments(documentsService.getDocuments());
  };

  return (
    <div className="space-y-4">
      <PageShell title="Workspace" description="Tasks and documents with scoped filters.">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-fuchsia-200/30 p-3 dark:border-fuchsia-300/10">
            <p className="text-sm font-semibold">My Tasks</p>
            <p className="text-xs text-zinc-500">{myTasksCount} tasks assigned to me</p>
          </div>
          <div className="rounded-xl border border-fuchsia-200/30 p-3 dark:border-fuchsia-300/10">
            <p className="text-sm font-semibold">Team Tasks</p>
            <p className="text-xs text-zinc-500">{teamTasksCount} tasks for my teams</p>
          </div>
          <div className="rounded-xl border border-fuchsia-200/30 p-3 dark:border-fuchsia-300/10">
            <p className="text-sm font-semibold">All Tasks</p>
            <p className="text-xs text-zinc-500">{tasks.length} tasks across all teams</p>
          </div>
        </div>
      </PageShell>

      <PageShell title="Tasks" description="Create tasks here with teams, project, related tasks, and custom tags.">
        <form onSubmit={handleCreateTask} className="rounded-xl border border-fuchsia-200/30 p-3 dark:border-fuchsia-300/10">
          <p className="text-sm font-semibold">Add task</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <input
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
              className="min-w-52 flex-1 rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm"
              placeholder="Task title"
            />
            <input
              value={taskProject}
              onChange={(event) => setTaskProject(event.target.value)}
              className="min-w-44 flex-1 rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm"
              placeholder="Related project"
            />
            <button type="submit" className="rounded-lg border border-fuchsia-300/40 px-3 py-2 text-sm">
              Add task
            </button>
          </div>
          <textarea
            value={taskDescription}
            onChange={(event) => setTaskDescription(event.target.value)}
            className="mt-2 h-20 w-full rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm"
            placeholder="Task page description/context"
          />
          <input
            value={taskTagsInput}
            onChange={(event) => setTaskTagsInput(event.target.value)}
            className="mt-2 w-full rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm"
            placeholder="Custom tags (comma separated)"
          />
          <div className="mt-2 rounded-lg border border-fuchsia-300/20 p-2 text-xs">
            <p className="font-medium">Select team(s)</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {teams.length > 0 ? (
                teams.map((team) => (
                  <label key={team} className="inline-flex items-center gap-1">
                    <input type="checkbox" checked={taskTeams.includes(team)} onChange={() => toggleSelectedTeam(team)} />
                    <span>{team}</span>
                  </label>
                ))
              ) : (
                <p className="text-zinc-500">No teams found yet.</p>
              )}
            </div>
          </div>
          <div className="mt-2 rounded-lg border border-fuchsia-300/20 p-2 text-xs">
            <p className="font-medium">Connect related tasks</p>
            <div className="mt-1 flex max-h-24 flex-wrap gap-2 overflow-auto">
              {tasks.map((task) => (
                <label key={task.id} className="inline-flex items-center gap-1">
                  <input type="checkbox" checked={taskRelatedIds.includes(task.id)} onChange={() => toggleRelatedTask(task.id)} />
                  <span>{task.title}</span>
                </label>
              ))}
            </div>
          </div>
        </form>

        <div className="mt-3 grid gap-2 md:grid-cols-4">
          <input
            value={taskSearch}
            onChange={(event) => setTaskSearch(event.target.value)}
            className="rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm"
            placeholder="Search tasks"
          />
          <select
            value={taskStatusFilter}
            onChange={(event) => setTaskStatusFilter(event.target.value as TaskStatusFilter)}
            className="rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm"
          >
            <option value="all">All statuses</option>
            <option value="todo">To do</option>
            <option value="in-progress">In progress</option>
            <option value="done">Done</option>
          </select>
          <select
            value={taskTeamFilter}
            onChange={(event) => setTaskTeamFilter(event.target.value)}
            className="rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm"
          >
            <option value="all">All teams</option>
            {teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
          <select
            value={taskProjectFilter}
            onChange={(event) => setTaskProjectFilter(event.target.value)}
            className="rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm"
          >
            <option value="all">All projects</option>
            {projects.map((project) => (
              <option key={project} value={project}>
                {project}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3 overflow-hidden rounded-xl border border-fuchsia-200/30 dark:border-fuchsia-300/10">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto_auto] gap-2 border-b border-fuchsia-200/30 bg-white/40 px-3 py-2 text-xs font-semibold dark:border-fuchsia-300/10 dark:bg-white/5">
            <span>Task</span>
            <span>Teams</span>
            <span>Project</span>
            <span>Status</span>
            <span>Page</span>
            <span>Action</span>
          </div>
          {filteredTasks.map((task) => (
            <div key={task.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_auto_auto] items-center gap-2 border-b border-fuchsia-200/20 px-3 py-2 text-sm last:border-b-0 dark:border-fuchsia-300/10">
              <span>{task.title}</span>
              <span className="text-zinc-500">{task.teams.join(", ")}</span>
              <span className="text-zinc-500">{task.project}</span>
              <span className="text-zinc-500">{task.status}</span>
              <Link href={`/tasks/${task.id}`} className="rounded-lg border border-fuchsia-300/40 px-2 py-1 text-xs text-center">
                Open page
              </Link>
              <button type="button" onClick={() => cycleTaskStatus(task.id, task.status)} className="rounded-lg border border-fuchsia-300/40 px-2 py-1 text-xs">
                Change status
              </button>
            </div>
          ))}
          {filteredTasks.length === 0 ? <p className="px-3 py-4 text-sm text-zinc-500">No tasks match the current filters.</p> : null}
        </div>
      </PageShell>

      <PageShell title="Documents / Files" description="Upload documents or paste external links (Google Docs, Word, Miro, Canva, etc).">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-fuchsia-200/30 p-3 dark:border-fuchsia-300/10">
            <p className="text-sm font-semibold">Upload file</p>
            <label className="mt-2 inline-flex cursor-pointer rounded-lg border border-fuchsia-300/40 px-3 py-2 text-sm">
              Upload document
              <input type="file" onChange={handleUploadDocument} className="hidden" />
            </label>
          </div>

          <form onSubmit={handleAddDocumentLink} className="rounded-xl border border-fuchsia-200/30 p-3 dark:border-fuchsia-300/10">
            <p className="text-sm font-semibold">Paste link</p>
            <div className="mt-2 flex gap-2">
              <input
                value={documentLink}
                onChange={(event) => setDocumentLink(event.target.value)}
                className="min-w-40 flex-1 rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm"
                placeholder="https://..."
              />
              <button type="submit" className="rounded-lg border border-fuchsia-300/40 px-3 py-2 text-sm">
                Add link
              </button>
            </div>
          </form>
        </div>

        <div className="mt-3 space-y-2">
          {documents.map((doc) => (
            <div key={doc.id} className="rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">
              <p className="font-medium">{doc.name}</p>
              <p className="text-xs text-zinc-500">
                Source: {doc.source === "link" ? "Link" : "Upload"} | Approved: {doc.approved ? "Yes" : "No"} | Up-to-date: {doc.upToDate ? "Yes" : "No"}
              </p>
              {doc.url ? (
                <a href={doc.url} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs text-fuchsia-400 underline">
                  Open link
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </PageShell>
    </div>
  );
}
