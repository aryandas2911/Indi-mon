import { useState } from 'react';
import GameContainer from './components/layout/GameContainer';
import Sidebar from './components/layout/Sidebar';
import ProfileScreen from './screens/ProfileScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import HeritageDexScreen from './screens/HeritageDexScreen';
import CameraScreen from './screens/CameraScreen';
import InfoScreen from './screens/InfoScreen';
import { Camera, Maximize } from 'lucide-react';

export default function App() {
  const [screen, setScreen] = useState<'LANDING' | 'MAP' | 'DEX' | 'LEADERBOARD' | 'PROFILE'>('LANDING');
  const [showCamera, setShowCamera] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const renderScreen = () => {
    switch (screen) {
      case 'PROFILE': return <ProfileScreen />;
      case 'LEADERBOARD': return <LeaderboardScreen />;
      case 'DEX': return <div onClick={() => setShowInfo(true)} className="h-full"><HeritageDexScreen /></div>;
      case 'MAP': return (
        <div className="w-full h-full bg-[#1e293b] relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('/assets/map.png')] bg-cover bg-center opacity-40"></div>

          {/* Map UI Overlay */}
          <div className="absolute top-6 right-6 flex gap-3">
            <button className="p-3 bg-black/60 text-indi-gold border border-indi-gold/30 rounded-lg backdrop-blur hover:bg-black/80">
              <Maximize size={20} />
            </button>
          </div>

          {/* FAB Camera */}
          <button
            onClick={() => setShowCamera(true)}
            className="absolute bottom-10 right-10 w-20 h-20 bg-gradient-to-br from-indi-gold to-amber-600 rounded-full flex items-center justify-center text-indi-dark shadow-[0_0_40px_rgba(245,158,11,0.6)] border-[4px] border-white/20 transform hover:scale-110 hover:rotate-90 transition-all duration-300 group z-20"
          >
            <Camera size={32} className="text-[#0f172a] drop-shadow-md" />
          </button>

          {/* Placeholder Content */}
          <div className="text-center z-10 p-8 bg-[#fdf6e3]/90 border border-amber-900/20 rounded-xl shadow-2xl max-w-md backdrop-blur-sm">
            <h2 className="font-serif text-3xl text-amber-900 mb-2">The Known World</h2>
            <p className="font-pixel text-amber-800 text-lg tracking-wider">Map Module Initializing...</p>
            <div className="mt-6 w-full bg-amber-900/10 h-1 rounded-full overflow-hidden">
              <div className="h-full bg-amber-600 w-2/3 animate-pulse"></div>
            </div>
          </div>
        </div>
      );
      default: return null;
    }
  };

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
        <div className="w-full h-full flex items-center justify-center text-white relative bg-[#020617] overflow-hidden">
          {/* Video Background Placeholder or Parallax Image */}
          <div className="absolute inset-0 bg-[url('/assets/map.png')] bg-cover bg-center opacity-20 scale-110 animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80"></div>

          <div className="z-10 flex flex-col items-center">
            {/* Logo Build */}
            <div className="mb-8 relative group">
              <div className="absolute inset-0 bg-indi-gold/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
              <div className="w-48 h-48 rounded-full bg-gradient-to-b from-orange-500 to-green-600 p-1.5 shadow-[0_0_60px_rgba(245,158,11,0.5)] relative animate-spin-slow">
                <div className="w-full h-full bg-[#0f172a] rounded-full flex items-center justify-center border-[6px] border-indi-gold">
                  <span className="text-6xl filter drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]">🛕</span>
                </div>
                {/* Pokeball line */}
                <div className="absolute top-1/2 left-0 w-full h-1.5 bg-indi-dark/80"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full border-[3px] border-white backdrop-blur-sm"></div>
              </div>
            </div>

            <h1 className="font-serif text-8xl text-indi-gold mb-4 tracking-normal drop-shadow-[0_4px_0_rgba(0,0,0,1)] text-shadow-lg">Indi-Mon</h1>
            <p className="font-pixel text-2xl mb-12 text-indi-parchment/90 tracking-[0.5em] uppercase border-b border-indi-gold/30 pb-4">Gotta Map 'Em All!</p>

            <button
              onClick={() => setScreen('PROFILE')}
              className="group relative px-12 py-4 bg-transparent border-2 border-indi-gold text-indi-gold font-bold text-xl rounded-sm uppercase tracking-widest hover:bg-indi-gold hover:text-black transition-all duration-300"
            >
              <span className="font-pixel relative z-10">Start Journey</span>
              <div className="absolute inset-0 bg-indi-gold transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </button>
          </div>

          <div className="absolute bottom-8 right-8 text-xs text-white/30 font-pixel uppercase tracking-widest text-right">
            System Ready<br />v0.2.0 Landscape
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
