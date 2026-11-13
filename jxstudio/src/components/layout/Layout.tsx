import { motion, useReducedMotion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { ease } from "@/lib/motion";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ScrollManager } from "./SmoothScroll";

export function Layout() {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  return (
    <>
      <ScrollManager />
      <Header />
      <motion.main
        id="main"
        key={pathname}
        tabIndex={-1}
        className="outline-none"
        initial={{ opacity: 0, y: reduce ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </>
  );
}
