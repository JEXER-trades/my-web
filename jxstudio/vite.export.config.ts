// Exports the site as exactly three files — index.html, style.css, script.js —
// with fonts and images inlined. Works from a local folder or any static host.
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Classic (non-module) script so it also runs when opened via file://
const classicScript = (): Plugin => ({
  name: "classic-script",
  enforce: "post",
  transformIndexHtml: (html) =>
    html
      .replace(/<script type="module" crossorigin src="\.\/script\.js"><\/script>/, "")
      .replace("</body>", '  <script defer src="./script.js"></script>\n  </body>')
      .replace(/ crossorigin/g, "")
      .replace(/<link rel="icon"[^>]*>\s*/, "")
      .replace(/<!-- Static copy[\s\S]*?<\/form>\s*/, ""),
});

export default defineConfig({
  base: "./",
  plugins: [react(), classicScript()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  define: { "import.meta.env.VITE_HASH_ROUTER": JSON.stringify("1") },
  publicDir: false,
  build: {
    outDir: "dist-export",
    target: "es2020",
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
    modulePreload: false,
    rollupOptions: {
      output: {
        format: "iife",
        inlineDynamicImports: true,
        entryFileNames: "script.js",
        assetFileNames: (a) => (a.names?.[0]?.endsWith(".css") ? "style.css" : "[name][extname]"),
      },
    },
  },
});
