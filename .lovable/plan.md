## Lovable reference audit

Scanned the entire repo (excluding `node_modules`, `bun.lock`, `.git`). Remaining matches:

**Build toolchain — must keep**
- `package.json` → `"@lovable.dev/vite-tanstack-config": "2.7.1"`
- `bunfig.toml` → allowlist for `@lovable.dev/*` packages
- `vite.config.ts` → imports `defineConfig` from `@lovable.dev/vite-tanstack-config`

These are the Vite/TanStack Start build plugin that compiles the site. They are internal tooling, not visible to end users, and removing them breaks the build. They must stay.

**Safe to remove**
- `.lovable/plan.md` — stale internal planning note, not referenced anywhere.

**Also present but empty of Lovable strings**
- `.lovable/project.json` — template metadata (`"template": "tanstack_start_ts_current"`), no "Lovable" text; harmless. Can be kept or removed; recommend keeping since it's platform metadata, not user-facing.

## Proposed action
1. Delete `.lovable/plan.md`.
2. Leave everything else as-is.

Nothing user-visible in the built site references Lovable — all remaining occurrences are internal build config.