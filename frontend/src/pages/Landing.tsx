import { HeroHeader } from "@/components/landing/header";
import HeroSection from "@/components/landing/hero";

const Landing = () => {
  return (
    <div className="max-w-7xl mx-auto relative">
      <HeroHeader />
      <HeroSection />
    </div>
  );
};

export default Landing;
