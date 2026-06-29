"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectsCarousel } from "@/components/projects/ProjectsCarousel";

import { motion } from "framer-motion";

export function ProjectsPreview() {
  return (
    <section className="py-24 bg-transparent">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 relative z-[60]">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-foreground">Featured Projects</h2>
            <p className="text-muted-foreground text-lg">
              Explore our portfolio of award-winning developments and bespoke construction projects.
            </p>
          </div>
          <Link href="/projects" className={buttonVariants({ variant: "outline", className: "rounded-full gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground" })}>
            View All Projects <ArrowRight size={16} />
          </Link>
        </div>

        {/* 3D Merry-Go-Round Carousel */}
        <ProjectsCarousel />
      </div>
    </section>
  );
}
