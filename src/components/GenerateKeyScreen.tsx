import { motion } from 'motion/react';
import { KeyRound } from 'lucide-react';
import { LOGO_URL } from '../utils/keyGenerator';

interface GenerateKeyScreenProps {
  onGenerate: () => void;
}

export function GenerateKeyScreen({ onGenerate }: GenerateKeyScreenProps) {
  return (
    <motion.section
      key="generate-confirm-view"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="flex min-h-[calc(100dvh-130px)] w-full flex-col items-center justify-center px-4 py-8 pb-24"
    >
      <div className="relative flex w-full max-w-md flex-col items-center text-center">
        {/* Ambient neon glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-8 -top-12 -bottom-12 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(56,189,248,0.24) 0%, rgba(168,85,247,0.24) 48%, transparent 72%)',
          }}
        />

        {/* Circular VEX LORA logo inside glowing frame */}
        <div className="relative mb-9 flex items-center justify-center">
          <div
            aria-hidden="true"
            className="animate-pulse-aura pointer-events-none absolute -inset-4 rounded-full bg-gradient-to-tr from-sky-500/50 via-violet-500/55 to-blue-500/50 blur-xl"
          />
          <div
            aria-hidden="true"
            className="animate-spin-slow pointer-events-none absolute -inset-[4px] rounded-full"
            style={{
              background:
                'conic-gradient(from 0deg, #38bdf8, #8b5cf6, #ec4899, #2563eb, #38bdf8)',
            }}
          />
          <div className="relative h-36 w-36 sm:h-44 sm:w-44 overflow-hidden rounded-full bg-[#070b18] p-[3px] shadow-[0_0_40px_rgba(139,92,246,0.55)]">
            <img
              src={LOGO_URL}
              alt="VEX LORA"
              referrerPolicy="no-referrer"
              className="h-full w-full rounded-full object-cover object-center"
            />
          </div>
        </div>

        {/* One large GENERATE KEY button */}
        <button
          type="button"
          onClick={onGenerate}
          className="group relative flex min-h-[64px] w-full items-center justify-center gap-3 overflow-hidden rounded-2xl p-[1.5px] shadow-[0_0_32px_rgba(56,189,248,0.34),0_0_48px_rgba(139,92,246,0.28)] transition-transform duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
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
