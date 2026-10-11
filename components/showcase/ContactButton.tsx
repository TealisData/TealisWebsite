"use client";

/** CTA that opens the global ContactDrawer. "ink" is the filled primary, "line" the outlined secondary. */
export default function ContactButton({
  children,
  variant = "ink",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "ink" | "line";
  className?: string;
}) {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("tealis:open-contact"))}
      className={`${variant === "ink" ? "btn-ink" : "btn-line"} ${className}`}
    >
      {children}
    </button>
  );
}
