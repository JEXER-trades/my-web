import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * Art-directed, resolution-independent visuals.
 *
 * These are abstract architectural / light studies drawn in SVG so the site
 * ships with zero third-party stock imagery and zero broken image links.
 * Each one is designed to be swapped for real photography later: any
 * component that accepts a `visual` also accepts an `image` URL.
 */
export type VisualVariant = "monolith" | "arches" | "grid" | "orbit" | "horizon" | "prism" | "lines";

type Props = {
  variant: VisualVariant;
  className?: string;
  /** Enables slow ambient light motion (disabled automatically for reduced-motion users). */
  animate?: boolean;
  title?: string;
};

export function Visual({ variant, className, animate = false, title }: Props) {
  const uid = useId().replace(/:/g, "");
  const Comp = variants[variant];
  return (
    <div className={cn("relative h-full w-full overflow-hidden", animate && "visual-animate", className)}>
      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        role={title ? "img" : undefined}
        aria-label={title}
        aria-hidden={title ? undefined : true}
      >
        <Comp id={uid} />
      </svg>
      <div className="grain pointer-events-none absolute inset-0" aria-hidden />
    </div>
  );
}

type V = { id: string };

function Monolith({ id }: V) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-sky`} cx="50%" cy="10%" r="90%">
          <stop offset="0" stopColor="#3a3a3d" />
          <stop offset="0.45" stopColor="#141415" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c1c1e" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <linearGradient id={`${id}-slab`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2b2b2e" />
          <stop offset="0.08" stopColor="#0e0e0f" />
          <stop offset="1" stopColor="#050505" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={`${id}-refl`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="60" />
        </filter>
      </defs>
      <rect width="1600" height="1000" fill={`url(#${id}-sky)`} />
      <rect y="720" width="1600" height="280" fill={`url(#${id}-floor)`} />
      <ellipse className="v-glow" cx="800" cy="720" rx="520" ry="40" fill="#fff" fillOpacity="0.18" filter={`url(#${id}-blur)`} />
      <polygon className="v-beam" points="250,-50 520,-50 960,720 760,720" fill="#fff" fillOpacity="0.06" filter={`url(#${id}-blur)`} />
      <rect x="690" y="170" width="220" height="550" fill={`url(#${id}-slab)`} />
      <rect x="690" y="170" width="2.5" height="550" fill={`url(#${id}-edge)`} />
      <rect x="690" y="170" width="220" height="1.5" fill="#fff" opacity="0.35" />
      <rect x="690" y="722" width="220" height="260" fill={`url(#${id}-refl)`} />
      <line x1="0" y1="720" x2="1600" y2="720" stroke="#fff" strokeOpacity="0.12" />
    </>
  );
}

