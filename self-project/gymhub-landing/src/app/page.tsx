import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { TechStack } from "@/components/sections/tech-stack";
import { Roadmap } from "@/components/sections/roadmap";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <TechStack />
      <Roadmap />
      <CTA />
      <Footer />
    </main>
  );
}
