import { cn } from "@/lib/cn";

/**
 * Pearlstone mark: a polished river stone with a pearl resting in its curve.
 * The stone's inner edge doubles as the outline of a molar crown.
 */
export const STONE_PATH =
  "M50 6C74 6 92 21 94 44c2 22-12 44-36 50C33 100 9 87 6 62 3 36 24 6 50 6Z";
export const CROWN_PATH =
  "M32 40c0-7 6-11 11-9 3 1 5 1 8 0 5-2 11 2 11 9 0 6-2 9-3 15-1 7-2 13-5 13s-4-6-5-10c-1-2-3-2-4 0-1 4-2 10-5 10s-4-6-5-13c-1-6-3-9-3-15Z";

export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={cn("text-brand", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <path d={STONE_PATH} fill="currentColor" />
      <path d={CROWN_PATH} fill="none" stroke="var(--color-on-brand)" strokeWidth="3.2" strokeLinejoin="round" opacity="0.92" />
      <circle cx="73" cy="73" r="7.5" fill="var(--color-flag)" stroke="var(--color-on-brand)" strokeWidth="2.4" />
    </svg>
  );
}
