/**
 * The four dentists, with credentials exactly as the clinic lists them.
 * Profile text is written only from those credentials. Universities, graduation years and
 * earlier hospitals were not supplied: add them to `education[].institution` / `year` and
 * `practice` when the clinic confirms them, and the profile pages pick them up.
 */
export type Education = { qualification: string; detail: string; institution?: string; year?: string };
export type Practice = { place: string; role: string; here?: boolean };

export type Doctor = {
  id: string;
  name: string;
  credentials: string[];
  lead?: boolean;
  title: string;
  focus: string;
  bio: string[];
  education: Education[];
  practice: Practice[];
  /** Service slugs this dentist takes, from /data/services.ts */
  treatments: string[];
};

export const team: Doctor[] = [
  {
    id: "anuradha-navaneetham",
    name: "Dr. Anuradha Navaneetham",
    credentials: ["Implantologist", "Professor", "MDS", "Oral & Maxillofacial Surgeon", "ICOI (USA)"],
    lead: true,
    title: "Lead dentist, oral and maxillofacial surgeon and implantologist",
    focus: "Dental implants, full-mouth rehabilitation and oral surgery",
    bio: [
      "Dr. Anuradha Navaneetham leads the clinic. The training is in oral and maxillofacial surgery (MDS), the specialty that covers surgery of the teeth, jaws and face, with implantology on top of it.",
      "Patients who need an implant, a full-mouth rehabilitation or a surgical extraction see Dr. Anuradha. Treatment is planned from digital records of the teeth and bite, so you see the plan before any work starts.",
      "Alongside the clinic, Dr. Anuradha teaches as a professor of dentistry.",
    ],
    education: [
      { qualification: "MDS", detail: "Master of Dental Surgery in Oral & Maxillofacial Surgery" },
      { qualification: "ICOI (USA)", detail: "International Congress of Oral Implantologists" },
    ],
    practice: [
      { place: "Comprehensive Dental & Implant Centre", role: "Lead dentist, implants and oral surgery", here: true },
      { place: "Dental education", role: "Professor" },
    ],
    treatments: ["dental-implants", "full-mouth-rehabilitation", "tooth-extraction", "complete-dentures"],
  },
  {
    id: "romir-navaneetham",
    name: "Dr. Romir Navaneetham",
    credentials: ["MDS", "Oral & Maxillofacial Surgeon", "Impaction, trauma and TMJ", "Implantologist", "General dentistry"],
    title: "Oral and maxillofacial surgeon and implantologist",
    focus: "Impacted wisdom teeth, jaw trauma, TMJ and implants",
    bio: [
      "Dr. Romir Navaneetham is an oral and maxillofacial surgeon (MDS) and implantologist.",
      "The special interests are impacted teeth (most often wisdom teeth), injuries to the teeth and jaw, and problems with the jaw joint (TMJ), such as clicking, locking or pain when chewing. Dr. Romir also sees patients for general dentistry.",
    ],
    education: [{ qualification: "MDS", detail: "Master of Dental Surgery in Oral & Maxillofacial Surgery" }],
    practice: [{ place: "Comprehensive Dental & Implant Centre", role: "Oral surgery, implants and general dentistry", here: true }],
    treatments: ["tooth-extraction", "dental-implants", "general-dentistry"],
  },
  {
    id: "rachana-doddala",
    name: "Dr. Rachana Doddala",
    credentials: ["BDS", "MDS Endodontics"],
    title: "Endodontist",
    focus: "Root canal treatment and saving natural teeth",
    bio: [
      "Dr. Rachana Doddala is an endodontist: a dentist with a master's degree (MDS) in treating the inside of the tooth.",
      "That means root canal treatment, re-treatment of older root canals, and restoring a tooth afterwards with a filling or crown, with the aim of keeping your own tooth wherever it can be saved.",
    ],
    education: [
      { qualification: "BDS", detail: "Bachelor of Dental Surgery" },
      { qualification: "MDS", detail: "Master of Dental Surgery in Endodontics" },
    ],
    practice: [{ place: "Comprehensive Dental & Implant Centre", role: "Root canals and restorations", here: true }],
    treatments: ["root-canal-treatment", "tooth-fillings-and-restorations", "dental-crowns-and-bridges"],
  },
  {
    id: "pranav-poornima-pradeep",
    name: "Dr. Pranav Poornima Pradeep",
    credentials: ["MDS", "Orthodontist", "Teeth alignment", "Invisalign & braces"],
    title: "Orthodontist",
    focus: "Braces, Invisalign and teeth alignment",
    bio: [
      "Dr. Pranav Poornima Pradeep is an orthodontist (MDS), the specialist for straightening teeth and correcting the bite.",
      "Treatment is with fixed braces or clear aligners including Invisalign, for children, teenagers and adults. Your first visit covers whether you need treatment now, which option suits you, and roughly how long it will take.",
    ],
    education: [{ qualification: "MDS", detail: "Master of Dental Surgery in Orthodontics" }],
    practice: [{ place: "Comprehensive Dental & Implant Centre", role: "Orthodontics, braces and aligners", here: true }],
    treatments: ["orthodontic-treatment", "cosmetic-dentistry"],
  },
];

export const initials = (name: string) =>
  name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
