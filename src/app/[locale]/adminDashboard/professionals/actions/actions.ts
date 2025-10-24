"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";

export type CSVProfessional = {
  full_name: string;
  headline: string;
  bio?: string;
  domain_name: string;
  email?: string;
  phone?: string;
  website?: string;
  linkedin_url?: string;
  instagram_url?: string;
  city?: string;
  address: string;
  image_url?: string;
  available: string;
};

export type ValidationError = {
  row: number;
  field: string;
  message: string;
};

export type Professional = {
  id: string;
  full_name: string;
  headline: string;
  bio: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  image_url: string | null;
  available: boolean;
  views: number;
  created_at: Date;
  updated_at: Date;
  domain: {
    id: string;
    name: string;
    icon: string | null;
  };
};

export async function getProfessionals(): Promise<Professional[]> {
  const professionals = await db.professional.findMany({
    orderBy: {
      created_at: 'desc'
    },
    include: {
      domain: {
        select: {
          id: true,
          name: true,
          icon: true
        }
      }
    }
  });

  return professionals;
}

export async function validateProfessionals(professionals: CSVProfessional[]): Promise<{
  valid: boolean;
  errors: ValidationError[];
}> {
  const errors: ValidationError[] = [];
  
  // Get existing professionals for duplicate checking
  const existingProfessionals = await db.professional.findMany({
    select: { 
      email: true, 
      phone: true, 
      full_name: true,
      headline: true,
      city: true
    }
  });

  // Create sets for quick lookup
  const existingEmailSet = new Set(
    existingProfessionals
      .filter(p => p.email !== null)
      .map(p => p.email!.toLowerCase())
  );

  const existingPhoneSet = new Set(
    existingProfessionals
      .filter(p => p.phone !== null)
      .map(p => p.phone!.toLowerCase().replace(/\s+/g, ''))
  );

  const existingNameSet = new Set(
    existingProfessionals
      .map(p => p.full_name.toLowerCase().trim())
  );

  // Get all domains
  const domains = await db.domain.findMany({
    select: { name: true, id: true }
  });
  const domainMap = new Map(domains.map(d => [d.name.toLowerCase(), d.id]));

  professionals.forEach((professional, index) => {
    const row = index + 2; // +2 because of header row and 0-index

    // Validate required fields
    if (!professional.full_name || professional.full_name.trim() === '') {
      errors.push({
        row,
        field: 'full_name',
        message: 'Full name is required'
      });
    } else {
      // Check for duplicate full name in database
      if (existingNameSet.has(professional.full_name.toLowerCase().trim())) {
        errors.push({
          row,
          field: 'full_name',
          message: 'Professional with this name already exists in database'
        });
      }

      // Check for duplicate full name in CSV
      const duplicateNameInCSV = professionals.findIndex((p, i) => 
        i !== index && p.full_name && p.full_name.toLowerCase().trim() === professional.full_name.toLowerCase().trim()
      );
      if (duplicateNameInCSV !== -1) {
        errors.push({
          row,
          field: 'full_name',
          message: `Duplicate name found in row ${duplicateNameInCSV + 2}`
        });
      }
    }

    if (!professional.headline || professional.headline.trim() === '') {
      errors.push({
        row,
        field: 'headline',
        message: 'Headline is required'
      });
    }

    if (!professional.address || professional.address.trim() === '') {
      errors.push({
        row,
        field: 'address',
        message: 'Address is required'
      });
    }

    // Validate phone if provided
    if (professional.phone && professional.phone.trim() !== '') {
      const normalizedPhone = professional.phone.toLowerCase().replace(/\s+/g, '');
      
      // Check for duplicate phone in database
      if (existingPhoneSet.has(normalizedPhone)) {
        errors.push({
          row,
          field: 'phone',
          message: 'Phone number already exists in database'
        });
      }

      // Check for duplicate phone in CSV
      const duplicatePhoneInCSV = professionals.findIndex((p, i) => 
        i !== index && p.phone && p.phone.toLowerCase().replace(/\s+/g, '') === normalizedPhone
      );
      if (duplicatePhoneInCSV !== -1) {
        errors.push({
          row,
          field: 'phone',
          message: `Duplicate phone found in row ${duplicatePhoneInCSV + 2}`
        });
      }
    }

    // Validate email if provided
    if (professional.email && professional.email.trim() !== '') {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(professional.email)) {
        errors.push({
          row,
          field: 'email',
          message: 'Invalid email format'
        });
      } else {
        // Check for duplicate emails in database
        if (existingEmailSet.has(professional.email.toLowerCase())) {
          errors.push({
            row,
            field: 'email',
            message: 'Email already exists in database'
          });
        }

        // Check for duplicate emails in CSV
        const duplicateInCSV = professionals.findIndex((p, i) => 
          i !== index && p.email && professional.email && p.email.toLowerCase() === professional.email.toLowerCase()
        );
        if (duplicateInCSV !== -1) {
          errors.push({
            row,
            field: 'email',
            message: `Duplicate email found in row ${duplicateInCSV + 2}`
          });
        }
      }
    }

    // Check for similar professionals (same name + location or same name + headline)
    const similarProfessionals = existingProfessionals.filter(existing => {
      const nameMatch = existing.full_name.toLowerCase().trim() === professional.full_name?.toLowerCase().trim();
      const headlineMatch = existing.headline.toLowerCase().trim() === professional.headline?.toLowerCase().trim();
      const cityMatch = existing.city && professional.city && 
        existing.city.toLowerCase().trim() === professional.city.toLowerCase().trim();
      
      // Consider it similar if name matches AND (headline OR city matches)
      return nameMatch && (headlineMatch || cityMatch);
    });

    if (similarProfessionals.length > 0 && professional.full_name) {
      errors.push({
        row,
        field: 'full_name',
        message: `Similar professional already exists (same name and headline/location)`
      });
    }

    if (!professional.domain_name || professional.domain_name.trim() === '') {
      errors.push({
        row,
        field: 'domain_name',
        message: 'Domain/Category is required'
      });
    } else {
      // Check if domain exists
      if (!domainMap.has(professional.domain_name.toLowerCase())) {
        errors.push({
          row,
          field: 'domain_name',
          message: `Domain "${professional.domain_name}" does not exist. Please create it first.`
        });
      }
    }

    // Validate available field
    if (!professional.available || !['true', 'false', 'yes', 'no'].includes(professional.available.toLowerCase())) {
      errors.push({
        row,
        field: 'available',
        message: 'Available must be "true", "false", "yes", or "no"'
      });
    }

    // Validate URLs if provided
    if (professional.website && professional.website.trim() !== '') {
      try {
        new URL(professional.website);
      } catch {
        errors.push({
          row,
          field: 'website',
          message: 'Invalid website URL format'
        });
      }
    }

    if (professional.linkedin_url && professional.linkedin_url.trim() !== '') {
      try {
        new URL(professional.linkedin_url);
      } catch {
        errors.push({
          row,
          field: 'linkedin_url',
          message: 'Invalid LinkedIn URL format'
        });
      }
    }

    if (professional.instagram_url && professional.instagram_url.trim() !== '') {
      try {
        new URL(professional.instagram_url);
      } catch {
        errors.push({
          row,
          field: 'instagram_url',
          message: 'Invalid Instagram URL format'
        });
      }
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}

export async function createDomains(domainNames: string[]): Promise<{
  success: boolean;
  count: number;
  message: string;
}> {
  try {
    const domainsToCreate = domainNames.map(name => ({
      name: name.trim(),
      description: `${name.trim()} services`,
      status: 'active',
      icon: null,
    }));

    const result = await db.domain.createMany({
      data: domainsToCreate,
      skipDuplicates: true
    });

    revalidatePath('/[locale]/adminDashboard/categories');
    
    return {
      success: true,
      count: result.count,
      message: `Successfully created ${result.count} domain(s)`
    };
  } catch (error) {
    console.error('Error creating domains:', error);
    return {
      success: false,
      count: 0,
      message: error instanceof Error ? error.message : 'Failed to create domains. Please try again.'
    };
  }
}

export async function insertProfessionals(professionals: CSVProfessional[]): Promise<{
  success: boolean;
  count: number;
  message: string;
}> {
  try {
    // Get domain mapping
    const domains = await db.domain.findMany({
      select: { name: true, id: true }
    });
    const domainMap = new Map(domains.map(d => [d.name.toLowerCase(), d.id]));

    // Prepare data for insertion
    const professionalsToInsert = professionals.map(prof => {
      const domainId = domainMap.get(prof.domain_name.toLowerCase());
      if (!domainId) {
        throw new Error(`Domain "${prof.domain_name}" not found`);
      }

      const available = ['true', 'yes'].includes(prof.available.toLowerCase());

      return {
        full_name: prof.full_name.trim(),
        headline: prof.headline.trim(),
        bio: prof.bio?.trim() || null,
        domain_id: domainId,
        email: prof.email?.trim() || null,
        phone: prof.phone?.trim() || null,
        website: prof.website?.trim() || null,
        linkedin_url: prof.linkedin_url?.trim() || null,
        instagram_url: prof.instagram_url?.trim() || null,
        city: prof.city?.trim() || null,
        address: prof.address.trim(),
        image_url: prof.image_url?.trim() || null,
        available: available,
      };
    });

    // Insert all professionals
    const result = await db.professional.createMany({
      data: professionalsToInsert,
      skipDuplicates: true
    });

    revalidatePath('/[locale]/adminDashboard/professionals');
    
    return {
      success: true,
      count: result.count,
      message: `Successfully inserted ${result.count} professionals`
    };
  } catch (error) {
    console.error('Error inserting professionals:', error);
    return {
      success: false,
      count: 0,
      message: error instanceof Error ? error.message : 'Failed to insert professionals. Please try again.'
    };
  }
}

export type DuplicateGroup = {
  id: string;
  type: 'email' | 'phone' | 'name' | 'similar';
  value: string;
  professionals: {
    id: string;
    full_name: string;
    email: string | null;
    phone: string | null;
    headline: string;
    city: string | null;
    created_at: Date;
  }[];
};

export async function findDuplicates(): Promise<{
  success: boolean;
  duplicates: DuplicateGroup[];
  totalDuplicates: number;
}> {
  try {
    const allProfessionals = await db.professional.findMany({
      select: {
        id: true,
        full_name: true,
        email: true,
        phone: true,
        headline: true,
        city: true,
        created_at: true,
      },
      orderBy: {
        created_at: 'asc'
      }
    });

    const duplicateGroups: DuplicateGroup[] = [];

    // Find email duplicates
    const emailMap = new Map<string, typeof allProfessionals>();
    allProfessionals.forEach(prof => {
      if (prof.email) {
        const email = prof.email.toLowerCase();
        if (!emailMap.has(email)) {
          emailMap.set(email, []);
        }
        emailMap.get(email)!.push(prof);
      }
    });

    emailMap.forEach((profs, email) => {
      if (profs.length > 1) {
        duplicateGroups.push({
          id: `email-${email}`,
          type: 'email',
          value: email,
          professionals: profs
        });
      }
    });

    // Find phone duplicates
    const phoneMap = new Map<string, typeof allProfessionals>();
    allProfessionals.forEach(prof => {
      if (prof.phone) {
        const phone = prof.phone.toLowerCase().replace(/\s+/g, '');
        if (!phoneMap.has(phone)) {
          phoneMap.set(phone, []);
        }
        phoneMap.get(phone)!.push(prof);
      }
    });

    phoneMap.forEach((profs, phone) => {
      if (profs.length > 1) {
        duplicateGroups.push({
          id: `phone-${phone}`,
          type: 'phone',
          value: phone,
          professionals: profs
        });
      }
    });

    // Find name duplicates
    const nameMap = new Map<string, typeof allProfessionals>();
    allProfessionals.forEach(prof => {
      const name = prof.full_name.toLowerCase().trim();
      if (!nameMap.has(name)) {
        nameMap.set(name, []);
      }
      nameMap.get(name)!.push(prof);
    });

    nameMap.forEach((profs, name) => {
      if (profs.length > 1) {
        duplicateGroups.push({
          id: `name-${name}`,
          type: 'name',
          value: name,
          professionals: profs
        });
      }
    });

    // Find similar professionals (same name + headline)
    const similarMap = new Map<string, typeof allProfessionals>();
    allProfessionals.forEach(prof => {
      const key = `${prof.full_name.toLowerCase().trim()}-${prof.headline.toLowerCase().trim()}`;
      if (!similarMap.has(key)) {
        similarMap.set(key, []);
      }
      similarMap.get(key)!.push(prof);
    });

    similarMap.forEach((profs, key) => {
      if (profs.length > 1) {
        duplicateGroups.push({
          id: `similar-${key}`,
          type: 'similar',
          value: key,
          professionals: profs
        });
      }
    });

    const totalDuplicates = duplicateGroups.reduce((sum, group) => sum + group.professionals.length, 0);

    return {
      success: true,
      duplicates: duplicateGroups,
      totalDuplicates
    };
  } catch (error) {
    console.error('Error finding duplicates:', error);
    return {
      success: false,
      duplicates: [],
      totalDuplicates: 0
    };
  }
}

export async function removeDuplicates(keepOldest: boolean = true): Promise<{
  success: boolean;
  removed: number;
  message: string;
}> {
  try {
    const { duplicates } = await findDuplicates();
    const idsToRemove: string[] = [];

    duplicates.forEach(group => {
      // Sort by created_at
      const sorted = [...group.professionals].sort((a, b) => 
        keepOldest 
          ? a.created_at.getTime() - b.created_at.getTime()
          : b.created_at.getTime() - a.created_at.getTime()
      );

      // Keep the first one (oldest or newest depending on keepOldest), remove the rest
      const toRemove = sorted.slice(1);
      idsToRemove.push(...toRemove.map(p => p.id));
    });

    // Remove duplicates (unique IDs only)
    const uniqueIds = Array.from(new Set(idsToRemove));
    
    if (uniqueIds.length === 0) {
      return {
        success: true,
        removed: 0,
        message: 'No duplicates found to remove'
      };
    }

    const result = await db.professional.deleteMany({
      where: {
        id: {
          in: uniqueIds
        }
      }
    });

    revalidatePath('/[locale]/adminDashboard/professionals');

    return {
      success: true,
      removed: result.count,
      message: `Successfully removed ${result.count} duplicate professional(s)`
    };
  } catch (error) {
    console.error('Error removing duplicates:', error);
    return {
      success: false,
      removed: 0,
      message: error instanceof Error ? error.message : 'Failed to remove duplicates'
    };
  }
}

export async function deleteProfessional(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    await db.professional.delete({
      where: { id }
    });

    revalidatePath('/[locale]/adminDashboard/professionals');

    return {
      success: true,
      message: 'Professional deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting professional:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete professional'
    };
  }
}

export type UpdateProfessionalData = {
  full_name?: string;
  headline?: string;
  bio?: string;
  email?: string;
  phone?: string;
  website?: string;
  linkedin_url?: string;
  instagram_url?: string;
  city?: string;
  image_url?: string;
  available?: boolean;
  domain_id?: string;
};

export async function updateProfessional(id: string, data: UpdateProfessionalData): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    await db.professional.update({
      where: { id },
      data: {
        ...data,
        updated_at: new Date()
      }
    });

    revalidatePath('/[locale]/adminDashboard/professionals');

    return {
      success: true,
      message: 'Professional updated successfully'
    };
  } catch (error) {
    console.error('Error updating professional:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update professional'
    };
  }
}

export async function getAllDomains(): Promise<{
  id: string;
  name: string;
  icon: string | null;
}[]> {
  const domains = await db.domain.findMany({
    select: {
      id: true,
      name: true,
      icon: true
    },
    orderBy: {
      name: 'asc'
    }
  });

  return domains;
}