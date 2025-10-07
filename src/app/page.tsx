import { AppNavbar } from "@/components/Header";
import Hero from "@/components/Hero";
import ServiceCategories from "@/components/ServiceCategories";
import HowItWorks from "@/components/HowItWorks";
import FeaturedProfessionals from "@/components/FeaturedProfessionals";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppNavbar />
      <Hero />
      <ServiceCategories />
      <HowItWorks />
      <FeaturedProfessionals />
      <Footer />
    </div>
  );
}
