/**
 * ──────────────────────────────────────────────────────────────
 *  JXSTUDIO — editable business details
 *  Everything a non-developer may need to change lives here.
 *  Values marked [PLACEHOLDER] must be replaced before launch.
 * ──────────────────────────────────────────────────────────────
 */
export const site = {
  name: "JXSTUDIO",
  legalName: "Jxstudio",
  owner: "Soban Waris",
  tagline: "Creative vision. Strategic thinking. Digital excellence.",
  description:
    "JXSTUDIO helps ambitious businesses transform ideas into meaningful brands, digital experiences, and opportunities.",
  url: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") || "https://jxstudio.de",

  contact: {
    email: "soban.waris@jxstudio.de",
    phone: "" as string, // intentionally not shown on the site
    address: ["Silbersteinstraße 9", "12051 Berlin", "Germany"] as string[],
  },

  social: {
    instagram: "https://www.instagram.com/sob4n_/",
  },

  /** Legal notice / Impressum details. Required in some jurisdictions (e.g. DE/AT). */
  legal: {
    // Sole proprietorship — no commercial register entry or VAT ID listed. Add here if that changes.
    register: "" as string,
    vatId: "" as string,
    responsibleForContent: "Soban Waris, Silbersteinstraße 9, 12051 Berlin",
  },

  privacyLastUpdated: "November 2026",
} as const;

export const nav = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;
