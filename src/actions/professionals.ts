"use server";

import { db } from "@/db";

export type ProfessionalWithDetails = {
  id: string;
  full_name: string;
  headline: string;
  bio: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  address : string | null;
  city: string | null;
  image_url: string | null;
  available: boolean;
  domain: {
    id: string;
    name: string;
  };
};

export async function getActiveProfessionals(): Promise<ProfessionalWithDetails[]> {
  try {
    const professionals = await db.professional.findMany({
      where: {
        available: true
      },
      include: {
        domain: {
          select: {
            id: true,
            name: true,
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return professionals;
  } catch (error) {
    console.error('Error fetching professionals:', error);
    return [];
  }
}

export type LocationOption = {
  id: string;
  label: string;
  count: number;
};

export async function getDistinctLocations(): Promise<LocationOption[]> {
  try {
    // Get all unique city/country combinations
    const professionals = await db.professional.findMany({
      where: {
        available: true,
        OR: [
          { city: { not: null } },
        ]
      },
      select: {
        city: true,
      }
    });

    // Group by location and count
    const locationMap = new Map<string, number>();
    
    professionals.forEach(prof => {
      if (prof.city) {
        const key = `${prof.city}`;
        locationMap.set(key, (locationMap.get(key) || 0) + 1);
      }
    });

    // Convert to array and sort
    const locations: LocationOption[] = Array.from(locationMap.entries())
      .map(([location, count]) => ({
        id: location.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        label: location,
        count
      }))
      .sort((a, b) => b.count - a.count);

    return locations;
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
}

export type CategoryOption = {
  id: string;
  label: string;
  count: number;
};

export async function getProfessionalCategories(): Promise<CategoryOption[]> {
  try {
    const categories = await db.domain.findMany({
      where: {
        status: 'active',
        professionals: {
          some: {
            available: true
          }
        }
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            professionals: {
              where: {
                available: true
              }
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    return categories.map(cat => ({
      id: cat.id,
      label: cat.name,
      count: cat._count.professionals
    }));
  } catch (error) {
    console.error('Error fetching professional categories:', error);
    return [];
  }
}

export async function getProfessionalsByDomainId(domainId: string): Promise<ProfessionalWithDetails[]> {
  try {
    const professionals = await db.professional.findMany({
      where: {
        domain_id: domainId,
        available: true
      },
      include: {
        domain: {
          select: {
            id: true,
            name: true,
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return professionals;
  } catch (error) {
    console.error('Error fetching professionals by domain:', error);
    return [];
  }
}

export async function getProfessionalById(id: string): Promise<ProfessionalWithDetails | null> {
  try {
    const professional = await db.professional.findUnique({
      where: {
        id: id
      },
      include: {
        domain: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });

    return professional;
  } catch (error) {
    console.error('Error fetching professional by id:', error);
    return null;
  }
}