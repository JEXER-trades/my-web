import { cn } from "@/lib/cn";

/**
 * JXSTUDIO wordmark.
 * A heavy, tightly-kerned "JX" locked to a lighter, widely-tracked "STUDIO",
 * separated by a hairline — confident monogram, quiet descriptor.
 */
export function Wordmark({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" | "xl" }) {
  const sizes = {
    sm: "text-[0.95rem]",
    md: "text-[1.05rem]",
    lg: "text-2xl",
    xl: "text-[clamp(2.5rem,11.2vw,10.5rem)]",
  } as const;
  return (
    <span className={cn("inline-flex select-none items-center font-display leading-none", sizes[size], className)} aria-label="JXSTUDIO">
      <span aria-hidden className="font-[800] tracking-[-0.06em]">JX</span>
      <span aria-hidden className="mx-[0.42em] h-[0.82em] w-px bg-current opacity-40" />
      <span aria-hidden className="font-[400] tracking-[0.28em]">STUDIO</span>
    </span>
  );
}
