"use client"
import React from 'react'
import { useTranslations } from 'next-intl'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Star, Quote } from 'lucide-react'

export default function Testimonials() {
  const t = useTranslations('Testimonials')

  const testimonials = [
    {
      id: 1,
      name: t('items.1.name'),
      role: t('items.1.role'),
      image: "/api/placeholder/60/60",
      rating: 5,
      text: t('items.1.text'),
      category: t('items.1.category')
    },
    {
      id: 2,
      name: t('items.2.name'),
      role: t('items.2.role'),
      image: "/api/placeholder/60/60",
      rating: 5,
      text: t('items.2.text'),
      category: t('items.2.category')
    },
    {
      id: 3,
      name: t('items.3.name'),
      role: t('items.3.role'),
      image: "/api/placeholder/60/60",
      rating: 5,
      text: t('items.3.text'),
      category: t('items.3.category')
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 shadow-xl">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t('title')}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {t('subtitle')}
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
