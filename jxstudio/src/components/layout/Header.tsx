import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { nav } from "@/config/site";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { Wordmark } from "@/components/ui/Wordmark";
import { useHeaderThemeValue } from "./HeaderTheme";
import { useLenis } from "./SmoothScroll";

export function Header() {
  const heroTheme = useHeaderThemeValue();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const lenis = useLenis();
  const menuBtn = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 480 && y > prev + 2 && !open);
    if (y < prev - 2) setHidden(false);
  });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  // Foreground: light text over dark heroes (until scrolled) and while the menu is open.
  const onDark = open || (!scrolled && heroTheme === "dark");

  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color,backdrop-filter] duration-500 ease-apple",
          onDark ? "text-paper" : "text-ink",
          scrolled && !open ? "border-b border-ink/[0.06] bg-paper/75 backdrop-blur-xl backdrop-saturate-150" : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-site flex h-[var(--nav-h)] items-center justify-between">
          <Link to="/" className="relative z-10 -m-2 p-2" aria-label="JXSTUDIO — Home">
            <Wordmark size="md" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
            <ul className="flex items-center gap-8">
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      cn("link-underline pb-0.5 text-[0.8125rem] tracking-[-0.005em] transition-opacity duration-300", isActive ? "opacity-100" : "opacity-65 hover:opacity-100")
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className={cn(
                "rounded-full px-4 py-2 text-[0.8125rem] font-medium transition-colors duration-500 ease-apple",
                onDark ? "bg-paper text-ink hover:bg-paper/85" : "bg-ink text-paper hover:bg-graphite",
              )}
            >
              Let's Talk
            </Link>
          </nav>

          <button
            ref={menuBtn}
            type="button"
            className="relative z-10 -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-6">
              <span className={cn("absolute left-0 h-[1.5px] w-6 bg-current transition-all duration-500 ease-apple", open ? "top-[5px] rotate-45" : "top-0")} />
              <span className={cn("absolute left-0 h-[1.5px] w-6 bg-current transition-all duration-500 ease-apple", open ? "top-[5px] -rotate-45" : "top-[10px]")} />
            </span>
          </button>
        </div>
      </motion.header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();
  const { pathname } = useLocation();
  const first = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (open) setTimeout(() => first.current?.focus(), 350);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="dark-section fixed inset-0 z-40 flex flex-col bg-ink text-paper md:hidden"
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
          exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease }}
        >
          <nav aria-label="Mobile" className="container-site flex flex-1 flex-col justify-center pt-[var(--nav-h)]">
            <motion.ul initial="hidden" animate="show" exit="hidden" variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } } }}>
              {nav.map((item, i) => (
                <li key={item.to} className="overflow-hidden">
                  <motion.div
                    variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
                    transition={{ duration: 0.8, ease }}
                  >
                    <Link
                      ref={i === 0 ? first : undefined}
                      to={item.to}
                      onClick={onClose}
                      aria-current={pathname === item.to ? "page" : undefined}
                      className="flex items-baseline gap-4 py-1.5 font-display text-[clamp(2.75rem,13vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.045em]"
                    >
                      <span className="w-7 text-xs font-normal tracking-normal text-stone tabular-nums">0{i + 1}</span>
                      <span className={pathname === item.to ? "" : "text-paper/80"}>{item.label}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </motion.ul>
          </nav>
          <motion.div
            className="container-site flex items-center justify-between border-t border-paper/10 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <span className="text-sm text-stone">Have a project in mind?</span>
            <Link to="/contact" onClick={onClose} className="rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink">
              Let's Talk
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
