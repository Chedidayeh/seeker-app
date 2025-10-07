import React from 'react'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: "Jennifer Martinez",
    role: "Small Business Owner",
    image: "/api/placeholder/60/60",
    rating: 5,
    text: "Found the perfect lawyer for my startup through Seeker. The verification process gave me confidence, and the results exceeded expectations.",
    category: "Legal Services"
  },
  {
    id: 2,
    name: "Robert Thompson",
    role: "Marketing Manager",
    image: "/api/placeholder/60/60",
    rating: 5,
    text: "The designer I hired through Seeker completely transformed our brand identity. Professional, creative, and delivered on time.",
    category: "Design & Creative"
  },
  {
    id: 3,
    name: "Lisa Wang",
    role: "Entrepreneur",
    image: "/api/placeholder/60/60",
    rating: 5,
    text: "Seeker connected me with an amazing financial advisor who helped restructure my business finances. Highly recommend!",
    category: "Finance & Accounting"
  }
]

export default function Testimonials() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 shadow-xl">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          What Our Clients Say
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Real experiences from real people who found success through Seeker
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="text-center group">
            <div className="mb-6">
              <Avatar className="w-16 h-16 mx-auto mb-4">
                <AvatarImage src={testimonial.image} alt={testimonial.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                {testimonial.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {testimonial.role}
              </p>
              <Badge variant="outline" className="text-xs">
                {testimonial.category}
              </Badge>
            </div>
            <div className="relative">
              <Quote className="w-6 h-6 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic">
                {testimonial.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


