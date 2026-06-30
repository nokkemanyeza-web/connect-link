"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
  ];

  const pathname = usePathname();
  if (pathname.includes("-tour")) return null;

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/5 backdrop-blur-2xl shadow-lg border-b border-white/10" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold font-heading text-primary">CONNECT</span>
          <span className="text-2xl font-light text-foreground">LINK</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
            Login
          </Link>
          <Link href="/quote" className={buttonVariants({ className: "rounded-full px-6" })}>
            Get Free Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden fixed inset-0 top-20 bg-[#060B14]/95 backdrop-blur-3xl p-6 flex flex-col gap-6 overflow-y-auto border-t border-white/10"
        >
          <div className="flex flex-col gap-4 mt-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xl font-light text-white/90 p-3 hover:bg-white/5 rounded-xl transition-colors tracking-wide uppercase"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-4 pt-6 border-t border-white/10 mt-auto mb-10">
            <Link
              href="/login"
              className="text-xl font-light text-white/90 p-3 hover:bg-white/5 rounded-xl transition-colors text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Client Login
            </Link>
            <Link href="/quote" onClick={() => setIsMobileMenuOpen(false)} className={buttonVariants({ className: "w-full rounded-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg" })}>
              Get Free Quote
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
