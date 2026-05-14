"use client";

import { FormEvent, useState } from "react";

import { PageShell } from "@/components/layout/PageShell";
import { notesService } from "@/lib/services/mock";

export default function MeetingNotesPage() {
  const [notes, setNotes] = useState(() => notesService.getNotes());
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleCreateNote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    if (!trimmedTitle || !trimmedBody) return;
    notesService.createNote({ title: trimmedTitle, body: trimmedBody });
    setNotes(notesService.getNotes());
    setTitle("");
    setBody("");
  };

  return (
    <PageShell title="Meeting Notes Pages" description="Create and manage page-style meeting notes.">
      <form onSubmit={handleCreateNote} className="mb-3 rounded-xl border border-fuchsia-200/30 p-3 dark:border-fuchsia-300/10">
        <p className="text-sm font-semibold">Add note</p>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="mt-2 w-full rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm"
          placeholder="Note title"
        />
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          className="mt-2 h-24 w-full rounded-lg border border-fuchsia-300/30 bg-transparent px-3 py-2 text-sm"
          placeholder="Write meeting notes"
        />
        <button className="mt-2 rounded-lg border border-fuchsia-300/40 px-3 py-2 text-sm">Create note</button>
      </form>

      <div className="space-y-2">
        {notes.map((note) => (
          <div key={note.id} className="rounded-xl border border-fuchsia-200/30 p-3 text-sm dark:border-fuchsia-300/10">
            <p className="font-medium">{note.title}</p>
            <p className="text-xs text-zinc-500">{new Date(note.createdAt).toLocaleString()}</p>
            <p className="mt-1">{note.body}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
