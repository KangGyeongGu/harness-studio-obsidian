---
paths:
  - "src/ui/**/*.ts"
---

# UI Layer Rules

- Use `containerEl` + `createEl()`/`createDiv()` for DOM construction — `innerHTML` is PROHIBITED (XSS risk)
- Use Obsidian CSS variables for styling — inline styles are PROHIBITED
- Register all event listeners and timers via `registerEvent()` / `registerInterval()` for automatic cleanup
- Clean up all resources in modal `onOpen`/`onClose` lifecycle methods
- Use sentence-style labels (not title case); provide keyboard shortcuts and description text
- Surface errors to the user with specific resolution guidance — never silently fail
- UI layer must access daemon data through the state layer only — no direct core/api calls
