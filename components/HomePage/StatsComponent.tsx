import { useTheme } from "@/context/ThemeContext";
import { useRef, useEffect, useState } from "react";

interface StatsComponentProps {
  isVisible: boolean;
  scrollY: number;
}

export default function StatsComponent({
  isVisible,
  scrollY,
}: StatsComponentProps) {
  const { theme, toggleTheme } = useTheme();
  const statsRef = useRef<HTMLDivElement>(null);
  const [intersectionRatio, setIntersectionRatio] = useState(0);
  const [cardVisibility, setCardVisibility] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Update intersection ratio for parallax effects
          setIntersectionRatio(entry.intersectionRatio);

          // Trigger staggered card animations when in view
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            stats.forEach((_, index) => {
              setTimeout(() => {
                setCardVisibility((prev) => {
                  const newVisibility = [...prev];
                  newVisibility[index] = true;
                  return newVisibility;
                });
              }, index * 150); // Staggered animation delay
            });
          }
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const stats = [
    {
      percentage: "80%",
      description: "time saved during reviews.",
      company: "Estin",
      delay: 0.1,
    },
    {
      percentage: "91%",
      description: "decrease in build times.",
      company: "Esi alger",
      delay: 0.2,
    },
    {
      percentage: "77%",
      description: "increase in page speed.",
      company: "Itihad group",
      delay: 0.3,
    },
    {
      percentage: "87%",
      description: "decrease in build times.",
      company: "It soulution",
      delay: 0.4,
    },
  ];

  // Calculate dynamic parallax values based on intersection
  const parallaxIntensity = intersectionRatio * 50;
  const cardRotation = (intersectionRatio - 0.5) * 2; // Subtle 3D rotation
  const scaleEffect = 0.95 + intersectionRatio * 0.05; // Subtle scale effect

  return (
    <>
      {/* Stats Grid with Enhanced Parallax */}
      <div
        ref={statsRef}
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 stats-container ${theme}-theme`}
        style={{
          transform: `translateY(${
            scrollY * 0.3 - parallaxIntensity
          }px) scale(${scaleEffect})`,
          transformStyle: "preserve-3d",
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`stat-card ${
              cardVisibility[index] ? "stat-visible" : ""
            }`}
            style={{
              animationDelay: `${stat.delay}s`,
              transform: `translateZ(${intersectionRatio * 20}px) rotateX(${
                cardRotation * (index % 2 === 0 ? 1 : -1)
              }deg)`,
            }}
          >
            <div className="stat-content group">
              <div className="stat-number-container">
                <div className="stat-number">{stat.percentage}</div>
                <div className="stat-glow"></div>
              </div>
              <div className="stat-description">{stat.description}</div>
              <div className="stat-company">{stat.company}</div>
              <div className="stat-particles">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`particle particle-${i}`}></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        /* Shared Base Styles */
        .stats-container {
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .stat-card {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }

        .stat-card.stat-visible {
          opacity: 1;
          transform: translateY(0px);
        }

        .stat-content {
          padding: 3rem 2rem;
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transform-style: preserve-3d;
        }

        /* Shared Hover Effects */
        .stat-content::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          transition: left 1s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }

        .stat-content::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          transition: opacity 0.6s ease;
          pointer-events: none;
          z-index: 0;
        }

        .stat-content:hover::before {
          left: 100%;
        }

        .stat-content:hover::after {
          opacity: 1;
        }

        .stat-content:hover {
          transform: translateY(-5px) translateZ(20px);
        }

        /* Shared Number Styles */
        .stat-number-container {
          position: relative;
          display: inline-block;
          margin-bottom: 0.5rem;
        }

        .stat-number {
          font-size: 3.5rem;
          font-weight: 700;
          transition: all 0.6s ease;
          line-height: 1;
          position: relative;
          z-index: 2;
        }

        .stat-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 120%;
          opacity: 0;
          transition: all 0.8s ease;
          z-index: 1;
          border-radius: 50%;
          filter: blur(20px);
        }

        .stat-content:hover .stat-number {
          transform: scale(1.05);
        }

        .stat-content:hover .stat-glow {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.2);
        }

        /* Shared Text Styles */
        .stat-description {
          font-size: 1rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          transition: all 0.6s ease;
          font-weight: 400;
          position: relative;
          z-index: 2;
        }

        .stat-content:hover .stat-description {
          transform: translateY(-2px);
        }

        .stat-company {
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.025em;
          transition: all 0.6s ease;
          text-transform: capitalize;
          position: relative;
          z-index: 2;
        }

        .stat-content:hover .stat-company {
          transform: translateY(-2px);
        }

        /* Shared Particles */
        .stat-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          opacity: 0;
          transition: all 2s ease-in-out;
        }

        .particle-0 {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }
        .particle-1 {
          top: 40%;
          right: 15%;
          animation-delay: 0.4s;
        }
        .particle-2 {
          bottom: 30%;
          left: 20%;
          animation-delay: 0.8s;
        }
        .particle-3 {
          top: 60%;
          right: 25%;
          animation-delay: 1.2s;
        }
        .particle-4 {
          bottom: 20%;
          right: 10%;
          animation-delay: 1.6s;
        }

        .stat-content:hover .particle {
          opacity: 1;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) scale(1.2);
            opacity: 1;
          }
        }

        .light-theme .stat-content {
          padding: 3rem 2rem;
          border-top: none;

          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transform-style: preserve-3d;
          border: 1px solid #e5e7eb;

          border-right: 1px solid #e5e7eb;
          background: transparent;
        }

        .light-theme .stat-content:last-child {
          border-right: 1px solid #e5e7eb;
        }

        .light-theme .stat-number {
          color: #1f2937;
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
        }

        .light-theme .stat-description {
          color: #6b7280;
        }

        .light-theme .stat-company {
          color: #9ca3af;
        }

        .light-theme .stat-content:hover {
          background: #f9fafb;
          border-color: #d1d5db;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(59, 130, 246, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .light-theme .stat-content:hover .stat-number {
          color: #3b82f6;
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.3),
            0 0 40px rgba(59, 130, 246, 0.1);
        }

        .light-theme .stat-content:hover .stat-description {
          color: #4b5563;
        }

        .light-theme .stat-content:hover .stat-company {
          color: #3b82f6;
          text-shadow: 0 0 8px rgba(59, 130, 246, 0.2);
        }

        .light-theme .stat-glow {
          background: radial-gradient(
            circle,
            rgba(59, 130, 246, 0.15) 0%,
            transparent 70%
          );
        }

        .light-theme .particle {
          background: rgba(59, 130, 246, 0.4);
        }

        .light-theme .stat-content::before {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            rgba(59, 130, 246, 0.05),
            transparent
          );
        }

        .light-theme .stat-content::after {
          background: radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(59, 130, 246, 0.1) 0%,
            rgba(59, 130, 246, 0.05) 20%,
            transparent 60%
          );
        }

        /* Dark Theme Specific Styles */
        .dark-theme .stat-content {
          padding: 3rem 2rem;
          border: 1px solid #1a1a1a;
          border-top: none;
          border-right: 1px solid #333;
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transform-style: preserve-3d;
        }

        .dark-theme .stat-content:last-child {
          border-right: 1px solid #1a1a1a;
        }

        .dark-theme .stat-number {
          color: #ffffff;
          text-shadow: 0 0 20px rgba(64, 224, 255, 0.3);
        }

        .dark-theme .stat-description {
          color: #888888;
        }

        .dark-theme .stat-company {
          color: #666666;
        }

        .dark-theme .stat-content:hover {
          background: #111111;
          border-color: #333;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(64, 224, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .dark-theme .stat-content:hover .stat-number {
          color: #40e0ff;
          text-shadow: 0 0 30px rgba(64, 224, 255, 0.6),
            0 0 60px rgba(64, 224, 255, 0.3);
        }

        .dark-theme .stat-content:hover .stat-description {
          color: #cccccc;
        }

        .dark-theme .stat-content:hover .stat-company {
          color: #40e0ff;
          text-shadow: 0 0 10px rgba(64, 224, 255, 0.3);
        }

        .dark-theme .stat-glow {
          background: radial-gradient(
            circle,
            rgba(64, 224, 255, 0.2) 0%,
            transparent 70%
          );
        }

        .dark-theme .particle {
          background: rgba(64, 224, 255, 0.6);
        }

        .dark-theme .stat-content::before {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.03),
            rgba(64, 224, 255, 0.02),
            transparent
          );
        }

        .dark-theme .stat-content::after {
          background: radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(64, 224, 255, 0.1) 0%,
            rgba(64, 224, 255, 0.05) 20%,
            transparent 60%
          );
        }

        /* Mobile Optimizations */
        @media (max-width: 1024px) {
          .stat-content {
            border-right: 1px solid;
            border-bottom: 1px solid;
          }

          .light-theme .stat-content {
            border-right-color: #e5e7eb;
            border-bottom-color: #e5e7eb;
          }

          .dark-theme .stat-content {
            border-right-color: #1a1a1a;
            border-bottom-color: #333;
          }

          .light-theme .stat-content:last-child {
            border-bottom-color: #e5e7eb;
          }

          .dark-theme .stat-content:last-child {
            border-bottom-color: #1a1a1a;
          }
        }

        @media (max-width: 768px) {
          .stat-number {
            font-size: 2.8rem;
          }

          .stat-content {
            padding: 2rem 1.5rem;
            min-height: 160px;
            border-bottom: 1px solid;
            border-right: 1px solid;
          }

          .light-theme .stat-content {
            border-right-color: #e5e7eb;
            border-bottom-color: #e5e7eb;
          }

          .dark-theme .stat-content {
            border-right-color: #1a1a1a;
            border-bottom-color: #333;
          }

          .stat-content:hover {
            transform: translateY(-2px) translateZ(10px);
          }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .stat-card,
          .stat-content,
          .particle {
            transition-duration: 0.2s;
            animation: none !important;
          }

          .stat-content:hover {
            transform: none;
          }
        }

        /* Performance optimizations */
        @media (prefers-reduced-motion: no-preference) {
          .stat-card,
          .stat-content,
          .stat-number,
          .stat-glow {
            will-change: transform, opacity;
          }
        }

        /* Mouse tracking for enhanced hover effects */
        .stat-content {
          --mouse-x: 50%;
          --mouse-y: 50%;
        }
      `}</style>

      {/* Rest of your component... */}
    </>
  );
}
