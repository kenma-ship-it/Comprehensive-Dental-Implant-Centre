import { cn } from "@/lib/cn";
import { clinic } from "@/data/clinic";
import { LogoMark } from "./LogoMark";

/** Serif wordmark: the clinic name, then "Dental" set in italic. */
export function Wordmark({ className, size = "sm" }: { className?: string; size?: "sm" | "lg" }) {
  const lg = size === "lg";
  const [first, ...rest] = clinic.name.split(" ");
  return (
    <span className={cn("inline-flex items-baseline gap-[0.3em] font-display leading-none text-ink", lg ? "text-[clamp(2rem,1.2rem+3.4vw,3.4rem)]" : "text-[1.42rem]", className)} aria-label={clinic.name}>
      <span aria-hidden="true" className="font-medium tracking-[-0.02em]">{first}</span>
      {rest.length > 0 && <span aria-hidden="true" className="italic text-brand">{rest.join(" ")}</span>}
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex min-w-0 items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-auto shrink-0" />
      <Wordmark className="hidden min-[360px]:inline-flex" />
    </span>
  );
}
