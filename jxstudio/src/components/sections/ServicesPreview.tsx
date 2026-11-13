import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { services } from "@/content/services";
import { Visual } from "@/components/visuals/Visual";
import { Reveal, TextReveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Arrow, TextLink } from "@/components/ui/Button";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Desktop: an index of services beside a sticky visual that changes as you
 * hover or focus each row. Mobile: each service is its own image-led block.
 */
export function ServicesPreview() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section className="bg-mist py-section" aria-labelledby="services-title">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal><SectionLabel index="02">Services</SectionLabel></Reveal>
            <TextReveal
              id="services-title"
              lines={["WHAT WE BRING", "TO THE TABLE."]}
              className="mt-8 font-display text-display-lg font-semibold md:mt-10"
            />
          </div>
          <Reveal delay={0.2}><TextLink to="/services">All services</TextLink></Reveal>
        </div>

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12">
          {/* Sticky visual (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-ink">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={current.slug}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease }}
                >
                  <Visual variant={current.visual} animate title={`${current.name} — abstract visual`} />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-8 text-paper">
                <span className="font-display text-7xl font-semibold tabular-nums tracking-[-0.05em]">{current.index}</span>
                <span className="max-w-[14rem] text-right text-sm text-paper/75">{current.short}</span>
              </div>
            </div>
          </div>

          {/* Index */}
          <ol className="border-t border-ink/10 lg:col-span-7">
            {services.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 0.05} className="border-b border-ink/10">
                <Link
                  to={`/services#${s.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group block py-8 md:py-10"
                >
                  <div className="mb-6 aspect-[16/10] overflow-hidden bg-ink lg:hidden">
                    <Visual variant={s.visual} />
                  </div>
                  <div className="flex items-start gap-5 md:gap-8">
                    <span className="pt-2 text-sm tabular-nums text-stone md:pt-3">{s.index}</span>
                    <div className="flex-1">
                      <h3
                        className={cn(
                          "font-display text-display-sm font-semibold transition-[color,transform] duration-700 ease-apple lg:group-hover:translate-x-2",
                          active === i ? "lg:text-ink" : "lg:text-ink/35",
                        )}
                      >
                        {s.name}
                      </h3>
                      <p className="mt-3 max-w-lg text-[1.0625rem] leading-relaxed text-stone">{s.description}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-medium">
                        <span className="link-underline pb-0.5 [.group:hover_&]:bg-[length:100%_1px]">Learn more</span>
                        <Arrow className="transition-transform duration-500 ease-apple group-hover:translate-x-1" />
                        <span className="sr-only"> about {s.name}</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
