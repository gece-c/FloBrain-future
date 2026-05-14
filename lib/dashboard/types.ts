export type DashboardIconKey =
  | "bar-chart-3"
  | "briefcase"
  | "calendar"
  | "credit-card"
  | "external-link"
  | "file-text"
  | "folder-kanban"
  | "globe"
  | "home"
  | "link-2"
  | "message-square"
  | "shield-check"
  | "sparkles"
  | "star"
  | "timer"
  | "users"
  | "video";

export type CustomDashboardTile = {
  id: string;
  title: string;
  description: string;
  href: string;
  iconKey: DashboardIconKey;
};

export const CUSTOM_DASHBOARD_TILES_STORAGE_KEY = "flobrain:dashboard:custom-tiles";
