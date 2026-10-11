"use client";

import Link from "next/link";
import LogoMark from "@/components/lines/LogoMark";

/* The home route map. Both lines leave the Discovery call together, split into the Build line
   (development, ink) and the Teach line (training, blue), and meet again at Handover — drawn as
   the Tealis mark, the roof over the open book. Only 45° bends, like a transit diagram. */

type Stop = { name: string; sub?: string; href: string; at: number; portrait?: { src: string; alt: string } };

const BUILD: Stop[] = [
  { name: "Assess", sub: "your data & goals", href: "/consulting#data-strategy", at: 0.35 },
  { name: "Architecture", sub: "with Luca", href: "/consulting#data-architecture", at: 0.52, portrait: { src: "/team/luca.png", alt: "Luca Canonico" } },
  { name: "Build & deploy", sub: "Fabric · Databricks", href: "/consulting#data-architecture", at: 0.7 },
];
const TEACH: Stop[] = [
  { name: "Fabric", sub: "DP-600 · DP-700", href: "/training#fabric", at: 0.35 },
  { name: "Power BI", sub: "PL-300", href: "/training#power-bi", at: 0.52 },
  { name: "AI & agents", sub: "AI-901 · AI-103", href: "/training#ai", at: 0.7 },
];

const DRAW_MS = 1700;
const START_MS = 250;

/** Desktop: lines run left → right. y of each line, x of each stop. */
const H = {
  w: 840, h: 540,
  start: { x: 64, y: 270 },
  build: "M 98 265 H 150 L 270 145 H 640 L 760 265 H 772",
  teach: "M 98 275 H 150 L 270 395 H 640 L 760 275 H 772",
  buildY: 145, teachY: 395, xs: [320, 455, 590], hub: { x: 776, y: 270 },
};
/** Mobile: lines run top → bottom, Build on the left, Teach on the right. */
const V = {
  w: 360, h: 840,
  start: { x: 180, y: 52 },
  build: "M 175 86 V 120 L 60 235 V 580 L 175 695 V 712",
  teach: "M 185 86 V 120 L 300 235 V 580 L 185 695 V 712",
  buildX: 60, teachX: 300, ys: [270, 380, 490], hub: { x: 180, y: 720 },
};

