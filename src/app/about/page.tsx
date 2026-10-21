import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { Cta } from "@/components/sections/Cta";
import { clinic } from "@/data/clinic";

export const metadata: Metadata = {
  title: "About the clinic",
  description:
    "Comprehensive Dental & Implant Centre at Cornwell Road, Langford Garden, Bangalore. Four specialist dentists led by Dr. Anuradha Navaneetham, MDS, oral and maxillofacial surgeon and implantologist.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A clinic built around explaining the treatment first."
        lede="Comprehensive Dental & Implant Centre is a dental practice at Cornwell Road, Langford Garden, near Richmond Circle in Bangalore."
      />

      <section aria-labelledby="approach-title" className="py-20 lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <h2 id="approach-title" className="h-section lg:sticky lg:top-28 lg:self-start">How the clinic works</h2>
          <div className="prose-measure grid gap-5 text-[1.06rem] leading-relaxed text-ink-soft">
            <p>
              The practice takes a single approach to gentle family dentistry: make the visit as comfortable as it can
              be, and explain the treatment options at every step so you can decide for yourself.
            </p>
            <p>
              Treatment is planned from digital records of your teeth and bite rather than impressions alone — that is
              what &ldquo;{clinic.tagline}&rdquo; means here. It lets the dentist show you what they are looking at, and
              lets you see the plan before any work starts.
            </p>
            <p>
              Because four dentists work at the clinic, your treatment goes to the one whose specialty it falls in:
              surgery and implants, root canals, or orthodontics. You are treated with honesty, compassion and respect
              throughout — and told when a treatment is not needed yet.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="team-title" className="border-t border-line-soft bg-mint/50 py-20 lg:py-28">
        <div className="wrap">
          <h2 id="team-title" className="h-section">The dentists</h2>
          <p className="lede mt-4">Credentials as the clinic lists them.</p>
          <TeamGrid className="mt-12" />
          <p className="mt-8 text-sm text-muted">Portraits of the team are to be supplied by the clinic.</p>
        </div>
      </section>

      <Cta title="Meet the team." body="Book a consultation, and you will be told which dentist you are seeing and why." />
    </>
  );
}
