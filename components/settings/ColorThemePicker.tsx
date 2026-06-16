"use client";

import { Check, Palette } from "lucide-react";

import { useColorTheme } from "@/components/layout/ColorThemeProvider";
import {
  NEUTRAL_SWATCHES,
  PRESET_ACCENT_COLORS,
  type PresetAccentId,
} from "@/lib/theme/palette";

const PRESET_LABELS: Record<PresetAccentId, string> = {
  fuchsia: "Fuchsia",
  violet: "Violet",
  blue: "Blue",
  emerald: "Emerald",
  rose: "Rose",
  amber: "Amber",
  cyan: "Cyan",
};

export function ColorThemePicker() {
  const { preference, palette, accentHex, setPreset, setCustomColor } = useColorTheme();
  const customActive = preference.preset === "custom";

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-100">Accent color</h3>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Pick a preset or use the color wheel. Shades adapt to light and dark mode.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {(Object.keys(PRESET_ACCENT_COLORS) as PresetAccentId[]).map((presetId) => {
          const active = preference.preset === presetId;
          return (
            <button
              key={presetId}
              type="button"
              onClick={() => setPreset(presetId)}
              className={`group flex flex-col items-center gap-1.5 rounded-xl border p-2 transition ${
                active
                  ? "border-fuchsia-500 bg-fuchsia-50 dark:border-fuchsia-400 dark:bg-theme-muted"
                  : "border-fuchsia-200/40 bg-theme-panel hover:bg-theme-hover/50 dark:border-fuchsia-300/10 dark:bg-theme-elevated dark:hover:bg-theme-hover"
              }`}
              aria-label={`${PRESET_LABELS[presetId]} theme`}
              title={PRESET_LABELS[presetId]}
            >
              <span
                className="relative flex h-8 w-8 items-center justify-center rounded-full shadow-sm ring-1 ring-black/5"
                style={{ backgroundColor: PRESET_ACCENT_COLORS[presetId] }}
              >
                {active ? <Check className="h-4 w-4 text-white drop-shadow" /> : null}
              </span>
              <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-300">
                {PRESET_LABELS[presetId]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border border-fuchsia-200/40 bg-theme-panel p-4 dark:border-fuchsia-300/10 dark:bg-theme-elevated">
        <div className="flex flex-wrap items-center gap-4">
          <label className="relative flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-fuchsia-300/40 shadow-inner dark:border-fuchsia-300/20">
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(
                  #ef4444,
                  #f59e0b,
                  #eab308,
                  #22c55e,
                  #06b6d4,
                  #3b82f6,
                  #8b5cf6,
                  #ec4899,
                  #ef4444
                )`,
              }}
            />
            <span
              className="absolute inset-[5px] rounded-full border border-white/70 bg-white dark:border-zinc-800/70 dark:bg-theme-panel"
              style={{ backgroundColor: customActive ? accentHex : undefined }}
            />
            <input
              type="color"
              value={accentHex}
              onChange={(event) => setCustomColor(event.target.value)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              aria-label="Custom accent color"
            />
            <Palette className="relative z-10 h-5 w-5 text-zinc-700 dark:text-zinc-200" />
          </label>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">Custom color</p>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              Click the wheel to choose any color. Your pick is saved automatically.
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-wide text-fuchsia-700 dark:text-fuchsia-300">
              {accentHex}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Accent shades
        </p>
        <div className="grid grid-cols-5 gap-1 sm:grid-cols-10">
          {([50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const).map((shade) => (
            <div key={shade} className="space-y-1">
              <div
                className="h-8 rounded-lg border border-black/5 dark:border-white/10"
                style={{ backgroundColor: palette[shade] }}
                title={`${shade}`}
              />
              <p className="text-center text-[10px] text-zinc-500 dark:text-zinc-400">{shade}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Neutrals
        </p>
        <div className="flex gap-1">
          {NEUTRAL_SWATCHES.map((color) => (
            <div
              key={color}
              className="h-8 flex-1 rounded-lg border border-black/5 dark:border-white/10"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
