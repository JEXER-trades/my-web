/**
 * Inquiry submission client.
 * Posts to the `send-inquiry` Supabase Edge Function, which validates the
 * payload again server-side, applies spam checks and rate limiting, stores
 * the inquiry and emails it to the studio. See /supabase and README.md.
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
  /** ms timestamp when the form was first rendered (bot timing check). */
  startedAt: number;
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

export async function submitInquiry(v: InquiryInput): Promise<void> {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new InquiryError("The inquiry service is not configured yet.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  let res: Response;
  try {
    res = await fetch(`${url.replace(/\/$/, "")}/functions/v1/send-inquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: key, Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        name: v.name.trim(),
        email: v.email.trim(),
        company: v.company.trim(),
        service: v.service,
        message: v.message.trim(),
        budget: v.budget,
        consent: v.consent,
        website: v.website,
        elapsedMs: Date.now() - v.startedAt,
      }),
      signal: controller.signal,
    });
  } catch {
    throw new InquiryError("We couldn't reach the server. Please check your connection and try again.");
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    let msg = "Something went wrong while sending your inquiry.";
    try {
      const data = (await res.json()) as { error?: string };
      if (data.error) msg = data.error;
    } catch {
      /* ignore */
    }
    if (res.status === 429) msg = "You've sent several inquiries recently. Please wait a little and try again.";
    throw new InquiryError(msg);
  }
}
