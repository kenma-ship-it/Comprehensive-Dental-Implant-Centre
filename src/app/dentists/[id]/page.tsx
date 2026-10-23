import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cta } from "@/components/sections/Cta";
import { NextSlotCard } from "@/components/sections/NextSlotCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { team, firstName } from "@/data/team";
import { services } from "@/data/services";
import { clinic, SITE_URL, addressOneLine } from "@/data/clinic";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// Week as the clinic runs it: Saturday first
const WEEK_ORDER = [6, 0, 1, 2, 3, 4, 5];

export function generateStaticParams() {
  return team.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const doctor = team.find((d) => d.id === id);
  if (!doctor) return {};
  return {
    title: `${doctor.name}, ${doctor.title}`,
    description: `${doctor.name} (${doctor.credentials.join(", ")}): ${doctor.focus.toLowerCase()}. Education, career and languages, at ${clinic.name}, ${clinic.address.line2}, ${clinic.address.city}.`,
    alternates: { canonical: `/dentists/${doctor.id}` },
  };
}

export default async function DentistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doctor = team.find((d) => d.id === id);
  if (!doctor) notFound();

  const short = firstName(doctor);
  const treats = doctor.treatments.map((slug) => services.find((s) => s.slug === slug)).filter((s) => s !== undefined);
  const others = team.filter((d) => d.id !== doctor.id);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${SITE_URL}/dentists/${doctor.id}`,
    name: doctor.name,
    description: doctor.focus,
    image: `${SITE_URL}${doctor.photo}`,
    url: `${SITE_URL}/dentists/${doctor.id}`,
    telephone: clinic.phone.tel,
    knowsLanguage: doctor.languages,
    hasCredential: doctor.education.map((e) => ({ "@type": "EducationalOccupationalCredential", name: `${e.qualification}, ${e.detail}`, recognizedBy: { "@type": "Organization", name: e.institution } })),
    alumniOf: doctor.education.map((e) => ({ "@type": "EducationalOrganization", name: e.institution })),
    knowsAbout: treats.map((s) => s.name),
    worksFor: { "@type": "Dentist", name: clinic.name, url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="border-b border-line bg-mint/50">
        <div className="wrap grid gap-10 py-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16 lg:py-16">
          <div className="min-w-0 lg:pb-4">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
                <li><Link href="/" className="hover:text-brand">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/dentists" className="hover:text-brand">Dentists</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-ink">{doctor.name}</li>
              </ol>
            </nav>
            <h1 className="h-display mt-6 max-w-[16ch] [overflow-wrap:anywhere]">{doctor.name}</h1>
            <p className="mt-3 font-display text-[1.45rem] italic text-brand">{doctor.title}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Qualifications">
              {doctor.credentials.map((c) => (
                <li key={c} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-ink">{c}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`/contact?doctor=${doctor.id}#book`} iconAfter="arrow-right">Book with {short}</Button>
              <Button href={`tel:${clinic.phone.tel}`} variant="quiet" icon="phone">{clinic.phone.display}</Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-mint">
              <img src={doctor.photo} alt={`Portrait of ${doctor.name}`} className="hero-photo h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 left-4 right-4 sm:left-auto sm:right-[-1rem] sm:w-[20rem]">
              <NextSlotCard doctorId={doctor.id} />
            </div>
          </div>
        </div>
      </header>

      <section aria-labelledby="about-title" className="pt-24 pb-16 lg:pt-28 lg:pb-24">
        <div className="wrap rail">
          <div className="rail-head">
            <h2 id="about-title" className="h-section">About {short}</h2>
            <p className="mt-4 text-muted">{doctor.focus}</p>
          </div>
          <div>
            <div className="prose-measure grid gap-5 text-[1.08rem] leading-relaxed text-ink-soft">
              {doctor.bio.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <dl className="mt-10 grid max-w-[38rem] gap-6 border-t border-line pt-8 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-muted">Languages</dt>
                <dd className="mt-1 text-ink">{doctor.languages.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Sees patients on</dt>
                <dd className="mt-1 text-ink">{WEEK_ORDER.filter((d) => doctor.clinicDays.includes(d)).map((d) => DAY_NAMES[d].slice(0, 3)).join(", ")}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="edu-title" className="border-t border-line-soft py-16 lg:py-24">
        <div className="wrap rail">
          <div className="rail-head">
            <h2 id="edu-title" className="h-section">Education</h2>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line">
            {doctor.education.map((e) => (
              <li key={e.qualification + e.year} className="grid gap-2 bg-surface p-6 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-6 sm:p-7">
                <p className="font-display text-[1.7rem] leading-none text-brand tabular-nums">{e.year}</p>
                <div>
                  <p className="text-[1.1rem] font-semibold text-ink">{e.detail}</p>
                  <p className="mt-1 text-muted">{e.institution}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="work-title" className="border-t border-line-soft bg-night py-16 text-on-night lg:py-24 on-dark">
        <div className="wrap rail">
          <div className="rail-head">
            <h2 id="work-title" className="h-section text-on-night">Career</h2>
            <p className="mt-4 text-on-night-muted">Where {short} has practised.</p>
          </div>
          <ol className="relative grid gap-10 border-l border-on-night/20 pl-8">
            {doctor.practice.map((p) => (
              <li key={p.place} className="relative">
                <span aria-hidden="true" className={`absolute -left-[2.38rem] top-1.5 h-3 w-3 rounded-full ${p.here ? "bg-[var(--color-flag)] ring-4 ring-[var(--color-flag)]/25" : "bg-on-night/50"}`} />
                <p className="text-sm text-on-night-muted tabular-nums">{p.years}</p>
                <p className="mt-1 font-display text-[1.55rem] leading-tight text-on-night">{p.place}</p>
                <p className="mt-1 text-on-night-muted">{p.role}</p>
                {p.here && (
                  <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-on-night-muted">
                    <span>{addressOneLine}</span>
                    <a href={clinic.maps.directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-on-night underline underline-offset-4">
                      Directions <Icon name="arrow-up-right" className="h-3.5 w-3.5" />
                    </a>
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="treat-title" className="py-16 lg:py-24">
        <div className="wrap rail">
          <div className="rail-head">
            <h2 id="treat-title" className="h-section">Treatments</h2>
            <p className="mt-4 text-muted">What you would see {short} for.</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {treats.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="group flex h-full gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-3 pr-5 transition-colors hover:border-brand">
                  {s.image && <img src={s.image} alt="" loading="lazy" className="h-20 w-24 shrink-0 rounded-xl object-cover" />}
                  <span className="min-w-0 self-center">
                    <span className="block font-semibold text-ink group-hover:text-brand">{s.name}</span>
                    <span className="mt-1 line-clamp-2 block text-sm text-muted">{s.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="others-title" className="border-t border-line-soft py-14">
        <div className="wrap">
          <h2 id="others-title" className="h-card">The rest of the team</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {others.map((d) => (
              <li key={d.id}>
                <Link href={`/dentists/${d.id}`} className="inline-flex min-h-12 items-center gap-3 rounded-full border border-line bg-surface py-1.5 pr-5 pl-1.5 text-sm font-semibold text-ink hover:border-brand hover:text-brand">
                  <img src={d.photo} alt="" className="h-9 w-9 rounded-full object-cover" />
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Cta title={`Book with ${short}.`} body={`Pick a time in ${short}'s diary online, or call ${clinic.phone.display}.`} />
    </>
  );
}
