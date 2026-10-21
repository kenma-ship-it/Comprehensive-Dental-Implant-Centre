"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { clinic, telUrl } from "@/data/clinic";
import { useModalBehaviour } from "@/hooks/useDisclosure";
import { cn } from "@/lib/cn";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const sheetTransition = { duration: 0.26, ease: [0.22, 1, 0.36, 1] as const };

/** N1b: wordmark left, destinations centre, phone + action right. */
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useModalBehaviour(open, sheetRef, close);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-paper/92 backdrop-blur-md">
        <div className="wrap flex h-[4.5rem] items-center justify-between gap-4">
          <Link href="/" aria-label={`${clinic.name}, home`} className="min-w-0 rounded-md">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={cn(
                      "whitespace-nowrap py-2 text-[0.95rem] font-medium transition-colors hover:text-brand",
                      isActive(l.href) ? "text-brand" : "text-ink-soft",
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <Button href={telUrl} size="sm" className="hidden sm:inline-flex" icon="phone">
              {clinic.phone.display}
            </Button>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-[0.92rem] font-semibold text-ink lg:hidden"
            >
              <Icon name="menu" className="h-5 w-5" />
              Menu
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            key="mobile-menu"
            id="mobile-menu"
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={sheetTransition}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-paper"
          >
            <div className="wrap flex h-[4.5rem] shrink-0 items-center justify-between">
              <Logo />
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button type="button" onClick={close} className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-[0.92rem] font-semibold text-ink">
                  <Icon name="x" className="h-5 w-5" />
                  Close
                </button>
              </div>
            </div>
            <nav aria-label="Mobile" className="wrap flex-1 pt-4">
              <ul className="border-t border-line">
                {links.map((l) => (
                  <li key={l.href} className="border-b border-line">
                    <Link
                      href={l.href}
                      onClick={close}
                      aria-current={isActive(l.href) ? "page" : undefined}
                      className="flex min-h-16 items-center justify-between font-display text-[1.75rem] font-semibold text-ink"
                    >
                      {l.label}
                      <Icon name="arrow-right" className="h-5 w-5 text-muted" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="wrap grid gap-3 pb-10 pt-8">
              <Button href={telUrl} size="lg" icon="phone" className="w-full">
                Call {clinic.phone.display}
              </Button>
              <Button href="/contact" variant="quiet" size="lg" className="w-full">
                Book an appointment
              </Button>
              <p className="mt-2 text-sm text-muted">
                {clinic.hours.displayShort} · {clinic.hours.displayTime} · Closed {clinic.hours.closedDay}s
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
