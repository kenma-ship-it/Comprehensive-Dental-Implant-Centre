export type Review = { id: string; name: string; stars?: 1 | 2 | 3 | 4 | 5; when?: string; text: string };

/** Demo reviews. Replace with the client's own published reviews before going live. */
export const reviews: Review[] = [
  {
    id: "noor-a",
    name: "Noor A.",
    stars: 5,
    when: "September 2026",
    text: "Dr. Lina showed me my new smile on the screen before she touched a single tooth. Two implants later, I honestly cannot tell which teeth are mine.",
  },
  {
    id: "james-m",
    name: "James M.",
    stars: 5,
    when: "August 2026",
    text: "I had been putting off a root canal for a year. Dr. Karim explained every step, and I felt nothing. Booked online, was seen on time to the minute.",
  },
  {
    id: "maria-s",
    name: "Maria S.",
    stars: 5,
    when: "July 2026",
    text: "My daughter's Invisalign plan was clear from the first visit, with the cost and number of aligners in writing. The front desk handled our Daman claim directly.",
  },
  {
    id: "faisal-k",
    name: "Faisal K.",
    stars: 4,
    when: "June 2026",
    text: "Wisdom teeth out with Dr. Omar. Quick, calm and a follow-up call the next morning. Parking in the tower took a while to find.",
  },
];
