import { principles } from "@/content/process";
import { Seo } from "@/components/ui/Seo";
import { useHeaderTheme } from "@/components/layout/HeaderTheme";
import { PageHero } from "@/components/sections/PageHero";
import { Approach } from "@/components/sections/Approach";
import { CtaBand } from "@/components/sections/CtaBand";
import { Visual } from "@/components/visuals/Visual";
import { ImageReveal, Parallax, Reveal, TextReveal } from "@/components/ui/Reveal";
import { ScrollText } from "@/components/ui/ScrollText";
import { SectionLabel } from "@/components/ui/SectionLabel";

export default function About() {
  useHeaderTheme("light");
  return (
    <>
      <Seo title="About" description="JXSTUDIO combines creative thinking with strategic execution to help ambitious businesses grow." />
      <PageHero
        eyebrow="About JXSTUDIO"
        lines={["BUILT ON IDEAS.", "DRIVEN BY", "EXECUTION."]}
        intro="We are a creative and business-focused studio. We bring ideas, strategy and craft together so the work we make looks right, feels right and does its job."
      />

      <section className="bg-paper" aria-label="Studio image">
        <ImageReveal className="mx-auto aspect-[4/5] max-w-site bg-ink sm:aspect-[16/9] md:px-gutter">
          <Parallax distance={120} className="h-full w-full">
            <Visual variant="monolith" animate title="A single monolith lit from above — abstract architectural study" />
          </Parallax>
        </ImageReveal>
      </section>

      <section className="bg-paper py-section" aria-labelledby="philosophy-title">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal><SectionLabel>Our philosophy</SectionLabel></Reveal>
            <h2 id="philosophy-title" className="sr-only">Our philosophy</h2>
          </div>
          <div className="lg:col-span-8">
            <ScrollText
              className="font-display text-display-sm font-medium"
              text="We believe good ideas deserve good execution. Creativity gives a business its voice; strategy gives that voice direction. Our job is to bring the two together — with care, with honesty, and with an eye on what happens after launch."
            />
          </div>
        </div>
      </section>

      <section className="bg-mist py-section" aria-labelledby="principles-title">
        <div className="container-site">
          <TextReveal id="principles-title" lines={["WHAT WE", "STAND FOR."]} className="font-display text-display-lg font-semibold" />
          <ul className="mt-16 grid border-t border-ink/10 md:mt-24 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 3) * 0.08} className="border-b border-ink/10 py-10 md:pr-10">
                <span className="text-sm tabular-nums text-stone">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-3 max-w-sm text-[1.0625rem] leading-relaxed text-stone">{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Approach label="—" />
      <CtaBand />
    </>
  );
}
