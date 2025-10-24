import { getCategoryById } from "@/actions/categories";
import {
  getDistinctLocations,
  getProfessionalsByDomainId,
} from "@/actions/professionals";
import CategoryViewPage from "./View";
import { ChevronLeft, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page({ params }: { params: { slug: string } }) {
  const categoryData = await getCategoryById(params.slug);
  if (!categoryData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <Search className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Category not found
          </h1>
          <p className="text-muted-foreground">
            The category you're looking for doesn't exist
          </p>
          <Link href="/categories" className="flex items-center justify-center">
            <Button variant={"outline"}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Categories
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  const professionalsData = await getProfessionalsByDomainId(categoryData.id);
  const locationsData = await getDistinctLocations();

  return (
    <CategoryViewPage
      categoryData={categoryData}
      professionalsData={professionalsData}
      locationsData={locationsData}
    />
  );
}
