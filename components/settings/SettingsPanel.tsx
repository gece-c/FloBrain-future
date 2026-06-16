"use client";

import {
  Bell,
  Globe,
  Lock,
  LogOut,
  Monitor,
  Moon,
  Shield,
  Sun,
  User,
} from "lucide-react";
import { ColorThemePicker } from "@/components/settings/ColorThemePicker";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";

import { SignOutButton } from "@/components/auth/SignOutButton";

const sections = [
  { id: "general", label: "General", icon: User },
  { id: "account", label: "Account", icon: LogOut },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Monitor },
  { id: "privacy", label: "Privacy", icon: Shield },
  { id: "language", label: "Language", icon: Globe },
] as const;

type SectionId = (typeof sections)[number]["id"];

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-fuchsia-200/40 px-4 py-3 dark:border-fuchsia-300/10">
      <span>
        <span className="block text-sm font-medium text-zinc-800 dark:text-zinc-100">{label}</span>
        {description ? (
          <span className="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-400">{description}</span>
        ) : null}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-fuchsia-600" : "bg-zinc-300 dark:bg-zinc-600"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </label>
  );
}

export function SettingsPanel() {
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<SectionId>("general");
  const [emailDigest, setEmailDigest] = useState(true);
  const [meetingReminders, setMeetingReminders] = useState(true);
  const [taskUpdates, setTaskUpdates] = useState(false);
  const [buddyMessages, setBuddyMessages] = useState(true);
  const [profileVisible, setProfileVisible] = useState(true);
  const [activityStatus, setActivityStatus] = useState(true);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-fuchsia-300/25 bg-theme-panel/95 shadow-lg shadow-fuchsia-900/5 dark:border-fuchsia-300/15 dark:bg-theme-panel/95">
      <div className="border-b border-fuchsia-200/40 px-5 py-4 dark:border-fuchsia-300/10">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Settings</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Manage your account preferences and workspace defaults.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row">
        <nav className="border-b border-fuchsia-200/40 p-3 lg:w-56 lg:border-b-0 lg:border-r dark:border-fuchsia-300/10">
          <div className="flex gap-1 overflow-x-auto lg:flex-col">
            {sections.map((section) => {
              const Icon = section.icon;
              const active = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
                    active
                      ? "bg-fuchsia-100 font-medium text-fuchsia-900 dark:bg-theme-muted dark:text-fuchsia-100"
                      : "text-zinc-600 hover:bg-fuchsia-50/80 dark:text-zinc-300 dark:hover:bg-theme-hover"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="min-w-0 flex-1 p-5">
          {activeSection === "general" ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">General</h2>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Basic account and workspace options.</p>
              </div>
              <div className="space-y-3">
                <label className="block">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Display name</span>
                  <input
                    type="text"
                    defaultValue="FloBrain Member"
                    className="mt-1.5 w-full rounded-xl border border-fuchsia-200/50 bg-theme-elevated px-3 py-2 text-sm outline-none focus:border-fuchsia-400 dark:border-fuchsia-300/15 dark:bg-theme-elevated"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Default landing page</span>
                  <select className="mt-1.5 w-full rounded-xl border border-fuchsia-200/50 bg-theme-elevated px-3 py-2 text-sm outline-none focus:border-fuchsia-400 dark:border-fuchsia-300/15 dark:bg-theme-elevated">
                    <option>Dashboard</option>
                    <option>My Workspace</option>
                    <option>AI Chat</option>
                  </select>
                </label>
                <Link
                  href="/profile"
                  className="inline-flex items-center gap-2 text-sm font-medium text-fuchsia-600 hover:text-fuchsia-500 dark:text-fuchsia-300"
                >
                  <Lock className="h-3.5 w-3.5" />
                  View full profile and access details
                </Link>
              </div>
            </div>
          ) : null}

          {activeSection === "notifications" ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Notifications</h2>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Choose what you want to be notified about.</p>
              </div>
              <div className="space-y-2">
                <Toggle
                  checked={emailDigest}
                  onChange={setEmailDigest}
                  label="Daily email digest"
                  description="Summary of tasks, meetings, and team activity."
                />
                <Toggle
                  checked={meetingReminders}
                  onChange={setMeetingReminders}
                  label="Meeting reminders"
                  description="Alerts before scheduled meetings start."
                />
                <Toggle
                  checked={taskUpdates}
                  onChange={setTaskUpdates}
                  label="Task assignment updates"
                  description="When tasks are assigned or status changes."
                />
                <Toggle
                  checked={buddyMessages}
                  onChange={setBuddyMessages}
                  label="AI buddy messages"
                  description="Replies and suggestions from your AI buddies."
                />
              </div>
            </div>
          ) : null}

          {activeSection === "appearance" ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Appearance</h2>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Customize how FloBrain looks on your device.</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-100">Color mode</h3>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Choose light, dark, or match your system.</p>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  { value: "light", label: "Light", icon: Sun },
                  { value: "dark", label: "Dark", icon: Moon },
                  { value: "system", label: "System", icon: Monitor },
                ].map((option) => {
                  const Icon = option.icon;
                  const active = theme === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setTheme(option.value)}
                      className={`flex flex-col items-center gap-2 rounded-xl border px-4 py-4 transition ${
                        active
                          ? "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-900 dark:border-fuchsia-400 dark:bg-theme-muted dark:text-fuchsia-100"
                          : "border-fuchsia-200/40 bg-theme-panel hover:bg-theme-hover/50 dark:border-fuchsia-300/10 dark:bg-theme-elevated dark:hover:bg-theme-hover"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  );
                })}
              </div>
              <ColorThemePicker />
            </div>
          ) : null}

          {activeSection === "privacy" ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Privacy</h2>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Control visibility and data sharing.</p>
              </div>
              <div className="space-y-2">
                <Toggle
                  checked={profileVisible}
                  onChange={setProfileVisible}
                  label="Show profile to teammates"
                  description="Let others see your name, role, and teams."
                />
                <Toggle
                  checked={activityStatus}
                  onChange={setActivityStatus}
                  label="Show online status"
                  description="Display when you are active in the workspace."
                />
              </div>
            </div>
          ) : null}

          {activeSection === "account" ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Account</h2>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  Sign out of FloBrain on this device or review your profile.
                </p>
              </div>
              <div className="space-y-3 rounded-xl border border-fuchsia-200/40 p-4 dark:border-fuchsia-300/10">
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  You are signed in to the demo workspace. Signing out returns you to the login screen.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/profile"
                    className="inline-flex items-center gap-2 rounded-xl border border-fuchsia-200/50 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-fuchsia-50 dark:border-fuchsia-300/15 dark:text-zinc-200 dark:hover:bg-theme-hover"
                  >
                    View profile
                  </Link>
                  <SignOutButton variant="danger" />
                </div>
              </div>
            </div>
          ) : null}

          {activeSection === "language" ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Language & region</h2>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Set your preferred language and formats.</p>
              </div>
              <div className="space-y-3">
                <label className="block">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Language</span>
                  <select className="mt-1.5 w-full rounded-xl border border-fuchsia-200/50 bg-theme-elevated px-3 py-2 text-sm outline-none focus:border-fuchsia-400 dark:border-fuchsia-300/15 dark:bg-theme-elevated">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Turkish</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Time zone</span>
                  <select className="mt-1.5 w-full rounded-xl border border-fuchsia-200/50 bg-theme-elevated px-3 py-2 text-sm outline-none focus:border-fuchsia-400 dark:border-fuchsia-300/15 dark:bg-theme-elevated">
                    <option>Europe/Istanbul (GMT+3)</option>
                    <option>America/New_York (GMT-5)</option>
                    <option>UTC</option>
                  </select>
                </label>
              </div>
            </div>
          ) : null}

          <div className="mt-6 flex items-center gap-3 border-t border-fuchsia-200/40 pt-5 dark:border-fuchsia-300/10">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-xl bg-fuchsia-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-fuchsia-500"
            >
              Save changes
            </button>
            {saved ? (
              <span className="text-sm text-fuchsia-600 dark:text-fuchsia-300">Settings saved.</span>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
