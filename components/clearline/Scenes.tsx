/* Clear-line illustrations: one even ink stroke, flat fills from the palette, no shading.
   Every scene is drawn on the same 400 × 260 stage so panels line up across the site.
   Colours come from CSS variables, so they follow the light and dark themes. */

const INK = "var(--line)";
const PAPER = "var(--bg-primary)";
const SKY = "var(--fill-sky)";
const SKY_DEEP = "var(--fill-sky-deep)";
const BLUE = "var(--color-brand)";
const DARK = "var(--text-primary)";

type SceneProps = { className?: string; title?: string };

function Stage({ children, className = "", title }: SceneProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 260"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      preserveAspectRatio="xMidYMid meet"
    >
      {title && <title>{title}</title>}
      <g fill="none" stroke={INK} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round">
        {children}
      </g>
    </svg>
  );
}

/** A person drawn as head + shoulders; `hair` adds a simple cap of hair so the two of us read apart */
function Person({ x, y, body = BLUE, hair = false, scale = 1 }: { x: number; y: number; body?: string; hair?: boolean; scale?: number }) {
  const s = scale;
  return (
    <g>
      <path
        d={`M ${x - 32 * s} ${y + 96 * s} C ${x - 32 * s} ${y + 44 * s}, ${x + 32 * s} ${y + 44 * s}, ${x + 32 * s} ${y + 96 * s} Z`}
        fill={body}
      />
      <circle cx={x} cy={y + 18 * s} r={19 * s} fill={PAPER} />
      {hair && <path d={`M ${x - 19 * s} ${y + 14 * s} C ${x - 17 * s} ${y - 6 * s}, ${x + 17 * s} ${y - 6 * s}, ${x + 19 * s} ${y + 14 * s} C ${x + 8 * s} ${y + 6 * s}, ${x - 8 * s} ${y + 6 * s}, ${x - 19 * s} ${y + 14 * s} Z`} fill={DARK} />}
    </g>
  );
}

function Floor() {
  return <path d="M0 214 H400 V260 H0 Z" fill={SKY} stroke="none" />;
}

/** The Tealis mark, drawn in the same line as everything else */
function Mark({ x, y, w }: { x: number; y: number; w: number }) {
  const k = w / 184;
  const t = (px: number, py: number) => `${x + (px - 108) * k} ${y + (py - 44) * k}`;
  return (
    <g>
      <path d={`M ${t(134, 84)} L ${t(191, 44)} Q ${t(200, 39)} ${t(209, 44)} L ${t(266, 84)} L ${t(252, 84)} L ${t(212, 66)} Q ${t(200, 61)} ${t(188, 66)} L ${t(148, 84)} Z`} fill={BLUE} />
      <path d={`M ${t(124, 98)} L ${t(194, 98)} Q ${t(198, 98)} ${t(199, 103)} L ${t(200, 110)} L ${t(201, 103)} Q ${t(202, 98)} ${t(206, 98)} L ${t(276, 98)} L ${t(292, 110)} L ${t(222, 110)} Q ${t(212, 110)} ${t(208, 114)} Q ${t(200, 122)} ${t(192, 114)} Q ${t(188, 110)} ${t(178, 110)} L ${t(108, 110)} Z`} fill={PAPER} />
    </g>
  );
}

/* ── Engagement ─────────────────────────────────────────────────── */

/** Sketching the architecture together at the whiteboard */
export function SceneWorkshop(p: SceneProps) {
  return (
    <Stage {...p}>
      <Floor />
      <rect x={96} y={30} width={208} height={128} rx={6} fill={PAPER} />
      <path d="M200 158 V214 M170 214 H230" />
      <rect x={118} y={54} width={44} height={28} rx={4} fill={SKY} />
      <rect x={180} y={54} width={44} height={28} rx={4} fill={SKY} />
      <rect x={242} y={54} width={44} height={28} rx={4} fill={BLUE} />
      <path d="M162 68 H180 M224 68 H242" />
      <path d="M140 82 V112 H264 V82" />
      <path d="M140 132 C 170 124, 200 140, 236 128" stroke={BLUE} />
      <Person x={58} y={122} body={BLUE} hair />
      <path d="M84 178 L 126 136" />
      <Person x={344} y={128} body={DARK} hair />
    </Stage>
  );
}

/** Building: the screen where the platform comes together */
export function SceneBuild(p: SceneProps) {
  return (
    <Stage {...p}>
      <Floor />
      <rect x={70} y={34} width={260} height={150} rx={8} fill={PAPER} />
      <path d="M70 58 H330" />
      <circle cx={86} cy={46} r={3} fill={INK} />
      <circle cx={98} cy={46} r={3} fill={INK} />
      <rect x={92} y={76} width={96} height={86} rx={4} fill={SKY} />
      <path d="M108 148 V120 M126 148 V104 M144 148 V128 M162 148 V94" stroke={BLUE} strokeWidth={9} />
      <path d="M206 82 H306 M206 100 H282 M206 118 H298 M206 136 H262 M206 154 H290" />
      <path d="M200 184 V214 M160 214 H240" />
    </Stage>
  );
}

