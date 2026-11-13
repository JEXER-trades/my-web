import { Visual } from "@/components/visuals/Visual";
import { ImageReveal, Parallax, Reveal, TextReveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/Button";

export function AboutTeaser() {
  return (
    <section className="bg-paper py-section" aria-labelledby="about-title">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <ImageReveal className="aspect-[4/5] bg-mist">
            <Parallax distance={90} className="h-full w-full">
              <Visual variant="arches" title="Light falling through a row of arches — abstract architectural study" />
            </Parallax>
          </ImageReveal>
        </div>
        <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
          <Reveal><SectionLabel index="04">About JXSTUDIO</SectionLabel></Reveal>
          <TextReveal
            id="about-title"
            lines={["BUILT ON IDEAS.", "DRIVEN BY", "EXECUTION."]}
            className="mt-8 font-display text-display-lg font-semibold md:mt-10"
          />
          <Reveal delay={0.15} className="mt-10 space-y-5 text-lead text-stone">
            <p>
              JXSTUDIO brings creative thinking and business sense into the same room. We believe the best work happens
              when bold ideas are matched by clear strategy and careful execution.
            </p>
            <p>
              We care about the details, we value long-term relationships, and we keep one question in view throughout:
              how will this help the business grow?
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10"><TextLink to="/about">More about us</TextLink></Reveal>
        </div>
      </div>
    </section>
  );
}
