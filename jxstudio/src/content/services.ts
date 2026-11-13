import type { VisualVariant } from "@/components/visuals/Visual";

/**
 * Proposed service categories. These are configurable — edit, reorder,
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
};

export const services: Service[] = [
  {
    slug: "brand-identity-strategy",
    index: "01",
    name: "Brand Identity & Strategy",
    short: "Clarity on who you are, and a visual language to say it.",
    description:
      "We work with you to define what your brand stands for and how it should look, sound and feel — then turn that into a system you can use with confidence.",
    includes: ["Brand positioning", "Naming & messaging", "Logo & visual identity", "Brand guidelines"],
    visual: "monolith",
  },
  {
    slug: "website-design-development",
    index: "02",
    name: "Website Design & Development",
    short: "Considered websites, designed and built to perform.",
    description:
      "From structure to the final pixel, we design and develop websites that present your business clearly and are built on a foundation that can grow.",
    includes: ["UX & information architecture", "Interface design", "Responsive development", "CMS & integrations"],
    visual: "grid",
  },
  {
    slug: "digital-marketing",
    index: "03",
    name: "Digital Marketing",
    short: "Getting the right message to the right people.",
    description:
      "We help plan and produce digital campaigns and content that connect your brand with the audiences that matter to you.",
    includes: ["Campaign planning", "Content & social", "Search visibility", "Performance reporting"],
    visual: "orbit",
  },
  {
    slug: "creative-direction",
    index: "04",
    name: "Creative Direction",
    short: "One clear vision across everything you make.",
    description:
      "We guide the look, tone and quality of your creative output — from photography and film to campaigns — so it feels unmistakably yours.",
    includes: ["Concept development", "Art direction", "Photo & video direction", "Campaign creative"],
    visual: "arches",
  },
  {
    slug: "business-management-solutions",
    index: "05",
    name: "Business & Management Solutions",
    short: "Structure and strategy behind the creative work.",
    description:
      "We support founders and teams with the planning and organisation that help good ideas become workable, sustainable businesses.",
    includes: ["Business planning", "Project management", "Process design", "Partnership coordination"],
    visual: "horizon",
  },
  {
    slug: "digital-experiences",
    index: "06",
    name: "Digital Experiences",
    short: "Interactive moments people remember.",
    description:
      "We design and build interactive experiences — product launches, microsites and digital installations — that invite people to engage.",
    includes: ["Interactive concepts", "Motion & animation", "Launch microsites", "Prototyping"],
    visual: "prism",
  },
];
