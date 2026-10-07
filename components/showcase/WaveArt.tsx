// Abstract "data waves" illustration (featured group tile), drawn in the brand color.
// Static by design (no animation), deterministic so server and client render the same SVG.

const LINES = 30;
const W = 640;
const H = 440;

function wavePath(i: number) {
  const y = 30 + i * ((H - 60) / (LINES - 1));
  // Amplitude swells toward the middle lines, phase drifts line by line
  const mid = 1 - Math.abs(i - LINES / 2) / (LINES / 2);
  const a = 18 + mid * 46;
  const shift = i * 9;
  return [
    `M 0 ${y.toFixed(1)}`,
    `C ${(140 + shift).toFixed(1)} ${(y - a).toFixed(1)}, ${(260 + shift).toFixed(1)} ${(y + a).toFixed(1)}, ${(380 + shift / 2).toFixed(1)} ${y.toFixed(1)}`,
    `S ${(560 - shift / 3).toFixed(1)} ${(y - a * 0.8).toFixed(1)}, ${W} ${(y + a * 0.2).toFixed(1)}`,
  ].join(" ");
}

export default function WaveArt({ id = "wave-art", className = "" }: { id?: string; className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={`text-[var(--color-brand)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-fade`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.35" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <mask id={`${id}-mask`}>
          <rect width={W} height={H} fill={`url(#${id}-fade)`} />
        </mask>
      </defs>
      <g mask={`url(#${id}-mask)`} fill="none" stroke="currentColor" strokeLinecap="round">
        {Array.from({ length: LINES }, (_, i) => (
          <path
            key={i}
            d={wavePath(i)}
            strokeWidth={i % 5 === 0 ? 1.6 : 1}
            strokeOpacity={0.18 + 0.5 * (1 - Math.abs(i - LINES / 2) / (LINES / 2))}
          />
        ))}
      </g>
    </svg>
  );
}
