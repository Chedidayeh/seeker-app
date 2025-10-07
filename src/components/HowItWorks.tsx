import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { 
  Search, 
  MessageCircle, 
  CheckCircle, 
  ArrowRight,
  Users,
  Shield,
  Clock,
  Star
} from 'lucide-react'

const steps = [
  {
    id: 1,
    title: "Search & Discover",
    description: "Browse through thousands of verified professionals or use our smart search to find the perfect match for your needs.",
    icon: Search,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    features: ["Smart search filters", "Category-based browsing", "Location-based results"]
  },
  {
    id: 2,
    title: "Connect & Consult",
    description: "Review profiles, read reviews, and connect directly with professionals. Schedule consultations and discuss your requirements.",
    icon: MessageCircle,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    features: ["Direct messaging", "Video consultations", "Profile reviews"]
  },
  {
    id: 3,
    title: "Get Results",
    description: "Work with your chosen professional and achieve your goals. Rate and review your experience to help others.",
    icon: CheckCircle,
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    features: ["Project completion", "Quality assurance", "Review system"]
  }
]

const stats = [
  { icon: Users, value: "50K+", label: "Active Users" },
  { icon: Shield, value: "99.9%", label: "Verified Professionals" },
  { icon: Clock, value: "< 24hrs", label: "Average Response Time" },
  { icon: Star, value: "4.8/5", label: "Average Rating" }
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            Simple Process
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            How Seeker
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Works for You
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Getting started is simple. Follow these three easy steps to connect with 
            the perfect professional for your needs.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={step.id} className="relative">
                {/* Step Card */}
                <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800">
                  <CardContent className="p-8">
                    {/* Step Number */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-6xl font-bold text-gray-200 dark:text-gray-700 group-hover:text-blue-200 dark:group-hover:text-blue-800 transition-colors">
                        0{step.id}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-2">
                      {step.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color}`}></div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  
                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                </Card>

                {/* Arrow (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 dark:border-gray-700">
                      <ArrowRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Trusted by Thousands
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join our growing community of satisfied users and professionals
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
