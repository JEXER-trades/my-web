import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Visual } from "@/components/visuals/Visual";
import { ButtonLink } from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/Reveal";
import { ease } from "@/lib/motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.04, 1.18]);
  const visualY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // A soft light that drifts toward the pointer on desktop.
  const mx = useMotionValue(0.62);
  const my = useMotionValue(0.38);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const lightX = useTransform(sx, (v) => `${v * 100}%`);
  const lightY = useTransform(sy, (v) => `${v * 100}%`);
  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(0.35 + (e.clientX / window.innerWidth) * 0.4);
      my.set(0.2 + (e.clientY / window.innerHeight) * 0.4);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, delay, ease },
  });

  return (
    <section ref={ref} className="dark-section relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper" aria-labelledby="hero-title">
      {/* Visual */}
      <motion.div className="absolute inset-0 -z-10" style={{ scale, y: visualY }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.2, ease }}>
        <Visual variant="lines" animate className="opacity-80" />
        <motion.div
          aria-hidden
          className="absolute h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ left: lightX, top: lightY, background: "radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 60%)" }}
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0)_30%,rgba(0,0,0,0.2)_60%,rgba(0,0,0,0.92)_100%)]" />

      <motion.div style={{ y: contentY, opacity: fade }} className="container-site flex flex-1 flex-col justify-end pb-14 pt-32 md:pb-20">
        <motion.p {...enter(0.2)} className="eyebrow mb-6 text-paper/70 md:mb-8">
          JXSTUDIO &amp; MANAGEMENT
        </motion.p>

        <TextReveal
          as="h1"
          id="hero-title"
          immediate
          delay={0.35}
          lines={["WE CREATE", "WHAT’S NEXT."]}
          className="font-display text-display-2xl font-semibold"
        />

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6 lg:col-span-5">
            <motion.p {...enter(1.0)} className="font-display text-display-sm font-medium text-paper">
              Creative vision. Strategic thinking. Digital excellence.
            </motion.p>
            <motion.p {...enter(1.12)} className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-paper/65">
              We help ambitious businesses transform ideas into meaningful brands, digital experiences, and opportunities.
            </motion.p>
          </div>
          <motion.div {...enter(1.25)} className="flex flex-wrap gap-3 md:col-span-6 md:justify-end lg:col-span-7">
            <ButtonLink to="/work" tone="dark" arrow>Explore Our Work</ButtonLink>
            <ButtonLink to="/contact" tone="dark" variant="secondary">Start a Project</ButtonLink>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 hidden h-10 w-px -translate-x-1/2 overflow-hidden bg-paper/15 md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <motion.span
          className="block h-1/2 w-full bg-paper"
          animate={reduce ? undefined : { y: ["-100%", "200%"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
        />
      </motion.div>
    </section>
  );
}
