"use server";

import { db } from "@/db";

export type CategoryWithCount = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  status: string;
  _count: {
    professionals: number;
  };
};

export async function getActiveCategories(): Promise<CategoryWithCount[]> {
  try {
    const categories = await db.domain.findMany({
      where: {
        status: 'active'
      },
      include: {
        _count: {
          select: {
            professionals: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    // Filter out categories with 0 professionals
    return categories.filter(cat => cat._count.professionals > 0);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export type DistinctCategory = {
  id: string;
  name: string;
  count: number;
};

export async function getDistinctCategoriesWithCount(): Promise<DistinctCategory[]> {
  try {
    const categories = await db.domain.findMany({
      where: {
        status: 'active'
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            professionals: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    // Map and filter out categories with 0 professionals
    return categories
      .filter(category => category._count.professionals > 0)
      .map(category => ({
        id: category.id,
        name: category.name,
        count: category._count.professionals
      }));
  } catch (error) {
    console.error('Error fetching distinct categories:', error);
    return [];
  }
}

export async function getCategoryById(categoryName: string): Promise<CategoryWithCount | null> {
  try {
    const category = await db.domain.findUnique({
      where: {
        name: categoryName,
        status: 'active'
      },
      include: {
        _count: {
          select: {
            professionals: true
          }
        }
      }
    });

    return category;
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    return null;
  }
}
