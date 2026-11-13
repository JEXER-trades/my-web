import { projects } from "@/content/projects";
import { Seo } from "@/components/ui/Seo";
import { useHeaderTheme } from "@/components/layout/HeaderTheme";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { CtaBand } from "@/components/sections/CtaBand";

export default function Work() {
  useHeaderTheme("dark");
  return (
    <>
      <Seo title="Work" description="Concept websites designed and built by Jxstudio — restaurant, consulting, e-commerce and fitness." />
      <PageHero
        tone="dark"
        eyebrow="Work"
        lines={["LESS TALK.", "MORE IMPACT."]}
        intro="Concept websites we designed and built for fictional businesses — a restaurant, a consultancy, an online shop and a gym — to show what we can build for you."
      />
      <section className="dark-section bg-ink pb-section text-paper" aria-label="Projects">
        <div className="container-site space-y-24 md:space-y-36">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
