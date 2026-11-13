// Single-file build used for shareable previews: all JS, CSS, fonts and images inlined,
// routing kept in memory so it runs inside a sandboxed frame.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "node:path";

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  define: { "import.meta.env.VITE_MEMORY_ROUTER": JSON.stringify("1") },
  build: { outDir: "dist-preview", target: "es2020", assetsInlineLimit: 100_000_000 },
});
