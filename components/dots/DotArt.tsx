/* Dot-matrix pictures: simple shapes rendered as a regular field of dots, the same language as
   the 3D logo on the home. Each picture is a base shape plus an optional accent shape in a second
   colour, both on a 200 × 200 stage. Colours are CSS values so they follow the tile they sit on. */

type Shape = { base: string; accent?: string };

export const DOT_SHAPES = {
  // A database: the cylinder, with its top ring as the accent
  database:
    { base: "M40 52 C40 30 160 30 160 52 V148 C160 170 40 170 40 148 Z", accent: "M40 52 C40 74 160 74 160 52 C160 30 40 30 40 52 Z" },
  // Governance: a shield, the tick as accent
  shield:
    { base: "M100 22 L168 48 C168 112 142 156 100 178 C58 156 32 112 32 48 Z", accent: "M66 98 L90 122 L140 72 L152 84 L90 146 L54 110 Z" },
  // AI & agents: a question and the agent's answer
  chat:
    { base: "M24 40 H130 Q144 40 144 54 V96 Q144 110 130 110 H62 L40 130 V110 H38 Q24 110 24 96 V54 Q24 40 38 40 Z", accent: "M70 108 H162 Q176 108 176 122 V160 Q176 174 162 174 H152 V194 L130 174 H84 Q70 174 70 160 V122 Q70 108 84 108 Z" },
  // The data stack: three layers
  layers:
    { base: "M100 30 L176 66 L100 102 L24 66 Z M24 100 L100 136 L176 100 L176 112 L100 148 L24 112 Z", accent: "M24 134 L100 170 L176 134 L176 146 L100 182 L24 146 Z" },
  // Business apps: a phone with its action button as accent
  app:
    { base: "M62 18 H138 Q154 18 154 34 V166 Q154 182 138 182 H62 Q46 182 46 166 V34 Q46 18 62 18 Z", accent: "M66 132 H134 V154 H66 Z" },
  // Training: the open book from the logo, roof as accent
  book:
    { base: "M14 120 H92 Q98 120 99 128 L100 140 L101 128 Q102 120 108 120 H186 L198 140 H120 Q112 140 108 146 Q100 154 92 146 Q88 140 80 140 H2 Z", accent: "M38 104 L94 62 Q100 58 106 62 L162 104 L146 104 L108 80 Q100 75 92 80 L54 104 Z" },
  // Architecture: a lakehouse feeding a report
  architecture:
    { base: "M18 40 H96 V72 H18 Z M18 86 H96 V118 H18 Z M18 132 H96 V164 H18 Z", accent: "M116 54 H182 V164 H116 Z" },
} satisfies Record<string, Shape>;

export type DotShape = keyof typeof DOT_SHAPES;

export default function DotArt({
  shape,
  color = "currentColor",
  accent = "var(--color-brand)",
  step = 9,
  radius = 2.3,
  className = "",
  id,
}: {
  shape: DotShape;
  color?: string;
  accent?: string;
  step?: number;
  radius?: number;
  className?: string;
  /** Unique id prefix, so several pictures can share a page */
  id: string;
}) {
  const s = DOT_SHAPES[shape] as Shape;
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <pattern id={`${id}-dots`} width={step} height={step} patternUnits="userSpaceOnUse">
          <circle cx={step / 2} cy={step / 2} r={radius} fill={color} />
        </pattern>
        <pattern id={`${id}-accent`} width={step} height={step} patternUnits="userSpaceOnUse">
          <circle cx={step / 2} cy={step / 2} r={radius} fill={accent} />
        </pattern>
        <mask id={`${id}-base`}>
          <path d={s.base} fill="#fff" />
          {s.accent && <path d={s.accent} fill="#000" />}
        </mask>
        {s.accent && (
          <mask id={`${id}-acc`}>
            <path d={s.accent} fill="#fff" />
          </mask>
        )}
      </defs>
      <rect width="200" height="200" fill={`url(#${id}-dots)`} mask={`url(#${id}-base)`} />
      {s.accent && <rect width="200" height="200" fill={`url(#${id}-accent)`} mask={`url(#${id}-acc)`} />}
    </svg>
  );
}
