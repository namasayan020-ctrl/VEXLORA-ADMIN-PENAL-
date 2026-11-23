import { Home, User } from 'lucide-react';

export type ActiveTab = 'home' | 'owner';

interface BottomNavProps {
  activeTab: ActiveTab;
  onSelectHome: () => void;
  onSelectOwner: () => void;
}

export function BottomNav({ activeTab, onSelectHome, onSelectOwner }: BottomNavProps) {
  return (
    <nav
      aria-label="Primary Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-indigo-500/25 bg-[#060913]/95 backdrop-blur-lg pb-safe"
    >
      <div className="mx-auto grid h-[58px] max-w-xl grid-cols-2 items-center px-3 gap-2">
        <button
          type="button"
          onClick={onSelectHome}
          aria-current={activeTab === 'home' ? 'page' : undefined}
          className={`relative flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-4 text-xs sm:text-sm font-display font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${
            activeTab === 'home'
              ? 'bg-gradient-to-r from-blue-600/25 via-indigo-600/25 to-violet-600/25 text-sky-300 ring-1 ring-sky-400/45 shadow-[0_0_20px_rgba(56,189,248,0.22)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Home className="h-[18px] w-[18px] shrink-0" />
          <span>HOME</span>
        </button>

        <button
          type="button"
          onClick={onSelectOwner}
          aria-current={activeTab === 'owner' ? 'page' : undefined}
          className={`relative flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-4 text-xs sm:text-sm font-display font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 ${
            activeTab === 'owner'
              ? 'bg-gradient-to-r from-violet-600/30 via-purple-600/25 to-blue-600/25 text-violet-200 ring-1 ring-violet-400/50 shadow-[0_0_22px_rgba(168,85,247,0.3)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <User className="h-[18px] w-[18px] shrink-0" />
          <span>OWNER</span>
        </button>
      </div>
    </nav>
  );
}
