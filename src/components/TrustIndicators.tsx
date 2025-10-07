import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { 
  Shield, 
  CheckCircle, 
  Award, 
  Lock, 
  Eye, 
  Users,
  Star,
  Clock,
  MessageCircle,
  FileCheck,
  Globe,
  Zap
} from 'lucide-react'

const trustFeatures = [
  {
    id: 1,
    title: "Background Verification",
    description: "Every professional undergoes comprehensive background checks and credential verification before joining our platform.",
    icon: Shield,
    color: "from-blue-500 to-indigo-600",
    stats: "99.9% Verified"
  },
  {
    id: 2,
    title: "Identity Verification",
    description: "Multi-step identity verification process ensures you're connecting with real, qualified professionals.",
    icon: CheckCircle,
    color: "from-green-500 to-emerald-600",
    stats: "100% Verified"
  },
  {
    id: 3,
    title: "Professional Credentials",
    description: "We verify licenses, certifications, and professional qualifications for all service providers.",
    icon: Award,
    color: "from-purple-500 to-pink-600",
    stats: "5,000+ Verified"
  },
  {
    id: 4,
    title: "Secure Communication",
    description: "End-to-end encrypted messaging and secure payment processing protect your privacy and data.",
    icon: Lock,
    color: "from-orange-500 to-red-600",
    stats: "Bank-Level Security"
  }
]

const securityFeatures = [
  {
    icon: Eye,
    title: "Privacy Protection",
    description: "Your personal information is protected with industry-leading privacy measures"
  },
  {
    icon: Users,
    title: "Community Reviews",
    description: "Real reviews from verified clients help you make informed decisions"
  },
  {
    icon: Star,
    title: "Quality Assurance",
    description: "Continuous monitoring ensures high-quality service delivery"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support for any questions or concerns"
  }
]

const certifications = [
  { name: "SOC 2 Type II", description: "Security compliance" },
  { name: "GDPR Compliant", description: "Data protection" },
  { name: "SSL Encrypted", description: "Secure connections" },
  { name: "PCI DSS", description: "Payment security" }
]

export default function TrustIndicators() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            Trust & Security
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Your Trust is Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Top Priority
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We go above and beyond to ensure every interaction on Seeker is safe, secure, and trustworthy. 
            Your peace of mind is our commitment.
          </p>
        </div>

        {/* Trust Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustFeatures.map((feature) => {
            const IconComponent = feature.icon
            return (
              <Card 
                key={feature.id} 
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800"
              >
                <CardContent className="p-6 text-center">
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                    {feature.stats}
                  </div>
                </CardContent>
                
                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
              </Card>
            )
          })}
        </div>

        {/* Security Features */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Advanced Security Features
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Multiple layers of protection keep your data and transactions secure
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Certifications & Compliance */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Certifications */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Industry Certifications & Compliance
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Seeker meets the highest industry standards for security, privacy, and data protection. 
              Our certifications demonstrate our commitment to keeping your information safe.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <FileCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">
                      {cert.name}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {cert.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Trust Stats */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Trust by the Numbers
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      Verified Professionals
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Background checked & certified
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  99.9%
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      Client Satisfaction
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Positive reviews & ratings
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  4.8/5
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      Response Time
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Average professional response
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                       less than 2hours
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
              Start Your Search
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200">
              Learn More About Security
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
