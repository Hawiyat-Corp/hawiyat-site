"use client";

import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

export default function ExtraFeatures() {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [scrollY, setScrollY] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef(null);
  const rafRef = useRef<number>(0);
  const lastScrollYRef = useRef(0);
  const { theme, toggleTheme } = useTheme();

  // Memoize observer options
  const textObserverOptions = useMemo(
    () => ({
      threshold: 0.0001,
      rootMargin: "0px 0px -100px 0px",
    }),
    []
  );

  const cardObserverOptions = useMemo(
    () => ({
      threshold: 0.3,
      rootMargin: "-50px 0px -50px 0px",
    }),
    []
  );

  // Optimized scroll handler with RAF throttling
  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const newScrollY = window.scrollY;

      // Only update if change is significant
      if (Math.abs(newScrollY - lastScrollYRef.current) > 1) {
        setScrollY(newScrollY);
        lastScrollYRef.current = newScrollY;
      }
    });
  }, []);

  // Memoized text observer callback
  const textObserverCallback = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      setTextVisible(entry.isIntersecting);
    },
    []
  );

  // Memoized card observer callback factory
  const createCardObserverCallback = useCallback(
    (index: number) =>
      ([entry]: IntersectionObserverEntry[]) => {
        setVisibleCards((prev) => {
          const newSet = new Set(prev);
          if (entry.isIntersecting) {
            newSet.add(index);
          } else {
            newSet.delete(index);
          }
          return newSet;
        });
      },
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    const textObserver = new IntersectionObserver(
      textObserverCallback,
      textObserverOptions
    );
    const currentTextRef = textRef.current;

    if (currentTextRef) {
      textObserver.observe(currentTextRef);
    }

    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        createCardObserverCallback(index),
        cardObserverOptions
      );
      observer.observe(ref);
      return observer;
    });

    return () => {
      textObserver.disconnect();
      observers.forEach((obs) => obs?.disconnect());
    };
  }, [
    textObserverCallback,
    textObserverOptions,
    cardObserverOptions,
    createCardObserverCallback,
  ]);

  // Memoize parallax transform styles
  const parallaxBackgroundStyle = useMemo(
    () => ({
      transform: `translateY(${scrollY * 0.3}px)`,
    }),
    [scrollY]
  );

  // Memoize card transform styles
  const getCardStyle = useCallback(
    (index: number, isVisible: boolean) => ({
      transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
      transform: `translateY(${
        isVisible ? -Math.min(scrollY * (0.02 + index * 0.01), 30) : 8
      }px)`,
    }),
    [scrollY]
  );

  // Memoize image parallax styles
  const getImageStyle = useCallback(
    (multiplier: number) => ({
      transform: `translateY(${Math.min(scrollY * multiplier, 20)}px)`,
    }),
    [scrollY]
  );

  const cardData = useMemo(
    () => [
      {
        src: "/suport.png",
        alt: "24/7 customer support",
        title: "24/7 customer support",
        description:
          "Share your work like its already in production and test changes without leaving the browser. Edit content directly inside Preview Deployments.",
        imageClass: "w-58 h-58",
        marginBottom: "mb-18",
      },
      {
        src: "/collab.png",
        alt: "Collaboration",
        title: "Collaboration",
        description:
          "Deliver expert work faster by bringing collaborators together from anywhere in the organization. Comment directly on copy and designs as you review from your users point of view.",
        imageClass: "w-58 h-62",
        marginBottom: "mb-20",
        borderClass: "border-r border-l",
      },
      {
        src: "/migrate.png",
        alt: "Easy to migrate",
        title: "Easy to migrate",
        description:
          "Fast builds mean anyone can iterate at any time. Instant rollbacks keep breaking changes a click away from being fixed. Go ahead, deploy on Fridays.",
        imageClass: "w-60 h-65",
        marginBottom: "mb-10",
      },
    ],
    []
  );

  return (
    <div
      className={`relative overflow-hidden ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Optimized parallax background elements */}
      <div
        className={`absolute inset-0 will-change-transform ${
          theme === "dark" ? "opacity-10" : "opacity-5"
        }`}
        style={parallaxBackgroundStyle}
      >
        <div
          className={`absolute top-20 left-10 w-58 h-64 rounded-full blur-3xl transform-gpu ${
            theme === "dark"
              ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
              : "bg-gradient-to-br from-blue-100/30 to-purple-100/30"
          }`}
        ></div>
        <div
          className={`absolute top-96 right-20 w-96 h-96 rounded-full blur-3xl transform-gpu ${
            theme === "dark"
              ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
              : "bg-gradient-to-br from-purple-100/30 to-pink-100/30"
          }`}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 py-12 lg:py-20">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`rounded-xl p-6 h-[600px] flex flex-col transition-all duration-700 ease-out will-change-transform ${
                visibleCards.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } ${
                theme === "dark"
                  ? `bg-transparent ${
                      card.borderClass || ""
                    } hover:bg-zinc-900/20 hover:border-zinc-700/50`
                  : `bg-white/90 ${
                      card.borderClass
                        ? "border-r border-l border-gray-200"
                        : ""
                    } hover:bg-white hover:border-gray-300`
              }`}
              style={getCardStyle(index, visibleCards.has(index))}
            >
              <div className={`flex justify-center ${card.marginBottom}`}>
                <div
                  className={`${card.imageClass} will-change-transform`}
                  style={getImageStyle(0.015 + index * 0.01)}
                >
                  <Image
                    src={card.src}
                    alt={card.alt}
                    width={192}
                    height={192}
                    className="rounded-xl w-full h-full object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
              <div className="flex flex-col flex-grow justify-center text-start mt-auto">
                <h3
                  className={`text-xl sm:text-3xl font-semibold mb-4 leading-tight ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`leading-relaxed text-sm sm:text-base ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {card.description}
                </p>
              </div>
            </div>
          ))}

          {/* Optimized grid mesh elements */}
          <div
            className={`absolute left-[1000px] -top-[200px] z-[0] w-[1000px] h-[1000px] will-change-transform ${
              theme === "dark"
                ? "opacity-30 md:opacity-100"
                : "opacity-20 md:opacity-50"
            }`}
          >
            <Image
              className="w-full h-full object-cover transform-gpu"
              src="/grid-mesh.svg"
              width={1000}
              height={1000}
              alt="Grid mesh left"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div
            className={`absolute right-[1000px] -top-[200px] z-[0] w-[1000px] h-[1000px] will-change-transform ${
              theme === "dark"
                ? "opacity-30 md:opacity-100"
                : "opacity-20 md:opacity-50"
            }`}
          >
            <Image
              className="w-full h-full object-cover transform-gpu"
              src="/grid-mesh.svg"
              width={1000}
              height={1000}
              alt="Grid mesh right"
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>
      </div>

      <style jsx>{`
        /* Performance optimizations */
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Optimize hover transitions */
        .hover\\:bg-zinc-900\\/20:hover {
          will-change: background-color, border-color;
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }

          .will-change-transform {
            will-change: auto;
          }
        }

        /* Optimize for high refresh rate displays */
        @media (min-resolution: 120dpi) {
          .will-change-transform {
            contain: layout style paint;
          }
        }
      `}</style>
    </div>
  );
}
