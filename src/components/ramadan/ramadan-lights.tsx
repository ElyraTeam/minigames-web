'use client';

import { cn } from '@/lib/utils';

interface RamadanLightsProps {
  className?: string;
}

const RamadanLights: React.FC<RamadanLightsProps> = ({ className }) => {
  const lanternColors = [
    { fill: '#FFD700', glow: 'rgba(255, 215, 0, 0.6)' },
    { fill: '#E63946', glow: 'rgba(230, 57, 70, 0.6)' },
    { fill: '#2EC4B6', glow: 'rgba(46, 196, 182, 0.6)' },
    { fill: '#9B5DE5', glow: 'rgba(155, 93, 229, 0.6)' },
    { fill: '#FF6B35', glow: 'rgba(255, 107, 53, 0.6)' },
    { fill: '#00D4AA', glow: 'rgba(0, 212, 170, 0.6)' },
  ];

  const lanterns = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    color: lanternColors[i % lanternColors.length],
    delay: (i * 0.4) % 3,
    stringHeight: 12 + (i % 4) * 6,
  }));

  return (
    <div
      className={cn(
        `
          pointer-events-none absolute right-0 left-0 z-50 h-14 overflow-hidden
          opacity-60
          sm:h-20
        `,
        className,
      )}
    >
      {/* Wire/String - wavy line */}
      <svg
        className="absolute top-0 h-3 w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 12"
      >
        <path
          d="M0,6 Q5,2 10,6 T20,6 T30,6 T40,6 T50,6 T60,6 T70,6 T80,6 T90,6 T100,6"
          fill="none"
          stroke="#3d2914"
          strokeWidth="0.8"
        />
      </svg>

      {/* Lanterns */}
      <div className="flex h-full w-full items-start justify-around">
        {lanterns.map((lantern) => (
          <div
            key={lantern.id}
            className={cn(
              'relative flex-col items-center',
              // Show fewer lanterns on mobile (hide odd indices)
              lantern.id % 2 === 1 ? `
                hidden
                sm:flex
              ` : 'flex',
            )}
            style={{ marginTop: '4px' }}
          >
            {/* String */}
            <div
              className="w-px bg-[#3d2914]"
              style={{ height: `${lantern.stringHeight}px` }}
            />

            {/* Lantern with glow animation */}
            <div
              className="relative animate-pulse"
              style={{
                animationDelay: `${lantern.delay}s`,
                animationDuration: '2.5s',
              }}
            >
              {/* Glow effect */}
              <div
                className="
                  absolute -inset-1 rounded-full blur-sm
                  sm:-inset-2 sm:blur-md
                "
                style={{ backgroundColor: lantern.color.glow }}
              />

              {/* Lantern SVG */}
              <svg
                viewBox="0 0 16 28"
                className="
                  relative h-5 w-3
                  sm:h-7 sm:w-4
                "
              >
                {/* Top cap */}
                <rect
                  x="5"
                  y="0"
                  width="6"
                  height="2"
                  fill="#3d2914"
                  rx="0.5"
                />

                {/* Top ring */}
                <ellipse cx="8" cy="3" rx="4" ry="1.5" fill="#3d2914" />

                {/* Main body - lantern shape */}
                <path
                  d="M4,4 Q2,8 2,14 Q2,20 4,23 L12,23 Q14,20 14,14 Q14,8 12,4 Z"
                  fill={lantern.color.fill}
                />

                {/* Inner glow/highlight */}
                <path
                  d="M5,6 Q4,10 4,14 Q4,18 5,21 L11,21 Q12,18 12,14 Q12,10 11,6 Z"
                  fill="white"
                  opacity="0.25"
                />

                {/* Decorative bands */}
                <rect
                  x="3"
                  y="9"
                  width="10"
                  height="1"
                  fill="#3d2914"
                  opacity="0.4"
                />
                <rect
                  x="3"
                  y="18"
                  width="10"
                  height="1"
                  fill="#3d2914"
                  opacity="0.4"
                />

                {/* Bottom cap */}
                <ellipse cx="8" cy="23" rx="4" ry="1.5" fill="#3d2914" />

                {/* Bottom tip */}
                <path d="M6,24 L8,28 L10,24 Z" fill="#3d2914" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RamadanLights;
