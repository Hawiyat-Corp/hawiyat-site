"use client"
import { useTheme } from "@/context/ThemeContext"
import { useEffect, useState } from "react"
import HeroSection from "@/components/HomePage/HeroSection";
import StatsSection from "@/components/HomePage/StatsSection";
import HawiyatCompatibility from "@/components/HomePage/hawiyatCompatibilty";
import UnifiedSupportFeatures from "@/components/HomePage/SuportFeaturesSection";
import CustomerFeedback from "@/components/HomePage/CutomersFeedBack";
import ExtraFeatures from "@/components/HomePage/ExtraFeatures";
import Footer from "@/components/Footer";

export default function HomePage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Show loading state or return null until theme is loaded
  if (!mounted) {
    return (
      <main className="overflow-x-hidden min-h-screen  dark:bg-black">
        {/* Optional: Add a subtle loading indicator */}
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="overflow-x-hidden dark:bg-black bg-white">
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