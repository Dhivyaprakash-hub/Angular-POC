# Taskflow

Taskflow is a responsive personal task board rebuilt with current Angular. Keep a small workload organized across To do, In progress, and Done; search it, filter by area, and switch between board and list views.

## Features

- Create, edit, move, and delete tasks with title validation, notes, area, priority, and due date.
- Dashboard counts for open work, due or overdue work, completion, and board progress.
- Board and list views, status and area filters, and task search (`Ctrl/⌘ + K`).
- Browser-local persistence and a JSON export for backup.
- Responsive layout with keyboard focus states, reduced-motion support, and accessible form labels.

## Local use

Requires Node.js 20.19+, 22.12+, or 24+ and npm.

```bash
npm install
npm start
```

Open the local address printed by Angular CLI. Build the static production bundle with `npm run build`; output is in `dist/taskflow`.

## Data and hosting

This is a single-browser personal workspace. Tasks are stored in that browser's local storage; there are no accounts, server, sync, or shared workspace. Browser storage is not an encrypted vault, so do not store confidential work details here. The static build can be hosted on a free static CDN without a paid runtime service.

## Stack

- Angular 21 with standalone components, signals, built-in template control flow, and zoneless change detection.
- Typed reactive forms and strict TypeScript.
- No UI framework or server dependencies.

The earlier Angular 14 learning prototype is retained under `archive/legacy-angular14` for reference and is excluded from the active application build.
