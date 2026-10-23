"use client";

import Link from "next/link";
import { team, doctorById } from "@/data/team";
import { useClinicNow } from "@/hooks/useClinicNow";
import { useLocalBookings } from "@/hooks/useLocalBookings";
import { getNextOpenSlots } from "@/lib/slots";
import { formatTime, relativeDayLabel } from "@/lib/time";

/** The soonest free appointment (across the team, or for one dentist), one tap from a pre-filled booking. */
export function NextSlotCard({ doctorId }: { doctorId?: string }) {
  const now = useClinicNow();
  const local = useLocalBookings();

  const next = now
    ? (doctorById(doctorId) ? [doctorById(doctorId)!] : team)
        .map((d) => ({ d, slot: getNextOpenSlots(now, local, 1, d.id)[0] }))
        .filter((x) => x.slot)
        .sort((a, b) => `${a.slot.date}${a.slot.time}`.localeCompare(`${b.slot.date}${b.slot.time}`))[0]
    : undefined;

  return (
    <div className="rounded-[1.4rem] border border-line bg-surface/95 p-5 shadow-panel backdrop-blur">
      <p className="text-[0.8rem] text-muted">Next free appointment</p>
      {next && now ? (
        <Link
          href={`/contact?doctor=${next.d.id}&date=${next.slot.date}&time=${next.slot.time}#book`}
          className="group mt-3 flex items-center gap-3.5"
        >
          <img src={next.d.photo} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover" />
          <span className="min-w-0 flex-1">
            <span className="block font-display text-[1.45rem] leading-tight text-ink">
              {relativeDayLabel(next.slot.date, now.iso)}, {formatTime(next.slot.time)}
            </span>
            <span className="block truncate text-sm text-muted">with {next.d.name}</span>
          </span>
          <span className="rounded-full bg-brand px-3.5 py-2 text-sm font-semibold text-on-brand transition-transform duration-200 group-hover:translate-x-0.5">Take it</span>
        </Link>
      ) : (
        <div className="mt-3 h-14 animate-pulse rounded-xl bg-mint" aria-hidden="true" />
      )}
    </div>
  );
}
