"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight, View } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const tourItems = [
  {
    title: "Highland Luxury Estate",
    category: "Property Development",
    image: "/images/property.png",
    depth: 0,
    scale: 1,
  },
  {
    title: "Apex Commercial Complex",
    category: "Construction",
    image: "/images/construction.png",
    depth: 50,
    scale: 0.9,
  },
  {
    title: "Bespoke Modern Kitchen",
    category: "Kitchens & Cabinets",
    image: "/images/kitchen.png",
    depth: 100,
    scale: 0.8,
  },
  {
    title: "Infrastructure & Civil",
    category: "Civil Works",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    depth: 150,
    scale: 0.7,
  }
];

export function MotionTour() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate horizontal translation based on scroll
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[300vh] bg-transparent"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Section Header */}
        <div className="absolute top-24 left-4 md:left-12 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-2"
          >
            <View className="text-primary w-5 h-5" />
            <span className="text-primary font-medium tracking-widest uppercase text-sm">
              Virtual Experience
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold font-heading text-white">
            3D Motion Tour
          </h2>
        </div>

        {/* Scrollable Horizontal Track */}
        <motion.div 
          style={{ x }} 
          className="flex gap-8 md:gap-16 px-4 md:px-12 w-[400vw] h-[60vh] md:h-[70vh] items-center mt-20"
        >
          {tourItems.map((item, index) => {
            // Parallax effect within each card
            const yOffset = (index % 2 === 0) ? 40 : -40;
            
            return (
              <motion.div
                key={index}
                className="relative w-[85vw] md:w-[60vw] lg:w-[45vw] h-full rounded-3xl overflow-hidden shrink-0 group perspective-1000"
                style={{ 
                  y: yOffset,
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Image layer with slight scale on hover for 3D feel */}
                <motion.div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${item.image}')` }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                />
                
                {/* Elegant dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <span className="text-primary font-medium tracking-wider uppercase text-sm mb-3 block">
                        {item.category}
                      </span>
                      <h3 className="text-3xl md:text-5xl font-bold font-heading text-white leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    
                    <Link 
                      href="/projects" 
                      className={buttonVariants({ 
                        size: "lg", 
                        className: "rounded-full bg-white text-black hover:bg-gray-200 shrink-0 shadow-xl"
                      })}
                    >
                      Take Full Tour <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce text-gray-500">
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent" />
        </div>
      </div>
    </section>
  );
}
