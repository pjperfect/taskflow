# TaskFlow API

A small internal task tracker used by a team to create, assign, and complete tasks.

## Setup

```bash
npm install
npm start
```

The server runs on `http://localhost:3000`. On first run it seeds a working
database file at `data/db.json` from `data/seed.json`.

To reset the database back to its original seed state at any point:

```bash
npm run reset
```

## API Overview

| Method | Route                                         | Description                                                                 |
| ------ | --------------------------------------------- | --------------------------------------------------------------------------- |
| GET    | `/tasks?page=1&pageSize=5`                    | List tasks, paginated                                                       |
| GET    | `/tasks?dueDate=2026-08-22&page=1&pageSize=5` | List tasks, filtered by exact due date (optional, combines with pagination) |
| GET    | `/tasks/:id`                                  | Get a single task                                                           |
| POST   | `/tasks`                                      | Create a task (`title`, optional `assigneeId`, `dueDate`)                   |
| PATCH  | `/tasks/:id/complete`                         | Mark a task complete (notifies the assignee)                                |
| DELETE | `/tasks/:id`                                  | Delete a task                                                               |
| POST   | `/tasks/bulk-delete`                          | Delete multiple tasks at once (`ids`: non-empty array)                      |
| GET    | `/users`                                      | List users                                                                  |

## Data model

**Task**: `{ id, title, assigneeId (nullable), completed, dueDate (nullable, "YYYY-MM-DD") }`
**User**: `{ id, name }`

Note that `assigneeId` and `dueDate` can both be `null` — some tasks are unassigned or have no due date set.

## Bug reports

All bugs from the original `bug-reports.txt` (crash on completing an unassigned task, pagination gap, lost-update race on concurrent completes) have been fixed and merged into `main`.
