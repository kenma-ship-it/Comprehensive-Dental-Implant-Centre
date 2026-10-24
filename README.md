# Pearlstone Dental — dental clinic demo

A premium, multi-page demo website for a specialist dental clinic. The clinic, the dentists, their education and careers, and the reviews are **fictional**; rebrand it for each client.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion · React Bits (BlurText, CountUp) · Newsreader + Instrument Sans.

## Publish

Every push to `main` builds a static export and publishes it to GitHub Pages (`.github/workflows/pages.yml`). In the repo, Settings → Pages → Source must be **GitHub Actions**. To host on a custom domain instead, set `NEXT_PUBLIC_BASE_PATH` to empty in the workflow.

## Rebrand it for a new client

| What | Where |
| --- | --- |
| Name, tagline, address, phone, WhatsApp, email, time zone, opening days and hours, insurers, languages | `src/data/clinic.ts` |
| Dentists: name, photo, title, bio, education (institution, year), career (place, role, years), languages, clinic days, treatments | `src/data/team.ts` |
| Treatments, descriptions and photos | `src/data/services.ts`, `public/images/services/` |
| Reviews | `src/data/reviews.ts` |
| FAQs | `src/data/faqs.ts` |
| Colours and fonts | `src/app/globals.css` (tokens), `src/app/layout.tsx` (fonts) |
| Logo | `src/components/brand/LogoMark.tsx`, `src/app/icon.svg` |

## Pages

| Route | What it is |
| --- | --- |
| `/` | Photo hero with the next free appointment, clinic facts, the five stages of a visit, treatments, dentists, reviews |
| `/about` | How the clinic works and the team |
| `/dentists` | The four dentists |
| `/dentists/[id]` | One page per dentist: about, languages and clinic days, education, career, treatments, their next free appointment |
| `/services`, `/services/[slug]` | All 15 treatments, one page each |
| `/contact` | Appointment booking, FAQs, hours, map |

## Booking

Pick a dentist (or first available), a day and a time. Each dentist only shows the days they work. A booking returns a reference, a WhatsApp confirmation and a calendar invite in the clinic's time zone. Any page can link to a pre-filled booking: `/contact?doctor=lina-haddad&service=dental-implants#book`.

Availability is generated for the demo and bookings are kept in the visitor's browser. To go live, replace `submitAppointment` in `src/lib/appointments.ts` with a call to the clinic's booking system.

## React Bits

`src/components/reactbits/` holds components copied unchanged from [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits), except BlurText renders a `<span>` instead of `<p>` so it can sit inside a heading.

## Before going live

1. Replace the demo clinic details, dentists, photos and reviews with the client's own.
2. Connect the booking form to the clinic's real booking system.
3. Set `NEXT_PUBLIC_SITE_URL` to the live domain.

See `GATES.md` for the checks that must pass before release.
