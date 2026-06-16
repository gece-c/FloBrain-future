"use client";

import { useEffect, useState } from "react";

import { navTextControl } from "@/components/layout/nav-controls";

const TASK_OPTIONS = [
  "FloBrain UI Redesign",
  "API Website Refinement and Implementation",
  "MoodChanger Team Meeting",
];

const ACTIVITY_OPTIONS = ["Program tasks", "Team meetings", "Research", "Deep work"];

export function PersistentTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(TASK_OPTIONS[0]);
  const [selectedActivity, setSelectedActivity] = useState(ACTIVITY_OPTIONS[0]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => clearInterval(interval);
  }, [running]);

  const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  const timerText = `${hrs}:${mins}:${secs}`;

  const handleStart = () => {
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
    setSeconds(0);
  };

  return (
    <div className="relative">
      <button
        className={navTextControl}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Open timer panel"
      >
        {timerText}
      </button>

      {open ? (
        <div className="absolute right-0 top-12 z-40 w-80 rounded-2xl border border-fuchsia-300/30 bg-theme-panel p-3 text-white shadow-2xl">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-fuchsia-200">Active Timer</div>

          <label className="mb-2 block text-xs text-fuchsia-100">
            Task
            <select
              value={selectedTask}
              onChange={(event) => setSelectedTask(event.target.value)}
              className="mt-1 w-full rounded-lg border border-fuchsia-300/40 bg-theme-elevated px-2 py-2 text-xs text-white outline-none"
            >
              {TASK_OPTIONS.map((task) => (
                <option key={task} value={task} className="bg-theme-elevated">
                  {task}
                </option>
              ))}
            </select>
          </label>

          <label className="mb-3 block text-xs text-fuchsia-100">
            Activity Type
            <select
              value={selectedActivity}
              onChange={(event) => setSelectedActivity(event.target.value)}
              className="mt-1 w-full rounded-lg border border-fuchsia-300/40 bg-theme-elevated px-2 py-2 text-xs text-white outline-none"
            >
              {ACTIVITY_OPTIONS.map((activity) => (
                <option key={activity} value={activity} className="bg-theme-elevated">
                  {activity}
                </option>
              ))}
            </select>
          </label>

          <div className="mb-3 rounded-xl bg-theme-muted px-3 py-2 text-center text-2xl font-semibold tracking-wider">{timerText}</div>

          <div className="flex gap-2">
            {!running ? (
              <button
                className="flex-1 rounded-lg bg-fuchsia-600 px-3 py-2 text-sm font-medium text-white hover:bg-fuchsia-500"
                onClick={handleStart}
              >
                Start
              </button>
            ) : (
              <button
                className="flex-1 rounded-lg bg-rose-500 px-3 py-2 text-sm font-medium text-white hover:bg-rose-400"
                onClick={handleStop}
              >
                Stop and reset
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
