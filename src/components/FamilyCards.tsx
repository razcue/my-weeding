import { useState, useEffect, useRef } from 'react';

interface FamilyMember {
  name: string;
  bio: string;
  illustration: 'rayko' | 'anais' | 'armandito';
}

interface FamilyCardsProps {
  title: string;
  subtitle: string;
  members: Array<{
    name: string;
    bio: string;
  }>;
}

// Star colors for each family member (exact same as hero section)
const STAR_COLORS = {
  rayko: 'rgba(212, 175, 55, 1)', // Golden (exact same as hero)
  anais: 'rgba(255, 182, 193, 1)', // Rose (exact same as hero)
  armandito: 'rgba(255, 255, 255, 1)', // White
};

// Bright, blurry star component (exact same as hero section)
const StarIllustration = ({ color }: { color: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Function to draw a shining star with extended blur (exact same as hero section)
      const drawStar = (x: number, y: number, color: string, size: number) => {
        const starSize = size; // Fixed size, doesn't change
        const glowSize = 4; // Fixed glow size

        // Extended outer glow (more dispersed - bigger than rays)
        const extendedGradient = ctx.createRadialGradient(x, y, 0, x, y, starSize * 16);
        extendedGradient.addColorStop(0, color.replace('1)', '0.2)'));
        extendedGradient.addColorStop(0.3, color.replace('1)', '0.08)'));
        extendedGradient.addColorStop(0.7, color.replace('1)', '0.02)'));
        extendedGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = extendedGradient;
        ctx.beginPath();
        ctx.arc(x, y, starSize * 16, 0, Math.PI * 2);
        ctx.fill();

        // Main glow
        const mainGradient = ctx.createRadialGradient(x, y, 0, x, y, starSize * glowSize);
        mainGradient.addColorStop(0, color);
        mainGradient.addColorStop(0.3, color.replace('1)', '0.6)'));
        mainGradient.addColorStop(0.6, color.replace('1)', '0.2)'));
        mainGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = mainGradient;
        ctx.beginPath();
        ctx.arc(x, y, starSize * glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Middle glow layer
        const outerGradient = ctx.createRadialGradient(x, y, 0, x, y, starSize * 10);
        outerGradient.addColorStop(0, color.replace('1)', '0.4)'));
        outerGradient.addColorStop(0.5, color.replace('1)', '0.1)'));
        outerGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = outerGradient;
        ctx.beginPath();
        ctx.arc(x, y, starSize * 10, 0, Math.PI * 2);
        ctx.fill();

        // Complex star rays with varying lengths (realistic diffraction pattern)
        ctx.save();
        ctx.translate(x, y);
        const pulse = Math.sin(time * 3) * 0.2 + 1;

        // Primary rays (4 main long rays at cardinal directions)
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.85;
        const primaryRayLength = starSize * 3;

        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2 + time * 0.5;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(
            Math.cos(angle) * primaryRayLength * pulse,
            Math.sin(angle) * primaryRayLength * pulse
          );
          ctx.stroke();
        }

        // Secondary rays (4 diagonal rays, slightly shorter)
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.8;
        const secondaryRayLength = starSize * 2.4;

        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2 + Math.PI / 4 + time * 0.5;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(
            Math.cos(angle) * secondaryRayLength * pulse,
            Math.sin(angle) * secondaryRayLength * pulse
          );
          ctx.stroke();
        }

        // Tertiary rays (8 shorter rays between main rays)
        ctx.lineWidth = 0.7;
        ctx.globalAlpha = 0.75;
        const tertiaryRayLength = starSize * 1.7;

        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4 + Math.PI / 8 + time * 0.5;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(
            Math.cos(angle) * tertiaryRayLength * pulse * 0.8,
            Math.sin(angle) * tertiaryRayLength * pulse * 0.8
          );
          ctx.stroke();
        }

        // Fine detail rays (16 very thin, short rays for realistic sparkle)
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = 0.7;
        const fineRayLength = starSize * 1.2;

        for (let i = 0; i < 16; i++) {
          const angle = (i * Math.PI) / 8 + time * 0.5;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(
            Math.cos(angle) * fineRayLength * pulse * 0.6,
            Math.sin(angle) * fineRayLength * pulse * 0.6
          );
          ctx.stroke();
        }

        ctx.globalAlpha = 1;
        ctx.restore();

        // Core star (brighter center)
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(x, y, starSize * 0.5, 0, Math.PI * 2);
        ctx.fill();
      };

      // Draw the star at center with the specified color
      drawStar(centerX, centerY, color, 16);

      time += 0.02;
      requestAnimationFrame(animate);
    };

    animate();
  }, [color]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default function FamilyCards({ title, subtitle, members: membersText }: FamilyCardsProps) {
  const familyMembers: FamilyMember[] = [
    { ...membersText[0], illustration: 'rayko' },
    { ...membersText[1], illustration: 'anais' },
    { ...membersText[2], illustration: 'armandito' },
  ];

  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Starry background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create background stars
    const stars: { x: number; y: number; radius: number; opacity: number }[] = [];
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep space gradient with warmer tones for family section
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(0.5, '#16213e');
      gradient.addColorStop(1, '#0f0f23');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw twinkling stars
      stars.forEach(star => {
        const twinkle = Math.sin(time * 2 + star.x) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.fill();
      });

      time += 0.01;
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = cardsRef.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setTimeout(() => {
                setVisibleCards(prev => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 200);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="family" className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden">
      {/* Starry background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-white text-center mb-4">{title}</h2>
        <p className="text-center text-gradient-gold mb-12 max-w-2xl mx-auto">{subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {familyMembers.map((member, index) => (
            <div
              key={member.name}
              ref={el => {
                cardsRef.current[index] = el;
              }}
              className={`bg-transparent backdrop-blur-md rounded-lg shadow-lg p-6 transition-all duration-700 hover:shadow-2xl hover:scale-105 border border-gold/40 ${
                visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Illustration */}
              <div className="w-48 h-48 mx-auto mb-6 relative">
                <StarIllustration color={STAR_COLORS[member.illustration]} />
              </div>

              {/* Name */}
              <h3 className="text-2xl font-serif text-white text-center mb-3">{member.name}</h3>

              {/* Bio */}
              <p className="text-center text-white/60 leading-relaxed">{member.bio}</p>

              {/* Heart icon */}
              <div className="flex justify-center mt-6">
                <svg
                  className="w-8 h-8 text-gold/70 opacity-60"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
