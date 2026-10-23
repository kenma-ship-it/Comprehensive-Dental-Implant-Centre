import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { Cta } from "@/components/sections/Cta";

export const metadata: Metadata = {
  title: "Dental treatments",
  description:
    "Dental implants, full mouth rehabilitation, root canal treatment, crowns and bridges, braces and clear aligners, laser dentistry, gum treatment and children's dentistry on Al Maryah Island, Abu Dhabi.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Every treatment, under one roof."
        lede="Each one starts with an examination. Open a treatment to see what it involves and who carries it out."
      />
      <section aria-label="All treatments" className="py-16 lg:py-24">
        <div className="wrap">
          <ServiceGrid />
        </div>
      </section>
      <Cta title="Not sure which one you need?" body="Book a consultation and the clinic will tell you — including when the answer is that nothing is needed yet." />
    </>
  );
}
