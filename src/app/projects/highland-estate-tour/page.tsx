import { Metadata } from "next";
import { TourHub } from "@/components/projects/TourHub";

export const metadata: Metadata = {
  title: "Highland Estate Interactive Tour | Connect Link",
  description: "Take an immersive 360-degree tour of the stunning Highland Luxury Estate.",
};

export default function HighlandEstateTourPage() {
  return (
    <TourHub />
  );
}
