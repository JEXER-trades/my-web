import type { Transition, Variants } from "framer-motion";

/** Shared motion language — one easing curve, a few durations. */
export const ease = [0.22, 1, 0.36, 1] as const;

export const t = (duration = 0.9, delay = 0): Transition => ({ duration, delay, ease });

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: t(1) },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});
