import Hero from "@/components/Hero";
import ServiceCategories from "@/components/ServiceCategories";
import HowItWorks from "@/components/HowItWorks";
import FeaturedProfessionals from "@/components/FeaturedProfessionals";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <>
      <Hero />
      <ServiceCategories />
      <HowItWorks />
      <FeaturedProfessionals />
    </>
  );
}
