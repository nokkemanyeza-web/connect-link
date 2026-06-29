import { Metadata } from "next";
import { ServicesGrid } from "@/components/services/ServicesGrid";

export const metadata: Metadata = {
  title: "Services | Connect Link",
  description: "Explore our comprehensive construction, property development, and high-end interior services.",
};

export default function ServicesPage() {
  return (
    <div className="w-full relative min-h-screen">
      {/* Neat Fixed Background */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-80"
        style={{ backgroundImage: "url('/images/services-bg.png')" }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#060B14]/30 to-[#060B14]/90 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 py-24 container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 text-white/90">Our Capabilities</h1>
          <p className="text-lg text-gray-400 font-light leading-relaxed">
            From full-scale commercial developments to bespoke high-end interiors, we have the expertise to execute your vision flawlessly.
          </p>
        </div>

        <ServicesGrid />
      </div>
    </div>
  );
}
