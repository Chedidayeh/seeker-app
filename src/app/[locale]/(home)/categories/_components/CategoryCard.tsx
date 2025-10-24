import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';
import { LucideIcon } from 'lucide-react';

export type CategoryUI = {
  id: string;
  name: string;
  description: string;
  slug?: string;
  count?: string;
  color: string;
  bgColor: string;
  textColor: string;
  icon?: string | null; // Lucide icon component
};

export default function CategoryCard({ category }: { category: CategoryUI }) {
  const IconComponent = category.icon as LucideIcon | undefined;

  // Generate slug from category name if not provided
  const categorySlug = category.name

  return (
    <Link href={`/categories/${categorySlug}`}>
      <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          {/* Icon */}
          {IconComponent && (
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
            >
              <IconComponent className="w-8 h-8 text-white" />
            </div>
          )}

          {/* Content */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {category.name}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">
            {category.description}
          </p>

          {category.count && (
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${category.bgColor} ${category.textColor}`}
            >
              {category.count}
            </div>
          )}
        </CardContent>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Card>
    </Link>
  );
}
