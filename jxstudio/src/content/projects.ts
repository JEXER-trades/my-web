import type { VisualVariant } from "@/components/visuals/Visual";

/**
 * PORTFOLIO
 * ─────────
 * The three entries below are clearly labelled PLACEHOLDER projects for
 * development. They are not real clients. Replace them with real work
 * (and real imagery) before launch.
 *
 * To add a project: copy an object, give it a unique `slug`, and fill in the
 * fields. `image` / `gallery[].image` accept a URL or an imported asset; when
 * omitted, the art-directed `visual` is shown instead.
 */
export type Project = {
  slug: string;
  placeholder?: boolean;
  title: string;
  industry: string;
  year?: string;
  summary: string;
  overview: string;
  challenge: string;
  approach: string;
  services: string[];
  visual: VisualVariant;
  image?: string;
  imageAlt: string;
  gallery: { visual: VisualVariant; image?: string; alt: string; caption?: string }[];
};

export const projects: Project[] = [
  {
    slug: "project-one-placeholder",
    placeholder: true,
    title: "Project One",
    industry: "Architecture & Real Estate",
    summary: "A placeholder case study showing how a brand identity and website project will be presented.",
    overview:
      "This is placeholder content for development. Replace it with a short overview of the client, what they needed and what was delivered.",
    challenge:
      "Describe the business challenge or opportunity here — what the client wanted to change and why it mattered.",
    approach:
      "Explain the thinking behind the work: the strategy, the creative direction and the key decisions made along the way.",
    services: ["Web Design", "Development"],
    visual: "monolith",
    imageAlt: "Abstract architectural composition — placeholder visual for Project One",
    gallery: [
      { visual: "lines", alt: "Placeholder gallery image — facade study", caption: "Placeholder image" },
      { visual: "arches", alt: "Placeholder gallery image — arches", caption: "Placeholder image" },
    ],
  },
  {
    slug: "project-two-placeholder",
    placeholder: true,
    title: "Project Two",
    industry: "Lifestyle & Retail",
    summary: "A placeholder case study for a creative direction and campaign project.",
    overview:
      "This is placeholder content for development. Replace it with a short overview of the client, what they needed and what was delivered.",
    challenge:
      "Describe the business challenge or opportunity here — what the client wanted to change and why it mattered.",
    approach:
      "Explain the thinking behind the work: the strategy, the creative direction and the key decisions made along the way.",
    services: ["E-commerce", "SEO"],
    visual: "horizon",
    imageAlt: "Abstract horizon composition — placeholder visual for Project Two",
    gallery: [
      { visual: "orbit", alt: "Placeholder gallery image — orbit study", caption: "Placeholder image" },
      { visual: "prism", alt: "Placeholder gallery image — prism study", caption: "Placeholder image" },
    ],
  },
  {
    slug: "project-three-placeholder",
    placeholder: true,
    title: "Project Three",
    industry: "Technology",
    summary: "A placeholder case study for a digital experience and product launch.",
    overview:
      "This is placeholder content for development. Replace it with a short overview of the client, what they needed and what was delivered.",
    challenge:
      "Describe the business challenge or opportunity here — what the client wanted to change and why it mattered.",
    approach:
      "Explain the thinking behind the work: the strategy, the creative direction and the key decisions made along the way.",
    services: ["Development", "Website Management"],
    visual: "grid",
    imageAlt: "Abstract perspective grid — placeholder visual for Project Three",
    gallery: [
      { visual: "prism", alt: "Placeholder gallery image — light study", caption: "Placeholder image" },
      { visual: "lines", alt: "Placeholder gallery image — line study", caption: "Placeholder image" },
    ],
  },
];

export const getProject = (slug?: string) => projects.find((p) => p.slug === slug);
