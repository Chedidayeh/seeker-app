import React from 'react'
import Testimonials from './Testimonials'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { 
  Star, 
  MapPin, 
  Award, 
  Quote
} from 'lucide-react'

const professionals = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Legal Advisor",
    category: "Legal Services",
    rating: 4.9,
    reviews: 127,
    location: "New York, NY",
    image: "/api/placeholder/80/80",
    verified: true,
    experience: "8+ years",
    specialties: ["Corporate Law", "Contract Review", "Business Formation"],
    quote: "Seeker has transformed how I connect with clients. The platform's verification system builds trust immediately.",
    projects: 45
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Creative Director",
    category: "Design & Creative",
    rating: 4.8,
    reviews: 89,
    location: "San Francisco, CA",
    image: "/api/placeholder/80/80",
    verified: true,
    experience: "6+ years",
    specialties: ["Brand Identity", "UI/UX Design", "Digital Marketing"],
    quote: "The quality of clients on Seeker is outstanding. Every project has been meaningful and well-compensated.",
    projects: 32
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    title: "Financial Consultant",
    category: "Finance & Accounting",
    rating: 5.0,
    reviews: 156,
    location: "Miami, FL",
    image: "/api/placeholder/80/80",
    verified: true,
    experience: "12+ years",
    specialties: ["Investment Planning", "Tax Strategy", "Retirement Planning"],
    quote: "Seeker's platform makes it easy to showcase my expertise and connect with clients who value professional advice.",
    projects: 78
  },
  {
    id: 4,
    name: "David Kim",
    title: "Digital Marketing Expert",
    category: "Marketing & Advertising",
    rating: 4.7,
    reviews: 203,
    location: "Austin, TX",
    image: "/api/placeholder/80/80",
    verified: true,
    experience: "5+ years",
    specialties: ["SEO", "Social Media", "PPC Advertising"],
    quote: "The best platform for marketing professionals. Clients come pre-qualified and ready to invest in quality work.",
    projects: 67
  }
]

// testimonials moved to `Testimonials` component

export default function FeaturedProfessionals() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            Top Professionals
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Meet Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Featured Experts
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Connect with top-rated professionals who have proven track records of success. 
            Each expert is verified and comes highly recommended by our community.
          </p>
        </div>

        {/* Featured Professionals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {professionals.map((professional) => (
            <Card 
              key={professional.id} 
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white dark:bg-gray-800"
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={professional.image} alt={professional.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                        {professional.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {professional.verified && (
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Award className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {professional.rating}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {professional.reviews} reviews
                    </div>
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {professional.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {professional.title}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <MapPin className="w-3 h-3" />
                  {professional.location}
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {professional.specialties.slice(0, 2).map((specialty, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs px-2 py-1">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <span>{professional.experience} experience</span>
                  <span>{professional.projects} projects</span>
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="w-4 h-4 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed">
                    {professional.quote}
                  </p>
                </div>

                {/* CTA */}
                <button className="w-full mt-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 transform group-hover:scale-105">
                  View Profile
                </button>
              </CardContent>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Card>
          ))}
        </div>

        {/* Testimonials Section */}
        <Testimonials />
      </div>
    </section>
  )
}
