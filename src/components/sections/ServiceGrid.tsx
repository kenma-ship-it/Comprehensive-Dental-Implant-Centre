"use client";

import Link from "next/link";
import { m } from "motion/react";
import { Icon } from "@/components/ui/Icon";
import { services, type Service } from "@/data/services";
import { cn } from "@/lib/cn";

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const card = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } } };

export function ServiceGrid({ items = services, className }: { items?: Service[]; className?: string }) {
  return (
    <m.ul variants={grid} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.05 }} className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((s) => (
        <m.li key={s.slug} variants={card} className="min-w-0">
          <Link
            href={`/services/${s.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-all duration-300 hover:border-brand hover:shadow-lift"
          >
            {s.image && (
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-mint/20">
                <img
                  src={s.image}
                  alt={`${s.name} treatment at Comprehensive Dental & Implant Centre Bangalore`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <h3 className="font-display text-[1.25rem] font-semibold leading-tight text-ink transition-colors duration-200 group-hover:text-brand">
                {s.name}
              </h3>
              <p className="mt-2.5 text-[0.97rem] leading-relaxed text-muted">{s.summary}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-brand">
                Read more
                <Icon name="arrow-right" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </m.li>
      ))}
    </m.ul>
  );
}
