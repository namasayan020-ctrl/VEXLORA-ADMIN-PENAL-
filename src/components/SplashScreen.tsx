import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { LOGO_URL } from '../utils/keyGenerator';

interface SplashScreenProps {
  onComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

interface Shockwave {
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
  lineWidth: number;
}

interface BoltSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface CornerLightningBolt {
  segments: BoltSegment[];
  alpha: number;
  color: string;
  width: number;
}

interface CenterFlash {
  alpha: number;
  radius: number;
  maxRadius: number;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }, 10000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [onComplete]);

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

    const particles: Particle[] = [];
    const shockwaves: Shockwave[] = [];
    const cornerBolts: CornerLightningBolt[] = [];
    const centerFlashes: CenterFlash[] = [];

    const colors = ['#38bdf8', '#60a5fa', '#a855f7', '#c084fc', '#e0f2fe'];

    const spawnExplosion = (count: number, maxSpeed: number, intense = false) => {
      const cx = width / 2;
      const cy = height / 2;
      const maxDim = Math.max(width, height);

      centerFlashes.push({
        alpha: intense ? 0.9 : 0.6,
        radius: 42,
        maxRadius: Math.min(width, height) * (intense ? 0.56 : 0.4),
      });

      shockwaves.push({
        radius: 44,
        maxRadius: maxDim * 0.54,
        alpha: intense ? 0.9 : 0.72,
        color: '#a855f7',
        lineWidth: intense ? 3.8 : 2.6,
      });

      shockwaves.push({
        radius: 26,
        maxRadius: maxDim * 0.38,
        alpha: intense ? 0.92 : 0.78,
        color: '#38bdf8',
        lineWidth: 2.2,
      });

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.6 + Math.random() * maxSpeed;
        particles.push({
          x: cx + Math.cos(angle) * 26,
          y: cy + Math.sin(angle) * 26,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.4 + Math.random() * 2.8,
          alpha: 0.75 + Math.random() * 0.25,
          decay: 0.014 + Math.random() * 0.018,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const spawnCornerLightning = (cornerIndex: 0 | 1 | 2 | 3) => {
      const pad = 4;
      const startX = cornerIndex === 0 || cornerIndex === 2 ? pad : width - pad;
      const startY = cornerIndex === 0 || cornerIndex === 1 ? pad : height - pad;

      const baseAngle =
        cornerIndex === 0
          ? Math.PI * 0.25
          : cornerIndex === 1
            ? Math.PI * 0.75
            : cornerIndex === 2
              ? -Math.PI * 0.25
              : -Math.PI * 0.75;

      const angle = baseAngle + (Math.random() - 0.5) * 0.36;
      const length = Math.min(width, height) * (0.25 + Math.random() * 0.12);
      const endX = startX + Math.cos(angle) * length;
      const endY = startY + Math.sin(angle) * length;

      const segments: BoltSegment[] = [];
      const steps = 8;
      let prevX = startX;
      let prevY = startY;

      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const jitter = (1 - Math.abs(t - 0.5)) * 28;
        const nx = startX + (endX - startX) * t + (Math.random() - 0.5) * jitter;
        const ny = startY + (endY - startY) * t + (Math.random() - 0.5) * jitter;
        segments.push({ x1: prevX, y1: prevY, x2: nx, y2: ny });

        if (i >= 2 && i <= steps - 2 && Math.random() > 0.48) {
          const forkAngle = angle + (Math.random() > 0.5 ? 1 : -1) * (0.42 + Math.random() * 0.4);
          const forkLen = 20 + Math.random() * 34;
          segments.push({
            x1: nx,
            y1: ny,
            x2: nx + Math.cos(forkAngle) * forkLen,
            y2: ny + Math.sin(forkAngle) * forkLen,
          });
        }

        prevX = nx;
        prevY = ny;
      }

      cornerBolts.push({
        segments,
        alpha: 0.92,
        color: cornerIndex % 2 === 0 ? '#38bdf8' : '#a855f7',
        width: 1.8 + Math.random() * 1.1,
      });
    };

    const spawnAllFourCorners = () => {
      spawnCornerLightning(0);
      spawnCornerLightning(1);
      spawnCornerLightning(2);
      spawnCornerLightning(3);
    };

    if (!prefersReducedMotion) {
      spawnExplosion(85, 9.5, true);
      spawnAllFourCorners();
    }

    let frameId = 0;
    let lastBurst = performance.now();
    let lastCornerFlash = performance.now();

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        if (now - lastBurst > 2400) {
          spawnExplosion(48, 7.2, false);
          lastBurst = now;
        }
        if (now - lastCornerFlash > 230) {
          spawnAllFourCorners();
          lastCornerFlash = now;
        }
      }

      // Smooth center cinematic flash pulses
      for (let i = centerFlashes.length - 1; i >= 0; i--) {
        const fl = centerFlashes[i];
        fl.radius += (fl.maxRadius - fl.radius) * 0.14 + 3.5;
        fl.alpha *= 0.895;

        if (fl.alpha <= 0.02) {
          centerFlashes.splice(i, 1);
          continue;
        }

        const cx = width / 2;
        const cy = height / 2;
        const flashGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, fl.radius);
        flashGrad.addColorStop(0, `rgba(255, 255, 255, ${fl.alpha * 0.72})`);
        flashGrad.addColorStop(0.3, `rgba(56, 189, 248, ${fl.alpha * 0.55})`);
        flashGrad.addColorStop(0.65, `rgba(168, 85, 247, ${fl.alpha * 0.3})`);
        flashGrad.addColorStop(1, 'rgba(5, 7, 14, 0)');

        ctx.save();
        ctx.fillStyle = flashGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, fl.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Expanding neon shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += (sw.maxRadius - sw.radius) * 0.068 + 2.4;
        sw.alpha *= 0.942;

        if (sw.alpha <= 0.02 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = sw.color;
        ctx.globalAlpha = sw.alpha;
        ctx.lineWidth = sw.lineWidth;
        ctx.shadowBlur = 20;
        ctx.shadowColor = sw.color;
        ctx.stroke();
        ctx.restore();
      }

      // Four fixed-corner lightning bolts
      for (let i = cornerBolts.length - 1; i >= 0; i--) {
        const bolt = cornerBolts[i];
        bolt.alpha -= 0.072;
        if (bolt.alpha <= 0) {
          cornerBolts.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = bolt.alpha;
        ctx.strokeStyle = bolt.color;
        ctx.lineWidth = bolt.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowBlur = 20;
        ctx.shadowColor = bolt.color;

        ctx.beginPath();
        for (const seg of bolt.segments) {
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
        }
        ctx.stroke();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = bolt.width * 0.44;
        ctx.globalAlpha = bolt.alpha * 0.88;
        ctx.shadowBlur = 7;
        ctx.stroke();
        ctx.restore();
      }

      // Explosion embers
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.974;
        p.vy *= 0.974;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      frameId = window.requestAnimationFrame(render);
    };

    frameId = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#04060d]"
    >
      {/* Deep blue & purple atmospheric gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.16) 0%, rgba(139, 92, 246, 0.18) 30%, rgba(8, 12, 26, 0.95) 66%, #04060d 100%)',
        }}
      />

      {/* Four fixed-position electric corner flares */}
      <div
        aria-hidden="true"
        className="animate-pulse-aura pointer-events-none fixed -top-10 -left-10 h-40 w-40 rounded-full bg-sky-500/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-pulse-aura pointer-events-none fixed -top-10 -right-10 h-40 w-40 rounded-full bg-violet-500/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-pulse-aura pointer-events-none fixed -bottom-10 -left-10 h-40 w-40 rounded-full bg-violet-500/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-pulse-aura pointer-events-none fixed -bottom-10 -right-10 h-40 w-40 rounded-full bg-sky-500/30 blur-3xl"
      />

      {/* Canvas for 4-corner lightning, cinematic flashes, shockwaves & explosion particles */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {/* Centered Futuristic Circular Logo Assembly */}
      <div className="relative z-10 flex items-center justify-center px-6">
        <div className="relative flex items-center justify-center">
          {/* Volumetric blue & purple glow halo */}
          <motion.div
            aria-hidden="true"
            initial={{ scale: 0.5, opacity: 0.9 }}
            animate={{
              scale: [0.95, 1.32, 1.05, 1.32, 0.95],
              opacity: [0.75, 0.32, 0.65, 0.32, 0.75],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="pointer-events-none absolute -inset-12 rounded-full blur-2xl"
            style={{
              background:
                'radial-gradient(circle, rgba(224,242,254,0.5) 0%, rgba(56,189,248,0.4) 36%, rgba(168,85,247,0.34) 68%, transparent 82%)',
            }}
          />

          {/* Outer counter-rotating holographic energy ring */}
          <motion.div
            aria-hidden="true"
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none absolute -inset-6 rounded-full border border-dashed border-sky-400/45 shadow-[0_0_24px_rgba(56,189,248,0.3)]"
          />

          {/* Soft rotating neon conic aura */}
          <div
            aria-hidden="true"
            className="animate-spin-slow pointer-events-none absolute -inset-5 rounded-full opacity-80 blur-xl"
            style={{
              background:
                'conic-gradient(from 0deg, rgba(56,189,248,0.85), rgba(168,85,247,0.9), rgba(37,99,235,0.75), rgba(56,189,248,0.85))',
            }}
          />

          {/* Perfectly circular logo frame with glowing neon border & smooth 360-degree rotation */}
          <motion.div
            initial={{ scale: 0.35, opacity: 0, rotate: 0 }}
            animate={{
              scale: [0.35, 1.08, 1],
              opacity: 1,
              rotate: 360,
            }}
            transition={{
              scale: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.5 },
              rotate: {
                duration: 6,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
            className="relative flex h-44 w-44 sm:h-52 sm:w-52 items-center justify-center rounded-full p-[4px] shadow-[0_0_50px_rgba(139,92,246,0.7),0_0_90px_rgba(56,189,248,0.45)]"
            style={{
              background:
                'conic-gradient(from 0deg, #38bdf8, #a855f7, #ec4899, #2563eb, #38bdf8)',
            }}
          >
            <div className="h-full w-full overflow-hidden rounded-full bg-[#070b18]">
              <img
                src={LOGO_URL}
                alt="VEX LORA"
                referrerPolicy="no-referrer"
                className="h-full w-full rounded-full object-cover object-center"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
