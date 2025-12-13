import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@reduxjs/toolkit"],
  },  
  resolve: {
    alias: {
      '\\.css$': path.resolve(__dirname, 'src/tests/styleMock.js'),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "src/tests/setupTests.ts",
    globals: true,
    css: false,
    
  },
});
