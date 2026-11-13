import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ElementType, type ReactNode } from "react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** Fade + rise when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "p" | "span";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: reduce ? 0.3 : 1.1, delay, ease }}
    >
      {children}
    </Comp>
  );
}

/**
 * Line-by-line masked text reveal for headlines.
 * Pass `lines` so line breaks are art-directed rather than left to chance.
 */
export function TextReveal({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  immediate = false,
  id,
}: {
  id?: string;
  lines: string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Animate on mount instead of on scroll (used in the hero). */
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{lines.join(" ")}</span>
      <motion.span aria-hidden className="block" initial="hidden" {...trigger} transition={{ staggerChildren: 0.11, delayChildren: delay }}>
        {lines.map((line, i) => (
          <span key={i} className={cn("block overflow-hidden pb-[0.08em] -mb-[0.08em]", lineClassName)}>
            <motion.span
              className="block will-change-transform"
              variants={{
                hidden: reduce ? { opacity: 0 } : { y: "110%" },
                show: reduce ? { opacity: 1 } : { y: "0%" },
              }}
              transition={{ duration: reduce ? 0.3 : 1.15, ease }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Image/visual that unveils with a clip-path wipe and a gentle scale settle. */
export function ImageReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={reduce ? { opacity: 0 } : { clipPath: "inset(12% 8% 12% 8%)", opacity: 0.4 }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduce ? 0.3 : 1.4, delay, ease }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduce ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, delay, ease }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Subtle parallax: children drift by `distance` px across the element's scroll range. */
export function Parallax({ children, distance = 80, className }: { children: ReactNode; distance?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y: MotionValue<number> = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-distance / 2, distance / 2]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }} className="absolute inset-[-8%_0]">
        {children}
      </motion.div>
    </div>
  );
}
