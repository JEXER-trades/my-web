import { ButtonLink } from "@/components/ui/Button";
import { Reveal, TextReveal } from "@/components/ui/Reveal";

export function CtaBand() {
  return (
    <section className="bg-mist py-section" aria-labelledby="cta-title">
      <div className="container-site text-center">
        <TextReveal id="cta-title" lines={["LET’S MAKE", "SOMETHING MATTER."]} className="font-display text-display-lg font-semibold" />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-md text-lead text-stone">Have an idea, a project, or an opportunity? We’d love to hear from you.</p>
          <div className="mt-10 flex justify-center">
            <ButtonLink to="/contact" arrow>Start a Project</ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
