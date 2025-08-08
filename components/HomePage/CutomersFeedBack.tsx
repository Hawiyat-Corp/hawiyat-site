"use client";
import { useTheme } from "@/context/ThemeContext";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

const CustomerFeedback = () => {
  const [visibleCards, setVisibleCards] = useState(new Set<number>());
  const [scrollY, setScrollY] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);
  const lastScrollYRef = useRef(0);
  const { theme, toggleTheme } = useTheme();

  // Memoize feedback data to prevent recreation
  const feedbackData = useMemo(
    () => [
      {
        name: "Jim Kring",
        feedback:
          "Great software! Deploying from Docker Compose is a breeze, and the UI is simple yet powerful—I'd give it 6/5 stars if I could.",
      },
      {
        name: "Kamal Panara",
        feedback:
          "Amazing and easy to use! Hawiyat made my app and website deployment effortless.",
      },
      {
        name: "Théo Dulieu",
        feedback:
          "As a PHP developer using Docker, I'm impressed—supports Nixpacks, Buildpacks, custom Dockerfiles, and full Compose out of the box.",
      },
      {
        name: "Moonou Long",
        feedback:
          "Lightweight and intuitive: the UI and deployment process hit the perfect balance—I've been running multiple Next.js apps smoothly for months.",
      },
      {
        name: "StuttgarterDotNet",
        feedback:
          "I switched from Coolify—Hawiyat's UI feels more intuitive and developer‑focused, making container and multi‑server management a joy.",
      },
      {
        name: "benbristow",
        feedback:
          "Similar to Vercel but with a slick web UI and built‑in Let's Encrypt support—makes deploying Docker solutions so much easier.",
      },
    ],
    []
  );

  // Memoize observer options
  const textObserverOptions = useMemo(
    () => ({
      threshold: 0.001,
      rootMargin: "0px 0px -100px 0px",
    }),
    []
  );

  const cardObserverOptions = useMemo(
    () => ({
      threshold: 0.001,
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
      const obs = new IntersectionObserver(
        createCardObserverCallback(index),
        cardObserverOptions
      );
      obs.observe(ref);
      return obs;
    });

    return () => {
      textObserver.disconnect();
      observers.forEach((o) => o?.disconnect());
    };
  }, [
    textObserverCallback,
    textObserverOptions,
    cardObserverOptions,
    createCardObserverCallback,
  ]);

  // Memoize parallax transform styles
  const parallaxBlobStyle = useMemo(
    () => ({
      transform: `translateY(${scrollY * 0.2}px)`,
    }),
    [scrollY]
  );

  const headerParallaxStyle = useMemo(
    () => ({
      transform: `translateY(${Math.min(scrollY * 0.03, 40)}px)`,
    }),
    [scrollY]
  );

  // Memoize card transform styles
  const getCardStyle = useCallback(
    (index: number, isVisible: boolean) => ({
      transitionDelay: `${isVisible ? index * 150 : 0}ms`,
      transform: isVisible
        ? `translateY(${-Math.min(scrollY * 0.01 * (index + 1), 20)}px)`
        : "translateY(12px)",
    }),
    [scrollY]
  );

  // Memoize title words for animation
  const titleWords = useMemo(() => ["Our", "customer", "feedback"], []);

  return (
    <div
      className={`relative min-h-screen py-20 overflow-hidden ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      {/* Optimized parallax blobs */}
      <div
        className={`absolute inset-0 transform transition-transform duration-700 ease-out will-change-transform ${
          theme === "dark" ? "opacity-10" : "opacity-5"
        }`}
        style={parallaxBlobStyle}
      >
        <div
          className={`absolute top-32 left-16 w-72 h-72 rounded-full blur-3xl transform-gpu ${
            theme === "dark"
              ? "bg-gradient-to-br from-blue-500/15 to-purple-500/15"
              : "bg-gradient-to-br from-blue-100/30 to-purple-100/30"
          }`}
        />
        <div
          className={`absolute bottom-32 right-24 w-80 h-80 rounded-full blur-3xl transform-gpu ${
            theme === "dark"
              ? "bg-gradient-to-br from-purple-500/15 to-pink-500/15"
              : "bg-gradient-to-br from-purple-100/30 to-pink-100/30"
          }`}
        />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-start min-h-[90vh] px-6 text-center">
        <div
          id="feedback"
          className="max-w-6xl mx-auto space-y-8 md:space-y-12"
        >
          {/* Optimized heading */}
          <div
            ref={textRef}
            className={`space-y-6 text-start transition-all duration-700 ease-out will-change-transform ${
              textVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={headerParallaxStyle}
          >
            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight transition-all duration-1000 ease-out ${
                textVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              {titleWords.map((word, idx) => (
                <span
                  key={idx}
                  className={`inline-block mr-4 transition-all duration-800 ease-out will-change-transform ${
                    textVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`}
                  style={{
                    transitionDelay: textVisible ? `${idx * 200}ms` : "0ms",
                  }}
                >
                  <span
                    className={`bg-clip-text text-transparent ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-white via-white to-white/70"
                        : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700"
                    }`}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          {/* Optimized feedback cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-32">
            {feedbackData.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`relative rounded-lg p-6 text-left cursor-default
                transform transition-all duration-200 ease-out will-change-transform
                ${
                  visibleCards.has(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }
                ${
                  theme === "dark"
                    ? "bg-gray-900/50 hover:bg-gray-800/50"
                    : "bg-white/90 hover:bg-white border border-gray-200"
                }`}
                style={getCardStyle(index, visibleCards.has(index))}
              >
                <div className="relative z-10">
                  <div
                    className={`text-lg font-medium mb-4 transition-all duration-700 ease-out will-change-transform ${
                      visibleCards.has(index)
                        ? "translate-x-0 opacity-100"
                        : "translate-x-4 opacity-0"
                    } ${theme === "dark" ? "text-white/70" : "text-gray-600"}`}
                    style={{
                      transitionDelay: `${
                        visibleCards.has(index) ? index * 150 + 200 : 0
                      }ms`,
                    }}
                  >
                    {item.name}
                  </div>
                  <p
                    className={`font-extrabold text-2xl leading-relaxed transition-all duration-800 ease-out will-change-transform ${
                      visibleCards.has(index)
                        ? "translate-x-0 opacity-100"
                        : "translate-x-6 opacity-0"
                    } ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    style={{
                      transitionDelay: `${
                        visibleCards.has(index) ? index * 150 + 400 : 0
                      }ms`,
                    }}
                  >
                    {item.feedback}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <style jsx>{`
        /* Performance optimizations */
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Optimize text animations */
        .will-change-transform {
          contain: layout style paint;
        }

        /* Optimize blur effects */
        .blur-3xl {
          filter: blur(64px);
          will-change: transform;
        }

        /* Performance for gradient backgrounds */
        .bg-gradient-to-br {
          contain: paint;
        }

        /* Optimize gradient text */
        .bg-gradient-to-r {
          contain: paint;
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

        /* Performance for grid layout */
        .grid {
          contain: layout;
        }

        /* Optimize staggered animations */
        .transition-all {
          contain: layout style;
        }
      `}</style>
    </div>
  );
};

export default CustomerFeedback;
