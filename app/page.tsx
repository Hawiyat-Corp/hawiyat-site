import HeroSection from "@/components/HomePage/HeroSection";
import StatsSection from "@/components/HomePage/StatsSection";
import HawiyatCompatibility from "@/components/HomePage/hawiyatCompatibilty";
import UnifiedSupportFeatures from "@/components/HomePage/SuportFeaturesSection";
import CustomerFeedback from "@/components/HomePage/CutomersFeedBack";
import ExtraFeatures from "@/components/HomePage/ExtraFeatures";
import Footer from "@/components/Footer";
export default function HomePage() {
  return (
    <main className="overflow-x-hidden bg-white dark:bg-black">
      <HeroSection />
      <StatsSection />
      <UnifiedSupportFeatures />
      <HawiyatCompatibility />
      <CustomerFeedback />
      <ExtraFeatures />
      <Footer />

      {/* Add other sections here as needed */}
    </main>
  );
}
