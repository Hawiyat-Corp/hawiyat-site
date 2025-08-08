"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  RefreshCw,
  Database,
  Code,
  Settings,
  Eye,
  Shield,
  Box,
  Bot,
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
export default function UnifiedSupportFeatures() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [supportVisible, setSupportVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const supportRef = useRef(null);
  const featuresRef = useRef(null);

  const features = [
    {
      icon: <BarChart3 className="w-7 h-7" />,
      title: "Global Edge Network",
      description:
        "Deploy your applications to our global edge network for fast performance worldwide.",
    },
    {
      icon: <RefreshCw className="w-7 h-7" />,
      title: "Continuous Deployment",
      description:
        "Automatically deploy your latest code with every push to your connected repository.",
    },
    {
      icon: <Database className="w-7 h-7" />,
      title: "Managed Databases",
      description:
        "Easily provision and securely manage scalable databases for your applications.",
    },
    {
      icon: <Code className="w-7 h-7" />,
      title: "Serverless Functions",
      description:
        "Build and deploy serverless functions that scale automatically with your traffic.",
    },
    {
      icon: <Settings className="w-7 h-7" />,
      title: "Environment Variables",
      description:
        "Securely manage environment variables and secrets for your applications.",
    },
    {
      icon: <Eye className="w-7 h-7" />,
      title: "Preview Deployments",
      description:
        "Automatically generate preview environments for every pull request efficiently and reliably.",
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "DDoS Protection",
      description:
        "Enterprise-grade security with advanced DDoS mitigation to keep your applications safe and running.",
    },
    {
      icon: <Box className="w-7 h-7" />,
      title: "Containerization",
      description:
        "Deploy your applications in isolated containers for better resource utilization and security.",
    },
    {
      icon: <Bot className="w-7 h-7" />,
      title: "AI Deployment Agent",
      description:
        "Intelligent AI assistant that helps optimize deployments and troubleshoot issues automatically.",
    },
  ];

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const supportObserver = new IntersectionObserver(
      ([entry]) => {
        setSupportVisible(entry.isIntersecting);
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    const featuresObserver = new IntersectionObserver(
      ([entry]) => {
        setFeaturesVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    if (supportRef.current) supportObserver.observe(supportRef.current);
    if (featuresRef.current) featuresObserver.observe(featuresRef.current);

    return () => {
      supportObserver.disconnect();
      featuresObserver.disconnect();
    };
  }, [mounted]);

  const getParallaxOffset = (speed = 1) => {
    return scrollY * speed * 0.5;
  };
  const { theme, toggleTheme } = useTheme();
  if (!mounted) {
    return (
      <div className=" bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden md:overflow-visible ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      {/* Unified Background Elements */}
      <div className="absolute inset-0 overflow-hidden md:overflow-visible pointer-events-none">
        <Image
          src="/hawiyat-logo.svg"
          alt="Floating Logo"
          width={64}
          height={64}
          className={`absolute ${
            theme === "dark" ? "opacity-20" : "opacity-10"
          } top-56 md:top-20 left-20 w-16 h-16`}
          style={{
            transform: `translate(${getParallaxOffset(
              0.3
            )}px, ${getParallaxOffset(-0.2)}px) rotate(${scrollY * 0.5}deg)`,
          }}
        />

        <Image
          src="/hawiyat-logo.svg"
          alt="Floating Logo"
          width={48}
          height={48}
          className={`absolute ${
            theme === "dark" ? "opacity-20" : "opacity-10"
          } top-32 right-32 w-12 h-12`}
          style={{
            transform: `translate(${getParallaxOffset(
              -0.2
            )}px, ${getParallaxOffset(0.3)}px) rotate(${
              45 + scrollY * -0.3
            }deg)`,
          }}
        />
      </div>

      {/* Support Section */}
      <section
        ref={supportRef}
        className="relative z-10 flex items-center justify-center px-6 py-20"
      >
        <div className="max-w-5xl mx-auto space-y-12 text-center">
          <div className="space-y-8">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight transition-all duration-700 ease-out"
              style={{
                color: theme === "dark" ? "white" : "#1f2937",
                transform: supportVisible
                  ? "translateY(0px)"
                  : "translateY(30px)",
                opacity: supportVisible ? 1 : 0,
              }}
            >
              <span
                className="block mb-4 transition-all duration-700 ease-out"
                style={{
                  transform: supportVisible
                    ? "translateX(0px)"
                    : "translateX(-20px)",
                  transitionDelay: "0.1s",
                }}
              >
                Out-of-the-box
              </span>
              <span
                className={`inline-block transition-all duration-700 ease-out ${
                  theme === "dark" || theme === "light"
                    ? "support-gradient-text"
                    : "light-support-gradient-text"
                }`}
                style={{
                  transform: supportVisible
                    ? "translateX(0px) scale(1)"
                    : "translateX(20px) scale(0.95)",
                  transitionDelay: "0.2s",
                }}
              >
                support.
              </span>
            </h2>

            <p
              className="text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed transition-all duration-700 ease-out"
              style={{
                color:
                  theme === "dark"
                    ? "rgba(255,255,255,0.7)"
                    : "rgba(31,41,55,0.7)",
                transform: supportVisible
                  ? "translateY(0px)"
                  : "translateY(20px)",
                opacity: supportVisible ? 1 : 0,
                transitionDelay: "0.3s",
              }}
            >
              No company in the world is more integrated with the creators of
              both Docker and Kubernetes than Hawiyat. Understanding the
              challenges of high-performance teams and applications is our
              primary role.
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center transition-all duration-700 ease-out"
            style={{
              transform: supportVisible
                ? "translateY(0px) scale(1)"
                : "translateY(25px) scale(0.98)",
              opacity: supportVisible ? 1 : 0,
              transitionDelay: "0.4s",
            }}
          >
            {/* Get Started Button */}
            <Link href="/waitlist" className="w-full sm:w-auto">
              <button
                className={`group relative w-full sm:w-auto h-14 px-10 text-lg font-medium rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center overflow-hidden ${"text-slate-900 bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-300 hover:to-teal-400"}`}
              >
                <span className="relative z-10 flex items-center">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${"bg-gradient-to-r from-cyan-300 to-teal-400"}`}
                />
              </button>
            </Link>

            {/* Contact Support Button */}
            <Link href="/support" className="w-full sm:w-auto">
              <button
                className={`group w-full sm:w-auto h-14 px-10 text-lg border-2 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  theme === "dark"
                    ? "border-white/30 hover:border-white/50 text-white hover:bg-white/5 bg-transparent backdrop-blur-sm"
                    : "border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50/50 bg-white/80 backdrop-blur-sm"
                }`}
              >
                Contact Support
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Decorative Background Between Sections */}
      <div className="relative bottom-[300px] z-0 w-full h-0 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/bow.svg"
            alt="Background Bow"
            width={3000}
            height={2000}
            className="w-full h-auto"
            style={{
              opacity: 0,
              transform: "translateY(30px) scale(0.95)",
              filter:
                theme === "dark"
                  ? "drop-shadow(0 0 0px rgba(6,182,212,0))"
                  : "drop-shadow(0 0 0px rgba(37,99,235,0))",
              animation:
                "ellipse-opacity-reveal 3s ease-out 0.2s both, ellipse-gentle-float 6s ease-in-out infinite 3.2s",
            }}
            priority
          />
        </div>
      </div>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="relative overflow-hidden w-full z-10 py-20 px-4"
      >
        <div
          className={`absolute z-[0] mx-auto top-0 h-full ${
            theme === "dark" ? "opacity-100" : "opacity-30"
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

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 transition-all duration-700 cursor-pointer overflow-hidden rounded-2xl ${
                  featuresVisible
                    ? "animate-slide-in-up"
                    : "opacity-0 translate-y-10"
                } ${
                  theme === "dark"
                    ? "bg-gray-900/50 border border-gray-800/50"
                    : "bg-white/90 border border-gray-200"
                }`}
                style={{
                  animationDelay: featuresVisible ? `${0.1 * index}s` : "0s",
                  transform:
                    hoveredCard === index
                      ? `translate(${mousePosition.x * 0.02}px, ${
                          mousePosition.y * 0.02
                        }px) scale(1.02)`
                      : "translate(0, 0) scale(1)",
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Enhanced hover background */}
                <div
                  className={`absolute inset-0 rounded-2xl transition-all duration-700 ${
                    hoveredCard === index
                      ? theme === "dark"
                        ? "bg-gradient-to-br from-white/10 via-cyan-400/5 to-teal-500/10 backdrop-blur-sm"
                        : "bg-gradient-to-br from-white/20 via-blue-400/5 to-indigo-500/10 backdrop-blur-sm"
                      : "bg-transparent"
                  }`}
                />

                {/* Animated border */}
                <div
                  className={`absolute inset-0 rounded-2xl transition-all duration-700 border ${
                    hoveredCard === index
                      ? theme === "dark"
                        ? "border-cyan-400/30 shadow-lg shadow-cyan-400/10"
                        : "border-blue-400/30 shadow-lg shadow-blue-400/10"
                      : "border-transparent"
                  }`}
                />

                {/* Icon Container */}
                <div
                  className={`relative z-10 mb-6 p-4 w-fit rounded-2xl backdrop-blur-sm transition-all duration-300 group-hover:shadow-lg ${
                    theme === "dark"
                      ? "bg-black/40 border-gray-800/50 group-hover:border-cyan-400/30 group-hover:bg-black/60 group-hover:shadow-cyan-400/10"
                      : "bg-white/80 border-gray-200/80 group-hover:border-blue-400/30 group-hover:bg-white/90 group-hover:shadow-blue-400/10"
                  }`}
                >
                  <div
                    className={`transition-colors duration-300 ${
                      theme === "dark"
                        ? "text-gray-300 group-hover:text-cyan-400"
                        : "text-gray-600 group-hover:text-blue-500"
                    }`}
                  >
                    {feature.icon}
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={`relative z-10 text-xl font-medium mb-3 transition-colors duration-300 ${
                    theme === "dark"
                      ? "text-white group-hover:text-white"
                      : "text-gray-800 group-hover:text-gray-900"
                  }`}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className={`relative z-10 leading-relaxed text-sm transition-colors duration-300 ${
                    theme === "dark"
                      ? "text-gray-400 group-hover:text-gray-300"
                      : "text-gray-600 group-hover:text-gray-700"
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CSS Styles */}
      <style jsx>{`
        @keyframes ellipse-opacity-reveal {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
            filter: ${theme === "dark"
              ? "drop-shadow(0 0 0px rgba(6,182,212,0))"
              : "drop-shadow(0 0 0px rgba(37,99,235,0))"};
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
            filter: ${theme === "dark"
              ? "drop-shadow(0 0 60px rgba(6,182,212,0.2))"
              : "drop-shadow(0 0 60px rgba(37,99,235,0.1))"};
          }
        }

        @keyframes ellipse-gentle-float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .support-gradient-text {
          background: linear-gradient(135deg, #22d3ee, #06b6d4, #10b981);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-flow 3s ease-in-out infinite;
        }

        .light-support-gradient-text {
          background: linear-gradient(135deg, #3b82f6, #2563eb, #1d4ed8);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-flow 3s ease-in-out infinite;
        }

        @keyframes gradient-flow {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in-up {
          animation: slide-in-up 0.7s ease-out both;
        }

        * {
          transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.1s !important;
            transition-duration: 0.1s !important;
          }

          .support-gradient-text,
          .light-support-gradient-text {
            animation: none;
          }

          .support-gradient-text {
            background: linear-gradient(135deg, #22d3ee, #10b981);
            -webkit-background-clip: text;
            background-clip: text;
          }

          .light-support-gradient-text {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            -webkit-background-clip: text;
            background-clip: text;
          }
        }
      `}</style>
    </div>
  );
}