/** Teaching: a trainer at the screen, the team in the front row */
export function SceneTeach(p: SceneProps) {
  return (
    <Stage {...p}>
      <rect x={140} y={22} width={226} height={124} rx={6} fill={PAPER} />
      <Mark x={196} y={52} w={114} />
      <path d="M176 120 H330" stroke={BLUE} />
      <Person x={84} y={74} body={BLUE} hair />
      <path d="M0 214 H400 V260 H0 Z" fill={SKY} stroke="none" />
      <Person x={150} y={176} body={DARK} scale={0.9} />
      <Person x={230} y={180} body={SKY_DEEP} scale={0.9} />
      <Person x={310} y={176} body={DARK} scale={0.9} hair />
    </Stage>
  );
}

/** Handover: the team owns the work, under the roof */
export function SceneHandover(p: SceneProps) {
  return (
    <Stage {...p}>
      <Floor />
      <Mark x={110} y={26} w={180} />
      <Person x={124} y={120} body={DARK} hair />
      <Person x={200} y={112} body={BLUE} />
      <Person x={276} y={120} body={SKY_DEEP} hair />
    </Stage>
  );
}

/* ── Consulting ─────────────────────────────────────────────────── */

function Cylinder({ x, y, w = 56, h = 64, fill = SKY }: { x: number; y: number; w?: number; h?: number; fill?: string }) {
  const r = w / 2;
  return (
    <g>
      <path d={`M ${x} ${y + 10} V ${y + h} C ${x} ${y + h + 14}, ${x + w} ${y + h + 14}, ${x + w} ${y + h} V ${y + 10}`} fill={fill} />
      <ellipse cx={x + r} cy={y + 10} rx={r} ry={10} fill={PAPER} />
    </g>
  );
}

/** Data architecture: sources flow into the lakehouse layers and out to a report */
export function SceneArchitecture(p: SceneProps) {
  return (
    <Stage {...p}>
      <Cylinder x={24} y={40} w={52} h={52} />
      <Cylinder x={24} y={134} w={52} h={52} fill={BLUE} />
      <path d="M86 86 C 110 86, 112 124, 136 124 M86 172 C 110 172, 112 136, 136 136" />
      <path d="M128 118 L 138 124 L 128 132" />
      <rect x={142} y={70} width={110} height={30} rx={4} fill={SKY} />
      <rect x={142} y={112} width={110} height={30} rx={4} fill={SKY_DEEP} />
      <rect x={142} y={154} width={110} height={30} rx={4} fill={BLUE} />
      <path d="M262 128 H290 M282 120 L 292 128 L 282 136" />
      <rect x={298} y={72} width={88} height={112} rx={6} fill={PAPER} />
      <path d="M314 166 V140 M332 166 V120 M350 166 V132 M368 166 V104" stroke={BLUE} strokeWidth={8} />
    </Stage>
  );
}

/** Governance: a policy that is checked, protected and easy to find */
export function SceneGovernance(p: SceneProps) {
  return (
    <Stage {...p}>
      <path d="M86 26 H226 L 258 58 V 234 H 86 Z" fill={PAPER} />
      <path d="M226 26 V58 H258" />
      <path d="M108 86 l 8 8 l 16 -16 M144 88 H232 M108 126 l 8 8 l 16 -16 M144 128 H220 M108 166 l 8 8 l 16 -16 M144 168 H226" />
      <path d="M262 112 C 286 122, 306 124, 326 124 C 328 168, 312 200, 286 214 C 260 200, 244 168, 246 124 C 254 124, 258 120, 262 112 Z" fill={BLUE} />
      <path d="M272 162 l 10 10 l 20 -22" stroke={PAPER} strokeWidth={4} />
    </Stage>
  );
}

/** AI & agents: a question, an agent that answers with your data */
export function SceneAI(p: SceneProps) {
  return (
    <Stage {...p}>
      <path d="M40 46 H232 Q 246 46 246 60 V 104 Q 246 118 232 118 H 92 L 66 140 V 118 H 54 Q 40 118 40 104 V 60 Q 40 46 54 46 Z" fill={PAPER} />
      <path d="M64 72 H212 M64 94 H170" />
      <path d="M154 140 H344 Q 358 140 358 154 V 204 Q 358 218 344 218 H 330 V 240 L 304 218 H 168 Q 154 218 154 204 V 154 Q 154 140 168 140 Z" fill={BLUE} />
      <rect x={178} y={164} width={70} height={30} rx={4} fill={SKY} />
      <path d="M262 168 H330 M262 188 H310" stroke={PAPER} />
      <path d="M318 40 L 324 58 L 342 64 L 324 70 L 318 88 L 312 70 L 294 64 L 312 58 Z" fill={SKY_DEEP} />
    </Stage>
  );
}

/* ── Training ───────────────────────────────────────────────────── */

