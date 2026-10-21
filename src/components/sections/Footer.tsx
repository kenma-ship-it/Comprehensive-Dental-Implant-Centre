import Link from "next/link";
import { LogoMark } from "@/components/brand/LogoMark";
import { Wordmark } from "@/components/brand/Logo";
import { clinic, addressOneLine, mailUrl, telUrl } from "@/data/clinic";
import { services } from "@/data/services";

const year = new Date().getFullYear();

/** Ft1 mast-headed: the badge and name lead, then the practical detail. */
export function Footer() {
  return (
    <footer className="border-t border-line bg-mint/60">
      <div className="wrap py-16">
        <div className="flex flex-col items-start gap-6 border-b border-line pb-10 sm:flex-row sm:items-center">
          <LogoMark className="h-20 w-auto shrink-0" />
          <div>
            <Wordmark />
            <p className="mt-3 max-w-[32rem] text-muted">{clinic.tagline}</p>
          </div>
        </div>

        <div className="grid gap-10 pt-10 md:grid-cols-4">
          <div>
            <h2 className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-muted">Visit</h2>
            <address className="mt-3 not-italic leading-relaxed text-ink">{addressOneLine}</address>
            <a href={clinic.maps.directionsUrl} target="_blank" rel="noopener noreferrer" className="link mt-3 inline-block text-[0.95rem]">
              Get directions
            </a>
          </div>
          <div>
            <h2 className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-muted">Hours</h2>
            <p className="mt-3 leading-relaxed text-ink">
              {clinic.hours.displayDays}
              <br />
              {clinic.hours.displayTime}
              <br />
              <span className="text-muted">{clinic.hours.closedDay}: closed</span>
            </p>
          </div>
          <div>
            <h2 className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-muted">Contact</h2>
            <ul className="mt-3 grid gap-2">
              <li>
                <a href={telUrl} className="link">{clinic.phone.display}</a>
              </li>
              {clinic.mobiles.map((m) => (
                <li key={m.tel}>
                  <a href={`tel:${m.tel}`} className="link">{m.display}</a>
                </li>
              ))}
              {mailUrl && clinic.email && (
                <li>
                  <a href={mailUrl} className="link break-all">{clinic.email}</a>
                </li>
              )}
            </ul>
          </div>
          <nav aria-label="Treatments">
            <h2 className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-muted">Treatments</h2>
            <ul className="mt-3 grid gap-1.5">
              {services.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="inline-flex min-h-9 items-center text-[0.95rem] text-ink-soft hover:text-brand">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="inline-flex min-h-9 items-center text-[0.95rem] font-semibold text-brand">
                  All treatments
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-12 border-t border-line pt-7 text-[0.85rem] text-muted">
          © {year} {clinic.name} · {clinic.address.city}
        </p>
      </div>
    </footer>
  );
}
