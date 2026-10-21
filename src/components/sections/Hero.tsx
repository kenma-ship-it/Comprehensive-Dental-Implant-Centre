import Link from "next/link";
import { LogoMarkAnimated } from "@/components/brand/LogoMark";
import { Button } from "@/components/ui/Button";
import { clinic, telUrl } from "@/data/clinic";
import { ClinicStatus } from "./ClinicStatus";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden py-16 lg:py-24">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="min-w-0">
          <ClinicStatus />
          <h1 id="hero-title" className="h-display mt-7 [overflow-wrap:anywhere]">
            Dentistry goes <span className="text-brand">digital</span> in Richmond Circle.
          </h1>
          <p className="lede mt-6">
            Implants, full mouth rehabilitation and everyday dental care at Cornwell Road, Bangalore — planned from
            digital records, carried out by four specialist dentists.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/contact" size="lg" iconAfter="arrow-right">Book an appointment</Button>
            <Button href={telUrl} size="lg" variant="quiet" icon="phone">{clinic.phone.display}</Button>
          </div>
          <p className="mt-7 text-sm text-muted">
            {clinic.hours.displayShort}, {clinic.hours.displayTime} ·{" "}
            <Link href="/contact" className="link">Find the clinic</Link>
          </p>
        </div>

        <div className="relative min-w-0">
          <div aria-hidden="true" className="absolute inset-[14%] rounded-full bg-brand-soft blur-2xl" />
          <LogoMarkAnimated className="relative mx-auto h-auto w-[78%] max-w-[22rem] lg:w-full" />
        </div>
      </div>
    </section>
  );
}
