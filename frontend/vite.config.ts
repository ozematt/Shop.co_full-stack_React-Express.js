/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: "0.0.0.0",
    proxy: {
      "/api": "http://localhost:3005",
    },
  },
  test: {
    coverage: {
      reporter: ["cobertura", "json", "html"],
    },
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.{spec,test}.{ts,tsx}"],
    setupFiles: ["/setupTests.mjs"],
  },
});
