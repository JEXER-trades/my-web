import { Seo } from "@/components/ui/Seo";
import { useHeaderTheme } from "@/components/layout/HeaderTheme";
import { ContactSection } from "@/components/sections/ContactSection";
import { site } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";

export default function Contact() {
  useHeaderTheme("light");
  return (
    <>
      <Seo title="Contact" description="Have an idea, a project, or an opportunity? Get in touch with JXSTUDIO." />
      <div className="pt-20 md:pt-24">
        <ContactSection label="Contact" headingAs="h1" />
      </div>
      <section className="bg-mist py-20 md:py-28" aria-label="Contact details">
        <div className="container-site grid gap-10 text-[0.9375rem] md:grid-cols-3">
          <Reveal>
            <p className="eyebrow text-stone">Email</p>
            <a className="link-underline mt-3 inline-block font-display text-2xl tracking-[-0.02em]" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow text-stone">Social</p>
            <div className="mt-3 flex gap-6 font-display text-2xl tracking-[-0.02em]">
              <a className="link-underline" href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              <a className="link-underline" href={site.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="eyebrow text-stone">Response</p>
            <p className="mt-3 max-w-xs leading-relaxed text-stone">We read every inquiry personally and reply by email.</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
