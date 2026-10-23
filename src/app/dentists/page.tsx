import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { Cta } from "@/components/sections/Cta";

export const metadata: Metadata = {
  title: "Our dentists",
  description:
    "Four specialist dentists at Comprehensive Dental & Implant Centre, Bangalore: oral surgery and implants, root canals, and orthodontics. See each dentist's education, specialties and treatments.",
  alternates: { canonical: "/dentists" },
};

export default function DentistsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dentists"
        title="Four dentists, each with a specialty."
        lede="Your treatment goes to the dentist whose specialty it falls in. Open a profile to see their education, where they work and what they treat."
      />
      <section aria-label="Dentists" className="py-16 lg:py-24">
        <div className="wrap">
          <TeamGrid />
        </div>
      </section>
      <Cta title="Not sure who to see?" body="Book a consultation and the clinic will tell you which dentist you are seeing and why." />
    </>
  );
}
