export type Review = { id: string; name: string; stars?: 1 | 2 | 3 | 4 | 5; when?: string; text: string };

/**
 * Patient reviews as published on the clinic's own website, word for word.
 * Do not edit or reword them. Add `when` once the dates are confirmed.
 */
export const reviews: Review[] = [
  {
    id: "syed-sufi",
    name: "Syed Sufi",
    stars: 5,
    text: "I have been going comprehensive dental implant center for years and have always received excellent care Thank you Dr . Anuradha maam",
  },
  {
    id: "aashish-chandra",
    name: "Aashish Chandra",
    stars: 5,
    text: "I met with doctor Anuradha Ma'am 10 year back and it's super helpful in all respects Consultation and medication is very much helpful.",
  },
  {
    id: "jeet-kumar",
    name: "Jeet Kumar",
    stars: 5,
    text: "I had a teeth extraction. It was done in professional way without much pain. Its good choice to have my dental checkup here",
  },
];
