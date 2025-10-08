"use client"
import React from 'react'
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
import { useTranslations } from 'next-intl'
import CategoryCard from '@/app/[locale]/categories/_components/CategoryCard'

export default function ServiceCategories() {
  const t = useTranslations('ServiceCategories');
  
  const categories = [
    {
      id: 1,
      name: t('categories.legal.name'),
      icon: Scale,
      description: t('categories.legal.description'),
      count: t('categories.legal.count'),
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      id: 2,
      name: t('categories.design.name'),
      icon: Palette,
      description: t('categories.design.description'),
      count: t('categories.design.count'),
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400"
    },
    {
      id: 3,
      name: t('categories.finance.name'),
      icon: DollarSign,
      description: t('categories.finance.description'),
      count: t('categories.finance.count'),
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400"
    },
    {
      id: 4,
      name: t('categories.marketing.name'),
      icon: Megaphone,
      description: t('categories.marketing.description'),
      count: t('categories.marketing.count'),
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      textColor: "text-orange-600 dark:text-orange-400"
    },
    {
      id: 5,
      name: t('categories.healthcare.name'),
      icon: Heart,
      description: t('categories.healthcare.description'),
      count: t('categories.healthcare.count'),
      color: "from-red-500 to-rose-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      textColor: "text-red-600 dark:text-red-400"
    },
    {
      id: 6,
      name: t('categories.home.name'),
      icon: Wrench,
      description: t('categories.home.description'),
      count: t('categories.home.count'),
      color: "from-yellow-500 to-amber-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      textColor: "text-yellow-600 dark:text-yellow-400"
    },
    {
      id: 7,
      name: t('categories.education.name'),
      icon: GraduationCap,
      description: t('categories.education.description'),
      count: t('categories.education.count'),
      color: "from-indigo-500 to-blue-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      textColor: "text-indigo-600 dark:text-indigo-400"
    },
    {
      id: 8,
      name: t('categories.realEstate.name'),
      icon: Home,
      description: t('categories.realEstate.description'),
      count: t('categories.realEstate.count'),
      color: "from-teal-500 to-cyan-600",
      bgColor: "bg-teal-50 dark:bg-teal-900/20",
      textColor: "text-teal-600 dark:text-teal-400"
    },
    {
      id: 9,
      name: t('categories.automotive.name'),
      icon: Car,
      description: t('categories.automotive.description'),
      count: t('categories.automotive.count'),
      color: "from-gray-500 to-slate-600",
      bgColor: "bg-gray-50 dark:bg-gray-900/20",
      textColor: "text-gray-600 dark:text-gray-400"
    },
    {
      id: 10,
      name: t('categories.business.name'),
      icon: Briefcase,
      description: t('categories.business.description'),
      count: t('categories.business.count'),
      color: "from-violet-500 to-purple-600",
      bgColor: "bg-violet-50 dark:bg-violet-900/20",
      textColor: "text-violet-600 dark:text-violet-400"
    },
    {
      id: 11,
      name: t('categories.photography.name'),
      icon: Camera,
      description: t('categories.photography.description'),
      count: t('categories.photography.count'),
      color: "from-pink-500 to-rose-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      textColor: "text-pink-600 dark:text-pink-400"
    },
    {
      id: 12,
      name: t('categories.technology.name'),
      icon: Code,
      description: t('categories.technology.description'),
      count: t('categories.technology.count'),
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      textColor: "text-emerald-600 dark:text-emerald-400"
    }
  ]
  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            {t('badge')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('title.part1')}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {t('title.part2')}
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
          <InteractiveHoverButton>{t('cta')}</InteractiveHoverButton>
          </div>
        </div>
      </div>
    </section>
  )
}
