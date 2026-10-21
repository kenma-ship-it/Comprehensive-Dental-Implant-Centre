import { LogoMark } from "@/components/brand/LogoMark";
import { team } from "@/data/team";
import { cn } from "@/lib/cn";

/** Portraits are the clinic's to supply; until then each card carries the badge. */
export function TeamGrid({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {team.map((d) => (
        <li key={d.id} className="flex min-w-0 flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6">
          <div className="flex aspect-[4/3] items-center justify-center rounded-[1rem] bg-mint">
            <LogoMark className="h-20 w-auto opacity-30" ring={false} />
          </div>
          <h3 className="mt-5 font-display text-[1.2rem] font-semibold leading-tight text-ink">{d.name}</h3>
          {d.lead && <p className="mt-1.5 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-brand">Lead dentist</p>}
          <ul className="mt-3 grid gap-1 text-[0.92rem] text-muted">
            {d.credentials.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
