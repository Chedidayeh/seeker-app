
import { getCategories } from './actions/actions';
import View from './View';




export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <View categories={categories} />
    
  );
}
