import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Connect Link",
  description: "Learn about our company story, mission, and the leadership team driving Connect Link.",
};

export default function AboutPage() {
  return (
    <div className="w-full relative min-h-screen">
      {/* Nonchalant Fixed Background */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-80"
        style={{ backgroundImage: "url('/images/about-bg.png')" }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#060B14]/40 to-[#060B14]/90 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 py-24 container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 text-white/90">About Connect Link</h1>
          <p className="text-lg text-gray-400 font-light leading-relaxed">
            We are a premier construction and property development firm dedicated to building Zimbabwe&apos;s future. With over a decade of experience, we deliver uncompromising quality and visionary design in every project.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10 max-w-5xl mx-auto">
          <h2 className="text-2xl font-light font-heading mb-4 text-white/80">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <h3 className="text-xl font-medium text-white mb-3">Excellence</h3>
              <p className="text-gray-400 font-light">We never compromise on quality.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-white mb-3">Integrity</h3>
              <p className="text-gray-400 font-light">Transparent and honest in all our dealings.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-white mb-3">Innovation</h3>
              <p className="text-gray-400 font-light">Embracing modern technologies and sustainable practices.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
