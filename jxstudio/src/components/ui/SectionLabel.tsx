import { cn } from "@/lib/cn";

export function SectionLabel({ index, children, className }: { index?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3 text-stone", className)}>
      {index && <span className="tabular-nums">{index}</span>}
      {index && <span className="h-px w-8 bg-current opacity-50" aria-hidden />}
      <span>{children}</span>
    </p>
  );
}
