"use client";

/** CTA that opens the global ContactDrawer; "inverted" is for use on --bg-feature surfaces */
export default function ContactButton({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "inverted";
  className?: string;
}) {
  const colors =
    variant === "inverted"
      ? "bg-[var(--text-on-feature)] text-[var(--bg-feature)]"
      : "bg-[var(--color-dark)] text-[var(--bg-primary)]";
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("tealis:open-contact"))}
      className={`px-5 py-2.5 text-sm font-semibold rounded-lg hover:opacity-80 transition-opacity ${colors} ${className}`}
    >
      {children}
    </button>
  );
}