function Arches({ id }: V) {
  const arches = [180, 520, 860, 1200];
  return (
    <>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#efede9" />
          <stop offset="1" stopColor="#cbc7c0" />
        </linearGradient>
        <linearGradient id={`${id}-void`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2927" />
          <stop offset="1" stopColor="#0d0d0c" />
        </linearGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9d5ce" />
          <stop offset="1" stopColor="#a9a49b" />
        </linearGradient>
        <filter id={`${id}-soft`}>
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <rect width="1600" height="1000" fill={`url(#${id}-wall)`} />
      <rect y="760" width="1600" height="240" fill={`url(#${id}-floor)`} />
      {arches.map((x) => (
        <g key={x}>
          <path d={`M${x} 760 V330 A110 110 0 0 1 ${x + 220} 330 V760 Z`} fill={`url(#${id}-void)`} />
          <path d={`M${x + 220} 760 V330 A110 110 0 0 0 ${x + 200} 262`} stroke="#fff" strokeOpacity="0.5" strokeWidth="2" fill="none" />
          <polygon
            className="v-beam"
            points={`${x},760 ${x + 220},760 ${x + 420},1000 ${x + 140},1000`}
            fill="#fffaf0"
            fillOpacity="0.55"
            filter={`url(#${id}-soft)`}
          />
        </g>
      ))}
      <rect y="758" width="1600" height="3" fill="#000" opacity="0.08" />
    </>
  );
}

function Grid({ id }: V) {
  const vx = 800;
  const vy = 520;
  const rays = Array.from({ length: 29 }, (_, i) => -2400 + i * (6400 / 28));
  const rows = [560, 600, 660, 740, 850, 1000];
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" />
          <stop offset="0.52" stopColor="#151517" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.35" />
        </linearGradient>
        <radialGradient id={`${id}-orb`} cx="40%" cy="35%" r="65%">
          <stop offset="0" stopColor="#f5f5f7" />
          <stop offset="0.55" stopColor="#6e6e73" />
          <stop offset="1" stopColor="#111" />
        </radialGradient>
        <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="40" />
        </filter>
        <mask id={`${id}-m`}>
          <rect y={vy} width="1600" height="480" fill={`url(#${id}-fade)`} />
        </mask>
      </defs>
      <rect width="1600" height="1000" fill={`url(#${id}-bg)`} />
      <g mask={`url(#${id}-m)`} stroke="#fff" strokeWidth="1.2">
        {rays.map((x) => (
          <line key={x} x1={vx} y1={vy} x2={x} y2="1000" />
        ))}
        {rows.map((y) => (
          <line key={y} x1="0" y1={y} x2="1600" y2={y} />
        ))}
      </g>
      <ellipse className="v-glow" cx={vx} cy={vy} rx="600" ry="26" fill="#fff" fillOpacity="0.35" filter={`url(#${id}-blur)`} />
      <line x1="0" y1={vy} x2="1600" y2={vy} stroke="#fff" strokeOpacity="0.5" />
      <circle className="v-float" cx={vx} cy="360" r="110" fill={`url(#${id}-orb)`} />
    </>
  );
}

function Orbit({ id }: V) {
  return (
    <>
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="50%" r="75%">
          <stop offset="0" stopColor="#1b1b1d" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <radialGradient id={`${id}-sphere`} cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.35" stopColor="#a1a1a6" />
          <stop offset="0.8" stopColor="#1d1d1f" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="50" />
        </filter>
      </defs>
      <rect width="1600" height="1000" fill={`url(#${id}-bg)`} />
      <circle cx="800" cy="500" r="260" fill="#fff" opacity="0.08" filter={`url(#${id}-blur)`} />
      <g className="v-spin" style={{ transformOrigin: "800px 500px" }} fill="none" stroke="#fff">
        {[300, 400, 520, 660].map((r, i) => (
          <ellipse key={r} cx="800" cy="500" rx={r} ry={r * 0.32} strokeOpacity={0.35 - i * 0.07} transform="rotate(-14 800 500)" />
        ))}
      </g>
      <circle cx="800" cy="500" r="170" fill={`url(#${id}-sphere)`} />
      <circle className="v-float" cx="1395" cy="372" r="10" fill="#fff" opacity="0.9" />
    </>
  );
}

function Horizon({ id }: V) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d2d2d7" />
          <stop offset="0.62" stopColor="#f5f5f7" />
          <stop offset="1" stopColor="#e8e8ed" />
        </linearGradient>
        <radialGradient id={`${id}-sun`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.7" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-land`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3a3c" />
          <stop offset="1" stopColor="#0b0b0b" />
        </linearGradient>
        <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
      </defs>
      <rect width="1600" height="1000" fill={`url(#${id}-sky)`} />
      <circle className="v-glow" cx="800" cy="610" r="300" fill={`url(#${id}-sun)`} />
      <rect y="560" width="1600" height="120" fill="#fff" opacity="0.5" filter={`url(#${id}-blur)`} />
      <path d="M0 690 C 300 655, 520 700, 800 672 S 1300 650, 1600 690 V1000 H0 Z" fill="#86868b" opacity="0.55" />
      <path d="M0 745 C 380 715, 640 770, 960 735 S 1400 720, 1600 748 V1000 H0 Z" fill={`url(#${id}-land)`} />
    </>
  );
}