/** Data stack: storage, processing and the model on top */
export function SceneDataStack(p: SceneProps) {
  return (
    <Stage {...p}>
      <Floor />
      <Cylinder x={52} y={110} w={84} h={70} fill={SKY_DEEP} />
      <Cylinder x={52} y={46} w={84} h={52} fill={BLUE} />
      <path d="M150 120 H190 M182 112 L 192 120 L 182 128" />
      <rect x={204} y={46} width={150} height={134} rx={6} fill={PAPER} />
      <path d="M204 72 H354" />
      <circle cx={244} cy={128} r={34} fill={SKY} />
      <path d="M244 94 V128 H278" stroke={BLUE} strokeWidth={5} />
      <path d="M298 108 H334 M298 128 H326 M298 148 H334" />
    </Stage>
  );
}

/** Business apps: a form on a phone that starts a flow */
export function SceneApps(p: SceneProps) {
  return (
    <Stage {...p}>
      <rect x={52} y={24} width={110} height={212} rx={16} fill={PAPER} />
      <path d="M92 40 H122" />
      <rect x={70} y={64} width={74} height={18} rx={4} fill={SKY} />
      <rect x={70} y={94} width={74} height={18} rx={4} fill={SKY} />
      <rect x={70} y={124} width={74} height={18} rx={4} fill={SKY} />
      <rect x={70} y={168} width={74} height={26} rx={13} fill={BLUE} />
      <path d="M176 130 H214 M206 122 L 216 130 L 206 138" />
      <circle cx={252} cy={130} r={26} fill={SKY_DEEP} />
      <path d="M278 130 H306 M298 122 L 308 130 L 298 138" />
      <circle cx={340} cy={130} r={26} fill={BLUE} />
      <path d="M328 130 l 8 8 l 16 -16" stroke={PAPER} strokeWidth={4} />
    </Stage>
  );
}

/** Custom programmes: a learning plan drawn for this team */
export function SceneCustom(p: SceneProps) {
  return (
    <Stage {...p}>
      <rect x={60} y={28} width={210} height={196} rx={6} fill={PAPER} />
      <path d="M84 62 H200 M84 92 H236" />
      <circle cx={96} cy={136} r={10} fill={BLUE} />
      <circle cx={160} cy={136} r={10} fill={SKY_DEEP} />
      <circle cx={224} cy={136} r={10} fill={SKY_DEEP} />
      <path d="M106 136 H150 M170 136 H214" />
      <path d="M84 186 H230" stroke={BLUE} />
      <path d="M300 42 L 340 82 L 268 196 L 240 208 L 250 180 Z" fill={SKY} />
      <path d="M290 58 L 328 98" />
    </Stage>
  );
}

/** On the job: side by side on the same laptop */
export function SceneOnTheJob(p: SceneProps) {
  return (
    <Stage {...p}>
      <Floor />
      <rect x={140} y={92} width={120} height={78} rx={6} fill={PAPER} />
      <path d="M126 170 H274 L 262 184 H138 Z" fill={SKY_DEEP} />
      <path d="M160 116 H224 M160 134 H240 M160 152 H206" stroke={BLUE} />
      <Person x={84} y={114} body={BLUE} hair />
      <Person x={316} y={114} body={DARK} />
    </Stage>
  );
}

/* ── Contact ────────────────────────────────────────────────────── */

export function SceneCalendar(p: SceneProps) {
  return (
    <Stage {...p}>
      <rect x={110} y={44} width={180} height={168} rx={10} fill={PAPER} />
      <path d="M110 86 H290" />
      <rect x={110} y={44} width={180} height={42} rx={10} fill={BLUE} />
      <path d="M150 32 V56 M250 32 V56" />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3, 4].map((c) => (
          <rect key={`${r}${c}`} x={128 + c * 30} y={102 + r * 26} width={18} height={14} rx={3} fill={r === 1 && c === 2 ? BLUE : SKY} />
        )),
      )}
    </Stage>
  );
}

export function SceneMessage(p: SceneProps) {
  return (
    <Stage {...p}>
      <rect x={96} y={66} width={208} height={136} rx={8} fill={PAPER} />
      <path d="M96 74 L 200 148 L 304 74" />
      <path d="M268 30 Q 292 30 292 50 Q 292 70 268 70 H 262 L 250 82 V 70 Q 232 66 232 50 Q 232 30 256 30 Z" fill={BLUE} />
    </Stage>
  );
}

export function SceneConnect(p: SceneProps) {
  return (
    <Stage {...p}>
      <path d="M128 112 L 200 74 L 272 112 M128 112 L 200 168 L 272 112" />
      <circle cx={200} cy={74} r={26} fill={BLUE} />
      <circle cx={128} cy={112} r={22} fill={SKY_DEEP} />
      <circle cx={272} cy={112} r={22} fill={SKY_DEEP} />
      <circle cx={200} cy={168} r={22} fill={PAPER} />
    </Stage>
  );
}
