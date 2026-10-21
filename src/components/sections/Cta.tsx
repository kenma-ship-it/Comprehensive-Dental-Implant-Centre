import { Button } from "@/components/ui/Button";
import { clinic, telUrl } from "@/data/clinic";

export function Cta({ title = "Book a consultation.", body }: { title?: string; body?: string }) {
  return (
    <section aria-labelledby="cta-title" className="py-16 lg:py-20">
      <div className="wrap">
        <div className="on-dark grid gap-8 rounded-[var(--radius-card)] bg-night p-8 text-on-night sm:p-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <h2 id="cta-title" className="h-section max-w-[28rem] text-on-night">{title}</h2>
            <p className="mt-4 max-w-[34rem] text-on-night-muted">
              {body ?? `Call ${clinic.phone.display} or send an appointment enquiry, and the clinic will confirm a time with you.`}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact" size="lg" variant="light" iconAfter="arrow-right">Book an appointment</Button>
            <Button href={telUrl} size="lg" variant="quiet" icon="phone">Call</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
