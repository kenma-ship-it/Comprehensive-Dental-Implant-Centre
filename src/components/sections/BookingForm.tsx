"use client";

import { useEffect, useState } from "react";
import { m } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { clinic, whatsappUrl, telUrl } from "@/data/clinic";
import { serviceOptions } from "@/data/services";
import { useIstNow } from "@/hooks/useIstNow";
import { useLocalBookings } from "@/hooks/useLocalBookings";
import { clearLocalBookings, submitAppointment, type AppointmentReceipt, type AppointmentRequest } from "@/lib/appointments";
import { cn } from "@/lib/cn";
import { PREFILL_EVENT, type BookingPrefill } from "@/lib/prefill";
import { getBookableDays, getDaySlots, type DayCell, type Slot } from "@/lib/slots";
import { formatDateLong, formatTime, weekdayShort, monthLabel } from "@/lib/time";
import { validateName, validatePhone, formatPhone, type FieldResult } from "@/lib/validation";

export function BookingForm() {
  const now = useIstNow();
  const local = useLocalBookings();

  const [serviceId, setServiceId] = useState("not-sure");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<AppointmentReceipt | null>(null);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<BookingPrefill>).detail ?? {};
      if (detail.serviceId) setServiceId(detail.serviceId);
      if (detail.date) setSelectedDate(detail.date);
      if (detail.time) setSelectedTime(detail.time);
      setReceipt(null);
      setSubmitError("");
    };
    window.addEventListener(PREFILL_EVENT, handler);
    return () => window.removeEventListener(PREFILL_EVENT, handler);
  }, []);

  const days: DayCell[] = now ? getBookableDays(now) : [];
  // Until the visitor picks a day, show the first day with open slots
  const activeDate = selectedDate ?? days.find((d) => d.status === "open")?.iso ?? null;
  const slots: Slot[] = now && activeDate ? getDaySlots(activeDate, now, local) : [];
  const serviceName = serviceOptions.find((s) => s.id === serviceId)?.name ?? "Not sure yet";
  // The clinic runs one continuous session, so slots are grouped by clock half
  const mornSlots = slots.filter((s) => Number(s.time.slice(0, 2)) < 13);
  const eveSlots = slots.filter((s) => Number(s.time.slice(0, 2)) >= 13);


  const handleSubmit = async () => {
    const n = validateName(name);
    const p = validatePhone(phone);
    setNameErr(n.ok ? "" : (n as Extract<FieldResult, { ok: false }>).message);
    setPhoneErr(p.ok ? "" : (p as Extract<FieldResult, { ok: false }>).message);
    if (!n.ok || !p.ok || !activeDate || !selectedTime) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const req: AppointmentRequest = {
        serviceId, serviceName, date: activeDate, time: selectedTime,
        name: n.value, phone: p.value, note: note.trim() || undefined,
      };
      const result = await submitAppointment(req);
      setReceipt(result);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
    } finally { setSubmitting(false); }
  };

  const waMsg = receipt
    ? `Hi, I'd like to book an appointment.\n\nService: ${receipt.request.serviceName}\nDate: ${formatDateLong(receipt.request.date)}\nTime: ${formatTime(receipt.request.time)}\nName: ${receipt.request.name}\nPhone: ${formatPhone(receipt.request.phone)}${receipt.request.note ? `\nNote: ${receipt.request.note}` : ""}\n\n(Ref: ${receipt.reference})`
    : `Hi, I'd like to book an appointment at ${clinic.name}.`;

  const resetDemo = () => {
    clearLocalBookings(); setReceipt(null); setSelectedDate(null); setSelectedTime(null);
    setServiceId("not-sure"); setName(""); setPhone(""); setNote("");
  };

  if (!now) {
    return (
      <section id="book" aria-labelledby="book-title" className="section-pad border-t border-line-soft">
        <div className="wrap"><p className="text-muted">Loading booking form…</p></div>
      </section>
    );
  }

  if (receipt) {
    return (
      <section id="book" aria-labelledby="book-title" className="section-pad border-t border-line-soft">
        <div className="wrap">
          <div className="mx-auto max-w-[44rem] rounded-2xl border border-line bg-surface p-8 shadow-lift sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-line-soft">
              <Icon name="check" className="h-7 w-7 text-accent" />
            </div>
            <h3 className="h-card mt-5">Request noted</h3>
            <p className="mt-3 max-w-[28rem] text-muted">
              This is a demo booking: nothing has been sent yet. Once the clinic&apos;s booking system is connected, requests will go straight to the front desk.
            </p>
            <dl className="mt-6 grid gap-3 text-sm">
              <div className="flex gap-2"><dt className="font-semibold">Service:</dt><dd className="text-muted">{receipt.request.serviceName}</dd></div>
              <div className="flex gap-2"><dt className="font-semibold">Date:</dt><dd className="text-muted">{formatDateLong(receipt.request.date)}</dd></div>
              <div className="flex gap-2"><dt className="font-semibold">Time:</dt><dd className="text-muted">{formatTime(receipt.request.time)}</dd></div>
              <div className="flex gap-2"><dt className="font-semibold">Name:</dt><dd className="text-muted">{receipt.request.name}</dd></div>
              <div className="flex gap-2"><dt className="font-semibold">Ref:</dt><dd className="text-muted">{receipt.reference}</dd></div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              {whatsappUrl(waMsg) && <Button href={whatsappUrl(waMsg)!} icon="whatsapp">Send on WhatsApp</Button>}
              <Button variant="quiet" onClick={resetDemo}>New booking</Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Week view: show 7 days at a time starting from first available
  const visibleDays = days.slice(0, 7);

  return (
    <section id="book" aria-labelledby="book-title" className="section-pad border-t border-line-soft">
      <div className="wrap">
        <div className="mx-auto max-w-[66rem]">
          <div className="text-center">
            <h2 id="book-title" className="h-section">Book an appointment.</h2>
            <p className="lede mx-auto mt-4">
              Pick a day and time. The clinic will call to confirm. The clinic is closed on Sundays.
            </p>
          </div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface shadow-panel"
          >
            {/* Week strip */}
            <div className="no-scrollbar flex overflow-x-auto border-b border-line">
              {visibleDays.map((d) => {
                const active = d.iso === activeDate;
                const disabled = d.status !== "open";
                return (
                  <button
                    key={d.iso}
                    type="button"
                    disabled={disabled}
                    onClick={() => { setSelectedDate(d.iso); setSelectedTime(null); }}
                    className={cn(
                      "flex min-w-[5.5rem] flex-1 flex-col items-center gap-1 py-4 text-center transition-colors",
                      active && "bg-ink text-paper",
                      !active && !disabled && "text-ink hover:bg-ice",
                      disabled && "cursor-not-allowed text-mist",
                    )}
                  >
                    <span className="text-[0.7rem] font-bold uppercase tracking-wider">
                      {weekdayShort(d.iso)}
                    </span>
                    <span className="text-2xl font-bold leading-tight">{d.day}</span>
                    <span className={cn("text-[0.65rem]", active ? "text-paper/70" : "text-muted")}>
                      {monthLabel(d.iso).split(" ")[0].slice(0, 4)}
                    </span>
                    {d.status === "full" && <span className="mt-0.5 text-[0.62rem] font-bold text-danger">Full</span>}
                    {d.status === "closed" && <span className="mt-0.5 text-[0.62rem] font-semibold">Closed</span>}
                  </button>
                );
              })}
            </div>

            {/* Body: slots left, form right */}
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              {/* Slots */}
              <div className="border-b border-line p-6 lg:border-r lg:border-b-0 lg:p-8">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-sans text-sm font-bold tracking-normal text-ink">Available time slots</h3>
                  {activeDate && (
                    <span className="text-sm font-semibold text-accent">
                      {formatDateLong(activeDate).replace(/,\s\d{4}$/, "")}
                    </span>
                  )}
                </div>

                {[{ label: "Morning", sl: mornSlots }, { label: "Afternoon", sl: eveSlots }].map(({ label, sl }) =>
                  sl.length > 0 ? (
                    <div key={label} className="mt-5">
                      <div className="grid grid-cols-2 gap-2">
                        {sl.map((slot) => {
                          const taken = slot.status === "booked" || slot.status === "past" || slot.status === "requested";
                          const active = slot.time === selectedTime;
                          return (
                            <button
                              key={slot.time}
                              type="button"
                              disabled={taken}
                              onClick={() => setSelectedTime(slot.time)}
                              className={cn(
                                "flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-semibold transition-all",
                                taken && "cursor-not-allowed border-line-soft bg-paper text-mist",
                                active && !taken && "border-ink bg-ink text-paper shadow-sm",
                                !active && !taken && "border-line bg-surface text-ink hover:border-ink-soft",
                              )}
                            >
                              <span>{formatTime(slot.time)}</span>
                              {taken && <span className="text-[0.65rem] uppercase text-mist">Booked</span>}
                              {active && !taken && <span className="text-[0.65rem] uppercase text-paper/75">Selected</span>}
                              {!taken && !active && <span className="text-[0.65rem] uppercase text-accent">Open</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null,
                )}

                <p className="mt-5 flex items-start gap-2 text-[0.8rem] text-muted">
                  <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                  Demo schedule. Slots marked &ldquo;Open&rdquo; can be requested immediately. Final confirmation is sent by the clinic team.
                </p>
              </div>

              {/* Contact form */}
              <div className="p-6 lg:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="book-name" className="text-sm font-semibold text-ink">Full Name *</label>
                    <input
                      id="book-name" type="text" autoComplete="name"
                      value={name} onChange={(e) => { setName(e.target.value); setNameErr(""); }}
                      aria-invalid={!!nameErr} className="field mt-1.5" placeholder="e.g. Rahul Sharma"
                    />
                    {nameErr && <p className="mt-1 text-xs text-danger">{nameErr}</p>}
                  </div>
                  <div>
                    <label htmlFor="book-phone" className="text-sm font-semibold text-ink">Contact Phone *</label>
                    <input
                      id="book-phone" type="tel" inputMode="tel" autoComplete="tel"
                      value={phone} onChange={(e) => { setPhone(e.target.value); setPhoneErr(""); }}
                      aria-invalid={!!phoneErr} className="field mt-1.5" placeholder="10-digit mobile number"
                    />
                    {phoneErr && <p className="mt-1 text-xs text-danger">{phoneErr}</p>}
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="book-service" className="text-sm font-semibold text-ink">Reason for Visit</label>
                  <select
                    id="book-service"
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="field mt-1.5"
                  >
                    {serviceOptions.map((s) => (
                      <option key={s.id} value={s.id}>{s.name === "Not sure yet" ? "General Consultation & Check-up" : s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mt-4">
                  <label htmlFor="book-note" className="text-sm font-semibold text-ink">
                    Additional Clinical Notes <span className="font-normal text-muted">(Optional)</span>
                  </label>
                  <textarea
                    id="book-note" value={note} onChange={(e) => setNote(e.target.value)}
                    className="field mt-1.5" rows={3}
                    placeholder="Any existing dental symptoms or medical history you'd like the dentist to know?"
                  />
                </div>

                {submitError && <p className="mt-3 rounded-md bg-danger-soft p-3 text-sm text-danger">{submitError}</p>}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting || !selectedTime}
                  className={cn(
                    "mt-6 flex w-full items-center justify-center gap-2 rounded-full py-4 text-base font-bold transition-all",
                    !selectedTime
                      ? "cursor-not-allowed border border-line bg-line-soft text-muted"
                      : "bg-ink text-paper hover:bg-ink-soft",
                  )}
                >
                  {submitting ? "Sending…" : selectedTime ? `Request ${formatTime(selectedTime)} appointment` : "Choose a time slot first"}
                  {!submitting && <Icon name="arrow-up-right" className="h-4 w-4" />}
                </button>

                {telUrl && clinic.phone && (

                  <p className="mt-4 text-center text-sm text-muted">

                    Need an urgent appointment? Call 

                    <a href={telUrl} className="font-bold text-ink underline underline-offset-4">{clinic.phone.display}</a>

                  </p>

                )}
              </div>
            </div>
          </m.div>

          {local.length > 0 && (
            <div className="mt-6 text-center">
              <button type="button" onClick={resetDemo} className="text-sm font-semibold text-muted underline underline-offset-4 hover:text-ink">
                Reset demo data ({local.length} {local.length === 1 ? "booking" : "bookings"})
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
