import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

const LenisCtx = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisCtx);

/** Inertial smooth scrolling — skipped entirely for reduced-motion and touch-first users. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const raf = useRef<number>();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const instance = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), touchMultiplier: 1.4 });
    setLenis(instance);
    const loop = (time: number) => {
      instance.raf(time);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisCtx.Provider value={lenis}>{children}</LenisCtx.Provider>;
}

/** Scroll to top on navigation, or to the #hash target when one is present. */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    let frame = 0;
    let tries = 0;
    const toTop = () => (lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0));
    const toHash = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!el) {
        // Lazily-loaded pages may not have rendered the target yet — keep looking for ~2s.
        if (tries++ < 120) frame = requestAnimationFrame(toHash);
        return;
      }
      const offset = -72;
      if (lenis) {
        lenis.resize(); // page height may have changed since Lenis last measured it
        lenis.scrollTo(el, { offset });
      }
      else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
    };
    if (hash) {
      toTop();
      frame = requestAnimationFrame(toHash);
    } else {
      frame = requestAnimationFrame(toTop);
    }
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, lenis]);
  return null;
}
