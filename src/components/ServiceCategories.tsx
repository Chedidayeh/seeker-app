"use client"
import React, { useEffect, useState } from 'react'
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
  Code,
  Layers,
  LucideIcon
} from 'lucide-react'
import { InteractiveHoverButton } from './ui/interactive-hover-button'
import { useTranslations } from 'next-intl'
import CategoryCard from '@/app/[locale]/(home)/categories/_components/CategoryCard'
import {  getActiveCategories } from '@/actions/categories'



// Color schemes for categories
const colorSchemes = [
  {
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400"
  },
  {
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    textColor: "text-purple-600 dark:text-purple-400"
  },
  {
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    textColor: "text-green-600 dark:text-green-400"
  },
  {
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    textColor: "text-orange-600 dark:text-orange-400"
  },
  {
    color: "from-red-500 to-rose-600",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    textColor: "text-red-600 dark:text-red-400"
  },
  {
    color: "from-yellow-500 to-amber-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    textColor: "text-yellow-600 dark:text-yellow-400"
  },
  {
    color: "from-indigo-500 to-blue-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    textColor: "text-indigo-600 dark:text-indigo-400"
  },
  {
    color: "from-teal-500 to-cyan-600",
    bgColor: "bg-teal-50 dark:bg-teal-900/20",
    textColor: "text-teal-600 dark:text-teal-400"
  },
  {
    color: "from-gray-500 to-slate-600",
    bgColor: "bg-gray-50 dark:bg-gray-900/20",
    textColor: "text-gray-600 dark:text-gray-400"
  },
  {
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50 dark:bg-violet-900/20",
    textColor: "text-violet-600 dark:text-violet-400"
  },
  {
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
    textColor: "text-pink-600 dark:text-pink-400"
  },
  {
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400"
  }
];

type CategoryWithCount = {
  id: string;
  name: string;
  description: string;
  icon?: string | null;
  status?: string; // optional if not used in CategoryCard
  _count?: {
    professionals: number;
  };
  count?: string; // human-readable count string
  color: string;
  bgColor: string;
  textColor: string;
};


export default function ServiceCategories() {
  const t = useTranslations('ServiceCategories');
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getActiveCategories();
        
        // Transform database data to match component format
        const transformedCategories = data.map((category, index) => ({
          id: category.id,
          name: category.name,
          icon: category.icon, // Use emoji icon or fallback
          description: category.description || `Explore ${category.name} professionals`,
          count: `${category._count.professionals} ${category._count.professionals === 1 ? 'Professional' : 'Professionals'}`,
          ...colorSchemes[index % colorSchemes.length] // Cycle through color schemes
        }));

        setCategories(transformedCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 animate-pulse"></div>
            <div className="h-12 w-96 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 w-[600px] bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No categories available at the moment.
            </p>
          </div>
        )}

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