"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";

export type Category = {
  id: string;
  name: string;
  description: string | null;
  status: string;
  icon: string | null;
  views: number;
  _count: {
    professionals: number;
  };
  created_at: Date;
  
};


export async function getCategories(): Promise<Category[]> {
  const domains = await db.domain.findMany({
    orderBy: {
      created_at: 'desc'
    },
    include: {
      _count: {
        select: {
          professionals: true
        }
      }
    }
  });

  return domains;
}





export type CSVCategory = {
  name: string;
  description?: string;
  status: string;
  icon?: string;
};

export type ValidationError = {
  row: number;
  field: string;
  message: string;
};

export async function validateCategories(categories: CSVCategory[]): Promise<{
  valid: boolean;
  errors: ValidationError[];
}> {
  const errors: ValidationError[] = [];
  const existingNames = await db.domain.findMany({
    select: { name: true }
  });
  const existingNameSet = new Set(existingNames.map(d => d.name.toLowerCase()));

  categories.forEach((category, index) => {
    const row = index + 2; // +2 because of header row and 0-index

    // Validate required fields
    if (!category.name || category.name.trim() === '') {
      errors.push({
        row,
        field: 'name',
        message: 'Name is required'
      });
    }

    // Validate status
    if (!category.status || !['active', 'inactive'].includes(category.status.toLowerCase())) {
      errors.push({
        row,
        field: 'status',
        message: 'Status must be "active" or "inactive"'
      });
    }

    // Check for duplicate names in database
    if (category.name && existingNameSet.has(category.name.toLowerCase())) {
      errors.push({
        row,
        field: 'name',
        message: 'Category name already exists in database'
      });
    }

    // Check for duplicate names in CSV
    const duplicateInCSV = categories.findIndex((c, i) => 
      i !== index && c.name.toLowerCase() === category.name.toLowerCase()
    );
    if (duplicateInCSV !== -1) {
      errors.push({
        row,
        field: 'name',
        message: `Duplicate name found in row ${duplicateInCSV + 2}`
      });
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}

export async function insertCategories(categories: CSVCategory[]): Promise<{
  success: boolean;
  count: number;
  message: string;
}> {
  try {
    const result = await db.domain.createMany({
      data: categories.map(cat => ({
        name: cat.name.trim(),
        description: cat.description?.trim() || null,
        status: cat.status.toLowerCase(),
        icon: cat.icon?.trim() || null,
      })),
      skipDuplicates: true
    });

    revalidatePath('/[locale]/adminDashboard/categories');
    
    return {
      success: true,
      count: result.count,
      message: `Successfully inserted ${result.count} categories`
    };
  } catch (error) {
    console.error('Error inserting categories:', error);
    return {
      success: false,
      count: 0,
      message: 'Failed to insert categories. Please try again.'
    };
  }
}

export type UpdateCategoryData = {
  name?: string;
  description?: string;
  status?: string;
  icon?: string;
};

export async function updateCategory(id: string, data: UpdateCategoryData): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    await db.domain.update({
      where: { id },
      data: {
        ...data,
        updated_at: new Date()
      }
    });

    revalidatePath('/[locale]/adminDashboard/categories');

    return {
      success: true,
      message: 'Category updated successfully'
    };
  } catch (error) {
    console.error('Error updating category:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update category'
    };
  }
}

export async function deleteCategory(id: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    // Check if category has professionals
    const category = await db.domain.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            professionals: true
          }
        }
      }
    });

    if (category && category._count.professionals > 0) {
      return {
        success: false,
        message: `Cannot delete category. It has ${category._count.professionals} associated professional(s).`
      };
    }

    await db.domain.delete({
      where: { id }
    });

    revalidatePath('/[locale]/adminDashboard/categories');

    return {
      success: true,
      message: 'Category deleted successfully'
    };
  } catch (error) {
    console.error('Error deleting category:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete category'
    };
  }
}