import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Project } from "@/content/projects";
import { Media } from "@/components/visuals/Visual";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/** Large, image-led project presentation used on Home and Work. */
export function ProjectCard({ project, index, size = "lg" }: { project: Project; index: number; size?: "lg" | "md" }) {
  return (
    <article>
      <Link to={`/work/${project.slug}`} className="group block" aria-label={`${project.title} — ${project.industry}. View project`}>
        <ImageReveal className={cn("bg-graphite", project.image ? "aspect-[16/10]" : size === "lg" ? "aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/9]" : "aspect-[4/5]")}>
          <motion.div className="h-full w-full transition-transform duration-[1400ms] ease-apple group-hover:scale-[1.035]">
            <Media visual={project.visual} image={project.image} alt={project.imageAlt} />
          </motion.div>
          {project.label && (
            <span className="absolute left-4 top-4 rounded-full border border-paper/25 bg-ink/40 px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-paper backdrop-blur-md md:left-6 md:top-6">
              {project.label}
            </span>
          )}
        </ImageReveal>
        <Reveal className="mt-6 flex items-start justify-between gap-6 md:mt-8">
          <div className="flex items-start gap-5 md:gap-8">
            <span className="pt-1.5 text-sm tabular-nums opacity-50">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="font-display text-display-sm font-semibold">{project.title}</h3>
              <p className="mt-2 text-[0.9375rem] opacity-60">{project.industry} · {project.services.join(", ")}</p>
            </div>
          </div>
          <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-current opacity-60 transition-all duration-500 ease-apple group-hover:bg-current group-hover:opacity-100">
            <Arrow className="transition-colors duration-500 group-hover:invert" />
          </span>
        </Reveal>
      </Link>
    </article>
  );
}
