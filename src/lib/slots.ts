import { clinic } from "@/data/clinic";
import { doctorById } from "@/data/team";
import { demo } from "@/data/demo";
import { addDays, fromMinutes, toMinutes, weekdayOf, type ClinicNow } from "./time";

export type SessionId = (typeof clinic.hours.sessions)[number]["id"];
export type SlotStatus = "available" | "booked" | "requested" | "past";

export type Slot = { time: string; session: SessionId; status: SlotStatus };

/** Only slot + service (+ dentist) are stored for demo requests - never a name or phone number. */
export type StoredBooking = { date: string; time: string; serviceId: string; doctorId?: string };

export type DayCell = {
  iso: string;
  day: number;
  weekday: number;
  isToday: boolean;
  /** open = has free slots; closed = clinic closed; full = nothing left to pick */
  status: "open" | "closed" | "full";
};

/* ------------------------------------------------------------------ */
/* Seeded randomness: the same date always gives the same demo slots.   */
/* ------------------------------------------------------------------ */

function fnv1a(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function seeded(input: string): number {
  // mulberry32, one step
  let a = (fnv1a(input) + 0x6d2b79f5) >>> 0;
  a = Math.imul(a ^ (a >>> 15), a | 1);
  a ^= a + Math.imul(a ^ (a >>> 7), a | 61);
  return ((a ^ (a >>> 14)) >>> 0) / 4294967296;
}

/* ------------------------------------------------------------------ */
/* Rules                                                                */
/* ------------------------------------------------------------------ */

export const slotTimes: { time: string; session: SessionId }[] = clinic.hours.sessions.flatMap((s) => {
  const list: { time: string; session: SessionId }[] = [];
  for (let t = toMinutes(s.open); t + clinic.hours.slotMinutes <= toMinutes(s.close); t += clinic.hours.slotMinutes) {
    list.push({ time: fromMinutes(t), session: s.id });
  }
  return list;
});

export const isOpenDay = (iso: string) => clinic.hours.openWeekdays.includes(weekdayOf(iso));

export const isFullyBooked = (iso: string) => demo.fullyBookedDaysOfMonth.includes(Number(iso.slice(8, 10)));

const isDemoBooked = (iso: string, time: string) => seeded(`${iso}T${time}`) < demo.bookedShare;

/** A named dentist only works their clinic days, and has a diary of their own on top of the clinic's. */
const worksOn = (iso: string, doctorId?: string) => !doctorId || (doctorById(doctorId)?.clinicDays.includes(weekdayOf(iso)) ?? true);
const isDoctorBusy = (iso: string, time: string, doctorId?: string) => !!doctorId && seeded(`${iso}T${time}#${doctorId}`) < 0.22;

export function getDaySlots(iso: string, now: ClinicNow, local: StoredBooking[], doctorId?: string): Slot[] {
  if (!isOpenDay(iso) || !worksOn(iso, doctorId)) return [];
  const full = isFullyBooked(iso);
  return slotTimes.map(({ time, session }) => {
    let status: SlotStatus = "available";
    if (iso === now.iso && toMinutes(time) <= now.minutes) status = "past";
    else if (local.some((b) => b.date === iso && b.time === time && (!doctorId || !b.doctorId || b.doctorId === doctorId))) status = "requested";
    else if (full || isDemoBooked(iso, time) || isDoctorBusy(iso, time, doctorId)) status = "booked";
    return { time, session, status };
  });
}

export function getBookableDays(now: ClinicNow, doctorId?: string): DayCell[] {
  return Array.from({ length: demo.bookingWindowDays }, (_, i) => {
    const iso = addDays(now.iso, i);
    const weekday = weekdayOf(iso);
    let status: DayCell["status"] = "open";
    if (!isOpenDay(iso) || !worksOn(iso, doctorId)) status = "closed";
    else if (isFullyBooked(iso)) status = "full";
    else if (iso === now.iso && !getDaySlots(iso, now, [], doctorId).some((s) => s.status === "available")) status = "full";
    return { iso, day: Number(iso.slice(8, 10)), weekday, isToday: iso === now.iso, status };
  });
}

export function getNextOpenSlots(now: ClinicNow, local: StoredBooking[], count: number, doctorId?: string) {
  const found: { date: string; time: string }[] = [];
  for (const cell of getBookableDays(now, doctorId)) {
    if (cell.status !== "open") continue;
    for (const slot of getDaySlots(cell.iso, now, local, doctorId)) {
      if (slot.status === "available") found.push({ date: cell.iso, time: slot.time });
      if (found.length === count) return found;
    }
  }
  return found;
}

/** Is the clinic open right now, and if not, when does it next open? */
export function getClinicStatus(now: ClinicNow):
  | { open: true; closesAt: string }
  | { open: false; opensAt: string; opensDate: string } {
  if (isOpenDay(now.iso)) {
    const sessions = clinic.hours.sessions;
    for (let i = 0; i < sessions.length; i++) {
      const s = sessions[i];
      if (now.minutes >= toMinutes(s.open) && now.minutes < toMinutes(s.close)) {
        // Back-to-back sessions count as one opening (e.g. 10:00-14:00 + 14:00-21:00)
        let closesAt: string = s.close;
        for (let j = i + 1; j < sessions.length && sessions[j].open === closesAt; j++) closesAt = sessions[j].close;
        return { open: true, closesAt };
      }
    }
    const nextToday = clinic.hours.sessions.find((s) => now.minutes < toMinutes(s.open));
    if (nextToday) return { open: false, opensAt: nextToday.open, opensDate: now.iso };
  }
  for (let i = 1; i <= 7; i++) {
    const iso = addDays(now.iso, i);
    if (isOpenDay(iso)) return { open: false, opensAt: clinic.hours.sessions[0].open, opensDate: iso };
  }
  return { open: false, opensAt: clinic.hours.sessions[0].open, opensDate: addDays(now.iso, 1) };
}
