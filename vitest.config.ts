import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      obsidian: resolve(__dirname, "tests/mocks/obsidian.ts"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["tests/setup.ts", "tests/setup-msw.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["src/main.ts"],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
