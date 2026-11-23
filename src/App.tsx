import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { BottomNav, ActiveTab } from './components/BottomNav';
import { DurationView } from './components/DurationView';
import { GeneratedKeyView } from './components/GeneratedKeyView';
import { GenerateKeyScreen } from './components/GenerateKeyScreen';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { OwnerView } from './components/OwnerView';
import { SplashScreen } from './components/SplashScreen';
import { OWNER_AUDIO_URL, generateUniqueKey } from './utils/keyGenerator';

type HomeStep = 'landing' | 'duration' | 'confirm' | 'generated';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [homeStep, setHomeStep] = useState<HomeStep>('landing');
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [generatedKey, setGeneratedKey] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const startOwnerMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.loop = true;
      audio.volume = 0.72;
      if (!audio.paused) {
        return;
      }
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Handled gracefully if browser restricts autoplay
        });
      }
    } catch {
      // Ignore playback errors gracefully
    }
  }, []);

  const stopOwnerMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.pause();
      audio.currentTime = 0;
    } catch {
      // Ignore audio pause errors
    }
  }, []);

  useEffect(() => {
    return () => {
      stopOwnerMusic();
    };
  }, [stopOwnerMusic]);

  const handleSelectHome = () => {
    stopOwnerMusic();
    setActiveTab('home');
    setSelectedDuration(null);
    setGeneratedKey('');
    setHomeStep('landing');
  };

  const handleSelectOwner = () => {
    if (activeTab !== 'owner') {
      setActiveTab('owner');
    }
    startOwnerMusic();
  };

  const handleSelectDuration = (days: number) => {
    setSelectedDuration(days);
    setHomeStep('confirm');
  };

  const handleGenerateKey = () => {
    if (selectedDuration === null || selectedDuration < 1) {
      setHomeStep('duration');
      return;
    }
    const key = generateUniqueKey(selectedDuration);
    setGeneratedKey(key);
    setHomeStep('generated');
  };

  const handleReplaceKey = () => {
    setSelectedDuration(null);
    setGeneratedKey('');
    setHomeStep('landing');
  };

  return (
    <div className="relative min-h-dvh w-full overflow-x-hidden bg-[#05070e] text-slate-100">
      {/* Persistent preloaded audio element for Owner screen background music */}
      <audio ref={audioRef} src={OWNER_AUDIO_URL} loop preload="auto" playsInline className="hidden" />

      {/* Subtle deep-navy ambient backdrop for Home / Key screens */}
      {!showSplash && activeTab === 'home' && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background:
              'radial-gradient(circle at 50% 18%, rgba(37, 99, 235, 0.14) 0%, rgba(139, 92, 246, 0.08) 38%, #05070e 78%)',
          }}
        />
      )}

      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        ) : (
          <div key="main-shell" className="relative z-10 flex min-h-dvh flex-col">
            <Header />

            <main className="flex-1">
              <AnimatePresence mode="wait">
                {activeTab === 'home' ? (
                  homeStep === 'landing' ? (
                    <HomeView key="home" onOpenDuration={() => setHomeStep('duration')} />
                  ) : homeStep === 'duration' ? (
                    <DurationView
                      key="duration"
                      onSelectDuration={handleSelectDuration}
                      onBack={() => setHomeStep('landing')}
                    />
                  ) : homeStep === 'confirm' ? (
                    <GenerateKeyScreen key="confirm" onGenerate={handleGenerateKey} />
                  ) : (
                    <GeneratedKeyView
                      key="generated"
                      generatedKey={generatedKey}
                      onReplace={handleReplaceKey}
                    />
                  )
                ) : (
                  <OwnerView key="owner" />
                )}
              </AnimatePresence>
            </main>

            <BottomNav
              activeTab={activeTab}
              onSelectHome={handleSelectHome}
              onSelectOwner={handleSelectOwner}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
