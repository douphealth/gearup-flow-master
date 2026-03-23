import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import FitnessQuiz from "@/components/FitnessQuiz";
import CategoryPillars from "@/components/CategoryPillars";
import FeaturedArticle from "@/components/FeaturedArticle";
import TrendingSection from "@/components/TrendingSection";
import DeepDiveSection from "@/components/DeepDiveSection";
import CalculatorsHub from "@/components/CalculatorsHub";
import CTASection from "@/components/CTASection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader />
      <main>
        <HeroSection />
        <FitnessQuiz />
        <CategoryPillars />
        <FeaturedArticle />
        <TrendingSection />
        <DeepDiveSection />
        <CalculatorsHub />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
