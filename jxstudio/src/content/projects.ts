import type { VisualVariant } from "@/components/visuals/Visual";
import restaurantCover from "@/assets/projects/restaurant-cover.webp";
import restaurantDesktop from "@/assets/projects/restaurant-desktop.webp";
import restaurantMobile from "@/assets/projects/restaurant-mobile.webp";
import consultingCover from "@/assets/projects/consulting-cover.webp";
import consultingDesktop from "@/assets/projects/consulting-desktop.webp";
import consultingMobile from "@/assets/projects/consulting-mobile.webp";
import shopCover from "@/assets/projects/shop-cover.webp";
import shopDesktop from "@/assets/projects/shop-desktop.webp";
import shopMobile from "@/assets/projects/shop-mobile.webp";
import fitnessCover from "@/assets/projects/fitness-cover.webp";
import fitnessDesktop from "@/assets/projects/fitness-desktop.webp";
import fitnessMobile from "@/assets/projects/fitness-mobile.webp";

/**
 * PORTFOLIO
 * ─────────
 * The four projects below are CONCEPT / DEMO websites built by Jxstudio for
 * fictional businesses. They are labelled as such everywhere on the site.
 * When you have real client work, add it here without a `label` (or with
 * one of your choosing) and real images.
 *
 * `image` / `gallery[].image` accept an imported asset or a URL; when
 * omitted, the art-directed `visual` is shown instead.
 */
export type Project = {
  slug: string;
  /** Badge shown on the project, e.g. "Concept project". Omit for client work. */
  label?: string;
  title: string;
  industry: string;
  year?: string;
  summary: string;
  overview: string;
  challenge: string;
  approach: string;
  services: string[];
  liveUrl?: string;
  visual: VisualVariant;
  image?: string;
  imageAlt: string;
  gallery: { visual: VisualVariant; image?: string; alt: string; caption?: string }[];
};

const CONCEPT = "Concept project";

export const projects: Project[] = [
  {
    slug: "trattoria-luna",
    label: CONCEPT,
    title: "Trattoria Luna",
    industry: "Restaurant",
    summary: "A warm, editorial website concept for a fictional Italian restaurant in Berlin.",
    overview:
      "Trattoria Luna is a demo website we designed and built for a fictional Italian kitchen in Berlin — showing how a restaurant can feel as inviting online as it does at the table.",
    challenge:
      "A restaurant site has a few jobs: make people hungry, answer the practical questions quickly, and make booking a table effortless — on a phone, on the way out the door.",
    approach:
      "We paired a classic serif with a soft cream palette and terracotta accents, put “Reserve a table” front and centre, and kept the menu, story and opening details one tap away.",
    services: ["Web Design", "Development"],
    liveUrl: "https://jxstudio.de/examples/restaurant/",
    visual: "arches",
    image: restaurantCover,
    imageAlt: "Trattoria Luna concept website shown on a laptop browser and a phone",
    gallery: [
      { visual: "arches", image: restaurantDesktop, alt: "Trattoria Luna menu and story sections on desktop", caption: "Menu and story — desktop" },
      { visual: "arches", image: restaurantMobile, alt: "Trattoria Luna homepage on a phone", caption: "Homepage — mobile" },
    ],
  },
  {
    slug: "nordwerk-consulting",
    label: CONCEPT,
    title: "Nordwerk Consulting",
    industry: "Consulting",
    summary: "A clear, confident website concept for a fictional strategy and operations consultancy.",
    overview:
      "Nordwerk is a demo website for a fictional consultancy that helps small and mid-sized companies simplify processes and grow.",
    challenge:
      "Professional services are hard to show. The site needed to build trust quickly and turn interest into a first conversation.",
    approach:
      "A crisp, blue-accented layout with a strong headline, a clear “Free first meeting” call to action, scannable service cards and a clean structure built with search visibility in mind.",
    services: ["Web Design", "SEO"],
    liveUrl: "https://jxstudio.de/examples/consulting/",
    visual: "grid",
    image: consultingCover,
    imageAlt: "Nordwerk Consulting concept website shown on a laptop browser and a phone",
    gallery: [
      { visual: "grid", image: consultingDesktop, alt: "Nordwerk services overview on desktop", caption: "Services overview — desktop" },
      { visual: "grid", image: consultingMobile, alt: "Nordwerk homepage on a phone", caption: "Homepage — mobile" },
    ],
  },
  {
    slug: "bohne-und-co",
    label: CONCEPT,
    title: "Bohne & Co.",
    industry: "Coffee · E-commerce",
    summary: "An online shop concept for a fictional Berlin coffee roaster.",
    overview:
      "Bohne & Co. is a demo online store for a fictional small-batch coffee roaster in Berlin, built to show how a small brand can sell beautifully online.",
    challenge:
      "Online shopping should be simple. Customers need to find the right coffee, understand it, and check out without friction.",
    approach:
      "A rich, dark hero sets the mood, followed by a clean product grid with filters, clear prices and add-to-cart buttons, plus delivery promises up front.",
    services: ["E-commerce", "Web Design"],
    liveUrl: "https://jxstudio.de/examples/shop/",
    visual: "horizon",
    image: shopCover,
    imageAlt: "Bohne & Co. concept online shop shown on a laptop browser and a phone",
    gallery: [
      { visual: "horizon", image: shopDesktop, alt: "Bohne & Co. product grid on desktop", caption: "Product grid — desktop" },
      { visual: "horizon", image: shopMobile, alt: "Bohne & Co. homepage on a phone", caption: "Homepage — mobile" },
    ],
  },
  {
    slug: "pulse-fitness",
    label: CONCEPT,
    title: "Pulse Fitness",
    industry: "Fitness",
    summary: "A bold, high-energy website concept for a fictional gym.",
    overview:
      "Pulse is a demo website for a fictional gym offering group classes and personal training, designed to feel as energetic as the classes themselves.",
    challenge:
      "Gyms compete on energy and convenience. The site had to motivate visitors and make it easy to find a class and start a free trial.",
    approach:
      "Oversized type, a dark palette with a vivid red-to-orange accent, a live class schedule and a prominent “Start free trial” button.",
    services: ["Development", "Website Management"],
    liveUrl: "https://jxstudio.de/examples/fitness/",
    visual: "lines",
    image: fitnessCover,
    imageAlt: "Pulse Fitness concept website shown on a laptop browser and a phone",
    gallery: [
      { visual: "lines", image: fitnessDesktop, alt: "Pulse class finder and schedule on desktop", caption: "Class finder — desktop" },
      { visual: "lines", image: fitnessMobile, alt: "Pulse homepage on a phone", caption: "Homepage — mobile" },
    ],
  },
];

export const getProject = (slug?: string) => projects.find((p) => p.slug === slug);
