"use client";

import { useId } from "react";
import { m, useReducedMotion } from "motion/react";
import { HEART, LOGO_VIEWBOX, POST, POST_THREADS, TOOTH } from "./logo-geometry";

/** The ring of type that circles the badge, as on the clinic's logo. */
function Ring({ id, show = true }: { id: string; show?: boolean }) {
  return (
    <>
      <defs>
        <path id={`${id}-circle`} d="M100 16 a84 84 0 1 1 -0.1 0" fill="none" />
      </defs>
      <circle cx="100" cy="100" r="92" fill="none" stroke="var(--logo-ring)" strokeWidth="2" />
      <circle cx="100" cy="100" r="78" fill="none" stroke="var(--logo-ring)" strokeWidth="1" opacity="0.6" />
      {show && (
        <text fontSize="13" letterSpacing="2.6" fill="var(--logo-ink)" className="font-sans" fontWeight={600}>
          <textPath href={`#${id}-circle`} startOffset="50%" textAnchor="middle">
            COMPREHENSIVE DENTAL &amp; IMPLANT CENTRE
          </textPath>
        </text>
      )}
    </>
  );
}

function Figure() {
  return (
    <>
      <path d={HEART} fill="none" stroke="var(--logo-brand)" strokeWidth="9" strokeLinecap="round" />
      <path d={TOOTH} fill="var(--logo-tooth)" stroke="var(--logo-ink)" strokeWidth="3.5" strokeLinejoin="round" />
      <path d={POST} fill="var(--logo-ink)" />
      {POST_THREADS.map((y) => (
        <path key={y} d={`M${95.5 + (y - 150) * 0.12} ${y} L${116.5 - (y - 150) * 0.12} ${y + 3}`} stroke="var(--logo-tooth)" strokeWidth="2.6" strokeLinecap="round" />
      ))}
    </>
  );
}

export function LogoMark({ className, title, ring = true }: { className?: string; title?: string; ring?: boolean }) {
  const id = `lm${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} focusable="false">
      <Ring id={id} show={ring} />
      <Figure />
    </svg>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

/** Hero version: the ring settles, the heart draws, the tooth and post rise. */
export function LogoMarkAnimated({ className }: { className?: string }) {
  const id = `la${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const reduce = useReducedMotion();
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} aria-hidden="true" focusable="false">
      <m.g initial={reduce ? false : { opacity: 0, rotate: -14 }} animate={{ opacity: 1, rotate: 0 }} transition={{ duration: 1.1, ease }} style={{ transformOrigin: "100px 100px" }}>
        <Ring id={id} />
      </m.g>
      <m.path
        d={HEART}
        fill="none"
        stroke="var(--logo-brand)"
        strokeWidth="9"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3, duration: 1.1, ease }}
      />
      <m.g initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.7, ease }}>
        <path d={TOOTH} fill="var(--logo-tooth)" stroke="var(--logo-ink)" strokeWidth="3.5" strokeLinejoin="round" />
      </m.g>
      <m.g initial={reduce ? false : { opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.7, ease }}>
        <path d={POST} fill="var(--logo-ink)" />
        {POST_THREADS.map((y) => (
          <path key={y} d={`M${95.5 + (y - 150) * 0.12} ${y} L${116.5 - (y - 150) * 0.12} ${y + 3}`} stroke="var(--logo-tooth)" strokeWidth="2.6" strokeLinecap="round" />
        ))}
      </m.g>
    </svg>
  );
}
