import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cta } from "@/components/sections/Cta";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { team, initials } from "@/data/team";
import { services } from "@/data/services";
import { clinic, SITE_URL, addressOneLine, telUrl } from "@/data/clinic";

export function generateStaticParams() {
  return team.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const doctor = team.find((d) => d.id === id);
  if (!doctor) return {};
  return {
    title: `${doctor.name}, ${doctor.title}`,
    description: `${doctor.name} (${doctor.credentials.join(", ")}). ${doctor.focus} at ${clinic.name}, ${clinic.address.line1}, ${clinic.address.city}.`,
    alternates: { canonical: `/dentists/${doctor.id}` },
  };
}

export default async function DentistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doctor = team.find((d) => d.id === id);
  if (!doctor) notFound();

  const treats = doctor.treatments.map((slug) => services.find((s) => s.slug === slug)).filter((s) => s !== undefined);
  const others = team.filter((d) => d.id !== doctor.id);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${SITE_URL}/dentists/${doctor.id}`,
    name: doctor.name,
    description: doctor.focus,
    url: `${SITE_URL}/dentists/${doctor.id}`,
    telephone: clinic.phone.tel,
    hasCredential: doctor.credentials.map((c) => ({ "@type": "EducationalOccupationalCredential", name: c })),
    knowsAbout: treats.map((s) => s.name),
    worksFor: { "@type": "Dentist", name: clinic.name, url: SITE_URL },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${clinic.address.line1}, ${clinic.address.line2}`,
      addressLocality: clinic.address.city,
      postalCode: clinic.address.postalCode,
      addressCountry: clinic.address.country,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="border-b border-line bg-mint/50 py-14 lg:py-20">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
                <li><Link href="/" className="hover:text-brand">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/dentists" className="hover:text-brand">Dentists</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-ink">{doctor.name}</li>
              </ol>
            </nav>
            <h1 className="h-display mt-6 max-w-[18ch] [overflow-wrap:anywhere]">{doctor.name}</h1>
            <p className="lede mt-4">{doctor.title}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Credentials">
              {doctor.credentials.map((c) => (
                <li key={c} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-semibold text-ink">{c}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact#book" iconAfter="arrow-right">Book with {doctor.name.split(" ").slice(0, 2).join(" ")}</Button>
              <Button href={telUrl} variant="quiet" icon="phone">{clinic.phone.display}</Button>
            </div>
          </div>
          <div aria-hidden="true" className="relative hidden aspect-square w-64 place-items-center rounded-full border border-line bg-surface lg:grid">
            <span className="font-display text-[5.5rem] font-semibold text-brand">{initials(doctor.name)}</span>
            {doctor.lead && <span className="absolute bottom-6 rounded-full bg-night px-3 py-1 text-xs font-semibold text-on-night">Lead dentist</span>}
          </div>
        </div>
      </header>

      <section aria-labelledby="about-title" className="py-16 lg:py-24">
        <div className="wrap rail">
          <div className="rail-head">
            <h2 id="about-title" className="h-section">About</h2>
            <p className="mt-4 text-muted">{doctor.focus}</p>
          </div>
          <div className="prose-measure grid gap-5 text-[1.06rem] leading-relaxed text-ink-soft">
            {doctor.bio.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="edu-title" className="border-t border-line-soft py-16 lg:py-24">
        <div className="wrap rail">
          <div className="rail-head">
            <h2 id="edu-title" className="h-section">Education</h2>
          </div>
          <ol className="relative grid gap-8 border-l-2 border-line pl-8">
            {doctor.education.map((e) => (
              <li key={e.qualification} className="relative">
                <span aria-hidden="true" className="absolute -left-[2.55rem] top-1 h-4 w-4 rounded-full border-4 border-paper bg-brand" />
                <p className="font-display text-[1.6rem] font-semibold leading-tight text-ink">{e.qualification}</p>
                <p className="mt-1 text-ink-soft">{e.detail}</p>
                {(e.institution || e.year) && (
                  <p className="mt-1 text-sm text-muted">{[e.institution, e.year].filter(Boolean).join(", ")}</p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="work-title" className="border-t border-line-soft bg-mint/50 py-16 lg:py-24">
        <div className="wrap rail">
          <div className="rail-head">
            <h2 id="work-title" className="h-section">Where {doctor.name.split(" ").slice(0, 2).join(" ")} works</h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {doctor.practice.map((p) => (
              <li key={p.place} className="rounded-[var(--radius-card)] border border-line bg-surface p-6">
                <p className="font-display text-[1.3rem] font-semibold leading-tight text-ink">{p.place}</p>
                <p className="mt-2 text-muted">{p.role}</p>
                {p.here && (
                  <div className="mt-5 grid gap-1.5 text-[0.95rem] text-ink-soft">
                    <p>{addressOneLine}</p>
                    <p>{clinic.hours.displayShort}, {clinic.hours.displayTime}</p>
                    <a href={clinic.maps.directionsUrl} target="_blank" rel="noopener noreferrer" className="link mt-2 inline-flex items-center gap-1.5 font-semibold">
                      Get directions <Icon name="arrow-right" className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="treat-title" className="py-16 lg:py-24">
        <div className="wrap rail">
          <div className="rail-head">
            <h2 id="treat-title" className="h-section">Treatments</h2>
            <p className="mt-4 text-muted">What you would see {doctor.name.split(" ").slice(0, 2).join(" ")} for.</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {treats.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-5 transition-colors hover:border-brand">
                  <span className="font-semibold text-ink group-hover:text-brand">{s.name}</span>
                  <span className="mt-1.5 text-sm text-muted">{s.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="others-title" className="border-t border-line-soft py-14">
        <div className="wrap">
          <h2 id="others-title" className="h-card font-display font-semibold">The other dentists</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {others.map((d) => (
              <li key={d.id}>
                <Link href={`/dentists/${d.id}`} className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 text-sm font-semibold text-ink hover:border-brand hover:text-brand">
                  {d.name}, {d.title.split(",")[0].toLowerCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Cta title={`Book with ${doctor.name.split(" ").slice(0, 2).join(" ")}.`} body={`Send an appointment enquiry and mention ${doctor.name}, or call ${clinic.phone.display}. The clinic confirms the time with you.`} />
    </>
  );
}
