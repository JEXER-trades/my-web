import { Seo } from "@/components/ui/Seo";
import { useHeaderTheme } from "@/components/layout/HeaderTheme";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { Approach } from "@/components/sections/Approach";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  useHeaderTheme("dark");
  return (
    <>
      <Seo />
      <Hero />
      <Intro />
      <ServicesPreview />
      <FeaturedWork />
      <AboutTeaser />
      <Approach />
      <ContactSection />
    </>
  );
}
