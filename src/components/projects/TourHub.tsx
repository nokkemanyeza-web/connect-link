"use client";

import { useState } from "react";
import { VirtualTour3D } from "./VirtualTour3D";
import { ArrowLeft, Map as MapIcon } from "lucide-react";
import Link from "next/link";

type RoomId = "exterior" | "living-room" | "master-bedroom" | "kitchen";

interface RoomData {
  id: RoomId;
  name: string;
  image: string;
  desc: string;
  hotspots: {
    position: [number, number, number];
    title: string;
    description: string;
  }[];
}

const ROOMS: Record<RoomId, RoomData> = {
  "exterior": {
    id: "exterior",
    name: "Exterior Courtyard",
    image: "/images/estate_360.jpg",
    desc: "Explore the courtyard of this modern architectural masterpiece at twilight.",
    hotspots: [
      { position: [0, -100, -400], title: "Infinity Pool", description: "A stunning edge-less infinity pool blending seamlessly with the twilight horizon." },
      { position: [-350, 100, 200], title: "Architectural Glass", description: "Floor-to-ceiling thermal glass panels providing uninterrupted panoramic views." },
      { position: [250, -50, 300], title: "Premium Landscaping", description: "Curated drought-resistant luxury landscaping designed to complement the modern aesthetic." }
    ]
  },
  "living-room": {
    id: "living-room",
    name: "Grand Living Room",
    image: "/images/living_room_360.jpg",
    desc: "A double-height living space designed for ultimate luxury and entertaining.",
    hotspots: [
      { position: [0, 50, -400], title: "Bespoke Fireplace", description: "A massive floor-to-ceiling marble fireplace commanding the center of the room." },
      { position: [400, 200, 0], title: "Double-Height Ceilings", description: "Over 20-foot ceilings providing an immense sense of space and grandeur." }
    ]
  },
  "master-bedroom": {
    id: "master-bedroom",
    name: "Master Suite",
    image: "/images/master_bedroom_360.jpg",
    desc: "Wake up to breathtaking panoramic views in this dark minimalist sanctuary.",
    hotspots: [
      { position: [-200, 0, -400], title: "Panoramic City Views", description: "Uninterrupted vistas of the skyline right from the comfort of your bed." },
      { position: [300, -50, 200], title: "Minimalist Design", description: "Sleek, dark, and warm materials providing a perfectly calming atmosphere." }
    ]
  },
  "kitchen": {
    id: "kitchen",
    name: "Chef's Kitchen",
    image: "/images/kitchen_360.jpg",
    desc: "Our award-winning Bespoke Onyx Kitchen integrated directly into the estate.",
    hotspots: [
      { position: [400, 50, -200], title: "Bespoke Cabinetry", description: "Hand-crafted oak cabinets with soft-close mechanisms." },
      { position: [-300, -150, 300], title: "Quartzite Island", description: "A massive seamless slab of rare Brazilian quartzite." }
    ]
  }
};

export function TourHub() {
  const [activeRoom, setActiveRoom] = useState<RoomId | null>(null);

  if (activeRoom) {
    const room = ROOMS[activeRoom];
    const roomKeys = Object.keys(ROOMS) as RoomId[];
    const currentIndex = roomKeys.indexOf(activeRoom);
    
    // Calculate next and prev indexes, wrapping around
    const nextIndex = (currentIndex + 1) % roomKeys.length;
    const prevIndex = (currentIndex - 1 + roomKeys.length) % roomKeys.length;
    
    const handleNext = () => setActiveRoom(roomKeys[nextIndex]);
    const handlePrev = () => setActiveRoom(roomKeys[prevIndex]);

    return (
      <div className="absolute inset-0 animate-in fade-in duration-1000">
        <VirtualTour3D
          key={activeRoom} // Force remount to reset camera/loaders when switching rooms
          imageUrl={room.image}
          title={room.name}
          description={room.desc}
          hotspots={room.hotspots}
          onExit={() => setActiveRoom(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
      {/* Background abstract grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Back to Projects */}
      <div className="absolute top-8 left-8 z-50">
        <Link 
          href="/projects" 
          className="bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black px-4 py-2 rounded-full flex items-center text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Projects
        </Link>
      </div>

      <div className="z-10 flex flex-col items-center">
        <div className="text-center mb-12">
          <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/30 inline-block mb-4">
            Interactive Floor Plan
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mb-4">Highland Luxury Estate</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Select a room from the architectural blueprint below to enter a fully immersive 360-degree virtual tour.
          </p>
        </div>

        {/* Abstract Architectural Floor Plan UI */}
        <div className="relative w-full max-w-4xl aspect-[16/9] bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm shadow-2xl flex items-center justify-center">
          
          <div className="grid grid-cols-3 grid-rows-2 gap-4 w-full h-full relative">
            
            {/* Master Bedroom */}
            <div 
              onClick={() => setActiveRoom("master-bedroom")}
              className="col-span-1 row-span-1 border border-white/20 bg-white/5 hover:bg-primary/20 hover:border-primary/50 transition-all duration-500 rounded-xl flex flex-col items-center justify-center cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <MapIcon className="w-5 h-5 text-white/70 group-hover:text-primary" />
              </div>
              <h3 className="text-white font-medium tracking-wide">Master Suite</h3>
              <p className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">View 360°</p>
            </div>

            {/* Exterior Courtyard */}
            <div 
              onClick={() => setActiveRoom("exterior")}
              className="col-span-2 row-span-1 border border-white/20 bg-white/5 hover:bg-primary/20 hover:border-primary/50 transition-all duration-500 rounded-xl flex flex-col items-center justify-center cursor-pointer group"
            >
               <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <MapIcon className="w-5 h-5 text-white/70 group-hover:text-primary" />
              </div>
              <h3 className="text-white font-medium tracking-wide">Exterior Courtyard & Pool</h3>
              <p className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">View 360°</p>
            </div>

            {/* Living Room */}
            <div 
              onClick={() => setActiveRoom("living-room")}
              className="col-span-2 row-span-1 border border-white/20 bg-white/5 hover:bg-primary/20 hover:border-primary/50 transition-all duration-500 rounded-xl flex flex-col items-center justify-center cursor-pointer group"
            >
               <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <MapIcon className="w-5 h-5 text-white/70 group-hover:text-primary" />
              </div>
              <h3 className="text-white font-medium tracking-wide">Grand Living Room</h3>
              <p className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">View 360°</p>
            </div>

            {/* Kitchen */}
            <div 
              onClick={() => setActiveRoom("kitchen")}
              className="col-span-1 row-span-1 border border-white/20 bg-white/5 hover:bg-primary/20 hover:border-primary/50 transition-all duration-500 rounded-xl flex flex-col items-center justify-center cursor-pointer group"
            >
               <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <MapIcon className="w-5 h-5 text-white/70 group-hover:text-primary" />
              </div>
              <h3 className="text-white font-medium tracking-wide">Chef's Kitchen</h3>
              <p className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">View 360°</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
