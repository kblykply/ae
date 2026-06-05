import type { Metadata } from "next";
import { ContentPage } from "../components/content-page";

export const metadata: Metadata = {
  title: "Mission | Adem Eren Decoration",
  description:
    "Adem Eren Decoration mission for sample requests, project planning, and SPC floor and wall panel applications.",
};

const missionSections = [
  {
    title: "Our Mission",
    body: [
      "Our mission is to help clients choose the right SPC floor and wall panel finishes for their space through clear product information, sample support, and project-based planning.",
      "We do not treat decoration as a simple online cart. We listen to the project, understand the space, recommend suitable material options, and support the path from selection to application.",
    ],
  },
  {
    title: "How We Work",
    body: [
      "Every project starts with the same priority: choosing a finish that fits the design goal, usage needs, and installation conditions.",
    ],
    items: [
      "Share clear SPC flooring, wall panel, and 3D panel options.",
      "Support sample requests before final decisions.",
      "Plan quantities, technical details, and installation coordination with care.",
    ],
  },
  {
    title: "Our Promise",
    body: [
      "We aim to keep the process direct, honest, and useful, from first inquiry to project delivery. The goal is not to show more products than necessary, but to guide each client toward the right material choice.",
    ],
  },
];

export default function MissionPage() {
  return (
    <ContentPage
      description="Our mission is to guide clients through SPC material selection, sample review, project planning, and installation coordination."
      sections={missionSections}
      title="Mission"
    />
  );
}
