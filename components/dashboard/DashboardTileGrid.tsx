"use client";

import { Plus } from "lucide-react";
import { Fragment, useCallback, useId, useRef, useState, useSyncExternalStore } from "react";

import { ModuleTile } from "@/components/dashboard/ModuleTile";
import { customTileIconChoices, dashboardIconFor, isValidDashboardIconKey } from "@/components/dashboard/dashboardIcons";
import { RoleGate } from "@/components/rbac/RoleGate";
import { defaultDashboardTiles } from "@/lib/dashboard/defaultTiles";
import type { CustomDashboardTile, DashboardIconKey } from "@/lib/dashboard/types";
import { CUSTOM_DASHBOARD_TILES_STORAGE_KEY } from "@/lib/dashboard/types";
import type { FloBrainUser } from "@/lib/services/contracts";

function parseCustomTiles(raw: string | null): CustomDashboardTile[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(isValidStoredTile);
  } catch {
    return [];
  }
}

function isValidStoredTile(row: unknown): row is CustomDashboardTile {
  if (!row || typeof row !== "object") return false;
  const o = row as Record<string, unknown>;
  if (typeof o.id !== "string" || typeof o.title !== "string" || typeof o.description !== "string" || typeof o.href !== "string") return false;
  if (typeof o.iconKey !== "string" || !isValidDashboardIconKey(o.iconKey)) return false;
  return true;
}

