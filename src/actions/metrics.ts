"use server";

import { db } from "@/db";

export type MetricsData = {
  totalProfessionals: number;
  totalCategories: number;
  professionalsPerCategory: number;
  totalViews: number;
};

export async function getDashboardMetrics(): Promise<MetricsData> {
  try {
    // Get total professionals count
    const totalProfessionals = await db.professional.count({
      where: {
        available: true
      }
    });

    // Get total active categories count
    const totalCategories = await db.domain.count({
      where: {
        status: 'active',
        professionals: {
          some: {
            available: true
          }
        }
      }
    });

    // Calculate average professionals per category
    const professionalsPerCategory = totalCategories > 0 
      ? totalProfessionals / totalCategories 
      : 0;

    // Get total views (sum of professional views and domain views)
    const professionalViews = await db.professional.aggregate({
      _sum: {
        views: true
      }
    });

    const domainViews = await db.domain.aggregate({
      _sum: {
        views: true
      }
    });

    const totalViews = (professionalViews._sum.views || 0) + (domainViews._sum.views || 0);

    return {
      totalProfessionals,
      totalCategories,
      professionalsPerCategory,
      totalViews
    };
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    return {
      totalProfessionals: 0,
      totalCategories: 0,
      professionalsPerCategory: 0,
      totalViews: 0
    };
  }
}
