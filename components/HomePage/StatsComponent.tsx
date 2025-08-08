import { useRef, useEffect, useState, useMemo } from "react"
import { useTheme } from "@/context/ThemeContext"

interface StatsComponentProps {
  isVisible: boolean
  scrollY: number
}

export default function StatsComponent({ isVisible, scrollY }: StatsComponentProps) {
  const statsRef = useRef<HTMLDivElement>(null)
  const [intersectionRatio, setIntersectionRatio] = useState(0)
  const [cardVisibility, setCardVisibility] = useState<boolean[]>([false, false, false, false])
  const { theme } = useTheme()

  // Memoize theme-dependent styles
  const themeStyles = useMemo(() => {
    const isDark = theme === 'dark'
    return {
      cardBorder: isDark ? '#1a1a1a' : '#e5e7eb',
      cardBorderRight: isDark ? '#333' : '#d1d5db',
      cardHoverBg: isDark ? '#111111' : '#f9fafb',
      cardHoverBorder: isDark ? '#333' : '#9ca3af',
      numberColor: isDark ? '#ffffff' : '#111827',
      numberHoverColor: isDark ? '#40e0ff' : '#0ea5e9',
      descriptionColor: isDark ? '#888888' : '#6b7280',
      descriptionHoverColor: isDark ? '#cccccc' : '#374151',
      companyColor: isDark ? '#666666' : '#9ca3af',
      companyHoverColor: isDark ? '#40e0ff' : '#0ea5e9',
      glowEffect: isDark ? 'rgba(64, 224, 255, 0.2)' : 'rgba(14, 165, 233, 0.15)',
      shimmerGradient: isDark 
        ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.03), rgba(64, 224, 255, 0.02), transparent)'
        : 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.02), rgba(14, 165, 233, 0.03), transparent)',
      radialHover: isDark
        ? 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(64, 224, 255, 0.1) 0%, rgba(64, 224, 255, 0.05) 20%, transparent 60%)'
        : 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(14, 165, 233, 0.08) 0%, rgba(14, 165, 233, 0.04) 20%, transparent 60%)',
      particleColor: isDark ? 'rgba(64, 224, 255, 0.6)' : 'rgba(14, 165, 233, 0.5)',
      boxShadow: isDark 
        ? '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(64, 224, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        : '0 20px 40px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(14, 165, 233, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
      textShadow: isDark 
        ? '0 0 20px rgba(64, 224, 255, 0.3)'
        : '0 0 10px rgba(14, 165, 233, 0.2)',
      textShadowHover: isDark
        ? '0 0 30px rgba(64, 224, 255, 0.6), 0 0 60px rgba(64, 224, 255, 0.3)'
        : '0 0 20px rgba(14, 165, 233, 0.4), 0 0 40px rgba(14, 165, 233, 0.2)',
      companyShadowHover: isDark 
        ? '0 0 10px rgba(64, 224, 255, 0.3)'
        : '0 0 8px rgba(14, 165, 233, 0.2)'
    }
  }, [theme])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Update intersection ratio for parallax effects
          setIntersectionRatio(entry.intersectionRatio)
          
          // Trigger staggered card animations when in view
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            stats.forEach((_, index) => {
              setTimeout(() => {
                setCardVisibility(prev => {
                  const newVisibility = [...prev]
                  newVisibility[index] = true
                  return newVisibility
                })
              }, index * 150) // Staggered animation delay
            })
          }
        })
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: "-10% 0px -10% 0px"
      }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
      }
    }
  }, [])

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
      company: "It solution",
      delay: 0.4,
    },
  ]

  // Calculate dynamic parallax values based on intersection
  const parallaxIntensity = intersectionRatio * 50
  const cardRotation = (intersectionRatio - 0.5) * 2 // Subtle 3D rotation
  const scaleEffect = 0.95 + (intersectionRatio * 0.05) // Subtle scale effect

  return (
    <>
      {/* Stats Grid with Enhanced Parallax */}
      <div 
        ref={statsRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 stats-container"
        style={{
          transform: `translateY(${scrollY * 0.3 - parallaxIntensity}px) scale(${scaleEffect})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`stat-card ${cardVisibility[index] ? "stat-visible" : ""}`}
            style={{ 
              animationDelay: `${stat.delay}s`,
              transform: `translateZ(${intersectionRatio * 20}px) rotateX(${cardRotation * (index % 2 === 0 ? 1 : -1)}deg)`,
            }}
          >
            <div className="stat-content group">
              <div className="stat-number-container">
                <div className="stat-number">
                  {stat.percentage}
                </div>
                <div className="stat-glow"></div>
              </div>
              <div className="stat-description">
                {stat.description}
              </div>
              <div className="stat-company">
                {stat.company}
              </div>
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
        /* Enhanced Stats Container */
        .stats-container {
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        /* Clean Stats Card Animations */
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
          border: 1px solid ${themeStyles.cardBorder};
          border-top: none;
          border-right: 1px solid ${themeStyles.cardBorderRight};
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transform-style: preserve-3d;
        }

        .stat-content:last-child {
          border-right: 1px solid ${themeStyles.cardBorder};
        }

        /* Enhanced hover effects with multiple layers */
        .stat-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: ${themeStyles.shimmerGradient};
          transition: left 1s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }

        .stat-content::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${themeStyles.radialHover};
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
          background: ${themeStyles.cardHoverBg};
          border-color: ${themeStyles.cardHoverBorder};
          transform: translateY(-5px) translateZ(20px);
          box-shadow: ${themeStyles.boxShadow};
        }

        /* Enhanced number with glow effect */
        .stat-number-container {
          position: relative;
          display: inline-block;
          margin-bottom: 0.5rem;
        }

        .stat-number {
          font-size: 3.5rem;
          font-weight: 700;
          color: ${themeStyles.numberColor};
          transition: all 0.6s ease;
          line-height: 1;
          position: relative;
          z-index: 2;
          text-shadow: ${themeStyles.textShadow};
        }

        .stat-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 120%;
          background: radial-gradient(circle, ${themeStyles.glowEffect} 0%, transparent 70%);
          opacity: 0;
          transition: all 0.8s ease;
          z-index: 1;
          border-radius: 50%;
          filter: blur(20px);
        }

        .stat-content:hover .stat-number {
          color: ${themeStyles.numberHoverColor};
          transform: scale(1.05);
          text-shadow: ${themeStyles.textShadowHover};
        }

        .stat-content:hover .stat-glow {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.2);
        }

        .stat-description {
          color: ${themeStyles.descriptionColor};
          font-size: 1rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          transition: all 0.6s ease;
          font-weight: 400;
          position: relative;
          z-index: 2;
        }

        .stat-content:hover .stat-description {
          color: ${themeStyles.descriptionHoverColor};
          transform: translateY(-2px);
        }

        .stat-company {
          color: ${themeStyles.companyColor};
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.025em;
          transition: all 0.6s ease;
          text-transform: capitalize;
          position: relative;
          z-index: 2;
        }

        .stat-content:hover .stat-company {
          color: ${themeStyles.companyHoverColor};
          transform: translateY(-2px);
          text-shadow: ${themeStyles.companyShadowHover};
        }

        /* Floating particles effect */
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
          background: ${themeStyles.particleColor};
          border-radius: 50%;
          opacity: 0;
          transition: all 2s ease-in-out;
        }

        .particle-0 { top: 20%; left: 10%; animation-delay: 0s; }
        .particle-1 { top: 40%; right: 15%; animation-delay: 0.4s; }
        .particle-2 { bottom: 30%; left: 20%; animation-delay: 0.8s; }
        .particle-3 { top: 60%; right: 25%; animation-delay: 1.2s; }
        .particle-4 { bottom: 20%; right: 10%; animation-delay: 1.6s; }

        .stat-content:hover .particle {
          opacity: 1;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-20px) scale(1.2);
            opacity: 1;
          }
        }

        /* Simple intersection-based animations */
        .stat-card.stat-visible {
          animation: none;
        }

        /* Mobile Optimizations */
        @media (max-width: 1024px) {
          .stat-content {
            border-right: 1px solid ${themeStyles.cardBorder};
            border-bottom: 1px solid ${themeStyles.cardBorderRight};
          }
          
          .stat-content:last-child {
            border-bottom: 1px solid ${themeStyles.cardBorder};
          }

          .stat-card:nth-child(n).stat-visible {
            animation: slideInFromLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        }

        @media (max-width: 768px) {
          .stat-number {
            font-size: 2.8rem;
          }
          
          .stat-content {
            padding: 2rem 1.5rem;
            min-height: 160px;
            border-bottom: 1px solid ${themeStyles.cardBorderRight};
            border-right: 1px solid ${themeStyles.cardBorder};
          }

          .stat-content:last-child {
            border-bottom: 1px solid ${themeStyles.cardBorder};
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

      <script dangerouslySetInnerHTML={{
        __html: `
          // Enhanced mouse tracking for each card
          if (typeof window !== 'undefined') {
            document.addEventListener('DOMContentLoaded', function() {
              const cards = document.querySelectorAll('.stat-content');
              
              cards.forEach(card => {
                card.addEventListener('mousemove', function(e) {
                  const rect = card.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  
                  card.style.setProperty('--mouse-x', x + '%');
                  card.style.setProperty('--mouse-y', y + '%');
                });
              });
            });
          }
        `
      }} />
    </>
  )
}