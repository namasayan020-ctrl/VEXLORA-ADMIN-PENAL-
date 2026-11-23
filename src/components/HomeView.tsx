import { motion } from 'motion/react';
import { KeyRound } from 'lucide-react';
import { LOGO_URL } from '../utils/keyGenerator';

interface HomeViewProps {
  onOpenDuration: () => void;
}

export function HomeView({ onOpenDuration }: HomeViewProps) {
  return (
    <motion.section
      key="home-view"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="flex min-h-[calc(100dvh-130px)] w-full flex-col items-center justify-center px-4 py-8 pb-24"
    >
      <div className="relative flex w-full max-w-md flex-col items-center text-center">
        {/* Subtle ambient electric-blue & neon-purple glow behind focal anchor */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-8 -top-12 -bottom-12 rounded-full opacity-45 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(56,189,248,0.22) 0%, rgba(168,85,247,0.2) 45%, transparent 72%)',
          }}
        />

        {/* Circular VEX LORA app logo with neon glowing border */}
        <div className="relative mb-6 flex items-center justify-center">
          <div
            aria-hidden="true"
            className="animate-pulse-aura pointer-events-none absolute -inset-3.5 rounded-full bg-gradient-to-tr from-sky-500/45 via-violet-500/50 to-blue-500/45 blur-lg"
          />
          <div
            aria-hidden="true"
            className="animate-spin-slow pointer-events-none absolute -inset-[3.5px] rounded-full"
            style={{
              background:
                'conic-gradient(from 0deg, #38bdf8, #8b5cf6, #ec4899, #2563eb, #38bdf8)',
            }}
          />
          <div className="relative h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-full bg-[#070b18] p-[3px] shadow-[0_0_32px_rgba(139,92,246,0.45)]">
            <img
              src={LOGO_URL}
              alt="VEX LORA"
              referrerPolicy="no-referrer"
              className="h-full w-full rounded-full object-cover object-center"
            />
          </div>
        </div>

        <div className="relative mb-2 flex flex-col items-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span
              aria-hidden="true"
              className="h-[2px] w-8 sm:w-12 rounded-full bg-gradient-to-r from-transparent via-sky-400 to-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.85)]"
            />
            <h2 className="font-display relative text-3xl sm:text-[2.5rem] font-extrabold tracking-[0.18em] uppercase bg-gradient-to-r from-white via-sky-100 to-violet-200 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(56,189,248,0.5)]">
              NEW KEY
            </h2>
            <span
              aria-hidden="true"
              className="h-[2px] w-8 sm:w-12 rounded-full bg-gradient-to-l from-transparent via-violet-400 to-violet-300 shadow-[0_0_12px_rgba(168,85,247,0.85)]"
            />
          </div>
          <div
            aria-hidden="true"
            className="mt-2.5 h-[2px] w-32 sm:w-40 rounded-full bg-gradient-to-r from-transparent via-indigo-400/80 to-transparent shadow-[0_0_14px_rgba(99,102,241,0.75)]"
          />
        </div>

        <button
          type="button"
          onClick={onOpenDuration}
          className="group relative mt-7 flex min-h-[64px] w-full items-center justify-center gap-3 overflow-hidden rounded-2xl p-[1.5px] shadow-[0_0_32px_rgba(56,189,248,0.3),0_0_48px_rgba(139,92,246,0.25)] transition-transform duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
          style={{
            background: 'linear-gradient(135deg, #38bdf8 0%, #6366f1 50%, #a855f7 100%)',
          }}
        >
          <span className="flex h-full w-full items-center justify-center gap-3 rounded-[14.5px] bg-gradient-to-r from-[#0a132b] via-[#10183a] to-[#161238] px-8 py-4 text-lg sm:text-xl font-display font-bold tracking-[0.12em] uppercase text-white transition-colors duration-200 group-hover:from-[#0f1c3f] group-hover:via-[#17214f] group-hover:to-[#211952]">
            <KeyRound className="h-6 w-6 text-sky-400 transition-transform duration-200 group-hover:rotate-12" />
            <span className="whitespace-nowrap">GENERATE KEY</span>
          </span>
        </button>
      </div>
    </motion.section>
  );
}
