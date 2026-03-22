import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import CategoryPillars from "@/components/CategoryPillars";
import FeaturedArticle from "@/components/FeaturedArticle";
import TrendingSection from "@/components/TrendingSection";
import DeepDiveSection from "@/components/DeepDiveSection";
import ToolsSection from "@/components/ToolsSection";
import CTASection from "@/components/CTASection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader />
      <main>
        <HeroSection />
        <CategoryPillars />
        <FeaturedArticle />
        <TrendingSection />
        <DeepDiveSection />
        <ToolsSection />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
