"use client";

import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function HawiyatCompatibility() {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [scrollY, setScrollY] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const textObserver = new IntersectionObserver(
      ([entry]) => {
        setTextVisible(entry.isIntersecting);
      },
      { threshold: 0.001, rootMargin: "0px 0px -100px 0px" }
    );

    if (textRef.current) textObserver.observe(textRef.current);

    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisibleCards((prev) => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) newSet.add(index);
            else newSet.delete(index);
            return newSet;
          });
        },
        { threshold: 0.3, rootMargin: "-50px 0px -50px 0px" }
      );
      observer.observe(ref);
      return observer;
    });

    return () => {
      textObserver.disconnect();
      observers.forEach((obs) => obs?.disconnect());
    };
  }, []);

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Parallax background elements */}
      <div
        className="absolute inset-0 opacity-10"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        {theme === "dark" ? (
          <>
            <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute top-96 right-20 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
          </>
        ) : (
          <>
            <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-3xl"></div>
            <div className="absolute top-96 right-20 w-96 h-96 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-full blur-3xl"></div>
          </>
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 py-12 lg:py-20">
        <header
          ref={textRef}
          className={`text-center mb-28 transition-all duration-1000 ease-out ${
            textVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
          style={{ transform: `translateY(${Math.min(scrollY * 0.05, 50)}px)` }}
        >
          <h1
            className={`text-3xl w-ull sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 lg:mb-8 tracking-tight leading-tight transition-all duration-1200 ease-out ${
              textVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            } ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            {["Hawiyat", "is", "the", "Home", "of", "All", "Apps."].map(
              (word, idx) => (
                <span
                  key={idx}
                  className={`inline-block mx-1 sm:mx-2 transition-all duration-700 ease-out ${
                    textVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`}
                  style={{
                    transitionDelay: textVisible ? `${idx * 100}ms` : "0ms",
                  }}
                >
                  {word}
                  {idx < 6 ? " " : ""}
                </span>
              )
            )}
          </h1>
          <p
            className={`text-base sm:text-lg md:text-xl max-w-4xl mx-auto font-normal leading-relaxed px-4 transition-all duration-1000 ease-out ${
              textVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            } ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
            style={{ transitionDelay: textVisible ? "800ms" : "0ms" }}
          >
            Hawiyat is the all-in-one home where every application — from
            startup prototypes to enterprise-grade systems — is built, deployed,
            and scaled with power, simplicity, and intelligence.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div
            ref={(el) => {
              cardRefs.current[0] = el;
            }}
            className={`rounded-xl p-6 h-[600px] flex flex-col transition-all duration-700 ease-out ${
              theme === "dark"
                ? "bg-transparent hover:bg-zinc-900/20 hover:border-zinc-700/50"
                : "bg-white/80 hover:bg-white border border-gray-200 hover:border-gray-300"
            } ${
              visibleCards.has(0)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: visibleCards.has(0) ? "0ms" : "0ms",
              transform: `translateY(${
                visibleCards.has(0) ? -Math.min(scrollY * 0.02, 30) : 8
              }px)`,
            }}
          >
            <div className="flex justify-center mb-18">
              <div
                className="w-64 h-50"
                style={{
                  transform: `translateY(${Math.min(scrollY * 0.015, 20)}px)`,
                }}
              >
                <Image
                  src="/chat.png"
                  alt="Deploy your AI agent"
                  width={192}
                  height={192}
                  className="rounded-xl w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col flex-grow justify-center text-start mt-auto">
              <h3
                className={`text-xl sm:text-4xl font-semibold mb-4 leading-tight ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Deploy your AI agent
              </h3>
              <p
                className={`leading-relaxed text-sm sm:text-base ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Deploy your AI agent instantly with Hawiyat for real-time user
                feedback
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div
            ref={(el) => {
              cardRefs.current[1] = el;
            }}
            className={`rounded-xl p-6 h-[600px] flex flex-col transition-all duration-700 ease-out ${
              theme === "dark"
                ? "bg-transparent border-r border-l lg:border-zinc-700/50 hover:bg-zinc-900/20 hover:border-zinc-700/50"
                : "bg-white/80 border-r border-l border-gray-200 lg:border-gray-300 hover:bg-white hover:border-gray-300"
            } ${
              visibleCards.has(1)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: visibleCards.has(1) ? "150ms" : "0ms",
              transform: `translateY(${
                visibleCards.has(1) ? -Math.min(scrollY * 0.03, 30) : 8
              }px)`,
            }}
          >
            <div className="flex justify-center mb-8">
              <div
                className="w-64 h-60"
                style={{
                  transform: `translateY(${Math.min(scrollY * 0.025, 20)}px)`,
                }}
              >
                <Image
                  src="/orbes.png"
                  alt="Compatible with any framework"
                  width={192}
                  height={192}
                  className="rounded-xl w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col flex-grow justify-center text-start mt-auto">
              <h3
                className={`text-xl sm:text-4xl font-semibold mb-4 leading-tight ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Compatible with any framework
              </h3>
              <p
                className={`leading-relaxed text-sm sm:text-base ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                React, Next.js, Vue, Nuxt, SvelteKit, and more—it runs on
                Hawiyat.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div
            ref={(el) => {
              cardRefs.current[2] = el;
            }}
            className={`rounded-xl p-6 h-[600px] flex flex-col transition-all duration-700 ease-out ${
              theme === "dark"
                ? "bg-transparent hover:bg-zinc-900/20 hover:border-zinc-700/50"
                : "bg-white/80 hover:bg-white border border-gray-200 hover:border-gray-300"
            } ${
              visibleCards.has(2)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: visibleCards.has(2) ? "300ms" : "0ms",
              transform: `translateY(${
                visibleCards.has(2) ? -Math.min(scrollY * 0.04, 30) : 8
              }px)`,
            }}
          >
            <div className="flex justify-center mb-4">
              <div
                className="w-64 h-64"
                style={{
                  transform: `translateY(${Math.min(scrollY * 0.035, 20)}px)`,
                }}
              >
                <Image
                  src="/tech.png"
                  alt="Deploy any complex app"
                  width={192}
                  height={192}
                  className="rounded-xl w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col flex-grow justify-center text-start mt-auto">
              <h3
                className={`text-xl sm:text-4xl font-semibold mb-4 leading-tight ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Deploy any complex app
              </h3>
              <p
                className={`leading-relaxed text-sm sm:text-base ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Our Managed Infrastructure enables you to spend more time
                building your product.
              </p>
            </div>
          </div>
          <div
            className={`absolute z-[0] mx-auto mt-auto -bottom-[500px] h-full ${
              theme === "dark"
                ? "opacity-30 md:opacity-100"
                : "opacity-20 md:opacity-50"
            }`}
          >
            <Image
              className="w-full h-full object-cover"
              src="/grid-mesh.svg"
              width={2000}
              height={2000}
              alt="Grid mesh"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
