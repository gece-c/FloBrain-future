/** Must match the GitHub Pages project site path (repo name). */
export const SITE_BASE_PATH = "/FloBrain-future";

export function toAppPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_BASE_PATH}${normalized}`;
}
