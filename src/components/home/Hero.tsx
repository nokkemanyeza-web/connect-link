"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background provided by page.tsx */}

      <div className="container relative z-10 mx-auto px-4 text-left mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mr-auto space-y-6"
        >
          <span className="text-white/60 font-light tracking-[0.2em] uppercase text-xs md:text-sm block mb-6">
            Premium Construction & Development
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white/90 font-heading leading-snug tracking-wide">
            Building Zimbabwe's future, <br className="hidden md:block" />
            one project at a time.
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mr-auto font-light leading-relaxed">
            From high-end residential estates to cutting-edge commercial properties. We deliver excellence through uncompromising quality and visionary design.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-8">
            <Link href="/quote" className={buttonVariants({ size: "lg", className: "rounded-full px-8 h-14 text-base bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto" })}>
              Get Free Quote <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/projects" className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-full px-8 h-14 text-base bg-transparent border-white/30 text-white hover:bg-white/10 w-full sm:w-auto" })}>
              View Our Projects
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
}
