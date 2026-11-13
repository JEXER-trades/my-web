import type { VisualVariant } from "@/components/visuals/Visual";

/**
 * Services as offered on jxstudio.de. These are configurable — edit, reorder,
 * add or remove entries freely. Descriptions intentionally avoid claims
 * about results, certifications or expertise that have not been confirmed.
 */
export type Service = {
  slug: string;
  index: string;
  name: string;
  short: string;
  description: string;
  includes: string[];
  visual: VisualVariant;
  /** Optional photo (imported asset or URL). Shown instead of `visual` when set. */
  image?: string;
  imageAlt?: string;
};

export const services: Service[] = [
  {
    slug: "web-design",
    index: "01",
    name: "Web Design",
    short: "Custom designs made around your brand and your customers.",
    description:
      "Custom, modern designs made around your brand and your customers — no generic templates. You review the design and we refine it until you're happy.",
    includes: ["Custom design", "Mobile-friendly layouts", "Brand-aligned visuals", "Design review & refinement"],
    visual: "monolith",
  },
  {
    slug: "development",
    index: "02",
    name: "Development",
    short: "Fast sites that work properly on every device.",
    description:
      "Fast, mobile-friendly websites built to load quickly and work properly on every device — developed, tested and launched on your own domain.",
    includes: ["Responsive development", "Performance optimisation", "Contact forms", "Launch on your domain"],
    visual: "grid",
  },
  {
    slug: "website-management",
    index: "03",
    name: "Website Management",
    short: "We keep your site running so you don't have to.",
    description:
      "Hosting, backups, security updates and monitoring. We handle the technical side so you can get on with running your business.",
    includes: ["Hosting & SSL", "Regular backups", "Security & software updates", "Uptime monitoring"],
    visual: "lines",
  },
  {
    slug: "e-commerce",
    index: "04",
    name: "E-commerce",
    short: "Online stores that make buying simple.",
    description:
      "Online stores that are easy for you to manage and make buying simple for your customers.",
    includes: ["Online store setup", "Payments & shipping", "Product management", "Store management plan"],
    visual: "prism",
  },
  {
    slug: "seo",
    index: "05",
    name: "SEO",
    short: "Get found on Google.",
    description:
      "Get found on Google with technical SEO, local search setup and a clean site structure.",
    includes: ["Technical SEO", "Local search setup", "Clean site structure", "On-page optimisation"],
    visual: "horizon",
  },
  {
    slug: "ongoing-support",
    index: "06",
    name: "Ongoing Support",
    short: "Need a change? Just send us a message.",
    description:
      "Need a change? Send us a message. Text edits, new pages and new features are handled quickly, and we help your site grow over time.",
    includes: ["Content changes", "New pages", "New features", "Priority support"],
    visual: "orbit",
  },
];
