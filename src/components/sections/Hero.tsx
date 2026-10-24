import Link from "next/link";
import { asset } from "@/lib/asset";
import BlurText from "@/components/reactbits/BlurText";
import { Button } from "@/components/ui/Button";
import { clinic } from "@/data/clinic";
import { team } from "@/data/team";
import { ClinicStatus } from "./ClinicStatus";
import { NextSlotCard } from "./NextSlotCard";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden pt-10 pb-16 lg:pt-14 lg:pb-24">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <div className="min-w-0">
          <ClinicStatus />
          <h1 id="hero-title" className="mt-7 text-[clamp(2.7rem,1.6rem+4.4vw,5.4rem)] leading-[1.02] tracking-[-0.025em]">
            <BlurText text="See your new smile before a single tooth is touched." animateBy="words" delay={70} direction="bottom" trigger="load" />
          </h1>
          <p className="lede mt-6 max-w-[34rem]">
            Four specialists on {clinic.address.line2}. Every plan starts with a 3D scan, a preview on screen and a written cost, and nothing begins until you say yes.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/contact#book" size="lg" iconAfter="arrow-right">Book an appointment</Button>
            <Button href="/services" size="lg" variant="quiet">Treatments</Button>
          </div>

          <Link href="/dentists" className="group mt-10 inline-flex items-center gap-4">
            <span className="flex -space-x-3">
              {team.map((d) => (
                <img key={d.id} src={d.photo} alt="" className="h-11 w-11 rounded-full border-2 border-paper object-cover transition-transform duration-300 group-hover:-translate-y-0.5" />
              ))}
            </span>
            <span className="text-[0.95rem] leading-snug text-ink-soft">
              <span className="font-semibold text-ink">{clinic.doctor.name}</span> and three specialists
              <span className="block text-muted group-hover:text-brand">Meet the dentists</span>
            </span>
          </Link>
        </div>

        <div className="relative min-w-0">
          <div className="relative ml-auto aspect-[4/5] w-full max-w-[34rem] overflow-hidden rounded-[2.25rem] bg-mint">
            <img src={asset("/images/clinic/suite.jpg")} alt="A treatment suite with a dental chair by the window" className="hero-photo h-full w-full object-cover" fetchPriority="high" />
          </div>
          <div className="absolute -bottom-8 left-0 w-[min(21rem,86%)] sm:-left-6 lg:-left-12">
            <NextSlotCard />
          </div>
        </div>
      </div>
    </section>
  );
}
