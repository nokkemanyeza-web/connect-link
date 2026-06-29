import { Metadata } from "next";
import { ProjectsCarousel } from "@/components/projects/ProjectsCarousel";

export const metadata: Metadata = {
  title: "Projects | Connect Link",
  description: "View our portfolio of luxury residential estates, commercial hubs, and custom interiors.",
};

export default function ProjectsPage() {
  return (
    <div className="w-full relative min-h-screen">
      {/* Clean Modern Fixed Background */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-50"
        style={{ backgroundImage: "url('/images/projects-bg.png')" }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#060B14]/70 to-[#060B14] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 py-24 container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 text-white/90">Our Portfolio</h1>
          <p className="text-lg text-gray-400 font-light leading-relaxed">
            Discover a selection of our finest work, showcasing our commitment to excellence, luxury, and superior craftsmanship.
          </p>
        </div>

        <ProjectsCarousel />
      </div>
    </div>
  );
}
