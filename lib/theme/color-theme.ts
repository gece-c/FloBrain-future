import {
  PRESET_ACCENT_COLORS,
  type PresetAccentId,
  generateAccentPalette,
  generateThemeSurfaces,
  paletteToCssVariables,
} from "@/lib/theme/palette";

export const COLOR_THEME_STORAGE_KEY = "flobrain-accent-theme";

export type ColorThemePreference = {
  preset: PresetAccentId | "custom";
  customColor: string;
};

export const DEFAULT_COLOR_THEME: ColorThemePreference = {
  preset: "fuchsia",
  customColor: PRESET_ACCENT_COLORS.fuchsia,
};

export function resolveAccentHex(preference: ColorThemePreference) {
  if (preference.preset === "custom") {
    return preference.customColor;
  }

  return PRESET_ACCENT_COLORS[preference.preset];
}

export function buildColorThemeStyle(preference: ColorThemePreference) {
  const accentHex = resolveAccentHex(preference);
  const palette = generateAccentPalette(accentHex);
  const surfaces = generateThemeSurfaces(accentHex, palette);

  return paletteToCssVariables(palette, surfaces);
}

export function readStoredColorTheme(): ColorThemePreference {
  if (typeof window === "undefined") {
    return DEFAULT_COLOR_THEME;
  }

  try {
    const raw = window.localStorage.getItem(COLOR_THEME_STORAGE_KEY);
    if (!raw) {
      return DEFAULT_COLOR_THEME;
    }

    const parsed = JSON.parse(raw) as Partial<ColorThemePreference>;
    const preset =
      parsed.preset && (parsed.preset === "custom" || parsed.preset in PRESET_ACCENT_COLORS)
        ? parsed.preset
        : DEFAULT_COLOR_THEME.preset;
    const customColor =
      typeof parsed.customColor === "string" && /^#[0-9a-fA-F]{6}$/.test(parsed.customColor)
        ? parsed.customColor
        : DEFAULT_COLOR_THEME.customColor;

    return { preset, customColor };
  } catch {
    return DEFAULT_COLOR_THEME;
  }
}

export function storeColorTheme(preference: ColorThemePreference) {
  window.localStorage.setItem(COLOR_THEME_STORAGE_KEY, JSON.stringify(preference));
}

export function applyColorThemeToDocument(preference: ColorThemePreference) {
  const variables = buildColorThemeStyle(preference);
  const root = document.documentElement;

  for (const [name, value] of Object.entries(variables)) {
    root.style.setProperty(name, value);
  }
}

export function getColorThemeBootScript(): string {
  return `(function(){try{var raw=localStorage.getItem(${JSON.stringify(COLOR_THEME_STORAGE_KEY)});if(!raw)return;var pref=JSON.parse(raw);var colors=${JSON.stringify(PRESET_ACCENT_COLORS)};var hex=pref.preset==="custom"&&typeof pref.customColor==="string"&&/^#[0-9a-fA-F]{6}$/.test(pref.customColor)?pref.customColor:colors[pref.preset]||colors.fuchsia;function set(n,v){document.documentElement.style.setProperty(n,v)}function clamp(v,a,b){return Math.min(b,Math.max(a,v))}var h=parseInt(hex.slice(1),16),R=(h>>16)&255,G=(h>>8)&255,B=h&255,rn=R/255,gn=G/255,bn=B/255,mx=Math.max(rn,gn,bn),mn=Math.min(rn,gn,bn),dlt=mx-mn,l=(mx+mn)/2,hue=0,sat=0;if(dlt){sat=dlt/(1-Math.abs(2*l-1));if(mx===rn)hue=((gn-bn)/dlt)%6;else if(mx===gn)hue=(bn-rn)/dlt+2;else hue=(rn-gn)/dlt+4;hue*=60;if(hue<0)hue+=360}function hsl(H,S,L){S=clamp(S,0,100)/100;L=clamp(L,0,100)/100;var c=(1-Math.abs(2*L-1))*S,x=c*(1-Math.abs((H/60)%2-1)),m=L-c/2,r1=0,g1=0,b1=0;if(H<60){r1=c;g1=x}else if(H<120){r1=x;g1=c}else if(H<180){g1=c;b1=x}else if(H<240){g1=x;b1=c}else if(H<300){r1=x;b1=c}else{r1=c;b1=x}function ch(v){return Math.round(clamp(v*255,0,255)).toString(16).padStart(2,"0")}return"#"+ch(r1+m)+ch(g1+m)+ch(b1+m)}var shades={50:97,100:94,200:86,300:77,400:66,500:55,600:48,700:40,800:32,900:24},baseSat=clamp(sat,45,92),palette={};Object.keys(shades).forEach(function(sh){var n=Number(sh),shadeSat=n<=200?clamp(baseSat-(200-n)*0.08,20,baseSat):baseSat;palette[sh]=hsl(hue,shadeSat,shades[sh]);set("--accent-"+sh,palette[sh])});set("--theme-background-light",hsl(hue,clamp(baseSat*0.55,32,62),90.5));set("--theme-gradient-end-light",hsl(hue,clamp(baseSat*0.5,28,58),84));set("--theme-panel-light",hsl(hue,clamp(baseSat*0.48,28,55),93.5));set("--theme-elevated-light",hsl(hue,clamp(baseSat*0.4,22,48),96));set("--theme-muted-light",palette[100]);set("--theme-hover-light",palette[50]);set("--theme-sidebar-light",hsl(hue,clamp(baseSat*0.46,26,52),94));set("--theme-interactive-light",palette[100]);set("--theme-foreground-light",hsl(hue,clamp(baseSat*0.85,40,90),12));set("--theme-background-dark",hsl(hue,clamp(baseSat*0.75,35,80),9));set("--theme-surface-dark",hsl(hue,clamp(baseSat*0.55,25,65),6));set("--theme-sidebar-dark",hsl(hue,clamp(baseSat*0.68,30,72),7));set("--theme-panel-dark",hsl(hue,clamp(baseSat*0.72,32,75),8.5));set("--theme-elevated-dark",hsl(hue,clamp(baseSat*0.74,34,78),10.5));set("--theme-hover-dark",hsl(hue,clamp(baseSat*0.7,30,74),13));set("--theme-muted-dark",hsl(hue,clamp(baseSat*0.76,36,80),16));set("--theme-navbar-dark",hsl(hue,clamp(baseSat*0.58,26,68),6));set("--theme-interactive-dark",hsl(hue,clamp(baseSat*0.72,32,75),11));set("--theme-foreground-dark",hsl(hue,clamp(baseSat*0.25,12,35),96))}catch(e){}})();`;
}
