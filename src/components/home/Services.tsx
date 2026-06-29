"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Construction",
    description: "Full-scale residential and commercial building construction from ground up with uncompromised quality.",
    image: "/images/construction.png",
    href: "/services/construction"
  },
  {
    title: "Property Development",
    description: "End-to-end development of premium estates, commercial hubs, and luxury complexes.",
    image: "/images/property.png",
    href: "/services/property-development"
  },
  {
    title: "Kitchens & Cabinets",
    description: "Bespoke high-end kitchen installations and custom cabinetry tailored to your lifestyle.",
    image: "/images/kitchen.png",
    href: "/services/kitchens-cabinets"
  },
  {
    title: "Civil Works",
    description: "Infrastructure development including roads, drainage systems, and earthworks.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    href: "/services/civil-works"
  },
];

export function Services() {
  return (
    <section className="py-24 bg-transparent">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-foreground">Our Expertise</h2>
          <p className="text-muted-foreground text-lg">
            Delivering excellence across a comprehensive range of construction and property development services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <Link href={service.href} className="block h-full">
                <div className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer">
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${service.image}')` }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060B14] via-[#060B14]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold font-heading text-white mb-3 group-hover:-translate-y-2 transition-transform duration-500">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
                      {service.description}
                    </p>
                    <div className="flex items-center text-sm font-semibold text-primary group-hover:text-white transition-colors duration-300">
                      Explore Service <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
