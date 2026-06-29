import Link from "next/link";
import { Globe, MessageCircle, Camera, Briefcase, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="text-gray-300 py-16 border-t border-white/10 bg-white/5 backdrop-blur-2xl shadow-lg relative z-10 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold font-heading text-primary">NATTIE</span>
              <span className="text-2xl font-light text-white">GROUP</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Building Zimbabwe's Future, One Project at a Time. Premium construction, property development, and high-end interiors.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="#" className="hover:text-primary transition-colors"><Globe size={20} /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><MessageCircle size={20} /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Camera size={20} /></Link>
              <Link href="#" className="hover:text-primary transition-colors"><Briefcase size={20} /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 tracking-wider">QUICK LINKS</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/projects" className="hover:text-primary transition-colors">Our Projects</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/quote" className="hover:text-primary transition-colors">Request a Quote</Link></li>
              <li><Link href="/login" className="hover:text-primary transition-colors">Client Portal</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 tracking-wider">SERVICES</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services/construction" className="hover:text-primary transition-colors">Construction</Link></li>
              <li><Link href="/services/property-development" className="hover:text-primary transition-colors">Property Development</Link></li>
              <li><Link href="/services/kitchens-cabinets" className="hover:text-primary transition-colors">Kitchens & Cabinets</Link></li>
              <li><Link href="/services/civil-works" className="hover:text-primary transition-colors">Civil Works</Link></li>
              <li><Link href="/services/project-management" className="hover:text-primary transition-colors">Project Management</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 tracking-wider">CONTACT US</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary shrink-0 mt-0.5" size={18} />
                <span>123 Construction Ave, Harare, Zimbabwe</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary shrink-0" size={18} />
                <span>+263 77 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary shrink-0" size={18} />
                <span>info@connectlink.co.zw</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-sm flex flex-col md:flex-row justify-between items-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Connect Link. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
