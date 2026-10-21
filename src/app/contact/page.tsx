import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { BookingForm } from "@/components/sections/BookingForm";
import { Location } from "@/components/sections/Location";
import { Faqs } from "@/components/sections/Faqs";
import { clinic } from "@/data/clinic";

export const metadata: Metadata = {
  title: "Contact & appointments",
  description: `Book an appointment at Comprehensive Dental & Implant Centre, Cornwell Road, Langford Garden, Bangalore 560025. Call ${clinic.phone.display}. Open ${clinic.hours.displayShort}, ${clinic.hours.displayTime}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Book a visit, or just ask."
        lede={`Pick a day and time below, or call ${clinic.phone.display} during clinic hours.`}
      />
      <BookingForm />
      <Faqs />
      <Location />
    </>
  );
}
