import type { ReactNode } from "react";
import { Seo } from "@/components/ui/Seo";
import { useHeaderTheme } from "@/components/layout/HeaderTheme";
import { PageHero } from "@/components/sections/PageHero";

export function LegalPage({ title, lines, description, children }: { title: string; lines: string[]; description: string; children: ReactNode }) {
  useHeaderTheme("light");
  return (
    <>
      <Seo title={title} description={description} />
      <PageHero eyebrow={title} lines={lines} />
      <section className="bg-paper pb-section">
        <div className="container-site">
          <div className="legal mx-auto max-w-prose border-t border-line pt-12 text-[1.0625rem] leading-relaxed text-graphite md:ml-[calc(100%/12*4)]">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
