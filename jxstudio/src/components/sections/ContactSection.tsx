import { site } from "@/config/site";
import { Reveal, TextReveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { InquiryForm } from "./InquiryForm";

export function ContactSection({ label = "06", headingAs = "h2" }: { label?: string; headingAs?: "h1" | "h2" }) {
  return (
    <section className="bg-paper py-section" aria-labelledby="contact-title">
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal><SectionLabel index={label}>Start a project</SectionLabel></Reveal>
          <TextReveal
            id="contact-title"
            as={headingAs}
            lines={["LET’S MAKE", "SOMETHING", "MATTER."]}
            className="mt-8 font-display text-display-lg font-semibold md:mt-10"
          />
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-sm text-lead text-stone">Have an idea, a project, or an opportunity? We’d love to hear from you.</p>
          </Reveal>
          <Reveal delay={0.25} className="mt-12 hidden space-y-6 text-[0.9375rem] lg:block">
            <div>
              <p className="eyebrow text-stone">Email</p>
              <a className="link-underline mt-2 inline-block text-lg" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </div>
            <div>
              <p className="eyebrow text-stone">Follow</p>
              <div className="mt-2 flex gap-6 text-lg">
                <a className="link-underline" href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <InquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
