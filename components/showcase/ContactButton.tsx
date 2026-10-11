"use client";

/** Opens the global ContactDrawer. "outline" is the default secondary action; "solid" is reserved
 *  for views where writing to us is the primary action (one filled control per view). */
export default function ContactButton({
  children,
  variant = "outline",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "outline" | "solid";
  className?: string;
}) {
  const style =
    variant === "solid"
      ? "bg-[var(--color-dark)] text-[var(--bg-primary)] border-[var(--color-dark)] hover:opacity-85"
      : "border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)]";
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("tealis:open-contact"))}
      className={`px-5 py-2.5 text-sm font-semibold rounded-full border-2 transition-colors ${style} ${className}`}
    >
      {children}
    </button>
  );
}
