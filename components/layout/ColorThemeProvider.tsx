"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  DEFAULT_COLOR_THEME,
  applyColorThemeToDocument,
  readStoredColorTheme,
  resolveAccentHex,
  storeColorTheme,
  type ColorThemePreference,
} from "@/lib/theme/color-theme";
import { PRESET_ACCENT_COLORS, generateAccentPalette } from "@/lib/theme/palette";

type ColorThemeContextValue = {
  preference: ColorThemePreference;
  accentHex: string;
  palette: ReturnType<typeof generateAccentPalette>;
  setPreset: (preset: ColorThemePreference["preset"]) => void;
  setCustomColor: (hex: string) => void;
};

const ColorThemeContext = createContext<ColorThemeContextValue | null>(null);

export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<ColorThemePreference>(DEFAULT_COLOR_THEME);

  useEffect(() => {
    const stored = readStoredColorTheme();
    setPreference(stored);
    applyColorThemeToDocument(stored);
  }, []);

  const accentHex = useMemo(() => resolveAccentHex(preference), [preference]);
  const palette = useMemo(() => generateAccentPalette(accentHex), [accentHex]);

  const updatePreference = useCallback((next: ColorThemePreference) => {
    setPreference(next);
    storeColorTheme(next);
    applyColorThemeToDocument(next);
  }, []);

  const setPreset = useCallback(
    (preset: ColorThemePreference["preset"]) => {
      updatePreference({
        preset,
        customColor:
          preset === "custom"
            ? preference.customColor
            : PRESET_ACCENT_COLORS[preset as keyof typeof PRESET_ACCENT_COLORS],
      });
    },
    [preference.customColor, updatePreference],
  );

  const setCustomColor = useCallback(
    (hex: string) => {
      updatePreference({ preset: "custom", customColor: hex });
    },
    [updatePreference],
  );

  const value = useMemo(
    () => ({
      preference,
      accentHex,
      palette,
      setPreset,
      setCustomColor,
    }),
    [accentHex, palette, preference, setCustomColor, setPreset],
  );

  return (
    <ColorThemeContext.Provider value={value}>{children}</ColorThemeContext.Provider>
  );
}

export function useColorTheme() {
  const context = useContext(ColorThemeContext);
  if (!context) {
    throw new Error("useColorTheme must be used within ColorThemeProvider");
  }

  return context;
}
