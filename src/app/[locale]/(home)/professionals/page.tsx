
import { getActiveProfessionals, getDistinctLocations, getProfessionalCategories } from "@/actions/professionals"
import ProfessionalsPage from "./View";


export default async function Page() {
          const [professionalsData, categoriesData, locationsData] = await Promise.all([
          getActiveProfessionals(),
          getProfessionalCategories(),
          getDistinctLocations()
        ]);





  return (
    <ProfessionalsPage
      professionalsData={professionalsData}
      categoriesData={categoriesData}
      locationsData={locationsData}
    />
  );
}