function normalizeHref(input: string): string {
  const t = input.trim();
  if (!t) return "";
  if (/^https?:\/\//i.test(t)) return t;
  if (t.startsWith("/")) return t;
  if (/^[\w.-]+\.[a-z]{2,}(\/|$)/i.test(t)) return `https://${t}`;
  return `/${t.replace(/^\/+/, "")}`;
}

const customTileListeners = new Set<() => void>();

/** Raw string last read from localStorage: used so getSnapshot returns a stable array reference unless storage changed. */
let lastSeenStorageRaw: string | null | undefined;
let cachedTilesSnapshot: CustomDashboardTile[] = [];
const serverCustomTilesSnapshot: CustomDashboardTile[] = [];

function getServerCustomTiles(): CustomDashboardTile[] {
  return serverCustomTilesSnapshot;
}

function readStoredCustomTiles(): CustomDashboardTile[] {
  const raw = window.localStorage.getItem(CUSTOM_DASHBOARD_TILES_STORAGE_KEY);
  if (lastSeenStorageRaw === undefined || raw !== lastSeenStorageRaw) {
    lastSeenStorageRaw = raw;
    cachedTilesSnapshot = parseCustomTiles(raw);
  }
  return cachedTilesSnapshot;
}

function subscribeCustomTiles(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  customTileListeners.add(onStoreChange);
  const onStorage = (e: StorageEvent) => {
    if (e.key === CUSTOM_DASHBOARD_TILES_STORAGE_KEY || e.key === null) onStoreChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    customTileListeners.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

function notifyCustomTilesUpdated() {
  customTileListeners.forEach((fn) => {
    fn();
  });
}

function writeCustomTiles(tiles: CustomDashboardTile[]) {
  const json = JSON.stringify(tiles);
  window.localStorage.setItem(CUSTOM_DASHBOARD_TILES_STORAGE_KEY, json);
  lastSeenStorageRaw = json;
  cachedTilesSnapshot = tiles;
  notifyCustomTilesUpdated();
}

type DashboardTileGridProps = {
  user: FloBrainUser;
};

export function DashboardTileGrid({ user }: DashboardTileGridProps) {
  const customTiles = useSyncExternalStore(subscribeCustomTiles, readStoredCustomTiles, getServerCustomTiles);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hrefInput, setHrefInput] = useState("");
  const [iconKey, setIconKey] = useState<DashboardIconKey>("link-2");
  const [formError, setFormError] = useState<string | null>(null);

  const persist = useCallback((next: CustomDashboardTile[]) => {
    writeCustomTiles(next);
  }, []);

  const openAddDialog = () => {
    setTitle("");
    setDescription("");
    setHrefInput("");
    setIconKey("link-2");
    setFormError(null);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const submitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    const d = description.trim();
    const href = normalizeHref(hrefInput);
    if (!t) {
      setFormError("Title is required.");
      return;
    }
    if (!href) {
      setFormError("Enter a URL or path (e.g. /tasks or https://…).");
      return;
    }
    const next: CustomDashboardTile = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `tile-${Date.now()}`,
      title: t,
      description: d || "Custom shortcut",
      href,
      iconKey,
    };
    persist([...customTiles, next]);
    closeDialog();
  };

  const removeCustom = (id: string) => {
    persist(customTiles.filter((x) => x.id !== id));
  };

  return (
    <>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {defaultDashboardTiles.map((tile) => {
          const tileNode = (
            <ModuleTile title={tile.title} description={tile.description} href={tile.href} icon={dashboardIconFor(tile.iconKey)} />
          );
          if (tile.permission) {
            return (
              <RoleGate key={tile.id} user={user} permission={tile.permission} minLevel={tile.requireFull ? "full" : "view"}>
                {tileNode}
              </RoleGate>
            );
          }
          return <Fragment key={tile.id}>{tileNode}</Fragment>;
        })}

        {customTiles.map((tile) => (
          <ModuleTile
            key={tile.id}
            title={tile.title}
            description={tile.description}
            href={tile.href}
            icon={dashboardIconFor(tile.iconKey)}
            onRemove={() => removeCustom(tile.id)}
          />
        ))}

        <button
          type="button"
          onClick={openAddDialog}
          className="flex min-h-[140px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-fuchsia-300/40 bg-fuchsia-500/[0.04] p-5 text-center text-sm font-medium text-fuchsia-700 transition hover:border-fuchsia-400/60 hover:bg-fuchsia-500/[0.08] dark:border-fuchsia-400/25 dark:text-fuchsia-200 dark:hover:border-fuchsia-300/45 dark:hover:bg-fuchsia-500/10"
        >
          <span className="inline-flex rounded-lg bg-fuchsia-500/15 p-2 text-fuchsia-600 dark:text-fuchsia-300">
            <Plus className="h-5 w-5" />
          </span>
          Add shortcut
          <span className="max-w-[12rem] text-xs font-normal text-zinc-500 dark:text-zinc-400">Link to any page or external URL</span>
        </button>
      </section>

      <dialog
        ref={dialogRef}
        className="w-[min(100%,24rem)] rounded-2xl border border-fuchsia-200/50 bg-theme-panel p-5 text-zinc-900 shadow-xl backdrop:bg-black/40 dark:border-fuchsia-300/20 dark:bg-theme-panel dark:text-zinc-100"
        aria-labelledby={titleId}
        onClose={() => setFormError(null)}
      >
        <form onSubmit={submitAdd} className="space-y-4">
          <div>
            <h2 id={titleId} className="text-lg font-semibold">
              New shortcut
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Appears on your dashboard on this device.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="dash-tile-title" className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Title
            </label>
            <input
              id="dash-tile-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-theme-elevated px-3 py-2 text-sm outline-none ring-fuchsia-500/30 focus:ring-2 dark:border-zinc-600 dark:bg-theme-elevated"
              placeholder="e.g. Q2 roadmap"
              autoComplete="off"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="dash-tile-desc" className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Description (optional)
            </label>
            <input
              id="dash-tile-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-theme-elevated px-3 py-2 text-sm outline-none ring-fuchsia-500/30 focus:ring-2 dark:border-zinc-600 dark:bg-theme-elevated"
              placeholder="Short note"
              autoComplete="off"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="dash-tile-href" className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              URL or path
            </label>
            <input
              id="dash-tile-href"
              value={hrefInput}
              onChange={(e) => setHrefInput(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-theme-elevated px-3 py-2 text-sm outline-none ring-fuchsia-500/30 focus:ring-2 dark:border-zinc-600 dark:bg-theme-elevated"
              placeholder="/tasks or https://…"
              autoComplete="off"
            />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Icon</span>
            <div className="flex flex-wrap gap-2">
              {customTileIconChoices.map((opt) => (
                <label
                  key={opt.value}
                  className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition ${
                    iconKey === opt.value
                      ? "border-fuchsia-500 bg-fuchsia-500/15 text-fuchsia-800 dark:text-fuchsia-100"
                      : "border-zinc-200 dark:border-zinc-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="icon"
                    value={opt.value}
                    checked={iconKey === opt.value}
                    onChange={() => setIconKey(opt.value)}
                    className="sr-only"
                  />
                  {dashboardIconFor(opt.value)}
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {formError ? <p className="text-sm text-red-600 dark:text-red-400">{formError}</p> : null}

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={closeDialog}
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium dark:border-zinc-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-fuchsia-600 px-3 py-2 text-sm font-medium text-white hover:bg-fuchsia-500"
            >
              Add
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
