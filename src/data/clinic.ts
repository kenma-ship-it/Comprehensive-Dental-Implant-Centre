/**
 * Single source of truth for the clinic. This is a demo brand: change the values below
 * (name, address, phone, hours, time zone) to rebrand the whole site for a new client.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pearlstonedental.ae";
export const SHOW_DEMO_FLAGS = false;

export const clinic = {
  name: "Pearlstone Dental",
  shortName: "Pearlstone",
  tagline: "Specialist dentistry, planned in 3D and explained before it begins.",

  /** Lead dentist, for components that show a single name */
  doctor: {
    name: "Dr. Lina Haddad",
    qualification: "DDS, MSc Prosthodontics",
    qualificationShort: "DDS",
    title: "Founder and lead prosthodontist",
  },

  phone: { display: "+971 2 634 2190", tel: "+97126342190", whatsapp: "97126342190" as string | null },
  mobiles: [] as { display: string; tel: string }[],
  email: "care@pearlstonedental.ae" as string | null,

  address: {
    line1: "Level 14, Al Maryah Tower",
    line2: "Al Maryah Island",
    city: "Abu Dhabi",
    region: "Abu Dhabi",
    postalCode: "",
    country: "AE",
  },
  areaServed: ["Al Maryah Island", "Al Reem Island", "Downtown Abu Dhabi", "Saadiyat Island", "Abu Dhabi"],

  maps: {
    placeUrl: "https://www.google.com/maps/search/?api=1&query=Al+Maryah+Tower+Al+Maryah+Island+Abu+Dhabi",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Al+Maryah+Tower+Al+Maryah+Island+Abu+Dhabi",
    embedUrl: "https://www.google.com/maps?q=Al+Maryah+Tower,+Al+Maryah+Island,+Abu+Dhabi&z=15&output=embed",
  },

  /** IANA time zone the clinic runs in. "Today" and open/closed are calculated here. */
  timeZone: "Asia/Dubai",
  locale: "en-GB",

  hours: {
    /** 0 = Sunday … 6 = Saturday. Closed on Fridays. */
    openWeekdays: [0, 1, 2, 3, 4, 6] as number[],
    sessions: [{ id: "day", label: "Clinic hours", open: "09:00", close: "21:00" }] as const,
    slotMinutes: 30,
    displayDays: "Saturday to Thursday",
    displayShort: "Sat – Thu",
    displayTime: "9 am – 9 pm",
    displaySessions: ["9 am – 9 pm"],
    closedDay: "Friday",
    sunday: { text: "9 am – 9 pm", placeholder: false },
  },

  /** Short facts used in the hero and about page. */
  facts: [
    { value: 11, suffix: "", label: "dental chairs, each with a 3D scanner" },
    { value: 4, suffix: "", label: "specialists, one roof" },
    { value: 6, suffix: "", label: "languages spoken at the front desk" },
  ],
  languages: ["English", "Arabic", "French", "Hindi", "Tagalog", "Russian"],
  insurers: ["Daman", "Thiqa", "AXA", "Cigna", "Allianz Care", "Bupa Global"],
};

export type SessionId = (typeof clinic.hours.sessions)[number]["id"];

export const telUrl = `tel:${clinic.phone.tel}`;
export const mailUrl = clinic.email ? `mailto:${clinic.email}` : null;
export const whatsappUrl = (text?: string) =>
  clinic.phone.whatsapp ? `https://wa.me/${clinic.phone.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}` : null;
export const addressOneLine = [clinic.address.line1, clinic.address.line2, clinic.address.city, clinic.address.postalCode].filter(Boolean).join(", ");
