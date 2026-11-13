import { Link } from "react-router-dom";
import { services } from "@/content/services";
import { Seo } from "@/components/ui/Seo";
import { useHeaderTheme } from "@/components/layout/HeaderTheme";
import { PageHero } from "@/components/sections/PageHero";
import { Approach } from "@/components/sections/Approach";
import { CtaBand } from "@/components/sections/CtaBand";
import { Visual } from "@/components/visuals/Visual";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export default function Services() {
  useHeaderTheme("light");
  return (
    <>
      <Seo title="Services" description="Brand identity, websites, digital marketing, creative direction, business solutions and digital experiences — how JXSTUDIO can help." />
      <PageHero
        eyebrow="Services"
        lines={["WHAT WE BRING", "TO THE TABLE."]}
        intro="Six ways we help ambitious businesses move forward. Most projects combine several — we shape the mix around what you need."
      >
        <nav aria-label="Services" className="mt-16 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6 md:mt-24">
          {services.map((s) => (
            <Link key={s.slug} to={`#${s.slug}`} className="link-underline text-sm text-stone hover:text-ink">
              <span className="tabular-nums">{s.index}</span> {s.name}
            </Link>
          ))}
        </nav>
      </PageHero>

      {services.map((s, i) => {
        const dark = i % 2 === 1;
        return (
          <section
            key={s.slug}
            id={s.slug}
            aria-labelledby={`${s.slug}-title`}
            className={cn("py-section", dark ? "dark-section bg-ink text-paper" : "bg-paper")}
          >
            <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
              <ImageReveal className={cn("aspect-[4/3] bg-graphite lg:col-span-7", i % 2 === 1 && "lg:order-2 lg:col-start-6")}>
                <Visual variant={s.visual} animate title={`${s.name} — abstract visual`} />
              </ImageReveal>
              <div className={cn("lg:col-span-4", i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-9")}>
                <Reveal>
                  <p className="text-sm tabular-nums text-stone">{s.index} / {String(services.length).padStart(2, "0")}</p>
                  <h2 id={`${s.slug}-title`} className="mt-6 font-display text-display-md font-semibold">{s.name}</h2>
                  <p className={cn("mt-6 text-lead", dark ? "text-paper/65" : "text-stone")}>{s.description}</p>
                  <ul className={cn("mt-8 border-t", dark ? "border-paper/15" : "border-line")}>
                    {s.includes.map((item) => (
                      <li key={item} className={cn("border-b py-3.5 text-[0.9375rem]", dark ? "border-paper/15" : "border-line")}>{item}</li>
                    ))}
                  </ul>
                  <TextLink to="/contact" className="mt-10">Discuss a project</TextLink>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      <Approach label="—" />
      <CtaBand />
    </>
  );
}
