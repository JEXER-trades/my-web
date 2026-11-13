/**
 * ──────────────────────────────────────────────────────────────
 *  JXSTUDIO — editable business details
 *  Everything a non-developer may need to change lives here.
 *  Values marked [PLACEHOLDER] must be replaced before launch.
 * ──────────────────────────────────────────────────────────────
 */
export const site = {
  name: "JXSTUDIO",
  legalName: "JXSTUDIO & MANAGEMENT", // [PLACEHOLDER] confirm registered company name
  tagline: "Creative vision. Strategic thinking. Digital excellence.",
  description:
    "JXSTUDIO helps ambitious businesses transform ideas into meaningful brands, digital experiences, and opportunities.",
  url: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") || "https://www.jxstudio.example",

  contact: {
    email: "hello@jxstudio.example", // [PLACEHOLDER]
    phone: "" as string, // [PLACEHOLDER] leave empty to hide
    address: [] as string[], // [PLACEHOLDER] e.g. ["Street 1", "10115 Berlin", "Germany"]
  },

  social: {
    instagram: "https://www.instagram.com/", // [PLACEHOLDER] full profile URL
    linkedin: "https://www.linkedin.com/", // [PLACEHOLDER] full company page URL
  },

  /** Legal notice / Impressum details. Required in some jurisdictions (e.g. DE/AT). */
  legal: {
    representative: "[Name of authorised representative]",
    register: "[Commercial register & number, if applicable]",
    vatId: "[VAT ID, if applicable]",
    responsibleForContent: "[Name and address of person responsible for content]",
  },

  privacyLastUpdated: "[Date]",
} as const;

export const nav = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;
