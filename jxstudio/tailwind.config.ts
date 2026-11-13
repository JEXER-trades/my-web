import type { Config } from "tailwindcss";

/**
 * JXSTUDIO design tokens.
 * Colours, type scale and easing live here so every component
 * draws from one source of truth.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        paper: "#FFFFFF",
        mist: "#F5F5F7",
        stone: "#86868B",
        night: "#111111",
        line: "#D2D2D7",
        graphite: "#1D1D1F",
      },
      fontFamily: {
        sans: ['"Inter Variable"', "Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ['"Inter Tight Variable"', '"Inter Tight"', '"Inter Variable"', "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid display scale (min, preferred, max)
        "display-2xl": ["clamp(3.25rem, 12.4vw, 11.5rem)", { lineHeight: "0.9", letterSpacing: "-0.048em" }],
        "display-xl": ["clamp(2.75rem, 8vw, 8rem)", { lineHeight: "0.92", letterSpacing: "-0.05em" }],
        "display-lg": ["clamp(2.25rem, 5.6vw, 5.5rem)", { lineHeight: "0.96", letterSpacing: "-0.045em" }],
        "display-md": ["clamp(1.875rem, 3.6vw, 3.5rem)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        "display-sm": ["clamp(1.5rem, 2.4vw, 2.25rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        lead: ["clamp(1.125rem, 1.5vw, 1.375rem)", { lineHeight: "1.5", letterSpacing: "-0.012em" }],
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.22em" }],
      },
      spacing: {
        section: "clamp(6rem, 14vw, 13rem)",
        gutter: "clamp(1rem, 4vw, 3rem)",
      },
      maxWidth: {
        site: "90rem",
        prose: "38rem",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.22, 1, 0.36, 1)",
        "in-out-soft": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: { 400: "400ms", 600: "600ms", 900: "900ms" },
    },
  },
  plugins: [],
} satisfies Config;
