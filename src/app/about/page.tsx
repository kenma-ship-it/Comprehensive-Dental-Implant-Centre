import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { Cta } from "@/components/sections/Cta";
import { clinic } from "@/data/clinic";

export const metadata: Metadata = {
  title: "About the clinic",
  description:
    `${clinic.name} at ${clinic.address.line1}, ${clinic.address.line2}, ${clinic.address.city}. Four specialist dentists led by ${clinic.doctor.name}, ${clinic.doctor.qualification}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A specialist practice that shows you the plan first."
        lede={`${clinic.name} is a specialist dental practice on level 14 of Al Maryah Tower, overlooking the water in ${clinic.address.city}.`}
      />

      <section aria-labelledby="approach-title" className="py-20 lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
          <figure className="overflow-hidden rounded-[2rem] bg-mint">
            <img src="/images/clinic/room.jpg" alt="A treatment room with a dental chair and a window onto the city" className="aspect-[4/3] w-full object-cover" loading="lazy" />
          </figure>
          <div>
            <h2 id="approach-title" className="h-section">How the clinic works</h2>
            <div className="prose-measure mt-6 grid gap-5 text-[1.06rem] leading-relaxed text-ink-soft">
              <p>
                Dr. Lina Haddad opened Pearlstone in 2017 with one rule: no patient agrees to treatment they have not seen.
                Every plan starts with a 3D scan of your teeth and bite, and a preview of the result on screen.
              </p>
              <p>
                You leave a first consultation with a written plan: each stage, which dentist carries it out, how long it
                takes and what it costs. Nothing starts until you have read it and said yes.
              </p>
              <p>
                Four specialists share the practice, so your treatment goes to the dentist whose field it is in: implants and
                crowns, oral surgery, orthodontics, or root canals. We bill the major insurers directly and speak{" "}
                {clinic.languages.length} languages at the front desk.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="team-title" className="border-t border-line-soft bg-mint/50 py-20 lg:py-28">
        <div className="wrap">
          <h2 id="team-title" className="h-section">The dentists</h2>
          <p className="lede mt-4">Open a profile for education, career, languages and the days each dentist is in.</p>
          <TeamGrid className="mt-12" />
        </div>
      </section>

      <Cta title="Start with a consultation." body="A 3D scan, a look at the options and a written plan, with no obligation to go ahead." />
    </>
  );
}
