import React from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  ArrowRight, 
  Users, 
  Star, 
  Zap,
  CheckCircle,
  Sparkles
} from 'lucide-react'

const benefits = [
  "Find verified professionals in minutes",
  "Secure communication and payments",
  "24/7 customer support",
  "Money-back guarantee",
  "No hidden fees or charges"
]

const stats = [
  { value: "50K+", label: "Happy Clients", icon: Users },
  { value: "4.8/5", label: "Average Rating", icon: Star },
  { value: "< 2hrs", label: "Response Time", icon: Zap }
]

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-white/20 text-white border-white/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Join Thousands of Satisfied Users
          </Badge>
          
          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Find Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              Perfect Professional?
            </span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join over 50,000 users who have successfully connected with trusted professionals. 
            Start your journey today and experience the difference quality makes.
          </p>
          
          {/* Benefits List */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-blue-100 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg" 
              className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-50 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 group"
            >
              Start Your Search Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 font-semibold rounded-xl backdrop-blur-sm transition-all duration-200"
            >
              Join as Professional
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-blue-100 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>No signup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
