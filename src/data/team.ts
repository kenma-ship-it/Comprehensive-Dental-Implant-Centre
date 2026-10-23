/**
 * The dentists. This is a demo team: names, photos, education and careers are fictional.
 * Replace them with the client's real dentists before going live.
 */
export type Education = { qualification: string; detail: string; institution: string; year: string };
export type Practice = { place: string; role: string; years: string; here?: boolean };

export type Doctor = {
  id: string;
  name: string;
  photo: string;
  credentials: string[];
  lead?: boolean;
  title: string;
  /** One or two words, for compact lists */
  specialty: string;
  focus: string;
  bio: string[];
  education: Education[];
  practice: Practice[];
  languages: string[];
  /** Days of the week the dentist sees patients: 0 = Sunday … 6 = Saturday */
  clinicDays: number[];
  /** Service slugs this dentist takes, from /data/services.ts */
  treatments: string[];
};

export const team: Doctor[] = [
  {
    id: "lina-haddad",
    name: "Dr. Lina Haddad",
    photo: "/images/team/lina-haddad.jpg",
    credentials: ["DDS", "MSc Prosthodontics", "Fellow, ICOI"],
    lead: true,
    title: "Founder and lead prosthodontist",
    specialty: "Prosthodontist",
    focus: "Implants, full-mouth rehabilitation and crowns",
    bio: [
      "Dr. Lina Haddad founded Pearlstone in 2017 after four years as senior prosthodontist at Cleveland Clinic Abu Dhabi. Prosthodontics is the specialty of rebuilding teeth: crowns, bridges, implants and full-mouth work where the bite has to be rebuilt as one system.",
      "Every plan she leads starts with a 3D scan and a mock-up you can see on screen, so you agree on the result before any tooth is touched. She trained in New York and London and has lectured on digital implant planning in Dubai, Riyadh and Beirut.",
    ],
    education: [
      { qualification: "DDS", detail: "Doctor of Dental Surgery", institution: "Columbia University College of Dental Medicine, New York", year: "2008" },
      { qualification: "MSc", detail: "Master of Science in Prosthodontics", institution: "King's College London", year: "2012" },
      { qualification: "Fellow", detail: "International Congress of Oral Implantologists", institution: "ICOI, United States", year: "2015" },
    ],
    practice: [
      { place: "Pearlstone Dental, Abu Dhabi", role: "Founder and lead prosthodontist", years: "2017 – present", here: true },
      { place: "Cleveland Clinic Abu Dhabi", role: "Senior prosthodontist", years: "2013 – 2017" },
      { place: "Guy's and St Thomas' Dental Institute, London", role: "Clinical fellow, restorative dentistry", years: "2010 – 2013" },
    ],
    languages: ["English", "Arabic", "French"],
    clinicDays: [0, 1, 2, 3, 6],
    treatments: ["dental-implants", "full-mouth-rehabilitation", "dental-crowns-and-bridges", "complete-dentures"],
  },
  {
    id: "omar-al-suwaidi",
    name: "Dr. Omar Al Suwaidi",
    photo: "/images/team/omar-al-suwaidi.jpg",
    credentials: ["BDS", "MSc Oral Surgery", "FDS RCS (Eng)"],
    title: "Oral and maxillofacial surgeon",
    specialty: "Oral surgeon",
    focus: "Wisdom teeth, bone grafting and implant surgery",
    bio: [
      "Dr. Omar Al Suwaidi is an oral and maxillofacial surgeon. He removes impacted wisdom teeth, rebuilds bone where it has been lost, and places implants where the bone is thin or close to a nerve or sinus.",
      "He spent five years at Sheikh Khalifa Medical City treating facial trauma before joining Pearlstone, and he plans every surgical case from a cone-beam CT scan so you can see exactly where he will work and why.",
    ],
    education: [
      { qualification: "BDS", detail: "Bachelor of Dental Surgery", institution: "University of Sharjah", year: "2010" },
      { qualification: "MSc", detail: "Master of Science in Oral Surgery", institution: "University of Toronto", year: "2015" },
      { qualification: "FDS RCS", detail: "Fellowship in Dental Surgery", institution: "Royal College of Surgeons of England", year: "2016" },
    ],
    practice: [
      { place: "Pearlstone Dental, Abu Dhabi", role: "Oral and maxillofacial surgeon", years: "2021 – present", here: true },
      { place: "Sheikh Khalifa Medical City, Abu Dhabi", role: "Specialist, oral and maxillofacial surgery", years: "2016 – 2021" },
      { place: "Mount Sinai Hospital, Toronto", role: "Surgical resident", years: "2012 – 2015" },
    ],
    languages: ["English", "Arabic"],
    clinicDays: [0, 2, 4, 6],
    treatments: ["tooth-extraction", "dental-implants", "laser-dentistry"],
  },
  {
    id: "sarah-whitfield",
    name: "Dr. Sarah Whitfield",
    photo: "/images/team/sarah-whitfield.jpg",
    credentials: ["DMD", "Certificate in Orthodontics", "Invisalign Diamond Provider"],
    title: "Orthodontist",
    specialty: "Orthodontist",
    focus: "Invisalign, braces and bite correction for teens and adults",
    bio: [
      "Dr. Sarah Whitfield straightens teeth and corrects bites for children, teenagers and adults, with clear aligners or fixed braces. She ran her own orthodontic practice in Boston for six years before moving to Abu Dhabi.",
      "Your first visit includes a 3D scan and a simulation of how your teeth would move, so you see the likely result, the number of aligners and the time it takes before you decide.",
    ],
    education: [
      { qualification: "DMD", detail: "Doctor of Dental Medicine", institution: "Tufts University School of Dental Medicine, Boston", year: "2011" },
      { qualification: "Certificate", detail: "Advanced Specialty Education in Orthodontics", institution: "University of Michigan", year: "2014" },
    ],
    practice: [
      { place: "Pearlstone Dental, Abu Dhabi", role: "Orthodontist", years: "2020 – present", here: true },
      { place: "Whitfield Orthodontics, Boston", role: "Founder and orthodontist", years: "2014 – 2020" },
    ],
    languages: ["English", "French"],
    clinicDays: [1, 2, 3, 4, 6],
    treatments: ["orthodontic-treatment", "cosmetic-dentistry", "pediatric-and-preventive-dentistry"],
  },
  {
    id: "karim-nassar",
    name: "Dr. Karim Nassar",
    photo: "/images/team/karim-nassar.jpg",
    credentials: ["BDS", "MClinDent Endodontics"],
    title: "Endodontist and restorative dentist",
    specialty: "Endodontist",
    focus: "Root canals under the microscope, fillings and whitening",
    bio: [
      "Dr. Karim Nassar is an endodontist: he treats the inside of the tooth. Most of his day is root canal treatment and re-treatment under a surgical microscope, with the aim of keeping your own tooth instead of replacing it.",
      "He also looks after everyday restorative care, from fillings to whitening, and sees patients who are nervous about treatment for a first, no-pressure consultation.",
    ],
    education: [
      { qualification: "BDS", detail: "Bachelor of Dental Surgery", institution: "Cairo University", year: "2009" },
      { qualification: "MClinDent", detail: "Master of Clinical Dentistry in Endodontics", institution: "UCL Eastman Dental Institute, London", year: "2014" },
    ],
    practice: [
      { place: "Pearlstone Dental, Abu Dhabi", role: "Endodontist", years: "2018 – present", here: true },
      { place: "Mediclinic City Hospital, Dubai", role: "Specialist endodontist", years: "2014 – 2018" },
    ],
    languages: ["English", "Arabic", "French"],
    clinicDays: [0, 1, 3, 4, 6],
    treatments: ["root-canal-treatment", "tooth-fillings-and-restorations", "teeth-whitening", "general-dentistry", "scaling-and-polishing", "periodontal-disease"],
  },
];

export const doctorById = (id: string | null | undefined) => team.find((d) => d.id === id);
export const firstName = (d: Doctor) => d.name.split(" ").slice(0, 2).join(" ");

export const initials = (name: string) =>
  name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
