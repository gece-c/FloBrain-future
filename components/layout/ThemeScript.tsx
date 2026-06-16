const THEME_STORAGE_KEY = "theme";

export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var dark=t==="dark"||(t!=="light"&&d);document.documentElement.classList.toggle("dark",dark)}catch(e){}})();`,
      }}
    />
  );
}
