/**
 * One hand-drawn diagram per stage of a visit. Inline SVG, theme tokens only,
 * so each follows light and dark mode. Shared canvas 0 0 200 140.
 */
const stroke = { stroke: "var(--color-ink)", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const frame = "h-auto w-full max-w-[13rem]";

/** 1 · Consultation — a chair, a lamp and a conversation */
export function ConsultArt() {
  return (
    <svg viewBox="0 0 200 140" className={frame} role="img" aria-label="A dental chair under an examination lamp">
      <path d="M26 118 H126" fill="none" {...stroke} />
      <path d="M44 118 V96 C44 86 52 80 62 80 H96 C106 80 112 74 112 64 V44" fill="var(--color-brand-soft)" {...stroke} />
      <path d="M44 96 H112" fill="none" {...stroke} />
      <circle cx="150" cy="34" r="16" fill="var(--color-brand)" />
      <path d="M150 50 L150 64 L120 76" fill="none" {...stroke} />
      <path d="M58 118 V128 M100 118 V128" fill="none" {...stroke} />
    </svg>
  );
}

/** 2 · Digital records — an intraoral scanner and the model it builds */
export function ScanArt() {
  return (
    <svg viewBox="0 0 200 140" className={frame} role="img" aria-label="An intraoral scanner building a digital model of the teeth">
      <rect x="20" y="30" width="76" height="22" rx="11" fill="var(--color-mist)" />
      <path d="M96 41 L116 41" stroke="var(--color-brand)" strokeWidth="3" strokeDasharray="5 5" strokeLinecap="round" />
      <rect x="112" y="24" width="68" height="92" rx="10" fill="var(--color-brand-soft)" {...stroke} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={122 + (i % 3) * 18} y={44 + Math.floor(i / 3) * 24} width="14" height="18" rx="5" fill="var(--color-surface)" stroke="var(--color-ink)" strokeWidth="2" />
      ))}
      <path d="M122 100 H170" stroke="var(--color-brand)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** 3 · The plan — stages on a timeline */
export function PlanArt() {
  return (
    <svg viewBox="0 0 200 140" className={frame} role="img" aria-label="A treatment plan laid out as numbered stages on a line">
      <path d="M24 70 H176" fill="none" {...stroke} />
      {[24, 76, 128, 176].map((x, i) => (
        <circle key={x} cx={x} cy="70" r={i === 1 ? 11 : 8} fill={i === 1 ? "var(--color-brand)" : "var(--color-surface)"} stroke="var(--color-ink)" strokeWidth="2.2" />
      ))}
      <path d="M24 70 V46 M76 70 V38 M128 70 V50 M176 70 V42" stroke="var(--color-line)" strokeWidth="2" />
      <rect x="10" y="26" width="28" height="12" rx="4" fill="var(--color-line-soft)" />
      <rect x="58" y="18" width="36" height="12" rx="4" fill="var(--color-brand-soft)" />
      <rect x="114" y="30" width="28" height="12" rx="4" fill="var(--color-line-soft)" />
      <rect x="160" y="22" width="28" height="12" rx="4" fill="var(--color-line-soft)" />
      <path d="M24 94 H176" stroke="var(--color-line)" strokeWidth="2" strokeDasharray="4 6" />
    </svg>
  );
}

/** 4 · Treatment — the implant itself, in the bone */
export function TreatmentArt() {
  return (
    <svg viewBox="0 0 200 140" className={frame} role="img" aria-label="An implant placed in the jawbone, carrying a crown">
      <rect x="20" y="74" width="160" height="56" rx="10" fill="var(--color-brand-soft)" />
      <path d="M20 74 C60 66 92 68 120 72 C148 76 164 70 180 68" fill="none" stroke="var(--color-brand)" strokeWidth="2.4" />
      <path d="M74 28 C74 14 86 8 100 13 C114 8 126 14 126 28 C126 42 121 50 119 58 H81 C79 50 74 42 74 28 Z" fill="var(--color-surface)" {...stroke} />
      <rect x="92" y="58" width="16" height="10" rx="3" fill="var(--color-mist)" />
      <path d="M92 68 H108 L105 116 C105 121 95 121 95 116 Z" fill="var(--color-ink)" />
      {[76, 84, 92, 100, 108].map((y) => (
        <path key={y} d={`M${92.6} ${y} L${107.4} ${y + 3}`} stroke="var(--color-surface)" strokeWidth="2.2" strokeLinecap="round" />
      ))}
    </svg>
  );
}

/** 5 · Aftercare — a calendar with the follow-up marked */
export function AftercareArt() {
  return (
    <svg viewBox="0 0 200 140" className={frame} role="img" aria-label="A calendar with a follow-up visit marked">
      <rect x="32" y="24" width="136" height="100" rx="12" fill="var(--color-surface)" {...stroke} />
      <path d="M32 50 H168" fill="none" {...stroke} />
      <path d="M62 24 V12 M138 24 V12" fill="none" {...stroke} />
      {Array.from({ length: 12 }, (_, i) => {
        const x = 50 + (i % 4) * 30;
        const y = 66 + Math.floor(i / 4) * 22;
        const marked = i === 6;
        return <circle key={i} cx={x} cy={y} r={marked ? 9 : 5} fill={marked ? "var(--color-brand)" : "var(--color-line)"} />;
      })}
    </svg>
  );
}
