# Comprehensive Dental & Implant Centre — demo rebuild

Multi-page demo site for **Comprehensive Dental & Implant Centre**, No. 11, Cornwell Road, Langford Garden, Richmond Circle, Bangalore 560025.
Four dentists, led by Dr. Anuradha Navaneetham (MDS, Oral & Maxillofacial Surgeon, ICOI USA). Mon–Sat, 9:30 am – 7:30 pm · 080-42114432.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion 13 · self-hosted fonts (Bricolage Grotesque, Public Sans).

## Pages

| Route | What it is |
| --- | --- |
| `/` | Hero, the five stages of a visit, featured treatments, the dentists, reviews |
| `/about` | How the clinic works, and all four dentists with credentials |
| `/dentists` | The four dentists, each card opening a profile |
| `/dentists/[id]` | One page per dentist (4 static pages): about, education, where they work, treatments they take, `Dentist` schema |
| `/services` | All 15 treatments |
| `/services/[slug]` | One page per treatment (15 static pages), each with its own `MedicalProcedure` schema |
| `/contact` | Appointment enquiry, FAQs, hours, map |

## Design

- **Brand:** the badge's signal red on near-black, over warm off-white. Light and dark themes; the toggle sits in the nav and the first visit follows the device setting.
- **Logo:** redrawn as vector in `src/components/brand/logo-geometry.ts` — heart, tooth, implant post, ring of type. It animates on the home page. Favicon: `src/app/icon.svg`.
- **Page shape:** the home page tells a visit as five numbered stages, each with a hand-drawn SVG (`src/components/stages/StageArt.tsx`). No stock photography is used.
- **Tokens:** `src/app/globals.css` — light values in `@theme`, dark under `:root[data-theme="dark"]`. Use tokens (`bg-surface`, `text-ink`, `text-brand`), not fixed colours.

## SEO and AI answer engines

- `Dentist` JSON-LD with address, hours, all four dentists, every treatment and the published reviews; `FAQPage` on top; `MedicalProcedure` per treatment page.
- Per-page titles, descriptions and canonicals; sitemap covers all 25 routes; `robots.ts` allows AI crawlers deliberately so the clinic can be cited in AI answers about dentists near Richmond Circle.
- Each treatment page answers the questions a patient actually asks, in short self-contained paragraphs — the shape answer engines quote.

## Verification

`GATES.md` lists the acceptance gates, each with the command that proves it:

```bash
npx tsc --noEmit && npx eslint src && npm run build
node scripts/check-responsive.mjs   # needs the site running on :3500
node scripts/check-a11y.mjs
```

## Before going live

1. **Email and mobile numbers** — the two mobiles and the email on the current site were illegible in the screenshots, so `email` and `mobiles` in `src/data/clinic.ts` are left `null` / empty rather than guessed. Fill them in and they appear in the footer, contact page and mobile bar automatically.
2. **Map pin** — the embed searches by address. Paste the clinic's own Google Maps place link into `clinic.maps` for an exact pin.
3. **Photos** — no clinic, team or patient photography is used. Supply real photos; do not substitute stock images of other people's clinics.
4. **Booking** — the calendar is a demo (sample availability held in the browser). Replace `submitAppointment` in `src/lib/appointments.ts` with the clinic's real booking system.
5. **Dentist profiles**: universities, graduation years and earlier hospitals were not supplied, so the profiles show only what the credentials state. Add `institution` / `year` to `education` and more `practice` entries in `src/data/team.ts` and they appear automatically.
6. **Blog** — the current site has a blog; no posts were supplied, so no `/blog` route was built.

Facts come from the clinic's own website. Do not add claims (success rates, patient counts, prices, awards) unless the clinic supplies them.
