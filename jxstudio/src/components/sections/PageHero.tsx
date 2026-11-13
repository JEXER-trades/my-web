import { motion, useReducedMotion } from "framer-motion";
import { TextReveal } from "@/components/ui/Reveal";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

/** Interior page header — oversized editorial headline with an intro line. */
export function PageHero({
  eyebrow, lines, intro, tone = "light", children,
}: { eyebrow: string; lines: string[]; intro?: string; tone?: "light" | "dark"; children?: React.ReactNode }) {
  const reduce = useReducedMotion();
  const dark = tone === "dark";
  return (
    <section className={cn("relative overflow-hidden pb-20 pt-40 md:pb-28 md:pt-52", dark ? "dark-section bg-ink text-paper" : "bg-paper text-ink")}>
      <div className="container-site">
        <motion.p
          className="eyebrow text-stone"
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
        >
          {eyebrow}
        </motion.p>
        <TextReveal as="h1" immediate delay={0.2} lines={lines} className="mt-8 font-display text-display-xl font-semibold md:mt-10" />
        {intro && (
          <motion.p
            className={cn("mt-10 max-w-xl text-lead md:ml-auto md:mt-14", dark ? "text-paper/65" : "text-stone")}
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease }}
          >
            {intro}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  );
}
