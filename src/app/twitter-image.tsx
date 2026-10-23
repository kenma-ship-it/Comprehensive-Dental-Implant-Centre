import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Pearlstone Dental, Al Maryah Island, Abu Dhabi";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
