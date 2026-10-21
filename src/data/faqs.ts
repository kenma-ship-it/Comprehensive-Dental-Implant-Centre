import { clinic } from "./clinic";

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  { q: "What are the clinic timings?", a: `${clinic.hours.displayDays}, ${clinic.hours.displayTime}. The clinic is closed on ${clinic.hours.closedDay}s.` },
  { q: "Where is the clinic?", a: `${clinic.address.line1}, ${clinic.address.line2}, ${clinic.address.city} ${clinic.address.postalCode}. It is close to Richmond Circle; use Get directions to open the route in Google Maps.` },
  { q: "How do I book an appointment?", a: `Choose a treatment, day and time in the booking section, or call ${clinic.phone.display}. The clinic confirms every appointment.` },
  { q: "Who will I see?", a: "One of four dentists: Dr. Anuradha Navaneetham and Dr. Romir Navaneetham (oral and maxillofacial surgery, implants), Dr. Rachana Doddala (endodontics, root canals) or Dr. Pranav Poornima Pradeep (orthodontics)." },
  { q: "What does “Dentistry Goes Digital” mean here?", a: "It refers to planning treatment from digital records of your teeth and bite rather than from impressions alone. Ask the clinic which parts of your own treatment are planned this way." },
  { q: "I am in pain today. What should I do?", a: `Call ${clinic.phone.display} rather than waiting for an online booking, so the team can advise you directly.` },
  { q: "What should I bring to a first visit?", a: "Any earlier X-rays or dental records, and a list of the medicines you take. If another dentist referred you, bring their note." },
];
