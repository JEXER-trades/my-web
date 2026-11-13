import { TextReveal, Reveal } from "@/components/ui/Reveal";
import { ScrollText } from "@/components/ui/ScrollText";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Intro() {
  return (
    <section className="bg-paper py-section" aria-labelledby="intro-title">
      <div className="container-site">
        <Reveal><SectionLabel index="01">The idea</SectionLabel></Reveal>
        <TextReveal
          id="intro-title"
          lines={["GOOD IDEAS", "CHANGE", "EVERYTHING."]}
          className="mt-8 font-display text-display-xl font-semibold md:mt-10"
        />
        <div className="mt-16 grid md:mt-24 md:grid-cols-12">
          <ScrollText
            className="font-display text-display-sm font-medium md:col-span-8 md:col-start-5"
            text="Every great project starts with an idea. We bring together creativity, strategy, and execution to turn those ideas into something meaningful."
          />
        </div>
      </div>
    </section>
  );
}
