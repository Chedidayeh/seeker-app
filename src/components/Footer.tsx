import React from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Youtube,
} from 'lucide-react'

const footerLinks = {
  services: [
    { name: "Legal Services", href: "#" },
    { name: "Design & Creative", href: "#" },
    { name: "Finance & Accounting", href: "#" },
    { name: "Marketing & Advertising", href: "#" },
    { name: "Healthcare & Wellness", href: "#" },
    { name: "Home & Repair", href: "#" },
    { name: "Education & Training", href: "#" },
    { name: "Real Estate", href: "#" }
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "How It Works", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Partners", href: "#" },
    { name: "Investors", href: "#" },
    { name: "Contact", href: "#" }
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Safety Center", href: "#" },
    { name: "Community Guidelines", href: "#" },
    { name: "Dispute Resolution", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Accessibility", href: "#" }
  ],
  professionals: [
    { name: "Join as Professional", href: "#" },
    { name: "Professional Dashboard", href: "#" },
    { name: "Verification Process", href: "#" },
    { name: "Success Stories", href: "#" },
    { name: "Resources", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "API Documentation", href: "#" },
    { name: "Professional Support", href: "#" }
  ]
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" }
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t">

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-gray-900 font-bold text-lg">
                  S
                </span>
                <span className="text-2xl font-bold">Seeker</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Connecting you with trusted professionals across various domains. 
                Find qualified experts for legal, design, finance, marketing, healthcare, and more.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>hello@seeker.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>123 Business Ave, Suite 100<br />New York, NY 10001</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Professionals */}
            <div>
              <h4 className="text-lg font-semibold mb-6">For Professionals</h4>
              <ul className="space-y-3">
                {footerLinks.professionals.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2024 Seeker. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-200"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
