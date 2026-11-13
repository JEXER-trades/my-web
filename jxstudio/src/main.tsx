import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "framer-motion";
import "@fontsource-variable/inter";
import "@fontsource-variable/inter-tight";
import "./index.css";
import App from "./App";
import { HeaderThemeProvider } from "@/components/layout/HeaderTheme";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        <HeaderThemeProvider>
          <SmoothScroll>
            <App />
          </SmoothScroll>
        </HeaderThemeProvider>
      </MotionConfig>
    </HelmetProvider>
  </StrictMode>,
);
