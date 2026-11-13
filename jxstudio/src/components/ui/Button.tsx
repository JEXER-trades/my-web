import { forwardRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Tone = "light" | "dark"; // the background the button sits on

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium " +
  "transition-[color,background-color,border-color,transform] duration-500 ease-apple active:scale-[0.97] " +
  "disabled:pointer-events-none disabled:opacity-50 min-h-[48px] px-7 text-[0.9375rem] tracking-[-0.01em]";

const styles: Record<Tone, Record<Variant, string>> = {
  light: {
    primary: "bg-ink text-paper",
    secondary: "border border-ink/20 text-ink hover:border-ink",
    ghost: "text-ink px-0 min-h-0",
  },
  dark: {
    primary: "bg-paper text-ink",
    secondary: "border border-paper/25 text-paper hover:border-paper",
    ghost: "text-paper px-0 min-h-0",
  },
};

type Common = { variant?: Variant; tone?: Tone; className?: string; children: ReactNode; arrow?: boolean };

function Inner({ children, arrow, variant }: { children: ReactNode; arrow?: boolean; variant: Variant }) {
  return (
    <>
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 translate-y-full rounded-full bg-stone/40 transition-transform duration-500 ease-apple group-hover:translate-y-0"
        />
      )}
      <span className="relative">{children}</span>
      {arrow && <Arrow className="relative transition-transform duration-500 ease-apple group-hover:translate-x-1" />}
    </>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className={className}>
      <path d="M1 7h11M7.5 2.5 12 7l-4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ButtonLink({ to, variant = "primary", tone = "light", className, children, arrow }: Common & { to: string }) {
  const cls = cn(base, styles[tone][variant], className);
  const inner = <Inner variant={variant} arrow={arrow}>{children}</Inner>;
  if (/^(https?:|mailto:|tel:)/.test(to)) {
    return (
      <a href={to} className={cls} {...(to.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return <Link to={to} className={cls}>{inner}</Link>;
}

export const Button = forwardRef<HTMLButtonElement, Common & React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ variant = "primary", tone = "light", className, children, arrow, ...rest }, ref) => (
    <button ref={ref} className={cn(base, styles[tone][variant], className)} {...rest}>
      <Inner variant={variant} arrow={arrow}>{children}</Inner>
    </button>
  ),
);
Button.displayName = "Button";

/** Inline text link with an animated underline and arrow ("Learn more →"). */
export function TextLink({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link to={to} className={cn("group inline-flex items-center gap-2 text-[0.9375rem] font-medium", className)}>
      <span className="link-underline pb-0.5">{children}</span>
      <Arrow className="transition-transform duration-500 ease-apple group-hover:translate-x-1" />
    </Link>
  );
}
