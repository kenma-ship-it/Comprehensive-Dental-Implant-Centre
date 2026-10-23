import { clinic, SITE_URL } from "@/data/clinic";

export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";

export const siteTitle = `${clinic.name} | Specialist dental clinic in ${clinic.address.line2}, ${clinic.address.city}`;
export const siteDescription = `Implants, Invisalign, root canals and cosmetic dentistry at ${clinic.address.line1}, ${clinic.address.line2}, ${clinic.address.city}. Four specialists, 3D treatment planning, online booking. ${clinic.hours.displayShort}, ${clinic.hours.displayTime}.`;

export { SITE_URL };
