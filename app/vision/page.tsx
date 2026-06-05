import type { Metadata } from "next";
import { ContentPage } from "../components/content-page";

export const metadata: Metadata = {
  title: "Vision | Adem Eren Decoration",
  description:
    "Adem Eren Decoration vision for SPC floor panels, wall panels, and project-focused interior finish selection.",
};

const visionSections = [
  {
    title: "Our Vision",
    body: [
      "To become a trusted finish selection studio for modern interiors, helping homeowners, architects, and commercial project teams choose durable SPC floor and wall panels with confidence.",
      "We want every project to feel cleaner, calmer, and easier to plan by connecting material samples, technical details, quantity planning, and installation coordination in one practical process.",
    ],
  },
  {
    title: "What We Are Building",
    body: [
      "Adem Eren Decoration focuses on surfaces that shape the feeling of a space: floors, walls, wet area panels, and textured decorative panels.",
    ],
    items: [
      "A curated SPC panel selection for residential and commercial interiors.",
      "Clear sample guidance before project decisions.",
      "Reliable coordination between product choice, measurements, and installation needs.",
    ],
  },
  {
    title: "Long-Term Direction",
    body: [
      "Our long-term goal is to make interior finish decisions more transparent and less stressful, with materials that are practical for daily use and refined enough for high-quality spaces.",
    ],
  },
];

export default function VisionPage() {
  return (
    <ContentPage
      description="Our vision is to make SPC floor and wall panel selection clearer, more reliable, and more project-ready for every interior."
      sections={visionSections}
      title="Vision"
    />
  );
}
