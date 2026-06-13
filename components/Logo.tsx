"use client";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  variant?: "default" | "white";
}

export default function Logo({ className = "", width = 140, height = 74, variant = "default" }: LogoProps) {
  const textColor = variant === "white" ? "#FFFFFF" : "#22252A";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 210"
      width={width}
      height={height}
      className={className}
      aria-label="Tealis logo"
    >
      <g>
        <path
          d="M 134,70 L 191,30 Q 200,25 209,30 L 266,70 L 252,70 L 212,52 Q 200,47 188,52 L 148,70 Z"
          fill="#4A86E8"
          transform="translate(0, 14)"
        />
        <path
          d="M 124,98 L 194,98 Q 198,98 199,103 L 200,110 L 201,103 Q 202,98 206,98 L 276,98 L 292,110 L 222,110 Q 212,110 208,114 Q 200,122 192,114 Q 188,110 178,110 L 108,110 Z"
          fill={textColor}
        />
        <text
          x="108"
          y="155"
          fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
          fontSize="19"
          fontWeight="bold"
          fill={textColor}
          textLength="184"
          lengthAdjust="spacing"
        >
          TEALIS
        </text>
      </g>
    </svg>
  );
}
