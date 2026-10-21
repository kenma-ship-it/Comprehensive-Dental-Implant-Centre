import type { ReactNode } from "react";

/** Shared masthead for the inner pages. */
export function PageHeader({ eyebrow, title, lede, children }: { eyebrow: string; title: string; lede?: string; children?: ReactNode }) {
  return (
    <header className="border-b border-line bg-mint/50 py-14 lg:py-20">
      <div className="wrap">
        <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand">{eyebrow}</p>
        <h1 className="h-display mt-4 max-w-[22ch] [overflow-wrap:anywhere]">{title}</h1>
        {lede && <p className="lede mt-5">{lede}</p>}
        {children}
      </div>
    </header>
  );
}
