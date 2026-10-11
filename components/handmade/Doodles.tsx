/* Small hand-drawn icons in the logo's spirit: single-weight pen strokes, slightly uneven,
   brand blue with an ink accent. Drawn by hand, not from an icon set. */

const pen = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Transparency: a window with the plan visible inside */
export function DoodleTransparency({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path {...pen} d="M8.5 10.2 C 18 9.4, 30 9.8, 39.6 10.4 C 40.2 19, 39.8 29, 39.2 38.1 C 29 38.7, 18.5 38.4, 8.8 37.9 C 8.2 28.6, 8.1 19.2, 8.5 10.2 Z" />
      <path {...pen} d="M9 17.4 C 19 17, 29.5 17.2, 39.4 17.6" />
      <path {...pen} className="text-[var(--text-primary)]" stroke="currentColor" d="M14.5 24.2 L 26.8 24 M14.4 29.4 L 32.6 29.1 M14.6 34 L 22.4 33.9" />
    </svg>
  );
}

/** Knowledge sharing: an open book handing a spark to the next one */
export function DoodleSharing({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path {...pen} d="M6.2 30.5 C 12 29.2, 18 29.6, 23.6 32.4 C 29.4 29.4, 35.6 29, 41.8 30.3" />
      <path {...pen} d="M6.4 30.6 L 6.8 36.4 C 12.6 35.2, 18.2 35.8, 23.8 38.6 C 29.6 35.6, 35.4 35.1, 41.4 36.2 L 41.7 30.4" />
      <path {...pen} d="M23.7 32.6 L 23.8 38.4" />
      <path {...pen} className="text-[var(--text-primary)]" stroke="currentColor" d="M24 24.8 C 23.6 20, 24.4 15.6, 24.1 10.4 M19.4 15 C 21 13.2, 22.5 11.4, 24.1 10.2 C 25.8 11.6, 27.3 13.3, 28.9 15.1" />
    </svg>
  );
}

/** Competence: a tick drawn with confidence inside a badge */
export function DoodleCompetence({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path {...pen} d="M24.2 6.8 C 30 9.4, 35.4 10.2, 39.6 10.6 C 40.4 22.8, 35.6 34.8, 24 41.4 C 12.6 34.6, 7.6 22.6, 8.4 10.4 C 13.4 10.1, 18.6 9.2, 24.2 6.8 Z" />
      <path {...pen} className="text-[var(--text-primary)]" stroke="currentColor" d="M16.4 24.6 C 18.8 26.4, 20.6 28.4, 22.2 30.6 C 25.6 24.8, 28.8 20.6, 32.6 17" />
    </svg>
  );
}

/** Tailored, not out of the box: a pencil drawing its own line next to a ruler */
export function DoodleTailored({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path {...pen} d="M30.6 8.6 C 33.2 10.6, 35.6 12.8, 38.2 15.2 L 18.4 35.4 L 10.2 38.2 L 12.6 29.6 Z" />
      <path {...pen} d="M27.4 11.8 C 29.8 13.8, 32.4 16.1, 34.8 18.4" />
      <path {...pen} className="text-[var(--text-primary)]" stroke="currentColor" d="M8.6 43.2 C 14 41.6, 18.4 43.6, 23.2 42.2 S 32.6 40.4, 39.4 42.6" />
    </svg>
  );
}
