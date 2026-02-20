import { useState, useEffect } from 'react';
import GameContainer from './components/layout/GameContainer';
import Sidebar from './components/layout/Sidebar';
import ProfileScreen from './screens/ProfileScreen';
import VerifierConsoleScreen, { VerificationModal } from './screens/VerifierConsoleScreen';
import HeritageDexScreen from './screens/HeritageDexScreen';
import CameraScreen from './screens/CameraScreen';
import InfoScreen from './screens/InfoScreen';
import MapScreen from './screens/MapScreen';
import AuthScreen from './screens/AuthScreen';
import SettingsScreen from './screens/SettingsScreen';
import { useAuth } from './hooks/useAuth';
import { Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { heritageSites } from './data/heritageSites';
import type { HeritageSite } from './data/heritageSites';

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
  const [sites, setSites] = useState<HeritageSite[]>(heritageSites);
  const [screen, setScreen] = useState<'LANDING' | 'AUTH' | 'MAP' | 'DEX' | 'VERIFIER' | 'PROFILE' | 'SETTINGS'>('LANDING');
  const [showCamera, setShowCamera] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [reviewSite, setReviewSite] = useState<HeritageSite | null>(null);
  const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(null);
  const { user, loading } = useAuth();

  const renderScreen = () => {
    switch (screen) {
      case 'PROFILE': return <ProfileScreen sites={sites} />;
      case 'VERIFIER': return <VerifierConsoleScreen sites={sites} onReviewSite={setReviewSite} />;
      case 'DEX': return <HeritageDexScreen sites={sites} onOpenInfo={(site) => {
        setSelectedSite(site);
        setShowInfo(true);
      }} />;
      case 'MAP': return <MapScreen sites={sites} onShowCamera={() => setShowCamera(true)} />;
      case 'SETTINGS': return <SettingsScreen />;
      default: return null;
    }
  };

  // Effect to handle navigation for authenticated users
  useEffect(() => {
    if (!loading && user && screen === 'LANDING') {
      setScreen('PROFILE');
    }
  }, [loading, user, screen]);

  // While auth state is loading, render a themed loading state
  if (loading) {
    return (
      <div className="w-full h-full bg-[#0b101b] flex items-center justify-center">
        <div className="text-indi-gold font-serif text-xl animate-pulse tracking-widest uppercase">
          Invoking Ancient Maps...
        </div>
      </div>
    );
  }

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

      {showInfo && selectedSite && (
        <div className="absolute inset-0 z-[90]">
          <InfoScreen site={selectedSite} onBack={() => setShowInfo(false)} />
        </div>
      )}

      <AnimatePresence>
        {reviewSite && (
          <VerificationModal
            site={reviewSite}
            onClose={() => setReviewSite(null)}
            onVerify={() => {
              const updatedSites = sites.map(s =>
                s.id === reviewSite.id ? { ...s, status: 'Verified' as const, discoveredOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) } : s
              );
              setSites(updatedSites);
              setReviewSite(null);
            }}
            onReject={() => setReviewSite(null)}
          />
        )}
      </AnimatePresence>

      {screen === 'LANDING' ? (
        <div
          className="w-full h-full flex items-center justify-center text-white relative overflow-hidden cursor-pointer group"
          style={{
            backgroundImage: `linear-gradient(rgba(30, 15, 5, 0.18), rgba(30, 15, 5, 0.18)), url("/assets/map.png")`,
            backgroundColor: '#2D1B15',
            backgroundSize: 'cover',
            backgroundBlendMode: 'multiply',
            filter: 'none',
          }}
          onClick={() => setScreen(user ? 'PROFILE' : 'AUTH')}
        >
          {/* Warm sepia vignette overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(30, 10, 0, 0.55) 100%)'
          }} />

          {/* Subtle Stone Block Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
            <div className="h-1/3 border-b border-amber-900"></div>
            <div className="h-1/3 border-b border-amber-900"></div>
            <div className="absolute left-1/4 top-0 bottom-1/3 border-l border-amber-900"></div>
            <div className="absolute left-3/4 top-1/3 bottom-1/3 border-l border-amber-900"></div>
            <div className="absolute left-1/2 top-2/3 bottom-0 border-l border-amber-900"></div>
          </div>

          {/* ── Map Markers ── */}
          {/* Monument Marker – top-left area */}
          <div className="absolute top-[18%] left-[14%] flex flex-col items-center gap-1 pointer-events-none select-none z-10">
            <div className="relative flex items-center justify-center">
              {/* Pulse ring */}
              <span className="absolute w-10 h-10 rounded-full border-2 border-indi-gold/60 animate-ping" />
              <span className="absolute w-7 h-7 rounded-full bg-indi-gold/20" />
              {/* Monument icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="relative z-10 drop-shadow-[0_0_6px_rgba(245,158,11,0.9)]">
                <polygon points="12,2 15,9 9,9" fill="#f59e0b" stroke="#92400e" strokeWidth="0.5" />
                <rect x="10" y="9" width="4" height="9" fill="#f59e0b" stroke="#92400e" strokeWidth="0.5" />
                <rect x="7" y="18" width="10" height="2" rx="0.5" fill="#d97706" stroke="#92400e" strokeWidth="0.5" />
                <line x1="12" y1="2" x2="12" y2="0.5" stroke="#f59e0b" strokeWidth="1" />
              </svg>
            </div>
            <span className="text-[10px] font-pixel text-indi-gold/90 tracking-widest bg-black/40 px-1.5 py-0.5 rounded">MONUMENT</span>
          </div>

          {/* Temple Marker – right side */}
          <div className="absolute top-[30%] right-[12%] flex flex-col items-center gap-1 pointer-events-none select-none z-10">
            <div className="relative flex items-center justify-center">
              <span className="absolute w-10 h-10 rounded-full border-2 border-amber-400/50 animate-ping" style={{ animationDelay: '0.7s' }} />
              <span className="absolute w-7 h-7 rounded-full bg-amber-500/20" />
              {/* Temple / Gopuram icon */}
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="relative z-10 drop-shadow-[0_0_6px_rgba(251,191,36,0.9)]">
                {/* Shikhara tiers */}
                <polygon points="12,1 15.5,7 8.5,7" fill="#fbbf24" stroke="#92400e" strokeWidth="0.5" />
                <polygon points="12,5.5 16.5,11 7.5,11" fill="#f59e0b" stroke="#92400e" strokeWidth="0.5" />
                <polygon points="12,9 17.5,14 6.5,14" fill="#d97706" stroke="#92400e" strokeWidth="0.5" />
                {/* Base */}
                <rect x="8" y="14" width="8" height="6" fill="#b45309" stroke="#92400e" strokeWidth="0.5" />
                {/* Door */}
                <rect x="10.5" y="16" width="3" height="4" rx="1" fill="#7c2d12" />
                {/* Base slab */}
                <rect x="6" y="20" width="12" height="2" rx="0.5" fill="#92400e" />
              </svg>
            </div>
            <span className="text-[10px] font-pixel text-amber-400/90 tracking-widest bg-black/40 px-1.5 py-0.5 rounded">TEMPLE</span>
          </div>

          {/* Fort Marker – bottom-left */}
          <div className="absolute bottom-[22%] left-[20%] flex flex-col items-center gap-1 pointer-events-none select-none z-10">
            <div className="relative flex items-center justify-center">
              <span className="absolute w-10 h-10 rounded-full border-2 border-orange-400/50 animate-ping" style={{ animationDelay: '1.4s' }} />
              <span className="absolute w-7 h-7 rounded-full bg-orange-500/15" />
              {/* Fort / battlements icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="relative z-10 drop-shadow-[0_0_6px_rgba(249,115,22,0.9)]">
                <rect x="3" y="10" width="18" height="11" rx="0.5" fill="#c2410c" stroke="#7c2d12" strokeWidth="0.5" />
                {/* Battlements */}
                <rect x="3" y="7" width="3" height="5" fill="#ea580c" stroke="#7c2d12" strokeWidth="0.5" />
                <rect x="8" y="7" width="3" height="5" fill="#ea580c" stroke="#7c2d12" strokeWidth="0.5" />
                <rect x="13" y="7" width="3" height="5" fill="#ea580c" stroke="#7c2d12" strokeWidth="0.5" />
                <rect x="18" y="7" width="3" height="5" fill="#ea580c" stroke="#7c2d12" strokeWidth="0.5" />
                {/* Gate arch */}
                <path d="M10 21 L10 16 Q12 14 14 16 L14 21" fill="#7c2d12" />
                <line x1="12" y1="6" x2="12" y2="4" stroke="#f97316" strokeWidth="1.5" />
                <circle cx="12" cy="3.5" r="1" fill="#f97316" />
              </svg>
            </div>
            <span className="text-[10px] font-pixel text-orange-400/90 tracking-widest bg-black/40 px-1.5 py-0.5 rounded">FORT</span>
          </div>

          <div className="z-10 flex flex-col items-center max-w-2xl px-12">
            {/* Ornate Indian corner decorations */}
            {/* Top-Left */}
            <svg className="absolute top-8 left-8 w-16 h-16 text-indi-gold/50" viewBox="0 0 64 64" fill="none">
              <path d="M2 2 L24 2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M2 2 L2 24" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1" />
              <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity="0.4" />
              <path d="M16 2 L16 8 M8 2 L8 6" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
              <path d="M2 16 L8 16 M2 8 L6 8" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
            </svg>
            {/* Top-Right */}
            <svg className="absolute top-8 right-8 w-16 h-16 text-indi-gold/50" viewBox="0 0 64 64" fill="none">
              <path d="M62 2 L40 2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M62 2 L62 24" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="52" cy="12" r="4" stroke="currentColor" strokeWidth="1" />
              <circle cx="52" cy="12" r="2" fill="currentColor" fillOpacity="0.4" />
              <path d="M48 2 L48 8 M56 2 L56 6" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
              <path d="M62 16 L56 16 M62 8 L58 8" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
            </svg>
            {/* Bottom-Left */}
            <svg className="absolute bottom-8 left-8 w-16 h-16 text-indi-gold/50" viewBox="0 0 64 64" fill="none">
              <path d="M2 62 L24 62" stroke="currentColor" strokeWidth="1.5" />
              <path d="M2 62 L2 40" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="52" r="4" stroke="currentColor" strokeWidth="1" />
              <circle cx="12" cy="52" r="2" fill="currentColor" fillOpacity="0.4" />
              <path d="M16 62 L16 56 M8 62 L8 58" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
              <path d="M2 48 L8 48 M2 56 L6 56" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
            </svg>
            {/* Bottom-Right */}
            <svg className="absolute bottom-8 right-8 w-16 h-16 text-indi-gold/50" viewBox="0 0 64 64" fill="none">
              <path d="M62 62 L40 62" stroke="currentColor" strokeWidth="1.5" />
              <path d="M62 62 L62 40" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="52" cy="52" r="4" stroke="currentColor" strokeWidth="1" />
              <circle cx="52" cy="52" r="2" fill="currentColor" fillOpacity="0.4" />
              <path d="M48 62 L48 56 M56 62 L56 58" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
              <path d="M62 48 L56 48 M62 56 L58 56" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
            </svg>

            {/* Logo */}
            <div className="mb-6 w-48 h-48 drop-shadow-2xl">
              <img src="/assets/logo.png" alt="Indi-Mon Logo" className="w-full h-full object-contain" />
            </div>

            {/* Title */}
            <h1 className="font-serif text-[100px] text-indi-gold leading-none tracking-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] mb-2">
              Indi-Mon
            </h1>

            {/* Subtitle with decorative dots */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-indi-gold/60 text-2xl">✦</span>
              <p className="font-serif text-2xl text-[#f5de8b] tracking-wider opacity-90">
                Gotta Map 'Em All
              </p>
              <span className="text-indi-gold/60 text-2xl">✦</span>
            </div>

            {/* Info Carousel with heritage border */}
            <div className="h-24 mb-12 flex items-center justify-center text-center max-w-lg px-6 backdrop-blur-md rounded-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(rgba(30, 10, 0, 0.6), rgba(30, 10, 0, 0.6)), url("/assets/meenakshisunset.webp")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid rgba(245,158,11,0.3)',
                boxShadow: '0 0 30px rgba(245,158,11,0.1), inset 0 0 30px rgba(245,158,11,0.1)'
              }}>
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

              {/* Decorative Ashoka Chakra divider */}
              <div className="flex items-center gap-3 w-64">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-indi-gold/50"></div>
                <svg width="18" height="18" viewBox="0 0 24 24" className="text-indi-gold/70 shrink-0">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360].map((deg, i) => (
                    <line
                      key={i}
                      x1="12" y1="4"
                      x2="12" y2="10"
                      stroke="currentColor" strokeWidth="1"
                      transform={`rotate(${deg} 12 12)`}
                    />
                  ))}
                </svg>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-indi-gold/50"></div>
              </div>

              <span className="font-serif text-3xl text-indi-gold uppercase tracking-[0.3em] font-light">
                Invoke to Begin
              </span>

              <div className="flex items-center gap-3 w-64">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-indi-gold/50"></div>
                <svg width="18" height="18" viewBox="0 0 24 24" className="text-indi-gold/70 shrink-0">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360].map((deg, i) => (
                    <line
                      key={i}
                      x1="12" y1="4"
                      x2="12" y2="10"
                      stroke="currentColor" strokeWidth="1"
                      transform={`rotate(${deg} 12 12)`}
                    />
                  ))}
                </svg>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-indi-gold/50"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="w-full h-full flex relative"
          style={{
            backgroundImage: `linear-gradient(rgba(40, 20, 5, 0.65), rgba(40, 20, 5, 0.65)), url("/assets/map.png")`,
            backgroundColor: '#1a0e06',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'multiply',
            filter: 'sepia(0.1) brightness(0.95)',
          }}
        >
          {/* Warm radial vignette */}
          <div className="absolute inset-0 pointer-events-none z-0" style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(20, 8, 0, 0.6) 100%)'
          }} />

          {/* Sidebar Navigation */}
          <Sidebar activeScreen={screen} setScreen={setScreen} />

          {/* Main Content Area */}
          <div className="flex-1 h-full relative overflow-hidden z-10">
            {renderScreen()}
          </div>
        </div>
      )}
    </GameContainer>
  );
}
