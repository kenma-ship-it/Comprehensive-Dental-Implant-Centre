import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
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
      <Journey />

      <section aria-labelledby="treatments-title" className="border-t border-line-soft bg-mint/50 py-20 lg:py-28">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[36rem]">
              <h2 id="treatments-title" className="h-section">What the clinic treats</h2>
              <p className="lede mt-4">From a routine clean to a full mouth rebuilt in stages.</p>
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
              <h2 id="team-title" className="h-section">Four dentists, four specialties</h2>
              <p className="lede mt-4">
                Surgery and implants, endodontics, orthodontics — you see the dentist whose field your treatment is in.
              </p>
            </div>
            <Link href="/about" className="link">About the clinic</Link>
          </div>
          <TeamGrid className="mt-12" />
        </div>
      </section>

      <Reviews />
      <Cta />
    </>
  );
}
