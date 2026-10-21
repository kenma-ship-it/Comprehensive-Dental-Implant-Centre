import { Button } from "@/components/ui/Button";
import { LazyMount } from "@/components/ui/LazyMount";
import { clinic, mailUrl, telUrl } from "@/data/clinic";

export function Location() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="border-t border-line-soft py-20 lg:py-28">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <div className="min-w-0">
          <h2 id="visit-title" className="h-section">Find the clinic</h2>
          <address className="mt-6 not-italic text-[1.12rem] leading-relaxed text-ink">
            {clinic.address.line1}
            <br />
            {clinic.address.line2}
            <br />
            {clinic.address.city} {clinic.address.postalCode}
          </address>

          <table className="mt-8 w-full border-t border-line text-left">
            <caption className="sr-only">Clinic timings</caption>
            <tbody className="tabular-nums">
              <tr className="border-b border-line">
                <th scope="row" className="py-3.5 pr-4 font-medium text-muted">{clinic.hours.displayDays}</th>
                <td className="py-3.5 text-right font-semibold text-ink">{clinic.hours.displayTime}</td>
              </tr>
              <tr className="border-b border-line">
                <th scope="row" className="py-3.5 pr-4 font-medium text-muted">{clinic.hours.closedDay}</th>
                <td className="py-3.5 text-right font-semibold text-ink">Closed</td>
              </tr>
            </tbody>
          </table>

          <ul className="mt-7 grid gap-2.5 text-[1.02rem]">
            <li><a href={telUrl} className="link">{clinic.phone.display}</a></li>
            {clinic.mobiles.map((m) => (
              <li key={m.tel}><a href={`tel:${m.tel}`} className="link">{m.display}</a></li>
            ))}
            {mailUrl && clinic.email && <li><a href={mailUrl} className="link break-all">{clinic.email}</a></li>}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={clinic.maps.directionsUrl} icon="navigation">Get directions</Button>
            <Button href={telUrl} variant="quiet" icon="phone">Call the clinic</Button>
          </div>
        </div>

        <LazyMount minHeight={400} className="min-w-0 overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
          <iframe
            title={`Map showing ${clinic.name}, Cornwell Road, Bangalore`}
            src={clinic.maps.embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[26rem] w-full border-0"
          />
        </LazyMount>
      </div>
    </section>
  );
}
