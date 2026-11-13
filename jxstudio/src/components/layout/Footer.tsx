import { Link } from "react-router-dom";
import { nav, site } from "@/config/site";
import { services } from "@/content/services";
import { Wordmark } from "@/components/ui/Wordmark";
import { Reveal } from "@/components/ui/Reveal";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="dark-section bg-ink text-paper" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container-site pt-24 md:pt-32">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark size="lg" />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-stone">
              A creative and strategic studio helping ambitious businesses turn ideas into brands, experiences and opportunities.
            </p>
          </div>

          <FooterCol title="Navigate" className="md:col-span-2">
            {nav.map((n) => (
              <li key={n.to}><Link className="link-underline" to={n.to}>{n.label}</Link></li>
            ))}
          </FooterCol>

          <FooterCol title="Services" className="md:col-span-3">
            {services.map((s) => (
              <li key={s.slug}><Link className="link-underline" to={`/services#${s.slug}`}>{s.name}</Link></li>
            ))}
          </FooterCol>

          <FooterCol title="Contact" className="md:col-span-2">
            <li><a className="link-underline break-all" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
            {site.contact.phone && <li><a className="link-underline" href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>{site.contact.phone}</a></li>}
            <li><a className="link-underline" href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </FooterCol>
        </div>

        <Reveal className="mt-24 select-none overflow-hidden md:mt-32" y={60}>
          <Wordmark size="xl" className="w-full justify-between text-paper/[0.07]" />
        </Reveal>

        <div className="flex flex-col gap-4 border-t border-paper/10 py-8 text-xs text-stone md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.legalName}. All rights reserved.</p>
          <ul className="flex gap-6">
            <li><Link className="link-underline hover:text-paper" to="/privacy">Privacy Policy</Link></li>
            <li><Link className="link-underline hover:text-paper" to="/legal">Legal Notice / Impressum</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h3 className="eyebrow mb-6 font-sans text-stone">{title}</h3>
      <ul className="space-y-3 text-[0.9375rem] text-paper/85">{children}</ul>
    </div>
  );
}
