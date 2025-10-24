
import {
  getActiveCategories,
  getDistinctCategoriesWithCount,
} from "@/actions/categories";
import CategoriesPage from "./View";

export default async function Page() {
  const [categoriesData, distinctCategories] = await Promise.all([
    getActiveCategories(),
    getDistinctCategoriesWithCount(),
  ]);

  return (
    <CategoriesPage
      categoriesData={categoriesData}
      distinctCategories={distinctCategories}
    />
  );
}
