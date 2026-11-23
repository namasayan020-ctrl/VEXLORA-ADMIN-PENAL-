import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  hue: 'blue' | 'purple';
  phase: number;
}

export function OwnerBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(44, Math.max(22, Math.floor((width * height) / 22000)));
    const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: -0.25 - Math.random() * 0.45,
      radius: 1.4 + Math.random() * 2.4,
      alpha: 0.25 + Math.random() * 0.55,
      hue: i % 2 === 0 ? 'blue' : 'purple',
      phase: Math.random() * Math.PI * 2,
    }));

    let frameId = 0;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      // Sweeping subtle neon light beam
      const sweepX = width * (0.5 + 0.35 * Math.sin(time * 0.45));
      const sweepY = height * (0.4 + 0.22 * Math.cos(time * 0.35));
      const grad = ctx.createRadialGradient(sweepX, sweepY, 10, sweepX, sweepY, Math.max(width, height) * 0.55);
      const blueWeight = 0.5 + 0.5 * Math.sin(time * 0.6);
      grad.addColorStop(
        0,
        `rgba(${Math.round(56 * blueWeight + 168 * (1 - blueWeight))}, ${Math.round(
          189 * blueWeight + 85 * (1 - blueWeight)
        )}, ${Math.round(248 * blueWeight + 247 * (1 - blueWeight))}, 0.16)`
      );
      grad.addColorStop(1, 'rgba(5, 7, 14, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        if (!prefersReducedMotion) {
          p.x += p.vx + Math.sin(time + p.phase) * 0.18;
          p.y += p.vy;

          if (p.y < -12) {
            p.y = height + 12;
            p.x = Math.random() * width;
          }
          if (p.x < -12) p.x = width + 12;
          if (p.x > width + 12) p.x = -12;
        }

        const twinkle = 0.65 + 0.35 * Math.sin(time * 2 + p.phase);
        const color = p.hue === 'blue' ? '56, 189, 248' : '168, 85, 247';

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${(p.alpha * twinkle).toFixed(3)})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgb(${color})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      if (!prefersReducedMotion) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#04060f]">
      {/* Smooth moving blue & purple neon aurora layers */}
      <div
        className="animate-aurora-a absolute -top-1/4 -left-1/4 h-[80vh] w-[80vw] rounded-full opacity-35 blur-[95px]"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.65) 0%, rgba(56,189,248,0.22) 45%, transparent 72%)',
        }}
      />
      <div
        className="animate-aurora-b absolute -right-1/4 -bottom-1/4 h-[85vh] w-[85vw] rounded-full opacity-35 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.65) 0%, rgba(124,58,237,0.24) 45%, transparent 72%)',
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
