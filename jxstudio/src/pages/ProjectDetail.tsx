import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getProject, projects } from "@/content/projects";
import { Seo } from "@/components/ui/Seo";
import { useHeaderTheme } from "@/components/layout/HeaderTheme";
import { Media } from "@/components/visuals/Visual";
import { ImageReveal, Reveal, TextReveal } from "@/components/ui/Reveal";
import { Arrow, ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";
import NotFound from "./NotFound";
import { ease } from "@/lib/motion";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);
  useHeaderTheme(project ? "dark" : "light");
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "20%"]);

  if (!project) return <NotFound />;
  const idx = projects.indexOf(project);
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <Seo title={project.title} description={project.summary}  />
      {project.image ? (
        <section ref={ref} className="dark-section bg-ink pb-16 pt-36 text-paper md:pb-24 md:pt-48">
          <div className="container-site">
            <motion.p className="eyebrow text-paper/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }}>
              {project.industry}{project.label && ` · ${project.label}`}
            </motion.p>
            <TextReveal as="h1" immediate delay={0.25} lines={[project.title]} className="mt-6 font-display text-display-xl font-semibold" />
            <motion.p
              className="mt-8 max-w-xl text-lead text-paper/65 md:ml-auto"
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease }}
            >
              {project.summary}
            </motion.p>
            <motion.div
              className="mt-14 aspect-[16/10] overflow-hidden md:mt-20"
              initial={{ opacity: 0, y: reduce ? 0 : 40, scale: reduce ? 1 : 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.5, ease }}
            >
              <Media visual={project.visual} image={project.image} alt={project.imageAlt} priority />
            </motion.div>
          </div>
        </section>
      ) : (
        <section ref={ref} className="dark-section relative flex min-h-[88svh] items-end overflow-hidden bg-ink text-paper">
          <motion.div className="absolute inset-0" style={{ y }} initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.8, ease }}>
            <Media visual={project.visual} image={project.image} alt={project.imageAlt} animate priority />
          </motion.div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />
          <div className="container-site relative pb-14 pt-40 md:pb-20">
            <motion.p className="eyebrow text-paper/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}>
              {project.industry}{project.label && ` · ${project.label}`}
            </motion.p>
            <TextReveal as="h1" immediate delay={0.35} lines={[project.title]} className="mt-6 font-display text-display-xl font-semibold" />
          </div>
        </section>
      )}

      <section className="bg-paper py-section">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <dl className="divide-y divide-line border-y border-line text-[0.9375rem]">
              <div className="flex justify-between gap-6 py-4"><dt className="text-stone">Industry</dt><dd className="text-right">{project.industry}</dd></div>
              <div className="flex justify-between gap-6 py-4"><dt className="text-stone">Services</dt><dd className="text-right">{project.services.join(", ")}</dd></div>
              {project.year && <div className="flex justify-between gap-6 py-4"><dt className="text-stone">Year</dt><dd>{project.year}</dd></div>}
              {project.label && <div className="flex justify-between gap-6 py-4"><dt className="text-stone">Type</dt><dd className="text-right">{project.label} — fictional business</dd></div>}
            </dl>
            {project.liveUrl && (
              <ButtonLink to={project.liveUrl} variant="secondary" arrow className="mt-8">View live demo</ButtonLink>
            )}
          </Reveal>
          <div className="space-y-14 lg:col-span-7 lg:col-start-6">
            <Reveal>
              <h2 className="eyebrow font-sans text-stone">Overview</h2>
              <p className="mt-5 font-display text-display-sm font-medium">{project.overview}</p>
            </Reveal>
            <Reveal>
              <h2 className="eyebrow font-sans text-stone">The brief</h2>
              <p className="mt-5 text-lead text-stone">{project.challenge}</p>
            </Reveal>
            <Reveal>
              <h2 className="eyebrow font-sans text-stone">Our approach</h2>
              <p className="mt-5 text-lead text-stone">{project.approach}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-paper pb-section" aria-label="Project images">
        <div className="container-site grid gap-6 md:grid-cols-2 md:gap-8">
          {project.gallery.map((g, i) => (
            <figure key={i} className={i % 3 === 2 ? "md:col-span-2" : undefined}>
              <ImageReveal className="aspect-[4/5] bg-mist" delay={i * 0.1}>
                <Media visual={g.visual} image={g.image} alt={g.alt} />
              </ImageReveal>
              {g.caption && <figcaption className="mt-3 text-sm text-stone">{g.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </section>

      {next && next.slug !== project.slug && (
        <section className="dark-section bg-ink text-paper">
          <Link to={`/work/${next.slug}`} className="group container-site flex flex-col gap-6 py-20 md:flex-row md:items-end md:justify-between md:py-28">
            <div>
              <p className="eyebrow text-stone">Next project</p>
              <p className="mt-6 font-display text-display-lg font-semibold transition-transform duration-700 ease-apple group-hover:translate-x-3">{next.title}</p>
            </div>
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-paper/30 transition-colors duration-500 group-hover:bg-paper group-hover:text-ink">
              <Arrow />
            </span>
          </Link>
        </section>
      )}
      <CtaBand />
    </>
  );
}
