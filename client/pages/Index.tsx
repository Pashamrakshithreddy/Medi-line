import { CollaborationSection } from "@/pages/home/CollaborationSection";
import { HeroSection } from "@/pages/home/HeroSection";
import { PartnerSection } from "@/pages/home/PartnerSection";
import { TeamSection } from "@/pages/home/TeamSection";
import { WhyChooseSection } from "@/pages/home/WhyChooseSection";

const Index = () => {
  return (
    <div className="bg-background">
      <HeroSection />
      <PartnerSection />
      <CollaborationSection />
      <WhyChooseSection />
      <TeamSection />
    </div>
  );
};

export default Index;
