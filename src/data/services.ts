/**
 * The fifteen treatments the clinic offers, in plain English. Demo content: review with the
 * client before going live. No outcomes or guarantees.
 */
export type Service = {
  slug: string;
  name: string;
  summary: string;
  image?: string;
  body: string[];
  /** Questions a patient actually asks about this treatment */
  points: { q: string; a: string }[];
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "dental-implants",
    name: "Dental Implants",
    summary: "A titanium post placed in the jawbone to carry a crown, bridge or denture where a tooth is missing.",
    image: "/images/services/dental-implants.jpg",
    body: [
      "An implant replaces the root of a missing tooth. A small titanium post is placed in the jawbone, and once it has bonded with the bone it carries a crown, a bridge or a denture.",
      "The choice between a crown, a bridge and a denture depends on how many teeth are missing, the condition of the bone and gums, and what you want from the result. That is decided at the consultation, not before it.",
    ],
    points: [
      { q: "Who places the implant?", a: "Dr. Lina Haddad plans and restores the implant; Dr. Omar Al Suwaidi places it when bone grafting or complex surgery is needed." },
      { q: "What is checked first?", a: "The health of your gums, the bone available in the jaw, and your general medical history." },
    ],
    featured: true,
  },
  {
    slug: "full-mouth-rehabilitation",
    name: "Full Mouth Rehabilitation",
    summary: "A staged plan that rebuilds worn, broken or missing teeth across the whole mouth so the bite works as one.",
    image: "/images/services/full-mouth-rehabilitation.jpg",
    body: [
      "Full mouth rehabilitation treats the mouth as a single system rather than one tooth at a time. It combines treatments — implants, crowns, root canals, gum care — into one sequenced plan.",
      "It usually suits people with widespread wear, several missing teeth, or a bite that no longer meets properly.",
    ],
    points: [
      { q: "How is it planned?", a: "With a full examination and digital records of your teeth and bite before any treatment starts." },
      { q: "Is it done in one visit?", a: "No. It is staged over several visits, and the sequence is explained to you at the start." },
    ],
    featured: true,
  },
  {
    slug: "root-canal-treatment",
    name: "Root Canal Treatment",
    summary: "Treatment for a tooth whose inner pulp has been reached by decay, so the natural tooth can be kept.",
    image: "/images/services/root-canal-treatment.jpg",
    body: [
      "Decay is caused by bacteria. Left untreated, it can reach the dental pulp and the nerves inside the tooth, which causes pain and can discolour the tooth.",
      "A root canal cleans and seals the canals inside the root so the tooth can stay in place instead of being removed.",
    ],
    points: [
      { q: "Who carries it out?", a: "Dr. Karim Nassar, an endodontist — a dentist who has specialised in the inside of the tooth. He works under a surgical microscope." },
      { q: "Will the tooth need a crown?", a: "Often yes. A treated tooth is more brittle, so it is usually protected with a crown." },
    ],
  },
  {
    slug: "dental-crowns-and-bridges",
    name: "Dental Crowns & Bridges",
    summary: "A crown caps a damaged tooth; a bridge spans the gap where a tooth is missing.",
    image: "/images/services/dental-crowns-and-bridges.jpg",
    body: [
      "A crown covers a tooth that is damaged, worn or has had a root canal. A bridge replaces a missing tooth by anchoring to the teeth on either side.",
      "There are several materials to choose from. The choice depends on the aesthetics you want, where the tooth sits in the mouth, how many teeth need crowns, and your own preference.",
    ],
    points: [
      { q: "How is the fit taken?", a: "With digital records of the prepared tooth, so the crown is made to that scan." },
      { q: "Crown or implant?", a: "A crown restores a tooth you still have; an implant replaces one that is gone. The examination decides which applies." },
    ],
  },
  {
    slug: "pediatric-and-preventive-dentistry",
    name: "Pediatric & Preventive Dentistry",
    summary: "Preventive and therapeutic care for infants, children and adolescents, including those with special health care needs.",
    image: "/images/services/pediatric-and-preventive-dentistry.jpg",
    body: [
      "Pediatric dentistry is a specialised field focused on preventive and therapeutic care for infants, children and adolescents, including those with special health care needs.",
      "Early visits are mostly about prevention: checking how the teeth are coming through, cleaning, and showing children how to look after their own teeth.",
    ],
    points: [
      { q: "When should a child first visit?", a: "Call the clinic for advice — it depends on the child's age and how their teeth are developing." },
      { q: "What happens at the visit?", a: "An examination, a clean where needed, and an explanation to both child and parent." },
    ],
  },
  {
    slug: "orthodontic-treatment",
    name: "Orthodontic Treatment — Braces & Clear Aligners",
    summary: "Fixed braces or removable clear aligners to straighten teeth and correct the bite.",
    image: "/images/services/orthodontic-treatment.jpg",
    body: [
      "Healthy, aesthetically pleasing teeth play a vital role in confidence. Not everyone is born with a perfect set of teeth, and orthodontic treatment moves teeth into better alignment over time.",
      "Fixed braces and removable clear aligners both do this; which suits you depends on how much movement is needed and how you want to wear the appliance.",
    ],
    points: [
      { q: "Who handles orthodontics here?", a: "Dr. Sarah Whitfield, an orthodontist and Invisalign Diamond Provider who treats children, teenagers and adults." },
      { q: "Braces or aligners?", a: "Decided at the consultation, after the bite and the teeth have been assessed." },
    ],
  },
  {
    slug: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    summary: "Treatments that change the colour, shape or alignment of teeth.",
    image: "/images/services/cosmetic-dentistry.jpg",
    body: [
      "Years of coffee, smoking or pigmented food can discolour teeth. Cosmetic dentistry covers the treatments that change how teeth look — their colour, their shape and their alignment.",
      "The right treatment depends on what is causing the appearance you want to change, which is why it starts with an examination.",
    ],
    points: [
      { q: "Is it only about whitening?", a: "No. Shape and alignment are often what change a smile most, and those are different treatments." },
      { q: "Where does it start?", a: "With a consultation about what you want to change, and what is realistic for your teeth." },
    ],
  },
  {
    slug: "laser-dentistry",
    name: "Laser Dentistry",
    summary: "Use of a dental laser for selected gum and soft-tissue procedures.",
    image: "/images/services/laser-dentistry.jpg",
    body: [
      "A dental laser is used for selected soft-tissue work in and around the gums, as an alternative to a blade for certain procedures.",
      "Whether a laser suits your treatment depends on the procedure. The clinic will tell you at the consultation if it applies to you.",
    ],
    points: [
      { q: "Is it used for every treatment?", a: "No. It applies to selected soft-tissue procedures, not to all dental work." },
    ],
    featured: true,
  },
  {
    slug: "periodontal-disease",
    name: "Periodontal Disease",
    summary: "Treatment for gum disease, including the gum problems behind persistent bad breath.",
    image: "/images/services/periodontal-disease.jpg",
    body: [
      "Halitosis, or bad breath, can come from several causes. One of them is gum disease, where bacteria build up below the gum line and inflame the tissue that holds the teeth in place.",
      "Treatment aims at the root cause rather than the smell: cleaning below the gum line and treating the gum condition itself.",
    ],
    points: [
      { q: "How do I know if I have it?", a: "Bleeding, swollen or receding gums, loose teeth and persistent bad breath are all reasons to get your gums examined." },
    ],
  },
  {
    slug: "scaling-and-polishing",
    name: "Scaling & Polishing",
    summary: "Cleaning that removes the plaque and tartar built up along the gum line.",
    image: "/images/services/scaling-and-polishing.jpg",
    body: [
      "Plaque hardens into tartar, which a toothbrush cannot remove. Scaling removes it; polishing smooths the tooth surface afterwards.",
      "This is routine, preventive work, and it is often what a check-up visit includes.",
    ],
    points: [{ q: "How often?", a: "Ask at your check-up — it depends on how quickly tartar builds up for you." }],
  },
  {
    slug: "tooth-fillings-and-restorations",
    name: "Fillings & Restorations",
    summary: "Repair of a tooth damaged by decay, before the decay reaches the nerves.",
    image: "/images/services/tooth-fillings-and-restorations.jpg",
    body: [
      "Addressing early signs of tooth decay promptly is what keeps it from reaching the nerves. Timely treatment can save the tooth and avoid more complex treatment later.",
      "A filling removes the decayed part of the tooth and restores the shape of what is left.",
    ],
    points: [{ q: "Does a filling always need a drill?", a: "The approach depends on how far the decay has gone, which an examination shows." }],
  },
  {
    slug: "tooth-extraction",
    name: "Tooth Extraction",
    summary: "Removal of a tooth that cannot be saved, under local anaesthetic.",
    image: "/images/services/tooth-extraction.jpg",
    body: [
      "Local anaesthetic is administered before any tooth extraction, so the area is numb during the procedure.",
      "Extraction is the last option, not the first: the clinic will tell you whether the tooth can be restored instead.",
    ],
    points: [
      { q: "What about wisdom teeth?", a: "Impacted wisdom teeth are Dr. Omar Al Suwaidi's area as an oral and maxillofacial surgeon. He plans each one from a 3D scan." },
      { q: "What happens afterwards?", a: "You are given aftercare instructions for the days following the extraction." },
    ],
  },
  {
    slug: "general-dentistry",
    name: "General Dentistry",
    summary: "Routine care, from check-ups and cleaning through to the more involved treatments.",
    image: "/images/services/general-dentistry.jpg",
    body: [
      "General dentistry covers the wide spectrum of dental issues, from routine check-ups through to intricate procedures — everything from basic cleaning to implant placement and surgical treatment.",
      "It is the starting point for most patients: an examination that decides what, if anything, needs doing next.",
    ],
    points: [{ q: "What happens at a check-up?", a: "Your teeth and gums are examined, and anything that needs attention is explained to you before it is treated." }],
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    summary: "Whitening carried out at the clinic, using non-toxic materials.",
    image: "/images/services/teeth-whitening.jpg",
    body: [
      "Whitening lightens the colour of the natural tooth. The clinic uses materials chosen for safety, and the treatment is carried out under supervision rather than left to a home kit.",
      "Whether whitening is the right answer depends on what is causing the discolouration, which an examination establishes first.",
    ],
    points: [{ q: "Does it work on crowns?", a: "No. Whitening changes natural tooth, not crowns or fillings — which is why the examination comes first." }],
  },
  {
    slug: "complete-dentures",
    name: "Complete Dentures",
    summary: "Removable replacements for a full upper or lower set of teeth.",
    image: "/images/services/complete-dentures.jpg",
    body: [
      "Complete dentures replace a full arch of missing teeth. They are made to fit your gums and bite, and are removable for cleaning.",
      "Where the jawbone allows, implants can be used to hold a denture more firmly in place. That option is discussed at the consultation.",
    ],
    points: [{ q: "Dentures or implants?", a: "It depends on the bone available, your general health and what you want day to day. Both are discussed before anything is decided." }],
  },
];

export const featuredServices = services.filter((s) => s.featured);
export const NOT_SURE_SERVICE = { id: "consultation", name: "Consultation" } as const;
export const serviceOptions: { id: string; name: string }[] = [
  NOT_SURE_SERVICE,
  ...services.map((s) => ({ id: s.slug, name: s.name })),
];
