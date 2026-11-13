import { AnimatePresence, motion } from "framer-motion";
import { useId, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { site } from "@/config/site";
import {
  budgetOptions,
  InquiryError,
  serviceOptions,
  submitInquiry,
  validateInquiry,
  type FieldErrors,
  type InquiryInput,
} from "@/lib/inquiry";
import { Button } from "@/components/ui/Button";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const empty = (): InquiryInput => ({
  name: "",
  email: "",
  company: "",
  service: "",
  message: "",
  budget: "",
  consent: false,
  website: "",
});

export function InquiryForm() {
  const [values, setValues] = useState<InquiryInput>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof InquiryInput, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  const set = <K extends keyof InquiryInput>(k: K, v: InquiryInput[K]) => {
    const next = { ...values, [k]: v };
    setValues(next);
    if (touched[k]) setErrors(validateInquiry(next));
  };
  const blur = (k: keyof InquiryInput) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validateInquiry(values));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    const errs = validateInquiry(values);
    setErrors(errs);
    setTouched({ name: true, email: true, company: true, service: true, message: true, budget: true, consent: true });
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    setServerError("");
    try {
      await submitInquiry(values);
      setStatus("success");
      setValues(empty());
      setTouched({});
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof InquiryError ? err.message : "Something went wrong while sending your inquiry.");
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  const err = (k: keyof InquiryInput) => (touched[k] ? errors[k] : undefined);

  if (status === "success") {
    return (
      <motion.div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="border-t border-ink pt-10 outline-none"
      >
        <p className="eyebrow text-stone">Inquiry sent</p>
        <h3 className="mt-6 font-display text-display-md font-semibold">Thank you. We’ve received your message.</h3>
        <p className="mt-5 max-w-md text-lead text-stone">
          We read every inquiry personally and will reply to the email address you provided.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="link-underline mt-10 text-[0.9375rem] font-medium">
          Send another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} name="inquiry" method="POST" data-netlify="true" netlify-honeypot="website" onSubmit={onSubmit} noValidate aria-describedby={`${uid}-privacy`} className="relative">
      <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
        <Field id={`${uid}-name`} label="Full name" required error={err("name")}>
          <input
            id={`${uid}-name`} name="name" type="text" autoComplete="name" required maxLength={120}
            className="input-field" value={values.name}
            onChange={(e) => set("name", e.target.value)} onBlur={() => blur("name")}
            aria-invalid={!!err("name")} aria-describedby={err("name") ? `${uid}-name-err` : undefined}
          />
        </Field>
        <Field id={`${uid}-email`} label="Email address" required error={err("email")}>
          <input
            id={`${uid}-email`} name="email" type="email" autoComplete="email" inputMode="email" required maxLength={200}
            className="input-field" value={values.email}
            onChange={(e) => set("email", e.target.value)} onBlur={() => blur("email")}
            aria-invalid={!!err("email")} aria-describedby={err("email") ? `${uid}-email-err` : undefined}
          />
        </Field>
        <Field id={`${uid}-company`} label="Company name" optional error={err("company")}>
          <input
            id={`${uid}-company`} name="company" type="text" autoComplete="organization" maxLength={160}
            className="input-field" value={values.company}
            onChange={(e) => set("company", e.target.value)} onBlur={() => blur("company")}
            aria-invalid={!!err("company")} aria-describedby={err("company") ? `${uid}-company-err` : undefined}
          />
        </Field>
        <Field id={`${uid}-service`} label="Service of interest" required error={err("service")}>
          <Select
            id={`${uid}-service`} name="service" value={values.service} options={serviceOptions} placeholder="Select a service"
            onChange={(v) => set("service", v)} onBlur={() => blur("service")}
            invalid={!!err("service")} describedBy={err("service") ? `${uid}-service-err` : undefined}
          />
        </Field>
        <Field id={`${uid}-message`} label="Project description" required error={err("message")} className="md:col-span-2">
          <textarea
            id={`${uid}-message`} name="message" rows={5} required maxLength={5000}
            className="input-field resize-y leading-relaxed"
            placeholder="What are you working on, and how can we help?"
            value={values.message}
            onChange={(e) => set("message", e.target.value)} onBlur={() => blur("message")}
            aria-invalid={!!err("message")} aria-describedby={err("message") ? `${uid}-message-err` : undefined}
          />
        </Field>
        <Field id={`${uid}-budget`} label="Estimated budget" optional error={err("budget")}>
          <Select
            id={`${uid}-budget`} name="budget" value={values.budget} options={budgetOptions} placeholder="Select a range"
            onChange={(v) => set("budget", v)} onBlur={() => blur("budget")}
            invalid={!!err("budget")} describedBy={err("budget") ? `${uid}-budget-err` : undefined}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div className="mt-12">
        <label className="flex cursor-pointer items-start gap-4 text-[0.9375rem] leading-relaxed text-stone">
          <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
            <input
              type="checkbox" name="consent" checked={values.consent}
              onChange={(e) => { set("consent", e.target.checked); setTouched((t) => ({ ...t, consent: true })); }}
              aria-invalid={!!err("consent")} aria-describedby={err("consent") ? `${uid}-consent-err` : undefined}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-[4px] border border-ink/30 transition-colors checked:border-ink checked:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            />
            <svg aria-hidden viewBox="0 0 12 12" className="pointer-events-none absolute h-3 w-3 text-paper opacity-0 peer-checked:opacity-100">
              <path d="M2.5 6.2 5 8.5l4.5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span id={`${uid}-privacy`}>
            I agree that JXSTUDIO may use the details I provide to respond to my inquiry. Your information is never sold
            or shared for marketing. See our <Link to="/privacy" className="text-ink underline underline-offset-4">Privacy Policy</Link>.
          </span>
        </label>
        <ErrorText id={`${uid}-consent-err`} msg={err("consent")} />
      </div>

      <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" arrow disabled={status === "submitting"} aria-disabled={status === "submitting"} className="min-w-[13rem] uppercase tracking-[0.08em]">
          {status === "submitting" ? "Sending…" : "Send Inquiry"}
        </Button>
        <p className="text-sm text-stone">Prefer email? <a className="text-ink underline underline-offset-4" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></p>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="assertive" className="outline-none">
        <AnimatePresence>
          {status === "error" && (
            <motion.div
              role="alert"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 border-l-2 border-[#d70015] pl-5 text-[0.9375rem] leading-relaxed"
            >
              <p className="font-medium text-ink">Your inquiry wasn’t sent.</p>
              <p className="mt-1 text-stone">
                {serverError} You can also email us directly at{" "}
                <a className="text-ink underline underline-offset-4" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function Field({
  id, label, required, optional, error, className, children,
}: { id: string; label: string; required?: boolean; optional?: boolean; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("group", className)}>
      <label htmlFor={id} className={cn("eyebrow mb-2 block transition-colors", error ? "text-[#d70015]" : "text-stone group-focus-within:text-ink")}>
        {label}
        {required && <span aria-hidden> *</span>}
        {optional && <span className="ml-2 normal-case tracking-normal opacity-70">(optional)</span>}
      </label>
      <div className={cn(error && "[&_.input-field]:border-[#d70015]")}>{children}</div>
      <ErrorText id={`${id}-err`} msg={error} />
    </div>
  );
}

function ErrorText({ id, msg }: { id: string; msg?: string }) {
  return (
    <AnimatePresence initial={false}>
      {msg && (
        <motion.p
          id={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease }}
          className="overflow-hidden pt-2 text-sm text-[#d70015]"
        >
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function Select({
  id, name, value, options, placeholder, onChange, onBlur, invalid, describedBy,
}: {
  id: string; name: string; value: string; options: string[]; placeholder: string;
  onChange: (v: string) => void; onBlur: () => void; invalid: boolean; describedBy?: string;
}) {
  return (
    <div className="relative">
      <select
        id={id} name={name} value={value}
        onChange={(e) => onChange(e.target.value)} onBlur={onBlur}
        aria-invalid={invalid} aria-describedby={describedBy}
        className={cn("input-field cursor-pointer appearance-none pr-8", !value && "text-stone/70")}
      >
        <option value="" disabled={name === "service"}>{placeholder}</option>
        {options.map((o) => <option key={o} value={o} className="text-ink">{o}</option>)}
      </select>
      <svg aria-hidden viewBox="0 0 12 12" className="pointer-events-none absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2">
        <path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}