function Prism({ id }: V) {
  const spectrum = ["#ff5e5e", "#ffb347", "#ffe66d", "#7be495", "#5ec8ff", "#8b7bff"];
  return (
    <>
      <defs>
        <radialGradient id={`${id}-bg`} cx="45%" cy="50%" r="80%">
          <stop offset="0" stopColor="#161618" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.06" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.18" />
        </linearGradient>
        <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id={`${id}-blur2`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <rect width="1600" height="1000" fill={`url(#${id}-bg)`} />
      <line x1="0" y1="610" x2="760" y2="505" stroke="#fff" strokeWidth="5" filter={`url(#${id}-blur2)`} />
      <line x1="0" y1="610" x2="760" y2="505" stroke="#fff" strokeWidth="1.5" />
      <g className="v-glow" fillOpacity="0.75" filter={`url(#${id}-blur)`}>
        {spectrum.map((c, i) => (
          <polygon key={c} points={`820,505 1650,${300 + i * 70} 1650,${300 + (i + 1) * 70} 830,520`} fill={c} opacity="0.55" />
        ))}
      </g>
      <polygon points="800,260 1000,640 600,640" fill={`url(#${id}-glass)`} stroke="#fff" strokeOpacity="0.55" strokeWidth="1.5" />
      <line x1="800" y1="260" x2="800" y2="640" stroke="#fff" strokeOpacity="0.12" />
    </>
  );
}

function Lines({ id }: V) {
  const fins = Array.from({ length: 34 }, (_, i) => i);
  return (
    <>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#050505" />
          <stop offset="0.5" stopColor="#1a1a1c" />
          <stop offset="1" stopColor="#050505" />
        </linearGradient>
        <linearGradient id={`${id}-fin`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3a3a3d" />
          <stop offset="0.3" stopColor="#d2d2d7" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
        <linearGradient id={`${id}-sweep`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-v`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.9" />
          <stop offset="0.25" stopColor="#000" stopOpacity="0" />
          <stop offset="0.75" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.95" />
        </linearGradient>
        <mask id={`${id}-m`}>
          <g fill="#fff">
            {fins.map((i) => (
              <rect key={i} x={i * 48} y="0" width="22" height="1000" />
            ))}
          </g>
        </mask>
      </defs>
      <rect width="1600" height="1000" fill={`url(#${id}-bg)`} />
      <g mask={`url(#${id}-m)`}>
        <rect width="1600" height="1000" fill="#121214" />
        {fins.map((i) => (
          <rect key={i} x={i * 48} y="0" width="22" height="1000" fill={`url(#${id}-fin)`} opacity={0.18 + 0.5 * Math.sin((i / 33) * Math.PI)} />
        ))}
        <rect className="v-sweep" x="-500" y="0" width="700" height="1000" fill={`url(#${id}-sweep)`} />
      </g>
      <rect width="1600" height="1000" fill={`url(#${id}-v)`} />
    </>
  );
}

const variants: Record<VisualVariant, (p: V) => JSX.Element> = {
  monolith: Monolith,
  arches: Arches,
  grid: Grid,
  orbit: Orbit,
  horizon: Horizon,
  prism: Prism,
  lines: Lines,
};

/** Renders a real photo when provided, otherwise the art-directed visual. */
export function Media({
  image,
  visual,
  alt,
  className,
  animate,
  priority,
}: {
  image?: string;
  visual: VisualVariant;
  alt: string;
  className?: string;
  animate?: boolean;
  priority?: boolean;
}) {
  if (image) {
    return (
      <img
        src={image}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }
  return <Visual variant={visual} animate={animate} title={alt} className={className} />;
}
