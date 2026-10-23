import CountUp from "@/components/reactbits/CountUp";
import { clinic } from "@/data/clinic";

/** A quiet band of facts under the hero, with the insurers patients ask about most. */
export function ClinicFacts() {
  return (
    <section aria-label="The clinic in numbers" className="border-y border-line-soft bg-surface">
      <div className="wrap grid gap-8 py-10 md:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.4fr)] md:items-center">
        {clinic.facts.map((f) => (
          <div key={f.label} className="flex items-baseline gap-3 md:block">
            <p className="font-display text-[clamp(2.4rem,1.8rem+2vw,3.4rem)] leading-none text-brand">
              <CountUp to={f.value} duration={1.6} trigger="view" />
              {f.suffix}
            </p>
            <p className="mt-2 max-w-[14rem] text-[0.92rem] text-muted">{f.label}</p>
          </div>
        ))}
        <div className="border-t border-line-soft pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
          <p className="text-[0.92rem] text-muted">Direct billing with</p>
          <p className="mt-2 text-[1.05rem] leading-relaxed text-ink">{clinic.insurers.join("  ·  ")}</p>
        </div>
      </div>
    </section>
  );
}
