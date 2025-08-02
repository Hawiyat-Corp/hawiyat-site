"use client";
import { useState, useEffect, useRef } from "react";
import StatsComponent from "./StatsComponent";

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Parallax scroll handler
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(1, 1 - rect.top / window.innerHeight)
      );
      setScrollY(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-transparent relative bottom-[100px] md:overflow-visible px-6"
    >
      {/* Subtle Background Effects with Parallax - Now Fully Transparent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Removed background gradient overlay for full transparency */}

        {/* Removed grid pattern background for full transparency */}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Logo Container with Scale and Rotation Parallax */}
        <div className="flex justify-center mb-20">
          <div
            ref={logoRef}
            className={`logo-container ${isVisible ? "logo-visible" : ""}`}
            style={{
              transform: `translateY(${scrollY * 100}px) scale(${
                0.4 + scrollY * 1
              }) rotate(${-85 + scrollY * 90}deg)`,
            }}
          >
            <img
              src="/hawiyat-logo.svg"
              alt="Hawiyat Platform"
              className="logo-image w-96 h-96 md:w-[32rem] md:h-[32rem] object-contain"
            />
          </div>
        </div>

        {/* Stats Component */}
        <div className="relative top-[50px]">
          <StatsComponent isVisible={isVisible} scrollY={scrollY} />
          <div id="Features" className="relative top-[700px]"></div>
        </div>
      </div>

      <style jsx>{`
        /* Logo Animations - Dramatic Scale and Rotation Effect */
        .logo-container {
          opacity: 0;
          transform: translateY(60px) scale(0.3) rotate(-90deg);
          transition: all 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .logo-container.logo-visible {
          opacity: 1;
          transform: translateY(0px) scale(0.4) rotate(-90deg);
        }

        .logo-image {
          transition: filter 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          filter: brightness(0.9) contrast(1.1);
        }

        .logo-image:hover {
          filter: brightness(1.1) contrast(1.2);
        }

        /* Mobile Optimizations */
        @media (max-width: 768px) {
          .logo-image {
            width: 20rem !important;
            height: 20rem !important;
          }
        }

        @media (max-width: 640px) {
          .logo-image {
            width: 16rem !important;
            height: 16rem !important;
          }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .logo-container,
          .logo-image {
            transition-duration: 0.2s;
            animation: none;
          }
        }

        /* Performance - Smooth parallax */
        @media (prefers-reduced-motion: no-preference) {
          .logo-container {
            will-change: transform, opacity;
          }
        }
      `}</style>
    </section>
  );
}
