import { fileURLToPath } from "node:url"
import { defineConfig } from "vitest/config"

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
      "server-only": fileURLToPath(
        new URL("./tests/server-only-stub.ts", import.meta.url)
      ),
    },
  },
  test: { env: { TURSO_DATABASE_URL: `file:./data/test-${Date.now()}.db` } },
})
