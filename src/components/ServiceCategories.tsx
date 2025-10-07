import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { 
  Scale, 
  Palette, 
  DollarSign, 
  Megaphone, 
  Heart, 
  Wrench,
  GraduationCap,
  Home,
  Car,
  Briefcase,
  Camera,
  Code
} from 'lucide-react'
import { InteractiveHoverButton } from './ui/interactive-hover-button'

const categories = [
  {
    id: 1,
    name: "Legal Services",
    icon: Scale,
    description: "Lawyers, attorneys, and legal consultants",
    count: "1,200+ professionals",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400"
  },
  {
    id: 2,
    name: "Design & Creative",
    icon: Palette,
    description: "Graphic designers, UI/UX, and creative professionals",
    count: "2,500+ professionals",
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    textColor: "text-purple-600 dark:text-purple-400"
  },
  {
    id: 3,
    name: "Finance & Accounting",
    icon: DollarSign,
    description: "Financial advisors, accountants, and tax experts",
    count: "1,800+ professionals",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    textColor: "text-green-600 dark:text-green-400"
  },
  {
    id: 4,
    name: "Marketing & Advertising",
    icon: Megaphone,
    description: "Digital marketers, SEO experts, and brand strategists",
    count: "1,600+ professionals",
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    textColor: "text-orange-600 dark:text-orange-400"
  },
  {
    id: 5,
    name: "Healthcare & Wellness",
    icon: Heart,
    description: "Doctors, therapists, nutritionists, and wellness coaches",
    count: "3,200+ professionals",
    color: "from-red-500 to-rose-600",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    textColor: "text-red-600 dark:text-red-400"
  },
  {
    id: 6,
    name: "Home & Repair",
    icon: Wrench,
    description: "Plumbers, electricians, carpenters, and home services",
    count: "2,100+ professionals",
    color: "from-yellow-500 to-amber-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    textColor: "text-yellow-600 dark:text-yellow-400"
  },
  {
    id: 7,
    name: "Education & Training",
    icon: GraduationCap,
    description: "Tutors, trainers, coaches, and educational consultants",
    count: "1,400+ professionals",
    color: "from-indigo-500 to-blue-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    textColor: "text-indigo-600 dark:text-indigo-400"
  },
  {
    id: 8,
    name: "Real Estate",
    icon: Home,
    description: "Real estate agents, property managers, and consultants",
    count: "900+ professionals",
    color: "from-teal-500 to-cyan-600",
    bgColor: "bg-teal-50 dark:bg-teal-900/20",
    textColor: "text-teal-600 dark:text-teal-400"
  },
  {
    id: 9,
    name: "Automotive",
    icon: Car,
    description: "Mechanics, auto consultants, and vehicle services",
    count: "800+ professionals",
    color: "from-gray-500 to-slate-600",
    bgColor: "bg-gray-50 dark:bg-gray-900/20",
    textColor: "text-gray-600 dark:text-gray-400"
  },
  {
    id: 10,
    name: "Business Consulting",
    icon: Briefcase,
    description: "Business strategists, management consultants, and advisors",
    count: "1,100+ professionals",
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50 dark:bg-violet-900/20",
    textColor: "text-violet-600 dark:text-violet-400"
  },
  {
    id: 11,
    name: "Photography & Media",
    icon: Camera,
    description: "Photographers, videographers, and media professionals",
    count: "1,300+ professionals",
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
    textColor: "text-pink-600 dark:text-pink-400"
  },
  {
    id: 12,
    name: "Technology & IT",
    icon: Code,
    description: "Developers, IT consultants, and tech specialists",
    count: "2,800+ professionals",
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400"
  }
]

export default function ServiceCategories() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            Explore Services
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Find Professionals in
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Every Category
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From legal advice to creative design, connect with verified professionals 
            across 50+ service categories. Each expert is carefully vetted for quality and expertise.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card 
                key={category.id} 
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white dark:bg-gray-800"
              >
                <CardContent className="p-6">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${category.bgColor} ${category.textColor}`}>
                    {category.count}
                  </div>
                </CardContent>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
          <InteractiveHoverButton>Browse All Categories</InteractiveHoverButton>
          </div>
        </div>
      </div>
    </section>
  )
}
