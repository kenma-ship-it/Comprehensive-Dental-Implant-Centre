/**
 * Single source of truth for Comprehensive Dental & Implant Centre.
 * Every value below was read off the clinic's own website. Do not add claims
 * (success rates, patient counts, prices, awards) unless the clinic supplies them.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://comprehensivedentalimplantcenter.in";
export const SHOW_DEMO_FLAGS = false;

export const clinic = {
  name: "Comprehensive Dental & Implant Centre",
  shortName: "Comprehensive Dental",
  tagline: "Dentistry Goes Digital",

  /** Lead dentist, for components that show a single name */
  doctor: {
    name: "Dr. Anuradha Navaneetham",
    qualification: "MDS, Oral & Maxillofacial Surgeon, ICOI (USA)",
    qualificationShort: "MDS",
    title: "Implantologist & Professor",
  },

  phone: { display: "080-42114432", tel: "+918042114432", whatsapp: null as string | null },
  /** TODO: the two mobile numbers on the site were not legible in the screenshots. Add them here. */
  mobiles: [] as { display: string; tel: string }[],
  /** TODO: confirm the exact address of the clinic mailbox (screenshot was too low-res to read). */
  email: null as string | null,

  address: {
    line1: "No. 11, Cornwell Road",
    line2: "Langford Garden, Richmond Circle",
    city: "Bangalore",
    region: "Karnataka",
    postalCode: "560025",
    country: "IN",
  },
  areaServed: ["Richmond Circle", "Langford Town", "Shanti Nagar", "Ashok Nagar", "Bangalore"],

  maps: {
    placeUrl: "https://www.google.com/maps/search/?api=1&query=Comprehensive+Dental+%26+Implant+Centre+Cornwell+Road+Langford+Garden+Bangalore",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Comprehensive+Dental+%26+Implant+Centre+Cornwell+Road+Langford+Garden+Bangalore+560025",
    embedUrl: "https://www.google.com/maps?q=Comprehensive+Dental+%26+Implant+Centre,+Cornwell+Road,+Langford+Garden,+Bangalore+560025&z=16&output=embed",
  },

  hours: {
    openWeekdays: [1, 2, 3, 4, 5, 6] as number[],
    sessions: [{ id: "day", label: "Clinic hours", open: "09:30", close: "19:30" }] as const,
    slotMinutes: 30,
    displayDays: "Monday to Saturday",
    displayShort: "Mon – Sat",
    displayTime: "9:30 am – 7:30 pm",
    displaySessions: ["9:30 am – 7:30 pm"],
    closedDay: "Sunday",
    sunday: { text: "Closed", placeholder: false },
  },
};

export type SessionId = (typeof clinic.hours.sessions)[number]["id"];

export const telUrl = `tel:${clinic.phone.tel}`;
export const mailUrl = clinic.email ? `mailto:${clinic.email}` : null;
export const whatsappUrl = (text?: string) =>
  clinic.phone.whatsapp ? `https://wa.me/${clinic.phone.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}` : null;
export const addressOneLine = `${clinic.address.line1}, ${clinic.address.line2}, ${clinic.address.city} ${clinic.address.postalCode}`;
