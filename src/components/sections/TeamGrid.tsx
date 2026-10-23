import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { team, initials } from "@/data/team";
import { cn } from "@/lib/cn";

/** Portraits are the clinic's to supply; until then each card carries the dentist's initials. Each card opens the profile. */
export function TeamGrid({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {team.map((d) => (
        <li key={d.id} className="min-w-0">
          <Link
            href={`/dentists/${d.id}`}
            className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 transition-colors hover:border-brand"
          >
            <div className="flex aspect-[4/3] items-center justify-center rounded-[1rem] bg-mint transition-colors group-hover:bg-brand">
              <span aria-hidden="true" className="font-display text-[3.2rem] font-semibold text-brand/70 transition-colors group-hover:text-on-night">
                {initials(d.name)}
              </span>
            </div>
            <h3 className="mt-5 font-display text-[1.2rem] font-semibold leading-tight text-ink">{d.name}</h3>
            {d.lead && <p className="mt-1.5 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-brand">Lead dentist</p>}
            <p className="mt-2 text-[0.92rem] text-muted">{d.focus}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5 text-[0.8rem] text-ink-soft">
              {d.credentials.slice(0, 3).map((c) => (
                <li key={c} className="rounded-full border border-line px-2.5 py-0.5">{c}</li>
              ))}
            </ul>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.92rem] font-semibold text-brand">
              View profile <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
