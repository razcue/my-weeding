import { useEffect, useRef, useState } from 'react';

interface HeroProps {
  names: string;
  withChild: string;
  date: string;
  clickPrompt: string;
}

export default function HeroSectionStarry({ names, withChild, date, clickPrompt }: HeroProps) {
  const [shineStartTime, setShineStartTime] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<
    { x: number; y: number; radius: number; opacity: number; shineDelay: number }[]
  >([]);
  const animationFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const isInitializedRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Only initialize once
    if (!isInitializedRef.current) {
      resizeCanvas();
      // Initialize stars once
      for (let i = 0; i < 200; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          opacity: Math.random() * 0.5 + 0.3,
          shineDelay: Math.random() * 2000,
        });
      }
      isInitializedRef.current = true;
    }

    window.addEventListener('resize', resizeCanvas);

    // Dancing stars (Anais & Rayko)
    const waltzRadius = Math.min(canvas.width, canvas.height) * 0.15;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create deep space gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, '#0a1628');
      gradient.addColorStop(0.5, '#0d1b2a');
      gradient.addColorStop(1, '#000814');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw background stars with staggered shining effect
      const currentTime = Date.now();
      starsRef.current.forEach(star => {
        // Check if this star should shine based on elapsed time and its delay
        let shouldShine = false;
        if (shineStartTime !== null) {
          const elapsed = currentTime - shineStartTime;
          const shineStart = star.shineDelay;
          const shineEnd = shineStart + 1000; // Each star shines for 1 second
          const totalDuration = 3000; // Total shine effect lasts 3 seconds

          if (elapsed >= shineStart && elapsed <= shineEnd && elapsed <= totalDuration) {
            shouldShine = true;
          }
        }

        const shineMultiplier = shouldShine ? 2.5 : 1;
        const opacityBoost = shouldShine ? 0.5 : 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * shineMultiplier, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, star.opacity + opacityBoost)})`;
        ctx.fill();

        // Add twinkle effect (enhanced for selected stars when shining)
        const twinkle = Math.sin(timeRef.current * (shouldShine ? 8 : 2) + star.x + star.y) * 0.2;
        ctx.fillStyle = `rgba(200, 220, 255, ${Math.abs(twinkle) * (shouldShine ? 2 : 1)})`;
        ctx.fill();

        // Add dispersed glow for shining stars
        if (shouldShine) {
          const glowGradient = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            star.radius * 10
          );
          glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
          glowGradient.addColorStop(0.4, 'rgba(200, 220, 255, 0.3)');
          glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 10, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Waltz animation parameters - slower, with tempo
      timeRef.current += 0.008; // Slower tempo

      // Calculate waltz center position (moves around the screen)
      const centerX = canvas.width / 2 + Math.cos(timeRef.current * 0.3) * (canvas.width * 0.15);
      const centerY = canvas.height / 2 + Math.sin(timeRef.current * 0.2) * (canvas.height * 0.15);

      // Waltz pattern: 3/4 time signature with very close distance for frequent touching
      const waltzBeat = timeRef.current * 1.2; // Waltz rhythm
      const closerRadius = waltzRadius * 0.15; // Very close - will overlap frequently

      // Add waltz tempo variation (strong-weak-weak pattern) - more pronounced
      const tempoVariation = Math.sin(waltzBeat * 3) * 0.3 + 0.85;

      // Calculate dancing positions (waltz pattern - stars touch and overlap)
      // Rayko's star (golden)
      const raykoAngle = waltzBeat;
      const raykoX = centerX + Math.cos(raykoAngle) * closerRadius * tempoVariation;
      const raykoY = centerY + Math.sin(raykoAngle) * closerRadius * 0.7 * tempoVariation;

      // Anais's star (pink) - opposite side, creating intimate waltz
      const anaisAngle = waltzBeat + Math.PI;
      const anaisX = centerX + Math.cos(anaisAngle) * closerRadius * tempoVariation;
      const anaisY = centerY + Math.sin(anaisAngle) * closerRadius * 0.7 * tempoVariation;

      // Function to draw a shining star with extended blur (fixed size, no changes on click)
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
        const pulse = Math.sin(timeRef.current * 3) * 0.2 + 1;

        // Primary rays (4 main long rays at cardinal directions)
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.85;
        const primaryRayLength = starSize * 3;

        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2 + timeRef.current * 0.5;
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
          const angle = (i * Math.PI) / 2 + Math.PI / 4 + timeRef.current * 0.5;
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
          const angle = (i * Math.PI) / 4 + Math.PI / 8 + timeRef.current * 0.5;
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
          const angle = (i * Math.PI) / 8 + timeRef.current * 0.5;
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

      // Draw Rayko's star (golden)
      drawStar(raykoX, raykoY, 'rgba(212, 175, 55, 1)', 8);

      // Draw Anais's star (pink)
      drawStar(anaisX, anaisY, 'rgba(255, 182, 193, 1)', 8);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [shineStartTime]);

  const handleClick = () => {
    // Trigger staggered shining effect
    setShineStartTime(Date.now());
    // Reset after 3 seconds
    setTimeout(() => setShineStartTime(null), 3000);
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-end justify-center overflow-hidden cursor-pointer pb-32"
      onClick={handleClick}
    >
      {/* Canvas for starry sky */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Names overlay - positioned at bottom */}
      <div className="absolute bottom-22 left-0 right-0 text-center z-10 px-4">
        <h1 className="text-5xl md:text-7xl h-14 md:h-20 font-serif text-gradient-gold animate-fade-in">
          {names}
        </h1>
        <p
          className="text-lg md:text-2xl font-light -translate-y-4 -translate-x-9"
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #FFB6C1 50%, #D4AF37 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 20px rgba(212, 175, 55, 0.4)',
          }}
        >
          {withChild}
        </p>
        <p
          className="text-lg text-gold font-semibold"
          style={{ textShadow: '0 0 10px rgba(212, 175, 55, 0.8)' }}
        >
          {date}
        </p>
        <p className="text-sm text-white/60 mt-4 animate-pulse">{clickPrompt}</p>
      </div>

      {/* Scroll indicator */}
      <a
        href="#event"
        className="absolute bottom-8 transform -translate-x-1/2 animate-bounce z-30 cursor-pointer hover:text-white transition-colors"
        aria-label="Scroll to Our Special Day"
      >
        <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </a>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 2s ease-out;
        }
      `}</style>
    </section>
  );
}
