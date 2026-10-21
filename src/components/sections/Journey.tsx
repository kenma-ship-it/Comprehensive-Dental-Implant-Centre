"use client";

import { m } from "motion/react";
import { AftercareArt, ConsultArt, PlanArt, ScanArt, TreatmentArt } from "@/components/stages/StageArt";

const ease = [0.22, 1, 0.36, 1] as const;
const stage = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };

const stages = [
  { n: "1.0", title: "We look, and we listen", body: "A first visit starts with an examination and a conversation about what brought you in — pain, a missing tooth, or a check-up that is overdue.", Art: ConsultArt },
  { n: "2.0", title: "Your mouth, on screen", body: "Digital records of your teeth and bite replace guesswork. You see what the dentist sees before anything is decided.", Art: ScanArt },
  { n: "3.0", title: "A plan, in stages", body: "You are told what the treatment involves, in what order, and what each stage is for — including the option of doing nothing yet.", Art: PlanArt },
  { n: "4.0", title: "Treatment", body: "Carried out by the dentist whose specialty it is: surgery and implants, endodontics, or orthodontics.", Art: TreatmentArt },
  { n: "5.0", title: "Afterwards", body: "Aftercare instructions, and a follow-up when the treatment calls for one.", Art: AftercareArt },
];

/** Narrative Workflow: the visit told as numbered stages down the page. */
export function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="border-t border-line-soft py-20 lg:py-28">
      <div className="wrap">
        <div className="max-w-[42rem]">
          <h2 id="journey-title" className="h-section">What a visit actually involves</h2>
          <p className="lede mt-4">
            Five stages, start to finish. Nothing begins until you have been told what it is for.
          </p>
        </div>

        <ol className="mt-14 border-t border-line">
          {stages.map(({ n, title, body, Art }) => (
            <m.li
              key={n}
              variants={stage}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="grid items-center gap-x-10 gap-y-6 border-b border-line py-10 md:grid-cols-[5rem_minmax(0,1fr)_14rem] lg:py-14"
            >
              <span aria-hidden="true" className="font-display text-[1.6rem] font-semibold tabular-nums text-brand">{n}</span>
              <div className="min-w-0">
                <h3 className="font-display text-[clamp(1.4rem,1.15rem+1.1vw,2rem)] font-semibold leading-tight text-ink">{title}</h3>
                <p className="mt-3 max-w-[38rem] text-muted">{body}</p>
              </div>
              <div className="justify-self-start md:justify-self-end">
                <Art />
              </div>
            </m.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
