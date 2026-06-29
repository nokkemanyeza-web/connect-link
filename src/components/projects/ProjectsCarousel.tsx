"use client";

import { useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import Link from "next/link";

type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
};

const projectsData: Project[] = [
  { id: 1, title: "The Azure Skyscraper", category: "Commercial", image: "/images/project_hq_1.png" },
  { id: 2, title: "Highland Luxury Estate", category: "Residential", image: "/images/project_hq_2.png" },
  { id: 3, title: "Apex Stadium Infrastructure", category: "Civil Works", image: "/images/project_hq_3.png" },
  { id: 4, title: "Bespoke Onyx Kitchen", category: "Kitchens", image: "/images/project_hq_4.png" },
  { id: 5, title: "Lumina Corporate HQ", category: "Construction", image: "/images/project_hq_5.png" },
  { id: 6, title: "The Vertex Penthouse", category: "Residential", image: "/images/project_hq_6.png" }
];

const filters = ["All", "Residential", "Commercial", "Civil", "Kitchens", "Cabinets"];

export function ProjectsCarousel() {
  const [activeFilter, setActiveFilter] = useState("All");
  
  // Continuous 3D rotation value
  const rotation = useMotionValue(0);

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Civil" && project.category === "Civil Works") return true;
    return project.category.includes(activeFilter);
  });

  const total = filteredProjects.length;

  // Frame loop for continuous non-stop linear rotation
  useAnimationFrame((t, delta) => {
    if (total > 1) {
      // 12 degrees per second, negative for standard right-to-left spin
      rotation.set(rotation.get() - (delta / 1000) * 12);
    }
  });

  const setFilter = (filter: string) => {
    setActiveFilter(filter);
    rotation.set(0); // Reset rotation when filter changes
  };

  const angleDelta = total > 0 ? 360 / total : 0;
  // Calculate a radius based on the number of items so they don't overlap too much
  const radius = total <= 1 ? 0 : total <= 2 ? 220 : Math.max(280, total * 55);

  return (
    <div className="w-full overflow-hidden">
      {/* Liquid Glass / Water Bubble Belt */}
      <div className="flex justify-center mb-16 relative z-50 px-4">
        <div className="relative flex flex-wrap gap-2 md:gap-4 justify-center p-2 rounded-[2rem] md:rounded-full bg-transparent border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_4px_20px_rgba(255,255,255,0.7),inset_0_-2px_15px_rgba(255,255,255,0.2)] overflow-hidden">
          
          {/* Specular Glare (Top) */}
          <div className="absolute top-0 left-[10%] right-[10%] h-1/2 bg-gradient-to-b from-white/60 to-transparent rounded-full blur-[1px] opacity-80 pointer-events-none" />
          
          {/* Buttons */}
          <div className="relative z-10 flex flex-wrap gap-2 md:gap-4 justify-center">
            {filters.map((filter) => (
              <button 
                key={filter} 
                onClick={() => setFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 active:scale-95 ${
                  activeFilter === filter 
                    ? "bg-white/30 text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)] border border-white/40"
                    : "bg-transparent text-white/80 hover:bg-white/20 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3D Merry-Go-Round Carousel */}
      {total > 0 ? (
        <div className="relative h-[550px] w-full mx-auto flex items-center justify-center perspective-[1200px]">
          
          <motion.div 
            className="relative w-[240px] md:w-[300px] h-[320px] md:h-[350px]"
            style={{ 
              rotateY: rotation,
              transformStyle: "preserve-3d" 
            }}
          >
            {filteredProjects.map((project, i) => {
              const hasTour = project.id === 4 || project.id === 2;
              const tourLink = project.id === 4 ? "/projects/kitchen-tour" : "/projects/highland-estate-tour";
              
              const CardContent = (
                <>
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${project.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-primary font-medium tracking-wider text-xs md:text-sm uppercase mb-2 drop-shadow-md">{project.category}</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-white font-heading leading-tight drop-shadow-lg">{project.title}</h3>
                    {hasTour && (
                      <span className="inline-block mt-4 bg-primary/30 text-white border border-primary/50 text-xs px-3 py-1.5 rounded-full uppercase tracking-wider shadow-[0_0_15px_rgba(255,215,0,0.3)] backdrop-blur-md hover:bg-primary/50 transition-colors">
                        View 360° Tour
                      </span>
                    )}
                  </div>
                </>
              );

              return (
                <div
                  key={project.id}
                  className="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.4)] border border-white/20 bg-white/5 backdrop-blur-sm"
                  style={{
                    transform: `rotateY(${i * angleDelta}deg) translateZ(${radius}px)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {hasTour ? (
                    <Link href={tourLink} className="block w-full h-full">
                      {CardContent}
                    </Link>
                  ) : (
                    <div className="w-full h-full pointer-events-none">
                      {CardContent}
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="text-gray-400 text-lg">No projects found in this category.</p>
        </div>
      )}
    </div>
  );
}
