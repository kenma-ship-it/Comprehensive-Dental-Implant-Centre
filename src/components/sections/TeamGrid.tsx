import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { team } from "@/data/team";
import { cn } from "@/lib/cn";

/** Portrait cards; each opens the dentist's profile. */
export function TeamGrid({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {team.map((d) => (
        <li key={d.id} className="min-w-0">
          <Link href={`/dentists/${d.id}`} className="group block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-mint">
              <img
                src={d.photo}
                alt={`Portrait of ${d.name}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
              />
              {d.lead && <span className="absolute top-4 left-4 rounded-full bg-surface/90 px-3 py-1 text-[0.75rem] font-semibold text-ink backdrop-blur">Founder</span>}
            </div>
            <h3 className="mt-5 text-[1.5rem] leading-tight text-ink">{d.name}</h3>
            <p className="mt-1 text-[0.95rem] text-brand">{d.title}</p>
            <p className="mt-2 text-[0.92rem] text-muted">{d.focus}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-ink">
              Profile and education <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
