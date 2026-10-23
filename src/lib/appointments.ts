import type { StoredBooking } from "./slots";

/**
 * DEMO appointment layer.
 *
 * Right now a "booking" only marks the slot as requested in this browser's localStorage
 * so the demo calendar reacts. No personal details are stored and nothing is sent anywhere.
 *
 * To go live, replace the body of `submitAppointment` with a call to your API route, e.g.
 *
 *   const res = await fetch("/api/appointments", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(request),
 *   });
 *   if (!res.ok) throw new Error("Could not send the request");
 *   return res.json();
 *
 * The rest of the UI (validation, confirmation panel, WhatsApp hand-off) needs no change.
 */

export type AppointmentRequest = {
  serviceId: string;
  serviceName: string;
  /** YYYY-MM-DD */
  date: string;
  /** HH:mm, 24-hour */
  time: string;
  /** Chosen dentist, or "any" for the first available */
  doctorId: string;
  doctorName: string;
  name: string;
  /** + and digits, with country code */
  phone: string;
  note?: string;
};

export type AppointmentReceipt = {
  reference: string;
  createdAt: string;
  request: AppointmentRequest;
};

const STORAGE_KEY = "pearlstone.bookings.v1";
export const BOOKINGS_EVENT = "cdic:bookings";

export function readLocalBookings(): StoredBooking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (b): b is StoredBooking =>
        typeof b === "object" && b !== null && typeof b.date === "string" && typeof b.time === "string" && typeof b.serviceId === "string",
    );
  } catch {
    return [];
  }
}

function writeLocalBookings(list: StoredBooking[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* storage can be blocked (private mode); the demo still works for this page view */
  }
  window.dispatchEvent(new Event(BOOKINGS_EVENT));
}

export function clearLocalBookings() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(BOOKINGS_EVENT));
}

export async function submitAppointment(request: AppointmentRequest): Promise<AppointmentReceipt> {
  await new Promise((resolve) => setTimeout(resolve, 650)); // pretend network round trip

  const existing = readLocalBookings();
  if (existing.some((b) => b.date === request.date && b.time === request.time && (request.doctorId === "any" || !b.doctorId || b.doctorId === request.doctorId))) {
    throw new Error("That slot was just taken. Please pick another time.");
  }
  writeLocalBookings([...existing, { date: request.date, time: request.time, serviceId: request.serviceId, doctorId: request.doctorId }]);

  return {
    reference: `PS-${Date.now().toString(36).toUpperCase().slice(-6)}`,
    createdAt: new Date().toISOString(),
    request,
  };
}
