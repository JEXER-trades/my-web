import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { process } from "@/content/process";
import { Reveal, TextReveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ease } from "@/lib/motion";

export function Approach({ label = "05" }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="dark-section bg-night py-section text-paper" aria-labelledby="approach-title">
      <div className="container-site">
        <Reveal><SectionLabel index={label} className="text-stone">How we work</SectionLabel></Reveal>
        <TextReveal
          id="approach-title"
          lines={["THE JXSTUDIO", "APPROACH."]}
          className="mt-8 font-display text-display-lg font-semibold md:mt-10"
        />

        <div ref={ref} className="relative mt-16 md:mt-28">
          {/* Progress rail: horizontal on desktop, vertical on mobile */}
          <div aria-hidden className="absolute left-0 top-0 hidden h-px w-full bg-paper/15 md:block">
            <motion.div className="h-full origin-left bg-paper" style={{ scaleX: reduce ? 1 : progress }} />
          </div>
          <div aria-hidden className="absolute left-0 top-0 h-full w-px bg-paper/15 md:hidden">
            <motion.div className="h-full w-full origin-top bg-paper" style={{ scaleY: reduce ? 1 : progress }} />
          </div>

          <ol className="grid gap-14 pl-8 md:grid-cols-4 md:gap-8 md:pl-0">
            {process.map((step, i) => (
              <motion.li
                key={step.index}
                className="md:pt-12"
                initial={{ opacity: 0, y: reduce ? 0 : 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 1.1, delay: i * 0.12, ease }}
              >
                <span
                  className="block font-display text-[clamp(4.5rem,9vw,8.5rem)] font-semibold leading-none tracking-[-0.06em] text-transparent"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.55)" }}
                  aria-hidden
                >
                  {step.index}
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold uppercase tracking-[-0.02em] md:mt-10">
                  <span className="sr-only">Step {step.index}: </span>{step.title}
                </h3>
                <p className="mt-3 max-w-xs text-[1.0625rem] leading-relaxed text-paper/60">{step.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
