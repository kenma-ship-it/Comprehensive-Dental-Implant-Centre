"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { clinic, telUrl } from "@/data/clinic";

/** Fixed bottom bar on phones: Call, Directions, Book. */
export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur-sm lg:hidden">
      <div className="grid h-14 grid-cols-3">
        <a href={telUrl} className="flex flex-col items-center justify-center gap-0.5 text-[0.7rem] font-semibold text-ink">
          <Icon name="phone" className="h-[1.1rem] w-[1.1rem]" />
          Call
        </a>
        <a
          href={clinic.maps.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 text-[0.7rem] font-semibold text-ink"
        >
          <Icon name="navigation" className="h-[1.1rem] w-[1.1rem]" />
          Directions
        </a>
        <Link href="/contact" className="flex flex-col items-center justify-center gap-0.5 bg-brand-strong text-[0.7rem] font-semibold text-on-brand">
          <Icon name="calendar" className="h-[1.1rem] w-[1.1rem]" />
          Book
        </Link>
      </div>
    </div>
  );
}
