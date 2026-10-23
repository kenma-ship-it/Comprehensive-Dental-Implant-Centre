import { clinic } from "./clinic";

export type Faq = { q: string; a: string };

const list = (items: string[]) => `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

export const faqs: Faq[] = [
  { q: "What are the clinic timings?", a: `${clinic.hours.displayDays}, ${clinic.hours.displayTime}. The clinic is closed on ${clinic.hours.closedDay}s.` },
  { q: "Where is the clinic, and where do I park?", a: `${clinic.address.line1}, ${clinic.address.line2}, ${clinic.address.city}. Visitor parking is in the tower basement; bring your ticket to reception and we validate it.` },
  { q: "How do I book an appointment?", a: `Choose a treatment, dentist, day and time in the booking form, or call ${clinic.phone.display}. You get a booking reference straight away and a confirmation on WhatsApp.` },
  { q: "Which insurance do you accept?", a: `We bill ${list(clinic.insurers)} directly. For other plans we give you an itemised invoice to claim back.` },
  { q: "Who will I see?", a: "The specialist whose field your treatment is in: Dr. Lina Haddad for implants and crowns, Dr. Omar Al Suwaidi for oral surgery, Dr. Sarah Whitfield for orthodontics and Dr. Karim Nassar for root canals and everyday care." },
  { q: "Will I know the cost before treatment starts?", a: "Yes. After your consultation you receive a written plan with each stage, the dentist and the cost, and nothing starts until you agree to it." },
  { q: "I am in pain today. What should I do?", a: `Call ${clinic.phone.display}. We keep emergency slots open every day the clinic is open.` },
  { q: "Which languages do you speak?", a: `${list(clinic.languages)}.` },
];
