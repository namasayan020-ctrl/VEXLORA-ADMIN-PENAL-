import { motion } from 'motion/react';
import { OWNER_PHOTO_URL } from '../utils/keyGenerator';
import { FacebookLogo, InstagramLogo, TelegramLogo, WhatsAppLogo } from './SocialIcons';
import { OwnerBackground } from './OwnerBackground';

const SOCIAL_LINKS = [
  {
    label: 'FOLLOW INSTAGRAM',
    href: 'https://www.instagram.com/shayan_______cn_7_11_?knvt=MWU0ZjA0cHlzaGR2NQ==',
    Icon: InstagramLogo,
    glowClass:
      'border-fuchsia-500/45 hover:border-fuchsia-400 shadow-[0_0_24px_rgba(217,70,239,0.24)] hover:shadow-[0_0_32px_rgba(217,70,239,0.42)]',
  },
  {
    label: 'FOLLOW FACEBOOK',
    href: 'https://www.facebook.com/share/19oh9inQBM/',
    Icon: FacebookLogo,
    glowClass:
      'border-blue-500/45 hover:border-sky-400 shadow-[0_0_24px_rgba(59,130,246,0.24)] hover:shadow-[0_0_32px_rgba(56,189,248,0.42)]',
  },
  {
    label: 'JOIN WHATSAPP CHANNEL',
    href: 'https://whatsapp.com/channel/0029Vb9D7gP3WHTQebrGiw3P',
    Icon: WhatsAppLogo,
    glowClass:
      'border-emerald-500/45 hover:border-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.22)] hover:shadow-[0_0_32px_rgba(37,211,102,0.4)]',
  },
  {
    label: 'JOIN TELEGRAM CHANNEL',
    href: 'https://t.me/ALL_IN_ONE_TL',
    Icon: TelegramLogo,
    glowClass:
      'border-sky-500/45 hover:border-sky-400 shadow-[0_0_24px_rgba(42,171,238,0.24)] hover:shadow-[0_0_32px_rgba(42,171,238,0.45)]',
  },
] as const;

export function OwnerView() {
  return (
    <motion.section
      key="owner-view"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex min-h-[calc(100dvh-114px)] w-full flex-col items-center justify-center px-4 pt-5 pb-24"
    >
      <OwnerBackground />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        {/* Owner Circular Frame with Glowing Animated Border */}
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center"
        >
          {/* Ambient pulsing glow */}
          <div
            aria-hidden="true"
            className="animate-pulse-aura pointer-events-none absolute -inset-4 rounded-full bg-gradient-to-tr from-sky-500/50 via-violet-500/55 to-blue-500/50 blur-xl"
          />

          {/* Rotating neon circular border */}
          <div
            aria-hidden="true"
            className="animate-spin-slow pointer-events-none absolute -inset-[4px] rounded-full"
            style={{
              background:
                'conic-gradient(from 0deg, #38bdf8, #8b5cf6, #ec4899, #2563eb, #38bdf8)',
            }}
          />

          <div className="relative h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-full bg-[#070b18] p-[3px]">
            <img
              src={OWNER_PHOTO_URL}
              alt="SHAYAN"
              referrerPolicy="no-referrer"
              className="h-full w-full rounded-full object-cover object-center"
            />
          </div>
        </motion.div>

        {/* Owner Name */}
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="font-display mt-4 text-3xl sm:text-4xl font-extrabold tracking-[0.16em] uppercase text-[#38bdf8] drop-shadow-[0_0_18px_rgba(56,189,248,0.8)]"
        >
          SHAYAN
        </motion.h2>

        {/* Four Social Buttons */}
        <div className="mt-6 flex w-full flex-col gap-3">
          {SOCIAL_LINKS.map(({ label, href, Icon, glowClass }, index) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.12 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`group flex min-h-[54px] w-full items-center justify-center gap-3.5 rounded-2xl border bg-[#0b1024]/85 px-5 py-3 backdrop-blur-md transition-all duration-150 hover:bg-[#121938]/95 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 ${glowClass}`}
            >
              <Icon className="h-7 w-7 shrink-0 transition-transform duration-150 group-hover:scale-110" />
              <span className="font-display text-sm sm:text-base font-bold tracking-wider uppercase text-white whitespace-nowrap">
                {label}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
