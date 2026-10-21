import { cn } from "@/lib/cn";
import { LogoMark } from "./LogoMark";

/** Two-line wordmark, as on the clinic's signage. */
export function Wordmark({ className, size = "sm" }: { className?: string; size?: "sm" | "lg" }) {
  const lg = size === "lg";
  return (
    <span className={cn("inline-flex flex-col leading-none", className)} aria-label="Comprehensive Dental and Implant Centre">
      <span aria-hidden="true" className={cn("font-display font-semibold tracking-[-0.02em] text-ink", lg ? "text-[clamp(2rem,1.2rem+3.4vw,3.4rem)]" : "text-[1.02rem]")}>
        Comprehensive Dental
      </span>
      <span aria-hidden="true" className={cn("font-semibold uppercase text-brand", lg ? "mt-2 text-[clamp(0.85rem,0.6rem+0.9vw,1.1rem)] tracking-[0.22em]" : "mt-1 text-[0.58rem] tracking-[0.2em]")}>
        &amp; Implant Centre
      </span>
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex min-w-0 items-center gap-2.5", className)}>
      <LogoMark className="h-10 w-auto shrink-0" />
      {/* Below 380px the badge carries the brand on its own; the wordmark would
          push the phone and menu buttons off-screen. */}
      <Wordmark className="hidden min-[380px]:flex" />
    </span>
  );
}
