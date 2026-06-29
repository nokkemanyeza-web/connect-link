"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "350+", label: "Projects Completed" },
  { value: "12+", label: "Years Experience" },
  { value: "250+", label: "Happy Clients" },
  { value: "50+", label: "Expert Workers" },
];

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-transparent py-20 pb-32">
      <div className="container mx-auto px-4">
        <div ref={ref} className="relative p-8 md:p-12 rounded-[3rem] md:rounded-full bg-transparent border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_4px_20px_rgba(255,255,255,0.7),inset_0_-2px_15px_rgba(255,255,255,0.2)] overflow-hidden max-w-6xl mx-auto">
          
          {/* Specular Glare (Top) */}
          <div className="absolute top-0 left-[10%] right-[10%] h-1/2 bg-gradient-to-b from-white/60 to-transparent rounded-full blur-[1px] opacity-80 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center px-4"
              >
                <h3 className="text-4xl md:text-5xl font-bold text-primary font-heading mb-2 drop-shadow-md">
                  {stat.value}
                </h3>
                <p className="text-white text-sm md:text-base font-medium uppercase tracking-wider drop-shadow-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
