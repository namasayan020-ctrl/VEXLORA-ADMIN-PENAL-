import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, SlidersHorizontal } from 'lucide-react';

interface DurationViewProps {
  onSelectDuration: (days: number) => void;
  onBack: () => void;
}

const DAY_OPTIONS = Array.from({ length: 30 }, (_, idx) => idx + 1);

export function DurationView({ onSelectDuration, onBack }: DurationViewProps) {
  const [showCustom, setShowCustom] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [customError, setCustomError] = useState('');

  const handleCustomChange = (raw: string) => {
    // Allow only digits so decimals/negatives cannot bypass whole-number validation
    const digitsOnly = raw.replace(/\D/g, '');
    setCustomInput(digitsOnly);

    if (!digitsOnly) {
      setCustomError('');
      return;
    }

    const num = Number.parseInt(digitsOnly, 10);
    if (num < 1) {
      setCustomError('Enter a whole number from 1 to 364 days.');
    } else if (num >= 365) {
      setCustomError('Custom duration must be between 1 and 364 days (365 or more is not allowed).');
    } else {
      setCustomError('');
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) {
      setCustomError('Please enter a whole number from 1 to 364.');
      return;
    }
    const parsed = Number.parseInt(customInput, 10);
    if (!Number.isInteger(parsed) || parsed < 1 || parsed >= 365) {
      setCustomError('Custom duration must be a whole number from 1 to 364.');
      return;
    }
    onSelectDuration(parsed);
  };

  const parsedCustom = customInput ? Number.parseInt(customInput, 10) : NaN;
  const isCustomValid = Number.isInteger(parsedCustom) && parsedCustom >= 1 && parsedCustom <= 364;

  return (
    <motion.section
      key="duration-view"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-2xl px-4 pt-5 pb-24"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex min-h-[44px] items-center gap-2 rounded-xl border border-indigo-500/30 bg-[#0b1124]/90 px-4 py-2 text-sm font-semibold text-slate-200 transition-all hover:border-sky-400/50 hover:text-white active:scale-[0.97]"
        >
          <ArrowLeft className="h-4 w-4 text-sky-400" />
          <span>Back</span>
        </button>

        <h2 className="font-display text-base sm:text-lg font-bold tracking-wider uppercase text-white whitespace-nowrap">
          SELECT DURATION
        </h2>
      </div>

      {/* 1 DAY through 30 DAYS */}
      <div className="grid grid-cols-3 min-[430px]:grid-cols-4 sm:grid-cols-5 gap-2.5">
        {DAY_OPTIONS.map((days) => (
          <button
            key={days}
            type="button"
            onClick={() => onSelectDuration(days)}
            className="flex min-h-[48px] items-center justify-center rounded-xl border border-indigo-500/25 bg-[#0b1124]/85 px-2 py-2.5 text-xs sm:text-sm font-display font-bold tracking-wide text-slate-100 shadow-[0_4px_14px_rgba(0,0,0,0.35)] transition-all duration-150 hover:border-sky-400/60 hover:bg-[#111b3a] hover:text-sky-200 hover:shadow-[0_0_18px_rgba(56,189,248,0.22)] active:scale-[0.96] whitespace-nowrap"
          >
            {days === 1 ? '1 DAY' : `${days} DAYS`}
          </button>
        ))}
      </div>

      {/* 1 YEAR, 2 YEARS, CUSTOM */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => onSelectDuration(365)}
          className="flex min-h-[54px] items-center justify-center gap-2 rounded-xl border border-violet-500/40 bg-gradient-to-r from-[#101836] to-[#1a143d] px-4 py-3 text-sm font-display font-bold tracking-wider uppercase text-white shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-150 hover:border-violet-400/75 hover:shadow-[0_0_26px_rgba(139,92,246,0.38)] active:scale-[0.97] whitespace-nowrap"
        >
          <Calendar className="h-4 w-4 text-violet-400 shrink-0" />
          <span>1 YEAR</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectDuration(730)}
          className="flex min-h-[54px] items-center justify-center gap-2 rounded-xl border border-sky-500/40 bg-gradient-to-r from-[#0d1936] to-[#141f46] px-4 py-3 text-sm font-display font-bold tracking-wider uppercase text-white shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all duration-150 hover:border-sky-400/75 hover:shadow-[0_0_26px_rgba(56,189,248,0.38)] active:scale-[0.97] whitespace-nowrap"
        >
          <Calendar className="h-4 w-4 text-sky-400 shrink-0" />
          <span>2 YEARS</span>
        </button>

        <button
          type="button"
          onClick={() => setShowCustom((prev) => !prev)}
          aria-expanded={showCustom}
          className={`flex min-h-[54px] items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-display font-bold tracking-wider uppercase transition-all duration-150 active:scale-[0.97] whitespace-nowrap ${
            showCustom
              ? 'border-sky-400 bg-sky-500/15 text-sky-200 shadow-[0_0_22px_rgba(56,189,248,0.3)]'
              : 'border-indigo-400/35 bg-[#0c1328] text-slate-100 hover:border-sky-400/65 hover:text-white'
          }`}
        >
          <SlidersHorizontal className="h-4 w-4 text-sky-400 shrink-0" />
          <span>CUSTOM</span>
        </button>
      </div>

      {/* Custom Duration Input Panel (1 to 364 days only) */}
      {showCustom && (
        <motion.form
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          onSubmit={handleCustomSubmit}
          className="mt-4 rounded-2xl border border-sky-500/35 bg-[#0a1022]/95 p-4 shadow-[0_0_28px_rgba(37,99,235,0.2)]"
        >
          <label
            htmlFor="custom-days-input"
            className="block text-xs font-display font-bold tracking-wider uppercase text-sky-300"
          >
            Enter Days (1 – 364)
          </label>
          <div className="mt-2.5 flex flex-col sm:flex-row gap-2.5">
            <input
              id="custom-days-input"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={3}
              value={customInput}
              onChange={(e) => handleCustomChange(e.target.value)}
              placeholder="e.g. 65"
              autoFocus
              className="min-h-[48px] flex-1 rounded-xl border border-indigo-500/40 bg-[#050814] px-4 text-base font-mono-key text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/25"
            />
            <button
              type="submit"
              disabled={!isCustomValid}
              className="min-h-[48px] rounded-xl bg-gradient-to-r from-sky-500 to-violet-600 px-6 text-sm font-display font-bold tracking-wider uppercase text-white shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all hover:brightness-110 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap"
            >
              GENERATE KEY
            </button>
          </div>
          {customError && (
            <p role="alert" className="mt-2 text-xs font-medium text-rose-400">
              {customError}
            </p>
          )}
        </motion.form>
      )}
    </motion.section>
  );
}
