"use client";

import { useEffect, useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LogoMark } from "@/components/brand/LogoMark";
import { clinic, whatsappUrl, telUrl, addressOneLine } from "@/data/clinic";
import { serviceOptions } from "@/data/services";
import { team, doctorById } from "@/data/team";
import { useClinicNow } from "@/hooks/useClinicNow";
import { useLocalBookings } from "@/hooks/useLocalBookings";
import { submitAppointment, type AppointmentReceipt, type AppointmentRequest } from "@/lib/appointments";
import { cn } from "@/lib/cn";
import { PREFILL_EVENT, type BookingPrefill } from "@/lib/prefill";
import { getBookableDays, getDaySlots, type DayCell, type Slot } from "@/lib/slots";
import { CLINIC_TZ, formatDateLong, formatTime, weekdayShort, monthLabel, relativeDayLabel } from "@/lib/time";
import { validateName, validatePhone, type FieldResult } from "@/lib/validation";

/** ?doctor=&service=&date=&time= lets any page link straight into a pre-filled booking. */
function readUrlPrefill(): BookingPrefill {
  if (typeof window === "undefined") return {};
  const q = new URLSearchParams(window.location.search);
  return {
    doctorId: q.get("doctor") ?? undefined,
    serviceId: q.get("service") ?? undefined,
    date: q.get("date") ?? undefined,
    time: q.get("time") ?? undefined,
  };
}

