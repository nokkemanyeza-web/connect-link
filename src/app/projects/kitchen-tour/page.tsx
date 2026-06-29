import { Metadata } from "next";
import { VirtualTour3D } from "@/components/projects/VirtualTour3D";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "360° Kitchen Tour | Connect Link",
  description: "Experience our luxury bespoke kitchens in an immersive 360-degree virtual tour.",
};

export default function KitchenTourPage() {
  const kitchenHotspots = [
    {
      position: [400, 50, -200] as [number, number, number],
      title: "Bespoke Cabinetry",
      description: "Hand-crafted oak cabinets with soft-close mechanisms and hidden handles for a seamless minimalist look."
    },
    {
      position: [-300, -150, 300] as [number, number, number],
      title: "Quartzite Island",
      description: "A massive seamless slab of rare Brazilian quartzite. Highly resistant to heat and scratches."
    },
    {
      position: [100, 250, 400] as [number, number, number],
      title: "Designer Lighting",
      description: "Integrated ambient LED lighting with smart-home dimming capabilities for the perfect mood."
    }
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Back button overlay */}
      <div className="absolute top-8 right-8 z-50">
        <Link 
          href="/projects" 
          className={buttonVariants({ 
            variant: "outline", 
            className: "bg-black/50 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-black rounded-full"
          })}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
        </Link>
      </div>

      {/* Render the refactored generic 3D Engine with Kitchen config */}
      <VirtualTour3D 
        imageUrl="/images/kitchen_360.jpg"
        title="Bespoke Onyx Kitchen"
        description="Click and drag to look around the entire room. Hover over the glowing hotspots to explore the premium materials and features of this custom installation."
        hotspots={kitchenHotspots}
      />
    </div>
  );
}
