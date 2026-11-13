// Supabase Edge Function: send-inquiry
// ------------------------------------
// Receives contact-form submissions from the website, validates them,
// applies spam protection, stores them in `public.inquiries` and emails
// them to the studio via Resend (https://resend.com).
//
// Required secrets (supabase secrets set KEY=value):
//   RESEND_API_KEY        Resend API key
//   INQUIRY_TO_EMAIL      Where inquiries are delivered, e.g. hello@yourdomain.com
//   INQUIRY_FROM_EMAIL    Verified sender, e.g. "JXSTUDIO Website <website@yourdomain.com>"
//   ALLOWED_ORIGINS       Comma-separated origins, e.g. https://www.yourdomain.com,http://localhost:8080
// Provided automatically by Supabase: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import { createClient } from "jsr:@supabase/supabase-js@2";

const SERVICES = [
  // Keep in sync with src/content/services.ts
  "Web Design",
  "Development",
  "Website Management",
  "E-commerce",
  "SEO",
  "Ongoing Support",
  "Something else / not sure yet",
];
const BUDGETS = ["", "Under €5,000", "€5,000 – €15,000", "€15,000 – €50,000", "€50,000+", "Not sure yet"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_FILL_MS = 3000; // humans take longer than 3s to fill the form
const MAX_PER_HOUR = 5; // per IP

const allowed = (Deno.env.get("ALLOWED_ORIGINS") ?? "").split(",").map((s) => s.trim()).filter(Boolean);

function cors(origin: string | null) {
  const ok = origin && (allowed.length === 0 || allowed.includes(origin));
  return {
    "Access-Control-Allow-Origin": ok ? origin! : allowed[0] ?? "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

const json = (body: unknown, status: number, headers: Record<string, string>) =>
  new Response(JSON.stringify(body), { status, headers: { ...headers, "Content-Type": "application/json" } });

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function sha256(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const headers = cors(origin);

  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405, headers);
  if (allowed.length && (!origin || !allowed.includes(origin))) return json({ error: "Origin not allowed." }, 403, headers);

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > 20000) return json({ error: "Request too large." }, 413, headers);
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid request." }, 400, headers);
  }

  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim() : "");
  const name = str("name");
  const email = str("email");
  const company = str("company");
  const service = str("service");
  const message = str("message");
  const budget = str("budget");
  const website = str("website");
  const elapsed = Number(body.elapsedMs) || 0;

  // Spam: honeypot filled or submitted implausibly fast → pretend success, store nothing.
  if (website || elapsed < MIN_FILL_MS) return json({ ok: true }, 200, headers);

  const errors: string[] = [];
  if (name.length < 2 || name.length > 120) errors.push("name");
  if (!EMAIL_RE.test(email) || email.length > 200) errors.push("email");
  if (company.length > 160) errors.push("company");
  if (!SERVICES.includes(service)) errors.push("service");
  if (message.length < 20 || message.length > 5000) errors.push("message");
  if (!BUDGETS.includes(budget)) errors.push("budget");
  if (body.consent !== true) errors.push("consent");
  if (errors.length) return json({ error: "Please check the highlighted fields and try again.", fields: errors }, 422, headers);

  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false },
  });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  const ipHash = await sha256(`${ip}:${Deno.env.get("SUPABASE_URL")}`);

  // Rate limit by hashed IP.
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("inquiries")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);
  if ((count ?? 0) >= MAX_PER_HOUR) return json({ error: "Too many requests." }, 429, headers);

  const { data: row, error: dbError } = await supabase
    .from("inquiries")
    .insert({
      name, email, service, message,
      company: company || null,
      budget: budget || null,
      ip_hash: ipHash,
      user_agent: (req.headers.get("user-agent") ?? "").slice(0, 300),
    })
    .select("id")
    .single();
  if (dbError) console.error("insert failed", dbError);

  // Email notification.
  let emailSent = false;
  const apiKey = Deno.env.get("RESEND_API_KEY");
  const to = Deno.env.get("INQUIRY_TO_EMAIL");
  const from = Deno.env.get("INQUIRY_FROM_EMAIL");
  if (apiKey && to && from) {
    const rows: [string, string][] = [
      ["Name", name], ["Email", email], ["Company", company || "—"],
      ["Service", service], ["Budget", budget || "—"],
    ];
    const html = `
      <div style="font-family:-apple-system,Segoe UI,Inter,Helvetica,Arial,sans-serif;color:#111;max-width:560px">
        <p style="font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#86868b">New project inquiry</p>
        <table style="width:100%;border-collapse:collapse;font-size:15px">
          ${rows.map(([k, v]) => `<tr><td style="padding:8px 0;color:#86868b;width:120px;border-bottom:1px solid #eee">${k}</td><td style="padding:8px 0;border-bottom:1px solid #eee">${esc(v)}</td></tr>`).join("")}
        </table>
        <p style="font-size:15px;line-height:1.6;white-space:pre-wrap;margin-top:24px">${esc(message)}</p>
      </div>`;
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from, to: [to], reply_to: email,
          subject: `New inquiry — ${name}${company ? ` (${company})` : ""}`,
          html,
          text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`,
        }),
      });
      emailSent = r.ok;
      if (!r.ok) console.error("resend failed", r.status, await r.text());
    } catch (e) {
      console.error("resend error", e);
    }
    if (row && emailSent) await supabase.from("inquiries").update({ email_sent: true }).eq("id", row.id);
  } else {
    console.warn("Email delivery not configured (RESEND_API_KEY / INQUIRY_TO_EMAIL / INQUIRY_FROM_EMAIL).");
  }

  // Success only if the inquiry actually reached the studio by at least one route.
  if (!row && !emailSent) {
    return json({ error: "We couldn't save your inquiry right now. Please try again shortly." }, 500, headers);
  }
  return json({ ok: true }, 200, headers);
});
