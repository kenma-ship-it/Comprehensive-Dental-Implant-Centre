/** The four dentists, with credentials exactly as the clinic lists them. */
export type Doctor = { id: string; name: string; credentials: string[]; lead?: boolean };

export const team: Doctor[] = [
  {
    id: "anuradha-navaneetham",
    name: "Dr. Anuradha Navaneetham",
    credentials: ["Implantologist", "Professor", "MDS", "Oral & Maxillofacial Surgeon", "ICOI (USA)"],
    lead: true,
  },
  {
    id: "romir-navaneetham",
    name: "Dr. Romir Navaneetham",
    credentials: ["MDS", "Oral & Maxillofacial Surgeon", "Impaction, trauma and TMJ", "Implantologist", "General dentistry"],
  },
  { id: "rachana-doddala", name: "Dr. Rachana Doddala", credentials: ["BDS", "MDS Endodontics"] },
  {
    id: "pranav-poornima-pradeep",
    name: "Dr. Pranav Poornima Pradeep",
    credentials: ["MDS", "Orthodontist", "Teeth alignment", "Invisalign & braces"],
  },
];
