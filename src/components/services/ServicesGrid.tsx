"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Construction",
    description: "Full-scale commercial and residential construction, delivering structural integrity with uncompromising quality. We handle everything from foundation to finishing.",
    image: "/images/service_construction.png",
    link: "/services/construction",
    featured: true,
  },
  {
    title: "Property Development",
    description: "Visionary development of premium estates and commercial hubs. We build the communities of tomorrow.",
    image: "/images/service_development.png",
    link: "/services/property-development",
    featured: false,
  },
  {
    title: "Bespoke Interiors",
    description: "Custom kitchens, TV units, and bathroom vanities crafted with luxury materials for an elevated living experience.",
    image: "/images/service_interiors.png",
    link: "/services/bespoke-interiors",
    featured: false,
  },
  {
    title: "Civil Works",
    description: "Heavy civil engineering, roads, and infrastructure projects executed with precision and technical expertise.",
    image: "/images/service_civil.png",
    link: "/services/civil-works",
    featured: false,
  },
  {
    title: "Project Management",
    description: "End-to-end management ensuring your project is delivered on time, within budget, and above expectations.",
    image: "/images/service_management.png",
    link: "/services/project-management",
    featured: false,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function ServicesGrid() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto"
    >
      {services.map((service) => (
        <motion.div 
          key={service.title} 
          variants={itemVariants}
          className={`group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:border-primary/50 ${
            service.featured ? "md:col-span-2 h-[450px]" : "h-[400px]"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[#060B14]/60 group-hover:bg-[#060B14]/40 transition-colors duration-500 z-10" />
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Content */}
          <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-12">
            <h3 className="text-3xl font-light font-heading text-white mb-4">{service.title}</h3>
            <p className="text-gray-300 font-light max-w-2xl mb-8 leading-relaxed">
              {service.description}
            </p>
            <Link 
              href={service.link} 
              className="inline-flex items-center text-primary hover:text-white transition-colors text-sm font-medium uppercase tracking-wider w-max"
            >
              Explore {service.title} 
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
