import { useState, useEffect } from 'react';
import GameContainer from './components/layout/GameContainer';
import Sidebar from './components/layout/Sidebar';
import ProfileScreen from './screens/ProfileScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import HeritageDexScreen from './screens/HeritageDexScreen';
import CameraScreen from './screens/CameraScreen';
import InfoScreen from './screens/InfoScreen';
import MapScreen from './screens/MapScreen';
import AuthScreen from './screens/AuthScreen';
import { useAuth } from './hooks/useAuth';
import { Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INFO_SLIDES = [
  "Mapping Bharat: Turn 500,000 undocumented sites into digital collectibles.",
  "Become a Guardian: Instead of monsters, you catch Pillars and protect history.",
  "The Lens of Truth: Use AI to verify structures and clear the Fog of War.",
  "Heritage-Dex: Discover everything from Post Offices to Legendary Rock Art.",
  "Preservation Army: Join 1.4 billion Indians mapping the soul of India."
];

const InfoCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % INFO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-4 text-left">
      <div className="p-2 bg-indi-gold/10 rounded-lg text-indi-gold shrink-0">
        <Info size={20} />
      </div>
      <div className="overflow-hidden h-12 flex items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-pixel text-lg text-indi-parchment leading-tight tracking-wide"
          >
            {INFO_SLIDES[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function App() {
  const [screen, setScreen] = useState<'LANDING' | 'AUTH' | 'MAP' | 'DEX' | 'LEADERBOARD' | 'PROFILE'>('LANDING');
  const [showCamera, setShowCamera] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const { user, loading } = useAuth();

  const renderScreen = () => {
    switch (screen) {
      case 'PROFILE': return <ProfileScreen />;
      case 'LEADERBOARD': return <LeaderboardScreen />;
      case 'DEX': return <div onClick={() => setShowInfo(true)} className="h-full"><HeritageDexScreen /></div>;
      case 'MAP': return <MapScreen onShowCamera={() => setShowCamera(true)} />;
      default: return null;
    }
  };

  // While auth state is loading, render nothing
  if (loading) return null;

  // If user is not authenticated, render the auth screen (unless they are on landing, let them see it first)
  if (!user && screen !== 'LANDING') {
    return (
      <GameContainer>
        <AuthScreen onAuthSuccess={() => setScreen('PROFILE')} onBack={() => setScreen('LANDING')} />
      </GameContainer>
    );
  }

  return (
    <GameContainer>
      {/* Full Screen Overlays */}
      {showCamera && (
        <div className="absolute inset-0 z-[100]">
          <CameraScreen onClose={() => setShowCamera(false)} />
        </div>
      )}

      {showInfo && (
        <div className="absolute inset-0 z-[90]">
          <InfoScreen onBack={() => setShowInfo(false)} />
        </div>
      )}

      {screen === 'LANDING' ? (
        <div
          className="w-full h-full flex items-center justify-center text-white relative overflow-hidden cursor-pointer group"
          style={{
            background: `linear-gradient(rgba(45, 27, 21, 0.4), rgba(45, 27, 21, 0.4)), url("/assets/map.png")`,
            backgroundColor: '#2D1B15',
            backgroundSize: 'cover',
            backgroundBlendMode: 'multiply',
          }}
          onClick={() => setScreen(user ? 'PROFILE' : 'AUTH')}
        >
          {/* Subtle Stone Block Texture Overlay (Faked with CSS lines) */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="h-1/3 border-b border-black"></div>
            <div className="h-1/3 border-b border-black"></div>
            <div className="absolute left-1/4 top-0 bottom-1/3 border-l border-black"></div>
            <div className="absolute left-3/4 top-1/3 bottom-1/3 border-l border-black"></div>
            <div className="absolute left-1/2 top-2/3 bottom-0 border-l border-black"></div>
          </div>

          <div className="z-10 flex flex-col items-center max-w-2xl px-12">
            {/* Corner Brackets */}
            <div className="absolute top-12 left-12 w-12 h-12 border-t border-l border-white/40"></div>
            <div className="absolute top-12 right-12 w-12 h-12 border-t border-r border-white/40"></div>
            <div className="absolute bottom-12 left-12 w-12 h-12 border-b border-l border-white/40"></div>
            <div className="absolute bottom-12 right-12 w-12 h-12 border-b border-r border-white/40"></div>

            {/* Logo */}
            <div className="mb-6 w-48 h-48 drop-shadow-2xl">
              <img src="/assets/logo.png" alt="Indi-Mon Logo" className="w-full h-full object-contain" />
            </div>

            {/* Title */}
            <h1 className="font-serif text-[100px] text-indi-gold leading-none tracking-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] mb-2">
              Indi-Mon
            </h1>

            {/* Subtitle */}
            <p className="font-serif text-2xl text-[#f5de8b] tracking-wider mb-8 opacity-90">
              Gotta Map ’Em All
            </p>

            {/* Info Carousel */}
            <div className="h-20 mb-12 flex items-center justify-center text-center max-w-lg px-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/5">
              <InfoCarousel />
            </div>

            {/* Tap Indicator */}
            <div className="flex flex-col items-center gap-4 animate-pulse">
              <div className="text-indi-gold">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                  <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                  <path d="M10 15V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                  <path d="M6 8v1a2 2 0 0 0-2-2v0a2 2 0 0 0 2 2v0" />
                  <path d="M20 12v4.17A4.45 4.45 0 0 1 15.63 20h0a5.62 5.62 0 0 0-3.6 1.48v0a2 2 0 0 1-2.6 0v0a6.52 6.52 0 0 0-5.32-2.38H4" />
                </svg>
              </div>

              <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-indi-gold/50 to-transparent"></div>

              <span className="font-serif text-3xl text-indi-gold uppercase tracking-[0.3em] font-light">
                Invoke to Begin
              </span>

              <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-indi-gold/50 to-transparent"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex bg-[#0b101b]">
          {/* Sidebar Navigation */}
          <Sidebar activeScreen={screen} setScreen={setScreen} />

          {/* Main Content Area */}
          <div className="flex-1 h-full relative overflow-hidden">
            {renderScreen()}
          </div>
        </div>
      )}
    </GameContainer>
  );
}
