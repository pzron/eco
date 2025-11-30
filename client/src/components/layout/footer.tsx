import { Link } from "wouter";
import { Sparkles, Box, Star, Globe, Headset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const categoryLinks = [
  { label: "Electronics", href: "/products?category=electronics" },
  { label: "Fashion", href: "/products?category=fashion" },
  { label: "Beauty", href: "/products?category=beauty" },
  { label: "Sports", href: "/products?category=sports" },
  { label: "Gaming", href: "/products?category=gaming" },
  { label: "Home & Living", href: "/products?category=home" },
];

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Shipping Info", href: "/shipping" },
  { label: "Returns", href: "/returns" },
  { label: "Privacy Policy", href: "/privacy" },
];

const socialLinks = [
  { 
    label: "Facebook", 
    href: "https://facebook.com", 
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 3.05 3.05 0 0 0-.82.085 1.2 1.2 0 0 0-.883.9c-.089.386-.133.844-.133 1.37v1.616h2.481l-.391 3.667h-2.09v8.002H9.101z"/>
      </svg>
    )
  },
  { 
    label: "X", 
    href: "https://x.com", 
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  },
  { 
    label: "Instagram", 
    href: "https://instagram.com", 
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    )
  },
  { 
    label: "LinkedIn", 
    href: "https://linkedin.com", 
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
];

const statsCards = [
  { icon: Box, value: "500+", label: "Products", color: "purple" as const },
  { icon: Star, value: "4.9", label: "Rating", color: "yellow" as const },
  { icon: Globe, value: "150+", label: "Countries", color: "cyan" as const },
  { icon: Headset, value: "24/7", label: "Support", color: "green" as const },
];

function StatsCard({ 
  icon: Icon, 
  value, 
  label, 
  color,
  index
}: { 
  icon: any;
  value: string;
  label: string;
  color: "purple" | "yellow" | "cyan" | "green";
  index: number;
}) {
  const colorClasses = {
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400",
    yellow: "from-yellow-500/20 to-yellow-500/5 border-yellow-500/30 text-yellow-400",
    cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400",
    green: "from-green-500/20 to-green-500/5 border-green-500/30 text-green-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`relative p-5 rounded-2xl bg-gradient-to-br ${colorClasses[color]} border backdrop-blur-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:shadow-lg`}
    >
      <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-2 ${colorClasses[color].split(' ').pop()}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-2xl font-bold font-heading text-white">{value}</div>
      <div className="text-xs text-white/50">{label}</div>
    </motion.div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-[#0a0a0f] to-[#050508]">
      <div className="container mx-auto px-4">
        <div className="py-16">
          <div className="text-center mb-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-heading font-bold text-white mb-6"
            >
              Ready to Transform Your Shopping?
            </motion.h2>
            
            {/* Quick Features */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-500/5 border border-blue-500/30 text-blue-300 text-sm font-semibold flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Free Shipping
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-500/5 border border-amber-500/30 text-amber-300 text-sm font-semibold flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Fast Delivery
              </motion.div>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/60 max-w-xl mx-auto mb-8"
            >
              Join thousands of satisfied customers and discover a new way to shop online.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10"
            >
              {statsCards.map((stat, index) => (
                <StatsCard 
                  key={stat.label}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                  color={stat.color}
                  index={index}
                />
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-8 py-6 font-medium shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-105">
                  Create Account
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-6 font-medium">
                  Browse Products
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-12 border-t border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-heading font-bold text-xl text-white">
                  Nex<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Commerce</span>
                </span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                The future of shopping with AI-powered personalization, 3D visualization, and Web3 integration.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-purple-500/50 transition-all"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading font-bold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-white/50 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-bold text-white mb-6">Categories</h3>
              <ul className="space-y-3">
                {categoryLinks.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-white/50 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-bold text-white mb-6">Support</h3>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-white/50 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            © 2024 NexCommerce. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
