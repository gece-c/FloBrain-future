export type AccentShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type AccentPalette = Record<AccentShade, string>;

export type ThemeSurfaces = {
  backgroundLight: string;
  gradientEndLight: string;
  panelLight: string;
  elevatedLight: string;
  mutedLight: string;
  hoverLight: string;
  sidebarLight: string;
  interactiveLight: string;
  foregroundLight: string;
  backgroundDark: string;
  surfaceDark: string;
  sidebarDark: string;
  panelDark: string;
  elevatedDark: string;
  mutedDark: string;
  hoverDark: string;
  navbarDark: string;
  interactiveDark: string;
  foregroundDark: string;
};

export const PRESET_ACCENT_COLORS = {
  fuchsia: "#d946ef",
  violet: "#8b5cf6",
  blue: "#3b82f6",
  emerald: "#10b981",
  rose: "#f43f5e",
  amber: "#f59e0b",
  cyan: "#06b6d4",
} as const;

export type PresetAccentId = keyof typeof PRESET_ACCENT_COLORS;

const SHADE_LIGHTNESS: Record<AccentShade, number> = {
  50: 97,
  100: 94,
  200: 86,
  300: 77,
  400: 66,
  500: 55,
  600: 48,
  700: 40,
  800: 32,
  900: 24,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalized = hex.replace("#", "").trim();
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return null;
  }

  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

export function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((channel) => clamp(Math.round(channel), 0, 255).toString(16).padStart(2, "0"))
    .join("")}`;
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return null;
  }

  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const l = (max + min) / 2;

  if (delta === 0) {
    return { h: 0, s: 0, l: l * 100 };
  }

  const s = delta / (1 - Math.abs(2 * l - 1));
  let h = 0;

  if (max === r) {
    h = ((g - b) / delta) % 6;
  } else if (max === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h *= 60;
  if (h < 0) {
    h += 360;
  }

  return { h, s: s * 100, l: l * 100 };
}

export function hslToHex(h: number, s: number, l: number) {
  const saturation = clamp(s, 0, 100) / 100;
  const lightness = clamp(l, 0, 100) / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lightness - chroma / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) {
    r = chroma;
    g = x;
  } else if (h < 120) {
    r = x;
    g = chroma;
  } else if (h < 180) {
    g = chroma;
    b = x;
  } else if (h < 240) {
    g = x;
    b = chroma;
  } else if (h < 300) {
    r = x;
    b = chroma;
  } else {
    r = chroma;
    b = x;
  }

  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

export function generateAccentPalette(baseHex: string): AccentPalette {
  const hsl = hexToHsl(baseHex) ?? { h: 292, s: 84, l: 55 };
  const saturation = clamp(hsl.s, 45, 92);

  return (Object.keys(SHADE_LIGHTNESS) as unknown as AccentShade[]).reduce((palette, shade) => {
    const shadeSaturation =
      shade <= 200 ? clamp(saturation - (200 - shade) * 0.08, 20, saturation) : saturation;

    palette[shade] = hslToHex(hsl.h, shadeSaturation, SHADE_LIGHTNESS[shade]);
    return palette;
  }, {} as AccentPalette);
}

export function generateThemeSurfaces(baseHex: string, palette: AccentPalette): ThemeSurfaces {
  const hsl = hexToHsl(baseHex) ?? { h: 292, s: 84, l: 55 };
  const h = hsl.h;
  const baseSat = clamp(hsl.s, 45, 92);

  return {
    backgroundLight: hslToHex(h, clamp(baseSat * 0.55, 32, 62), 90.5),
    gradientEndLight: hslToHex(h, clamp(baseSat * 0.5, 28, 58), 84),
    panelLight: hslToHex(h, clamp(baseSat * 0.48, 28, 55), 93.5),
    elevatedLight: hslToHex(h, clamp(baseSat * 0.4, 22, 48), 96),
    mutedLight: palette[100],
  hoverLight: palette[50],
  sidebarLight: hslToHex(h, clamp(baseSat * 0.46, 26, 52), 94),
  interactiveLight: palette[100],
  foregroundLight: hslToHex(h, clamp(baseSat * 0.85, 40, 90), 12),
    backgroundDark: hslToHex(h, clamp(baseSat * 0.75, 35, 80), 9),
    surfaceDark: hslToHex(h, clamp(baseSat * 0.55, 25, 65), 6),
    sidebarDark: hslToHex(h, clamp(baseSat * 0.68, 30, 72), 7),
    panelDark: hslToHex(h, clamp(baseSat * 0.72, 32, 75), 8.5),
    elevatedDark: hslToHex(h, clamp(baseSat * 0.74, 34, 78), 10.5),
  hoverDark: hslToHex(h, clamp(baseSat * 0.7, 30, 74), 13),
  mutedDark: hslToHex(h, clamp(baseSat * 0.76, 36, 80), 16),
  navbarDark: hslToHex(h, clamp(baseSat * 0.58, 26, 68), 6),
  interactiveDark: hslToHex(h, clamp(baseSat * 0.72, 32, 75), 11),
  foregroundDark: hslToHex(h, clamp(baseSat * 0.25, 12, 35), 96),
  };
}

export function paletteToCssVariables(palette: AccentPalette, surfaces: ThemeSurfaces) {
  return {
    "--accent-50": palette[50],
    "--accent-100": palette[100],
    "--accent-200": palette[200],
    "--accent-300": palette[300],
    "--accent-400": palette[400],
    "--accent-500": palette[500],
    "--accent-600": palette[600],
    "--accent-700": palette[700],
    "--accent-800": palette[800],
    "--accent-900": palette[900],
    "--theme-background-light": surfaces.backgroundLight,
    "--theme-gradient-end-light": surfaces.gradientEndLight,
    "--theme-panel-light": surfaces.panelLight,
    "--theme-elevated-light": surfaces.elevatedLight,
    "--theme-muted-light": surfaces.mutedLight,
    "--theme-hover-light": surfaces.hoverLight,
    "--theme-sidebar-light": surfaces.sidebarLight,
    "--theme-interactive-light": surfaces.interactiveLight,
    "--theme-foreground-light": surfaces.foregroundLight,
    "--theme-background-dark": surfaces.backgroundDark,
    "--theme-surface-dark": surfaces.surfaceDark,
    "--theme-sidebar-dark": surfaces.sidebarDark,
    "--theme-panel-dark": surfaces.panelDark,
    "--theme-elevated-dark": surfaces.elevatedDark,
    "--theme-muted-dark": surfaces.mutedDark,
    "--theme-hover-dark": surfaces.hoverDark,
    "--theme-navbar-dark": surfaces.navbarDark,
    "--theme-interactive-dark": surfaces.interactiveDark,
    "--theme-foreground-dark": surfaces.foregroundDark,
  } as const;
}

export const NEUTRAL_SWATCHES = ["#ffffff", "#f4f4f5", "#a1a1aa", "#52525b", "#18181b", "#000000"] as const;
