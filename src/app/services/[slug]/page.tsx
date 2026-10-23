import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/sections/PageHeader";
import { Cta } from "@/components/sections/Cta";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/data/services";
import { team } from "@/data/team";
import { clinic, SITE_URL } from "@/data/clinic";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} in Bangalore`,
    description: `${service.summary} At Comprehensive Dental & Implant Centre, Cornwell Road, Richmond Circle, Bangalore.`,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const dentists = team.filter((d) => d.treatments.includes(service.slug));
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 4);
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.name,
    description: service.summary,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: { "@type": "Dentist", name: clinic.name, url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHeader eyebrow="Treatment" title={service.name} lede={service.summary}>
        <nav aria-label="Breadcrumb" className="mt-7">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <li><Link href="/" className="hover:text-brand">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/services" className="hover:text-brand">Services</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-ink">{service.name}</li>
          </ol>
        </nav>
      </PageHeader>

      <section aria-labelledby="detail-title" className="py-16 lg:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div className="min-w-0">
            <h2 id="detail-title" className="sr-only">About {service.name}</h2>
            {service.image && (
              <div className="mb-8 overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-lift">
                <img
                  src={service.image}
                  alt={`${service.name} procedure at Comprehensive Dental & Implant Centre Bangalore`}
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>
            )}
            <div className="prose-measure grid gap-5 text-[1.06rem] leading-relaxed text-ink-soft">
              {service.body.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </div>

          <aside aria-label="Questions patients ask" className="min-w-0">
            <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:p-8">
              <h2 className="font-display text-[1.3rem] font-semibold text-ink">Before you book</h2>
              <dl className="mt-5 grid gap-5">
                {service.points.map((p) => (
                  <div key={p.q}>
                    <dt className="font-semibold text-ink">{p.q}</dt>
                    <dd className="mt-1.5 text-muted">{p.a}</dd>
                  </div>
                ))}
              </dl>
              {dentists.length > 0 && (
                <p className="mt-6 text-[0.95rem] text-muted">
                  Treated by{" "}
                  {dentists.map((d, i) => (
                    <span key={d.id}>
                      {i > 0 && (i === dentists.length - 1 ? " and " : ", ")}
                      <Link href={`/dentists/${d.id}`} className="link font-semibold text-ink">{d.name}</Link>
                    </span>
                  ))}
                  .
                </p>
              )}
              <Link href="/contact" className="btn btn-primary btn-sm mt-7">
                Book this treatment
                <Icon name="arrow-right" className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="others-title" className="border-t border-line-soft bg-mint/50 py-16 lg:py-20">
        <div className="wrap">
          <h2 id="others-title" className="h-card font-display font-semibold">Other treatments</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 text-sm font-semibold text-ink hover:border-brand hover:text-brand">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Cta />
    </>
  );
}
