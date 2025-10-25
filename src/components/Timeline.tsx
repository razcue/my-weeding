import { useState, useEffect, useRef } from 'react';

interface Milestone {
  year: string;
  title: string;
  description: string;
  constellation: { x: number; y: number }[]; // Array of star positions for the constellation
  connections: [number, number][]; // Pairs of indices to connect
}

interface TimelineProps {
  title: string;
  subtitle: string;
  milestones: Array<{
    year: string;
    title: string;
    description: string;
  }>;
}

export default function Timeline({ title, subtitle, milestones: milestonesText }: TimelineProps) {
  // Constellation configurations remain fixed
  const constellationConfigs: Array<{
    constellation: { x: number; y: number }[];
    connections: [number, number][];
  }> = [
    {
      // 1. Acercándonos - Single star
      constellation: [{ x: 50, y: 50 }],
      connections: [],
    },
    {
      // 2. Nos Encontramos - Two stars close together
      constellation: [
        { x: 40, y: 50 },
        { x: 60, y: 50 },
      ],
      connections: [],
    },
    {
      // 3. Navegamos Juntos - Two linked stars (diagonal)
      constellation: [
        { x: 35, y: 40 },
        { x: 65, y: 60 },
      ],
      connections: [[0, 1]],
    },
    {
      // 4. Nace Una Pequeña Estrella - Three stars in triangle (all sides connected)
      constellation: [
        { x: 50, y: 40 }, // Top
        { x: 35, y: 65 }, // Bottom left
        { x: 65, y: 65 }, // Bottom right
      ],
      connections: [
        [0, 1], // Top to bottom left
        [1, 2], // Bottom left to bottom right
        [2, 0], // Bottom right to top
      ],
    },
    {
      // 5. La Promesa - Four stars in square (all sides connected)
      constellation: [
        { x: 35, y: 35 }, // Top left
        { x: 65, y: 35 }, // Top right
        { x: 65, y: 65 }, // Bottom right
        { x: 35, y: 65 }, // Bottom left
      ],
      connections: [
        [0, 1], // Top side
        [1, 2], // Right side
        [2, 3], // Bottom side
        [3, 0], // Left side
      ],
    },
    {
      // 6. Nuestro Día de Boda - Inverted five-pointed diamond/star shape
      constellation: [
        { x: 50, y: 75 }, // Bottom point (inverted - pointing down)
        { x: 70, y: 50 }, // Lower right
        { x: 62, y: 35 }, // Upper right
        { x: 38, y: 35 }, // Upper left
        { x: 30, y: 50 }, // Lower left
      ],
      connections: [
        [0, 1], // Bottom to lower right
        [1, 2], // Lower right to upper right
        [2, 3], // Upper right to upper left
        [3, 4], // Upper left to lower left
        [4, 0], // Lower left to bottom
      ],
    },
  ];

  const milestones: Milestone[] = milestonesText.map((text, index) => ({
    ...text,
    ...constellationConfigs[index],
  }));
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(milestones.length).fill(false)
  );
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
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
    for (let i = 0; i < 150; i++) {
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

      // Deep space gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a1628');
      gradient.addColorStop(0.5, '#0d1b2a');
      gradient.addColorStop(1, '#000814');
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

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = itemsRef.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setTimeout(() => {
                setVisibleItems(prev => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 150);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    itemsRef.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden">
      {/* Starry background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-white text-center mb-4">{title}</h2>
        <p className="text-center text-gradient-gold mb-16 max-w-2xl mx-auto">{subtitle}</p>

        <div className="relative flex flex-col items-center">
          {/* Central blurry connecting line */}
          <svg
            className="absolute left-1/2 -translate-x-1/2 w-1 hidden md:block pointer-events-none"
            style={{ height: '100%', zIndex: 0 }}
          >
            <defs>
              <filter id="path-glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Vertical blurry line in center */}
            <line
              x1="50%"
              y1="80"
              x2="50%"
              y2="100%"
              stroke="rgba(212, 175, 55, 0.4)"
              strokeWidth="3"
              filter="url(#path-glow)"
            />
          </svg>

          {milestones.map((milestone, index) => {
            const isRight = index % 2 === 0;

            return (
              <div
                key={index}
                ref={el => {
                  itemsRef.current[index] = el;
                }}
                className={`relative w-full mb-16 md:mb-20 transition-all duration-700 ${
                  visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
                  {/* Content box - left or right */}
                  <div style={{ order: isRight ? '1' : '3' }} className={'w-full md:w-5/12'}>
                    <div
                      className={`bg-transparent backdrop-blur-md rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border-2 border-gold/30 ${
                        isRight ? 'md:text-right' : 'md:text-left'
                      }`}
                    >
                      <div className="text-gold font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-2xl font-serif text-white mb-3">{milestone.title}</h3>
                      <p className="text-white/80 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Central constellation */}
                  <div className="hidden md:flex order-2 justify-center items-center">
                    <svg width="120" height="120" viewBox="0 0 100 100" className="z-10">
                      <defs>
                        <filter id={`constellation-glow-${index}`}>
                          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                        <filter id={`star-glow-${index}`}>
                          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      {/* Draw constellation connections with gap from stars */}
                      {visibleItems[index] &&
                        milestone.connections.map((connection, i) => {
                          const [startIdx, endIdx] = connection;
                          const start = milestone.constellation[startIdx];
                          const end = milestone.constellation[endIdx];

                          // Calculate direction and create gap
                          const dx = end.x - start.x;
                          const dy = end.y - start.y;
                          const length = Math.sqrt(dx * dx + dy * dy);

                          // If two stars overlap (length === 0) skip drawing the line
                          if (length === 0) return null;

                          const ux = dx / length;
                          const uy = dy / length;
                          const gap = 5; // Gap from each star

                          // Adjusted start and end points (shortened so lines don't touch the star circles)
                          let startX = start.x + ux * gap;
                          let startY = start.y + uy * gap;
                          let endX = end.x - ux * gap;
                          let endY = end.y - uy * gap;

                          // For perfectly horizontal or vertical segments the rendered stroke can become
                          // visually invisible on some displays (height or width == 0). Add a tiny
                          // perpendicular offset so the line has a non-zero width and renders crisply.
                          const epsilon = 0.12; // small tilt in SVG units
                          if (Math.abs(uy) < 1e-6 || Math.abs(ux) < 1e-6) {
                            // perpendicular unit vector
                            const perpX = -uy;
                            const perpY = ux;
                            startX += perpX * epsilon;
                            startY += perpY * epsilon;
                            endX -= perpX * epsilon;
                            endY -= perpY * epsilon;
                          }

                          return (
                            <line
                              key={i}
                              x1={startX}
                              y1={startY}
                              x2={endX}
                              y2={endY}
                              stroke="#D4AF37"
                              strokeWidth="2"
                              strokeLinecap="round"
                              opacity="0.9"
                              shapeRendering="geometricPrecision"
                              filter={`url(#constellation-glow-${index})`}
                              style={{
                                strokeDasharray: length,
                                strokeDashoffset: visibleItems[index] ? 0 : length,
                                transition: `stroke-dashoffset 0.8s ease-in-out ${i * 0.15}s`,
                              }}
                            />
                          );
                        })}

                      {/* Draw constellation stars */}
                      {milestone.constellation.map((star, i) => (
                        <g key={i}>
                          {/* Main star */}
                          <circle
                            cx={star.x}
                            cy={star.y}
                            r="3"
                            fill="white"
                            filter={`url(#star-glow-${index})`}
                            style={{
                              opacity: visibleItems[index] ? 1 : 0,
                              transition: `opacity 0.6s ease-in-out ${i * 0.2}s`,
                            }}
                          />
                          {/* Subtle outer glow */}
                          <circle
                            cx={star.x}
                            cy={star.y}
                            r="6"
                            fill="#D4AF37"
                            opacity="0.12"
                            className={visibleItems[index] ? 'animate-pulse-soft' : ''}
                            style={{
                              opacity: visibleItems[index] ? 0.12 : 0,
                              transition: `opacity 0.6s ease-in-out ${i * 0.2}s`,
                            }}
                          />
                        </g>
                      ))}
                    </svg>
                  </div>

                  {/* Empty space on opposite side */}
                  <div
                    style={{ order: isRight ? '3' : '1' }}
                    className={'hidden md:block md:w-5/12'}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse-soft {
          0%, 100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.25;
          }
        }
        
        .animate-pulse-soft {
          animation: pulse-soft 3s ease-in-out infinite;
        }
        
        @keyframes star-appear {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-star-appear {
          animation: star-appear 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
