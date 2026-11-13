import { projects } from "@/content/projects";
import { Reveal, TextReveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectCard } from "./ProjectCard";

export function FeaturedWork() {
  const [first, ...rest] = projects;
  return (
    <section className="dark-section bg-ink py-section text-paper" aria-labelledby="work-title">
      <div className="container-site">
        <Reveal><SectionLabel index="03" className="text-stone">Concept work</SectionLabel></Reveal>
        <TextReveal
          id="work-title"
          lines={["LESS TALK.", "MORE IMPACT."]}
          className="mt-8 font-display text-display-xl font-semibold md:mt-10"
        />

        <div className="mt-16 space-y-20 md:mt-28 md:space-y-28">
          {first && <ProjectCard project={first} index={0} />}
          <div className="grid gap-20 md:grid-cols-2 md:gap-10">
            {rest.slice(0, 2).map((p, i) => (
              <div key={p.slug} className={i === 1 ? "md:mt-40" : undefined}>
                <ProjectCard project={p} index={i + 1} size="md" />
              </div>
            ))}
          </div>
        </div>

        <Reveal className="mt-20 flex justify-center md:mt-28">
          <ButtonLink to="/work" tone="dark" variant="secondary" arrow>View all work</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
