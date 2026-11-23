import { LOGO_URL } from '../utils/keyGenerator';

export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-indigo-500/20 bg-[#060913]/90 backdrop-blur-md pt-safe">
      <div className="flex h-[56px] w-full items-center justify-start px-3.5 sm:px-6">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <img
            src={LOGO_URL}
            alt="VEX LORA"
            referrerPolicy="no-referrer"
            className="h-9 w-9 shrink-0 rounded-xl object-cover ring-1 ring-violet-400/50 shadow-[0_0_16px_rgba(139,92,246,0.45)]"
          />
          <h1 className="font-display flex items-center gap-2 whitespace-nowrap text-[15px] min-[370px]:text-[17px] sm:text-xl font-bold tracking-[0.06em] uppercase text-white">
            <span>VEX LORA</span>
            <span>ADMIN PANEL</span>
          </h1>
        </div>
      </div>
    </header>
  );
}
