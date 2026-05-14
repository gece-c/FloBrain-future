"use client";

import { FormEvent, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { PageShell } from "@/components/layout/PageShell";
import { authService, taskService } from "@/lib/services/mock";

export default function TaskDetailPage() {
  const params = useParams<{ taskId: string }>();
  const taskId = params.taskId;
  const user = useMemo(() => authService.getCurrentUser(), []);

  const [task, setTask] = useState(() => taskService.getTaskById(taskId));
  const [comments, setComments] = useState(() => taskService.getComments(taskId));
  const [commentBody, setCommentBody] = useState("");

  const [title, setTitle] = useState(task?.title ?? "");
  const [status, setStatus] = useState<"todo" | "in-progress" | "done">(task?.status ?? "todo");
  const [project, setProject] = useState(task?.project ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [tagsInput, setTagsInput] = useState(task?.tags.join(", ") ?? "");
  const [teams, setTeams] = useState<string[]>(task?.teams ?? []);
  const [relatedIds, setRelatedIds] = useState<string[]>(task?.relatedTaskIds ?? []);

  const allTasks = taskService.getAllTasks();
  const allTeams = taskService.getKnownTeams();

  if (!task) {
    return (
      <PageShell title="Task not found">
        <p className="text-sm text-zinc-500">This task does not exist or was removed.</p>
      </PageShell>
    );
  }

  const toggleTeam = (team: string) => {
    setTeams((prev) => (prev.includes(team) ? prev.filter((item) => item !== team) : [...prev, team]));
  };

  const toggleRelatedTask = (relatedTaskId: string) => {
    setRelatedIds((prev) => (prev.includes(relatedTaskId) ? prev.filter((item) => item !== relatedTaskId) : [...prev, relatedTaskId]));
  };

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedTags = tagsInput
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const updated = taskService.updateTask(taskId, {
      title: title.trim() || task.title,
      status,
      project: project.trim() || "General",
      description: description.trim(),
      tags: parsedTags,
      teams: teams.length > 0 ? teams : task.teams,
      relatedTaskIds: relatedIds.filter((item) => item !== taskId),
    });
    if (!updated) return;
    setTask(updated);
  };

  const handleAddComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = commentBody.trim();
    if (!body) return;
    taskService.addComment(taskId, body, user.name);
    setComments(taskService.getComments(taskId));
    setCommentBody("");
  };

  return (
    <div className="space-y-4">
      <PageShell title={task.title} description="Task page with editable details, related context, and feedback comments.">
        <form onSubmit={handleSave} className="space-y-3">
          <div className="grid gap-2 md:grid-cols-2">
            <input value={title} onChange={(event) => setTitle(event.target.value)} className="rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm" placeholder="Task title" />
            <input value={project} onChange={(event) => setProject(event.target.value)} className="rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm" placeholder="Project" />
          </div>

          <textarea value={description} onChange={(event) => setDescription(event.target.value)} className="h-28 w-full rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm" placeholder="Task description/context" />

          <div className="grid gap-2 md:grid-cols-2">
            <select value={status} onChange={(event) => setStatus(event.target.value as "todo" | "in-progress" | "done")} className="rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm">
              <option value="todo">To do</option>
              <option value="in-progress">In progress</option>
              <option value="done">Done</option>
            </select>
            <input value={tagsInput} onChange={(event) => setTagsInput(event.target.value)} className="rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm" placeholder="Tags (comma separated)" />
          </div>

          <div className="rounded-lg border border-fuchsia-300/20 p-2 text-xs">
            <p className="font-medium">Team(s)</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {allTeams.map((team) => (
                <label key={team} className="inline-flex items-center gap-1">
                  <input type="checkbox" checked={teams.includes(team)} onChange={() => toggleTeam(team)} />
                  <span>{team}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-fuchsia-300/20 p-2 text-xs">
            <p className="font-medium">Related tasks</p>
            <div className="mt-1 flex max-h-28 flex-wrap gap-2 overflow-auto">
              {allTasks
                .filter((item) => item.id !== taskId)
                .map((item) => (
                  <label key={item.id} className="inline-flex items-center gap-1">
                    <input type="checkbox" checked={relatedIds.includes(item.id)} onChange={() => toggleRelatedTask(item.id)} />
                    <span>{item.title}</span>
                  </label>
                ))}
            </div>
          </div>

          <button type="submit" className="rounded-lg border border-fuchsia-300/40 px-3 py-2 text-sm">
            Save task page
          </button>
        </form>
      </PageShell>

      <PageShell title="Comments / Feedback" description="Team members can leave updates or feedback here.">
        <form onSubmit={handleAddComment} className="mb-3">
          <div className="flex gap-2">
            <input
              value={commentBody}
              onChange={(event) => setCommentBody(event.target.value)}
              className="min-w-52 flex-1 rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm"
              placeholder="Write a comment"
            />
            <button type="submit" className="rounded-lg border border-fuchsia-300/40 px-3 py-2 text-sm">
              Add comment
            </button>
          </div>
        </form>

        <div className="space-y-2">
          {comments.map((comment) => (
            <div key={comment.id} className="rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">
              <p className="font-medium">{comment.authorName}</p>
              <p className="text-xs text-zinc-500">{new Date(comment.createdAt).toLocaleString()}</p>
              <p className="mt-1">{comment.body}</p>
            </div>
          ))}
          {comments.length === 0 ? <p className="text-sm text-zinc-500">No comments yet.</p> : null}
        </div>
      </PageShell>
    </div>
  );
}
