import { CursorSpotlight } from '@/components/CursorSpotlight';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { RoadmapSection } from '@/components/sections/RoadmapSection';
import { CTASection } from '@/components/sections/CTASection';
import { FooterSection } from '@/components/sections/FooterSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0e27] text-white">
      <CursorSpotlight />
      <HeroSection />
      <FeaturesSection />
      <TechStackSection />
      <RoadmapSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}
