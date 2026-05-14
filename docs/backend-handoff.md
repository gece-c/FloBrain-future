# FloBrain Frontend Backend Handoff

## Purpose
This frontend is intentionally mock-backed. Replace mock providers in `lib/services/mock/index.ts` with backend adapters that implement the interfaces in `lib/services/contracts.ts`.

## Service Contract Summary
- `AuthService.getCurrentUser()`: returns signed-in user profile with role and team memberships.
- `TaskService.getAllTasks()`: returns tasks for workspace, my workspace, and team views.
- `DocumentsService.getDocuments()`: returns docs with approval and freshness flags.
- `MeetingService.getMeetings()`: returns meeting title, start time, and links.
- `NotificationService.getNotifications()`: returns Discord-style notification feed items.

## UI Integration Points
- Role logic and gating: `lib/rbac/permissions.ts` and `components/rbac/RoleGate.tsx`.
- Dashboard tiles and role visibility: `app/(portal)/dashboard/page.tsx`.
- Workspace filters: `app/(portal)/workspace/page.tsx`.
- Teams directory + direct chat entry: `app/(portal)/teams/page.tsx` and `app/(portal)/chatrooms/direct/[userId]/page.tsx`.
- Reminder toasts and notification panel: `components/notifications/*` and `lib/notifications/reminderScheduler.ts`.

## Recommended Backend Adapter Pattern
1. Keep interfaces in `lib/services/contracts.ts` unchanged.
2. Add API-backed providers in a new folder, e.g. `lib/services/api`.
3. Swap imports in pages/components from `lib/services/mock` to `lib/services/api`.
4. Preserve output shapes to avoid UI churn.
