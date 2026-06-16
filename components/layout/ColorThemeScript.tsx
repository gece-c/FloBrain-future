import { getColorThemeBootScript } from "@/lib/theme/color-theme";

export function ColorThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: getColorThemeBootScript(),
      }}
    />
  );
}
