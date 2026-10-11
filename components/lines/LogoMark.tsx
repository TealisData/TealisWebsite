/** The Tealis mark without the wordmark: the roof (development) over the open book (training).
 *  Roof uses the Teach-line blue, the book takes currentColor so it follows the theme. */
export default function LogoMark({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="104 40 192 86" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <path
        d="M 134,70 L 191,30 Q 200,25 209,30 L 266,70 L 252,70 L 212,52 Q 200,47 188,52 L 148,70 Z"
        transform="translate(0, 14)"
        fill="var(--color-brand)"
      />
      <path
        d="M 124,98 L 194,98 Q 198,98 199,103 L 200,110 L 201,103 Q 202,98 206,98 L 276,98 L 292,110 L 222,110 Q 212,110 208,114 Q 200,122 192,114 Q 188,110 178,110 L 108,110 Z"
        fill="currentColor"
      />
    </svg>
  );
}
