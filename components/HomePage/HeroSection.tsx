"use client"

import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image'; // ✅ Import Next.js Image
import Link from 'next/link';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[90vh] bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <section className="min-h-[90vh] bg-black relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Enhanced Glowing Ellipse with Opacity Animation */}
        <div className="absolute w-[3000px] bottom-0 right-[-500px] flex items-center justify-center">
          <Image
            src="/ell.svg" // ✅ Must be inside /public
            alt="Ellipse Background"
            width={3000}
            height={2000}
            className="w-full h-auto"
            style={{
              opacity: 0,
              transform: 'translateY(30px) scale(0.95)',
              filter: 'drop-shadow(0 0 0px rgba(6,182,212,0))',
              animation: 'ellipse-opacity-reveal 3s ease-out 0.2s both, ellipse-gentle-float 6s ease-in-out infinite 3.2s'
            }}
            priority // ✅ Recommended for above-the-fold images
          />
        </div>

        {/* Enhanced Grid Mesh with Load Animation - Changed from fixed to absolute */}
        <div className="absolute z-[0] top-0 w-full h-full">
          <img
            className="w-full h-full object-cover"
            src="/grid-mesh.svg"
            width={2000}
            height={2000}
            alt="Grid mesh"
          />
        </div>

        {/* Enhanced Floating Elements with Opacity Waves */}
        {/* <div 
          className="absolute top-20 left-20 w-4 h-4 bg-cyan-400/30 rounded-full particle-glow"
          style={{
            animation: 'float-particle 6s ease-in-out infinite, opacity-wave 4s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute top-40 right-32 w-6 h-6 bg-teal-500/30 rounded-full particle-glow"
          style={{
            animation: 'float-particle 8s ease-in-out infinite 1s, opacity-wave 5s ease-in-out infinite 1.5s'
          }}
        />
        <div 
          className="absolute bottom-32 left-32 w-3 h-3 bg-emerald-500/30 rounded-full particle-glow"
          style={{
            animation: 'float-particle 7s ease-in-out infinite 2s, opacity-wave 6s ease-in-out infinite 2.5s'
          }}
        /> */}

        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 gradient-breathing" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-6 text-center ">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
          {/* Enhanced Badge with better mobile sizing */}
          <div
            className="inline-flex text-sm md:text-xl mt-16 sm:mt-18 lg:mt-24 mb-8 items-center px-5 py-2 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:bg-cyan-400/20 hover:border-cyan-400/40"
            style={{
              animation: 'fade-in-up 1s ease-out 0.2s both'
            }}
          >
            <Sparkles className="w-4 h-4 mr-2 animate-spin" style={{ animationDuration: '3s' }} />
            Bring your business to the best scale
          </div>

          {/* Main Heading with much larger mobile text */}
          <div className="space-y-6">
            <h1
              className=" text-5xl   md:text-6xl lg:text-7xl font-bold tracking-tight"
              style={{ animation: 'fade-in-up 1.2s ease-out 0.4s both' }}
            >
              <span
                className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent transition-all duration-1000"
              >
                Hawiyat Platform
              </span>
              <br />
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-4 space-x-2 sm:space-x-4">
                <span
                  className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent inline-block transition-transform duration-700 hover:scale-110"
                  style={{ animation: 'fade-in-left 1s ease-out 0.8s both' }}
                >
                  Build
                </span>
                <span
                  className="bg-gradient-to-r from-white/80 to-white/70 bg-clip-text text-transparent inline-block transition-transform duration-700 hover:scale-110"
                  style={{ animation: 'fade-in-up 1s ease-out 1s both' }}
                >
                  Deploy
                </span>
                <span
                  className="scale-word inline-block transition-transform duration-700 hover:scale-110"
                  style={{
                    animation: 'fade-in-right 1s ease-out 1.2s both'
                  }}
                >
                  Scale
                </span>
              </div>
            </h1>
            <p
              className="text-xl sm:text-2xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 hover:text-white/90"
              style={{ animation: 'fade-in-up 1s ease-out 1.4s both' }}
            >
              Hawiyat is the first AI-powered PaaS in the region that unifies DevOps, Cloud, Security and automation in
              one seamless platform
            </p>
          </div>

          {/* CTA Buttons with larger mobile text */}
          <div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
            style={{ animation: 'fade-in-up 1s ease-out 1.6s both' }}
          >
            <button
              className="group w-full rounded-2xl cursor-pointer sm:w-auto h-14 sm:h-14 px-8 sm:px-10 text-lg sm:text-lg font-medium bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-300 hover:to-teal-400 text-slate-900 shadow-xl transition-all duration-500 hover:scale-105 flex items-center justify-center relative overflow-hidden"
            >
              <Link href="/waitlist">
                <span className="relative z-10 flex items-center">
                  Get Started
                  <ArrowRight className="w-5 h-5 sm:w-5 sm:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
            <button
              className="group w-full rounded-2xl cursor-pointer sm:w-auto h-14 sm:h-14 px-8 sm:px-10 text-lg sm:text-lg border-2 border-white/30 hover:border-white/50 text-white hover:bg-white/5 bg-transparent backdrop-blur-sm transition-all duration-500 hover:scale-105 relative overflow-hidden"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              }}
            >
              Go to Support
            </button>
          </div>
        </div>
      </main>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        /* Enhanced Ellipse Opacity Animation - Appears after all content loads */
        @keyframes ellipse-opacity-reveal {
          0% { 
            opacity: 0;
            transform: translateY(30px) scale(0.95);
            filter: drop-shadow(0 0 0px rgba(6,182,212,0));
          }
          25% {
            opacity: 0.3;
            transform: translateY(15px) scale(0.97);
            filter: drop-shadow(0 0 30px rgba(6,182,212,0.1));
          }
          50% {
            opacity: 0.6;
            transform: translateY(8px) scale(0.98);
            filter: drop-shadow(0 0 60px rgba(6,182,212,0.2));
          }
          75% {
            opacity: 0.85;
            transform: translateY(3px) scale(0.99);
            filter: drop-shadow(0 0 80px rgba(6,182,212,0.3));
          }
          100% { 
            opacity: 1;
            transform: translateY(0px) scale(1);
            filter: drop-shadow(0 0 100px rgba(6,182,212,0.4));
          }
        }

        @keyframes ellipse-gentle-float {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
            filter: drop-shadow(0 0 100px rgba(6,182,212,0.4));
          }
          50% { 
            transform: translateY(-8px) scale(1.01); 
            filter: drop-shadow(0 0 120px rgba(6,182,212,0.5));
          }
        }

        /* Simple, Smooth Scale Word Animation */
        .scale-word {
          background: linear-gradient(90deg, #22d3ee, #06b6d4, #0891b2, #10b981, #059669, #22d3ee);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: smooth-flow 4s linear infinite;
        }

        @keyframes smooth-flow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        /* Particle Glow Effect */
        .particle-glow {
          filter: blur(0.5px);
          box-shadow: 
            0 0 10px currentColor,
            0 0 20px currentColor,
            0 0 40px currentColor;
        }

        /* Breathing Gradient */
        .gradient-breathing {
          opacity: 0;
          animation: gradient-fade-in 1.5s ease-out 1.5s both;
        }

        @keyframes opacity-wave {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        @keyframes gradient-fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes ellipse-opacity-simple {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Responsive Enhancements */
        @media (max-width: 768px) {
          .ellipse-opacity-animation {
            animation-duration: 2.5s, 5s;
            animation-delay: 0.2s, 2.7s;
          }
        }

        /* High-end visual enhancements */
        @media (prefers-reduced-motion: no-preference) {
          .ellipse-opacity-animation {
            will-change: transform, opacity, filter;
          }
        }

        /* Reduced motion accessibility */
        @media (prefers-reduced-motion: reduce) {
          .ellipse-opacity-animation {
            animation: ellipse-opacity-simple 2s ease-out 0.2s both;
          }
          
          .scale-word {
            background: linear-gradient(90deg, #22d3ee, #10b981);
            -webkit-background-clip: text;
            background-clip: text;
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}