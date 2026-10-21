import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Comprehensive Dental & Implant Centre, Bangalore";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
