"use client"
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
import { useTranslations } from 'next-intl'

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" }
]

export default function Footer() {
  const t = useTranslations('Footer');
  
  const footerLinks = {
    services: [
      { name: t('services.legal'), href: "#" },
      { name: t('services.design'), href: "#" },
      { name: t('services.finance'), href: "#" },
      { name: t('services.marketing'), href: "#" },
      { name: t('services.healthcare'), href: "#" },
      { name: t('services.home'), href: "#" },
      { name: t('services.education'), href: "#" },
      { name: t('services.realEstate'), href: "#" }
    ],
    company: [
      { name: t('company.aboutUs'), href: "#" },
      { name: t('company.howItWorks'), href: "#" },
      { name: t('company.careers'), href: "#" },
      { name: t('company.press'), href: "#" },
      { name: t('company.blog'), href: "#" },
      { name: t('company.partners'), href: "#" },
      { name: t('company.investors'), href: "#" },
      { name: t('company.contact'), href: "#" }
    ],
    support: [
      { name: t('support.helpCenter'), href: "#" },
      { name: t('support.safetyCenter'), href: "#" },
      { name: t('support.communityGuidelines'), href: "#" },
      { name: t('support.disputeResolution'), href: "#" },
      { name: t('support.termsOfService'), href: "#" },
      { name: t('support.privacyPolicy'), href: "#" },
      { name: t('support.cookiePolicy'), href: "#" },
      { name: t('support.accessibility'), href: "#" }
    ],
    professionals: [
      { name: t('professionals.join'), href: "#" },
      { name: t('professionals.dashboard'), href: "#" },
      { name: t('professionals.verification'), href: "#" },
      { name: t('professionals.successStories'), href: "#" },
      { name: t('professionals.resources'), href: "#" },
      { name: t('professionals.pricing'), href: "#" },
      { name: t('professionals.apiDocs'), href: "#" },
      { name: t('professionals.support'), href: "#" }
    ]
  }
  return (
<footer className="relative bottom-0 w-full bg-gradient-to-t from-gray-950 via-gray-900 to-gray-950 text-white border-t border-gray-800">

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
                {t('description')}
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
              <h4 className="text-lg font-semibold mb-6">{t('sections.services')}</h4>
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
              <h4 className="text-lg font-semibold mb-6">{t('sections.company')}</h4>
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
              <h4 className="text-lg font-semibold mb-6">{t('sections.support')}</h4>
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
              <h4 className="text-lg font-semibold mb-6">{t('sections.professionals')}</h4>
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
      <div className="border-t border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              {t('copyright')}
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