export default function RouteMap() {
  // Motion lives in CSS so reduced-motion is honoured without a server/client mismatch
  const anim = (at: number) => ({ animationDelay: `${START_MS + at * DRAW_MS}ms` }) as React.CSSProperties;
  const lineStyle = { animation: `route-draw ${DRAW_MS}ms linear ${START_MS}ms both` } as React.CSSProperties;

  const station = (s: Stop, x: number, y: number, color: string, labelPos: "above" | "below" | "right" | "left", key: string, small = false) => {
    const side = s.portrait ? 42 : 22;
    const lx = labelPos === "right" ? x + side : labelPos === "left" ? x - side : x;
    const [nameSize, subSize] = small ? [15, 12] : [19, 14];
    const anchor = labelPos === "right" ? "start" : labelPos === "left" ? "end" : "middle";
    const ly = labelPos === "above" ? y - (s.portrait ? 62 : 38) : labelPos === "below" ? y + (s.portrait ? 62 : 44) : y - 4;
    return (
      <Link key={key} href={s.href} className="group outline-none" aria-label={`${s.name}${s.sub ? ` — ${s.sub}` : ""}`}>
        <g className="station-arrive" style={{ ...anim(s.at), transformBox: "fill-box", transformOrigin: "center" }}>
          {s.portrait ? (
            <>
              <clipPath id={`clip-${key}`}><circle cx={x} cy={y} r={27} /></clipPath>
              <circle cx={x} cy={y} r={31} fill="var(--bg-primary)" stroke={color} strokeWidth={5} />
              <image href={s.portrait.src} x={x - 27} y={y - 27} width={54} height={54} clipPath={`url(#clip-${key})`} preserveAspectRatio="xMidYMid slice" />
            </>
          ) : (
            <circle cx={x} cy={y} r={11} fill="var(--bg-primary)" stroke={color} strokeWidth={5} className="transition-[r] duration-200 group-hover:[r:14px] group-focus-visible:[r:14px]" />
          )}
        </g>
        <text x={lx} y={ly} textAnchor={anchor} className="fill-[var(--text-primary)] group-hover:fill-[var(--color-brand-text)] transition-colors" style={{ font: `700 ${nameSize}px var(--font-heading)` }}>
          {s.name}
        </text>
        {s.sub && (
          <text x={lx} y={ly + subSize + 6} textAnchor={anchor} className="fill-[var(--text-muted)] tabular" style={{ font: `500 ${subSize}px var(--font-body)`, letterSpacing: "0.03em" }}>
            {s.sub}
          </text>
        )}
      </Link>
    );
  };

  const terminus = (x: number, y: number) => (
    <Link href="/contact/meet" className="group outline-none" aria-label="Discovery call with Gabriele — book a 30-minute call">
      <clipPath id="clip-start"><circle cx={x} cy={y} r={30} /></clipPath>
      <rect x={x - 38} y={y - 38} width={76} height={76} rx={38} fill="var(--bg-primary)" stroke="var(--line-build)" strokeWidth={5} />
      <image href="/team/gabriele.png" x={x - 30} y={y - 30} width={60} height={60} clipPath="url(#clip-start)" preserveAspectRatio="xMidYMid slice" />
      <text x={x} y={y + 64} textAnchor="middle" className="fill-[var(--text-primary)] group-hover:fill-[var(--color-brand-text)] transition-colors" style={{ font: "700 17px var(--font-heading)" }}>
        Discovery call
      </text>
      <text x={x} y={y + 83} textAnchor="middle" className="fill-[var(--text-muted)]" style={{ font: "500 13px var(--font-body)" }}>
        with Gabriele · 30 min
      </text>
    </Link>
  );

  const hub = (x: number, y: number) => (
    <g className="station-arrive" style={{ ...anim(1), transformBox: "fill-box", transformOrigin: "center" }}>
      <rect x={x - 58} y={y - 40} width={116} height={80} rx={40} fill="var(--bg-primary)" stroke="var(--line-build)" strokeWidth={5} />
      <foreignObject x={x - 44} y={y - 26} width={88} height={52}>
        <LogoMark className="w-full h-full text-[var(--text-primary)]" />
      </foreignObject>
      <text x={x} y={y + 70} textAnchor="middle" className="fill-[var(--text-primary)]" style={{ font: "800 17px var(--font-heading)" }}>
        Handover
      </text>
      <text x={x} y={y + 89} textAnchor="middle" className="fill-[var(--color-brand-text)]" style={{ font: "600 13px var(--font-body)" }}>
        your team owns it
      </text>
    </g>
  );

  const rails = (build: string, teach: string) => (
    <>
      <path className="route-rail" d={build} pathLength={1} fill="none" stroke="var(--line-build)" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" style={lineStyle} />
      <path className="route-rail" d={teach} pathLength={1} fill="none" stroke="var(--line-teach)" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" style={lineStyle} />
    </>
  );

  return (
    <div className="w-full">
      <style>{`@keyframes route-draw { from { stroke-dasharray: 1; stroke-dashoffset: 1 } to { stroke-dasharray: 1; stroke-dashoffset: 0 } }
        @media (prefers-reduced-motion: reduce) { .route-rail { animation: none !important } }`}</style>

      {/* Desktop / tablet */}
      <svg viewBox={`0 0 ${H.w} ${H.h}`} className="hidden md:block w-full h-auto overflow-visible" role="group" aria-label="How a Tealis project travels: Build line and Teach line, from Discovery call to Handover">
        {rails(H.build, H.teach)}
        <text x={455} y={190} textAnchor="middle" className="fill-[var(--text-muted)]" style={{ font: "700 12px var(--font-body)", letterSpacing: "0.16em" }}>BUILD LINE · DEVELOPMENT</text>
        <text x={455} y={358} textAnchor="middle" className="fill-[var(--color-brand-text)]" style={{ font: "700 12px var(--font-body)", letterSpacing: "0.16em" }}>TEACH LINE · TRAINING</text>
        {BUILD.map((s, i) => station(s, H.xs[i], H.buildY, "var(--line-build)", "above", `hb${i}`))}
        {TEACH.map((s, i) => station(s, H.xs[i], H.teachY, "var(--line-teach)", "below", `ht${i}`))}
        {terminus(H.start.x, H.start.y)}
        {hub(H.hub.x, H.hub.y)}
      </svg>

      {/* Phone */}
      <svg viewBox={`0 0 ${V.w} ${V.h}`} className="md:hidden w-full h-auto overflow-visible" role="group" aria-label="How a Tealis project travels: Build line and Teach line, from Discovery call to Handover">
        {rails(V.build, V.teach)}
        {BUILD.map((s, i) => station(s, V.buildX, V.ys[i], "var(--line-build)", "right", `vb${i}`, true))}
        {TEACH.map((s, i) => station(s, V.teachX, V.ys[i] + 50, "var(--line-teach)", "left", `vt${i}`, true))}
        <Link href="/contact/meet" aria-label="Discovery call with Gabriele — book a 30-minute call">
          <clipPath id="clip-vstart"><circle cx={V.start.x} cy={V.start.y} r={26} /></clipPath>
          <rect x={V.start.x - 33} y={V.start.y - 33} width={66} height={66} rx={33} fill="var(--bg-primary)" stroke="var(--line-build)" strokeWidth={5} />
          <image href="/team/gabriele.png" x={V.start.x - 26} y={V.start.y - 26} width={52} height={52} clipPath="url(#clip-vstart)" preserveAspectRatio="xMidYMid slice" />
          <text x={V.start.x + 46} y={V.start.y - 2} className="fill-[var(--text-primary)]" style={{ font: "700 16px var(--font-heading)" }}>Discovery call</text>
          <text x={V.start.x + 46} y={V.start.y + 16} className="fill-[var(--text-muted)]" style={{ font: "500 12px var(--font-body)" }}>with Gabriele · 30 min</text>
        </Link>
        {hub(V.hub.x, V.hub.y)}
      </svg>
    </div>
  );
}
