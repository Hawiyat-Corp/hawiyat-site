"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  // Memoize static content to prevent unnecessary re-renders
  const staticContent = useMemo(
    () => ({
      badge: "Bring your business to the best scale",
      title: "Hawiyat Platform",
      subtitle: ["Build", "Deploy", "Scale"],
      description:
        "Hawiyat is the first AI-powered PaaS in the World that unifies DevOps, Cloud, Security and automation in one seamless platform",
    }),
    []
  );

  useEffect(() => {
    setMounted(true);

    // Use passive listeners for better performance
    const handleMouseMove = (e: MouseEvent) => {
      // Use CSS custom properties for smooth hardware-accelerated animations
      document.documentElement.style.setProperty(
        "--mouse-x",
        `${(e.clientX / window.innerWidth) * 100}%`
      );
      document.documentElement.style.setProperty(
        "--mouse-y",
        `${(e.clientY / window.innerHeight) * 100}%`
      );
    };

    const handleScroll = () => {
      // Use CSS custom property for scroll-based effects
      document.documentElement.style.setProperty(
        "--scroll-y",
        `${window.scrollY}px`
      );
    };

    // Use passive listeners and throttle for performance
    let ticking = false;
    const throttledMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleMouseMove(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    let scrollTicking = false;
    const throttledScroll = () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          handleScroll();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    window.addEventListener("mousemove", throttledMouseMove, { passive: true });
    window.addEventListener("scroll", throttledScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      window.removeEventListener("scroll", throttledScroll);
    };
  }, []);

  // Memoize loading component
  const loadingComponent = useMemo(
    () => (
      <div className="min-h-[90vh] bg-white dark:bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 dark:border-cyan-400"></div>
      </div>
    ),
    []
  );

  if (!mounted) {
    return loadingComponent;
  }

  return (
    <section className="min-h-[90vh] bg-white dark:bg-black relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Enhanced Glowing Ellipse */}
        <div className="absolute w-[3000px] bottom-0 right-[-500px] flex items-center justify-center">
          <Image
            src="/ell.svg"
            alt="Ellipse Background"
            width={3000}
            height={2000}
            className="w-full h-auto ellipse-optimized"
            priority
            loading="eager"
          />
        </div>

        {/* Enhanced Grid Mesh */}
        <div className="absolute z-[0] top-0 w-full h-full">
          <Image
            className="w-full h-full object-cover"
            src="/grid-mesh.svg"
            width={2000}
            height={2000}
            alt="Grid mesh"
            loading="eager"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 dark:to-black/20 gradient-breathing" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-6 text-center">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
          {/* Badge */}
          <div className="badge-container">
            <Sparkles className="w-4 h-4 mr-2 sparkle-spin" />
            {staticContent.badge}
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight main-title">
              {/* title-gradient replaced by Tailwind */}
              <span className="bg-gradient-to-r from-black via-black/80 to-black/70 dark:from-white dark:via-white/80 dark:to-white/70 bg-clip-text text-transparent transition-all">
                {staticContent.title}
              </span>
              <br />
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-4 space-x-2 sm:space-x-4">
                <span className="subtitle-word bg-gradient-to-r from-black to-black/80 dark:from-white dark:to-white/80 bg-clip-text text-transparent">
                  {staticContent.subtitle[0]}
                </span>
                <span className="subtitle-word bg-gradient-to-r from-black/80 to-black/60 dark:from-white/80 dark:to-white/60 bg-clip-text text-transparent">
                  {staticContent.subtitle[1]}
                </span>
                <span className="subtitle-word scale-word">
                  {staticContent.subtitle[2]}
                </span>
              </div>
            </h1>

            {/* Description */}
            <p className="description-text text-black/80 dark:text-white hover:text-black/90 dark:hover:text-white/90 transition-colors">
              {staticContent.description}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <Link href="/waitlist">
              <button className="cta-primary">
                <span className="relative z-10 flex items-center">
                  Get Started
                  <ArrowRight className="w-5 h-5 sm:w-5 sm:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </Link>

            <Link href="/support">
              <button className="border-black/30 border-2 cta-secondary  dark:border-white/30 text-black  dark:text-white">
                Go to Support
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Optimized CSS with hardware acceleration */}
      <style jsx>{`
        /* Hardware acceleration and performance optimizations */
        .ellipse-optimized {
          opacity: 0;
          transform: translateY(30px) scale(0.95) translateZ(0);
          filter: drop-shadow(0 0 0px rgba(6, 182, 212, 0));
          animation: ellipse-opacity-reveal 3s ease-out 0.2s both,
            ellipse-gentle-float 6s ease-in-out infinite 3.2s;
          will-change: transform, opacity, filter;
          backface-visibility: hidden;
        }

        /* Optimized badge */
        .badge-container {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1.25rem;
          margin: 4rem 0 2rem;
          border-radius: 9999px;
          background-color: rgba(6, 182, 212, 0.1);
          color: rgb(6, 182, 212);
          border: 1px solid rgba(6, 182, 212, 0.2);
          backdrop-filter: blur(4px);
          transition: all 0.5s ease;
          animation: fade-in-up 1s ease-out 0.2s both;
          will-change: transform;
          font-size: 1rem;
        }

        @media (min-width: 768px) {
          .badge-container {
            font-size: 1.25rem;
            margin: 4.5rem 0 2rem;
          }
        }

        @media (min-width: 1024px) {
          .badge-container {
            margin: 6rem 0 2rem;
          }
        }

        .badge-container:hover {
          transform: scale(1.05) translateZ(0);
          background-color: rgba(6, 182, 212, 0.2);
          border-color: rgba(6, 182, 212, 0.4);
        }

        .sparkle-spin {
          animation: spin 3s linear infinite;
          will-change: transform;
        }

        .main-title {
          animation: fade-in-up 1.2s ease-out 0.4s both;
          will-change: transform, opacity;
        }

        .title-gradient {
          background: linear-gradient(
            to right,
            white,
            white,
            rgba(255, 255, 255, 0.7)
          );
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          transition: all 1s ease;
        }

        .dark .title-gradient {
          background: linear-gradient(
            to right,
            white,
            white,
            rgba(255, 255, 255, 0.7)
          );
        }

        .subtitle-word {
          display: inline-block;
          transition: transform 0.7s ease;
          will-change: transform;
        }

        .subtitle-word:hover {
          transform: scale(1.1) translateZ(0);
        }

        /* Subtitles */
        .subtitle-build {
          background: linear-gradient(
            to right,
            white,
            rgba(255, 255, 255, 0.9)
          );
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: fade-in-left 1s ease-out 0.8s both;
        }

        .dark .subtitle-build {
          background: linear-gradient(
            to right,
            white,
            rgba(255, 255, 255, 0.9)
          );
        }

        .subtitle-deploy {
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.8),
            rgba(255, 255, 255, 0.7)
          );
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: fade-in-up 1s ease-out 1s both;
        }

        .dark .subtitle-deploy {
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.8),
            rgba(255, 255, 255, 0.7)
          );
        }

        /* Scale word */
        .scale-word {
          background: linear-gradient(
            90deg,
            #22d3ee,
            #06b6d4,
            #0891b2,
            #10b981,
            #059669,
            #22d3ee
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: fade-in-right 1s ease-out 1.2s both,
            smooth-flow 4s linear infinite 2s;
          will-change: background-position;
        }

        /* Description text - black in light, white in dark */
        .description-text {
          font-size: 1.25rem;
          line-height: 1.6;
          max-width: 48rem;
          margin: 0 auto;
          transition: color 1s ease;
          animation: fade-in-up 1s ease-out 1.4s both;
          will-change: color;
        }

        .dark .description-text {
          font-size: 1.25rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          max-width: 48rem;
          margin: 0 auto;
          transition: color 1s ease;
          animation: fade-in-up 1s ease-out 1.4s both;
          will-change: color;
        }

        @media (min-width: 640px) {
          .description-text {
            font-size: 1.5rem;
          }
        }

        .description-text:hover {
        }

        .dark .description-text:hover {
        }

        /* CTA buttons */
        .cta-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: center;
          animation: fade-in-up 1s ease-out 1.6s both;
          will-change: transform, opacity;
        }

        @media (min-width: 640px) {
          .cta-buttons {
            flex-direction: row;
            gap: 1.5rem;
          }
        }

        .cta-primary,
        .cta-secondary {
          width: 100%;
          height: 3.5rem;
          padding: 0 2rem;
          font-size: 1.125rem;
          font-weight: 500;
          border-radius: 1rem;
          cursor: pointer;
          transition: all 0.5s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          will-change: transform;
          backface-visibility: hidden;
        }

        @media (min-width: 640px) {
          .cta-primary,
          .cta-secondary {
            width: auto;
            padding: 0 2.5rem;
          }
        }

        .cta-primary {
          background: linear-gradient(to right, #22d3ee, #14b8a6);
          color: rgb(15, 23, 42);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .cta-primary:hover {
          background: linear-gradient(to right, #06b6d4, #0d9488);
          transform: scale(1.05) translateZ(0);
        }

        .cta-secondary {
          background: transparent;
          backdrop-filter: blur(4px);
          transition: border-color 0.3s ease, background-color 0.3s ease;
        }

        .cta-secondary:hover {
          background-color: rgba(0, 0, 0, 0.05);
          transform: scale(1.05) translateZ(0);
        }

        .dark .cta-secondary:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }

        /* Animations */
        @keyframes ellipse-opacity-reveal {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95) translateZ(0);
            filter: drop-shadow(0 0 0px rgba(6, 182, 212, 0));
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1) translateZ(0);
            filter: drop-shadow(0 0 100px rgba(6, 182, 212, 0.4));
          }
        }

        @keyframes ellipse-gentle-float {
          0%,
          100% {
            transform: translateY(0px) scale(1) translateZ(0);
            filter: drop-shadow(0 0 100px rgba(6, 182, 212, 0.4));
          }
          50% {
            transform: translateY(-8px) scale(1.01) translateZ(0);
            filter: drop-shadow(0 0 120px rgba(6, 182, 212, 0.5));
          }
        }

        @keyframes smooth-flow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px) translateZ(0);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateZ(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px) translateZ(0);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateZ(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px) translateZ(0);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateZ(0);
          }
        }

        .gradient-breathing {
          opacity: 0;
          animation: gradient-fade-in 1.5s ease-out 1.5s both;
        }

        @keyframes gradient-fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .ellipse-optimized {
            animation: ellipse-opacity-simple 2s ease-out 0.2s both;
          }
          .scale-word {
            background: linear-gradient(90deg, #22d3ee, #10b981);
            background-clip: text;
            -webkit-background-clip: text;
            animation: fade-in-right 1s ease-out 1.2s both;
          }
          .sparkle-spin {
            animation: none;
          }
        }

        @keyframes ellipse-opacity-simple {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* GPU acceleration hints */
        .main-title,
        .badge-container,
        .cta-buttons,
        .description-text {
          transform: translateZ(0);
        }
      `}</style>
    </section>
  );
}
