
const COUNT = 30;
const RADIUS = 48;
const BALL_SIZE = 12;
const DURATION = 2;

export const ScreenLoader = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[1000] bg-[hsl(var(--loader-background)/0.95)] backdrop-blur-[var(--loader-blur)]"
      style={{ perspective: '500px' }}
    >
      <div
        className="relative"
        style={{
          width: RADIUS * 2,
          height: RADIUS * 2,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
            animation: `orbit-rotate ${DURATION}s linear infinite`,
            transformStyle: 'preserve-3d',
          }}
        >
          {[...Array(COUNT)].map((_, i) => {
            const angle = (360 / COUNT) * i;
            const y = ((i - COUNT / 2) * (RADIUS / COUNT)) * 2;
            const color =
              i % 2 === 0
                ? `hsl(var(--loader-primary))`
                : `hsl(var(--loader-secondary))`;

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: BALL_SIZE,
                  height: BALL_SIZE,
                  marginLeft: -BALL_SIZE / 2,
                  marginTop: -BALL_SIZE / 2,
                  transform: `
                    rotateY(${angle}deg)
                    translateZ(${RADIUS}px)
                    translateY(${y}px)
                  `,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: color,
                    opacity: 0.9,
                    boxShadow: '0 0 8px 0 hsl(var(--loader-primary)/0.15)',
                  }}
                />
              </div>
            );
          })}
        </div>
        {/* Буквы */}
        <div
          className="absolute inset-0 flex items-center justify-center font-bold font-mono text-3xl pointer-events-none select-none"
          style={{
            color: 'hsl(var(--loader-text))',
            textShadow: '0 0 8px hsl(var(--loader-primary))',
            zIndex: 2,
          }}
        >
          <span
            className="absolute animate-wave"
            style={{
              color: 'hsl(var(--loader-primary))',
              animationDelay: '0s',
            }}
          >
            R
          </span>
          <span
            className="absolute animate-wave"
            style={{
              color: 'hsl(var(--loader-secondary))',
              marginLeft: 32,
              animationDelay: '0.3s',
            }}
          >
            e
          </span>
        </div>
      </div>
    </div>
  );
};