/** Calendar invite in the clinic's own time zone. */
function icsHref(r: AppointmentReceipt) {
  const stamp = (iso: string, hhmm: string) => `${iso.replace(/-/g, "")}T${hhmm.replace(":", "")}00`;
  const [h, mm] = r.request.time.split(":").map(Number);
  const end = `${String(h + Math.floor((mm + 45) / 60)).padStart(2, "0")}:${String((mm + 45) % 60).padStart(2, "0")}`;
  const body = [
    "BEGIN:VCALENDAR", "VERSION:2.0", `PRODID:-//${clinic.name}//Booking//EN`, "BEGIN:VEVENT",
    `UID:${r.reference}@${clinic.shortName.toLowerCase()}`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
    `DTSTART;TZID=${CLINIC_TZ}:${stamp(r.request.date, r.request.time)}`,
    `DTEND;TZID=${CLINIC_TZ}:${stamp(r.request.date, end)}`,
    `SUMMARY:${r.request.serviceName} at ${clinic.name}`,
    `LOCATION:${addressOneLine}`,
    `DESCRIPTION:Booking ${r.reference} with ${r.request.doctorName}. ${clinic.phone.display}`,
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`;
}

export function BookingForm() {
  const now = useClinicNow();
  const local = useLocalBookings();
  const reduce = useReducedMotion();

  const [initial] = useState(readUrlPrefill);
  const [doctorId, setDoctorId] = useState(doctorById(initial.doctorId) ? initial.doctorId! : "any");
  const [serviceId, setServiceId] = useState(serviceOptions.some((s) => s.id === initial.serviceId) ? initial.serviceId! : "consultation");
  const [selectedDate, setSelectedDate] = useState<string | null>(initial.date ?? null);
  const [selectedTime, setSelectedTime] = useState<string | null>(initial.time ?? null);
  const [week, setWeek] = useState(0);
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
      if (detail.doctorId && doctorById(detail.doctorId)) setDoctorId(detail.doctorId);
      if (detail.date) setSelectedDate(detail.date);
      if (detail.time) setSelectedTime(detail.time);
      setReceipt(null);
      setSubmitError("");
    };
    window.addEventListener(PREFILL_EVENT, handler);
    return () => window.removeEventListener(PREFILL_EVENT, handler);
  }, []);

  const doctor = doctorById(doctorId);
  const docKey = doctor?.id;
  const days: DayCell[] = now ? getBookableDays(now, docKey) : [];
  const pickedDay = selectedDate ? days.find((d) => d.iso === selectedDate && d.status === "open") : undefined;
  // Until the visitor picks a day, show the first day with open slots
  const activeDate = pickedDay?.iso ?? days.find((d) => d.status === "open")?.iso ?? null;
  const slots: Slot[] = now && activeDate ? getDaySlots(activeDate, now, local, docKey) : [];
  const timeOk = !!selectedTime && slots.some((s) => s.time === selectedTime && s.status === "available");
  const serviceName = serviceOptions.find((s) => s.id === serviceId)?.name ?? "Consultation";
  const mornSlots = slots.filter((s) => Number(s.time.slice(0, 2)) < 13);
  const dayslots = slots.filter((s) => Number(s.time.slice(0, 2)) >= 13 && Number(s.time.slice(0, 2)) < 17);
  const eveSlots = slots.filter((s) => Number(s.time.slice(0, 2)) >= 17);
  const weeks = Math.ceil(days.length / 7);
  const visibleDays = days.slice(week * 7, week * 7 + 7);
  const doctorName = doctor?.name ?? "First available dentist";

  const chooseDoctor = (id: string) => { setDoctorId(id); setSelectedTime(null); };

  const handleSubmit = async () => {
    const n = validateName(name);
    const p = validatePhone(phone);
    setNameErr(n.ok ? "" : (n as Extract<FieldResult, { ok: false }>).message);
    setPhoneErr(p.ok ? "" : (p as Extract<FieldResult, { ok: false }>).message);
    if (!n.ok || !p.ok || !activeDate || !selectedTime || !timeOk) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const req: AppointmentRequest = {
        serviceId, serviceName, doctorId, doctorName, date: activeDate, time: selectedTime,
        name: n.value, phone: p.value, note: note.trim() || undefined,
      };
      setReceipt(await submitAppointment(req));
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Try again, or call us.");
    } finally { setSubmitting(false); }
  };

  const newBooking = () => {
    setReceipt(null); setSelectedDate(null); setSelectedTime(null); setNote("");
  };

  if (!now) {
    return (
      <section id="book" aria-labelledby="book-title" className="section-pad border-t border-line-soft">
        <div className="wrap"><p className="text-muted">Loading the booking calendar…</p></div>
      </section>
    );
  }

  if (receipt) {
    const r = receipt.request;
    const doc = doctorById(r.doctorId);
    const waMsg = `Hello ${clinic.name}, I have just booked ${r.serviceName} with ${r.doctorName} on ${formatDateLong(r.date)} at ${formatTime(r.time)}. Reference ${receipt.reference}. Name: ${r.name}.`;
    return (
      <section id="book" aria-labelledby="book-title" className="section-pad border-t border-line-soft">
        <div className="wrap">
          <m.div
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="mx-auto max-w-[46rem] overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-panel"
            role="status"
          >
            <div className="flex items-center gap-5 bg-night p-7 text-on-night sm:p-9">
              {doc ? (
                <img src={doc.photo} alt="" className="h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-on-night/30" />
              ) : (
                <LogoMark className="h-16 w-16 shrink-0 text-on-night" />
              )}
              <div>
                <p className="text-sm text-on-night-muted">Appointment booked</p>
                <h2 id="book-title" className="mt-1 text-[clamp(1.6rem,1.2rem+1.6vw,2.3rem)] text-on-night">
                  See you {r.date === now.iso ? "today" : relativeDayLabel(r.date, now.iso) === "Tomorrow" ? "tomorrow" : `on ${formatDateLong(r.date).split(",")[0]}`}, {r.name.split(" ")[0]}.
                </h2>
              </div>
            </div>
            <dl className="grid gap-px bg-line-soft sm:grid-cols-2">
              {[
                ["Reference", receipt.reference],
                ["Dentist", r.doctorName],
                ["Treatment", r.serviceName],
                ["When", `${formatDateLong(r.date)}, ${formatTime(r.time)}`],
              ].map(([k, v]) => (
                <div key={k} className="bg-surface px-7 py-5">
                  <dt className="text-sm text-muted">{k}</dt>
                  <dd className={cn("mt-1 font-semibold text-ink", k === "Reference" && "font-display text-2xl tracking-wide text-brand")}>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap items-center gap-3 border-t border-line-soft p-7">
              {whatsappUrl(waMsg) && <Button href={whatsappUrl(waMsg)!} icon="whatsapp">Confirm on WhatsApp</Button>}
              <a href={icsHref(receipt)} download={`${receipt.reference}.ics`} className="btn btn-quiet">
                <Icon name="calendar" className="h-[1.1rem] w-[1.1rem]" />
                <span>Add to calendar</span>
              </a>
              <button type="button" onClick={newBooking} className="link ml-auto text-sm">Book another appointment</button>
            </div>
            <p className="px-7 pb-7 text-sm text-muted">
              {addressOneLine}. Arrive ten minutes early for a first visit and bring your insurance card.
            </p>
          </m.div>
        </div>
      </section>
    );
  }

  return (
    <section id="book" aria-labelledby="book-title" className="section-pad border-t border-line-soft">
      <div className="wrap">
        <div className="mx-auto max-w-[68rem]">
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div>
              <h2 id="book-title" className="h-section">Book an appointment</h2>
              <p className="lede mt-3">Choose a dentist, a day and a time. Your booking reference appears straight away.</p>
            </div>
            <p className="text-sm text-muted">{clinic.hours.displayDays}, {clinic.hours.displayTime}</p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-panel">
            {/* Dentist */}
            <fieldset className="border-b border-line p-5 sm:p-7">
              <legend className="float-left mb-4 w-full text-sm font-semibold text-ink">Who would you like to see?</legend>
              <div role="radiogroup" aria-label="Dentist" className="no-scrollbar clear-both flex gap-2.5 overflow-x-auto pb-1">
                {[{ id: "any", name: "First available", sub: "Fastest appointment" }, ...team.map((d) => ({ id: d.id, name: d.name, sub: d.specialty }))].map((opt) => {
                  const d = doctorById(opt.id);
                  const on = doctorId === opt.id;
                  const treats = d && serviceId !== "consultation" && d.treatments.includes(serviceId);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => chooseDoctor(opt.id)}
                      className={cn(
                        "relative flex min-w-[13.5rem] shrink-0 items-center gap-3 rounded-2xl border p-2.5 pr-4 text-left transition-[border-color,background-color,box-shadow] duration-200",
                        on ? "border-brand bg-brand-soft shadow-[0_0_0_1px_var(--color-brand)]" : "border-line hover:border-ink-soft",
                      )}
                    >
                      {d ? (
                        <img src={d.photo} alt="" className="h-12 w-12 shrink-0 rounded-full object-cover" />
                      ) : (
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-mint"><LogoMark className="h-7 w-7" /></span>
                      )}
                      <span className="min-w-0">
                        <span className="block truncate text-[0.95rem] font-semibold text-ink">{opt.name}</span>
                        <span className="block truncate text-[0.8rem] text-muted">{opt.sub}</span>
                      </span>
                      {treats && <span className="absolute -top-2 right-3 rounded-full bg-brand px-2 py-0.5 text-[0.68rem] font-semibold text-on-brand">Treats this</span>}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Week strip */}
            <div className="flex items-stretch border-b border-line">
              <button type="button" onClick={() => setWeek((w) => Math.max(0, w - 1))} disabled={week === 0} aria-label="Previous week" className="grid w-11 shrink-0 place-items-center text-ink disabled:text-line hover:bg-mint/60">
                <Icon name="chevron-left" className="h-4 w-4" />
              </button>
              <div className="no-scrollbar flex flex-1 overflow-x-auto">
                {visibleDays.map((d) => {
                  const active = d.iso === activeDate;
                  const disabled = d.status !== "open";
                  return (
                    <button
                      key={d.iso}
                      type="button"
                      disabled={disabled}
                      aria-pressed={active}
                      aria-label={`${formatDateLong(d.iso)}${d.status === "closed" ? ", not available" : d.status === "full" ? ", fully booked" : ""}`}
                      onClick={() => { setSelectedDate(d.iso); setSelectedTime(null); }}
                      className={cn(
                        "relative flex min-w-[4.9rem] flex-1 flex-col items-center gap-0.5 py-4 text-center transition-colors",
                        active && "bg-ink text-paper",
                        !active && !disabled && "text-ink hover:bg-mint/60",
                        disabled && "cursor-not-allowed text-mist",
                      )}
                    >
                      <span className="text-[0.75rem] font-medium">{d.isToday ? "Today" : weekdayShort(d.iso)}</span>
                      <span className="font-display text-[1.65rem] leading-tight">{d.day}</span>
                      <span className={cn("text-[0.7rem]", active ? "text-paper/70" : "text-muted")}>
                        {d.status === "closed" ? (doctor && !doctor.clinicDays.includes(d.weekday) && clinic.hours.openWeekdays.includes(d.weekday) ? "Off" : "Closed") : d.status === "full" ? "Full" : monthLabel(d.iso).split(" ")[0].slice(0, 3)}
                      </span>
                    </button>
                  );
                })}
              </div>
              <button type="button" onClick={() => setWeek((w) => Math.min(weeks - 1, w + 1))} disabled={week >= weeks - 1} aria-label="Next week" className="grid w-11 shrink-0 place-items-center text-ink disabled:text-line hover:bg-mint/60">
                <Icon name="chevron-right" className="h-4 w-4" />
              </button>
            </div>

            <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
              {/* Slots */}
              <div className="border-b border-line p-5 sm:p-7 lg:border-r lg:border-b-0">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-sans text-sm font-semibold tracking-normal text-ink">
                    {doctor ? `Free times with ${doctor.name.split(" ").slice(0, 2).join(" ")}` : "Free times"}
                  </h3>
                  {activeDate && <span className="text-sm text-brand">{formatDateLong(activeDate).replace(/,?\s\d{4}$/, "")}</span>}
                </div>

                {slots.length === 0 && <p className="mt-6 text-muted">No times left on this day. Pick another day above.</p>}
                {[{ label: "Morning", sl: mornSlots }, { label: "Afternoon", sl: dayslots }, { label: "Evening", sl: eveSlots }].map(({ label, sl }) =>
                  sl.length > 0 ? (
                    <div key={label} className="mt-5">
                      <p className="mb-2 text-[0.8rem] text-muted">{label}</p>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {sl.map((slot) => {
                          const taken = slot.status !== "available";
                          const active = slot.time === selectedTime;
                          return (
                            <button
                              key={slot.time}
                              type="button"
                              disabled={taken}
                              aria-pressed={active}
                              onClick={() => setSelectedTime(slot.time)}
                              className={cn(
                                "rounded-xl border py-2.5 text-[0.9rem] font-medium tabular-nums transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.97]",
                                taken && "cursor-not-allowed border-transparent bg-paper text-mist line-through decoration-mist/60",
                                active && !taken && "border-brand bg-brand text-on-brand",
                                !active && !taken && "border-line bg-surface text-ink hover:border-brand",
                              )}
                            >
                              {formatTime(slot.time).replace(":00", "")}
                              {taken && <span className="sr-only"> (booked)</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null,
                )}
              </div>

              {/* Details */}
              <div className="p-5 sm:p-7">
                <div>
                  <label htmlFor="book-service" className="text-sm font-semibold text-ink">Treatment</label>
                  <select id="book-service" value={serviceId} onChange={(e) => setServiceId(e.target.value)} className="field mt-1.5">
                    {serviceOptions.map((s) => (
                      <option key={s.id} value={s.id}>{s.id === "consultation" ? "Consultation and check-up" : s.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="book-name" className="text-sm font-semibold text-ink">Full name</label>
                    <input
                      id="book-name" type="text" autoComplete="name"
                      value={name} onChange={(e) => { setName(e.target.value); setNameErr(""); }}
                      aria-invalid={!!nameErr} aria-describedby={nameErr ? "book-name-err" : undefined} className="field mt-1.5"
                    />
                    {nameErr && <p id="book-name-err" className="mt-1 text-xs text-danger">{nameErr}</p>}
                  </div>
                  <div>
                    <label htmlFor="book-phone" className="text-sm font-semibold text-ink">Mobile number</label>
                    <input
                      id="book-phone" type="tel" inputMode="tel" autoComplete="tel"
                      value={phone} onChange={(e) => { setPhone(e.target.value); setPhoneErr(""); }}
                      aria-invalid={!!phoneErr} aria-describedby={phoneErr ? "book-phone-err" : undefined} className="field mt-1.5" placeholder="+971 50 123 4567"
                    />
                    {phoneErr && <p id="book-phone-err" className="mt-1 text-xs text-danger">{phoneErr}</p>}
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="book-note" className="text-sm font-semibold text-ink">
                    Anything we should know? <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <textarea
                    id="book-note" value={note} onChange={(e) => setNote(e.target.value)} className="field mt-1.5" rows={3}
                    placeholder="Pain, sensitivity, nervous about treatment, insurance provider…"
                  />
                </div>

                {submitError && <p role="alert" className="mt-3 rounded-md bg-danger-soft p-3 text-sm text-danger">{submitError}</p>}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting || !timeOk}
                  className={cn(
                    "mt-6 flex w-full items-center justify-center gap-2 rounded-full py-4 text-base font-semibold transition-[background-color,transform] duration-150 active:scale-[0.98]",
                    !timeOk ? "cursor-not-allowed border border-line bg-line-soft text-muted" : "bg-ink text-paper hover:bg-brand-strong",
                  )}
                >
                  {submitting ? "Booking…" : timeOk ? `Book ${formatTime(selectedTime!)}${doctor ? ` with ${doctor.name.split(" ").slice(0, 2).join(" ")}` : ""}` : "Choose a time first"}
                </button>
                <p className="mt-4 text-center text-sm text-muted">
                  In pain today? Call <a href={telUrl} className="font-semibold text-ink underline underline-offset-4">{clinic.phone.display}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
