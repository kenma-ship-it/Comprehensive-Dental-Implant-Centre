import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import { clinic, SITE_URL, addressOneLine } from "@/data/clinic";
import { ALLOW_INDEXING, siteDescription, siteTitle } from "@/lib/site";
import { services } from "@/data/services";
import { faqs } from "@/data/faqs";
import { team } from "@/data/team";
import { reviews } from "@/data/reviews";
import MotionProvider from "@/components/motion/MotionProvider";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { StickyMobileCta } from "@/components/sections/StickyMobileCta";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const serif = Newsreader({ subsets: ["latin"], display: "swap", style: ["normal", "italic"], axes: ["opsz"], variable: "--font-serif" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap", variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: siteTitle, template: `%s | ${clinic.name}` },
  description: siteDescription,
  openGraph: { type: "website", locale: "en_AE", siteName: clinic.name, title: siteTitle, description: siteDescription },
  alternates: { canonical: "/" },
  robots: { index: ALLOW_INDEXING, follow: ALLOW_INDEXING },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f5f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1d1a" },
  ],
  width: "device-width",
  initialScale: 1,
};

function JsonLd() {
  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${SITE_URL}/#clinic`,
    name: clinic.name,
    description: siteDescription,
    slogan: clinic.tagline,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-mark.svg`,
    image: `${SITE_URL}/opengraph-image`,
    telephone: clinic.phone.tel,
    ...(clinic.email ? { email: clinic.email } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${clinic.address.line1}, ${clinic.address.line2}`,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.region,
      postalCode: clinic.address.postalCode,
      addressCountry: clinic.address.country,
    },
    hasMap: clinic.maps.placeUrl,
    areaServed: clinic.areaServed.map((name) => ({ "@type": "Place", name })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: clinic.hours.sessions[0].open,
        closes: clinic.hours.sessions[0].close,
      },
    ],
    availableService: services.map((s) => ({
      "@type": "MedicalProcedure",
      name: s.name,
      description: s.summary,
      url: `${SITE_URL}/services/${s.slug}`,
    })),
    employee: team.map((d) => ({ "@type": "Person", name: d.name, jobTitle: d.title, url: `${SITE_URL}/dentists/${d.id}`, hasCredential: d.credentials.join(", ") })),
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewBody: r.text,
      ...(r.stars ? { reviewRating: { "@type": "Rating", ratingValue: r.stars, bestRating: 5 } } : {}),
    })),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={`${serif.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <JsonLd />
      </head>
      <body className="pb-14 lg:pb-0">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-lg"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Nav />
          <main id="main-content">{children}</main>
          <Footer />
          <StickyMobileCta />
        </MotionProvider>
        <p className="sr-only">{addressOneLine}</p>
      </body>
    </html>
  );
}
