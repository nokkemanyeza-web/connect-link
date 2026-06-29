"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function About() {
  return (
    <section className="py-24 bg-transparent relative z-10 border-b border-white/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div>
              <span className="text-white/60 font-light tracking-[0.2em] uppercase text-xs md:text-sm block mb-4">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-5xl font-light text-white/90 font-heading leading-snug tracking-wide">
                Crafting legacies <br className="hidden md:block" />
                through exceptional design.
              </h2>
            </div>
            
            <p className="text-gray-300 text-lg font-light leading-relaxed max-w-xl">
              At Connect Link, we believe that every structure we build is a testament to our commitment to excellence. With over a decade of experience, our team of visionary architects, engineers, and master builders transform bold ideas into breathtaking realities.
            </p>
            
            <div className="pt-4">
              <Link href="/about" className="inline-flex items-center text-primary hover:text-white transition-colors text-sm font-medium uppercase tracking-wider group">
                Read Our Full Story 
                <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2 relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[#060B14]/30 z-10 group-hover:bg-[#060B14]/10 transition-colors duration-500" />
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80" 
              alt="Architecture blueprint"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
