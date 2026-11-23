import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Check, Copy, RotateCcw } from 'lucide-react';
import { copyTextToClipboard } from '../utils/keyGenerator';

interface GeneratedKeyViewProps {
  generatedKey: string;
  onReplace: () => void;
}

export function GeneratedKeyView({ generatedKey, onReplace }: GeneratedKeyViewProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [generatedKey]);

  const handleCopy = async () => {
    const ok = await copyTextToClipboard(generatedKey);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    }
  };

  return (
    <motion.section
      key="generated-key-view"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="flex min-h-[calc(100dvh-130px)] w-full flex-col items-center justify-center px-4 py-8"
    >
      <div className="w-full max-w-md">
        {/* Glowing Key Vault Display */}
        <div
          className="relative overflow-hidden rounded-2xl p-[1.5px] shadow-[0_0_40px_rgba(56,189,248,0.22),0_0_55px_rgba(139,92,246,0.22)]"
          style={{
            background: 'linear-gradient(135deg, rgba(56,189,248,0.7), rgba(168,85,247,0.7))',
          }}
        >
          <div className="rounded-[14.5px] bg-[#080d1f] px-4 py-7 sm:px-6 sm:py-8 text-center">
            <p className="font-mono-key break-all text-xl min-[380px]:text-2xl sm:text-[26px] font-bold tracking-wider text-white drop-shadow-[0_0_14px_rgba(56,189,248,0.45)]">
              {generatedKey}
            </p>
          </div>
        </div>

        {/* Strictly only COPY KEY and REPLACE buttons */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <button
            type="button"
            onClick={handleCopy}
            className={`flex min-h-[54px] items-center justify-center gap-2.5 rounded-xl px-6 text-sm font-display font-bold tracking-wider uppercase transition-all duration-150 active:scale-[0.97] whitespace-nowrap ${
              copied
                ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/60 shadow-[0_0_24px_rgba(16,185,129,0.28)]'
                : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-[0_0_24px_rgba(56,189,248,0.35)] hover:brightness-110'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-5 w-5 shrink-0" />
                <span>COPIED</span>
              </>
            ) : (
              <>
                <Copy className="h-5 w-5 shrink-0" />
                <span>COPY KEY</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onReplace}
            className="flex min-h-[54px] items-center justify-center gap-2.5 rounded-xl border border-violet-500/45 bg-[#0e132c] px-6 text-sm font-display font-bold tracking-wider uppercase text-violet-100 shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-150 hover:border-violet-400 hover:bg-[#161c40] active:scale-[0.97] whitespace-nowrap"
          >
            <RotateCcw className="h-5 w-5 text-violet-400 shrink-0" />
            <span>REPLACE</span>
          </button>
        </div>
      </div>
    </motion.section>
  );
}
