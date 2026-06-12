import HeroSection from "@/components/sections/HeroSection";
import AboutTeaser from "@/components/sections/AboutTeaser";
import ServicesTeaser from "@/components/sections/ServicesTeaser";
import VentureSpotlight from "@/components/sections/VentureSpotlight";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutTeaser />
      <ServicesTeaser />
      <VentureSpotlight />
      <CTASection />
    </>
  );
}