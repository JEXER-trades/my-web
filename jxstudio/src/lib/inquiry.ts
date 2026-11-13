/**
 * Inquiry submission client — Netlify Forms.
 * The form is registered with Netlify by the hidden static copy in index.html
 * (form name "inquiry"). Netlify stores each submission, filters spam
 * (honeypot + Akismet) and emails it to the addresses set under
 * Site configuration → Forms → Form notifications.
 */
import { services } from "@/content/services";

export const serviceOptions = [...services.map((s) => s.name), "Something else / not sure yet"];

/** [PLACEHOLDER] budget ranges — edit to suit. */
export const budgetOptions = ["Under €5,000", "€5,000 – €15,000", "€15,000 – €50,000", "€50,000+", "Not sure yet"];

export type InquiryInput = {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  budget: string;
  consent: boolean;
  /** Honeypot — must stay empty. */
  website: string;
};

export type FieldErrors = Partial<Record<keyof InquiryInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateInquiry(v: InquiryInput): FieldErrors {
  const e: FieldErrors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  else if (v.name.length > 120) e.name = "Please keep your name under 120 characters.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.company.length > 160) e.company = "Please keep this under 160 characters.";
  if (!serviceOptions.includes(v.service)) e.service = "Please choose a service of interest.";
  if (v.message.trim().length < 20) e.message = "Tell us a little more — at least 20 characters.";
  else if (v.message.length > 5000) e.message = "Please keep your description under 5,000 characters.";
  if (v.budget && !budgetOptions.includes(v.budget)) e.budget = "Please choose a budget range.";
  if (!v.consent) e.consent = "Please confirm you have read the privacy notice.";
  return e;
}

export class InquiryError extends Error {}

export const FORM_NAME = "inquiry";

export async function submitInquiry(v: InquiryInput): Promise<void> {
  const fields: Record<string, string> = {
    "form-name": FORM_NAME,
    subject: `New inquiry — ${v.name.trim()}${v.company.trim() ? ` (${v.company.trim()})` : ""}`,
    name: v.name.trim(),
    email: v.email.trim(),
    company: v.company.trim(),
    service: v.service,
    message: v.message.trim(),
    budget: v.budget,
    consent: v.consent ? "yes" : "no",
    website: v.website,
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  let res: Response;
  try {
    res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(fields).toString(),
      signal: controller.signal,
    });
  } catch {
    throw new InquiryError("We couldn't reach the server. Please check your connection and try again.");
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    // Outside Netlify (e.g. local dev) there is no form handler, so this fails honestly.
    throw new InquiryError(
      res.status === 404 || res.status === 405
        ? "The inquiry service isn't available here."
        : "Something went wrong while sending your inquiry.",
    );
  }
}
