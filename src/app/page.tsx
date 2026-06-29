import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Stats } from "@/components/home/Stats";
import { Services } from "@/components/home/Services";
import { MotionTour } from "@/components/home/MotionTour";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";

export default function Home() {
  return (
    <div className="w-full relative">
      {/* Global Fixed Background */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=3840&q=100')" }}
      />
      <div className="fixed inset-0 z-0 bg-[#060B14]/85 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Stats />
        <Services />
        <MotionTour />
        <ProjectsPreview />
      </div>
    </div>
  );
}
