export function InstagramLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#feda75" />
          <stop offset="25%" stopColor="#fa7e1e" />
          <stop offset="55%" stopColor="#d62976" />
          <stop offset="80%" stopColor="#962fbf" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-grad)" />
      <rect
        x="5.3"
        y="5.3"
        width="13.4"
        height="13.4"
        rx="3.8"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.65"
      />
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="#ffffff" strokeWidth="1.65" />
      <circle cx="16.1" cy="7.9" r="1.05" fill="#ffffff" />
    </svg>
  );
}

export function FacebookLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" fill="#1877F2" />
      <path
        d="M15.12 15.27l.48-3.13h-3v-2.03c0-.86.42-1.69 1.77-1.69h1.37V5.75s-1.24-.21-2.43-.21c-2.48 0-4.1 1.5-4.1 4.22v2.38H6.46v3.13h2.75v7.57a10.9 10.9 0 003.39 0v-7.57h2.52z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function WhatsAppLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" fill="#25D366" />
      <path
        d="M12.04 5.4a6.54 6.54 0 00-5.64 9.85l-.73 2.67 2.74-.72a6.54 6.54 0 003.63 1.09h.01a6.54 6.54 0 006.54-6.54 6.55 6.55 0 00-6.55-6.35zm3.81 9.25c-.16.45-.94.86-1.31.91-.33.05-.76.07-1.22-.08-.28-.09-.64-.21-1.1-.41-1.94-.84-3.21-2.8-3.31-2.93-.1-.13-.79-1.05-.79-2.01 0-.96.5-1.43.68-1.62.18-.2.39-.25.52-.25h.37c.12 0 .28-.04.44.33.16.39.55 1.35.6 1.45.05.1.08.22.02.35-.06.13-.1.22-.2.33-.1.12-.21.26-.3.35-.1.1-.2.21-.09.41.12.2.52.86 1.12 1.4.77.69 1.42.9 1.62 1 .2.1.32.08.44-.05.12-.13.5-.59.64-.79.13-.2.27-.17.45-.1.18.06 1.17.55 1.37.65.2.1.33.15.38.24.05.09.05.51-.11.96z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function TelegramLogo({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="tg-grad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#2AABEE" />
          <stop offset="100%" stopColor="#229ED9" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10.5" fill="url(#tg-grad)" />
      <path
        d="M17.28 7.56l-1.97 9.29c-.15.66-.54.82-1.09.51l-3.01-2.22-1.45 1.4c-.16.16-.3.3-.61.3l.22-3.07 5.58-5.04c.24-.22-.05-.34-.38-.12l-6.9 4.35-2.97-.93c-.65-.2-.66-.65.13-.96l11.61-4.47c.54-.2 1.01.13.84.96z"
        fill="#ffffff"
      />
    </svg>
  );
}
