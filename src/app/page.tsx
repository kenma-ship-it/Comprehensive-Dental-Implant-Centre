import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { ClinicFacts } from "@/components/sections/ClinicFacts";
import { Journey } from "@/components/sections/Journey";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { Reviews } from "@/components/sections/Reviews";
import { Cta } from "@/components/sections/Cta";
import { Button } from "@/components/ui/Button";
import { featuredServices } from "@/data/services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClinicFacts />
      <Journey />

      <section aria-labelledby="treatments-title" className="border-t border-line-soft bg-mint/50 py-20 lg:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[36rem]">
              <h2 id="treatments-title" className="h-section">Treatments</h2>
              <p className="lede mt-4">From a six-monthly clean to a full mouth rebuilt in stages, each led by the specialist for it.</p>
            </div>
            <Button href="/services" variant="quiet" iconAfter="arrow-right">All treatments</Button>
          </div>
          <ServiceGrid items={featuredServices} className="mt-12 lg:grid-cols-3" />
        </div>
      </section>

      <section aria-labelledby="team-title" className="py-20 lg:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[36rem]">
              <h2 id="team-title" className="h-section">Your dentists</h2>
              <p className="lede mt-4">
                Trained in New York, London, Toronto and Boston. You see the specialist whose field your treatment is in.
              </p>
            </div>
            <Link href="/dentists" className="link">All dentists</Link>
          </div>
          <TeamGrid className="mt-12" />
        </div>
      </section>

      <Reviews />
      <Cta />
    </>
  );
}
